import React, { useState } from 'react';
import { Send, Upload, CheckCircle2, Globe, FileText, ArrowRight, Clock, ShieldCheck, Wifi } from 'lucide-react';
import { adminStorage } from '../../utils/adminStorage';
import { apiClient } from '../../api/client';
import { TurnstileWidget } from './TurnstileWidget';
import { trackFormSubmission } from '../../utils/analytics';

export const ScheduleConsultationSection = ({ 
  title = "Schedule Free Consultation", 
  subtitle = "Contact our senior engineers to evaluate technical feasibility, AI models, and delivery roadmaps." 
}) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    company: '',
    projectBrief: '',
    fileName: '',
    honeypot: ''
  });
  const [turnstileToken, setTurnstileToken] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleFileChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      setFormData(prev => ({ ...prev, fileName: e.target.files[0].name }));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Honeypot check
    if (formData.honeypot) {
      console.warn('Bot spam caught by honeypot.');
      return;
    }

    if (!formData.name || !formData.email) return;

    setIsSubmitting(true);

    try {
      // 1. Save inquiry to Admin CRM
      adminStorage.addInquiry({
        name: formData.name,
        email: formData.email,
        company: formData.company,
        service: 'Consultation & Architecture',
        budget: '$15,000 - $35,000',
        timeline: '2-3 Weeks',
        message: `${formData.projectBrief || ''} ${formData.fileName ? `[Attached file: ${formData.fileName}]` : ''}`.trim(),
        source: 'Schedule Consultation Section'
      });

      // 2. Sync with backend API
      apiClient.createInquiry({
        name: formData.name,
        email: formData.email,
        company: formData.company || '',
        service: 'Consultation & Architecture',
        message: `${formData.projectBrief || ''} ${formData.fileName ? `[Attached file: ${formData.fileName}]` : ''}`.trim(),
        source: 'Schedule Consultation Section'
      }).catch(err => console.warn('API inquiry sync:', err));

      // 3. Track GA conversion
      trackFormSubmission('Schedule Consultation Section', 'Consultation & Architecture');

      // 4. Redirect to thank-you page
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
    <section className="relative py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto z-10" id="consultation">
      <div className="gradient-card rounded-3xl p-6 sm:p-10 lg:p-12 border border-cyan-500/35 shadow-2xl relative overflow-hidden bg-[#031525]/95">
        
        {/* Subtle glowing corner accents */}
        <div className="absolute -top-20 -right-20 w-80 h-80 bg-gradient-to-br from-cyan-400/20 to-teal-400/10 rounded-full blur-3xl pointer-events-none"></div>
        <div className="absolute -bottom-20 -left-20 w-80 h-80 bg-gradient-to-tr from-blue-600/15 to-indigo-600/10 rounded-full blur-3xl pointer-events-none"></div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-center relative z-10">
          
          {/* Left: Form Area */}
          <div className="lg:col-span-8">
            <div className="mb-8">
              <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-white tracking-tight flex items-center gap-3">
                <span>{title}</span>
                <ShieldCheck className="w-6 h-6 text-cyan-400" />
              </h2>
              <p className="text-sm sm:text-base text-slate-300 mt-2">
                {subtitle}
              </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              {/* Hidden honeypot */}
              <div className="hidden" aria-hidden="true">
                <input
                  type="text"
                  tabIndex="-1"
                  autoComplete="off"
                  value={formData.honeypot}
                  onChange={(e) => setFormData({ ...formData, honeypot: e.target.value })}
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <input
                    type="text"
                    required
                    placeholder="Your Name *"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="w-full px-4 py-3 rounded-xl bg-[#081f33]/90 border border-cyan-500/30 text-white placeholder-slate-400 focus:outline-none focus:border-cyan-400 focus:ring-1 focus:ring-cyan-400 text-sm transition-all shadow-inner"
                  />
                </div>
                <div>
                  <input
                    type="email"
                    required
                    placeholder="Work Email *"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="w-full px-4 py-3 rounded-xl bg-[#081f33]/90 border border-cyan-500/30 text-white placeholder-slate-400 focus:outline-none focus:border-cyan-400 focus:ring-1 focus:ring-cyan-400 text-sm transition-all shadow-inner"
                  />
                </div>
              </div>

              <div>
                <input
                  type="text"
                  placeholder="Company / Organization"
                  value={formData.company}
                  onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                  className="w-full px-4 py-3 rounded-xl bg-[#081f33]/90 border border-cyan-500/30 text-white placeholder-slate-400 focus:outline-none focus:border-cyan-400 focus:ring-1 focus:ring-cyan-400 text-sm transition-all shadow-inner"
                />
              </div>

              <div>
                <textarea
                  rows={3}
                  required
                  placeholder="Project Brief & Requirements *"
                  value={formData.projectBrief}
                  onChange={(e) => setFormData({ ...formData, projectBrief: e.target.value })}
                  className="w-full px-4 py-3 rounded-xl bg-[#081f33]/90 border border-cyan-500/30 text-white placeholder-slate-400 focus:outline-none focus:border-cyan-400 focus:ring-1 focus:ring-cyan-400 text-sm transition-all shadow-inner resize-none"
                ></textarea>
              </div>

              {/* File Upload Row */}
              <div className="flex items-center gap-3">
                <label className="flex-1 flex items-center justify-between px-4 py-3 rounded-xl bg-[#081f33]/90 border border-cyan-500/30 text-sm text-slate-300 cursor-pointer hover:border-cyan-400/60 transition-colors group">
                  <div className="flex items-center gap-2.5 truncate">
                    <FileText className="w-4 h-4 text-cyan-400 flex-shrink-0" />
                    <span className="truncate text-slate-400 group-hover:text-slate-300">
                      {formData.fileName || "Attach Architecture / PRD File (Optional)"}
                    </span>
                  </div>
                  <span className="text-xs px-2.5 py-0.5 rounded bg-cyan-900/50 text-cyan-300 border border-cyan-500/30">
                    20MB
                  </span>
                  <input
                    type="file"
                    className="hidden"
                    onChange={handleFileChange}
                  />
                </label>
              </div>

              {/* Turnstile Spam Protection */}
              <TurnstileWidget 
                onVerify={(token) => setTurnstileToken(token)}
                onExpire={() => setTurnstileToken(null)}
              />

              {/* Submit button with Gradient */}
              <div className="pt-2">
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full sm:w-auto px-8 py-3.5 rounded-xl bg-gradient-to-r from-cyan-400 via-teal-300 to-cyan-400 hover:from-cyan-300 hover:to-teal-200 text-[#031422] font-extrabold text-sm transition-all duration-300 shadow-[0_0_25px_rgba(0,240,255,0.6)] hover:shadow-[0_0_40px_rgba(0,240,255,0.9)] hover:scale-[1.02] active:scale-95 flex items-center justify-center gap-2 cursor-pointer disabled:opacity-60"
                >
                  {isSubmitting ? (
                    <span>Transmitting...</span>
                  ) : (
                    <>
                      <span>Book Free Discovery Session</span>
                      <Send className="w-4 h-4" />
                    </>
                  )}
                </button>
              </div>
            </form>
          </div>

          {/* Right: Remote-First Global Team Info Card */}
          <div className="lg:col-span-4">
            <div className="gradient-card rounded-2xl p-6 border border-cyan-500/25 space-y-5 bg-[#020e18]/80">
              <div>
                <div className="text-xs uppercase tracking-wider font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-cyan-300 to-teal-300">
                  FREE DISCOVERY SESSION
                </div>
                <p className="text-xs text-slate-300 mt-1.5 leading-relaxed">
                  Free 30-minute consultation to evaluate your project scope, technical feasibility, AI requirements, and delivery milestones.
                </p>
              </div>

              {/* Styled 100% Global Remote Grid Visual */}
              <div className="relative rounded-2xl overflow-hidden border border-cyan-500/30 h-44 bg-gradient-to-b from-[#061d31] to-[#03121f] p-4 flex flex-col justify-between group">
                
                {/* Cyber constellation network grid */}
                <div className="absolute inset-0 opacity-40 bg-[radial-gradient(#00f0ff_1px,transparent_1px)] [background-size:16px_16px]"></div>
                
                {/* Global remote network nodes */}
                <div className="relative z-10 flex items-center justify-between">
                  <div className="flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-950/90 border border-cyan-500/40 text-[11px] font-mono text-cyan-300 shadow-[0_0_12px_rgba(0,240,255,0.3)]">
                    <Wifi className="w-3.5 h-3.5 text-cyan-400 animate-pulse" />
                    <span>100% REMOTE-FIRST</span>
                  </div>
                  <span className="text-[10px] text-emerald-400 font-mono font-bold bg-emerald-950/80 px-2 py-0.5 rounded border border-emerald-500/40">
                    24/7 ONLINE
                  </span>
                </div>

                {/* Animated Global Node Connections */}
                <div className="relative z-10 my-auto text-center space-y-1">
                  <div className="flex items-center justify-center gap-3">
                    <div className="w-2.5 h-2.5 rounded-full bg-cyan-400 animate-ping"></div>
                    <span className="text-xs font-bold text-white tracking-wide">
                      Global Distributed Engineering
                    </span>
                    <div className="w-2.5 h-2.5 rounded-full bg-teal-400 animate-ping" style={{ animationDelay: '0.4s' }}></div>
                  </div>
                  <p className="text-[10px] text-slate-400 font-mono">
                    Async Sprints · Seamless Timezone Coverage
                  </p>
                </div>

                {/* Remote Banner Badge */}
                <div className="relative z-10 px-2.5 py-1.5 rounded-lg bg-[#030d17]/90 backdrop-blur-md border border-cyan-500/30 flex items-center justify-between text-[11px]">
                  <div className="flex items-center gap-1.5 text-slate-200">
                    <Globe className="w-3.5 h-3.5 text-cyan-400" />
                    <span className="font-semibold text-cyan-200">Global Remote Team</span>
                  </div>
                  <span className="text-emerald-400 font-mono font-semibold">Active</span>
                </div>
              </div>

              {/* Fast Response & Security Guarantee */}
              <div className="text-[11px] text-slate-300 flex items-center gap-2 pt-1 border-t border-cyan-500/15">
                <ShieldCheck className="w-3.5 h-3.5 text-cyan-400 flex-shrink-0" />
                <span>NDA Protected · Guaranteed reply within 24h</span>
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};
