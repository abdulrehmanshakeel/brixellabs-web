import React from 'react';
import { 
  ChevronRight,
  CheckCircle2
} from 'lucide-react';
import { CaseStudyTechMarquee } from '../components/case-studies/CaseStudyTechMarquee';
import { CaseStudyNavigationCTA } from '../components/case-studies/CaseStudyNavigationCTA';

export const FrontDeskAICaseStudyPage = ({ navigate }) => {
  const handleNav = (e, url) => {
    e.preventDefault();
    if (navigate) {
      navigate(url);
    } else {
      window.location.href = url;
    }
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const projectTechnologies = [
    { name: 'LangGraph', role: 'Multi-Agent Coordination', brand: 'LangGraph' },
    { name: 'LangChain', role: 'Prompt & Tool Calling', brand: 'LangChain' },
    { name: 'Groq Cloud', role: 'LPU Inference Acceleration', brand: 'Groq' },
    { name: 'Meta LLaMA 3.3', role: '70B Bilingual Conversational AI', brand: 'Meta' },
    { name: 'WhatsApp API', role: 'Official Cloud Messaging', brand: 'WhatsApp' },
    { name: 'FastAPI', role: 'Sub-100ms Webhook Dispatch', brand: 'FastAPI' },
    { name: 'Python', role: 'Async Agent Runtime', brand: 'Python' },
    { name: 'Redis', role: 'Session Memory & Slot Holds', brand: 'Redis' },
    { name: 'PostgreSQL', role: 'Bookings & Patient Records', brand: 'PostgreSQL' },
    { name: 'WebSockets', role: 'Live Receptionist Monitor', brand: 'WebSockets' },
    { name: 'Docker', role: 'Containerized Deployment', brand: 'Docker' }
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
        <span className="text-slate-200 font-medium">FrontDesk AI</span>
      </nav>

      {/* Header Section */}
      <header className="mb-14 space-y-4">
        <h1 className="text-3xl sm:text-5xl lg:text-6xl font-extrabold text-white tracking-tight leading-tight">
          FrontDesk AI: Autonomous WhatsApp Booking Architecture
        </h1>

        <p className="text-base sm:text-lg text-slate-300 max-w-3xl font-normal leading-relaxed pt-2">
          A production conversational multi-agent coordinating bilingual Roman Urdu and English inquiries, Google Calendar availability checks, and conflict-free appointment booking over WhatsApp. Built on LangGraph, Twilio APIs, and Groq hardware acceleration.
        </p>
      </header>

      {/* The Challenge / Problem Section */}
      <section className="mb-20 pt-4">
        <div className="space-y-6">
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-white tracking-tight">
            The Problem: Lost After-Hours Leads &amp; Double Bookings
          </h2>

          <p className="text-base sm:text-lg text-slate-300 leading-relaxed max-w-4xl font-normal">
            Medical and wellness clinics lose prospective patient bookings that arrive outside typical operating hours. Reception staff spend valuable hours manually checking doctor schedules across messy spreadsheets, while generic chatbots fail on local colloquial language or cause double-bookings.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-6">
            <div className="border-l-2 border-red-500/50 pl-4 space-y-1.5">
              <h3 className="text-sm font-semibold text-white">After-Hours Patient Churn</h3>
              <p className="text-xs sm:text-sm text-slate-400 leading-relaxed">
                Prospective patients inquiring after business hours go unanswered until morning, abandoning clinics for competitors.
              </p>
            </div>

            <div className="border-l-2 border-red-500/50 pl-4 space-y-1.5">
              <h3 className="text-sm font-semibold text-white">Manual Calendar Juggling</h3>
              <p className="text-xs sm:text-sm text-slate-400 leading-relaxed">
                Front-desk receptionists cross-referencing paper diaries and sheets frequently double-book doctors, humiliating clinics.
              </p>
            </div>

            <div className="border-l-2 border-red-500/50 pl-4 space-y-1.5">
              <h3 className="text-sm font-semibold text-white">Code-Switching Failure</h3>
              <p className="text-xs sm:text-sm text-slate-400 leading-relaxed">
                Standard rule-based chatbots break completely when patients type informal Roman Urdu phrasing or colloquial medical inquiries.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* The Solution Section */}
      <section className="mb-24 pt-12 border-t border-slate-800/80">
        <div className="space-y-6">
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-white tracking-tight">
            The Solution: Smart WhatsApp Booking Assistant
          </h2>

          <p className="text-base sm:text-lg text-slate-300 leading-relaxed max-w-4xl font-normal">
            BrixelLabs built an intelligent bilingual assistant for WhatsApp. It understands everyday Roman Urdu and English dates, checks live doctor calendars, temporarily holds open slots to guarantee zero double-bookings, and alerts human staff immediately if an urgent medical question arises.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-6">
            <div className="border-l-2 border-teal-400/60 pl-4 space-y-1.5">
              <h3 className="text-sm font-semibold text-white flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-teal-400 shrink-0" />
                <span>24/7 Zero-Lag Capture</span>
              </h3>
              <p className="text-xs sm:text-sm text-slate-400 leading-relaxed">
                Captures evening, weekend, and holiday patient bookings instantly within seconds, converting after-hours leads into confirmed clinic revenue.
              </p>
            </div>

            <div className="border-l-2 border-teal-400/60 pl-4 space-y-1.5">
              <h3 className="text-sm font-semibold text-white flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-teal-400 shrink-0" />
                <span>Deterministic Slot Holds</span>
              </h3>
              <p className="text-xs sm:text-sm text-slate-400 leading-relaxed">
                Redis atomic slot locks hold calendar openings during conversation flow, preventing race conditions when multiple patients message concurrently.
              </p>
            </div>

            <div className="border-l-2 border-teal-400/60 pl-4 space-y-1.5">
              <h3 className="text-sm font-semibold text-white flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-teal-400 shrink-0" />
                <span>Emergency Escalation</span>
              </h3>
              <p className="text-xs sm:text-sm text-slate-400 leading-relaxed">
                Detects emergency symptoms or abnormal requests and alerts on-duty medical supervisors immediately with full conversation transcripts.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Infinite Flowing Technology Stack Marquee */}
      <CaseStudyTechMarquee 
        title="Technology Stack Flow" 
        technologies={projectTechnologies} 
      />

      {/* Related Case Studies & Engineering Consultation CTA */}
      <CaseStudyNavigationCTA 
        currentSlug="frontdesk-ai" 
        navigate={navigate} 
      />

    </div>
  );
};
