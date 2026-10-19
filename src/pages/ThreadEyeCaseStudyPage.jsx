import React from 'react';
import { 
  CheckCircle2, 
  ChevronRight
} from 'lucide-react';
import { CaseStudyTechMarquee } from '../components/case-studies/CaseStudyTechMarquee';
import { CaseStudyNavigationCTA } from '../components/case-studies/CaseStudyNavigationCTA';

export const ThreadEyeCaseStudyPage = ({ navigate }) => {
  const handleNav = (e, url) => {
    e.preventDefault();
    if (navigate) {
      navigate(url);
    } else {
      window.location.href = url;
    }
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const threadEyeTechnologies = [
    { name: 'YOLOv8 & YOLOv9', category: 'Computer Vision', icon: 'YOLO', hoverBorder: 'hover:border-cyan-400/50' },
    { name: 'PyTorch', category: 'Deep Learning', icon: 'PyTorch', hoverBorder: 'hover:border-orange-500/50' },
    { name: 'OpenCV', category: 'Camera Feeds', icon: 'OpenCV', hoverBorder: 'hover:border-blue-400/50' },
    { name: 'NVIDIA Jetson', category: 'Edge AI Hardware', icon: 'NVIDIA', hoverBorder: 'hover:border-emerald-500/50' },
    { name: 'CUDA & TensorRT', category: 'GPU Acceleration', icon: 'CUDA', hoverBorder: 'hover:border-green-400/50' },
    { name: 'FastAPI', category: 'Sub-10ms Microservice', icon: 'FastAPI', hoverBorder: 'hover:border-teal-400/50' },
    { name: 'Redis', category: 'Frame Buffer & Cache', icon: 'Redis', hoverBorder: 'hover:border-red-500/50' },
    { name: 'PostgreSQL', category: 'Defect History DB', icon: 'PostgreSQL', hoverBorder: 'hover:border-sky-500/50' },
    { name: 'Docker on Edge', category: 'Containerization', icon: 'Docker', hoverBorder: 'hover:border-blue-500/50' },
    { name: 'Python', category: 'Core Language', icon: 'Python', hoverBorder: 'hover:border-yellow-400/50' },
    { name: 'React', category: 'Operator QA Screen', icon: 'React', hoverBorder: 'hover:border-cyan-400/50' }
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
        <span className="text-slate-200 font-medium">ThreadEye</span>
      </nav>

      {/* Header Section */}
      <header className="mb-14 space-y-4">
        <h1 className="text-3xl sm:text-5xl lg:text-6xl font-extrabold text-white tracking-tight leading-tight">
          ThreadEye: Real-Time Fabric Defect Detection
        </h1>

        <p className="text-base sm:text-lg text-slate-300 max-w-3xl font-normal leading-relaxed pt-2">
          An industrial camera AI platform detecting textile defects, knots, and oil flaws at high production line speeds. Built to run directly on factory hardware, ThreadEye inspects high-speed fabric rolls in real time directly on the production floor.
        </p>
      </header>

      {/* The Challenge / Problem Section */}
      <section className="mb-20 pt-4">
        <div className="space-y-6">
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-white tracking-tight">
            The Problem: Human Eye Fatigue &amp; Costly Mill Waste
          </h2>

          <p className="text-base sm:text-lg text-slate-300 leading-relaxed max-w-4xl font-normal">
            Textile manufacturing operates at high roll velocities. Relying on human visual inspectors causes defect miss rates up to 18% due to eye fatigue. Unnoticed yarn snags and oil spots travel downstream to finishing and cutting, causing massive roll rejections, heavy financial chargebacks, and wasted raw materials.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-6">
            <div className="border-l-2 border-red-500/50 pl-4 space-y-1.5">
              <h3 className="text-sm font-semibold text-white">Human Inspector Fatigue</h3>
              <p className="text-xs sm:text-sm text-slate-400 leading-relaxed">
                Worker fatigue on rapid loom lines causes micro-scale yarn snags and broken threads to escape undetected.
              </p>
            </div>

            <div className="border-l-2 border-red-500/50 pl-4 space-y-1.5">
              <h3 className="text-sm font-semibold text-white">Costly Rejected Shipments</h3>
              <p className="text-xs sm:text-sm text-slate-400 leading-relaxed">
                Export garments returned by overseas buyers due to weave flaws cost mills tens of thousands of dollars per batch.
              </p>
            </div>

            <div className="border-l-2 border-red-500/50 pl-4 space-y-1.5">
              <h3 className="text-sm font-semibold text-white">Cloud AI Fails in Factories</h3>
              <p className="text-xs sm:text-sm text-slate-400 leading-relaxed">
                Industrial facilities suffer from unreliable internet connections; cloud-dependent computer vision models experience fatal latency lags.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* The Solution Section */}
      <section className="mb-24 pt-12 border-t border-slate-800/80">
        <div className="space-y-6">
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-white tracking-tight">
            The Solution: On-Premise Real-Time Camera AI
          </h2>

          <p className="text-base sm:text-lg text-slate-300 leading-relaxed max-w-4xl font-normal">
            BrixelLabs built a dedicated AI camera system installed directly beside the fabric looms. Using optimized computer vision, ThreadEye inspects fabric in real time, catches defects reliably, and alerts factory operators instantly.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-6">
            <div className="border-l-2 border-cyan-400/60 pl-4 space-y-1.5">
              <h3 className="text-sm font-semibold text-white flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-cyan-400 shrink-0" />
                <span>100% On-Premise Industrial AI</span>
              </h3>
              <p className="text-xs sm:text-sm text-slate-400 leading-relaxed">
                Operates 24/7 directly on factory edge hardware with zero reliance on cloud connections or external internet.
              </p>
            </div>

            <div className="border-l-2 border-cyan-400/60 pl-4 space-y-1.5">
              <h3 className="text-sm font-semibold text-white flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-cyan-400 shrink-0" />
                <span>Sub-10ms Automated Stop Triggers</span>
              </h3>
              <p className="text-xs sm:text-sm text-slate-400 leading-relaxed">
                Instant relay signals stop weaving machinery before an entire 500-meter roll is ruined by a recurring snag.
              </p>
            </div>

            <div className="border-l-2 border-cyan-400/60 pl-4 space-y-1.5">
              <h3 className="text-sm font-semibold text-white flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-cyan-400 shrink-0" />
                <span>Automated Roll QA Certificates</span>
              </h3>
              <p className="text-xs sm:text-sm text-slate-400 leading-relaxed">
                Generates tamper-proof batch defect density audit logs for export buyers, accelerating QA clearance times by 4x.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Infinite Flowing Technology Stack Marquee */}
      <CaseStudyTechMarquee 
        title="Technology Stack Flow" 
        technologies={threadEyeTechnologies} 
      />

      {/* Related Case Studies & Engineering Consultation CTA */}
      <CaseStudyNavigationCTA 
        currentSlug="threadeye" 
        navigate={navigate} 
      />

    </div>
  );
};
