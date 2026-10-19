import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowRight } from '@fortawesome/free-solid-svg-icons';
import { motion, AnimatePresence } from 'framer-motion';
import { EmptyState } from '../components/common/SkeletonAndEmptyStates';

export const allProjectsData = [
  {
    id: 'noesis',
    title: 'Noesis: AI Study Assistant',
    tags: ['AI Assistant', 'Smart Summaries', 'Adaptive Quizzes'],
    category: 'AI Assistants',
    description: 'Intelligent AI study helper generating personalized summaries, researching trusted sources, and creating adaptive quizzes.',
    link: '/case-studies/noesis'
  },
  {
    id: 'the-watcher',
    title: 'The Watcher: Child Safety Platform',
    tags: ['Mobile App', 'Android', 'Flutter', 'Family Safety'],
    category: 'Mobile Apps',
    description: 'Privacy-preserving family safety mobile app detecting digital hazards in real time while keeping all personal data completely private.',
    link: '/case-studies/the-watcher'
  },
  {
    id: 'frontdesk-ai',
    title: 'FrontDesk AI: Autonomous WhatsApp Booking',
    tags: ['Conversational AI', 'WhatsApp', 'Booking Assistant'],
    category: 'Automation',
    description: 'Smart WhatsApp assistant managing appointment scheduling, customer inquiries, and calendar booking 24/7 in Roman Urdu & English.',
    link: '/case-studies/frontdesk-ai'
  },
  {
    id: 'threadeye',
    title: 'ThreadEye: Fabric Defect Detection',
    tags: ['Computer Vision', 'Quality Control', 'Textile AI'],
    category: 'Computer Vision',
    description: 'Real-time AI camera quality inspection for textile mills detecting yarn breaks and fabric holes instantly on the production line.',
    link: '/case-studies/threadeye'
  },
  {
    id: 'getscry',
    title: 'GetScry: Visitor Intent Intelligence',
    tags: ['E-Commerce AI', 'Sales Analytics', 'Predictive AI'],
    category: 'E-Commerce AI',
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

      {/* Projects Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <h2 className="sr-only">Production AI & Full-Stack Case Studies</h2>
        {filteredProjects.length === 0 ? (
          <EmptyState
            title="No projects in this category yet"
            message={`We haven't published case studies under "${activeCategory}" yet. Reset the filter to view all active engineering deployments.`}
            actionLabel="Reset Filter"
            onAction={() => setActiveCategory('All')}
          />
        ) : (
          <AnimatePresence>
            {filteredProjects.map((project) => (
              <motion.div
                layout
                key={project.id}
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.2 }}
                className="h-full"
              >
                <a
                  href={project.link}
                  onClick={(e) => {
                    e.preventDefault();
                    navigate(project.link);
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                  }}
                  className="rounded-2xl p-6 sm:p-7 flex flex-col justify-between border border-slate-800/90 bg-[#030e1a]/70 hover:border-cyan-500/40 hover:bg-[#041424]/80 transition-all duration-300 h-full cursor-pointer group shadow-lg no-underline block text-left"
                >
                  <div>
                    {/* Top Category */}
                    <div className="flex items-center mb-4">
                      <span className="text-[10px] font-mono text-cyan-400 bg-slate-900 px-2.5 py-1 rounded-md border border-slate-800 uppercase tracking-wider font-semibold">
                        {project.category}
                      </span>
                    </div>

                    {/* Title */}
                    <h3 className="text-xl font-heading font-bold text-white group-hover:text-cyan-300 transition-colors mb-3">
                      {project.title}
                    </h3>

                    {/* Description */}
                    <p className="text-xs sm:text-sm text-slate-400 leading-relaxed mb-6">
                      {project.description}
                    </p>
                  </div>

                  {/* View Project CTA */}
                  <div className="pt-4 border-t border-slate-800/80 flex items-center justify-between text-xs font-medium text-cyan-400 group-hover:text-cyan-300">
                    <span>Read Technical Case Study</span>
                    <FontAwesomeIcon icon={faArrowRight} className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                  </div>
                </a>
              </motion.div>
            ))}
          </AnimatePresence>
        )}
      </div>

    </div>
  );
};

