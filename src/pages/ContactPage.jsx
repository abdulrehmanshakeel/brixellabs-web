import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { 
  faEnvelope, 
  faPhone, 
  faPaperPlane, 
  faTowerBroadcast, 
  faClock, 
  faShieldHalved,
  faTriangleExclamation,
  faLocationDot,
  faArrowUpRightFromSquare
} from '@fortawesome/free-solid-svg-icons';
import { 
  faLinkedinIn, 
  faInstagram, 
  faFacebookF, 
  faXTwitter, 
  faWhatsapp 
} from '@fortawesome/free-brands-svg-icons';
import { motion } from 'framer-motion';
import { adminStorage } from '../utils/adminStorage';
import { apiClient } from '../api/client';
import { trackFormSubmission } from '../utils/analytics';
import { getStoredUTMParams } from '../utils/utm';
import { FAQSection } from '../components/common/FAQSection';
import { SocialMediaConnectSection } from '../components/common/SocialMediaConnectSection';
import { TurnstileWidget } from '../components/common/TurnstileWidget';
import { sanitizeInput, sanitizeEmail, sanitizePhone, isValidEmail } from '../utils/sanitize';
import { CopyButton } from '../components/common/CopyButton';

export const ContactPage = ({ navigate }) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    company: '',
    service: 'General AI & Engineering',
    projectBrief: '',
    honeypot: '' // Spam trap for automated scrapers
  });
  const [turnstileToken, setTurnstileToken] = useState('');
  const [hasAgreed, setHasAgreed] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitError('');

    // Honeypot spam check
    if (formData.honeypot) {
      console.warn('Spam submission detected by honeypot.');
      return;
    }

    const cleanName = sanitizeInput(formData.name);
    const cleanEmail = sanitizeEmail(formData.email);
    const cleanPhone = sanitizePhone(formData.phone || '');
    const cleanCompany = sanitizeInput(formData.company || '');
    const cleanBrief = sanitizeInput(formData.projectBrief);

    if (!cleanName || !cleanEmail || !cleanBrief) {
      setSubmitError('Please fill in all required fields.');
      return;
    }

    if (!isValidEmail(cleanEmail)) {
      setSubmitError('Please enter a valid email address.');
      return;
    }

    if (!hasAgreed) {
      setSubmitError('Please confirm the terms, privacy policy, and age verification checkbox.');
      return;
    }

    setIsSubmitting(true);

    try {
      const utm = getStoredUTMParams();

      // 1. Save inquiry to Admin Local CRM with UTM tracking
      adminStorage.addInquiry({
        name: cleanName,
        email: cleanEmail,
        phone: cleanPhone,
        company: cleanCompany,
        service: formData.service || 'General Engineering Inquiry',
        budget: 'Custom Scope',
        timeline: '2-4 Weeks',
        message: cleanBrief,
        source: 'Contact Page Form',
        ...utm
      });

      // 2. Sync with backend API
      apiClient.createInquiry({
        name: cleanName,
        email: cleanEmail,
        phone: cleanPhone,
        company: cleanCompany,
        service: formData.service || 'General AI & Engineering',
        message: cleanBrief,
        source: 'Contact Page Form',
        turnstile_token: turnstileToken,
        ...utm
      }).catch(err => console.warn('Backend API inquiry sync:', err));

      // 3. Track conversion in Google Analytics
      trackFormSubmission('Contact Page Form', formData.service || 'General AI & Engineering');

      // 4. Redirect to dedicated Thank You page
      if (navigate) {
        navigate('/thank-you');
      } else {
        window.history.pushState({}, '', '/thank-you');
        window.dispatchEvent(new PopStateEvent('popstate'));
        window.scrollTo({ top: 0, behavior: 'smooth' });
      }
    } catch (err) {
      console.error('Contact form submission error:', err);
      setSubmitError('Failed to send message. Please try again or reach us directly on WhatsApp.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="relative pt-32 sm:pt-40 pb-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto z-10">
      
      {/* Header */}
      <div className="text-center mb-16 space-y-3">
        <motion.h1 
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-white tracking-tight"
        >
          Let's Talk
        </motion.h1>

        <motion.p 
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="text-base sm:text-lg text-slate-300 max-w-xl mx-auto font-normal leading-relaxed"
        >
          Tell us about your project and our senior engineers will review your requirements within 24 hours.
        </motion.p>
      </div>

      {/* Main Form & Info Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start mb-24">
        
        {/* Left: Contact Form (Directly integrated, NOT a card) */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="lg:col-span-7"
        >
          <div className="mb-6">
            <h2 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
              Tell Us About Your Project
            </h2>
            <p className="text-sm text-slate-300 mt-1">
              Have an idea, project, or question? Send us a message and we'll get back to you with clear answers within 24 hours.
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Hidden Honeypot Input for Bot Trapping */}
            <div className="hidden" aria-hidden="true">
              <label htmlFor="website-hp">Leave this blank</label>
              <input
                id="website-hp"
                type="text"
                name="_hp_check"
                tabIndex="-1"
                autoComplete="off"
                value={formData.honeypot}
                onChange={(e) => setFormData({ ...formData, honeypot: e.target.value })}
              />
            </div>

            {submitError && (
              <div className="p-3.5 rounded-xl bg-red-950/80 border border-red-500/40 text-red-200 text-xs flex items-center gap-2.5">
                <FontAwesomeIcon icon={faTriangleExclamation} className="text-red-400 flex-shrink-0" />
                <span>{submitError}</span>
              </div>
            )}

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
                  className="w-full px-4 py-3 rounded-xl bg-slate-900/70 border border-slate-700/60 text-white placeholder-slate-500 text-sm focus:outline-none focus:border-cyan-400 focus:ring-1 focus:ring-cyan-400/20 transition-all"
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
                  className="w-full px-4 py-3 rounded-xl bg-slate-900/70 border border-slate-700/60 text-white placeholder-slate-500 text-sm focus:outline-none focus:border-cyan-400 focus:ring-1 focus:ring-cyan-400/20 transition-all"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-medium text-slate-300 mb-1.5">
                  Phone / WhatsApp <span className="text-slate-500 font-normal">(Optional)</span>
                </label>
                <input
                  type="text"
                  placeholder="Phone Number (Optional)"
                  value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  className="w-full px-4 py-3 rounded-xl bg-slate-900/70 border border-slate-700/60 text-white placeholder-slate-500 text-sm focus:outline-none focus:border-cyan-400 focus:ring-1 focus:ring-cyan-400/20 transition-all"
                />
              </div>

              <div>
                <label className="block text-xs font-medium text-slate-300 mb-1.5">
                  Company / Organization <span className="text-slate-500 font-normal">(Optional)</span>
                </label>
                <input
                  type="text"
                  placeholder="Company Name (Optional)"
                  value={formData.company}
                  onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                  className="w-full px-4 py-3 rounded-xl bg-slate-900/70 border border-slate-700/60 text-white placeholder-slate-500 text-sm focus:outline-none focus:border-cyan-400 focus:ring-1 focus:ring-cyan-400/20 transition-all"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-medium text-slate-300 mb-1.5">
                What are you looking to build?
              </label>
              <select
                value={formData.service}
                onChange={(e) => setFormData({ ...formData, service: e.target.value })}
                className="w-full px-4 py-3 rounded-xl bg-slate-900/70 border border-slate-700/60 text-white text-sm focus:outline-none focus:border-cyan-400 focus:ring-1 focus:ring-cyan-400/20 transition-all"
              >
                <option value="Computer Vision & Camera AI">Computer Vision &amp; Camera Quality AI</option>
                <option value="AI Agents & AI Automations">AI Agents &amp; AI Automations</option>
                <option value="Custom AI/ML Models">Custom AI &amp; Machine Learning Solutions</option>
                <option value="Smart Chatbots (WhatsApp / Web)">Smart Chatbots &amp; WhatsApp Assistants</option>
                <option value="Web & Mobile Development">Web &amp; Mobile App Development</option>
                <option value="Custom Software & SaaS Development">Custom Software &amp; SaaS Development</option>
                <option value="Shopify Store Development">Shopify Store Development &amp; Custom Themes</option>
                <option value="API Development & Integration">API Development &amp; System Integration</option>
                <option value="Web Scraping & Data Extraction">Web Scraping &amp; Data Extraction</option>
                <option value="Data Analytics (Python/SQL/Excel)">Data Analytics &amp; Excel Dashboards</option>
                <option value="General Consultation">General Project Consultation</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-medium text-slate-300 mb-1.5">
                Project Details <span className="text-cyan-400">*</span>
              </label>
              <textarea
                rows={4}
                required
                placeholder="Describe your project, timeline, and goals..."
                value={formData.projectBrief}
                onChange={(e) => setFormData({ ...formData, projectBrief: e.target.value })}
                className="w-full px-4 py-3 rounded-xl bg-slate-900/70 border border-slate-700/60 text-white placeholder-slate-500 text-sm focus:outline-none focus:border-cyan-400 focus:ring-1 focus:ring-cyan-400/20 transition-all resize-none"
              ></textarea>
            </div>

            {/* Cloudflare Turnstile Spam & Bot Protection */}
            <TurnstileWidget 
              onVerify={(token) => setTurnstileToken(token)}
              onError={() => setTurnstileToken('dev-fallback-token')}
              size="normal"
            />

            {/* Explicit Form Consent, Age Verification & Data Minimization Notice */}
            <div className="pt-1 pb-1">
              <label className="flex items-start gap-2.5 cursor-pointer select-none">
                <input
                  type="checkbox"
                  required
                  checked={hasAgreed}
                  onChange={(e) => setHasAgreed(e.target.checked)}
                  className="mt-0.5 accent-cyan-400 w-4 h-4 cursor-pointer rounded flex-shrink-0"
                />
                <span className="text-xs text-slate-300 leading-relaxed">
                  I confirm I am 18 years of age or older, and agree to the{' '}
                  <a 
                    href="/terms-of-service" 
                    onClick={(e) => { e.preventDefault(); navigate('/terms-of-service'); }} 
                    className="text-cyan-400 underline hover:text-cyan-300 font-medium"
                  >
                    Terms of Service
                  </a>
                  {' '}and{' '}
                  <a 
                    href="/privacy-policy" 
                    onClick={(e) => { e.preventDefault(); navigate('/privacy-policy'); }} 
                    className="text-cyan-400 underline hover:text-cyan-300 font-medium"
                  >
                    Privacy Policy
                  </a>.
                </span>
              </label>
              <p className="text-[11px] text-slate-400 mt-1 pl-6 leading-relaxed">
                Data Minimization: We collect only the contact information required to evaluate your inquiry. We never share or sell personal data.
              </p>
            </div>

            <div className="pt-2 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <button
                type="submit"
                disabled={isSubmitting}
                className="btn-primary w-full sm:w-auto disabled:opacity-60 flex items-center justify-center gap-2"
              >
                {isSubmitting ? (
                  <>
                    <span className="w-4 h-4 rounded-full border-2 border-[#031422] border-t-transparent animate-spin" />
                    <span>Sending message...</span>
                  </>
                ) : (
                  <>
                    <span>Send Message</span>
                    <FontAwesomeIcon icon={faPaperPlane} className="w-3.5 h-3.5" />
                  </>
                )}
              </button>

              <div className="flex items-center gap-2 text-xs text-slate-400">
                <FontAwesomeIcon icon={faShieldHalved} className="text-white" />
                <span>100% confidential. No spam, ever.</span>
              </div>
            </div>
          </form>
        </motion.div>

        {/* Right: Direct Channels & Guarantees Sidebar */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="lg:col-span-5 space-y-8 lg:pl-6 lg:border-l lg:border-slate-800/80"
        >
          {/* Direct Contact Info */}
          <div className="space-y-4">
            <h3 className="text-lg font-bold text-white tracking-tight">
              Direct Contact
            </h3>
            <p className="text-xs text-slate-400">
              Prefer direct outreach? Reach our engineering team directly via verified channels:
            </p>

            <div className="space-y-3 pt-2">
              <div className="flex items-center gap-2">
                <a 
                  href="mailto:brixellabs@gmail.com" 
                  className="flex-1 flex items-center gap-3 p-3 rounded-xl bg-[#ea4335]/10 border border-[#ea4335]/35 hover:border-[#ea4335] hover:bg-[#ea4335]/20 shadow-sm hover:shadow-[0_0_16px_rgba(234,67,53,0.35)] transition-all group no-underline"
                  title="Send Email to brixellabs@gmail.com"
                >
                  <div className="w-9 h-9 rounded-lg bg-[#ea4335] text-white flex items-center justify-center flex-shrink-0 shadow-md shadow-red-950/40 group-hover:scale-105 transition-transform">
                    <FontAwesomeIcon icon={faEnvelope} className="w-4 h-4 text-white" />
                  </div>
                  <div className="min-w-0">
                    <div className="text-[11px] text-red-300/90 font-mono">Official Email</div>
                    <div className="font-bold text-white text-sm truncate">brixellabs@gmail.com</div>
                  </div>
                </a>
                <CopyButton text="brixellabs@gmail.com" label="Copy" className="flex-shrink-0" />
              </div>

              <div className="flex items-center gap-2">
                <a 
                  href="tel:+923449254864" 
                  className="flex-1 flex items-center gap-3 p-3 rounded-xl bg-cyan-500/10 border border-cyan-500/35 hover:border-cyan-400 hover:bg-cyan-500/20 shadow-sm hover:shadow-[0_0_16px_rgba(0,240,255,0.35)] transition-all group no-underline"
                  title="Call BrixelLabs"
                >
                  <div className="w-9 h-9 rounded-lg bg-cyan-500 text-slate-950 flex items-center justify-center flex-shrink-0 shadow-md shadow-cyan-950/40 group-hover:scale-105 transition-transform">
                    <FontAwesomeIcon icon={faPhone} className="w-4 h-4 text-[#031422]" />
                  </div>
                  <div className="min-w-0">
                    <div className="text-[11px] text-cyan-300 font-mono">Direct Phone Call</div>
                    <div className="font-bold text-white text-sm truncate">+92 344 9254864</div>
                  </div>
                </a>
                <CopyButton text="+923449254864" label="Copy" className="flex-shrink-0" />
              </div>

              <div className="flex items-center gap-2">
                <a 
                  href="https://wa.me/923449254864?text=Hi%20BrixelLabs%2C%20I%20would%20like%20to%20discuss%20a%20project." 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="flex-1 flex items-center gap-3 p-3 rounded-xl bg-[#25d366]/10 border border-[#25d366]/35 hover:border-[#25d366] hover:bg-[#25d366]/20 shadow-sm hover:shadow-[0_0_16px_rgba(37,211,102,0.35)] transition-all group no-underline"
                  title="Chat on WhatsApp"
                >
                  <div className="w-9 h-9 rounded-lg bg-[#25d366] text-white flex items-center justify-center flex-shrink-0 shadow-md shadow-emerald-950/40 group-hover:scale-105 transition-transform">
                    <FontAwesomeIcon icon={faWhatsapp} className="w-4 h-4 text-white" />
                  </div>
                  <div className="min-w-0">
                    <div className="text-[11px] text-emerald-300/90 font-mono">WhatsApp Hotline</div>
                    <div className="font-bold text-white text-sm truncate">+92 344 9254864</div>
                  </div>
                </a>
                <CopyButton text="+923449254864" label="Copy" className="flex-shrink-0" />
              </div>

              <div className="flex items-center gap-2">
                <a 
                  href="https://www.google.com/maps/search/?api=1&query=Jinnah+Colony%2C+Faisalabad%2C+38000%2C+Pakistan"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex-1 flex items-center gap-3 p-3 rounded-xl bg-purple-500/10 border border-purple-500/30 hover:border-purple-400 hover:bg-purple-500/20 text-white transition-all group no-underline"
                  title="Open Jinnah Colony, Faisalabad in Google Maps"
                >
                  <div className="w-9 h-9 rounded-lg bg-purple-500/20 border border-purple-500/40 text-purple-300 flex items-center justify-center flex-shrink-0 group-hover:scale-105 transition-transform">
                    <FontAwesomeIcon icon={faLocationDot} className="w-4 h-4 text-purple-300" />
                  </div>
                  <div className="min-w-0">
                    <div className="text-[11px] text-purple-300/90 font-mono flex items-center gap-1.5">
                      <span>Operations &amp; Studio</span>
                      <FontAwesomeIcon icon={faArrowUpRightFromSquare} className="text-[9px] text-purple-400 group-hover:translate-x-0.5 transition-transform" />
                    </div>
                    <div className="font-semibold text-white text-xs sm:text-sm leading-snug">
                      Jinnah Colony, Faisalabad, 38000, Pakistan
                    </div>
                  </div>
                </a>
                <CopyButton text="Jinnah Colony, Faisalabad, 38000, Pakistan" label="Copy" className="flex-shrink-0" />
              </div>
            </div>

            {/* Social Media links */}
            <div className="pt-4 border-t border-slate-800/60">
              <div className="text-xs font-mono uppercase tracking-wider text-slate-400 mb-2.5">
                Official Channels
              </div>
              <div className="grid grid-cols-2 gap-2 text-white">
                <a 
                  href="https://www.linkedin.com/company/brixellabs/home/?viewAsMember=true" 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="flex items-center gap-2 text-xs font-semibold p-2.5 rounded-lg bg-[#0077b5] hover:bg-[#005f93] text-white border border-[#0077b5] shadow-sm hover:shadow-[0_0_14px_rgba(0,119,181,0.5)] transition-all hover:scale-[1.02]"
                >
                  <FontAwesomeIcon icon={faLinkedinIn} className="w-3.5 h-3.5 text-white" />
                  <span>LinkedIn</span>
                </a>
                <a 
                  href="https://www.instagram.com/brixellabs?igsi=cmM0OXliYjJxaWpt" 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="flex items-center gap-2 text-xs font-semibold p-2.5 rounded-lg bg-gradient-to-r from-[#f09433] via-[#dc2743] to-[#bc1888] hover:opacity-95 text-white border border-pink-500/50 shadow-sm hover:shadow-[0_0_14px_rgba(220,39,67,0.5)] transition-all hover:scale-[1.02]"
                >
                  <FontAwesomeIcon icon={faInstagram} className="w-3.5 h-3.5 text-white" />
                  <span>Instagram</span>
                </a>
                <a 
                  href="https://www.facebook.com/share/1HiGirYC4f/" 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="flex items-center gap-2 text-xs font-semibold p-2.5 rounded-lg bg-[#1877f2] hover:bg-[#125ec2] text-white border border-[#1877f2] shadow-sm hover:shadow-[0_0_14px_rgba(24,119,242,0.5)] transition-all hover:scale-[1.02]"
                >
                  <FontAwesomeIcon icon={faFacebookF} className="w-3.5 h-3.5 text-white" />
                  <span>Facebook</span>
                </a>
                <a 
                  href="https://x.com/Brixellabs" 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="flex items-center gap-2 text-xs font-semibold p-2.5 rounded-lg bg-black hover:bg-neutral-900 text-white border border-slate-700 hover:border-slate-500 shadow-sm hover:shadow-[0_0_14px_rgba(255,255,255,0.2)] transition-all hover:scale-[1.02]"
                >
                  <FontAwesomeIcon icon={faXTwitter} className="w-3.5 h-3.5 text-white" />
                  <span>X (Twitter)</span>
                </a>
              </div>
            </div>
          </div>

        </motion.div>

      </div>

      {/* Social Media Connect Channels Section */}
      <SocialMediaConnectSection />

      {/* FAQ Section on Contact Page */}
      <FAQSection showCta={false} />

    </div>
  );
};
