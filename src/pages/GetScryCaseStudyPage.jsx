import React, { useState } from 'react';
import { 
  TrendingUp, 
  BarChart3, 
  Users, 
  ShoppingBag, 
  Brain, 
  CheckCircle2, 
  ArrowRight, 
  Mail, 
  Cpu, 
  ShieldCheck, 
  Zap, 
  Layers, 
  Search,
  ExternalLink,
  PieChart,
  Eye,
  Maximize2,
  X,
  Gauge,
  Activity,
  Target,
  ArrowUpRight,
  Sliders,
  Filter,
  MousePointerClick,
  LineChart,
  DollarSign,
  Clock,
  Send,
  Radio,
  FileCheck,
  Play
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { TiltCard } from '../components/common/TiltCard';
import { VideoPlayer } from '../components/common/VideoPlayer';
import { projectImages } from '../assets/projects';

export const GetScryCaseStudyPage = ({ openConsultation }) => {
  const [activeTab, setActiveTab] = useState('video'); // 'video' | 'dashboard' | 'sessions' | 'storefront'
  const [selectedImageModal, setSelectedImageModal] = useState(null);
  const [selectedPersona, setSelectedPersona] = useState('high_buyer');

  // Interactive Live Scoring Simulator Profiles (Professional Theme)
  const shopperPersonas = {
    high_buyer: {
      title: 'High-Intent Ready Buyer',
      id: 'sess_1787989955150_fr8z6p4e',
      customer: 'Anonymous Shopper',
      duration: '93.3s',
      pages: 4,
      score: 99.2,
      signal: 'High',
      signalColor: 'text-emerald-300 bg-emerald-950/80 border-emerald-500/40',
      barColor: 'from-cyan-400 via-teal-400 to-emerald-400',
      icon: Zap,
      reasons: [
        'Viewed checkout and sizing guide pages that strongly correlate with immediate purchase',
        'Direct arrival via high-converting paid search campaign with high buy-intent keywords',
        'Rapid consecutive add-to-cart and shipping policy inspections within 90 seconds'
      ],
      actionTitle: 'Targeted Dynamic Offer Triggered',
      action: 'Automated 5% welcome incentive banner + prioritized one-click checkout overlay dispatched.',
      outcome: '+42% higher probability of completing order within current session.'
    },
    medium_lead: {
      title: 'Identified High-Value Lead',
      id: 'sess_1787990038639_lead',
      customer: 'Amna Ali (anasahmed.aliahmed@gmail.com)',
      duration: '161.0s',
      pages: 7,
      score: 54.4,
      signal: 'Medium',
      signalColor: 'text-cyan-300 bg-cyan-950/80 border-cyan-500/40',
      barColor: 'from-blue-500 via-cyan-400 to-teal-300',
      icon: Mail,
      reasons: [
        'Extensive product comparison across 7 catalog pages showing sustained interest',
        'Hesitation detected on product review & specification accordions',
        'Identified registered lead: email successfully tied to active session stream'
      ],
      actionTitle: 'Sales CRM & Email Workflow Triggered',
      action: 'Automated 1-click personalized email outreach queued with tailored recommendations.',
      outcome: 'Re-engages customer within 15 minutes before cart abandonment.'
    },
    casual_browser: {
      title: 'Casual Window Shopper',
      id: 'sess_1787989671874_6f9nytg4',
      customer: 'Anonymous Visitor',
      duration: '54.8s',
      pages: 1,
      score: 8.4,
      signal: 'Low',
      signalColor: 'text-slate-300 bg-slate-900/80 border-slate-700/60',
      barColor: 'from-slate-600 via-slate-500 to-slate-400',
      icon: ShieldCheck,
      reasons: [
        'Single homepage bounce with no product or pricing interaction',
        'Quick exit pattern consistent with organic exploratory browsing',
        'Zero cart additions or shipping inquiries'
      ],
      actionTitle: 'Margin Protection Protocol Active',
      action: 'Suppresses unnecessary discount codes to protect margins — routed to standard low-cost retargeting.',
      outcome: 'Eliminates wasteful promo code leakage on visitors unlikely to convert.'
    }
  };

  const currentPersona = shopperPersonas[selectedPersona];
  const PersonaIcon = currentPersona.icon;

  // 5-Step Pipeline Steps matching FabricDefect & Noesis structure
  const pipelineSteps = [
    { 
      num: '01', 
      title: 'Telemetry Capture', 
      desc: 'Async JavaScript snippet captures clickstream, dwell time, and cart modifications with 0ms page lag.', 
      icon: Zap, 
      grad: 'from-cyan-400 to-teal-300' 
    },
    { 
      num: '02', 
      title: 'Feature Extraction', 
      desc: 'Transforms raw sessions into 32 engineered signals (dwell ratio, category depth, visit velocity).', 
      icon: Cpu, 
      grad: 'from-teal-300 to-cyan-400' 
    },
    { 
      num: '03', 
      title: 'XGBoost Scoring', 
      desc: 'Gradient boosted trees compute calibrated buying probability (0.0% - 100.0%) in under 35ms.', 
      icon: Brain, 
      grad: 'from-cyan-300 to-indigo-400' 
    },
    { 
      num: '04', 
      title: 'SHAP Explainability', 
      desc: 'Extracts exact feature Shapley values, turning black-box math into clear "Why We Think So" rationales.', 
      icon: Sliders, 
      grad: 'from-indigo-400 to-teal-300' 
    },
    { 
      num: '05', 
      title: 'Automated Action', 
      desc: 'Triggers dynamic discounts, sales rep email alerts, or retargeting rules at peak decision moments.', 
      icon: CheckCircle2, 
      grad: 'from-teal-300 to-emerald-400' 
    }
  ];

  // Tech Stack Layer Table
  const techStackLayers = [
    { layer: 'Machine Learning Core', tech: 'Python 3.10 · XGBoost · scikit-learn · SHAP (SHapley Additive exPlanations)' },
    { layer: 'Inference API & Real-time Backend', tech: 'FastAPI (Asynchronous REST) · SQLAlchemy · PostgreSQL · Redis Cache' },
    { layer: 'Analytics Dashboard', tech: 'HTML5 · Tailwind CSS · Chart.js High-FPS Canvas · Server-Sent Events (SSE)' },
    { layer: 'Client-Side Telemetry Snippet', tech: 'Vanilla JavaScript ES6+ (Lightweight <4KB gzipped async tracking tracker)' },
    { layer: 'E-commerce Demo Integration', tech: 'Trailhead E-commerce Platform (Django 4.2 · SQLite/Postgres DB)' }
  ];

  return (
    <div className="relative pt-28 sm:pt-36 pb-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto z-10">
      
      {/* Mock Browser URL Bar */}
      <div className="gradient-card rounded-2xl p-2.5 px-4 mb-8 border border-cyan-500/25 flex items-center justify-between text-xs text-slate-400 max-w-2xl mx-auto">
        <div className="flex items-center gap-2">
          <div className="flex gap-1.5">
            <div className="w-2.5 h-2.5 rounded-full bg-red-500/80"></div>
            <div className="w-2.5 h-2.5 rounded-full bg-yellow-500/80"></div>
            <div className="w-2.5 h-2.5 rounded-full bg-green-500/80"></div>
          </div>
          <span className="font-mono text-slate-300 ml-2">brixellabs.com/case-studies/getscry</span>
        </div>
        <span className="text-cyan-400 font-semibold font-mono text-[11px] flex items-center gap-1.5">
          <span className="w-2 h-2 rounded-full bg-cyan-400 animate-ping"></span>
          PREDICTIVE INTENT AI
        </span>
      </div>

      {/* Hero Section */}
      <div className="text-center mb-14 space-y-4">
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-gradient-to-r from-cyan-950/80 via-[#07243c]/80 to-teal-950/80 border border-cyan-500/30 text-cyan-300 text-xs font-mono uppercase tracking-wider shadow-[0_0_20px_rgba(0,240,255,0.2)]"
        >
          <TrendingUp className="w-3.5 h-3.5 text-cyan-400" />
          <span>Case Study · E-Commerce Predictive Analytics & Explainable AI</span>
        </motion.div>

        <motion.h1 
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-white tracking-tight"
        >
          GetScry — <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-300 via-teal-300 to-indigo-400 drop-shadow-[0_0_35px_rgba(0,240,255,0.45)]">Visitor Intent Intelligence</span>
        </motion.h1>

        <motion.p 
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="text-base sm:text-lg text-slate-300 max-w-3xl mx-auto font-normal leading-relaxed"
        >
          An AI system that predicts which website visitors are about to purchase in real time — translating complex behavioral signals into clear, explainable rationales so e-commerce brands can trigger precision discounts and high-conversion follow-ups.
        </motion.p>

        {/* Quick Tech Badges */}
        <div className="flex flex-wrap items-center justify-center gap-2 pt-2">
          {['XGBoost ML', 'SHAP Explainability', 'FastAPI Backend', 'Python 3.10', 'Django Storefront', 'Chart.js Analytics', 'Sub-35ms Latency'].map((tech, i) => (
            <span key={i} className="px-3 py-1 rounded-lg bg-[#072238]/90 text-cyan-300 border border-cyan-500/30 text-xs font-mono">
              {tech}
            </span>
          ))}
        </div>
      </div>

      {/* LARGE PROMINENT IMAGE SHOWCASE & DEEP EXPLANATION SECTION */}
      <div className="mb-20">
        
        {/* Showcase Header & Tab Switcher */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
          <div>
            <h3 className="text-2xl font-bold text-white flex items-center gap-2.5">
              <Layers className="w-5 h-5 text-cyan-400" />
              Live Platform Visual Architecture & Interface Showcase
            </h3>
            <p className="text-xs sm:text-sm text-slate-400 mt-1">
              High-resolution captures from the active GetScry inference engine & Trailhead production demo
            </p>
          </div>

          {/* Tab Selection */}
          <div className="flex items-center gap-2 p-1.5 rounded-2xl bg-[#041624] border border-cyan-500/30 self-start md:self-auto overflow-x-auto">
            <button
              onClick={() => setActiveTab('video')}
              className={`px-4 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-2 cursor-pointer whitespace-nowrap ${
                activeTab === 'video'
                  ? 'bg-gradient-to-r from-cyan-400 to-teal-300 text-[#031525] shadow-[0_0_15px_rgba(0,240,255,0.5)] font-extrabold'
                  : 'text-slate-300 hover:text-white hover:bg-white/5'
              }`}
            >
              <Play className="w-4 h-4" />
              <span>1. Live Video Demo</span>
            </button>

            <button
              onClick={() => setActiveTab('dashboard')}
              className={`px-4 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-2 cursor-pointer whitespace-nowrap ${
                activeTab === 'dashboard'
                  ? 'bg-gradient-to-r from-cyan-400 to-teal-300 text-[#031525] shadow-[0_0_15px_rgba(0,240,255,0.5)] font-extrabold'
                  : 'text-slate-300 hover:text-white hover:bg-white/5'
              }`}
            >
              <BarChart3 className="w-4 h-4" />
              <span>2. Live Analytics Dashboard</span>
            </button>

            <button
              onClick={() => setActiveTab('sessions')}
              className={`px-4 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-2 cursor-pointer whitespace-nowrap ${
                activeTab === 'sessions'
                  ? 'bg-gradient-to-r from-teal-400 to-cyan-400 text-[#031525] shadow-[0_0_15px_rgba(0,229,208,0.5)] font-extrabold'
                  : 'text-slate-300 hover:text-white hover:bg-white/5'
              }`}
            >
              <Users className="w-4 h-4" />
              <span>3. SHAP Sessions & Leads</span>
            </button>

            <button
              onClick={() => setActiveTab('storefront')}
              className={`px-4 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-2 cursor-pointer whitespace-nowrap ${
                activeTab === 'storefront'
                  ? 'bg-gradient-to-r from-cyan-300 to-indigo-400 text-[#031525] shadow-[0_0_15px_rgba(99,102,241,0.5)] font-extrabold'
                  : 'text-slate-300 hover:text-white hover:bg-white/5'
              }`}
            >
              <ShoppingBag className="w-4 h-4" />
              <span>4. Storefront Demo</span>
            </button>
          </div>
        </div>

        {/* Large Prominent Display Card */}
        <div className="gradient-card rounded-3xl p-6 sm:p-8 border border-cyan-500/30 shadow-2xl overflow-hidden relative">
          
          {/* TAB 0: VIDEO LIVE DEMO */}
          {activeTab === 'video' && (
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.35 }}
              className="space-y-6"
            >
              <VideoPlayer
                src="/assets/videos/getscry-demo.mp4"
                poster={projectImages.getscryDashboard}
                title="GetScry Real-Time Shopper Inference & SHAP Analytics"
                badge="REAL-TIME XGBOOST"
                autoPlay={true}
                loop={true}
                muted={true}
              />

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-2">
                <div className="p-4 rounded-2xl bg-[#061e31] border border-cyan-500/25 space-y-1">
                  <div className="text-xs font-mono text-cyan-300 font-bold uppercase">1. Sub-35ms Scoring</div>
                  <p className="text-xs text-slate-300">FastAPI backend computes buying probability from live clickstream events.</p>
                </div>
                <div className="p-4 rounded-2xl bg-[#061e31] border border-cyan-500/25 space-y-1">
                  <div className="text-xs font-mono text-teal-300 font-bold uppercase">2. SHAP Explainability</div>
                  <p className="text-xs text-slate-300">Deconstructs probability score into human-readable conversion reasons.</p>
                </div>
                <div className="p-4 rounded-2xl bg-[#061e31] border border-cyan-500/25 space-y-1">
                  <div className="text-xs font-mono text-emerald-300 font-bold uppercase">3. Real-Time Intervention</div>
                  <p className="text-xs text-slate-300">Dispatches targeted incentives or sales alerts at peak conversion moments.</p>
                </div>
              </div>
            </motion.div>
          )}

          {/* TAB 1: DASHBOARD OVERVIEW */}
          {activeTab === 'dashboard' && (
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.35 }}
              className="space-y-8"
            >
              {/* Large Image Frame with Expand Button */}
              <div className="relative rounded-2xl overflow-hidden border border-cyan-500/30 shadow-[0_10px_35px_rgba(0,0,0,0.8)] bg-[#03121d] group">
                <img 
                  src={projectImages.getscryDashboard} 
                  alt="GetScry Real-Time Intent Score Trend & Signal Breakdown Dashboard" 
                  className="w-full h-auto object-contain max-h-[560px] mx-auto transition-transform duration-700 group-hover:scale-[1.01]"
                />
                
                {/* Floating Image Control / Fullscreen Trigger */}
                <button
                  onClick={() => setSelectedImageModal({
                    src: projectImages.getscryDashboard,
                    title: "GetScry Live Analytics Dashboard",
                    subtitle: "Intent score trend curves, signal segmentation, and real-time visitor propensity"
                  })}
                  className="absolute bottom-4 right-4 px-3.5 py-2 rounded-xl bg-black/80 backdrop-blur-md border border-cyan-500/40 text-cyan-300 hover:text-white hover:border-cyan-400 flex items-center gap-2 text-xs font-mono transition-all cursor-pointer shadow-lg"
                >
                  <Maximize2 className="w-4 h-4" />
                  <span>Click to Expand Full-Res</span>
                </button>

                {/* Badge Overlay */}
                <div className="absolute top-4 left-4 px-3 py-1.5 rounded-lg bg-black/80 backdrop-blur-md border border-cyan-500/40 text-cyan-300 text-xs font-mono flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-cyan-400 animate-ping"></span>
                  <span>127.0.0.1:8000/dashboard · Live Tracking Active</span>
                </div>
              </div>

              {/* Detailed Breakdown & Explanation Grid */}
              <div className="space-y-4">
                <h4 className="text-lg font-bold text-white flex items-center gap-2">
                  <Activity className="w-5 h-5 text-cyan-400" />
                  Understanding the Dashboard Overview & Metrics
                </h4>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                  <div className="p-4 rounded-2xl bg-[#061e31] border border-cyan-500/25 space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-mono text-cyan-300 font-bold uppercase">1. Real-Time Telemetry</span>
                      <span className="text-xs font-mono px-2 py-0.5 rounded bg-cyan-950 text-cyan-300 border border-cyan-500/30">Active</span>
                    </div>
                    <p className="text-xs text-slate-300 leading-relaxed">
                      Tracks active concurrent sessions in real-time. In this snapshot, <strong>5 active visitors</strong> are being continuously monitored across product browsing, cart updates, and scroll depths.
                    </p>
                  </div>

                  <div className="p-4 rounded-2xl bg-[#061e31] border border-cyan-500/25 space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-mono text-cyan-300 font-bold uppercase">2. Signal Tiers</span>
                      <span className="text-xs font-mono px-2 py-0.5 rounded bg-cyan-950 text-cyan-300 border border-cyan-500/30">1 High / 2 Med</span>
                    </div>
                    <p className="text-xs text-slate-300 leading-relaxed">
                      Categorizes traffic into actionable tiers: <strong>High Signal (1)</strong> for immediate buyers, <strong>Medium Signal (2)</strong> for high-value leads requiring nurturing, and Low Signal for casual browsers.
                    </p>
                  </div>

                  <div className="p-4 rounded-2xl bg-[#061e31] border border-cyan-500/25 space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-mono text-cyan-300 font-bold uppercase">3. Intent Score Trend</span>
                      <span className="text-xs font-mono px-2 py-0.5 rounded bg-cyan-950 text-cyan-300 border border-cyan-500/30">12 Sessions</span>
                    </div>
                    <p className="text-xs text-slate-300 leading-relaxed">
                      Smooth cubic spline curve rendering probability trajectory over recent sessions, allowing operators to spot sudden surges in buyer readiness and campaign performance spikes.
                    </p>
                  </div>

                  <div className="p-4 rounded-2xl bg-[#061e31] border border-cyan-500/25 space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-mono text-cyan-300 font-bold uppercase">4. Average Score (42.6%)</span>
                      <span className="text-xs font-mono px-2 py-0.5 rounded bg-cyan-950 text-cyan-300 border border-cyan-500/30">Calibrated</span>
                    </div>
                    <p className="text-xs text-slate-300 leading-relaxed">
                      The dynamic baseline purchase propensity index across all store traffic, serving as a health benchmark for store conversion velocity.
                    </p>
                  </div>
                </div>
              </div>
            </motion.div>
          )}

          {/* TAB 2: VISITOR SESSIONS & EXPLAINABILITY */}
          {activeTab === 'sessions' && (
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.35 }}
              className="space-y-8"
            >
              {/* Large Image Frame with Expand Button */}
              <div className="relative rounded-2xl overflow-hidden border border-cyan-500/30 shadow-[0_10px_35px_rgba(0,0,0,0.8)] bg-[#03121d] group">
                <img 
                  src={projectImages.getscrySessions} 
                  alt="GetScry Visitor Sessions Table & SHAP Explainability Reasons" 
                  className="w-full h-auto object-contain max-h-[560px] mx-auto transition-transform duration-700 group-hover:scale-[1.01]"
                />
                
                {/* Floating Image Control */}
                <button
                  onClick={() => setSelectedImageModal({
                    src: projectImages.getscrySessions,
                    title: "Visitor Sessions & Explainable AI Matrix",
                    subtitle: "SHAP 'Why We Think So' feature weights, session lead attribution, and instant follow-up triggers"
                  })}
                  className="absolute bottom-4 right-4 px-3.5 py-2 rounded-xl bg-black/80 backdrop-blur-md border border-cyan-500/40 text-cyan-300 hover:text-white hover:border-cyan-400 flex items-center gap-2 text-xs font-mono transition-all cursor-pointer shadow-lg"
                >
                  <Maximize2 className="w-4 h-4" />
                  <span>Click to Expand Full-Res</span>
                </button>

                {/* Badge Overlay */}
                <div className="absolute top-4 left-4 px-3 py-1.5 rounded-lg bg-black/80 backdrop-blur-md border border-cyan-500/40 text-cyan-300 text-xs font-mono flex items-center gap-2">
                  <Users className="w-3.5 h-3.5" />
                  <span>Sorted by Intent Score · Real-Time Lead Attribution</span>
                </div>
              </div>

              {/* Detailed Explanation Breakdown */}
              <div className="space-y-4">
                <h4 className="text-lg font-bold text-white flex items-center gap-2">
                  <Brain className="w-5 h-5 text-cyan-400" />
                  Deep-Dive: How GetScry Decodes Each Customer Session
                </h4>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
                  <div className="p-5 rounded-2xl bg-[#061e31] border border-cyan-500/25 space-y-2.5">
                    <span className="text-xs font-mono text-cyan-300 font-bold block uppercase">
                      A. Multi-Variable Scoring (0% – 100%)
                    </span>
                    <p className="text-xs text-slate-300 leading-relaxed">
                      Every row displays session length, page depth, and a calibrated XGBoost score. For example, <strong>sess_17879899... scores 99.2% High Signal</strong> due to intense focus on checkout pages, while casual single-page visitors register at <strong>8.4% Low Signal</strong>.
                    </p>
                  </div>

                  <div className="p-5 rounded-2xl bg-[#061e31] border border-cyan-500/25 space-y-2.5">
                    <span className="text-xs font-mono text-cyan-300 font-bold block uppercase">
                      B. SHAP Explainability ("Why We Think So")
                    </span>
                    <p className="text-xs text-slate-300 leading-relaxed">
                      Instead of giving sales teams a mystery black-box number, GetScry generates clear rationale tags: <em>"Viewed pages that typically lead to a purchase"</em>, <em>"Arrived through a traffic source that converts well"</em>, and <em>"Checked account or order-related pages"</em>.
                    </p>
                  </div>

                  <div className="p-5 rounded-2xl bg-[#061e31] border border-cyan-500/25 space-y-2.5">
                    <span className="text-xs font-mono text-cyan-300 font-bold block uppercase">
                      C. Lead Linking & 1-Click Follow-Up
                    </span>
                    <p className="text-xs text-slate-300 leading-relaxed">
                      When anonymous visitors submit forms or newsletters, their session telemetry links directly to their email identity (e.g. <strong>Amna Ali · 54.4% score</strong>). Sales reps can trigger 1-click tailored email outreach right from the table.
                    </p>
                  </div>
                </div>
              </div>
            </motion.div>
          )}

          {/* TAB 3: STOREFRONT INTEGRATION */}
          {activeTab === 'storefront' && (
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.35 }}
              className="space-y-8"
            >
              {/* Large Image Frame with Expand Button */}
              <div className="relative rounded-2xl overflow-hidden border border-cyan-500/30 shadow-[0_10px_35px_rgba(0,0,0,0.8)] bg-[#03121d] group">
                <img 
                  src={projectImages.getscryStorefront} 
                  alt="Trailhead E-commerce Live Telemetry Demo Storefront" 
                  className="w-full h-auto object-contain max-h-[560px] mx-auto transition-transform duration-700 group-hover:scale-[1.01]"
                />
                
                {/* Floating Image Control */}
                <button
                  onClick={() => setSelectedImageModal({
                    src: projectImages.getscryStorefront,
                    title: "Trailhead E-commerce Platform Integration",
                    subtitle: "Multi-page live catalog with lightweight async telemetry snippet capturing browsing behavior"
                  })}
                  className="absolute bottom-4 right-4 px-3.5 py-2 rounded-xl bg-black/80 backdrop-blur-md border border-cyan-500/40 text-cyan-300 hover:text-white hover:border-cyan-400 flex items-center gap-2 text-xs font-mono transition-all cursor-pointer shadow-lg"
                >
                  <Maximize2 className="w-4 h-4" />
                  <span>Click to Expand Full-Res</span>
                </button>

                {/* Badge Overlay */}
                <div className="absolute top-4 left-4 px-3 py-1.5 rounded-lg bg-black/80 backdrop-blur-md border border-cyan-500/40 text-cyan-300 text-xs font-mono flex items-center gap-2">
                  <ShoppingBag className="w-3.5 h-3.5" />
                  <span>Trailhead E-commerce Platform · Live Telemetry Enabled</span>
                </div>
              </div>

              {/* Detailed Breakdown */}
              <div className="space-y-4">
                <h4 className="text-lg font-bold text-white flex items-center gap-2">
                  <Zap className="w-5 h-5 text-teal-400" />
                  Non-Intrusive Storefront SDK & High-Frequency Telemetry
                </h4>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
                  <div className="p-5 rounded-2xl bg-[#061e31] border border-cyan-500/25 space-y-2">
                    <span className="text-xs font-mono text-cyan-300 font-bold block uppercase">
                      1. Sub-4KB Async Snippet
                    </span>
                    <p className="text-xs text-slate-300 leading-relaxed">
                      Installed via a single script tag into Shopify, WooCommerce, Magento, or custom Django stores. Operates purely asynchronously with zero impact on Core Web Vitals or page load speed.
                    </p>
                  </div>

                  <div className="p-5 rounded-2xl bg-[#061e31] border border-cyan-500/25 space-y-2">
                    <span className="text-xs font-mono text-cyan-300 font-bold block uppercase">
                      2. Micro-Interaction Tracking
                    </span>
                    <p className="text-xs text-slate-300 leading-relaxed">
                      Captures critical micro-signals including variant switching (size/color), product image carousel engagement, accordion toggles, review tab duration, and rapid cart price calculations.
                    </p>
                  </div>

                  <div className="p-5 rounded-2xl bg-[#061e31] border border-cyan-500/25 space-y-2">
                    <span className="text-xs font-mono text-cyan-300 font-bold block uppercase">
                      3. Privacy-First Architecture
                    </span>
                    <p className="text-xs text-slate-300 leading-relaxed">
                      Fully GDPR and CCPA compliant. Does not collect sensitive PII until explicitly granted by the user via form submission or CRM customer login.
                    </p>
                  </div>
                </div>
              </div>
            </motion.div>
          )}

        </div>
      </div>

      {/* INTERACTIVE INTENT SCORING SIMULATOR & PLAYGROUND */}
      <div className="mb-20">
        <div className="text-center mb-10 space-y-2">
          <h3 className="text-2xl sm:text-3xl font-extrabold text-white">
            Interactive Intent Scoring <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-300 via-teal-300 to-indigo-400">Playground</span>
          </h3>
          <p className="text-xs sm:text-sm text-slate-400 max-w-2xl mx-auto">
            Select a live visitor persona below to see how GetScry computes instant purchase probability, evaluates SHAP feature weights, and triggers precision interventions.
          </p>
        </div>

        <div className="gradient-card rounded-3xl p-6 sm:p-8 border border-cyan-500/35 shadow-2xl">
          
          {/* Persona Selector Buttons */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mb-8">
            {Object.keys(shopperPersonas).map((key) => {
              const persona = shopperPersonas[key];
              const isSelected = selectedPersona === key;
              const IconComp = persona.icon;
              return (
                <button
                  key={key}
                  onClick={() => setSelectedPersona(key)}
                  className={`p-4 rounded-2xl border text-left transition-all cursor-pointer ${
                    isSelected
                      ? 'border-cyan-400 bg-cyan-950/70 shadow-[0_0_20px_rgba(0,240,255,0.35)]'
                      : 'border-cyan-500/20 bg-[#051c2e] hover:border-cyan-400/40 text-slate-300'
                  }`}
                >
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-xs font-mono font-bold text-cyan-300 flex items-center gap-1.5">
                      <IconComp className="w-3.5 h-3.5 text-cyan-400" />
                      0{key === 'high_buyer' ? 1 : key === 'medium_lead' ? 2 : 3}
                    </span>
                    <span className={`text-[10px] font-mono px-2 py-0.5 rounded border font-bold ${persona.signalColor}`}>
                      {persona.signal} Signal
                    </span>
                  </div>
                  <h5 className="text-sm font-bold text-white mb-1">{persona.title}</h5>
                  <p className="text-xs text-slate-400">{persona.duration} · {persona.pages} pages</p>
                </button>
              );
            })}
          </div>

          {/* Active Persona Simulation Card */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
            
            {/* Left: Score Gauge & Telemetry */}
            <div className="lg:col-span-5 bg-[#031525] rounded-2xl p-6 border border-cyan-500/25 flex flex-col justify-between space-y-6">
              <div>
                <div className="flex items-center justify-between text-xs text-slate-400 font-mono mb-3">
                  <span>SESSION ID: {currentPersona.id.substring(0, 18)}...</span>
                  <span className="text-cyan-400 font-bold">XGBoost v2.1</span>
                </div>
                <h4 className="text-lg font-bold text-white mb-1">{currentPersona.customer}</h4>
                <p className="text-xs text-slate-400">Telemetry: {currentPersona.pages} pages viewed · {currentPersona.duration} dwell</p>
              </div>

              {/* Dynamic Animated Intent Probability Bar */}
              <div className="space-y-2">
                <div className="flex items-baseline justify-between">
                  <span className="text-xs font-mono uppercase text-slate-300 font-bold">Purchase Propensity</span>
                  <span className="text-3xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-cyan-300 to-teal-300 font-mono">
                    {currentPersona.score}%
                  </span>
                </div>

                <div className="w-full h-3.5 bg-black/60 rounded-full overflow-hidden p-0.5 border border-cyan-500/30">
                  <motion.div
                    key={selectedPersona}
                    initial={{ width: 0 }}
                    animate={{ width: `${currentPersona.score}%` }}
                    transition={{ duration: 0.65, ease: "easeOut" }}
                    className={`h-full rounded-full bg-gradient-to-r ${currentPersona.barColor} shadow-[0_0_15px_rgba(0,240,255,0.6)]`}
                  />
                </div>
                <div className="flex justify-between text-[10px] font-mono text-slate-500 pt-1">
                  <span>0% Casual</span>
                  <span>50% Evaluating</span>
                  <span>100% Ready Buyer</span>
                </div>
              </div>

              {/* Recommended Automated Action */}
              <div className="p-4 rounded-xl bg-cyan-950/40 border border-cyan-500/30 text-xs space-y-1">
                <div className="flex items-center gap-1.5 text-cyan-300 font-mono font-bold">
                  <PersonaIcon className="w-3.5 h-3.5" />
                  <span>{currentPersona.actionTitle}</span>
                </div>
                <p className="text-white font-medium leading-relaxed">{currentPersona.action}</p>
              </div>
            </div>

            {/* Right: SHAP Explainability Factors */}
            <div className="lg:col-span-7 bg-[#031525] rounded-2xl p-6 border border-cyan-500/25 flex flex-col justify-between space-y-4">
              <div>
                <div className="flex items-center justify-between pb-3 border-b border-cyan-500/20 mb-4">
                  <span className="text-sm font-bold text-white flex items-center gap-2">
                    <Sliders className="w-4 h-4 text-cyan-400" />
                    SHAP Explainability Factors ("Why We Think So")
                  </span>
                  <span className="text-[11px] font-mono text-cyan-400 bg-cyan-950/70 px-2.5 py-0.5 rounded border border-cyan-500/30">
                    Feature Weights
                  </span>
                </div>

                <div className="space-y-3">
                  {currentPersona.reasons.map((reason, idx) => (
                    <motion.div 
                      key={idx}
                      initial={{ opacity: 0, x: 10 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: idx * 0.1 }}
                      className="p-3.5 rounded-xl bg-[#061d30] border border-cyan-500/20 flex items-start gap-3 text-xs text-slate-200"
                    >
                      <div className="w-5 h-5 rounded-full bg-cyan-950 text-cyan-300 border border-cyan-500/40 flex items-center justify-center font-mono text-[10px] shrink-0 mt-0.5 font-bold">
                        0{idx + 1}
                      </div>
                      <p className="leading-relaxed">{reason}</p>
                    </motion.div>
                  ))}
                </div>
              </div>

              <div className="p-3.5 rounded-xl bg-[#041a2c] border border-cyan-500/25 text-xs text-cyan-200 flex items-center justify-between">
                <span><strong>Impact Outcome:</strong> {currentPersona.outcome}</span>
                <Target className="w-4 h-4 text-cyan-400 shrink-0 ml-2" />
              </div>
            </div>

          </div>

        </div>
      </div>

      {/* THE PROBLEM VS OUR PREDICTIVE SOLUTION */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-20">
        
        {/* The Problem */}
        <div className="gradient-card rounded-3xl p-8 border border-cyan-500/25 space-y-4">
          <h2 className="text-2xl font-bold text-white tracking-tight flex items-center gap-2.5">
            <span className="w-2.5 h-2.5 rounded-full bg-red-400 shadow-[0_0_10px_#f87171]"></span>
            The Problem: Blanket Discounts & Blind Marketing
          </h2>
          <p className="text-sm sm:text-base text-slate-300 leading-relaxed">
            Most online stores treat every website visitor identically. When revenue dips, they launch storewide discounts (e.g. <em>"15% OFF for everyone"</em>), needlessly giving away profit margin to shoppers who were already going to buy, while failing to convert hesitant prospects who needed targeted product clarification.
          </p>
        </div>

        {/* Our Solution */}
        <div className="gradient-card rounded-3xl p-8 border border-cyan-500/25 space-y-4">
          <h2 className="text-2xl font-bold text-white tracking-tight flex items-center gap-2.5">
            <span className="w-2.5 h-2.5 rounded-full bg-teal-400 shadow-[0_0_10px_#00e5d0]"></span>
            Our Solution: Machine Learning Intent Segmentation
          </h2>
          <p className="text-sm sm:text-base text-slate-300 leading-relaxed">
            GetScry tracks in-session clickstreams and computes instant purchase probabilities using an XGBoost gradient boosting model. By coupling predictions with SHAP explainability tags, store owners know exactly what triggered each score and can trigger targeted automated interventions.
          </p>
        </div>

      </div>

      {/* HOW IT WORKS (5-STEP PIPELINE) */}
      <div className="mb-20">
        <h2 className="text-2xl sm:text-3xl font-bold text-white tracking-tight mb-10 text-center">
          How It <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-300 via-teal-300 to-indigo-400">Works</span>
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
          {pipelineSteps.map((step, index) => {
            const StepIcon = step.icon;
            return (
              <motion.div
                key={step.num}
                initial={{ opacity: 0, x: 30, scale: 0.94 }}
                whileInView={{ opacity: 1, x: 0, scale: 1 }}
                viewport={{ once: true }}
                transition={{
                  type: "spring",
                  stiffness: 260,
                  damping: 24,
                  delay: index * 0.1
                }}
                className="h-full"
              >
                <TiltCard className="h-full">
                  <div className="gradient-card rounded-2xl p-5 border border-cyan-500/25 flex flex-col justify-between group hover:border-cyan-400/80 transition-all text-center h-full shadow-[0_10px_20px_rgba(0,0,0,0.5)]">
                    <div>
                      <div className={`text-3xl font-black text-transparent bg-clip-text bg-gradient-to-b ${step.grad} font-mono mb-3`}>
                        {step.num}
                      </div>
                      <div className="w-12 h-12 mx-auto rounded-xl bg-gradient-to-br from-[#092b45] to-[#041525] border border-cyan-500/35 flex items-center justify-center text-cyan-400 group-hover:text-cyan-300 mb-3 shadow-[0_0_15px_rgba(0,240,255,0.25)]">
                        <StepIcon className="w-6 h-6" />
                      </div>
                      <h3 className="text-sm font-bold text-white mb-2">
                        {step.title}
                      </h3>
                    </div>
                    <p className="text-xs text-slate-400 leading-relaxed">
                      {step.desc}
                    </p>
                  </div>
                </TiltCard>
              </motion.div>
            );
          })}
        </div>
      </div>

      {/* TECH STACK MATRIX TABLE */}
      <div className="gradient-card rounded-3xl p-6 sm:p-8 border border-cyan-500/30 mb-16 overflow-hidden">
        <h3 className="text-xl font-bold text-white mb-6 flex items-center gap-2">
          <Cpu className="w-5 h-5 text-cyan-400" />
          Production System Architecture & Technology Stack
        </h3>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs sm:text-sm text-slate-300">
            <thead>
              <tr className="border-b border-cyan-500/30 text-cyan-300 font-mono">
                <th className="pb-3 px-4">Architecture Layer</th>
                <th className="pb-3 px-4">Technologies & System Role</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-cyan-500/10">
              {techStackLayers.map((item, idx) => (
                <tr key={idx} className="hover:bg-white/[0.02] transition-colors">
                  <td className="py-3.5 px-4 font-bold text-white">{item.layer}</td>
                  <td className="py-3.5 px-4 font-mono text-cyan-300">{item.tech}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* CTA FOOTER */}
      <div className="gradient-card rounded-3xl p-8 sm:p-12 border border-cyan-500/40 text-center relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-cyan-500/10 via-teal-500/10 to-indigo-500/10"></div>
        <div className="relative z-10 space-y-4 max-w-2xl mx-auto">
          <h3 className="text-2xl sm:text-3xl font-extrabold text-white">
            Ready to Supercharge Your E-Commerce Conversion Rate?
          </h3>
          <p className="text-slate-300 text-sm sm:text-base">
            Pilot GetScry on your online store or integrate custom predictive machine learning into your checkout funnel.
          </p>
          <button
            onClick={openConsultation}
            className="mt-4 px-8 py-4 rounded-xl bg-gradient-to-r from-cyan-400 via-teal-300 to-indigo-400 hover:from-cyan-300 hover:to-teal-200 text-[#031525] font-extrabold text-sm uppercase tracking-wider transition-all duration-300 shadow-[0_0_25px_rgba(0,240,255,0.4)] hover:shadow-[0_0_40px_rgba(0,240,255,0.8)] hover:scale-105 active:scale-95 cursor-pointer"
          >
            Schedule Predictive Intelligence Discovery
          </button>
        </div>
      </div>

      {/* FULLSCREEN IMAGE LIGHTBOX MODAL */}
      <AnimatePresence>
        {selectedImageModal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/90 backdrop-blur-xl"
            onClick={() => setSelectedImageModal(null)}
          >
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
              className="relative max-w-6xl w-full bg-[#041525] border border-cyan-500/40 rounded-3xl p-4 sm:p-6 shadow-2xl overflow-hidden"
            >
              <div className="flex items-center justify-between pb-4 border-b border-cyan-500/20 mb-4">
                <div>
                  <h4 className="text-lg font-bold text-white">{selectedImageModal.title}</h4>
                  <p className="text-xs text-slate-400">{selectedImageModal.subtitle}</p>
                </div>
                <button
                  onClick={() => setSelectedImageModal(null)}
                  className="p-2 rounded-xl bg-cyan-950/80 hover:bg-cyan-900 border border-cyan-500/30 text-cyan-300 hover:text-white transition-colors cursor-pointer"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <div className="rounded-2xl overflow-hidden border border-cyan-500/30 bg-black flex items-center justify-center max-h-[75vh]">
                <img 
                  src={selectedImageModal.src} 
                  alt={selectedImageModal.title} 
                  className="w-full h-auto object-contain max-h-[72vh]"
                />
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

    </div>
  );
};
