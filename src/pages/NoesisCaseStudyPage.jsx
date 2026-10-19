import React from 'react';
import { 
  CheckCircle2, 
  ChevronRight
} from 'lucide-react';
import { CaseStudyTechMarquee } from '../components/case-studies/CaseStudyTechMarquee';
import { CaseStudyNavigationCTA } from '../components/case-studies/CaseStudyNavigationCTA';

export const NoesisCaseStudyPage = ({ navigate }) => {
  const handleNav = (e, url) => {
    e.preventDefault();
    if (navigate) {
      navigate(url);
    } else {
      window.location.href = url;
    }
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const noesisTechnologies = [
    { name: 'Groq LPUs', category: 'Sub-300ms Inference', icon: 'Groq', hoverBorder: 'hover:border-red-500/50' },
    { name: 'Meta LLaMA 3.3', category: '70B Reasoning Model', icon: 'Meta', hoverBorder: 'hover:border-blue-500/50' },
    { name: 'LangGraph', category: 'Multi-Step Agent State', icon: 'LangGraph', hoverBorder: 'hover:border-emerald-400/50' },
    { name: 'LangChain', category: 'Context & Prompt Chains', icon: 'LangChain', hoverBorder: 'hover:border-teal-400/50' },
    { name: 'Tavily Search', category: 'Real-Time Fact Grounding', icon: 'Tavily', hoverBorder: 'hover:border-sky-400/50' },
    { name: 'FastAPI', category: 'Async Python Backend', icon: 'FastAPI', hoverBorder: 'hover:border-teal-400/50' },
    { name: 'PostgreSQL', category: 'Student Knowledge Store', icon: 'PostgreSQL', hoverBorder: 'hover:border-blue-400/50' },
    { name: 'Redis', category: 'Session Memory Cache', icon: 'Redis', hoverBorder: 'hover:border-rose-500/50' },
    { name: 'React', category: 'Interactive Learning UI', icon: 'React', hoverBorder: 'hover:border-cyan-400/50' },
    { name: 'Tailwind CSS', category: 'Dark Modern UI', icon: 'TailwindCSS', hoverBorder: 'hover:border-sky-400/50' },
    { name: 'Docker', category: 'Serverless Orchestration', icon: 'Docker', hoverBorder: 'hover:border-blue-500/50' }
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
        <span className="text-slate-200 font-medium">Noesis</span>
      </nav>

      {/* Header Section */}
      <header className="mb-14 space-y-4">
        <h1 className="text-3xl sm:text-5xl lg:text-6xl font-extrabold text-white tracking-tight leading-tight">
          Noesis: Autonomous AI Study &amp; Learning Assistant
        </h1>

        <p className="text-base sm:text-lg text-slate-300 max-w-3xl font-normal leading-relaxed pt-2">
          An adaptive learning engine transforming dense educational material into interactive quizzes, structured notes, and verified knowledge trees using multi-agent reasoning models.
        </p>
      </header>

      {/* The Challenge / Problem Section */}
      <section className="mb-20 pt-4">
        <div className="space-y-6">
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-white tracking-tight">
            The Problem: Rigid Learning Tools &amp; AI Hallucinations
          </h2>

          <p className="text-base sm:text-lg text-slate-300 leading-relaxed max-w-4xl font-normal">
            Standard AI chatbots invent inaccurate facts, hallucinate false answers, and fail to adapt to individual student knowledge levels. Traditional online quizzes are static and boring, offering generic questions that fail to identify exactly where a learner's misunderstanding lies.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-6">
            <div className="border-l-2 border-red-500/50 pl-4 space-y-1.5">
              <h3 className="text-sm font-semibold text-white">Unverified Chatbot Outputs</h3>
              <p className="text-xs sm:text-sm text-slate-400 leading-relaxed">
                Hallucinating fake academic references and misleading students during critical exam preparation.
              </p>
            </div>

            <div className="border-l-2 border-red-500/50 pl-4 space-y-1.5">
              <h3 className="text-sm font-semibold text-white">Static Repetitive Quizzes</h3>
              <p className="text-xs sm:text-sm text-slate-400 leading-relaxed">
                Fixed question banks fail to diagnose specific learning gaps, repeatedly testing already-mastered concepts.
              </p>
            </div>

            <div className="border-l-2 border-red-500/50 pl-4 space-y-1.5">
              <h3 className="text-sm font-semibold text-white">Frustrating Generation Latency</h3>
              <p className="text-xs sm:text-sm text-slate-400 leading-relaxed">
                Response delays exceeding 4+ seconds cause students to lose cognitive flow and abandon study sessions.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* The Solution Section */}
      <section className="mb-24 pt-12 border-t border-slate-800/80">
        <div className="space-y-6">
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-white tracking-tight">
            The Solution: Multi-Agent Fact-Checking &amp; Dynamic Difficulty
          </h2>

          <p className="text-base sm:text-lg text-slate-300 leading-relaxed max-w-4xl font-normal">
            BrixelLabs engineered an autonomous multi-step reasoning workflow using LangGraph and Groq LPUs. Questions are generated dynamically with real-time web fact-checking to ensure grounded factual accuracy with sub-second response times.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-6">
            <div className="border-l-2 border-cyan-400/60 pl-4 space-y-1.5">
              <h3 className="text-sm font-semibold text-white flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-cyan-400 shrink-0" />
                <span>Autonomous Fact Verification</span>
              </h3>
              <p className="text-xs sm:text-sm text-slate-400 leading-relaxed">
                Eliminates hallucinations by grounding all notes, quiz questions, and explanations against trusted live academic sources.
              </p>
            </div>

            <div className="border-l-2 border-cyan-400/60 pl-4 space-y-1.5">
              <h3 className="text-sm font-semibold text-white flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-cyan-400 shrink-0" />
                <span>Dynamic Difficulty Calibration</span>
              </h3>
              <p className="text-xs sm:text-sm text-slate-400 leading-relaxed">
                Real-time cognitive scoring adjusts question complexity dynamically based on each student's ongoing performance.
              </p>
            </div>

            <div className="border-l-2 border-cyan-400/60 pl-4 space-y-1.5">
              <h3 className="text-sm font-semibold text-white flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-cyan-400 shrink-0" />
                <span>Sub-300ms Groq Acceleration</span>
              </h3>
              <p className="text-xs sm:text-sm text-slate-400 leading-relaxed">
                Hardware-accelerated LPUs deliver instant feedback loops, keeping learners engaged without latency fatigue.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Infinite Flowing Technology Stack Marquee */}
      <CaseStudyTechMarquee 
        title="Technology Stack Flow" 
        technologies={noesisTechnologies} 
      />

      {/* Related Case Studies & Engineering Consultation CTA */}
      <CaseStudyNavigationCTA 
        currentSlug="noesis" 
        navigate={navigate} 
      />

    </div>
  );
};
