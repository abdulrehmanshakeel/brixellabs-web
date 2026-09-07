import React, { useState } from 'react';
import { 
  Mail, 
  Phone, 
  Linkedin, 
  Twitter, 
  Instagram, 
  Facebook,
  Send, 
  CheckCircle2, 
  Radio, 
  MessageSquare, 
  Clock, 
  Shield 
} from 'lucide-react';

import confetti from 'canvas-confetti';
import { motion } from 'framer-motion';
import { adminStorage } from '../utils/adminStorage';

export const ContactPage = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    company: '',
    projectBrief: ''
  });
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.name || !formData.email) return;

    // Save inquiry to Admin CRM
    adminStorage.addInquiry({
      name: formData.name,
      email: formData.email,
      phone: formData.phone,
      company: formData.company,
      service: 'General Engineering Inquiry',
      budget: 'Custom Scope',
      timeline: '2-4 Weeks',
      message: formData.projectBrief,
      source: 'Contact Page Form'
    });

    setSubmitted(true);
    confetti({
      particleCount: 90,
      spread: 70,
      origin: { y: 0.6 },
      colors: ['#00f0ff', '#00e5d0', '#38bdf8', '#818cf8']
    });
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
          Tell us about your project and our senior engineers will get back to you within 24 hours.
        </motion.p>
      </div>

      {/* Main Form & Info Grid with Gradient Cards */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        
        {/* Left: Contact Form Card */}
        <motion.div 
          initial={{ opacity: 0, x: -25 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
          className="lg:col-span-8 gradient-card rounded-3xl p-6 sm:p-10 border border-cyan-500/35 shadow-2xl relative overflow-hidden"
        >
          {submitted ? (
            <div className="p-8 text-center space-y-4 animate-fadeIn">
              <div className="w-16 h-16 mx-auto rounded-full bg-cyan-400/20 flex items-center justify-center text-cyan-300 shadow-[0_0_25px_rgba(0,240,255,0.5)]">
                <CheckCircle2 className="w-9 h-9" />
              </div>
              <h3 className="text-2xl font-bold text-white">Message Sent Successfully!</h3>
              <p className="text-slate-300 text-sm max-w-md mx-auto">
                Thank you, <span className="text-cyan-400 font-semibold">{formData.name}</span>. We will review your project brief and reply to <span className="text-cyan-400">{formData.email}</span> within 24 hours.
              </p>
              <button
                type="button"
                onClick={() => {
                  setSubmitted(false);
                  setFormData({ name: '', email: '', phone: '', company: '', projectBrief: '' });
                }}
                className="mt-4 px-6 py-2.5 rounded-xl border border-cyan-400/40 text-cyan-300 text-sm font-medium hover:bg-cyan-500/10 transition-colors"
              >
                Send Another Message
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
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
                  <label className="block text-xs font-semibold text-slate-300 mb-1.5">Email *</label>
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
                <label className="block text-xs font-semibold text-slate-300 mb-1.5">Company</label>
                <input
                  type="text"
                  placeholder="Your Company / Organization"
                  value={formData.company}
                  onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                  className="w-full px-4 py-3 rounded-xl bg-[#081f33]/90 border border-cyan-500/30 text-white placeholder-slate-500 focus:outline-none focus:border-cyan-400 focus:ring-1 focus:ring-cyan-400 text-sm transition-all shadow-inner"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1.5">Project Brief *</label>
                <textarea
                  rows={5}
                  required
                  placeholder="Tell us about your project, timeline, deliverables, and any existing tech stack..."
                  value={formData.projectBrief}
                  onChange={(e) => setFormData({ ...formData, projectBrief: e.target.value })}
                  className="w-full px-4 py-3 rounded-xl bg-[#081f33]/90 border border-cyan-500/30 text-white placeholder-slate-500 focus:outline-none focus:border-cyan-400 focus:ring-1 focus:ring-cyan-400 text-sm transition-all shadow-inner resize-none"
                ></textarea>
              </div>

              <div className="pt-2">
                <button
                  type="submit"
                  className="w-full sm:w-auto px-8 py-3.5 rounded-xl bg-gradient-to-r from-cyan-400 via-teal-300 to-cyan-400 hover:from-cyan-300 hover:to-teal-200 text-[#031422] font-extrabold text-sm transition-all duration-300 shadow-[0_0_25px_rgba(0,240,255,0.6)] hover:shadow-[0_0_40px_rgba(0,240,255,0.9)] hover:scale-[1.02] active:scale-95 flex items-center justify-center gap-2 cursor-pointer"
                >
                  <span>Send Message</span>
                  <Send className="w-4 h-4" />
                </button>
              </div>
            </form>
          )}
        </motion.div>

        {/* Right: Direct Info Cards with Gradients */}
        <motion.div 
          initial={{ opacity: 0, x: 25 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="lg:col-span-4 space-y-6"
        >
          {/* Direct Contact Info Card */}
          <div className="gradient-card rounded-3xl p-6 sm:p-7 border border-cyan-500/30 space-y-5">
            <h3 className="text-lg font-bold text-white tracking-tight">
              Direct Contact Info
            </h3>

            <div className="space-y-4 text-sm">
              <a 
                href="https://mail.google.com/mail/?view=cm&fs=1&to=brixellabs@gmail.com" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="flex items-center gap-3 text-slate-300 hover:text-cyan-300 transition-colors group"
                title="Send Email via Gmail"
              >
                <div className="w-10 h-10 rounded-2xl bg-gradient-to-br from-[#092b45] to-[#041525] border border-cyan-500/30 flex items-center justify-center text-cyan-400 group-hover:border-cyan-400 transition-colors">
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
                <div className="w-10 h-10 rounded-2xl bg-gradient-to-br from-[#092b45] to-[#041525] border border-cyan-500/30 flex items-center justify-center text-cyan-400 group-hover:border-cyan-400 transition-colors">
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
                Official Social Channels
              </div>
              <div className="grid grid-cols-2 gap-3 text-slate-300">
                <a 
                  href="https://www.linkedin.com/company/brixellabs/home/?viewAsMember=true" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 text-xs p-2 rounded-xl bg-[#07243b]/60 border border-cyan-500/20 hover:border-cyan-400 hover:text-cyan-300 transition-all"
                >
                  <Linkedin className="w-4 h-4 text-cyan-400" />
                  <span>LinkedIn</span>
                </a>
                <a 
                  href="https://www.instagram.com/brixellabs?igsi=cmM0OXliYjJxaWpt" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 text-xs p-2 rounded-xl bg-[#07243b]/60 border border-cyan-500/20 hover:border-cyan-400 hover:text-cyan-300 transition-all"
                >
                  <Instagram className="w-4 h-4 text-cyan-400" />
                  <span>Instagram</span>
                </a>
                <a 
                  href="https://www.facebook.com/share/1HiGirYC4f/" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 text-xs p-2 rounded-xl bg-[#07243b]/60 border border-cyan-500/20 hover:border-cyan-400 hover:text-cyan-300 transition-all"
                >
                  <Facebook className="w-4 h-4 text-cyan-400" />
                  <span>Facebook</span>
                </a>
                <a 
                  href="https://x.com/Brixellabs" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 text-xs p-2 rounded-xl bg-[#07243b]/60 border border-cyan-500/20 hover:border-cyan-400 hover:text-cyan-300 transition-all"
                >
                  <Twitter className="w-4 h-4 text-cyan-400" />
                  <span>X (Twitter)</span>
                </a>
              </div>
            </div>
          </div>

          {/* Why work with us Card */}
          <div className="gradient-card rounded-3xl p-6 sm:p-7 border border-cyan-500/30 space-y-4">
            <h3 className="text-lg font-bold text-white tracking-tight">
              Why Work With Us
            </h3>

            <div className="space-y-3">
              <div className="flex items-center gap-3 text-sm text-slate-200">
                <div className="w-5 h-5 rounded-full bg-cyan-400/20 border border-cyan-400 flex items-center justify-center text-cyan-300 flex-shrink-0">
                  ✓
                </div>
                <span>Free initial architecture consultation</span>
              </div>

              <div className="flex items-center gap-3 text-sm text-slate-200">
                <div className="w-5 h-5 rounded-full bg-cyan-400/20 border border-cyan-400 flex items-center justify-center text-cyan-300 flex-shrink-0">
                  ✓
                </div>
                <span>Direct engineer access & daily/weekly demos</span>
              </div>

              <div className="flex items-center gap-3 text-sm text-slate-200">
                <div className="w-5 h-5 rounded-full bg-cyan-400/20 border border-cyan-400 flex items-center justify-center text-cyan-300 flex-shrink-0">
                  ✓
                </div>
                <span>Full IP ownership & no vendor lock-in</span>
              </div>
            </div>
          </div>

        </motion.div>

      </div>

    </div>
  );
};
