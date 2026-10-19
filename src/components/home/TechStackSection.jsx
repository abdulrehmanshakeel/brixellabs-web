import React from 'react';

import * as OfficialIcons from '../common/OfficialTechIcons';

// Authentic Official Colored Brand Logos mapped to each technology
const TechIcons = {
  Python: OfficialIcons.PythonIcon,
  OpenAI: OfficialIcons.OpenAIIcon,
  Claude: OfficialIcons.ClaudeIcon,
  Gemini: OfficialIcons.GeminiIcon,
  Grok: OfficialIcons.GrokIcon,
  LangChain: OfficialIcons.LangChainIcon,
  LangGraph: OfficialIcons.LangGraphIcon,
  HuggingFace: OfficialIcons.HuggingFaceIcon,
  PyTorch: OfficialIcons.PyTorchIcon,
  TensorFlow: OfficialIcons.TensorFlowIcon,
  Keras: OfficialIcons.KerasIcon,
  ScikitLearn: OfficialIcons.ScikitLearnIcon,
  OpenCV: OfficialIcons.OpenCVIcon,
  YOLO: OfficialIcons.YOLOIcon,
  React: OfficialIcons.ReactIcon,
  JavaScript: OfficialIcons.JavaScriptIcon,
  HTML5: OfficialIcons.HTML5Icon,
  CSS3: OfficialIcons.CSS3Icon,
  Flutter: OfficialIcons.FlutterIcon,
  Figma: OfficialIcons.FigmaIcon,
  Canva: OfficialIcons.CanvaIcon,
  Shopify: OfficialIcons.ShopifyIcon,
  FastAPI: OfficialIcons.FastAPIIcon,
  Django: OfficialIcons.DjangoIcon,
  Flask: OfficialIcons.FlaskIcon,
  JSON: OfficialIcons.JSONIcon,
  Playwright: OfficialIcons.PlaywrightIcon,
  Selenium: OfficialIcons.SeleniumIcon,
  Pandas: OfficialIcons.PandasIcon,
  NumPy: OfficialIcons.NumPyIcon,
  PostgreSQL: OfficialIcons.PostgreSQLIcon,
  Excel: OfficialIcons.ExcelIcon,
  PowerBI: OfficialIcons.PowerBIIcon,
  BeautifulSoup: OfficialIcons.BeautifulSoupIcon,
  Docker: OfficialIcons.DockerIcon,
  GitHub: OfficialIcons.GitHubIcon,
  Firebase: OfficialIcons.FirebaseIcon,
  Supabase: OfficialIcons.SupabaseIcon,
  Neon: OfficialIcons.NeonIcon,
  Render: OfficialIcons.RenderIcon,
  Vercel: OfficialIcons.VercelIcon
};


