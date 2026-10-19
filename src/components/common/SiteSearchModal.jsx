import React, { useState, useEffect, useRef } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { 
  faMagnifyingGlass, 
  faXmark, 
  faArrowRight, 
  faHouse,
  faLayerGroup, 
  faBriefcase, 
  faDiagramProject,
  faUsers, 
  faCalendarCheck,
  faBrain, 
  faCamera, 
  faCode, 
  faMobileScreen, 
  faCartShopping, 
  faRobot, 
  faDatabase,
  faShieldHalved,
  faChartLine,
  faNetworkWired,
  faLock
} from '@fortawesome/free-solid-svg-icons';
import { motion, AnimatePresence } from 'framer-motion';

const SEARCH_DATABASE = [
  // Navigation
  { 
    title: 'Home', 
    desc: 'Studio overview, core engineering capabilities & highlights', 
    path: '/', 
    category: 'Navigation', 
    type: 'Page', 
    icon: faHouse 
  },
  { 
    title: 'Our Services', 
    desc: 'Custom AI, full-stack software, mobile & cloud systems', 
    path: '/services', 
    category: 'Navigation', 
    type: 'Page', 
    icon: faLayerGroup 
  },
  { 
    title: 'Case Studies', 
    desc: 'Production architectures, benchmarks & delivered client results', 
    path: '/case-studies', 
    category: 'Navigation', 
    type: 'Page', 
    icon: faBriefcase 
  },
  { 
    title: 'How We Work', 
    desc: '4-stage engineering sprint model & milestone deliverable timeline', 
    path: '/process', 
    category: 'Navigation', 
    type: 'Page', 
    icon: faDiagramProject 
  },
  { 
    title: 'About BrixelLabs', 
    desc: 'Our engineering philosophy, culture, and core team', 
    path: '/about', 
    category: 'Navigation', 
    type: 'Page', 
    icon: faUsers 
  },
  { 
    title: 'Schedule Consultation', 
    desc: 'Book a technical call or request an architectural proposal', 
    path: '/contact', 
    category: 'Navigation', 
    type: 'Action', 
    icon: faCalendarCheck 
  },
  { 
    title: 'Admin Command Center', 
    desc: 'Secure management portal for inquiries, services, portfolio & settings', 
    path: '/admin', 
    category: 'Navigation', 
    type: 'Admin', 
    icon: faLock 
  },

  // Case Studies
  { 
    title: 'Noesis', 
    desc: 'Autonomous LangGraph multi-agent study assistant with adaptive testing', 
    path: '/case-studies/noesis', 
    category: 'Case Studies', 
    type: 'Case Study', 
    icon: faBrain 
  },
  { 
    title: 'ThreadEye', 
    desc: 'High-speed 120 FPS industrial fabric defect inspection engine', 
    path: '/case-studies/threadeye', 
    category: 'Case Studies', 
    type: 'Case Study', 
    icon: faCamera 
  },
  { 
    title: 'The Watcher', 
    desc: 'Real-time on-device child safety & digital wellness guardian', 
    path: '/case-studies/the-watcher', 
    category: 'Case Studies', 
    type: 'Case Study', 
    icon: faShieldHalved 
  },
  { 
    title: 'FrontDesk AI', 
    desc: 'Automated bilingual WhatsApp booking agent & clinic receptionist', 
    path: '/case-studies/frontdesk-ai', 
    category: 'Case Studies', 
    type: 'Case Study', 
    icon: faRobot 
  },
  { 
    title: 'GetScry', 
    desc: 'E-commerce buyer intent prediction & checkout conversion engine', 
    path: '/case-studies/getscry', 
    category: 'Case Studies', 
    type: 'Case Study', 
    icon: faChartLine 
  },

  // Services
  { 
    title: 'Custom AI & Machine Learning', 
    desc: 'Proprietary predictive models, LLM fine-tuning & inference pipelines', 
    path: '/services', 
    category: 'Services', 
    type: 'Capability', 
    icon: faBrain 
  },
  { 
    title: 'Computer Vision & Edge AI', 
    desc: 'Sub-14ms camera defect inspection, YOLOv8 & edge deployments', 
    path: '/services', 
    category: 'Services', 
    type: 'Capability', 
    icon: faCamera 
  },
  { 
    title: 'Full-Stack Web Development', 
    desc: 'High-throughput React/Next.js platforms and scalable cloud backends', 
    path: '/services', 
    category: 'Services', 
    type: 'Capability', 
    icon: faCode 
  },
  { 
    title: 'Mobile App Engineering', 
    desc: 'Cross-platform iOS and Android applications via Flutter & React Native', 
    path: '/services', 
    category: 'Services', 
    type: 'Capability', 
    icon: faMobileScreen 
  },
  { 
    title: 'Shopify & E-Commerce', 
    desc: 'Custom themes, checkout optimization, and Shopify app integrations', 
    path: '/services', 
    category: 'Services', 
    type: 'Capability', 
    icon: faCartShopping 
  },
  { 
    title: 'AI Agents & Automation', 
    desc: 'Autonomous multi-agent workflows executing complex business tasks', 
    path: '/services', 
    category: 'Services', 
    type: 'Capability', 
    icon: faRobot 
  },
  { 
    title: 'API & Systems Architecture', 
    desc: 'High-concurrency REST/GraphQL microservices & database schemas', 
    path: '/services', 
    category: 'Services', 
    type: 'Capability', 
    icon: faNetworkWired 
  },
  { 
    title: 'Data Pipelines & Web Extraction', 
    desc: 'Automated distributed web extraction and structured ETL ingestion', 
    path: '/services', 
    category: 'Services', 
    type: 'Capability', 
    icon: faDatabase 
  },
];

