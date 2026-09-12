import React, { useState, useRef, useEffect } from 'react';
import { Play, Pause, Volume2, VolumeX, Maximize, Minimize, RefreshCw, AlertCircle } from 'lucide-react';

export const VideoPlayer = ({
  src,
  poster,
  title = "System Telemetry Stream",
  badge = "LIVE DEMO",
  autoPlay = true,
  loop = true,
  muted = true,
  showControls = true,
  className = ""
}) => {
  const videoRef = useRef(null);
  const containerRef = useRef(null);
  const [isPlaying, setIsPlaying] = useState(autoPlay);
  const [isMuted, setIsMuted] = useState(muted);
  const [progress, setProgress] = useState(0);
  const [currentTime, setCurrentTime] = useState('00:00');
  const [duration, setDuration] = useState('00:00');
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [hasError, setHasError] = useState(false);
  const [isBuffering, setIsBuffering] = useState(false);

  const formatTime = (timeInSeconds) => {
    if (isNaN(timeInSeconds)) return '00:00';
    const mins = Math.floor(timeInSeconds / 60);
    const secs = Math.floor(timeInSeconds % 60);
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const togglePlay = () => {
    if (!videoRef.current) return;
    if (videoRef.current.paused) {
      videoRef.current.play().then(() => {
        setIsPlaying(true);
      }).catch(() => {
        setIsPlaying(false);
      });
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
    if (autoPlay) {
      videoRef.current.play().then(() => setIsPlaying(true)).catch(() => setIsPlaying(false));
    }
  };

  const handleSeek = (e) => {
    if (!videoRef.current) return;
    const rect = e.currentTarget.getBoundingClientRect();
    const clickX = e.clientX - rect.left;
    const newProgress = Math.max(0, Math.min(1, clickX / rect.width));
    const newTime = newProgress * videoRef.current.duration;
    videoRef.current.currentTime = newTime;
    setProgress(newProgress * 100);
  };

  const toggleFullscreen = () => {
    if (!containerRef.current) return;
    if (!document.fullscreenElement) {
      containerRef.current.requestFullscreen?.().then(() => setIsFullscreen(true)).catch(() => {});
    } else {
      document.exitFullscreen?.().then(() => setIsFullscreen(false)).catch(() => {});
    }
  };

  return (
    <div 
      ref={containerRef}
      className={`relative rounded-2xl overflow-hidden gradient-card border border-cyan-500/35 shadow-2xl group bg-[#020c15] select-none ${className}`}
    >
      {/* Video Element */}
      <div className="relative aspect-video w-full flex items-center justify-center bg-black overflow-hidden">
        <video
          ref={videoRef}
          src={src}
          poster={poster}
          autoPlay={autoPlay}
          loop={loop}
          muted={muted}
          playsInline
          preload="metadata"
          onTimeUpdate={handleTimeUpdate}
          onLoadedMetadata={handleLoadedMetadata}
          onWaiting={() => setIsBuffering(true)}
          onPlaying={() => {
            setIsBuffering(false);
            setIsPlaying(true);
          }}
          onError={() => setHasError(true)}
          className="w-full h-full object-contain"
        />

        {/* Ambient CRT / Laser Scan Overlay */}
        <div className="absolute inset-0 pointer-events-none bg-[radial-gradient(circle_at_center,transparent_0%,rgba(2,11,20,0.4)_100%)]"></div>

        {/* Top HUD Tag */}
        <div className="absolute top-3 left-3 right-3 flex items-center justify-between pointer-events-none z-20">
          <div className="flex items-center gap-2 px-2.5 py-1 rounded-lg bg-black/80 backdrop-blur-md border border-cyan-500/30 text-[11px] font-mono text-cyan-300">
            <span className={`w-2 h-2 rounded-full ${isPlaying ? 'bg-cyan-400 animate-ping' : 'bg-amber-400'}`}></span>
            <span className="font-bold uppercase tracking-wider">{badge}</span>
            <span className="hidden sm:inline text-slate-400">· {title}</span>
          </div>

          <div className="flex items-center gap-1.5 px-2 py-0.5 rounded bg-black/70 border border-cyan-500/20 text-[10px] font-mono text-slate-300">
            <span>60 FPS</span>
            <span className="text-teal-400 font-bold">1080p HD</span>
          </div>
        </div>

        {/* Buffering Spinner */}
        {isBuffering && (
          <div className="absolute inset-0 flex items-center justify-center bg-black/40 z-10 pointer-events-none">
            <RefreshCw className="w-8 h-8 text-cyan-400 animate-spin" />
          </div>
        )}

        {/* Error Fallback */}
        {hasError && (
          <div className="absolute inset-0 flex flex-col items-center justify-center bg-[#061929] text-center p-4 z-20">
            <AlertCircle className="w-8 h-8 text-amber-400 mb-2" />
            <div className="text-xs font-mono text-slate-300">Video Demonstration Available via Channel Stream</div>
            <div className="text-[10px] text-slate-500 mt-1">{src}</div>
          </div>
        )}

        {/* Center Big Play Trigger on Hover/Pause */}
        <button
          onClick={togglePlay}
          className={`absolute inset-0 flex items-center justify-center bg-black/30 transition-opacity cursor-pointer z-10 ${
            isPlaying ? 'opacity-0 group-hover:opacity-100' : 'opacity-100'
          }`}
          aria-label={isPlaying ? "Pause video" : "Play video"}
        >
          <div className="w-14 h-14 rounded-full bg-cyan-400/90 text-[#031525] flex items-center justify-center shadow-[0_0_25px_#00f0ff] hover:scale-110 transition-transform">
            {isPlaying ? <Pause className="w-6 h-6" /> : <Play className="w-6 h-6 ml-0.5" />}
          </div>
        </button>
      </div>

      {/* Bottom Control Bar */}
      {showControls && (
        <div className="p-3 bg-[#041626] border-t border-cyan-500/20 flex flex-col gap-2">
          {/* Progress Scrubber */}
          <div 
            className="w-full h-1.5 bg-[#082238] rounded-full overflow-hidden cursor-pointer relative group/bar"
            onClick={handleSeek}
          >
            <div 
              className="h-full bg-gradient-to-r from-cyan-400 via-teal-300 to-cyan-300 rounded-full transition-all duration-100 relative shadow-[0_0_8px_#00f0ff]"
              style={{ width: `${progress}%` }}
            />
          </div>

          {/* Buttons & Telemetry Row */}
          <div className="flex items-center justify-between text-xs pt-1">
            <div className="flex items-center gap-2">
              <button
                onClick={togglePlay}
                className="p-1.5 rounded-lg bg-[#082238] hover:bg-cyan-950 text-cyan-300 hover:text-white border border-cyan-500/30 transition-colors cursor-pointer"
                title={isPlaying ? "Pause" : "Play"}
              >
                {isPlaying ? <Pause className="w-3.5 h-3.5" /> : <Play className="w-3.5 h-3.5" />}
              </button>

              <button
                onClick={toggleMute}
                className="p-1.5 rounded-lg bg-[#082238] hover:bg-cyan-950 text-cyan-300 hover:text-white border border-cyan-500/30 transition-colors cursor-pointer"
                title={isMuted ? "Unmute" : "Mute"}
              >
                {isMuted ? <VolumeX className="w-3.5 h-3.5" /> : <Volume2 className="w-3.5 h-3.5" />}
              </button>

              <div className="text-[11px] font-mono text-slate-400 pl-1">
                <span className="text-cyan-400">{currentTime}</span> / <span>{duration}</span>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={toggleFullscreen}
                className="p-1.5 rounded-lg bg-[#082238] hover:bg-cyan-950 text-cyan-300 hover:text-white border border-cyan-500/30 transition-colors cursor-pointer"
                title="Toggle Fullscreen"
              >
                {isFullscreen ? <Minimize className="w-3.5 h-3.5" /> : <Maximize className="w-3.5 h-3.5" />}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
