import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { 
  faCircleQuestion, 
  faChevronDown, 
  faArrowRight, 
  faShieldHalved, 
  faBrain, 
  faCode 
} from '@fortawesome/free-solid-svg-icons';
import { motion, AnimatePresence } from 'framer-motion';

export const FAQSection = ({ openConsultation, showCta = true }) => {
  const [activeCategory, setActiveCategory] = useState('all');
  const [openIndex, setOpenIndex] = useState(0);

  const categories = [
    { id: 'all', label: 'All Questions' },
    { id: 'ai', label: 'AI & Machine Learning', icon: faBrain },
    { id: 'engineering', label: 'Web & Systems', icon: faCode },
    { id: 'security', label: 'IP & Security', icon: faShieldHalved },
  ];

  const faqs = [
    {
      id: 'faq-1',
      category: 'security',
      question: 'Do we own 100% of the IP and source code?',
      answer: 'Yes. All source code, model weights, Figma designs, and cloud infrastructure belong 100% to you. Zero vendor lock-in.'
    },
    {
      id: 'faq-2',
      category: 'ai',
      question: 'How do you achieve real-time visual defect detection?',
      answer: 'We compile optimized models via TensorRT to run on-device at 120+ FPS with sub-14ms latency.'
    },
    {
      id: 'faq-3',
      category: 'security',
      question: 'Will our proprietary business data be used to train public AI models?',
      answer: 'Never. Your proprietary code and customer data are strictly isolated and never used to train public models.'
    },
    {
      id: 'faq-4',
      category: 'engineering',
      question: 'What is your typical project delivery timeline and sprint cadence?',
      answer: 'Custom MVPs ship in 2 to 6 weeks using 1-week agile sprints with direct senior engineer access.'
    },
    {
      id: 'faq-5',
      category: 'ai',
      question: 'Can you integrate smart AI assistants with WhatsApp or our CRM?',
      answer: 'Yes. We build autonomous assistants integrated with WhatsApp API, CRMs, and SQL databases with <0.8s reply times.'
    },
    {
      id: 'faq-6',
      category: 'engineering',
      question: 'What technology stacks does your team specialize in?',
      answer: 'Python (PyTorch, FastAPI), modern JavaScript (React, Next.js), mobile (Flutter, Kotlin), and cloud (Docker, AWS, GCP).'
    },
    {
      id: 'faq-7',
      category: 'security',
      question: 'Do you offer post-launch support and ongoing maintenance?',
      answer: 'Every project includes a 30-day warranty with zero-cost bug resolution, plus optional 24/7 SLA maintenance.'
    },
    {
      id: 'faq-8',
      category: 'engineering',
      question: 'How do we get started and what is the onboarding process?',
      answer: 'Schedule a discovery call. We execute a mutual NDA and deliver an architectural roadmap within 48 hours.'
    }
  ];

  const filteredFaqs = activeCategory === 'all' 
    ? faqs 
    : faqs.filter(f => f.category === activeCategory);

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
    <section className="relative py-24 sm:py-32 px-4 sm:px-6 lg:px-8 max-w-4xl mx-auto z-10" id="faq">
      
      {/* FAQ Schema */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />

      {/* Section Header */}
      <div className="text-center mb-14 sm:mb-16 space-y-4">
        {/* Big Headline in Pure Crisp White */}
        <h2 className="font-heading text-4xl sm:text-5xl lg:text-6xl font-extrabold text-white tracking-tight leading-tight">
          Everything You Need to Know
        </h2>

        {/* Cut-in-half Subtitle */}
        <p className="text-slate-300 text-sm sm:text-base max-w-xl mx-auto font-normal leading-relaxed">
          Architectural, security, and project delivery questions answered by our engineering team.
        </p>

        {/* Category Filter Tabs */}
        <div className="flex flex-wrap items-center justify-center gap-2 pt-2">
          {categories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => {
                setActiveCategory(cat.id);
                setOpenIndex(0);
              }}
              className={`px-4 py-2 rounded-xl text-xs font-semibold transition-all duration-300 cursor-pointer ${
                activeCategory === cat.id
                  ? 'bg-white text-[#031422] shadow-[0_0_20px_rgba(255,255,255,0.35)] font-bold'
                  : 'bg-[#061e31]/80 border border-cyan-500/20 text-slate-300 hover:text-white hover:border-cyan-400/50'
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>
      </div>

      {/* FAQ Accordion List: Clean Editorial Dividers, No Cards */}
      <div className="border-t border-b border-slate-800/80 divide-y divide-slate-800/80">
        {filteredFaqs.map((faq, index) => {
          const isOpen = openIndex === index;
          return (
            <div
              key={faq.id}
              className="transition-colors group"
            >
              <button
                type="button"
                onClick={() => setOpenIndex(isOpen ? -1 : index)}
                className="w-full py-5 sm:py-6 text-left flex items-center justify-between gap-4 cursor-pointer group"
                aria-expanded={isOpen}
              >
                <span className={`font-heading text-base sm:text-lg font-semibold transition-colors ${
                  isOpen ? 'text-cyan-300' : 'text-white group-hover:text-cyan-200'
                }`}>
                  {faq.question}
                </span>

                <div className={`w-7 h-7 rounded-lg border flex items-center justify-center flex-shrink-0 transition-all duration-300 ${
                  isOpen 
                    ? 'rotate-180 bg-cyan-950/80 border-cyan-500/40 text-white' 
                    : 'bg-slate-900/60 border-slate-700/60 text-white group-hover:border-slate-500'
                }`}>
                  <FontAwesomeIcon icon={faChevronDown} className="text-xs text-white" />
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
                    <div className="pb-6 pt-1 text-sm text-slate-300 leading-relaxed max-w-4xl">
                      {faq.answer}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          );
        })}
      </div>

      {/* Bottom CTA Button (only when showCta is enabled and openConsultation is available) */}
      {showCta && openConsultation && (
        <div className="mt-14 sm:mt-16 text-center flex flex-col items-center justify-center space-y-4">
          <p className="text-xs text-slate-400">
            Have an architectural question? Our lead engineers provide immediate feasibility feedback.
          </p>
          <button
            onClick={openConsultation}
            className="btn-primary flex items-center gap-2.5"
          >
            <span>Chat with Lead Architect</span>
            <FontAwesomeIcon icon={faArrowRight} className="text-sm" />
          </button>
        </div>
      )}

    </section>
  );
};
