import os
import sys
import time
import json
import socket
import threading
import urllib.request
import urllib.error
from http.server import ThreadingHTTPServer, BaseHTTPRequestHandler
from urllib.parse import urlparse

# Default Upstream Cluster Worker Nodes
DEFAULT_WORKERS = [
    'http://127.0.0.1:8001',
    'http://127.0.0.1:8002',
    'http://127.0.0.1:8003'
]

class ClusterNode:
    def __init__(self, url: str):
        self.url = url.rstrip('/')
        self.is_healthy = True
        self.active_connections = 0
        self.total_requests_served = 0
        self.failed_requests = 0
        self.last_latency_ms = 0.0

    def to_dict(self):
        return {
            'url': self.url,
            'is_healthy': self.is_healthy,
            'active_connections': self.active_connections,
            'total_requests_served': self.total_requests_served,
            'failed_requests': self.failed_requests,
            'last_latency_ms': round(self.last_latency_ms, 2)
        }


class LoadBalancerState:
    def __init__(self, worker_urls):
        self.nodes = [ClusterNode(url) for url in worker_urls]
        self.lock = threading.Lock()
        self.rr_index = 0
        self.total_routed_requests = 0

    def get_next_healthy_node(self) -> ClusterNode:
        """Selects next available worker using Round-Robin across healthy nodes."""
        with self.lock:
            healthy_nodes = [n for n in self.nodes if n.is_healthy]
            if not healthy_nodes:
                # If all marked unhealthy, attempt fallback to any node
                healthy_nodes = self.nodes

            node = healthy_nodes[self.rr_index % len(healthy_nodes)]
            self.rr_index += 1
            node.active_connections += 1
            self.total_routed_requests += 1
            return node

    def release_node(self, node: ClusterNode, latency_ms: float, success: bool = True):
        with self.lock:
            node.active_connections = max(0, node.active_connections - 1)
            node.last_latency_ms = latency_ms
            if success:
                node.total_requests_served += 1
            else:
                node.failed_requests += 1

    def health_check_all(self):
        """Pings each node's /api/health/ endpoint and marks health status."""
        for node in self.nodes:
            check_url = f"{node.url}/api/health/"
            try:
                start = time.time()
                req = urllib.request.Request(check_url, headers={'User-Agent': 'BrixelLabs-LB-HealthCheck'})
                with urllib.request.urlopen(req, timeout=1.5) as resp:
                    latency = (time.time() - start) * 1000
                    node.is_healthy = (resp.status == 200)
                    node.last_latency_ms = latency
            except Exception:
                node.is_healthy = False


# Global Load Balancer State instance
state = LoadBalancerState(DEFAULT_WORKERS)


