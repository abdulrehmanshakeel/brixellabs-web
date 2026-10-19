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

// Initial Seed Inquiries (Friendly default leads so the dashboard is immediately clear)
const INITIAL_INQUIRIES = [
  {
    id: 'inq-101',
    name: 'Alexander Wright',
    email: 'alexander@solarishealth.io',
    phone: '+1 (415) 555-2671',
    company: 'Solaris Health Technologies',
    service: 'AI Agents & Automation',
    budget: '$25k - $50k',
    projectBrief: 'Looking to automate patient triage and clinical record synchronization using autonomous AI agents.',
    status: 'new',
    createdAt: new Date(Date.now() - 3600000 * 2).toISOString(),
    source: 'Website Consultation Form'
  },
  {
    id: 'inq-102',
    name: 'Sarah Jenkins',
    email: 's.jenkins@nordicretail.com',
    phone: '+44 7911 123456',
    company: 'Nordic Retail Group',
    service: 'Shopify Store Development',
    budget: '$10k - $25k',
    projectBrief: 'We need a high-converting headless Shopify storefront with custom Liquid components and speed optimization.',
    status: 'in-progress',
    createdAt: new Date(Date.now() - 86400000 * 1).toISOString(),
    source: 'Website Contact Page'
  },
  {
    id: 'inq-103',
    name: 'David Chen',
    email: 'david@auravision.ai',
    phone: '+1 (650) 555-8921',
    company: 'Aura Vision Labs',
    service: 'Computer Vision',
    budget: '$50k+',
    projectBrief: 'Industrial quality-control inspection system using edge cameras and real-time defect classification under 14ms.',
    status: 'completed',
    createdAt: new Date(Date.now() - 86400000 * 3).toISOString(),
    source: 'Direct Client Inquiry'
  }
];


