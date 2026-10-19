import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faXmark, faPaperPlane, faShieldHalved, faArrowRight, faTriangleExclamation, faCircleCheck } from '@fortawesome/free-solid-svg-icons';
import { adminStorage } from '../../utils/adminStorage';
import { apiClient } from '../../api/client';
import { trackFormSubmission } from '../../utils/analytics';
import { getStoredUTMParams } from '../../utils/utm';
import { TurnstileWidget } from './TurnstileWidget';
import { sanitizeInput, sanitizeEmail, isValidEmail } from '../../utils/sanitize';

export const ConsultationModal = ({ isOpen, onClose, navigate }) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    company: '',
    service: 'AI & Machine Learning Solutions',
    budget: '$10k - $25k',
    message: '',
    honeypot: ''
  });
  const [turnstileToken, setTurnstileToken] = useState('');
  const [hasAgreed, setHasAgreed] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formError, setFormError] = useState('');

  if (!isOpen) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    setFormError('');

    // Honeypot spam check
    if (formData.honeypot) {
      console.warn('Spam caught in consultation modal.');
      return;
    }

    const cleanName = sanitizeInput(formData.name);
    const cleanEmail = sanitizeEmail(formData.email);
    const cleanCompany = sanitizeInput(formData.company);
    const cleanMessage = sanitizeInput(formData.message);

    if (!cleanName || !cleanEmail) {
      setFormError('Please enter your name and email address.');
      return;
    }

    if (!isValidEmail(cleanEmail)) {
      setFormError('Please enter a valid email address.');
      return;
    }

    if (!hasAgreed) {
      setFormError('Please agree to the Terms of Service & Privacy Policy.');
      return;
    }

    setIsSubmitting(true);

    try {
      const utm = getStoredUTMParams();

      // 1. Save inquiry to Admin CRM with UTM data
      adminStorage.addInquiry({
        name: cleanName,
        email: cleanEmail,
        company: cleanCompany || '',
        service: formData.service || 'Full-Stack & AI Solutions',
        budget: formData.budget || '$10k - $25k',
        timeline: '1-2 Months',
        message: cleanMessage || 'Scheduled discovery consultation',
        source: 'Discovery Consultation Modal',
        ...utm
      });

      // 2. Sync with backend API
      apiClient.createInquiry({
        name: cleanName,
        email: cleanEmail,
        company: cleanCompany || '',
        service: formData.service,
        budget: formData.budget,
        message: cleanMessage || 'Discovery consultation request',
        source: 'Discovery Consultation Modal',
        turnstile_token: turnstileToken,
        ...utm
      }).catch(err => console.warn('API sync warning:', err));

      // 3. Track GA conversion
      trackFormSubmission('Consultation Modal', formData.service);

      // 4. Close modal and navigate to /thank-you
      onClose();

      if (navigate) {
        navigate('/thank-you');
      } else {
        window.history.pushState({}, '', '/thank-you');
        window.dispatchEvent(new PopStateEvent('popstate'));
        window.scrollTo({ top: 0, behavior: 'smooth' });
      }
    } catch (err) {
      console.error('Error submitting consultation:', err);
      setFormError('Unable to send request. Please try again or message us directly on WhatsApp.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-fadeIn">
      <div className="relative w-full max-w-lg rounded-2xl p-6 sm:p-8 border border-slate-700/80 shadow-2xl bg-[#030e1a]/95 backdrop-blur-xl">
        
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-5 right-5 p-2 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800/60 transition-colors cursor-pointer"
        >
          <FontAwesomeIcon icon={faXmark} className="w-4 h-4 text-slate-400 hover:text-white" />
        </button>

        <div>
          <div className="mb-5">
            <h3 className="text-xl sm:text-2xl font-bold text-white tracking-tight">
              Schedule a Free Consultation
            </h3>
            <p className="text-xs text-slate-300 mt-1">
              Tell us a bit about what you want to build and we'll reach out to schedule a friendly, no-pressure call.
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-3.5">
            {/* Honeypot */}
            <div className="hidden" aria-hidden="true">
              <input
                type="text"
                tabIndex="-1"
                autoComplete="off"
                value={formData.honeypot}
                onChange={(e) => setFormData({ ...formData, honeypot: e.target.value })}
              />
            </div>

            {formError && (
              <div className="p-3 rounded-xl bg-red-950/80 border border-red-500/40 text-red-200 text-xs flex items-center gap-2">
                <FontAwesomeIcon icon={faTriangleExclamation} className="text-red-400 flex-shrink-0" />
                <span>{formError}</span>
              </div>
            )}

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-medium text-slate-300 mb-1">
                  Your Name <span className="text-cyan-400">*</span>
                </label>
                <input
                  type="text"
                  required
                  placeholder="Your name"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-slate-900/70 border border-slate-700/60 text-white placeholder-slate-500 focus:outline-none focus:border-cyan-400 focus:ring-1 focus:ring-cyan-400/20 text-sm transition-all"
                />
              </div>

              <div>
                <label className="block text-xs font-medium text-slate-300 mb-1">
                  Company / Organization <span className="text-cyan-400">*</span>
                </label>
                <input
                  type="text"
                  required
                  placeholder="Company or brand"
                  value={formData.company}
                  onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-slate-900/70 border border-slate-700/60 text-white placeholder-slate-500 focus:outline-none focus:border-cyan-400 focus:ring-1 focus:ring-cyan-400/20 text-sm transition-all"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-medium text-slate-300 mb-1">
                Email Address <span className="text-cyan-400">*</span>
              </label>
              <input
                type="email"
                required
                placeholder="you@company.com"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                className="w-full px-3.5 py-2.5 rounded-xl bg-slate-900/70 border border-slate-700/60 text-white placeholder-slate-500 focus:outline-none focus:border-cyan-400 focus:ring-1 focus:ring-cyan-400/20 text-sm transition-all"
              />
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-medium text-slate-300 mb-1">Service Area</label>
                <select
                  value={formData.service}
                  onChange={(e) => setFormData({ ...formData, service: e.target.value })}
                  className="w-full px-3 py-2.5 rounded-xl bg-slate-900/70 border border-slate-700/60 text-white text-xs focus:outline-none focus:border-cyan-400 focus:ring-1 focus:ring-cyan-400/20 transition-all"
                >
                  <option>AI &amp; Machine Learning Solutions</option>
                  <option>Smart Chatbots &amp; WhatsApp Assistants</option>
                  <option>Computer Vision &amp; Camera Quality AI</option>
                  <option>AI Agents &amp; AI Automations</option>
                  <option>Web &amp; Mobile App Development</option>
                  <option>Custom Software &amp; SaaS Development</option>
                  <option>Shopify Store Development</option>
                  <option>API Development &amp; System Integration</option>
                  <option>Web Scraping &amp; Data Extraction</option>
                  <option>Data Analytics &amp; Dashboards</option>
                  <option>UI/UX Design &amp; Prototyping</option>
                </select>
              </div>
              <div>
                <label className="block text-xs font-medium text-slate-300 mb-1">Estimated Budget</label>
                <select
                  value={formData.budget}
                  onChange={(e) => setFormData({ ...formData, budget: e.target.value })}
                  className="w-full px-3 py-2.5 rounded-xl bg-slate-900/70 border border-slate-700/60 text-white text-xs focus:outline-none focus:border-cyan-400 focus:ring-1 focus:ring-cyan-400/20 transition-all"
                >
                  <option>&lt; $1,000</option>
                  <option>$1,000 - $3,000</option>
                  <option>$3,000 - $10,000</option>
                  <option>$10,000+</option>
                  <option>Flexible / To Discuss</option>
                </select>
              </div>
            </div>

            <div>
              <label className="block text-xs font-medium text-slate-300 mb-1">Project Details</label>
              <textarea
                rows={3}
                placeholder="Tell us what you'd like to build, your goals, or any specific questions..."
                value={formData.message}
                onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                className="w-full px-3.5 py-2.5 rounded-xl bg-slate-900/70 border border-slate-700/60 text-white placeholder-slate-500 focus:outline-none focus:border-cyan-400 focus:ring-1 focus:ring-cyan-400/20 text-sm resize-none transition-all"
              ></textarea>
            </div>

            {/* Cloudflare Turnstile Bot Defense */}
            <TurnstileWidget 
              onVerify={(token) => setTurnstileToken(token)}
              onError={() => setTurnstileToken('dev-fallback-token')}
              size="normal"
            />

            <div className="pt-1 pb-1">
              <label className="flex items-start gap-2 cursor-pointer select-none">
                <input
                  type="checkbox"
                  required
                  checked={hasAgreed}
                  onChange={(e) => setHasAgreed(e.target.checked)}
                  className="mt-0.5 accent-cyan-400 w-3.5 h-3.5 cursor-pointer rounded flex-shrink-0"
                />
                <span className="text-[11px] text-slate-300 leading-snug">
                  I agree to the{' '}
                  <a 
                    href="/terms-of-service" 
                    onClick={(e) => { e.preventDefault(); onClose(); navigate('/terms-of-service'); }} 
                    className="text-cyan-400 underline hover:text-cyan-300"
                  >
                    Terms
                  </a>
                  {' '}&amp;{' '}
                  <a 
                    href="/privacy-policy" 
                    onClick={(e) => { e.preventDefault(); onClose(); navigate('/privacy-policy'); }} 
                    className="text-cyan-400 underline hover:text-cyan-300"
                  >
                    Privacy Policy
                  </a>, and confirm I am 18+ years of age.
                </span>
              </label>
            </div>

            <button
              type="submit"
              disabled={isSubmitting}
              className="btn-primary w-full disabled:opacity-60 flex items-center justify-center gap-2"
            >
              {isSubmitting ? (
                <span>Scheduling consultation...</span>
              ) : (
                <>
                  <span>Book Free Consultation</span>
                  <FontAwesomeIcon icon={faArrowRight} className="w-3.5 h-3.5" />
                </>
              )}
            </button>

            <p className="text-center text-[11px] text-slate-400 pt-1">
              Free 30-min call · No sales pressure · 100% confidential
            </p>
          </form>
        </div>
      </div>
    </div>
  );
};
