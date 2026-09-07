import React, { useState } from 'react';
import { ArrowRight, Code2, Filter, ExternalLink, Brain, ShieldCheck, Bot, Eye, TrendingUp } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { TiltCard } from '../components/common/TiltCard';
import { projectImages } from '../assets/projects';

export const allProjectsData = [
  {
    id: 'noesis',
    title: 'Noesis — AI Study Assistant',
    tags: ['Agentic AI', 'LangGraph', 'Groq LLaMA 3.3', 'Streamlit'],
    category: 'Agentic AI',
    description: 'Autonomous multi-agent learning assistant built on LangGraph that adapts topic synthesis, conducts live web research, and generates calibrated quizzes.',
    link: '/case-studies/noesis',
    gradient: 'from-cyan-500/20 to-blue-600/10',
    metric: 'StateGraph + HITL Interrupt',
    renderCardPreview: () => (
      <div className="w-full h-44 bg-gradient-to-b from-[#061e31] to-[#031422] p-2.5 rounded-2xl flex flex-col justify-between border border-cyan-500/25 group-hover:border-cyan-400/50 transition-colors relative overflow-hidden">
        <div className="relative h-28 rounded-xl bg-[#092740] border border-cyan-500/30 overflow-hidden flex items-center justify-center">
          <img 
            src={projectImages.noesisQuiz} 
            alt="Noesis AI Study Assistant" 
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          />
          <div className="absolute top-2 left-2 bg-black/80 px-2 py-0.5 rounded text-[9px] font-mono text-cyan-300 border border-cyan-500/40">
            Groq LLaMA 3.3 70B
          </div>
          <div className="absolute bottom-2 right-2 bg-emerald-950/80 px-2 py-0.5 rounded text-[9px] font-mono text-emerald-300 border border-emerald-500/40">
            Adaptive Quiz Engine
          </div>
        </div>
        <div className="flex items-center justify-between text-[10px] text-slate-300 pt-1">
          <span className="text-cyan-400 font-semibold flex items-center gap-1">
            <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-ping"></span>
            Multi-Agent StateGraph
          </span>
          <span className="text-emerald-400 font-mono font-bold bg-emerald-950/60 px-2 py-0.5 rounded border border-emerald-500/30">HITL Enabled</span>
        </div>
      </div>
    )
  },
  {
    id: 'the-watcher',
    title: 'The Watcher — Child Monitoring AI',
    tags: ['Mobile', 'Machine Learning', 'LangGraph', 'Flutter'],
    category: 'Mobile',
    description: 'Intelligent parental safety platform combining real-time ML activity classification with LangGraph agentic reasoning across Flutter & Kotlin apps.',
    link: '/case-studies/the-watcher',
    gradient: 'from-emerald-500/20 to-teal-600/10',
    metric: 'Real-Time Activity Classification',
    renderCardPreview: () => (
      <div className="w-full h-44 bg-gradient-to-b from-[#041f22] to-[#021319] p-2.5 rounded-2xl flex flex-col justify-between border border-emerald-500/25 group-hover:border-emerald-400/50 transition-colors relative overflow-hidden">
        <div className="relative h-28 rounded-xl bg-[#082b2e] border border-emerald-500/30 overflow-hidden flex items-center justify-center">
          <img 
            src={projectImages.watcherBrowsing} 
            alt="The Watcher Monitoring" 
            className="w-full h-full object-cover object-top group-hover:scale-105 transition-transform duration-500"
          />
          <div className="absolute top-2 left-2 bg-black/80 px-2 py-0.5 rounded text-[9px] font-mono text-emerald-300 border border-emerald-500/40">
            Flutter + Kotlin
          </div>
          <div className="absolute bottom-2 right-2 bg-emerald-950/80 px-2 py-0.5 rounded text-[9px] font-mono text-emerald-300 border border-emerald-500/40">
            Contextual ML Alerts
          </div>
        </div>
        <div className="flex items-center justify-between text-[10px] text-slate-300 pt-1">
          <span className="text-emerald-400 font-semibold flex items-center gap-1">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-ping"></span>
            Cross-Platform App
          </span>
          <span className="text-cyan-300 font-mono font-bold bg-cyan-950/60 px-2 py-0.5 rounded border border-cyan-500/30">Django REST</span>
        </div>
      </div>
    )
  },
  {
    id: 'frontdesk-ai',
    title: 'FrontDesk AI — WhatsApp Booking Bot',
    tags: ['Automation', 'Agentic AI', 'WhatsApp API', 'Groq'],
    category: 'Automation',
    description: 'Autonomous conversational agent managing appointment booking, calendar negotiation, and customer FAQs in Roman Urdu & English via WhatsApp.',
    link: '/case-studies/frontdesk-ai',
    gradient: 'from-teal-500/20 to-emerald-600/10',
    metric: '100% Automated · <0.8s Latency',
    renderCardPreview: () => (
      <div className="w-full h-44 bg-gradient-to-b from-[#051f28] to-[#021319] p-3 rounded-2xl flex flex-col justify-between border border-teal-500/25 group-hover:border-teal-400/50 transition-colors">
        <div className="flex items-center justify-between pb-1.5 border-b border-teal-500/20">
          <div className="flex items-center gap-1.5">
            <div className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-ping"></div>
            <span className="text-xs font-semibold text-white">WhatsApp Agent</span>
          </div>
          <span className="text-[9px] text-emerald-300 bg-emerald-950/80 px-2 py-0.5 rounded border border-emerald-500/40">24/7 Live</span>
        </div>
        <div className="space-y-1.5 text-[10px]">
          <div className="bg-[#0b333a] text-slate-200 p-1.5 rounded-lg rounded-tl-none max-w-[85%] border border-teal-500/20 truncate">
            Hi, doctor consultation book krni hai Friday 4 PM
          </div>
          <div className="bg-[#0a4742] text-teal-100 p-1.5 rounded-lg rounded-tr-none ml-auto max-w-[85%] border border-teal-400/30 truncate">
            ✓ Confirmed! Friday 4:00 PM reserved for Dr. Sarah.
          </div>
        </div>
        <div className="flex items-center justify-between text-[10px] text-slate-300 pt-1 border-t border-teal-500/15">
          <span className="text-teal-300 font-semibold">Roman Urdu / English</span>
          <span className="text-emerald-400 font-mono font-bold">&lt;0.8s Response</span>
        </div>
      </div>
    )
  },
  {
    id: 'threadeye',
    title: 'ThreadEye — Fabric Defect Detection',
    tags: ['Computer Vision', 'YOLOv8', 'PyTorch', 'OpenCV'],
    category: 'Computer Vision',
    description: 'Computer vision quality inspection for textile mills using custom YOLOv8 instance segmentation to detect yarn breaks and holes under 14ms.',
    link: '/case-studies/threadeye',
    gradient: 'from-cyan-500/20 to-blue-600/10',
    metric: '14ms Latency · YOLOv8n-seg',
    renderCardPreview: () => (
      <div className="w-full h-44 bg-gradient-to-b from-[#061e31] to-[#031422] p-2.5 rounded-2xl flex flex-col justify-between border border-cyan-500/25 group-hover:border-cyan-400/50 transition-colors relative overflow-hidden">
        <div className="relative h-28 rounded-xl bg-[#092740] border border-cyan-500/30 overflow-hidden flex items-center justify-center">
          <img 
            src={projectImages.threadeyeInspection} 
            alt="ThreadEye Defect Detection" 
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          />
          <div className="absolute top-2 left-2 bg-black/80 px-2 py-0.5 rounded text-[9px] font-mono text-cyan-300 border border-cyan-500/40">
            YOLOv8n-seg
          </div>
          <div className="absolute bottom-2 right-2 bg-red-950/80 px-2 py-0.5 rounded text-[9px] font-mono text-red-300 border border-red-500/40">
            1 Defect (11.4%)
          </div>
        </div>
        <div className="flex items-center justify-between text-[10px] text-slate-300 pt-1">
          <span className="text-cyan-400 font-semibold flex items-center gap-1">
            <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-ping"></span>
            Industrial Edge Vision
          </span>
          <span className="text-emerald-400 font-mono font-bold bg-emerald-950/60 px-2 py-0.5 rounded border border-emerald-500/30">14ms Latency</span>
        </div>
      </div>
    )
  },
  {
    id: 'getscry',
    title: 'GetScry — Visitor Intent Intelligence',
    tags: ['Machine Learning', 'XGBoost', 'SHAP', 'FastAPI'],
    category: 'Machine Learning',
    description: 'E-commerce machine learning system predicting purchase intent in real-time with explainable AI (SHAP) and live session telemetry.',
    link: '/case-studies/getscry',
    gradient: 'from-rose-500/20 to-teal-500/10',
    metric: 'Purchase Intent Scoring 0–100%',
    renderCardPreview: () => (
      <div className="w-full h-44 bg-gradient-to-b from-[#1a0a14] to-[#041423] p-2.5 rounded-2xl flex flex-col justify-between border border-rose-500/25 group-hover:border-rose-400/50 transition-colors relative overflow-hidden">
        <div className="relative h-28 rounded-xl bg-[#240e1b] border border-rose-500/30 overflow-hidden flex items-center justify-center">
          <img 
            src={projectImages.getscryDashboard} 
            alt="GetScry Intent Dashboard" 
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          />
          <div className="absolute top-2 left-2 bg-black/80 px-2 py-0.5 rounded text-[9px] font-mono text-rose-300 border border-rose-500/40">
            XGBoost + SHAP
          </div>
          <div className="absolute bottom-2 right-2 bg-rose-950/80 px-2 py-0.5 rounded text-[9px] font-mono text-rose-300 border border-rose-500/40">
            High Intent: 99.2%
          </div>
        </div>
        <div className="flex items-center justify-between text-[10px] text-slate-300 pt-1">
          <span className="text-rose-400 font-semibold flex items-center gap-1">
            <span className="w-1.5 h-1.5 rounded-full bg-rose-400 animate-ping"></span>
            Predictive ML
          </span>
          <span className="text-teal-300 font-mono font-bold bg-teal-950/60 px-2 py-0.5 rounded border border-teal-500/30">Explainable AI</span>
        </div>
      </div>
    )
  }
];

