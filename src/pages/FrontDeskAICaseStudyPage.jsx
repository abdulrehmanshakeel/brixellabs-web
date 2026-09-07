import React, { useState } from 'react';
import { 
  MessageSquare, 
  Brain, 
  CalendarCheck, 
  CheckCircle2, 
  Bell, 
  Send, 
  Smartphone, 
  User, 
  Bot,
  RefreshCw,
  Phone,
  Mic,
  Volume2,
  GitBranch,
  Layers,
  ShieldCheck,
  Zap,
  Clock,
  ArrowRight
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { TiltCard } from '../components/common/TiltCard';

export const FrontDeskAICaseStudyPage = ({ openConsultation }) => {
  const [messages, setMessages] = useState([
    { sender: 'bot', text: 'Assalam-o-Alaikum! Welcome to Luxe Medical & Aesthetics 🌿 How can I assist you with your booking today?', time: '10:02 AM' },
    { sender: 'user', text: 'Hi! Mujhe doctor consultation book krni hai Friday ko sham 4 baje.', time: '10:02 AM' },
    { sender: 'bot', text: 'Zaroor! Friday 4:00 PM par Dr. Sarah kay pass slot available hai. Kya main ye slot confirm kar doon?', time: '10:03 AM' },
  ]);
  const [inputVal, setInputVal] = useState('');
  const [isTyping, setIsTyping] = useState(false);

  const quickReplies = [
    "Haan, please Friday 4 PM confirm kar dein!",
    "Can you check Saturday morning instead?",
    "Consultation fee aur procedures ki price kya hai?",
    "Mujhe clinic manager se baat krni hai."
  ];

  const handleSendMessage = (textToSend) => {
    const text = textToSend || inputVal;
    if (!text.trim()) return;

    const userMsg = {
      sender: 'user',
      text: text,
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    setMessages((prev) => [...prev, userMsg]);
    setInputVal('');
    setIsTyping(true);

    setTimeout(() => {
      let botResponse = "✓ Confirmed! Friday at 4:00 PM slot locked in calendar for Dr. Sarah. SMS & WhatsApp reminder will be sent 2 hours prior.";
      const t = text.toLowerCase();
      if (t.includes('saturday') || t.includes('hafta')) {
        botResponse = "Saturday ko hamare pass 10:30 AM aur 11:45 AM kay slots available hain. Konsa time aapke liye behtar rahay ga?";
      } else if (t.includes('price') || t.includes('fee') || t.includes('charges')) {
        botResponse = "Initial Specialist Consultation fee Rs. 2,500 hai. Diagnostic & aesthetic treatments will be customized as per assessment.";
      } else if (t.includes('manager') || t.includes('staff') || t.includes('human') || t.includes('baat')) {
        botResponse = "⚠️ [Human-in-the-Loop Escalation]: Main ne clinic front-desk supervisor ko alert kar diya hai. Senior staff member 3 minutes mein aap se rabta karega.";
      }

      setMessages((prev) => [
        ...prev,
        {
          sender: 'bot',
          text: botResponse,
          time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
        }
      ]);
      setIsTyping(false);
    }, 850);
  };

  const workflowSteps = [
    { num: '01', title: 'Customer WhatsApp Message', desc: 'Customer reaches out via official WhatsApp Business account', icon: MessageSquare, grad: 'from-teal-300 to-cyan-400' },
    { num: '02', title: 'Twilio Webhook -> Django', desc: 'Twilio forwards payload to Django server which boots LangGraph state', icon: Zap, grad: 'from-cyan-400 to-teal-300' },
    { num: '03', title: 'Intent Classifier Node', desc: 'Routes conversation to Booking, Reschedule, FAQ, or Escalation sub-agent', icon: Brain, grad: 'from-teal-300 to-indigo-400' },
    { num: '04', title: 'Tool Calling Reasoning Loop', desc: 'Agent chains calendar queries, checks conflict, and confirms without human delay', icon: CalendarCheck, grad: 'from-indigo-400 to-teal-300' },
    { num: '05', title: 'HITL Escalation & Safe Fallback', desc: 'Instantly alerts staff on complex queries while keeping 24/7 SLA uptime', icon: ShieldCheck, grad: 'from-cyan-400 to-emerald-400' },
  ];

  const subAgents = [
    { name: 'Booking Sub-Agent', desc: 'Queries real-time calendar availability, locks slots, handles client intake details, and dispatches confirmation receipts.' },
    { name: 'Reschedule Sub-Agent', desc: 'Searches existing client booking ID, identifies schedule conflicts, and negotiates alternative appointment windows.' },
    { name: 'FAQ & Pricing Sub-Agent', desc: 'Instantly answers service details, pricing tiers, doctor credentials, and clinic policy in natural Roman Urdu & English.' },
    { name: 'Escalation Sub-Agent', desc: 'Detects ambiguous queries, grievances, or custom requests and immediately triggers real-time alerts to human front-desk staff.' }
  ];

  const techStack = [
    { layer: 'Agent Orchestration', tech: 'LangGraph (Stateful Multi-Agent Graph)' },
    { layer: 'LLM Inference', tech: 'Groq (Ultra-Low Latency LLaMA Models)' },
    { layer: 'Backend Architecture', tech: 'Django REST Webhooks & Business Logic' },
    { layer: 'Messaging Channel', tech: 'Twilio WhatsApp Business API' },
    { layer: 'Persistence Layer', tech: 'PostgreSQL DB & Redis Conversation Memory' }
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
          <span className="font-mono text-slate-300 ml-2">brixellabs.com/case-studies/frontdesk-ai</span>
        </div>
        <span className="text-emerald-400 font-semibold font-mono text-[11px]">24/7 WHATSAPP BOT</span>
      </div>

      {/* Hero Section */}
      <div className="text-center mb-14 space-y-4">
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-gradient-to-r from-teal-950/80 via-[#07243c]/80 to-emerald-950/80 border border-teal-500/30 text-teal-300 text-xs font-mono uppercase tracking-wider shadow-[0_0_20px_rgba(0,229,208,0.2)]"
        >
          <Bot className="w-3.5 h-3.5 text-teal-300" />
          <span>Case Study · Conversational Business Automation</span>
        </motion.div>

        <motion.h1 
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-white tracking-tight"
        >
          FrontDesk AI — <span className="text-transparent bg-clip-text bg-gradient-to-r from-teal-300 via-cyan-300 to-emerald-400 drop-shadow-[0_0_35px_rgba(0,229,208,0.45)]">Autonomous WhatsApp Booking Assistant</span>
        </motion.h1>

        <motion.p 
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="text-base sm:text-lg text-slate-300 max-w-3xl mx-auto font-normal leading-relaxed"
        >
          An agentic AI system that handles appointment bookings, rescheduling, and customer queries for service-based businesses — entirely through WhatsApp, with zero human intervention for routine requests.
        </motion.p>
      </div>

      {/* Interactive WhatsApp Booking Simulator */}
      <div className="gradient-card rounded-3xl p-6 sm:p-8 border border-teal-500/30 shadow-2xl mb-16 relative overflow-hidden">
        <div className="max-w-xl mx-auto rounded-3xl overflow-hidden border border-teal-500/40 shadow-2xl bg-[#031520] relative">
          
          {/* WhatsApp Header with Gradient */}
          <div className="bg-gradient-to-r from-[#073634] to-[#042826] p-4 flex items-center justify-between border-b border-teal-500/30 text-white">
            <div className="flex items-center gap-3">
              <div className="relative">
                <div className="w-10 h-10 rounded-full bg-gradient-to-br from-teal-500 to-emerald-600 flex items-center justify-center text-white font-bold text-sm shadow">
                  <Bot className="w-6 h-6 text-teal-100" />
                </div>
                <div className="w-3 h-3 rounded-full bg-emerald-400 border-2 border-[#073634] absolute bottom-0 right-0 animate-pulse"></div>
              </div>
              <div>
                <h4 className="text-sm font-bold text-white">FrontDesk AI Assistant</h4>
                <p className="text-[11px] text-teal-200">Online · LangGraph Agent Active</p>
              </div>
            </div>
            
            <div className="flex items-center gap-2">
              <button 
                onClick={() => {
                  setMessages([
                    { sender: 'bot', text: 'Assalam-o-Alaikum! Welcome to Luxe Medical & Aesthetics 🌿 How can I assist you with your booking today?', time: '10:02 AM' },
                  ]);
                }}
                className="p-2 rounded-lg bg-teal-950/60 hover:bg-teal-900/80 text-teal-300 transition-colors text-xs flex items-center gap-1 border border-teal-500/30"
                title="Reset Chat"
              >
                <RefreshCw className="w-3.5 h-3.5" />
                <span>Reset</span>
              </button>
            </div>
          </div>

          {/* Chat Messages Feed */}
          <div className="p-4 sm:p-6 space-y-4 min-h-[340px] max-h-[420px] overflow-y-auto bg-[radial-gradient(#052528_1px,transparent_1px)] [background-size:12px_12px]">
            {messages.map((msg, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className={`flex flex-col ${msg.sender === 'user' ? 'items-end' : 'items-start'}`}
              >
                <div
                  className={`max-w-[85%] p-3.5 rounded-2xl text-xs sm:text-sm leading-relaxed shadow-md ${
                    msg.sender === 'user'
                      ? 'bg-gradient-to-r from-teal-700 to-emerald-700 text-white rounded-tr-none border border-teal-400/40'
                      : 'bg-[#092b30] text-slate-100 rounded-tl-none border border-teal-500/30'
                  }`}
                >
                  <p>{msg.text}</p>
                  <span className={`text-[10px] block mt-1 text-right ${msg.sender === 'user' ? 'text-teal-200' : 'text-slate-400'}`}>
                    {msg.time}
                  </span>
                </div>
              </motion.div>
            ))}

            {isTyping && (
              <div className="flex items-center gap-1.5 p-3 rounded-2xl bg-[#092b30] border border-teal-500/30 w-16 text-teal-300">
                <span className="w-1.5 h-1.5 rounded-full bg-teal-400 animate-bounce"></span>
                <span className="w-1.5 h-1.5 rounded-full bg-teal-400 animate-bounce [animation-delay:0.2s]"></span>
                <span className="w-1.5 h-1.5 rounded-full bg-teal-400 animate-bounce [animation-delay:0.4s]"></span>
              </div>
            )}
          </div>

          {/* Quick Reply Suggestions */}
          <div className="p-3 bg-[#02181d] border-t border-teal-500/20 flex flex-wrap gap-2">
            <span className="text-[10px] font-mono text-teal-300 w-full mb-1">Quick Prompts (English / Roman Urdu):</span>
            {quickReplies.map((reply, i) => (
              <button
                key={i}
                onClick={() => handleSendMessage(reply)}
                className="text-[11px] px-3 py-1.5 rounded-lg bg-teal-950/80 hover:bg-teal-900 border border-teal-500/30 text-teal-200 transition-colors text-left"
              >
                {reply}
              </button>
            ))}
          </div>

          {/* Message Input Box */}
          <div className="p-3 bg-[#031b22] border-t border-teal-500/30 flex items-center gap-2">
            <input
              type="text"
              value={inputVal}
              onChange={(e) => setInputVal(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleSendMessage()}
              placeholder="Type in English or Roman Urdu..."
              className="flex-1 bg-[#05282d] border border-teal-500/40 rounded-xl px-4 py-2.5 text-xs text-white focus:outline-none focus:border-teal-300 placeholder:text-slate-500"
            />
            <button
              onClick={() => handleSendMessage()}
              className="p-2.5 rounded-xl bg-gradient-to-r from-teal-400 to-emerald-400 text-black font-bold hover:brightness-110 transition-all shadow-[0_0_15px_rgba(0,229,208,0.4)]"
            >
              <Send className="w-4 h-4" />
            </button>
          </div>

        </div>
      </div>

      {/* 4 Specialized Sub-Agents */}
      <div className="mb-16">
        <div className="text-center mb-10">
          <h3 className="text-2xl sm:text-3xl font-extrabold text-white">
            Specialized Multi-Agent Routing Engine
          </h3>
          <p className="text-xs sm:text-sm text-slate-400 mt-1">
            Instead of a single brittle prompt, conversations route dynamically to domain-specific agent graphs
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {subAgents.map((agent, i) => (
            <div key={i} className="gradient-card rounded-2xl p-6 border border-teal-500/25 flex flex-col justify-between hover:border-teal-400/60 transition-colors">
              <div>
                <div className="w-10 h-10 rounded-xl bg-teal-950 border border-teal-500/40 flex items-center justify-center text-teal-300 font-bold mb-4 font-mono text-sm">
                  0{i + 1}
                </div>
                <h4 className="text-base font-bold text-white mb-2">{agent.name}</h4>
                <p className="text-xs text-slate-300 leading-relaxed">{agent.desc}</p>
              </div>
              <div className="mt-4 pt-3 border-t border-teal-500/15 flex items-center justify-between text-[11px] font-mono text-teal-300">
                <span>Autonomous</span>
                <span>&lt;0.8s Latency</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Key Engineering Highlights Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16">
        <div className="gradient-card rounded-3xl p-6 border border-teal-500/25 space-y-3">
          <div className="w-10 h-10 rounded-xl bg-teal-950 border border-teal-500/30 flex items-center justify-center text-teal-300">
            <GitBranch className="w-5 h-5" />
          </div>
          <h4 className="text-base font-bold text-white">Tool-Calling Reasoning Loop</h4>
          <p className="text-xs text-slate-300 leading-relaxed">
            Agents chain multiple actions autonomously in a single customer turn (e.g. check availability, discover conflict, suggest alternatives, confirm) without repeated prompting.
          </p>
        </div>

        <div className="gradient-card rounded-3xl p-6 border border-teal-500/25 space-y-3">
          <div className="w-10 h-10 rounded-xl bg-teal-950 border border-teal-500/30 flex items-center justify-center text-teal-300">
            <ShieldCheck className="w-5 h-5" />
          </div>
          <h4 className="text-base font-bold text-white">Graceful Degradation</h4>
          <p className="text-xs text-slate-300 leading-relaxed">
            A global safety wrapper ensures that if any sub-node or network call fails, the customer still receives a polite coherent response and staff are alerted instantly.
          </p>
        </div>

        <div className="gradient-card rounded-3xl p-6 border border-teal-500/25 space-y-3">
          <div className="w-10 h-10 rounded-xl bg-teal-950 border border-teal-500/30 flex items-center justify-center text-teal-300">
            <Brain className="w-5 h-5" />
          </div>
          <h4 className="text-base font-bold text-white">Human-in-the-Loop Escalation</h4>
          <p className="text-xs text-slate-300 leading-relaxed">
            The agent recognizes the boundaries of its competence, escalating complex inquiries, grievances, and custom edge-cases to human staff with full conversation summaries.
          </p>
        </div>
      </div>

      {/* Tech Stack Layer Table */}
      <div className="gradient-card rounded-3xl p-6 sm:p-8 border border-teal-500/30 mb-16 overflow-hidden">
        <h3 className="text-xl font-bold text-white mb-6 flex items-center gap-2">
          <Zap className="w-5 h-5 text-teal-400" />
          Production Technology Stack
        </h3>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs sm:text-sm text-slate-300">
            <thead>
              <tr className="border-b border-teal-500/30 text-teal-300 font-mono">
                <th className="pb-3 px-4">Architecture Layer</th>
                <th className="pb-3 px-4">Technology & Role</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-teal-500/10">
              {techStack.map((item, index) => (
                <tr key={index}>
                  <td className="py-3.5 px-4 font-bold text-white">{item.layer}</td>
                  <td className="py-3.5 px-4 font-mono text-teal-300">{item.tech}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* CTA Footer */}
      <div className="gradient-card rounded-3xl p-8 sm:p-12 border border-teal-500/40 text-center relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-teal-500/10 via-cyan-500/10 to-emerald-500/10"></div>
        <div className="relative z-10 space-y-4 max-w-2xl mx-auto">
          <h3 className="text-2xl sm:text-3xl font-extrabold text-white">
            Automate Your Inbound WhatsApp Bookings & Patient Flow
          </h3>
          <p className="text-slate-300 text-sm sm:text-base">
            Eliminate missed bookings, reduce front-desk overhead, and operate 24/7 with zero added headcount.
          </p>
          <button
            onClick={openConsultation}
            className="mt-4 px-8 py-4 rounded-xl bg-gradient-to-r from-teal-400 via-cyan-300 to-emerald-400 hover:from-teal-300 hover:to-cyan-200 text-[#021319] font-extrabold text-sm uppercase tracking-wider transition-all duration-300 shadow-[0_0_25px_rgba(0,229,208,0.4)] hover:shadow-[0_0_40px_rgba(0,229,208,0.8)] cursor-pointer"
          >
            Deploy WhatsApp Assistant for Your Business
          </button>
        </div>
      </div>

    </div>
  );
};
