import React, { useState } from 'react';
import { 
  BookOpen, 
  Brain, 
  Search, 
  HelpCircle, 
  CheckCircle2, 
  ArrowRight, 
  Cpu, 
  Layers, 
  FileText, 
  Target, 
  Award, 
  Activity, 
  Maximize2, 
  X,
  Zap,
  Code2,
  Play
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { TiltCard } from '../components/common/TiltCard';
import { VideoPlayer } from '../components/common/VideoPlayer';
import { projectImages } from '../assets/projects';
import { NoesisAgentFlowchart } from '../components/case-studies/NoesisAgentFlowchart';

export const NoesisCaseStudyPage = ({ openConsultation }) => {
  const [activeTab, setActiveTab] = useState('video'); // 'video' | 'hero' | 'notes' | 'quiz' | 'result'
  const [selectedImageModal, setSelectedImageModal] = useState(null);

  // 5-Step Pipeline Steps
  const pipelineSteps = [
    { 
      num: '01', 
      title: 'Topic Intent & Scope Parsing', 
      desc: 'LLaMA 3.3 70B parses learner query into strict Pydantic schemas, identifying domain scope and complexity level.', 
      icon: Brain, 
      grad: 'from-cyan-400 to-teal-300' 
    },
    { 
      num: '02', 
      title: 'Dual-Engine Research Routing', 
      desc: 'Sub-agent routes fundamental queries to Wikipedia API and technical/cutting-edge topics to Tavily Deep Web Search.', 
      icon: Search, 
      grad: 'from-teal-300 to-cyan-400' 
    },
    { 
      num: '03', 
      title: 'Structured Note Synthesis', 
      desc: 'Synthesizes clean markdown notes structured with "What is it?", "How it works", runnable code examples, and common pitfalls.', 
      icon: FileText, 
      grad: 'from-cyan-300 to-indigo-400' 
    },
    { 
      num: '04', 
      title: 'Calibrated MCQ Generation', 
      desc: 'Generates 10 skill-adapted multiple-choice questions with plausible distractors designed to test deep comprehension.', 
      icon: Target, 
      grad: 'from-indigo-400 to-teal-300' 
    },
    { 
      num: '05', 
      title: 'Real-Time Checker & Retry Loop', 
      desc: 'Evaluates learner answers dynamically, provides instant corrective feedback, and stamps mastery status.', 
      icon: CheckCircle2, 
      grad: 'from-teal-300 to-emerald-400' 
    }
  ];

  const techStack = [
    'LangGraph (StateGraph)',
    'LangChain',
    'Groq (LLaMA 3.3 70B)',
    'Tavily Deep Search API',
    'Wikipedia API',
    'Streamlit / React UI',
    'Pydantic BaseModel',
    'MemorySaver Checkpoint'
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
          <span className="font-mono text-slate-300 ml-2">brixellabs.com/case-studies/noesis</span>
        </div>
        <span className="text-cyan-400 font-semibold font-mono text-[11px] flex items-center gap-1.5">
          <span className="w-2 h-2 rounded-full bg-cyan-400 animate-ping"></span>
          AGENTIC AI PIPELINE
        </span>
      </div>

      {/* Hero Section */}
      <div className="text-center mb-14 space-y-4">
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-gradient-to-r from-cyan-950/80 via-[#07243c]/80 to-teal-950/80 border border-cyan-500/30 text-cyan-300 text-xs font-mono uppercase tracking-wider shadow-[0_0_20px_rgba(0,240,255,0.2)]"
        >
          <Brain className="w-3.5 h-3.5 text-cyan-400" />
          <span>Case Study · Multi-Agent Learning & Adaptive Knowledge Synthesis</span>
        </motion.div>

        <motion.h1 
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-white tracking-tight"
        >
          Noesis — <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-300 via-teal-300 to-indigo-400 drop-shadow-[0_0_35px_rgba(0,240,255,0.45)]">AI-Powered Study Assistant</span>
        </motion.h1>

        <motion.p 
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="text-base sm:text-lg text-slate-300 max-w-3xl mx-auto font-normal leading-relaxed"
        >
          An autonomous multi-agent learning system built on LangGraph that dynamically understands topic scope, conducts dual-engine web research, synthesizes level-adapted study notes, and verifies comprehension through interactive MCQs.
        </motion.p>

        {/* Quick Tech Badges */}
        <div className="flex flex-wrap items-center justify-center gap-2 pt-2">
          {techStack.map((tech, i) => (
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
              Production App Interface Showcase & Complete Study Cycle
            </h3>
            <p className="text-xs sm:text-sm text-slate-400 mt-1">
              High-resolution captures from the working Noesis LangGraph stateful application
            </p>
          </div>

          {/* Tab Switcher */}
          <div className="flex items-center gap-2 p-1.5 rounded-2xl bg-[#041624] border border-cyan-500/30 self-start md:self-auto overflow-x-auto">
            <button
              onClick={() => setActiveTab('video')}
              className={`px-3.5 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-2 cursor-pointer whitespace-nowrap ${
                activeTab === 'video'
                  ? 'bg-gradient-to-r from-cyan-400 to-teal-300 text-[#031525] shadow-[0_0_15px_rgba(0,240,255,0.5)] font-extrabold'
                  : 'text-slate-300 hover:text-white hover:bg-white/5'
              }`}
            >
              <Play className="w-4 h-4" />
              <span>1. Live Video Demo</span>
            </button>

            <button
              onClick={() => setActiveTab('hero')}
              className={`px-3.5 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-2 cursor-pointer whitespace-nowrap ${
                activeTab === 'hero'
                  ? 'bg-gradient-to-r from-cyan-400 to-teal-300 text-[#031525] shadow-[0_0_15px_rgba(0,240,255,0.5)] font-extrabold'
                  : 'text-slate-300 hover:text-white hover:bg-white/5'
              }`}
            >
              <Search className="w-4 h-4" />
              <span>2. Adaptive Intent</span>
            </button>

            <button
              onClick={() => setActiveTab('notes')}
              className={`px-3.5 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-2 cursor-pointer whitespace-nowrap ${
                activeTab === 'notes'
                  ? 'bg-gradient-to-r from-teal-400 to-cyan-400 text-[#031525] shadow-[0_0_15px_rgba(0,229,208,0.5)] font-extrabold'
                  : 'text-slate-300 hover:text-white hover:bg-white/5'
              }`}
            >
              <FileText className="w-4 h-4" />
              <span>3. Synthesized Notes</span>
            </button>

            <button
              onClick={() => setActiveTab('quiz')}
              className={`px-3.5 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-2 cursor-pointer whitespace-nowrap ${
                activeTab === 'quiz'
                  ? 'bg-gradient-to-r from-cyan-300 to-indigo-400 text-[#031525] shadow-[0_0_15px_rgba(99,102,241,0.5)] font-extrabold'
                  : 'text-slate-300 hover:text-white hover:bg-white/5'
              }`}
            >
              <HelpCircle className="w-4 h-4" />
              <span>4. Dynamic Quiz</span>
            </button>

            <button
              onClick={() => setActiveTab('result')}
              className={`px-3.5 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-2 cursor-pointer whitespace-nowrap ${
                activeTab === 'result'
                  ? 'bg-gradient-to-r from-indigo-400 to-teal-300 text-[#031525] shadow-[0_0_15px_rgba(20,184,166,0.5)] font-extrabold'
                  : 'text-slate-300 hover:text-white hover:bg-white/5'
              }`}
            >
              <Award className="w-4 h-4" />
              <span>5. Mastery Loop</span>
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
                src="/assets/videos/noesis-demo.mp4"
                poster={projectImages.noesisHero}
                title="Noesis Multi-Agent Study Assistant"
                badge="LANGGRAPH LLM"
                autoPlay={true}
                loop={true}
                muted={true}
              />

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-2">
                <div className="p-4 rounded-2xl bg-[#061e31] border border-cyan-500/25 space-y-1">
                  <div className="text-xs font-mono text-cyan-300 font-bold uppercase">1. Dual-Engine Web Research</div>
                  <p className="text-xs text-slate-300">Wikipedia and Tavily deep research routing in under 38ms.</p>
                </div>
                <div className="p-4 rounded-2xl bg-[#061e31] border border-cyan-500/25 space-y-1">
                  <div className="text-xs font-mono text-teal-300 font-bold uppercase">2. StateGraph Orchestration</div>
                  <p className="text-xs text-slate-300">LangGraph nodes preserve memory, checkpoint state, and enable HITL review.</p>
                </div>
                <div className="p-4 rounded-2xl bg-[#061e31] border border-cyan-500/25 space-y-1">
                  <div className="text-xs font-mono text-emerald-300 font-bold uppercase">3. Groq LLaMA 3.3 70B</div>
                  <p className="text-xs text-slate-300">Sub-second generation of calibrated MCQs and level-adapted study summaries.</p>
                </div>
              </div>
            </motion.div>
          )}

          {/* TAB 1: ADAPTIVE INTENT PROMPT */}
          {activeTab === 'hero' && (
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.35 }}
              className="space-y-8"
            >
              <div className="relative rounded-2xl overflow-hidden border border-cyan-500/30 shadow-[0_10px_35px_rgba(0,0,0,0.8)] bg-[#fcf8f2] group">
                <img 
                  src={projectImages.noesisHero} 
                  alt="Noesis Adaptive Study Session Hero Interface" 
                  className="w-full h-auto object-contain max-h-[560px] mx-auto transition-transform duration-700 group-hover:scale-[1.01]"
                />
                
                <button
                  onClick={() => setSelectedImageModal({
                    src: projectImages.noesisHero,
                    title: "Noesis Adaptive Study Session Hero Interface",
                    subtitle: "'Learn it. Then prove it.' — Real-time student intent classifier and topic entry"
                  })}
                  className="absolute bottom-4 right-4 px-3.5 py-2 rounded-xl bg-black/80 backdrop-blur-md border border-cyan-500/40 text-cyan-300 hover:text-white hover:border-cyan-400 flex items-center gap-2 text-xs font-mono transition-all cursor-pointer shadow-lg"
                >
                  <Maximize2 className="w-4 h-4" />
                  <span>Click to Expand Full-Res</span>
                </button>

                <div className="absolute top-4 left-4 px-3 py-1.5 rounded-lg bg-black/80 backdrop-blur-md border border-cyan-500/40 text-cyan-300 text-xs font-mono flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-cyan-400 animate-ping"></span>
                  <span>localhost:5173 · Adaptive Topic Ingestion Engine</span>
                </div>
              </div>

              {/* Detailed Breakdown */}
              <div className="space-y-4">
                <h4 className="text-lg font-bold text-white flex items-center gap-2">
                  <Activity className="w-5 h-5 text-cyan-400" />
                  Stage 1: Intent Classification & Scope Disambiguation
                </h4>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
                  <div className="p-5 rounded-2xl bg-[#061e31] border border-cyan-500/25 space-y-2">
                    <span className="text-xs font-mono text-cyan-300 font-bold block uppercase">
                      1. Natural Language Ingestion
                    </span>
                    <p className="text-xs text-slate-300 leading-relaxed">
                      Learners type any conceptual topic (e.g. <em>"LangGraph"</em>, <em>"Transformer Attention"</em>, <em>"Quantum Computing"</em>). The LLM classifier analyzes intent, background prerequisites, and ambiguity.
                    </p>
                  </div>

                  <div className="p-5 rounded-2xl bg-[#061e31] border border-cyan-500/25 space-y-2">
                    <span className="text-xs font-mono text-cyan-300 font-bold block uppercase">
                      2. Human-in-the-Loop Safeguard
                    </span>
                    <p className="text-xs text-slate-300 leading-relaxed">
                      If the query is excessively broad or ambiguous (e.g. <em>"Python"</em>), LangGraph triggers <code>interrupt()</code> to ask the student whether they want Basics, Data Science, or Web Backend before proceeding.
                    </p>
                  </div>

                  <div className="p-5 rounded-2xl bg-[#061e31] border border-cyan-500/25 space-y-2">
                    <span className="text-xs font-mono text-cyan-300 font-bold block uppercase">
                      3. Sub-Second Execution via Groq
                    </span>
                    <p className="text-xs text-slate-300 leading-relaxed">
                      Powered by Groq's ultra-low latency LLaMA 3.3 70B inference engine, parsing structured intent and launching downstream search subgraphs in under 300ms.
                    </p>
                  </div>
                </div>
              </div>
            </motion.div>
          )}

          {/* TAB 2: SYNTHESIZED NOTES */}
          {activeTab === 'notes' && (
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.35 }}
              className="space-y-8"
            >
              <div className="relative rounded-2xl overflow-hidden border border-cyan-500/30 shadow-[0_10px_35px_rgba(0,0,0,0.8)] bg-[#fcf8f2] group">
                <img 
                  src={projectImages.noesisNotes} 
                  alt="Noesis Structured Synthesized Notes Screen" 
                  className="w-full h-auto object-contain max-h-[560px] mx-auto transition-transform duration-700 group-hover:scale-[1.01]"
                />
                
                <button
                  onClick={() => setSelectedImageModal({
                    src: projectImages.noesisNotes,
                    title: "Noesis Synthesized Knowledge Notes",
                    subtitle: "Beginner Level LangGraph breakdown: 'What is it?', 'How it works', and runnable Python examples"
                  })}
                  className="absolute bottom-4 right-4 px-3.5 py-2 rounded-xl bg-black/80 backdrop-blur-md border border-cyan-500/40 text-cyan-300 hover:text-white hover:border-cyan-400 flex items-center gap-2 text-xs font-mono transition-all cursor-pointer shadow-lg"
                >
                  <Maximize2 className="w-4 h-4" />
                  <span>Click to Expand Full-Res</span>
                </button>

                <div className="absolute top-4 left-4 px-3 py-1.5 rounded-lg bg-black/80 backdrop-blur-md border border-cyan-500/40 text-cyan-300 text-xs font-mono flex items-center gap-2">
                  <FileText className="w-3.5 h-3.5" />
                  <span>Synthesized Output · Beginner Level Calibration</span>
                </div>
              </div>

              {/* Detailed Breakdown */}
              <div className="space-y-4">
                <h4 className="text-lg font-bold text-white flex items-center gap-2">
                  <BookOpen className="w-5 h-5 text-teal-400" />
                  Stage 2: Multi-Source Knowledge Synthesis & Pedagogy
                </h4>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
                  <div className="p-5 rounded-2xl bg-[#061e31] border border-cyan-500/25 space-y-2">
                    <span className="text-xs font-mono text-teal-300 font-bold block uppercase">
                      A. Level-Adapted Explanations
                    </span>
                    <p className="text-xs text-slate-300 leading-relaxed">
                      Explains LangGraph simply for beginners: <em>"LangGraph is a tiny library that lets you draw a flow-chart for AI programs. Each box (node) does one thing..."</em> without intimidating newcomers with jargon.
                    </p>
                  </div>

                  <div className="p-5 rounded-2xl bg-[#061e31] border border-cyan-500/25 space-y-2">
                    <span className="text-xs font-mono text-teal-300 font-bold block uppercase">
                      B. Runnable Code Snippets
                    </span>
                    <p className="text-xs text-slate-300 leading-relaxed">
                      Generates minimal, syntax-verified Python code snippets showing <code>Graph()</code>, <code>add_node()</code>, and <code>add_edge()</code> for immediate hands-on comprehension.
                    </p>
                  </div>

                  <div className="p-5 rounded-2xl bg-[#061e31] border border-cyan-500/25 space-y-2">
                    <span className="text-xs font-mono text-teal-300 font-bold block uppercase">
                      C. Pitfalls & Key Takeaways
                    </span>
                    <p className="text-xs text-slate-300 leading-relaxed">
                      Every study module highlights frequent anti-patterns (e.g., forgetting to return state from nodes, creating infinite cycles) to build robust mental models.
                    </p>
                  </div>
                </div>
              </div>
            </motion.div>
          )}

          {/* TAB 3: DYNAMIC QUIZ & CHECKER */}
          {activeTab === 'quiz' && (
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.35 }}
              className="space-y-8"
            >
              <div className="relative rounded-2xl overflow-hidden border border-cyan-500/30 shadow-[0_10px_35px_rgba(0,0,0,0.8)] bg-[#fcf8f2] group">
                <img 
                  src={projectImages.noesisQuiz} 
                  alt="Noesis Dynamic MCQ Quiz & Real-Time Answer Checker" 
                  className="w-full h-auto object-contain max-h-[560px] mx-auto transition-transform duration-700 group-hover:scale-[1.01]"
                />
                
                <button
                  onClick={() => setSelectedImageModal({
                    src: projectImages.noesisQuiz,
                    title: "Noesis Dynamic Quiz & Real-Time Answer Checker",
                    subtitle: "Question 02 / 10 with interactive correction banner and intelligent distractor evaluation"
                  })}
                  className="absolute bottom-4 right-4 px-3.5 py-2 rounded-xl bg-black/80 backdrop-blur-md border border-cyan-500/40 text-cyan-300 hover:text-white hover:border-cyan-400 flex items-center gap-2 text-xs font-mono transition-all cursor-pointer shadow-lg"
                >
                  <Maximize2 className="w-4 h-4" />
                  <span>Click to Expand Full-Res</span>
                </button>

                <div className="absolute top-4 left-4 px-3 py-1.5 rounded-lg bg-black/80 backdrop-blur-md border border-cyan-500/40 text-cyan-300 text-xs font-mono flex items-center gap-2">
                  <HelpCircle className="w-3.5 h-3.5" />
                  <span>Interactive Quiz · Question 02 / 10 · Active Feedback</span>
                </div>
              </div>

              {/* Detailed Breakdown */}
              <div className="space-y-4">
                <h4 className="text-lg font-bold text-white flex items-center gap-2">
                  <HelpCircle className="w-5 h-5 text-cyan-400" />
                  Stage 3: Dynamic Question Generation & Immediate Feedback
                </h4>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
                  <div className="p-5 rounded-2xl bg-[#061e31] border border-cyan-500/25 space-y-2">
                    <span className="text-xs font-mono text-cyan-300 font-bold block uppercase">
                      1. Pydantic MCQ Generator
                    </span>
                    <p className="text-xs text-slate-300 leading-relaxed">
                      Questions are generated through strict Pydantic schemas (<code>class QuizQuestion(BaseModel)</code>) ensuring zero hallucinated formatting errors or invalid answer choices.
                    </p>
                  </div>

                  <div className="p-5 rounded-2xl bg-[#061e31] border border-cyan-500/25 space-y-2">
                    <span className="text-xs font-mono text-cyan-300 font-bold block uppercase">
                      2. Contextual Error Feedback
                    </span>
                    <p className="text-xs text-slate-300 leading-relaxed">
                      When an incorrect option is chosen, the top correction banner instantly explains the conceptual nuance: <em>"Actually, LangGraph is a library for creating flow-chart style AI programs (option A)."</em>
                    </p>
                  </div>

                  <div className="p-5 rounded-2xl bg-[#061e31] border border-cyan-500/25 space-y-2">
                    <span className="text-xs font-mono text-cyan-300 font-bold block uppercase">
                      3. Adaptive Difficulty Adjustment
                    </span>
                    <p className="text-xs text-slate-300 leading-relaxed">
                      Subsequent questions dynamically calibrate: consecutive correct answers raise question complexity, while mistakes prompt foundational reinforcement questions.
                    </p>
                  </div>
                </div>
              </div>
            </motion.div>
          )}

          {/* TAB 4: SCORE & MASTERY LOOP */}
          {activeTab === 'result' && (
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.35 }}
              className="space-y-8"
            >
              <div className="relative rounded-2xl overflow-hidden border border-cyan-500/30 shadow-[0_10px_35px_rgba(0,0,0,0.8)] bg-[#fcf8f2] group">
                <img 
                  src={projectImages.noesisResult} 
                  alt="Noesis Quiz Completion & Mastery Evaluation Screen" 
                  className="w-full h-auto object-contain max-h-[560px] mx-auto transition-transform duration-700 group-hover:scale-[1.01]"
                />
                
                <button
                  onClick={() => setSelectedImageModal({
                    src: projectImages.noesisResult,
                    title: "Noesis Quiz Result & Adaptive Mastery Evaluation",
                    subtitle: "Scoring engine stamping 10% on LangGraph with automatic intelligent review triggers"
                  })}
                  className="absolute bottom-4 right-4 px-3.5 py-2 rounded-xl bg-black/80 backdrop-blur-md border border-cyan-500/40 text-cyan-300 hover:text-white hover:border-cyan-400 flex items-center gap-2 text-xs font-mono transition-all cursor-pointer shadow-lg"
                >
                  <Maximize2 className="w-4 h-4" />
                  <span>Click to Expand Full-Res</span>
                </button>

                <div className="absolute top-4 left-4 px-3 py-1.5 rounded-lg bg-black/80 backdrop-blur-md border border-cyan-500/40 text-cyan-300 text-xs font-mono flex items-center gap-2">
                  <Award className="w-3.5 h-3.5" />
                  <span>Evaluation Engine · LangGraph State Preservation</span>
                </div>
              </div>

              {/* Detailed Breakdown */}
              <div className="space-y-4">
                <h4 className="text-lg font-bold text-white flex items-center gap-2">
                  <Award className="w-5 h-5 text-indigo-400" />
                  Stage 4: Automated Scoring & Checkpointer Retention
                </h4>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
                  <div className="p-5 rounded-2xl bg-[#061e31] border border-cyan-500/25 space-y-2">
                    <span className="text-xs font-mono text-indigo-300 font-bold block uppercase">
                      A. Mastery Benchmark Stamping
                    </span>
                    <p className="text-xs text-slate-300 leading-relaxed">
                      Scores below 70% receive a <strong>"RETRY NEEDED"</strong> stamp, signaling that core concepts require reinforcement before moving to advanced sub-topics.
                    </p>
                  </div>

                  <div className="p-5 rounded-2xl bg-[#061e31] border border-cyan-500/25 space-y-2">
                    <span className="text-xs font-mono text-indigo-300 font-bold block uppercase">
                      B. LangGraph State Retention
                    </span>
                    <p className="text-xs text-slate-300 leading-relaxed">
                      Clicking <strong>"Retry Quiz"</strong> does not start from zero — LangGraph's <code>MemorySaver</code> checkpointer retains the specific questions missed to generate a targeted remedial quiz.
                    </p>
                  </div>

                  <div className="p-5 rounded-2xl bg-[#061e31] border border-cyan-500/25 space-y-2">
                    <span className="text-xs font-mono text-indigo-300 font-bold block uppercase">
                      C. Seamless Next-Topic Transition
                    </span>
                    <p className="text-xs text-slate-300 leading-relaxed">
                      Learners can effortlessly branch into related topics (e.g. from LangGraph to LangChain, Agentic Tool-Calling, or Vector Memory) with cumulative knowledge tracking.
                    </p>
                  </div>
                </div>
              </div>
            </motion.div>
          )}

        </div>
      </div>

      {/* ANIMATED AGENT ARCHITECTURE FLOWCHART */}
      <NoesisAgentFlowchart />

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

      {/* Problem vs Solution & Deep Architecture Details */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
        <div className="gradient-card rounded-3xl p-8 border border-cyan-500/30">
          <h3 className="text-2xl font-bold text-white mb-4 flex items-center gap-2.5">
            <span className="w-2.5 h-2.5 rounded-full bg-red-400 shadow-[0_0_10px_#f87171]"></span>
            The Challenge: Static Online Learning Bottlenecks
          </h3>
          <p className="text-sm sm:text-base text-slate-300 leading-relaxed">
            Traditional online learning tools either overwhelm beginners with dense technical jargon or bore advanced practitioners with oversimplified summaries. Existing platforms lack an adaptive on-demand system that autonomously assesses learner background, conducts precision research, synthesizes notes, and tests comprehension in real-time.
          </p>
        </div>

        <div className="gradient-card rounded-3xl p-8 border border-teal-500/30">
          <h3 className="text-2xl font-bold text-white mb-4 flex items-center gap-2.5">
            <span className="w-2.5 h-2.5 rounded-full bg-cyan-400 shadow-[0_0_10px_#00f0ff]"></span>
            The Multi-Agent Solution: LangGraph StateGraphs
          </h3>
          <p className="text-sm sm:text-base text-slate-300 leading-relaxed">
            Noesis solves this through LangGraph StateGraphs. By coordinating specialized nodes with strict Pydantic schemas, dynamic routing between Wikipedia and Tavily, and interrupt-driven Human-in-the-Loop checkpoints, Noesis crafts personalized learning cycles with zero human bottleneck.
          </p>
        </div>
      </div>

      {/* Technical Feature Matrix Table */}
      <div className="gradient-card rounded-3xl p-6 sm:p-8 border border-cyan-500/30 mb-16 overflow-hidden">
        <h3 className="text-xl font-bold text-white mb-6 flex items-center gap-2">
          <Cpu className="w-5 h-5 text-cyan-400" />
          Technical Implementation Matrix
        </h3>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs sm:text-sm text-slate-300">
            <thead>
              <tr className="border-b border-cyan-500/30 text-cyan-300 font-mono">
                <th className="pb-3 px-4">Feature Layer</th>
                <th className="pb-3 px-4">Implementation Mechanism</th>
                <th className="pb-3 px-4">System Advantage</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-cyan-500/10">
              <tr>
                <td className="py-3 px-4 font-bold text-white">Stateful Graph Execution</td>
                <td className="py-3 px-4 font-mono text-cyan-300">StateGraph + TypedDict + Annotated reducers</td>
                <td className="py-3 px-4">Ensures message accumulation and thread-safe execution state</td>
              </tr>
              <tr>
                <td className="py-3 px-4 font-bold text-white">Adaptive Search Routing</td>
                <td className="py-3 px-4 font-mono text-cyan-300">Decision node with Literal structured output</td>
                <td className="py-3 px-4">Directs beginner queries to Wikipedia and deep queries to Tavily</td>
              </tr>
              <tr>
                <td className="py-3 px-4 font-bold text-white">Human-in-the-Loop</td>
                <td className="py-3 px-4 font-mono text-cyan-300">interrupt() + Command(resume=...)</td>
                <td className="py-3 px-4">Safely clarifies ambiguous prompts without graph termination</td>
              </tr>
              <tr>
                <td className="py-3 px-4 font-bold text-white">Persistent Memory</td>
                <td className="py-3 px-4 font-mono text-cyan-300">MemorySaver checkpointer + thread_id</td>
                <td className="py-3 px-4">Preserves multi-turn state across quiz cycles and revisions</td>
              </tr>
              <tr>
                <td className="py-3 px-4 font-bold text-white">Structured LLM Output</td>
                <td className="py-3 px-4 font-mono text-cyan-300">Pydantic BaseModel + strict=True</td>
                <td className="py-3 px-4">Guarantees zero formatting hallucinations during quiz creation</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      {/* CTA Footer */}
      <div className="gradient-card rounded-3xl p-8 sm:p-12 border border-cyan-500/40 text-center relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-cyan-500/10 via-teal-500/10 to-indigo-500/10"></div>
        <div className="relative z-10 space-y-4 max-w-2xl mx-auto">
          <h3 className="text-2xl sm:text-3xl font-extrabold text-white">
            Need an Autonomous Multi-Agent Solution for Your Business?
          </h3>
          <p className="text-slate-300 text-sm sm:text-base">
            From LangGraph orchestration to custom LLM tool-calling pipelines, BrixelLabs engineers production-grade AI systems tailored to your domain.
          </p>
          <button
            onClick={openConsultation}
            className="mt-4 px-8 py-4 rounded-xl bg-gradient-to-r from-cyan-400 via-teal-300 to-indigo-400 hover:from-cyan-300 hover:to-teal-200 text-[#031525] font-extrabold text-sm uppercase tracking-wider transition-all duration-300 shadow-[0_0_25px_rgba(0,240,255,0.4)] hover:shadow-[0_0_40px_rgba(0,240,255,0.8)] hover:scale-105 active:scale-95 cursor-pointer"
          >
            Schedule AI Architecture Consultation
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

              <div className="rounded-2xl overflow-hidden border border-cyan-500/30 bg-[#fcf8f2] flex items-center justify-center max-h-[75vh]">
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
