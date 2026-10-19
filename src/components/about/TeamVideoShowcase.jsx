import React, { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlay, faPause, faTerminal, faUsers } from '@fortawesome/free-solid-svg-icons';
import { motion } from 'framer-motion';
import teamBgImg from '../../assets/team_working_video_bg.webp';

export const TeamVideoShowcase = () => {
  const [isPlaying, setIsPlaying] = useState(true);
  const [activeLog, setActiveLog] = useState(0);

  const terminalLogs = [
    "git checkout -b feature/analytics-pipeline",
    "Running automated unit & integration tests: 42 passed",
    "Vite production build optimized in 640ms",
    "Shopify Admin API webhook synchronized: orders/create",
    "FastAPI async endpoint /v1/infer responding in 32ms",
    "Scrapy extraction spider indexing product catalog..."
  ];

  useEffect(() => {
    if (!isPlaying) return;
    const interval = setInterval(() => {
      setActiveLog((prev) => (prev + 1) % terminalLogs.length);
    }, 2400);
    return () => clearInterval(interval);
  }, [isPlaying]);

  return (
    <div className="relative w-full rounded-2xl overflow-hidden bg-slate-950 border border-slate-800/80 shadow-2xl group my-8">
      
      {/* Background Video Simulation Container */}
      <div className="relative aspect-[16/9] sm:aspect-[21/9] w-full overflow-hidden bg-[#030e18]">
        
        {/* The Team Working on Laptops Background Image / Video Feed */}
        <motion.img 
          src={teamBgImg} 
          alt="BrixelLabs Engineering Team Working Together"
          loading="lazy"
          decoding="async"
          animate={{
            scale: isPlaying ? [1, 1.02, 1] : 1,
          }}
          transition={{
            duration: 14,
            repeat: Infinity,
            ease: "easeInOut"
          }}
          className="w-full h-full object-cover opacity-80 group-hover:opacity-90 transition-opacity duration-700 filter brightness-95"
        />

        {/* Ambient Gradient Lighting */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#030c14] via-[#041626]/50 to-transparent pointer-events-none"></div>
        <div className="absolute inset-0 bg-gradient-to-r from-[#030c14]/80 via-transparent to-[#030c14]/80 pointer-events-none"></div>

        {/* Top Video Feed Header */}
        <div className="absolute top-4 left-4 right-4 flex items-center justify-between z-20">
          <div className="px-3 py-1.5 rounded-xl bg-slate-950/85 backdrop-blur-md border border-slate-700/60 text-xs text-white">
            <span className="font-semibold text-slate-200">Inside BrixelLabs</span>
            <span className="hidden sm:inline text-slate-400"> | Architecture &amp; Sprint Review</span>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => setIsPlaying(!isPlaying)}
              className="p-2 rounded-xl bg-slate-950/85 hover:bg-slate-900 text-slate-200 border border-slate-700/60 backdrop-blur-md transition-colors cursor-pointer"
              title={isPlaying ? "Pause video" : "Resume video"}
              aria-label={isPlaying ? "Pause studio showcase" : "Resume studio showcase"}
            >
              {isPlaying ? <FontAwesomeIcon icon={faPause} className="w-3.5 h-3.5" /> : <FontAwesomeIcon icon={faPlay} className="w-3.5 h-3.5" />}
            </button>
          </div>
        </div>

        {/* Live Terminal Code Feed in Lower Left Overlay */}
        <div className="absolute bottom-4 left-4 max-w-md z-20">
          <div className="px-3.5 py-2.5 rounded-xl bg-slate-950/90 backdrop-blur-md border border-slate-700/60 text-xs font-mono text-cyan-300 shadow-xl space-y-1">
            <div className="flex items-center gap-2 text-[10px] text-slate-400 pb-1 border-b border-slate-800">
              <FontAwesomeIcon icon={faTerminal} className="w-3 h-3 text-cyan-400" />
              <span>CI/CD PIPELINE &amp; SPRINT LOG</span>
            </div>
            <div className="text-white text-[11px] flex items-center gap-2 truncate">
              <span className="text-cyan-400">&gt;</span>
              <span>{terminalLogs[activeLog]}</span>
            </div>
          </div>
        </div>

      </div>

      {/* Bottom Info Banner */}
      <div className="p-5 sm:p-6 bg-[#041626]/90 border-t border-slate-800/80 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-slate-900 border border-slate-700/60 flex items-center justify-center text-cyan-400">
            <FontAwesomeIcon icon={faUsers} className="w-4 h-4" />
          </div>
          <div>
            <h4 className="text-sm font-bold text-white">Full-Stack Engineers &amp; Solution Architects</h4>
            <p className="text-slate-400 text-xs">Direct collaboration, weekly milestones, and production-tested code delivery.</p>
          </div>
        </div>
      </div>

    </div>
  );
};
