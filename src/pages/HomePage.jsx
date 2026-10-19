import React, { useState } from 'react';
import { HeroSection } from '../components/home/HeroSection';
import { TechStackSection } from '../components/home/TechStackSection';
import { ServicesGrid } from '../components/home/ServicesGrid';
import { FeaturedCaseStudies } from '../components/home/FeaturedCaseStudies';
import { ProcessSummary } from '../components/home/ProcessSummary';
import { FAQSection } from '../components/common/FAQSection';
import { ScheduleConsultationSection } from '../components/common/ScheduleConsultationSection';
import { VideoShowreelModal } from '../components/common/VideoShowreelModal';

export const HomePage = ({ navigate, openConsultation }) => {
  const [isShowreelOpen, setIsShowreelOpen] = useState(false);
  const [showreelChannel, setShowreelChannel] = useState(0);

  const handleOpenShowreel = (channel = 0) => {
    setShowreelChannel(channel);
    setIsShowreelOpen(true);
  };

  return (
    <div className="relative">
      {/* 1. Hero Section with Interactive Video Console */}
      <HeroSection 
        navigate={navigate} 
        openConsultation={openConsultation} 
        openShowreel={handleOpenShowreel} 
      />

      {/* 2. Enterprise Technologies Infinite Marquee */}
      <TechStackSection />

      {/* 3. Engineering Capabilities Grid */}
      <ServicesGrid navigate={navigate} />

      {/* 4. Featured Case Studies */}
      <FeaturedCaseStudies navigate={navigate} openShowreel={handleOpenShowreel} />

      {/* 5. Agile Engineering Process */}
      <ProcessSummary navigate={navigate} />

      {/* 7. Interactive FAQ Accordion */}
      <FAQSection openConsultation={openConsultation} showCta={false} />

      {/* 7. Schedule Free Consultation */}
      <ScheduleConsultationSection />

      {/* Video Showreel Live Modal */}
      <VideoShowreelModal
        isOpen={isShowreelOpen}
        onClose={() => setIsShowreelOpen(false)}
        defaultChannel={showreelChannel}
      />
    </div>
  );
};
