import React, { useState } from 'react';
import { X, Send, ShieldCheck, Clock } from 'lucide-react';
import { adminStorage } from '../../utils/adminStorage';
import { apiClient } from '../../api/client';
import { TurnstileWidget } from './TurnstileWidget';
import { trackFormSubmission } from '../../utils/analytics';

export const ConsultationModal = ({ isOpen, onClose, navigate }) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    service: 'AI & Machine Learning',
    budget: '$10k - $25k',
    message: '',
    honeypot: ''
  });
  const [turnstileToken, setTurnstileToken] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = (e) => {
    e.preventDefault();

    // Honeypot spam check
    if (formData.honeypot) {
      console.warn('Spam caught in consultation modal.');
      return;
    }

    if (!formData.name || !formData.email) return;

    setIsSubmitting(true);

    try {
      // 1. Save inquiry to Admin CRM
      adminStorage.addInquiry({
        name: formData.name,
        email: formData.email,
        service: formData.service || 'Full-Stack & AI Solutions',
        budget: formData.budget || '$10k - $25k',
        timeline: '1-2 Months',
        message: formData.message || 'Scheduled discovery consultation',
        source: 'Discovery Consultation Modal'
      });

      // 2. Sync with backend API
      apiClient.createInquiry({
        name: formData.name,
        email: formData.email,
        service: formData.service,
        budget: formData.budget,
        message: formData.message || 'Discovery consultation request',
        source: 'Discovery Consultation Modal'
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
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-fadeIn">
      <div className="relative w-full max-w-lg glass-panel rounded-3xl p-6 sm:p-8 border border-cyan-500/40 shadow-[0_0_50px_rgba(0,240,255,0.25)] bg-[#041525]/95">
        
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-5 right-5 p-2 rounded-full text-slate-400 hover:text-white hover:bg-cyan-950/60 transition-colors cursor-pointer"
        >
          <X className="w-5 h-5" />
        </button>

        <div>
          <div className="mb-5">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-cyan-950/80 border border-cyan-500/30 text-cyan-300 text-xs font-semibold uppercase tracking-wider mb-2">
              <ShieldCheck className="w-3.5 h-3.5 text-cyan-400" />
              Free Technical Discovery
            </div>
            <h3 className="text-2xl font-bold text-white tracking-tight">
              Schedule a Consultation
            </h3>
            <p className="text-xs text-slate-400 mt-1">
              Tell us about your project requirements and target timeline.
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

            <div>
              <label className="block text-xs font-medium text-slate-300 mb-1">Your Name *</label>
              <input
                type="text"
                required
                placeholder="Your Name"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                className="w-full px-4 py-2.5 rounded-xl bg-[#081f33] border border-cyan-500/30 text-white placeholder-slate-500 focus:outline-none focus:border-cyan-400 text-sm"
              />
            </div>

            <div>
              <label className="block text-xs font-medium text-slate-300 mb-1">Work Email *</label>
              <input
                type="email"
                required
                placeholder="you@company.com"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                className="w-full px-4 py-2.5 rounded-xl bg-[#081f33] border border-cyan-500/30 text-white placeholder-slate-500 focus:outline-none focus:border-cyan-400 text-sm"
              />
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-medium text-slate-300 mb-1">Service Area</label>
                <select
                  value={formData.service}
                  onChange={(e) => setFormData({ ...formData, service: e.target.value })}
                  className="w-full px-3 py-2.5 rounded-xl bg-[#081f33] border border-cyan-500/30 text-white text-xs focus:outline-none focus:border-cyan-400"
                >
                  <option>AI & Machine Learning</option>
                  <option>NLP, Chatbots & RAG Services</option>
                  <option>Computer Vision & Edge AI</option>
                  <option>Agentic AI & Automation</option>
                  <option>Web & Mobile Full-Stack</option>
                  <option>Data Analytics (Python, Excel, SQL)</option>
                  <option>UI/UX Design</option>
                </select>
              </div>
              <div>
                <label className="block text-xs font-medium text-slate-300 mb-1">Budget Range</label>
                <select
                  value={formData.budget}
                  onChange={(e) => setFormData({ ...formData, budget: e.target.value })}
                  className="w-full px-3 py-2.5 rounded-xl bg-[#081f33] border border-cyan-500/30 text-white text-xs focus:outline-none focus:border-cyan-400"
                >
                  <option>&lt; $10k</option>
                  <option>$10k - $25k</option>
                  <option>$25k - $50k</option>
                  <option>$50k+</option>
                </select>
              </div>
            </div>

            <div>
              <label className="block text-xs font-medium text-slate-300 mb-1">Project Details</label>
              <textarea
                rows={2}
                placeholder="Describe your vision, tech stack requirements, or bottlenecks..."
                value={formData.message}
                onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                className="w-full px-4 py-2.5 rounded-xl bg-[#081f33] border border-cyan-500/30 text-white placeholder-slate-500 focus:outline-none focus:border-cyan-400 text-sm resize-none"
              ></textarea>
            </div>

            {/* Cloudflare Turnstile */}
            <TurnstileWidget 
              onVerify={(token) => setTurnstileToken(token)}
              onExpire={() => setTurnstileToken(null)}
            />

            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full py-3 rounded-xl bg-cyan-400 hover:bg-cyan-300 text-[#031422] font-bold text-sm transition-all duration-300 shadow-[0_0_20px_rgba(0,240,255,0.5)] active:scale-95 flex items-center justify-center gap-2 cursor-pointer disabled:opacity-60"
            >
              {isSubmitting ? (
                <span>Scheduling Session...</span>
              ) : (
                <>
                  <span>Book Free Discovery Call</span>
                  <Send className="w-4 h-4" />
                </>
              )}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};
