import React, { useState, useEffect, useRef } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { 
  faObjectGroup, 
  faCode, 
  faMobileScreenButton, 
  faBrain, 
  faComments, 
  faEye, 
  faNetworkWired, 
  faChartSimple, 
  faArrowRight,
  faArrowUpRightFromSquare,
  faLayerGroup,
  faSpider,
  faPlug,
  faCubes
} from '@fortawesome/free-solid-svg-icons';
import { faShopify } from '@fortawesome/free-brands-svg-icons';
import { motion, useInView } from 'framer-motion';

export const servicesData = [
  {
    id: 'uiux',
    title: 'UI/UX Design',
    description: 'Figma wireframes, interactive prototypes, and design token systems.',
    icon: faObjectGroup,
    category: 'Design & Dev',
    gradient: 'from-cyan-500/20 via-blue-500/10 to-transparent'
  },
  {
    id: 'webdev',
    title: 'Web Development',
    description: 'High-speed React, Next.js, and scalable cloud microservices.',
    icon: faCode,
    category: 'Design & Dev',
    gradient: 'from-teal-500/20 via-cyan-500/10 to-transparent'
  },
  {
    id: 'customsoftware',
    title: 'Custom Software & SaaS',
    description: 'Bespoke multi-tenant software platforms engineered for 10x scale.',
    icon: faCubes,
    category: 'Design & Dev',
    gradient: 'from-blue-600/20 via-cyan-500/10 to-transparent'
  },
  {
    id: 'apidev',
    title: 'API Engineering',
    description: 'High-throughput REST/GraphQL APIs and secure database pipelines.',
    icon: faPlug,
    category: 'Design & Dev',
    gradient: 'from-indigo-500/20 via-cyan-500/10 to-transparent'
  },
  {
    id: 'mobiledev',
    title: 'Mobile Development',
    description: 'Cross-platform iOS and Android apps built with Flutter and React Native.',
    icon: faMobileScreenButton,
    category: 'Design & Dev',
    gradient: 'from-blue-500/20 via-indigo-500/10 to-transparent'
  },
  {
    id: 'shopifydev',
    title: 'Shopify Store Development',
    description: 'Custom Shopify themes, instant page speeds, and optimized checkout.',
    icon: faShopify,
    category: 'Design & Dev',
    gradient: 'from-emerald-500/20 via-teal-500/10 to-transparent'
  },
  {
    id: 'aiml',
    title: 'AI & Machine Learning',
    description: 'Custom predictive intelligence models and automated retraining pipelines.',
    icon: faBrain,
    category: 'AI & Automation',
    gradient: 'from-fuchsia-500/20 via-cyan-500/10 to-transparent'
  },
  {
    id: 'nlp',
    title: 'Smart Chatbots & Assistants',
    description: 'Bilingual WhatsApp and web conversational agents with sub-second replies.',
    icon: faComments,
    category: 'AI & Automation',
    gradient: 'from-indigo-500/20 via-teal-500/10 to-transparent'
  },
  {
    id: 'computervision',
    title: 'Computer Vision & Camera AI',
    description: 'Sub-14ms camera defect inspection and edge AI on NVIDIA Jetson.',
    icon: faEye,
    category: 'AI & Automation',
    gradient: 'from-cyan-500/25 via-teal-500/15 to-transparent'
  },
  {
    id: 'agenticai',
    title: 'AI Agents & Automations',
    description: 'Autonomous LangGraph multi-agent swarms executing business operations.',
    icon: faNetworkWired,
    category: 'AI & Automation',
    gradient: 'from-teal-500/25 via-indigo-500/15 to-transparent'
  },
  {
    id: 'dataanalytics',
    title: 'Data Analytics & Dashboards',
    description: 'Executive KPI reporting and statistical modeling in Python, SQL, and Excel.',
    icon: faChartSimple,
    category: 'Data',
    gradient: 'from-blue-500/25 via-cyan-500/15 to-transparent'
  },
  {
    id: 'webscraping',
    title: 'Web Scraping & Pipelines',
    description: 'High-volume web data extraction delivered directly into your databases.',
    icon: faSpider,
    category: 'Data',
    gradient: 'from-cyan-500/25 via-blue-500/15 to-transparent'
  },
];

