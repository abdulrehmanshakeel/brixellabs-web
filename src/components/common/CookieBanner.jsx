import React, { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faXmark } from '@fortawesome/free-solid-svg-icons';
import { motion, AnimatePresence } from 'framer-motion';
import { showToast } from './Toast';

export const CookieBanner = ({ navigate }) => {
  const [isVisible, setIsVisible] = useState(false);
  const [isPreferencesOpen, setIsPreferencesOpen] = useState(false);
  const [preferences, setPreferences] = useState({
    essential: true, // Always active
    analytics: true,
    functional: true
  });

  useEffect(() => {
    try {
      const stored = localStorage.getItem('brixel_cookie_consent');
      if (stored) {
        try {
          const parsed = JSON.parse(stored);
          if (typeof parsed === 'object' && parsed !== null) {
            setPreferences({
              essential: true,
              analytics: parsed.analytics !== false,
              functional: parsed.functional !== false
            });
          }
        } catch {
          setPreferences({
            essential: true,
            analytics: stored === 'all',
            functional: stored === 'all'
          });
        }
      } else {
        const timer = setTimeout(() => setIsVisible(true), 1200);
        return () => clearTimeout(timer);
      }
    } catch (e) {
      // ignore
    }
  }, []);

  useEffect(() => {
    const handleOpen = () => {
      setIsVisible(true);
      setIsPreferencesOpen(true);
    };

    window.addEventListener('brixel_open_cookie_preferences', handleOpen);
    return () => window.removeEventListener('brixel_open_cookie_preferences', handleOpen);
  }, []);

  const saveConsent = (analyticsVal, functionalVal) => {
    const payload = {
      essential: true,
      analytics: analyticsVal,
      functional: functionalVal,
      date: new Date().toISOString()
    };

    try {
      localStorage.setItem('brixel_cookie_consent', JSON.stringify(payload));
      localStorage.setItem('brixel_cookie_consent_date', payload.date);
    } catch (e) {
      // ignore
    }

    if (typeof window !== 'undefined') {
      window['ga-disable-G-BRIXELLABS01'] = !analyticsVal;
    }

    setPreferences({
      essential: true,
      analytics: analyticsVal,
      functional: functionalVal
    });

    setIsPreferencesOpen(false);
    setIsVisible(false);
    showToast('Preferences saved', 'success', 2500);
  };

  const handleAcceptAll = () => saveConsent(true, true);
  const handleEssentialOnly = () => saveConsent(false, false);
  const handleSaveCustom = () => saveConsent(preferences.analytics, preferences.functional);

  if (!isVisible) return null;

  return (
    <AnimatePresence>
      <div 
        className="fixed inset-0 z-[99990] flex items-end sm:items-center justify-center p-4 sm:p-6 pointer-events-none"
        role="region"
        aria-label="Cookie preferences"
      >
        {/* Subtle backdrop */}
        {isPreferencesOpen && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setIsPreferencesOpen(false)}
            className="fixed inset-0 bg-black/60 backdrop-blur-sm pointer-events-auto"
          />
        )}

        {/* Modal / Banner Card */}
        <motion.div
          initial={{ opacity: 0, y: 15, scale: 0.98 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 10, scale: 0.98 }}
          transition={{ duration: 0.2, ease: 'easeOut' }}
          className={`pointer-events-auto w-full rounded-xl bg-[#090d14] border border-white/10 shadow-2xl shadow-black/80 text-zinc-300 overflow-hidden relative z-10 ${
            !isPreferencesOpen ? 'max-w-xl' : 'max-w-lg'
          }`}
        >
          {isPreferencesOpen ? (
            /* Clean, Human Preferences Panel (Stripe/Linear style) */
            <div className="flex flex-col">
              {/* Header */}
              <div className="flex items-center justify-between px-6 pt-5 pb-3">
                <div>
                  <h3 className="text-base font-semibold text-white tracking-tight">
                    Cookie settings
                  </h3>
                  <p className="text-xs text-zinc-400 mt-0.5">
                    Choose which cookies you allow us to use on this device.
                  </p>
                </div>
                <button
                  type="button"
                  onClick={() => setIsPreferencesOpen(false)}
                  className="text-zinc-400 hover:text-white p-1 rounded-md transition-colors cursor-pointer"
                  aria-label="Close"
                >
                  <FontAwesomeIcon icon={faXmark} className="text-sm" />
                </button>
              </div>

              {/* Body */}
              <div className="px-6 py-2 divide-y divide-white/[0.06]">
                {/* 1. Necessary */}
                <div className="py-4 flex items-start justify-between gap-4">
                  <div className="space-y-1 pr-2">
                    <div className="flex items-center gap-2">
                      <span className="text-sm font-medium text-white">Strictly necessary</span>
                    </div>
                    <p className="text-xs text-zinc-400 leading-relaxed">
                      Essential for navigation, security, and remembering your privacy choices. Always enabled.
                    </p>
                  </div>
                  <span className="text-[11px] font-medium text-zinc-400 bg-white/[0.04] border border-white/[0.08] px-2.5 py-1 rounded-full whitespace-nowrap shrink-0 mt-0.5">
                    Required
                  </span>
                </div>

                {/* 2. Analytics */}
                <div className="py-4 flex items-start justify-between gap-4">
                  <div className="space-y-1 pr-2">
                    <span className="text-sm font-medium text-white">Analytics</span>
                    <p className="text-xs text-zinc-400 leading-relaxed">
                      Collects anonymous information on how you use our site to help us improve performance and content.
                    </p>
                  </div>
                  <label className="relative inline-flex items-center cursor-pointer shrink-0 mt-0.5">
                    <input
                      type="checkbox"
                      checked={preferences.analytics}
                      onChange={(e) => setPreferences({ ...preferences, analytics: e.target.checked })}
                      className="sr-only peer"
                    />
                    <div className="w-9 h-5 bg-zinc-800 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:bg-white after:peer-checked:bg-zinc-950"></div>
                  </label>
                </div>

                {/* 3. Preferences */}
                <div className="py-4 flex items-start justify-between gap-4">
                  <div className="space-y-1 pr-2">
                    <span className="text-sm font-medium text-white">Preferences</span>
                    <p className="text-xs text-zinc-400 leading-relaxed">
                      Remembers your personal settings and prevents repetitive notices on future visits.
                    </p>
                  </div>
                  <label className="relative inline-flex items-center cursor-pointer shrink-0 mt-0.5">
                    <input
                      type="checkbox"
                      checked={preferences.functional}
                      onChange={(e) => setPreferences({ ...preferences, functional: e.target.checked })}
                      className="sr-only peer"
                    />
                    <div className="w-9 h-5 bg-zinc-800 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:bg-white after:peer-checked:bg-zinc-950"></div>
                  </label>
                </div>
              </div>

              {/* Footer */}
              <div className="px-6 py-4 bg-white/[0.02] border-t border-white/[0.06] flex items-center justify-between gap-3">
                <button
                  type="button"
                  onClick={handleEssentialOnly}
                  className="text-xs font-medium text-zinc-400 hover:text-white transition-colors cursor-pointer"
                >
                  Reject all
                </button>
                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    onClick={handleAcceptAll}
                    className="px-3.5 py-1.5 rounded-lg text-xs font-medium text-zinc-200 bg-white/[0.05] hover:bg-white/[0.09] border border-white/10 transition-colors cursor-pointer"
                  >
                    Accept all
                  </button>
                  <button
                    type="button"
                    onClick={handleSaveCustom}
                    className="px-4 py-1.5 rounded-lg text-xs font-semibold text-zinc-950 bg-white hover:bg-zinc-200 transition-colors cursor-pointer shadow-sm"
                  >
                    Save preferences
                  </button>
                </div>
              </div>
            </div>
          ) : (
            /* Clean Compact Bottom Banner */
            <div className="p-5 sm:p-6 space-y-4">
              <div className="space-y-1.5">
                <h3 className="text-sm font-semibold text-white tracking-tight">
                  We value your privacy
                </h3>
                <p className="text-xs text-zinc-400 leading-relaxed">
                  We use cookies to improve your browsing experience and analyze site traffic. We never sell your personal data or use cross-site tracking.{' '}
                  <a
                    href="/cookie-policy"
                    onClick={(e) => {
                      if (navigate) {
                        e.preventDefault();
                        navigate('/cookie-policy');
                        window.scrollTo({ top: 0, behavior: 'smooth' });
                      }
                    }}
                    className="text-zinc-200 underline hover:text-white"
                  >
                    Cookie Policy
                  </a>.
                </p>
              </div>

              <div className="flex flex-wrap items-center justify-between gap-3 pt-1">
                <button
                  type="button"
                  onClick={() => setIsPreferencesOpen(true)}
                  className="text-xs font-medium text-zinc-400 hover:text-white transition-colors cursor-pointer underline underline-offset-2"
                >
                  Manage preferences
                </button>

                <div className="flex items-center gap-2 ml-auto">
                  <button
                    type="button"
                    onClick={handleEssentialOnly}
                    className="px-3.5 py-1.5 rounded-lg text-xs font-medium text-zinc-300 bg-white/[0.05] hover:bg-white/[0.09] border border-white/10 transition-colors cursor-pointer"
                  >
                    Necessary only
                  </button>
                  <button
                    type="button"
                    onClick={handleAcceptAll}
                    className="px-4 py-1.5 rounded-lg text-xs font-semibold text-zinc-950 bg-white hover:bg-zinc-200 transition-colors cursor-pointer shadow-sm"
                  >
                    Accept all
                  </button>
                </div>
              </div>
            </div>
          )}
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
