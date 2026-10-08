// Google Analytics 4 (GA4) Unified Tracking Helper
// Configurable via VITE_GA_MEASUREMENT_ID or window.GA_MEASUREMENT_ID

export const GA_MEASUREMENT_ID = 
  import.meta.env.VITE_GA_MEASUREMENT_ID || 
  (typeof window !== 'undefined' && window.GA_MEASUREMENT_ID) || 
  'G-BRIXELLABS01';

/**
 * Initializes Google Analytics gtag if not already present
 */
export const initGA = () => {
  if (typeof window === 'undefined') return;

  if (!window.dataLayer) {
    window.dataLayer = window.dataLayer || [];
  }

  if (!window.gtag) {
    window.gtag = function () {
      window.dataLayer.push(arguments);
    };
    window.gtag('js', new Date());
    window.gtag('config', GA_MEASUREMENT_ID, {
      send_page_view: false, // We handle manual SPA route tracking
      anonymize_ip: true,
      cookie_flags: 'SameSite=None;Secure'
    });
  }
};

/**
 * Track route change page view in SPA
 * @param {string} path - current route path (e.g. '/case-studies/noesis')
 * @param {string} title - page title
 */
export const trackPageView = (path, title) => {
  if (typeof window === 'undefined') return;
  
  initGA();

  if (window.gtag) {
    window.gtag('event', 'page_view', {
      page_title: title || document.title,
      page_location: window.location.href,
      page_path: path || window.location.pathname,
    });
  }
};

/**
 * Track custom event (e.g. CTA click, video play, form submission)
 * @param {string} action - Event action name
 * @param {object} params - Event parameters
 */
export const trackEvent = (action, params = {}) => {
  if (typeof window === 'undefined') return;

  initGA();

  if (window.gtag) {
    window.gtag('event', action, {
      ...params,
      timestamp: new Date().toISOString()
    });
  }
};

/**
 * Convenience method for contact and consultation form submissions
 */
export const trackFormSubmission = (formName, service = 'General Inquiry') => {
  trackEvent('generate_lead', {
    event_category: 'Engagement',
    event_label: formName,
    service_interest: service,
    value: 1
  });
};

/**
 * Track user viewing a case study
 */
export const trackCaseStudyView = (caseStudyId, caseStudyTitle) => {
  trackEvent('view_item', {
    event_category: 'Case Study',
    event_label: caseStudyTitle,
    item_id: caseStudyId
  });
};
