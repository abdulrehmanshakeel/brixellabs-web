import React, { useState } from 'react';
import { X, Send, CheckCircle2, ShieldCheck } from 'lucide-react';
import confetti from 'canvas-confetti';
import { adminStorage } from '../../utils/adminStorage';

export const ConsultationModal = ({ isOpen, onClose }) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    service: 'Full-Stack & AI Solutions',
    budget: '$10k - $25k',
    message: '',
  });
  const [submitted, setSubmitted] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = (e) => {
    e.preventDefault();

    // Save inquiry to Admin CRM
    adminStorage.addInquiry({
      name: formData.name,
      email: formData.email,
      service: formData.service || 'Full-Stack & AI Solutions',
      budget: formData.budget || '$10k - $25k',
      timeline: '1-2 Months',
      message: formData.message || 'Scheduled discovery consultation',
      source: 'Discovery Consultation Modal'
    });

    setSubmitted(true);
    confetti({
      particleCount: 70,
      spread: 60,
      origin: { y: 0.5 },
      colors: ['#00f0ff', '#00e5d0', '#38bdf8']
    });
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-fadeIn">
      <div className="relative w-full max-w-lg glass-panel rounded-3xl p-6 sm:p-8 border border-cyan-500/40 shadow-[0_0_50px_rgba(0,240,255,0.25)] bg-[#041525]/95">
        
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-5 right-5 p-2 rounded-full text-slate-400 hover:text-white hover:bg-cyan-950/60 transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        {submitted ? (
          <div className="py-8 text-center space-y-4 animate-fadeIn">
            <div className="w-16 h-16 mx-auto rounded-full bg-cyan-400/20 flex items-center justify-center text-cyan-300 shadow-[0_0_20px_rgba(0,240,255,0.5)]">
              <CheckCircle2 className="w-9 h-9" />
            </div>
            <h3 className="text-2xl font-bold text-white">We'll Be In Touch!</h3>
            <p className="text-slate-300 text-sm">
              Thanks for reaching out! A senior engineer from BrixelLabs will contact you within 24 hours to schedule your consultation.
            </p>
            <button
              onClick={onClose}
              className="mt-4 px-6 py-2.5 rounded-xl bg-cyan-400 text-[#031422] font-bold text-sm hover:bg-cyan-300 transition-all shadow-lg"
            >
              Close Window
            </button>
          </div>
        ) : (
          <div>
            <div className="mb-6">
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

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-xs font-medium text-slate-300 mb-1">Your Name</label>
                <input
                  type="text"
                  required
                  placeholder="Amna Ali"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="w-full px-4 py-2.5 rounded-xl bg-[#081f33] border border-cyan-500/30 text-white placeholder-slate-500 focus:outline-none focus:border-cyan-400 text-sm"
                />
              </div>

              <div>
                <label className="block text-xs font-medium text-slate-300 mb-1">Work Email</label>
                <input
                  type="email"
                  required
                  placeholder="amna@example.com"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className="w-full px-4 py-2.5 rounded-xl bg-[#081f33] border border-cyan-500/30 text-white placeholder-slate-500 focus:outline-none focus:border-cyan-400 text-sm"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-medium text-slate-300 mb-1">Service</label>
                  <select
                    value={formData.service}
                    onChange={(e) => setFormData({ ...formData, service: e.target.value })}
                    className="w-full px-3 py-2.5 rounded-xl bg-[#081f33] border border-cyan-500/30 text-white text-xs focus:outline-none focus:border-cyan-400"
                  >
                    <option>AI & Machine Learning</option>
                    <option>NLP, Chatbots & RAG Services</option>
                    <option>Computer Vision</option>
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
                  rows={3}
                  placeholder="Describe your vision, tech stack requirements, or current challenges..."
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  className="w-full px-4 py-2.5 rounded-xl bg-[#081f33] border border-cyan-500/30 text-white placeholder-slate-500 focus:outline-none focus:border-cyan-400 text-sm resize-none"
                ></textarea>
              </div>

              <button
                type="submit"
                className="w-full py-3 rounded-xl bg-cyan-400 hover:bg-cyan-300 text-[#031422] font-bold text-sm transition-all duration-300 shadow-[0_0_20px_rgba(0,240,255,0.5)] active:scale-95 flex items-center justify-center gap-2 cursor-pointer"
              >
                <span>Book Free Discovery Call</span>
                <Send className="w-4 h-4" />
              </button>
            </form>
          </div>
        )}
      </div>
    </div>
  );
};
