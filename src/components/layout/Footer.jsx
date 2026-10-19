import React, { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { 
  faEnvelope, 
  faArrowUpRightFromSquare, 
  faArrowUp, 
  faShieldHalved, 
  faPaperPlane,
  faLock 
} from '@fortawesome/free-solid-svg-icons';
import { 
  faLinkedinIn, 
  faInstagram, 
  faFacebookF, 
  faXTwitter, 
  faWhatsapp 
} from '@fortawesome/free-brands-svg-icons';

import { motion } from 'framer-motion';
import { apiClient } from '../../api/client';
import { sanitizeEmail, isValidEmail } from '../../utils/sanitize';
import logoImg from '../../assets/logo.webp';

export const Footer = ({ navigate }) => {
  const [scrollProgress, setScrollProgress] = useState(0);
  const [emailSub, setEmailSub] = useState('');
  const [subSuccess, setSubSuccess] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const totalScroll = document.documentElement.scrollHeight - window.innerHeight;
      if (totalScroll > 0) {
        setScrollProgress((window.scrollY / totalScroll) * 100);
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const handleNav = (path) => {
    navigate(path);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleNewsletter = async (e) => {
    e.preventDefault();
    const cleanEmail = sanitizeEmail(emailSub);
    if (!cleanEmail || !isValidEmail(cleanEmail)) return;
    
    // Save to backend database & trigger welcome email
    apiClient.subscribeNewsletter(cleanEmail).catch(err => console.warn('Newsletter API sync:', err));

    setSubSuccess(true);
    setTimeout(() => {
      setSubSuccess(false);
      setEmailSub('');
    }, 3500);
  };


  return (
    <footer className="relative z-10 border-t border-cyan-500/25 bg-[#02090f]/95 backdrop-blur-2xl pt-16 pb-12 overflow-hidden">
      
      {/* Top subtle ambient glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-3/4 h-[1px] bg-gradient-to-r from-transparent via-cyan-400 to-transparent"></div>
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Main Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10 pb-12 border-b border-cyan-500/15">
          
          {/* Brand Col */}
          <div className="lg:col-span-3 space-y-4">
            <div className="flex flex-col gap-1">
              <a 
                href="/"
                onClick={(e) => {
                  e.preventDefault();
                  handleNav('/');
                }}
                className="flex items-center gap-3 no-underline group"
                aria-label="BrixelLabs Home"
              >
                <div className="relative w-10 h-10 flex items-center justify-center">
                  <div className="absolute inset-0 bg-cyan-400/20 rounded-full blur-md"></div>
                  <img 
                    src={logoImg} 
                    alt="BrixelLabs: Tech & AI Solutions Logo" 
                    width="36"
                    height="36"
                    loading="lazy"
                    decoding="async"
                    className="w-9 h-9 object-contain relative z-10 drop-shadow-[0_0_8px_rgba(0,240,255,0.6)]"
                  />
                </div>
                <span className="text-2xl font-extrabold tracking-tight text-white group-hover:text-cyan-300 transition-colors">
                  Brixel<span className="text-cyan-400">Labs</span>
                </span>
              </a>
              <span className="text-[11px] font-mono font-bold text-white uppercase tracking-widest pl-1">
                Design · Build · Automate
              </span>
            </div>

            <p className="text-xs sm:text-sm text-slate-400 max-w-sm leading-relaxed">
              We engineer high-performance web platforms, custom Shopify stores, and practical AI systems built for scale.
            </p>
          </div>

          {/* Quick Links */}
          <div className="lg:col-span-2 space-y-3">
            <div className="text-xs font-mono uppercase tracking-wider text-cyan-400 font-bold">
              Navigation
            </div>
            <ul className="space-y-2 text-sm text-slate-400">
              <li>
                <a 
                  href="/services" 
                  onClick={(e) => { e.preventDefault(); handleNav('/services'); }}
                  className="hover:text-cyan-300 transition-colors cursor-pointer text-slate-400 no-underline block"
                >
                  Services
                </a>
              </li>
              <li>
                <a 
                  href="/process" 
                  onClick={(e) => { e.preventDefault(); handleNav('/process'); }}
                  className="hover:text-cyan-300 transition-colors cursor-pointer text-slate-400 no-underline block"
                >
                  Process
                </a>
              </li>
              <li>
                <a 
                  href="/case-studies" 
                  onClick={(e) => { e.preventDefault(); handleNav('/case-studies'); }}
                  className="hover:text-cyan-300 transition-colors cursor-pointer text-slate-400 no-underline block"
                >
                  Case Studies
                </a>
              </li>
              <li>
                <a 
                  href="/about" 
                  onClick={(e) => { e.preventDefault(); handleNav('/about'); }}
                  className="hover:text-cyan-300 transition-colors cursor-pointer text-slate-400 no-underline block"
                >
                  About
                </a>
              </li>
              <li>
                <a 
                  href="/contact" 
                  onClick={(e) => { e.preventDefault(); handleNav('/contact'); }}
                  className="hover:text-cyan-300 transition-colors cursor-pointer text-slate-400 no-underline block"
                >
                  Contact
                </a>
              </li>
            </ul>
          </div>

          {/* Core Capabilities */}
          <div className="lg:col-span-2 space-y-3">
            <div className="text-xs font-mono uppercase tracking-wider text-cyan-400 font-bold">
              Capabilities
            </div>
            <ul className="space-y-2 text-sm text-slate-400">
              <li>
                <a 
                  href="/services#srv-shopify" 
                  onClick={(e) => { e.preventDefault(); handleNav('/services#srv-shopify'); }}
                  className="hover:text-cyan-300 transition-colors cursor-pointer text-left text-slate-400 no-underline block"
                >
                  Shopify Stores
                </a>
              </li>
              <li>
                <a 
                  href="/services#srv-webscraping" 
                  onClick={(e) => { e.preventDefault(); handleNav('/services#srv-webscraping'); }}
                  className="hover:text-cyan-300 transition-colors cursor-pointer text-left text-slate-400 no-underline block"
                >
                  Web Scraping
                </a>
              </li>
              <li>
                <a 
                  href="/services#srv-apidev" 
                  onClick={(e) => { e.preventDefault(); handleNav('/services#srv-apidev'); }}
                  className="hover:text-cyan-300 transition-colors cursor-pointer text-left text-slate-400 no-underline block"
                >
                  API Integrations
                </a>
              </li>
              <li>
                <a 
                  href="/services#srv-aiml" 
                  onClick={(e) => { e.preventDefault(); handleNav('/services#srv-aiml'); }}
                  className="hover:text-cyan-300 transition-colors cursor-pointer text-left text-slate-400 no-underline block"
                >
                  AI &amp; Machine Learning
                </a>
              </li>
              <li>
                <a 
                  href="/services#srv-computervision" 
                  onClick={(e) => { e.preventDefault(); handleNav('/services#srv-computervision'); }}
                  className="hover:text-cyan-300 transition-colors cursor-pointer text-left text-slate-400 no-underline block"
                >
                  Computer Vision
                </a>
              </li>
            </ul>
          </div>

          {/* Case Studies / Projects */}
          <div className="lg:col-span-2 space-y-3">
            <div className="text-xs font-mono uppercase tracking-wider text-cyan-400 font-bold">
              Featured Solutions
            </div>
            <ul className="space-y-2 text-sm text-slate-400">
              <li>
                <a 
                  href="/case-studies/noesis" 
                  onClick={(e) => { e.preventDefault(); handleNav('/case-studies/noesis'); }}
                  className="hover:text-cyan-300 transition-colors text-left flex items-center justify-between w-full group cursor-pointer text-slate-400 no-underline"
                  title="Noesis: AI Study Assistant Case Study"
                >
                  <span className="group-hover:text-cyan-300 transition-colors">Noesis: AI Study Assistant</span>
                  <FontAwesomeIcon icon={faArrowUpRightFromSquare} className="w-3 h-3 text-white opacity-70 group-hover:opacity-100 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all flex-shrink-0 ml-1" />
                </a>
              </li>
              <li>
                <a 
                  href="/case-studies/the-watcher" 
                  onClick={(e) => { e.preventDefault(); handleNav('/case-studies/the-watcher'); }}
                  className="hover:text-cyan-300 transition-colors text-left flex items-center justify-between w-full group cursor-pointer text-slate-400 no-underline"
                  title="The Watcher: Child Safety AI Case Study"
                >
                  <span className="group-hover:text-cyan-300 transition-colors">The Watcher: Child Safety AI</span>
                  <FontAwesomeIcon icon={faArrowUpRightFromSquare} className="w-3 h-3 text-white opacity-70 group-hover:opacity-100 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all flex-shrink-0 ml-1" />
                </a>
              </li>
              <li>
                <a 
                  href="/case-studies/frontdesk-ai" 
                  onClick={(e) => { e.preventDefault(); handleNav('/case-studies/frontdesk-ai'); }}
                  className="hover:text-cyan-300 transition-colors text-left flex items-center justify-between w-full group cursor-pointer text-slate-400 no-underline"
                  title="FrontDesk AI: WhatsApp Booking Bot Case Study"
                >
                  <span className="group-hover:text-cyan-300 transition-colors">FrontDesk AI: WhatsApp Bot</span>
                  <FontAwesomeIcon icon={faArrowUpRightFromSquare} className="w-3 h-3 text-white opacity-70 group-hover:opacity-100 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all flex-shrink-0 ml-1" />
                </a>
              </li>
              <li>
                <a 
                  href="/case-studies/threadeye" 
                  onClick={(e) => { e.preventDefault(); handleNav('/case-studies/threadeye'); }}
                  className="hover:text-cyan-300 transition-colors text-left flex items-center justify-between w-full group cursor-pointer text-slate-400 no-underline"
                  title="ThreadEye: Fabric Defect Detection Case Study"
                >
                  <span className="group-hover:text-cyan-300 transition-colors">ThreadEye: Fabric Defect Detection</span>
                  <FontAwesomeIcon icon={faArrowUpRightFromSquare} className="w-3 h-3 text-white opacity-70 group-hover:opacity-100 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all flex-shrink-0 ml-1" />
                </a>
              </li>
              <li>
                <a 
                  href="/case-studies/getscry" 
                  onClick={(e) => { e.preventDefault(); handleNav('/case-studies/getscry'); }}
                  className="hover:text-cyan-300 transition-colors text-left flex items-center justify-between w-full group cursor-pointer text-slate-400 no-underline"
                  title="GetScry: Visitor Intent Intelligence Case Study"
                >
                  <span className="group-hover:text-cyan-300 transition-colors">GetScry: Visitor Intent Intelligence</span>
                  <FontAwesomeIcon icon={faArrowUpRightFromSquare} className="w-3 h-3 text-white opacity-70 group-hover:opacity-100 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all flex-shrink-0 ml-1" />
                </a>
              </li>
            </ul>
          </div>

          {/* Newsletter / Tech Updates */}
          <div className="lg:col-span-3 space-y-3">
            <div className="text-xs font-mono uppercase tracking-wider text-cyan-400 font-bold">
              Stay Connected
            </div>
            <p className="text-xs text-slate-400 leading-relaxed">
              Occasional updates on what we're building and practical guides. No spam.
            </p>

            {subSuccess ? (
              <div className="p-2.5 rounded-xl bg-cyan-950/80 border border-cyan-400/50 text-cyan-300 text-xs text-center font-medium">
                ✓ Thank you for subscribing!
              </div>
            ) : (
              <form onSubmit={handleNewsletter} className="flex items-center gap-2">
                <input
                  type="email"
                  required
                  placeholder="Enter your email"
                  value={emailSub}
                  onChange={(e) => setEmailSub(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-slate-900/80 border border-slate-700/60 text-white placeholder-slate-500 text-xs focus:outline-none focus:border-cyan-400 focus:ring-1 focus:ring-cyan-400/20"
                />
                <button
                  type="submit"
                  className="p-2.5 rounded-xl bg-cyan-400 hover:bg-cyan-300 text-[#031422] transition-colors cursor-pointer flex-shrink-0"
                  aria-label="Subscribe"
                >
                  <FontAwesomeIcon icon={faPaperPlane} className="w-3.5 h-3.5" />
                </button>
              </form>
            )}

            {/* Socials */}
            <div className="flex flex-wrap items-center gap-2.5 pt-2">
              <a 
                href="https://www.linkedin.com/company/brixellabs/home/?viewAsMember=true" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="w-8 h-8 rounded-lg bg-[#0077b5] hover:bg-[#005f93] border border-[#0077b5] flex items-center justify-center text-white shadow-sm hover:shadow-[0_0_12px_rgba(0,119,181,0.6)] transition-all hover:scale-110"
                aria-label="LinkedIn"
                title="LinkedIn"
              >
                <FontAwesomeIcon icon={faLinkedinIn} className="w-4 h-4 text-white" />
              </a>

              <a 
                href="https://www.instagram.com/brixellabs?igsi=cmM0OXliYjJxaWpt" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="w-8 h-8 rounded-lg bg-gradient-to-tr from-[#f09433] via-[#dc2743] to-[#bc1888] hover:opacity-90 border border-pink-500/50 flex items-center justify-center text-white shadow-sm hover:shadow-[0_0_12px_rgba(220,39,67,0.6)] transition-all hover:scale-110"
                aria-label="Instagram"
                title="Instagram"
              >
                <FontAwesomeIcon icon={faInstagram} className="w-4 h-4 text-white" />
              </a>

              <a 
                href="https://www.facebook.com/share/1HiGirYC4f/" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="w-8 h-8 rounded-lg bg-[#1877f2] hover:bg-[#125ec2] border border-[#1877f2] flex items-center justify-center text-white shadow-sm hover:shadow-[0_0_12px_rgba(24,119,242,0.6)] transition-all hover:scale-110"
                aria-label="Facebook"
                title="Facebook"
              >
                <FontAwesomeIcon icon={faFacebookF} className="w-4 h-4 text-white" />
              </a>

              <a 
                href="https://x.com/Brixellabs" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="w-8 h-8 rounded-lg bg-black hover:bg-neutral-900 border border-slate-700 hover:border-slate-500 flex items-center justify-center text-white shadow-sm hover:shadow-[0_0_12px_rgba(255,255,255,0.25)] transition-all hover:scale-110"
                aria-label="X (Twitter)"
                title="X (Twitter)"
              >
                <FontAwesomeIcon icon={faXTwitter} className="w-4 h-4 text-white" />
              </a>

              <a 
                href="https://wa.me/923449254864?text=Hi%20BrixelLabs%2C%20I%20would%20like%20to%20discuss%20a%20project." 
                target="_blank" 
                rel="noopener noreferrer" 
                className="w-8 h-8 rounded-lg bg-[#25d366] hover:bg-[#20ba59] border border-[#25d366] flex items-center justify-center text-white shadow-sm hover:shadow-[0_0_12px_rgba(37,211,102,0.6)] transition-all hover:scale-110"
                aria-label="WhatsApp"
                title="WhatsApp Hotline"
              >
                <FontAwesomeIcon icon={faWhatsapp} className="w-4 h-4 text-white" />
              </a>

              <a 
                href="mailto:brixellabs@gmail.com" 
                className="w-8 h-8 rounded-lg bg-[#ea4335] hover:bg-[#d93025] border border-[#ea4335] flex items-center justify-center text-white shadow-sm hover:shadow-[0_0_12px_rgba(234,67,53,0.6)] transition-all hover:scale-110"
                aria-label="Email"
                title="Send Email to brixellabs@gmail.com"
              >
                <FontAwesomeIcon icon={faEnvelope} className="w-4 h-4 text-white" />
              </a>
            </div>
          </div>

        </div>

        {/* Business Entity Details */}
        <div className="py-6 border-b border-cyan-500/15 flex flex-col md:flex-row items-start md:items-center justify-between gap-4 text-xs text-slate-300">
          <div className="space-y-1">
            <div className="text-white font-bold tracking-tight">
              BrixelLabs
            </div>
            <p className="text-slate-300 text-[11px] leading-relaxed">
              Engineering Operations:{' '}
              <a 
                href="https://www.google.com/maps/search/?api=1&query=Jinnah+Colony%2C+Faisalabad%2C+38000%2C+Pakistan" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-cyan-300 hover:text-white underline inline-flex items-center gap-1 transition-colors"
                title="View BrixelLabs on Google Maps"
              >
                <span>Jinnah Colony, Faisalabad, 38000, Pakistan</span>
                <FontAwesomeIcon icon={faArrowUpRightFromSquare} className="text-[9px]" />
              </a>
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3 text-[11px] text-slate-300">
            <span>Official Email: <a href="mailto:brixellabs@gmail.com" className="text-cyan-300 hover:text-white underline">brixellabs@gmail.com</a></span>
            <span className="text-slate-600">·</span>
            <span>Phone: <a href="tel:+923449254864" className="text-cyan-300 hover:text-white underline">+92 344 9254864</a></span>
          </div>
        </div>

        {/* Bottom Bar with All Legal Policies & Scroll-to-Top indicator */}
        <div className="pt-6 flex flex-col lg:flex-row items-center justify-between gap-4 text-xs text-slate-300">
          <div>
            Copyright © {new Date().getFullYear()} BrixelLabs · All rights reserved. · <span className="text-slate-400">Last updated: October 2026</span>
          </div>

          <div className="flex flex-wrap items-center justify-center gap-3 sm:gap-4 text-xs">
            <a 
              href="/privacy-policy"
              onClick={(e) => { e.preventDefault(); handleNav('/privacy-policy'); }}
              className="text-slate-300 hover:text-cyan-300 transition-colors cursor-pointer no-underline"
            >
              Privacy Policy
            </a>
            <span className="text-slate-600">·</span>
            <a 
              href="/terms-of-service"
              onClick={(e) => { e.preventDefault(); handleNav('/terms-of-service'); }}
              className="text-slate-300 hover:text-cyan-300 transition-colors cursor-pointer no-underline"
            >
              Terms of Service
            </a>
            <span className="text-slate-600">·</span>
            <a 
              href="/refund-policy"
              onClick={(e) => { e.preventDefault(); handleNav('/refund-policy'); }}
              className="text-slate-300 hover:text-cyan-300 transition-colors cursor-pointer no-underline"
            >
              Refund Policy
            </a>
            <span className="text-slate-600">·</span>
            <a 
              href="/cookie-policy"
              onClick={(e) => { e.preventDefault(); handleNav('/cookie-policy'); }}
              className="text-slate-300 hover:text-cyan-300 transition-colors cursor-pointer no-underline"
            >
              Cookie Policy
            </a>
            <span className="text-slate-600">·</span>
            <button 
              type="button"
              onClick={() => {
                if (typeof window !== 'undefined') {
                  window.dispatchEvent(new CustomEvent('brixel_open_cookie_preferences'));
                }
              }}
              className="text-slate-300 hover:text-cyan-300 transition-colors cursor-pointer no-underline bg-transparent border-0 p-0 text-xs inline"
            >
              Cookie Preferences
            </button>
            <span className="text-slate-600">·</span>
            <a 
              href="/data-deletion"
              onClick={(e) => { e.preventDefault(); handleNav('/data-deletion'); }}
              className="text-slate-300 hover:text-cyan-300 transition-colors cursor-pointer no-underline font-medium"
            >
              Data Deletion
            </a>
            <span className="text-slate-600">·</span>
            <a 
              href="/unsubscribe"
              onClick={(e) => { e.preventDefault(); handleNav('/unsubscribe'); }}
              className="text-slate-300 hover:text-cyan-300 transition-colors cursor-pointer no-underline font-medium"
            >
              Unsubscribe
            </a>
            <span className="text-slate-600">·</span>
            <a 
              href="/admin"
              onClick={(e) => { e.preventDefault(); handleNav('/admin'); }}
              className="text-slate-400 hover:text-cyan-300 transition-colors cursor-pointer no-underline font-medium inline-flex items-center gap-1.5"
              title="BrixelLabs Admin Command Center"
            >
              <FontAwesomeIcon icon={faLock} className="text-[10px]" />
              <span>Admin Portal</span>
            </a>
            
            {/* Scroll to Top with Circular Progress */}
            <button
              onClick={scrollToTop}
              className="relative w-9 h-9 rounded-full bg-[#082238] border border-cyan-500/40 text-white hover:text-cyan-300 hover:border-cyan-400 flex items-center justify-center transition-all cursor-pointer shadow-[0_0_12px_rgba(0,240,255,0.2)] hover:shadow-[0_0_20px_rgba(0,240,255,0.5)]"
              aria-label="Scroll to top"
            >
              <svg className="absolute inset-0 w-full h-full -rotate-90 pointer-events-none" viewBox="0 0 36 36">
                <path
                  d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                  fill="none"
                  stroke="#00f0ff"
                  strokeWidth="2.5"
                  strokeDasharray={`${scrollProgress}, 100`}
                />
              </svg>
              <FontAwesomeIcon icon={faArrowUp} className="w-4 h-4 relative z-10 text-white" />
            </button>
          </div>
        </div>

      </div>
    </footer>
  );
};
