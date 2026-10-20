import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { 
  faArrowRight, 
  faCalendarCheck, 
  faLayerGroup,
  faBrain,
  faEye,
  faShieldHalved,
  faComments,
  faChartSimple
} from '@fortawesome/free-solid-svg-icons';

const ALL_STUDIES = [
  {
    slug: 'noesis',
    title: 'Noesis: Autonomous AI Study Assistant',
    category: 'Agentic AI & LLMs',
    icon: faBrain,
    desc: 'LangGraph multi-agent system with dual-engine web search, level-adapted notes, and dynamic MCQs.',
    link: '/case-studies/noesis',
    badge: 'LangGraph · Groq LPUs'
  },
  {
    slug: 'the-watcher',
    title: 'The Watcher: Family Safety Platform',
    category: 'Mobile & AI',
    icon: faShieldHalved,
    desc: 'Real-time hazard classification with zero battery drain across iOS and Android.',
    link: '/case-studies/the-watcher',
    badge: 'Flutter · Kotlin Native'
  },
  {
    slug: 'frontdesk-ai',
    title: 'FrontDesk AI: WhatsApp Booking Agent',
    category: 'Conversational AI',
    icon: faComments,
    desc: 'Autonomous booking and customer service bot handling Roman Urdu & English with <0.8s latency.',
    link: '/case-studies/frontdesk-ai',
    badge: 'WhatsApp API · Django'
  },
  {
    slug: 'threadeye',
    title: 'ThreadEye: Fabric Defect Detection',
    category: 'Computer Vision',
    icon: faEye,
    desc: 'Industrial quality control classifying textile flaws with 99.8% precision at sub-14ms latency.',
    link: '/case-studies/threadeye',
    badge: 'YOLOv8 · NVIDIA Jetson'
  },
  {
    slug: 'getscry',
    title: 'GetScry: Visitor Intent Intelligence',
    category: 'Predictive E-Commerce AI',
    icon: faChartSimple,
    desc: 'Real-time customer intent prediction engine using XGBoost and SHAP explainability under 35ms.',
    link: '/case-studies/getscry',
    badge: 'XGBoost · SHAP Analytics'
  }
];

export const CaseStudyNavigationCTA = ({ currentSlug, navigate }) => {
  const relatedStudies = ALL_STUDIES.filter(s => s.slug !== currentSlug).slice(0, 2);

  const handleNav = (e, url) => {
    e.preventDefault();
    if (navigate) {
      navigate(url);
    } else {
      window.location.href = url;
    }
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <section className="mt-20 pt-14 border-t border-slate-800/80 space-y-14">
      {/* Related Case Studies - Open Cardless Architectural Directory */}
      <div>
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
          <div>
            <span className="text-xs font-mono text-cyan-400 uppercase tracking-widest font-semibold">
              Explore More Work
            </span>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight mt-1">
              Related Engineering Deployments
            </h2>
          </div>
          <a
            href="/case-studies"
            onClick={(e) => handleNav(e, '/case-studies')}
            className="inline-flex items-center gap-2 text-xs font-mono text-cyan-400 hover:text-cyan-300 transition-colors group cursor-pointer no-underline"
          >
            <span>View All Case Studies</span>
            <FontAwesomeIcon icon={faArrowRight} className="w-3 h-3 group-hover:translate-x-1 transition-transform" />
          </a>
        </div>

        {/* Cardless Architectural Directory Rows */}
        <div className="divide-y divide-slate-800/80 border-y border-slate-800/80">
          {relatedStudies.map((study, idx) => (
            <a
              key={study.slug}
              href={study.link}
              onClick={(e) => handleNav(e, study.link)}
              className="group relative cursor-pointer py-6 sm:py-7 px-2 sm:px-4 transition-all duration-300 hover:bg-gradient-to-r hover:from-cyan-950/20 hover:via-slate-900/30 hover:to-transparent block no-underline"
            >
              {/* Active Left Indicator Accent Line */}
              <div className="absolute left-0 top-0 bottom-0 w-[3px] bg-gradient-to-b from-cyan-400 to-teal-400 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-r" />

              <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-5 lg:gap-8">
                {/* Left Identity: Monospace ID, Badges & Title */}
                <div className="flex items-start gap-4 lg:w-[42%] shrink-0">
                  <span className="font-mono text-xs font-bold text-slate-500 group-hover:text-cyan-400 transition-colors pt-1 shrink-0">
                    0{idx + 1} //
                  </span>

                  <div className="space-y-1.5 min-w-0">
                    <div className="flex flex-wrap items-center gap-2">
                      <span className="text-[10px] font-mono text-cyan-400 uppercase tracking-widest font-semibold">
                        {study.category}
                      </span>
                      <span className="text-[11px] font-mono text-slate-500">
                        // {study.badge}
                      </span>
                    </div>
                    <h3 className="font-heading text-lg sm:text-xl font-bold text-white group-hover:text-cyan-300 transition-colors">
                      {study.title}
                    </h3>
                  </div>
                </div>

                {/* Center Column: Description */}
                <div className="flex-1 lg:px-4">
                  <p className="text-xs sm:text-sm text-slate-400 leading-relaxed font-normal group-hover:text-slate-300 transition-colors">
                    {study.desc}
                  </p>
                </div>

                {/* Right Column: Direct Text Action */}
                <div className="shrink-0 flex items-center justify-between lg:justify-end pt-3 lg:pt-0 border-t border-slate-800/50 lg:border-t-0 text-xs font-mono text-cyan-400 group-hover:text-cyan-300">
                  <div className="inline-flex items-center gap-2 group-hover:translate-x-1.5 transition-transform duration-300">
                    <span className="font-medium">Read Case Study</span>
                    <FontAwesomeIcon icon={faArrowRight} className="w-3 h-3" />
                  </div>
                </div>
              </div>
            </a>
          ))}
        </div>
      </div>

      {/* Engineering Consultation Callout - Open Architectural Section */}
      <div className="pt-14 border-t border-slate-800/80">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-8 text-left">
          <div className="space-y-3 max-w-2xl">
            <span className="text-xs font-mono text-cyan-400 uppercase tracking-widest font-semibold">
              Ready to Deploy?
            </span>
            <h3 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-white tracking-tight">
              Build Your Custom AI Architecture With BrixelLabs
            </h3>
            <p className="text-sm sm:text-base text-slate-300 leading-relaxed font-normal">
              Schedule a technical discovery session with our senior engineering leads. We review requirements, design system architecture, and provide milestone estimates within 24 hours.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 shrink-0">
            <a
              href="/contact"
              onClick={(e) => handleNav(e, '/contact')}
              className="btn-primary !px-6 !py-3.5 !text-xs !rounded-xl text-center no-underline flex items-center justify-center gap-2 shadow-[0_0_20px_rgba(0,240,255,0.35)]"
            >
              <FontAwesomeIcon icon={faCalendarCheck} className="text-xs" />
              <span>Schedule Free Consultation</span>
            </a>
            <a
              href="/services"
              onClick={(e) => handleNav(e, '/services')}
              className="px-5 py-3.5 rounded-xl bg-slate-900/90 border border-slate-700 hover:border-cyan-400/60 text-xs font-semibold text-white hover:text-cyan-300 transition-all text-center no-underline flex items-center justify-center gap-2"
            >
              <FontAwesomeIcon icon={faLayerGroup} className="text-xs" />
              <span>Explore All Services</span>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CaseStudyNavigationCTA;
