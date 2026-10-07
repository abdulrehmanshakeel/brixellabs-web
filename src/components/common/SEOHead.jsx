import { useEffect } from 'react';

const routeMetadata = {
  '/': {
    title: 'BrixelLabs — Design · Build · Automate | Tech & AI Solutions',
    description: 'Design · Build · Automate. Custom AI models, scalable web/mobile apps, computer vision under 14ms latency, and enterprise workflow automation.',
    ogImage: 'https://brixellabs.com/og-image.jpg',
    ogType: 'website',
    breadcrumbs: [
      { name: 'Home', url: 'https://brixellabs.com/' }
    ]
  },
  '/services': {
    title: 'Services & Engineering Capabilities | BrixelLabs',
    description: 'Full-spectrum technology solutions: UI/UX Design, Full-Stack Web Development, Mobile Apps, Custom AI & ML, NLP WhatsApp Chatbots, Computer Vision, and Data Analytics.',
    ogImage: 'https://brixellabs.com/og-image.jpg',
    ogType: 'website',
    breadcrumbs: [
      { name: 'Home', url: 'https://brixellabs.com/' },
      { name: 'Services', url: 'https://brixellabs.com/services' }
    ]
  },
  '/process': {
    title: 'Our Engineering Process & Execution Roadmap | BrixelLabs',
    description: 'Discover how BrixelLabs delivers successful digital products: 4-stage agile framework from Discover & Scope to Design, Build, and Launch with 24/7 SLA.',
    ogImage: 'https://brixellabs.com/og-image.jpg',
    ogType: 'website',
    breadcrumbs: [
      { name: 'Home', url: 'https://brixellabs.com/' },
      { name: 'Process', url: 'https://brixellabs.com/process' }
    ]
  },
  '/case-studies': {
    title: 'Case Studies & Production AI Deployments | BrixelLabs',
    description: 'Explore verified client case studies: Agentic AI assistants, real-time computer vision defect inspection, parental safety platforms, and predictive e-commerce ML.',
    ogImage: 'https://brixellabs.com/og-image.jpg',
    ogType: 'website',
    breadcrumbs: [
      { name: 'Home', url: 'https://brixellabs.com/' },
      { name: 'Case Studies', url: 'https://brixellabs.com/case-studies' }
    ]
  },
  '/case-studies/noesis': {
    title: 'Noesis Case Study — AI-Powered Study Assistant | BrixelLabs',
    description: 'Deep dive into Noesis: LangGraph stateful multi-agent system with dual-engine web search, level-adapted study notes, and interactive quizzes with HITL calibration.',
    ogImage: 'https://brixellabs.com/og-image.jpg',
    ogType: 'article',
    breadcrumbs: [
      { name: 'Home', url: 'https://brixellabs.com/' },
      { name: 'Case Studies', url: 'https://brixellabs.com/case-studies' },
      { name: 'Noesis', url: 'https://brixellabs.com/case-studies/noesis' }
    ]
  },
  '/case-studies/neosis': {
    title: 'Noesis Case Study — AI-Powered Study Assistant | BrixelLabs',
    description: 'Deep dive into Noesis: LangGraph stateful multi-agent system with dual-engine web search, level-adapted study notes, and interactive quizzes.',
    ogImage: 'https://brixellabs.com/og-image.jpg',
    ogType: 'article',
    breadcrumbs: [
      { name: 'Home', url: 'https://brixellabs.com/' },
      { name: 'Case Studies', url: 'https://brixellabs.com/case-studies' },
      { name: 'Noesis', url: 'https://brixellabs.com/case-studies/noesis' }
    ]
  },
  '/case-studies/the-watcher': {
    title: 'The Watcher Case Study — AI Child Safety Platform | BrixelLabs',
    description: 'Autonomous child protection platform combining real-time machine learning activity classification with LangGraph agentic reasoning across Flutter & Kotlin.',
    ogImage: 'https://brixellabs.com/og-image.jpg',
    ogType: 'article',
    breadcrumbs: [
      { name: 'Home', url: 'https://brixellabs.com/' },
      { name: 'Case Studies', url: 'https://brixellabs.com/case-studies' },
      { name: 'The Watcher', url: 'https://brixellabs.com/case-studies/the-watcher' }
    ]
  },
  '/case-studies/frontdesk-ai': {
    title: 'FrontDesk AI Case Study — Autonomous WhatsApp Booking Bot | BrixelLabs',
    description: 'Conversational agent managing appointment bookings, calendar negotiation, and customer FAQs in Roman Urdu & English with sub-0.8s response latency.',
    ogImage: 'https://brixellabs.com/og-image.jpg',
    ogType: 'article',
    breadcrumbs: [
      { name: 'Home', url: 'https://brixellabs.com/' },
      { name: 'Case Studies', url: 'https://brixellabs.com/case-studies' },
      { name: 'FrontDesk AI', url: 'https://brixellabs.com/case-studies/frontdesk-ai' }
    ]
  },
  '/case-studies/threadeye': {
    title: 'ThreadEye Case Study — Fabric Defect Detection Under 14ms | BrixelLabs',
    description: 'Industrial computer vision system powered by YOLOv8/v9 and TensorRT on NVIDIA Jetson, classifying textile flaws with 99.8% accuracy.',
    ogImage: 'https://brixellabs.com/og-image.jpg',
    ogType: 'article',
    breadcrumbs: [
      { name: 'Home', url: 'https://brixellabs.com/' },
      { name: 'Case Studies', url: 'https://brixellabs.com/case-studies' },
      { name: 'ThreadEye', url: 'https://brixellabs.com/case-studies/threadeye' }
    ]
  },
  '/case-studies/fabric-defect-detection': {
    title: 'ThreadEye Case Study — Fabric Defect Detection Under 14ms | BrixelLabs',
    description: 'Industrial computer vision system powered by YOLOv8/v9 and TensorRT on NVIDIA Jetson, classifying textile flaws with 99.8% accuracy.',
    ogImage: 'https://brixellabs.com/og-image.jpg',
    ogType: 'article',
    breadcrumbs: [
      { name: 'Home', url: 'https://brixellabs.com/' },
      { name: 'Case Studies', url: 'https://brixellabs.com/case-studies' },
      { name: 'ThreadEye', url: 'https://brixellabs.com/case-studies/threadeye' }
    ]
  },
  '/case-studies/getscry': {
    title: 'GetScry Case Study — Real-Time Visitor Intent Intelligence | BrixelLabs',
    description: 'Predictive e-commerce AI system using XGBoost and SHAP explainability to predict purchase intent in real time under 35ms.',
    ogImage: 'https://brixellabs.com/og-image.jpg',
    ogType: 'article',
    breadcrumbs: [
      { name: 'Home', url: 'https://brixellabs.com/' },
      { name: 'Case Studies', url: 'https://brixellabs.com/case-studies' },
      { name: 'GetScry', url: 'https://brixellabs.com/case-studies/getscry' }
    ]
  },
  '/about': {
    title: 'About Us & Engineering Team | BrixelLabs',
    description: 'Learn about BrixelLabs: A remote-first engineering studio delivering end-to-end UI/UX, AI, automation, and data pipelines for modern high-growth businesses.',
    ogImage: 'https://brixellabs.com/og-image.jpg',
    ogType: 'website',
    breadcrumbs: [
      { name: 'Home', url: 'https://brixellabs.com/' },
      { name: 'About', url: 'https://brixellabs.com/about' }
    ]
  },
  '/contact': {
    title: 'Contact Us & Schedule Free Consultation | BrixelLabs',
    description: 'Get in touch with BrixelLabs senior engineers for your AI, web development, computer vision, or workflow automation project. 24-hour response time.',
    ogImage: 'https://brixellabs.com/og-image.jpg',
    ogType: 'website',
    breadcrumbs: [
      { name: 'Home', url: 'https://brixellabs.com/' },
      { name: 'Contact', url: 'https://brixellabs.com/contact' }
    ]
  },
  '/admin': {
    title: 'Admin Command Center | BrixelLabs Portal',
    description: 'Internal operational CRM and consultation dashboard for BrixelLabs administrators.',
    ogImage: 'https://brixellabs.com/og-image.jpg',
    ogType: 'website',
    breadcrumbs: [
      { name: 'Home', url: 'https://brixellabs.com/' },
      { name: 'Admin', url: 'https://brixellabs.com/admin' }
    ]
  }
};

