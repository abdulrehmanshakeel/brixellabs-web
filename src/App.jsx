import React, { useState, useEffect, lazy, Suspense } from 'react';
import { BackgroundEffects } from './components/layout/BackgroundEffects';
import { Navbar } from './components/layout/Navbar';
import { Footer } from './components/layout/Footer';
import { ConsultationModal } from './components/common/ConsultationModal';
import { CyberSpotlight } from './components/common/CyberSpotlight';
import { SEOHead } from './components/common/SEOHead';

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

  useEffect(() => {
    const handlePopState = () => {
      setCurrentPath(window.location.pathname || '/');
    };
    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, []);

  const navigate = (path) => {
    window.history.pushState({}, '', path);
    setCurrentPath(path);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Normalize path (remove trailing slash except root)
  const normalizedPath = currentPath.length > 1 && currentPath.endsWith('/') 
    ? currentPath.slice(0, -1) 
    : currentPath;

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
      default:
        // Custom 404 Page
        return <NotFoundPage navigate={navigate} />;
    }
  };

  return (
    <div className="relative min-h-screen bg-[#030c14] text-slate-100 flex flex-col justify-between selection:bg-cyan-400 selection:text-black">
      {/* Dynamic SEO Meta & Canonical Manager */}
      <SEOHead currentPath={normalizedPath} />

      {/* Background neon circuit & particle constellation */}
      <BackgroundEffects />

      {/* Mouse Cursor Cyber Spotlight */}
      <CyberSpotlight />

      {/* Global Navbar */}
      <Navbar 
        currentPath={normalizedPath} 
        navigate={navigate} 
        openConsultation={() => setIsConsultationOpen(true)} 
      />

      {/* Dynamic Page Body with Lazy Suspense */}
      <main className="flex-grow z-10">
        <Suspense fallback={<PageLoader />}>
          {renderPage()}
        </Suspense>
      </main>

      {/* Global Footer */}
      <Footer navigate={navigate} />

      {/* Reusable Consultation Discovery Modal */}
      <ConsultationModal 
        isOpen={isConsultationOpen} 
        onClose={() => setIsConsultationOpen(false)} 
        navigate={navigate}
      />
    </div>
  );
}

export default App;
