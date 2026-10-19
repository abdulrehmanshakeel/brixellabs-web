import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { 
  faLaptopCode, 
  faDiagramProject, 
  faCheckCircle, 
  faShieldHalved, 
  faServer, 
  faCodeBranch,
  faBolt
} from '@fortawesome/free-solid-svg-icons';
import { motion, AnimatePresence } from 'framer-motion';

import studioWorkspaceImg from '../../assets/studio_workspace.webp';
import architectureBlueprintImg from '../../assets/architecture_blueprint.webp';

export const StudioShowcase = () => {
  const [activeTab, setActiveTab] = useState('studio'); // 'studio' | 'architecture'

  const tabs = [
    {
      id: 'studio',
      label: 'Engineering Workspace',
      icon: faLaptopCode,
      tag: 'COLLABORATIVE SPRINT ENVIRONMENT'
    },
    {
      id: 'architecture',
      label: 'Systems Architecture',
      icon: faDiagramProject,
      tag: 'ENTERPRISE-GRADE BLUEPRINT'
    }
  ];

  const studioBadges = [
    {
      title: 'Direct Senior Access',
      desc: 'Collaborate with the exact engineers designing and coding your application.',
      icon: faLaptopCode,
      position: 'top-6 left-6'
    },
    {
      title: 'Automated CI/CD Quality Gates',
      desc: 'Strict linting, automated test coverage, and staged previews for every release.',
      icon: faCodeBranch,
      position: 'bottom-6 left-6'
    },
    {
      title: 'Zero Middlemen',
      desc: 'Transparent sprint logs, bi-weekly video demos, and live repository access.',
      icon: faShieldHalved,
      position: 'bottom-6 right-6'
    }
  ];

  const architectureBadges = [
    {
      title: 'High-Throughput Microservices',
      desc: 'Decoupled API gateways and distributed queue workers built with FastAPI and Node.',
      icon: faServer,
      position: 'top-6 left-6'
    },
    {
      title: 'Sub-50ms Latency',
      desc: 'Optimized PostgreSQL schemas and distributed Redis caching for instant queries.',
      icon: faBolt,
      position: 'bottom-6 left-6'
    },
    {
      title: '100% IP Transfer',
      desc: 'Clean source repositories, infrastructure-as-code, and full ownership handed over.',
      icon: faCheckCircle,
      position: 'bottom-6 right-6'
    }
  ];

  return (
    <div className="relative w-full rounded-2xl overflow-hidden bg-[#030e1a]/90 border border-slate-800/80 shadow-2xl my-8">
      
      {/* Top Bar with Mode Switcher */}
      <div className="p-4 sm:p-5 border-b border-slate-800/80 bg-[#020b14]/80 backdrop-blur-md flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="w-2.5 h-2.5 rounded-full bg-cyan-400 animate-pulse"></div>
          <div>
            <span className="text-xs font-mono font-semibold uppercase tracking-wider text-cyan-300">
              Interactive Studio Hub
            </span>
            <span className="hidden sm:inline text-slate-500 mx-2">•</span>
            <span className="text-xs text-slate-400 hidden sm:inline">
              Production Environment &amp; Core Architecture
            </span>
          </div>
        </div>

        {/* Tab Switcher */}
        <div className="flex items-center p-1 rounded-xl bg-slate-950/90 border border-slate-800 self-start sm:self-auto">
          {tabs.map((tab) => {
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`relative px-3.5 py-1.5 rounded-lg text-xs font-medium transition-all duration-300 flex items-center gap-2 cursor-pointer ${
                  isActive ? 'text-white' : 'text-slate-400 hover:text-slate-200'
                }`}
              >
                {isActive && (
                  <motion.div
                    layoutId="studioActiveTab"
                    className="absolute inset-0 rounded-lg bg-gradient-to-r from-cyan-600/30 to-blue-600/30 border border-cyan-500/40 shadow-inner"
                    transition={{ type: "spring", stiffness: 400, damping: 30 }}
                  />
                )}
                <FontAwesomeIcon icon={tab.icon} className={`text-xs relative z-10 ${isActive ? 'text-cyan-400' : 'text-slate-500'}`} />
                <span className="relative z-10">{tab.label}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Main Visual Display Area */}
      <div className="relative aspect-[16/10] sm:aspect-[21/9] w-full overflow-hidden bg-[#020b14]">
        <AnimatePresence mode="wait">
          {activeTab === 'studio' ? (
            <motion.div
              key="studio-view"
              initial={{ opacity: 0, scale: 0.98 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 1.02 }}
              transition={{ duration: 0.4 }}
              className="relative w-full h-full"
            >
              <img
                src={studioWorkspaceImg}
                alt="BrixelLabs Engineering Studio Workspace"
                width="1200"
                height="675"
                loading="lazy"
                decoding="async"
                className="w-full h-full object-cover filter brightness-[0.92] contrast-[1.05]"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#020b14] via-[#020b14]/40 to-transparent pointer-events-none" />
              <div className="absolute inset-0 bg-gradient-to-r from-[#020b14]/70 via-transparent to-[#020b14]/70 pointer-events-none" />

              {/* Floating Interactive Badge (Desktop) */}
              <div className="hidden lg:block absolute bottom-6 left-6 max-w-sm">
                <motion.div 
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2 }}
                  className="p-3.5 rounded-xl bg-slate-950/85 backdrop-blur-md border border-cyan-500/30 text-xs shadow-2xl"
                >
                  <div className="flex items-center gap-2 text-cyan-400 font-mono text-[11px] mb-1 font-semibold">
                    <span className="w-2 h-2 rounded-full bg-cyan-400"></span>
                    ACTIVE ENGINEERING WORKSPACE
                  </div>
                  <p className="text-slate-300 text-xs leading-relaxed">
                    Distributed senior engineers collaborating across real-time codebases, automated testing suites, and production deployments.
                  </p>
                </motion.div>
              </div>

              {/* Floating Spec Pill (Desktop) */}
              <div className="hidden sm:flex absolute top-6 right-6 items-center gap-2 px-3 py-1.5 rounded-full bg-slate-950/85 backdrop-blur-md border border-slate-700/60 text-xs text-slate-300">
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
                <span className="font-mono text-[11px] text-white">CI/CD: Automated Test Gates Passing</span>
              </div>
            </motion.div>
          ) : (
            <motion.div
              key="architecture-view"
              initial={{ opacity: 0, scale: 0.98 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 1.02 }}
              transition={{ duration: 0.4 }}
              className="relative w-full h-full"
            >
              <img
                src={architectureBlueprintImg}
                alt="BrixelLabs Enterprise Architecture Blueprint"
                width="1200"
                height="675"
                loading="lazy"
                decoding="async"
                className="w-full h-full object-cover filter brightness-[0.95] contrast-[1.08]"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#020b14] via-[#020b14]/30 to-transparent pointer-events-none" />
              <div className="absolute inset-0 bg-gradient-to-r from-[#020b14]/60 via-transparent to-[#020b14]/60 pointer-events-none" />

              {/* Floating Architecture Badge (Desktop) */}
              <div className="hidden lg:block absolute bottom-6 left-6 max-w-sm">
                <motion.div 
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2 }}
                  className="p-3.5 rounded-xl bg-slate-950/85 backdrop-blur-md border border-teal-500/30 text-xs shadow-2xl"
                >
                  <div className="flex items-center gap-2 text-teal-400 font-mono text-[11px] mb-1 font-semibold">
                    <span className="w-2 h-2 rounded-full bg-teal-400"></span>
                    MODULAR CLOUD TOPOLOGY
                  </div>
                  <p className="text-slate-300 text-xs leading-relaxed">
                    Designed for zero single-point failure: containerized microservices, async message queues, and high-availability database replication.
                  </p>
                </motion.div>
              </div>

              {/* Floating Architecture Spec Pill (Desktop) */}
              <div className="hidden sm:flex absolute top-6 right-6 items-center gap-2 px-3 py-1.5 rounded-full bg-slate-950/85 backdrop-blur-md border border-slate-700/60 text-xs text-slate-300">
                <span className="w-2 h-2 rounded-full bg-cyan-400 animate-pulse"></span>
                <span className="font-mono text-[11px] text-white">SLA: 99.9% Uptime Architecture</span>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Highlights Bar below visual: 3 Clean Architectural Metric Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 divide-y md:divide-y-0 md:divide-x divide-slate-800/80 bg-[#020b14] border-t border-slate-800/80">
        {(activeTab === 'studio' ? studioBadges : architectureBadges).map((item, idx) => (
          <motion.div
            key={item.title}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: idx * 0.08 }}
            className="p-5 flex items-start gap-3.5 group hover:bg-slate-900/40 transition-colors"
          >
            <div className="w-8 h-8 rounded-lg bg-cyan-950/70 border border-cyan-500/30 text-cyan-400 flex items-center justify-center text-xs flex-shrink-0 group-hover:border-cyan-400/50 transition-colors">
              <FontAwesomeIcon icon={item.icon} />
            </div>
            <div>
              <h4 className="text-sm font-semibold text-white group-hover:text-cyan-300 transition-colors">
                {item.title}
              </h4>
              <p className="text-xs text-slate-400 mt-1 leading-relaxed">
                {item.desc}
              </p>
            </div>
          </motion.div>
        ))}
      </div>

    </div>
  );
};
