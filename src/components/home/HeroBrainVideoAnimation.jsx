import React, { useState, useEffect, useRef } from 'react';
import { 
  Play, 
  Pause, 
  Cpu, 
  Activity, 
  Scan, 
  ShieldCheck, 
  Maximize2, 
  Radio, 
  Sliders, 
  RefreshCw,
  Zap,
  Flame
} from 'lucide-react';
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';
import heroSectionImg from '../../assets/HeroSection.png';

export const HeroBrainVideoAnimation = () => {
  const [isPlaying, setIsPlaying] = useState(true);
  const [hudMode, setHudMode] = useState('optical'); // 'optical' | 'thermal' | 'wireframe'
  const [fps, setFps] = useState(60);
  const [activeNode, setActiveNode] = useState(0);
  const containerRef = useRef(null);

  // 3D Parallax Mouse Response
  const mouseX = useMotionValue(0.5);
  const mouseY = useMotionValue(0.5);
  const springConfig = { damping: 25, stiffness: 200 };
  const rotateX = useSpring(useTransform(mouseY, [0, 1], [10, -10]), springConfig);
  const rotateY = useSpring(useTransform(mouseX, [0, 1], [-10, 10]), springConfig);

  const handleMouseMove = (e) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    mouseX.set((e.clientX - rect.left) / rect.width);
    mouseY.set((e.clientY - rect.top) / rect.height);
  };

  const handleMouseLeave = () => {
    mouseX.set(0.5);
    mouseY.set(0.5);
  };

  // FPS and telemetry fluctuation loop
  useEffect(() => {
    if (!isPlaying) return;
    const interval = setInterval(() => {
      setFps(Math.floor(59 + Math.random() * 3));
      setActiveNode((prev) => (prev + 1) % 4);
    }, 1400);
    return () => clearInterval(interval);
  }, [isPlaying]);

  // Neural node coordinates on the chip image
  const nodes = [
    { id: 1, top: '28%', left: '32%', label: 'Neural Core Alpha', val: '99.8% Acc' },
    { id: 2, top: '35%', right: '30%', label: 'Edge TensorRT', val: '13.8ms Latency' },
    { id: 3, bottom: '32%', left: '38%', label: 'Vision Stream', val: '4K · 60 FPS' },
    { id: 4, bottom: '26%', right: '34%', label: 'Autonomous Agent', val: '100% Synced' },
  ];

  return (
    <div 
      ref={containerRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className="relative w-full max-w-xl mx-auto select-none group"
    >
      {/* Outer Breathing Multi-Layered Neon Aura */}
      <div className={`absolute -inset-4 rounded-[40px] blur-3xl opacity-50 transition-all duration-700 pointer-events-none ${
        hudMode === 'thermal'
          ? 'bg-gradient-to-r from-amber-500/30 via-fuchsia-500/25 to-cyan-500/30'
          : 'bg-gradient-to-r from-cyan-400/35 via-teal-400/25 to-blue-500/30'
      } group-hover:opacity-75`} />

      {/* Main Video Frame Container */}
      <motion.div
        style={{
          rotateX,
          rotateY,
          transformStyle: 'preserve-3d',
          perspective: 1200,
        }}
        className="relative rounded-3xl bg-gradient-to-b from-[#07243c]/90 via-[#041626]/95 to-[#020b12]/98 border border-cyan-500/40 p-1 shadow-[0_0_50px_rgba(0,240,255,0.3)] overflow-hidden"
      >
        {/* Top Video HUD Header */}
        <div className="flex items-center justify-between px-4 py-2.5 bg-[#051a2d]/90 border-b border-cyan-500/30 backdrop-blur-md">
          <div className="flex items-center gap-2.5 text-xs font-mono">
            <span className="relative flex h-2.5 w-2.5">
              <span className={`animate-ping absolute inline-flex h-full w-full rounded-full opacity-75 ${
                isPlaying ? 'bg-cyan-400' : 'bg-amber-400'
              }`}></span>
              <span className={`relative inline-flex rounded-full h-2.5 w-2.5 ${
                isPlaying ? 'bg-cyan-500' : 'bg-amber-500'
              }`}></span>
            </span>
            <span className="text-white font-bold tracking-wider">
              BRIXEL·NEURAL·CORE <span className="text-cyan-400">v4.5</span>
            </span>
            <span className="hidden sm:inline px-1.5 py-0.5 rounded bg-cyan-950/80 border border-cyan-500/40 text-[10px] text-cyan-300">
              LIVE 4K
            </span>
          </div>

          <div className="flex items-center gap-2">
            {/* Vision Mode Toggle */}
            <button
              onClick={() => setHudMode(hudMode === 'optical' ? 'thermal' : 'optical')}
              className={`px-2.5 py-1 rounded-lg text-[10px] font-mono font-bold flex items-center gap-1 transition-all border cursor-pointer ${
                hudMode === 'thermal'
                  ? 'bg-amber-500 text-black border-amber-400 shadow-[0_0_12px_#f59e0b]'
                  : 'bg-[#08233b] text-cyan-300 border-cyan-500/40 hover:text-white'
              }`}
              title="Toggle Thermal/Optical AI Lens"
            >
              <Flame className="w-3 h-3" />
              <span>{hudMode === 'thermal' ? 'THERMAL' : 'OPTICAL'}</span>
            </button>

            {/* Play/Pause Button */}
            <button
              onClick={() => setIsPlaying(!isPlaying)}
              className="p-1.5 rounded-lg bg-[#08233b] text-cyan-300 hover:text-white border border-cyan-500/30 transition-colors cursor-pointer"
              title={isPlaying ? "Pause Animation" : "Play Animation"}
            >
              {isPlaying ? <Pause className="w-3.5 h-3.5" /> : <Play className="w-3.5 h-3.5" />}
            </button>
          </div>
        </div>

        {/* Video Canvas Body */}
        <div className="relative aspect-[4/3] sm:aspect-[16/11] w-full flex items-center justify-center overflow-hidden bg-[#030e18]">
          
          {/* Background Cyber Grid Matrix */}
          <div className="absolute inset-0 circuit-bg opacity-60 pointer-events-none" />

          {/* 3D Holographic Rotating Orbit Rings */}
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
            {/* Outer Cyan Ring */}
            <motion.div
              animate={{ rotate: isPlaying ? 360 : 0 }}
              transition={{ duration: 24, repeat: Infinity, ease: "linear" }}
              className="w-[380px] h-[380px] sm:w-[440px] sm:h-[440px] rounded-full border border-dashed border-cyan-400/25 opacity-70"
            />
            {/* Middle Teal Ring */}
            <motion.div
              animate={{ rotate: isPlaying ? -360 : 0 }}
              transition={{ duration: 16, repeat: Infinity, ease: "linear" }}
              className="w-[300px] h-[300px] sm:w-[350px] sm:h-[350px] rounded-full border border-dotted border-teal-300/30 opacity-60"
            />
            {/* Inner Glowing Ring */}
            <motion.div
              animate={{ scale: isPlaying ? [0.95, 1.05, 0.95] : 1 }}
              transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
              className="w-[220px] h-[220px] sm:w-[260px] sm:h-[260px] rounded-full border border-cyan-400/40 shadow-[0_0_25px_rgba(0,240,255,0.3)]"
            />
          </div>

          {/* Laser Scanning Line Sweep */}
          {isPlaying && (
            <div className={`absolute top-0 bottom-0 w-[2px] opacity-80 animate-scan pointer-events-none z-20 ${
              hudMode === 'thermal'
                ? 'bg-gradient-to-b from-transparent via-amber-400 to-transparent shadow-[0_0_20px_#f59e0b]'
                : 'bg-gradient-to-b from-transparent via-cyan-400 to-transparent shadow-[0_0_20px_#00f0ff]'
            }`} />
          )}

          {/* Animated 3D Hero Image (Brain Chip Architecture) */}
          <motion.div
            animate={{
              y: isPlaying ? [0, -12, 0] : 0,
              scale: isPlaying ? [1, 1.02, 1] : 1,
            }}
            transition={{
              duration: 5,
              repeat: Infinity,
              ease: "easeInOut",
            }}
            className="relative z-10 w-4/5 max-w-md p-2 flex items-center justify-center"
          >
            {/* Image with dynamic thermal/optical filters */}
            <img 
              src={heroSectionImg} 
              alt="BrixelLabs AI Neural Processor Architecture"
              loading="eager"
              decoding="async"
              className={`w-full h-auto object-contain transition-all duration-700 ${
                hudMode === 'thermal'
                  ? 'filter hue-rotate-180 contrast-125 brightness-110 drop-shadow-[0_0_40px_rgba(245,158,11,0.7)]'
                  : 'drop-shadow-[0_0_40px_rgba(0,240,255,0.6)] group-hover:drop-shadow-[0_0_60px_rgba(0,240,255,0.9)]'
              }`}
            />

            {/* Glowing Pulsing Interactive Nodes over Image */}
            {nodes.map((node, i) => (
              <div
                key={node.id}
                className="absolute z-20 flex flex-col items-center pointer-events-auto cursor-pointer"
                style={{
                  top: node.top,
                  bottom: node.bottom,
                  left: node.left,
                  right: node.right,
                }}
              >
                {/* Node Radar Circle */}
                <div className="relative flex items-center justify-center">
                  <span className={`animate-ping absolute h-4 w-4 rounded-full ${
                    i === activeNode ? 'bg-cyan-400 opacity-90' : 'bg-teal-300 opacity-40'
                  }`}></span>
                  <div className={`w-3 h-3 rounded-full border-2 border-[#030e18] shadow-[0_0_12px_#00f0ff] ${
                    i === activeNode ? 'bg-cyan-300' : 'bg-teal-400'
                  }`}></div>
                </div>

                {/* Node Tooltip Label */}
                <motion.div
                  initial={{ opacity: 0.8 }}
                  animate={{ opacity: i === activeNode ? 1 : 0.6, y: i === activeNode ? -2 : 0 }}
                  className="mt-1 px-2 py-0.5 rounded bg-black/80 backdrop-blur-md border border-cyan-500/40 text-[9px] font-mono text-cyan-300 whitespace-nowrap shadow-lg"
                >
                  <span className="font-bold text-white">{node.label}:</span> {node.val}
                </motion.div>
              </div>
            ))}
          </motion.div>

          {/* HUD Target Crosshairs */}
          <div className="absolute inset-0 pointer-events-none flex items-center justify-center">
            <div className="w-16 h-16 border border-cyan-400/20 rounded-full flex items-center justify-center">
              <div className="w-1 h-1 bg-cyan-400 rounded-full shadow-[0_0_8px_#00f0ff]"></div>
            </div>
            {/* Corner Bracket Reticles */}
            <div className="absolute top-4 left-4 w-6 h-6 border-t-2 border-l-2 border-cyan-400/40"></div>
            <div className="absolute top-4 right-4 w-6 h-6 border-t-2 border-r-2 border-cyan-400/40"></div>
            <div className="absolute bottom-4 left-4 w-6 h-6 border-b-2 border-l-2 border-cyan-400/40"></div>
            <div className="absolute bottom-4 right-4 w-6 h-6 border-b-2 border-r-2 border-cyan-400/40"></div>
          </div>

          {/* Telemetry Overlay Tags (Bottom Left & Right) */}
          <div className="absolute bottom-3 left-3 bg-[#030e18]/85 backdrop-blur-md px-3 py-1.5 rounded-xl border border-cyan-500/30 text-[10px] font-mono text-slate-300 flex items-center gap-3 pointer-events-none z-20">
            <span className="text-cyan-400 font-bold flex items-center gap-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-ping"></span>
              {fps} FPS
            </span>
            <span>LATENCY: 13.8ms</span>
            <span className="text-teal-300">GPU: 48°C</span>
          </div>

          <div className="absolute bottom-3 right-3 bg-[#030e18]/85 backdrop-blur-md px-3 py-1.5 rounded-xl border border-cyan-500/30 text-[10px] font-mono text-cyan-300 pointer-events-none z-20 hidden sm:flex items-center gap-1.5">
            <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
            <span>ACCURACY: 99.8%</span>
          </div>

        </div>

        {/* Bottom Audio Wave / Video Playback Control Ribbon */}
        <div className="px-4 py-3 bg-[#041626] border-t border-cyan-500/25 flex items-center justify-between text-xs">
          
          <div className="flex items-center gap-2">
            <span className="text-[11px] font-mono text-cyan-400 font-semibold">NEURAL STREAM:</span>
            {/* Animated Audio/Frequency Spectrum */}
            <div className="flex items-center gap-1 h-4">
              <span className="w-1 bg-cyan-400 rounded-full animate-wave-1"></span>
              <span className="w-1 bg-teal-400 rounded-full animate-wave-2"></span>
              <span className="w-1 bg-cyan-300 rounded-full animate-wave-3"></span>
              <span className="w-1 bg-teal-300 rounded-full animate-wave-4"></span>
              <span className="w-1 bg-cyan-400 rounded-full animate-wave-5"></span>
              <span className="w-1 bg-teal-400 rounded-full animate-wave-2"></span>
            </div>
          </div>

          <div className="flex items-center gap-2 px-3 py-1 rounded-lg bg-[#06192a]/90 border border-cyan-500/30">
            <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 shadow-[0_0_6px_#00f0ff]"></span>
            <span className="text-[11px] font-mono font-bold text-transparent bg-clip-text bg-gradient-to-r from-cyan-300 via-teal-300 to-white tracking-wider uppercase">
              Design · Build · Automate
            </span>
          </div>

        </div>

      </motion.div>
    </div>
  );
};
