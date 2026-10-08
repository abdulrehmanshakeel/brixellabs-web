import React from 'react';
import { 
  AlertTriangle, 
  Home, 
  Layers, 
  FileCode, 
  Mail, 
  ArrowLeft, 
  Terminal, 
  Compass, 
  RefreshCw,
  Search
} from 'lucide-react';
import { motion } from 'framer-motion';

export const NotFoundPage = ({ navigate }) => {
  const quickLinks = [
    {
      title: 'Home Architecture',
      desc: 'Return to our primary engineering overview & capabilities.',
      path: '/',
      icon: Home
    },
    {
      title: 'Engineering Services',
      desc: 'Explore AI, ML, Computer Vision, and Full-Stack offerings.',
      path: '/services',
      icon: Layers
    },
    {
      title: 'Case Studies',
      desc: 'Inspect real deployed systems (YOLOv8, LangGraph, Edge AI).',
      path: '/case-studies',
      icon: FileCode
    },
    {
      title: 'Contact Engineering',
      desc: 'Connect directly with senior engineers or request a demo.',
      path: '/contact',
      icon: Mail
    }
  ];

  return (
    <div className="relative min-h-[85vh] flex items-center justify-center pt-32 sm:pt-40 pb-20 px-4 sm:px-6 lg:px-8 max-w-5xl mx-auto z-10">
      
      <div className="w-full text-center space-y-8">
        
        {/* Futuristic Error Code Display */}
        <div className="relative inline-block">
          
          {/* Glitch Glow Behind */}
          <div className="absolute inset-0 bg-gradient-to-r from-cyan-500/30 via-teal-500/20 to-indigo-500/30 blur-3xl -z-10 rounded-full" />

          {/* Cyber Status Badge */}
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-red-950/60 border border-red-500/40 text-red-300 text-xs font-mono uppercase tracking-widest mb-6 shadow-[0_0_20px_rgba(239,68,68,0.25)]"
          >
            <AlertTriangle className="w-3.5 h-3.5 text-red-400 animate-pulse" />
            <span>ERROR CODE 404 // MODULE_NOT_FOUND</span>
          </motion.div>

          {/* Huge 404 text */}
          <motion.h1 
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ type: 'spring', stiffness: 200, damping: 20 }}
            className="text-7xl sm:text-9xl font-black text-transparent bg-clip-text bg-gradient-to-b from-white via-cyan-200 to-cyan-700/60 font-mono tracking-tighter drop-shadow-[0_0_40px_rgba(0,240,255,0.4)] select-none"
          >
            404
          </motion.h1>
        </div>

        {/* Headline & Explanation */}
        <div className="space-y-3 max-w-xl mx-auto">
          <motion.h2 
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight"
          >
            System Node <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-300 to-teal-300">Unreachable</span>
          </motion.h2>

          <motion.p 
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-sm sm:text-base text-slate-300 leading-relaxed font-normal"
          >
            The requested resource, route, or module is not active or has been relocated. Let's redirect you back into active system clusters.
          </motion.p>
        </div>

        {/* Quick Navigation Cards */}
        <motion.div 
          initial={{ opacity: 0, y: 25 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 max-w-4xl mx-auto pt-4 text-left"
        >
          {quickLinks.map((item) => {
            const Icon = item.icon;
            return (
              <button
                key={item.path}
                onClick={() => {
                  navigate(item.path);
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                }}
                className="gradient-card rounded-2xl p-5 border border-cyan-500/30 hover:border-cyan-400 group transition-all duration-300 flex flex-col justify-between text-left cursor-pointer hover:shadow-[0_0_20px_rgba(0,240,255,0.2)]"
              >
                <div>
                  <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#092b45] to-[#041525] border border-cyan-500/40 flex items-center justify-center text-cyan-400 mb-3 group-hover:text-cyan-300 group-hover:border-cyan-400 transition-colors">
                    <Icon className="w-5 h-5" />
                  </div>
                  <div className="font-bold text-white text-sm group-hover:text-cyan-300 transition-colors">
                    {item.title}
                  </div>
                  <div className="text-xs text-slate-400 mt-1 leading-relaxed">
                    {item.desc}
                  </div>
                </div>

                <div className="mt-4 pt-2 border-t border-cyan-500/20 text-[11px] font-mono text-cyan-400 font-semibold flex items-center gap-1 group-hover:translate-x-0.5 transition-transform">
                  <span>Go to page</span>
                  <span>→</span>
                </div>
              </button>
            );
          })}
        </motion.div>

        {/* Primary Action Button */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
          className="pt-6"
        >
          <button
            onClick={() => {
              navigate('/');
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            className="inline-flex items-center gap-2 px-8 py-3.5 rounded-xl bg-gradient-to-r from-cyan-400 via-teal-300 to-cyan-400 hover:from-cyan-300 hover:to-teal-200 text-[#031422] font-extrabold text-sm transition-all duration-300 shadow-[0_0_25px_rgba(0,240,255,0.6)] cursor-pointer"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Return to Main System</span>
          </button>
        </motion.div>

        {/* Terminal Telemetry Output */}
        <div className="pt-8 max-w-md mx-auto">
          <div className="p-3 rounded-xl bg-[#03101c] border border-cyan-500/20 text-[11px] font-mono text-slate-400 flex items-center justify-between">
            <span className="flex items-center gap-2">
              <Terminal className="w-3.5 h-3.5 text-cyan-400" />
              <span>CORE CLUSTER: STABLE</span>
            </span>
            <span className="text-cyan-400">STATUS 404</span>
          </div>
        </div>

      </div>

    </div>
  );
};
