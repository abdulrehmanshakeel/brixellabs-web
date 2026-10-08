import React from 'react';
import { 
  Star, 
  Quote, 
  ShieldCheck, 
  Cpu, 
  ExternalLink, 
  CheckCircle2, 
  Layers,
  ArrowRight
} from 'lucide-react';
import { motion } from 'framer-motion';
import { TiltCard } from './TiltCard';

export const testimonialsData = [
  {
    id: 't-threadeye',
    systemName: 'ThreadEye System Deployment',
    projectLink: '/case-studies/threadeye',
    domain: 'Industrial Edge AI & Computer Vision',
    quote: "BrixelLabs delivered an ultra-fast YOLOv8 computer vision model running directly on our NVIDIA Jetson factory nodes. Achieving sub-14ms frame inference with 99.8% flaw detection accuracy allowed our production lines to cut textile wastage by over 80%.",
    clientRole: 'Director of Manufacturing Automation & QA',
    clientIndustry: 'Industrial Textile & Loom Manufacturing',
    verifiedMetric: '< 13.8ms Latency · 99.8% Flaw Precision · 82% Wastage Cut',
    rating: 5,
    gradient: 'from-cyan-500/20 to-blue-600/10'
  },
  {
    id: 't-noesis',
    systemName: 'Noesis Multi-Agent Platform',
    projectLink: '/case-studies/noesis',
    domain: 'Agentic AI & Stateful LangGraph Workflows',
    quote: "The multi-agent LangGraph architecture built by BrixelLabs completely transformed our education platform. Their dual-engine routing between Tavily web search and Groq LLaMA 3.3 70B produces perfectly structured study guides and self-evaluating quizzes in seconds.",
    clientRole: 'VP of Product & Engineering Lead',
    clientIndustry: 'Adaptive Learning & EdTech Platform',
    verifiedMetric: 'Multi-Agent StateGraph · 65% Faster Study Prep',
    rating: 5,
    gradient: 'from-teal-500/20 to-emerald-600/10'
  },
  {
    id: 't-getscry',
    systemName: 'GetScry Intent Intelligence',
    projectLink: '/case-studies/getscry',
    domain: 'Predictive Machine Learning & E-Commerce Telemetry',
    quote: "Integrating BrixelLabs's real-time visitor intent scoring model into our checkout funnels yielded a 34% surge in conversions within 30 days. The sub-35ms XGBoost inference pipeline effortlessly handled our peak Black Friday traffic spikes without a hiccup.",
    clientRole: 'Head of Growth & E-Commerce Engineering',
    clientIndustry: 'High-Volume DTC E-Commerce',
    verifiedMetric: '< 35ms Intent Scoring · +34% Checkout Conversion',
    rating: 5,
    gradient: 'from-indigo-500/20 to-cyan-500/10'
  },
  {
    id: 't-the-watcher',
    systemName: 'The Watcher Child Safety AI',
    projectLink: '/case-studies/the-watcher',
    domain: 'Mobile AI & On-Device Classification',
    quote: "Building a parental monitoring platform that balances deep safety classification with ultra-low device power consumption was a huge challenge. BrixelLabs engineered the Flutter frontend and edge ML classifier flawlessly with zero battery drain.",
    clientRole: 'Technical Co-Founder',
    clientIndustry: 'Digital Safety & Family Wellbeing',
    verifiedMetric: 'Zero Background Battery Drain · 99.4% Safe URL Filter',
    rating: 5,
    gradient: 'from-emerald-500/20 to-teal-600/10'
  },
  {
    id: 't-frontdesk',
    systemName: 'FrontDesk AI WhatsApp Bot',
    projectLink: '/case-studies/frontdesk-ai',
    domain: 'NLP & Conversational Appointment Scheduling',
    quote: "Our clinical appointment booking was bottlenecked by manual phone calls. The WhatsApp bot engineered by BrixelLabs handles bilingual Roman Urdu and English natural conversation seamlessly, reducing front-desk wait times by 90%.",
    clientRole: 'Operations Director',
    clientIndustry: 'Multi-Location Healthcare & Clinic Network',
    verifiedMetric: '< 0.8s Latency · 90% Drop in Booking Inquiries',
    rating: 5,
    gradient: 'from-fuchsia-500/20 to-cyan-500/10'
  }
];

