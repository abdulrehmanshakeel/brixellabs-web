import React from 'react';
import { 
  UIUXIcon, 
  WebDevIcon, 
  MobileDevIcon, 
  AIMLIcon, 
  NLPIcon, 
  ComputerVisionIcon, 
  AgenticAIIcon, 
  DataAnalyticsIcon 
} from '../assets/icons';
import { Check, Layers, ArrowRight, Cpu, Database } from 'lucide-react';
import { motion } from 'framer-motion';
import { TiltCard } from '../components/common/TiltCard';

export const ServicesPage = ({ openConsultation }) => {
  const cat1 = [
    {
      id: 'srv-uiux',
      title: 'UI/UX Design',
      desc: 'Human-centered user experience design, interactive wireframing, high-fidelity prototypes, and scalable design tokens.',
      icon: UIUXIcon,
      bullets: ['User Research & Journeys', 'Wireframing & Interactive Prototypes', 'Design System Token Architecture'],
      gradient: 'from-cyan-500/20 via-blue-500/10 to-transparent'
    },
    {
      id: 'srv-webdev',
      title: 'Web Development',
      desc: 'Scalable frontend and backend architectures with modern React, Next.js, Django, Node microservices, and distributed DBs.',
      icon: WebDevIcon,
      bullets: ['High-Performance React/Next.js', 'Django & Node Cloud APIs', 'Distributed DB & Redis Caching'],
      gradient: 'from-teal-500/20 via-cyan-500/10 to-transparent'
    },
    {
      id: 'srv-mobiledev',
      title: 'Mobile Development',
      desc: 'Native and cross-platform mobile apps for iOS and Android built for high reliability, offline sync, and smooth animations.',
      icon: MobileDevIcon,
      bullets: ['React Native & Flutter', 'Native Device Features & Sensors', 'Offline-First Cloud Sync'],
      gradient: 'from-blue-500/20 via-indigo-500/10 to-transparent'
    }
  ];

  const cat2 = [
    {
      id: 'srv-aiml',
      title: 'AI & Machine Learning',
      desc: 'Custom deep neural networks, predictive models, regression pipelines, and continuous automated model retraining.',
      icon: AIMLIcon,
      bullets: ['Custom Neural Architectures', 'Supervised & Unsupervised ML', 'Model Evaluation & Benchmarking'],
      gradient: 'from-fuchsia-500/20 via-cyan-500/10 to-transparent'
    },
    {
      id: 'srv-nlp',
      title: 'NLP, Chatbots & RAG Services',
      desc: 'Enterprise Natural Language Processing (NLP), semantic search, sentiment classification, multi-channel AI chatbots (WhatsApp, Web, Telegram), and contextual RAG pipelines.',
      icon: NLPIcon,
      bullets: ['Natural Language Processing (NLP) & Semantic Search', 'WhatsApp, Web & Telegram Chatbot Integration', 'Contextual RAG Retrieval & Custom LLM Fine-Tuning'],
      gradient: 'from-indigo-500/20 via-teal-500/10 to-transparent'
    },
    {
      id: 'srv-computervision',
      title: 'Computer Vision',
      desc: 'Real-time object detection, automated visual inspection, industrial defect classification under 14ms, and video telemetry.',
      icon: ComputerVisionIcon,
      bullets: ['YOLOv9 Real-Time Detection', 'TensorRT Edge Inference <14ms', 'Camera Stream Processing'],
      gradient: 'from-cyan-500/25 via-teal-500/15 to-transparent'
    },
    {
      id: 'srv-agenticai',
      title: 'Agentic AI & Automation',
      desc: 'Autonomous multi-agent workflows, self-healing task queues, robotic process automation, and zero-downtime API connectors.',
      icon: AgenticAIIcon,
      bullets: ['Multi-Agent Task Orchestration', 'Self-Healing Workflows', 'Zero-Downtime Pipeline Sync'],
      gradient: 'from-teal-500/25 via-indigo-500/15 to-transparent'
    }
  ];

  return (
    <div className="relative pt-32 sm:pt-40 pb-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto z-10">
      
      {/* Header */}
      <div className="text-left mb-16 space-y-3">
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-gradient-to-r from-cyan-950/80 via-[#07243c]/80 to-teal-950/80 border border-cyan-500/30 text-cyan-300 text-xs font-mono uppercase tracking-wider shadow-[0_0_20px_rgba(0,240,255,0.2)]"
        >
          <Layers className="w-3.5 h-3.5 text-cyan-400" />
          <span>Full-Spectrum Engineering</span>
        </motion.div>

        <motion.h1 
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-white tracking-tight"
        >
          Our <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-300 via-teal-300 to-indigo-400 drop-shadow-[0_0_35px_rgba(0,240,255,0.45)]">Services</span>
        </motion.h1>

        <motion.p 
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="text-base sm:text-lg text-slate-300 max-w-2xl font-normal leading-relaxed"
        >
          End-to-end technology solutions from initial concept and UI/UX design to custom AI model training and production deployment. All capabilities stay active and visible together on screen.
        </motion.p>
      </div>

      {/* Category 1: Design & Development (Cards slide in and all stay on screen) */}
      <div className="mb-24">
        <div className="flex items-center justify-between mb-8 pb-3 border-b border-cyan-500/20">
          <h2 className="text-xl sm:text-2xl font-bold text-white tracking-tight flex items-center gap-3">
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-teal-300 font-mono font-black">01.</span> Design & Full-Stack Development
          </h2>
          <span className="text-xs font-mono text-cyan-400 bg-cyan-950/80 px-2.5 py-1 rounded-lg border border-cyan-500/30">3 Active Capabilities</span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {cat1.map((service, index) => {
            const IconComp = service.icon;
            return (
              <motion.div
                key={service.id}
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
                  <div className="gradient-card rounded-3xl p-8 flex flex-col justify-between border border-cyan-500/30 group hover:border-cyan-400/80 transition-all duration-400 h-full relative overflow-hidden min-h-[380px] shadow-[0_10px_25px_rgba(0,0,0,0.5)]">
                    <div className={`absolute -top-16 -right-16 w-36 h-36 rounded-full blur-3xl opacity-35 bg-gradient-to-br ${service.gradient} pointer-events-none group-hover:opacity-75 transition-opacity`}></div>
                    
                    <div>
                      <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-[#082842] to-[#041525] border border-cyan-500/35 flex items-center justify-center text-cyan-400 group-hover:text-cyan-300 group-hover:border-cyan-400 group-hover:shadow-[0_0_30px_rgba(0,240,255,0.6)] transition-all mb-6">
                        <IconComp className="w-9 h-9 transition-transform duration-300 group-hover:scale-110" />
                      </div>

                      <h3 className="text-2xl font-bold text-white group-hover:text-cyan-300 transition-colors mb-3">
                        {service.title}
                      </h3>

                      <p className="text-sm text-slate-300 leading-relaxed mb-6">
                        {service.desc}
                      </p>
                    </div>

                    <div className="space-y-3 pt-5 border-t border-cyan-500/15">
                      {service.bullets.map((bullet, i) => (
                        <div key={i} className="flex items-center gap-3 text-xs sm:text-sm text-slate-200">
                          <div className="w-2 h-2 rounded-full bg-gradient-to-r from-cyan-400 to-teal-300 shadow-[0_0_8px_#00f0ff] flex-shrink-0"></div>
                          <span>{bullet}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </TiltCard>
              </motion.div>
            );
          })}
        </div>
      </div>

      {/* Category 2: AI & Intelligence (Cards slide in and all stay on screen) */}
      <div className="mb-24">
        <div className="flex items-center justify-between mb-8 pb-3 border-b border-cyan-500/20">
          <h2 className="text-xl sm:text-2xl font-bold text-white tracking-tight flex items-center gap-3">
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-teal-300 to-indigo-400 font-mono font-black">02.</span> AI & Intelligent Automation
          </h2>
          <span className="text-xs font-mono text-teal-300 bg-teal-950/80 px-2.5 py-1 rounded-lg border border-teal-500/30">4 Active Capabilities</span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {cat2.map((service, index) => {
            const IconComp = service.icon;
            return (
              <motion.div
                key={service.id}
                initial={{ opacity: 0, x: 60, scale: 0.92 }}
                whileInView={{ opacity: 1, x: 0, scale: 1 }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{
                  type: "spring",
                  stiffness: 260,
                  damping: 24,
                  delay: index * 0.12
                }}
                className="h-full"
              >
                <TiltCard className="h-full">
                  <div className="gradient-card rounded-3xl p-7 flex flex-col justify-between border border-cyan-500/30 group hover:border-cyan-400/80 transition-all duration-400 h-full relative overflow-hidden min-h-[380px] shadow-[0_10px_25px_rgba(0,0,0,0.5)]">
                    <div className={`absolute -top-16 -right-16 w-36 h-36 rounded-full blur-3xl opacity-35 bg-gradient-to-br ${service.gradient} pointer-events-none group-hover:opacity-75 transition-opacity`}></div>
                    
                    <div>
                      <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-[#082842] to-[#041525] border border-cyan-500/35 flex items-center justify-center text-cyan-400 group-hover:text-cyan-300 group-hover:border-cyan-400 group-hover:shadow-[0_0_30px_rgba(0,240,255,0.6)] transition-all mb-5">
                        <IconComp className="w-8 h-8 transition-transform duration-300 group-hover:scale-110" />
                      </div>

                      <h3 className="text-xl font-bold text-white group-hover:text-cyan-300 transition-colors mb-2.5">
                        {service.title}
                      </h3>

                      <p className="text-xs sm:text-sm text-slate-300 leading-relaxed mb-5">
                        {service.desc}
                      </p>
                    </div>

                    <div className="space-y-2.5 pt-4 border-t border-cyan-500/15">
                      {service.bullets.map((bullet, i) => (
                        <div key={i} className="flex items-center gap-2.5 text-xs text-slate-200">
                          <div className="w-1.5 h-1.5 rounded-full bg-gradient-to-r from-cyan-400 to-teal-300 shadow-[0_0_6px_#00f0ff] flex-shrink-0"></div>
                          <span>{bullet}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </TiltCard>
              </motion.div>
            );
          })}
        </div>
      </div>

      {/* Category 3: Data Analytics & Dashboard Creation (Python, Excel, SQL) */}
      <div className="mb-24">
        <div className="flex items-center justify-between mb-8 pb-3 border-b border-cyan-500/20">
          <h2 className="text-xl sm:text-2xl font-bold text-white tracking-tight flex items-center gap-3">
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-cyan-300 font-mono font-black">03.</span> Data Analytics & Dashboard Creation
          </h2>
          <span className="text-xs font-mono text-cyan-400 bg-cyan-950/80 px-2.5 py-1 rounded-lg border border-cyan-500/30">Python • Excel • SQL Analytics</span>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 25 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="gradient-card rounded-3xl p-8 sm:p-10 border border-cyan-500/35 shadow-2xl relative overflow-hidden"
        >
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            {/* Left Icon Graphic */}
            <div className="lg:col-span-4 flex items-center justify-center">
              <div className="w-32 h-32 sm:w-40 sm:h-40 rounded-3xl bg-gradient-to-br from-[#082e4f] to-[#041627] border border-cyan-500/40 flex items-center justify-center text-cyan-400 shadow-[0_0_40px_rgba(0,240,255,0.45)]">
                <DataAnalyticsIcon className="w-20 h-20 drop-shadow-[0_0_15px_rgba(0,240,255,0.7)]" />
              </div>
            </div>

            {/* Right Content */}
            <div className="lg:col-span-8 space-y-4">
              <h3 className="text-2xl sm:text-3xl font-bold text-white">
                Data Analytics & Custom Dashboard Creation
              </h3>
              <p className="text-sm text-slate-300 leading-relaxed">
                Transform raw business numbers and database records into clear executive foresight. We analyze your data exclusively through <strong>Python</strong>, <strong>Microsoft Excel</strong>, and <strong>SQL</strong> to build clean statistical models, automated KPI dashboards, and high-clarity reporting decks.
              </p>

              <div className="space-y-3 pt-2">
                <div className="flex items-start gap-3 text-sm text-slate-200">
                  <div className="w-2 h-2 rounded-full bg-gradient-to-r from-cyan-400 to-teal-300 shadow-[0_0_8px_#00f0ff] mt-1.5 flex-shrink-0"></div>
                  <span><strong>Python Data Analysis:</strong> Data wrangling, exploratory data analysis, statistical computation, and visualization with Pandas, NumPy, Matplotlib & Seaborn.</span>
                </div>
                <div className="flex items-start gap-3 text-sm text-slate-200">
                  <div className="w-2 h-2 rounded-full bg-gradient-to-r from-cyan-400 to-teal-300 shadow-[0_0_8px_#00f0ff] mt-1.5 flex-shrink-0"></div>
                  <span><strong>Advanced Excel Dashboards:</strong> Dynamic pivot models, multi-parameter summary tables, financial modeling, and automated executive spreadsheets.</span>
                </div>
                <div className="flex items-start gap-3 text-sm text-slate-200">
                  <div className="w-2 h-2 rounded-full bg-gradient-to-r from-cyan-400 to-teal-300 shadow-[0_0_8px_#00f0ff] mt-1.5 flex-shrink-0"></div>
                  <span><strong>SQL Database Analytics:</strong> Complex aggregation queries, window functions, relational joins, and database reporting across PostgreSQL & MySQL.</span>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>

      {/* Bottom CTA Banner with Gradient */}
      <div className="gradient-card rounded-3xl p-8 sm:p-10 border border-cyan-500/35 flex flex-col sm:flex-row items-center justify-between gap-6 shadow-2xl relative overflow-hidden">
        <div className="absolute top-0 right-0 w-96 h-96 bg-gradient-to-bl from-cyan-500/15 via-teal-500/10 to-transparent blur-3xl pointer-events-none"></div>

        <div className="relative z-10">
          <h3 className="text-2xl sm:text-3xl font-bold text-white">
            Not sure what technical architecture you need?
          </h3>
          <p className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-300 via-teal-300 to-white text-lg font-medium mt-1">
            Book a free 30-minute discovery consultation with our engineers
          </p>
        </div>

        <button
          onClick={openConsultation}
          className="relative z-10 px-8 py-4 rounded-xl bg-gradient-to-r from-cyan-400 via-teal-300 to-cyan-400 hover:from-cyan-300 hover:to-teal-200 text-[#031525] font-extrabold text-base transition-all duration-300 shadow-[0_0_30px_rgba(0,240,255,0.65)] hover:shadow-[0_0_45px_rgba(0,240,255,0.95)] hover:scale-105 active:scale-95 cursor-pointer whitespace-nowrap"
        >
          Book Consultation
        </button>
      </div>

    </div>
  );
};
