import React, { useState, useEffect } from 'react';
import { 
  X, 
  Play, 
  Pause, 
  Volume2, 
  VolumeX, 
  Maximize, 
  Minimize, 
  RefreshCw, 
  Bot, 
  Cpu, 
  Layers, 
  ShieldCheck, 
  Camera, 
  Sliders, 
  Activity, 
  Radio
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export const VideoShowreelModal = ({ isOpen, onClose, defaultChannel = 0 }) => {
  const [activeChannel, setActiveChannel] = useState(defaultChannel);
  const [isPlaying, setIsPlaying] = useState(true);
  const [isMuted, setIsMuted] = useState(true);
  const [progress, setProgress] = useState(35);
  const [scanSpeed, setScanSpeed] = useState('1.0x');
  const [showHUD, setShowHUD] = useState(true);
  const [simulatedTime, setSimulatedTime] = useState('00:14 / 01:20');

  useEffect(() => {
    if (isOpen) {
      setActiveChannel(defaultChannel);
      setIsPlaying(true);
    }
  }, [isOpen, defaultChannel]);

  // Telemetry ticker
  useEffect(() => {
    if (!isOpen || !isPlaying) return;
    const interval = setInterval(() => {
      setProgress((prev) => (prev >= 100 ? 0 : prev + 0.8));
    }, 200);
    return () => clearInterval(interval);
  }, [isOpen, isPlaying]);

  if (!isOpen) return null;

  const channels = [
    {
      id: 'vision-ai',
      title: '01. Computer Vision & Edge AI',
      badge: '4K · 60 FPS INFERENCE',
      description: 'Ultra-low latency industrial fabric inspection model isolating micro-holes and warp defects under 14ms.',
      metrics: { fps: '60 FPS', latency: '13.8ms', accuracy: '99.8%', engine: 'TensorRT v10' },
    },
    {
      id: 'agentic-ai',
      title: '02. Autonomous Multi-Agent Orchestration',
      badge: 'MULTI-AGENT LLM',
      description: 'Self-healing workflow agents communicating across microservices, generating real-time summaries and database actions.',
      metrics: { agents: '8 Active', throughput: '4.2k req/s', latency: '42ms', uptime: '99.99%' },
    },
    {
      id: 'frontdesk-ai',
      title: '03. Conversational AI & WhatsApp Bot',
      badge: 'NATURAL LANGUAGE ENGINE',
      description: 'Zero-latency multilingual booking agent syncing calendars, processing client queries, and dispatching reminders.',
      metrics: { response: '<0.8s', resolution: '94.6%', bookings: '1,280/mo', csat: '4.9/5' },
    },
    {
      id: 'cloud-analytics',
      title: '04. Enterprise Cloud Telemetry',
      badge: 'REAL-TIME DATA STREAM',
      description: 'High-throughput stream processing clustering sensor telemetry and rendering executive predictive insights.',
      metrics: { streams: '12 Pipelines', nodes: '64 Clusters', sync: 'Instant', security: 'SOC2 Ready' },
    },
  ];

  const curr = channels[activeChannel];

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 overflow-y-auto bg-black/85 backdrop-blur-xl">
        
        {/* Backdrop click to close */}
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="absolute inset-0"
        />

        {/* Modal Container */}
        <motion.div
          initial={{ opacity: 0, scale: 0.92, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.92, y: 20 }}
          transition={{ type: 'spring', damping: 25, stiffness: 300 }}
          className="relative w-full max-w-5xl rounded-3xl bg-[#030e18] border border-cyan-500/40 shadow-[0_0_80px_rgba(0,240,255,0.25)] overflow-hidden flex flex-col z-10"
        >
          {/* Top Bar / Header */}
          <div className="flex items-center justify-between px-5 py-3.5 bg-[#051829] border-b border-cyan-500/30">
            <div className="flex items-center gap-3">
              <div className="flex items-center gap-2 px-2.5 py-1 rounded-full bg-cyan-950/80 border border-cyan-500/40 text-cyan-300 text-xs font-mono">
                <span className="w-2 h-2 rounded-full bg-cyan-400 animate-ping"></span>
                <span>BRIXEL AI SHOWREEL</span>
              </div>
              <span className="hidden sm:inline text-xs font-medium text-slate-400">
                Live Interactive System Showcase
              </span>
            </div>

            <div className="flex items-center gap-3">
              <button
                onClick={() => setShowHUD(!showHUD)}
                className={`px-3 py-1 rounded-lg text-xs font-mono transition-colors border ${
                  showHUD 
                    ? 'bg-cyan-500/20 text-cyan-300 border-cyan-400/50' 
                    : 'bg-transparent text-slate-400 border-slate-700 hover:text-white'
                }`}
              >
                HUD: {showHUD ? 'ON' : 'OFF'}
              </button>

              <button
                onClick={onClose}
                className="p-1.5 rounded-xl bg-[#082238] text-slate-300 hover:text-white hover:bg-cyan-950 border border-cyan-500/30 transition-all cursor-pointer"
                aria-label="Close modal"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
          </div>

          {/* Main Video Animation Canvas / Screen */}
          <div className="relative aspect-video w-full bg-[#020b12] overflow-hidden flex items-center justify-center select-none group">
            
            {/* Background High-Tech Grid & Scanline */}
            <div className="absolute inset-0 circuit-bg opacity-40"></div>
            
            {/* Laser Scan Sweep */}
            {isPlaying && (
              <div className="absolute top-0 bottom-0 w-[2px] bg-gradient-to-b from-transparent via-cyan-400 to-transparent shadow-[0_0_20px_#00f0ff] animate-scan pointer-events-none z-20"></div>
            )}

            {/* CHANNEL CONTENT SIMULATION */}
            {activeChannel === 0 && (
              /* Vision AI Inspection View */
              <div className="absolute inset-0 flex flex-col justify-between p-6">
                {/* Textile weave texture */}
                <div className="absolute inset-0 bg-[radial-gradient(#0e4663_1.5px,transparent_1.5px)] [background-size:12px_12px] opacity-60"></div>
                
                {/* Bounding Box 1 */}
                <motion.div 
                  animate={{ scale: [1, 1.02, 1], y: [0, -4, 0] }}
                  transition={{ duration: 3, repeat: Infinity }}
                  className="absolute top-1/4 left-1/4 w-36 h-28 border-2 border-red-500 bg-red-500/15 rounded-lg p-2 font-mono shadow-[0_0_25px_rgba(239,68,68,0.4)]"
                >
                  <div className="text-[10px] font-bold text-red-300 bg-black/80 px-1.5 py-0.5 rounded inline-block border border-red-500/50">
                    Defect: Warp Hole [99.2%]
                  </div>
                  <div className="text-[9px] text-red-200 mt-1">
                    x: 420px | y: 210px
                  </div>
                </motion.div>

                {/* Bounding Box 2 */}
                <motion.div 
                  animate={{ scale: [1, 1.03, 1], x: [0, 4, 0] }}
                  transition={{ duration: 4, repeat: Infinity, delay: 0.5 }}
                  className="absolute bottom-1/3 right-1/4 w-44 h-32 border-2 border-amber-400 bg-amber-400/15 rounded-lg p-2 font-mono shadow-[0_0_25px_rgba(245,158,11,0.4)]"
                >
                  <div className="text-[10px] font-bold text-amber-300 bg-black/80 px-1.5 py-0.5 rounded inline-block border border-amber-400/50">
                    Defect: Oil Stain [97.5%]
                  </div>
                  <div className="text-[9px] text-amber-200 mt-1">
                    Auto-trim marker sent to PLC
                  </div>
                </motion.div>

                {/* Crosshairs */}
                <div className="absolute inset-0 pointer-events-none flex items-center justify-center">
                  <div className="w-24 h-24 border border-cyan-400/30 rounded-full flex items-center justify-center">
                    <div className="w-2 h-2 bg-cyan-400 rounded-full shadow-[0_0_10px_#00f0ff] animate-ping"></div>
                  </div>
                </div>
              </div>
            )}

            {activeChannel === 1 && (
              /* Agentic Multi-Agent Workflow View */
              <div className="absolute inset-0 flex items-center justify-center p-6">
                <div className="grid grid-cols-3 gap-6 sm:gap-12 w-full max-w-2xl relative">
                  
                  {/* Connecting Neon Flow Line */}
                  <div className="absolute top-1/2 left-10 right-10 h-[2px] bg-gradient-to-r from-cyan-400 via-teal-300 to-cyan-500 -translate-y-1/2 opacity-70 z-0"></div>

                  {/* Agent 1 */}
                  <div className="relative z-10 glass-panel rounded-2xl p-4 border border-cyan-500/40 text-center bg-[#062035]/90 space-y-2 shadow-[0_0_20px_rgba(0,240,255,0.3)]">
                    <div className="w-12 h-12 mx-auto rounded-xl bg-cyan-950 border border-cyan-400 flex items-center justify-center text-cyan-300">
                      <Cpu className="w-6 h-6 animate-pulse" />
                    </div>
                    <div className="text-xs font-bold text-white">Ingestion Agent</div>
                    <div className="text-[10px] text-cyan-300 font-mono">1.2k docs/s</div>
                  </div>

                  {/* Agent 2 */}
                  <div className="relative z-10 glass-panel rounded-2xl p-4 border border-teal-500/40 text-center bg-[#072a3e]/90 space-y-2 shadow-[0_0_25px_rgba(0,229,208,0.4)]">
                    <div className="w-12 h-12 mx-auto rounded-xl bg-teal-950 border border-teal-400 flex items-center justify-center text-teal-300">
                      <Bot className="w-6 h-6" />
                    </div>
                    <div className="text-xs font-bold text-white">Reasoning LLM</div>
                    <div className="text-[10px] text-teal-300 font-mono">Semantic Parse</div>
                  </div>

                  {/* Agent 3 */}
                  <div className="relative z-10 glass-panel rounded-2xl p-4 border border-cyan-500/40 text-center bg-[#062035]/90 space-y-2 shadow-[0_0_20px_rgba(0,240,255,0.3)]">
                    <div className="w-12 h-12 mx-auto rounded-xl bg-cyan-950 border border-cyan-400 flex items-center justify-center text-cyan-300">
                      <ShieldCheck className="w-6 h-6 animate-bounce" />
                    </div>
                    <div className="text-xs font-bold text-white">Action Dispatcher</div>
                    <div className="text-[10px] text-emerald-400 font-mono">Verified 100%</div>
                  </div>

                </div>
              </div>
            )}

            {activeChannel === 2 && (
              /* Conversational AI & WhatsApp Bot */
              <div className="absolute inset-0 flex items-center justify-center p-4 sm:p-6">
                <div className="w-full max-w-md glass-panel rounded-2xl p-4 border border-teal-500/30 bg-[#041a22]/90 space-y-3 shadow-2xl">
                  <div className="flex items-center justify-between pb-2 border-b border-teal-500/20 text-xs">
                    <span className="font-bold text-white flex items-center gap-2">
                      <span className="w-2.5 h-2.5 rounded-full bg-emerald-400"></span>
                      FrontDesk AI WhatsApp Node
                    </span>
                    <span className="text-teal-300 font-mono text-[10px]">Synced Live</span>
                  </div>

                  <div className="space-y-2 text-xs">
                    <div className="bg-[#0b333a] p-2.5 rounded-xl rounded-tl-none text-slate-200">
                      Hi, do you have availability for a consultation this Thursday?
                    </div>
                    <div className="bg-[#0a4742] p-2.5 rounded-xl rounded-tr-none text-teal-100 ml-auto border border-teal-400/40 flex items-center gap-2">
                      <span>✓ Yes! We have 2:00 PM and 4:30 PM open. Booked for 2:00 PM?</span>
                    </div>
                  </div>

                  {/* Audio Waveform simulation */}
                  <div className="flex items-center justify-between pt-2 px-2 border-t border-teal-500/20">
                    <span className="text-[10px] text-teal-300 font-mono">Voice Synthesizer:</span>
                    <div className="flex items-center gap-1 h-5">
                      <span className="w-1 bg-teal-400 rounded-full animate-wave-1"></span>
                      <span className="w-1 bg-cyan-400 rounded-full animate-wave-2"></span>
                      <span className="w-1 bg-teal-300 rounded-full animate-wave-3"></span>
                      <span className="w-1 bg-cyan-300 rounded-full animate-wave-4"></span>
                      <span className="w-1 bg-teal-400 rounded-full animate-wave-5"></span>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {activeChannel === 3 && (
              /* Enterprise Cloud Telemetry View */
              <div className="absolute inset-0 flex flex-col justify-between p-6">
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                  {['Throughput: 840k req/m', 'Latency: 11.4ms', 'Active Nodes: 64', 'Health: 100% OK'].map((stat, i) => (
                    <div key={i} className="glass-panel p-2.5 rounded-xl border border-cyan-500/20 text-center font-mono text-xs text-cyan-300 bg-[#061e31]/80">
                      {stat}
                    </div>
                  ))}
                </div>

                {/* Animated Chart SVG Wave */}
                <div className="h-32 w-full flex items-end">
                  <svg className="w-full h-full" viewBox="0 0 600 120" preserveAspectRatio="none">
                    <path
                      d="M 0 80 Q 75 20, 150 70 T 300 40 T 450 60 T 600 20 L 600 120 L 0 120 Z"
                      fill="url(#cyanGradient)"
                      opacity="0.3"
                    />
                    <path
                      d="M 0 80 Q 75 20, 150 70 T 300 40 T 450 60 T 600 20"
                      stroke="#00f0ff"
                      strokeWidth="3"
                      fill="none"
                      className="drop-shadow-[0_0_10px_#00f0ff]"
                    />
                    <defs>
                      <linearGradient id="cyanGradient" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="0%" stopColor="#00f0ff" stopOpacity="0.8" />
                        <stop offset="100%" stopColor="#00f0ff" stopOpacity="0" />
                      </linearGradient>
                    </defs>
                  </svg>
                </div>
              </div>
            )}

            {/* HUD Overlay Details */}
            {showHUD && (
              <>
                <div className="absolute top-4 left-4 bg-black/75 backdrop-blur-md px-3 py-1.5 rounded-lg border border-cyan-500/30 font-mono text-[11px] text-slate-300 flex items-center gap-3 pointer-events-none">
                  <span className="text-cyan-400 font-bold flex items-center gap-1.5">
                    <span className="w-2 h-2 rounded-full bg-cyan-400 animate-ping"></span>
                    {curr.badge}
                  </span>
                  <span>FEED #{activeChannel + 1}</span>
                  <span className="text-teal-300">FPS: 60</span>
                </div>

                <div className="absolute top-4 right-4 bg-black/75 backdrop-blur-md px-3 py-1.5 rounded-lg border border-cyan-500/30 font-mono text-[11px] text-cyan-300 pointer-events-none">
                  LIVE STREAM · 256-BIT ENCRYPTED
                </div>
              </>
            )}

            {/* Play/Pause Central Overlay Trigger */}
            <button
              onClick={() => setIsPlaying(!isPlaying)}
              className="absolute inset-0 flex items-center justify-center bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity cursor-pointer z-30"
              aria-label={isPlaying ? "Pause Video" : "Play Video"}
            >
              <div className="w-16 h-16 rounded-full bg-cyan-400/90 text-[#031422] flex items-center justify-center shadow-[0_0_30px_#00f0ff] hover:scale-110 transition-transform">
                {isPlaying ? <Pause className="w-8 h-8" /> : <Play className="w-8 h-8 ml-1" />}
              </div>
            </button>

          </div>

          {/* Video Timeline & Controls Bar */}
          <div className="p-4 sm:p-5 bg-[#041627] border-t border-cyan-500/25 space-y-4">
            
            {/* Timeline Scrubber */}
            <div className="flex items-center gap-3">
              <span className="text-xs font-mono text-cyan-400 min-w-[45px]">00:{Math.floor(progress).toString().padStart(2, '0')}</span>
              <div 
                className="flex-1 h-2 bg-[#082238] rounded-full overflow-hidden cursor-pointer relative"
                onClick={(e) => {
                  const rect = e.currentTarget.getBoundingClientRect();
                  const clickX = e.clientX - rect.left;
                  setProgress((clickX / rect.width) * 100);
                }}
              >
                <div 
                  className="h-full bg-gradient-to-r from-cyan-400 via-teal-300 to-cyan-300 rounded-full transition-all duration-150 relative shadow-[0_0_10px_#00f0ff]"
                  style={{ width: `${progress}%` }}
                ></div>
              </div>
              <span className="text-xs font-mono text-slate-400 min-w-[45px]">01:20</span>
            </div>

            {/* Channel Switcher Tabs */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
              {channels.map((chan, idx) => (
                <button
                  key={chan.id}
                  onClick={() => {
                    setActiveChannel(idx);
                    setProgress(0);
                  }}
                  className={`p-2.5 rounded-xl text-left text-xs transition-all border ${
                    activeChannel === idx
                      ? 'bg-cyan-950/80 border-cyan-400 text-white shadow-[0_0_15px_rgba(0,240,255,0.3)]'
                      : 'bg-[#072036]/50 border-cyan-500/20 text-slate-400 hover:text-slate-200 hover:border-cyan-500/40'
                  }`}
                >
                  <div className="font-bold truncate">{chan.title}</div>
                  <div className="text-[10px] text-cyan-400/80 truncate font-mono mt-0.5">{chan.badge}</div>
                </button>
              ))}
            </div>

            {/* Active Channel Details & Metrics */}
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pt-2 border-t border-cyan-500/15">
              <div>
                <h4 className="text-sm font-bold text-white">{curr.title}</h4>
                <p className="text-xs text-slate-300 mt-0.5 max-w-xl">{curr.description}</p>
              </div>

              {/* Dynamic Telemetry Tags */}
              <div className="flex flex-wrap gap-2">
                {Object.entries(curr.metrics).map(([k, v]) => (
                  <span key={k} className="px-2.5 py-1 rounded-lg bg-[#08233b] border border-cyan-500/30 text-[11px] font-mono text-cyan-300">
                    {k.toUpperCase()}: <span className="text-white font-bold">{v}</span>
                  </span>
                ))}
              </div>
            </div>

          </div>

        </motion.div>
      </div>
    </AnimatePresence>
  );
};
