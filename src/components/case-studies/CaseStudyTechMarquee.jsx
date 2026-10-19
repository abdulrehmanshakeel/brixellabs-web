import React from 'react';

import * as OfficialIcons from '../common/OfficialTechIcons';

// Authentic Official Colored Brand SVGs for all Case Study Technologies
export const BrandIcons = {
  Python: OfficialIcons.PythonIcon,
  PyTorch: OfficialIcons.PyTorchIcon,
  YOLO: OfficialIcons.YOLOIcon,
  OpenCV: OfficialIcons.OpenCVIcon,
  NVIDIA: OfficialIcons.NVIDIAIcon,
  CUDA: OfficialIcons.CUDAIcon,
  FastAPI: OfficialIcons.FastAPIIcon,
  Redis: OfficialIcons.RedisIcon,
  PostgreSQL: OfficialIcons.PostgreSQLIcon,
  Docker: OfficialIcons.DockerIcon,
  React: OfficialIcons.ReactIcon,
  Flutter: OfficialIcons.FlutterIcon,
  Kotlin: OfficialIcons.KotlinIcon,
  Android: OfficialIcons.AndroidIcon,
  LangGraph: OfficialIcons.LangGraphIcon,
  LangChain: OfficialIcons.LangChainIcon,
  Groq: OfficialIcons.GroqIcon,
  Meta: OfficialIcons.MetaIcon,
  OpenAI: OfficialIcons.OpenAIIcon,
  WhatsApp: OfficialIcons.WhatsAppIcon,
  WebSockets: OfficialIcons.WebSocketsIcon,
  ScikitLearn: OfficialIcons.ScikitLearnIcon,
  Pandas: OfficialIcons.PandasIcon,
  NumPy: OfficialIcons.NumPyIcon,
  Shopify: OfficialIcons.ShopifyIcon,
  TailwindCSS: OfficialIcons.TailwindCSSIcon,
  Tavily: OfficialIcons.TavilyIcon,
  Streamlit: OfficialIcons.StreamlitIcon,
  Twilio: OfficialIcons.TwilioIcon
};

/**
 * CaseStudyTechMarquee
 * Smooth, infinite flowing horizontal marquee replicating the homepage enterprise marquee
 * for the specific technologies used in a case study.
 */
export const CaseStudyTechMarquee = ({ title, technologies = [] }) => {
  if (!technologies || technologies.length === 0) return null;

  // Quadruple the array to guarantee seamless infinite loop regardless of screen width
  const marqueeItems = [
    ...technologies,
    ...technologies,
    ...technologies,
    ...technologies
  ];

  return (
    <section className="mb-20 space-y-6">
      {/* Section Header */}
      <div className="border-b border-slate-800 pb-3 flex items-center justify-between">
        <div>
          <h2 className="text-xl sm:text-2xl font-bold text-white tracking-tight">
            {title || 'Technologies & Architecture Used'}
          </h2>
          <p className="text-xs sm:text-sm text-slate-400 mt-1">
            Production-grade stack engineered specifically for this project.
          </p>
        </div>
      </div>

      {/* Infinite Flowing Marquee */}
      <div className="relative w-full overflow-hidden py-3 pause-hover">
        {/* Left & Right Smooth Edge Fade Masks */}
        <div className="absolute left-0 top-0 bottom-0 w-12 sm:w-24 bg-gradient-to-r from-[#030c14] to-transparent z-10 pointer-events-none" />
        <div className="absolute right-0 top-0 bottom-0 w-12 sm:w-24 bg-gradient-to-l from-[#030c14] to-transparent z-10 pointer-events-none" />

        <div className="animate-marquee-left flex items-center gap-3.5">
          {marqueeItems.map((tech, idx) => {
            const iconKey = tech.icon || tech.brand || tech.name;
            const IconComponent = BrandIcons[iconKey] || OfficialIcons.getOfficialIcon(iconKey);
            const subtitle = tech.category || tech.role || 'Enterprise Tech';
            return (
              <div
                key={`cstm-${idx}`}
                className={`flex items-center gap-3 px-4 py-2.5 rounded-xl bg-[#041220]/85 border border-slate-800/90 ${
                  tech.hoverBorder || 'hover:border-cyan-400/50'
                } hover:bg-[#071d32] transition-all duration-200 cursor-default flex-shrink-0 group shadow-md`}
              >
                <div className="w-8 h-8 rounded-lg bg-[#020912] border border-slate-800 flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform shadow-inner">
                  <IconComponent />
                </div>
                <div>
                  <div className="font-bold text-white text-sm tracking-tight group-hover:text-cyan-300 transition-colors">
                    {tech.name}
                  </div>
                  <div className="text-[10px] font-mono text-slate-400 uppercase tracking-wider">
                    {subtitle}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default CaseStudyTechMarquee;
