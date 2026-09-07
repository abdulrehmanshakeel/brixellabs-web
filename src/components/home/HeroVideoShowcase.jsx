import React, { useState, useEffect } from 'react';
import { 
  Camera, 
  Cpu, 
  MessageSquare, 
  Activity, 
  Play, 
  Pause, 
  Maximize2, 
  Bot, 
  ShieldCheck, 
  CheckCircle2,
  Volume2
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export const HeroVideoShowcase = ({ onOpenShowreel }) => {
  const [activeTab, setActiveTab] = useState(0);
  const [isPlaying, setIsPlaying] = useState(true);
  const [fps, setFps] = useState(60);

  // Fluctuating FPS ticker
  useEffect(() => {
    if (!isPlaying) return;
    const interval = setInterval(() => {
      setFps(Math.floor(58 + Math.random() * 4));
    }, 1200);
    return () => clearInterval(interval);
  }, [isPlaying]);

  const tabs = [
    { id: 'vision', label: 'Vision AI', icon: Camera, badge: '4K · 14ms' },
    { id: 'agents', label: 'Agentic Workflows', icon: Cpu, badge: 'Multi-Agent' },
    { id: 'chat', label: 'Conversational Bot', icon: MessageSquare, badge: 'WhatsApp Sync' },
    { id: 'cloud', label: 'Cloud Stream', icon: Activity, badge: 'Real-time' },
  ];

  return (
    <div className="w-full max-w-2xl mx-auto">
      {/* Outer Glow Container */}
      <div className="relative gradient-card rounded-3xl overflow-hidden border border-cyan-500/35 shadow-[0_0_50px_rgba(0,240,255,0.25)]">
        
        {/* Top Window Chrome */}
        <div className="px-4 py-2.5 bg-[#051829] border-b border-cyan-500/25 flex items-center justify-between">
          <div className="flex items-center gap-1.5">
            <span className="w-2.5 h-2.5 rounded-full bg-red-500/80"></span>
            <span className="w-2.5 h-2.5 rounded-full bg-amber-500/80"></span>
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-500/80"></span>
            <span className="ml-2 text-xs font-mono font-semibold text-cyan-300">
              AI ENGINE CORE v4.2
            </span>
          </div>

          <div className="flex items-center gap-2">
            <span className="text-[10px] font-mono text-cyan-300 bg-cyan-950/80 px-2.5 py-0.5 rounded-md border border-cyan-500/30">
              LIVE TELEMETRY
            </span>
          </div>
        </div>

        {/* Tab Switcher Pills */}
        <div className="grid grid-cols-4 p-1.5 bg-[#041423] border-b border-cyan-500/20 gap-1">
          {tabs.map((tab, idx) => {
            const IconComp = tab.icon;
            const isActive = activeTab === idx;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(idx)}
                className={`relative px-2 py-2 rounded-xl text-xs font-medium transition-all flex flex-col items-center gap-1 cursor-pointer ${
                  isActive
                    ? 'text-white'
                    : 'text-slate-400 hover:text-slate-200'
                }`}
              >
                {isActive && (
                  <motion.div
                    layoutId="heroTabIndicator"
                    className="absolute inset-0 bg-gradient-to-b from-cyan-950/90 to-[#07243b] border border-cyan-400/50 rounded-xl shadow-[0_0_15px_rgba(0,240,255,0.3)] z-0"
                    transition={{ type: 'spring', stiffness: 400, damping: 30 }}
                  />
                )}
                <span className="relative z-10 flex items-center gap-1 font-semibold text-[11px] truncate">
                  <IconComp className={`w-3.5 h-3.5 ${isActive ? 'text-cyan-400' : 'text-slate-400'}`} />
                  <span className="hidden sm:inline">{tab.label}</span>
                </span>
                <span className="relative z-10 text-[9px] font-mono text-cyan-400/80">
                  {tab.badge}
                </span>
              </button>
            );
          })}
        </div>

        {/* Interactive Simulation Viewport */}
        <div className="relative aspect-[16/10] w-full bg-[#020b12] overflow-hidden flex items-center justify-center select-none p-4">
          
          {/* Cyber Grid background */}
          <div className="absolute inset-0 circuit-bg opacity-50"></div>

          {/* Laser scan line */}
          {isPlaying && (
            <div className="absolute top-0 bottom-0 w-1 bg-gradient-to-b from-transparent via-cyan-400 to-transparent opacity-80 shadow-[0_0_15px_#00f0ff] animate-scan pointer-events-none z-20"></div>
          )}

          {/* TAB 0: Vision AI */}
          {activeTab === 0 && (
            <div className="absolute inset-0 p-4 flex flex-col justify-between">
              {/* Textile Grid */}
              <div className="absolute inset-0 bg-[radial-gradient(#155e75_1px,transparent_1px)] [background-size:8px_8px] opacity-50"></div>
              
              {/* Defect Bounding Box 1 */}
              <motion.div 
                animate={{ scale: [1, 1.03, 1], y: [0, -3, 0] }}
                transition={{ duration: 3, repeat: Infinity }}
                className="absolute top-6 left-8 border-2 border-red-500 bg-red-500/20 px-2 py-1 rounded text-[10px] text-red-200 font-mono shadow-[0_0_15px_rgba(239,68,68,0.4)]"
              >
                Hole Flaw (99.1%)
                <div className="text-[8px] text-red-300">#4K-CAM01</div>
              </motion.div>

              {/* Defect Bounding Box 2 */}
              <motion.div 
                animate={{ scale: [1, 1.02, 1], x: [0, 3, 0] }}
                transition={{ duration: 3.5, repeat: Infinity, delay: 0.5 }}
                className="absolute bottom-8 right-10 border-2 border-amber-400 bg-amber-400/20 px-2 py-1 rounded text-[10px] text-amber-200 font-mono shadow-[0_0_15px_rgba(245,158,11,0.4)]"
              >
                Oil Stain (96.8%)
                <div className="text-[8px] text-amber-300">Auto-Divert</div>
              </motion.div>

              {/* Center Crosshair Target */}
              <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                <div className="w-16 h-16 border border-cyan-400/30 rounded-full flex items-center justify-center">
                  <div className="w-2 h-2 bg-cyan-400 rounded-full animate-ping"></div>
                </div>
              </div>

              {/* Live Overlay Footer */}
              <div className="relative z-10 flex items-center justify-between text-[11px] font-mono bg-black/60 backdrop-blur px-3 py-1.5 rounded-lg border border-cyan-500/30 text-slate-300">
                <span className="text-cyan-400 font-bold flex items-center gap-1.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-ping"></span>
                  4K CAM-01 · 60 FPS
                </span>
                <span className="text-teal-300">Inference: 13.8ms</span>
              </div>
            </div>
          )}

          {/* TAB 1: Agentic AI */}
          {activeTab === 1 && (
            <div className="absolute inset-0 p-4 flex items-center justify-center">
              <div className="grid grid-cols-3 gap-3 w-full max-w-md relative">
                {/* Connecting glowing line */}
                <div className="absolute top-1/2 left-6 right-6 h-[2px] bg-gradient-to-r from-cyan-400 to-teal-300 -translate-y-1/2 opacity-70 z-0"></div>

                <div className="relative z-10 glass-panel rounded-xl p-2.5 border border-cyan-500/40 text-center bg-[#072036]/90 space-y-1">
                  <div className="w-8 h-8 mx-auto rounded-lg bg-cyan-950 border border-cyan-400 flex items-center justify-center text-cyan-300">
                    <Cpu className="w-4 h-4" />
                  </div>
                  <div className="text-[10px] font-bold text-white">Ingestion</div>
                  <div className="text-[9px] text-cyan-300 font-mono">1.2k doc/s</div>
                </div>

                <div className="relative z-10 glass-panel rounded-xl p-2.5 border border-teal-500/40 text-center bg-[#072a3e]/90 space-y-1 shadow-[0_0_15px_rgba(0,229,208,0.3)]">
                  <div className="w-8 h-8 mx-auto rounded-lg bg-teal-950 border border-teal-400 flex items-center justify-center text-teal-300">
                    <Bot className="w-4 h-4" />
                  </div>
                  <div className="text-[10px] font-bold text-white">LLM Agent</div>
                  <div className="text-[9px] text-teal-300 font-mono">Reasoning</div>
                </div>

                <div className="relative z-10 glass-panel rounded-xl p-2.5 border border-cyan-500/40 text-center bg-[#072036]/90 space-y-1">
                  <div className="w-8 h-8 mx-auto rounded-lg bg-cyan-950 border border-cyan-400 flex items-center justify-center text-cyan-300">
                    <ShieldCheck className="w-4 h-4" />
                  </div>
                  <div className="text-[10px] font-bold text-white">Action API</div>
                  <div className="text-[9px] text-emerald-400 font-mono">Executed</div>
                </div>
              </div>
            </div>
          )}

          {/* TAB 2: Chatbot */}
          {activeTab === 2 && (
            <div className="absolute inset-0 p-4 flex flex-col justify-between">
              <div className="space-y-2 text-xs">
                <div className="bg-[#0b333a] p-2 rounded-xl rounded-tl-none max-w-[80%] text-slate-200 border border-teal-500/20">
                  Hi, can I book an AI architectural review tomorrow at 3 PM?
                </div>
                <div className="bg-[#0a4742] p-2 rounded-xl rounded-tr-none ml-auto max-w-[80%] text-teal-100 border border-teal-400/30">
                  ✓ Confirmed! Slot locked for 3:00 PM. Added to Google Calendar.
                </div>
              </div>

              <div className="flex items-center justify-between text-[10px] text-teal-300 font-mono pt-2 border-t border-teal-500/20">
                <span className="flex items-center gap-1.5">
                  <span className="w-2 h-2 rounded-full bg-emerald-400"></span>
                  WhatsApp Agent Active
                </span>
                <div className="flex items-center gap-1 h-4">
                  <span className="w-1 bg-teal-400 rounded-full animate-wave-1"></span>
                  <span className="w-1 bg-cyan-400 rounded-full animate-wave-2"></span>
                  <span className="w-1 bg-teal-300 rounded-full animate-wave-3"></span>
                  <span className="w-1 bg-cyan-300 rounded-full animate-wave-4"></span>
                </div>
              </div>
            </div>
          )}

          {/* TAB 3: Cloud Telemetry */}
          {activeTab === 3 && (
            <div className="absolute inset-0 p-4 flex flex-col justify-between">
              <div className="grid grid-cols-3 gap-2">
                <div className="glass-panel p-2 rounded-lg text-center font-mono text-[10px] text-cyan-300">
                  Reqs: 840k/m
                </div>
                <div className="glass-panel p-2 rounded-lg text-center font-mono text-[10px] text-teal-300">
                  Latency: 11ms
                </div>
                <div className="glass-panel p-2 rounded-lg text-center font-mono text-[10px] text-emerald-300">
                  Uptime: 99.99%
                </div>
              </div>

              {/* Dynamic SVG Wave */}
              <div className="h-20 w-full flex items-end">
                <svg className="w-full h-full" viewBox="0 0 400 80" preserveAspectRatio="none">
                  <path
                    d="M 0 50 Q 50 10, 100 45 T 200 25 T 300 40 T 400 15 L 400 80 L 0 80 Z"
                    fill="rgba(0, 240, 255, 0.15)"
                  />
                  <path
                    d="M 0 50 Q 50 10, 100 45 T 200 25 T 300 40 T 400 15"
                    stroke="#00f0ff"
                    strokeWidth="2"
                    fill="none"
                  />
                </svg>
              </div>
            </div>
          )}

        </div>

        {/* Bottom Action Ribbon */}
        <div className="px-4 py-3 bg-[#041626] border-t border-cyan-500/25 flex items-center justify-between text-xs">
          <div className="flex items-center gap-2">
            <button
              onClick={() => setIsPlaying(!isPlaying)}
              className="p-1.5 rounded-lg bg-[#082238] text-cyan-300 hover:text-white border border-cyan-500/30 transition-colors"
            >
              {isPlaying ? <Pause className="w-3.5 h-3.5" /> : <Play className="w-3.5 h-3.5" />}
            </button>
            <span className="text-[11px] text-slate-400 font-mono">
              Live Interactive AI Telemetry
            </span>
          </div>

          <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-cyan-950/70 border border-cyan-500/30">
            <span className="w-1.5 h-1.5 rounded-full bg-cyan-400"></span>
            <span className="text-[10px] font-mono font-bold text-transparent bg-clip-text bg-gradient-to-r from-cyan-300 to-teal-300 uppercase tracking-wider">
              Design · Build · Automate
            </span>
          </div>
        </div>

      </div>
    </div>
  );
};