export const VerifiedTestimonials = ({ navigate }) => {
  // Review schema markup for SEO
  const reviewSchema = {
    "@context": "https://schema.org",
    "@type": "Organization",
    "name": "BrixelLabs",
    "aggregateRating": {
      "@type": "AggregateRating",
      "ratingValue": "5.0",
      "reviewCount": "5",
      "bestRating": "5",
      "worstRating": "1"
    },
    "review": testimonialsData.map(item => ({
      "@type": "Review",
      "author": {
        "@type": "Person",
        "name": item.clientRole
      },
      "reviewBody": item.quote,
      "reviewRating": {
        "@type": "Rating",
        "ratingValue": "5",
        "bestRating": "5"
      },
      "itemReviewed": {
        "@type": "Service",
        "name": item.systemName
      }
    }))
  };

  return (
    <section className="relative py-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto z-10">
      
      {/* Review JSON-LD Schema */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(reviewSchema) }}
      />

      {/* Header */}
      <div className="text-center mb-16 space-y-3">
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-cyan-950/80 border border-cyan-500/30 text-cyan-300 text-xs font-mono uppercase tracking-wider shadow-[0_0_20px_rgba(0,240,255,0.2)]">
          <ShieldCheck className="w-3.5 h-3.5 text-cyan-400" />
          <span>Verified Production Deployments</span>
        </div>

        <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white tracking-tight">
          Proven Results from <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-300 via-teal-300 to-indigo-400">Shipped Systems</span>
        </h2>

        <p className="text-sm sm:text-base text-slate-300 max-w-2xl mx-auto font-normal leading-relaxed">
          Real telemetry, engineering impact, and feedback directly from the clients and systems we've engineered.
        </p>
      </div>

      {/* Testimonials Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {testimonialsData.map((item, index) => (
          <motion.div
            key={item.id}
            initial={{ opacity: 0, y: 25 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.15 }}
            transition={{ delay: index * 0.1 }}
            className={`h-full ${index === 0 ? 'md:col-span-2 lg:col-span-1' : ''}`}
          >
            <TiltCard className="h-full">
              <div className="gradient-card rounded-3xl p-6 sm:p-7 border border-cyan-500/30 flex flex-col justify-between h-full relative overflow-hidden group hover:border-cyan-400/80 transition-all duration-300 shadow-[0_10px_25px_rgba(0,0,0,0.4)]">
                <div className={`absolute -top-16 -right-16 w-36 h-36 rounded-full blur-3xl opacity-30 bg-gradient-to-br ${item.gradient} pointer-events-none`} />

                <div>
                  {/* Top Bar: Stars + Deployment Badge */}
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center gap-1 text-cyan-400">
                      {[...Array(item.rating)].map((_, i) => (
                        <Star key={i} className="w-4 h-4 fill-cyan-400 text-cyan-400" />
                      ))}
                    </div>

                    <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-cyan-950/80 border border-cyan-500/40 text-[10px] font-mono text-cyan-300">
                      <CheckCircle2 className="w-3 h-3 text-emerald-400" />
                      <span>Verified System</span>
                    </span>
                  </div>

                  {/* System Tag */}
                  <div className="text-xs font-mono font-semibold text-transparent bg-clip-text bg-gradient-to-r from-cyan-300 to-teal-300 uppercase tracking-wider mb-2">
                    {item.domain}
                  </div>

                  {/* Quote */}
                  <p className="text-xs sm:text-sm text-slate-200 leading-relaxed italic mb-5">
                    "{item.quote}"
                  </p>
                </div>

                {/* Bottom Author & Verified Metrics */}
                <div className="pt-4 border-t border-cyan-500/20 space-y-3">
                  {/* Metric Pill */}
                  <div className="p-2 rounded-xl bg-[#061c2d] border border-cyan-500/30 text-[11px] font-mono text-cyan-300 text-center">
                    ⚡ {item.verifiedMetric}
                  </div>

                  <div className="flex items-center justify-between">
                    <div>
                      <div className="text-xs font-bold text-white">
                        {item.clientRole}
                      </div>
                      <div className="text-[11px] text-slate-400">
                        {item.clientIndustry}
                      </div>
                    </div>

                    {navigate && item.projectLink && (
                      <button
                        onClick={() => {
                          navigate(item.projectLink);
                          window.scrollTo({ top: 0, behavior: 'smooth' });
                        }}
                        className="p-2 rounded-xl bg-[#082238] border border-cyan-500/30 text-cyan-400 hover:text-white hover:border-cyan-400 hover:bg-cyan-500/20 transition-all cursor-pointer"
                        title="View Full Case Study"
                      >
                        <ArrowRight className="w-4 h-4" />
                      </button>
                    )}
                  </div>
                </div>

              </div>
            </TiltCard>
          </motion.div>
        ))}
      </div>

    </section>
  );
};
