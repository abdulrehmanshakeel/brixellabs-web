import os
import sys
import time
import json
import random
import urllib.request
import urllib.error
from concurrent.futures import ThreadPoolExecutor, as_completed
from datetime import datetime

# Fake Data Pools for Realistic Load Generation
FIRST_NAMES = ["Liam", "Olivia", "Noah", "Emma", "Oliver", "Charlotte", "Elijah", "Amelia", "James", "Sophia", "Alexander", "Isabella", "David", "Mia", "Lucas", "Harper", "Marcus", "Elena", "Tariq", "Zoya"]
LAST_NAMES = ["Sterling", "Vance", "Mercer", "Sinclair", "Hawthorne", "Kovacs", "Dubois", "Chen", "Kassir", "Al-Mansoor", "Tanaka", "Lindqvist", "Rossi", "Patel", "Novak", "O'Connor", "Svensson", "Zhang"]
COMPANIES = ["Apex Capital", "Solaris Health", "Nexus Logistics", "AuraVision AI", "Quantum Retail", "Hyperion Dynamics", "Crestline Bio", "Veloce Motors", "Zephyr Cloud", "Krypton Labs", "Nordic Fintech", "Strata Energy"]
SERVICES = ["AI Agents & Automation", "Computer Vision Defect Inspection", "High-Throughput API Architecture", "Custom Shopify Theme Development", "Mobile Safety Systems", "Predictive Analytics"]
BUDGETS = ["$10k - $25k", "$25k - $50k", "$50k - $100k", "$100k+"]

ENDPOINTS = [
    ('GET', '/health/'),
    ('GET', '/services/'),
    ('GET', '/portfolio/'),
    ('GET', '/team/'),
    ('GET', '/settings/'),
    ('GET', '/app-version/'),
    ('POST', '/inquiries/'),
    ('POST', '/newsletter/')
]


def generate_fake_inquiry():
    first = random.choice(FIRST_NAMES)
    last = random.choice(LAST_NAMES)
    uid = random.randint(1000, 9999)
    return {
        "name": f"{first} {last}",
        "email": f"loadtest_{first.lower()}.{last.lower()}_{uid}@example.com",
        "phone": f"+1 (555) {random.randint(100, 999)}-{random.randint(1000, 9999)}",
        "company": random.choice(COMPANIES),
        "service": random.choice(SERVICES),
        "budget": random.choice(BUDGETS),
        "project_brief": f"Automated load testing payload generated at {datetime.now().isoformat()} to test high-volume database concurrency and cache throughput.",
        "turnstile_token": "cf-fallback-token"
    }


def generate_fake_subscriber():
    uid = random.randint(10000, 99999)
    return {
        "email": f"subscriber_loadtest_{uid}@example.com",
        "source": "Load Testing Cluster"
    }


def send_single_request(base_url: str, request_id: int):
    """Executes a single HTTP request and measures latency, status, and worker headers."""
    # Weighted distribution: 75% read requests (cached), 25% write requests
    is_write = (random.random() < 0.25)

    if is_write:
        if random.random() < 0.65:
            method = 'POST'
            path = '/inquiries/'
            payload = generate_fake_inquiry()
        else:
            method = 'POST'
            path = '/newsletter/'
            payload = generate_fake_subscriber()
        body = json.dumps(payload).encode('utf-8')
    else:
        method = 'GET'
        path = random.choice(['/services/', '/portfolio/', '/team/', '/settings/', '/app-version/', '/health/'])
        body = None

    url = f"{base_url.rstrip('/')}{path}"
    headers = {
        'Accept': 'application/json',
        'User-Agent': f'BrixelLabs-LoadTester/1.0 (Req-{request_id})'
    }
    if body:
        headers['Content-Type'] = 'application/json'

    start_time = time.perf_counter()
    req = urllib.request.Request(url, data=body, headers=headers, method=method)

    try:
        with urllib.request.urlopen(req, timeout=10.0) as resp:
            data = resp.read()
            latency = (time.perf_counter() - start_time) * 1000
            worker = resp.headers.get('X-Backend-Worker', 'Direct Server')
            cache_status = resp.headers.get('X-Cache', 'NONE')

            return {
                'id': request_id,
                'status': resp.status,
                'method': method,
                'path': path,
                'latency_ms': latency,
                'worker': worker,
                'cache_status': cache_status,
                'success': True,
                'error': None
            }

    except urllib.error.HTTPError as e:
        latency = (time.perf_counter() - start_time) * 1000
        # 429 (Rate limited) is an expected server defense mechanism during extreme bursts
        is_success = (e.code in [200, 201, 429])
        worker = e.headers.get('X-Backend-Worker', 'Direct Server') if hasattr(e, 'headers') else 'Direct Server'
        cache_status = e.headers.get('X-Cache', 'NONE') if hasattr(e, 'headers') else 'NONE'

        return {
            'id': request_id,
            'status': e.code,
            'method': method,
            'path': path,
            'latency_ms': latency,
            'worker': worker,
            'cache_status': cache_status,
            'success': is_success,
            'error': f"HTTP {e.code}"
        }

    except Exception as e:
        latency = (time.perf_counter() - start_time) * 1000
        return {
            'id': request_id,
            'status': 0,
            'method': method,
            'path': path,
            'latency_ms': latency,
            'worker': 'None',
            'cache_status': 'NONE',
            'success': False,
            'error': str(e)
        }


