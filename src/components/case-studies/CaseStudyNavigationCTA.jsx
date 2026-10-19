import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowRight, faCalendarCheck, faLayerGroup } from '@fortawesome/free-solid-svg-icons';

const ALL_STUDIES = [
  {
    slug: 'noesis',
    title: 'Noesis: Autonomous AI Study Assistant',
    category: 'Agentic AI & LLMs',
    desc: 'LangGraph multi-agent system with dual-engine web search, level-adapted notes, and dynamic MCQs.',
    link: '/case-studies/noesis',
    badge: 'LangGraph · Groq LPUs'
  },
  {
    slug: 'the-watcher',
    title: 'The Watcher: Family Safety Platform',
    category: 'Mobile & AI',
    desc: 'Real-time hazard classification with zero battery drain across iOS and Android.',
    link: '/case-studies/the-watcher',
    badge: 'Flutter · Kotlin Native'
  },
  {
    slug: 'frontdesk-ai',
    title: 'FrontDesk AI: WhatsApp Booking Agent',
    category: 'Conversational AI',
    desc: 'Autonomous booking and customer service bot handling Roman Urdu & English with <0.8s latency.',
    link: '/case-studies/frontdesk-ai',
    badge: 'WhatsApp API · Django'
  },
  {
    slug: 'threadeye',
    title: 'ThreadEye: Fabric Defect Detection',
    category: 'Computer Vision',
    desc: 'Industrial quality control classifying textile flaws with 99.8% precision at sub-14ms latency.',
    link: '/case-studies/threadeye',
    badge: 'YOLOv8 · NVIDIA Jetson'
  },
  {
    slug: 'getscry',
    title: 'GetScry: Visitor Intent Intelligence',
    category: 'Predictive E-Commerce AI',
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
      {/* Related Case Studies */}
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

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {relatedStudies.map((study) => (
            <a
              key={study.slug}
              href={study.link}
              onClick={(e) => handleNav(e, study.link)}
              className="p-6 rounded-2xl bg-[#030e1a]/80 border border-slate-800 hover:border-cyan-500/50 hover:bg-[#051728]/80 transition-all duration-300 group flex flex-col justify-between cursor-pointer no-underline block text-left"
            >
              <div>
                <div className="flex items-center justify-between mb-3">
                  <span className="text-[10px] font-mono text-cyan-400 bg-slate-900 px-2.5 py-0.5 rounded border border-slate-800 uppercase">
                    {study.category}
                  </span>
                  <span className="text-[11px] font-mono text-slate-500">
                    {study.badge}
                  </span>
                </div>
                <h3 className="text-lg font-bold text-white group-hover:text-cyan-300 transition-colors mb-2">
                  {study.title}
                </h3>
                <p className="text-xs sm:text-sm text-slate-400 leading-relaxed">
                  {study.desc}
                </p>
              </div>

              <div className="pt-4 mt-4 border-t border-slate-800/70 flex items-center justify-between text-xs font-medium text-cyan-400 group-hover:text-cyan-300">
                <span>Read Case Study</span>
                <FontAwesomeIcon icon={faArrowRight} className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
              </div>
            </a>
          ))}
        </div>
      </div>

      {/* Engineering Consultation Callout */}
      <div className="p-8 sm:p-10 rounded-3xl bg-gradient-to-br from-[#041525] via-[#020b14] to-[#041525] border border-cyan-500/35 relative overflow-hidden shadow-2xl">
        <div className="absolute -top-24 -right-24 w-64 h-64 rounded-full bg-cyan-500/10 blur-3xl pointer-events-none" />

        <div className="relative z-10 flex flex-col lg:flex-row lg:items-center justify-between gap-8">
          <div className="space-y-3 max-w-2xl">
            <span className="text-xs font-mono text-cyan-400 uppercase tracking-widest font-semibold">
              Ready to Deploy?
            </span>
            <h3 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
              Build Your Custom AI Architecture With BrixelLabs
            </h3>
            <p className="text-sm text-slate-300 leading-relaxed font-normal">
              Schedule a technical discovery session with our senior engineering leads. We review requirements, design system architecture, and provide milestone estimates within 24 hours.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 shrink-0">
            <a
              href="/contact"
              onClick={(e) => handleNav(e, '/contact')}
              className="btn-primary !px-6 !py-3 !text-xs !rounded-xl text-center no-underline flex items-center justify-center gap-2"
            >
              <FontAwesomeIcon icon={faCalendarCheck} className="text-xs" />
              <span>Schedule Free Consultation</span>
            </a>
            <a
              href="/services"
              onClick={(e) => handleNav(e, '/services')}
              className="px-5 py-3 rounded-xl bg-slate-900/90 border border-slate-700 hover:border-cyan-400/60 text-xs font-semibold text-white hover:text-cyan-300 transition-all text-center no-underline flex items-center justify-center gap-2"
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
