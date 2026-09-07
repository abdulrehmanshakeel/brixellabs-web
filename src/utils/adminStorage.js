// Centralized Admin Storage & State Management Utility
import { apiClient } from '../api/client';

const STORAGE_KEYS = {
  AUTH_TOKEN: 'brixel_admin_auth',
  INQUIRIES: 'brixel_admin_inquiries',
  SERVICES: 'brixel_admin_services',
  PORTFOLIO: 'brixel_admin_portfolio',
  TEAM: 'brixel_admin_team',
  SETTINGS: 'brixel_admin_settings',
  AUDIT_LOGS: 'brixel_admin_audit_logs'
};

// Initial Seed Inquiries (Empty by default for production)
const INITIAL_INQUIRIES = [];


// Initial Services
const INITIAL_SERVICES = [
  {
    id: 'srv-uiux',
    title: 'UI/UX Design',
    category: 'Design & Dev',
    description: 'Human-centric UI/UX design, interactive wireframing, high-fidelity prototypes, and comprehensive multi-platform design systems.',
    bullets: ['User Research & Journeys', 'Wireframing & Interactive Prototypes', 'Design System Architecture'],
    active: true,
    gradient: 'from-cyan-500/20 via-blue-500/10 to-transparent'
  },
  {
    id: 'srv-webdev',
    title: 'Web Development',
    category: 'Design & Dev',
    description: 'Scalable frontend and backend architectures with modern React, Next.js, Django, Node microservices, and distributed DBs.',
    bullets: ['High-Performance React/Next.js', 'Django & Node Cloud APIs', 'Distributed DB & Redis Caching'],
    active: true,
    gradient: 'from-teal-500/20 via-cyan-500/10 to-transparent'
  },
  {
    id: 'srv-mobiledev',
    title: 'Mobile Development',
    category: 'Design & Dev',
    description: 'Native & cross-platform iOS and Android mobile solutions with React Native and Flutter built for high reliability and speed.',
    bullets: ['React Native & Flutter Apps', 'Native Device Features & Sensors', 'Offline-First Cloud Sync'],
    active: true,
    gradient: 'from-blue-500/20 via-indigo-500/10 to-transparent'
  },
  {
    id: 'srv-aiml',
    title: 'AI & Machine Learning',
    category: 'AI & Intelligence',
    description: 'Custom machine learning models, predictive intelligence, neural classification, regression pipelines, and automated retraining.',
    bullets: ['Custom Neural Architectures', 'Supervised & Unsupervised ML', 'Model Evaluation & Benchmarking'],
    active: true,
    gradient: 'from-fuchsia-500/20 via-cyan-500/10 to-transparent'
  },
  {
    id: 'srv-nlp',
    title: 'NLP, Chatbots & RAG',
    category: 'AI & Intelligence',
    description: 'Enterprise Natural Language Processing (NLP), semantic search, multi-channel AI chatbots (WhatsApp, Web, Telegram), and contextual RAG pipelines.',
    bullets: ['Enterprise NLP & Semantic Search', 'WhatsApp, Web & Telegram Chatbot Integration', 'Contextual RAG Retrieval & Custom LLMs'],
    active: true,
    gradient: 'from-indigo-500/20 via-teal-500/10 to-transparent'
  },
  {
    id: 'srv-computervision',
    title: 'Computer Vision',
    category: 'AI & Intelligence',
    description: 'Real-time object detection, automated visual inspection, industrial defect classification under 14ms, and edge video analytics.',
    bullets: ['YOLOv9 Real-Time Detection', 'TensorRT Edge Inference <14ms', 'Camera Stream Processing'],
    active: true,
    gradient: 'from-cyan-500/25 via-teal-500/15 to-transparent'
  },
  {
    id: 'srv-agenticai',
    title: 'Agentic AI & Automation',
    category: 'AI & Intelligence',
    description: 'Autonomous multi-agent workflows, self-healing task queues, robotic process automation, and intelligent API connectors.',
    bullets: ['Multi-Agent Task Orchestration', 'Self-Healing Workflows', 'Zero-Downtime Pipeline Sync'],
    active: true,
    gradient: 'from-teal-500/25 via-indigo-500/15 to-transparent'
  },
  {
    id: 'srv-dataanalytics',
    title: 'Data Analytics & Dashboard Creation',
    category: 'Data',
    description: 'Deep data analysis and interactive dashboard creation exclusively through Python, Excel, and SQL with automated KPI reporting.',
    bullets: ['Python Data Analysis (Pandas & NumPy)', 'Advanced Microsoft Excel Dashboards', 'SQL Database Query Optimization'],
    active: true,
    gradient: 'from-blue-500/25 via-cyan-500/15 to-transparent'
  }
];

