import React from 'react';
import { HeroSection } from '../components/home/HeroSection';
import { ServicesGrid } from '../components/home/ServicesGrid';
import { FeaturedCaseStudies } from '../components/home/FeaturedCaseStudies';
import { ProcessSummary } from '../components/home/ProcessSummary';
import { ScheduleConsultationSection } from '../components/common/ScheduleConsultationSection';

export const HomePage = ({ navigate, openConsultation }) => {
  return (
    <div className="relative">
      {/* 1. Hero Section with Interactive Video Console */}
      <HeroSection navigate={navigate} openConsultation={openConsultation} />

      {/* 2. 8 Service Cards Grid with 3D Tilt */}
      <ServicesGrid navigate={navigate} />

      {/* 3. Featured Case Studies */}
      <FeaturedCaseStudies navigate={navigate} />

      {/* 4. Process (1. Design, 2. Build, 3. Automate) */}
      <ProcessSummary navigate={navigate} />

      {/* 5. Schedule Free Consultation */}
      <ScheduleConsultationSection />
    </div>
  );
};
