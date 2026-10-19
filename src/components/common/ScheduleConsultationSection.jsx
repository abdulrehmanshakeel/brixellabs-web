import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { 
  faArrowRight,
  faEnvelope,
  faPhone,
  faShieldHalved
} from '@fortawesome/free-solid-svg-icons';
import { adminStorage } from '../../utils/adminStorage';
import { apiClient } from '../../api/client';
import { trackFormSubmission } from '../../utils/analytics';
import { TurnstileWidget } from './TurnstileWidget';
import { sanitizeInput, sanitizeEmail, isValidEmail } from '../../utils/sanitize';

export const ScheduleConsultationSection = ({ 
  title = "Schedule a Consultation", 
  subtitle = "Direct evaluation with lead engineers covering architecture, custom AI models, and delivery timelines.",
  className = ""
}) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    company: '',
    service: 'AI & Machine Learning Solutions',
    projectBrief: '',
    honeypot: ''
  });
  const [turnstileToken, setTurnstileToken] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();

    if (formData.honeypot) {
      console.warn('Bot spam caught by honeypot.');
      return;
    }

    const cleanName = sanitizeInput(formData.name);
    const cleanEmail = sanitizeEmail(formData.email);
    const cleanCompany = sanitizeInput(formData.company);
    const cleanBrief = sanitizeInput(formData.projectBrief);

    if (!cleanName || !cleanEmail) return;
    if (!isValidEmail(cleanEmail)) {
      alert('Please enter a valid email address.');
      return;
    }

    setIsSubmitting(true);

    try {
      adminStorage.addInquiry({
        name: cleanName,
        email: cleanEmail,
        company: cleanCompany || '',
        service: formData.service || 'Consultation & Architecture',
        budget: '$15,000 - $35,000',
        timeline: '2-3 Weeks',
        message: cleanBrief || '',
        source: 'Schedule Consultation Section'
      });

      apiClient.createInquiry({
        name: cleanName,
        email: cleanEmail,
        company: cleanCompany || '',
        service: formData.service || 'Consultation & Architecture',
        message: cleanBrief || '',
        source: 'Schedule Consultation Section',
        turnstile_token: turnstileToken
      }).catch(err => console.warn('API inquiry sync:', err));

      trackFormSubmission('Schedule Consultation Section', formData.service || 'Consultation & Architecture');

      setIsSubmitted(true);
      window.history.pushState({}, '', '/thank-you');
      window.dispatchEvent(new PopStateEvent('popstate'));
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } catch (err) {
      console.error('Error submitting consultation:', err);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section className={`relative py-16 sm:py-24 border-t border-slate-800/80 ${className}`} id="consultation">
      <div className="max-w-4xl mx-auto px-4 sm:px-6">
        
        {/* Header: Focused & Balanced */}
        <div className="text-center mb-10 sm:mb-12 space-y-3">
          <h2 className="font-heading text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white tracking-tight leading-tight">
            {title}
          </h2>
          
          <p className="text-sm sm:text-base text-slate-300 max-w-2xl mx-auto font-normal leading-relaxed">
            {subtitle}
          </p>
        </div>

        {isSubmitted ? (
          <div className="p-8 rounded-2xl bg-cyan-950/30 border border-cyan-500/30 text-center space-y-4">
            <div className="w-16 h-16 rounded-full bg-cyan-500/20 text-cyan-400 flex items-center justify-center mx-auto text-2xl">
              ✓
            </div>
            <h3 className="text-2xl font-bold text-white">Consultation Request Received!</h3>
            <p className="text-slate-300 max-w-lg mx-auto text-sm leading-relaxed">
              Thank you for reaching out. One of our lead software architects will review your project details and connect with you within 24 hours.
            </p>
            <div className="pt-2 flex flex-wrap justify-center gap-3">
              <a
                href="tel:+923449254864"
                className="px-5 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-white text-xs font-semibold flex items-center gap-2 border border-slate-700"
              >
                <FontAwesomeIcon icon={faPhone} className="text-cyan-400" />
                <span>Direct Call: +92 344 9254864</span>
              </a>
              <button
                type="button"
                onClick={() => {
                  setIsSubmitted(false);
                  setFormData({ name: '', email: '', company: '', service: 'AI & Machine Learning Solutions', projectBrief: '', honeypot: '' });
                }}
                className="px-5 py-2.5 rounded-xl bg-cyan-500/10 hover:bg-cyan-500/20 text-cyan-300 text-xs font-semibold border border-cyan-500/30"
              >
                Send Another Request
              </button>
            </div>
          </div>
        ) : (
          /* The Open Form (No Card Box) */
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Bot Trapping Honeypot */}
            <div className="hidden" aria-hidden="true">
              <input
                type="text"
                tabIndex="-1"
                autoComplete="off"
                value={formData.honeypot}
                onChange={(e) => setFormData({ ...formData, honeypot: e.target.value })}
              />
            </div>

            {/* Row 1: Name and Email */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-medium text-slate-300 mb-1.5">
                  Your Name <span className="text-cyan-400">*</span>
                </label>
                <input
                  type="text"
                  required
                  placeholder="Full Name"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="w-full px-4 py-3 rounded-xl bg-slate-900/60 border border-slate-800 hover:border-slate-700 text-white placeholder-slate-500 text-sm focus:outline-none focus:border-cyan-400 focus:ring-1 focus:ring-cyan-400/20 transition-all"
                />
              </div>

              <div>
                <label className="block text-xs font-medium text-slate-300 mb-1.5">
                  Email Address <span className="text-cyan-400">*</span>
                </label>
                <input
                  type="email"
                  required
                  placeholder="name@company.com"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className="w-full px-4 py-3 rounded-xl bg-slate-900/60 border border-slate-800 hover:border-slate-700 text-white placeholder-slate-500 text-sm focus:outline-none focus:border-cyan-400 focus:ring-1 focus:ring-cyan-400/20 transition-all"
                />
              </div>
            </div>

            {/* Row 2: Company and What are you looking to build? */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-medium text-slate-300 mb-1.5">
                  Company / Organization <span className="text-slate-500 font-normal">(Optional)</span>
                </label>
                <input
                  type="text"
                  placeholder="Company Name"
                  value={formData.company}
                  onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                  className="w-full px-4 py-3 rounded-xl bg-slate-900/60 border border-slate-800 hover:border-slate-700 text-white placeholder-slate-500 text-sm focus:outline-none focus:border-cyan-400 focus:ring-1 focus:ring-cyan-400/20 transition-all"
                />
              </div>

            <div>
              <label className="block text-xs font-medium text-slate-300 mb-1.5">
                What are you looking to build? <span className="text-cyan-400">*</span>
              </label>
              <div className="relative">
                <select
                  value={formData.service}
                  onChange={(e) => setFormData({ ...formData, service: e.target.value })}
                  className="w-full px-4 py-3 rounded-xl bg-slate-900/60 border border-slate-800 hover:border-slate-700 text-white text-sm focus:outline-none focus:border-cyan-400 focus:ring-1 focus:ring-cyan-400/20 transition-all appearance-none cursor-pointer pr-10"
                >
                  <option value="AI & Machine Learning Solutions">AI &amp; Machine Learning Solutions</option>
                  <option value="Computer Vision & Camera AI">Computer Vision &amp; Camera AI</option>
                  <option value="Shopify Store Development">Shopify Store Development &amp; Custom Themes</option>
                  <option value="AI Agents & AI Automations">AI Agents &amp; AI Automations</option>
                  <option value="Custom Software & SaaS Development">Custom Software &amp; SaaS Development</option>
                  <option value="Full-Stack Web & Mobile Apps">Full-Stack Web &amp; Mobile Apps</option>
                  <option value="Custom API Development & Integrations">Custom API Development &amp; Integrations</option>
                  <option value="Cloud Infrastructure & Databases">Cloud Infrastructure &amp; Databases</option>
                  <option value="General Project Consultation">General Project Consultation</option>
                </select>
                <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-3.5 text-slate-400">
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                  </svg>
                </div>
              </div>
            </div>
          </div>

          {/* Project Requirements */}
          <div>
            <label className="block text-xs font-medium text-slate-300 mb-1.5">
              How can we help? <span className="text-slate-500 font-normal">(Brief project description)</span>
            </label>
            <textarea
              rows={3}
              placeholder="Describe your project requirements, scope, or key goals..."
              value={formData.projectBrief}
              onChange={(e) => setFormData({ ...formData, projectBrief: e.target.value })}
              className="w-full px-4 py-3 rounded-xl bg-slate-900/60 border border-slate-800 hover:border-slate-700 text-white placeholder-slate-500 text-sm focus:outline-none focus:border-cyan-400 focus:ring-1 focus:ring-cyan-400/20 transition-all resize-none"
            />
          </div>

          {/* Verification & Submit Action */}
          <div className="pt-2 space-y-4">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div className="shrink-0 flex justify-center sm:justify-start">
                <TurnstileWidget 
                  onVerify={(token) => setTurnstileToken(token)}
                  onError={() => setTurnstileToken('dev-fallback-token')}
                  size="normal"
                />
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className="btn-primary w-full sm:w-auto px-8 py-3.5 rounded-xl flex items-center justify-center gap-2.5 text-sm sm:text-base font-bold shadow-lg shadow-cyan-500/20 hover:shadow-cyan-500/30 transition-all cursor-pointer"
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
            </div>

            {/* Privacy & Direct Channels Footer */}
            <div className="pt-4 border-t border-slate-800/80 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-slate-400">
              <div className="flex items-center gap-2">
                <FontAwesomeIcon icon={faShieldHalved} className="text-cyan-400 text-xs shrink-0" />
                <span>100% confidential · Direct with senior engineers · No sales spam</span>
              </div>

              <div className="flex flex-wrap items-center gap-3 sm:gap-4 font-mono text-[11px]">
                <a 
                  href="mailto:brixellabs@gmail.com"
                  className="hover:text-cyan-300 transition-colors flex items-center gap-1.5"
                  title="Send Email to brixellabs@gmail.com"
                >
                  <FontAwesomeIcon icon={faEnvelope} className="text-cyan-400" />
                  <span>brixellabs@gmail.com</span>
                </a>
                <span className="text-slate-700">·</span>
                <a 
                  href="tel:+923449254864"
                  className="hover:text-cyan-300 transition-colors flex items-center gap-1.5"
                  title="Call BrixelLabs"
                >
                  <FontAwesomeIcon icon={faPhone} className="text-cyan-400" />
                  <span>+92 344 9254864</span>
                </a>
                <span className="text-slate-700">·</span>
                <a 
                  href="https://wa.me/923449254864?text=Hi%20BrixelLabs%2C%20I%20would%20like%20to%20discuss%20a%20project."
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-emerald-400 transition-colors flex items-center gap-1.5"
                  title="Chat on WhatsApp"
                >
                  <span className="text-emerald-400 font-semibold">WhatsApp</span>
                </a>
              </div>
            </div>
          </div>
        </form>
        )}

      </div>
    </section>
  );
};
