import React from 'react';
import { 
  ShieldCheck, 
  FileText, 
  Wrench, 
  Terminal, 
  Code, 
  Cpu, 
  Database, 
  Users, 
  LineChart, 
  Settings, 
  Brain, 
  Eye, 
  Layers,
  ArrowRight,
  CheckCircle2
} from 'lucide-react';
import { ScheduleConsultationSection } from '../components/common/ScheduleConsultationSection';
import { motion } from 'framer-motion';
import { TiltCard } from '../components/common/TiltCard';
import { AnimatedCounter } from '../components/common/AnimatedCounter';
import { TeamVideoShowcase } from '../components/about/TeamVideoShowcase';

export const AboutPage = ({ navigate, openConsultation }) => {
  const storyPoints = [
    {
      id: 'story-1',
      title: 'Full-Spectrum Engineering',
      icon: Layers,
      text: "A dedicated engineering team offering end-to-end UI/UX, AI, automation, and data pipelines tailored for modern SMBs and high-growth enterprises.",
      gradient: "from-cyan-500/20 to-blue-600/10"
    },
    {
      id: 'story-2',
      title: 'High-Velocity Delivery',
      icon: Users,
      text: "We build and ship high-velocity AI models and web systems that accelerate revenue without the bloated overhead and delays of traditional agencies.",
      gradient: "from-teal-500/20 to-emerald-600/10"
    },
    {
      id: 'story-3',
      title: 'Cross-Disciplinary Synergy',
      icon: Eye,
      text: "Cross-disciplinary collaboration across UI/UX, Computer Vision, Edge AI, and full-stack cloud to deliver intuitive, mission-critical systems.",
      gradient: "from-indigo-500/20 to-cyan-500/10"
    },
    {
      id: 'story-4',
      title: 'Practical AI & Agentic Workflows',
      icon: Brain,
      text: "We specialize in applying state-of-the-art machine learning algorithms and LLM multi-agents to solve tangible, bottom-line business bottlenecks.",
      gradient: "from-fuchsia-500/20 to-teal-500/10"
    },
    {
      id: 'story-5',
      title: 'Real-Time Telemetry & BI',
      icon: LineChart,
      text: "End-to-end automated operations management, automated reporting, and real-time streaming telemetry for comprehensive executive visibility.",
      gradient: "from-blue-500/20 to-indigo-600/10"
    },
    {
      id: 'story-6',
      title: 'Full-Lifecycle Ownership & 24/7 SLA',
      icon: Settings,
      text: "We take full ownership from initial whiteboard system architecture to zero-downtime CI/CD deployment and ongoing 24/7 SLA maintenance.",
      gradient: "from-teal-500/20 to-cyan-600/10"
    }
  ];

  const teamCards = [
    {
      id: 'team-1',
      role: 'Full-Stack & AI Architect',
      desc: 'Architecting scalable cloud microservices, reactive frontends, and custom deep neural networks.',
      tags: ['NLP & RAG', 'PyTorch, TensorRT', 'Computer Vision', 'Agentic AI', 'FastAPI', 'PostgreSQL', 'Flutter', 'React'],
      gradient: 'from-cyan-500/25 to-blue-600/15'
    },
    {
      id: 'team-2',
      role: 'Lead Data Scientist',
      desc: 'Performing rigorous data analytics, statistical modeling, and interactive dashboard creation exclusively through Python, Excel, and SQL.',
      tags: ['Python (Pandas/NumPy)', 'Microsoft Excel', 'SQL Database Querying', 'Data Dashboards', 'Predictive Modeling', 'Statistical Analysis'],
      gradient: 'from-teal-500/25 to-emerald-600/15'
    },
    {
      id: 'team-3',
      role: 'Growth & Product Delivery',
      desc: 'Ensuring seamless client communication, sprint execution, and strategic technology roadmapping.',
      tags: ['Product Strategy', 'Agile Delivery', 'UI/UX Systems', 'Cloud Architecture', 'Client SLA'],
      gradient: 'from-indigo-500/25 to-cyan-600/15'
    }
  ];

  const values = [
    {
      id: 'val-1',
      title: 'Practical over Flashy',
      desc: 'We prioritize real business utility and solid ROI over tech fads that add unnecessary complexity or technical debt.',
      icon: ShieldCheck,
      gradient: 'from-cyan-500/25 to-teal-500/15'
    },
    {
      id: 'val-2',
      title: 'Transparent Process',
      desc: 'Clear communication, daily/weekly sprint demos, and direct access to the engineers actually building your software.',
      icon: FileText,
      gradient: 'from-teal-500/25 to-indigo-500/15'
    },
    {
      id: 'val-3',
      title: 'Built to Scale',
      desc: 'Clean, documented, maintainable code and robust architecture designed to handle 100x traffic growth seamlessly.',
      icon: Wrench,
      gradient: 'from-blue-500/25 to-cyan-500/15'
    }
  ];

  return (
    <div className="relative pt-32 sm:pt-40 pb-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto z-10">
      
      {/* Hero Header */}
      <div className="text-center mb-16 space-y-3">
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-gradient-to-r from-cyan-950/80 via-[#07243c]/80 to-teal-950/80 border border-cyan-500/30 text-cyan-300 text-xs font-mono uppercase tracking-wider shadow-[0_0_20px_rgba(0,240,255,0.2)]"
        >
          <Terminal className="w-3.5 h-3.5 text-cyan-400" />
          <span className="font-bold tracking-widest text-transparent bg-clip-text bg-gradient-to-r from-cyan-300 via-teal-300 to-white">Design · Build · Automate</span>
        </motion.div>

        <motion.h1 
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-white tracking-tight"
        >
          About <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-300 via-teal-300 to-indigo-400 drop-shadow-[0_0_35px_rgba(0,240,255,0.45)]">BrixelLabs</span>
        </motion.h1>

        <motion.p 
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="text-base sm:text-lg text-slate-300 max-w-2xl mx-auto font-normal leading-relaxed"
        >
          A global remote-first engineering studio. We <strong className="text-cyan-300 font-semibold">Design</strong> bespoke digital products, <strong className="text-teal-300 font-semibold">Build</strong> scalable cloud systems & deep AI models, and <strong className="text-indigo-300 font-semibold">Automate</strong> operational workflows.
        </motion.p>
      </div>

      {/* Metrics Banner with Gradient Cards */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-20">
        {[
          { label: 'Active Deployments', val: 50, suffix: '+', prefix: '', grad: 'from-cyan-400 to-teal-300' },
          { label: 'Computer Vision Accuracy', val: 99.8, suffix: '%', prefix: '', decimals: 1, grad: 'from-teal-300 to-cyan-400' },
          { label: 'Avg Inference Speed', val: 14, suffix: 'ms', prefix: '<', grad: 'from-cyan-300 to-indigo-300' },
          { label: 'Client SLA Uptime', val: 99.99, suffix: '%', prefix: '', decimals: 2, grad: 'from-indigo-300 to-teal-300' },
        ].map((stat, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 25 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.1 }}
            className="gradient-card rounded-3xl p-5 text-center border border-cyan-500/30"
          >
            <div className={`text-2xl sm:text-3xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r ${stat.grad} font-mono`}>
              <AnimatedCounter value={stat.val} suffix={stat.suffix} prefix={stat.prefix} decimals={stat.decimals || 0} />
            </div>
            <div className="text-xs text-slate-400 mt-1 font-medium">{stat.label}</div>
          </motion.div>
        ))}
      </div>

      {/* LIVE TEAM WORKING ON LAPTOPS VIDEO SHOWCASE */}
      <div className="mb-24">
        <div className="text-center mb-6">
          <h2 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
            Our Engineering Studio & <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-300 via-teal-300 to-indigo-400">War Room</span>
          </h2>
          <p className="text-xs sm:text-sm text-slate-400 mt-1">Live glimpse inside our AI laboratory and engineering sprints.</p>
        </div>

        {/* Team Working Video Container */}
        <TeamVideoShowcase />
      </div>

      {/* Our Story Section: All 6 Cards Slide In and Stay on Screen */}
      <div className="mb-24">
        <div className="text-center mb-10">
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
            Our Story & <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-300 via-teal-300 to-white">Philosophy</span>
          </h2>
          <p className="text-xs sm:text-sm text-slate-400 mt-2">Explore our core mission and engineering foundation.</p>
          <div className="w-20 h-1 bg-gradient-to-r from-transparent via-cyan-400 to-transparent mx-auto mt-3"></div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {storyPoints.map((item, index) => {
            const IconComp = item.icon;
            return (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, x: 60, scale: 0.92 }}
                whileInView={{ opacity: 1, x: 0, scale: 1 }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{
                  type: "spring",
                  stiffness: 260,
                  damping: 24,
                  delay: index * 0.1
                }}
                className="h-full"
              >
                <TiltCard className="h-full">
                  <div className="gradient-card rounded-3xl p-8 flex flex-col justify-between items-start border border-cyan-500/30 group hover:border-cyan-400/80 transition-all duration-400 h-full relative overflow-hidden min-h-[300px] shadow-[0_10px_25px_rgba(0,0,0,0.5)]">
                    <div className={`absolute -top-16 -right-16 w-36 h-36 rounded-full blur-3xl opacity-35 bg-gradient-to-br ${item.gradient} pointer-events-none group-hover:opacity-75 transition-opacity`}></div>

                    <div>
                      <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-[#092b45] to-[#041525] border border-cyan-500/40 flex items-center justify-center text-cyan-400 group-hover:text-cyan-300 group-hover:border-cyan-400 group-hover:shadow-[0_0_25px_rgba(0,240,255,0.6)] transition-all mb-5">
                        <IconComp className="w-7 h-7" />
                      </div>

                      <h3 className="text-xl font-bold text-white group-hover:text-cyan-300 transition-colors mb-2.5">
                        {item.title}
                      </h3>
                    </div>

                    <p className="text-xs sm:text-sm text-slate-300 group-hover:text-white leading-relaxed">
                      {item.text}
                    </p>
                  </div>
                </TiltCard>
              </motion.div>
            );
          })}
        </div>
      </div>

      {/* Our Team Section: All 3 Cards Slide In and Stay on Screen */}
      <div className="mb-24">
        <div className="text-center mb-10">
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
            Our Engineering <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-300 via-teal-300 to-indigo-400">Team</span>
          </h2>
          <p className="text-xs sm:text-sm text-slate-400 mt-2">Our senior technical leads & architecture specialties.</p>
          <div className="w-20 h-1 bg-gradient-to-r from-transparent via-cyan-400 to-transparent mx-auto mt-3"></div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {teamCards.map((member, index) => (
            <motion.div
              key={member.id}
              initial={{ opacity: 0, x: 60, scale: 0.92 }}
              whileInView={{ opacity: 1, x: 0, scale: 1 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{
                type: "spring",
                stiffness: 260,
                damping: 24,
                delay: index * 0.15
              }}
              className="h-full"
            >
              <TiltCard className="h-full">
                <div className="gradient-card rounded-3xl p-8 flex flex-col justify-between border border-cyan-500/35 group hover:border-cyan-400/80 transition-all duration-400 h-full relative overflow-hidden min-h-[380px] shadow-[0_10px_25px_rgba(0,0,0,0.5)]">
                  <div className={`absolute -top-16 -right-16 w-36 h-36 rounded-full blur-3xl opacity-35 bg-gradient-to-br ${member.gradient} pointer-events-none group-hover:opacity-75 transition-opacity`}></div>

                  <div>
                    <div className="inline-block px-3 py-1 rounded-full bg-cyan-950/80 border border-cyan-500/40 text-cyan-300 text-xs font-mono mb-3">
                      LEAD ENGINEER
                    </div>
                    <h3 className="text-2xl font-bold text-white group-hover:text-cyan-300 transition-colors mb-3">
                      {member.role}
                    </h3>
                    <p className="text-sm text-slate-300 leading-relaxed mb-6">
                      {member.desc}
                    </p>
                  </div>

                  <div className="space-y-2 pt-5 border-t border-cyan-500/20">
                    <div className="text-xs font-semibold text-transparent bg-clip-text bg-gradient-to-r from-cyan-300 to-teal-300 mb-2 uppercase tracking-wider font-mono">
                      Core Stacks & Expertise
                    </div>
                    <div className="flex flex-wrap gap-2">
                      {member.tags.map((tag, i) => (
                        <span key={i} className="px-2.5 py-1 rounded-lg bg-gradient-to-r from-cyan-950/90 to-[#07243c]/90 text-slate-200 border border-cyan-500/30 text-xs font-medium">
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </TiltCard>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Our Values Section: All 3 Cards Slide In and Stay on Screen */}
      <div className="mb-24">
        <div className="text-center mb-10">
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
            Our Core <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-300 via-teal-300 to-indigo-400">Values</span>
          </h2>
          <p className="text-xs sm:text-sm text-slate-400 mt-2">Foundational engineering principles.</p>
          <div className="w-20 h-1 bg-gradient-to-r from-transparent via-cyan-400 to-transparent mx-auto mt-3"></div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {values.map((val, index) => {
            const ValIcon = val.icon;
            return (
              <motion.div
                key={val.id}
                initial={{ opacity: 0, x: 60, scale: 0.92 }}
                whileInView={{ opacity: 1, x: 0, scale: 1 }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{
                  type: "spring",
                  stiffness: 260,
                  damping: 24,
                  delay: index * 0.15
                }}
                className="h-full"
              >
                <TiltCard className="h-full">
                  <div className="gradient-card rounded-3xl p-8 flex flex-col items-center text-center border border-cyan-500/35 group hover:border-cyan-400/80 transition-all duration-400 h-full relative overflow-hidden min-h-[320px] shadow-[0_10px_25px_rgba(0,0,0,0.5)]">
                    <div className={`absolute -top-16 -right-16 w-36 h-36 rounded-full blur-3xl opacity-35 bg-gradient-to-br ${val.gradient} pointer-events-none group-hover:opacity-75 transition-opacity`}></div>

                    <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-[#092b45] to-[#041525] border border-cyan-500/40 flex items-center justify-center text-cyan-400 group-hover:text-cyan-300 group-hover:border-cyan-400 group-hover:shadow-[0_0_30px_rgba(0,240,255,0.6)] transition-all mb-6">
                      <ValIcon className="w-8 h-8" />
                    </div>
                    <h3 className="text-2xl font-bold text-white group-hover:text-cyan-300 transition-colors mb-3">
                      {val.title}
                    </h3>
                    <p className="text-sm text-slate-300 group-hover:text-white leading-relaxed">
                      {val.desc}
                    </p>
                  </div>
                </TiltCard>
              </motion.div>
            );
          })}
        </div>
      </div>

      {/* Schedule Free Consultation */}
      <ScheduleConsultationSection />

    </div>
  );
};
