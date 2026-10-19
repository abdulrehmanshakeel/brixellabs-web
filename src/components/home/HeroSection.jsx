import React, { useState, useEffect, useCallback } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowRight, faChevronDown } from '@fortawesome/free-solid-svg-icons';
import { motion, AnimatePresence } from 'framer-motion';

import neuralCoreImg from '../../assets/hero-slider/neural_core.webp';
import computerVisionImg from '../../assets/hero-slider/computer_vision.webp';
import agentOrchestrationImg from '../../assets/hero-slider/agent_orchestration.webp';
import cloudMeshImg from '../../assets/hero-slider/cloud_mesh.webp';

const HERO_SLIDES = [
  {
    id: 'neural-core',
    title: 'Custom AI Assistants & Automation',
    shortLabel: 'AI Automation',
    image: neuralCoreImg,
  },
  {
    id: 'computer-vision',
    title: 'Real-Time Camera & Quality Inspection AI',
    shortLabel: 'Computer Vision',
    image: computerVisionImg,
  },
  {
    id: 'agentic-swarms',
    title: 'Intelligent Automated Business Teams',
    shortLabel: 'Smart Workflows',
    image: agentOrchestrationImg,
  },
  {
    id: 'cloud-mesh',
    title: 'Fast & Reliable Cloud Infrastructure',
    shortLabel: 'Cloud Systems',
    image: cloudMeshImg,
  },
];

const AUTO_SLIDE_INTERVAL = 5000; // 5 seconds

export const HeroSection = ({ navigate, openConsultation }) => {
  const [currentSlideIndex, setCurrentSlideIndex] = useState(0);

  const nextSlide = useCallback(() => {
    setCurrentSlideIndex((prev) => (prev + 1) % HERO_SLIDES.length);
  }, []);

  // 5-second automatic background slide loop
  useEffect(() => {
    const timer = setInterval(() => {
      nextSlide();
    }, AUTO_SLIDE_INTERVAL);

    return () => clearInterval(timer);
  }, [nextSlide, currentSlideIndex]);

  const activeSlide = HERO_SLIDES[currentSlideIndex];

  return (
    <section className="relative w-full z-10 min-h-[90vh] flex flex-col justify-center overflow-hidden">
      
      {/* ========================================================
          FULL-WIDTH SEAMLESS TECH VISUALS (Low Transparency / High Visibility)
         ======================================================== */}
      <div className="absolute inset-0 w-full h-full pointer-events-none z-0 overflow-hidden select-none">
        
        {/* Full-Width Smooth Crossfading Tech Images with Subtle Muted Tone */}
        <AnimatePresence initial={false}>
          <motion.div
            key={activeSlide.id}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1.2, ease: "easeInOut" }}
            className="absolute inset-0 w-full h-full"
            style={{
              WebkitMaskImage: 'radial-gradient(ellipse 75% 75% at 75% 50%, black 20%, transparent 75%)',
              maskImage: 'radial-gradient(ellipse 75% 75% at 75% 50%, black 20%, transparent 75%)',
            }}
          >
            <img 
              src={activeSlide.image} 
              alt={activeSlide?.title ? `${activeSlide.title} - BrixelLabs Technical Architecture` : 'BrixelLabs AI Technology Architecture'} 
              width="1920"
              height="1080"
              fetchPriority="high"
              decoding="async"
              className="w-full h-full object-cover object-right lg:object-center mix-blend-screen scale-105 opacity-65 filter brightness-50 contrast-95 saturate-70"
            />
          </motion.div>
        </AnimatePresence>
      </div>

      {/* ========================================================
          FOREGROUND CONTENT: Perfectly Balanced Spacing & Vertical Rhythm
         ======================================================== */}
      <div className="relative z-10 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-32 sm:pt-36 pb-12 sm:pb-16 flex-1 flex flex-col justify-center">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-10 items-center">
          
          {/* Left Column: Headlines & Unified CTA with Refined Spacing */}
          <div className="lg:col-span-8 space-y-6 sm:space-y-8 text-left py-6 sm:py-10">
            
            {/* Big Headline in Pure Crisp White - Instant First Paint (LCP Optimization) */}
            <motion.h1 
              initial={{ opacity: 0.9, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.25 }}
              className="font-heading text-5xl sm:text-7xl lg:text-8xl font-black text-white tracking-tight leading-[1.04]"
            >
              Full-Stack Tech <br />
              &amp; AI Solutions
            </motion.h1>

            {/* Punchy Subtitle with Enhanced Readability */}
            <motion.p 
              initial={{ opacity: 0.9, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.25 }}
              className="text-base sm:text-lg lg:text-xl text-slate-300 max-w-2xl font-normal leading-relaxed"
            >
              We engineer high-performance web applications, custom Shopify stores, and autonomous AI systems built for measurable ROI.
            </motion.p>

            {/* One Button Per Section: Unified Master Button Style */}
            <motion.div 
              initial={{ opacity: 0.9, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.25 }}
              className="pt-2 sm:pt-4"
            >
              <button
                onClick={openConsultation}
                className="btn-primary flex items-center gap-2.5"
              >
                <span>Schedule Free Consultation</span>
                <FontAwesomeIcon icon={faArrowRight} className="text-sm" />
              </button>
            </motion.div>

          </div>

          {/* Right Column: Clean open space allowing tech visual detailing to glow through naturally */}
          <div className="lg:col-span-4 hidden lg:block pointer-events-none" />

        </div>

        {/* Grid-Aligned Scroll Indicator */}
        <div className="mt-8 sm:mt-12 flex justify-center">
          <motion.a 
            href="#services"
            animate={{ y: [0, 8, 0] }}
            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
            className="p-2.5 rounded-full bg-[#051829]/90 text-white hover:text-cyan-300 transition-all shadow-[0_0_15px_rgba(0,240,255,0.25)] backdrop-blur-md cursor-pointer flex items-center justify-center w-10 h-10 border-0 outline-none"
            aria-label="Scroll to services"
          >
            <FontAwesomeIcon icon={faChevronDown} className="text-sm text-white" />
          </motion.a>
        </div>

      </div>

    </section>
  );
};