export const ServicesGrid = ({ navigate }) => {
  const [selectedFilter, setSelectedFilter] = useState('All');
  const [revealedCount, setRevealedCount] = useState(0);
  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { once: true, amount: 0.15 });

  const filterCategories = ['All', 'AI & Intelligence', 'Design & Dev', 'Data'];

  const filteredServices = selectedFilter === 'All'
    ? servicesData
    : servicesData.filter(s => {
        if (selectedFilter === 'AI & Intelligence') {
          return s.category === 'AI & Automation' || s.category === 'AI & Intelligence';
        }
        return s.category === selectedFilter;
      });

  useEffect(() => {
    if (!isInView) return;
    setRevealedCount(0);
    let count = 0;
    const interval = setInterval(() => {
      count++;
      setRevealedCount(count);
      if (count >= filteredServices.length) {
        clearInterval(interval);
      }
    }, 180);
    return () => clearInterval(interval);
  }, [isInView, selectedFilter, filteredServices.length]);

  return (
    <section ref={sectionRef} className="relative py-24 sm:py-32 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto z-10" id="services">
      
      {/* Section Header */}
      <div className="text-center mb-14 sm:mb-16 space-y-4">
        {/* Big Headline in Pure Crisp White */}
        <motion.h2 
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.1 }}
          className="font-heading text-4xl sm:text-5xl lg:text-6xl font-extrabold text-white tracking-tight leading-tight"
        >
          What We Engineer & Ship
        </motion.h2>

        {/* Subtitle */}
        <motion.p
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2 }}
          className="text-slate-300 text-sm sm:text-base max-w-xl mx-auto font-normal leading-relaxed"
        >
          Enterprise engineering across artificial intelligence, scalable infrastructure, and intelligent automation.
        </motion.p>

        {/* Filter Pills with Gradient Accent */}
        <div className="flex flex-wrap items-center justify-center gap-2 pt-2">
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

      {/* Grid of Service Cards: Strict 4-Column Grid Alignment */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {filteredServices.map((service, index) => {
          const isRevealed = index < revealedCount;
          const iconObj = service.icon;

          return (
            <motion.a
              key={service.id}
              href="/services"
              initial={{ opacity: 0, y: 30 }}
              animate={isRevealed ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
              transition={{
                duration: 0.4,
                delay: index * 0.05
              }}
              className="h-full cursor-pointer focus:outline-none block no-underline"
              onClick={(e) => {
                if (navigate) {
                  e.preventDefault();
                  navigate('/services');
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                }
              }}
            >
              <div className="rounded-2xl p-6 sm:p-7 flex flex-col justify-between items-start text-left group h-full border border-slate-800/80 bg-[#030e1a]/70 hover:border-slate-700/80 transition-colors">
                
                {/* Icon Header */}
                <div className="w-full flex items-center justify-between mb-5">
                  <div className="w-12 h-12 rounded-xl bg-slate-900 border border-slate-800 flex items-center justify-center text-white transition-colors">
                    <FontAwesomeIcon icon={iconObj} className="text-lg text-white transition-transform duration-300 group-hover:scale-105" />
                  </div>
                </div>

                {/* Service Title */}
                <h3 className="font-heading text-lg font-bold text-white group-hover:text-cyan-300 transition-colors mb-2">
                  {service.title}
                </h3>

                {/* Description */}
                <p className="text-xs text-slate-400 group-hover:text-slate-300 leading-relaxed transition-colors mb-6 flex-grow">
                  {service.description}
                </p>

                {/* Category Pill & Hint */}
                <div className="w-full pt-4 border-t border-slate-800/80 flex items-center justify-between text-xs">
                  <span className="text-[10px] font-mono text-slate-400 bg-slate-900 px-2 py-0.5 rounded border border-slate-800">
                    {service.category}
                  </span>
                  <div className="flex items-center gap-1 text-slate-400 font-semibold text-[11px] group-hover:text-cyan-300 group-hover:translate-x-1 transition-all">
                    <span>View</span>
                    <FontAwesomeIcon icon={faArrowUpRightFromSquare} className="text-[10px]" />
                  </div>
                </div>

              </div>
            </motion.a>
          );
        })}
      </div>

      {/* Exactly One Button Per Section: Unified Master Style */}
      <div className="mt-14 sm:mt-16 text-center flex justify-center">
        <a
          href="/services"
          onClick={(e) => {
            if (navigate) {
              e.preventDefault();
              navigate('/services');
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }
          }}
          className="btn-primary inline-flex items-center gap-2.5 no-underline"
        >
          <span>Explore All Capabilities</span>
          <FontAwesomeIcon icon={faArrowRight} className="text-sm" />
        </a>
      </div>

    </section>
  );
};