export const SEOHead = ({ currentPath = '/' }) => {
  useEffect(() => {
    const meta = routeMetadata[currentPath] || routeMetadata['/'];
    const canonicalUrl = `https://brixellabs.com${currentPath === '/' ? '' : currentPath}`;

    // Update document title
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

    // Update primary meta description
    setMetaTag('meta[name="description"]', 'name', 'description', meta.description);

    // Update Canonical link
    let canonicalTag = document.querySelector('link[rel="canonical"]');
    if (!canonicalTag) {
      canonicalTag = document.createElement('link');
      canonicalTag.setAttribute('rel', 'canonical');
      document.head.appendChild(canonicalTag);
    }
    canonicalTag.setAttribute('href', canonicalUrl);

    // Update Open Graph tags
    setMetaTag('meta[property="og:title"]', 'property', 'og:title', meta.title);
    setMetaTag('meta[property="og:description"]', 'property', 'og:description', meta.description);
    setMetaTag('meta[property="og:url"]', 'property', 'og:url', canonicalUrl);
    setMetaTag('meta[property="og:image"]', 'property', 'og:image', meta.ogImage);
    setMetaTag('meta[property="og:type"]', 'property', 'og:type', meta.ogType);

    // Update Twitter tags
    setMetaTag('meta[name="twitter:title"]', 'name', 'twitter:title', meta.title);
    setMetaTag('meta[name="twitter:description"]', 'name', 'twitter:description', meta.description);
    setMetaTag('meta[name="twitter:image"]', 'name', 'twitter:image', meta.ogImage);

    // Inject / Update Dynamic Breadcrumbs JSON-LD Schema
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

  }, [currentPath]);

  return null;
};
