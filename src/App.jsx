import React, { useState, useEffect, lazy, Suspense } from 'react';
import { BackgroundEffects } from './components/layout/BackgroundEffects';
import { Navbar } from './components/layout/Navbar';
import { Footer } from './components/layout/Footer';
import { CyberSpotlight } from './components/common/CyberSpotlight';
import { SEOHead } from './components/common/SEOHead';
import { StickySocialBar } from './components/common/StickySocialBar';
import { ScrollProgressBar } from './components/common/ScrollProgressBar';
import { BackToTop } from './components/common/BackToTop';
import { CookieBanner } from './components/common/CookieBanner';
import { ForceUpdateScreen } from './components/common/ForceUpdateScreen';
import { ToastContainer } from './components/common/Toast';
import { captureUTMParams } from './utils/utm';

// Lazy-loaded interactive modals (loaded on-demand to optimize initial mobile page load <3s)
const ConsultationModal = lazy(() => import('./components/common/ConsultationModal').then(m => ({ default: m.ConsultationModal })));
const SiteSearchModal = lazy(() => import('./components/common/SiteSearchModal').then(m => ({ default: m.SiteSearchModal })));

// Lazy-loaded route components for instant initial page loading & minimal JS payload
const HomePage = lazy(() => import('./pages/HomePage').then(m => ({ default: m.HomePage })));
const ServicesPage = lazy(() => import('./pages/ServicesPage').then(m => ({ default: m.ServicesPage })));
const ProcessPage = lazy(() => import('./pages/ProcessPage').then(m => ({ default: m.ProcessPage })));
const OurWorkPage = lazy(() => import('./pages/OurWorkPage').then(m => ({ default: m.OurWorkPage })));
const NoesisCaseStudyPage = lazy(() => import('./pages/NoesisCaseStudyPage').then(m => ({ default: m.NoesisCaseStudyPage })));
const WatcherCaseStudyPage = lazy(() => import('./pages/WatcherCaseStudyPage').then(m => ({ default: m.WatcherCaseStudyPage })));
const FrontDeskAICaseStudyPage = lazy(() => import('./pages/FrontDeskAICaseStudyPage').then(m => ({ default: m.FrontDeskAICaseStudyPage })));
const ThreadEyeCaseStudyPage = lazy(() => import('./pages/ThreadEyeCaseStudyPage').then(m => ({ default: m.ThreadEyeCaseStudyPage })));
const GetScryCaseStudyPage = lazy(() => import('./pages/GetScryCaseStudyPage').then(m => ({ default: m.GetScryCaseStudyPage })));
const AboutPage = lazy(() => import('./pages/AboutPage').then(m => ({ default: m.AboutPage })));
const ContactPage = lazy(() => import('./pages/ContactPage').then(m => ({ default: m.ContactPage })));
const ThankYouPage = lazy(() => import('./pages/ThankYouPage').then(m => ({ default: m.ThankYouPage })));
const PrivacyPolicyPage = lazy(() => import('./pages/PrivacyPolicyPage').then(m => ({ default: m.PrivacyPolicyPage })));
const TermsOfServicePage = lazy(() => import('./pages/TermsOfServicePage').then(m => ({ default: m.TermsOfServicePage })));
const RefundPolicyPage = lazy(() => import('./pages/RefundPolicyPage').then(m => ({ default: m.RefundPolicyPage })));
const CookiePolicyPage = lazy(() => import('./pages/CookiePolicyPage').then(m => ({ default: m.CookiePolicyPage })));
const DataDeletionPage = lazy(() => import('./pages/DataDeletionPage').then(m => ({ default: m.DataDeletionPage })));
const UnsubscribePage = lazy(() => import('./pages/UnsubscribePage').then(m => ({ default: m.UnsubscribePage })));
const NotFoundPage = lazy(() => import('./pages/NotFoundPage').then(m => ({ default: m.NotFoundPage })));
const AdminPage = lazy(() => import('./pages/AdminPage'));

// Futuristic Lightweight Loading Fallback
const PageLoader = () => (
  <div className="min-h-[65vh] flex flex-col items-center justify-center gap-4 z-20">
    <div className="relative w-12 h-12 flex items-center justify-center">
      <div className="absolute inset-0 rounded-full border-2 border-cyan-400/20 border-t-cyan-400 animate-spin" />
      <div className="w-2.5 h-2.5 rounded-full bg-cyan-400 shadow-[0_0_12px_#00f0ff] animate-ping" />
    </div>
    <span className="font-mono text-xs text-cyan-300/80 uppercase tracking-widest animate-pulse">
      Loading System Module...
    </span>
  </div>
);