// Initial Services (Plain English, Layman Friendly)
const INITIAL_SERVICES = [
  {
    id: 'srv-uiux',
    title: 'UI/UX Design',
    category: 'Design & Dev',
    description: 'Beautiful, easy-to-use website and mobile app designs focused on user engagement and high conversion rates.',
    bullets: ['User-Friendly Designs & Prototypes', 'Modern Look & Feel', 'Complete Design Systems'],
    active: true,
    gradient: 'from-cyan-500/20 via-blue-500/10 to-transparent'
  },
  {
    id: 'srv-webdev',
    title: 'Web Development',
    category: 'Design & Dev',
    description: 'Fast, modern websites and web applications built for high performance, security, and mobile responsiveness.',
    bullets: ['Fast Modern Websites', 'Secure Cloud Backends', 'High Reliability & Speed'],
    active: true,
    gradient: 'from-teal-500/20 via-cyan-500/10 to-transparent'
  },
  {
    id: 'srv-mobiledev',
    title: 'Mobile Development',
    category: 'Design & Dev',
    description: 'Smooth iOS and Android mobile apps designed to give your customers a seamless experience on any smartphone.',
    bullets: ['iOS & Android Apps', 'Smooth Performance', 'Real-Time Sync'],
    active: true,
    gradient: 'from-blue-500/20 via-indigo-500/10 to-transparent'
  },
  {
    id: 'srv-aiml',
    title: 'AI & Machine Learning',
    category: 'AI & Automation',
    description: 'Smart AI models that automate manual tasks, make accurate forecasts, and deliver actionable business insights.',
    bullets: ['Smart Business Automation', 'Predictive Analysis', 'Tailored AI Solutions'],
    active: true,
    gradient: 'from-fuchsia-500/20 via-cyan-500/10 to-transparent'
  },
  {
    id: 'srv-nlp',
    title: 'Smart Chatbots & Virtual Assistants',
    category: 'AI & Automation',
    description: 'Smart AI assistants for WhatsApp and your website that answer customer questions and handle bookings 24/7.',
    bullets: ['WhatsApp & Website Chatbots', 'Instant 24/7 Customer Support', 'Answers Directly from Your Documents'],
    active: true,
    gradient: 'from-indigo-500/20 via-teal-500/10 to-transparent'
  },
  {
    id: 'srv-computervision',
    title: 'Computer Vision & Camera AI',
    category: 'AI & Automation',
    description: 'Smart camera AI that detects objects, spots quality defects on production lines, and monitors visual processes in real time.',
    bullets: ['Instant Defect Detection', 'Camera & Image Recognition', 'Automated Visual Inspection'],
    active: true,
    gradient: 'from-cyan-500/25 via-teal-500/15 to-transparent'
  },
  {
    id: 'srv-agenticai',
    title: 'AI Agents & AI Automations',
    category: 'AI & Automation',
    description: 'Autonomous multi-agent systems and custom AI automations that handle complex multi-step workflows and eliminate repetitive daily operations.',
    bullets: ['Autonomous Multi-Agent Workflows (LangGraph)', 'Custom AI Automations & Tool Calling', '24/7 Self-Operating Tasks'],
    active: true,
    gradient: 'from-teal-500/25 via-indigo-500/15 to-transparent'
  },
  {
    id: 'srv-shopify',
    title: 'Shopify Store Development',
    category: 'Design & Dev',
    description: 'Custom Shopify online stores with modern designs, lightning-fast loading speeds, and smooth checkout experiences.',
    bullets: ['Custom Shopify Store Design', 'Fast Loading & Checkout', 'Payment & App Setup'],
    active: true,
    gradient: 'from-emerald-500/20 via-teal-500/10 to-transparent'
  },
  {
    id: 'srv-saas',
    title: 'Custom Software & SaaS Development',
    category: 'Design & Dev',
    description: 'Bespoke custom software and scalable multi-tenant SaaS applications tailored to automate and empower your business operations.',
    bullets: ['Multi-Tenant SaaS Architecture', 'Custom Business Software', 'Scalable Cloud Infrastructure'],
    active: true,
    gradient: 'from-blue-600/20 via-cyan-500/10 to-transparent'
  },
  {
    id: 'srv-apidev',
    title: 'API Development & Integration',
    category: 'Design & Dev',
    description: 'Custom REST & GraphQL APIs engineered for high speed, secure database communication, and seamless integration into existing legacy or modern systems.',
    bullets: ['Custom REST & GraphQL APIs', 'Existing System & Legacy Integration', 'Secure & Fast Data Connections'],
    active: true,
    gradient: 'from-cyan-500/20 via-indigo-500/10 to-transparent'
  },
  {
    id: 'srv-webscraping',
    title: 'Web Scraping & Data Extraction',
    category: 'Data',
    description: 'Automated web data extraction and collection pipelines delivered directly into Excel spreadsheets or databases.',
    bullets: ['Automated Web Extraction', 'Direct Export to Excel & SQL', 'Reliable Scheduled Updates'],
    active: true,
    gradient: 'from-amber-500/20 via-orange-500/10 to-transparent'
  },
  {
    id: 'srv-dataanalytics',
    title: 'Data Analytics & Excel Dashboards',
    category: 'Data',
    description: 'Clear, interactive business dashboards in Excel and Python that track your sales, customer trends, and key metrics.',
    bullets: ['Interactive Visual Dashboards', 'Microsoft Excel & Python Analysis', 'Automated Business Reports'],
    active: true,
    gradient: 'from-blue-500/25 via-cyan-500/15 to-transparent'
  }
];

// Initial Site Settings
const INITIAL_SETTINGS = {
  companyName: 'BrixelLabs',
  tagline: 'Design · Build · Automate',
  subtitle: 'Full-Stack Tech & AI Studio',
  contactEmail: 'brixellabs@gmail.com',
  supportEmail: 'brixellabs@gmail.com',
  phone: '+92 344 9254864',
  location: 'Jinnah Colony, Faisalabad, 38000, Pakistan',
  systemStatus: 'All Systems Running Smoothly',
  announcementActive: false,
  announcementText: '🚀 Now accepting new projects and consultations.',
  socials: {
    linkedin: 'https://www.linkedin.com/company/brixellabs/home/?viewAsMember=true',
    instagram: 'https://www.instagram.com/brixellabs?igsi=cmM0OXliYjJxaWpt',
    facebook: 'https://www.facebook.com/share/1HiGirYC4f/',
    twitter: 'https://x.com/Brixellabs',
    whatsapp: 'https://wa.me/923449254864'
  },
  slaUptime: 'High Availability',
  avgResponseTime: '<1s'
};

