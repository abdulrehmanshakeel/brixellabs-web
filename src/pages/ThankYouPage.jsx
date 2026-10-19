import React, { useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { 
  faCircleCheck, 
  faClock, 
  faShieldHalved, 
  faCalendarDays, 
  faChevronRight,
  faEnvelope
} from '@fortawesome/free-solid-svg-icons';
import { faWhatsapp } from '@fortawesome/free-brands-svg-icons';
import confetti from 'canvas-confetti';
import { motion } from 'framer-motion';
import { projectImages } from '../assets/projects';
import { CopyButton } from '../components/common/CopyButton';

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
      icon: faClock,
      gradient: 'from-cyan-500/20 to-blue-500/10'
    },
    {
      step: '02',
      title: 'Mutual NDA & Scope Plan',
      time: 'Confidentiality First',
      desc: 'We execute a mutual Non-Disclosure Agreement (NDA) and draft an initial system design and milestone budget breakdown.',
      icon: faShieldHalved,
      gradient: 'from-teal-500/20 to-emerald-500/10'
    },
    {
      step: '03',
      title: 'Strategy & Live Demo Call',
      time: '30-Min High-Focus Session',
      desc: 'You speak directly with the engineers who will build your system: no sales reps, no layers, pure engineering clarity.',
      icon: faCalendarDays,
      gradient: 'from-indigo-500/20 to-cyan-500/10'
    }
  ];

  const featuredStudies = [
    {
      id: 'threadeye',
      title: 'ThreadEye',
      tag: 'Computer Vision AI',
      desc: 'Real-time camera defect detection catching fabric flaws on the production floor.',
      link: '/case-studies/threadeye',
      img: projectImages.threadeyeInspection
    },
    {
      id: 'noesis',
      title: 'Noesis',
      tag: 'Smart AI Assistant',
      desc: 'Intelligent AI study helper with web research summaries and adaptive quizzes.',
      link: '/case-studies/noesis',
      img: projectImages.noesisQuiz
    },
    {
      id: 'getscry',
      title: 'GetScry',
      tag: 'E-Commerce Sales AI',
      desc: 'Real-time visitor intent scoring to predict and prevent cart abandonment.',
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
          <FontAwesomeIcon icon={faCircleCheck} className="w-10 h-10 text-white" />
        </motion.div>

        <motion.h1 
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.25 }}
          className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-white tracking-tight"
        >
          Thank You! <br />
          We're On It.
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
            href="https://wa.me/923449254864?text=Hi%20BrixelLabs%2C%20I%20just%20submitted%20a%20project%20inquiry."
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-[#082238] border border-cyan-500/40 text-cyan-300 hover:text-white hover:border-cyan-400 hover:bg-cyan-500/20 transition-all font-mono"
          >
            <FontAwesomeIcon icon={faWhatsapp} className="w-4 h-4 text-emerald-400" />
            <span>Need immediate reply? Chat on WhatsApp</span>
          </a>

          <div className="inline-flex items-center gap-1.5">
            <a
              href="mailto:brixellabs@gmail.com"
              className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-[#082238] border border-cyan-500/40 text-cyan-300 hover:text-white hover:border-cyan-400 hover:bg-cyan-500/20 transition-all font-mono"
            >
              <FontAwesomeIcon icon={faEnvelope} className="w-4 h-4 text-white" />
              <span>brixellabs@gmail.com</span>
            </a>
            <CopyButton text="brixellabs@gmail.com" label="Copy" />
          </div>
        </motion.div>

      </div>

      {/* 3-Step Process Breakdown - Cardless Architecture */}
      <div className="mb-20 pt-10 border-t border-slate-800/80">
        <div className="text-center mb-10">
          <span className="text-xs font-mono tracking-widest text-cyan-400 uppercase">Onboarding Lifecycle</span>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight mt-1">
            What Happens Next
          </h2>
          <p className="text-xs sm:text-sm text-slate-400 mt-1 max-w-lg mx-auto">
            Our streamlined engineering onboarding and architectural discovery process.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 relative">
          {nextSteps.map((step, idx) => (
            <motion.div
              key={step.step}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 + idx * 0.1 }}
              className="border-l border-slate-800 hover:border-cyan-500/60 transition-colors pl-5 py-1"
            >
              <div className="flex items-center justify-between mb-3">
                <span className="font-mono text-3xl font-bold text-slate-700">
                  {step.step}
                </span>
                <span className="px-2.5 py-0.5 rounded text-[11px] font-mono text-cyan-400 bg-cyan-950/40 border border-cyan-800/40">
                  {step.time}
                </span>
              </div>

              <div className="flex items-center gap-2.5 mb-2">
                <div className="w-8 h-8 rounded-lg bg-slate-900 border border-slate-800 flex items-center justify-center text-white">
                  <FontAwesomeIcon icon={step.icon} className="w-4 h-4 text-white" />
                </div>
                <h3 className="text-base font-bold text-white">
                  {step.title}
                </h3>
              </div>

              <p className="text-xs sm:text-sm text-slate-400 leading-relaxed">
                {step.desc}
              </p>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Featured Case Studies to Explore while waiting */}
      <div className="mb-16 pt-10 border-t border-slate-800/80">
        <div className="text-center mb-10">
          <span className="text-xs font-mono tracking-widest text-cyan-400 uppercase">Active Deployments</span>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight mt-1">
            Explore Live Case Studies
          </h2>
          <p className="text-xs sm:text-sm text-slate-400 mt-1">See how our deployed AI models and systems perform in production.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {featuredStudies.map((item) => (
            <a 
              key={item.id}
              href={item.link}
              onClick={(e) => {
                if (navigate) {
                  e.preventDefault();
                  navigate(item.link);
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                }
              }}
              className="bg-slate-950/60 rounded-2xl p-5 border border-slate-800/80 hover:border-slate-700 cursor-pointer group transition-all duration-300 flex flex-col justify-between"
            >
              <div>
                <div className="h-36 rounded-xl overflow-hidden mb-4 bg-slate-900 border border-slate-800/60 relative">
                  <img 
                    src={item.img} 
                    alt={`${item.title}: BrixelLabs Production Case Study`}
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

              <div className="pt-4 mt-3 border-t border-slate-800/80 flex items-center justify-between text-xs text-cyan-400 font-semibold">
                <span>View Full Case Study</span>
                <FontAwesomeIcon icon={faChevronRight} className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </div>
            </a>
          ))}
        </div>
      </div>

      {/* Action Buttons */}
      <div className="flex flex-wrap items-center justify-center gap-4 pt-4">
        <a
          href="/"
          onClick={(e) => {
            if (navigate) {
              e.preventDefault();
              navigate('/');
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }
          }}
          className="btn-primary inline-flex items-center justify-center"
        >
          Return to Homepage
        </a>

        <a
          href="/services"
          onClick={(e) => {
            if (navigate) {
              e.preventDefault();
              navigate('/services');
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }
          }}
          className="px-8 py-3.5 rounded-xl bg-[#082238] border border-cyan-500/40 text-cyan-300 hover:text-white hover:border-cyan-400 font-bold text-sm transition-all cursor-pointer inline-flex items-center justify-center"
        >
          View All Services &amp; Capabilities
        </a>
      </div>

    </div>
  );
};
