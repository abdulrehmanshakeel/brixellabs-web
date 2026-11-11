import React, { useState } from 'react';
import { 
  ChevronRight, 
  CheckCircle2, 
  AlertCircle, 
  ArrowRight, 
  Clock, 
  ShieldCheck, 
  Layers, 
  Sparkles,
  ChevronDown
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowRight, faArrowUpRightFromSquare, faCalendarCheck, faCheck } from '@fortawesome/free-solid-svg-icons';
import { getServiceBySlug, SERVICES_LIST } from '../data/servicesData';
import { CaseStudyTechMarquee } from '../components/case-studies/CaseStudyTechMarquee';
import { TiltCard } from '../components/common/TiltCard';
import { NotFoundPage } from './NotFoundPage';

export const ServiceDetailPage = ({ serviceSlug, navigate, openConsultation }) => {
  const [openFaqIndex, setOpenFaqIndex] = useState(0);
  const service = getServiceBySlug(serviceSlug);

  const handleNav = (e, url) => {
    e?.preventDefault();
    if (navigate) {
      navigate(url);
    } else {
      window.location.href = url;
    }
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  if (!service) {
    return <NotFoundPage navigate={navigate} />;
  }

  const IconComp = service.icon;

  const toggleFaq = (index) => {
    setOpenFaqIndex(openFaqIndex === index ? -1 : index);
  };

  const deliverySteps = [
    {
      step: '01',
      title: 'Discover & Architectural Scope',
      desc: 'We analyze your technical requirements, inspect data schemas, establish API contracts, and deliver an interactive Figma blueprint within 48 to 72 hours.'
    },
    {
      step: '02',
      title: 'Agile 1-Week Sprint Engineering',
      desc: 'Continuous sprint cadence with live milestone previews every 7 days. You receive direct Slack access to the senior engineers writing your code.'
    },
    {
      step: '03',
      title: 'Load Testing & Security Audits',
      desc: 'Automated test coverage, OWASP Top 10 security scanning, browser compatibility checks, and sub-100ms latency calibrations prior to release.'
    },
    {
      step: '04',
      title: 'Production Launch & 30-Day Warranty',
      desc: 'Zero-downtime deployment, DNS handoff, 100% intellectual property transfer, and a 30-day zero-cost bug resolution guarantee.'
    }
  ];

  return (
    <div className="relative pt-28 sm:pt-36 pb-24 px-4 sm:px-6 lg:px-8 max-w-6xl mx-auto z-10 text-slate-200">
      
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
          href="/services"
          onClick={(e) => handleNav(e, '/services')}
          className="hover:text-cyan-300 transition-colors cursor-pointer text-slate-400 no-underline"
        >
          Services
        </a>
        <ChevronRight className="w-3.5 h-3.5 text-slate-600" />
        <span className="text-slate-200 font-medium truncate max-w-[200px] sm:max-w-none">
          {service.shortTitle}
        </span>
      </nav>

      {/* Hero Section */}
      <header className="mb-20 space-y-6">
        
        {/* Cyber Pill Badge */}
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-cyan-950/60 border border-cyan-500/40 text-cyan-300 text-xs font-mono uppercase tracking-widest shadow-[0_0_15px_rgba(0,240,255,0.25)]">
          <span className="w-2 h-2 rounded-full bg-cyan-400 animate-pulse" />
          <span>{service.heroBadge}</span>
        </div>

        {/* High-Impact Main H1 */}
        <h1 className="text-3xl sm:text-5xl lg:text-6xl font-extrabold text-white tracking-tight leading-[1.1]">
          {service.title}
        </h1>

        {/* Tagline / Value Proposition */}
        <p className="text-lg sm:text-xl text-cyan-300/90 font-medium max-w-3xl leading-relaxed">
          {service.tagline}
        </p>

        {/* Detailed Overview */}
        <p className="text-base sm:text-lg text-slate-300 max-w-3xl font-normal leading-relaxed pt-1">
          {service.overview}
        </p>

        {/* Action Buttons */}
        <div className="pt-4 flex flex-wrap items-center gap-4">
          <button
            onClick={openConsultation}
            className="btn-primary !px-7 !py-3.5 !text-sm flex items-center gap-2.5 shadow-[0_0_25px_rgba(0,240,255,0.4)] hover:shadow-[0_0_35px_rgba(0,240,255,0.65)] cursor-pointer"
          >
            <span>Book Free Technical Consultation</span>
            <FontAwesomeIcon icon={faArrowRight} className="text-xs" />
          </button>

          {service.connectedCaseStudy && (
            <a
              href={`/case-studies/${service.connectedCaseStudy.slug}`}
              onClick={(e) => handleNav(e, `/case-studies/${service.connectedCaseStudy.slug}`)}
              className="px-6 py-3 rounded-xl bg-slate-900/90 border border-slate-700/80 text-white hover:text-cyan-300 hover:border-cyan-400/60 transition-all text-sm font-semibold flex items-center gap-2 shadow-sm no-underline cursor-pointer"
            >
              <span>View Production Case Study</span>
              <FontAwesomeIcon icon={faArrowUpRightFromSquare} className="text-xs text-cyan-400" />
            </a>
          )}
        </div>

        {/* Metrics Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-10 border-t border-slate-800/80">
          {service.metrics.map((metric, idx) => (
            <div 
              key={idx}
              className="p-5 rounded-2xl bg-[#041322]/80 border border-cyan-500/25 shadow-[0_4px_20px_rgba(0,0,0,0.4)]"
            >
              <div className="text-2xl sm:text-4xl font-black text-transparent bg-clip-text bg-gradient-to-r from-cyan-300 to-teal-200 tracking-tight">
                {metric.value}
              </div>
              <div className="text-xs sm:text-sm font-bold text-white mt-1">
                {metric.label}
              </div>
              <div className="text-[11px] font-mono text-slate-400 mt-0.5">
                {metric.hint}
              </div>
            </div>
          ))}
        </div>

      </header>

      {/* Problem vs Our Solution Matrix */}
      <section className="mb-24 space-y-8">
        <div className="border-b border-slate-800 pb-3">
          <span className="text-xs font-mono text-cyan-400 uppercase tracking-widest font-semibold">
            Architectural Philosophy
          </span>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight mt-1">
            Why Generic Implementations Fail vs. How We Engineer It
          </h2>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          
          {/* The Problem Card */}
          <div className="p-7 sm:p-8 rounded-3xl bg-[#140608]/70 border border-red-500/30 space-y-5 relative overflow-hidden">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-red-950/80 border border-red-500/40 flex items-center justify-center text-red-400">
                <AlertCircle className="w-5 h-5 text-red-400" />
              </div>
              <h3 className="text-lg sm:text-xl font-bold text-white tracking-tight">
                {service.theProblem.headline}
              </h3>
            </div>
            
            <p className="text-sm text-slate-300 leading-relaxed">
              {service.theProblem.description}
            </p>

            <div className="space-y-3 pt-2">
              {service.theProblem.points.map((pt, i) => (
                <div key={i} className="flex items-start gap-3">
                  <div className="w-1.5 h-1.5 rounded-full bg-red-400 mt-2 flex-shrink-0" />
                  <div>
                    <strong className="text-xs sm:text-sm text-white block">{pt.title}</strong>
                    <span className="text-xs text-slate-400">{pt.desc}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Our Solution Card */}
          <div className="p-7 sm:p-8 rounded-3xl bg-[#041627]/80 border border-cyan-500/40 space-y-5 relative overflow-hidden shadow-[0_0_30px_rgba(0,240,255,0.15)]">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-cyan-950/80 border border-cyan-500/50 flex items-center justify-center text-cyan-400">
                <CheckCircle2 className="w-5 h-5 text-cyan-300" />
              </div>
              <h3 className="text-lg sm:text-xl font-bold text-white tracking-tight">
                {service.ourSolution.headline}
              </h3>
            </div>

            <p className="text-sm text-slate-300 leading-relaxed">
              {service.ourSolution.description}
            </p>

            <div className="space-y-3 pt-2">
              {service.ourSolution.points.map((pt, i) => (
                <div key={i} className="flex items-start gap-3">
                  <div className="w-1.5 h-1.5 rounded-full bg-cyan-400 shadow-[0_0_6px_#00f0ff] mt-2 flex-shrink-0" />
                  <div>
                    <strong className="text-xs sm:text-sm text-cyan-200 block">{pt.title}</strong>
                    <span className="text-xs text-slate-300">{pt.desc}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

        </div>
      </section>

      {/* Core Technical Capabilities Grid */}
      <section className="mb-24 space-y-8">
        <div className="border-b border-slate-800 pb-3">
          <span className="text-xs font-mono text-cyan-400 uppercase tracking-widest font-semibold">
            Detailed Deliverables
          </span>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight mt-1">
            Engineered Capabilities &amp; Architecture Modules
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {service.capabilities.map((cap, idx) => (
            <TiltCard key={idx} className="h-full">
              <div className="h-full rounded-2xl p-6 bg-[#041322]/85 border border-cyan-500/30 hover:border-cyan-400/80 transition-all flex flex-col justify-between group shadow-md hover:shadow-[0_0_25px_rgba(0,240,255,0.2)]">
                <div>
                  <div className="w-10 h-10 rounded-xl bg-[#082842] border border-cyan-500/40 flex items-center justify-center text-cyan-300 group-hover:scale-105 transition-transform mb-4">
                    <span className="font-mono text-xs font-bold text-cyan-300">0{idx + 1}</span>
                  </div>
                  <h3 className="text-base sm:text-lg font-bold text-white group-hover:text-cyan-300 transition-colors mb-2.5">
                    {cap.title}
                  </h3>
                  <p className="text-xs sm:text-sm text-slate-300 leading-relaxed font-normal">
                    {cap.desc}
                  </p>
                </div>
              </div>
            </TiltCard>
          ))}
        </div>
      </section>

      {/* Technologies Marquee */}
      {service.technologies && service.technologies.length > 0 && (
        <CaseStudyTechMarquee
          title="Technology Stack &amp; Libraries"
          technologies={service.technologies}
        />
      )}

      {/* 4-Stage Agile Sprint Workflow */}
      <section className="mb-24 space-y-8">
        <div className="border-b border-slate-800 pb-3">
          <span className="text-xs font-mono text-cyan-400 uppercase tracking-widest font-semibold">
            Delivery Framework
          </span>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight mt-1">
            How We Deliver in 1-Week Agile Sprints
          </h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {deliverySteps.map((step, idx) => (
            <div 
              key={idx}
              className="p-6 rounded-2xl bg-[#041220]/80 border border-slate-800 hover:border-cyan-500/40 transition-all space-y-3 relative overflow-hidden"
            >
              <div className="text-2xl font-black font-mono text-cyan-400/60">
                {step.step}
              </div>
              <h3 className="text-sm sm:text-base font-bold text-white">
                {step.title}
              </h3>
              <p className="text-xs text-slate-400 leading-relaxed">
                {step.desc}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* Connected Production Case Study Callout */}
      {service.connectedCaseStudy && (
        <section className="mb-24">
          <div className="p-8 sm:p-10 rounded-3xl bg-gradient-to-br from-[#061e33] to-[#030e1a] border border-cyan-500/40 relative overflow-hidden shadow-2xl flex flex-col md:flex-row items-start md:items-center justify-between gap-8">
            <div className="space-y-3 max-w-2xl">
              <span className="px-3 py-1 rounded-full bg-cyan-400/20 text-cyan-300 text-[11px] font-mono uppercase tracking-wider font-bold">
                {service.connectedCaseStudy.badge}
              </span>
              <h2 className="text-xl sm:text-2xl lg:text-3xl font-extrabold text-white tracking-tight">
                {service.connectedCaseStudy.title}
              </h2>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed font-normal">
                {service.connectedCaseStudy.description}
              </p>
            </div>

            <a
              href={`/case-studies/${service.connectedCaseStudy.slug}`}
              onClick={(e) => handleNav(e, `/case-studies/${service.connectedCaseStudy.slug}`)}
              className="btn-primary !px-6 !py-3.5 !text-sm whitespace-nowrap flex items-center gap-2 cursor-pointer no-underline shrink-0"
            >
              <span>Read Full Case Study</span>
              <FontAwesomeIcon icon={faArrowRight} className="text-xs" />
            </a>
          </div>
        </section>
      )}

      {/* Service-Specific FAQ Accordion (For Rich Google Search Results) */}
      <section className="mb-24 space-y-6">
        <div className="border-b border-slate-800 pb-3">
          <span className="text-xs font-mono text-cyan-400 uppercase tracking-widest font-semibold">
            Frequently Answered Questions
          </span>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight mt-1">
            Questions Regarding {service.shortTitle}
          </h2>
        </div>

        <div className="space-y-4">
          {service.faqs.map((faq, index) => {
            const isOpen = openFaqIndex === index;
            return (
              <div
                key={index}
                className="rounded-2xl border border-slate-800/90 bg-[#041220]/75 overflow-hidden transition-all duration-200"
              >
                <button
                  onClick={() => toggleFaq(index)}
                  className="w-full py-5 px-6 flex items-center justify-between text-left text-white hover:text-cyan-300 transition-colors cursor-pointer select-none"
                  aria-expanded={isOpen}
                >
                  <span className="text-sm sm:text-base font-bold pr-4">
                    {faq.question}
                  </span>
                  <ChevronDown
                    className={`w-5 h-5 text-cyan-400 transition-transform duration-300 flex-shrink-0 ${
                      isOpen ? 'transform rotate-180' : ''
                    }`}
                  />
                </button>

                <AnimatePresence>
                  {isOpen && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.25 }}
                      className="overflow-hidden"
                    >
                      <div className="px-6 pb-6 text-xs sm:text-sm text-slate-300 leading-relaxed border-t border-slate-800/60 pt-4">
                        {faq.answer}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            );
          })}
        </div>
      </section>

      {/* Browse All Other Services Hub */}
      <section className="mb-24 pt-8 border-t border-slate-800/80">
        <div className="text-left mb-6">
          <span className="text-xs font-mono text-cyan-400 uppercase tracking-widest font-semibold">
            Explore Capabilities
          </span>
          <h3 className="text-xl sm:text-2xl font-bold text-white tracking-tight mt-1">
            Other Engineering Disciplines We Specialize In
          </h3>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-4">
          {SERVICES_LIST.filter(s => s.slug !== service.slug).map((other) => (
            <a
              key={other.slug}
              href={`/services/${other.slug}`}
              onClick={(e) => handleNav(e, `/services/${other.slug}`)}
              className="p-3.5 rounded-xl bg-[#041220]/90 border border-slate-800 hover:border-cyan-400/60 hover:bg-[#071e33] transition-all no-underline text-left group flex items-center justify-between"
            >
              <span className="text-xs font-semibold text-slate-300 group-hover:text-cyan-300 transition-colors truncate">
                {other.shortTitle}
              </span>
              <FontAwesomeIcon icon={faArrowRight} className="text-[10px] text-slate-600 group-hover:text-cyan-400 group-hover:translate-x-1 transition-all flex-shrink-0 ml-1.5" />
            </a>
          ))}
        </div>
      </section>

      {/* Final Discovery & Booking CTA */}
      <section className="pt-8">
        <div className="p-8 sm:p-12 rounded-3xl bg-gradient-to-br from-[#061e33] via-[#041525] to-[#020a12] border border-cyan-500/40 text-center relative overflow-hidden shadow-[0_0_45px_rgba(0,240,255,0.2)]">
          <div className="max-w-2xl mx-auto space-y-4">
            <span className="text-xs font-mono text-cyan-400 uppercase tracking-widest font-bold">
              Sprint Kickoff
            </span>
            <h2 className="text-2xl sm:text-4xl font-extrabold text-white tracking-tight">
              Ready to engineer your {service.shortTitle} solution?
            </h2>
            <p className="text-sm sm:text-base text-slate-300 leading-relaxed font-normal">
              Schedule a free 30-minute discovery call with our senior architects to discuss technical feasibility, sprint milestones, and exact pricing.
            </p>
            <div className="pt-4 flex justify-center">
              <button
                onClick={openConsultation}
                className="btn-primary !px-8 !py-4 !text-base flex items-center gap-2.5 shadow-[0_0_30px_rgba(0,240,255,0.5)] hover:shadow-[0_0_45px_rgba(0,240,255,0.8)] cursor-pointer"
              >
                <span>Book Free Discovery Consultation</span>
                <FontAwesomeIcon icon={faArrowRight} className="text-sm" />
              </button>
            </div>
          </div>
        </div>
      </section>

    </div>
  );
};

export default ServiceDetailPage;

