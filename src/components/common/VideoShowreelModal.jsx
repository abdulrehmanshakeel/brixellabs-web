import React, { useState, useEffect, useRef } from 'react';
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
  const [progress, setProgress] = useState(0);
  const [showHUD, setShowHUD] = useState(true);
  const [currentTime, setCurrentTime] = useState('00:00');
  const [duration, setDuration] = useState('00:00');
  const videoRef = useRef(null);
  const modalContainerRef = useRef(null);

  const channels = [
    {
      id: 'vision-ai',
      title: '01. ThreadEye — Fabric Defect Detection',
      badge: '4K · 60 FPS INFERENCE',
      videoSrc: '/assets/videos/threadeye-demo.mp4',
      description: 'Ultra-low latency industrial fabric inspection model isolating micro-holes and warp defects under 14ms.',
      metrics: { fps: '60 FPS', latency: '13.8ms', accuracy: '99.8%', engine: 'YOLOv8 + TensorRT' },
    },
    {
      id: 'agentic-ai',
      title: '02. Noesis — Multi-Agent Study Assistant',
      badge: 'LANGGRAPH MULTI-AGENT',
      videoSrc: '/assets/videos/noesis-demo.mp4',
      description: 'Self-healing workflow agents synthesizing study notes, conducting dual-engine web research, and verifying comprehension.',
      metrics: { agents: '4 Core Nodes', engine: 'LLaMA 3.3 70B', latency: '38ms', HITL: 'Active' },
    },
    {
      id: 'watcher-ai',
      title: '03. The Watcher — Child Protection & Monitoring',
      badge: 'MOBILE ML + AGENTS',
      videoSrc: '/assets/videos/watcher-demo.mp4',
      description: 'Real-time Flutter & Kotlin companion app classifying mobile activity with contextual reasoning.',
      metrics: { response: '<0.4s', platform: 'Flutter/Kotlin', engine: 'LangGraph', accuracy: '98.5%' },
    },
    {
      id: 'getscry-analytics',
      title: '04. GetScry — Real-Time Shopper Analytics',
      badge: 'REAL-TIME DATA STREAM',
      videoSrc: '/assets/videos/getscry-demo.mp4',
      description: 'High-throughput stream processing clustering sensor telemetry and rendering executive predictive insights.',
      metrics: { throughput: '840k req/m', latency: '11.4ms', accuracy: '99.2%', sync: 'Instant' },
    },
  ];

  useEffect(() => {
    if (isOpen) {
      setActiveChannel(defaultChannel);
      setIsPlaying(true);
    }
  }, [isOpen, defaultChannel]);

  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.currentTime = 0;
      videoRef.current.play().then(() => setIsPlaying(true)).catch(() => setIsPlaying(false));
    }
  }, [activeChannel]);

  const formatTime = (timeInSeconds) => {
    if (isNaN(timeInSeconds)) return '00:00';
    const mins = Math.floor(timeInSeconds / 60);
    const secs = Math.floor(timeInSeconds % 60);
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const handleTimeUpdate = () => {
    if (!videoRef.current) return;
    const curr = videoRef.current.currentTime;
    const dur = videoRef.current.duration;
    if (dur > 0) {
      setProgress((curr / dur) * 100);
      setCurrentTime(formatTime(curr));
    }
  };

  const handleLoadedMetadata = () => {
    if (!videoRef.current) return;
    setDuration(formatTime(videoRef.current.duration));
    if (isPlaying) {
      videoRef.current.play().catch(() => {});
    }
  };

  const togglePlay = () => {
    if (!videoRef.current) return;
    if (videoRef.current.paused) {
      videoRef.current.play().then(() => setIsPlaying(true)).catch(() => {});
    } else {
      videoRef.current.pause();
      setIsPlaying(false);
    }
  };

  const toggleMute = () => {
    if (!videoRef.current) return;
    videoRef.current.muted = !videoRef.current.muted;
    setIsMuted(videoRef.current.muted);
  };

  const handleSeek = (e) => {
    if (!videoRef.current) return;
    const rect = e.currentTarget.getBoundingClientRect();
    const clickX = e.clientX - rect.left;
    const newProgress = Math.max(0, Math.min(1, clickX / rect.width));
    videoRef.current.currentTime = newProgress * videoRef.current.duration;
    setProgress(newProgress * 100);
  };

  if (!isOpen) return null;
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
          ref={modalContainerRef}
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
                Live Production Video Demonstration
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

          {/* Main Video Screen */}
          <div className="relative aspect-video w-full bg-[#01080f] overflow-hidden flex items-center justify-center select-none group">
            
            {/* Real MP4 Video Player */}
            <video
              ref={videoRef}
              key={curr.videoSrc}
              src={curr.videoSrc}
              autoPlay
              loop
              muted={isMuted}
              playsInline
              preload="metadata"
              onTimeUpdate={handleTimeUpdate}
              onLoadedMetadata={handleLoadedMetadata}
              className="w-full h-full object-contain"
            />

            {/* Laser Scan Sweep */}
            {isPlaying && (
              <div className="absolute top-0 bottom-0 w-[2px] bg-gradient-to-b from-transparent via-cyan-400 to-transparent shadow-[0_0_20px_#00f0ff] animate-scan pointer-events-none z-20 opacity-60"></div>
            )}

            {/* HUD Overlay Details */}
            {showHUD && (
              <>
                <div className="absolute top-4 left-4 bg-black/75 backdrop-blur-md px-3 py-1.5 rounded-lg border border-cyan-500/30 font-mono text-[11px] text-slate-300 flex items-center gap-3 pointer-events-none z-20">
                  <span className="text-cyan-400 font-bold flex items-center gap-1.5">
                    <span className="w-2 h-2 rounded-full bg-cyan-400 animate-ping"></span>
                    {curr.badge}
                  </span>
                  <span>FEED #{activeChannel + 1}</span>
                  <span className="text-teal-300">FPS: 60</span>
                </div>

                <div className="absolute top-4 right-4 bg-black/75 backdrop-blur-md px-3 py-1.5 rounded-lg border border-cyan-500/30 font-mono text-[11px] text-cyan-300 pointer-events-none z-20">
                  1080p HD · STREAMING
                </div>
              </>
            )}

            {/* Play/Pause Central Overlay Trigger */}
            <button
              onClick={togglePlay}
              className={`absolute inset-0 flex items-center justify-center bg-black/25 transition-opacity cursor-pointer z-30 ${
                isPlaying ? 'opacity-0 group-hover:opacity-100' : 'opacity-100'
              }`}
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
              <span className="text-xs font-mono text-cyan-400 min-w-[45px]">{currentTime}</span>
              <div 
                className="flex-1 h-2 bg-[#082238] rounded-full overflow-hidden cursor-pointer relative"
                onClick={handleSeek}
              >
                <div 
                  className="h-full bg-gradient-to-r from-cyan-400 via-teal-300 to-cyan-300 rounded-full transition-all duration-100 relative shadow-[0_0_10px_#00f0ff]"
                  style={{ width: `${progress}%` }}
                ></div>
              </div>
              <span className="text-xs font-mono text-slate-400 min-w-[45px]">{duration}</span>
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
                  className={`p-2.5 rounded-xl text-left text-xs transition-all border cursor-pointer ${
                    activeChannel === idx
                      ? 'bg-cyan-950/90 border-cyan-400 text-white shadow-[0_0_15px_rgba(0,240,255,0.3)]'
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
              <div className="flex items-center gap-3">
                <button
                  onClick={togglePlay}
                  className="p-2 rounded-xl bg-[#082238] hover:bg-cyan-950 text-cyan-300 border border-cyan-500/30 transition-colors cursor-pointer"
                  title={isPlaying ? "Pause" : "Play"}
                >
                  {isPlaying ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
                </button>

                <button
                  onClick={toggleMute}
                  className="p-2 rounded-xl bg-[#082238] hover:bg-cyan-950 text-cyan-300 border border-cyan-500/30 transition-colors cursor-pointer"
                  title={isMuted ? "Unmute" : "Mute"}
                >
                  {isMuted ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4" />}
                </button>

                <div>
                  <h4 className="text-sm font-bold text-white">{curr.title}</h4>
                  <p className="text-xs text-slate-300 mt-0.5 max-w-xl">{curr.description}</p>
                </div>
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
