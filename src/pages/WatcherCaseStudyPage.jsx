import React, { useState } from 'react';
import { 
  ShieldCheck, 
  Smartphone, 
  Brain, 
  AlertTriangle, 
  Activity, 
  Lock, 
  Eye, 
  CheckCircle2, 
  BellRing, 
  Cpu, 
  Server, 
  ArrowRight,
  Filter,
  Layers,
  FileText
} from 'lucide-react';
import { motion } from 'framer-motion';
import { TiltCard } from '../components/common/TiltCard';
import { projectImages } from '../assets/projects';

export const WatcherCaseStudyPage = ({ openConsultation }) => {
  const [activeAlertFilter, setActiveAlertFilter] = useState('all');

  const alertFeeds = [
    { id: 'a1', type: 'CONTENT', title: 'Age-Inappropriate YouTube Stream', time: '12m ago', severity: 'warning', desc: 'Child (12yo) accessed content tagged with mature themes outside parental baseline.' },
    { id: 'a2', type: 'BROWSER', title: 'Malicious Domain Blocked', time: '45m ago', severity: 'critical', desc: 'Real-time ML classifier intercepted gambling portal (bet365.com) and diverted browser.' },
    { id: 'a3', type: 'TIME', title: 'Extended Late-Night Activity', time: '2h ago', severity: 'info', desc: 'Device unlocked past scheduled bedtime window (10:30 PM). Automated sleep nudge sent.' }
  ];

  const techStack = [
    'LangGraph (Agent Decision Engine)',
    'Flutter (Cross-Platform Mobile)',
    'Kotlin (Native Android Integration)',
    'Machine Learning (Activity Classifier)',
    'Django REST Framework',
    'Python',
    'PostgreSQL',
    'WebSockets (Live Telemetry)'
  ];

  const corePillars = [
    {
      icon: Brain,
      title: 'Agentic AI Decision Engine',
      desc: 'Built on LangGraph, the multi-agent engine evaluates contextual risk scores and triggers escalations, parental summaries, or instant lockouts without requiring constant human intervention.'
    },
    {
      icon: Activity,
      title: 'Real-Time ML Classification',
      desc: 'Edge & cloud neural models continuously analyze web URLs, app telemetry, and screen patterns, differentiating between safe educational browsing and harmful triggers.'
    },
    {
      icon: Smartphone,
      title: 'Flutter & Kotlin Mobile App',
      desc: 'A seamless, battery-optimized mobile application for parents featuring real-time activity charts, remote policy controls, and push notifications across iOS and Android.'
    },
    {
      icon: Server,
      title: 'Django Central Nervous System',
      desc: 'High-throughput Django REST backend orchestrating secure device pairing, ML inference dispatch, agent routing, and encrypted behavioral logs.'
    }
  ];

  return (
    <div className="relative pt-28 sm:pt-36 pb-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto z-10">
      
      {/* Mock Browser URL Bar */}
      <div className="gradient-card rounded-2xl p-2.5 px-4 mb-8 border border-cyan-500/25 flex items-center justify-between text-xs text-slate-400 max-w-2xl mx-auto">
        <div className="flex items-center gap-2">
          <div className="flex gap-1.5">
            <div className="w-2.5 h-2.5 rounded-full bg-red-500/80"></div>
            <div className="w-2.5 h-2.5 rounded-full bg-yellow-500/80"></div>
            <div className="w-2.5 h-2.5 rounded-full bg-green-500/80"></div>
          </div>
          <span className="font-mono text-slate-300 ml-2">brixellabs.com/case-studies/the-watcher</span>
        </div>
        <span className="text-emerald-400 font-semibold font-mono text-[11px]">AI CHILD SAFETY SYSTEM</span>
      </div>

      {/* Hero Section */}
      <div className="text-center mb-14 space-y-4">
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-gradient-to-r from-emerald-950/80 via-[#07243c]/80 to-cyan-950/80 border border-emerald-500/30 text-emerald-300 text-xs font-mono uppercase tracking-wider shadow-[0_0_20px_rgba(52,211,153,0.2)]"
        >
          <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
          <span>Case Study · AI Child Safety & Mobile Intelligence</span>
        </motion.div>

        <motion.h1 
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-white tracking-tight"
        >
          The Watcher — <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-300 via-teal-300 to-cyan-400 drop-shadow-[0_0_35px_rgba(52,211,153,0.45)]">AI-Powered Child Monitoring System</span>
        </motion.h1>

        <motion.p 
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="text-base sm:text-lg text-slate-300 max-w-3xl mx-auto font-normal leading-relaxed"
        >
          An autonomous child protection platform combining real-time machine learning activity classification with LangGraph agentic reasoning to safeguard minors online without intrusive, rigid blockers.
        </motion.p>

        {/* Quick Tech Badges */}
        <div className="flex flex-wrap items-center justify-center gap-2 pt-2">
          {techStack.map((tech, i) => (
            <span key={i} className="px-3 py-1 rounded-lg bg-[#062426]/90 text-emerald-300 border border-emerald-500/30 text-xs font-mono">
              {tech}
            </span>
          ))}
        </div>
      </div>

      {/* Production Video Screenshots Gallery */}
      <div className="mb-16">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h3 className="text-xl font-bold text-white flex items-center gap-2">
              <Smartphone className="w-5 h-5 text-emerald-400" />
              Live Mobile Application Capture
            </h3>
            <p className="text-xs text-slate-400">Cropped interface captures from parent companion app</p>
          </div>
          <span className="text-xs font-mono text-emerald-400 bg-emerald-950/70 px-3 py-1 rounded border border-emerald-500/30">
            Flutter + Kotlin Engine
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
          <TiltCard className="h-full">
            <div className="gradient-card rounded-3xl p-6 border border-emerald-500/30 h-full flex flex-col justify-between">
              <div className="rounded-2xl overflow-hidden border border-emerald-500/20 mb-4 bg-[#0a2024] flex items-center justify-center">
                <img 
                  src={projectImages.watcherBrowsing} 
                  alt="The Watcher Browsing Monitoring Screen" 
                  className="w-full max-h-96 object-contain hover:scale-105 transition-transform duration-500"
                />
              </div>
              <div>
                <div className="flex items-center justify-between mb-1">
                  <h4 className="text-base font-bold text-emerald-300">Real-Time Browsing Monitoring</h4>
                  <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-emerald-950 text-emerald-300 border border-emerald-500/30">ML Labeled</span>
                </div>
                <p className="text-xs text-slate-300 leading-relaxed">
                  Contextually classifies URLs into Safe vs. Malicious (e.g. gambling/betting) and displays instantaneous policy status for parents.
                </p>
              </div>
            </div>
          </TiltCard>

          <TiltCard className="h-full">
            <div className="gradient-card rounded-3xl p-6 border border-cyan-500/30 h-full flex flex-col justify-between">
              <div className="rounded-2xl overflow-hidden border border-cyan-500/20 mb-4 bg-[#0a1e28] flex items-center justify-center">
                <img 
                  src={projectImages.watcherAlerts} 
                  alt="The Watcher Alert Dashboard Screen" 
                  className="w-full max-h-96 object-contain hover:scale-105 transition-transform duration-500"
                />
              </div>
              <div>
                <div className="flex items-center justify-between mb-1">
                  <h4 className="text-base font-bold text-cyan-300">Contextual Alert Dashboard</h4>
                  <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-cyan-950 text-cyan-300 border border-cyan-500/30">LangGraph Agent</span>
                </div>
                <p className="text-xs text-slate-300 leading-relaxed">
                  Generates natural language risk explanations (e.g. age-inappropriate & violence triggers) with actionable recommendations.
                </p>
              </div>
            </div>
          </TiltCard>
        </div>
      </div>

      {/* Core Architectural Pillars */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-16">
        {corePillars.map((pillar, i) => {
          const Icon = pillar.icon;
          return (
            <div key={i} className="gradient-card rounded-3xl p-6 sm:p-8 border border-emerald-500/25 space-y-3 hover:border-emerald-400/50 transition-colors">
              <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-emerald-500/20 to-teal-500/10 border border-emerald-500/30 flex items-center justify-center text-emerald-300">
                <Icon className="w-6 h-6" />
              </div>
              <h4 className="text-lg font-bold text-white">{pillar.title}</h4>
              <p className="text-sm text-slate-300 leading-relaxed">{pillar.desc}</p>
            </div>
          );
        })}
      </div>

      {/* Problem vs Solution */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
        <div className="gradient-card rounded-3xl p-8 border border-cyan-500/30">
          <h3 className="text-2xl font-bold text-white mb-4">The Challenge</h3>
          <p className="text-sm sm:text-base text-slate-300 leading-relaxed">
            In today's digital era, children are exposed to smartphones at ever-younger ages. Parents cannot manually scrutinize hours of daily screen time, and conventional parental control tools rely on blunt keyword blocklists that miss nuanced risks or frustrate kids with false flags.
          </p>
        </div>

        <div className="gradient-card rounded-3xl p-8 border border-emerald-500/30">
          <h3 className="text-2xl font-bold text-white mb-4">Our Intelligent Solution</h3>
          <p className="text-sm sm:text-base text-slate-300 leading-relaxed">
            The Watcher pairs ML activity classification with LangGraph agentic reasoning. Instead of rigid rules, the AI understands contextual patterns (repeated exposure to mature themes, sudden late-night spikes), autonomously decides escalation thresholds, and compiles executive summaries for parents.
          </p>
        </div>
      </div>

      {/* Impact & Use Cases */}
      <div className="gradient-card rounded-3xl p-8 border border-teal-500/30 mb-16">
        <h3 className="text-xl font-bold text-white mb-6 flex items-center gap-2">
          <CheckCircle2 className="w-5 h-5 text-emerald-400" />
          Key Impact & Enterprise Use Cases
        </h3>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 text-xs sm:text-sm">
          <div className="p-4 rounded-2xl bg-[#041a22] border border-emerald-500/20">
            <h5 className="font-bold text-emerald-300 mb-1">Parental Peace of Mind</h5>
            <p className="text-slate-300">Continuous digital protection without the burden of constant manual screen checking.</p>
          </div>
          <div className="p-4 rounded-2xl bg-[#041a22] border border-emerald-500/20">
            <h5 className="font-bold text-teal-300 mb-1">Early Pattern Detection</h5>
            <p className="text-slate-300">Identifies harmful or unusual browsing habits before they develop into serious risks.</p>
          </div>
          <div className="p-4 rounded-2xl bg-[#041a22] border border-emerald-500/20">
            <h5 className="font-bold text-cyan-300 mb-1">AI-Generated Summaries</h5>
            <p className="text-slate-300">Delivers weekly digestible digests of child learning, hobbies, and safety flags.</p>
          </div>
          <div className="p-4 rounded-2xl bg-[#041a22] border border-emerald-500/20">
            <h5 className="font-bold text-indigo-300 mb-1">Institutional Scale</h5>
            <p className="text-slate-300">Architected for school tablet fleets, child advocacy networks, and family telecom packages.</p>
          </div>
        </div>
      </div>

      {/* CTA Footer */}
      <div className="gradient-card rounded-3xl p-8 sm:p-12 border border-emerald-500/40 text-center relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-emerald-500/10 via-teal-500/10 to-cyan-500/10"></div>
        <div className="relative z-10 space-y-4 max-w-2xl mx-auto">
          <h3 className="text-2xl sm:text-3xl font-extrabold text-white">
            Developing an Intelligent ML & Mobile Solution?
          </h3>
          <p className="text-slate-300 text-sm sm:text-base">
            BrixelLabs builds full-stack cross-platform apps with deep on-device and cloud machine learning pipelines.
          </p>
          <button
            onClick={openConsultation}
            className="mt-4 px-8 py-4 rounded-xl bg-gradient-to-r from-emerald-400 via-teal-300 to-cyan-400 hover:from-emerald-300 hover:to-teal-200 text-[#021319] font-extrabold text-sm uppercase tracking-wider transition-all duration-300 shadow-[0_0_25px_rgba(52,211,153,0.4)] hover:shadow-[0_0_40px_rgba(52,211,153,0.8)] cursor-pointer"
          >
            Consult with our AI & Mobile Engineers
          </button>
        </div>
      </div>

    </div>
  );
};
