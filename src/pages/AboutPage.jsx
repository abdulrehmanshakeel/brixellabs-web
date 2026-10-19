import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { 
  faShieldHalved, 
  faKey,
  faWrench,
  faUsers,
  faCompass,
  faBullseye,
  faCheck,
  faArrowUpRightFromSquare
} from '@fortawesome/free-solid-svg-icons';
import { faGithub, faLinkedin } from '@fortawesome/free-brands-svg-icons';
import { ScheduleConsultationSection } from '../components/common/ScheduleConsultationSection';
import { motion } from 'framer-motion';

export const AboutPage = ({ navigate, openConsultation }) => {
  // Core pillars without boxed cards (Open Architectural Grid)
  const corePillars = [
    {
      id: 'pillar-1',
      num: '01',
      title: 'Direct Senior Access',
      subtitle: 'Zero Middlemen',
      icon: faUsers,
      desc: 'Communicate directly with the senior engineers coding your application. Zero account managers, ticket queues, or translation lag.',
      tag: 'TRANSPARENCY'
    },
    {
      id: 'pillar-2',
      num: '02',
      title: '100% IP & Code Ownership',
      subtitle: 'Zero Vendor Lock-in',
      icon: faKey,
      desc: 'Full Git repository, database schemas, and trained model weights handed over on day one. You own everything we build.',
      tag: 'INDEPENDENCE'
    },
    {
      id: 'pillar-3',
      num: '03',
      title: 'Pragmatic, Durable Systems',
      subtitle: 'Utility Over Hype',
      icon: faWrench,
      desc: 'We engineer maintainable software tailored to solve real business bottlenecks and scale gracefully through 10x traffic.',
      tag: 'CRAFTSMANSHIP'
    }
  ];

  const teamCards = [
    {
      id: 'team-1',
      name: 'Shahzaib Ali',
      initials: 'SA',
      role: 'Founder & Principal Systems Architect',
      focus: 'Distributed Systems, Real-Time Edge Vision & Cloud Infra',
      credentials: 'BS Computer Science · 6+ Yrs Engineering · PyTorch & React Specialist',
      desc: 'Architect behind sub-14ms YOLOv8 edge vision engines and distributed FastAPI/React microservices. Specialized in high-concurrency state machines, LangGraph agent swarms, and scalable cloud architectures.',
      tags: ['React', 'FastAPI', 'LangGraph', 'PyTorch', 'PostgreSQL', 'Docker', 'TensorRT'],
      github: 'https://github.com/brixellabs',
      linkedin: 'https://www.linkedin.com/company/brixellabs',
      status: 'Founder & Technical Lead'
    },
    {
      id: 'team-2',
      name: 'Danyal Ehsan',
      initials: 'DE',
      role: 'Lead Data & Machine Learning Engineer',
      focus: 'Distributed Scrapers, Predictive Modeling & Applied AI',
      credentials: 'MS Data Science & AI · Distributed Harvester Specialist',
      desc: 'Expert in high-throughput data extraction using Playwright/Scrapy cluster topologies, feature store design, and XGBoost/SHAP real-time conversion models operating under 35ms inference latency.',
      tags: ['Python', 'Web Scraping', 'XGBoost', 'Playwright', 'Scrapy', 'Redis', 'SQL'],
      github: 'https://github.com/brixellabs',
      linkedin: 'https://www.linkedin.com/company/brixellabs',
      status: 'Pipeline & ML Lead'
    },
    {
      id: 'team-3',
      name: 'Sufyan Latif',
      initials: 'SL',
      role: 'Senior Solutions & Frontend Architect',
      focus: 'Modern Web Performance, Cross-Platform Mobile & UX Architecture',
      credentials: 'Senior UI/UX Engineer · Core Web Vitals Specialist',
      desc: 'Specialized in ultra-responsive React SPAs, sub-2s First Contentful Paint optimization, zero layout shift (CLS < 0.01), and cross-platform Flutter applications with offline-first state synchronization.',
      tags: ['React', 'Next.js', 'Flutter', 'TypeScript', 'Tailwind CSS', 'Vite', 'Core Web Vitals'],
      github: 'https://github.com/brixellabs',
      linkedin: 'https://www.linkedin.com/company/brixellabs',
      status: 'Solutions & Frontend Lead'
    }
  ];

  return (
    <div className="relative pt-32 sm:pt-40 pb-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto z-10">
      
      {/* 1. Clean Executive Header */}
      <div className="text-center mb-16 space-y-4 max-w-4xl mx-auto">
        <motion.h1 
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-white tracking-tight leading-tight"
        >
          Built by Engineers.<br className="hidden sm:inline" /> Driven by Results.
        </motion.h1>

        <motion.p 
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="text-base sm:text-lg text-slate-300 max-w-2xl mx-auto font-normal leading-relaxed"
        >
          BrixelLabs is an independent engineering studio. We architect high-performance web applications, custom Shopify stores, and practical AI systems that drive measurable commercial ROI.
        </motion.p>
      </div>

      {/* 3. Our Vision & Our Mission: Open Seamless Split Layout (NO CARDS, PURE WHITE ICONS) */}
      <div className="mb-28">
        <div className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
            Our Vision &amp; Our Mission
          </h2>
          <p className="text-sm text-slate-400 mt-2 max-w-xl mx-auto">
            The core philosophy guiding why we build, how we operate, and the commercial impact we deliver.
          </p>
        </div>

        {/* Seamless Open Split Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 border-t border-slate-800/80 pt-12 items-start">
          
          {/* Section 3A: Our Vision (Open layout, no boxed card container) */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4 }}
            className="space-y-6"
          >
            <div className="w-12 h-12 rounded-2xl bg-slate-900 border border-slate-800 text-white flex items-center justify-center text-xl shadow-lg">
              <FontAwesomeIcon icon={faCompass} className="text-white" />
            </div>

            <div>
              <h3 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight mb-2">
                Our Vision
              </h3>
              <p className="text-cyan-300 text-sm font-medium">
                Democratizing enterprise-grade software engineering without agency bloat or vendor lock-in.
              </p>
            </div>

            <p className="text-slate-300 text-sm sm:text-base leading-relaxed font-normal">
              We envision a future where ambitious companies can deploy high-performing web apps, custom Shopify stores, and practical AI tools without paying inflated agency retainers or getting trapped in black-box proprietary code.
            </p>

            {/* Core Tenets with pure white checkmarks */}
            <div className="space-y-4 pt-4 border-t border-slate-800/60">
              <div className="flex items-start gap-3.5">
                <div className="w-5 h-5 rounded-full bg-slate-900 border border-slate-700 text-white flex items-center justify-center text-[10px] mt-0.5 flex-shrink-0">
                  <FontAwesomeIcon icon={faCheck} className="text-white" />
                </div>
                <div>
                  <h4 className="text-sm font-semibold text-white">100% Client Code Independence</h4>
                  <p className="text-xs text-slate-400 mt-0.5">Full Git repositories, clean database schemas, and trained models handed over on day one.</p>
                </div>
              </div>

              <div className="flex items-start gap-3.5">
                <div className="w-5 h-5 rounded-full bg-slate-900 border border-slate-700 text-white flex items-center justify-center text-[10px] mt-0.5 flex-shrink-0">
                  <FontAwesomeIcon icon={faCheck} className="text-white" />
                </div>
                <div>
                  <h4 className="text-sm font-semibold text-white">Built for 10x Scale</h4>
                  <p className="text-xs text-slate-400 mt-0.5">Clean, modular architectures documented for human developers to maintain and scale with confidence.</p>
                </div>
              </div>
            </div>

            <div className="pt-3 flex items-center gap-3 text-xs text-slate-400">
              <span className="w-1.5 h-1.5 rounded-full bg-white"></span>
              <span className="font-mono text-[11px] text-white font-semibold">CORE STANDARD: CLEAN CODE &amp; ZERO LOCK-IN</span>
            </div>
          </motion.div>

          {/* Section 3B: Our Mission (Open layout, no boxed card container) */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4, delay: 0.1 }}
            className="space-y-6 lg:border-l lg:border-slate-800/80 lg:pl-16"
          >
            <div className="w-12 h-12 rounded-2xl bg-slate-900 border border-slate-800 text-white flex items-center justify-center text-xl shadow-lg">
              <FontAwesomeIcon icon={faBullseye} className="text-white" />
            </div>

            <div>
              <h3 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight mb-2">
                Our Mission
              </h3>
              <p className="text-cyan-300 text-sm font-medium">
                Delivering production-grade software on schedule with measurable commercial ROI.
              </p>
            </div>

            <p className="text-slate-300 text-sm sm:text-base leading-relaxed font-normal">
              Our daily mission is simple: partner directly with founders and product teams to translate complex business objectives into dependable, high-converting digital products with transparent communication and zero middlemen.
            </p>

            {/* Core Commitments with pure white checkmarks */}
            <div className="space-y-4 pt-4 border-t border-slate-800/60">
              <div className="flex items-start gap-3.5">
                <div className="w-5 h-5 rounded-full bg-slate-900 border border-slate-700 text-white flex items-center justify-center text-[10px] mt-0.5 flex-shrink-0">
                  <FontAwesomeIcon icon={faCheck} className="text-white" />
                </div>
                <div>
                  <h4 className="text-sm font-semibold text-white">Direct Senior Engineer Access</h4>
                  <p className="text-xs text-slate-400 mt-0.5">You communicate directly with the senior developers building your software. Zero account managers.</p>
                </div>
              </div>

              <div className="flex items-start gap-3.5">
                <div className="w-5 h-5 rounded-full bg-slate-900 border border-slate-700 text-white flex items-center justify-center text-[10px] mt-0.5 flex-shrink-0">
                  <FontAwesomeIcon icon={faCheck} className="text-white" />
                </div>
                <div>
                  <h4 className="text-sm font-semibold text-white">Measurable Commercial Impact</h4>
                  <p className="text-xs text-slate-400 mt-0.5">Every system is engineered to solve a specific business problem—cutting labor hours or unlocking new revenue.</p>
                </div>
              </div>
            </div>

            <div className="pt-3 flex items-center gap-3 text-xs text-slate-400">
              <span className="w-1.5 h-1.5 rounded-full bg-white"></span>
              <span className="font-mono text-[11px] text-white font-semibold">CORE STANDARD: DELIVERED ON SCHEDULE</span>
            </div>
          </motion.div>

        </div>
      </div>

      {/* 4. Core Principles: Open Architectural Columns (NO BOXED CARDS, PURE WHITE ICONS) */}
      <div className="mb-28">
        <div className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
            How We Partner With You
          </h2>
          <p className="text-sm text-slate-400 mt-2 max-w-xl mx-auto">
            Our non-negotiable engineering principles designed to protect your investment and accelerate delivery.
          </p>
        </div>

        {/* Open 3-Column Layout with Top Borders */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10 lg:gap-12">
          {corePillars.map((pillar, index) => (
            <motion.div
              key={pillar.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: index * 0.1 }}
              className="pt-8 border-t border-slate-800/80 flex flex-col justify-between group hover:border-slate-600 transition-colors"
            >
              <div>
                <div className="w-12 h-12 rounded-2xl bg-slate-900 border border-slate-800 text-white flex items-center justify-center text-lg shadow-md group-hover:border-slate-700 transition-colors mb-6">
                  <FontAwesomeIcon icon={pillar.icon} className="text-white" />
                </div>

                <h3 className="text-xl font-bold text-white mb-1 group-hover:text-cyan-300 transition-colors">
                  {pillar.title}
                </h3>
                <div className="text-xs text-white/80 font-mono mb-3 font-medium">
                  {pillar.subtitle}
                </div>

                <p className="text-sm text-slate-400 leading-relaxed font-normal">
                  {pillar.desc}
                </p>
              </div>

              <div className="pt-6 mt-8 border-t border-slate-800/60 flex items-center justify-between text-xs text-slate-400">
                <span className="font-mono text-[10px] text-white uppercase font-semibold">STANDARD PRACTICE</span>
                <span>Active on Day 1</span>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* 5. Technical Leadership: Open Profile Grid (NO BOXED CARDS, PURE WHITE ICONS) */}
      <div className="mb-28">
        <div className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
            Our Engineering Leads
          </h2>
          <p className="text-sm text-slate-400 mt-2 max-w-xl mx-auto">
            Senior technical builders directly involved in project scoping, architecture, and code delivery.
          </p>
        </div>

        {/* Open 3-Column Profile Layout */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10 lg:gap-12">
          {teamCards.map((member, index) => (
            <motion.div
              key={member.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: index * 0.1 }}
              className="pt-8 border-t border-slate-800/80 flex flex-col justify-between group hover:border-slate-600 transition-colors"
            >
              <div>
                <div className="flex items-center justify-between mb-5">
                  <div className="w-12 h-12 rounded-2xl bg-slate-900 border border-slate-800 text-white font-mono font-bold flex items-center justify-center text-sm shadow-md">
                    {member.initials}
                  </div>
                  <div className="flex items-center gap-2">
                    {member.github && (
                      <a 
                        href={member.github} 
                        target="_blank" 
                        rel="noopener noreferrer" 
                        aria-label={`${member.name} GitHub profile`}
                        className="w-8 h-8 rounded-lg bg-slate-900/80 border border-slate-800 text-slate-400 hover:text-white hover:border-slate-600 flex items-center justify-center text-sm transition-colors"
                      >
                        <FontAwesomeIcon icon={faGithub} />
                      </a>
                    )}
                    {member.linkedin && (
                      <a 
                        href={member.linkedin} 
                        target="_blank" 
                        rel="noopener noreferrer" 
                        aria-label={`${member.name} LinkedIn profile`}
                        className="w-8 h-8 rounded-lg bg-slate-900/80 border border-slate-800 text-slate-400 hover:text-cyan-400 hover:border-cyan-800 flex items-center justify-center text-sm transition-colors"
                      >
                        <FontAwesomeIcon icon={faLinkedin} />
                      </a>
                    )}
                  </div>
                </div>

                <div className="space-y-1">
                  <h3 className="text-xl font-bold text-white group-hover:text-cyan-300 transition-colors">
                    {member.name}
                  </h3>
                  <div className="text-xs text-cyan-400 font-semibold tracking-wide">
                    {member.role}
                  </div>
                </div>

                <div className="mt-2.5 mb-3 inline-block">
                  <span className="text-[11px] font-mono text-slate-300 bg-slate-900 border border-slate-800 rounded px-2.5 py-1">
                    {member.credentials}
                  </span>
                </div>

                <div className="text-xs text-slate-400 font-mono mb-3">
                  Focus: {member.focus}
                </div>

                <p className="text-xs sm:text-sm text-slate-300 leading-relaxed font-normal mb-5">
                  {member.desc}
                </p>

                {/* Technical Stack Tags */}
                <div className="flex flex-wrap gap-1.5 pt-4 border-t border-slate-800/60">
                  {member.tags.map((tag) => (
                    <span 
                      key={tag} 
                      className="text-[10px] font-mono text-slate-400 bg-slate-900/60 border border-slate-800 px-2 py-0.5 rounded"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* 6. Schedule Free Consultation Section */}
      <ScheduleConsultationSection />

    </div>
  );
};
