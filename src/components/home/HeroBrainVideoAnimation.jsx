import React, { useState, useEffect, useRef, useMemo } from 'react';
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
  const [hudMode, setHudMode] = useState('optical'); // 'optical' | 'thermal'
  const [fps, setFps] = useState(60);
  const [activeNode, setActiveNode] = useState(0);
  const [isMobile, setIsMobile] = useState(false);
  const containerRef = useRef(null);

  // Responsive mobile / touch screen detection
  useEffect(() => {
    const checkMobile = () => {
      const mobileWidth = window.innerWidth < 768;
      const touchDevice = window.matchMedia('(hover: none) and (pointer: coarse)').matches;
      setIsMobile(mobileWidth || touchDevice);
    };

    checkMobile();
    window.addEventListener('resize', checkMobile, { passive: true });
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  // 3D Parallax Mouse Response (active only on Desktop / Fine Pointer)
  const mouseX = useMotionValue(0.5);
  const mouseY = useMotionValue(0.5);
  const springConfig = { damping: 28, stiffness: 180 };
  const rotateX = useSpring(useTransform(mouseY, [0, 1], [8, -8]), springConfig);
  const rotateY = useSpring(useTransform(mouseX, [0, 1], [-8, 8]), springConfig);

  const handleMouseMove = (e) => {
    if (isMobile || !containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    mouseX.set((e.clientX - rect.left) / rect.width);
    mouseY.set((e.clientY - rect.top) / rect.height);
  };

  const handleMouseLeave = () => {
    if (isMobile) return;
    mouseX.set(0.5);
    mouseY.set(0.5);
  };

  // FPS and telemetry fluctuation loop (throttled for 60fps mobile efficiency)
  useEffect(() => {
    if (!isPlaying) return;
    const interval = setInterval(() => {
      setFps(Math.floor(59 + Math.random() * 3));
      setActiveNode((prev) => (prev + 1) % 4);
    }, 2200);
    return () => clearInterval(interval);
  }, [isPlaying]);

  // Neural node coordinates on the chip image
  const nodes = useMemo(() => [
    { id: 1, top: '28%', left: '30%', label: 'Neural Core Alpha', val: '99.8% Acc' },
    { id: 2, top: '34%', right: '28%', label: 'Edge TensorRT', val: '13.8ms Latency' },
    { id: 3, bottom: '30%', left: '36%', label: 'Vision Stream', val: '4K · 60 FPS' },
    { id: 4, bottom: '24%', right: '32%', label: 'Autonomous Agent', val: '100% Synced' },
  ], []);

  return (
    <div 
      ref={containerRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className="relative w-full max-w-xl mx-auto select-none group [transform:translateZ(0)]"
    >
      {/* Outer Breathing Multi-Layered Neon Aura (Optimized blur on mobile) */}
      <div className={`absolute -inset-2 sm:-inset-4 rounded-[32px] sm:rounded-[40px] ${
        isMobile ? 'blur-xl opacity-30' : 'blur-3xl opacity-45'
      } transition-all duration-700 pointer-events-none ${
        hudMode === 'thermal'
          ? 'bg-gradient-to-r from-amber-500/25 via-fuchsia-500/20 to-cyan-500/25'
          : 'bg-gradient-to-r from-cyan-400/30 via-teal-400/20 to-blue-500/25'
      } group-hover:opacity-70`} />

      {/* Main Video Frame Container - Flat 2D GPU layer on mobile, 3D tilt on desktop */}
      <motion.div
        style={!isMobile ? {
          rotateX,
          rotateY,
          transformStyle: 'preserve-3d',
          perspective: 1200,
        } : {}}
        className="relative rounded-2xl sm:rounded-3xl bg-gradient-to-b from-[#07243c]/95 via-[#041626]/98 to-[#020b12] border border-cyan-500/40 p-1 shadow-[0_0_35px_rgba(0,240,255,0.25)] overflow-hidden [transform:translateZ(0)]"
      >
        {/* Top Video HUD Header */}
        <div className="flex items-center justify-between px-3.5 sm:px-4 py-2 sm:py-2.5 bg-[#051a2d]/90 border-b border-cyan-500/30 backdrop-blur-md">
          <div className="flex items-center gap-2 text-xs font-mono">
            <span className="relative flex h-2.5 w-2.5">
              <span className={`animate-ping absolute inline-flex h-full w-full rounded-full opacity-75 ${
                isPlaying ? 'bg-cyan-400' : 'bg-amber-400'
              }`}></span>
              <span className={`relative inline-flex rounded-full h-2.5 w-2.5 ${
                isPlaying ? 'bg-cyan-500' : 'bg-amber-500'
              }`}></span>
            </span>
            <span className="text-white font-bold tracking-wider text-[11px] sm:text-xs">
              BRIXEL·NEURAL·CORE <span className="text-cyan-400">v4.5</span>
            </span>
            <span className="hidden sm:inline px-1.5 py-0.5 rounded bg-cyan-950/80 border border-cyan-500/40 text-[10px] text-cyan-300">
              LIVE 4K
            </span>
          </div>

          <div className="flex items-center gap-1.5 sm:gap-2">
            {/* Vision Mode Toggle */}
            <button
              onClick={() => setHudMode(hudMode === 'optical' ? 'thermal' : 'optical')}
              className={`px-2 sm:px-2.5 py-1 rounded-lg text-[9px] sm:text-[10px] font-mono font-bold flex items-center gap-1 transition-all border cursor-pointer ${
                hudMode === 'thermal'
                  ? 'bg-amber-500 text-black border-amber-400 shadow-[0_0_12px_#f59e0b]'
                  : 'bg-[#08233b] text-cyan-300 border-cyan-500/40 hover:text-white'
              }`}
              title="Toggle Thermal/Optical AI Lens"
              aria-label="Toggle Thermal/Optical AI Lens"
            >
              <Flame className="w-3 h-3" />
              <span>{hudMode === 'thermal' ? 'THERMAL' : 'OPTICAL'}</span>
            </button>

            {/* Play/Pause Button */}
            <button
              onClick={() => setIsPlaying(!isPlaying)}
              className="p-1 sm:p-1.5 rounded-lg bg-[#08233b] text-cyan-300 hover:text-white border border-cyan-500/30 transition-colors cursor-pointer"
              title={isPlaying ? "Pause Animation" : "Play Animation"}
              aria-label={isPlaying ? "Pause Animation" : "Play Animation"}
            >
              {isPlaying ? <Pause className="w-3.5 h-3.5" /> : <Play className="w-3.5 h-3.5" />}
            </button>
          </div>
        </div>

        {/* Video Canvas Body */}
        <div className="relative aspect-[4/3] sm:aspect-[16/11] w-full flex items-center justify-center overflow-hidden bg-[#030e18] [transform:translateZ(0)]">
          
          {/* Background Cyber Grid Matrix */}
          <div className="absolute inset-0 circuit-bg opacity-55 pointer-events-none" />

          {/* Holographic Orbit Rings (Adaptive for Mobile & Desktop) */}
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
            {/* Primary Ring (CSS Hardware-Accelerated) */}
            <div 
              className={`w-[280px] h-[280px] sm:w-[420px] sm:h-[420px] rounded-full border border-dashed border-cyan-400/25 ${
                isPlaying ? 'animate-spin' : ''
              }`}
              style={{ animationDuration: '28s' }}
            />
            
            {/* Secondary Ring (Desktop only to prevent mobile overdraw) */}
            {!isMobile && (
              <>
                <div 
                  className={`absolute w-[330px] h-[330px] rounded-full border border-dotted border-teal-300/30 ${
                    isPlaying ? 'animate-spin' : ''
                  }`}
                  style={{ animationDuration: '18s', animationDirection: 'reverse' }}
                />
                <div className="absolute w-[240px] h-[240px] rounded-full border border-cyan-400/35 shadow-[0_0_20px_rgba(0,240,255,0.25)]" />
              </>
            )}
          </div>

          {/* Laser Scanning Line Sweep (GPU translateY) */}
          {isPlaying && (
            <div className={`absolute top-0 bottom-0 w-[2px] animate-laser-scan pointer-events-none z-20 ${
              hudMode === 'thermal'
                ? 'bg-gradient-to-b from-transparent via-amber-400 to-transparent shadow-[0_0_15px_#f59e0b]'
                : 'bg-gradient-to-b from-transparent via-cyan-400 to-transparent shadow-[0_0_15px_#00f0ff]'
            }`} />
          )}

          {/* Animated Hero Image Container (Hardware-Accelerated 60 FPS) */}
          <div className={`relative z-10 w-[84%] sm:w-4/5 max-w-md p-1 sm:p-2 flex items-center justify-center ${
            isPlaying ? 'animate-hero-float' : ''
          }`}>
            
            {/* Ambient High-Performance Radial Glow behind image (Zero Drop-Shadow Repaint Cost) */}
            <div className={`absolute inset-2 sm:inset-4 rounded-full pointer-events-none -z-10 [transform:translateZ(0)] ${
              hudMode === 'thermal'
                ? 'bg-gradient-to-tr from-amber-500/25 via-fuchsia-500/20 to-transparent blur-xl'
                : 'bg-gradient-to-tr from-cyan-400/25 via-teal-400/15 to-transparent blur-xl'
            }`} />

            {/* Brain Chip Image */}
            <img 
              src={heroSectionImg} 
              alt="BrixelLabs AI Neural Processor Architecture"
              loading="eager"
              decoding="async"
              className={`w-full h-auto object-contain transition-all duration-500 ${
                hudMode === 'thermal'
                  ? 'filter hue-rotate-180 contrast-125 brightness-110'
                  : ''
              }`}
            />

            {/* Interactive Neural Radar Nodes over Image */}
            {nodes.map((node, i) => {
              const isActive = i === activeNode;
              return (
                <div
                  key={node.id}
                  onClick={() => setActiveNode(i)}
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
                    {/* Ping only active node to save mobile GPU cycles */}
                    {isActive && (
                      <span className="animate-ping absolute h-3.5 w-3.5 sm:h-4 sm:w-4 rounded-full bg-cyan-400 opacity-80" />
                    )}
                    <div className={`w-2.5 h-2.5 sm:w-3 sm:h-3 rounded-full border-2 border-[#030e18] shadow-[0_0_10px_#00f0ff] ${
                      isActive ? 'bg-cyan-300 scale-110' : 'bg-teal-400/80'
                    } transition-transform`} />
                  </div>

                  {/* Node Tooltip Label */}
                  <div className={`mt-0.5 sm:mt-1 px-1.5 sm:px-2 py-0.5 rounded bg-black/85 backdrop-blur-md border border-cyan-500/40 text-[8px] sm:text-[9px] font-mono text-cyan-300 whitespace-nowrap shadow-lg transition-all duration-300 ${
                    isActive ? 'opacity-100 scale-100' : 'opacity-65 scale-95 hidden sm:block'
                  }`}>
                    <span className="font-bold text-white">{node.label}:</span> {node.val}
                  </div>
                </div>
              );
            })}
          </div>

          {/* HUD Target Crosshairs */}
          <div className="absolute inset-0 pointer-events-none flex items-center justify-center">
            <div className="w-14 h-14 sm:w-16 sm:h-16 border border-cyan-400/20 rounded-full flex items-center justify-center">
              <div className="w-1 h-1 bg-cyan-400 rounded-full shadow-[0_0_8px_#00f0ff]"></div>
            </div>
            {/* Corner Bracket Reticles */}
            <div className="absolute top-3 sm:top-4 left-3 sm:left-4 w-4 sm:w-6 h-4 sm:h-6 border-t-2 border-l-2 border-cyan-400/40"></div>
            <div className="absolute top-3 sm:top-4 right-3 sm:right-4 w-4 sm:w-6 h-4 sm:h-6 border-t-2 border-r-2 border-cyan-400/40"></div>
            <div className="absolute bottom-3 sm:bottom-4 left-3 sm:left-4 w-4 sm:w-6 h-4 sm:h-6 border-b-2 border-l-2 border-cyan-400/40"></div>
            <div className="absolute bottom-3 sm:bottom-4 right-3 sm:right-4 w-4 sm:w-6 h-4 sm:h-6 border-b-2 border-r-2 border-cyan-400/40"></div>
          </div>

          {/* Telemetry Overlay Tags (Bottom Left & Right) */}
          <div className="absolute bottom-2.5 sm:bottom-3 left-2.5 sm:left-3 bg-[#030e18]/90 backdrop-blur-md px-2.5 sm:px-3 py-1 sm:py-1.5 rounded-lg sm:rounded-xl border border-cyan-500/30 text-[9px] sm:text-[10px] font-mono text-slate-300 flex items-center gap-2 sm:gap-3 pointer-events-none z-20">
            <span className="text-cyan-400 font-bold flex items-center gap-1 sm:gap-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-ping"></span>
              {fps} FPS
            </span>
            <span>LATENCY: 13.8ms</span>
            <span className="text-teal-300 hidden sm:inline">GPU: 48°C</span>
          </div>

          <div className="absolute bottom-2.5 sm:bottom-3 right-2.5 sm:right-3 bg-[#030e18]/90 backdrop-blur-md px-2.5 sm:px-3 py-1 sm:py-1.5 rounded-lg sm:rounded-xl border border-cyan-500/30 text-[9px] sm:text-[10px] font-mono text-cyan-300 pointer-events-none z-20 hidden sm:flex items-center gap-1.5">
            <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
            <span>ACCURACY: 99.8%</span>
          </div>

        </div>

        {/* Bottom Audio Wave / Video Playback Control Ribbon */}
        <div className="px-3 sm:px-4 py-2 sm:py-2.5 bg-[#041626] border-t border-cyan-500/25 flex items-center justify-between text-xs">
          
          <div className="flex items-center gap-1.5 sm:gap-2">
            <span className="text-[10px] sm:text-[11px] font-mono text-cyan-400 font-semibold">NEURAL STREAM:</span>
            {/* Animated Audio/Frequency Spectrum */}
            <div className="flex items-center gap-1 h-3.5 sm:h-4">
              <span className="w-1 h-3.5 bg-cyan-400 rounded-full animate-wave-1"></span>
              <span className="w-1 h-3.5 bg-teal-400 rounded-full animate-wave-2"></span>
              <span className="w-1 h-3.5 bg-cyan-300 rounded-full animate-wave-3"></span>
              <span className="w-1 h-3.5 bg-teal-300 rounded-full animate-wave-4"></span>
              <span className="w-1 h-3.5 bg-cyan-400 rounded-full animate-wave-5"></span>
              <span className="w-1 h-3.5 bg-teal-400 rounded-full animate-wave-2"></span>
            </div>
          </div>

          <div className="flex items-center gap-1.5 sm:gap-2 px-2 sm:px-3 py-0.5 sm:py-1 rounded-lg bg-[#06192a]/90 border border-cyan-500/30">
            <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 shadow-[0_0_6px_#00f0ff]"></span>
            <span className="text-[9px] sm:text-[11px] font-mono font-bold text-transparent bg-clip-text bg-gradient-to-r from-cyan-300 via-teal-300 to-white tracking-wider uppercase">
              Design · Build · Automate
            </span>
          </div>

        </div>

      </motion.div>
    </div>
  );
};
