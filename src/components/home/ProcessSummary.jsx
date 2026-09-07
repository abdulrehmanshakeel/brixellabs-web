import React from 'react';
import { DesignRulerPencilIcon, BuildGearSearchIcon, AutomateGearsIcon } from '../../assets/icons';
import { ArrowRight, Workflow } from 'lucide-react';
import { motion } from 'framer-motion';
import { TiltCard } from '../common/TiltCard';

export const ProcessSummary = ({ navigate }) => {
  const steps = [
    {
      id: 'step-1',
      num: '01',
      title: 'Design & Architecture',
      desc: 'We map out the complete technical blueprint — UI/UX wireframes, system architecture, database schemas, and AI neural model specifications tailored to your business goals.',
      icon: DesignRulerPencilIcon,
      gradient: 'from-cyan-400 via-teal-300 to-indigo-400',
      bgGrad: 'from-cyan-500/20 to-blue-600/10'
    },
    {
      id: 'step-2',
      num: '02',
      title: 'Build & Neural Tuning',
      desc: 'We engineer, test, and refine high-performance web/mobile codebases and train custom deep neural networks with weekly working demos and continuous feedback.',
      icon: BuildGearSearchIcon,
      gradient: 'from-teal-300 via-cyan-400 to-blue-400',
      bgGrad: 'from-teal-500/20 to-emerald-600/10'
    },
    {
      id: 'step-3',
      num: '03',
      title: 'Automate & Scale',
      desc: 'We deploy robust cloud infrastructure, automated agentic pipelines, and 24/7 telemetry monitoring so your production systems run with 99.99% uptime.',
      icon: AutomateGearsIcon,
      gradient: 'from-blue-400 via-indigo-400 to-cyan-400',
      bgGrad: 'from-blue-500/20 to-indigo-600/10'
    }
  ];

  return (
    <section className="relative py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto z-10">
      
      {/* Section Header */}
      <div className="text-center mb-14 space-y-3">
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-gradient-to-r from-cyan-950/80 via-[#07243c]/80 to-teal-950/80 border border-cyan-500/30 text-cyan-300 text-xs font-mono uppercase tracking-wider shadow-[0_0_20px_rgba(0,240,255,0.2)]"
        >
          <Workflow className="w-3.5 h-3.5 text-cyan-400" />
          <span>Execution Methodology</span>
        </motion.div>

        <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white tracking-tight">
          How We <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-300 via-teal-300 to-indigo-400 drop-shadow-[0_0_30px_rgba(0,240,255,0.4)]">Deliver Success</span>
        </h2>
        <p className="text-slate-400 text-xs sm:text-sm">Our 3-step agile engineering delivery framework. All steps stay visible together on screen.</p>
      </div>

      {/* 3 Step Cards: Slide In and All Stay Visible Together */}
      <div className="relative grid grid-cols-1 md:grid-cols-3 gap-8">
        
        {/* Horizontal Connecting Energy Beam on Desktop */}
        <div className="hidden md:block absolute top-1/2 left-16 right-16 h-[2px] bg-gradient-to-r from-cyan-400 via-teal-300 to-cyan-400 -translate-y-1/2 opacity-30 z-0"></div>

        {steps.map((step, index) => {
          const IconComp = step.icon;
          return (
            <motion.div
              key={step.num}
              initial={{ opacity: 0, x: 60, scale: 0.92 }}
              whileInView={{ opacity: 1, x: 0, scale: 1 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{
                type: "spring",
                stiffness: 260,
                damping: 24,
                delay: index * 0.15
              }}
              className="relative z-10"
            >
              <TiltCard
                onClick={() => {
                  navigate('/process');
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                }}
                className="h-full"
              >
                <div className="gradient-card rounded-3xl p-8 flex flex-col items-center text-center border border-cyan-500/25 group hover:border-cyan-400/80 cursor-pointer relative overflow-hidden transition-all duration-400 h-full shadow-[0_10px_25px_rgba(0,0,0,0.5)]">
                  
                  {/* Glowing Top Edge Highlight */}
                  <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-cyan-400 to-transparent"></div>
                  <div className={`absolute -top-16 -right-16 w-36 h-36 rounded-full blur-3xl opacity-35 bg-gradient-to-br ${step.bgGrad} pointer-events-none group-hover:opacity-75 transition-opacity`}></div>

                  {/* Giant Glowing Step Number & Icon */}
                  <div className="flex items-center justify-center gap-4 mb-6">
                    <span className={`text-6xl sm:text-7xl font-black text-transparent bg-clip-text bg-gradient-to-b ${step.gradient} drop-shadow-[0_0_25px_rgba(0,240,255,0.6)] font-mono`}>
                      {step.num}
                    </span>
                    <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-[#092b45] to-[#041627] border border-cyan-500/35 flex items-center justify-center text-cyan-400 group-hover:text-cyan-300 group-hover:border-cyan-400 group-hover:shadow-[0_0_30px_rgba(0,240,255,0.55)] transition-all">
                      <IconComp className="w-10 h-10 transition-transform duration-300 group-hover:scale-110" />
                    </div>
                  </div>

                  {/* Title */}
                  <h3 className="text-xl font-bold text-white group-hover:text-cyan-300 transition-colors mb-3">
                    {step.title}
                  </h3>

                  {/* Description */}
                  <p className="text-sm text-slate-400 group-hover:text-slate-300 leading-relaxed flex-grow mb-6">
                    {step.desc}
                  </p>

                  {/* Action hint */}
                  <div className="flex items-center gap-1.5 text-xs font-bold text-cyan-400 transition-all group-hover:text-cyan-300 group-hover:translate-x-1">
                    <span>View Methodology</span>
                    <ArrowRight className="w-3.5 h-3.5" />
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
