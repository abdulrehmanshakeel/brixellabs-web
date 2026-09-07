import React, { useState, useEffect } from 'react';
import { Play, Pause, Terminal, Cpu, Users, Activity, ShieldCheck, Maximize2 } from 'lucide-react';
import { motion } from 'framer-motion';

export const TeamVideoShowcase = () => {
  const [isPlaying, setIsPlaying] = useState(true);
  const [activeLog, setActiveLog] = useState(0);

  const terminalLogs = [
    "Compiling custom PyTorch TensorRT inference engine...",
    "YOLOv9 defect detection accuracy validated: 99.8%",
    "WebSocket telemetry streaming at 60 FPS to dashboard",
    "Agentic LLM multi-node scheduler synced with calendar",
    "NVIDIA Jetson AGX edge cluster status: 100% operational",
    "Automated regression pipeline tests: 1,420 passing"
  ];

  useEffect(() => {
    if (!isPlaying) return;
    const interval = setInterval(() => {
      setActiveLog((prev) => (prev + 1) % terminalLogs.length);
    }, 2200);
    return () => clearInterval(interval);
  }, [isPlaying]);

  return (
    <div className="relative w-full rounded-3xl overflow-hidden gradient-card border border-cyan-500/35 shadow-2xl group my-12">
      
      {/* Background Video Simulation Container */}
      <div className="relative aspect-[16/9] sm:aspect-[21/9] w-full overflow-hidden bg-[#030e18]">
        
        {/* The Team Working on Laptops Background Image / Video Feed */}
        <motion.img 
          src="/icons/team_working_video_bg.jpg" 
          alt="BrixelLabs Engineering Team Working on Laptops in AI Lab"
          animate={{
            scale: isPlaying ? [1, 1.03, 1] : 1,
          }}
          transition={{
            duration: 12,
            repeat: Infinity,
            ease: "easeInOut"
          }}
          className="w-full h-full object-cover opacity-75 group-hover:opacity-90 transition-opacity duration-700 filter brightness-95 contrast-110"
        />

        {/* Ambient Cyan/Teal Gradient Lighting Shaders */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#030c14] via-[#041626]/60 to-transparent pointer-events-none"></div>
        <div className="absolute inset-0 bg-gradient-to-r from-[#030c14]/80 via-transparent to-[#030c14]/80 pointer-events-none"></div>

        {/* Moving Laser Scanline across Video Feed */}
        {isPlaying && (
          <div className="absolute top-0 bottom-0 w-[2px] bg-gradient-to-b from-transparent via-cyan-400 to-transparent shadow-[0_0_20px_#00f0ff] animate-scan pointer-events-none opacity-70"></div>
        )}

        {/* Top Video Feed Header */}
        <div className="absolute top-4 left-4 right-4 flex items-center justify-between z-20">
          <div className="flex items-center gap-2.5 px-3 py-1.5 rounded-xl bg-black/80 backdrop-blur-md border border-cyan-500/30 text-xs font-mono text-white">
            <span className="w-2 h-2 rounded-full bg-red-500 animate-ping"></span>
            <span className="font-bold text-cyan-300">LIVE LAB FEED:</span>
            <span className="hidden sm:inline text-slate-300">HQ Studio & AI War Room</span>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => setIsPlaying(!isPlaying)}
              className="p-2 rounded-xl bg-black/80 hover:bg-cyan-950/80 text-cyan-300 border border-cyan-500/40 backdrop-blur-md transition-colors cursor-pointer"
              title={isPlaying ? "Pause Studio Video" : "Resume Studio Video"}
            >
              {isPlaying ? <Pause className="w-3.5 h-3.5" /> : <Play className="w-3.5 h-3.5" />}
            </button>
          </div>
        </div>

        {/* Live Terminal Code Feed in Lower Left Overlay */}
        <div className="absolute bottom-4 left-4 max-w-md z-20">
          <div className="px-3.5 py-2.5 rounded-2xl bg-black/85 backdrop-blur-md border border-cyan-500/35 text-xs font-mono text-cyan-300 shadow-xl space-y-1">
            <div className="flex items-center gap-2 text-[10px] text-slate-400 pb-1 border-b border-cyan-500/20">
              <Terminal className="w-3 h-3 text-cyan-400" />
              <span>LIVE CLOUD CI/CD DEPLOYMENT</span>
            </div>
            <div className="text-white text-[11px] flex items-center gap-2 truncate">
              <span className="text-cyan-400">&gt;</span>
              <span>{terminalLogs[activeLog]}</span>
            </div>
          </div>
        </div>

        {/* Studio Telemetry in Lower Right Overlay */}
        <div className="absolute bottom-4 right-4 z-20 hidden sm:flex items-center gap-2">
          <div className="px-3 py-1.5 rounded-xl bg-black/85 backdrop-blur-md border border-cyan-500/35 text-[11px] font-mono text-emerald-400 flex items-center gap-1.5 shadow-lg">
            <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
            <span>DEV SPRINT: 100% HEALTHY</span>
          </div>
        </div>

      </div>

      {/* Bottom Info Banner */}
      <div className="p-5 sm:p-6 bg-gradient-to-r from-[#04192b] via-[#07243c] to-[#041525] flex flex-col sm:flex-row items-center justify-between gap-4 text-xs">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#092b45] to-[#041525] border border-cyan-500/35 flex items-center justify-center text-cyan-400">
            <Users className="w-5 h-5" />
          </div>
          <div>
            <h4 className="text-sm font-bold text-white">Full-Stack Engineers & AI Scientists at Work</h4>
            <p className="text-slate-400 text-xs">Continuous sprint cycles, pair programming, and automated testing pipelines.</p>
          </div>
        </div>

        <div className="flex items-center gap-2 font-mono text-xs text-cyan-300">
          <span className="w-2 h-2 rounded-full bg-cyan-400 animate-pulse"></span>
          <span>8 ENGINEERS ACTIVE</span>
        </div>
      </div>

    </div>
  );
};
