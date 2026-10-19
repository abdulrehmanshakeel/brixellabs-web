import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { 
  faPhone, 
  faDesktop, 
  faCode, 
  faRocket, 
  faClock, 
  faNetworkWired, 
  faCircleCheck,
  faArrowRight
} from '@fortawesome/free-solid-svg-icons';
import { motion } from 'framer-motion';
import { FAQSection } from '../components/common/FAQSection';

export const ProcessPage = ({ navigate, openConsultation }) => {
  const steps = [
    {
      id: 'step-01',
      num: '01',
      title: 'Discover & Scope',
      duration: '1-3 days',
      desc: 'We start with an in-depth call to understand your business objectives, data assets, and architecture constraints. Our senior engineers analyze existing infrastructure and formulate the optimal technical delivery approach.',
      icon: faPhone,
      deliverables: ['Requirements Brief', 'Technical Architecture Map', 'Milestone Roadmapping'],
      gradient: 'from-cyan-400 via-teal-300 to-indigo-400',
      bgGrad: 'from-cyan-500/20 to-blue-600/10'
    },
    {
      id: 'step-02',
      num: '02',
      title: 'Design & Prototype',
      duration: '3-7 days',
      desc: 'We map out the complete technical blueprint: UI/UX wireframes, Shopify storefront designs, API contracts, database schemas, or automated data extraction targets.',
      icon: faDesktop,
      deliverables: ['Figma High-Fi Prototype', 'API Contracts & DB Schema', 'AI Benchmark Criteria'],
      gradient: 'from-teal-300 via-cyan-400 to-blue-400',
      bgGrad: 'from-teal-500/20 to-emerald-600/10'
    },
    {
      id: 'step-03',
      num: '03',
      title: 'Build & Train',
      duration: '1-4 weeks',
      desc: 'We develop, test, and ship your solution with weekly sprint demos—building custom Shopify storefronts, high-throughput APIs, automated scraping pipelines, and fine-tuned AI models.',
      icon: faCode,
      deliverables: ['Production Web & Shopify Stores', 'APIs, Scraping & Cloud Backends', 'Trained & Tuned AI Models'],
      gradient: 'from-blue-400 via-indigo-400 to-cyan-400',
      bgGrad: 'from-blue-500/20 to-indigo-600/10'
    },
    {
      id: 'step-04',
      num: '04',
      title: 'Launch & Dedicated Support',
      duration: 'Ongoing',
      desc: 'We launch your project smoothly to the live environment and provide continuous monitoring and dedicated support to ensure everything runs reliably.',
      icon: faRocket,
      deliverables: ['Smooth Zero-Downtime Launch', 'Live Performance & Error Monitoring', 'Dedicated Maintenance & Support'],
      gradient: 'from-indigo-400 via-teal-300 to-cyan-400',
      bgGrad: 'from-indigo-500/20 to-teal-600/10'
    }
  ];

  return (
    <div className="relative pt-32 sm:pt-40 pb-20 px-4 sm:px-6 lg:px-8 max-w-5xl mx-auto z-10">
      
      {/* Hero / Header */}
      <div className="text-center mb-16 space-y-4">
        {/* Title with glowing cyber conduits */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.1 }}
          className="flex items-center justify-center gap-4 sm:gap-6"
        >
          <div className="hidden sm:flex items-center gap-1.5 opacity-60">
            <div className="w-12 h-[2px] bg-gradient-to-r from-transparent to-cyan-400"></div>
            <div className="w-2 h-2 rounded-full bg-cyan-400 shadow-[0_0_8px_#00f0ff]"></div>
          </div>

          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-white tracking-tight">
            How We Work
          </h1>

          <div className="hidden sm:flex items-center gap-1.5 opacity-60">
            <div className="w-2 h-2 rounded-full bg-cyan-400 shadow-[0_0_8px_#00f0ff]"></div>
            <div className="w-12 h-[2px] bg-gradient-to-l from-transparent to-cyan-400"></div>
          </div>
        </motion.div>

        <motion.p
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="text-base sm:text-lg text-slate-300 max-w-xl mx-auto font-normal leading-relaxed"
        >
          A transparent, iterative engineering process from whiteboard architecture to production deployment.
        </motion.p>
      </div>

      {/* 4 Process Stages: Connected Timeline (No Cards) */}
      <div className="relative mb-24 border-t border-slate-800/80 divide-y divide-slate-800/80">
        <h2 className="sr-only">4-Stage Iterative Delivery Methodology</h2>

        {steps.map((step, index) => {
          return (
            <motion.div
              key={step.num}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: index * 0.1 }}
              className="py-12 sm:py-16"
            >
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
                
                {/* Left: Stage Number & Duration */}
                <div className="lg:col-span-3 flex lg:flex-col items-center lg:items-start justify-between gap-4">
                  <div className="text-4xl sm:text-5xl font-black text-white font-mono tracking-tight">
                    {step.num}
                  </div>
                  <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-md bg-slate-900 border border-slate-800 text-cyan-400 text-xs font-mono font-semibold">
                    <FontAwesomeIcon icon={faClock} className="w-3 h-3 text-white" />
                    {step.duration}
                  </span>
                </div>

                {/* Center & Right: Title & Description */}
                <div className="lg:col-span-9">
                  <h3 className="text-2xl sm:text-3xl font-bold text-white tracking-tight mb-3">
                    {step.title}
                  </h3>
                  <p className="text-base text-slate-300 leading-relaxed max-w-3xl">
                    {step.desc}
                  </p>
                </div>

              </div>
            </motion.div>
          );
        })}
      </div>

      {/* FAQ Section */}
      <FAQSection openConsultation={openConsultation} showCta={false} />

      {/* Bottom CTA Banner with Luminous Gradient */}
      <div className="gradient-card rounded-3xl p-8 sm:p-12 border border-cyan-500/35 flex flex-col md:flex-row items-center justify-between gap-8 shadow-2xl relative overflow-hidden mt-16 text-center md:text-left">
        <div className="absolute top-0 right-0 w-96 h-96 bg-gradient-to-bl from-cyan-500/15 via-teal-500/10 to-transparent blur-3xl pointer-events-none"></div>

        <div className="relative z-10 max-w-xl">

          <h2 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
            Start Your Project With Us
          </h2>
          <p className="text-slate-300 text-sm sm:text-base mt-2 leading-relaxed">
            Have an architectural question or ready to scope your project? Our lead engineers provide immediate feasibility feedback and delivery roadmaps.
          </p>
        </div>

        <div className="relative z-10 flex-shrink-0">
          <button
            onClick={openConsultation}
            className="btn-primary !px-8 !py-4 !text-base flex items-center gap-2.5 shadow-[0_0_30px_rgba(0,240,255,0.4)] hover:shadow-[0_0_45px_rgba(0,240,255,0.7)]"
          >
            <span>Start Your Project With Us</span>
            <FontAwesomeIcon icon={faArrowRight} className="text-sm" />
          </button>
        </div>
      </div>

    </div>
  );
};
