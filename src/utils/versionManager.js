/**
 * BrixelLabs Dynamic Version Manager & Force-Update Controller
 * Compares client build version against remote manifest & enforces updates
 * when critical security or database migrations occur.
 */

export const CLIENT_APP_VERSION = '2.4.0';

/**
 * Compare two semver strings (e.g., '2.4.0' vs '2.0.0')
 * Returns:
 *   1 if v1 > v2
 *  -1 if v1 < v2
 *   0 if v1 === v2
 */
export function compareSemver(v1, v2) {
  const parse = (v) => (v || '0.0.0').replace(/[^0-9.]/g, '').split('.').map(Number);
  const [maj1 = 0, min1 = 0, pat1 = 0] = parse(v1);
  const [maj2 = 0, min2 = 0, pat2 = 0] = parse(v2);

  if (maj1 !== maj2) return maj1 > maj2 ? 1 : -1;
  if (min1 !== min2) return min1 > min2 ? 1 : -1;
  if (pat1 !== pat2) return pat1 > pat2 ? 1 : -1;
  return 0;
}

/**
 * Fetch remote version configuration from static version.json or backend API
 */
export async function fetchRemoteVersion() {
  const timestamp = Date.now();
  
  // 1. Try static version.json with cache-busting
  try {
    const res = await fetch(`/version.json?_t=${timestamp}`, {
      cache: 'no-store',
      headers: { 'Cache-Control': 'no-cache, no-store, must-revalidate' }
    });
    if (res.ok) {
      const data = await res.json();
      return {
        currentVersion: data.version || '2.4.0',
        minSupportedVersion: data.minSupportedVersion || '2.0.0',
        forceUpdate: Boolean(data.forceUpdate),
        updateTitle: data.updateTitle || 'Mandatory Platform Update',
        updateMessage: data.updateMessage || 'A critical security update is required to continue.',
        releaseNotes: data.releaseNotes || [],
        downloadUrl: data.downloadUrl || '/',
        publishedAt: data.publishedAt
      };
    }
  } catch (e) {
    // Static fetch failed, try backend endpoint next
  }

  // 2. Try backend API endpoint
  try {
    const apiUrl = import.meta.env?.VITE_API_URL 
      ? `${import.meta.env.VITE_API_URL}/app-version/?platform=web` 
      : '/api/app-version/?platform=web';
      
    const res = await fetch(apiUrl, { cache: 'no-store' });
    if (res.ok) {
      const data = await res.json();
      return {
        currentVersion: data.current_version || '2.4.0',
        minSupportedVersion: data.min_supported_version || '2.0.0',
        forceUpdate: Boolean(data.force_update),
        updateTitle: data.update_title || 'Mandatory Platform Update',
        updateMessage: data.update_message || 'A critical update is required to continue.',
        releaseNotes: data.release_notes || [],
        downloadUrl: data.download_url || '/'
      };
    }
  } catch (e) {
    // Both endpoints offline or unreachable
  }

  return null;
}

/**
 * Evaluate whether an update is required or available
 */
export async function checkUpdateStatus() {
  const remote = await fetchRemoteVersion();
  if (!remote) {
    return {
      needsForceUpdate: false,
      updateAvailable: false,
      clientVersion: CLIENT_APP_VERSION,
      config: null
    };
  }

  // Force update if client version is below the minimum supported version, or if forceUpdate flag is explicitly enabled
  const isBelowMin = compareSemver(CLIENT_APP_VERSION, remote.minSupportedVersion) < 0;
  const isForceFlagged = remote.forceUpdate === true;
  const needsForceUpdate = isBelowMin || isForceFlagged;

  // Soft update available if a newer release exists
  const updateAvailable = compareSemver(CLIENT_APP_VERSION, remote.currentVersion) < 0;

  return {
    needsForceUpdate,
    updateAvailable,
    clientVersion: CLIENT_APP_VERSION,
    config: remote
  };
}

/**
 * Cleanly wipe stale cache, unregister service workers, and force full reload
 */
export async function executeHardAppUpdate() {
  console.log('[VersionManager] Performing hard application update...');

  // 1. Unregister all Service Workers
  if ('serviceWorker' in navigator) {
    try {
      const registrations = await navigator.serviceWorker.getRegistrations();
      for (const registration of registrations) {
        await registration.unregister();
      }
    } catch (e) {
      console.warn('Service worker unregister error:', e);
    }
  }

  // 2. Clear Cache Storage
  if ('caches' in window) {
    try {
      const cacheKeys = await caches.keys();
      for (const key of cacheKeys) {
        await caches.delete(key);
      }
    } catch (e) {
      console.warn('Cache clear error:', e);
    }
  }

  // 3. Clear transient storage flags
  try {
    sessionStorage.clear();
  } catch (e) {}

  // 4. Force hard reload with timestamp cache buster
  const url = new URL(window.location.href);
  url.searchParams.set('_v', Date.now().toString());
  window.location.href = url.toString();
}
