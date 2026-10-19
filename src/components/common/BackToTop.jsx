import React, { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowUp } from '@fortawesome/free-solid-svg-icons';
import { motion, AnimatePresence } from 'framer-motion';

export const BackToTop = () => {
  const [visible, setVisible] = useState(false);
  const [scrollPercentage, setScrollPercentage] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY || document.documentElement.scrollTop;
      const scrollHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
      
      if (scrollTop > 320) {
        setVisible(true);
      } else {
        setVisible(false);
      }

      if (scrollHeight > 0) {
        setScrollPercentage(Math.min(100, Math.max(0, (scrollTop / scrollHeight) * 100)));
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const radius = 18;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference - (scrollPercentage / 100) * circumference;

  return (
    <AnimatePresence>
      {visible && (
        <motion.button
          type="button"
          onClick={scrollToTop}
          initial={{ opacity: 0, scale: 0.8, y: 15 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.8, y: 15 }}
          transition={{ duration: 0.2 }}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.95 }}
          className="fixed left-4 sm:left-6 bottom-5 sm:bottom-8 z-40 w-11 h-11 sm:w-12 sm:h-12 rounded-full bg-[#030e1a]/90 backdrop-blur-md border border-cyan-500/30 text-white shadow-[0_4px_20px_rgba(0,0,0,0.6),0_0_15px_rgba(0,240,255,0.2)] flex items-center justify-center cursor-pointer group focus:outline-none"
          title="Back to top"
          aria-label="Back to top"
        >
          {/* Circular SVG Scroll Progress Indicator */}
          <svg className="absolute inset-0 w-full h-full -rotate-90 pointer-events-none p-1" viewBox="0 0 44 44">
            <circle
              cx="22"
              cy="22"
              r={radius}
              stroke="rgba(255,255,255,0.1)"
              strokeWidth="2.5"
              fill="transparent"
            />
            <circle
              cx="22"
              cy="22"
              r={radius}
              stroke="#00f0ff"
              strokeWidth="2.5"
              fill="transparent"
              strokeDasharray={circumference}
              strokeDashoffset={strokeDashoffset}
              strokeLinecap="round"
              className="transition-[stroke-dashoffset] duration-150"
            />
          </svg>

          <FontAwesomeIcon 
            icon={faArrowUp} 
            className="text-xs sm:text-sm text-cyan-400 group-hover:text-white transition-colors relative z-10" 
          />
        </motion.button>
      )}
    </AnimatePresence>
  );
};
