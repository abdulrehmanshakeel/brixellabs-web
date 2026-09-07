import React, { useState, useEffect, useRef } from 'react';
import { 
  UIUXIcon, 
  WebDevIcon, 
  MobileDevIcon, 
  AIMLIcon, 
  NLPIcon, 
  ComputerVisionIcon, 
  AgenticAIIcon, 
  DataAnalyticsIcon 
} from '../../assets/icons';
import { ArrowUpRight, Layers, CheckCircle2, Play, Eye } from 'lucide-react';
import { motion, AnimatePresence, useInView } from 'framer-motion';
import { TiltCard } from '../common/TiltCard';

export const servicesData = [
  {
    id: 'uiux',
    title: 'UI/UX Design',
    description: 'Human-centric UI/UX design, interactive wireframing, high-fidelity prototypes, and comprehensive multi-platform design systems.',
    icon: UIUXIcon,
    category: 'Design & Dev',
    gradient: 'from-cyan-500/20 via-blue-500/10 to-transparent'
  },
  {
    id: 'webdev',
    title: 'Web Development',
    description: 'Scalable frontend and backend architectures with modern React, Next.js, Django, Node microservices, and distributed DBs.',
    icon: WebDevIcon,
    category: 'Design & Dev',
    gradient: 'from-teal-500/20 via-cyan-500/10 to-transparent'
  },
  {
    id: 'mobiledev',
    title: 'Mobile Development',
    description: 'Native & cross-platform iOS and Android mobile solutions with React Native and Flutter built for high reliability and speed.',
    icon: MobileDevIcon,
    category: 'Design & Dev',
    gradient: 'from-blue-500/20 via-indigo-500/10 to-transparent'
  },
  {
    id: 'aiml',
    title: 'AI & Machine Learning',
    description: 'Custom machine learning models, predictive intelligence, neural classification, regression pipelines, and automated retraining.',
    icon: AIMLIcon,
    category: 'AI & Intelligence',
    gradient: 'from-fuchsia-500/20 via-cyan-500/10 to-transparent'
  },
  {
    id: 'nlp',
    title: 'NLP, Chatbots & RAG',
    description: 'Enterprise Natural Language Processing (NLP), semantic search, multi-channel AI chatbots (WhatsApp, Web, Telegram), and contextual RAG pipelines.',
    icon: NLPIcon,
    category: 'AI & Intelligence',
    gradient: 'from-indigo-500/20 via-teal-500/10 to-transparent'
  },
  {
    id: 'computervision',
    title: 'Computer Vision',
    description: 'Real-time object detection, automated visual inspection, industrial defect classification under 14ms, and edge video analytics.',
    icon: ComputerVisionIcon,
    category: 'AI & Intelligence',
    gradient: 'from-cyan-500/25 via-teal-500/15 to-transparent'
  },
  {
    id: 'agenticai',
    title: 'Agentic AI & Automation',
    description: 'Autonomous multi-agent workflows, self-healing task queues, robotic process automation, and intelligent API connectors.',
    icon: AgenticAIIcon,
    category: 'AI & Intelligence',
    gradient: 'from-teal-500/25 via-indigo-500/15 to-transparent'
  },
  {
    id: 'dataanalytics',
    title: 'Data Analytics & Dashboard Creation',
    description: 'Deep data analysis and interactive dashboard creation through Python, Excel, and SQL with automated KPI reporting.',
    icon: DataAnalyticsIcon,
    category: 'Data',
    gradient: 'from-blue-500/25 via-cyan-500/15 to-transparent'
  },
];

