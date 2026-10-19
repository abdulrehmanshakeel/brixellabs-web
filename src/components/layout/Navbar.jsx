import React, { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { 
  faBars, 
  faXmark, 
  faArrowRight, 
  faMagnifyingGlass,
  faPhone,
  faEnvelope
} from '@fortawesome/free-solid-svg-icons';
import { motion, AnimatePresence } from 'framer-motion';
import logoImg from '../../assets/logo.webp';

export const Navbar = ({ currentPath, navigate, openConsultation, onOpenSearch }) => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [hoveredIndex, setHoveredIndex] = useState(null);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleNav = (path) => {
    navigate(path);
    setMobileMenuOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Exact 5 navigation links
  const navItems = [
    { label: 'Services', path: '/services' },
    { label: 'Process', path: '/process' },
    { label: 'Case Studies', path: '/case-studies', matchPrefix: true },
    { label: 'About', path: '/about' },
    { label: 'Contact', path: '/contact' },
  ];

  const isItemActive = (item) => {
    if (item.matchPrefix) {
      return currentPath.startsWith(item.path);
    }
    return currentPath === item.path;
  };

  return (
    <header 
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled 
          ? 'bg-[#02070f]/85 backdrop-blur-2xl border-b border-white/[0.07] py-3 shadow-[0_10px_35px_rgba(0,0,0,0.7)]' 
          : 'bg-transparent py-5 sm:py-6 border-b border-transparent'
      }`}
    >
      {/* Subtle top ambient hairline glow on scroll */}
      {scrolled && (
        <div className="absolute top-0 inset-x-0 h-[1px] bg-gradient-to-r from-transparent via-cyan-400/40 to-transparent pointer-events-none" />
      )}

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          
          {/* Brand Logo & Name (Clean, Professional & Human-Crafted) */}
          <a 
            href="/"
            onClick={(e) => {
              e.preventDefault();
              handleNav('/');
            }}
            className="flex items-center gap-3 group text-left cursor-pointer focus:outline-none select-none text-white no-underline"
            aria-label="BrixelLabs Home"
          >
            {/* Elegant Logo Container with Subtle Hover Reaction */}
            <motion.div 
              whileHover={{ scale: 1.05 }}
              transition={{ type: 'spring', stiffness: 400, damping: 25 }}
              className="relative w-9 h-9 sm:w-10 sm:h-10 rounded-xl bg-gradient-to-b from-slate-900 via-[#071929] to-[#030d17] border border-cyan-500/25 flex items-center justify-center shadow-md group-hover:border-cyan-400/60 group-hover:shadow-[0_0_20px_rgba(0,240,255,0.3)] transition-all duration-300"
            >
              <img 
                src={logoImg} 
                alt="BrixelLabs Logo" 
                width="28"
                height="28"
                loading="eager"
                decoding="async"
                className="w-6 h-6 sm:w-7 sm:h-7 object-contain relative z-10 transition-transform duration-300"
              />
            </motion.div>
            
            <div className="flex flex-col">
              <div className="flex items-center">
                <span className="font-heading text-lg sm:text-xl font-black tracking-tight text-white group-hover:text-cyan-300 transition-colors">
                  Brixel<span className="text-cyan-400">Labs</span>
                </span>
              </div>
              <span className="hidden sm:block text-[9px] font-mono text-slate-400 group-hover:text-cyan-300/80 tracking-widest uppercase transition-colors -mt-0.5 font-medium">
                Engineering &amp; AI
              </span>
            </div>
          </a>

          {/* Desktop Navigation: Fluid Interactive Floating Island */}
          <nav 
            onMouseLeave={() => setHoveredIndex(null)}
            className="hidden md:flex items-center p-1 rounded-full bg-[#030e1a]/80 backdrop-blur-2xl border border-white/[0.08] shadow-[0_8px_32px_rgba(0,0,0,0.5),0_1px_0_rgba(255,255,255,0.06)_inset] text-xs font-medium text-slate-300"
          >
            {navItems.map((item, index) => {
              const active = isItemActive(item);
              const isHovered = hoveredIndex === index;

              return (
                <a
                  key={item.path}
                  href={item.path}
                  onClick={(e) => {
                    e.preventDefault();
                    handleNav(item.path);
                  }}
                  onMouseEnter={() => setHoveredIndex(index)}
                  className={`relative px-4 py-2 rounded-full transition-colors cursor-pointer select-none no-underline ${
                    active ? 'text-white font-semibold' : 'text-slate-400 hover:text-white'
                  }`}
                >
                  {/* Floating Smooth Hover Pill for Inactive Links */}
                  {isHovered && !active && (
                    <motion.div
                      layoutId="navHoverPill"
                      className="absolute inset-0 bg-white/[0.08] rounded-full border border-white/[0.08] -z-10"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      transition={{ type: 'spring', stiffness: 500, damping: 35 }}
                    />
                  )}

                  {/* Active Indicator: Refined Frosted Cyber-Cyan Pill */}
                  {active && (
                    <motion.div
                      layoutId="activeNavIndicator"
                      className="absolute inset-0 bg-cyan-500/15 border border-cyan-400/35 rounded-full shadow-[0_0_14px_rgba(0,240,255,0.25)] -z-10"
                      transition={{ type: 'spring', stiffness: 450, damping: 35 }}
                    />
                  )}

                  <span className={`relative z-10 ${active ? 'text-cyan-300' : ''}`}>{item.label}</span>
                </a>
              );
            })}
          </nav>

          {/* Right Header Action Button: Search & Unified Master btn-primary */}
          <div className="hidden md:flex items-center gap-2.5">
            {/* Quick Site Search Trigger (⌘K) */}
            <button
              type="button"
              onClick={() => onOpenSearch ? onOpenSearch() : window.dispatchEvent(new CustomEvent('open-site-search'))}
              className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-slate-900/80 hover:bg-slate-800 border border-slate-700/60 hover:border-cyan-400/50 text-slate-300 hover:text-white text-xs transition-all cursor-pointer shadow-sm group"
              aria-label="Search website (Ctrl+K or Cmd+K)"
              title="Search website (⌘K)"
            >
              <FontAwesomeIcon icon={faMagnifyingGlass} className="text-[11px] text-cyan-400 group-hover:scale-110 transition-transform" />
              <span className="hidden lg:inline text-slate-400 group-hover:text-slate-200">Search</span>
              <kbd className="hidden lg:inline px-1.5 py-0.5 text-[9px] font-mono bg-slate-800 border border-slate-700 rounded text-slate-400">⌘K</kbd>
            </button>

            {/* Consultation CTA */}
            <button
              onClick={openConsultation}
              className="btn-primary !px-5 !py-2 !text-xs !rounded-full"
            >
              <span>Book Consultation</span>
              <FontAwesomeIcon 
                icon={faArrowRight} 
                className="text-[11px]" 
              />
            </button>
          </div>

          {/* Mobile Right Controls: Hamburger Toggle */}
          <div className="flex md:hidden items-center gap-2">
            <button 
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2.5 rounded-xl text-white bg-slate-900/80 border border-slate-800 hover:border-slate-700 transition-all cursor-pointer outline-none"
              aria-label="Toggle Menu"
            >
              {mobileMenuOpen ? (
                <FontAwesomeIcon icon={faXmark} className="w-4 h-4 text-white" />
              ) : (
                <FontAwesomeIcon icon={faBars} className="w-4 h-4 text-white" />
              )}
            </button>
          </div>

        </div>
      </div>

      {/* Mobile Drawer Menu */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div 
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.25, ease: 'easeInOut' }}
            className="md:hidden border-b border-white/[0.08] px-5 py-5 mt-2 space-y-3 backdrop-blur-2xl bg-[#02070f]/98 shadow-2xl max-h-[calc(100vh-80px)] overflow-y-auto overscroll-contain"
          >
            {/* Mobile Site Search Bar */}
            <button
              type="button"
              onClick={() => {
                setMobileMenuOpen(false);
                if (onOpenSearch) onOpenSearch();
                else window.dispatchEvent(new CustomEvent('open-site-search'));
              }}
              className="w-full py-2.5 px-3.5 rounded-xl text-xs font-medium text-slate-300 bg-slate-900/70 border border-slate-700/60 hover:border-cyan-400/50 flex items-center justify-between transition-colors mb-2 text-left"
            >
              <span className="flex items-center gap-2.5">
                <FontAwesomeIcon icon={faMagnifyingGlass} className="text-cyan-400 text-xs" />
                <span>Search services, studies, pages...</span>
              </span>
              <kbd className="px-1.5 py-0.5 text-[9px] font-mono bg-slate-800 border border-slate-700 rounded text-slate-400">⌘K</kbd>
            </button>

            <div className="pb-1 border-b border-white/[0.06] flex items-center justify-between">
              <span className="text-[11px] font-mono text-cyan-400 font-bold uppercase tracking-wider">Navigation</span>
              <span className="text-[10px] font-mono text-slate-500">Menu</span>
            </div>

            <div className="space-y-1">
              {navItems.map((item) => {
                const active = isItemActive(item);
                return (
                  <a 
                    key={item.path}
                    href={item.path}
                    onClick={(e) => {
                      e.preventDefault();
                      handleNav(item.path);
                    }}
                    className={`block w-full text-left py-3 px-3 rounded-lg text-sm font-semibold transition-all min-h-[44px] flex items-center no-underline ${
                      active 
                        ? 'text-cyan-400 bg-cyan-950/40 font-bold border-l-2 border-cyan-400 pl-3' 
                        : 'text-slate-300 hover:text-white hover:bg-slate-900/60'
                    }`}
                  >
                    {item.label}
                  </a>
                );
              })}

            </div>

            <div className="pt-3 border-t border-white/[0.06] space-y-2.5">
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  openConsultation();
                }}
                className="btn-primary w-full !py-3 !text-xs !rounded-xl"
              >
                <span>Book Free Consultation</span>
                <FontAwesomeIcon icon={faArrowRight} className="text-xs" />
              </button>

              {/* Direct Clickable Contact Options on Mobile */}
              <div className="grid grid-cols-2 gap-2 pt-1 font-mono text-xs">
                <a
                  href="tel:+923449254864"
                  className="p-2.5 rounded-xl bg-slate-900/80 border border-slate-800 hover:border-cyan-500/50 flex items-center justify-center gap-2 text-cyan-300 hover:text-cyan-200 transition-colors text-center"
                  title="Call BrixelLabs"
                >
                  <FontAwesomeIcon icon={faPhone} className="text-xs text-cyan-400" />
                  <span>Call Us</span>
                </a>
                <a
                  href="mailto:brixellabs@gmail.com"
                  className="p-2.5 rounded-xl bg-slate-900/80 border border-slate-800 hover:border-cyan-500/50 flex items-center justify-center gap-2 text-cyan-300 hover:text-cyan-200 transition-colors text-center"
                  title="Email BrixelLabs"
                >
                  <FontAwesomeIcon icon={faEnvelope} className="text-xs text-cyan-400" />
                  <span>Email Us</span>
                </a>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
};
