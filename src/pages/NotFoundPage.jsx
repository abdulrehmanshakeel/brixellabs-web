import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { 
  faTriangleExclamation, 
  faHouse, 
  faLayerGroup, 
  faFileCode, 
  faEnvelope, 
  faArrowLeft 
} from '@fortawesome/free-solid-svg-icons';
import { motion } from 'framer-motion';

export const NotFoundPage = ({ navigate }) => {
  const quickLinks = [
    {
      title: 'Home Architecture',
      desc: 'Return to our primary engineering overview & capabilities.',
      path: '/',
      icon: faHouse
    },
    {
      title: 'Engineering Services',
      desc: 'Explore AI, ML, Computer Vision, and Full-Stack offerings.',
      path: '/services',
      icon: faLayerGroup
    },
    {
      title: 'Case Studies',
      desc: 'Inspect real deployed systems (YOLOv8, LangGraph, Edge AI).',
      path: '/case-studies',
      icon: faFileCode
    },
    {
      title: 'Contact Engineering',
      desc: 'Connect directly with senior engineers or request a demo.',
      path: '/contact',
      icon: faEnvelope
    }
  ];

  return (
    <div className="relative min-h-[85vh] flex items-center justify-center pt-32 sm:pt-40 pb-20 px-4 sm:px-6 lg:px-8 max-w-5xl mx-auto z-10">
      
      <div className="w-full text-center space-y-8">
        
        {/* Futuristic Error Code Display */}
        <div className="relative inline-block">
          
          {/* Glitch Glow Behind */}
          <div className="absolute inset-0 bg-gradient-to-r from-cyan-500/30 via-teal-500/20 to-indigo-500/30 blur-3xl -z-10 rounded-full" />

          {/* Huge 404 text */}
          <motion.h1 
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ type: 'spring', stiffness: 200, damping: 20 }}
            className="text-7xl sm:text-9xl font-black text-white font-mono tracking-tighter select-none"
          >
            404 <span className="sr-only">: Page Not Found</span>
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
            System Node Unreachable
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
              <a
                key={item.path}
                href={item.path}
                onClick={(e) => {
                  e.preventDefault();
                  navigate(item.path);
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                }}
                className="bg-slate-950/60 rounded-xl p-5 border border-slate-800/80 hover:border-cyan-500/50 hover:bg-slate-900/40 group transition-all duration-300 flex flex-col justify-between text-left cursor-pointer no-underline block"
              >
                <div>
                  <div className="w-9 h-9 rounded-lg bg-slate-900 border border-slate-800 flex items-center justify-center text-white group-hover:border-slate-700 transition-colors mb-3">
                    <FontAwesomeIcon icon={item.icon} className="w-4 h-4 text-white" />
                  </div>
                  <div className="font-bold text-white text-sm group-hover:text-cyan-300 transition-colors">
                    {item.title}
                  </div>
                  <div className="text-xs text-slate-400 mt-1 leading-relaxed">
                    {item.desc}
                  </div>
                </div>

                <div className="mt-4 pt-2 border-t border-slate-800/80 text-[11px] font-mono text-slate-400 group-hover:text-cyan-400 font-medium flex items-center gap-1 group-hover:translate-x-0.5 transition-all">
                  <span>Go to page</span>
                  <span>→</span>
                </div>
              </a>
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
          <a
            href="/"
            onClick={(e) => {
              e.preventDefault();
              navigate('/');
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            className="btn-primary inline-flex items-center gap-2 no-underline"
          >
            <FontAwesomeIcon icon={faArrowLeft} className="w-4 h-4" />
            <span>Return to Main System</span>
          </a>
        </motion.div>
      </div>

    </div>
  );
};