class LoadBalancerHTTPHandler(BaseHTTPRequestHandler):
    """Transparent Reverse Proxy Handler with Round-Robin Load Balancing."""

    def do_GET(self):
        self._proxy_request('GET')

    def do_POST(self):
        self._proxy_request('POST')

    def do_PUT(self):
        self._proxy_request('PUT')

    def do_PATCH(self):
        self._proxy_request('PATCH')

    def do_DELETE(self):
        self._proxy_request('DELETE')

    def do_OPTIONS(self):
        self._proxy_request('OPTIONS')

    def _proxy_request(self, method: str):
        # Dedicated cluster status endpoint
        if self.path == '/load-balancer/status':
            self._serve_status()
            return

        # Read incoming request body if present
        body = None
        content_length = self.headers.get('Content-Length')
        if content_length and int(content_length) > 0:
            body = self.rfile.read(int(content_length))

        # Try up to 3 times across different healthy cluster nodes
        attempts = 0
        max_attempts = len(state.nodes)
        last_error = None

        while attempts < max_attempts:
            attempts += 1
            node = state.get_next_healthy_node()
            target_url = f"{node.url}{self.path}"

            start_time = time.time()
            try:
                # Forward headers (excluding Host)
                forward_headers = {}
                for k, v in self.headers.items():
                    if k.lower() not in ['host', 'connection']:
                        forward_headers[k] = v

                forward_headers['Host'] = urlparse(node.url).netloc
                forward_headers['X-Forwarded-For'] = self.client_address[0]
                forward_headers['X-Forwarded-Proto'] = 'http'

                req = urllib.request.Request(
                    target_url,
                    data=body,
                    headers=forward_headers,
                    method=method
                )

                with urllib.request.urlopen(req, timeout=5.0) as resp:
                    resp_data = resp.read()
                    latency_ms = (time.time() - start_time) * 1000
                    state.release_node(node, latency_ms, success=True)

                    # Send response back to client
                    try:
                        self.send_response(resp.status)
                        for header, value in resp.getheaders():
                            if header.lower() not in ['transfer-encoding', 'connection']:
                                self.send_header(header, value)

                        # Attach load balancer telemetry headers
                        self.send_header('X-Backend-Worker', node.url)
                        self.send_header('X-Load-Balancer', 'BrixelLabs-Cluster-LB/1.0')
                        self.send_header('X-LB-Latency-Ms', f"{latency_ms:.2f}")
                        self.end_headers()
                        self.wfile.write(resp_data)
                    except (BrokenPipeError, ConnectionResetError, socket.error):
                        pass
                    return

            except urllib.error.HTTPError as http_err:
                # Forward standard HTTP error responses from backend (e.g. 400 Bad Request, 401 Unauthorized)
                latency_ms = (time.time() - start_time) * 1000
                state.release_node(node, latency_ms, success=True)
                err_body = http_err.read()

                try:
                    self.send_response(http_err.code)
                    for header, value in http_err.headers.items():
                        if header.lower() not in ['transfer-encoding', 'connection']:
                            self.send_header(header, value)
                    self.send_header('X-Backend-Worker', node.url)
                    self.send_header('X-Load-Balancer', 'BrixelLabs-Cluster-LB/1.0')
                    self.end_headers()
                    self.wfile.write(err_body)
                except (BrokenPipeError, ConnectionResetError, socket.error):
                    pass
                return

            except Exception as e:
                # Connection refused / timeout: mark node degraded, try failover
                latency_ms = (time.time() - start_time) * 1000
                node.is_healthy = False
                state.release_node(node, latency_ms, success=False)
                last_error = e

        # If all worker attempts exhausted
        try:
            self.send_response(503)
            self.send_header('Content-Type', 'application/json')
            self.end_headers()
            err_payload = json.dumps({
                'error': '503 Service Unavailable',
                'detail': 'All cluster backend workers are currently unresponsive.',
                'last_error': str(last_error),
                'nodes_evaluated': max_attempts
            })
            self.wfile.write(err_payload.encode('utf-8'))
        except (BrokenPipeError, ConnectionResetError, socket.error):
            pass

    def _serve_status(self):
        """Returns JSON cluster status and worker distribution telemetry."""
        status_data = {
            'status': 'active',
            'balancer_type': 'Round-Robin / Active Failover',
            'total_routed_requests': state.total_routed_requests,
            'cluster_nodes': [n.to_dict() for n in state.nodes]
        }
        resp = json.dumps(status_data, indent=2).encode('utf-8')
        self.send_response(200)
        self.send_header('Content-Type', 'application/json')
        self.send_header('Content-Length', str(len(resp)))
        self.end_headers()
        self.wfile.write(resp)

    def log_message(self, format, *args):
        # Suppress noisy standard request logs unless debugging
        pass


def start_health_monitor(interval_sec=5.0):
    """Background daemon periodically checking worker health."""
    def run():
        while True:
            time.sleep(interval_sec)
            try:
                state.health_check_all()
            except Exception:
                pass

    t = threading.Thread(target=run, daemon=True)
    t.start()


def run_load_balancer(port=8000, worker_ports=None):
    """Entrypoint to start the Load Balancer on specified port."""
    global state
    if worker_ports:
        urls = [f"http://127.0.0.1:{p}" for p in worker_ports]
        state = LoadBalancerState(urls)

    server_address = ('0.0.0.0', port)
    httpd = ThreadingHTTPServer(server_address, LoadBalancerHTTPHandler)
    httpd.daemon_threads = True

    start_health_monitor()

    print(f"==========================================================")
    print(f" [BRIXEL LABS] DISTRIBUTED CLUSTER LOAD BALANCER ACTIVE   ")
    print(f"==========================================================")
    print(f" Listening on:       http://0.0.0.0:{port}")
    print(f" Balancing Mode:     Dynamic Round-Robin with Active Failover")
    print(f" Upstream Workers:   {', '.join([n.url for n in state.nodes])}")
    print(f" Status Endpoint:    http://127.0.0.1:{port}/load-balancer/status\n")

    try:
        httpd.serve_forever()
    except KeyboardInterrupt:
        print("\nStopping Load Balancer...")
        httpd.server_close()


if __name__ == '__main__':
    import argparse
    parser = argparse.ArgumentParser(description="BrixelLabs Distributed Cluster Load Balancer")
    parser.add_argument('--port', type=int, default=8000, help="Port to bind the load balancer")
    parser.add_argument('--workers', type=int, nargs='+', default=[8001, 8002, 8003], help="Worker port numbers")
    args = parser.parse_args()

    run_load_balancer(port=args.port, worker_ports=args.workers)