def run_load_test(base_url="http://127.0.0.1:8000/api", total_requests=1000, concurrency=25):
    print("================================================================================")
    print("       BRIXEL LABS ENTERPRISE ARCHITECTURE LOAD & CONCURRENCY TEST              ")
    print("================================================================================")
    print(f" Target API Base:      {base_url}")
    print(f" Total Requests:       {total_requests:,}")
    print(f" Concurrency Level:    {concurrency} simultaneous worker threads")
    print(f" Timestamp:            {datetime.now().strftime('%Y-%m-%d %H:%M:%S')}")
    print("================================================================================\n")

    # Step 1: Warm up cache with initial query
    print(">> Warming up high-performance cache...")
    try:
        urllib.request.urlopen(f"{base_url.rstrip('/')}/services/", timeout=3.0)
        urllib.request.urlopen(f"{base_url.rstrip('/')}/portfolio/", timeout=3.0)
        print(">> Cache warmed successfully!\n")
    except Exception as e:
        print(f">> Warmup notice: {e} (Backend starting up)\n")

    print(f">> Launching {total_requests:,} requests across {concurrency} threads...")
    start_suite = time.perf_counter()

    results = []
    completed_count = 0

    with ThreadPoolExecutor(max_workers=concurrency) as executor:
        futures = [executor.submit(send_single_request, base_url, i + 1) for i in range(total_requests)]

        for future in as_completed(futures):
            res = future.result()
            results.append(res)
            completed_count += 1
            if completed_count % 200 == 0 or completed_count == total_requests:
                elapsed = time.perf_counter() - start_suite
                rps = completed_count / elapsed if elapsed > 0 else 0
                print(f"   [{completed_count:5d} / {total_requests}] completed | Elapsed: {elapsed:5.1f}s | Current Speed: {rps:6.1f} req/sec")

    total_time = time.perf_counter() - start_suite
    print(f"\n>> All {total_requests:,} requests completed in {total_time:.2f} seconds!\n")

    # Metrics Analysis
    success_requests = [r for r in results if r['success']]
    failed_requests = [r for r in results if not r['success']]
    latencies = [r['latency_ms'] for r in results if r['latency_ms'] > 0]
    latencies.sort()

    cache_hits = sum(1 for r in results if r['cache_status'] == 'HIT')
    cache_misses = sum(1 for r in results if r['cache_status'] == 'MISS')
    total_cached_evals = cache_hits + cache_misses
    hit_ratio = (cache_hits / total_cached_evals * 100) if total_cached_evals > 0 else 0.0

    # Worker distribution
    worker_distribution = {}
    for r in results:
        w = r['worker']
        worker_distribution[w] = worker_distribution.get(w, 0) + 1

    # Latency percentiles
    def percentile(data, p):
        if not data:
            return 0.0
        idx = int(len(data) * (p / 100.0))
        return data[min(idx, len(data) - 1)]

    p50 = percentile(latencies, 50)
    p90 = percentile(latencies, 90)
    p95 = percentile(latencies, 95)
    p99 = percentile(latencies, 99)
    avg_latency = sum(latencies) / len(latencies) if latencies else 0.0
    throughput = total_requests / total_time if total_time > 0 else 0.0

    print("================================================================================")
    print("                        LOAD TEST PERFORMANCE REPORT                            ")
    print("================================================================================")
    print(f" Requests Processed:     {total_requests:,}")
    print(f" Successful Requests:    {len(success_requests):,} ({len(success_requests)/total_requests*100:.1f}%)")
    print(f" Failed Requests:        {len(failed_requests):,}")
    print(f" Total Duration:         {total_time:.2f} seconds")
    print(f" Throughput (RPS):       {throughput:.1f} Requests / Second")
    print("--------------------------------------------------------------------------------")
    print(" LATENCY DISTRIBUTION (Milliseconds):")
    print(f"   - Minimum Latency:    {min(latencies):.2f} ms")
    print(f"   - Average Latency:    {avg_latency:.2f} ms")
    print(f"   - Median (P50):       {p50:.2f} ms")
    print(f"   - 90th Percentile:    {p90:.2f} ms")
    print(f"   - 95th Percentile:    {p95:.2f} ms")
    print(f"   - 99th Percentile:    {p99:.2f} ms")
    print(f"   - Maximum Latency:    {max(latencies):.2f} ms")
    print("--------------------------------------------------------------------------------")
    print(" HIGH-SPEED CACHING PERFORMANCE:")
    print(f"   - Cache Hits:         {cache_hits:,}")
    print(f"   - Cache Misses:       {cache_misses:,}")
    print(f"   - Cache Hit Ratio:    {hit_ratio:.1f}%")
    print("--------------------------------------------------------------------------------")
    print(" LOAD BALANCER & WORKER TRAFFIC DISTRIBUTION:")
    for worker, count in sorted(worker_distribution.items(), key=lambda x: x[1], reverse=True):
        pct = (count / total_requests) * 100
        print(f"   - {worker:30s} : {count:5d} requests ({pct:.1f}%)")
    print("================================================================================\n")

    return {
        'total_requests': total_requests,
        'successful': len(success_requests),
        'failed': len(failed_requests),
        'throughput_rps': round(throughput, 1),
        'avg_latency_ms': round(avg_latency, 2),
        'p95_latency_ms': round(p95, 2),
        'cache_hit_ratio': round(hit_ratio, 1)
    }


if __name__ == '__main__':
    import argparse
    parser = argparse.ArgumentParser(description="BrixelLabs Architecture Load Tester")
    parser.add_argument('--target', type=str, default="http://127.0.0.1:8000/api", help="Target API URL")
    parser.add_argument('--requests', type=int, default=1000, help="Total requests to generate")
    parser.add_argument('--concurrency', type=int, default=25, help="Number of concurrent worker threads")
    args = parser.parse_args()

    run_load_test(base_url=args.target, total_requests=args.requests, concurrency=args.concurrency)
