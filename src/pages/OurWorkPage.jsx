import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { 
  faArrowRight,
  faBrain,
  faEye,
  faShieldHalved,
  faComments,
  faChartSimple
} from '@fortawesome/free-solid-svg-icons';
import { motion, AnimatePresence } from 'framer-motion';
import { EmptyState } from '../components/common/SkeletonAndEmptyStates';

export const allProjectsData = [
  {
    id: 'noesis',
    num: '01',
    title: 'Noesis: AI Study Assistant',
    tags: ['AI Assistant', 'Smart Summaries', 'Adaptive Quizzes'],
    category: 'AI Assistants',
    icon: faBrain,
    badge: 'LangGraph · Groq LPUs',
    description: 'Intelligent AI study helper generating personalized summaries, researching trusted sources, and creating adaptive quizzes.',
    link: '/case-studies/noesis'
  },
  {
    id: 'the-watcher',
    num: '02',
    title: 'The Watcher: Child Safety Platform',
    tags: ['Mobile App', 'Android', 'Flutter', 'Family Safety'],
    category: 'Mobile Apps',
    icon: faShieldHalved,
    badge: 'Flutter · Kotlin Native',
    description: 'Privacy-preserving family safety mobile app detecting digital hazards in real time while keeping all personal data completely private.',
    link: '/case-studies/the-watcher'
  },
  {
    id: 'frontdesk-ai',
    num: '03',
    title: 'FrontDesk AI: Autonomous WhatsApp Booking',
    tags: ['Conversational AI', 'WhatsApp', 'Booking Assistant'],
    category: 'Automation',
    icon: faComments,
    badge: 'WhatsApp API · Django',
    description: 'Smart WhatsApp assistant managing appointment scheduling, customer inquiries, and calendar booking 24/7 in Roman Urdu & English.',
    link: '/case-studies/frontdesk-ai'
  },
  {
    id: 'threadeye',
    num: '04',
    title: 'ThreadEye: Fabric Defect Detection',
    tags: ['Computer Vision', 'Quality Control', 'Textile AI'],
    category: 'Computer Vision',
    icon: faEye,
    badge: 'YOLOv8 · NVIDIA Jetson',
    description: 'Real-time AI camera quality inspection for textile mills detecting yarn breaks and fabric holes instantly on the production line.',
    link: '/case-studies/threadeye'
  },
  {
    id: 'getscry',
    num: '05',
    title: 'GetScry: Visitor Intent Intelligence',
    tags: ['E-Commerce AI', 'Sales Analytics', 'Predictive AI'],
    category: 'E-Commerce AI',
    icon: faChartSimple,
    badge: 'XGBoost · SHAP Analytics',
    description: 'E-commerce sales platform predicting customer purchase intent in real-time and driving checkout conversions.',
    link: '/case-studies/getscry'
  }
];

