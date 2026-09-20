# BrixelLabs Backend Package
import socket

# Render / Cloud Linux containers do not have outbound IPv6 routing.
# Force socket.getaddrinfo to resolve IPv4 addresses (AF_INET) to prevent [Errno 101] Network is unreachable.
_orig_getaddrinfo = socket.getaddrinfo

def _ipv4_getaddrinfo(host, port, family=0, type=0, proto=0, flags=0):
    if family == 0 or family == getattr(socket, 'AF_INET6', 23):
        family = socket.AF_INET
    try:
        return _orig_getaddrinfo(host, port, family, type, proto, flags)
    except Exception:
        return _orig_getaddrinfo(host, port, 0, type, proto, flags)

socket.getaddrinfo = _ipv4_getaddrinfo
