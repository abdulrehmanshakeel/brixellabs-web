import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  User, 
  Cpu, 
  Brain, 
  GitBranch, 
  Search, 
  Globe, 
  FileText, 
  Award, 
  Play, 
  Pause, 
  RotateCcw, 
  CheckCircle2, 
  Code2, 
  Terminal,
  Layers,
  ArrowRight,
  Zap,
  Info
} from 'lucide-react';

export const NoesisAgentFlowchart = () => {
  // Active execution simulation mode: 'direct' | 'tavily' | 'wikipedia'
  const [selectedRoute, setSelectedRoute] = useState('tavily');
  const [isPlaying, setIsPlaying] = useState(true);
  const [activeStepIndex, setActiveStepIndex] = useState(0);
  const [hoveredNode, setHoveredNode] = useState(null);

  // Define route steps
  const routes = {
    direct: {
      id: 'direct',
      name: 'Path A: Direct LLM Synthesis',
      badge: 'LLM Knowledge Only · Fast Path',
      color: 'from-cyan-400 to-indigo-400',
      strokeColor: '#818cf8',
      topicExample: 'What is a Python Decorator?',
      steps: [
        { nodeId: 'topic_input', label: 'Topic Input', log: 'Learner inputs standard programming question.' },
        { nodeId: 'tool_call', label: 'Tool Call Evaluator', log: 'Groq LLaMA 3.3 determines internal weights sufficient (needs_tool=False).' },
        { nodeId: 'answer_direct', label: 'Answer Directly', log: 'Extracts core knowledge representation directly from LLM memory.' },
        { nodeId: 'generate_notes', label: 'Generate Notes', log: 'Synthesizes clean markdown notes with runnable code snippets.' },
        { nodeId: 'quiz_scoring', label: 'Quiz + Scoring', log: 'Generates 10-question MCQ and initializes real-time grader.' }
      ],
      stateSnapshot: {
        topic: 'Python Decorators',
        tool_required: false,
        source: 'Groq LLaMA 3.3 70B (Internal Weights)',
        retrieval_latency: '120ms',
        notes_status: 'Generated (Structured Markdown)',
        quiz_mode: 'Active (10 MCQs generated)'
      }
    },
    tavily: {
      id: 'tavily',
      name: 'Path B: Deep Web Research (Tavily)',
      badge: 'Advanced Topic · Real-Time Web',
      color: 'from-cyan-400 to-teal-300',
      strokeColor: '#00F0FF',
      topicExample: 'LangGraph Multi-Agent Architecture with Checkpointing',
      steps: [
        { nodeId: 'topic_input', label: 'Topic Input', log: 'Learner queries cutting-edge framework concept.' },
        { nodeId: 'tool_call', label: 'Tool Call Evaluator', log: 'Evaluator flags query as dynamic/emergent technical topic (needs_tool=True).' },
        { nodeId: 'check_level', label: 'Check Level Node', log: 'Topic complexity classifier tags intent as "Advanced / Specialized".' },
        { nodeId: 'tavily_search', label: 'Tavily Search Subgraph', log: 'Tavily Deep Search API queries official documentation & GitHub repos.' },
        { nodeId: 'generate_notes', label: 'Generate Notes', log: 'Synthesizes advanced technical notes, state flowcharts & code.' },
        { nodeId: 'quiz_scoring', label: 'Quiz + Scoring', log: 'Generates deep comprehension MCQs testing architecture nuances.' }
      ],
      stateSnapshot: {
        topic: 'LangGraph StateGraphs',
        tool_required: true,
        level: 'Advanced / Specialized',
        source: 'Tavily Deep Web Search API (Docs & Github)',
        retrieval_latency: '480ms',
        notes_status: 'Generated with Flowchart & Code',
        quiz_mode: 'Calibrated Hard (Architecture MCQs)'
      }
    },
    wikipedia: {
      id: 'wikipedia',
      name: 'Path C: Encyclopedia Foundations (Wikipedia)',
      badge: 'Basic Topic · Curated Encyclopedia',
      color: 'from-teal-300 to-emerald-400',
      strokeColor: '#00E5D0',
      topicExample: 'History of Artificial Neural Networks',
      steps: [
        { nodeId: 'topic_input', label: 'Topic Input', log: 'Learner queries broad historical/fundamental concept.' },
        { nodeId: 'tool_call', label: 'Tool Call Evaluator', log: 'Evaluator identifies foundational domain needing external encyclopedia data.' },
        { nodeId: 'check_level', label: 'Check Level Node', log: 'Classifies domain intent as "Basic / Foundational Overview".' },
        { nodeId: 'wikipedia_search', label: 'Wikipedia Search Subgraph', log: 'Wikipedia API pulls canonical definitions, timelines, and citations.' },
        { nodeId: 'generate_notes', label: 'Generate Notes', log: 'Synthesizes beginner-friendly structured summary & analogies.' },
        { nodeId: 'quiz_scoring', label: 'Quiz + Scoring', log: 'Generates foundational recall & concept-matching quiz questions.' }
      ],
      stateSnapshot: {
        topic: 'History of Neural Networks',
        tool_required: true,
        level: 'Basic / Foundational',
        source: 'Wikipedia API (Curated Knowledge)',
        retrieval_latency: '240ms',
        notes_status: 'Synthesized (Intuitive Analogies)',
        quiz_mode: 'Calibrated Beginner (Foundational MCQs)'
      }
    }
  };

  const currentRouteData = routes[selectedRoute];

  // Auto-play interval effect
  useEffect(() => {
    let interval;
    if (isPlaying) {
      interval = setInterval(() => {
        setActiveStepIndex((prev) => (prev + 1) % currentRouteData.steps.length);
      }, 2200);
    }
    return () => clearInterval(interval);
  }, [isPlaying, selectedRoute, currentRouteData.steps.length]);

  // Handle manual route switch
  const handleRouteSelect = (routeKey) => {
    setSelectedRoute(routeKey);
    setActiveStepIndex(0);
  };

  const currentActiveNodeId = currentRouteData.steps[activeStepIndex]?.nodeId;

  // Node data dictionary for detailed info & positions
  const nodeDetails = {
    topic_input: {
      title: 'Topic input',
      subtitle: 'from user',
      icon: User,
      role: 'Captures learner query via natural language interface',
      badge: 'ENTRY POINT',
      borderGrad: 'border-cyan-500/50',
      glow: 'shadow-[0_0_20px_rgba(0,240,255,0.35)]',
      code: 'class GraphState(TypedDict):\n    topic: str\n    user_level: Optional[str]'
    },
    tool_call: {
      title: 'Tool call',
      subtitle: 'needed?',
      icon: Cpu,
      role: 'Structured LLM routing gate deciding if external knowledge is required',
      badge: 'DECISION GATE',
      borderGrad: 'border-cyan-400/60',
      glow: 'shadow-[0_0_20px_rgba(0,240,255,0.35)]',
      code: 'def should_use_tools(state: GraphState) -> Literal["direct", "check_level"]:\n    return "check_level" if state["needs_external"] else "direct"'
    },
    answer_direct: {
      title: 'Answer directly',
      subtitle: 'LLM knowledge only',
      icon: Brain,
      role: 'Zero-latency retrieval from Groq LLaMA 3.3 70B parameter memory',
      badge: 'DIRECT LLM',
      borderGrad: 'border-indigo-400/60',
      glow: 'shadow-[0_0_20px_rgba(129,140,248,0.35)]',
      code: 'def direct_llm_node(state: GraphState) -> GraphState:\n    response = llm.invoke(format_prompt(state["topic"]))\n    return {"raw_knowledge": response.content}'
    },
    check_level: {
      title: 'Check level',
      subtitle: 'advanced or basic?',
      icon: GitBranch,
      role: 'Classifies domain depth into Basic (Wikipedia) or Advanced (Tavily Deep Search)',
      badge: 'CLASSIFIER',
      borderGrad: 'border-teal-400/60',
      glow: 'shadow-[0_0_20px_rgba(0,229,208,0.35)]',
      code: 'def check_level_node(state: GraphState) -> Literal["tavily", "wikipedia"]:\n    level = classifier_chain.invoke(state["topic"])\n    return "tavily" if level == "advanced" else "wikipedia"'
    },
    tavily_search: {
      title: 'Tavily search',
      subtitle: 'advanced topic',
      icon: Search,
      role: 'Deep Web retrieval targeting live technical documentation, papers & code',
      badge: 'WEB SUBGRAPH',
      borderGrad: 'border-cyan-400/60',
      glow: 'shadow-[0_0_20px_rgba(0,240,255,0.4)]',
      code: 'def tavily_search_node(state: GraphState) -> GraphState:\n    docs = tavily_client.search(query=state["topic"], search_depth="advanced")\n    return {"raw_knowledge": docs}'
    },
    wikipedia_search: {
      title: 'Wikipedia search',
      subtitle: 'basic topic',
      icon: Globe,
      role: 'Encyclopedia retrieval for canonical historical & foundational concepts',
      badge: 'WIKI SUBGRAPH',
      borderGrad: 'border-teal-400/60',
      glow: 'shadow-[0_0_20px_rgba(0,229,208,0.4)]',
      code: 'def wikipedia_search_node(state: GraphState) -> GraphState:\n    summary = wiki_api.run(state["topic"])\n    return {"raw_knowledge": summary}'
    },
    generate_notes: {
      title: 'Generate notes',
      subtitle: 'LLM synthesis',
      icon: FileText,
      role: 'Synthesizes clean markdown notes with "What is it?", "How it works", and code',
      badge: 'SYNTHESIS NODE',
      borderGrad: 'border-indigo-400/60',
      glow: 'shadow-[0_0_20px_rgba(129,140,248,0.4)]',
      code: 'def generate_notes_node(state: GraphState) -> GraphState:\n    notes = synthesis_chain.invoke(state["raw_knowledge"])\n    return {"study_notes": notes}'
    },
    quiz_scoring: {
      title: 'Quiz + scoring',
      subtitle: 'auto-graded',
      icon: Award,
      role: 'Pydantic structured MCQ creation, real-time evaluation & MemorySaver retry loop',
      badge: 'EVALUATION & MEMORY',
      borderGrad: 'border-emerald-400/60',
      glow: 'shadow-[0_0_20px_rgba(52,211,153,0.4)]',
      code: 'def quiz_scoring_node(state: GraphState) -> GraphState:\n    quiz = pydantic_quiz_generator.invoke(state["study_notes"])\n    return {"quiz_items": quiz, "passed": check_mastery(quiz)}'
    }
  };

  // Helper to check if a node is currently active in simulation
  const isNodeActive = (nodeId) => {
    return currentActiveNodeId === nodeId;
  };

  // Helper to check if a node belongs to the currently selected route
  const isNodeInSelectedRoute = (nodeId) => {
    return currentRouteData.steps.some(step => step.nodeId === nodeId);
  };

  return (
    <div className="gradient-card rounded-3xl p-6 sm:p-8 border border-cyan-500/30 shadow-2xl overflow-hidden relative mb-16">
      
      {/* Background Cyber Ambient Glows */}
      <div className="absolute -top-32 -left-32 w-80 h-80 bg-cyan-500/10 rounded-full blur-[100px] pointer-events-none"></div>
      <div className="absolute -bottom-32 -right-32 w-80 h-80 bg-teal-500/10 rounded-full blur-[100px] pointer-events-none"></div>
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-indigo-500/5 rounded-full blur-[120px] pointer-events-none"></div>

      {/* Header & Controls Bar */}
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6 pb-6 border-b border-cyan-500/20 mb-8 relative z-10">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-950/80 border border-cyan-500/30 text-cyan-300 text-xs font-mono uppercase tracking-wider mb-2">
            <span className="w-2 h-2 rounded-full bg-cyan-400 animate-ping"></span>
            <span>LangGraph Stateful Multi-Agent Architecture</span>
          </div>
          <h3 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight flex items-center gap-3">
            <span>Noesis Agentic Routing & Synthesis Graph</span>
          </h3>
          <p className="text-xs sm:text-sm text-slate-300 mt-1 max-w-2xl">
            Live animated execution of the exact Noesis agent decision graph: user topic intake, LLM tool gating, dual-engine research routing (Tavily vs Wikipedia), notes synthesis, and automated MCQ grading.
          </p>
        </div>

        {/* Route Selector & Playback Controls */}
        <div className="flex flex-wrap items-center gap-2.5">
          <div className="flex items-center p-1 rounded-xl bg-[#041624] border border-cyan-500/30">
            <button
              onClick={() => handleRouteSelect('direct')}
              className={`px-3 py-1.5 rounded-lg text-xs font-mono font-bold transition-all cursor-pointer flex items-center gap-1.5 ${
                selectedRoute === 'direct'
                  ? 'bg-gradient-to-r from-indigo-500 to-cyan-500 text-white shadow-[0_0_12px_rgba(99,102,241,0.5)]'
                  : 'text-slate-400 hover:text-white hover:bg-white/5'
              }`}
            >
              <span>Direct LLM</span>
            </button>

            <button
              onClick={() => handleRouteSelect('tavily')}
              className={`px-3 py-1.5 rounded-lg text-xs font-mono font-bold transition-all cursor-pointer flex items-center gap-1.5 ${
                selectedRoute === 'tavily'
                  ? 'bg-gradient-to-r from-cyan-400 to-teal-300 text-[#031525] shadow-[0_0_12px_rgba(0,240,255,0.5)] font-extrabold'
                  : 'text-slate-400 hover:text-white hover:bg-white/5'
              }`}
            >
              <span>Tavily (Adv)</span>
            </button>

            <button
              onClick={() => handleRouteSelect('wikipedia')}
              className={`px-3 py-1.5 rounded-lg text-xs font-mono font-bold transition-all cursor-pointer flex items-center gap-1.5 ${
                selectedRoute === 'wikipedia'
                  ? 'bg-gradient-to-r from-teal-400 to-emerald-400 text-[#031525] shadow-[0_0_12px_rgba(0,229,208,0.5)] font-extrabold'
                  : 'text-slate-400 hover:text-white hover:bg-white/5'
              }`}
            >
              <span>Wiki (Basic)</span>
            </button>
          </div>

          {/* Play/Pause & Reset */}
          <div className="flex items-center gap-1 bg-[#041624] p-1 rounded-xl border border-cyan-500/30">
            <button
              onClick={() => setIsPlaying(!isPlaying)}
              title={isPlaying ? "Pause Execution Simulation" : "Play Execution Simulation"}
              className="p-1.5 rounded-lg bg-cyan-950/80 hover:bg-cyan-900 border border-cyan-500/30 text-cyan-300 hover:text-white transition-all cursor-pointer"
            >
              {isPlaying ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
            </button>
            <button
              onClick={() => setActiveStepIndex(0)}
              title="Reset to Start Node"
              className="p-1.5 rounded-lg bg-cyan-950/80 hover:bg-cyan-900 border border-cyan-500/30 text-cyan-300 hover:text-white transition-all cursor-pointer"
            >
              <RotateCcw className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>

      {/* Interactive Active Route Banner */}
      <div className="mb-6 p-3.5 rounded-2xl bg-[#04192b]/90 border border-cyan-500/25 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs">
        <div className="flex items-center gap-2.5">
          <div className="w-2.5 h-2.5 rounded-full bg-cyan-400 animate-pulse"></div>
          <span className="font-mono text-cyan-300 font-bold uppercase">{currentRouteData.name}</span>
          <span className="text-slate-500 hidden sm:inline">|</span>
          <span className="text-slate-300 font-mono text-[11px]">Query: "{currentRouteData.topicExample}"</span>
        </div>

        <div className="flex items-center gap-2">
          <span className="text-slate-400 font-mono text-[11px]">Executing Node:</span>
          <span className="px-2.5 py-0.5 rounded-md bg-cyan-950 text-cyan-300 border border-cyan-400/50 font-mono font-bold text-[11px] uppercase animate-pulse">
            {currentRouteData.steps[activeStepIndex]?.label}
          </span>
        </div>
      </div>

      {/* ========================================================================= */}
      {/* FLOWCHART CANVAS (DESKTOP / TABLET SVG INTERACTIVE VIEW) */}
      {/* ========================================================================= */}
      <div className="relative w-full bg-[#03121f]/95 rounded-3xl border border-cyan-500/30 p-4 sm:p-6 shadow-inner overflow-x-auto min-h-[520px] flex items-center justify-center">
        
        {/* Subtle Cyber Grid Background */}
        <div 
          className="absolute inset-0 opacity-15 pointer-events-none"
          style={{
            backgroundImage: `radial-gradient(circle at 1px 1px, #00F0FF 1px, transparent 0)`,
            backgroundSize: '28px 28px'
          }}
        ></div>

        {/* DESKTOP 1000px FIXED COORDINATE GRAPH CANVAS */}
        <div className="relative w-[1000px] h-[480px] shrink-0 hidden md:block z-10">

          {/* SVG CONNECTIONS & ANIMATED STREAMING PARTICLES */}
          <svg 
            className="absolute inset-0 w-full h-full pointer-events-none z-0" 
            viewBox="0 0 1000 480" 
          >
            <defs>
              <linearGradient id="cyanTealGrad" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="#00F0FF" />
                <stop offset="100%" stopColor="#00E5D0" />
              </linearGradient>

              <linearGradient id="skyGrad" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="#38BDF8" />
                <stop offset="100%" stopColor="#00F0FF" />
              </linearGradient>

              <linearGradient id="indigoGrad" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="#6366F1" />
                <stop offset="100%" stopColor="#00F0FF" />
              </linearGradient>

              <linearGradient id="emeraldGrad" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="#00E5D0" />
                <stop offset="100%" stopColor="#34D399" />
              </linearGradient>

              <filter id="glowEffect" x="-20%" y="-20%" width="140%" height="140%">
                <feGaussianBlur stdDeviation="3" result="blur" />
                <feMerge>
                  <feMergeNode in="blur" />
                  <feMergeNode in="SourceGraphic" />
                </feMerge>
              </filter>
            </defs>

            {/* PATH 1: Topic Input (168, 250) -> Tool Call (228, 250) */}
            <path
              d="M 168 250 L 228 250"
              fill="none"
              stroke="#00F0FF"
              strokeWidth="2.5"
              strokeDasharray="6 6"
              className="transition-colors duration-500"
              style={{
                animation: 'flowDash 1.2s linear infinite'
              }}
            />

            {/* BRANCH NO: Tool Call (380, 230) -> Answer Directly (440, 75) */}
            <path
              d="M 380 230 C 405 150, 410 75, 440 75"
              fill="none"
              stroke={selectedRoute === 'direct' ? '#818cf8' : '#16314d'}
              strokeWidth={selectedRoute === 'direct' ? '3' : '1.5'}
              strokeDasharray="6 6"
              filter={selectedRoute === 'direct' ? 'url(#glowEffect)' : undefined}
              className="transition-all duration-500"
              style={{
                animation: selectedRoute === 'direct' ? 'flowDash 1s linear infinite' : 'none'
              }}
            />

            {/* BRANCH YES: Tool Call (380, 270) -> Check Level (440, 400) */}
            <path
              d="M 380 270 C 405 340, 410 400, 440 400"
              fill="none"
              stroke={(selectedRoute === 'tavily' || selectedRoute === 'wikipedia') ? '#00E5D0' : '#16314d'}
              strokeWidth={(selectedRoute === 'tavily' || selectedRoute === 'wikipedia') ? '3' : '1.5'}
              strokeDasharray="6 6"
              filter={(selectedRoute === 'tavily' || selectedRoute === 'wikipedia') ? 'url(#glowEffect)' : undefined}
              className="transition-all duration-500"
              style={{
                animation: (selectedRoute === 'tavily' || selectedRoute === 'wikipedia') ? 'flowDash 1s linear infinite' : 'none'
              }}
            />

            {/* Answer Directly (592, 75) -> Generate Notes (835, 140) */}
            <path
              d="M 592 75 C 710 75, 750 140, 835 140"
              fill="none"
              stroke={selectedRoute === 'direct' ? '#818cf8' : '#16314d'}
              strokeWidth={selectedRoute === 'direct' ? '3' : '1.5'}
              strokeDasharray="6 6"
              filter={selectedRoute === 'direct' ? 'url(#glowEffect)' : undefined}
              className="transition-all duration-500"
              style={{
                animation: selectedRoute === 'direct' ? 'flowDash 1s linear infinite' : 'none'
              }}
            />

            {/* Check Level (592, 385) -> Tavily Search (645, 230) [ADVANCED] */}
            <path
              d="M 592 385 C 618 385, 618 230, 645 230"
              fill="none"
              stroke={selectedRoute === 'tavily' ? '#00F0FF' : '#16314d'}
              strokeWidth={selectedRoute === 'tavily' ? '3' : '1.5'}
              strokeDasharray="6 6"
              filter={selectedRoute === 'tavily' ? 'url(#glowEffect)' : undefined}
              className="transition-all duration-500"
              style={{
                animation: selectedRoute === 'tavily' ? 'flowDash 1s linear infinite' : 'none'
              }}
            />

            {/* Check Level (592, 415) -> Wikipedia Search (645, 385) [BASIC] */}
            <path
              d="M 592 415 C 618 415, 620 385, 645 385"
              fill="none"
              stroke={selectedRoute === 'wikipedia' ? '#00E5D0' : '#16314d'}
              strokeWidth={selectedRoute === 'wikipedia' ? '3' : '1.5'}
              strokeDasharray="6 6"
              filter={selectedRoute === 'wikipedia' ? 'url(#glowEffect)' : undefined}
              className="transition-all duration-500"
              style={{
                animation: selectedRoute === 'wikipedia' ? 'flowDash 1s linear infinite' : 'none'
              }}
            />

            {/* Tavily Search (797, 230) -> Generate Notes (835, 155) */}
            <path
              d="M 797 230 C 815 230, 818 155, 835 155"
              fill="none"
              stroke={selectedRoute === 'tavily' ? '#00F0FF' : '#16314d'}
              strokeWidth={selectedRoute === 'tavily' ? '3' : '1.5'}
              strokeDasharray="6 6"
              filter={selectedRoute === 'tavily' ? 'url(#glowEffect)' : undefined}
              className="transition-all duration-500"
              style={{
                animation: selectedRoute === 'tavily' ? 'flowDash 1s linear infinite' : 'none'
              }}
            />

            {/* Wikipedia Search (797, 385) -> Generate Notes (835, 165) */}
            <path
              d="M 797 385 C 825 385, 825 165, 835 165"
              fill="none"
              stroke={selectedRoute === 'wikipedia' ? '#00E5D0' : '#16314d'}
              strokeWidth={selectedRoute === 'wikipedia' ? '3' : '1.5'}
              strokeDasharray="6 6"
              filter={selectedRoute === 'wikipedia' ? 'url(#glowEffect)' : undefined}
              className="transition-all duration-500"
              style={{
                animation: selectedRoute === 'wikipedia' ? 'flowDash 1s linear infinite' : 'none'
              }}
            />

            {/* Generate Notes (911, 195) -> Quiz + Scoring (911, 330) */}
            <path
              d="M 911 195 L 911 330"
              fill="none"
              stroke="#00E5D0"
              strokeWidth="3"
              strokeDasharray="6 6"
              filter="url(#glowEffect)"
              className="transition-all duration-500"
              style={{
                animation: 'flowDashVertical 1s linear infinite'
              }}
            />

            {/* DECISION LABELS ON CONNECTIONS */}
            <g className="text-[10px] font-mono font-bold select-none">
              {/* Label NO */}
              <rect x="397" y="132" width="30" height="18" rx="4" fill="#041624" stroke="#818cf8" strokeWidth="1" />
              <text x="412" y="145" fill="#a5b4fc" textAnchor="middle">NO</text>

              {/* Label YES */}
              <rect x="396" y="317" width="32" height="18" rx="4" fill="#041624" stroke="#F59E0B" strokeWidth="1" />
              <text x="412" y="330" fill="#FCD34D" textAnchor="middle">YES</text>
            </g>
          </svg>

          {/* ========================================================================= */}
          {/* NODES POSITIONED ON DESKTOP CANVAS (Exact Pixel Separation) */}
          {/* ========================================================================= */}

          {/* 1. NODE: TOPIC INPUT (Left: 16px, Top: 210px) */}
          <div 
            style={{ left: '16px', top: '210px' }}
            className="absolute cursor-pointer group"
            onMouseEnter={() => setHoveredNode('topic_input')}
            onMouseLeave={() => setHoveredNode(null)}
          >
            <div className={`p-3.5 rounded-2xl bg-[#051c2e]/95 backdrop-blur-md border transition-all duration-500 w-[152px] text-center ${
              isNodeActive('topic_input')
                ? 'border-cyan-400 shadow-[0_0_25px_rgba(0,240,255,0.7)] scale-105 bg-[#072a45]'
                : isNodeInSelectedRoute('topic_input')
                  ? 'border-cyan-500/40 hover:border-cyan-400'
                  : 'border-slate-800 opacity-60'
            }`}>
              <div className="w-8 h-8 mx-auto rounded-xl bg-cyan-950/80 border border-cyan-500/40 flex items-center justify-center text-cyan-300 mb-1.5">
                <User className="w-4 h-4" />
              </div>
              <h5 className="font-mono font-bold text-white text-xs">Topic input</h5>
              <p className="font-mono text-[10px] text-slate-400">from user</p>
            </div>
          </div>

          {/* 2. NODE: TOOL CALL (Left: 228px, Top: 210px) -> 60px Gap from Topic Input */}
          <div 
            style={{ left: '228px', top: '210px' }}
            className="absolute cursor-pointer group"
            onMouseEnter={() => setHoveredNode('tool_call')}
            onMouseLeave={() => setHoveredNode(null)}
          >
            <div className={`p-3.5 rounded-2xl bg-[#051c2e]/95 backdrop-blur-md border transition-all duration-500 w-[152px] text-center ${
              isNodeActive('tool_call')
                ? 'border-cyan-400 shadow-[0_0_25px_rgba(0,240,255,0.7)] scale-105 bg-[#05283d]'
                : isNodeInSelectedRoute('tool_call')
                  ? 'border-cyan-500/40 hover:border-cyan-400'
                  : 'border-slate-800 opacity-60'
            }`}>
              <div className="w-8 h-8 mx-auto rounded-xl bg-cyan-950/80 border border-cyan-500/40 flex items-center justify-center text-cyan-300 mb-1.5">
                <Cpu className="w-4 h-4" />
              </div>
              <h5 className="font-mono font-bold text-white text-xs">Tool call</h5>
              <p className="font-mono text-[10px] text-slate-400">needed?</p>
            </div>
          </div>

          {/* 3. NODE: ANSWER DIRECTLY (Left: 440px, Top: 35px) */}
          <div 
            style={{ left: '440px', top: '35px' }}
            className="absolute cursor-pointer group"
            onMouseEnter={() => setHoveredNode('answer_direct')}
            onMouseLeave={() => setHoveredNode(null)}
          >
            <div className={`p-3.5 rounded-2xl bg-[#051c2e]/95 backdrop-blur-md border transition-all duration-500 w-[152px] text-center ${
              isNodeActive('answer_direct')
                ? 'border-indigo-400 shadow-[0_0_25px_rgba(129,140,248,0.7)] scale-105 bg-[#151633]'
                : isNodeInSelectedRoute('answer_direct')
                  ? 'border-indigo-500/40 hover:border-indigo-400'
                  : 'border-slate-800 opacity-50'
            }`}>
              <div className="w-8 h-8 mx-auto rounded-xl bg-indigo-950/80 border border-indigo-500/40 flex items-center justify-center text-indigo-300 mb-1.5">
                <Brain className="w-4 h-4" />
              </div>
              <h5 className="font-mono font-bold text-white text-xs">Answer directly</h5>
              <p className="font-mono text-[10px] text-slate-400">LLM knowledge only</p>
            </div>
          </div>

          {/* 4. NODE: CHECK LEVEL (Left: 440px, Top: 360px) */}
          <div 
            style={{ left: '440px', top: '360px' }}
            className="absolute cursor-pointer group"
            onMouseEnter={() => setHoveredNode('check_level')}
            onMouseLeave={() => setHoveredNode(null)}
          >
            <div className={`p-3.5 rounded-2xl bg-[#051c2e]/95 backdrop-blur-md border transition-all duration-500 w-[152px] text-center ${
              isNodeActive('check_level')
                ? 'border-teal-400 shadow-[0_0_25px_rgba(0,229,208,0.7)] scale-105 bg-[#042a30]'
                : isNodeInSelectedRoute('check_level')
                  ? 'border-teal-500/40 hover:border-teal-400'
                  : 'border-slate-800 opacity-50'
            }`}>
              <div className="w-8 h-8 mx-auto rounded-xl bg-teal-950/80 border border-teal-500/40 flex items-center justify-center text-teal-300 mb-1.5">
                <GitBranch className="w-4 h-4" />
              </div>
              <h5 className="font-mono font-bold text-white text-xs">Check level</h5>
              <p className="font-mono text-[10px] text-slate-400">advanced or basic?</p>
            </div>
          </div>

          {/* 5. NODE: TAVILY SEARCH (Left: 645px, Top: 190px) */}
          <div 
            style={{ left: '645px', top: '190px' }}
            className="absolute cursor-pointer group"
            onMouseEnter={() => setHoveredNode('tavily_search')}
            onMouseLeave={() => setHoveredNode(null)}
          >
            <div className={`p-3.5 rounded-2xl bg-[#051c2e]/95 backdrop-blur-md border transition-all duration-500 w-[152px] text-center ${
              isNodeActive('tavily_search')
                ? 'border-cyan-400 shadow-[0_0_25px_rgba(0,240,255,0.7)] scale-105 bg-[#072a45]'
                : isNodeInSelectedRoute('tavily_search')
                  ? 'border-cyan-500/40 hover:border-cyan-400'
                  : 'border-slate-800 opacity-50'
            }`}>
              <div className="w-8 h-8 mx-auto rounded-xl bg-cyan-950/80 border border-cyan-500/40 flex items-center justify-center text-cyan-300 mb-1.5">
                <Search className="w-4 h-4" />
              </div>
              <h5 className="font-mono font-bold text-white text-xs">Tavily search</h5>
              <p className="font-mono text-[10px] text-slate-400">advanced topic</p>
            </div>
          </div>

          {/* 6. NODE: WIKIPEDIA SEARCH (Left: 645px, Top: 345px) */}
          <div 
            style={{ left: '645px', top: '345px' }}
            className="absolute cursor-pointer group"
            onMouseEnter={() => setHoveredNode('wikipedia_search')}
            onMouseLeave={() => setHoveredNode(null)}
          >
            <div className={`p-3.5 rounded-2xl bg-[#051c2e]/95 backdrop-blur-md border transition-all duration-500 w-[152px] text-center ${
              isNodeActive('wikipedia_search')
                ? 'border-teal-400 shadow-[0_0_25px_rgba(0,229,208,0.7)] scale-105 bg-[#062c33]'
                : isNodeInSelectedRoute('wikipedia_search')
                  ? 'border-teal-500/40 hover:border-teal-400'
                  : 'border-slate-800 opacity-50'
            }`}>
              <div className="w-8 h-8 mx-auto rounded-xl bg-teal-950/80 border border-teal-500/40 flex items-center justify-center text-teal-300 mb-1.5">
                <Globe className="w-4 h-4" />
              </div>
              <h5 className="font-mono font-bold text-white text-xs">Wikipedia search</h5>
              <p className="font-mono text-[10px] text-slate-400">basic topic</p>
            </div>
          </div>

          {/* 7. NODE: GENERATE NOTES (Left: 835px, Top: 115px) */}
          <div 
            style={{ left: '835px', top: '115px' }}
            className="absolute cursor-pointer group"
            onMouseEnter={() => setHoveredNode('generate_notes')}
            onMouseLeave={() => setHoveredNode(null)}
          >
            <div className={`p-3.5 rounded-2xl bg-[#051c2e]/95 backdrop-blur-md border transition-all duration-500 w-[152px] text-center ${
              isNodeActive('generate_notes')
                ? 'border-indigo-400 shadow-[0_0_25px_rgba(129,140,248,0.7)] scale-105 bg-[#151633]'
                : isNodeInSelectedRoute('generate_notes')
                  ? 'border-indigo-500/40 hover:border-indigo-400'
                  : 'border-slate-800 opacity-60'
            }`}>
              <div className="w-8 h-8 mx-auto rounded-xl bg-indigo-950/80 border border-indigo-500/40 flex items-center justify-center text-indigo-300 mb-1.5">
                <FileText className="w-4 h-4" />
              </div>
              <h5 className="font-mono font-bold text-white text-xs">Generate notes</h5>
              <p className="font-mono text-[10px] text-slate-400">LLM synthesis</p>
            </div>
          </div>

          {/* 8. NODE: QUIZ + SCORING (Left: 835px, Top: 330px) */}
          <div 
            style={{ left: '835px', top: '330px' }}
            className="absolute cursor-pointer group"
            onMouseEnter={() => setHoveredNode('quiz_scoring')}
            onMouseLeave={() => setHoveredNode(null)}
          >
            <div className={`p-3.5 rounded-2xl bg-[#051c2e]/95 backdrop-blur-md border transition-all duration-500 w-[152px] text-center ${
              isNodeActive('quiz_scoring')
                ? 'border-emerald-400 shadow-[0_0_25px_rgba(52,211,153,0.7)] scale-105 bg-[#062c20]'
                : isNodeInSelectedRoute('quiz_scoring')
                  ? 'border-emerald-500/40 hover:border-emerald-400'
                  : 'border-slate-800 opacity-60'
            }`}>
              <div className="w-8 h-8 mx-auto rounded-xl bg-emerald-950/80 border border-emerald-500/40 flex items-center justify-center text-emerald-300 mb-1.5">
                <Award className="w-4 h-4" />
              </div>
              <h5 className="font-mono font-bold text-white text-xs">Quiz + scoring</h5>
              <p className="font-mono text-[10px] text-slate-400">auto-graded</p>
            </div>
          </div>

        </div>

        {/* ========================================================================= */}
        {/* MOBILE RESPONSIVE STEP-BY-STEP FLOW VIEW */}
        {/* ========================================================================= */}
        <div className="block md:hidden w-full space-y-3 z-10">
          {currentRouteData.steps.map((step, idx) => {
            const details = nodeDetails[step.nodeId];
            const StepIcon = details?.icon || Cpu;
            const isStepActive = idx === activeStepIndex;

            return (
              <div 
                key={step.nodeId}
                onClick={() => setActiveStepIndex(idx)}
                className={`p-4 rounded-2xl border transition-all flex items-center justify-between cursor-pointer ${
                  isStepActive 
                    ? 'bg-[#07243c] border-cyan-400 shadow-[0_0_15px_rgba(0,240,255,0.4)]'
                    : 'bg-[#041624] border-cyan-500/20 text-slate-300'
                }`}
              >
                <div className="flex items-center gap-3">
                  <div className={`w-8 h-8 rounded-xl flex items-center justify-center shrink-0 ${
                    isStepActive ? 'bg-cyan-500 text-black font-bold' : 'bg-cyan-950 text-cyan-400'
                  }`}>
                    <StepIcon className="w-4 h-4" />
                  </div>
                  <div>
                    <h6 className="font-mono font-bold text-xs text-white">{details.title}</h6>
                    <p className="font-mono text-[10px] text-slate-400">{details.subtitle}</p>
                  </div>
                </div>

                {isStepActive && (
                  <span className="w-2.5 h-2.5 rounded-full bg-cyan-400 animate-ping"></span>
                )}
              </div>
            );
          })}
        </div>

      </div>

      {/* ========================================================================= */}
      {/* LIVE EXECUTION LOG & LANGGRAPH STATE DICTIONARY INSPECTOR */}
      {/* ========================================================================= */}
      <div className="mt-6 grid grid-cols-1 lg:grid-cols-12 gap-5">
        
        {/* Step Breakdown & Description */}
        <div className="lg:col-span-6 p-5 rounded-2xl bg-[#041624]/90 border border-cyan-500/25 space-y-3">
          <div className="flex items-center justify-between pb-2 border-b border-cyan-500/20">
            <span className="text-xs font-mono text-cyan-300 font-bold uppercase flex items-center gap-2">
              <Zap className="w-3.5 h-3.5 text-cyan-400" />
              Live Execution Step Log (Step {activeStepIndex + 1} of {currentRouteData.steps.length})
            </span>
            <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-cyan-950 text-cyan-300 border border-cyan-500/30">
              {currentRouteData.badge}
            </span>
          </div>

          <div>
            <h5 className="text-sm font-bold text-white flex items-center gap-2">
              <span>{currentRouteData.steps[activeStepIndex]?.label}</span>
              <ArrowRight className="w-3.5 h-3.5 text-cyan-400" />
              <span className="text-cyan-300 font-mono text-xs">{nodeDetails[currentActiveNodeId]?.subtitle}</span>
            </h5>
            <p className="text-xs text-slate-300 mt-1.5 leading-relaxed">
              {currentRouteData.steps[activeStepIndex]?.log}
            </p>
          </div>

          <div className="pt-2">
            <div className="p-3 rounded-xl bg-[#020b12] border border-cyan-500/20 font-mono text-[11px] text-slate-300 leading-relaxed overflow-x-auto">
              <span className="text-cyan-400 font-bold block mb-1">// LangGraph Node Invocation</span>
              <code className="text-emerald-300 block whitespace-pre-wrap">
                {nodeDetails[currentActiveNodeId]?.code}
              </code>
            </div>
          </div>
        </div>

        {/* State Snapshot Matrix */}
        <div className="lg:col-span-6 p-5 rounded-2xl bg-[#041624]/90 border border-cyan-500/25 space-y-3">
          <div className="flex items-center justify-between pb-2 border-b border-cyan-500/20">
            <span className="text-xs font-mono text-teal-300 font-bold uppercase flex items-center gap-2">
              <Terminal className="w-3.5 h-3.5 text-teal-400" />
              StateGraph TypedDict Checkpoint Snapshot
            </span>
            <span className="text-[10px] font-mono text-slate-400">thread_id: #noesis-9021</span>
          </div>

          <div className="p-3 rounded-xl bg-[#020b12] border border-cyan-500/20 font-mono text-xs text-slate-300 space-y-1.5">
            <div className="flex items-center justify-between">
              <span className="text-slate-400">topic:</span>
              <span className="text-cyan-300">"{currentRouteData.stateSnapshot.topic}"</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-slate-400">tool_required:</span>
              <span className={currentRouteData.stateSnapshot.tool_required ? "text-cyan-300" : "text-indigo-400"}>
                {String(currentRouteData.stateSnapshot.tool_required)}
              </span>
            </div>
            {currentRouteData.stateSnapshot.level && (
              <div className="flex items-center justify-between">
                <span className="text-slate-400">classifier_level:</span>
                <span className="text-teal-300 font-bold">"{currentRouteData.stateSnapshot.level}"</span>
              </div>
            )}
            <div className="flex items-center justify-between">
              <span className="text-slate-400">knowledge_source:</span>
              <span className="text-white text-[11px]">"{currentRouteData.stateSnapshot.source}"</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-slate-400">retrieval_latency:</span>
              <span className="text-emerald-400 font-bold">{currentRouteData.stateSnapshot.retrieval_latency}</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-slate-400">notes_synthesis:</span>
              <span className="text-cyan-300">"{currentRouteData.stateSnapshot.notes_status}"</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-slate-400">quiz_checkpointer:</span>
              <span className="text-purple-300">"{currentRouteData.stateSnapshot.quiz_mode}"</span>
            </div>
          </div>

          <p className="text-[11px] text-slate-400 font-mono flex items-center gap-1.5 pt-1">
            <Info className="w-3.5 h-3.5 text-cyan-400 shrink-0" />
            <span>State persisted in MemorySaver for seamless multi-turn retry loops.</span>
          </p>
        </div>

      </div>

      {/* Global CSS for streaming dash animation */}
      <style dangerouslySetInnerHTML={{ __html: `
        @keyframes flowDash {
          from {
            stroke-dashoffset: 24;
          }
          to {
            stroke-dashoffset: 0;
          }
        }
        @keyframes flowDashVertical {
          from {
            stroke-dashoffset: 24;
          }
          to {
            stroke-dashoffset: 0;
          }
        }
      `}} />

    </div>
  );
};
