import { useEffect } from 'react';
import { trackPageView } from '../../utils/analytics';

const BASE_URL = 'https://brixellabs.com';
const DEFAULT_OG_IMAGE = `${BASE_URL}/og-image.jpg`;

export const routeMetadata = {
  '/': {
    title: 'BrixelLabs — Design · Build · Automate | Tech & AI Solutions',
    description: 'Design · Build · Automate. Custom AI models, scalable web/mobile apps, computer vision systems under 14ms latency, and enterprise workflow automation.',
    ogImage: DEFAULT_OG_IMAGE,
    ogType: 'website',
    robots: 'index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1',
    breadcrumbs: [
      { name: 'Home', url: `${BASE_URL}/` }
    ]
  },
  '/services': {
    title: 'Services & Engineering Capabilities | BrixelLabs',
    description: 'Full-spectrum technology solutions: UI/UX Design, Full-Stack Web Development, Mobile Apps, Custom AI & ML, NLP WhatsApp Chatbots, Computer Vision, and Data Analytics.',
    ogImage: DEFAULT_OG_IMAGE,
    ogType: 'website',
    robots: 'index, follow',
    breadcrumbs: [
      { name: 'Home', url: `${BASE_URL}/` },
      { name: 'Services', url: `${BASE_URL}/services` }
    ]
  },
  '/process': {
    title: 'Our Engineering Process & 4-Stage Agile Framework | BrixelLabs',
    description: 'Discover how BrixelLabs delivers successful digital products: 4-stage agile framework from Discover & Scope to Design, Build, and Launch with 24/7 SLA.',
    ogImage: DEFAULT_OG_IMAGE,
    ogType: 'website',
    robots: 'index, follow',
    breadcrumbs: [
      { name: 'Home', url: `${BASE_URL}/` },
      { name: 'Process', url: `${BASE_URL}/process` }
    ]
  },
  '/case-studies': {
    title: 'Case Studies & Production AI Deployments | BrixelLabs',
    description: 'Explore verified client case studies: Agentic AI assistants, real-time computer vision defect inspection, parental safety platforms, and predictive e-commerce ML.',
    ogImage: DEFAULT_OG_IMAGE,
    ogType: 'website',
    robots: 'index, follow',
    breadcrumbs: [
      { name: 'Home', url: `${BASE_URL}/` },
      { name: 'Case Studies', url: `${BASE_URL}/case-studies` }
    ]
  },
  '/case-studies/noesis': {
    title: 'Noesis Case Study — AI-Powered Study Assistant | BrixelLabs',
    description: 'Deep dive into Noesis: LangGraph stateful multi-agent system with dual-engine web search, level-adapted study notes, and interactive quizzes with HITL calibration.',
    ogImage: DEFAULT_OG_IMAGE,
    ogType: 'article',
    robots: 'index, follow',
    breadcrumbs: [
      { name: 'Home', url: `${BASE_URL}/` },
      { name: 'Case Studies', url: `${BASE_URL}/case-studies` },
      { name: 'Noesis', url: `${BASE_URL}/case-studies/noesis` }
    ]
  },
  '/case-studies/neosis': {
    title: 'Noesis Case Study — AI-Powered Study Assistant | BrixelLabs',
    description: 'Deep dive into Noesis: LangGraph stateful multi-agent system with dual-engine web search, level-adapted study notes, and interactive quizzes.',
    ogImage: DEFAULT_OG_IMAGE,
    ogType: 'article',
    robots: 'index, follow',
    breadcrumbs: [
      { name: 'Home', url: `${BASE_URL}/` },
      { name: 'Case Studies', url: `${BASE_URL}/case-studies` },
      { name: 'Noesis', url: `${BASE_URL}/case-studies/noesis` }
    ]
  },
  '/case-studies/the-watcher': {
    title: 'The Watcher Case Study — AI Child Safety Platform | BrixelLabs',
    description: 'Autonomous child protection platform combining real-time machine learning activity classification with LangGraph agentic reasoning across Flutter & Kotlin.',
    ogImage: DEFAULT_OG_IMAGE,
    ogType: 'article',
    robots: 'index, follow',
    breadcrumbs: [
      { name: 'Home', url: `${BASE_URL}/` },
      { name: 'Case Studies', url: `${BASE_URL}/case-studies` },
      { name: 'The Watcher', url: `${BASE_URL}/case-studies/the-watcher` }
    ]
  },
  '/case-studies/frontdesk-ai': {
    title: 'FrontDesk AI Case Study — Autonomous WhatsApp Booking Bot | BrixelLabs',
    description: 'Conversational agent managing appointment bookings, calendar negotiation, and customer FAQs in Roman Urdu & English with sub-0.8s response latency.',
    ogImage: DEFAULT_OG_IMAGE,
    ogType: 'article',
    robots: 'index, follow',
    breadcrumbs: [
      { name: 'Home', url: `${BASE_URL}/` },
      { name: 'Case Studies', url: `${BASE_URL}/case-studies` },
      { name: 'FrontDesk AI', url: `${BASE_URL}/case-studies/frontdesk-ai` }
    ]
  },
  '/case-studies/threadeye': {
    title: 'ThreadEye Case Study — Industrial Fabric Defect Detection Under 14ms | BrixelLabs',
    description: 'Industrial computer vision system powered by YOLOv8/v9 and TensorRT on NVIDIA Jetson, classifying textile flaws with 99.8% accuracy.',
    ogImage: DEFAULT_OG_IMAGE,
    ogType: 'article',
    robots: 'index, follow',
    breadcrumbs: [
      { name: 'Home', url: `${BASE_URL}/` },
      { name: 'Case Studies', url: `${BASE_URL}/case-studies` },
      { name: 'ThreadEye', url: `${BASE_URL}/case-studies/threadeye` }
    ]
  },
  '/case-studies/fabric-defect-detection': {
    title: 'ThreadEye Case Study — Industrial Fabric Defect Detection Under 14ms | BrixelLabs',
    description: 'Industrial computer vision system powered by YOLOv8/v9 and TensorRT on NVIDIA Jetson, classifying textile flaws with 99.8% accuracy.',
    ogImage: DEFAULT_OG_IMAGE,
    ogType: 'article',
    robots: 'index, follow',
    breadcrumbs: [
      { name: 'Home', url: `${BASE_URL}/` },
      { name: 'Case Studies', url: `${BASE_URL}/case-studies` },
      { name: 'ThreadEye', url: `${BASE_URL}/case-studies/threadeye` }
    ]
  },
  '/case-studies/getscry': {
    title: 'GetScry Case Study — Real-Time Visitor Intent Intelligence | BrixelLabs',
    description: 'Predictive e-commerce AI system using XGBoost and SHAP explainability to predict purchase intent in real time under 35ms.',
    ogImage: DEFAULT_OG_IMAGE,
    ogType: 'article',
    robots: 'index, follow',
    breadcrumbs: [
      { name: 'Home', url: `${BASE_URL}/` },
      { name: 'Case Studies', url: `${BASE_URL}/case-studies` },
      { name: 'GetScry', url: `${BASE_URL}/case-studies/getscry` }
    ]
  },
  '/about': {
    title: 'About Us & Engineering Team | BrixelLabs',
    description: 'Learn about BrixelLabs: A remote-first engineering studio delivering end-to-end UI/UX, AI, automation, and data pipelines for modern high-growth businesses.',
    ogImage: DEFAULT_OG_IMAGE,
    ogType: 'website',
    robots: 'index, follow',
    breadcrumbs: [
      { name: 'Home', url: `${BASE_URL}/` },
      { name: 'About', url: `${BASE_URL}/about` }
    ]
  },
  '/contact': {
    title: 'Contact Us & Schedule Free Consultation | BrixelLabs',
    description: 'Get in touch with BrixelLabs senior engineers for your AI, web development, computer vision, or workflow automation project. 24-hour response time.',
    ogImage: DEFAULT_OG_IMAGE,
    ogType: 'website',
    robots: 'index, follow',
    breadcrumbs: [
      { name: 'Home', url: `${BASE_URL}/` },
      { name: 'Contact', url: `${BASE_URL}/contact` }
    ]
  },
  '/thank-you': {
    title: 'Thank You — Project Inquiry Received | BrixelLabs',
    description: 'Thank you for reaching out to BrixelLabs. Our senior engineers have received your inquiry and will review your requirements within 24 hours.',
    ogImage: DEFAULT_OG_IMAGE,
    ogType: 'website',
    robots: 'noindex, follow',
    breadcrumbs: [
      { name: 'Home', url: `${BASE_URL}/` },
      { name: 'Thank You', url: `${BASE_URL}/thank-you` }
    ]
  },
  '/privacy-policy': {
    title: 'Privacy Policy & Data Protection Standards | BrixelLabs',
    description: 'Read the BrixelLabs Privacy Policy: Client data confidentiality guarantees, zero-public-model-training policy, and enterprise encryption standards.',
    ogImage: DEFAULT_OG_IMAGE,
    ogType: 'website',
    robots: 'index, follow',
    breadcrumbs: [
      { name: 'Home', url: `${BASE_URL}/` },
      { name: 'Privacy Policy', url: `${BASE_URL}/privacy-policy` }
    ]
  },
  '/admin': {
    title: 'Admin Command Center | BrixelLabs Portal',
    description: 'Internal operational CRM and consultation dashboard for BrixelLabs administrators.',
    ogImage: DEFAULT_OG_IMAGE,
    ogType: 'website',
    robots: 'noindex, nofollow',
    breadcrumbs: [
      { name: 'Home', url: `${BASE_URL}/` },
      { name: 'Admin', url: `${BASE_URL}/admin` }
    ]
  },
  '404': {
    title: '404 — System Node Not Found | BrixelLabs',
    description: 'The requested system module or route was not found. Return to the BrixelLabs homepage or explore our engineering capabilities.',
    ogImage: DEFAULT_OG_IMAGE,
    ogType: 'website',
    robots: 'noindex, follow',
    breadcrumbs: [
      { name: 'Home', url: `${BASE_URL}/` },
      { name: '404 Not Found', url: `${BASE_URL}/404` }
    ]
  }
};

