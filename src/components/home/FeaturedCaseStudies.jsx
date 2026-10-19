import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { 
  faArrowRight, 
  faArrowUpRightFromSquare,
  faBrain,
  faEye,
  faShieldHalved,
  faComments,
  faChartSimple
} from '@fortawesome/free-solid-svg-icons';
import { motion } from 'framer-motion';

export const featuredProjects = [
  {
    id: 'noesis',
    num: '01',
    title: 'Noesis',
    tag: 'AI Assistant',
    category: 'Smart Learning Platform',
    icon: faBrain,
    metric: 'LLaMA 3.3 70B · Adaptive Engine',
    description: 'Autonomous AI study platform generating research-verified notes and adaptive quizzes in under 3 seconds.',
    link: '/case-studies/noesis',
    tags: ['Adaptive Quizzes', 'Multi-Step RAG', 'Verified Sources']
  },
  {
    id: 'threadeye',
    num: '02',
    title: 'ThreadEye',
    tag: 'Computer Vision',
    category: 'Smart Camera Vision',
    icon: faEye,
    metric: '120 FPS · 99.4% Defect Accuracy',
    description: 'Sub-14ms computer vision system inspecting textile fabric at 120 FPS with 99.8% flaw detection accuracy.',
    link: '/case-studies/threadeye',
    tags: ['Edge Camera AI', 'Low-Latency (<8ms)', 'Automated Stop Signal']
  },
  {
    id: 'the-watcher',
    num: '03',
    title: 'The Watcher',
    tag: 'Mobile App',
    category: 'Mobile Safety & AI',
    icon: faShieldHalved,
    metric: 'iOS & Android · Zero Battery Drain',
    description: 'On-device child safety mobile engine with 99.4% threat filtering and zero background battery drain.',
    link: '/case-studies/the-watcher',
    tags: ['On-Device Inference', 'Real-Time Alerts', '100% Privacy']
  },
  {
    id: 'frontdesk-ai',
    num: '04',
    title: 'FrontDesk AI',
    tag: 'Smart Chatbot',
    category: 'WhatsApp & Booking AI',
    icon: faComments,
    metric: '24/7 Availability · <1s Reply Speed',
    description: 'Bilingual WhatsApp assistant automating calendar bookings and patient triage with sub-second response times.',
    link: '/case-studies/frontdesk-ai',
    tags: ['Bilingual Roman Urdu/EN', 'Calendar Sync', 'Instant Reservations']
  },
  {
    id: 'getscry',
    num: '05',
    title: 'GetScry',
    tag: 'E-Commerce AI',
    category: 'E-Commerce Sales AI',
    icon: faChartSimple,
    metric: '+34% Lift · Real-Time Scoring',
    description: 'Real-time e-commerce intent engine delivering a +34% checkout conversion surge with sub-35ms scoring.',
    link: '/case-studies/getscry',
    tags: ['Cart Intent Scoring', 'Dynamic Triggers', 'Shopify & Headless']
  }
];

export const FeaturedCaseStudies = ({ navigate }) => {
  return (
    <section className="relative py-24 sm:py-32 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto z-10" id="case-studies">
      
      {/* Background Ambient Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[400px] bg-cyan-500/5 blur-[120px] pointer-events-none -z-10" />

      {/* Section Header */}
      <div className="text-center mb-14 sm:mb-16 space-y-4 max-w-3xl mx-auto">
        <h2 className="font-heading text-4xl sm:text-5xl lg:text-6xl font-extrabold text-white tracking-tight leading-tight">
          Featured Case Studies
        </h2>

        <p className="text-slate-300 text-sm sm:text-base font-normal leading-relaxed">
          Production AI models, edge computer vision, and predictive ML systems shipped to market.
        </p>
      </div>

      {/* Cardless Architectural Spec Directory (Divided by Technical Precision Rules) */}
      <div className="divide-y divide-slate-800/80 border-y border-slate-800/80">
        {featuredProjects.map((project, index) => (
          <motion.a
            key={project.id}
            href={project.link}
            initial={{ opacity: 0, y: 25 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{
              duration: 0.45,
              delay: index * 0.07
            }}
            onClick={(e) => {
              e.preventDefault();
              navigate(project.link);
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            className="group relative cursor-pointer py-7 sm:py-8 lg:py-9 px-4 sm:px-6 transition-all duration-300 hover:bg-gradient-to-r hover:from-cyan-950/20 hover:via-slate-900/30 hover:to-transparent block no-underline"
          >
            {/* Active Left Indicator Accent Line */}
            <div className="absolute left-0 top-0 bottom-0 w-[3px] bg-gradient-to-b from-cyan-400 to-teal-400 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-r" />

            <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6 lg:gap-8">
              
              {/* Left Identity: Icon & Title */}
              <div className="flex items-center gap-4 sm:gap-5 lg:w-[28%] shrink-0">
                {/* Minimalist Glowing Icon Box */}
                <div className="w-12 h-12 rounded-xl bg-slate-900/90 border border-slate-800 flex items-center justify-center text-white group-hover:border-cyan-400/50 group-hover:scale-105 group-hover:shadow-[0_0_15px_rgba(0,240,255,0.25)] transition-all duration-300 shrink-0">
                  <FontAwesomeIcon icon={project.icon} className="text-base text-white" />
                </div>

                {/* Title */}
                <h3 className="font-heading text-xl sm:text-2xl font-bold text-white group-hover:text-cyan-300 transition-colors">
                  {project.title}
                </h3>
              </div>

              {/* Center Column: Editorial Description */}
              <div className="flex-1 lg:px-6">
                <p className="text-sm text-slate-300/90 leading-relaxed font-normal group-hover:text-slate-200 transition-colors">
                  {project.description}
                </p>
              </div>

              {/* Right Column: Interactive Professional Action */}
              <div className="lg:w-[22%] shrink-0 flex items-center justify-between lg:justify-end pt-3 lg:pt-0 border-t border-slate-800/50 lg:border-t-0">
                <div className="inline-flex items-center gap-3 group-hover:translate-x-1 transition-transform duration-300">
                  <span className="text-xs sm:text-sm font-semibold tracking-wide text-slate-400 group-hover:text-white transition-colors duration-200">
                    Read Case Study
                  </span>
                  <div className="w-10 h-10 rounded-full border border-slate-800/90 bg-slate-900/80 flex items-center justify-center text-slate-400 group-hover:border-cyan-400/70 group-hover:text-cyan-300 group-hover:bg-cyan-500/10 group-hover:shadow-[0_0_20px_rgba(0,240,255,0.3)] transition-all duration-300">
                    <FontAwesomeIcon 
                      icon={faArrowRight} 
                      className="text-xs transition-transform duration-300 group-hover:translate-x-0.5" 
                    />
                  </div>
                </div>
              </div>

            </div>
          </motion.a>
        ))}
      </div>

      {/* Unified Master CTA Button */}
      <div className="mt-14 sm:mt-16 text-center flex justify-center">
        <button
          onClick={() => {
            navigate('/case-studies');
            window.scrollTo({ top: 0, behavior: 'smooth' });
          }}
          className="btn-primary flex items-center gap-2.5"
        >
          <span>Explore All Case Studies</span>
          <FontAwesomeIcon icon={faArrowRight} className="text-sm" />
        </button>
      </div>

    </section>
  );
};
