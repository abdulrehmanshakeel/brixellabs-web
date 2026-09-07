import React, { useState, useEffect } from 'react';
import { 
  ChevronDown, 
  Menu, 
  X, 
  ArrowRight, 
  BarChart3, 
  Cpu, 
  Layers, 
  MessageSquareCode, 
  ShieldCheck,
  Play,
  Activity
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export const Navbar = ({ currentPath, navigate, openConsultation, openShowreel }) => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [servicesDropdown, setServicesDropdown] = useState(false);
  const [companyDropdown, setCompanyDropdown] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleNav = (path) => {
    navigate(path);
    setMobileMenuOpen(false);
    setServicesDropdown(false);
    setCompanyDropdown(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const navItems = [
    { label: 'Services', path: '/services', hasDropdown: true },
    { label: 'Process', path: '/process' },
    { label: 'Case Studies', path: '/case-studies', matchPrefix: true },
    { label: 'Company', path: '/about', hasDropdownCompany: true },
  ];

  return (
    <header 
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled 
          ? 'bg-[#030c14]/90 backdrop-blur-xl border-b border-cyan-500/25 py-2.5 shadow-lg shadow-black/60' 
          : 'bg-transparent py-4 sm:py-5'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          
          {/* Brand Logo with Rotating Cyber Ring */}
          <button 
            onClick={() => handleNav('/')}
            className="flex items-center gap-3 group text-left cursor-pointer focus:outline-none"
          >
            <div className="relative w-10 h-10 flex items-center justify-center">
              {/* Rotating outer cyber ring */}
              <div className="absolute inset-0 rounded-full border border-cyan-400/40 border-dashed animate-spin" style={{ animationDuration: '14s' }}></div>
              <div className="absolute inset-0 bg-cyan-400/20 rounded-full blur-md group-hover:bg-cyan-400/50 transition-all"></div>
              
              <img 
                src="/logo + Banner/logo without background.png" 
                alt="BrixelLabs Logo" 
                className="w-8 h-8 object-contain relative z-10 drop-shadow-[0_0_10px_rgba(0,240,255,0.7)] group-hover:scale-110 transition-transform duration-300"
              />
            </div>
            
            <div className="flex flex-col">
              <span className="text-xl font-extrabold tracking-tight text-white group-hover:text-cyan-300 transition-colors">
                Brixel<span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-teal-300">Labs</span>
              </span>
              <span className="hidden sm:flex items-center gap-1.5 text-[9px] font-mono text-cyan-300/90 font-semibold tracking-wider -mt-0.5">
                <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 shadow-[0_0_6px_#00f0ff]"></span>
                Design · Build · Automate
              </span>
            </div>
          </button>

          {/* Desktop Navigation with Animated Glide Pill */}
          <nav className="hidden md:flex items-center gap-1 bg-[#061e31]/70 p-1.5 rounded-full border border-cyan-500/25 backdrop-blur-xl shadow-inner text-xs font-medium text-slate-300">
            
            {/* Home */}
            <button
              onClick={() => handleNav('/')}
              className={`relative px-4 py-2 rounded-full transition-colors cursor-pointer ${
                currentPath === '/' ? 'text-white font-semibold' : 'hover:text-cyan-300 text-slate-300'
              }`}
            >
              {currentPath === '/' && (
                <motion.div
                  layoutId="activeNavPill"
                  className="absolute inset-0 bg-gradient-to-r from-cyan-500/30 to-teal-500/20 border border-cyan-400/50 rounded-full shadow-[0_0_15px_rgba(0,240,255,0.4)] z-0"
                  transition={{ type: 'spring', stiffness: 450, damping: 35 }}
                />
              )}
              <span className="relative z-10">Home</span>
            </button>

            {/* Services with Dropdown */}
            <div 
              className="relative"
              onMouseEnter={() => setServicesDropdown(true)}
              onMouseLeave={() => setServicesDropdown(false)}
            >
              <button 
                onClick={() => handleNav('/services')}
                className={`relative px-4 py-2 rounded-full transition-colors flex items-center gap-1 cursor-pointer ${
                  currentPath === '/services' ? 'text-white font-semibold' : 'hover:text-cyan-300 text-slate-300'
                }`}
              >
                {currentPath === '/services' && (
                  <motion.div
                    layoutId="activeNavPill"
                    className="absolute inset-0 bg-gradient-to-r from-cyan-500/30 to-teal-500/20 border border-cyan-400/50 rounded-full shadow-[0_0_15px_rgba(0,240,255,0.4)] z-0"
                    transition={{ type: 'spring', stiffness: 450, damping: 35 }}
                  />
                )}
                <span className="relative z-10">Services</span>
                <ChevronDown className={`w-3.5 h-3.5 relative z-10 transition-transform duration-200 ${servicesDropdown ? 'rotate-180 text-cyan-400' : ''}`} />
              </button>

              {/* Services Dropdown Menu */}
              {servicesDropdown && (
                <div className="absolute top-full left-0 w-72 pt-3 z-50">
                  <motion.div 
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="glass-panel rounded-2xl p-3 shadow-2xl shadow-black/80 border border-cyan-500/40 backdrop-blur-2xl bg-[#031524]/95"
                  >
                    <div className="text-[10px] font-mono uppercase tracking-wider text-cyan-400/90 px-3 py-1">
                      Full-Stack & AI Capabilities
                    </div>
                    <button 
                      onClick={() => handleNav('/services')}
                      className="w-full text-left px-3 py-2 rounded-xl hover:bg-cyan-950/60 hover:text-cyan-300 text-slate-200 flex items-center gap-2.5 text-xs transition-colors"
                    >
                      <Layers className="w-4 h-4 text-cyan-400 flex-shrink-0" />
                      <div>
                        <div className="font-semibold text-white">Design & Development</div>
                        <div className="text-[10px] text-slate-400">UI/UX, Full-Stack Web & Apps</div>
                      </div>
                    </button>
                    <button 
                      onClick={() => handleNav('/services')}
                      className="w-full text-left px-3 py-2 rounded-xl hover:bg-cyan-950/60 hover:text-cyan-300 text-slate-200 flex items-center gap-2.5 text-xs transition-colors"
                    >
                      <Cpu className="w-4 h-4 text-cyan-400 flex-shrink-0" />
                      <div>
                        <div className="font-semibold text-white">AI & Intelligence</div>
                        <div className="text-[10px] text-slate-400">Vision, Chatbots & RAG, Agents</div>
                      </div>
                    </button>
                    <button 
                      onClick={() => handleNav('/services')}
                      className="w-full text-left px-3 py-2 rounded-xl hover:bg-cyan-950/60 hover:text-cyan-300 text-slate-200 flex items-center gap-2.5 text-xs transition-colors"
                    >
                      <BarChart3 className="w-4 h-4 text-cyan-400 flex-shrink-0" />
                      <div>
                        <div className="font-semibold text-white">Data Analytics</div>
                        <div className="text-[10px] text-slate-400">Python, Excel & SQL Dashboards</div>
                      </div>
                    </button>
                  </motion.div>
                </div>
              )}
            </div>

            {/* Process */}
            <button 
              onClick={() => handleNav('/process')}
              className={`relative px-4 py-2 rounded-full transition-colors cursor-pointer ${
                currentPath === '/process' ? 'text-white font-semibold' : 'hover:text-cyan-300 text-slate-300'
              }`}
            >
              {currentPath === '/process' && (
                <motion.div
                  layoutId="activeNavPill"
                  className="absolute inset-0 bg-gradient-to-r from-cyan-500/30 to-teal-500/20 border border-cyan-400/50 rounded-full shadow-[0_0_15px_rgba(0,240,255,0.4)] z-0"
                  transition={{ type: 'spring', stiffness: 450, damping: 35 }}
                />
              )}
              <span className="relative z-10">Process</span>
            </button>

            {/* Case Studies */}
            <button 
              onClick={() => handleNav('/case-studies')}
              className={`relative px-4 py-2 rounded-full transition-colors cursor-pointer ${
                currentPath.startsWith('/case-studies') ? 'text-white font-semibold' : 'hover:text-cyan-300 text-slate-300'
              }`}
            >
              {currentPath.startsWith('/case-studies') && (
                <motion.div
                  layoutId="activeNavPill"
                  className="absolute inset-0 bg-gradient-to-r from-cyan-500/30 to-teal-500/20 border border-cyan-400/50 rounded-full shadow-[0_0_15px_rgba(0,240,255,0.4)] z-0"
                  transition={{ type: 'spring', stiffness: 450, damping: 35 }}
                />
              )}
              <span className="relative z-10">Case Studies</span>
            </button>

            {/* Company / About */}
            <div 
              className="relative"
              onMouseEnter={() => setCompanyDropdown(true)}
              onMouseLeave={() => setCompanyDropdown(false)}
            >
              <button 
                onClick={() => handleNav('/about')}
                className={`relative px-4 py-2 rounded-full transition-colors flex items-center gap-1 cursor-pointer ${
                  currentPath === '/about' ? 'text-white font-semibold' : 'hover:text-cyan-300 text-slate-300'
                }`}
              >
                {currentPath === '/about' && (
                  <motion.div
                    layoutId="activeNavPill"
                    className="absolute inset-0 bg-gradient-to-r from-cyan-500/30 to-teal-500/20 border border-cyan-400/50 rounded-full shadow-[0_0_15px_rgba(0,240,255,0.4)] z-0"
                    transition={{ type: 'spring', stiffness: 450, damping: 35 }}
                  />
                )}
                <span className="relative z-10">Company</span>
                <ChevronDown className={`w-3.5 h-3.5 relative z-10 transition-transform duration-200 ${companyDropdown ? 'rotate-180 text-cyan-400' : ''}`} />
              </button>

              {/* Company Dropdown */}
              {companyDropdown && (
                <div className="absolute top-full left-0 w-64 pt-3 z-50">
                  <motion.div 
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="glass-panel rounded-2xl p-3 shadow-2xl shadow-black/80 border border-cyan-500/40 backdrop-blur-2xl bg-[#031524]/95"
                  >
                    <button 
                      onClick={() => handleNav('/about')}
                      className="w-full text-left px-3 py-2 rounded-xl hover:bg-cyan-950/60 hover:text-cyan-300 text-slate-200 flex items-center gap-2.5 text-xs transition-colors"
                    >
                      <ShieldCheck className="w-4 h-4 text-cyan-400 flex-shrink-0" />
                      <div>
                        <div className="font-semibold text-white">About BrixelLabs</div>
                        <div className="text-[10px] text-slate-400">Our Story & Mission</div>
                      </div>
                    </button>
                    <button 
                      onClick={() => handleNav('/about')}
                      className="w-full text-left px-3 py-2 rounded-xl hover:bg-cyan-950/60 hover:text-cyan-300 text-slate-200 flex items-center gap-2.5 text-xs transition-colors"
                    >
                      <MessageSquareCode className="w-4 h-4 text-cyan-400 flex-shrink-0" />
                      <div>
                        <div className="font-semibold text-white">Our Team & Values</div>
                        <div className="text-[10px] text-slate-400">Engineers & Creators</div>
                      </div>
                    </button>
                  </motion.div>
                </div>
              )}
            </div>

          </nav>

          {/* Right Action Buttons */}
          <div className="hidden md:flex items-center gap-3">
            {/* Contact CTA */}
            <button
              onClick={() => handleNav('/contact')}
              className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-cyan-400 via-teal-300 to-cyan-400 hover:from-cyan-300 hover:to-teal-200 text-[#031525] font-extrabold text-xs transition-all duration-300 shadow-[0_0_20px_rgba(0,240,255,0.55)] hover:shadow-[0_0_30px_rgba(0,240,255,0.85)] hover:scale-105 active:scale-95 cursor-pointer"
            >
              Contact Us
            </button>
          </div>

          {/* Mobile Hamburger Menu Toggle */}
          <button 
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-2 rounded-xl text-slate-300 hover:text-cyan-400 hover:bg-cyan-950/50 border border-cyan-500/20 transition-all cursor-pointer"
            aria-label="Toggle Menu"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>

        </div>
      </div>

      {/* Mobile Drawer Menu */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div 
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden glass-panel border-b border-cyan-500/30 px-6 py-6 mt-3 space-y-4 backdrop-blur-2xl bg-[#030c14]/98 shadow-2xl overflow-hidden"
          >
            <div className="flex items-center justify-between pb-3 border-b border-cyan-500/20">
              <span className="text-xs font-mono text-cyan-400">NAVIGATION</span>
              <span className="flex items-center gap-1 text-[10px] font-mono text-emerald-400">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-ping"></span>
                LIVE
              </span>
            </div>

            <button 
              onClick={() => handleNav('/')}
              className={`block w-full text-left py-2 text-sm font-medium ${
                currentPath === '/' ? 'text-cyan-400 font-bold' : 'text-slate-200'
              }`}
            >
              Home
            </button>
            <button 
              onClick={() => handleNav('/services')}
              className={`block w-full text-left py-2 text-sm font-medium ${
                currentPath === '/services' ? 'text-cyan-400 font-bold' : 'text-slate-200'
              }`}
            >
              Services
            </button>
            <button 
              onClick={() => handleNav('/process')}
              className={`block w-full text-left py-2 text-sm font-medium ${
                currentPath === '/process' ? 'text-cyan-400 font-bold' : 'text-slate-200'
              }`}
            >
              Process
            </button>
            <button 
              onClick={() => handleNav('/case-studies')}
              className={`block w-full text-left py-2 text-sm font-medium ${
                currentPath.startsWith('/case-studies') ? 'text-cyan-400 font-bold' : 'text-slate-200'
              }`}
            >
              Case Studies
            </button>
            <button 
              onClick={() => handleNav('/about')}
              className={`block w-full text-left py-2 text-sm font-medium ${
                currentPath === '/about' ? 'text-cyan-400 font-bold' : 'text-slate-200'
              }`}
            >
              Company & About
            </button>
            <button 
              onClick={() => handleNav('/contact')}
              className={`block w-full text-left py-2 text-sm font-medium ${
                currentPath === '/contact' ? 'text-cyan-400 font-bold' : 'text-slate-200'
              }`}
            >
              Contact
            </button>

            <div className="pt-2 border-t border-cyan-500/20">
              <button
                onClick={() => handleNav('/contact')}
                className="w-full py-3 rounded-xl bg-cyan-400 text-[#031525] font-bold text-center shadow-[0_0_20px_rgba(0,240,255,0.5)] active:scale-95"
              >
                Get Started
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
};
