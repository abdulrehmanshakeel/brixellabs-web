import React from 'react';
import { ArrowRight, ExternalLink, Play, Zap, Layers, Brain, ShieldCheck, Bot, Eye, TrendingUp } from 'lucide-react';
import { motion } from 'framer-motion';
import { TiltCard } from '../common/TiltCard';
import { projectImages } from '../../assets/projects';

export const featuredProjects = [
  {
    id: 'noesis',
    title: 'Noesis',
    tag: 'Agentic AI / LLM',
    category: 'LangGraph · Groq LLaMA 3.3',
    description: 'Autonomous multi-agent study assistant adapting topic synthesis, deep search routing, and dynamically generated quizzes.',
    link: '/case-studies/noesis',
    gradient: 'from-cyan-500/20 to-blue-600/10',
    renderPreview: () => (
      <div className="w-full h-48 bg-gradient-to-b from-[#061e31] to-[#031422] p-2.5 rounded-2xl flex flex-col justify-between border border-cyan-500/25 group-hover:border-cyan-400/50 transition-colors relative overflow-hidden">
        <div className="relative h-32 rounded-xl bg-[#092740] border border-cyan-500/30 overflow-hidden flex items-center justify-center">
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
    title: 'The Watcher',
    tag: 'AI Child Safety',
    category: 'ML · Flutter · LangGraph',
    description: 'Intelligent parental safety platform combining real-time ML activity classification with LangGraph agentic reasoning across mobile apps.',
    link: '/case-studies/the-watcher',
    gradient: 'from-emerald-500/20 to-teal-600/10',
    renderPreview: () => (
      <div className="w-full h-48 bg-gradient-to-b from-[#041f22] to-[#021319] p-2.5 rounded-2xl flex flex-col justify-between border border-emerald-500/25 group-hover:border-emerald-400/50 transition-colors relative overflow-hidden">
        <div className="relative h-32 rounded-xl bg-[#082b2e] border border-emerald-500/30 overflow-hidden flex items-center justify-center">
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
    title: 'FrontDesk AI',
    tag: 'Conversational AI',
    category: 'LangGraph · WhatsApp API',
    description: 'Autonomous WhatsApp booking bot managing appointment scheduling, calendar negotiation, and customer FAQs in Roman Urdu & English.',
    link: '/case-studies/frontdesk-ai',
    gradient: 'from-teal-500/20 to-emerald-600/10',
    renderPreview: () => (
      <div className="w-full h-48 bg-gradient-to-b from-[#041f27] to-[#021319] p-3 rounded-2xl flex flex-col justify-between border border-teal-500/25 group-hover:border-teal-400/50 transition-colors">
        <div className="flex items-center justify-between pb-1.5 border-b border-teal-500/20">
          <div className="flex items-center gap-1.5">
            <div className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-ping"></div>
            <span className="text-[11px] font-semibold text-white">WhatsApp Business AI</span>
          </div>
          <span className="text-[9px] text-emerald-300 bg-emerald-950/80 px-2 py-0.5 rounded border border-emerald-500/40">24/7 Live</span>
        </div>
        
        {/* Chat Bubbles */}
        <div className="space-y-1.5 text-[10px]">
          <div className="bg-[#0b333a] text-slate-200 p-2 rounded-lg rounded-tl-none max-w-[85%] border border-teal-500/20 truncate">
            Hi! Doctor consultation book krni hai Friday 4 PM
          </div>
          <div className="bg-[#0a4742] text-teal-100 p-2 rounded-lg rounded-tr-none ml-auto max-w-[85%] border border-teal-400/40 truncate">
            ✓ Confirmed! Friday 4:00 PM slot reserved for Dr. Sarah.
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
    title: 'ThreadEye',
    tag: 'Computer Vision',
    category: 'YOLOv8 · OpenCV · PyTorch',
    description: 'Industrial fabric defect detection system using custom YOLOv8 instance segmentation to catch yarn breaks and flaws under 14ms.',
    link: '/case-studies/threadeye',
    gradient: 'from-cyan-500/20 to-blue-600/10',
    renderPreview: () => (
      <div className="w-full h-48 bg-gradient-to-b from-[#051c2f] to-[#031422] p-2.5 rounded-2xl flex flex-col justify-between border border-cyan-500/25 group-hover:border-cyan-400/50 transition-colors relative overflow-hidden">
        <div className="relative h-32 rounded-xl bg-[#082238] border border-cyan-500/30 overflow-hidden flex items-center justify-center">
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
            Edge Vision
          </span>
          <span className="text-emerald-400 font-mono font-bold bg-emerald-950/60 px-2 py-0.5 rounded border border-emerald-500/30">14ms Latency</span>
        </div>
      </div>
    )
  },
  {
    id: 'getscry',
    title: 'GetScry',
    tag: 'Predictive ML',
    category: 'XGBoost · SHAP · FastAPI',
    description: 'E-commerce predictive intelligence system generating real-time purchase intent scores (0-100%) with explainable AI rationales.',
    link: '/case-studies/getscry',
    gradient: 'from-rose-500/20 to-teal-500/10',
    renderPreview: () => (
      <div className="w-full h-48 bg-gradient-to-b from-[#1a0a14] to-[#041423] p-2.5 rounded-2xl flex flex-col justify-between border border-rose-500/25 group-hover:border-rose-400/50 transition-colors relative overflow-hidden">
        <div className="relative h-32 rounded-xl bg-[#240e1b] border border-rose-500/30 overflow-hidden flex items-center justify-center">
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

export const FeaturedCaseStudies = ({ navigate }) => {
  return (
    <section className="relative py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto z-10" id="case-studies">
      
      {/* Section Header */}
      <div className="text-center mb-12 space-y-3">
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-gradient-to-r from-cyan-950/80 via-[#07243c]/80 to-teal-950/80 border border-cyan-500/30 text-cyan-300 text-xs font-mono uppercase tracking-wider shadow-[0_0_20px_rgba(0,240,255,0.2)]"
        >
          <Zap className="w-3.5 h-3.5 text-cyan-400" />
          <span>Real-World Implementations</span>
        </motion.div>

        <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white tracking-tight">
          Featured <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-300 via-teal-300 to-indigo-400 drop-shadow-[0_0_30px_rgba(0,240,255,0.4)]">Case Studies</span>
        </h2>
        <p className="text-slate-400 text-xs sm:text-sm">Explore our verified production AI agents, computer vision models, and predictive ML systems.</p>
      </div>

      {/* Featured Projects Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {featuredProjects.map((project, index) => (
          <motion.div
            key={project.id}
            initial={{ opacity: 0, x: 60, scale: 0.92 }}
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
            <TiltCard
              onClick={() => {
                navigate(project.link);
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
              className="h-full"
            >
              <div className="gradient-card rounded-3xl p-6 flex flex-col justify-between border border-cyan-500/30 group hover:border-cyan-400/80 transition-all duration-400 h-full relative overflow-hidden min-h-[460px] shadow-[0_10px_25px_rgba(0,0,0,0.5)]">
                
                {/* Corner ambient gradient */}
                <div className={`absolute -top-16 -right-16 w-36 h-36 rounded-full blur-3xl opacity-35 bg-gradient-to-br ${project.gradient} pointer-events-none group-hover:opacity-75 transition-opacity duration-500`}></div>

                <div>
                  {/* Live Simulation Preview */}
                  <div className="mb-5">
                    {project.renderPreview()}
                  </div>

                  {/* Tag / Category Badge */}
                  <div className="flex items-center justify-between mb-2.5">
                    <span className="text-base font-bold text-transparent bg-clip-text bg-gradient-to-r from-cyan-300 to-teal-300">
                      {project.title}
                    </span>
                    <span className="text-[11px] text-slate-400 font-mono">
                      {project.category}
                    </span>
                  </div>

                  {/* Description */}
                  <p className="text-xs sm:text-sm text-slate-300 leading-relaxed mb-6">
                    {project.description}
                  </p>
                </div>

                {/* View Project Button with Gradient */}
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    navigate(project.link);
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                  }}
                  className="w-full py-3 rounded-xl bg-gradient-to-r from-cyan-400 via-teal-300 to-cyan-400 hover:from-cyan-300 hover:to-teal-200 text-[#031422] font-extrabold text-xs uppercase tracking-wider transition-all duration-300 shadow-[0_0_20px_rgba(0,240,255,0.4)] hover:shadow-[0_0_35px_rgba(0,240,255,0.85)] flex items-center justify-center gap-2 cursor-pointer active:scale-95"
                >
                  <span>View Full Case Study</span>
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </button>

              </div>
            </TiltCard>
          </motion.div>
        ))}
      </div>

    </section>
  );
};