export function App() {
  const [currentPath, setCurrentPath] = useState(window.location.pathname || '/');
  const [isConsultationOpen, setIsConsultationOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);

  // Initialize UTM capture on first landing, enforce dark theme, and setup search listener
  useEffect(() => {
    captureUTMParams();

    // Enforce dark mode permanently and purge light theme state
    try {
      localStorage.removeItem('brixel_theme');
      document.documentElement.classList.remove('light');
      document.documentElement.classList.add('dark');
    } catch (e) {
      // ignore
    }

    const handleOpenSearch = () => setIsSearchOpen(true);
    window.addEventListener('open-site-search', handleOpenSearch);
    return () => window.removeEventListener('open-site-search', handleOpenSearch);
  }, []);

  useEffect(() => {
    const handlePopState = () => {
      setCurrentPath(window.location.pathname || '/');
      if (window.location.hash) {
        const id = window.location.hash.slice(1);
        setTimeout(() => {
          const el = document.getElementById(id);
          if (el) el.scrollIntoView({ behavior: 'smooth' });
        }, 150);
      }
    };
    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, []);

  const navigate = (path) => {
    const [pathWithoutHash, hash] = path.split('#');
    const purePath = (pathWithoutHash || '/').split('?')[0];

    window.history.pushState({}, '', path);
    setCurrentPath(purePath);

    if (hash) {
      window.dispatchEvent(new Event('hashchange'));

      const scrollToElement = () => {
        const el = document.getElementById(hash);
        if (el) {
          el.scrollIntoView({ behavior: 'smooth' });
          return true;
        }
        return false;
      };

      if (!scrollToElement()) {
        setTimeout(scrollToElement, 100);
        setTimeout(scrollToElement, 300);
        setTimeout(scrollToElement, 600);
      }
    } else {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  // Canonical URL slug mapping for legacy aliases, typos, and alternate slugs
  const CANONICAL_SLUG_MAP = {
    '/case-studies/neosis': '/case-studies/noesis',
    '/case-studies/fabric-defect-detection': '/case-studies/threadeye',
    '/case-studies/watcher': '/case-studies/the-watcher',
    '/privacy': '/privacy-policy',
    '/terms': '/terms-of-service',
    '/tos': '/terms-of-service',
    '/refund': '/refund-policy',
    '/refunds': '/refund-policy',
    '/cookies': '/cookie-policy',
    '/cookie': '/cookie-policy',
    '/delete-my-data': '/data-deletion',
    '/gdpr-erasure': '/data-deletion',
    '/opt-out': '/unsubscribe',
    '/optout': '/unsubscribe'
  };

  // Normalize path (lowercase, strip trailing slash except root, strip hash & query, remap aliases)
  let cleanPath = (currentPath || '/').split('?')[0].split('#')[0].toLowerCase();
  if (cleanPath.length > 1 && cleanPath.endsWith('/')) {
    cleanPath = cleanPath.slice(0, -1);
  }
  if (CANONICAL_SLUG_MAP[cleanPath]) {
    cleanPath = CANONICAL_SLUG_MAP[cleanPath];
  }
  const normalizedPath = cleanPath;

  // Auto-clean browser address bar URL slugs
  useEffect(() => {
    const rawPath = window.location.pathname || '/';
    let expected = rawPath.toLowerCase();
    if (expected.length > 1 && expected.endsWith('/')) {
      expected = expected.slice(0, -1);
    }
    if (CANONICAL_SLUG_MAP[expected]) {
      expected = CANONICAL_SLUG_MAP[expected];
    }
    if (window.location.pathname !== expected) {
      window.history.replaceState({}, '', expected + window.location.search + window.location.hash);
      setCurrentPath(expected);
    }
  }, [currentPath]);

  // If on Admin Portal route, render standalone Admin Command Center
  if (normalizedPath === '/admin') {
    return (
      <Suspense fallback={<PageLoader />}>
        <AdminPage />
      </Suspense>
    );
  }

  const renderPage = () => {
    switch (normalizedPath) {
      case '/':
        return (
          <HomePage 
            navigate={navigate} 
            openConsultation={() => setIsConsultationOpen(true)} 
          />
        );
      case '/services':
        return <ServicesPage navigate={navigate} openConsultation={() => setIsConsultationOpen(true)} />;
      case '/process':
        return <ProcessPage navigate={navigate} openConsultation={() => setIsConsultationOpen(true)} />;
      case '/case-studies':
        return <OurWorkPage navigate={navigate} />;
      case '/case-studies/noesis':
      case '/case-studies/neosis':
        return <NoesisCaseStudyPage navigate={navigate} openConsultation={() => setIsConsultationOpen(true)} />;
      case '/case-studies/the-watcher':
      case '/case-studies/watcher':
        return <WatcherCaseStudyPage navigate={navigate} openConsultation={() => setIsConsultationOpen(true)} />;
      case '/case-studies/frontdesk-ai':
        return <FrontDeskAICaseStudyPage navigate={navigate} openConsultation={() => setIsConsultationOpen(true)} />;
      case '/case-studies/threadeye':
      case '/case-studies/fabric-defect-detection':
        return <ThreadEyeCaseStudyPage navigate={navigate} openConsultation={() => setIsConsultationOpen(true)} />;
      case '/case-studies/getscry':
        return <GetScryCaseStudyPage navigate={navigate} openConsultation={() => setIsConsultationOpen(true)} />;
      case '/about':
        return <AboutPage navigate={navigate} openConsultation={() => setIsConsultationOpen(true)} />;
      case '/contact':
        return <ContactPage navigate={navigate} />;
      case '/thank-you':
        return <ThankYouPage navigate={navigate} />;
      case '/privacy-policy':
      case '/privacy':
        return <PrivacyPolicyPage navigate={navigate} />;
      case '/terms-of-service':
      case '/terms':
      case '/tos':
        return <TermsOfServicePage navigate={navigate} />;
      case '/refund-policy':
      case '/refund':
      case '/refunds':
        return <RefundPolicyPage navigate={navigate} />;
      case '/cookie-policy':
      case '/cookies':
        return <CookiePolicyPage navigate={navigate} />;
      case '/data-deletion':
      case '/delete-my-data':
        return <DataDeletionPage navigate={navigate} />;
      case '/unsubscribe':
      case '/opt-out':
        return <UnsubscribePage navigate={navigate} />;
      default:
        // Custom 404 Page
        return <NotFoundPage navigate={navigate} />;
    }
  };

  return (
    <div className="relative min-h-screen bg-[#030c14] text-slate-100 flex flex-col justify-between selection:bg-cyan-400 selection:text-black overflow-x-hidden max-w-[100vw] w-full">
      {/* Skip to Main Content Link for Accessibility */}
      <a 
        href="#main-content" 
        className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-[99999] focus:px-4 focus:py-2.5 focus:bg-cyan-400 focus:text-slate-950 focus:font-extrabold focus:rounded-xl focus:shadow-[0_0_25px_rgba(0,240,255,0.7)] focus:outline-none focus:ring-2 focus:ring-white transition-all text-xs uppercase tracking-wider"
      >
        Skip to main content
      </a>

      {/* Top Hairline Scroll Progress Bar (0 - 100%) */}
      <ScrollProgressBar />

      {/* Dynamic SEO Meta & Canonical Manager */}
      <SEOHead currentPath={normalizedPath} />

      {/* Background neon circuit & particle constellation */}
      <BackgroundEffects />

      {/* Mouse Cursor Cyber Spotlight */}
      <CyberSpotlight />

      {/* Global Sticky / Fixed Navbar */}
      <Navbar 
        currentPath={normalizedPath} 
        navigate={navigate} 
        openConsultation={() => setIsConsultationOpen(true)}
        onOpenSearch={() => setIsSearchOpen(true)}
      />

      {/* Dynamic Page Body with Accessible ID & Lazy Suspense */}
      <main id="main-content" className="flex-grow z-10">
        <Suspense fallback={<PageLoader />}>
          {renderPage()}
        </Suspense>
      </main>

      {/* Global Footer */}
      <Footer navigate={navigate} />

      {/* Global Sticky Social Media Quick-Action Bar (Bottom-Right) */}
      <StickySocialBar />

      {/* Floating Back to Top Button with Circular Scroll Progress Ring (Bottom-Left) */}
      <BackToTop />

      {/* GDPR / CCPA Compliant Glassmorphic Cookie Consent Banner */}
      <CookieBanner navigate={navigate} />

      {/* Global Quick Search Modal (Cmd+K / Ctrl+K) - Lazy Loaded on Demand */}
      {isSearchOpen && (
        <Suspense fallback={null}>
          <SiteSearchModal 
            isOpen={isSearchOpen} 
            onClose={() => setIsSearchOpen(false)} 
            navigate={navigate} 
          />
        </Suspense>
      )}

      {/* Remote Force-Update Screen & Version Manager */}
      <ForceUpdateScreen />

      {/* Global Toast Notification System */}
      <ToastContainer />

      {/* Reusable Consultation Discovery Modal - Lazy Loaded on Demand */}
      {isConsultationOpen && (
        <Suspense fallback={null}>
          <ConsultationModal 
            isOpen={isConsultationOpen} 
            onClose={() => setIsConsultationOpen(false)} 
            navigate={navigate}
          />
        </Suspense>
      )}
    </div>
  );
}

export default App;