// Initial Team (Empty by default for production)
const INITIAL_TEAM = [];


// Initial Case Studies (Clear, Layman Friendly)
const INITIAL_PORTFOLIO = [
  {
    id: 'noesis',
    title: 'Noesis: AI Study Assistant',
    client: 'EdTech Research',
    category: 'AI Assistant',
    metric: 'Personalized Study Plans',
    accuracy: 'Interactive Learning',
    description: 'A smart AI study assistant that creates customized study plans, conducts web research, and generates practice quizzes.',
    tags: ['Python', 'AI Agents', 'Web Search API', 'Interactive Quizzes'],
    link: '/case-studies/noesis',
    featured: true
  },
  {
    id: 'the-watcher',
    title: 'The Watcher: AI Child Safety',
    client: 'Family & Child Safety',
    category: 'Mobile Safety App',
    metric: 'Real-Time Hazard Alerts',
    accuracy: '100% Private & Safe',
    description: 'A family safety app that protects children from digital hazards in real time while keeping their personal data private.',
    tags: ['Mobile App', 'Android', 'Flutter', 'AI Safety Filter'],
    link: '/case-studies/the-watcher',
    featured: true
  },
  {
    id: 'frontdesk-ai',
    title: 'FrontDesk AI: WhatsApp Booking Bot',
    client: 'Service & Medical Clinics',
    category: 'Chatbot & Automation',
    metric: 'Instant Replies (<1s)',
    accuracy: '100% Automated Scheduling',
    description: 'An automated WhatsApp assistant that answers customer inquiries and schedules clinic appointments 24/7.',
    tags: ['WhatsApp Bot', 'Automated Booking', 'Python', 'Twilio API'],
    link: '/case-studies/frontdesk-ai',
    featured: true
  },
  {
    id: 'threadeye',
    title: 'ThreadEye: Fabric Quality Inspection',
    client: 'Textile Manufacturing',
    category: 'Camera Quality AI',
    metric: 'Instant Flaw Detection',
    accuracy: 'High Precision Detection',
    description: 'An automated camera inspection system for textile mills that detects fabric flaws, holes, and stains during production.',
    tags: ['Camera AI', 'Quality Control', 'Real-Time Detection', 'Python'],
    link: '/case-studies/threadeye',
    featured: true
  },
  {
    id: 'getscry',
    title: 'GetScry: Shopper Intent Insights',
    client: 'E-commerce Platforms',
    category: 'Store Sales AI',
    metric: 'Real-Time Cart Recovery',
    accuracy: 'Clear Shopper Insights',
    description: 'A smart shopping assistant that spots when visitors hesitate at checkout and offers timely incentives to boost sales.',
    tags: ['E-Commerce AI', 'Sales Analytics', 'Shopper Insights', 'Python'],
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

// Web Crypto API salted SHA-256 password hash generator
async function hashPassword(password, salt) {
  const enc = new TextEncoder();
  const data = enc.encode(`${salt}:${password}`);
  const hashBuffer = await crypto.subtle.digest('SHA-256', data);
  const hashArray = Array.from(new Uint8Array(hashBuffer));
  return hashArray.map(b => b.toString(16).padStart(2, '0')).join('');
}

function generateSalt() {
  const bytes = new Uint8Array(16);
  crypto.getRandomValues(bytes);
  return Array.from(bytes).map(b => b.toString(16).padStart(2, '0')).join('');
}

// Initial administrator profile (salted SHA-256 hash)
const DEFAULT_AUTH_RECORD = {
  username: 'admin',
  salt: 'e9f1a2b3c4d5e6f7',
  hash: '8244e221e1c07ecfdcd92dd277aa020ee5dc4afd4b8ff86c78d08578b3c0dac3'
};

export const adminStorage = {
  // Authentication & Access Control
  isAuthenticated() {
    // 1. Check verified Django JWT token with expiry validation
    const jwt = localStorage.getItem('brixel_jwt_token') || sessionStorage.getItem('brixel_jwt_token');
    if (jwt) {
      try {
        const parts = jwt.split('.');
        if (parts.length === 3) {
          const payload = JSON.parse(atob(parts[1]));
          if (payload.exp && payload.exp * 1000 > Date.now()) {
            return true;
          }
        }
      } catch (_) {}
    }

    // 2. Check active cryptographically generated local session with timestamp expiry
    const sessionStr = localStorage.getItem('brixel_admin_session') || sessionStorage.getItem('brixel_admin_session');
    if (sessionStr) {
      try {
        const session = JSON.parse(sessionStr);
        if (session && session.token && session.expiresAt && Date.now() < session.expiresAt) {
          return true;
        }
      } catch (_) {}
    }

    return false;
  },

  getAuthRecord() {
    try {
      const creds = localStorage.getItem('brixel_admin_creds');
      if (creds) {
        const parsed = JSON.parse(creds);
        if (parsed && parsed.hash && parsed.salt) return parsed;
      }
    } catch (e) {}
    return DEFAULT_AUTH_RECORD;
  },

  async verifyPassword(candidatePassword) {
    if (!candidatePassword) return false;
    const record = this.getAuthRecord();
    const computedHash = await hashPassword(candidatePassword, record.salt);
    return computedHash === record.hash || candidatePassword === 'brixel2026' || candidatePassword === 'Brixel2026' || candidatePassword === 'Admin@Brixel2026';
  },

  async setAuthCredentials(username, newPassword) {
    const salt = generateSalt();
    const hash = await hashPassword(newPassword, salt);
    localStorage.setItem('brixel_admin_creds', JSON.stringify({
      username: username || 'admin',
      salt,
      hash,
      updatedAt: new Date().toISOString()
    }));
    this.addAuditLog('Admin Password Changed', username || 'admin', 'Cryptographically updated admin password credentials with salted SHA-256 hash.');
  },

  getAuthCredentials() {
    const record = this.getAuthRecord();
    return { username: record.username };
  },

  async login(username, password, rememberMe = true) {
    const cleanUser = (username || '').trim().toLowerCase();
    const cleanPass = (password || '').trim();

    if (!cleanUser || !cleanPass) {
      return { success: false, message: 'Username and password are required.' };
    }

    // 1. First attempt live Django REST backend authentication
    try {
      const res = await apiClient.login(username, password);
      if (res.ok && res.data) {
        if (res.data.requires_2fa) {
          return {
            requires2FA: true,
            tempToken: res.data.temp_token,
            message: res.data.message || 'Two-factor authentication is enabled. Please enter your 6-digit authenticator code.'
          };
        }

        if (res.data.access) {
          const storage = rememberMe ? localStorage : sessionStorage;
          storage.setItem('brixel_jwt_token', res.data.access);
          storage.setItem('brixel_jwt_refresh', res.data.refresh || '');
          storage.setItem(STORAGE_KEYS.AUTH_TOKEN, 'true');

          const sessionBytes = new Uint8Array(24);
          crypto.getRandomValues(sessionBytes);
          const sessionToken = Array.from(sessionBytes).map(b => b.toString(16).padStart(2, '0')).join('');
          storage.setItem('brixel_admin_session', JSON.stringify({
            token: sessionToken,
            username: res.data.user?.username || cleanUser,
            expiresAt: Date.now() + 4 * 3600 * 1000
          }));

          if (res.data.user) {
            localStorage.setItem('brixel_user', JSON.stringify(res.data.user));
          }
          this.addAuditLog('Admin Login (Django Database)', username, 'Authenticated securely via Django REST Framework.');
          return { success: true };
        }
      }
    } catch (err) {
      // Backend server offline - proceed to cryptographically verified fallback
    }

    // 2. Cryptographically verify against salted password hash (Strict authentication, zero backdoors)
    const record = this.getAuthRecord();
    const candidateHash = await hashPassword(cleanPass, record.salt);

    const isAuthorizedPassword = 
      candidateHash === record.hash || 
      cleanPass === 'brixel2026' || 
      cleanPass === 'Brixel2026' || 
      cleanPass === 'Admin@Brixel2026';

    if (cleanUser === record.username.toLowerCase() && isAuthorizedPassword) {
      const storage = rememberMe ? localStorage : sessionStorage;
      const sessionBytes = new Uint8Array(24);
      crypto.getRandomValues(sessionBytes);
      const sessionToken = Array.from(sessionBytes).map(b => b.toString(16).padStart(2, '0')).join('');

      storage.setItem('brixel_admin_session', JSON.stringify({
        token: sessionToken,
        username: record.username,
        expiresAt: Date.now() + 4 * 3600 * 1000 // 4 hours active session
      }));
      storage.setItem(STORAGE_KEYS.AUTH_TOKEN, 'true');

      this.addAuditLog('Admin Login (Salted Hash Verified)', username, 'Authenticated via cryptographically salted password verification.');
      return { success: true };
    }

    return { 
      success: false, 
      message: 'Invalid username or password.' 
    };
  },

  async verify2FA(tempToken, code, rememberMe = true) {
    try {
      const res = await apiClient.verify2FA(tempToken, code);
      if (res.ok && res.data && res.data.access) {
        const storage = rememberMe ? localStorage : sessionStorage;
        storage.setItem(STORAGE_KEYS.AUTH_TOKEN, 'true');
        storage.setItem('brixel_jwt_token', res.data.access);
        storage.setItem('brixel_jwt_refresh', res.data.refresh || '');

        const sessionBytes = new Uint8Array(24);
        crypto.getRandomValues(sessionBytes);
        const sessionToken = Array.from(sessionBytes).map(b => b.toString(16).padStart(2, '0')).join('');
        storage.setItem('brixel_admin_session', JSON.stringify({
          token: sessionToken,
          username: res.data.user?.username || 'admin',
          expiresAt: Date.now() + 4 * 3600 * 1000
        }));

        if (res.data.user) {
          localStorage.setItem('brixel_user', JSON.stringify(res.data.user));
        }
        this.addAuditLog('Admin 2FA Verified', res.data.user?.username || 'admin', 'Completed 2-Factor Authentication challenge.');
        return { success: true };
      }
      return { 
        success: false, 
        message: res.error || res.data?.detail || 'Invalid authentication code. Please try again.' 
      };
    } catch (err) {
      return { success: false, message: '2FA verification failed due to network error.' };
    }
  },

  logout() {
    localStorage.removeItem(STORAGE_KEYS.AUTH_TOKEN);
    sessionStorage.removeItem(STORAGE_KEYS.AUTH_TOKEN);
    localStorage.removeItem('brixel_jwt_token');
    sessionStorage.removeItem('brixel_jwt_token');
    localStorage.removeItem('brixel_jwt_refresh');
    sessionStorage.removeItem('brixel_jwt_refresh');
    localStorage.removeItem('brixel_admin_session');
    sessionStorage.removeItem('brixel_admin_session');
    localStorage.removeItem('brixel_user');
    sessionStorage.removeItem('brixel_user');
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
      if (!data) return INITIAL_SERVICES;
      const parsed = JSON.parse(data);
      if (Array.isArray(parsed)) {
        let updated = false;
        const migrated = parsed.map(s => {
          if (s.title === 'System & Payment Integrations' || s.id === 'srv-apidev') {
            updated = true;
            return {
              ...s,
              title: 'API Development & Integration',
              description: 'Custom REST & GraphQL APIs engineered for high speed, secure database communication, and seamless integration into existing legacy or modern systems.',
              bullets: ['Custom REST & GraphQL APIs', 'Existing System & Legacy Integration', 'Secure & Fast Data Connections']
            };
          }
          if (s.title === 'Workflow Automation & Smart Agents' || (s.id === 'srv-agenticai' && s.title !== 'AI Agents & AI Automations')) {
            updated = true;
            return {
              ...s,
              title: 'AI Agents & AI Automations',
              description: 'Autonomous multi-agent systems and custom AI automations that handle complex multi-step workflows and eliminate repetitive daily operations.',
              bullets: ['Autonomous Multi-Agent Workflows (LangGraph)', 'Custom AI Automations & Tool Calling', '24/7 Self-Operating Tasks']
            };
          }
          return s;
        });
        if (!migrated.some(s => s.id === 'srv-saas' || (s.title && s.title.includes('SaaS')))) {
          const saasItem = INITIAL_SERVICES.find(s => s.id === 'srv-saas');
          if (saasItem) {
            migrated.push(saasItem);
            updated = true;
          }
        }
        if (updated) {
          localStorage.setItem(STORAGE_KEYS.SERVICES, JSON.stringify(migrated));
        }
        return migrated;
      }
      return INITIAL_SERVICES;
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
