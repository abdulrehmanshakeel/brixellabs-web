/**
 * BrixelLabs Day-One Crash Reporting & Telemetry Engine
 * Captures unhandled runtime errors, rejection events, and component crashes.
 * Automatically saves local incident logs and dispatches telemetry to the backend.
 */

const STORAGE_KEY = 'brixel_crash_audit_v1';
const MAX_LOCAL_CRASHES = 25;

export const APP_VERSION = '2.4.0';

/**
 * Generate human-friendly Incident Reference ID
 */
export function generateIncidentId() {
  const chars = 'ABCDEFGHJKLMNPQRSTUVWXYZ23456789';
  let code = '';
  for (let i = 0; i < 6; i++) {
    code += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  return `INC-${code}`;
}

/**
 * Store crash incident locally in LocalStorage
 */
function persistCrashLocally(report) {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    const existing = raw ? JSON.parse(raw) : [];
    existing.unshift(report);
    const trimmed = existing.slice(0, MAX_LOCAL_CRASHES);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(trimmed));
  } catch (e) {
    console.warn('[CrashTelemetry] Local storage write failed:', e);
  }
}

/**
 * Send crash incident telemetry to backend API or Sentry
 */
async function transmitCrashTelemetry(report) {
  const apiUrl = import.meta.env?.VITE_API_URL 
    ? `${import.meta.env.VITE_API_URL}/crashes/` 
    : '/api/crashes/';

  try {
    // Attempt modern beacon if payload is small, else fetch
    const payload = JSON.stringify({
      incident_id: report.incidentId,
      error_message: report.message,
      stack_trace: report.stack,
      component_stack: report.componentStack,
      severity: report.severity,
      app_version: report.appVersion,
      url: report.url,
      viewport: report.viewport,
      metadata: report.metadata,
    });

    if (navigator.sendBeacon) {
      const blob = new Blob([payload], { type: 'application/json' });
      navigator.sendBeacon(apiUrl, blob);
    } else {
      fetch(apiUrl, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: payload,
        keepalive: true
      }).catch(() => {});
    }
  } catch (err) {
    console.warn('[CrashTelemetry] Telemetry sync skipped:', err);
  }
}

/**
 * Main Crash Capture Function
 */
export function captureCrash(error, errorInfo = {}, severity = 'error') {
  const incidentId = generateIncidentId();
  const errorMessage = error?.message || String(error) || 'Unknown runtime error';
  const stack = error?.stack || '';
  const componentStack = errorInfo?.componentStack || '';

  const report = {
    incidentId,
    message: errorMessage,
    stack: stack.substring(0, 4000),
    componentStack: componentStack.substring(0, 4000),
    severity,
    appVersion: APP_VERSION,
    url: window.location.href,
    pathname: window.location.pathname,
    viewport: `${window.innerWidth}x${window.innerHeight}`,
    userAgent: navigator.userAgent,
    timestamp: new Date().toISOString(),
    metadata: {
      online: navigator.onLine,
      memory: window.performance?.memory?.usedJSHeapSize || null,
      theme: localStorage.getItem('brixel_theme') || 'dark',
    }
  };

  console.error(`\x1b[31m[BrixelLabs CrashTelemetry]\x1b[0m Incident #${incidentId}:`, errorMessage);

  // 1. Persist locally for offline diagnostic availability
  persistCrashLocally(report);

  // 2. Dispatch telemetry to backend
  transmitCrashTelemetry(report);

  // 3. Dispatch global event for in-app UI listeners
  try {
    window.dispatchEvent(new CustomEvent('app-crash-detected', { detail: report }));
  } catch (e) {}

  return report;
}

/**
 * Initialize Global Error Listeners on application startup
 */
export function initCrashReporting() {
  if (typeof window === 'undefined') return;

  // Unhandled standard JavaScript errors
  window.addEventListener('error', (event) => {
    // Ignore cross-origin script load noise
    if (event.message === 'Script error.' && !event.filename) return;

    captureCrash(event.error || event.message, {
      filename: event.filename,
      lineno: event.lineno,
      colno: event.colno,
    }, 'error');
  });

  // Unhandled asynchronous Promise rejections
  window.addEventListener('unhandledrejection', (event) => {
    captureCrash(event.reason || 'Unhandled Promise Rejection', {}, 'warning');
  });

  console.log(`\x1b[36m[BrixelLabs CrashTelemetry]\x1b[0m Active from day one (v${APP_VERSION}).`);
}

/**
 * Retrieve local crash history for admin diagnosis
 */
export function getStoredCrashLogs() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch (e) {
    return [];
  }
}

/**
 * Clear stored crash logs
 */
export function clearStoredCrashLogs() {
  try {
    localStorage.removeItem(STORAGE_KEY);
  } catch (e) {}
}
