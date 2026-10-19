/**
 * BrixelLabs Input Sanitization & Anti-XSS Security Suite
 * Provides comprehensive client-side form input cleaning, entity encoding,
 * protocol sanitization, and header injection defense.
 */

const HTML_ENTITY_MAP = {
  '&': '&amp;',
  '<': '&lt;',
  '>': '&gt;',
  '"': '&quot;',
  "'": '&#x27;',
  '/': '&#x2F;',
  '`': '&#x60;',
};

/**
 * Escapes HTML characters to prevent Stored & Reflected Cross-Site Scripting (XSS).
 * @param {string} str - Raw user input string
 * @returns {string} Sanitized text safe for HTML rendering and JSON transmission
 */
export function escapeHtml(str) {
  if (typeof str !== 'string') return '';
  return str.replace(/[&<>"'/`]/g, (char) => HTML_ENTITY_MAP[char] || char);
}

/**
 * Sanitizes plain text inputs: trims, removes null bytes and control characters,
 * strips script tags, and normalizes excessive whitespace.
 * @param {string} input - Raw text input
 * @returns {string} Cleaned safe string
 */
export function sanitizeInput(input) {
  if (input === null || input === undefined) return '';
  if (typeof input !== 'string') input = String(input);

  return input
    // Remove null bytes
    .replace(/\0/g, '')
    // Remove ASCII control characters (except newline \n and tab \t)
    .replace(/[\x00-\x08\x0B\x0C\x0E-\x1F\x7F]/g, '')
    // Strip script and iframe tags
    .replace(/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi, '')
    .replace(/<iframe\b[^<]*(?:(?!<\/iframe>)<[^<]*)*<\/iframe>/gi, '')
    // Strip inline javascript: and vbscript: handlers
    .replace(/(javascript|vbscript|data):/gi, '')
    // Strip suspicious DOM event handlers (e.g. onerror=, onload=, onclick=)
    .replace(/\bon\w+\s*=/gi, '')
    .trim();
}

/**
 * Strict Email Sanitization. Defends against SMTP header injection,
 * CRLF injection, and illegal mailbox characters.
 * @param {string} email - Raw email string
 * @returns {string} Normalized clean email
 */
export function sanitizeEmail(email) {
  if (typeof email !== 'string') return '';
  return email
    .trim()
    .toLowerCase()
    // Strip CR, LF, and URL-encoded line breaks (prevents SMTP header injection)
    .replace(/[\r\n]/g, '')
    .replace(/(%0A|%0D)/gi, '')
    // Remove space characters inside email addresses
    .replace(/\s+/g, '');
}

/**
 * Validates email format according to RFC 5322 standard subset.
 * @param {string} email - Email to test
 * @returns {boolean} True if well-formed
 */
export function isValidEmail(email) {
  const clean = sanitizeEmail(email);
  const emailRegex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)+$/;
  return emailRegex.test(clean);
}

/**
 * Phone Number Sanitization. Allows only legitimate E.164 and international dial characters.
 * @param {string} phone - Raw phone input
 * @returns {string} Sanitized phone string
 */
export function sanitizePhone(phone) {
  if (typeof phone !== 'string') return '';
  // Whitelist: digits, leading +, spaces, parentheses, dashes, dots
  return phone.replace(/[^\d+()\s\-.]/g, '').trim();
}

/**
 * Safe External URL Sanitizer. Prevents JavaScript and data pseudo-protocols.
 * @param {string} url - Candidate URL
 * @returns {string} Clean URL or empty string if malicious
 */
export function sanitizeUrl(url) {
  if (typeof url !== 'string') return '';
  const trimmed = url.trim();
  if (!trimmed) return '';

  // Only permit legitimate HTTP/HTTPS/mailto/tel schemes
  if (/^(https?:|mailto:|tel:|\/)/i.test(trimmed)) {
    return trimmed;
  }
  return '';
}

/**
 * Recursively cleans and sanitizes all string properties in a payload object.
 * @param {object} obj - Form or API payload
 * @returns {object} Clean copy of object
 */
export function sanitizePayload(obj) {
  if (!obj || typeof obj !== 'object') return obj;

  if (Array.isArray(obj)) {
    return obj.map((item) => (typeof item === 'string' ? sanitizeInput(item) : sanitizePayload(item)));
  }

  const clean = {};
  for (const [key, value] of Object.entries(obj)) {
    if (typeof value === 'string') {
      if (key.toLowerCase().includes('email')) {
        clean[key] = sanitizeEmail(value);
      } else if (key.toLowerCase().includes('phone')) {
        clean[key] = sanitizePhone(value);
      } else if (key.toLowerCase().includes('url') || key.toLowerCase().includes('link')) {
        clean[key] = sanitizeUrl(value);
      } else {
        clean[key] = sanitizeInput(value);
      }
    } else if (typeof value === 'object' && value !== null) {
      clean[key] = sanitizePayload(value);
    } else {
      clean[key] = value;
    }
  }
  return clean;
}