export const OurWorkPage = ({ navigate }) => {
  const [activeCategory, setActiveCategory] = useState('All');

  const categories = ['All', 'AI Assistants', 'Computer Vision', 'E-Commerce AI', 'Automation', 'Mobile Apps'];

  const filteredProjects = activeCategory === 'All' 
    ? allProjectsData 
    : allProjectsData.filter(p => p.category === activeCategory || p.tags.includes(activeCategory));

  return (
    <div className="relative pt-32 sm:pt-40 pb-20 px-4 sm:px-6 lg:px-8 max-w-6xl mx-auto z-10 text-slate-200">
      
      {/* Header */}
      <div className="text-left mb-10 space-y-3">
        <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-white tracking-tight leading-tight">
          Selected Engineering Deployments
        </h1>

        <p className="text-base sm:text-lg text-slate-300 font-normal max-w-2xl leading-relaxed">
          Production case studies spanning autonomous AI agents, edge computer vision pipelines, real-time predictive ML engines, and cross-platform mobile architectures.
        </p>
      </div>

      {/* Filter Tabs */}
      <div className="flex flex-wrap items-center gap-2 mb-10 pb-4 border-b border-slate-800/80">
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => setActiveCategory(cat)}
            className={`px-4 py-2 rounded-lg text-xs font-medium transition-all cursor-pointer ${
              activeCategory === cat
                ? 'bg-slate-800 text-white font-bold border border-slate-700'
                : 'text-slate-400 hover:text-white hover:bg-slate-900/60'
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Cardless Architectural Directory */}
      <div className="divide-y divide-slate-800/80 border-y border-slate-800/80">
        <h2 className="sr-only">Production AI & Full-Stack Case Studies</h2>
        {filteredProjects.length === 0 ? (
          <EmptyState
            title="No projects in this category yet"
            message={`We haven't published case studies under "${activeCategory}" yet. Reset the filter to view all active engineering deployments.`}
            actionLabel="Reset Filter"
            onAction={() => setActiveCategory('All')}
          />
        ) : (
          <AnimatePresence mode="popLayout">
            {filteredProjects.map((project, index) => (
              <motion.a
                layout
                key={project.id}
                href={project.link}
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.3, delay: index * 0.05 }}
                onClick={(e) => {
                  e.preventDefault();
                  navigate(project.link);
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                }}
                className="group relative cursor-pointer py-7 sm:py-8 px-3 sm:px-6 transition-all duration-300 hover:bg-gradient-to-r hover:from-cyan-950/25 hover:via-slate-900/40 hover:to-transparent block no-underline"
              >
                {/* Active Left Indicator Accent Line */}
                <div className="absolute left-0 top-0 bottom-0 w-[3px] bg-gradient-to-b from-cyan-400 to-teal-400 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-r" />

                <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-5 lg:gap-8">
                  {/* Left Identity: Monospace ID, Badges & Title */}
                  <div className="flex items-start gap-4 lg:w-[38%] shrink-0">
                    <span className="font-mono text-xs font-bold text-slate-500 group-hover:text-cyan-400 transition-colors pt-1 shrink-0">
                      0{index + 1} //
                    </span>

                    <div className="space-y-1.5 min-w-0">
                      <div className="flex flex-wrap items-center gap-2">
                        <span className="text-[10px] font-mono text-cyan-400 uppercase tracking-widest font-semibold">
                          {project.category}
                        </span>
                        {project.badge && (
                          <span className="text-[11px] font-mono text-slate-500">
                            // {project.badge}
                          </span>
                        )}
                      </div>
                      <h3 className="font-heading text-xl sm:text-2xl font-bold text-white group-hover:text-cyan-300 transition-colors">
                        {project.title}
                      </h3>
                    </div>
                  </div>

                  {/* Center Column: Description & Tags */}
                  <div className="flex-1 lg:px-4 space-y-3">
                    <p className="text-xs sm:text-sm text-slate-300/90 leading-relaxed font-normal group-hover:text-slate-200 transition-colors">
                      {project.description}
                    </p>
                    <div className="flex flex-wrap gap-1.5">
                      {project.tags.map(tag => (
                        <span key={tag} className="text-[10px] font-mono text-slate-500 bg-slate-900/60 px-2 py-0.5 rounded border border-slate-800/80">
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Right Column: Direct Text Action */}
                  <div className="shrink-0 flex items-center justify-between lg:justify-end pt-3 lg:pt-0 border-t border-slate-800/50 lg:border-t-0 text-xs font-mono text-cyan-400 group-hover:text-cyan-300">
                    <div className="inline-flex items-center gap-2 group-hover:translate-x-1.5 transition-transform duration-300">
                      <span className="text-xs sm:text-sm font-semibold tracking-wide text-slate-400 group-hover:text-white transition-colors duration-200">
                        Read Case Study
                      </span>
                      <FontAwesomeIcon icon={faArrowRight} className="w-3.5 h-3.5" />
                    </div>
                  </div>
                </div>
              </motion.a>
            ))}
          </AnimatePresence>
        )}
      </div>

    </div>
  );
};

