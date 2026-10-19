import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { 
  faLayerGroup, 
  faMicrochip, 
  faNetworkWired, 
  faDiagramProject, 
  faArrowRight, 
  faArrowUpRightFromSquare 
} from '@fortawesome/free-solid-svg-icons';
import { motion } from 'framer-motion';

export const ProcessSummary = ({ navigate }) => {
  const steps = [
    {
      num: '01',
      title: 'Design & Architecture',
      desc: 'System blueprints: interactive UI prototypes, database schemas, and custom AI contracts.',
      icon: faLayerGroup,
      gradient: 'from-cyan-400 via-teal-300 to-indigo-400',
      bgGrad: 'from-cyan-500/20 to-blue-600/10'
    },
    {
      num: '02',
      title: 'Build & Develop',
      desc: 'Production engineering across modern React, custom Shopify, mobile apps, and machine learning models.',
      icon: faMicrochip,
      gradient: 'from-teal-300 via-cyan-400 to-blue-400',
      bgGrad: 'from-teal-500/20 to-emerald-600/10'
    },
    {
      num: '03',
      title: 'Automate & Scale',
      desc: 'Zero-downtime cloud deployment, workflow automation, and 24/7 dedicated monitoring.',
      icon: faNetworkWired,
      gradient: 'from-blue-400 via-indigo-400 to-cyan-400',
      bgGrad: 'from-blue-500/20 to-indigo-600/10'
    }
  ];

  return (
    <section className="relative py-24 sm:py-32 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto z-10" id="process">
      
      {/* Section Header */}
      <div className="text-center mb-14 sm:mb-16 space-y-4 max-w-3xl mx-auto">
        {/* Big Headline in Pure Crisp White */}
        <h2 className="font-heading text-4xl sm:text-5xl lg:text-6xl font-extrabold text-white tracking-tight leading-tight">
          How We Deliver Success
        </h2>

        {/* Paragraph */}
        <p className="text-slate-300 text-sm sm:text-base font-normal leading-relaxed">
          Our 3-stage agile engineering framework built for precision, speed, and continuous feedback.
        </p>
      </div>

      {/* 3 Step Architectural Flow: Connected, No Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 lg:gap-12 relative">
        {/* Subtle Horizontal Progression Guide for Desktop */}
        <div className="hidden md:block absolute top-7 left-12 right-12 h-[1px] bg-gradient-to-r from-cyan-500/40 via-teal-500/30 to-indigo-500/40 z-0" />

        {steps.map((step, index) => {
          const iconObj = step.icon;
          return (
            <motion.a
              key={step.num}
              href="/process"
              initial={{ opacity: 0, y: 25 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{
                duration: 0.5,
                delay: index * 0.15
              }}
              onClick={(e) => {
                e.preventDefault();
                navigate('/process');
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
              className="relative z-10 flex flex-col items-start text-left group cursor-pointer focus:outline-none"
            >
              {/* Step Header with Step Indicator Node */}
              <div className="flex items-center gap-4 mb-6">
                <div className="w-14 h-14 rounded-xl bg-[#030e1a] border border-slate-700/80 group-hover:border-slate-500 flex items-center justify-center text-white transition-all shadow-sm">
                  <FontAwesomeIcon icon={iconObj} className="text-xl text-white" />
                </div>
                <div className="text-4xl sm:text-5xl font-black text-white font-mono tracking-tight">
                  {step.num}
                </div>
              </div>

              {/* Title */}
              <h3 className="font-heading text-xl font-bold text-white group-hover:text-cyan-300 transition-colors mb-3">
                {step.title}
              </h3>

              {/* Description */}
              <p className="text-sm text-slate-400 group-hover:text-slate-300 leading-relaxed mb-6">
                {step.desc}
              </p>

              {/* Inline Link */}
              <div className="mt-auto flex items-center gap-2 text-xs font-mono font-semibold text-cyan-400 group-hover:text-cyan-300 group-hover:translate-x-1 transition-all">
                <span>View Methodology</span>
                <FontAwesomeIcon icon={faArrowUpRightFromSquare} className="text-[10px]" />
              </div>
            </motion.a>
          );
        })}
      </div>

      {/* Exactly One Button Per Section: Unified Master Style */}
      <div className="mt-14 sm:mt-16 text-center flex justify-center">
        <a
          href="/process"
          onClick={(e) => {
            e.preventDefault();
            navigate('/process');
            window.scrollTo({ top: 0, behavior: 'smooth' });
          }}
          className="btn-primary inline-flex items-center gap-2.5"
        >
          <span>Explore Detailed Process</span>
          <FontAwesomeIcon icon={faArrowRight} className="text-sm" />
        </a>
      </div>

    </section>
  );
};
