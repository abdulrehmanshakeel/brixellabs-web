import React, { useEffect } from 'react';
import { 
  CheckCircle2, 
  ArrowRight, 
  MessageCircle, 
  Mail, 
  Calendar, 
  Clock, 
  ShieldCheck, 
  Sparkles,
  ExternalLink,
  ChevronRight,
  Layers,
  Cpu
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { motion } from 'framer-motion';
import { TiltCard } from '../components/common/TiltCard';
import { projectImages } from '../assets/projects';

export const ThankYouPage = ({ navigate }) => {
  useEffect(() => {
    // Launch celebratory confetti burst
    try {
      confetti({
        particleCount: 100,
        spread: 80,
        origin: { y: 0.4 },
        colors: ['#00f0ff', '#00e5d0', '#38bdf8', '#818cf8', '#ffffff']
      });
    } catch (e) {
      // ignore
    }
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, []);

  const nextSteps = [
    {
      step: '01',
      title: 'Architectural Review',
      time: 'Within 24 Hours',
      desc: 'Our senior AI & full-stack engineers review your brief, technical specifications, and target milestone requirements.',
      icon: Clock,
      gradient: 'from-cyan-500/20 to-blue-500/10'
    },
    {
      step: '02',
      title: 'Mutual NDA & Scope Plan',
      time: 'Confidentiality First',
      desc: 'We execute a mutual Non-Disclosure Agreement (NDA) and draft an initial system design and milestone budget breakdown.',
      icon: ShieldCheck,
      gradient: 'from-teal-500/20 to-emerald-500/10'
    },
    {
      step: '03',
      title: 'Strategy & Live Demo Call',
      time: '30-Min High-Focus Session',
      desc: 'You speak directly with the engineers who will build your system — no sales reps, no layers, pure engineering clarity.',
      icon: Calendar,
      gradient: 'from-indigo-500/20 to-cyan-500/10'
    }
  ];

  const featuredStudies = [
    {
      id: 'threadeye',
      title: 'ThreadEye',
      tag: 'Computer Vision < 14ms',
      desc: 'Sub-14ms textile flaw detection with 99.8% accuracy on NVIDIA Jetson.',
      link: '/case-studies/threadeye',
      img: projectImages.threadeyeInspection
    },
    {
      id: 'noesis',
      title: 'Noesis',
      tag: 'Agentic AI / LangGraph',
      desc: 'Stateful multi-agent study engine with real-time web search and adaptive quizzes.',
      link: '/case-studies/noesis',
      img: projectImages.noesisQuiz
    },
    {
      id: 'getscry',
      title: 'GetScry',
      tag: 'Predictive E-Commerce ML',
      desc: 'Real-time visitor intent scoring pipeline driving a 34% surge in conversions.',
      link: '/case-studies/getscry',
      img: projectImages.getscryDashboard
    }
  ];

  return (
    <div className="relative pt-32 sm:pt-40 pb-24 px-4 sm:px-6 lg:px-8 max-w-6xl mx-auto z-10">
      
      {/* Top Status Header */}
      <div className="text-center space-y-4 max-w-3xl mx-auto mb-16">
        
        {/* Animated Glowing Success Badge */}
        <motion.div
          initial={{ scale: 0, rotate: -20 }}
          animate={{ scale: 1, rotate: 0 }}
          transition={{ type: 'spring', stiffness: 260, damping: 20 }}
          className="w-20 h-20 mx-auto rounded-3xl bg-gradient-to-tr from-cyan-500/20 via-teal-500/20 to-cyan-400/30 border border-cyan-400/50 flex items-center justify-center text-cyan-300 shadow-[0_0_40px_rgba(0,240,255,0.45)] relative"
        >
          <div className="absolute inset-0 rounded-3xl bg-cyan-400/20 animate-ping pointer-events-none" />
          <CheckCircle2 className="w-10 h-10 text-cyan-400" />
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.15 }}
          className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-gradient-to-r from-emerald-950/80 via-teal-950/80 to-[#07243c]/80 border border-emerald-500/40 text-emerald-300 text-xs font-mono uppercase tracking-wider shadow-[0_0_25px_rgba(16,185,129,0.25)]"
        >
          <Sparkles className="w-3.5 h-3.5 text-emerald-400" />
          <span>Inquiry Received &amp; Logged to System</span>
        </motion.div>

        <motion.h1 
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.25 }}
          className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-white tracking-tight"
        >
          Thank You! <br />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-300 via-teal-300 to-indigo-400 drop-shadow-[0_0_35px_rgba(0,240,255,0.45)]">
            We're On It.
          </span>
        </motion.h1>

        <motion.p 
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.35 }}
          className="text-base sm:text-lg text-slate-300 font-normal leading-relaxed max-w-xl mx-auto"
        >
          Your project specifications have been securely transmitted to our engineering team. We review every brief with senior architects before reaching out.
        </motion.p>

        {/* Immediate Direct Contact Pill */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.45 }}
          className="pt-2 flex flex-wrap items-center justify-center gap-3 text-xs"
        >
          <a
            href="https://wa.me/923449254864"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-[#082238] border border-cyan-500/40 text-cyan-300 hover:text-white hover:border-cyan-400 hover:bg-cyan-500/20 transition-all font-mono"
          >
            <MessageCircle className="w-4 h-4 text-emerald-400" />
            <span>Need immediate reply? Chat on WhatsApp</span>
          </a>

          <a
            href="https://mail.google.com/mail/?view=cm&fs=1&to=brixellabs@gmail.com"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-[#082238] border border-cyan-500/40 text-cyan-300 hover:text-white hover:border-cyan-400 hover:bg-cyan-500/20 transition-all font-mono"
          >
            <Mail className="w-4 h-4 text-cyan-400" />
            <span>brixellabs@gmail.com</span>
          </a>
        </motion.div>

      </div>

      {/* 3-Step Process Breakdown */}
      <div className="mb-20">
        <div className="text-center mb-8">
          <h2 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
            What Happens <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-300 via-teal-300 to-indigo-400">Next</span>
          </h2>
          <p className="text-xs sm:text-sm text-slate-400 mt-1">Our streamlined onboarding and discovery process.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {nextSteps.map((step, idx) => {
            const Icon = step.icon;
            return (
              <motion.div
                key={step.step}
                initial={{ opacity: 0, y: 25 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 + idx * 0.1 }}
                className="h-full"
              >
                <TiltCard className="h-full">
                  <div className="gradient-card rounded-3xl p-6 sm:p-8 border border-cyan-500/30 flex flex-col justify-between h-full relative overflow-hidden group hover:border-cyan-400/80 transition-all duration-300">
                    <div className={`absolute -top-16 -right-16 w-36 h-36 rounded-full blur-3xl opacity-30 bg-gradient-to-br ${step.gradient} pointer-events-none`} />

                    <div>
                      <div className="flex items-center justify-between mb-4">
                        <span className="font-mono text-2xl font-black text-cyan-400/40 group-hover:text-cyan-400 transition-colors">
                          {step.step}
                        </span>
                        <span className="px-2.5 py-1 rounded-full bg-cyan-950/80 border border-cyan-500/30 text-[11px] font-mono text-cyan-300">
                          {step.time}
                        </span>
                      </div>

                      <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-[#092b45] to-[#041525] border border-cyan-500/35 flex items-center justify-center text-cyan-400 mb-4 group-hover:shadow-[0_0_20px_rgba(0,240,255,0.4)] transition-all">
                        <Icon className="w-6 h-6" />
                      </div>

                      <h3 className="text-lg font-bold text-white mb-2 group-hover:text-cyan-300 transition-colors">
                        {step.title}
                      </h3>

                      <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                        {step.desc}
                      </p>
                    </div>
                  </div>
                </TiltCard>
              </motion.div>
            );
          })}
        </div>
      </div>

      {/* Featured Case Studies to Explore while waiting */}
      <div className="mb-16">
        <div className="text-center mb-8">
          <h2 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
            Explore Live <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-300 via-teal-300 to-white">Case Studies</span>
          </h2>
          <p className="text-xs sm:text-sm text-slate-400 mt-1">See how our deployed AI models and systems perform in production.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {featuredStudies.map((item) => (
            <div 
              key={item.id}
              onClick={() => {
                navigate(item.link);
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
              className="gradient-card rounded-3xl p-5 border border-cyan-500/30 hover:border-cyan-400 cursor-pointer group transition-all duration-300 flex flex-col justify-between"
            >
              <div>
                <div className="h-36 rounded-2xl overflow-hidden mb-4 bg-[#051a2a] border border-cyan-500/20 relative">
                  <img 
                    src={item.img} 
                    alt={`${item.title} — BrixelLabs Production Case Study`}
                    loading="lazy" 
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute top-2 left-2 px-2 py-0.5 rounded bg-black/80 border border-cyan-500/40 text-[10px] font-mono text-cyan-300">
                    {item.tag}
                  </div>
                </div>

                <h3 className="text-lg font-bold text-white group-hover:text-cyan-300 transition-colors">
                  {item.title}
                </h3>
                <p className="text-xs text-slate-400 mt-1 leading-relaxed">
                  {item.desc}
                </p>
              </div>

              <div className="pt-4 mt-3 border-t border-cyan-500/20 flex items-center justify-between text-xs text-cyan-400 font-semibold">
                <span>View Full Case Study</span>
                <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Action Buttons */}
      <div className="flex flex-wrap items-center justify-center gap-4 pt-4">
        <button
          onClick={() => {
            navigate('/');
            window.scrollTo({ top: 0, behavior: 'smooth' });
          }}
          className="px-8 py-3.5 rounded-xl bg-gradient-to-r from-cyan-400 via-teal-300 to-cyan-400 hover:from-cyan-300 hover:to-teal-200 text-[#031422] font-extrabold text-sm transition-all duration-300 shadow-[0_0_25px_rgba(0,240,255,0.6)] cursor-pointer"
        >
          Return to Homepage
        </button>

        <button
          onClick={() => {
            navigate('/services');
            window.scrollTo({ top: 0, behavior: 'smooth' });
          }}
          className="px-8 py-3.5 rounded-xl bg-[#082238] border border-cyan-500/40 text-cyan-300 hover:text-white hover:border-cyan-400 font-bold text-sm transition-all cursor-pointer"
        >
          View All Services &amp; Capabilities
        </button>
      </div>

    </div>
  );
};
