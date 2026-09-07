import React, { useState, useEffect } from 'react';
import { BackgroundEffects } from './components/layout/BackgroundEffects';
import { Navbar } from './components/layout/Navbar';
import { Footer } from './components/layout/Footer';
import { ConsultationModal } from './components/common/ConsultationModal';
import { CyberSpotlight } from './components/common/CyberSpotlight';

// Pages
import { HomePage } from './pages/HomePage';
import { ServicesPage } from './pages/ServicesPage';
import { ProcessPage } from './pages/ProcessPage';
import { OurWorkPage } from './pages/OurWorkPage';
import { NoesisCaseStudyPage } from './pages/NoesisCaseStudyPage';
import { WatcherCaseStudyPage } from './pages/WatcherCaseStudyPage';
import { FrontDeskAICaseStudyPage } from './pages/FrontDeskAICaseStudyPage';
import { ThreadEyeCaseStudyPage } from './pages/ThreadEyeCaseStudyPage';
import { GetScryCaseStudyPage } from './pages/GetScryCaseStudyPage';
import { AboutPage } from './pages/AboutPage';
import { ContactPage } from './pages/ContactPage';
import AdminPage from './pages/AdminPage';

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

  // If on Admin Portal route, render standalone Admin Command Center
  if (currentPath === '/admin') {
    return <AdminPage />;
  }

  const renderPage = () => {
    switch (currentPath) {
      case '/services':
        return <ServicesPage openConsultation={() => setIsConsultationOpen(true)} />;
      case '/process':
        return <ProcessPage openConsultation={() => setIsConsultationOpen(true)} />;
      case '/case-studies':
        return <OurWorkPage navigate={navigate} />;
      case '/case-studies/noesis':
      case '/case-studies/neosis':
        return <NoesisCaseStudyPage openConsultation={() => setIsConsultationOpen(true)} />;
      case '/case-studies/the-watcher':
        return <WatcherCaseStudyPage openConsultation={() => setIsConsultationOpen(true)} />;
      case '/case-studies/frontdesk-ai':
        return <FrontDeskAICaseStudyPage openConsultation={() => setIsConsultationOpen(true)} />;
      case '/case-studies/threadeye':
      case '/case-studies/fabric-defect-detection':
        return <ThreadEyeCaseStudyPage openConsultation={() => setIsConsultationOpen(true)} />;
      case '/case-studies/getscry':
        return <GetScryCaseStudyPage openConsultation={() => setIsConsultationOpen(true)} />;
      case '/about':
        return <AboutPage navigate={navigate} openConsultation={() => setIsConsultationOpen(true)} />;
      case '/contact':
        return <ContactPage />;
      case '/':
      default:
        return (
          <HomePage 
            navigate={navigate} 
            openConsultation={() => setIsConsultationOpen(true)} 
          />
        );
    }
  };

  return (
    <div className="relative min-h-screen bg-[#030c14] text-slate-100 flex flex-col justify-between selection:bg-cyan-400 selection:text-black">
      {/* Background neon circuit & particle constellation */}
      <BackgroundEffects />

      {/* Mouse Cursor Cyber Spotlight */}
      <CyberSpotlight />

      {/* Global Navbar */}
      <Navbar 
        currentPath={currentPath} 
        navigate={navigate} 
        openConsultation={() => setIsConsultationOpen(true)} 
      />

      {/* Dynamic Page Body */}
      <main className="flex-grow z-10">
        {renderPage()}
      </main>

      {/* Global Footer */}
      <Footer navigate={navigate} />

      {/* Reusable Consultation Discovery Modal */}
      <ConsultationModal 
        isOpen={isConsultationOpen} 
        onClose={() => setIsConsultationOpen(false)} 
      />
    </div>
  );
}

export default App;