export const SEOHead = ({ currentPath = '/' }) => {
  useEffect(() => {
    const meta = routeMetadata[currentPath] || routeMetadata['404'] || routeMetadata['/'];
    const canonicalUrl = `${BASE_URL}${currentPath === '/' ? '' : currentPath}`;

    // 1. Update Document Title
    document.title = meta.title;

    // Helper to set/update meta tag
    const setMetaTag = (selector, attrName, attrValue, content) => {
      let element = document.querySelector(selector);
      if (!element) {
        element = document.createElement('meta');
        element.setAttribute(attrName, attrValue);
        document.head.appendChild(element);
      }
      element.setAttribute('content', content);
    };

    // 2. Update Primary Meta Tags
    setMetaTag('meta[name="description"]', 'name', 'description', meta.description);
    setMetaTag('meta[name="robots"]', 'name', 'robots', meta.robots || 'index, follow');

    // 3. Update Canonical Link Tag
    let canonicalTag = document.querySelector('link[rel="canonical"]');
    if (!canonicalTag) {
      canonicalTag = document.createElement('link');
      canonicalTag.setAttribute('rel', 'canonical');
      document.head.appendChild(canonicalTag);
    }
    canonicalTag.setAttribute('href', canonicalUrl);

    // 4. Update Open Graph Tags for Social Sharing (LinkedIn, Facebook, Discord, Slack, WhatsApp)
    setMetaTag('meta[property="og:title"]', 'property', 'og:title', meta.title);
    setMetaTag('meta[property="og:description"]', 'property', 'og:description', meta.description);
    setMetaTag('meta[property="og:url"]', 'property', 'og:url', canonicalUrl);
    setMetaTag('meta[property="og:image"]', 'property', 'og:image', meta.ogImage);
    setMetaTag('meta[property="og:image:secure_url"]', 'property', 'og:image:secure_url', meta.ogImage);
    setMetaTag('meta[property="og:image:type"]', 'property', 'og:image:type', 'image/jpeg');
    setMetaTag('meta[property="og:image:width"]', 'property', 'og:image:width', '1200');
    setMetaTag('meta[property="og:image:height"]', 'property', 'og:image:height', '630');
    setMetaTag('meta[property="og:image:alt"]', 'property', 'og:image:alt', meta.title);
    setMetaTag('meta[property="og:type"]', 'property', 'og:type', meta.ogType || 'website');
    setMetaTag('meta[property="og:site_name"]', 'property', 'og:site_name', 'BrixelLabs');

    // 5. Update Twitter Card Tags
    setMetaTag('meta[name="twitter:card"]', 'name', 'twitter:card', 'summary_large_image');
    setMetaTag('meta[name="twitter:site"]', 'name', 'twitter:site', '@brixellabs');
    setMetaTag('meta[name="twitter:title"]', 'name', 'twitter:title', meta.title);
    setMetaTag('meta[name="twitter:description"]', 'name', 'twitter:description', meta.description);
    setMetaTag('meta[name="twitter:image"]', 'name', 'twitter:image', meta.ogImage);
    setMetaTag('meta[name="twitter:image:alt"]', 'name', 'twitter:image:alt', meta.title);

    // 6. Dynamic Breadcrumbs JSON-LD Schema
    const breadcrumbsSchema = {
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      "itemListElement": (meta.breadcrumbs || []).map((item, index) => ({
        "@type": "ListItem",
        "position": index + 1,
        "name": item.name,
        "item": item.url
      }))
    };

    let breadcrumbScript = document.getElementById('dynamic-breadcrumb-schema');
    if (!breadcrumbScript) {
      breadcrumbScript = document.createElement('script');
      breadcrumbScript.id = 'dynamic-breadcrumb-schema';
      breadcrumbScript.type = 'application/ld+json';
      document.head.appendChild(breadcrumbScript);
    }
    breadcrumbScript.textContent = JSON.stringify(breadcrumbsSchema);

    // 7. Track Google Analytics SPA Page View
    trackPageView(currentPath, meta.title);

  }, [currentPath]);

  return null;
};
