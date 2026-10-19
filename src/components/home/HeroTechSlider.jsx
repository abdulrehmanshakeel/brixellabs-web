import React, { useState, useEffect, useRef, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { 
  faChevronLeft, 
  faChevronRight, 
  faPlay, 
  faPause,
  faMicrochip,
  faEye,
  faNetworkWired,
  faServer
} from '@fortawesome/free-solid-svg-icons';

import neuralCoreImg from '../../assets/hero-slider/neural_core.webp';
import computerVisionImg from '../../assets/hero-slider/computer_vision.webp';
import agentOrchestrationImg from '../../assets/hero-slider/agent_orchestration.webp';
import cloudMeshImg from '../../assets/hero-slider/cloud_mesh.webp';

const SLIDES = [
  {
    id: 'neural-core',
    icon: faMicrochip,
    category: 'SMART AI · AUTOMATION',
    title: 'Custom AI Assistants & Automation',
    description: 'Intelligent AI models tailored to your business, answering inquiries, organizing data, and automating daily operations.',
    metrics: [
      { label: 'Response', value: 'Real-Time' },
      { label: 'Accuracy', value: '99.4%' },
      { label: 'Uptime', value: '99.9%' },
    ],
    image: neuralCoreImg,
    badgeColor: 'border-cyan-400/50 text-cyan-300 bg-cyan-950/80',
    accentColor: '#00f0ff',
  },
  {
    id: 'computer-vision',
    icon: faEye,
    category: 'COMPUTER VISION · SMART CAMERAS',
    title: 'Real-Time Camera & Quality Inspection AI',
    description: 'Automated camera systems that spot defects, monitor assembly lines, and improve factory quality control.',
    metrics: [
      { label: 'Precision', value: '99.8%' },
      { label: 'Speed', value: 'Instant' },
      { label: 'Defect Reduction', value: '82%' },
    ],
    image: computerVisionImg,
    badgeColor: 'border-emerald-400/50 text-emerald-300 bg-emerald-950/80',
    accentColor: '#10b981',
  },
  {
    id: 'agentic-swarms',
    icon: faNetworkWired,
    category: 'AI WORKFLOWS · MULTI-STEP AGENTS',
    title: 'Intelligent Automated Business Teams',
    description: 'Automated AI helpers working together to research information, draft reports, and execute multi-step tasks.',
    metrics: [
      { label: 'Task Success', value: '99.2%' },
      { label: 'Time Saved', value: '15+ hrs/wk' },
      { label: 'Reliability', value: '100%' },
    ],
    image: agentOrchestrationImg,
    badgeColor: 'border-fuchsia-400/50 text-fuchsia-300 bg-fuchsia-950/80',
    accentColor: '#d946ef',
  },
  {
    id: 'cloud-mesh',
    icon: faServer,
    category: 'SECURE CLOUD · GLOBAL HOSTING',
    title: 'Fast & Reliable Cloud Infrastructure',
    description: 'High-availability cloud hosting with automated backups, global speed, and 24/7 performance monitoring.',
    metrics: [
      { label: 'System Uptime', value: '99.99%' },
      { label: 'Monthly Traffic', value: 'Millions' },
      { label: 'Error Rate', value: '0.001%' },
    ],
    image: cloudMeshImg,
    badgeColor: 'border-blue-400/50 text-blue-300 bg-blue-950/80',
    accentColor: '#38bdf8',
  },
];

const AUTO_SLIDE_INTERVAL = 5000; // 5 seconds per user request

export const HeroTechSlider = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [direction, setDirection] = useState(1);
  const [isPaused, setIsPaused] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const timerRef = useRef(null);

  const nextSlide = useCallback(() => {
    setDirection(1);
    setCurrentIndex((prev) => (prev + 1) % SLIDES.length);
  }, []);

  const prevSlide = useCallback(() => {
    setDirection(-1);
    setCurrentIndex((prev) => (prev - 1 + SLIDES.length) % SLIDES.length);
  }, []);

  const goToSlide = (index) => {
    setDirection(index > currentIndex ? 1 : -1);
    setCurrentIndex(index);
  };

  // 5-second automatic sliding loop
  useEffect(() => {
    if (isPaused || isHovered) {
      if (timerRef.current) clearInterval(timerRef.current);
      return;
    }

    timerRef.current = setInterval(() => {
      nextSlide();
    }, AUTO_SLIDE_INTERVAL);

    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [nextSlide, isPaused, isHovered, currentIndex]);

  const currentSlide = SLIDES[currentIndex];

  const slideVariants = {
    enter: (dir) => ({
      x: dir > 0 ? '100%' : '-100%',
      opacity: 0,
      scale: 1.04,
    }),
    center: {
      x: 0,
      opacity: 1,
      scale: 1,
      transition: {
        x: { type: 'spring', stiffness: 320, damping: 32 },
        opacity: { duration: 0.4 },
        scale: { duration: 0.6, ease: 'easeOut' },
      },
    },
    exit: (dir) => ({
      x: dir > 0 ? '-100%' : '100%',
      opacity: 0,
      scale: 0.96,
      transition: {
        x: { type: 'spring', stiffness: 320, damping: 32 },
        opacity: { duration: 0.35 },
      },
    }),
  };

  return (
    <div 
      className="relative w-full max-w-2xl mx-auto select-none"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Outer Ambient Glow Aura */}
      <div 
        className="absolute -inset-1 rounded-3xl opacity-40 blur-xl transition-all duration-700 pointer-events-none"
        style={{
          background: `radial-gradient(circle at 50% 50%, ${currentSlide.accentColor} 0%, transparent 70%)`,
        }}
      />

      {/* Cyber Frame Container */}
      <div className="relative rounded-2xl sm:rounded-3xl bg-gradient-to-b from-[#08243c]/95 via-[#041626]/98 to-[#020b12] border border-cyan-500/40 p-1.5 sm:p-2 shadow-[0_0_40px_rgba(0,240,255,0.22)] overflow-hidden">
        
        {/* Top HUD Bar */}
        <div className="flex items-center justify-between px-3.5 sm:px-4 py-2 sm:py-2.5 bg-[#051a2d]/90 border-b border-cyan-500/30 rounded-t-xl sm:rounded-t-2xl backdrop-blur-md">
          {/* Left: Capability Header */}
          <div className="flex items-center gap-2 text-xs font-mono">
            <span className="text-white font-bold tracking-wider text-[11px] sm:text-xs">
              TECH CAPABILITIES
            </span>
            <span className="hidden sm:inline-flex items-center px-2 py-0.5 rounded-full text-[10px] font-mono font-semibold border border-cyan-500/30 text-cyan-300 bg-cyan-950/60">
              5S AUTO-CYCLE
            </span>
          </div>

          {/* Right: Controls & Slide Counter */}
          <div className="flex items-center gap-2 sm:gap-3">
            {/* Slide Index Counter */}
            <div className="text-[11px] font-mono text-slate-300">
              <span className="text-white font-bold">0{currentIndex + 1}</span>
              <span className="text-slate-500 mx-1">/</span>
              <span className="text-slate-400">0{SLIDES.length}</span>
            </div>

            {/* Play / Pause Toggle Button */}
            <button
              onClick={() => setIsPaused(!isPaused)}
              className="p-1.5 rounded-lg bg-[#08233b] hover:bg-[#0c3355] text-white border border-cyan-500/30 transition-colors cursor-pointer"
              title={isPaused ? "Resume 5s Auto-slide" : "Pause 5s Auto-slide"}
              aria-label={isPaused ? "Resume 5s Auto-slide" : "Pause 5s Auto-slide"}
            >
              <FontAwesomeIcon 
                icon={isPaused ? faPlay : faPause} 
                className="w-3 h-3 text-white" 
              />
            </button>
          </div>
        </div>

        {/* Viewport Frame with AnimatePresence */}
        <div className="relative aspect-[16/10] sm:aspect-[16/9] w-full overflow-hidden bg-[#020b12] rounded-xl sm:rounded-2xl">
          
          <AnimatePresence initial={false} custom={direction} mode="wait">
            <motion.div
              key={currentSlide.id}
              custom={direction}
              variants={slideVariants}
              initial="enter"
              animate="center"
              exit="exit"
              className="absolute inset-0 w-full h-full"
            >
              {/* Tech Image */}
              <img
                src={currentSlide.image}
                alt={`${currentSlide.title} - BrixelLabs Technical Architecture`}
                width="1280"
                height="720"
                className="w-full h-full object-cover object-center"
                loading="eager"
              />

              {/* Gradient Vignette Overlays for Maximum Readability */}
              <div className="absolute inset-0 bg-gradient-to-t from-[#020b12] via-[#020b12]/30 to-transparent pointer-events-none" />
              <div className="absolute inset-0 bg-gradient-to-r from-[#020b12]/50 via-transparent to-[#020b12]/50 pointer-events-none" />

              {/* Top Badge Overlay */}
              <div className="absolute top-3 left-3 sm:top-4 sm:left-4 z-10">
                <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[10px] sm:text-xs font-mono font-bold border backdrop-blur-md shadow-lg ${currentSlide.badgeColor}`}>
                  <FontAwesomeIcon icon={currentSlide.icon} className="w-3 h-3 text-white" />
                  <span>{currentSlide.category}</span>
                </span>
              </div>

              {/* Bottom Content Card Overlay */}
              <div className="absolute bottom-3 left-3 right-3 sm:bottom-4 sm:left-4 sm:right-4 z-10 bg-[#031322]/85 backdrop-blur-md border border-cyan-500/30 rounded-xl sm:rounded-2xl p-3.5 sm:p-4 shadow-xl">
                <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-3">
                  {/* Left: Titles */}
                  <div className="space-y-1 max-w-md">
                    <h3 className="text-sm sm:text-base font-bold text-white tracking-tight leading-snug">
                      {currentSlide.title}
                    </h3>
                    <p className="text-[11px] sm:text-xs text-slate-300 line-clamp-2 leading-relaxed">
                      {currentSlide.description}
                    </p>
                  </div>

                  {/* Right: Real-time Telemetry Stats */}
                  <div className="flex items-center gap-2 border-t sm:border-t-0 sm:border-l border-cyan-500/25 pt-2 sm:pt-0 sm:pl-3.5 shrink-0">
                    {currentSlide.metrics.map((metric, idx) => (
                      <div key={idx} className="text-center px-1.5 sm:px-2">
                        <div className="text-[11px] sm:text-xs font-mono font-extrabold text-white">
                          {metric.value}
                        </div>
                        <div className="text-[9px] font-mono text-slate-400 uppercase tracking-wider">
                          {metric.label}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>

          {/* Manual Arrow Controls (Overlay) */}
          <button
            onClick={prevSlide}
            aria-label="Previous tech visual"
            className="absolute left-2 top-1/2 -translate-y-1/2 z-20 w-8 h-8 sm:w-9 sm:h-9 rounded-full bg-black/60 hover:bg-white text-white hover:text-[#030f1d] border border-white/20 hover:border-white flex items-center justify-center transition-all duration-200 cursor-pointer shadow-lg backdrop-blur-sm group"
          >
            <FontAwesomeIcon 
              icon={faChevronLeft} 
              className="text-xs group-hover:text-[#030f1d] transition-colors" 
            />
          </button>

          <button
            onClick={nextSlide}
            aria-label="Next tech visual"
            className="absolute right-2 top-1/2 -translate-y-1/2 z-20 w-8 h-8 sm:w-9 sm:h-9 rounded-full bg-black/60 hover:bg-white text-white hover:text-[#030f1d] border border-white/20 hover:border-white flex items-center justify-center transition-all duration-200 cursor-pointer shadow-lg backdrop-blur-sm group"
          >
            <FontAwesomeIcon 
              icon={faChevronRight} 
              className="text-xs group-hover:text-[#030f1d] transition-colors" 
            />
          </button>
        </div>

        {/* Bottom 5-Second Progress Bar & Interactive Slide Selectors */}
        <div className="mt-2 px-2 py-1.5 flex items-center justify-between gap-3 bg-[#041627]/90 rounded-b-xl sm:rounded-b-2xl border-t border-cyan-500/20">
          
          {/* Thumbnails / Indicators */}
          <div className="flex items-center gap-1.5 sm:gap-2 flex-1">
            {SLIDES.map((slide, index) => {
              const isActive = index === currentIndex;
              return (
                <button
                  key={slide.id}
                  onClick={() => goToSlide(index)}
                  className={`h-2 rounded-full transition-all duration-300 relative overflow-hidden cursor-pointer ${
                    isActive 
                      ? 'w-10 sm:w-16 bg-white/20' 
                      : 'w-3 sm:w-4 bg-slate-700 hover:bg-slate-500'
                  }`}
                  title={slide.title}
                  aria-label={`Go to slide ${index + 1}: ${slide.title}`}
                >
                  {/* Dynamic 5-Second Filling Progress Bar for Active Slide */}
                  {isActive && !isPaused && !isHovered && (
                    <motion.div
                      key={`progress-${currentIndex}`}
                      initial={{ width: '0%' }}
                      animate={{ width: '100%' }}
                      transition={{ 
                        duration: AUTO_SLIDE_INTERVAL / 1000, 
                        ease: 'linear' 
                      }}
                      className="absolute inset-0 bg-white rounded-full shadow-[0_0_8px_rgba(255,255,255,0.8)]"
                    />
                  )}
                  {isActive && (isPaused || isHovered) && (
                    <div className="absolute inset-0 bg-white rounded-full" />
                  )}
                </button>
              );
            })}
          </div>

          {/* Quick Caption */}
          <div className="text-[10px] font-mono text-slate-400 shrink-0 hidden sm:block">
            {isHovered ? (
              <span className="text-cyan-300 font-semibold">Paused on hover</span>
            ) : isPaused ? (
              <span className="text-amber-300 font-semibold">Auto-slide paused</span>
            ) : (
              <span>Auto-cycle in 5s</span>
            )}
          </div>

        </div>

      </div>
    </div>
  );
};
