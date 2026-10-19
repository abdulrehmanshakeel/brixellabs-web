import React from 'react';
import { 
  CheckCircle2, 
  ChevronRight
} from 'lucide-react';
import { CaseStudyTechMarquee } from '../components/case-studies/CaseStudyTechMarquee';
import { CaseStudyNavigationCTA } from '../components/case-studies/CaseStudyNavigationCTA';

export const WatcherCaseStudyPage = ({ navigate }) => {
  const handleNav = (e, url) => {
    e.preventDefault();
    if (navigate) {
      navigate(url);
    } else {
      window.location.href = url;
    }
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const watcherTechnologies = [
    { name: 'Flutter', category: 'Cross-Platform Mobile', icon: 'Flutter', hoverBorder: 'hover:border-sky-400/50' },
    { name: 'Kotlin', category: 'Android Native Service', icon: 'Kotlin', hoverBorder: 'hover:border-purple-500/50' },
    { name: 'Android OS', category: 'Background Protection', icon: 'Android', hoverBorder: 'hover:border-emerald-400/50' },
    { name: 'TensorFlow', category: 'On-Device Lightweight ML', icon: 'TensorFlow', hoverBorder: 'hover:border-orange-500/50' },
    { name: 'Python', category: 'Backend Engine', icon: 'Python', hoverBorder: 'hover:border-yellow-400/50' },
    { name: 'FastAPI', category: 'Encrypted Cloud Sync', icon: 'FastAPI', hoverBorder: 'hover:border-teal-400/50' },
    { name: 'PostgreSQL', category: 'Encrypted Safety DB', icon: 'PostgreSQL', hoverBorder: 'hover:border-sky-500/50' },
    { name: 'Redis', category: 'Real-Time Alert Cache', icon: 'Redis', hoverBorder: 'hover:border-red-500/50' },
    { name: 'Docker', category: 'Containerized Services', icon: 'Docker', hoverBorder: 'hover:border-blue-500/50' },
    { name: 'React', category: 'Parent Web Portal', icon: 'React', hoverBorder: 'hover:border-cyan-400/50' },
    { name: 'Tailwind CSS', category: 'Modern Clean UI', icon: 'TailwindCSS', hoverBorder: 'hover:border-teal-400/50' }
  ];

  return (
    <div className="relative pt-28 sm:pt-36 pb-24 px-4 sm:px-6 lg:px-8 max-w-5xl mx-auto z-10 text-slate-200">
      
      {/* Editorial Breadcrumbs */}
      <nav className="flex items-center gap-2 text-xs text-slate-400 mb-8 pb-4 border-b border-slate-800/80" aria-label="Breadcrumb">
        <a 
          href="/"
          onClick={(e) => handleNav(e, '/')}
          className="hover:text-cyan-300 transition-colors cursor-pointer text-slate-400 no-underline"
        >
          Home
        </a>
        <ChevronRight className="w-3.5 h-3.5 text-slate-600" />
        <a 
          href="/case-studies"
          onClick={(e) => handleNav(e, '/case-studies')}
          className="hover:text-cyan-300 transition-colors cursor-pointer text-slate-400 no-underline"
        >
          Case Studies
        </a>
        <ChevronRight className="w-3.5 h-3.5 text-slate-600" />
        <span className="text-slate-200 font-medium">The Watcher</span>
      </nav>

      {/* Header Section */}
      <header className="mb-14 space-y-4">
        <h1 className="text-3xl sm:text-5xl lg:text-6xl font-extrabold text-white tracking-tight leading-tight">
          The Watcher: Child Safety &amp; Threat Detection
        </h1>

        <p className="text-base sm:text-lg text-slate-300 max-w-3xl font-normal leading-relaxed pt-2">
          A privacy-preserving family safety platform that detects online digital hazards in real time, alerting parents immediately without storing children's private browsing history or draining device battery.
        </p>
      </header>

      {/* The Challenge / Problem Section */}
      <section className="mb-20 pt-4">
        <div className="space-y-6">
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-white tracking-tight">
            The Problem: Intrusive Monitoring &amp; High Battery Drain
          </h2>

          <p className="text-base sm:text-lg text-slate-300 leading-relaxed max-w-4xl font-normal">
            Most parental control apps act like intrusive spyware: they log every private chat, record visited websites onto external servers, and heavily drain device batteries. Worse, simple keyword blockers produce constant false alarms, causing friction between parents and kids.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-6">
            <div className="border-l-2 border-red-500/50 pl-4 space-y-1.5">
              <h3 className="text-sm font-semibold text-white">Invasive Cloud Tracking</h3>
              <p className="text-xs sm:text-sm text-slate-400 leading-relaxed">
                Uploading children's private texts, searches, and photos to vulnerable third-party servers creates severe privacy liabilities.
              </p>
            </div>

            <div className="border-l-2 border-red-500/50 pl-4 space-y-1.5">
              <h3 className="text-sm font-semibold text-white">Severe Battery Depletion</h3>
              <p className="text-xs sm:text-sm text-slate-400 leading-relaxed">
                Heavy background polling consuming &gt;15% battery per day causes phones to overheat and users to uninstall the software.
              </p>
            </div>

            <div className="border-l-2 border-red-500/50 pl-4 space-y-1.5">
              <h3 className="text-sm font-semibold text-white">Frustrating False Alarms</h3>
              <p className="text-xs sm:text-sm text-slate-400 leading-relaxed">
                Primitive keyword blocklists flag harmless school research and biology homework as critical hazards.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* The Solution Section */}
      <section className="mb-24 pt-12 border-t border-slate-800/80">
        <div className="space-y-6">
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-white tracking-tight">
            The Solution: Privacy-First On-Device AI Classification
          </h2>

          <p className="text-base sm:text-lg text-slate-300 leading-relaxed max-w-4xl font-normal">
            BrixelLabs built an intelligent on-device mobile agent that runs directly on the phone. Using lightweight on-device ML, The Watcher evaluates content locally in sub-100ms, alerts parents only when real dangers arise, and never stores private browsing data.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-6">
            <div className="border-l-2 border-cyan-400/60 pl-4 space-y-1.5">
              <h3 className="text-sm font-semibold text-white flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-cyan-400 shrink-0" />
                <span>100% On-Device Privacy</span>
              </h3>
              <p className="text-xs sm:text-sm text-slate-400 leading-relaxed">
                Web and chat sessions are evaluated entirely within the phone's sandboxed memory; no private logs ever leave the child's device.
              </p>
            </div>

            <div className="border-l-2 border-cyan-400/60 pl-4 space-y-1.5">
              <h3 className="text-sm font-semibold text-white flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-cyan-400 shrink-0" />
                <span>Ultra-Low Battery Footprint</span>
              </h3>
              <p className="text-xs sm:text-sm text-slate-400 leading-relaxed">
                Written in native Kotlin and C++ ML bindings, consuming less than 1.5% battery per day with zero device heat.
              </p>
            </div>

            <div className="border-l-2 border-cyan-400/60 pl-4 space-y-1.5">
              <h3 className="text-sm font-semibold text-white flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-cyan-400 shrink-0" />
                <span>Contextual Threat Intelligence</span>
              </h3>
              <p className="text-xs sm:text-sm text-slate-400 leading-relaxed">
                Evaluates conversational nuances to substantially eliminate false alarms, accurately distinguishing threats from harmless homework.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Infinite Flowing Technology Stack Marquee */}
      <CaseStudyTechMarquee 
        title="Technology Stack Flow" 
        technologies={watcherTechnologies} 
      />

      {/* Related Case Studies & Engineering Consultation CTA */}
      <CaseStudyNavigationCTA 
        currentSlug="the-watcher" 
        navigate={navigate} 
      />

    </div>
  );
};