// Initial Site Settings
const INITIAL_SETTINGS = {
  companyName: 'BrixelLabs',
  tagline: 'Design · Build · Automate',
  subtitle: 'Full-Stack Tech & AI Engineering Studio',
  contactEmail: 'brixellabs@gmail.com',
  supportEmail: 'brixellabs@gmail.com',
  phone: '+92 344 9254864',
  location: '100% Remote-First · Global Engineering Team',
  systemStatus: '99.99% Operational',
  announcementActive: false,
  announcementText: '🚀 Accepting Q3/Q4 Enterprise Engineering Contracts & Discovery Consultations.',
  socials: {
    linkedin: 'https://www.linkedin.com/company/brixellabs/home/?viewAsMember=true',
    instagram: 'https://www.instagram.com/brixellabs?igsi=cmM0OXliYjJxaWpt',
    facebook: 'https://www.facebook.com/share/1HiGirYC4f/',
    twitter: 'https://x.com/Brixellabs',
    whatsapp: 'https://wa.me/923449254864'
  },
  slaUptime: '99.99%',
  avgResponseTime: '<14ms'
};

// Initial Team (Empty by default for production)
const INITIAL_TEAM = [];


// Initial Case Studies
const INITIAL_PORTFOLIO = [
  {
    id: 'noesis',
    title: 'Noesis — AI Study Assistant',
    client: 'EdTech Research',
    category: 'Agentic AI / LLM',
    metric: 'HITL Interrupt + MemorySaver',
    accuracy: '100% Adaptive Synthesis',
    description: 'Autonomous multi-agent learning assistant built on LangGraph that adapts topic synthesis, conducts live web research, and generates calibrated quizzes.',
    tags: ['LangGraph', 'LangChain', 'Groq (LLaMA 3.3 70B)', 'Tavily Search API', 'Wikipedia API', 'Streamlit'],
    link: '/case-studies/noesis',
    featured: true
  },
  {
    id: 'the-watcher',
    title: 'The Watcher — AI Child Monitoring',
    client: 'Family & Child Safety',
    category: 'AI Child Safety & Mobile',
    metric: 'Real-Time Telemetry Inference',
    accuracy: 'Contextual ML Risk Engine',
    description: 'Intelligent parental safety platform combining real-time ML activity classification with LangGraph agentic reasoning across Flutter & Kotlin apps.',
    tags: ['LangGraph', 'Django', 'Flutter', 'Kotlin', 'Machine Learning', 'Python'],
    link: '/case-studies/the-watcher',
    featured: true
  },
  {
    id: 'frontdesk-ai',
    title: 'FrontDesk AI — WhatsApp Booking Bot',
    client: 'Service & Medical Clinics',
    category: 'Automation & Chatbots',
    metric: '<0.8s Response Latency',
    accuracy: '100% Automated Scheduling',
    description: 'Autonomous conversational WhatsApp assistant handling appointment bookings, calendar negotiations, and customer queries in Roman Urdu & English.',
    tags: ['LangGraph', 'Groq Llama', 'Django', 'Twilio WhatsApp API', 'Python'],
    link: '/case-studies/frontdesk-ai',
    featured: true
  },
  {
    id: 'threadeye',
    title: 'ThreadEye — Fabric Defect Detection',
    client: 'Textile Manufacturing R&D',
    category: 'Computer Vision & Edge AI',
    metric: '14ms Edge Inference',
    accuracy: 'YOLOv8 Instance Segmentation',
    description: 'AI-powered fabric quality inspection system for textile mills using custom YOLOv8 instance segmentation to detect yarn breaks, holes, and stains.',
    tags: ['Python', 'YOLOv8 (Ultralytics)', 'PyTorch', 'OpenCV', 'Streamlit', 'CUDA'],
    link: '/case-studies/threadeye',
    featured: true
  },
  {
    id: 'getscry',
    title: 'GetScry — Visitor Intent Intelligence',
    client: 'E-commerce Platforms',
    category: 'Machine Learning & Predictive AI',
    metric: '0–100% Intent Probability',
    accuracy: 'SHAP Explainable AI Rationale',
    description: 'Predictive e-commerce machine learning system calculating visitor purchase intent in real time with plain-language SHAP explanations and live dashboard.',
    tags: ['Python', 'scikit-learn', 'XGBoost', 'SHAP', 'FastAPI', 'Django'],
    link: '/case-studies/getscry',
    featured: true
  }
];

