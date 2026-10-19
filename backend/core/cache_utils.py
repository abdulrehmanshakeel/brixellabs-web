import time
from functools import wraps
from django.core.cache import cache
from rest_framework.response import Response

# Cache Keys
CACHE_KEY_SERVICES = 'brixel:services:list'
CACHE_KEY_PORTFOLIO = 'brixel:portfolio:list'
CACHE_KEY_TEAM = 'brixel:team:list'
CACHE_KEY_SETTINGS = 'brixel:settings:list'
CACHE_KEY_ADMIN_STATS = 'brixel:admin:stats'
CACHE_KEY_APP_VERSION = 'brixel:app_version:web'

# Time To Live (TTL in seconds)
CACHE_TTL_PUBLIC = 60 * 15    # 15 minutes for public CMS content
CACHE_TTL_STATS = 60 * 2      # 2 minutes for admin KPI aggregations
CACHE_TTL_VERSION = 60 * 10   # 10 minutes for client force update version

# In-memory metrics counter for monitoring and load testing
_CACHE_METRICS = {
    'hits': 0,
    'misses': 0,
    'total_requests': 0
}


def get_cache_metrics():
    """Return cache hit ratio and query counts."""
    total = _CACHE_METRICS['total_requests']
    hits = _CACHE_METRICS['hits']
    ratio = (hits / total * 100) if total > 0 else 0.0
    return {
        'hits': hits,
        'misses': _CACHE_METRICS['misses'],
        'total_requests': total,
        'hit_ratio_percent': round(ratio, 2)
    }


def reset_cache_metrics():
    """Reset counters before load testing benchmarks."""
    _CACHE_METRICS['hits'] = 0
    _CACHE_METRICS['misses'] = 0
    _CACHE_METRICS['total_requests'] = 0


def get_or_set_cached_data(cache_key: str, ttl: int, fetch_func):
    """
    Retrieves data from cache if present; otherwise calls fetch_func(),
    stores the result in cache, and returns (data, was_cached: bool).
    """
    _CACHE_METRICS['total_requests'] += 1
    cached_data = cache.get(cache_key)

    if cached_data is not None:
        _CACHE_METRICS['hits'] += 1
        return cached_data, True

    _CACHE_METRICS['misses'] += 1
    fresh_data = fetch_func()
    cache.set(cache_key, fresh_data, timeout=ttl)
    return fresh_data, False


def invalidate_cache(*keys):
    """Invalidates one or more specific cache keys."""
    for key in keys:
        cache.delete(key)


def invalidate_all_public_cache():
    """Wipes all public content caches upon bulk deployment or data seed."""
    invalidate_cache(
        CACHE_KEY_SERVICES,
        CACHE_KEY_PORTFOLIO,
        CACHE_KEY_TEAM,
        CACHE_KEY_SETTINGS,
        CACHE_KEY_ADMIN_STATS,
        CACHE_KEY_APP_VERSION
    )
