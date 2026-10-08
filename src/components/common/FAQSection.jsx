import React, { useState } from 'react';
import { ChevronDown, HelpCircle, MessageSquare, Sparkles, Shield, Cpu, Code } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export const FAQSection = ({ openConsultation }) => {
  const [activeCategory, setActiveCategory] = useState('all');
  const [openIndex, setOpenIndex] = useState(0);

  const categories = [
    { id: 'all', label: 'All Questions' },
    { id: 'ai', label: 'AI & Machine Learning', icon: Cpu },
    { id: 'engineering', label: 'Web & Mobile Systems', icon: Code },
    { id: 'security', label: 'Security & IP Ownership', icon: Shield },
  ];

  const faqs = [
    {
      id: 'faq-1',
      category: 'security',
      question: 'Do we own 100% of the intellectual property (IP) and source code?',
      answer: 'Yes, unconditionally. Upon milestone completion and final invoice settlement, all source code, model weights, custom dataset annotations, Figma designs, and system architectures are assigned 100% to your company. We do not impose vendor lock-in or recurring proprietary license fees.'
    },
    {
      id: 'faq-2',
      category: 'ai',
      question: 'How does BrixelLabs achieve under 14ms latency for Computer Vision models?',
      answer: 'We optimize state-of-the-art vision models (such as YOLOv8 and YOLOv9) through custom FP16/INT8 post-training quantization and compile them directly via NVIDIA TensorRT on edge processors (e.g. Jetson Orin Nano/NX). Combined with zero-copy CUDA memory pipelines, we consistently hit sub-14ms frame inference for high-speed industrial lines.'
    },
    {
      id: 'faq-3',
      category: 'security',
      question: 'Will our proprietary business data be used to train public AI models?',
      answer: 'Never. We enforce strict data isolation protocols. When fine-tuning custom models or configuring RAG (Retrieval-Augmented Generation) pipelines, we use private, self-hosted LLM endpoints (or enterprise zero-retention API agreements with strict non-training guarantees). Your enterprise data and customer telemetry remain private to your infrastructure.'
    },
    {
      id: 'faq-4',
      category: 'engineering',
      question: 'What is your typical project delivery timeline and sprint cadence?',
      answer: 'Most custom MVP systems, conversational AI bots, and web platforms are architected, tested, and shipped within 2 to 6 weeks. We operate on 1-week agile sprint cycles with live video demos, clear staging environments, and direct Slack/WhatsApp access to the senior engineers building your platform.'
    },
    {
      id: 'faq-5',
      category: 'ai',
      question: 'Can you integrate Agentic AI workflows with our existing WhatsApp or CRM?',
      answer: 'Yes. We specialize in building LangGraph multi-agent systems and connecting them to Meta WhatsApp Business API, Telegram, HubSpot, Salesforce, PostgreSQL, and custom REST APIs. Our agents handle context retention, human-in-the-loop (HITL) approval, and autonomous tool calling with sub-second response times.'
    },
    {
      id: 'faq-6',
      category: 'engineering',
      question: 'What technology stacks and frameworks does your engineering team specialize in?',
      answer: 'Our core stack includes Python (PyTorch, YOLO, FastAPI, Django, Pandas), modern TypeScript/JavaScript (React, Next.js, Node.js, Tailwind CSS), mobile (Flutter, React Native, Kotlin), and distributed cloud infrastructure (Docker, Kubernetes, PostgreSQL, Redis, AWS, NVIDIA Edge devices).'
    },
    {
      id: 'faq-7',
      category: 'security',
      question: 'Do you offer post-launch support and ongoing SLA maintenance?',
      answer: 'Yes. Every project includes a 30-day post-launch warranty with zero-cost bug resolution. For ongoing operations, we provide tiered 24/7 SLA maintenance packages covering model drift monitoring, zero-downtime server scaling, and continuous automated retraining.'
    },
    {
      id: 'faq-8',
      category: 'engineering',
      question: 'How do we get started and what is the onboarding process?',
      answer: 'Getting started is straightforward: schedule a free 30-minute technical discovery session or submit your project brief. We execute an NDA, review your technical requirements, and deliver a detailed architecture roadmap with guaranteed milestones and budget estimates within 24 to 48 hours.'
    }
  ];

  const filteredFaqs = activeCategory === 'all' 
    ? faqs 
    : faqs.filter(f => f.category === activeCategory);

  // Generate FAQ schema markup
  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": faqs.map(item => ({
      "@type": "Question",
      "name": item.question,
      "acceptedAnswer": {
        "@type": "Answer",
        "text": item.answer
      }
    }))
  };

  return (
    <section className="relative py-20 px-4 sm:px-6 lg:px-8 max-w-5xl mx-auto z-10">
      
      {/* Inject FAQPage Schema */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />

      {/* Header */}
      <div className="text-center mb-12 space-y-3">
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-cyan-950/80 border border-cyan-500/30 text-cyan-300 text-xs font-mono uppercase tracking-wider shadow-[0_0_20px_rgba(0,240,255,0.2)]">
          <HelpCircle className="w-3.5 h-3.5 text-cyan-400" />
          <span>Frequently Asked Questions</span>
        </div>

        <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white tracking-tight">
          Everything You Need to <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-300 via-teal-300 to-indigo-400">Know</span>
        </h2>

        <p className="text-sm sm:text-base text-slate-300 max-w-xl mx-auto font-normal leading-relaxed">
          Common architectural, security, and project delivery questions answered by our engineering team.
        </p>
      </div>

      {/* Category Tabs */}
      <div className="flex flex-wrap items-center justify-center gap-2 mb-10">
        {categories.map((cat) => (
          <button
            key={cat.id}
            onClick={() => {
              setActiveCategory(cat.id);
              setOpenIndex(0);
            }}
            className={`px-4 py-2 rounded-xl text-xs font-semibold transition-all duration-300 cursor-pointer ${
              activeCategory === cat.id
                ? 'bg-gradient-to-r from-cyan-400 via-teal-300 to-cyan-400 text-[#031422] shadow-[0_0_20px_rgba(0,240,255,0.4)]'
                : 'bg-[#061e31]/80 border border-cyan-500/20 text-slate-300 hover:text-white hover:border-cyan-400/50'
            }`}
          >
            {cat.label}
          </button>
        ))}
      </div>

      {/* FAQ Accordion List */}
      <div className="space-y-4">
        {filteredFaqs.map((faq, index) => {
          const isOpen = openIndex === index;
          return (
            <div
              key={faq.id}
              className={`gradient-card rounded-2xl border transition-all duration-300 overflow-hidden ${
                isOpen
                  ? 'border-cyan-400/70 shadow-[0_0_25px_rgba(0,240,255,0.15)] bg-[#041a2e]'
                  : 'border-cyan-500/25 bg-[#031422]/90 hover:border-cyan-500/50'
              }`}
            >
              <button
                type="button"
                onClick={() => setOpenIndex(isOpen ? -1 : index)}
                className="w-full p-5 sm:p-6 text-left flex items-center justify-between gap-4 cursor-pointer"
                aria-expanded={isOpen}
              >
                <span className="text-base sm:text-lg font-bold text-white group-hover:text-cyan-300">
                  {faq.question}
                </span>

                <div className={`w-8 h-8 rounded-xl bg-[#08243a] border border-cyan-500/30 flex items-center justify-center text-cyan-400 flex-shrink-0 transition-transform duration-300 ${
                  isOpen ? 'rotate-180 bg-cyan-400 text-[#031422] border-cyan-400' : ''
                }`}>
                  <ChevronDown className="w-4 h-4" />
                </div>
              </button>

              <AnimatePresence initial={false}>
                {isOpen && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.25, ease: 'easeInOut' }}
                  >
                    <div className="px-5 sm:px-6 pb-6 pt-1 text-xs sm:text-sm text-slate-300 leading-relaxed border-t border-cyan-500/15">
                      {faq.answer}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          );
        })}
      </div>

      {/* Still have questions CTA */}
      <div className="mt-12 text-center p-6 rounded-3xl bg-gradient-to-r from-cyan-950/40 via-[#07243c]/60 to-teal-950/40 border border-cyan-500/30 max-w-xl mx-auto space-y-3">
        <h3 className="text-base font-bold text-white">Have a specific technical architecture requirement?</h3>
        <p className="text-xs text-slate-400">
          Our senior engineers are happy to review your architecture and answer any technical feasibility questions.
        </p>
        <div className="pt-1">
          <a
            href="https://wa.me/923449254864"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-cyan-400 hover:bg-cyan-300 text-[#031422] text-xs font-bold transition-all shadow-[0_0_15px_rgba(0,240,255,0.4)]"
          >
            <MessageSquare className="w-3.5 h-3.5" />
            <span>Chat Directly with Lead Architect</span>
          </a>
        </div>
      </div>

    </section>
  );
};
