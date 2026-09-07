import React, { useState, useEffect } from 'react';
import { 
  Camera, 
  Cpu, 
  Tag, 
  AlertTriangle, 
  Database, 
  CheckCircle2, 
  Layers, 
  ArrowRight, 
  Play, 
  Pause, 
  RefreshCw,
  Eye,
  Sliders,
  Flame
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { TiltCard } from '../components/common/TiltCard';
import { AnimatedCardSlider } from '../components/common/AnimatedCardSlider';

export const FabricDefectCaseStudyPage = ({ openConsultation }) => {
  const [isPlaying, setIsPlaying] = useState(true);
  const [selectedDefect, setSelectedDefect] = useState('all');
  const [visionMode, setVisionMode] = useState('optical'); // 'optical' | 'thermal'
  const [fps, setFps] = useState(60);
  const [scanSpeed, setScanSpeed] = useState(45); // m/min

  // Telemetry fluctuations
  useEffect(() => {
    if (!isPlaying) return;
    const interval = setInterval(() => {
      setFps(Math.floor(58 + Math.random() * 4));
    }, 1200);
    return () => clearInterval(interval);
  }, [isPlaying]);

  const defectList = [
    { id: 'hole', name: 'Warp Hole', confidence: '99.1%', x: '16%', y: '22%', w: '95px', h: '85px', color: 'border-red-500 bg-red-500/20 text-red-300' },
    { id: 'stain', name: 'Oil Stain', confidence: '97.4%', x: '66%', y: '42%', w: '115px', h: '95px', color: 'border-amber-400 bg-amber-400/20 text-amber-200' },
    { id: 'yarn', name: 'Broken Filament', confidence: '95.8%', x: '42%', y: '16%', w: '85px', h: '120px', color: 'border-cyan-400 bg-cyan-400/20 text-cyan-200' },
    { id: 'crease', name: 'Weave Crease', confidence: '93.2%', x: '32%', y: '62%', w: '135px', h: '75px', color: 'border-purple-400 bg-purple-400/20 text-purple-200' },
  ];

  const visibleDefects = selectedDefect === 'all' 
    ? defectList 
    : defectList.filter(d => d.id === selectedDefect);

  const steps = [
    { num: '01', title: 'Video Feed', desc: '4K line-scan camera streams fabric weave at 60 FPS', icon: Camera, grad: 'from-cyan-400 to-teal-300' },
    { num: '02', title: 'Neural Model', desc: 'YOLOv9 + TensorRT real-time feature extraction under 14ms', icon: Cpu, grad: 'from-teal-300 to-cyan-400' },
    { num: '03', title: 'Classification', desc: 'Defect classified into hole, stain, yarn break, or warp flaw', icon: Tag, grad: 'from-cyan-300 to-indigo-400' },
    { num: '04', title: 'Real-time Alert', desc: 'Immediate PLC signal triggers audio-visual notification', icon: AlertTriangle, grad: 'from-indigo-400 to-teal-300' },
    { num: '05', title: 'Defect Logged', desc: 'Coordinates, timestamp & HD crops stored in Postgres database', icon: Database, grad: 'from-teal-300 to-blue-400' },
  ];

  const techStack = ['OpenCV', 'PyTorch', 'TensorRT', 'YOLOv9', 'FastAPI', 'PostgreSQL', 'Docker', 'Edge AI', 'NVIDIA Jetson AGX'];

  return (
    <div className="relative pt-28 sm:pt-36 pb-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto z-10">
      
      {/* Mock Browser URL Bar */}
      <div className="gradient-card rounded-2xl p-2.5 px-4 mb-8 border border-cyan-500/25 flex items-center justify-between text-xs text-slate-400 max-w-2xl mx-auto">
        <div className="flex items-center gap-2">
          <div className="flex gap-1.5">
            <div className="w-2.5 h-2.5 rounded-full bg-red-500/80"></div>
            <div className="w-2.5 h-2.5 rounded-full bg-yellow-500/80"></div>
            <div className="w-2.5 h-2.5 rounded-full bg-green-500/80"></div>
          </div>
          <span className="font-mono text-slate-300 ml-2">brixellabs.com/case-study/fabric-defect-detection</span>
        </div>
        <span className="text-cyan-400 font-semibold font-mono text-[11px]">PRODUCTION GRADE</span>
      </div>

      {/* Hero Section */}
      <div className="text-center mb-12 space-y-3">
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-gradient-to-r from-cyan-950/80 via-[#07243c]/80 to-teal-950/80 border border-cyan-500/30 text-cyan-300 text-xs font-mono uppercase tracking-wider shadow-[0_0_20px_rgba(0,240,255,0.2)]"
        >
          <Eye className="w-3.5 h-3.5 text-cyan-400" />
          <span>Case Study · Computer Vision & Edge AI</span>
        </motion.div>

        <motion.h1 
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-white tracking-tight"
        >
          Fabric Defect <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-300 via-teal-300 to-indigo-400 drop-shadow-[0_0_35px_rgba(0,240,255,0.45)]">Detection</span>
        </motion.h1>

        <motion.p 
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="text-base sm:text-lg text-slate-300 max-w-2xl mx-auto font-normal leading-relaxed"
        >
          Real-time industrial computer vision delivering automated quality control at 45 m/min.
        </motion.p>
      </div>

      {/* Main Interactive Live Inspection Panel with Gradients */}
      <div className="gradient-card rounded-3xl p-6 sm:p-8 border border-cyan-500/35 shadow-2xl mb-16 relative overflow-hidden">
        
        {/* Panel Header with Controls */}
        <div className="flex flex-wrap items-center justify-between gap-4 pb-5 border-b border-cyan-500/20 mb-6">
          <div className="flex items-center gap-3">
            <div className="w-3 h-3 rounded-full bg-red-500 animate-ping"></div>
            <span className="text-sm sm:text-base font-bold text-white tracking-wide">
              Live Industrial Camera Feed — Loom #04 [4K HDR]
            </span>
          </div>

          {/* Interactive Mode Filters */}
          <div className="flex flex-wrap items-center gap-2">
            {/* Vision Mode Toggle (Optical / Thermal) */}
            <button
              onClick={() => setVisionMode(visionMode === 'optical' ? 'thermal' : 'optical')}
              className={`px-3.5 py-1.5 rounded-xl text-xs font-mono font-bold flex items-center gap-1.5 transition-all border cursor-pointer ${
                visionMode === 'thermal'
                  ? 'bg-gradient-to-r from-amber-400 to-amber-500 text-black border-amber-300 shadow-[0_0_15px_#f59e0b]'
                  : 'bg-gradient-to-r from-cyan-950/80 to-[#07243c]/80 text-cyan-300 border-cyan-500/40 hover:text-white'
              }`}
            >
              <Flame className="w-3.5 h-3.5" />
              <span>{visionMode === 'thermal' ? 'THERMAL IR' : 'OPTICAL 4K'}</span>
            </button>

            <button
              onClick={() => setSelectedDefect('all')}
              className={`px-3.5 py-1.5 rounded-xl text-xs font-semibold transition-all cursor-pointer ${
                selectedDefect === 'all' 
                  ? 'bg-gradient-to-r from-cyan-400 to-teal-300 text-[#031525] shadow-[0_0_15px_#00f0ff] font-bold' 
                  : 'bg-[#08233b] text-slate-300 hover:text-white'
              }`}
            >
              All Flaws
            </button>
            <button
              onClick={() => setSelectedDefect('hole')}
              className={`px-3.5 py-1.5 rounded-xl text-xs font-semibold transition-all cursor-pointer ${
                selectedDefect === 'hole' 
                  ? 'bg-gradient-to-r from-red-500 to-rose-600 text-white shadow-[0_0_15px_#ef4444] font-bold' 
                  : 'bg-[#08233b] text-slate-300 hover:text-white'
              }`}
            >
              Holes
            </button>
            <button
              onClick={() => setSelectedDefect('stain')}
              className={`px-3.5 py-1.5 rounded-xl text-xs font-semibold transition-all cursor-pointer ${
                selectedDefect === 'stain' 
                  ? 'bg-gradient-to-r from-amber-400 to-orange-400 text-[#031525] shadow-[0_0_15px_#f59e0b] font-bold' 
                  : 'bg-[#08233b] text-slate-300 hover:text-white'
              }`}
            >
              Stains
            </button>
            <button
              onClick={() => setIsPlaying(!isPlaying)}
              className="p-2 rounded-xl bg-[#08233b] text-cyan-300 hover:text-white hover:bg-cyan-950 border border-cyan-500/30 transition-all cursor-pointer"
              title={isPlaying ? "Pause Feed" : "Resume Feed"}
            >
              {isPlaying ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
            </button>
          </div>
        </div>

        {/* Live Simulation Viewport & Telemetry Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch">
          
          {/* Main Camera Viewport with live bounding boxes */}
          <div className={`lg:col-span-8 relative min-h-[360px] sm:min-h-[440px] rounded-2xl overflow-hidden border border-cyan-500/40 flex items-center justify-center group shadow-inner transition-colors duration-500 ${
            visionMode === 'thermal' ? 'bg-[#180512]' : 'bg-[#061a2d]'
          }`}>
            
            {/* Textile texture simulation */}
            <div 
              className={`absolute inset-0 [background-size:10px_10px] ${
                visionMode === 'thermal'
                  ? 'bg-[radial-gradient(#c026d3_2px,transparent_2px)] opacity-50'
                  : 'bg-[radial-gradient(#155e75_1.5px,transparent_1.5px)] opacity-70'
              } ${isPlaying ? 'animate-pulse-slow' : ''}`}
            ></div>

            {/* Subtle moving scan line */}
            {isPlaying && (
              <div className={`absolute top-0 bottom-0 w-1 opacity-80 animate-scan pointer-events-none ${
                visionMode === 'thermal'
                  ? 'bg-gradient-to-b from-transparent via-amber-400 to-transparent shadow-[0_0_15px_#f59e0b]'
                  : 'bg-gradient-to-b from-transparent via-cyan-400 to-transparent shadow-[0_0_15px_#00f0ff]'
              }`}></div>
            )}

            {/* Render Bounding Boxes */}
            {visibleDefects.map((defect) => (
              <motion.div
                key={defect.id}
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                className={`absolute border-2 rounded p-1 font-mono transition-all duration-300 shadow-[0_0_15px_rgba(0,240,255,0.25)] ${defect.color}`}
                style={{
                  top: defect.y,
                  left: defect.x,
                  width: defect.w,
                  height: defect.h,
                }}
              >
                <div className="text-[10px] font-bold tracking-tight bg-black/80 px-1 py-0.5 rounded -mt-5 -ml-1 inline-block border border-current">
                  {defect.name} [{defect.confidence}]
                </div>
              </motion.div>
            ))}

            {/* Live Camera Watermark */}
            <div className="absolute bottom-3 left-3 bg-[#030e17]/85 backdrop-blur-md px-3 py-1.5 rounded-lg border border-cyan-500/30 text-xs font-mono text-slate-300 flex items-center gap-3">
              <span className="flex items-center gap-1.5 text-cyan-400 font-bold">
                <span className="w-2 h-2 rounded-full bg-cyan-400 animate-ping"></span>
                CAM-01 · {visionMode.toUpperCase()}
              </span>
              <span>{fps} FPS</span>
              <span className="text-teal-300">Latency: 13.8ms</span>
            </div>
          </div>

          {/* Right: Telemetry & Metrics Cards with Gradients */}
          <div className="lg:col-span-4 flex flex-col justify-between gap-4">
            
            {/* Telemetry 1: Real-time Vision */}
            <div className="gradient-card rounded-2xl p-5 border border-cyan-500/25 space-y-2.5">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold uppercase tracking-wider text-transparent bg-clip-text bg-gradient-to-r from-cyan-300 to-teal-300">
                  Real-time Vision
                </span>
                <span className="text-xs text-emerald-400 font-mono font-bold bg-emerald-950/80 px-2 py-0.5 rounded border border-emerald-500/30">99.8% ACC</span>
              </div>
              <div className="space-y-1.5 text-xs text-slate-300">
                <div className="flex justify-between">
                  <span className="text-slate-400">Line Speed:</span>
                  <span className="font-mono text-white font-bold">{scanSpeed} m / min</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-400">Inference Engine:</span>
                  <span className="font-mono text-cyan-300 font-bold">TensorRT v10</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-400">Edge Device:</span>
                  <span className="font-mono text-white">NVIDIA Jetson AGX</span>
                </div>
              </div>
            </div>

            {/* Telemetry 2: AI Models */}
            <div className="gradient-card rounded-2xl p-5 border border-cyan-500/25 space-y-2.5">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold uppercase tracking-wider text-transparent bg-clip-text bg-gradient-to-r from-teal-300 to-indigo-300">
                  AI Architecture
                </span>
                <span className="text-xs text-cyan-300 font-mono">YOLOv9 Custom</span>
              </div>
              <p className="text-xs text-slate-300 leading-relaxed">
                Segmenting fabric micro-scans across 16 defect classes with continuous edge active-learning feedback.
              </p>
            </div>

            {/* Telemetry 3: Actions */}
            <div className="gradient-card rounded-2xl p-5 border border-cyan-500/25 space-y-2">
              <span className="text-xs font-bold uppercase tracking-wider text-transparent bg-clip-text bg-gradient-to-r from-cyan-300 to-white">
                Automated Actions
              </span>
              <div className="flex items-center gap-2 text-xs text-emerald-300">
                <CheckCircle2 className="w-4 h-4 flex-shrink-0" />
                <span>PLC Auto-Reject Trigger Connected</span>
              </div>
              <div className="flex items-center gap-2 text-xs text-emerald-300">
                <CheckCircle2 className="w-4 h-4 flex-shrink-0" />
                <span>Cloud Telemetry Sync Operational</span>
              </div>
            </div>

          </div>

        </div>

      </div>

      {/* The Problem & Our Solution Columns */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-20">
        
        {/* The Problem */}
        <div className="gradient-card rounded-3xl p-8 border border-cyan-500/25 space-y-4">
          <h2 className="text-2xl font-bold text-white tracking-tight flex items-center gap-2.5">
            <span className="w-2.5 h-2.5 rounded-full bg-red-400 shadow-[0_0_10px_#f87171]"></span>
            The Problem
          </h2>
          <p className="text-sm sm:text-base text-slate-300 leading-relaxed">
            Traditional human textile quality inspection is slow, subjective, and creates massive scrap waste. Manual inspectors suffer from eye fatigue within 20 minutes, missing micro-flaws that result in expensive recalls and damaged client trust.
          </p>
        </div>

        {/* Our Solution */}
        <div className="gradient-card rounded-3xl p-8 border border-cyan-500/25 space-y-4">
          <h2 className="text-2xl font-bold text-white tracking-tight flex items-center gap-2.5">
            <span className="w-2.5 h-2.5 rounded-full bg-cyan-400 shadow-[0_0_10px_#00f0ff]"></span>
            Our Solution
          </h2>
          <p className="text-sm sm:text-base text-slate-300 leading-relaxed">
            Our automated computer vision system combines 4K line-scan cameras with an edge-accelerated neural network. It continuously scans fabric at line speeds up to 45 meters/minute, identifying flaws in under 14ms and triggering automatic trimming.
          </p>
        </div>

      </div>

      {/* How It Works (5-Step Pipeline: All Cards Slide In and Stay on Screen) */}
      <div className="mb-20">
        <h2 className="text-2xl sm:text-3xl font-bold text-white tracking-tight mb-10 text-center">
          How It <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-300 via-teal-300 to-indigo-400">Works</span>
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
          {steps.map((step, index) => {
            const StepIcon = step.icon;
            return (
              <motion.div
                key={step.num}
                initial={{ opacity: 0, x: 40, scale: 0.92 }}
                whileInView={{ opacity: 1, x: 0, scale: 1 }}
                viewport={{ once: true }}
                transition={{
                  type: "spring",
                  stiffness: 260,
                  damping: 24,
                  delay: index * 0.1
                }}
                className="h-full"
              >
                <TiltCard className="h-full">
                  <div className="gradient-card rounded-2xl p-5 border border-cyan-500/25 flex flex-col justify-between group hover:border-cyan-400/80 transition-all text-center h-full shadow-[0_10px_20px_rgba(0,0,0,0.5)]">
                    <div>
                      <div className={`text-3xl font-black text-transparent bg-clip-text bg-gradient-to-b ${step.grad} font-mono mb-3`}>
                        {step.num}
                      </div>
                      <div className="w-12 h-12 mx-auto rounded-xl bg-gradient-to-br from-[#092b45] to-[#041525] border border-cyan-500/35 flex items-center justify-center text-cyan-400 group-hover:text-cyan-300 mb-3 shadow-[0_0_15px_rgba(0,240,255,0.25)]">
                        <StepIcon className="w-6 h-6" />
                      </div>
                      <h3 className="text-sm font-bold text-white mb-2">
                        {step.title}
                      </h3>
                    </div>
                    <p className="text-xs text-slate-400 leading-relaxed">
                      {step.desc}
                    </p>
                  </div>
                </TiltCard>
              </motion.div>
            );
          })}
        </div>
      </div>

      {/* Tech Stack */}
      <div className="gradient-card rounded-3xl p-8 border border-cyan-500/25 mb-16 text-center space-y-6">
        <h2 className="text-xl font-bold text-white tracking-tight">
          Tech Stack
        </h2>
        <div className="flex flex-wrap items-center justify-center gap-3">
          {techStack.map((tech) => (
            <span
              key={tech}
              className="px-5 py-2 rounded-xl bg-gradient-to-r from-cyan-950/80 to-[#07243c]/80 border border-cyan-500/30 text-slate-200 text-sm font-semibold hover:border-cyan-400 hover:text-cyan-300 transition-colors shadow-sm font-mono"
            >
              {tech}
            </span>
          ))}
        </div>
      </div>

      {/* CTA Bottom Banner */}
      <div className="gradient-card rounded-3xl p-8 sm:p-10 border border-cyan-500/35 text-center space-y-5 shadow-2xl relative overflow-hidden">
        <div className="absolute top-0 right-0 w-80 h-80 bg-gradient-to-bl from-cyan-500/15 via-teal-500/10 to-transparent blur-3xl pointer-events-none"></div>

        <div className="relative z-10 space-y-2">
          <h3 className="text-2xl sm:text-3xl font-bold text-white">
            Have a similar quality control problem? Let's talk
          </h3>
          <p className="text-sm text-slate-300 max-w-md mx-auto">
            Schedule a technical call with our Computer Vision engineers to evaluate your factory production line.
          </p>
        </div>

        <button
          onClick={openConsultation}
          className="relative z-10 px-8 py-3.5 rounded-xl bg-gradient-to-r from-cyan-400 via-teal-300 to-cyan-400 hover:from-cyan-300 hover:to-teal-200 text-[#031525] font-extrabold text-sm transition-all duration-300 shadow-[0_0_25px_rgba(0,240,255,0.6)] hover:shadow-[0_0_40px_rgba(0,240,255,0.9)] hover:scale-105 active:scale-95 cursor-pointer"
        >
          Schedule a Free Discovery Call
        </button>
      </div>

    </div>
  );
};