// Initial Audit Logs
const INITIAL_LOGS = [
  { id: 'log-1', action: 'System Initialized', user: 'Admin System', timestamp: new Date(Date.now() - 86400000).toISOString(), detail: 'Admin Control Center provisioned with secure token encryption.' },
  { id: 'log-2', action: 'Tagline Updated', user: 'Admin', timestamp: new Date(Date.now() - 3600000).toISOString(), detail: 'Official company tagline synchronized to: Design · Build · Automate' },
  { id: 'log-3', action: 'Inquiry Created', user: 'Client Lead Form', timestamp: new Date(Date.now() - 1800000).toISOString(), detail: 'New inquiry received from Alexander Wright (Solaris Health)' }
];

export const adminStorage = {
  // Authentication
  isAuthenticated() {
    return localStorage.getItem(STORAGE_KEYS.AUTH_TOKEN) === 'true' || 
           sessionStorage.getItem(STORAGE_KEYS.AUTH_TOKEN) === 'true' ||
           Boolean(localStorage.getItem('brixel_jwt_token'));
  },

  async login(username, password, rememberMe = true) {
    // Authenticate exclusively with Django Database & JWT
    try {
      const res = await apiClient.login(username, password);
      if (res.ok && res.data && res.data.access) {
        const storage = rememberMe ? localStorage : sessionStorage;
        storage.setItem(STORAGE_KEYS.AUTH_TOKEN, 'true');
        localStorage.setItem('brixel_jwt_token', res.data.access);
        localStorage.setItem('brixel_jwt_refresh', res.data.refresh || '');
        if (res.data.user) {
          localStorage.setItem('brixel_user', JSON.stringify(res.data.user));
        }
        this.addAuditLog('Admin Login (Django Database)', username, 'Authenticated securely via Django REST Framework.');
        return { success: true };
      }
      return { 
        success: false, 
        message: res.data?.detail || res.error || 'Invalid username or password in database.' 
      };
    } catch (err) {
      return { 
        success: false, 
        message: 'Could not connect to Django backend server. Please verify backend is running.' 
      };
    }
  },


  logout() {
    localStorage.removeItem(STORAGE_KEYS.AUTH_TOKEN);
    sessionStorage.removeItem(STORAGE_KEYS.AUTH_TOKEN);
    localStorage.removeItem('brixel_jwt_token');
    localStorage.removeItem('brixel_jwt_refresh');
    localStorage.removeItem('brixel_user');
    this.addAuditLog('Admin Logout', 'Admin', 'Session terminated by user.');
  },

  // Inquiries / Leads Management
  getInquiries() {
    try {
      const data = localStorage.getItem(STORAGE_KEYS.INQUIRIES);
      return data ? JSON.parse(data) : INITIAL_INQUIRIES;
    } catch {
      return INITIAL_INQUIRIES;
    }
  },

  async fetchInquiriesFromBackend() {
    try {
      const res = await apiClient.getInquiries();
      if (res.ok && Array.isArray(res.data)) {
        const mapped = res.data.map(item => ({
          id: item.id,
          name: item.name,
          email: item.email,
          phone: item.phone,
          company: item.company,
          service: item.service,
          budget: item.budget,
          projectBrief: item.project_brief,
          status: item.status,
          priority: item.priority,
          source: item.source,
          createdAt: item.created_at,
          notes: item.notes
        }));
        localStorage.setItem(STORAGE_KEYS.INQUIRIES, JSON.stringify(mapped));
        return mapped;
      }
    } catch (e) {
      console.warn('Could not fetch inquiries from Django backend', e);
    }
    return this.getInquiries();
  },

  addInquiry(inquiryData) {
    const current = this.getInquiries();
    const newInquiry = {
      id: `inq-${Date.now()}`,
      name: inquiryData.name || 'Anonymous Client',
      email: inquiryData.email || '',
      phone: inquiryData.phone || '',
      company: inquiryData.company || 'Private Enterprise',
      service: inquiryData.service || 'General Tech Solutions',
      budget: inquiryData.budget || '$10k - $25k',
      projectBrief: inquiryData.projectBrief || inquiryData.projectDetails || inquiryData.message || 'No detailed brief provided.',
      status: 'New',
      priority: inquiryData.budget === '$50k+' ? 'Urgent' : 'High',
      source: inquiryData.source || 'Website Form',
      createdAt: new Date().toISOString(),
      notes: inquiryData.notes || '',
      fileName: inquiryData.fileName || ''
    };
    const updated = [newInquiry, ...current];
    localStorage.setItem(STORAGE_KEYS.INQUIRIES, JSON.stringify(updated));
    this.addAuditLog('New Lead Received', newInquiry.name, `Source: ${newInquiry.source} · Service: ${newInquiry.service}`);
    
    // Async Background Push to Django Backend
    apiClient.createInquiry({
      id: newInquiry.id,
      name: newInquiry.name,
      email: newInquiry.email,
      phone: newInquiry.phone,
      company: newInquiry.company,
      service: newInquiry.service,
      budget: newInquiry.budget,
      project_brief: newInquiry.projectBrief,
      status: newInquiry.status,
      priority: newInquiry.priority,
      source: newInquiry.source,
      notes: newInquiry.notes
    }).catch(err => console.warn('Background Django API sync error:', err));

    return newInquiry;
  },

  updateInquiry(id, updates) {
    const current = this.getInquiries();
    const updated = current.map(item => item.id === id ? { ...item, ...updates, updatedAt: new Date().toISOString() } : item);
    localStorage.setItem(STORAGE_KEYS.INQUIRIES, JSON.stringify(updated));
    this.addAuditLog('Inquiry Updated', 'Admin', `Lead ${id} updated with status: ${updates.status || 'modified'}`);
    
    // Async Background Sync to Django Backend
    const backendUpdates = {};
    if (updates.status) backendUpdates.status = updates.status;
    if (updates.priority) backendUpdates.priority = updates.priority;
    if (updates.notes !== undefined) backendUpdates.notes = updates.notes;
    
    apiClient.updateInquiry(id, backendUpdates).catch(err => console.warn('Django update error:', err));
    return updated;
  },

  deleteInquiry(id) {
    const current = this.getInquiries();
    const updated = current.filter(item => item.id !== id);
    localStorage.setItem(STORAGE_KEYS.INQUIRIES, JSON.stringify(updated));
    this.addAuditLog('Inquiry Deleted', 'Admin', `Lead ${id} was removed.`);
    
    // Async Background Delete to Django Backend
    apiClient.deleteInquiry(id).catch(err => console.warn('Django delete error:', err));
    return updated;
  },

  exportInquiriesCSV() {
    const inquiries = this.getInquiries();
    const headers = ['ID', 'Date', 'Name', 'Email', 'Phone', 'Company', 'Service', 'Budget', 'Status', 'Priority', 'Source', 'Brief', 'Notes'];
    const rows = inquiries.map(inq => [
      `"${inq.id}"`,
      `"${new Date(inq.createdAt).toLocaleDateString()}"`,
      `"${inq.name.replace(/"/g, '""')}"`,
      `"${inq.email}"`,
      `"${inq.phone || ''}"`,
      `"${(inq.company || '').replace(/"/g, '""')}"`,
      `"${inq.service}"`,
      `"${inq.budget || ''}"`,
      `"${inq.status}"`,
      `"${inq.priority}"`,
      `"${inq.source || ''}"`,
      `"${(inq.projectBrief || '').replace(/"/g, '""')}"`,
      `"${(inq.notes || '').replace(/"/g, '""')}"`
    ]);

    const csvContent = 'data:text/csv;charset=utf-8,' + [headers.join(','), ...rows.map(e => e.join(','))].join('\n');
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement('a');
    link.setAttribute('href', encodedUri);
    link.setAttribute('download', `BrixelLabs_Leads_${new Date().toISOString().slice(0, 10)}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    this.addAuditLog('CSV Export Generated', 'Admin', `Exported ${inquiries.length} leads to CSV.`);
  },

  // Services Management
  getServices() {
    try {
      const data = localStorage.getItem(STORAGE_KEYS.SERVICES);
      return data ? JSON.parse(data) : INITIAL_SERVICES;
    } catch {
      return INITIAL_SERVICES;
    }
  },

  saveService(serviceData) {
    const current = this.getServices();
    let updated;
    const isExisting = serviceData.id && current.some(s => s.id === serviceData.id);
    if (isExisting) {
      updated = current.map(s => s.id === serviceData.id ? { ...s, ...serviceData } : s);
      this.addAuditLog('Service Updated', 'Admin', `Updated service: ${serviceData.title}`);
      apiClient.updateService(serviceData.id, {
        title: serviceData.title,
        category: serviceData.category || 'Engineering',
        description: serviceData.description,
        bullets: serviceData.bullets || [],
        active: serviceData.active ?? true
      }).catch(e => console.warn('Service backend sync:', e));
    } else {
      const newService = {
        ...serviceData,
        id: serviceData.id || `srv-${Date.now()}`,
        active: serviceData.active ?? true,
        bullets: serviceData.bullets || [],
        gradient: serviceData.gradient || 'from-cyan-500/20 via-blue-500/10 to-transparent'
      };
      updated = [...current, newService];
      this.addAuditLog('Service Created', 'Admin', `Added service: ${newService.title}`);
      apiClient.createService({
        id: newService.id,
        title: newService.title,
        category: newService.category || 'Engineering',
        description: newService.description,
        bullets: newService.bullets || [],
        active: newService.active ?? true
      }).catch(e => console.warn('Service create backend sync:', e));
    }
    localStorage.setItem(STORAGE_KEYS.SERVICES, JSON.stringify(updated));
    return updated;
  },

  deleteService(id) {
    const current = this.getServices();
    const updated = current.filter(s => s.id !== id);
    localStorage.setItem(STORAGE_KEYS.SERVICES, JSON.stringify(updated));
    this.addAuditLog('Service Deleted', 'Admin', `Service ID ${id} removed.`);
    apiClient.deleteService(id).catch(e => console.warn('Service delete backend sync:', e));
    return updated;
  },

  toggleServiceStatus(id) {
    const current = this.getServices();
    const target = current.find(s => s.id === id);
    const updated = current.map(s => s.id === id ? { ...s, active: !s.active } : s);
    localStorage.setItem(STORAGE_KEYS.SERVICES, JSON.stringify(updated));
    if (target) {
      apiClient.updateService(id, { active: !target.active }).catch(e => console.warn('Service toggle sync:', e));
    }
    return updated;
  },

  // Portfolio & Case Studies
  getPortfolio() {
    try {
      const data = localStorage.getItem(STORAGE_KEYS.PORTFOLIO);
      return data ? JSON.parse(data) : INITIAL_PORTFOLIO;
    } catch {
      return INITIAL_PORTFOLIO;
    }
  },

  savePortfolio(projectData) {
    const current = this.getPortfolio();
    let updated;
    const isExisting = projectData.id && current.some(p => p.id === projectData.id);
    if (isExisting) {
      updated = current.map(p => p.id === projectData.id ? { ...p, ...projectData } : p);
      this.addAuditLog('Project Updated', 'Admin', `Updated case study: ${projectData.title}`);
      apiClient.updatePortfolioItem(projectData.id, {
        title: projectData.title,
        client: projectData.client || 'Confidential Client',
        category: projectData.category || 'AI Engineering',
        metric: projectData.metric || '',
        accuracy: projectData.accuracy || '',
        description: projectData.description || '',
        tags: projectData.tags || [],
        featured: projectData.featured ?? true
      }).catch(e => console.warn('Portfolio update sync:', e));
    } else {
      const newProj = {
        ...projectData,
        id: projectData.id || `proj-${Date.now()}`,
        tags: projectData.tags || ['AI & Full-Stack']
      };
      updated = [...current, newProj];
      this.addAuditLog('Project Created', 'Admin', `Added case study: ${newProj.title}`);
      apiClient.createPortfolioItem({
        id: newProj.id,
        title: newProj.title,
        client: newProj.client || 'Confidential Client',
        category: newProj.category || 'AI Engineering',
        metric: newProj.metric || '',
        accuracy: newProj.accuracy || '',
        description: newProj.description || '',
        tags: newProj.tags || [],
        featured: newProj.featured ?? true
      }).catch(e => console.warn('Portfolio create sync:', e));
    }
    localStorage.setItem(STORAGE_KEYS.PORTFOLIO, JSON.stringify(updated));
    return updated;
  },

  deletePortfolio(id) {
    const current = this.getPortfolio();
    const updated = current.filter(p => p.id !== id);
    localStorage.setItem(STORAGE_KEYS.PORTFOLIO, JSON.stringify(updated));
    this.addAuditLog('Project Deleted', 'Admin', `Case study ${id} deleted.`);
    apiClient.deletePortfolioItem(id).catch(e => console.warn('Portfolio delete sync:', e));
    return updated;
  },

  // Team Management
  getTeam() {
    try {
      const data = localStorage.getItem(STORAGE_KEYS.TEAM);
      return data ? JSON.parse(data) : INITIAL_TEAM;
    } catch {
      return INITIAL_TEAM;
    }
  },

  saveTeamMember(memberData) {
    const current = this.getTeam();
    let updated;
    const isExisting = memberData.id && current.some(m => m.id === memberData.id);
    if (isExisting) {
      updated = current.map(m => m.id === memberData.id ? { ...m, ...memberData } : m);
      this.addAuditLog('Team Updated', 'Admin', `Updated member: ${memberData.role || memberData.name}`);
      apiClient.updateTeamMember(memberData.id, {
        name: memberData.name || memberData.role,
        role: memberData.role,
        department: memberData.department || 'Engineering',
        status: memberData.active ? 'Active' : 'Inactive',
        skills: memberData.tags || []
      }).catch(e => console.warn('Team update sync:', e));
    } else {
      const newMember = {
        ...memberData,
        id: memberData.id || `team-${Date.now()}`,
        active: true
      };
      updated = [...current, newMember];
      this.addAuditLog('Team Member Added', 'Admin', `Added member: ${newMember.role || newMember.name}`);
      apiClient.createTeamMember({
        id: newMember.id,
        name: newMember.name || newMember.role,
        role: newMember.role,
        department: newMember.department || 'Engineering',
        status: 'Active',
        skills: newMember.tags || []
      }).catch(e => console.warn('Team create sync:', e));
    }
    localStorage.setItem(STORAGE_KEYS.TEAM, JSON.stringify(updated));
    return updated;
  },

  deleteTeamMember(id) {
    const current = this.getTeam();
    const updated = current.filter(m => m.id !== id);
    localStorage.setItem(STORAGE_KEYS.TEAM, JSON.stringify(updated));
    this.addAuditLog('Team Member Deleted', 'Admin', `Removed member ${id}.`);
    apiClient.deleteTeamMember(id).catch(e => console.warn('Team delete sync:', e));
    return updated;
  },

  // Site Settings
  getSettings() {
    try {
      const data = localStorage.getItem(STORAGE_KEYS.SETTINGS);
      return data ? { ...INITIAL_SETTINGS, ...JSON.parse(data) } : INITIAL_SETTINGS;
    } catch {
      return INITIAL_SETTINGS;
    }
  },

  updateSettings(newSettings) {
    const current = this.getSettings();
    const updated = { ...current, ...newSettings };
    localStorage.setItem(STORAGE_KEYS.SETTINGS, JSON.stringify(updated));
    this.addAuditLog('Site Settings Updated', 'Admin', 'Updated global configuration');
    apiClient.updateSetting('general_config', updated).catch(e => console.warn('Settings sync:', e));
    return updated;
  },


  saveSettings(newSettings) {
    const current = this.getSettings();
    const updated = { ...current, ...newSettings };
    localStorage.setItem(STORAGE_KEYS.SETTINGS, JSON.stringify(updated));
    this.addAuditLog('Site Settings Saved', 'Admin', 'Updated global configuration and branding parameters.');
    return updated;
  },

  // Audit Logs
  getAuditLogs() {
    try {
      const data = localStorage.getItem(STORAGE_KEYS.AUDIT_LOGS);
      return data ? JSON.parse(data) : INITIAL_LOGS;
    } catch {
      return INITIAL_LOGS;
    }
  },

  addAuditLog(action, user = 'Admin', detail = '') {
    try {
      const current = this.getAuditLogs();
      const newLog = {
        id: `log-${Date.now()}`,
        action,
        user,
        detail,
        timestamp: new Date().toISOString()
      };
      const updated = [newLog, ...current].slice(0, 100);
      localStorage.setItem(STORAGE_KEYS.AUDIT_LOGS, JSON.stringify(updated));
    } catch (e) {
      console.error('Failed to write audit log', e);
    }
  },

  clearAllData() {
    localStorage.removeItem(STORAGE_KEYS.INQUIRIES);
    localStorage.removeItem(STORAGE_KEYS.SERVICES);
    localStorage.removeItem(STORAGE_KEYS.PORTFOLIO);
    localStorage.removeItem(STORAGE_KEYS.TEAM);
    localStorage.removeItem(STORAGE_KEYS.SETTINGS);
    localStorage.removeItem(STORAGE_KEYS.AUDIT_LOGS);
    this.addAuditLog('Database Reset to Factory Defaults', 'SuperAdmin', 'All mock state reset.');
  }
};