export const SiteSearchModal = ({ isOpen, onClose, navigate }) => {
  const [query, setQuery] = useState('');
  const [selectedIndex, setSelectedIndex] = useState(0);
  const inputRef = useRef(null);
  const listRef = useRef(null);

  useEffect(() => {
    if (isOpen) {
      setTimeout(() => inputRef.current?.focus(), 50);
      setQuery('');
      setSelectedIndex(0);
    }
  }, [isOpen]);

  // Global Ctrl+K / Cmd+K and Escape listener
  useEffect(() => {
    const handleKeyDown = (e) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault();
        if (isOpen) {
          onClose();
        } else {
          window.dispatchEvent(new CustomEvent('open-site-search'));
        }
      }
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  const filteredResults = query.trim() === ''
    ? SEARCH_DATABASE.slice(0, 8)
    : SEARCH_DATABASE.filter(item => 
        item.title.toLowerCase().includes(query.toLowerCase()) ||
        item.desc.toLowerCase().includes(query.toLowerCase()) ||
        item.category.toLowerCase().includes(query.toLowerCase()) ||
        item.type.toLowerCase().includes(query.toLowerCase())
      );

  // Group items by category to maintain a clean command-palette layout
  const groupedCategories = filteredResults.reduce((acc, item) => {
    const cat = item.category || 'General';
    if (!acc[cat]) acc[cat] = [];
    acc[cat].push(item);
    return acc;
  }, {});

  const handleSelect = (item) => {
    if (navigate) {
      navigate(item.path);
    } else {
      window.location.href = item.path;
    }
    onClose();
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleKeyNavigation = (e) => {
    if (filteredResults.length === 0) return;

    if (e.key === 'ArrowDown') {
      e.preventDefault();
      setSelectedIndex(prev => (prev + 1) % filteredResults.length);
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      setSelectedIndex(prev => (prev - 1 + filteredResults.length) % filteredResults.length);
    } else if (e.key === 'Enter') {
      e.preventDefault();
      if (filteredResults[selectedIndex]) {
        handleSelect(filteredResults[selectedIndex]);
      }
    }
  };

  // Scroll active item into view smoothly
  useEffect(() => {
    if (listRef.current) {
      const activeEl = listRef.current.querySelector('[data-selected="true"]');
      if (activeEl) {
        activeEl.scrollIntoView({ block: 'nearest' });
      }
    }
  }, [selectedIndex]);

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-start justify-center pt-16 sm:pt-24 px-4 bg-black/75 backdrop-blur-md">
          {/* Backdrop dismiss */}
          <div className="absolute inset-0" onClick={onClose} />

          <motion.div
            initial={{ opacity: 0, scale: 0.98, y: -10 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.98, y: -10 }}
            transition={{ duration: 0.18, ease: 'easeOut' }}
            className="relative z-10 w-full max-w-2xl rounded-2xl bg-[#090e18]/95 backdrop-blur-2xl border border-white/[0.08] shadow-[0_25px_70px_rgba(0,0,0,0.85)] overflow-hidden"
          >
            {/* Command Palette Input Header */}
            <div className="flex items-center px-4 sm:px-5 py-3.5 border-b border-white/[0.06] gap-3">
              <FontAwesomeIcon icon={faMagnifyingGlass} className="text-zinc-500 text-sm shrink-0" />
              <input
                ref={inputRef}
                type="text"
                value={query}
                onChange={(e) => { setQuery(e.target.value); setSelectedIndex(0); }}
                onKeyDown={handleKeyNavigation}
                placeholder="Search pages, services, case studies..."
                className="w-full bg-transparent text-white placeholder-zinc-500 text-sm sm:text-base focus:outline-none font-sans"
              />
              {query && (
                <button
                  type="button"
                  onClick={() => { setQuery(''); inputRef.current?.focus(); }}
                  className="text-zinc-500 hover:text-white p-1 text-xs transition-colors cursor-pointer"
                  title="Clear search"
                >
                  <FontAwesomeIcon icon={faXmark} />
                </button>
              )}
              <kbd className="hidden sm:inline-flex items-center px-2 py-0.5 rounded text-[10px] font-mono font-medium text-zinc-400 bg-white/[0.05] border border-white/[0.08] shrink-0">
                ESC
              </kbd>
            </div>

            {/* Results Grouped View */}
            <div ref={listRef} className="max-h-[380px] overflow-y-auto p-2 space-y-3">
              {filteredResults.length === 0 ? (
                <div className="py-12 px-4 text-center">
                  <p className="text-zinc-300 text-sm font-medium">No results found for &ldquo;{query}&rdquo;</p>
                  <p className="text-zinc-500 text-xs mt-1">Try searching for keywords like &ldquo;AI&rdquo;, &ldquo;Vision&rdquo;, &ldquo;Shopify&rdquo;, or &ldquo;Contact&rdquo;.</p>
                  <div className="mt-4 flex flex-wrap justify-center gap-2">
                    {['Services', 'Case Studies', 'Schedule Call'].map(suggestion => (
                      <button
                        key={suggestion}
                        type="button"
                        onClick={() => { setQuery(suggestion); setSelectedIndex(0); }}
                        className="px-2.5 py-1 rounded-lg text-xs font-medium text-zinc-400 bg-white/[0.04] hover:bg-white/[0.08] hover:text-white border border-white/[0.06] transition-colors cursor-pointer"
                      >
                        {suggestion}
                      </button>
                    ))}
                  </div>
                </div>
              ) : (
                Object.entries(groupedCategories).map(([category, items]) => (
                  <div key={category} className="space-y-1">
                    <div className="px-3 pt-2 pb-1 text-[11px] font-semibold tracking-wider text-zinc-500 uppercase">
                      {category}
                    </div>

                    {items.map((item) => {
                      const flatIndex = filteredResults.indexOf(item);
                      const isSelected = flatIndex === selectedIndex;

                      return (
                        <div
                          key={item.title}
                          data-selected={isSelected ? 'true' : 'false'}
                          onClick={() => handleSelect(item)}
                          onMouseEnter={() => setSelectedIndex(flatIndex)}
                          className={`flex items-center justify-between px-3 py-2.5 rounded-xl cursor-pointer transition-colors duration-150 group ${
                            isSelected 
                              ? 'bg-white/[0.08] text-white' 
                              : 'hover:bg-white/[0.04] text-zinc-300'
                          }`}
                        >
                          <div className="flex items-center gap-3 min-w-0">
                            <div className={`w-8 h-8 rounded-lg flex items-center justify-center shrink-0 transition-colors ${
                              isSelected 
                                ? 'bg-cyan-500/15 text-cyan-300 border border-cyan-500/30' 
                                : 'bg-white/[0.04] border border-white/[0.06] text-zinc-400 group-hover:text-zinc-200'
                            }`}>
                              <FontAwesomeIcon icon={item.icon} className="text-xs" />
                            </div>

                            <div className="min-w-0">
                              <div className="flex items-center gap-2">
                                <span className="font-semibold text-sm text-zinc-100 group-hover:text-white truncate">
                                  {item.title}
                                </span>
                                <span className="text-[10px] font-medium font-mono px-1.5 py-0.5 rounded bg-white/[0.04] text-zinc-400 border border-white/[0.06]">
                                  {item.type}
                                </span>
                              </div>
                              <p className="text-xs text-zinc-400 truncate mt-0.5 font-normal">
                                {item.desc}
                              </p>
                            </div>
                          </div>

                          <div className="flex items-center gap-2 shrink-0 ml-3">
                            {isSelected ? (
                              <span className="hidden sm:inline-flex items-center gap-1 text-[11px] font-mono text-cyan-400">
                                <span>Jump</span>
                                <kbd className="px-1.5 py-0.5 rounded bg-white/[0.08] text-[10px] text-zinc-300 border border-white/[0.1]">↵</kbd>
                              </span>
                            ) : (
                              <FontAwesomeIcon 
                                icon={faArrowRight} 
                                className="text-xs text-zinc-600 group-hover:text-zinc-400 transition-colors" 
                              />
                            )}
                          </div>
                        </div>
                      );
                    })}
                  </div>
                ))
              )}
            </div>

            {/* Clean Command Palette Footer */}
            <div className="px-4 py-2.5 bg-black/40 border-t border-white/[0.06] flex items-center justify-between text-[11px] font-mono text-zinc-400">
              <div className="flex items-center gap-3 sm:gap-4">
                <span className="flex items-center gap-1">
                  <kbd className="px-1.5 py-0.5 rounded bg-white/[0.05] border border-white/10 text-zinc-300">↑↓</kbd>
                  <span className="text-zinc-500 hidden sm:inline">Navigate</span>
                </span>
                <span className="flex items-center gap-1">
                  <kbd className="px-1.5 py-0.5 rounded bg-white/[0.05] border border-white/10 text-zinc-300">↵</kbd>
                  <span className="text-zinc-500 hidden sm:inline">Select</span>
                </span>
                <span className="flex items-center gap-1">
                  <kbd className="px-1.5 py-0.5 rounded bg-white/[0.05] border border-white/10 text-zinc-300">esc</kbd>
                  <span className="text-zinc-500 hidden sm:inline">Close</span>
                </span>
              </div>
              <span className="text-zinc-400 font-medium">
                {filteredResults.length} {filteredResults.length === 1 ? 'match' : 'matches'}
              </span>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};

export default SiteSearchModal;
