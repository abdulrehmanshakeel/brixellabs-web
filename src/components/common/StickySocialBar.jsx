import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { 
  faLinkedinIn, 
  faInstagram, 
  faFacebookF, 
  faWhatsapp 
} from '@fortawesome/free-brands-svg-icons';
import { faPlus, faXmark } from '@fortawesome/free-solid-svg-icons';
import { motion, AnimatePresence } from 'framer-motion';

export const StickySocialBar = () => {
  const [hoveredId, setHoveredId] = useState(null);
  const [isMobileExpanded, setIsMobileExpanded] = useState(false);

  const socialButtons = [
    {
      id: 'linkedin',
      name: 'LinkedIn',
      tooltip: 'Connect on LinkedIn',
      url: 'https://www.linkedin.com/company/brixellabs/home/?viewAsMember=true',
      icon: faLinkedinIn,
      bgClass: 'bg-[#0077b5] hover:bg-[#006097] text-white shadow-lg shadow-sky-900/30',
      iconSize: 'text-lg',
      glow: 'hover:shadow-[0_0_18px_rgba(0,119,181,0.6)]'
    },
    {
      id: 'instagram',
      name: 'Instagram',
      tooltip: 'Follow on Instagram',
      url: 'https://www.instagram.com/brixellabs?igsi=cmM0OXliYjJxaWpt',
      icon: faInstagram,
      bgClass: 'bg-gradient-to-tr from-[#f09433] via-[#dc2743] to-[#bc1888] hover:opacity-95 text-white shadow-lg shadow-pink-900/30',
      iconSize: 'text-xl',
      glow: 'hover:shadow-[0_0_18px_rgba(220,39,67,0.6)]'
    },
    {
      id: 'facebook',
      name: 'Facebook',
      tooltip: 'Visit Facebook Page',
      url: 'https://www.facebook.com/share/1HiGirYC4f/',
      icon: faFacebookF,
      bgClass: 'bg-[#1877f2] hover:bg-[#125ec2] text-white shadow-lg shadow-blue-900/30',
      iconSize: 'text-lg',
      glow: 'hover:shadow-[0_0_18px_rgba(24,119,242,0.6)]'
    },
    {
      id: 'whatsapp',
      name: 'WhatsApp',
      tooltip: 'Chat on WhatsApp',
      url: 'https://wa.me/923449254864?text=Hi%20BrixelLabs%2C%20I%20would%20like%20to%20discuss%20a%20project.',
      icon: faWhatsapp,
      bgClass: 'bg-[#25d366] hover:bg-[#20b858] text-white shadow-lg shadow-emerald-900/40 ring-2 ring-[#25d366]/40',
      iconSize: 'text-2xl',
      glow: 'hover:shadow-[0_0_22px_rgba(37,211,102,0.7)]'
    }
  ];

  return (
    <div 
      className="fixed right-3 sm:right-5 bottom-5 sm:bottom-8 z-40 flex flex-col items-center gap-2.5 sm:gap-3 select-none"
      aria-label="Sticky Social Media Quick Links"
    >
      {/* Mobile Toggle Button (hidden on sm+) */}
      <button
        type="button"
        onClick={() => setIsMobileExpanded(!isMobileExpanded)}
        className="sm:hidden w-8 h-8 rounded-full bg-slate-800/90 text-cyan-400 border border-slate-700/80 shadow-md flex items-center justify-center transition-all focus:outline-none mb-0.5 active:scale-95"
        aria-label={isMobileExpanded ? 'Close social links menu' : 'Expand all social links'}
        title={isMobileExpanded ? 'Close' : 'More channels'}
      >
        <FontAwesomeIcon icon={isMobileExpanded ? faXmark : faPlus} className="text-xs transition-transform duration-200" />
      </button>

      {/* Social Buttons */}
      {socialButtons.map((btn, index) => {
        const isHovered = hoveredId === btn.id;
        // On mobile, show WhatsApp always, and show others only when expanded
        const isHiddenOnMobile = !isMobileExpanded && btn.id !== 'whatsapp';

        return (
          <div 
            key={btn.id} 
            className={`relative flex items-center justify-end ${isHiddenOnMobile ? 'hidden sm:flex' : 'flex'}`}
          >
            {/* Tooltip on hover (appears to the left on sm+) */}
            <AnimatePresence>
              {isHovered && (
                <motion.div
                  initial={{ opacity: 0, x: 8, scale: 0.95 }}
                  animate={{ opacity: 1, x: 0, scale: 1 }}
                  exit={{ opacity: 0, x: 6, scale: 0.95 }}
                  transition={{ duration: 0.15 }}
                  className="hidden sm:flex absolute right-full mr-3 items-center pointer-events-none whitespace-nowrap"
                >
                  <div className="px-3 py-1.5 rounded-lg bg-[#030e1a]/95 border border-slate-700/80 text-white text-xs font-medium shadow-xl backdrop-blur-md flex items-center gap-1.5">
                    <span>{btn.tooltip}</span>
                    <span className="w-1.5 h-1.5 rounded-full bg-cyan-400"></span>
                  </div>
                  {/* Tooltip arrow */}
                  <div className="w-2 h-2 bg-[#030e1a] border-t border-r border-slate-700/80 rotate-45 -ml-1" />
                </motion.div>
              )}
            </AnimatePresence>

            {/* Circular Sticky Button */}
            <motion.a
              href={btn.url}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={btn.tooltip}
              title={btn.tooltip}
              initial={{ opacity: 0, scale: 0.8, x: 20 }}
              animate={{ opacity: 1, scale: 1, x: 0 }}
              transition={{ delay: 0.08 * index, type: 'spring', stiffness: 300, damping: 20 }}
              whileHover={{ scale: 1.12 }}
              whileTap={{ scale: 0.92 }}
              onMouseEnter={() => setHoveredId(btn.id)}
              onMouseLeave={() => setHoveredId(null)}
              className={`w-11 h-11 sm:w-12 sm:h-12 rounded-full flex items-center justify-center transition-all duration-200 cursor-pointer ${btn.bgClass} ${btn.glow}`}
            >
              <FontAwesomeIcon icon={btn.icon} className={`${btn.iconSize} text-white drop-shadow-sm`} />
            </motion.a>
          </div>
        );
      })}
    </div>
  );
};

