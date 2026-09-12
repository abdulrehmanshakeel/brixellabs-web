import React from 'react';
import { ArrowRight, ChevronDown, Cpu, Layers, Play, CheckCircle2, Zap, Radio } from 'lucide-react';
import { motion } from 'framer-motion';
import { HeroBrainVideoAnimation } from './HeroBrainVideoAnimation';
import { AnimatedCounter } from '../common/AnimatedCounter';

export const HeroSection = ({ navigate, openConsultation, openShowreel }) => {
  return (
    <section className="relative pt-32 sm:pt-40 pb-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto z-10 min-h-[95vh] flex flex-col justify-center overflow-hidden">
      
      {/* BACKGROUND VIDEO & GRADIENT LAYER */}
      <div className="absolute inset-0 pointer-events-none z-0 overflow-hidden flex items-center justify-center [transform:translateZ(0)]">
        {/* Giant Pulsing Gradient Aurora Blobs (Responsive blur to avoid mobile GPU fillrate bottleneck) */}
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[350px] sm:w-[650px] lg:w-[850px] h-[350px] sm:h-[500px] lg:h-[600px] bg-gradient-to-br from-cyan-500/20 via-teal-400/15 to-indigo-600/10 blur-2xl sm:blur-[100px] lg:blur-[140px] rounded-full animate-pulse-slow"></div>
        <div className="absolute top-1/3 -right-20 w-[300px] sm:w-[500px] lg:w-[600px] h-[300px] sm:h-[500px] lg:h-[600px] bg-gradient-to-l from-fuchsia-600/10 via-cyan-500/15 to-transparent blur-2xl sm:blur-[100px] lg:blur-[160px] rounded-full"></div>
        <div className="absolute -bottom-20 -left-20 w-[300px] sm:w-[500px] lg:w-[600px] h-[300px] sm:h-[500px] lg:h-[600px] bg-gradient-to-r from-blue-600/15 via-teal-500/10 to-transparent blur-2xl sm:blur-[100px] lg:blur-[150px] rounded-full"></div>

        {/* Ambient Neural Background Rings (Hidden on mobile to save GPU compositing passes) */}
        <div className="absolute inset-0 hidden lg:flex items-center justify-center opacity-35 pointer-events-none">
          <div className="w-[800px] h-[800px] rounded-full border border-cyan-400/15 animate-spin" style={{ animationDuration: '40s' }} />
          <div className="w-[600px] h-[600px] rounded-full border border-dashed border-teal-300/20 animate-spin" style={{ animationDuration: '25s' }} />
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center relative z-10">
        
        {/* Left Column: Headline, Stats & Action Buttons */}
        <div className="lg:col-span-6 space-y-6 sm:space-y-8 text-left">
          
          {/* Top Pill Badge with Official Company Tagline */}
          <motion.div 
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center gap-2.5 px-4 py-1.5 rounded-full bg-gradient-to-r from-cyan-950/80 via-[#07243c]/80 to-teal-950/80 border border-cyan-400/40 text-cyan-300 text-xs sm:text-sm font-medium tracking-wide shadow-[0_0_25px_rgba(0,240,255,0.3)] backdrop-blur-xl"
          >
            <span className="w-2 h-2 rounded-full bg-cyan-400 animate-ping"></span>
            <span className="font-mono uppercase tracking-widest text-[11px] sm:text-xs text-transparent bg-clip-text bg-gradient-to-r from-cyan-300 via-teal-300 to-white font-extrabold">
              Design · Build · Automate
            </span>
          </motion.div>

          {/* Main Title with Multi-Color Gradient */}
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-white tracking-tight leading-[1.12]"
          >
            Full-Stack Tech <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-300 via-teal-300 to-indigo-400 drop-shadow-[0_0_40px_rgba(0,240,255,0.55)]">
              & AI Solutions
            </span>
          </motion.h1>

          {/* Subtitle */}
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-base sm:text-lg text-slate-300 max-w-xl font-normal leading-relaxed"
          >
            We <strong className="text-cyan-300 font-semibold">Design</strong> intuitive user experiences, <strong className="text-teal-300 font-semibold">Build</strong> scalable full-stack applications & custom AI models, and <strong className="text-indigo-300 font-semibold">Automate</strong> mission-critical business pipelines.
          </motion.p>

          {/* CTA Buttons */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="flex flex-wrap items-center gap-3 pt-1"
          >
            <button
              onClick={() => {
                navigate('/services');
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
              className="px-6 py-3.5 rounded-xl bg-gradient-to-r from-cyan-400 via-teal-300 to-cyan-400 hover:from-cyan-300 hover:to-teal-200 text-[#031525] font-extrabold text-sm transition-all duration-300 shadow-[0_0_30px_rgba(0,240,255,0.65)] hover:shadow-[0_0_45px_rgba(0,240,255,0.95)] hover:scale-[1.03] active:scale-95 cursor-pointer flex items-center gap-2"
            >
              <span>View Services</span>
              <ArrowRight className="w-4 h-4" />
            </button>

            {openShowreel && (
              <button
                onClick={() => openShowreel(0)}
                className="px-5 py-3.5 rounded-xl bg-[#092a47]/90 hover:bg-[#0e3b63] text-white border border-cyan-400/50 hover:border-cyan-300 font-bold text-sm transition-all shadow-[0_0_20px_rgba(0,240,255,0.35)] cursor-pointer flex items-center gap-2 group"
              >
                <div className="w-5 h-5 rounded-full bg-cyan-400 text-[#031422] flex items-center justify-center group-hover:scale-110 transition-transform shadow-[0_0_10px_#00f0ff]">
                  <Play className="w-2.5 h-2.5 ml-0.5" />
                </div>
                <span>Watch Showreel</span>
              </button>
            )}

            <button
              onClick={openConsultation}
              className="px-5 py-3.5 rounded-xl bg-[#051a2d]/80 hover:bg-[#092640] text-slate-300 hover:text-white border border-cyan-500/30 hover:border-cyan-400/60 font-semibold text-sm transition-all cursor-pointer"
            >
              Get Free Consultation
            </button>
          </motion.div>

          {/* Metric Stats Ribbon with Gradient Frames */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="grid grid-cols-3 gap-3.5 pt-4 border-t border-cyan-500/20 max-w-lg"
          >
            <div className="gradient-card rounded-2xl p-3 text-center border border-cyan-500/30">
              <div className="text-xl sm:text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-cyan-300 to-teal-300 font-mono">
                <AnimatedCounter value={99.8} decimals={1} suffix="%" />
              </div>
              <div className="text-[10px] text-slate-400 font-medium mt-0.5">Vision Accuracy</div>
            </div>

            <div className="gradient-card rounded-2xl p-3 text-center border border-cyan-500/30">
              <div className="text-xl sm:text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-cyan-300 to-teal-300 font-mono">
                &lt;<AnimatedCounter value={14} suffix="ms" />
              </div>
              <div className="text-[10px] text-slate-400 font-medium mt-0.5">Edge AI Latency</div>
            </div>

            <div className="gradient-card rounded-2xl p-3 text-center border border-cyan-500/30">
              <div className="text-xl sm:text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-cyan-300 to-teal-300 font-mono">
                <AnimatedCounter value={99.99} decimals={2} suffix="%" />
              </div>
              <div className="text-[10px] text-slate-400 font-medium mt-0.5">Platform Uptime</div>
            </div>
          </motion.div>

        </div>

        {/* Right Column: Hero Brain Video Animation Console */}
        <motion.div 
          initial={{ opacity: 0, scale: 0.92 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="lg:col-span-6 flex items-center justify-center relative"
        >
          {/* Main Hero Brain Chip Animated Video Console */}
          <HeroBrainVideoAnimation />
        </motion.div>

      </div>

      {/* Scroll Down Indicator */}
      <div className="mt-16 sm:mt-20 flex justify-center relative z-10">
        <motion.a 
          href="#services"
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
          className="p-2.5 rounded-full bg-[#051829]/80 border border-cyan-500/30 text-cyan-400 hover:text-white hover:border-cyan-400 transition-all shadow-[0_0_15px_rgba(0,240,255,0.25)] backdrop-blur-md"
          aria-label="Scroll to services"
        >
          <ChevronDown className="w-5 h-5" />
        </motion.a>
      </div>

    </section>
  );
};
