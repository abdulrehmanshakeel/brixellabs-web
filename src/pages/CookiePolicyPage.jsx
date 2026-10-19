import React, { useEffect, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { 
  faCheck, 
  faArrowLeft 
} from '@fortawesome/free-solid-svg-icons';
import { motion } from 'framer-motion';

export const CookiePolicyPage = ({ navigate }) => {
  const [currentConsent, setCurrentConsent] = useState('essential');
  const [showNotice, setShowNotice] = useState(false);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
    document.title = 'Cookie Policy & Consent Settings | BrixelLabs';

    try {
      const stored = localStorage.getItem('brixel_cookie_consent') || 'essential';
      setCurrentConsent(stored);
    } catch (e) {
      // ignore
    }
  }, []);

  const handleUpdateConsent = (newChoice) => {
    try {
      localStorage.setItem('brixel_cookie_consent', newChoice);
      localStorage.setItem('brixel_cookie_consent_date', new Date().toISOString());
      setCurrentConsent(newChoice);
      setShowNotice(true);
      setTimeout(() => setShowNotice(false), 3500);
    } catch (e) {
      // ignore
    }
  };

  return (
    <div className="relative pt-32 sm:pt-40 pb-24 px-4 sm:px-6 lg:px-8 max-w-3xl mx-auto z-10 text-slate-300">
      
      {/* Header */}
      <div className="mb-10 space-y-3">
        <motion.h1 
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white tracking-tight"
        >
          Cookie Policy
        </motion.h1>

        <motion.p 
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="text-sm sm:text-base text-slate-400 font-normal leading-relaxed"
        >
          Learn how we use cookies and related technologies, what data is collected, and how you can manage your preferences on BrixelLabs.
        </motion.p>
        <p className="text-xs text-slate-500 font-mono">
          Last revised: October 2026
        </p>
      </div>

      {/* Preferences Controls (Flat, unboxed) */}
      <div className="py-6 border-y border-white/10 mb-12 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-sm font-semibold text-white">Your current setting</h2>
          <p className="text-xs text-slate-400 mt-0.5">
            {currentConsent === 'all' 
              ? 'All cookies accepted (Essential & Analytics enabled)' 
              : 'Essential cookies only (Analytics disabled)'}
          </p>
        </div>

        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={() => handleUpdateConsent('essential')}
            className={`px-3.5 py-1.5 rounded-lg text-xs font-medium border transition-colors cursor-pointer ${
              currentConsent === 'essential'
                ? 'bg-white text-zinc-950 font-semibold border-white shadow-sm'
                : 'bg-transparent text-slate-400 border-white/10 hover:text-white hover:bg-white/[0.04]'
            }`}
          >
            Essential only
          </button>
          <button
            type="button"
            onClick={() => handleUpdateConsent('all')}
            className={`px-3.5 py-1.5 rounded-lg text-xs font-medium border transition-colors cursor-pointer ${
              currentConsent === 'all'
                ? 'bg-white text-zinc-950 font-semibold border-white shadow-sm'
                : 'bg-transparent text-slate-400 border-white/10 hover:text-white hover:bg-white/[0.04]'
            }`}
          >
            Accept all
          </button>
        </div>
      </div>

      {showNotice && (
        <div className="mb-8 p-3 rounded-lg bg-emerald-950/60 border border-emerald-500/30 text-emerald-300 text-xs flex items-center gap-2">
          <FontAwesomeIcon icon={faCheck} className="text-emerald-400" />
          <span>Your preferences have been updated successfully.</span>
        </div>
      )}

      {/* Editorial Content Flow (No boxed data cards) */}
      <div className="space-y-12 leading-relaxed text-sm">
        
        {/* Section 1 */}
        <section className="space-y-3">
          <h2 className="text-xl font-bold text-white tracking-tight">
            1. What Are Cookies?
          </h2>
          <p className="text-slate-300">
            Cookies are small text files stored on your browser or device by websites you visit. They allow websites to recognize your device, maintain security, remember user settings, and understand aggregate traffic patterns.
          </p>
          <p className="text-slate-400 text-xs leading-relaxed">
            We use both session cookies (which expire once you close your browser) and persistent cookies (which remain on your device until they expire or are manually cleared) to operate our platform securely.
          </p>
        </section>

        {/* Section 2 */}
        <section className="space-y-4">
          <h2 className="text-xl font-bold text-white tracking-tight">
            2. Strictly Necessary Cookies
          </h2>
          <p className="text-slate-300">
            Strictly necessary cookies are essential for the operation of our website. Without them, core functions such as secure contact form submissions, Cloudflare bot verification, and preserving your privacy choices cannot be provided. These cookies do not track your browsing habits across third-party websites.
          </p>

          <div className="space-y-4 pt-2">
            <div className="border-l-2 border-white/20 pl-4 space-y-1">
              <div className="flex items-center gap-2 text-white font-medium text-xs sm:text-sm">
                <span>Cloudflare Turnstile Verification</span>
                <span className="text-[11px] text-slate-500 font-mono">(`cf_clearance`, `__cf_bm`)</span>
              </div>
              <p className="text-xs text-slate-400">
                Protects forms and API endpoints from automated spam and distributed attacks without tracking personal identity. Typically stored for up to 1 year.
              </p>
            </div>

            <div className="border-l-2 border-white/20 pl-4 space-y-1">
              <div className="flex items-center gap-2 text-white font-medium text-xs sm:text-sm">
                <span>Privacy Preference Storage</span>
                <span className="text-[11px] text-slate-500 font-mono">(`brixel_cookie_consent`)</span>
              </div>
              <p className="text-xs text-slate-400">
                Saves your choice between essential and analytics cookies so you are not asked repeatedly on subsequent page visits. Stored for 12 months.
              </p>
            </div>

            <div className="border-l-2 border-white/20 pl-4 space-y-1">
              <div className="flex items-center gap-2 text-white font-medium text-xs sm:text-sm">
                <span>Attribution Parameters</span>
                <span className="text-[11px] text-slate-500 font-mono">(`brixel_utm_campaign`)</span>
              </div>
              <p className="text-xs text-slate-400">
                Transiently records campaign source and medium parameters strictly to route project inquiries to the appropriate engineering team. Stored for 30 days.
              </p>
            </div>
          </div>
        </section>

        {/* Section 3 */}
        <section className="space-y-4">
          <h2 className="text-xl font-bold text-white tracking-tight">
            3. Performance &amp; Analytics Cookies
          </h2>
          <p className="text-slate-300">
            Performance cookies collect aggregated, anonymous information on how visitors interact with our technical case studies and service pages. This data helps us optimize page load times, detect broken links, and measure content relevance.
          </p>

          <div className="space-y-4 pt-2">
            <div className="border-l-2 border-white/20 pl-4 space-y-1">
              <div className="flex items-center gap-2 text-white font-medium text-xs sm:text-sm">
                <span>Google Analytics 4</span>
                <span className="text-[11px] text-slate-500 font-mono">(`_ga`, `_ga_*`)</span>
              </div>
              <p className="text-xs text-slate-400">
                Collects aggregate metrics such as page visits and general device categories. We configure Google Analytics with strict IP anonymization enabled. You can disable this cookie at any time using the toggle controls above.
              </p>
            </div>

            <div className="border-l-2 border-white/20 pl-4 space-y-1">
              <div className="flex items-center gap-2 text-white font-medium text-xs sm:text-sm">
                <span>Application Versioning Cache</span>
                <span className="text-[11px] text-slate-500 font-mono">(`brixel_app_v`)</span>
              </div>
              <p className="text-xs text-slate-400">
                Maintains client build hashes to automatically detect stale cached scripts when new features are deployed. Session duration only.
              </p>
            </div>
          </div>
        </section>

        {/* Section 4 */}
        <section className="space-y-3">
          <h2 className="text-xl font-bold text-white tracking-tight">
            4. No Advertising or Cross-Site Tracking
          </h2>
          <p className="text-slate-300">
            BrixelLabs maintains a strict policy against invasive advertising and third-party data monetization:
          </p>
          <ul className="list-disc list-inside space-y-1.5 text-slate-400 text-xs pl-1">
            <li>We do not deploy third-party advertising retargeting pixels (such as Meta, TikTok, or Google Ads).</li>
            <li>We do not sell, rent, or trade visitor data with data brokers or marketing exchanges.</li>
            <li>We do not profile visitors across external websites.</li>
          </ul>
        </section>

        {/* Section 5 */}
        <section className="space-y-3">
          <h2 className="text-xl font-bold text-white tracking-tight">
            5. Managing Cookies in Your Browser
          </h2>
          <p className="text-slate-300">
            In addition to our on-site controls, most web browsers allow you to manage or delete stored cookies through their preferences. You can configure your browser to reject all cookies or alert you when a cookie is placed.
          </p>
          <p className="text-xs text-slate-400 leading-relaxed">
            To manage cookies directly, check the settings or privacy menu in Chrome, Safari, Firefox, Brave, or Microsoft Edge. Please note that completely disabling essential cookies may impact security verification forms.
          </p>
        </section>

      </div>

      {/* Footer Navigation */}
      <div className="mt-16 pt-8 border-t border-white/10 flex flex-wrap items-center justify-between gap-4 text-xs">
        <div className="flex flex-wrap items-center gap-3">
          <button
            type="button"
            onClick={() => navigate('/privacy-policy')}
            className="text-slate-400 hover:text-white transition-colors underline cursor-pointer"
          >
            Privacy Policy
          </button>
          <span className="text-slate-600">·</span>
          <button
            type="button"
            onClick={() => navigate('/terms-of-service')}
            className="text-slate-400 hover:text-white transition-colors underline cursor-pointer"
          >
            Terms of Service
          </button>
          <span className="text-slate-600">·</span>
          <button
            type="button"
            onClick={() => navigate('/data-deletion')}
            className="text-slate-400 hover:text-white transition-colors underline cursor-pointer"
          >
            Data Deletion
          </button>
        </div>

        <button
          type="button"
          onClick={() => navigate('/')}
          className="inline-flex items-center gap-2 text-white hover:text-cyan-300 font-semibold cursor-pointer"
        >
          <FontAwesomeIcon icon={faArrowLeft} className="w-3.5 h-3.5" />
          <span>Return to Homepage</span>
        </button>
      </div>

    </div>
  );
};

export default CookiePolicyPage;