export const OurWorkPage = ({ navigate }) => {
  const [activeCategory, setActiveCategory] = useState('All');

  const categories = ['All', 'Agentic AI', 'Computer Vision', 'Machine Learning', 'Automation', 'Mobile'];

  const filteredProjects = activeCategory === 'All' 
    ? allProjectsData 
    : allProjectsData.filter(p => p.category === activeCategory || p.tags.includes(activeCategory));

  return (
    <div className="relative pt-32 sm:pt-40 pb-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto z-10">
      
      {/* Header */}
      <div className="text-left mb-10 space-y-3">
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-gradient-to-r from-cyan-950/80 via-[#07243c]/80 to-teal-950/80 border border-cyan-500/30 text-cyan-300 text-xs font-mono uppercase tracking-wider shadow-[0_0_20px_rgba(0,240,255,0.2)]"
        >
          <Code2 className="w-3.5 h-3.5 text-cyan-400" />
          <span>Case Studies & Projects</span>
        </motion.div>

        <motion.h1 
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-white tracking-tight"
        >
          Our <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-300 via-teal-300 to-indigo-400 drop-shadow-[0_0_35px_rgba(0,240,255,0.45)]">Work</span>
        </motion.h1>

        <motion.p 
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="text-base sm:text-lg text-slate-300 font-normal max-w-xl leading-relaxed"
        >
          Explore our production AI agents, computer vision pipelines, predictive ML systems, and full-stack software deployments.
        </motion.p>
      </div>

      {/* Filter Tabs with animated gradient pill */}
      <div className="flex flex-wrap items-center gap-2 mb-10">
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => setActiveCategory(cat)}
            className={`relative px-5 py-2.5 rounded-xl text-sm font-semibold transition-colors cursor-pointer ${
              activeCategory === cat
                ? 'text-white'
                : 'gradient-card text-slate-300 hover:text-cyan-300 hover:border-cyan-500/50'
            }`}
          >
            {activeCategory === cat && (
              <motion.div
                layoutId="ourWorkActiveCategory"
                className="absolute inset-0 bg-gradient-to-r from-cyan-500/40 via-teal-500/30 to-indigo-500/30 border border-cyan-400 rounded-xl shadow-[0_0_20px_rgba(0,240,255,0.45)] z-0"
                transition={{ type: 'spring', stiffness: 450, damping: 35 }}
              />
            )}
            <span className="relative z-10">{cat}</span>
          </button>
        ))}
      </div>

      {/* Projects Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        <AnimatePresence>
          {filteredProjects.map((project, index) => (
            <motion.div
              layout
              key={project.id}
              initial={{ opacity: 0, x: 60, scale: 0.92 }}
              whileInView={{ opacity: 1, x: 0, scale: 1 }}
              viewport={{ once: true, amount: 0.15 }}
              exit={{ opacity: 0, scale: 0.9 }}
              transition={{
                type: "spring",
                stiffness: 260,
                damping: 24,
                delay: index * 0.1
              }}
              className="h-full"
            >
              <TiltCard
                onClick={() => {
                  navigate(project.link);
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                }}
                className="h-full"
              >
                <div className="gradient-card rounded-3xl p-6 flex flex-col justify-between border border-cyan-500/30 group hover:border-cyan-400/80 transition-all duration-400 h-full relative overflow-hidden min-h-[480px] shadow-[0_10px_25px_rgba(0,0,0,0.5)]">
                  <div className={`absolute -top-16 -right-16 w-36 h-36 rounded-full blur-3xl opacity-35 bg-gradient-to-br ${project.gradient} pointer-events-none group-hover:opacity-75 transition-opacity`}></div>

                  <div>
                    {/* Preview UI Component with Cropped Screenshot */}
                    <div className="mb-5">
                      {project.renderCardPreview()}
                    </div>

                    {/* Tags */}
                    <div className="flex flex-wrap gap-1.5 mb-3">
                      {project.tags.map((tag, i) => (
                        <span key={i} className="px-2.5 py-0.5 rounded-lg bg-gradient-to-r from-cyan-950/90 to-[#07243c]/90 text-cyan-300 border border-cyan-500/30 text-xs font-mono font-medium">
                          {tag}
                        </span>
                      ))}
                    </div>

                    {/* Title */}
                    <h3 className="text-xl sm:text-2xl font-bold text-white group-hover:text-cyan-300 transition-colors mb-2">
                      {project.title}
                    </h3>

                    {/* Description */}
                    <p className="text-xs sm:text-sm text-slate-300 leading-relaxed mb-6">
                      {project.description}
                    </p>
                  </div>

                  {/* View Project CTA with Gradient */}
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      navigate(project.link);
                      window.scrollTo({ top: 0, behavior: 'smooth' });
                    }}
                    className="w-full py-3.5 rounded-xl bg-gradient-to-r from-cyan-400 via-teal-300 to-cyan-400 hover:from-cyan-300 hover:to-teal-200 text-[#031525] font-extrabold text-xs uppercase tracking-wider transition-all duration-300 shadow-[0_0_20px_rgba(0,240,255,0.4)] hover:shadow-[0_0_35px_rgba(0,240,255,0.8)] flex items-center justify-center gap-2 cursor-pointer active:scale-95"
                  >
                    <span>View Full Case Study</span>
                    <ArrowRight className="w-4 h-4 group-hover:translate-x-1.5 transition-transform" />
                  </button>
                </div>
              </TiltCard>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>

    </div>
  );
};