export const TechStackSection = () => {
  // Row 1: AI, LLM, Deep Learning, Vision & Agentic Frameworks (14)
  const row1 = [
    { name: 'Python', category: 'Core Language', Icon: TechIcons.Python, hoverBorder: 'hover:border-yellow-400/50' },
    { name: 'OpenAI', category: 'GPT-4o & Reasoning', Icon: TechIcons.OpenAI, hoverBorder: 'hover:border-emerald-400/50' },
    { name: 'Claude', category: 'Anthropic AI', Icon: TechIcons.Claude, hoverBorder: 'hover:border-amber-500/50' },
    { name: 'Gemini', category: 'Google Multimodal', Icon: TechIcons.Gemini, hoverBorder: 'hover:border-purple-400/50' },
    { name: 'Grok', category: 'xAI Intelligence', Icon: TechIcons.Grok, hoverBorder: 'hover:border-red-500/50' },
    { name: 'LangChain', category: 'Context & RAG', Icon: TechIcons.LangChain, hoverBorder: 'hover:border-emerald-400/50' },
    { name: 'LangGraph', category: 'Multi-Agent Swarms', Icon: TechIcons.LangGraph, hoverBorder: 'hover:border-cyan-400/50' },
    { name: 'Hugging Face', category: 'Open Models', Icon: TechIcons.HuggingFace, hoverBorder: 'hover:border-yellow-400/50' },
    { name: 'PyTorch', category: 'Deep Learning', Icon: TechIcons.PyTorch, hoverBorder: 'hover:border-orange-500/50' },
    { name: 'TensorFlow', category: 'Neural Pipelines', Icon: TechIcons.TensorFlow, hoverBorder: 'hover:border-amber-500/50' },
    { name: 'Keras', category: 'High-Level DL', Icon: TechIcons.Keras, hoverBorder: 'hover:border-red-600/50' },
    { name: 'Scikit-Learn', category: 'Predictive ML', Icon: TechIcons.ScikitLearn, hoverBorder: 'hover:border-orange-400/50' },
    { name: 'OpenCV', category: 'Computer Vision', Icon: TechIcons.OpenCV, hoverBorder: 'hover:border-blue-400/50' },
    { name: 'YOLO', category: 'Real-Time Detection', Icon: TechIcons.YOLO, hoverBorder: 'hover:border-cyan-400/50' },
  ];

  // Row 2: Full-Stack Web, Mobile, Design & Automation (14)
  const row2 = [
    { name: 'React', category: 'Frontend UI', Icon: TechIcons.React, hoverBorder: 'hover:border-cyan-400/50' },
    { name: 'JavaScript', category: 'Web Programming', Icon: TechIcons.JavaScript, hoverBorder: 'hover:border-yellow-400/50' },
    { name: 'HTML5', category: 'Semantic Web', Icon: TechIcons.HTML5, hoverBorder: 'hover:border-orange-500/50' },
    { name: 'CSS3', category: 'Modern Styling', Icon: TechIcons.CSS3, hoverBorder: 'hover:border-blue-500/50' },
    { name: 'Flutter', category: 'Cross-Platform Mobile', Icon: TechIcons.Flutter, hoverBorder: 'hover:border-sky-400/50' },
    { name: 'Figma', category: 'UI/UX Design', Icon: TechIcons.Figma, hoverBorder: 'hover:border-purple-400/50' },
    { name: 'Canva', category: 'Visual Production', Icon: TechIcons.Canva, hoverBorder: 'hover:border-teal-400/50' },
    { name: 'Shopify', category: 'Store Development', Icon: TechIcons.Shopify, hoverBorder: 'hover:border-emerald-400/50' },
    { name: 'FastAPI', category: 'Async Python APIs', Icon: TechIcons.FastAPI, hoverBorder: 'hover:border-teal-400/50' },
    { name: 'Django', category: 'Full-Stack Backend', Icon: TechIcons.Django, hoverBorder: 'hover:border-emerald-600/50' },
    { name: 'Flask', category: 'Microservices', Icon: TechIcons.Flask, hoverBorder: 'hover:border-slate-300/50' },
    { name: 'JSON', category: 'Data Exchange', Icon: TechIcons.JSON, hoverBorder: 'hover:border-amber-400/50' },
    { name: 'Playwright', category: 'Browser Automation', Icon: TechIcons.Playwright, hoverBorder: 'hover:border-green-500/50' },
    { name: 'Selenium', category: 'Automated Crawling', Icon: TechIcons.Selenium, hoverBorder: 'hover:border-emerald-500/50' },
  ];

  // Row 3: Databases, Data Analytics, Cloud & DevOps (13)
  const row3 = [
    { name: 'Pandas', category: 'Data Wrangling', Icon: TechIcons.Pandas, hoverBorder: 'hover:border-pink-500/50' },
    { name: 'NumPy', category: 'Numerical Computing', Icon: TechIcons.NumPy, hoverBorder: 'hover:border-blue-400/50' },
    { name: 'PostgreSQL', category: 'Relational DB', Icon: TechIcons.PostgreSQL, hoverBorder: 'hover:border-blue-500/50' },
    { name: 'Excel', category: 'Dashboards & Modeling', Icon: TechIcons.Excel, hoverBorder: 'hover:border-green-600/50' },
    { name: 'Power BI', category: 'BI Analytics', Icon: TechIcons.PowerBI, hoverBorder: 'hover:border-yellow-400/50' },
    { name: 'Beautiful Soup', category: 'HTML Scraping', Icon: TechIcons.BeautifulSoup, hoverBorder: 'hover:border-teal-400/50' },
    { name: 'Docker', category: 'Containers', Icon: TechIcons.Docker, hoverBorder: 'hover:border-blue-500/50' },
    { name: 'GitHub', category: 'Version Control & CI/CD', Icon: TechIcons.GitHub, hoverBorder: 'hover:border-purple-400/50' },
    { name: 'Firebase', category: 'Realtime Backend', Icon: TechIcons.Firebase, hoverBorder: 'hover:border-amber-400/50' },
    { name: 'Supabase', category: 'Serverless Postgres', Icon: TechIcons.Supabase, hoverBorder: 'hover:border-emerald-400/50' },
    { name: 'Neon', category: 'Serverless DB', Icon: TechIcons.Neon, hoverBorder: 'hover:border-green-400/50' },
    { name: 'Render', category: 'Cloud Hosting', Icon: TechIcons.Render, hoverBorder: 'hover:border-teal-400/50' },
    { name: 'Vercel', category: 'Edge Deployment', Icon: TechIcons.Vercel, hoverBorder: 'hover:border-white/50' },
  ];

  // Triplicate array for smooth, infinite marquee loop
  const marqueeRow1 = [...row1, ...row1, ...row1];
  const marqueeRow2 = [...row2, ...row2, ...row2];
  const marqueeRow3 = [...row3, ...row3, ...row3];

  return (
    <section className="relative py-20 sm:py-24 overflow-hidden border-y border-slate-800/80 bg-gradient-to-b from-transparent via-[#020b14]/60 to-transparent" id="technologies">
      
      {/* Background ambient glowing orbs */}
      <div className="absolute top-1/2 left-1/4 -translate-y-1/2 w-96 h-96 bg-cyan-500/5 rounded-full blur-[140px] pointer-events-none"></div>
      <div className="absolute top-1/2 right-1/4 -translate-y-1/2 w-96 h-96 bg-teal-500/5 rounded-full blur-[140px] pointer-events-none"></div>

      {/* Section Header */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 text-center mb-12 sm:mb-14 space-y-3 relative z-10">
        <h2 className="font-heading text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white tracking-tight leading-tight">
          Technologies We Build With
        </h2>

        <p className="text-sm sm:text-base text-slate-400 max-w-2xl mx-auto font-normal leading-relaxed">
          Production AI models, multi-agent frameworks, high-throughput web architectures, data scraping pipelines, and scalable cloud backends.
        </p>
      </div>

      {/* Marquee Wrapper with Edge Fade Gradient Masks */}
      <div className="relative w-full space-y-3.5 pause-hover select-none [mask-image:linear-gradient(to_right,transparent_0%,black_8%,black_92%,transparent_100%)]">
        
        {/* Row 1: Scrolling Left (AI, LLM, Vision, Neural) */}
        <div className="animate-marquee-left flex items-center gap-3.5">
          {marqueeRow1.map((tech, idx) => {
            const IconComponent = tech.Icon;
            return (
              <div
                key={`r1-${idx}`}
                className={`flex items-center gap-3 px-4 py-2.5 rounded-xl bg-[#041220]/85 border border-slate-800/90 ${tech.hoverBorder} hover:bg-[#071d32] transition-all duration-200 cursor-default flex-shrink-0 group shadow-md`}
              >
                <div className="w-8 h-8 rounded-lg bg-[#020912] border border-slate-800 flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform shadow-inner">
                  <IconComponent />
                </div>
                <div>
                  <div className="font-bold text-white text-sm tracking-tight group-hover:text-cyan-300 transition-colors">
                    {tech.name}
                  </div>
                  <div className="text-[10px] font-mono text-slate-400 uppercase tracking-wider">
                    {tech.category}
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Row 2: Scrolling Right (Web, Mobile, Design & Automation) */}
        <div className="animate-marquee-right flex items-center gap-3.5">
          {marqueeRow2.map((tech, idx) => {
            const IconComponent = tech.Icon;
            return (
              <div
                key={`r2-${idx}`}
                className={`flex items-center gap-3 px-4 py-2.5 rounded-xl bg-[#041220]/85 border border-slate-800/90 ${tech.hoverBorder} hover:bg-[#071d32] transition-all duration-200 cursor-default flex-shrink-0 group shadow-md`}
              >
                <div className="w-8 h-8 rounded-lg bg-[#020912] border border-slate-800 flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform shadow-inner">
                  <IconComponent />
                </div>
                <div>
                  <div className="font-bold text-white text-sm tracking-tight group-hover:text-cyan-300 transition-colors">
                    {tech.name}
                  </div>
                  <div className="text-[10px] font-mono text-slate-400 uppercase tracking-wider">
                    {tech.category}
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Row 3: Scrolling Left (Analytics, Cloud, Databases & DevOps) */}
        <div className="animate-marquee-left flex items-center gap-3.5">
          {marqueeRow3.map((tech, idx) => {
            const IconComponent = tech.Icon;
            return (
              <div
                key={`r3-${idx}`}
                className={`flex items-center gap-3 px-4 py-2.5 rounded-xl bg-[#041220]/85 border border-slate-800/90 ${tech.hoverBorder} hover:bg-[#071d32] transition-all duration-200 cursor-default flex-shrink-0 group shadow-md`}
              >
                <div className="w-8 h-8 rounded-lg bg-[#020912] border border-slate-800 flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform shadow-inner">
                  <IconComponent />
                </div>
                <div>
                  <div className="font-bold text-white text-sm tracking-tight group-hover:text-cyan-300 transition-colors">
                    {tech.name}
                  </div>
                  <div className="text-[10px] font-mono text-slate-400 uppercase tracking-wider">
                    {tech.category}
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

export default TechStackSection;
