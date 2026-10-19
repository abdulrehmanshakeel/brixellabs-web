import React, { useEffect } from 'react';
import { 
  UIUXIcon, 
  WebDevIcon, 
  MobileDevIcon, 
  AIMLIcon, 
  NLPIcon, 
  ComputerVisionIcon, 
  AgenticAIIcon, 
  DataAnalyticsIcon,
  ShopifyDevIcon,
  WebScrapingIcon,
  APIDevIcon,
  CustomSoftwareIcon
} from '../assets/icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowRight } from '@fortawesome/free-solid-svg-icons';
import { motion } from 'framer-motion';
import { TiltCard } from '../components/common/TiltCard';
import { FAQSection } from '../components/common/FAQSection';

export const ServicesPage = ({ navigate, openConsultation }) => {
  useEffect(() => {
    if (window.location.hash) {
      const el = document.querySelector(window.location.hash);
      if (el) {
        setTimeout(() => el.scrollIntoView({ behavior: 'smooth' }), 100);
      }
    }
  }, []);
  const cat1 = [
    {
      id: 'srv-uiux',
      title: 'UI/UX Design',
      desc: 'Human-centered user experience design, interactive wireframing, high-fidelity prototypes, and scalable design tokens.',
      icon: UIUXIcon,
      caseStudyLink: '/case-studies/noesis',
      caseStudyTitle: 'See Noesis UI/UX Case Study',
      bullets: ['User Research & Journeys', 'Wireframing & Interactive Prototypes', 'Design System Token Architecture'],
      gradient: 'from-cyan-500/30 via-blue-500/20 to-transparent'
    },
    {
      id: 'srv-webdev',
      title: 'Web Development',
      desc: 'Scalable frontend and backend architectures with modern React, Next.js, Django, Node microservices, and distributed DBs.',
      icon: WebDevIcon,
      caseStudyLink: '/case-studies/getscry',
      caseStudyTitle: 'See GetScry Web Platform',
      bullets: ['High-Performance React/Next.js', 'Django & Node Cloud APIs', 'Distributed DB & Redis Caching'],
      gradient: 'from-teal-500/30 via-cyan-500/20 to-transparent'
    },
    {
      id: 'srv-saas',
      title: 'Custom Software & SaaS Development',
      desc: 'End-to-end bespoke software engineering and cloud-native multi-tenant SaaS platforms built for high availability, security, and scalability.',
      icon: CustomSoftwareIcon,
      bullets: ['Multi-Tenant SaaS Architecture', 'Custom Business & Enterprise Software', 'Scalable Cloud Microservices & DBs'],
      gradient: 'from-blue-600/30 via-cyan-500/20 to-transparent'
    },
    {
      id: 'srv-mobiledev',
      title: 'Mobile Development',
      desc: 'Native and cross-platform mobile apps for iOS and Android built for high reliability, offline sync, and smooth animations.',
      icon: MobileDevIcon,
      caseStudyLink: '/case-studies/the-watcher',
      caseStudyTitle: 'See The Watcher Mobile App',
      bullets: ['React Native & Flutter', 'Native Device Features & Sensors', 'Offline-First Cloud Sync'],
      gradient: 'from-blue-500/30 via-indigo-500/20 to-transparent'
    },
    {
      id: 'srv-shopify',
      title: 'Shopify Store Development',
      desc: 'Custom Shopify stores with modern designs, lightning-fast loading speeds, and smooth checkout experiences.',
      icon: ShopifyDevIcon,
      bullets: ['Custom Shopify Store Design', 'Fast Loading & Checkout', 'Payment Gateways & App Integrations'],
      gradient: 'from-emerald-500/30 via-teal-500/20 to-transparent'
    },
    {
      id: 'srv-apidev',
      title: 'API Development & Integration',
      desc: 'High-performance custom REST & GraphQL APIs, secure database communication, and seamless integration into existing systems and legacy architectures.',
      icon: APIDevIcon,
      bullets: ['Custom REST & GraphQL APIs', 'Existing System & Legacy Integration', 'High-Throughput & Secure Endpoints'],
      gradient: 'from-indigo-500/30 via-cyan-500/20 to-transparent'
    }
  ];

  const cat2 = [
    {
      id: 'srv-aiml',
      title: 'AI & Machine Learning',
      desc: 'Custom AI and predictive models that automate manual tasks, make accurate forecasts, and deliver actionable business insights.',
      icon: AIMLIcon,
      caseStudyLink: '/case-studies/getscry',
      caseStudyTitle: 'See GetScry ML Case Study',
      bullets: ['Smart Business Automation', 'Predictive Analysis', 'Tailored AI Solutions'],
      gradient: 'from-fuchsia-500/30 via-cyan-500/20 to-transparent'
    },
    {
      id: 'srv-nlp',
      title: 'Smart Chatbots & Virtual Assistants',
      desc: 'Smart AI assistants for WhatsApp and your website that answer customer questions and handle bookings 24/7.',
      icon: NLPIcon,
      caseStudyLink: '/case-studies/frontdesk-ai',
      caseStudyTitle: 'See FrontDesk AI WhatsApp Bot',
      bullets: ['WhatsApp & Website Chatbots', 'Instant 24/7 Customer Support', 'Answers from Your Documents'],
      gradient: 'from-indigo-500/30 via-teal-500/20 to-transparent'
    },
    {
      id: 'srv-computervision',
      title: 'Computer Vision & Camera AI',
      desc: 'Smart camera AI that detects objects, spots production defects, and automates visual inspections in real time.',
      icon: ComputerVisionIcon,
      caseStudyLink: '/case-studies/threadeye',
      caseStudyTitle: 'See ThreadEye Inspection Study',
      bullets: ['Instant Defect Detection', 'Camera & Image Recognition', 'Automated Visual Inspection'],
      gradient: 'from-cyan-500/30 via-teal-500/20 to-transparent'
    },
    {
      id: 'srv-agenticai',
      title: 'AI Agents & AI Automations',
      desc: 'Autonomous multi-agent workflows, tool-calling loops, and custom AI automations engineered with LangGraph to execute complex business tasks 24/7.',
      icon: AgenticAIIcon,
      caseStudyLink: '/case-studies/noesis',
      caseStudyTitle: 'See Noesis Study Assistant',
      bullets: ['Autonomous Multi-Agent Systems (LangGraph)', 'Custom AI Tool-Calling & Workflows', '24/7 Self-Operating Business Automations'],
      gradient: 'from-teal-500/30 via-indigo-500/20 to-transparent'
    }
  ];

  return (
    <div className="relative pt-32 sm:pt-40 pb-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto z-10">
      
      {/* Header */}
      <div className="text-left mb-16 space-y-3">
        <motion.h1 
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-white tracking-tight"
        >
          Our Services
        </motion.h1>

        <motion.p 
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="text-base sm:text-lg text-slate-300 max-w-2xl font-normal leading-relaxed"
        >
          End-to-end technology solutions from initial concept and UI/UX design to custom AI model training and production deployment.
        </motion.p>
      </div>

      {/* Category 1: Design & Development */}
      <div className="mb-24">
        <div className="mb-8 pb-3 border-b border-cyan-500/25">
          <h2 className="text-xl sm:text-2xl font-bold text-white tracking-tight flex items-center gap-3">
            Design &amp; Full-Stack Development
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {cat1.map((service, index) => {
            const IconComp = service.icon;
            return (
              <motion.div
                key={service.id}
                id={service.id}
                initial={{ opacity: 0, x: 60, scale: 0.92 }}
                whileInView={{ opacity: 1, x: 0, scale: 1 }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{
                  type: "spring",
                  stiffness: 260,
                  damping: 24,
                  delay: index * 0.1
                }}
                className="h-full scroll-mt-24"
              >
                <TiltCard className="h-full">
                  <div className="gradient-card rounded-3xl p-7 flex flex-col justify-between border border-cyan-500/30 group hover:border-cyan-400/80 transition-all duration-400 h-full relative overflow-hidden min-h-[380px] shadow-[0_10px_25px_rgba(0,0,0,0.5)]">
                    {/* Glowing Ambient Gradient Orb */}
                    <div className={`absolute -top-16 -right-16 w-36 h-36 rounded-full blur-3xl opacity-35 bg-gradient-to-br ${service.gradient} pointer-events-none group-hover:opacity-75 transition-opacity`}></div>
                    
                    <div>
                      {/* Luminous Cyber Icon Box */}
                      <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-[#082842] to-[#041525] border border-cyan-500/35 flex items-center justify-center text-white group-hover:border-cyan-400 group-hover:shadow-[0_0_30px_rgba(0,240,255,0.6)] transition-all mb-5">
                        <IconComp className="w-8 h-8 text-white transition-transform duration-300 group-hover:scale-110" />
                      </div>

                      <h3 className="text-xl font-bold text-white group-hover:text-cyan-300 transition-colors mb-2.5">
                        {service.title}
                      </h3>

                      <p className="text-xs sm:text-sm text-slate-300 leading-relaxed mb-5">
                        {service.desc}
                      </p>
                    </div>

                    <div className="space-y-2.5 pt-4 border-t border-cyan-500/20">
                      {service.bullets.map((bullet, i) => (
                        <div key={i} className="flex items-center gap-2.5 text-xs text-slate-200">
                          <div className="w-1.5 h-1.5 rounded-full bg-gradient-to-r from-cyan-400 to-teal-300 shadow-[0_0_6px_#00f0ff] flex-shrink-0"></div>
                          <span>{bullet}</span>
                        </div>
                      ))}

                      {navigate && service.caseStudyLink && (
                        <a
                          href={service.caseStudyLink}
                          onClick={(e) => {
                            e.preventDefault();
                            navigate(service.caseStudyLink);
                            window.scrollTo({ top: 0, behavior: 'smooth' });
                          }}
                          className="pt-2 text-xs font-mono text-cyan-400 hover:text-cyan-300 flex items-center gap-1.5 transition-colors cursor-pointer group/link no-underline"
                        >
                          <span>{service.caseStudyTitle}</span>
                          <FontAwesomeIcon icon={faArrowRight} className="w-3.5 h-3.5 text-cyan-400 group-hover/link:translate-x-1 transition-transform" />
                        </a>
                      )}
                    </div>
                  </div>
                </TiltCard>
              </motion.div>
            );
          })}
        </div>
      </div>

      {/* Category 2: AI & Intelligence */}
      <div className="mb-24">
        <div className="mb-8 pb-3 border-b border-cyan-500/25">
          <h2 className="text-xl sm:text-2xl font-bold text-white tracking-tight flex items-center gap-3">
            AI &amp; Intelligent Automation
          </h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {cat2.map((service, index) => {
            const IconComp = service.icon;
            return (
              <motion.div
                key={service.id}
                id={service.id}
                initial={{ opacity: 0, x: 60, scale: 0.92 }}
                whileInView={{ opacity: 1, x: 0, scale: 1 }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{
                  type: "spring",
                  stiffness: 260,
                  damping: 24,
                  delay: index * 0.1
                }}
                className="h-full scroll-mt-24"
              >
                <TiltCard className="h-full">
                  <div className="gradient-card rounded-3xl p-7 flex flex-col justify-between border border-cyan-500/30 group hover:border-cyan-400/80 transition-all duration-400 h-full relative overflow-hidden min-h-[380px] shadow-[0_10px_25px_rgba(0,0,0,0.5)]">
                    {/* Glowing Ambient Gradient Orb */}
                    <div className={`absolute -top-16 -right-16 w-36 h-36 rounded-full blur-3xl opacity-35 bg-gradient-to-br ${service.gradient} pointer-events-none group-hover:opacity-75 transition-opacity`}></div>
                    
                    <div>
                      {/* Luminous Cyber Icon Box */}
                      <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-[#082842] to-[#041525] border border-cyan-500/35 flex items-center justify-center text-white group-hover:border-cyan-400 group-hover:shadow-[0_0_30px_rgba(0,240,255,0.6)] transition-all mb-5">
                        <IconComp className="w-8 h-8 text-white transition-transform duration-300 group-hover:scale-110" />
                      </div>

                      <h3 className="text-xl font-bold text-white group-hover:text-cyan-300 transition-colors mb-2.5">
                        {service.title}
                      </h3>

                      <p className="text-xs sm:text-sm text-slate-300 leading-relaxed mb-5">
                        {service.desc}
                      </p>
                    </div>

                    <div className="space-y-2.5 pt-4 border-t border-cyan-500/20">
                      {service.bullets.map((bullet, i) => (
                        <div key={i} className="flex items-center gap-2.5 text-xs text-slate-200">
                          <div className="w-1.5 h-1.5 rounded-full bg-gradient-to-r from-cyan-400 to-teal-300 shadow-[0_0_6px_#00f0ff] flex-shrink-0"></div>
                          <span>{bullet}</span>
                        </div>
                      ))}

                      {navigate && service.caseStudyLink && (
                        <a
                          href={service.caseStudyLink}
                          onClick={(e) => {
                            e.preventDefault();
                            navigate(service.caseStudyLink);
                            window.scrollTo({ top: 0, behavior: 'smooth' });
                          }}
                          className="pt-2 text-xs font-mono text-cyan-400 hover:text-cyan-300 flex items-center gap-1.5 transition-colors cursor-pointer group/link no-underline"
                        >
                          <span>{service.caseStudyTitle}</span>
                          <FontAwesomeIcon icon={faArrowRight} className="w-3.5 h-3.5 text-cyan-400 group-hover/link:translate-x-1 transition-transform" />
                        </a>
                      )}
                    </div>
                  </div>
                </TiltCard>
              </motion.div>
            );
          })}
        </div>
      </div>

      {/* Category 3: Data Analytics & Web Scraping */}
      <div className="mb-24">
        <div className="mb-8 pb-3 border-b border-cyan-500/25">
          <h2 className="text-xl sm:text-2xl font-bold text-white tracking-tight flex items-center gap-3">
            Data Analytics &amp; Web Scraping
          </h2>
        </div>

        <div className="space-y-8">
          {/* Card 1: Data Analytics */}
          <motion.div
            id="srv-analytics"
            initial={{ opacity: 0, y: 25 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="gradient-card rounded-3xl p-8 sm:p-10 border border-cyan-500/35 shadow-2xl relative overflow-hidden scroll-mt-24"
          >
            {/* Luminous ambient glow */}
            <div className="absolute -top-20 -right-20 w-72 h-72 rounded-full blur-3xl opacity-35 bg-gradient-to-br from-blue-500/30 to-cyan-400/20 pointer-events-none"></div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center relative z-10">
              {/* Left Icon Graphic */}
              <div className="lg:col-span-3 flex items-center justify-center">
                <div className="w-28 h-28 sm:w-36 sm:h-36 rounded-3xl bg-gradient-to-br from-[#082e4f] to-[#041627] border border-cyan-500/40 flex items-center justify-center text-white shadow-[0_0_40px_rgba(0,240,255,0.45)]">
                  <DataAnalyticsIcon className="w-16 h-16 sm:w-20 sm:h-20 text-white drop-shadow-[0_0_15px_rgba(0,240,255,0.7)]" />
                </div>
              </div>

              {/* Right Content */}
              <div className="lg:col-span-9 space-y-4">
                <h3 className="text-2xl sm:text-3xl font-bold text-white">
                  Data Analytics &amp; Custom Dashboard Creation
                </h3>
                <p className="text-sm text-slate-300 leading-relaxed">
                  Transform raw business numbers and database records into clear executive foresight. We analyze your data exclusively through <strong>Python</strong>, <strong>Microsoft Excel</strong>, and <strong>SQL</strong> to build clean statistical models, automated KPI dashboards, and high-clarity reporting decks.
                </p>

                <div className="space-y-3 pt-2">
                  <div className="flex items-start gap-3 text-sm text-slate-200">
                    <div className="w-2 h-2 rounded-full bg-gradient-to-r from-cyan-400 to-teal-300 shadow-[0_0_8px_#00f0ff] mt-1.5 flex-shrink-0"></div>
                    <span><strong>Python Data Analysis:</strong> Data wrangling, exploratory data analysis, statistical computation, and visualization with Pandas, NumPy, Matplotlib &amp; Seaborn.</span>
                  </div>
                  <div className="flex items-start gap-3 text-sm text-slate-200">
                    <div className="w-2 h-2 rounded-full bg-gradient-to-r from-cyan-400 to-teal-300 shadow-[0_0_8px_#00f0ff] mt-1.5 flex-shrink-0"></div>
                    <span><strong>Advanced Excel Dashboards:</strong> Dynamic pivot models, multi-parameter summary tables, financial modeling, and automated executive spreadsheets.</span>
                  </div>
                  <div className="flex items-start gap-3 text-sm text-slate-200">
                    <div className="w-2 h-2 rounded-full bg-gradient-to-r from-cyan-400 to-teal-300 shadow-[0_0_8px_#00f0ff] mt-1.5 flex-shrink-0"></div>
                    <span><strong>SQL Database Analytics:</strong> Complex aggregation queries, window functions, relational joins, and database reporting across PostgreSQL &amp; MySQL.</span>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Card 2: Web Scraping & Data Extraction */}
          <motion.div
            id="srv-webscraping"
            initial={{ opacity: 0, y: 25 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="gradient-card rounded-3xl p-8 sm:p-10 border border-cyan-500/35 shadow-2xl relative overflow-hidden scroll-mt-24"
          >
            {/* Luminous ambient glow */}
            <div className="absolute -top-20 -right-20 w-72 h-72 rounded-full blur-3xl opacity-35 bg-gradient-to-br from-amber-500/30 to-orange-400/20 pointer-events-none"></div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center relative z-10">
              {/* Left Icon Graphic */}
              <div className="lg:col-span-3 flex items-center justify-center">
                <div className="w-28 h-28 sm:w-36 sm:h-36 rounded-3xl bg-gradient-to-br from-[#082e4f] to-[#041627] border border-cyan-500/40 flex items-center justify-center text-white shadow-[0_0_40px_rgba(0,240,255,0.45)]">
                  <WebScrapingIcon className="w-16 h-16 sm:w-20 sm:h-20 text-white drop-shadow-[0_0_15px_rgba(0,240,255,0.7)]" />
                </div>
              </div>

              {/* Right Content */}
              <div className="lg:col-span-9 space-y-4">
                <h3 className="text-2xl sm:text-3xl font-bold text-white">
                  Web Scraping &amp; Automated Data Extraction
                </h3>
                <p className="text-sm text-slate-300 leading-relaxed">
                  Industrial-scale web scraping and data harvesting engines. We develop automated crawlers using <strong>Playwright</strong>, <strong>Puppeteer</strong>, and <strong>Scrapy</strong> to extract structured datasets, bypass anti-bot protections and captchas, and stream records directly into PostgreSQL, MongoDB, or executive spreadsheets.
                </p>

                <div className="space-y-3 pt-2">
                  <div className="flex items-start gap-3 text-sm text-slate-200">
                    <div className="w-2 h-2 rounded-full bg-gradient-to-r from-cyan-400 to-teal-300 shadow-[0_0_8px_#00f0ff] mt-1.5 flex-shrink-0"></div>
                    <span><strong>Headless Browser Scraping:</strong> High-concurrency browser automation with Playwright and Puppeteer for dynamic Single-Page Applications (SPAs) and JavaScript-rendered DOMs.</span>
                  </div>
                  <div className="flex items-start gap-3 text-sm text-slate-200">
                    <div className="w-2 h-2 rounded-full bg-gradient-to-r from-cyan-400 to-teal-300 shadow-[0_0_8px_#00f0ff] mt-1.5 flex-shrink-0"></div>
                    <span><strong>Anti-Bot &amp; Proxy Orchestration:</strong> Cloudflare Turnstile, perimeter bypass, and rotating residential IP pools with intelligent human-interaction emulation.</span>
                  </div>
                  <div className="flex items-start gap-3 text-sm text-slate-200">
                    <div className="w-2 h-2 rounded-full bg-gradient-to-r from-cyan-400 to-teal-300 shadow-[0_0_8px_#00f0ff] mt-1.5 flex-shrink-0"></div>
                    <span><strong>Automated Scheduled Pipelines:</strong> Scheduled cron extraction, differential incremental scraping, and structured database synchronization via PostgreSQL, JSON feeds, or Excel.</span>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Services FAQ Section */}
      <FAQSection openConsultation={openConsultation} showCta={false} />

      {/* Bottom CTA Banner with Luminous Gradient */}
      <div className="gradient-card rounded-3xl p-8 sm:p-10 border border-cyan-500/35 flex flex-col sm:flex-row items-center justify-between gap-6 shadow-2xl relative overflow-hidden mt-16">
        <div className="absolute top-0 right-0 w-96 h-96 bg-gradient-to-bl from-cyan-500/15 via-teal-500/10 to-transparent blur-3xl pointer-events-none"></div>

        <div className="relative z-10">
          <h2 className="text-2xl sm:text-3xl font-bold text-white">
            Not sure what technical architecture you need?
          </h2>
          <p className="text-slate-300 text-base sm:text-lg font-medium mt-1">
            Book a free 30-minute discovery consultation with our senior engineers
          </p>
        </div>

        <button
          onClick={openConsultation}
          className="btn-primary !px-8 !py-4 !text-base flex items-center gap-2.5 shadow-[0_0_30px_rgba(0,240,255,0.4)] hover:shadow-[0_0_45px_rgba(0,240,255,0.7)] cursor-pointer whitespace-nowrap"
        >
          <span>Book Consultation</span>
          <FontAwesomeIcon icon={faArrowRight} className="text-sm" />
        </button>
      </div>

    </div>
  );
};
