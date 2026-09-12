import React, { useState, useEffect } from 'react';
import { 
  Linkedin, 
  Twitter, 
  Mail, 
  ArrowUpRight, 
  Github, 
  MessageCircle, 
  Facebook,
  Instagram,
  ArrowUp, 
  ShieldCheck, 
  Send 
} from 'lucide-react';

import { motion } from 'framer-motion';
import { apiClient } from '../../api/client';
import logoImg from '../../assets/logo.png';

export const Footer = ({ navigate }) => {
  const [scrollProgress, setScrollProgress] = useState(0);
  const [currentTime, setCurrentTime] = useState('');
  const [emailSub, setEmailSub] = useState('');
  const [subSuccess, setSubSuccess] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const totalScroll = document.documentElement.scrollHeight - window.innerHeight;
      if (totalScroll > 0) {
        setScrollProgress((window.scrollY / totalScroll) * 100);
      }
    };

    const updateTime = () => {
      const now = new Date();
      setCurrentTime(now.toUTCString().slice(17, 22) + ' UTC');
    };

    updateTime();
    const timeInterval = setInterval(updateTime, 10000);
    window.addEventListener('scroll', handleScroll, { passive: true });

    return () => {
      window.removeEventListener('scroll', handleScroll);
      clearInterval(timeInterval);
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
    if (!emailSub) return;
    
    // Save to backend database & trigger welcome email
    apiClient.subscribeNewsletter(emailSub).catch(err => console.warn('Newsletter API sync:', err));

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
          <div className="lg:col-span-4 space-y-4">
            <div className="flex flex-col gap-1">
              <div className="flex items-center gap-3">
                <div className="relative w-10 h-10 flex items-center justify-center">
                  <div className="absolute inset-0 bg-cyan-400/20 rounded-full blur-md"></div>
                  <img 
                    src={logoImg} 
                    alt="BrixelLabs" 
                    className="w-9 h-9 object-contain relative z-10 drop-shadow-[0_0_8px_rgba(0,240,255,0.6)]"
                  />
                </div>
                <span className="text-2xl font-extrabold tracking-tight text-white">
                  Brixel<span className="text-cyan-400">Labs</span>
                </span>
              </div>
              <span className="text-[11px] font-mono font-bold text-transparent bg-clip-text bg-gradient-to-r from-cyan-300 via-teal-300 to-white uppercase tracking-widest pl-1">
                Design · Build · Automate
              </span>
            </div>

            <p className="text-sm text-slate-400 max-w-sm leading-relaxed">
              Engineering high-velocity AI models, computer vision systems, agentic automation, and scalable full-stack web platforms for modern enterprises.
            </p>

            {/* Live Operational Status */}
            <div className="inline-flex items-center gap-2.5 px-3 py-1.5 rounded-xl bg-[#061e31] border border-cyan-500/30 text-xs font-mono text-cyan-300">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping"></span>
              <span>SYSTEM STATUS: 99.99% ONLINE · {currentTime || 'UTC'}</span>
            </div>
          </div>

          {/* Quick Links */}
          <div className="lg:col-span-2 space-y-3">
            <div className="text-xs font-mono uppercase tracking-wider text-cyan-400 font-bold">
              Navigation
            </div>
            <ul className="space-y-2 text-sm text-slate-400">
              <li>
                <button onClick={() => handleNav('/')} className="hover:text-cyan-300 transition-colors cursor-pointer">
                  Home
                </button>
              </li>
              <li>
                <button onClick={() => handleNav('/services')} className="hover:text-cyan-300 transition-colors cursor-pointer">
                  Services
                </button>
              </li>
              <li>
                <button onClick={() => handleNav('/process')} className="hover:text-cyan-300 transition-colors cursor-pointer">
                  Process & Workflow
                </button>
              </li>
              <li>
                <button onClick={() => handleNav('/case-studies')} className="hover:text-cyan-300 transition-colors cursor-pointer">
                  Case Studies
                </button>
              </li>
              <li>
                <button onClick={() => handleNav('/about')} className="hover:text-cyan-300 transition-colors cursor-pointer">
                  About Us
                </button>
              </li>
            </ul>
          </div>

          {/* Case Studies */}
          <div className="lg:col-span-3 space-y-3">
            <div className="text-xs font-mono uppercase tracking-wider text-cyan-400 font-bold">
              Featured Solutions
            </div>
            <ul className="space-y-2 text-sm text-slate-400">
              <li>
                <button onClick={() => handleNav('/case-studies/fabric-defect-detection')} className="hover:text-cyan-300 transition-colors text-left flex items-center gap-1.5 cursor-pointer">
                  <span>Fabric Defect Vision AI</span>
                  <ArrowUpRight className="w-3 h-3 text-cyan-400" />
                </button>
              </li>
              <li>
                <button onClick={() => handleNav('/case-studies/frontdesk-ai')} className="hover:text-cyan-300 transition-colors text-left flex items-center gap-1.5 cursor-pointer">
                  <span>FrontDesk AI WhatsApp Bot</span>
                  <ArrowUpRight className="w-3 h-3 text-cyan-400" />
                </button>
              </li>
              <li>
                <button onClick={() => handleNav('/case-studies')} className="hover:text-cyan-300 transition-colors text-left flex items-center gap-1.5 cursor-pointer">
                  <span>AI Multi-Agent Study Buddy</span>
                </button>
              </li>
              <li>
                <button onClick={() => handleNav('/case-studies')} className="hover:text-cyan-300 transition-colors text-left flex items-center gap-1.5 cursor-pointer">
                  <span>Smart Factory Robotics</span>
                </button>
              </li>
            </ul>
          </div>

          {/* Newsletter / Tech Updates */}
          <div className="lg:col-span-3 space-y-3">
            <div className="text-xs font-mono uppercase tracking-wider text-cyan-400 font-bold">
              Engineering Insights
            </div>
            <p className="text-xs text-slate-400 leading-relaxed">
              Subscribe to our monthly brief on real-world AI deployments and edge computing breakthroughs.
            </p>

            {subSuccess ? (
              <div className="p-2.5 rounded-xl bg-cyan-950/80 border border-cyan-400/50 text-cyan-300 text-xs text-center font-mono">
                ✓ Subscribed to AI Briefing!
              </div>
            ) : (
              <form onSubmit={handleNewsletter} className="flex items-center gap-2">
                <input
                  type="email"
                  required
                  placeholder="name@company.com"
                  value={emailSub}
                  onChange={(e) => setEmailSub(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl bg-[#082238] border border-cyan-500/30 text-white placeholder-slate-500 text-xs focus:outline-none focus:border-cyan-400"
                />
                <button
                  type="submit"
                  className="p-2 rounded-xl bg-cyan-400 hover:bg-cyan-300 text-[#031422] transition-colors cursor-pointer flex-shrink-0"
                  aria-label="Subscribe"
                >
                  <Send className="w-3.5 h-3.5" />
                </button>
              </form>
            )}

            {/* Socials */}
            <div className="flex flex-wrap items-center gap-2.5 pt-2">
              <a 
                href="https://www.linkedin.com/company/brixellabs/home/?viewAsMember=true" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="w-8 h-8 rounded-lg bg-[#07243b] border border-cyan-500/30 flex items-center justify-center text-cyan-400 hover:text-white hover:border-cyan-400 hover:bg-cyan-500/20 transition-all"
                aria-label="LinkedIn"
                title="LinkedIn"
              >
                <Linkedin className="w-4 h-4" />
              </a>

              <a 
                href="https://www.instagram.com/brixellabs?igsi=cmM0OXliYjJxaWpt" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="w-8 h-8 rounded-lg bg-[#07243b] border border-cyan-500/30 flex items-center justify-center text-cyan-400 hover:text-white hover:border-cyan-400 hover:bg-cyan-500/20 transition-all"
                aria-label="Instagram"
                title="Instagram"
              >
                <Instagram className="w-4 h-4" />
              </a>
              <a 
                href="https://www.facebook.com/share/1HiGirYC4f/" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="w-8 h-8 rounded-lg bg-[#07243b] border border-cyan-500/30 flex items-center justify-center text-cyan-400 hover:text-white hover:border-cyan-400 hover:bg-cyan-500/20 transition-all"
                aria-label="Facebook"
                title="Facebook"
              >
                <Facebook className="w-4 h-4" />
              </a>
              <a 
                href="https://x.com/Brixellabs" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="w-8 h-8 rounded-lg bg-[#07243b] border border-cyan-500/30 flex items-center justify-center text-cyan-400 hover:text-white hover:border-cyan-400 hover:bg-cyan-500/20 transition-all"
                aria-label="X (Twitter)"
                title="X (Twitter)"
              >
                <Twitter className="w-4 h-4" />
              </a>
              <a 
                href="https://wa.me/923449254864" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="w-8 h-8 rounded-lg bg-[#07243b] border border-cyan-500/30 flex items-center justify-center text-cyan-400 hover:text-white hover:border-cyan-400 hover:bg-cyan-500/20 transition-all"
                aria-label="WhatsApp"
                title="WhatsApp Hotline"
              >
                <MessageCircle className="w-4 h-4" />
              </a>
              <a 
                href="https://mail.google.com/mail/?view=cm&fs=1&to=brixellabs@gmail.com" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="w-8 h-8 rounded-lg bg-[#07243b] border border-cyan-500/30 flex items-center justify-center text-cyan-400 hover:text-white hover:border-cyan-400 hover:bg-cyan-500/20 transition-all"
                aria-label="Email"
                title="Send Email via Gmail"
              >
                <Mail className="w-4 h-4" />
              </a>
            </div>
          </div>

        </div>

        {/* Bottom Bar with Scroll-to-Top circular indicator */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500">
          <div>
            Copyright © {new Date().getFullYear()} BrixelLabs · Design · Build · Automate. All rights reserved.
          </div>

          <div className="flex items-center gap-4">
            <button 
              onClick={() => handleNav('/contact')}
              className="hover:text-cyan-400 transition-colors cursor-pointer"
            >
              Privacy Policy
            </button>
            <button 
              onClick={() => handleNav('/contact')}
              className="hover:text-cyan-400 transition-colors cursor-pointer"
            >
              Terms of Service
            </button>
            <button 
              onClick={() => handleNav('/admin')}
              className="text-cyan-400/80 hover:text-cyan-300 font-mono text-[11px] flex items-center gap-1 transition-colors cursor-pointer px-2 py-1 rounded bg-cyan-950/40 border border-cyan-800/40"
            >
              <ShieldCheck className="w-3.5 h-3.5 text-cyan-400" />
              <span>Admin Portal</span>
            </button>
            
            {/* Scroll to Top with Circular Progress */}
            <button
              onClick={scrollToTop}
              className="relative w-9 h-9 rounded-full bg-[#082238] border border-cyan-500/40 text-cyan-300 hover:text-white hover:border-cyan-400 flex items-center justify-center transition-all cursor-pointer shadow-[0_0_12px_rgba(0,240,255,0.2)] hover:shadow-[0_0_20px_rgba(0,240,255,0.5)]"
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
              <ArrowUp className="w-4 h-4 relative z-10" />
            </button>
          </div>
        </div>

      </div>
    </footer>
  );
};
