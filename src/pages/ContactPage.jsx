import React, { useState } from 'react';
import { 
  Mail, 
  Phone, 
  Linkedin, 
  Twitter, 
  Instagram, 
  Facebook,
  Send, 
  Radio, 
  Clock, 
  Shield,
  MessageSquare,
  ShieldCheck,
  CheckCircle2,
  Sparkles
} from 'lucide-react';
import { motion } from 'framer-motion';
import { adminStorage } from '../utils/adminStorage';
import { apiClient } from '../api/client';
import { TurnstileWidget } from '../components/common/TurnstileWidget';
import { trackFormSubmission } from '../utils/analytics';
import { FAQSection } from '../components/common/FAQSection';

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
  const [turnstileToken, setTurnstileToken] = useState(null);
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

    if (!formData.name || !formData.email || !formData.projectBrief) {
      setSubmitError('Please fill in all required fields.');
      return;
    }

    setIsSubmitting(true);

    try {
      // 1. Save inquiry to Admin Local CRM
      adminStorage.addInquiry({
        name: formData.name,
        email: formData.email,
        phone: formData.phone,
        company: formData.company,
        service: formData.service || 'General Engineering Inquiry',
        budget: 'Custom Scope',
        timeline: '2-4 Weeks',
        message: formData.projectBrief,
        source: 'Contact Page Form'
      });

      // 2. Sync with backend API
      apiClient.createInquiry({
        name: formData.name,
        email: formData.email,
        phone: formData.phone || '',
        company: formData.company || '',
        service: formData.service || 'General AI & Engineering',
        message: formData.projectBrief,
        source: 'Contact Page Form'
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
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-gradient-to-r from-cyan-950/80 via-[#07243c]/80 to-teal-950/80 border border-cyan-500/30 text-cyan-300 text-xs font-mono uppercase tracking-wider shadow-[0_0_20px_rgba(0,240,255,0.2)]"
        >
          <Radio className="w-3.5 h-3.5 text-cyan-400" />
          <span>Get In Touch</span>
        </motion.div>

        <motion.h1 
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-white tracking-tight"
        >
          Let's <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-300 via-teal-300 to-indigo-400 drop-shadow-[0_0_35px_rgba(0,240,255,0.45)]">Talk</span>
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

      {/* Main Form & Info Grid with Gradient Cards */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start mb-20">
        
        {/* Left: Contact Form Card */}
        <motion.div 
          initial={{ opacity: 0, x: -25 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
          className="lg:col-span-8 gradient-card rounded-3xl p-6 sm:p-10 border border-cyan-500/35 shadow-2xl relative overflow-hidden bg-[#031525]/95"
        >
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl sm:text-2xl font-bold text-white">Send Us a Project Message</h2>
              <span className="text-[11px] font-mono text-cyan-400 flex items-center gap-1">
                <Clock className="w-3.5 h-3.5" />
                <span>&lt;24h Response</span>
              </span>
            </div>

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
              <div className="p-3 rounded-xl bg-red-950/80 border border-red-500/40 text-red-200 text-xs font-mono">
                {submitError}
              </div>
            )}

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1.5">Name *</label>
                <input
                  type="text"
                  required
                  placeholder="Your Name"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="w-full px-4 py-3 rounded-xl bg-[#081f33]/90 border border-cyan-500/30 text-white placeholder-slate-500 focus:outline-none focus:border-cyan-400 focus:ring-1 focus:ring-cyan-400 text-sm transition-all shadow-inner"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1.5">Work Email *</label>
                <input
                  type="email"
                  required
                  placeholder="your@email.com"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className="w-full px-4 py-3 rounded-xl bg-[#081f33]/90 border border-cyan-500/30 text-white placeholder-slate-500 focus:outline-none focus:border-cyan-400 focus:ring-1 focus:ring-cyan-400 text-sm transition-all shadow-inner"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1.5">Phone / WhatsApp</label>
                <input
                  type="text"
                  placeholder="+1 (555) 000-0000"
                  value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  className="w-full px-4 py-3 rounded-xl bg-[#081f33]/90 border border-cyan-500/30 text-white placeholder-slate-500 focus:outline-none focus:border-cyan-400 focus:ring-1 focus:ring-cyan-400 text-sm transition-all shadow-inner"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1.5">Company / Organization</label>
                <input
                  type="text"
                  placeholder="Your Company"
                  value={formData.company}
                  onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                  className="w-full px-4 py-3 rounded-xl bg-[#081f33]/90 border border-cyan-500/30 text-white placeholder-slate-500 focus:outline-none focus:border-cyan-400 focus:ring-1 focus:ring-cyan-400 text-sm transition-all shadow-inner"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1.5">Primary Area of Interest</label>
              <select
                value={formData.service}
                onChange={(e) => setFormData({ ...formData, service: e.target.value })}
                className="w-full px-4 py-3 rounded-xl bg-[#081f33]/90 border border-cyan-500/30 text-white text-sm focus:outline-none focus:border-cyan-400"
              >
                <option value="Computer Vision & Edge AI">Computer Vision &amp; Edge AI (TensorRT, YOLOv8/v9)</option>
                <option value="Agentic AI & LangGraph">Agentic AI &amp; LangGraph Multi-Agent Workflows</option>
                <option value="Custom AI/ML Models">Custom Deep Learning &amp; Predictive ML</option>
                <option value="NLP & WhatsApp Chatbots">NLP, WhatsApp &amp; RAG Conversational Systems</option>
                <option value="Full-Stack Web & Mobile">Full-Stack Web &amp; Mobile Engineering</option>
                <option value="Data Analytics (Python/SQL/Excel)">Data Analytics &amp; Telemetry Dashboards</option>
                <option value="General Engineering Inquiry">General Technical Consultation</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1.5">Project Brief &amp; Deliverables *</label>
              <textarea
                rows={4}
                required
                placeholder="Describe your project vision, target timeline, technical requirements, or current bottlenecks..."
                value={formData.projectBrief}
                onChange={(e) => setFormData({ ...formData, projectBrief: e.target.value })}
                className="w-full px-4 py-3 rounded-xl bg-[#081f33]/90 border border-cyan-500/30 text-white placeholder-slate-500 focus:outline-none focus:border-cyan-400 focus:ring-1 focus:ring-cyan-400 text-sm transition-all shadow-inner resize-none"
              ></textarea>
            </div>

            {/* Cloudflare Turnstile Spam Protection */}
            <TurnstileWidget 
              onVerify={(token) => setTurnstileToken(token)}
              onExpire={() => setTurnstileToken(null)}
            />

            <div className="pt-2">
              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full sm:w-auto px-8 py-3.5 rounded-xl bg-gradient-to-r from-cyan-400 via-teal-300 to-cyan-400 hover:from-cyan-300 hover:to-teal-200 text-[#031422] font-extrabold text-sm transition-all duration-300 shadow-[0_0_25px_rgba(0,240,255,0.6)] hover:shadow-[0_0_40px_rgba(0,240,255,0.9)] hover:scale-[1.02] active:scale-95 flex items-center justify-center gap-2 cursor-pointer disabled:opacity-60"
              >
                {isSubmitting ? (
                  <>
                    <span className="w-4 h-4 rounded-full border-2 border-[#031422] border-t-transparent animate-spin" />
                    <span>Transmitting Brief...</span>
                  </>
                ) : (
                  <>
                    <span>Send Message &amp; Schedule Review</span>
                    <Send className="w-4 h-4" />
                  </>
                )}
              </button>
            </div>
          </form>
        </motion.div>

        {/* Right: Direct Info Cards with Gradients */}
        <motion.div 
          initial={{ opacity: 0, x: 25 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="lg:col-span-4 space-y-6"
        >
          {/* Direct Contact Info Card */}
          <div className="gradient-card rounded-3xl p-6 sm:p-7 border border-cyan-500/30 space-y-5 bg-[#031422]/90">
            <h2 className="text-lg sm:text-xl font-bold text-white tracking-tight">
              Direct Engineering Contact
            </h2>

            <div className="space-y-4 text-sm">
              <a 
                href="https://mail.google.com/mail/?view=cm&fs=1&to=brixellabs@gmail.com" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="flex items-center gap-3 text-slate-300 hover:text-cyan-300 transition-colors group"
                title="Send Email via Gmail"
              >
                <div className="w-10 h-10 rounded-2xl bg-gradient-to-br from-[#092b45] to-[#041525] border border-cyan-500/30 flex items-center justify-center text-cyan-400 group-hover:border-cyan-400 transition-colors flex-shrink-0">
                  <Mail className="w-5 h-5" />
                </div>
                <div>
                  <div className="text-[11px] text-slate-400">Email us directly</div>
                  <div className="font-semibold text-white">brixellabs@gmail.com</div>
                </div>
              </a>

              <a 
                href="https://wa.me/923449254864" 
                target="_blank" 
                rel="noopener noreferrer"
                className="flex items-center gap-3 text-slate-300 hover:text-cyan-300 transition-colors group"
              >
                <div className="w-10 h-10 rounded-2xl bg-gradient-to-br from-[#092b45] to-[#041525] border border-cyan-500/30 flex items-center justify-center text-cyan-400 group-hover:border-cyan-400 transition-colors flex-shrink-0">
                  <Phone className="w-5 h-5" />
                </div>
                <div>
                  <div className="text-[11px] text-slate-400">WhatsApp hotline</div>
                  <div className="font-semibold text-white">+92 344 9254864</div>
                </div>
              </a>
            </div>

            {/* Social Media links */}
            <div className="pt-4 border-t border-cyan-500/20">
              <div className="text-xs font-semibold text-slate-400 mb-3">
                Official Channels
              </div>
              <div className="grid grid-cols-2 gap-2 text-slate-300">
                <a 
                  href="https://www.linkedin.com/company/brixellabs/home/?viewAsMember=true" 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="flex items-center gap-2 text-xs p-2 rounded-xl bg-[#07243b]/60 border border-cyan-500/20 hover:border-cyan-400 hover:text-cyan-300 transition-all"
                >
                  <Linkedin className="w-3.5 h-3.5 text-cyan-400" />
                  <span>LinkedIn</span>
                </a>
                <a 
                  href="https://www.instagram.com/brixellabs?igsi=cmM0OXliYjJxaWpt" 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="flex items-center gap-2 text-xs p-2 rounded-xl bg-[#07243b]/60 border border-cyan-500/20 hover:border-cyan-400 hover:text-cyan-300 transition-all"
                >
                  <Instagram className="w-3.5 h-3.5 text-cyan-400" />
                  <span>Instagram</span>
                </a>
                <a 
                  href="https://www.facebook.com/share/1HiGirYC4f/" 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="flex items-center gap-2 text-xs p-2 rounded-xl bg-[#07243b]/60 border border-cyan-500/20 hover:border-cyan-400 hover:text-cyan-300 transition-all"
                >
                  <Facebook className="w-3.5 h-3.5 text-cyan-400" />
                  <span>Facebook</span>
                </a>
                <a 
                  href="https://x.com/Brixellabs" 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="flex items-center gap-2 text-xs p-2 rounded-xl bg-[#07243b]/60 border border-cyan-500/20 hover:border-cyan-400 hover:text-cyan-300 transition-all"
                >
                  <Twitter className="w-3.5 h-3.5 text-cyan-400" />
                  <span>X (Twitter)</span>
                </a>
              </div>
            </div>
          </div>

          {/* Guarantees Card */}
          <div className="gradient-card rounded-3xl p-6 sm:p-7 border border-cyan-500/30 space-y-4 bg-[#031422]/90">
            <h3 className="text-lg font-bold text-white tracking-tight flex items-center gap-2">
              <ShieldCheck className="w-5 h-5 text-cyan-400" />
              <span>Engineering Guarantees</span>
            </h3>

            <div className="space-y-3">
              <div className="flex items-start gap-3 text-xs text-slate-200">
                <div className="w-4 h-4 rounded-full bg-cyan-400/20 border border-cyan-400 flex items-center justify-center text-cyan-300 flex-shrink-0 mt-0.5">
                  ✓
                </div>
                <span>Free 30-minute technical architecture discovery</span>
              </div>

              <div className="flex items-start gap-3 text-xs text-slate-200">
                <div className="w-4 h-4 rounded-full bg-cyan-400/20 border border-cyan-400 flex items-center justify-center text-cyan-300 flex-shrink-0 mt-0.5">
                  ✓
                </div>
                <span>Bilateral NDA signed prior to code/data exchange</span>
              </div>

              <div className="flex items-start gap-3 text-xs text-slate-200">
                <div className="w-4 h-4 rounded-full bg-cyan-400/20 border border-cyan-400 flex items-center justify-center text-cyan-300 flex-shrink-0 mt-0.5">
                  ✓
                </div>
                <span>100% full IP ownership & zero vendor lock-in</span>
              </div>
            </div>
          </div>

        </motion.div>

      </div>

      {/* FAQ Section on Contact Page */}
      <FAQSection />

    </div>
  );
};
