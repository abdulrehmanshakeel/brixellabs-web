import { 
  PhoneCall, 
  Monitor, 
  Code2, 
  Rocket, 
  Clock, 
  Workflow, 
  CheckCircle2, 
  ArrowRight 
} from 'lucide-react';
import { motion } from 'framer-motion';
import { TiltCard } from '../components/common/TiltCard';

export const ProcessPage = ({ openConsultation }) => {
  const steps = [
    {
      id: 'step-01',
      num: '01',
      title: 'Discover & Scope',
      duration: '1-3 days',
      desc: 'We start with an in-depth call to understand your business objectives, data assets, and architecture constraints. Our senior engineers analyze existing infrastructure and formulate the optimal technical delivery approach.',
      icon: PhoneCall,
      deliverables: ['Requirements Brief', 'Technical Architecture Map', 'Milestone Roadmapping'],
      gradient: 'from-cyan-400 via-teal-300 to-indigo-400',
      bgGrad: 'from-cyan-500/20 to-blue-600/10'
    },
    {
      id: 'step-02',
      num: '02',
      title: 'Design & Prototype',
      duration: '3-7 days',
      desc: 'We map out the complete solution — UI/UX wireframes, system architecture, database schema, and custom AI model benchmarks tailored to your project scope.',
      icon: Monitor,
      deliverables: ['Figma High-Fi Prototype', 'API Contracts & DB Schema', 'AI Benchmark Criteria'],
      gradient: 'from-teal-300 via-cyan-400 to-blue-400',
      bgGrad: 'from-teal-500/20 to-emerald-600/10'
    },
    {
      id: 'step-03',
      num: '03',
      title: 'Build & Train',
      duration: '1-4 weeks',
      desc: 'We develop, test, and refine the product with weekly sprint demos so you can provide continuous feedback and review working code incrementally.',
      icon: Code2,
      deliverables: ['Production Web/Mobile Frontend', 'Cloud Backend & Microservices', 'Trained & Tuned AI Models'],
      gradient: 'from-blue-400 via-indigo-400 to-cyan-400',
      bgGrad: 'from-blue-500/20 to-indigo-600/10'
    },
    {
      id: 'step-04',
      num: '04',
      title: 'Launch & 24/7 SLA',
      duration: 'Ongoing',
      desc: 'We deploy the solution to your production environment and provide 24/7 telemetry monitoring and SLA support to ensure zero downtime.',
      icon: Rocket,
      deliverables: ['CI/CD Zero-Downtime Deployment', 'Telemetry & Error Monitoring', 'SLA Maintenance & Support'],
      gradient: 'from-indigo-400 via-teal-300 to-cyan-400',
      bgGrad: 'from-indigo-500/20 to-teal-600/10'
    }
  ];

  return (
    <div className="relative pt-32 sm:pt-40 pb-20 px-4 sm:px-6 lg:px-8 max-w-5xl mx-auto z-10">
      
      {/* Hero / Header */}
      <div className="text-center mb-16 space-y-4">
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-gradient-to-r from-cyan-950/80 via-[#07243c]/80 to-teal-950/80 border border-cyan-500/30 text-cyan-300 text-xs font-mono uppercase tracking-wider shadow-[0_0_20px_rgba(0,240,255,0.2)]"
        >
          <Workflow className="w-3.5 h-3.5 text-cyan-400" />
          <span>Execution Roadmap</span>
        </motion.div>

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
            How We <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-300 via-teal-300 to-indigo-400 drop-shadow-[0_0_35px_rgba(0,240,255,0.45)]">Work</span>
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
          A transparent, iterative engineering process from whiteboard architecture to production deployment. All 4 roadmap stages stay active and visible together on screen.
        </motion.p>
      </div>

      {/* 4 Process Cards Stack: All Cards Slide In and Stay Visible Together on Screen */}
      <div className="relative space-y-8">
        
        {/* Vertical glowing connector line */}
        <div className="hidden md:block absolute left-12 top-10 bottom-10 w-[2px] bg-gradient-to-b from-cyan-400 via-teal-400 to-indigo-500 opacity-40 z-0"></div>

        {steps.map((step, index) => {
          const IconComp = step.icon;
          return (
            <motion.div
              key={step.num}
              initial={{ opacity: 0, x: index % 2 === 0 ? -40 : 40, scale: 0.95 }}
              whileInView={{ opacity: 1, x: 0, scale: 1 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{
                type: "spring",
                stiffness: 260,
                damping: 24,
                delay: index * 0.12
              }}
              className="relative z-10"
            >
              <TiltCard className="h-full">
                <div className="gradient-card rounded-3xl p-6 sm:p-8 lg:p-10 border border-cyan-500/30 group hover:border-cyan-400/80 transition-all duration-400 relative overflow-hidden shadow-[0_10px_25px_rgba(0,0,0,0.5)]">
                  <div className={`absolute -top-16 -right-16 w-36 h-36 rounded-full blur-3xl opacity-35 bg-gradient-to-br ${step.bgGrad} pointer-events-none group-hover:opacity-75 transition-opacity`}></div>

                  <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6 relative z-10 mb-4">
                    
                    {/* Left: Giant Glowing Number & Icon */}
                    <div className="flex items-center gap-5 sm:gap-6 flex-shrink-0">
                      <div className={`text-5xl sm:text-6xl font-black text-transparent bg-clip-text bg-gradient-to-b ${step.gradient} font-mono drop-shadow-[0_0_25px_rgba(0,240,255,0.6)]`}>
                        {step.num}
                      </div>
                      <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-[#092b45] to-[#041525] border border-cyan-500/35 flex items-center justify-center text-cyan-400 group-hover:text-cyan-300 group-hover:border-cyan-400 group-hover:shadow-[0_0_25px_rgba(0,240,255,0.5)] transition-all">
                        <IconComp className="w-8 h-8 transition-transform duration-300 group-hover:scale-110" />
                      </div>
                    </div>

                    {/* Center: Title & Description */}
                    <div className="flex-1 space-y-2">
                      <div className="flex flex-wrap items-center gap-3">
                        <h3 className="text-2xl font-bold text-white group-hover:text-cyan-300 transition-colors">
                          {step.title}
                        </h3>
                        <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-gradient-to-r from-cyan-950/90 to-[#07243c]/90 border border-cyan-500/40 text-cyan-300 text-xs font-mono font-semibold">
                          <Clock className="w-3.5 h-3.5" />
                          {step.duration}
                        </span>
                      </div>
                      <p className="text-sm text-slate-300 leading-relaxed max-w-2xl">
                        {step.desc}
                      </p>
                    </div>

                  </div>

                  {/* Deliverable pills */}
                  <div className="mt-4 pt-4 border-t border-cyan-500/15 flex flex-wrap items-center gap-2.5 relative z-10">
                    <span className="text-xs text-transparent bg-clip-text bg-gradient-to-r from-cyan-300 to-teal-300 font-mono font-bold mr-1">
                      Deliverables:
                    </span>
                    {step.deliverables.map((item, idx) => (
                      <span key={idx} className="inline-flex items-center gap-1.5 px-3 py-1 rounded-lg bg-gradient-to-r from-cyan-950/80 to-[#07243c]/80 border border-cyan-500/30 text-xs text-slate-200">
                        <CheckCircle2 className="w-3.5 h-3.5 text-cyan-400" />
                        {item}
                      </span>
                    ))}
                  </div>

                </div>
              </TiltCard>
            </motion.div>
          );
        })}

      </div>

      {/* Bottom CTA */}
      <div className="mt-16 text-center">
        <button
          onClick={openConsultation}
          className="px-8 py-4 rounded-xl bg-gradient-to-r from-cyan-400 via-teal-300 to-cyan-400 hover:from-cyan-300 hover:to-teal-200 text-[#031525] font-extrabold text-base transition-all duration-300 shadow-[0_0_30px_rgba(0,240,255,0.65)] hover:shadow-[0_0_45px_rgba(0,240,255,0.95)] hover:scale-105 active:scale-95 cursor-pointer"
        >
          Start Your Project With Us
        </button>
      </div>

    </div>
  );
};
