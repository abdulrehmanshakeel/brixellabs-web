// UTM & Attribution Tracking Helper
// Automatically captures, stores, and exposes campaign parameters

const UTM_STORAGE_KEY = 'brixel_utm_params';

/**
 * Parses UTM query parameters from the current URL
 */
export const captureUTMParams = () => {
  if (typeof window === 'undefined') return {};

  try {
    const urlParams = new URLSearchParams(window.location.search);
    const utmFields = ['utm_source', 'utm_medium', 'utm_campaign', 'utm_term', 'utm_content', 'gclid', 'fbclid'];
    const captured = {};
    let hasUTM = false;

    utmFields.forEach(field => {
      const val = urlParams.get(field);
      if (val) {
        captured[field] = val.trim();
        hasUTM = true;
      }
    });

    if (hasUTM) {
      captured.landing_page = window.location.pathname;
      captured.referrer = document.referrer || 'direct';
      captured.captured_at = new Date().toISOString();
      sessionStorage.setItem(UTM_STORAGE_KEY, JSON.stringify(captured));
      return captured;
    }
  } catch (e) {
    console.warn('Error capturing UTM parameters:', e);
  }

  return getStoredUTMParams();
};

/**
 * Returns stored UTM parameters from sessionStorage
 */
export const getStoredUTMParams = () => {
  if (typeof window === 'undefined') return {};

  try {
    const saved = sessionStorage.getItem(UTM_STORAGE_KEY);
    if (saved) {
      return JSON.parse(saved);
    }
  } catch (e) {
    // ignore
  }

  return {};
};
