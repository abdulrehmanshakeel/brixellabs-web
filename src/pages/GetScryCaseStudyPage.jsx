import React from 'react';
import { 
  CheckCircle2, 
  ChevronRight
} from 'lucide-react';
import { CaseStudyTechMarquee } from '../components/case-studies/CaseStudyTechMarquee';
import { CaseStudyNavigationCTA } from '../components/case-studies/CaseStudyNavigationCTA';

export const GetScryCaseStudyPage = ({ navigate }) => {
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
    { name: 'Scikit-Learn', role: 'Predictive Classifier', brand: 'ScikitLearn' },
    { name: 'Pandas', role: 'Real-Time Feature Engineering', brand: 'Pandas' },
    { name: 'NumPy', role: 'Vectorized Intent Scoring', brand: 'NumPy' },
    { name: 'Python', role: 'Async Analytics Runtime', brand: 'Python' },
    { name: 'FastAPI', role: 'Sub-10ms Scoring Endpoint', brand: 'FastAPI' },
    { name: 'Shopify API', role: 'Liquid Extension & Webhooks', brand: 'Shopify' },
    { name: 'Redis Streams', role: 'High-Throughput Ingestion', brand: 'Redis' },
    { name: 'PostgreSQL', role: 'Session & Conversion Store', brand: 'PostgreSQL' },
    { name: 'React', role: 'Merchant Analytics Portal', brand: 'React' },
    { name: 'TailwindCSS', role: 'Analytics UI System', brand: 'TailwindCSS' },
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
        <span className="text-slate-200 font-medium">GetScry</span>
      </nav>

      {/* Header Section */}
      <header className="mb-14 space-y-4">
        <h1 className="text-3xl sm:text-5xl lg:text-6xl font-extrabold text-white tracking-tight leading-tight">
          GetScry: Real-Time Shopper Intent Analytics
        </h1>

        <p className="text-base sm:text-lg text-slate-300 max-w-3xl font-normal leading-relaxed pt-2">
          A smart e-commerce platform that detects when online shoppers hesitate before buying and offers personalized checkout incentives at the right moment to increase completed sales.
        </p>
      </header>

      {/* The Challenge / Problem Section */}
      <section className="mb-20 pt-4">
        <div className="space-y-6">
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-white tracking-tight">
            The Problem: Cart Abandonment &amp; Annoying Popups
          </h2>

          <p className="text-base sm:text-lg text-slate-300 leading-relaxed max-w-4xl font-normal">
            Online retailers lose a large majority of potential buyers right at checkout. Standard analytics platforms only tell merchants who abandoned after the visitor is already gone. Brands respond by blasting intrusive exit-intent popups that frustrate visitors, increase bounce rates, and degrade customer trust.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-6">
            <div className="border-l-2 border-red-500/50 pl-4 space-y-1.5">
              <h3 className="text-sm font-semibold text-white">Lost Checkout Carts</h3>
              <p className="text-xs sm:text-sm text-slate-400 leading-relaxed">
                High friction points like unexpected shipping fees cause high-intent buyers to hesitate and navigate away without buying.
              </p>
            </div>

            <div className="border-l-2 border-red-500/50 pl-4 space-y-1.5">
              <h3 className="text-sm font-semibold text-white">Spammy Exit Popups</h3>
              <p className="text-xs sm:text-sm text-slate-400 leading-relaxed">
                Blasting every visitor with generic 10% coupon popups erodes profit margins and creates an abrasive browsing experience.
              </p>
            </div>

            <div className="border-l-2 border-red-500/50 pl-4 space-y-1.5">
              <h3 className="text-sm font-semibold text-white">Death of Third-Party Cookies</h3>
              <p className="text-xs sm:text-sm text-slate-400 leading-relaxed">
                Global privacy regulations (GDPR, CCPA) and Safari/Chrome tracking protections render legacy retargeting cookies obsolete.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* The Solution Section */}
      <section className="mb-24 pt-12 border-t border-slate-800/80">
        <div className="space-y-6">
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-white tracking-tight">
            The Solution: Real-Time Smart Buying Intent Prediction
          </h2>

          <p className="text-base sm:text-lg text-slate-300 leading-relaxed max-w-4xl font-normal">
            BrixelLabs engineered a lightweight (&lt;6KB) script and smart predictive model. Without collecting personal identities, GetScry recognizes when a shopper hesitates over shipping or checkout costs and triggers timely incentives before they leave.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-6">
            <div className="border-l-2 border-cyan-400/60 pl-4 space-y-1.5">
              <h3 className="text-sm font-semibold text-white flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-cyan-400 shrink-0" />
                <span>100% Privacy-Preserving ML</span>
              </h3>
              <p className="text-xs sm:text-sm text-slate-400 leading-relaxed">
                Evaluates cursor trajectory, dwell patterns, and checkout velocity locally without tracking third-party cookie fingerprints.
              </p>
            </div>

            <div className="border-l-2 border-cyan-400/60 pl-4 space-y-1.5">
              <h3 className="text-sm font-semibold text-white flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-cyan-400 shrink-0" />
                <span>Precision Margin Protection</span>
              </h3>
              <p className="text-xs sm:text-sm text-slate-400 leading-relaxed">
                Triggers discounts solely for hesitant shoppers on the verge of abandoning, preserving full margins on organic buyers.
              </p>
            </div>

            <div className="border-l-2 border-cyan-400/60 pl-4 space-y-1.5">
              <h3 className="text-sm font-semibold text-white flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-cyan-400 shrink-0" />
                <span>Instant 1-Line Turnkey Setup</span>
              </h3>
              <p className="text-xs sm:text-sm text-slate-400 leading-relaxed">
                Zero setup overhead: easily integrates into Shopify Liquid, WooCommerce, and Headless React storefronts.
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
        currentSlug="getscry" 
        navigate={navigate} 
      />

    </div>
  );
};
