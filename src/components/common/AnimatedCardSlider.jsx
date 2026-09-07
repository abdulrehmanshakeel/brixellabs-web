import React, { useState, useEffect, useRef } from 'react';
import { ChevronLeft, ChevronRight, Play, Pause, Clock } from 'lucide-react';
import { motion, AnimatePresence, useInView } from 'framer-motion';

export const AnimatedCardSlider = ({ 
  items = [], 
  renderCard, 
  title = "", 
  autoPlayInterval = 5500, // 5.5 seconds comfortable stay time on screen
  autoPlay = true,
  className = "",
  cardsPerView = 1
}) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [direction, setDirection] = useState(1);
  const [isAutoPlaying, setIsAutoPlaying] = useState(autoPlay);
  const [isHovered, setIsHovered] = useState(false);
  const [timerProgress, setTimerProgress] = useState(0);
  const containerRef = useRef(null);
  const isInView = useInView(containerRef, { amount: 0.25 });

  const total = items.length;

  // Reset index if items change and index is out of bounds
  useEffect(() => {
    if (currentIndex >= total && total > 0) {
      setCurrentIndex(0);
    }
  }, [total, currentIndex]);

  // Auto-play timer: only runs when in view, so it doesn't flip slides in the background
  useEffect(() => {
    if (!isAutoPlaying || isHovered || total <= 1 || !isInView) {
      setTimerProgress(0);
      return;
    }

    const stepMs = 40;
    const totalSteps = autoPlayInterval / stepMs;
    let currentStep = 0;

    const intervalTimer = setInterval(() => {
      currentStep++;
      setTimerProgress((currentStep / totalSteps) * 100);

      if (currentStep >= totalSteps) {
        currentStep = 0;
        setTimerProgress(0);
        handleNext();
      }
    }, stepMs);

    return () => clearInterval(intervalTimer);
  }, [currentIndex, isAutoPlaying, isHovered, total, autoPlayInterval]);

  // Keyboard navigation (Arrow keys)
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'ArrowRight') {
        handleNext();
      } else if (e.key === 'ArrowLeft') {
        handlePrev();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [total]);

  const handleNext = () => {
    if (total <= 1) return;
    setDirection(1);
    setCurrentIndex((prev) => (prev + 1) % total);
    setTimerProgress(0);
  };

  const handlePrev = () => {
    if (total <= 1) return;
    setDirection(-1);
    setCurrentIndex((prev) => (prev - 1 + total) % total);
    setTimerProgress(0);
  };

  const handleGoTo = (idx) => {
    if (idx === currentIndex) return;
    setDirection(idx > currentIndex ? 1 : -1);
    setCurrentIndex(idx);
    setTimerProgress(0);
  };

  // Drag / swipe navigation
  const handleDragEnd = (event, info) => {
    const swipeThreshold = 45;
    const velocityThreshold = 280;

    if (info.offset.x < -swipeThreshold || info.velocity.x < -velocityThreshold) {
      handleNext();
    } else if (info.offset.x > swipeThreshold || info.velocity.x > velocityThreshold) {
      handlePrev();
    }
  };

  if (!items || items.length === 0) return null;

  // Slide transition animation variants (smooth slide-in and settled stay)
  const slideVariants = {
    enter: (dir) => ({
      x: dir > 0 ? 160 : -160,
      opacity: 0,
      scale: 0.96,
      filter: 'blur(4px)',
    }),
    center: {
      x: 0,
      opacity: 1,
      scale: 1,
      filter: 'blur(0px)',
      transition: {
        x: { type: 'spring', stiffness: 240, damping: 26 },
        opacity: { duration: 0.4 },
        scale: { duration: 0.4 },
        filter: { duration: 0.3 }
      },
    },
    exit: (dir) => ({
      x: dir > 0 ? -160 : 160,
      opacity: 0,
      scale: 0.96,
      filter: 'blur(4px)',
      transition: {
        x: { type: 'spring', stiffness: 240, damping: 26 },
        opacity: { duration: 0.3 },
        scale: { duration: 0.3 },
        filter: { duration: 0.2 }
      },
    }),
  };

  const currentItem = items[currentIndex];

  return (
    <div 
      ref={containerRef}
      className={`relative w-full select-none ${className}`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      
      {/* Slide Show Control Toolbar */}
      <div className="flex flex-wrap items-center justify-between gap-4 mb-6">
        
        {/* Left: Slide Progress Dots & Counter */}
        <div className="flex items-center gap-3">
          
          {/* Active / Total Counter */}
          <div className="flex items-center px-3.5 py-1.5 rounded-xl bg-[#06192a]/90 border border-cyan-500/30 text-xs font-mono shadow-[0_0_15px_rgba(0,240,255,0.15)]">
            <span className="text-cyan-300 font-extrabold text-sm">{String(currentIndex + 1).padStart(2, '0')}</span>
            <span className="text-slate-500 mx-1.5">/</span>
            <span className="text-slate-400 font-semibold">{String(total).padStart(2, '0')}</span>
          </div>

          {/* Dots Indicator with Live Progress Filling */}
          <div className="flex items-center gap-1.5 p-1.5 rounded-2xl bg-[#06192a]/80 border border-cyan-500/25 backdrop-blur-md">
            {items.map((_, idx) => (
              <button
                key={idx}
                onClick={() => handleGoTo(idx)}
                className={`h-2.5 rounded-full transition-all duration-300 cursor-pointer relative overflow-hidden ${
                  idx === currentIndex
                    ? 'w-9 bg-[#041525] border border-cyan-400/60 shadow-[0_0_12px_#00f0ff]'
                    : 'w-2.5 bg-slate-700/80 hover:bg-cyan-500/60'
                }`}
                aria-label={`Slide ${idx + 1}`}
                title={`Go to slide ${idx + 1}`}
              >
                {idx === currentIndex && isAutoPlaying && !isHovered && total > 1 && (
                  <motion.div
                    className="absolute inset-0 bg-gradient-to-r from-cyan-400 via-teal-300 to-cyan-300"
                    style={{ width: `${timerProgress}%` }}
                  />
                )}
                {idx === currentIndex && (!isAutoPlaying || isHovered || total <= 1) && (
                  <div className="absolute inset-0 bg-gradient-to-r from-cyan-400 to-teal-300" />
                )}
              </button>
            ))}
          </div>

        </div>

        {/* Right: Auto Slide, Hover Status & Arrow Navigation */}
        <div className="flex items-center gap-2">
          
          {/* Stay Status Indicator on Hover */}
          {isHovered && total > 1 && (
            <span className="hidden sm:inline-flex items-center gap-1 px-2.5 py-1 rounded-lg bg-[#082238] border border-cyan-500/30 text-[10px] font-mono text-cyan-300 animate-fadeIn">
              <Clock className="w-3 h-3 text-cyan-400" />
              <span>Staying on screen</span>
            </span>
          )}

          {/* Auto Slide Toggle */}
          {total > 1 && (
            <button
              onClick={() => setIsAutoPlaying(!isAutoPlaying)}
              className={`px-3 py-2 rounded-xl border text-xs font-semibold flex items-center gap-1.5 transition-all cursor-pointer ${
                isAutoPlaying
                  ? 'bg-cyan-950/90 text-cyan-300 border-cyan-500/50 shadow-[0_0_15px_rgba(0,240,255,0.25)]'
                  : 'bg-[#082238] text-slate-400 border-slate-700/80 hover:text-white hover:border-slate-600'
              }`}
              title={isAutoPlaying ? "Pause Auto Slide" : "Start Auto Slide"}
            >
              {isAutoPlaying ? (
                <Pause className="w-3.5 h-3.5 text-cyan-300 animate-pulse" />
              ) : (
                <Play className="w-3.5 h-3.5" />
              )}
              <span className="hidden sm:inline">{isAutoPlaying ? "Auto Slide On" : "Auto"}</span>
            </button>
          )}

          {/* Prev / Next Navigation Arrows */}
          {total > 1 && (
            <div className="flex items-center gap-1.5">
              <button
                onClick={handlePrev}
                className="p-2.5 rounded-xl bg-gradient-to-br from-[#082844] to-[#041627] hover:from-cyan-400 hover:to-teal-300 hover:text-[#031525] text-cyan-300 border border-cyan-500/40 shadow-[0_0_15px_rgba(0,240,255,0.2)] hover:shadow-[0_0_25px_rgba(0,240,255,0.6)] transition-all cursor-pointer active:scale-90"
                aria-label="Previous Slide"
                title="Previous Slide"
              >
                <ChevronLeft className="w-4 h-4" />
              </button>

              <button
                onClick={handleNext}
                className="p-2.5 rounded-xl bg-gradient-to-br from-[#082844] to-[#041627] hover:from-cyan-400 hover:to-teal-300 hover:text-[#031525] text-cyan-300 border border-cyan-500/40 shadow-[0_0_15px_rgba(0,240,255,0.2)] hover:shadow-[0_0_25px_rgba(0,240,255,0.6)] transition-all cursor-pointer active:scale-90"
                aria-label="Next Slide"
                title="Next Slide"
              >
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          )}

        </div>
      </div>

      {/* Main Slide Viewport */}
      <div className="relative w-full max-w-4xl mx-auto overflow-hidden py-2">
        
        {/* Ambient background glow */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 sm:w-[600px] h-72 rounded-full bg-cyan-500/10 blur-[100px] pointer-events-none"></div>

        {/* Slide Stage with Framer Motion AnimatePresence */}
        <div className="relative min-h-[420px] flex items-center justify-center">
          <AnimatePresence initial={false} custom={direction} mode="wait">
            <motion.div
              key={currentItem?.id || currentIndex}
              custom={direction}
              variants={slideVariants}
              initial="enter"
              animate="center"
              exit="exit"
              drag="x"
              dragConstraints={{ left: 0, right: 0 }}
              dragElastic={0.25}
              onDragEnd={handleDragEnd}
              className="w-full cursor-grab active:cursor-grabbing"
            >
              <div className="w-full drop-shadow-[0_20px_35px_rgba(0,0,0,0.6)]">
                {renderCard(currentItem, currentIndex)}
              </div>
            </motion.div>
          </AnimatePresence>
        </div>

      </div>

      {/* Bottom Floating Navigation Bar */}
      {total > 1 && (
        <div className="flex items-center justify-center gap-4 mt-6">
          <button
            onClick={handlePrev}
            className="px-4 py-2 rounded-xl bg-[#06192a]/90 hover:bg-[#092b47] text-cyan-300 border border-cyan-500/30 text-xs font-mono font-semibold flex items-center gap-1.5 transition-all cursor-pointer active:scale-95 shadow-[0_0_15px_rgba(0,240,255,0.15)]"
          >
            <ChevronLeft className="w-3.5 h-3.5" />
            <span>Prev</span>
          </button>

          <span className="text-[11px] font-mono text-slate-400">
            Card <span className="text-cyan-300 font-bold">{currentIndex + 1}</span> of <span className="text-white">{total}</span>
          </span>

          <button
            onClick={handleNext}
            className="px-4 py-2 rounded-xl bg-gradient-to-r from-cyan-400 via-teal-300 to-cyan-300 hover:from-cyan-300 hover:to-teal-200 text-[#021320] text-xs font-mono font-bold flex items-center gap-1.5 transition-all cursor-pointer active:scale-95 shadow-[0_0_20px_rgba(0,240,255,0.4)]"
          >
            <span>Next</span>
            <ChevronRight className="w-3.5 h-3.5" />
          </button>
        </div>
      )}

    </div>
  );
};