export const ServicesGrid = ({ navigate }) => {
  const [selectedFilter, setSelectedFilter] = useState('All');
  const [isAutoRevealing, setIsAutoRevealing] = useState(false);
  const [revealedCount, setRevealedCount] = useState(0);
  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { once: true, amount: 0.15 });

  const filterCategories = ['All', 'AI & Intelligence', 'Design & Dev', 'Data'];

  const filteredServices = selectedFilter === 'All'
    ? servicesData
    : servicesData.filter(s => s.category === selectedFilter);

  const total = filteredServices.length;

  // Progressive Sequential Slide-In Effect: triggers ONLY when user scrolls down to this section!
  useEffect(() => {
    if (!isInView) return;

    setRevealedCount(0);
    setIsAutoRevealing(true);

    let count = 0;
    const interval = setInterval(() => {
      count++;
      setRevealedCount(count);
      if (count >= filteredServices.length) {
        clearInterval(interval);
        setIsAutoRevealing(false);
      }
    }, 220); // Staggered slide-in speed

    return () => clearInterval(interval);
  }, [isInView, selectedFilter, filteredServices.length]);

  return (
    <section ref={sectionRef} className="relative py-16 sm:py-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto z-10" id="services">
      
      {/* Section Header */}
      <div className="text-center mb-10 space-y-3">
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-gradient-to-r from-cyan-950/80 via-[#07243c]/80 to-teal-950/80 border border-cyan-500/30 text-cyan-300 text-xs font-mono uppercase tracking-wider shadow-[0_0_20px_rgba(0,240,255,0.2)]"
        >
          <Layers className="w-3.5 h-3.5 text-cyan-400" />
          <span>Full-Spectrum Capabilities</span>
        </motion.div>

        <motion.h2 
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.1 }}
          className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white tracking-tight"
        >
          What We <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-300 via-teal-300 to-indigo-400 drop-shadow-[0_0_30px_rgba(0,240,255,0.4)]">Engineer & Ship</span>
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2 }}
          className="text-slate-300 text-sm sm:text-base max-w-xl mx-auto"
        >
          Watch each service slide in and stay on screen. All capabilities remain available together.
        </motion.p>

        {/* Filter Tabs */}
        <div className="flex flex-wrap items-center justify-center gap-3 pt-3">
          {filterCategories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedFilter(cat)}
              className={`relative px-5 py-2 rounded-full text-xs font-semibold transition-colors cursor-pointer ${
                selectedFilter === cat
                  ? 'text-white'
                  : 'text-slate-400 hover:text-cyan-300'
              }`}
            >
              {selectedFilter === cat && (
                <motion.div
                  layoutId="activeServiceFilter"
                  className="absolute inset-0 bg-gradient-to-r from-cyan-500/40 via-teal-500/30 to-indigo-500/30 border border-cyan-400/60 rounded-full shadow-[0_0_20px_rgba(0,240,255,0.45)] z-0"
                  transition={{ type: 'spring', stiffness: 450, damping: 35 }}
                />
              )}
              <span className="relative z-10">{cat}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Grid of Service Cards: Each Card Slides In and Stays On Screen */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {filteredServices.map((service, index) => {
          const isRevealed = index < revealedCount;
          const IconComponent = service.icon;

          return (
            <motion.div
              key={service.id}
              initial={{ opacity: 0, x: 80, scale: 0.9 }}
              animate={isRevealed ? { 
                opacity: 1, 
                x: 0, 
                scale: 1,
              } : { 
                opacity: 0, 
                x: 80, 
                scale: 0.9 
              }}
              transition={{
                type: "spring",
                stiffness: 260,
                damping: 24,
                mass: 0.8
              }}
              className="h-full"
            >
              <TiltCard
                onClick={() => {
                  navigate('/services');
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                }}
                className="h-full"
              >
                <div className="gradient-card rounded-3xl p-6 sm:p-7 flex flex-col justify-between items-center text-center group cursor-pointer border border-cyan-500/25 hover:border-cyan-400/80 transition-all duration-400 relative overflow-hidden h-full shadow-[0_10px_25px_rgba(0,0,0,0.5)] hover:shadow-[0_15px_35px_rgba(0,240,255,0.25)]">
                  
                  {/* Animated corner gradient ambient aura */}
                  <div className={`absolute -top-12 -right-12 w-28 h-28 rounded-full blur-2xl opacity-40 bg-gradient-to-br ${service.gradient} pointer-events-none group-hover:opacity-80 transition-opacity duration-500`}></div>

                  {/* Top edge gradient highlight */}
                  <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-cyan-400/60 to-transparent group-hover:via-cyan-300"></div>

                  {/* Number Badge in Top Left */}
                  <div className="w-full flex items-center justify-between mb-4">
                    <span className="text-[10px] font-mono text-cyan-400 bg-cyan-950/80 px-2 py-0.5 rounded border border-cyan-500/30 font-bold">
                      0{index + 1}
                    </span>
                    <span className="text-[10px] font-mono text-emerald-300 flex items-center gap-1">
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-400"></span>
                      ACTIVE
                    </span>
                  </div>

                  {/* Glowing Icon Container with Pulse */}
                  <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-[#082842] to-[#041525] border border-cyan-500/35 flex items-center justify-center text-cyan-400 group-hover:text-cyan-300 group-hover:border-cyan-400 group-hover:shadow-[0_0_30px_rgba(0,240,255,0.6)] transition-all duration-300 mb-4 relative">
                    <div className="absolute inset-0 rounded-2xl bg-cyan-400/15 blur-sm opacity-0 group-hover:opacity-100 transition-opacity"></div>
                    <IconComponent className="w-9 h-9 transition-transform duration-300 group-hover:scale-110 relative z-10" />
                  </div>

                  {/* Service Title */}
                  <h3 className="text-lg font-bold text-white group-hover:text-cyan-300 transition-colors mb-2">
                    {service.title}
                  </h3>

                  {/* Service Description */}
                  <p className="text-xs text-slate-400 group-hover:text-slate-300 leading-relaxed transition-colors mb-5 flex-grow">
                    {service.description}
                  </p>

                  {/* Category pill & action */}
                  <div className="w-full pt-3 border-t border-cyan-500/20 flex items-center justify-between text-xs">
                    <span className="text-[10px] font-mono text-cyan-300 bg-gradient-to-r from-cyan-950/80 to-[#07243c]/80 px-2.5 py-1 rounded-lg border border-cyan-500/30">
                      {service.category}
                    </span>
                    <div className="flex items-center gap-1 text-cyan-400 font-semibold text-[11px] group-hover:translate-x-1 transition-transform">
                      <span>Details</span>
                      <ArrowUpRight className="w-3.5 h-3.5" />
                    </div>
                  </div>
                </div>
              </TiltCard>
            </motion.div>
          );
        })}
      </div>

    </section>
  );
};
