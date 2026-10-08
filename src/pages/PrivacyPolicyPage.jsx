import React, { useEffect } from 'react';
import { 
  ShieldCheck, 
  Lock, 
  FileText, 
  EyeOff, 
  Database, 
  Server, 
  UserCheck, 
  Mail, 
  ArrowLeft,
  CheckCircle2,
  Cpu,
  Globe
} from 'lucide-react';
import { motion } from 'framer-motion';

export const PrivacyPolicyPage = ({ navigate }) => {
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, []);

  const sections = [
    {
      id: 'commitment',
      icon: ShieldCheck,
      title: '1. Core Privacy Commitment & AI Data Isolation',
      content: `At BrixelLabs, we engineer mission-critical AI models, Computer Vision architectures, and custom enterprise software. We operate under a strict "Zero Public Model Training" guarantee: your proprietary business data, codebases, trade secrets, user telemetry, and communication logs are NEVER used to train, fine-tune, or calibrate public AI foundational models (such as OpenAI, Anthropic, or Meta models) without explicit, contractual authorization. All client intellectual property remains 100% private, sovereign, and isolated.`
    },
    {
      id: 'collection',
      icon: Database,
      title: '2. Information We Collect',
      content: `When you interact with our website, request discovery consultations, or submit project requirements, we collect:
• Contact Details: Full Name, Business Email Address, Phone/WhatsApp number, and Company Name.
• Project Briefs: Technical specifications, target budgets, timelines, architecture requirements, and workflow descriptions submitted via our contact forms.
• Telemetry & Usage Data: Technical diagnostic data including browser type, device resolution, IP address (anonymized), and interaction timestamps collected solely for performance monitoring.`
    },
    {
      id: 'usage',
      icon: Server,
      title: '3. How We Use Your Information',
      content: `We process your data strictly for legitimate engineering and operational purposes:
• Delivering technical scoping reviews, architectural proposals, and cost estimates.
• Communicating during development sprints, demos, and SLA support windows.
• Executing binding Non-Disclosure Agreements (NDAs) and engineering contracts.
• Maintaining website security, preventing automated bot attacks, and optimizing user experience.`
    },
    {
      id: 'spam-protection',
      icon: Lock,
      title: '4. Spam & Bot Protection (Cloudflare Turnstile)',
      content: `We utilize Cloudflare Turnstile on our contact and consultation portals. Turnstile is a modern, privacy-preserving CAPTCHA replacement that verifies human visitors without presenting intrusive puzzles or harvesting user browsing history. Turnstile evaluates non-interactive browser telemetry to block malicious bots while maintaining visitor privacy.`
    },
    {
      id: 'analytics',
      icon: Globe,
      title: '5. Web Analytics & Cookies (Google Analytics 4)',
      content: `We use Google Analytics 4 (GA4) to analyze traffic patterns and user navigation across our site. GA4 is configured with IP anonymization enabled by default. We do not use cross-site tracking or advertising retargeting cookies. You may disable cookies in your browser settings without affecting core site functionality.`
    },
    {
      id: 'ip-protection',
      icon: EyeOff,
      title: '6. Intellectual Property (IP) & Bilateral NDAs',
      content: `All deliverables, source code, neural network checkpoints, trained weights, database schemas, and documentation produced by BrixelLabs for client contracts are assigned 100% to the client upon final milestone payment. We routinely execute bilateral NDAs prior to deep technical architecture reviews.`
    },
    {
      id: 'security',
      icon: Lock,
      title: '7. Data Security & Encryption Standards',
      content: `We enforce industry-standard security protocols across our infrastructure:
• TLS 1.3 encryption for all data in transit across our web endpoints and APIs.
• AES-256 encryption for data at rest.
• Role-based access control (RBAC) restricting project repositories exclusively to assigned senior engineering leads.`
    },
    {
      id: 'rights',
      icon: UserCheck,
      title: '8. Your Rights (GDPR & CCPA Compliance)',
      content: `Depending on your jurisdiction, you possess the right to:
• Request access to the personal data we hold about you.
• Request correction or rectification of outdated or inaccurate information.
• Request permanent erasure ('Right to be Forgotten') of your contact records.
• Withdraw consent for ongoing engineering communications at any time.`
    },
    {
      id: 'contact',
      icon: Mail,
      title: '9. Contact Our Data Protection Lead',
      content: `For questions regarding this Privacy Policy, data access requests, or NDA execution, please reach out to our team directly at brixellabs@gmail.com or via WhatsApp at +92 344 9254864.`
    }
  ];

  return (
    <div className="relative pt-32 sm:pt-40 pb-24 px-4 sm:px-6 lg:px-8 max-w-4xl mx-auto z-10">
      
      {/* Header */}
      <div className="text-center mb-16 space-y-3">
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-cyan-950/80 border border-cyan-500/30 text-cyan-300 text-xs font-mono uppercase tracking-wider"
        >
          <ShieldCheck className="w-3.5 h-3.5 text-cyan-400" />
          <span>Legal &amp; Data Protection</span>
        </motion.div>

        <motion.h1 
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="text-4xl sm:text-5xl font-extrabold text-white tracking-tight"
        >
          Privacy <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-300 via-teal-300 to-indigo-400">Policy</span>
        </motion.h1>

        <motion.p 
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="text-sm sm:text-base text-slate-300 max-w-xl mx-auto font-normal leading-relaxed"
        >
          Effective Date: October 2026 · Last Updated: October 8, 2026
        </motion.p>
      </div>

      {/* Summary Highlight Box */}
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.25 }}
        className="gradient-card rounded-3xl p-6 sm:p-8 border border-cyan-500/40 mb-12 shadow-[0_0_30px_rgba(0,240,255,0.15)] bg-[#04192b]/90"
      >
        <div className="flex items-start gap-4">
          <div className="w-12 h-12 rounded-2xl bg-cyan-400/20 border border-cyan-400/40 flex items-center justify-center text-cyan-300 flex-shrink-0">
            <Lock className="w-6 h-6 text-cyan-400" />
          </div>
          <div className="space-y-2">
            <h2 className="text-lg font-bold text-white">Summary of Core Principles</h2>
            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
              We never sell your data. We never train public AI models on your private source code or datasets. We protect our forms with Cloudflare Turnstile and provide 100% full IP ownership transfer on all engineered solutions.
            </p>
          </div>
        </div>
      </motion.div>

      {/* Detailed Policy Sections */}
      <div className="space-y-8">
        {sections.map((section, idx) => {
          const Icon = section.icon;
          return (
            <motion.div
              key={section.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 + idx * 0.05 }}
              className="gradient-card rounded-3xl p-6 sm:p-8 border border-cyan-500/25 bg-[#031422]/90 space-y-4"
            >
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-[#08243a] border border-cyan-500/30 flex items-center justify-center text-cyan-400 flex-shrink-0">
                  <Icon className="w-5 h-5" />
                </div>
                <h2 className="text-lg sm:text-xl font-bold text-white tracking-tight">
                  {section.title}
                </h2>
              </div>

              <div className="text-xs sm:text-sm text-slate-300 leading-relaxed whitespace-pre-line pl-1 sm:pl-13">
                {section.content}
              </div>
            </motion.div>
          );
        })}
      </div>

      {/* Navigation Footer */}
      <div className="mt-14 pt-8 border-t border-cyan-500/20 flex flex-wrap items-center justify-between gap-4">
        <button
          onClick={() => {
            navigate('/');
            window.scrollTo({ top: 0, behavior: 'smooth' });
          }}
          className="inline-flex items-center gap-2 text-cyan-400 hover:text-cyan-300 text-sm font-semibold cursor-pointer"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Return to Homepage</span>
        </button>

        <button
          onClick={() => {
            navigate('/contact');
            window.scrollTo({ top: 0, behavior: 'smooth' });
          }}
          className="px-6 py-2.5 rounded-xl bg-gradient-to-r from-cyan-400 to-teal-300 text-[#031422] font-bold text-xs hover:opacity-90 transition-opacity cursor-pointer"
        >
          Contact Legal / DPO
        </button>
      </div>

    </div>
  );
};
