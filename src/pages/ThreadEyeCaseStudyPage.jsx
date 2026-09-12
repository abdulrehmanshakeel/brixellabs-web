import React, { useState } from 'react';
import { 
  Eye, 
  Cpu, 
  Layers, 
  Sliders, 
  AlertTriangle, 
  CheckCircle2, 
  Camera, 
  Database, 
  TrendingUp, 
  RefreshCw, 
  ArrowRight,
  ShieldAlert,
  SlidersHorizontal,
  Maximize2,
  X,
  Target,
  FileText,
  Zap,
  Activity,
  Check,
  UploadCloud,
  Play
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { TiltCard } from '../components/common/TiltCard';
import { VideoPlayer } from '../components/common/VideoPlayer';
import { projectImages } from '../assets/projects';

export const ThreadEyeCaseStudyPage = ({ openConsultation }) => {
  const [activeTab, setActiveTab] = useState('video'); // 'video' | 'inspection' | 'preview'
  const [selectedImageModal, setSelectedImageModal] = useState(null);

  // 5-Step Pipeline Steps
  const steps = [
    { 
      num: '01', 
      title: 'Tile Upload & Ingestion', 
      desc: 'High-resolution roll scans are split into standardized overlapping tiles (256x256 / 512x512) for micro-flaw inspection.', 
      icon: UploadCloud, 
      grad: 'from-cyan-400 to-teal-300' 
    },
    { 
      num: '02', 
      title: 'Adaptive Preprocessing', 
      desc: 'Contrast normalization and histogram equalization enhance contrast between thread weaves and anomalies.', 
      icon: Layers, 
      grad: 'from-teal-300 to-cyan-400' 
    },
    { 
      num: '03', 
      title: 'YOLOv8 Instance Seg', 
      desc: 'Trained YOLOv8n-seg model extracts pixel-accurate segmentation masks over yarn breaks, holes, and oil spots.', 
      icon: Cpu, 
      grad: 'from-cyan-300 to-indigo-400' 
    },
    { 
      num: '04', 
      title: 'Threshold & Confidence Filter', 
      desc: 'Dynamic sensitivity slider (0.05 - 0.95) eliminates false alarms while catching critical structural defects.', 
      icon: Sliders, 
      grad: 'from-indigo-400 to-rose-400' 
    },
    { 
      num: '05', 
      title: 'Operator Verdict & Telemetry', 
      desc: 'Annotated visual overlays, defect count, and timestamped logs display instantly in Streamlit UI.', 
      icon: CheckCircle2, 
      grad: 'from-rose-400 to-emerald-400' 
    }
  ];

  // Tech Stack Table
  const techStackData = [
    { layer: 'Computer Vision Model', tech: 'YOLOv8n-seg (Ultralytics Instance Segmentation) · PyTorch · TorchScript' },
    { layer: 'Image Preprocessing & Vision Pipeline', tech: 'OpenCV (cv2) · NumPy · Albumentations · Adaptive CLAHE Filtering' },
    { layer: 'Operator Web Interface', tech: 'Streamlit Interactive Python App · Dynamic Threshold Sliders · File Dropper' },
    { layer: 'Training & Research Benchmark', tech: 'AITEX Textile Research Dataset (244 industrial defect images, 12 classes)' },
    { layer: 'Hardware Acceleration', tech: 'NVIDIA CUDA · TensorRT Export Ready · Commercial GPU & Jetson Support' }
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
          <span className="font-mono text-slate-300 ml-2">brixellabs.com/case-studies/threadeye</span>
        </div>
        <span className="text-cyan-400 font-semibold font-mono text-[11px] flex items-center gap-1.5">
          <span className="w-2 h-2 rounded-full bg-cyan-400 animate-ping"></span>
          YOLOV8 INSTANCE SEGMENTATION
        </span>
      </div>

      {/* Hero Section */}
      <div className="text-center mb-14 space-y-4">
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-gradient-to-r from-cyan-950/80 via-[#07243c]/80 to-blue-950/80 border border-cyan-500/30 text-cyan-300 text-xs font-mono uppercase tracking-wider shadow-[0_0_20px_rgba(0,240,255,0.25)]"
        >
          <Eye className="w-3.5 h-3.5 text-cyan-400" />
          <span>Case Study · Computer Vision & Automated Textile Inspection</span>
        </motion.div>

        <motion.h1 
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-white tracking-tight"
        >
          ThreadEye — <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-300 via-teal-300 to-indigo-400 drop-shadow-[0_0_35px_rgba(0,240,255,0.45)]">Fabric Defect Detection System</span>
        </motion.h1>

        <motion.p 
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="text-base sm:text-lg text-slate-300 max-w-3xl mx-auto font-normal leading-relaxed"
        >
          An automated edge computer vision system for textile mills that uses a custom YOLOv8 instance segmentation model to scan fabric images, isolate microscopic yarn breaks and stains with pixel-level polygon masks, and catch quality flaws before shipment.
        </motion.p>

        {/* Quick Tech Badges */}
        <div className="flex flex-wrap items-center justify-center gap-2 pt-2">
          {['YOLOv8n-seg', 'PyTorch', 'OpenCV', 'Streamlit UI', 'AITEX Dataset', 'CUDA Acceleration', '<18ms Inference'].map((tech, i) => (
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
              <Eye className="w-5 h-5 text-cyan-400" />
              Live Streamlit Web Inspection UI & Defect Segmentation Showcase
            </h3>
            <p className="text-xs sm:text-sm text-slate-400 mt-1">
              High-resolution captures from the working ThreadEye defect detection platform
            </p>
          </div>

          {/* Tab Switcher */}
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
              onClick={() => setActiveTab('inspection')}
              className={`px-4 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-2 cursor-pointer whitespace-nowrap ${
                activeTab === 'inspection'
                  ? 'bg-gradient-to-r from-cyan-500 to-teal-400 text-[#031525] shadow-[0_0_15px_rgba(6,182,212,0.5)] font-extrabold'
                  : 'text-slate-300 hover:text-white hover:bg-white/5'
              }`}
            >
              <Target className="w-4 h-4" />
              <span>2. Defect Segmentation</span>
            </button>

            <button
              onClick={() => setActiveTab('preview')}
              className={`px-4 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-2 cursor-pointer whitespace-nowrap ${
                activeTab === 'preview'
                  ? 'bg-gradient-to-r from-teal-400 to-indigo-400 text-[#031525] shadow-[0_0_15px_rgba(20,184,166,0.5)] font-extrabold'
                  : 'text-slate-300 hover:text-white hover:bg-white/5'
              }`}
            >
              <SlidersHorizontal className="w-4 h-4" />
              <span>3. Sensitivity Controls</span>
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
                src="/assets/videos/threadeye-demo.mp4"
                poster={projectImages.threadeyeInspection}
                title="ThreadEye YOLOv8 Inference Run"
                badge="4K · 60 FPS"
                autoPlay={true}
                loop={true}
                muted={true}
              />

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-2">
                <div className="p-4 rounded-2xl bg-[#061e31] border border-cyan-500/25 space-y-1">
                  <div className="text-xs font-mono text-cyan-300 font-bold uppercase">1. Instant Segmentation</div>
                  <p className="text-xs text-slate-300">Continuous 60 FPS real-time segmentation isolating yarn breaks under 14ms.</p>
                </div>
                <div className="p-4 rounded-2xl bg-[#061e31] border border-cyan-500/25 space-y-1">
                  <div className="text-xs font-mono text-teal-300 font-bold uppercase">2. YOLOv8n-seg Core</div>
                  <p className="text-xs text-slate-300">Lightweight instance segmentation architecture optimized for NVIDIA Jetson.</p>
                </div>
                <div className="p-4 rounded-2xl bg-[#061e31] border border-cyan-500/25 space-y-1">
                  <div className="text-xs font-mono text-emerald-300 font-bold uppercase">3. Production Streamlit UI</div>
                  <p className="text-xs text-slate-300">Real-time threshold tuning and live defect visualization for mill operators.</p>
                </div>
              </div>
            </motion.div>
          )}

          {/* TAB 1: DEFECT SEGMENTATION RESULT */}
          {activeTab === 'inspection' && (
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.35 }}
              className="space-y-8"
            >
              {/* Large Image Frame with Expand Button */}
              <div className="relative rounded-2xl overflow-hidden border border-cyan-500/30 shadow-[0_10px_35px_rgba(0,0,0,0.8)] bg-[#03121d] group">
                <img 
                  src={projectImages.threadeyeInspection} 
                  alt="ThreadEye YOLOv8 Defect Detection & Segmentation Result" 
                  className="w-full h-auto object-contain max-h-[560px] mx-auto transition-transform duration-700 group-hover:scale-[1.01]"
                />
                
                {/* Fullscreen Expand Trigger */}
                <button
                  onClick={() => setSelectedImageModal({
                    src: projectImages.threadeyeInspection,
                    title: "ThreadEye Defect Segmentation Inference",
                    subtitle: "Sample loaded (0005_00..._tile7.png) with YOLOv8 polygon bounding mask isolating yarn break"
                  })}
                  className="absolute bottom-4 right-4 px-3.5 py-2 rounded-xl bg-black/80 backdrop-blur-md border border-cyan-500/40 text-cyan-300 hover:text-white hover:border-cyan-400 flex items-center gap-2 text-xs font-mono transition-all cursor-pointer shadow-lg"
                >
                  <Maximize2 className="w-4 h-4" />
                  <span>Click to Expand Full-Res</span>
                </button>

                {/* Badge Overlay */}
                <div className="absolute top-4 left-4 px-3 py-1.5 rounded-lg bg-black/80 backdrop-blur-md border border-cyan-500/40 text-cyan-300 text-xs font-mono flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-cyan-400 animate-ping"></span>
                  <span>localhost:8501 · YOLOv8n-seg Active Inference · Tile #07</span>
                </div>
              </div>

              {/* Detailed Breakdown & Explanation */}
              <div className="space-y-4">
                <h4 className="text-lg font-bold text-white flex items-center gap-2">
                  <Activity className="w-5 h-5 text-cyan-400" />
                  Understanding the Inspection Output & Segmentation Mask
                </h4>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                  <div className="p-4 rounded-2xl bg-[#061e31] border border-cyan-500/25 space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-mono text-cyan-300 font-bold uppercase">1. Tile Ingestion</span>
                      <span className="text-xs font-mono px-2 py-0.5 rounded bg-cyan-950 text-cyan-300 border border-cyan-500/30">259 KB</span>
                    </div>
                    <p className="text-xs text-slate-300 leading-relaxed">
                      The left panel displays the raw loaded fabric tile (<code>0005_00..._tile7.png</code>). Standard high-res mill scans are chunked into standardized crops to maintain high pixel density.
                    </p>
                  </div>

                  <div className="p-4 rounded-2xl bg-[#061e31] border border-cyan-500/25 space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-mono text-cyan-300 font-bold uppercase">2. Polygon Mask</span>
                      <span className="text-xs font-mono px-2 py-0.5 rounded bg-cyan-950 text-cyan-300 border border-cyan-500/30">defect 0.11</span>
                    </div>
                    <p className="text-xs text-slate-300 leading-relaxed">
                      The right panel overlays the computed YOLOv8 polygon mask. The blue bounding polygon tightly hugs the broken warp filament without tagging unaffected surrounding weave.
                    </p>
                  </div>

                  <div className="p-4 rounded-2xl bg-[#061e31] border border-cyan-500/25 space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-mono text-cyan-300 font-bold uppercase">3. Defect Counter</span>
                      <span className="text-xs font-mono px-2 py-0.5 rounded bg-rose-950 text-rose-300 border border-rose-500/30">1 Defect</span>
                    </div>
                    <p className="text-xs text-slate-300 leading-relaxed">
                      Instant summary badge informs mill operators that 1 defect was flagged at <strong>10.9% confidence</strong>, exceeding the configured 0.10 sensitivity threshold.
                    </p>
                  </div>

                  <div className="p-4 rounded-2xl bg-[#061e31] border border-cyan-500/25 space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-mono text-cyan-300 font-bold uppercase">4. Mill Calibration</span>
                      <span className="text-xs font-mono px-2 py-0.5 rounded bg-cyan-950 text-cyan-300 border border-cyan-500/30">AITEX Validated</span>
                    </div>
                    <p className="text-xs text-slate-300 leading-relaxed">
                      Proof-of-concept prototype trained on 244 research defect images. Continuous active-learning allows fine-tuning on mill-specific looms to boost confidence scores over 95%.
                    </p>
                  </div>
                </div>
              </div>
            </motion.div>
          )}

          {/* TAB 2: OPERATOR INTERFACE & SENSITIVITY CONTROLS */}
          {activeTab === 'preview' && (
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.35 }}
              className="space-y-8"
            >
              {/* Large Image Frame with Expand Button */}
              <div className="relative rounded-2xl overflow-hidden border border-teal-500/30 shadow-[0_10px_35px_rgba(0,0,0,0.8)] bg-[#03121d] group">
                <img 
                  src={projectImages.threadeyeMainPreview} 
                  alt="ThreadEye Streamlit Initial State & Sensitivity Threshold Controls" 
                  className="w-full h-auto object-contain max-h-[560px] mx-auto transition-transform duration-700 group-hover:scale-[1.01]"
                />
                
                {/* Fullscreen Expand Trigger */}
                <button
                  onClick={() => setSelectedImageModal({
                    src: projectImages.threadeyeMainPreview,
                    title: "ThreadEye Operator Web Interface",
                    subtitle: "Sensitivity slider (confidence threshold 0.10), model metadata, and drag-and-drop sample loader"
                  })}
                  className="absolute bottom-4 right-4 px-3.5 py-2 rounded-xl bg-black/80 backdrop-blur-md border border-teal-500/40 text-teal-300 hover:text-white hover:border-teal-400 flex items-center gap-2 text-xs font-mono transition-all cursor-pointer shadow-lg"
                >
                  <Maximize2 className="w-4 h-4" />
                  <span>Click to Expand Full-Res</span>
                </button>

                {/* Badge Overlay */}
                <div className="absolute top-4 left-4 px-3 py-1.5 rounded-lg bg-black/80 backdrop-blur-md border border-teal-500/40 text-teal-300 text-xs font-mono flex items-center gap-2">
                  <SlidersHorizontal className="w-3.5 h-3.5" />
                  <span>Streamlit UI · Awaiting Fabric Sample Upload</span>
                </div>
              </div>

              {/* Detailed Breakdown */}
              <div className="space-y-4">
                <h4 className="text-lg font-bold text-white flex items-center gap-2">
                  <Sliders className="w-5 h-5 text-teal-400" />
                  Operator Controls & Production UI Architecture
                </h4>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
                  <div className="p-5 rounded-2xl bg-[#061e31] border border-teal-500/25 space-y-2.5">
                    <span className="text-xs font-mono text-teal-300 font-bold block uppercase">
                      A. Dynamic Sensitivity Slider
                    </span>
                    <p className="text-xs text-slate-300 leading-relaxed">
                      Operators can slide the confidence threshold between 0.05 and 0.95 (set at 0.10 default for early prototypes). This allows tailoring between ultra-strict defect hunting and high-throughput coarse sorting.
                    </p>
                  </div>

                  <div className="p-5 rounded-2xl bg-[#061e31] border border-teal-500/25 space-y-2.5">
                    <span className="text-xs font-mono text-teal-300 font-bold block uppercase">
                      B. Multi-Format Image Ingestion
                    </span>
                    <p className="text-xs text-slate-300 leading-relaxed">
                      Supports PNG, JPG, BMP, and TIFF formats with file sizes up to 200MB per batch. Automatically converts diverse industrial camera color spaces into normalized tensors.
                    </p>
                  </div>

                  <div className="p-5 rounded-2xl bg-[#061e31] border border-teal-500/25 space-y-2.5">
                    <span className="text-xs font-mono text-teal-300 font-bold block uppercase">
                      C. Instant Standalone Deployment
                    </span>
                    <p className="text-xs text-slate-300 leading-relaxed">
                      Engineered as a lightweight Streamlit Python web dashboard that runs locally on factory PCs without requiring heavy enterprise cloud subscriptions or proprietary controller software.
                    </p>
                  </div>
                </div>
              </div>
            </motion.div>
          )}

        </div>
      </div>

      {/* THE CHALLENGE VS OUR ENGINEERING APPROACH */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
        <div className="gradient-card rounded-3xl p-8 border border-cyan-500/30">
          <h3 className="text-2xl font-bold text-white mb-4 flex items-center gap-2.5">
            <span className="w-2.5 h-2.5 rounded-full bg-red-400 shadow-[0_0_10px_#f87171]"></span>
            The Challenge: Manual Inspection Fatigue
          </h3>
          <p className="text-sm sm:text-base text-slate-300 leading-relaxed">
            Textile mills, especially small and medium enterprises, rely on manual visual inspection for fabric quality control — a process where human inspectors suffer from visual fatigue within 20 minutes, leading to missed yarn breaks, inconsistent grading, expensive customer chargebacks, and discarded rolls.
          </p>
        </div>

        <div className="gradient-card rounded-3xl p-8 border border-teal-500/30">
          <h3 className="text-2xl font-bold text-white mb-4 flex items-center gap-2.5">
            <span className="w-2.5 h-2.5 rounded-full bg-cyan-400 shadow-[0_0_10px_#00f0ff]"></span>
            Our Engineering Solution: YOLOv8 Segmentation
          </h3>
          <p className="text-sm sm:text-base text-slate-300 leading-relaxed">
            We engineered an accessible, end-to-end computer vision pipeline combining custom tile preprocessing, a trained YOLOv8 instance segmentation network, sub-18ms GPU inference, and an intuitive Streamlit interface that delivers enterprise-grade defect isolation without proprietary vendor lock-in.
          </p>
        </div>
      </div>

      {/* HOW IT WORKS (5-STEP PIPELINE) */}
      <div className="mb-20">
        <h2 className="text-2xl sm:text-3xl font-bold text-white tracking-tight mb-10 text-center">
          How It <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-300 via-teal-300 to-indigo-400">Works</span>
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
          {steps.map((step, index) => {
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

      {/* TECH STACK TABLE */}
      <div className="gradient-card rounded-3xl p-6 sm:p-8 border border-cyan-500/30 mb-16 overflow-hidden">
        <h3 className="text-xl font-bold text-white mb-6 flex items-center gap-2">
          <Cpu className="w-5 h-5 text-cyan-400" />
          Technical Implementation & Architecture Matrix
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
              {techStackData.map((item, idx) => (
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
            Looking to Automate Quality Inspection in Your Facility?
          </h3>
          <p className="text-slate-300 text-sm sm:text-base">
            BrixelLabs designs custom computer vision models, edge inference engines, and automated industrial inspection platforms.
          </p>
          <button
            onClick={openConsultation}
            className="mt-4 px-8 py-4 rounded-xl bg-gradient-to-r from-cyan-400 via-teal-300 to-indigo-400 hover:from-cyan-300 hover:to-teal-200 text-[#031525] font-extrabold text-sm uppercase tracking-wider transition-all duration-300 shadow-[0_0_25px_rgba(0,240,255,0.4)] hover:shadow-[0_0_40px_rgba(0,240,255,0.8)] hover:scale-105 active:scale-95 cursor-pointer"
          >
            Request Computer Vision Consultation
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
