import { useEffect } from 'react';
import { trackPageView } from '../../utils/analytics';

const BASE_URL = 'https://brixellabs.com';
const DEFAULT_OG_IMAGE = `${BASE_URL}/og-image.jpg`;

export const routeMetadata = {
  '/': {
    title: 'BrixelLabs: Design · Build · Automate | Tech & AI Solutions',
    description: 'Design · Build · Automate. Custom AI models, scalable web & mobile apps, Shopify development, web scraping, and enterprise workflow automation.',
    canonical: `${BASE_URL}/`,
    ogImage: DEFAULT_OG_IMAGE,
    ogType: 'website',
    robots: 'index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1',
    breadcrumbs: [
      { name: 'Home', url: `${BASE_URL}/` }
    ],
    schemaType: 'home'
  },
  '/services': {
    title: 'Custom Software, Web, Mobile & AI Services | BrixelLabs',
    description: 'Explore BrixelLabs engineering services: UI/UX design, full-stack web & mobile apps, custom AI/ML models, computer vision, and workflow automation.',
    canonical: `${BASE_URL}/services`,
    ogImage: DEFAULT_OG_IMAGE,
    ogType: 'website',
    robots: 'index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1',
    breadcrumbs: [
      { name: 'Home', url: `${BASE_URL}/` },
      { name: 'Services', url: `${BASE_URL}/services` }
    ],
    schemaType: 'services'
  },
  '/process': {
    title: 'Our Engineering Process & 4-Stage Agile Framework | BrixelLabs',
    description: 'Discover how BrixelLabs delivers successful digital products: 4-stage agile framework from Discover & Scope to Design, Build, and Launch with 24/7 SLA.',
    canonical: `${BASE_URL}/process`,
    ogImage: DEFAULT_OG_IMAGE,
    ogType: 'website',
    robots: 'index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1',
    breadcrumbs: [
      { name: 'Home', url: `${BASE_URL}/` },
      { name: 'Process', url: `${BASE_URL}/process` }
    ],
    schemaType: 'webpage'
  },
  '/case-studies': {
    title: 'Case Studies & Production AI Deployments | BrixelLabs',
    description: 'Explore verified client case studies: Agentic AI assistants, real-time computer vision defect inspection, parental safety platforms, and predictive e-commerce ML.',
    canonical: `${BASE_URL}/case-studies`,
    ogImage: DEFAULT_OG_IMAGE,
    ogType: 'website',
    robots: 'index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1',
    breadcrumbs: [
      { name: 'Home', url: `${BASE_URL}/` },
      { name: 'Case Studies', url: `${BASE_URL}/case-studies` }
    ],
    schemaType: 'collection'
  },
  '/case-studies/noesis': {
    title: 'Noesis Case Study: AI-Powered Study Assistant | BrixelLabs',
    description: 'Deep dive into Noesis: LangGraph stateful multi-agent system with dual-engine web search, level-adapted study notes, and interactive quizzes with HITL calibration.',
    canonical: `${BASE_URL}/case-studies/noesis`,
    ogImage: DEFAULT_OG_IMAGE,
    ogType: 'article',
    robots: 'index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1',
    breadcrumbs: [
      { name: 'Home', url: `${BASE_URL}/` },
      { name: 'Case Studies', url: `${BASE_URL}/case-studies` },
      { name: 'Noesis', url: `${BASE_URL}/case-studies/noesis` }
    ],
    schemaType: 'article',
    articleHeadline: 'Noesis: Autonomous AI Study & Learning Assistant'
  },
  '/case-studies/neosis': {
    title: 'Noesis Case Study: AI-Powered Study Assistant | BrixelLabs',
    description: 'Deep dive into Noesis: LangGraph stateful multi-agent system with dual-engine web search, level-adapted study notes, and interactive quizzes.',
    canonical: `${BASE_URL}/case-studies/noesis`, // Canonical points to primary slug
    ogImage: DEFAULT_OG_IMAGE,
    ogType: 'article',
    robots: 'index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1',
    breadcrumbs: [
      { name: 'Home', url: `${BASE_URL}/` },
      { name: 'Case Studies', url: `${BASE_URL}/case-studies` },
      { name: 'Noesis', url: `${BASE_URL}/case-studies/noesis` }
    ],
    schemaType: 'article',
    articleHeadline: 'Noesis: Autonomous AI Study & Learning Assistant'
  },
  '/case-studies/the-watcher': {
    title: 'The Watcher Case Study: AI Child Safety Platform | BrixelLabs',
    description: 'Case study on The Watcher: AI-driven parental safety platform with real-time content filtering, zero battery drain, and cross-platform mobile monitoring.',
    canonical: `${BASE_URL}/case-studies/the-watcher`,
    ogImage: DEFAULT_OG_IMAGE,
    ogType: 'article',
    robots: 'index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1',
    breadcrumbs: [
      { name: 'Home', url: `${BASE_URL}/` },
      { name: 'Case Studies', url: `${BASE_URL}/case-studies` },
      { name: 'The Watcher', url: `${BASE_URL}/case-studies/the-watcher` }
    ],
    schemaType: 'article',
    articleHeadline: 'The Watcher: AI-Powered Family Digital Safety'
  },
  '/case-studies/watcher': {
    title: 'The Watcher Case Study: AI Child Safety Platform | BrixelLabs',
    description: 'Case study on The Watcher: AI-driven parental safety platform with real-time content filtering, zero battery drain, and cross-platform mobile monitoring.',
    canonical: `${BASE_URL}/case-studies/the-watcher`, // Canonical points to primary slug
    ogImage: DEFAULT_OG_IMAGE,
    ogType: 'article',
    robots: 'index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1',
    breadcrumbs: [
      { name: 'Home', url: `${BASE_URL}/` },
      { name: 'Case Studies', url: `${BASE_URL}/case-studies` },
      { name: 'The Watcher', url: `${BASE_URL}/case-studies/the-watcher` }
    ],
    schemaType: 'article',
    articleHeadline: 'The Watcher: AI-Powered Family Digital Safety'
  },
  '/case-studies/frontdesk-ai': {
    title: 'FrontDesk AI Case Study: WhatsApp Booking Assistant | BrixelLabs',
    description: 'Smart WhatsApp assistant managing appointment bookings, calendar scheduling, and customer FAQs in Roman Urdu & English with instant response times.',
    canonical: `${BASE_URL}/case-studies/frontdesk-ai`,
    ogImage: DEFAULT_OG_IMAGE,
    ogType: 'article',
    robots: 'index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1',
    breadcrumbs: [
      { name: 'Home', url: `${BASE_URL}/` },
      { name: 'Case Studies', url: `${BASE_URL}/case-studies` },
      { name: 'FrontDesk AI', url: `${BASE_URL}/case-studies/frontdesk-ai` }
    ],
    schemaType: 'article',
    articleHeadline: 'FrontDesk AI: Autonomous WhatsApp Booking Agent'
  },
  '/case-studies/threadeye': {
    title: 'ThreadEye Case Study: Real-Time Fabric Defect Detection | BrixelLabs',
    description: 'Industrial computer vision system powered by YOLOv8 and NVIDIA Jetson edge AI, inspecting textile fabric with 99.8% accuracy at sub-14ms latency.',
    canonical: `${BASE_URL}/case-studies/threadeye`,
    ogImage: DEFAULT_OG_IMAGE,
    ogType: 'article',
    robots: 'index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1',
    breadcrumbs: [
      { name: 'Home', url: `${BASE_URL}/` },
      { name: 'Case Studies', url: `${BASE_URL}/case-studies` },
      { name: 'ThreadEye', url: `${BASE_URL}/case-studies/threadeye` }
    ],
    schemaType: 'article',
    articleHeadline: 'ThreadEye: Real-Time Industrial Fabric Defect Detection'
  },
  '/case-studies/fabric-defect-detection': {
    title: 'ThreadEye Case Study: Industrial Fabric Defect Detection | BrixelLabs',
    description: 'Industrial computer vision system powered by YOLOv8/v9 and TensorRT on NVIDIA Jetson, classifying textile flaws with 99.8% accuracy.',
    canonical: `${BASE_URL}/case-studies/threadeye`, // Canonical points to primary slug
    ogImage: DEFAULT_OG_IMAGE,
    ogType: 'article',
    robots: 'index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1',
    breadcrumbs: [
      { name: 'Home', url: `${BASE_URL}/` },
      { name: 'Case Studies', url: `${BASE_URL}/case-studies` },
      { name: 'ThreadEye', url: `${BASE_URL}/case-studies/threadeye` }
    ],
    schemaType: 'article',
    articleHeadline: 'ThreadEye: Real-Time Industrial Fabric Defect Detection'
  },
  '/case-studies/getscry': {
    title: 'GetScry Case Study: Real-Time Visitor Intent Intelligence | BrixelLabs',
    description: 'Predictive e-commerce AI system using XGBoost and SHAP explainability to predict purchase intent in real time under 35ms.',
    canonical: `${BASE_URL}/case-studies/getscry`,
    ogImage: DEFAULT_OG_IMAGE,
    ogType: 'article',
    robots: 'index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1',
    breadcrumbs: [
      { name: 'Home', url: `${BASE_URL}/` },
      { name: 'Case Studies', url: `${BASE_URL}/case-studies` },
      { name: 'GetScry', url: `${BASE_URL}/case-studies/getscry` }
    ],
    schemaType: 'article',
    articleHeadline: 'GetScry: Real-Time Visitor Intent Intelligence'
  },
  '/about': {
    title: 'About Us & Engineering Team | BrixelLabs',
    description: 'Learn about BrixelLabs: A remote-first engineering studio delivering end-to-end UI/UX, AI, automation, and data pipelines for modern high-growth businesses.',
    canonical: `${BASE_URL}/about`,
    ogImage: DEFAULT_OG_IMAGE,
    ogType: 'website',
    robots: 'index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1',
    breadcrumbs: [
      { name: 'Home', url: `${BASE_URL}/` },
      { name: 'About', url: `${BASE_URL}/about` }
    ],
    schemaType: 'about'
  },
  '/contact': {
    title: 'Contact Us & Schedule Free Consultation | BrixelLabs',
    description: 'Get in touch with BrixelLabs senior engineers for your AI, web development, computer vision, or workflow automation project. 24-hour response time.',
    canonical: `${BASE_URL}/contact`,
    ogImage: DEFAULT_OG_IMAGE,
    ogType: 'website',
    robots: 'index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1',
    breadcrumbs: [
      { name: 'Home', url: `${BASE_URL}/` },
      { name: 'Contact', url: `${BASE_URL}/contact` }
    ],
    schemaType: 'contact'
  },
  '/thank-you': {
    title: 'Thank You: Project Inquiry Received | BrixelLabs',
    description: 'Thank you for reaching out to BrixelLabs. Our senior engineers have received your inquiry and will review your requirements within 24 hours.',
    canonical: `${BASE_URL}/thank-you`,
    ogImage: DEFAULT_OG_IMAGE,
    ogType: 'website',
    robots: 'index, follow', // Changed to index, follow per "Remove no index tags"
    breadcrumbs: [
      { name: 'Home', url: `${BASE_URL}/` },
      { name: 'Thank You', url: `${BASE_URL}/thank-you` }
    ],
    schemaType: 'webpage'
  },
  '/privacy-policy': {
    title: 'Privacy Policy & Data Protection Standards | BrixelLabs',
    description: 'Read the BrixelLabs Privacy Policy: Client data confidentiality guarantees, zero-public-model-training policy, and enterprise encryption standards.',
    canonical: `${BASE_URL}/privacy-policy`,
    ogImage: DEFAULT_OG_IMAGE,
    ogType: 'website',
    robots: 'index, follow',
    breadcrumbs: [
      { name: 'Home', url: `${BASE_URL}/` },
      { name: 'Privacy Policy', url: `${BASE_URL}/privacy-policy` }
    ],
    schemaType: 'webpage'
  },
  '/privacy': {
    title: 'Privacy Policy & Data Protection Standards | BrixelLabs',
    description: 'Read the BrixelLabs Privacy Policy: Client data confidentiality guarantees, zero-public-model-training policy, and enterprise encryption standards.',
    canonical: `${BASE_URL}/privacy-policy`, // Canonical points to primary slug
    ogImage: DEFAULT_OG_IMAGE,
    ogType: 'website',
    robots: 'index, follow',
    breadcrumbs: [
      { name: 'Home', url: `${BASE_URL}/` },
      { name: 'Privacy Policy', url: `${BASE_URL}/privacy-policy` }
    ],
    schemaType: 'webpage'
  },
  '/terms-of-service': {
    title: 'Terms of Service & Engineering Agreement | BrixelLabs',
    description: 'BrixelLabs Terms of Service: Transparent milestone billing, 100% intellectual property ownership transfer, and zero hidden fees.',
    canonical: `${BASE_URL}/terms-of-service`,
    ogImage: DEFAULT_OG_IMAGE,
    ogType: 'website',
    robots: 'index, follow',
    breadcrumbs: [
      { name: 'Home', url: `${BASE_URL}/` },
      { name: 'Terms of Service', url: `${BASE_URL}/terms-of-service` }
    ],
    schemaType: 'webpage'
  },
  '/refund-policy': {
    title: 'Refund & Milestone Cancellation Policy | BrixelLabs',
    description: 'BrixelLabs Refund Policy: 100% full refund prior to sprint kickoff, prorated milestone protections, and zero cancellation penalties.',
    canonical: `${BASE_URL}/refund-policy`,
    ogImage: DEFAULT_OG_IMAGE,
    ogType: 'website',
    robots: 'index, follow',
    breadcrumbs: [
      { name: 'Home', url: `${BASE_URL}/` },
      { name: 'Refund Policy', url: `${BASE_URL}/refund-policy` }
    ],
    schemaType: 'webpage'
  },
  '/cookie-policy': {
    title: 'Cookie Policy & Consent Settings | BrixelLabs',
    description: 'Inspect BrixelLabs cookie usage, zero ad tracking guarantee, and manage your browser consent preferences.',
    canonical: `${BASE_URL}/cookie-policy`,
    ogImage: DEFAULT_OG_IMAGE,
    ogType: 'website',
    robots: 'index, follow',
    breadcrumbs: [
      { name: 'Home', url: `${BASE_URL}/` },
      { name: 'Cookie Policy', url: `${BASE_URL}/cookie-policy` }
    ],
    schemaType: 'webpage'
  },
  '/data-deletion': {
    title: 'Data Deletion Request Portal (GDPR / CCPA) | BrixelLabs',
    description: 'Submit an instant self-service request to permanently delete personal data and records in compliance with GDPR Art. 17 and CCPA.',
    canonical: `${BASE_URL}/data-deletion`,
    ogImage: DEFAULT_OG_IMAGE,
    ogType: 'website',
    robots: 'index, follow',
    breadcrumbs: [
      { name: 'Home', url: `${BASE_URL}/` },
      { name: 'Data Deletion', url: `${BASE_URL}/data-deletion` }
    ],
    schemaType: 'webpage'
  },
  '/unsubscribe': {
    title: 'Email Preferences & Unsubscribe | BrixelLabs',
    description: 'Manage your email preferences or instantly unsubscribe from BrixelLabs engineering updates and newsletters.',
    canonical: `${BASE_URL}/unsubscribe`,
    ogImage: DEFAULT_OG_IMAGE,
    ogType: 'website',
    robots: 'index, follow',
    breadcrumbs: [
      { name: 'Home', url: `${BASE_URL}/` },
      { name: 'Unsubscribe', url: `${BASE_URL}/unsubscribe` }
    ],
    schemaType: 'webpage'
  },
  '/admin': {
    title: 'Admin Command Center | BrixelLabs Portal',
    description: 'Internal operational CRM and consultation dashboard for BrixelLabs administrators.',
    canonical: `${BASE_URL}/admin`,
    ogImage: DEFAULT_OG_IMAGE,
    ogType: 'website',
    robots: 'noindex, nofollow',
    breadcrumbs: [
      { name: 'Home', url: `${BASE_URL}/` },
      { name: 'Admin', url: `${BASE_URL}/admin` }
    ],
    schemaType: 'admin'
  },
  '404': {
    title: '404: Page Not Found | BrixelLabs',
    description: 'The requested system module or route was not found. Return to the BrixelLabs homepage or explore our engineering capabilities.',
    canonical: `${BASE_URL}/`,
    ogImage: DEFAULT_OG_IMAGE,
    ogType: 'website',
    robots: 'noindex, follow',
    breadcrumbs: [
      { name: 'Home', url: `${BASE_URL}/` },
      { name: '404 Not Found', url: `${BASE_URL}/404` }
    ],
    schemaType: 'webpage'
  }
};

const FAQ_ITEMS = [
  {
    question: "What services does BrixelLabs specialize in?",
    answer: "We build custom software, web applications, mobile apps, and practical AI tools. From modern business websites and custom Shopify stores to automated web scrapers and smart AI assistants, we handle the full technical build."
  },
  {
    question: "How do you achieve real-time visual defect detection?",
    answer: "We optimize computer vision models to run at maximum speed directly on local hardware and cameras, detecting objects and flaws in a fraction of a second with zero lag."
  },
  {
    question: "Will our proprietary business data be used to train public AI models?",
    answer: "Never. We guarantee 100% privacy and data security. Your business documents, customer communications, and sensitive company data are strictly private and never used to train external public models."
  },
  {
    question: "What is your typical project delivery timeline and sprint cadence?",
    answer: "Most custom MVPs, conversational bots, and platforms ship within 2 to 6 weeks using 1-week agile sprints with direct Slack access to senior engineers."
  },
  {
    question: "Can you integrate smart AI assistants with WhatsApp or our CRM?",
    answer: "Yes. We build intelligent automated assistants connected to WhatsApp Business, Telegram, CRMs, and databases with instant reply times and human supervisor controls."
  },
  {
    question: "What technology stacks does your team specialize in?",
    answer: "Python (FastAPI, PyTorch), modern JavaScript/TypeScript (React, Next.js, Node), mobile (Flutter, Kotlin), and cloud systems (Docker, AWS, Google Cloud)."
  },
  {
    question: "Do you offer post-launch support and ongoing maintenance?",
    answer: "Every project includes a 30-day warranty with zero-cost bug resolution, plus optional dedicated monthly maintenance covering updates, performance monitoring, and 24/7 support."
  },
  {
    question: "How do we get started and what is the onboarding process?",
    answer: "Schedule a free consultation call. We discuss your technical needs, establish milestone scopes, and begin development within 48 to 72 hours."
  }
];

export const SEOHead = ({ currentPath = '/' }) => {
  useEffect(() => {
    const meta = routeMetadata[currentPath] || routeMetadata['404'] || routeMetadata['/'];
    const canonicalUrl = meta.canonical || `${BASE_URL}${currentPath === '/' ? '' : currentPath}`;

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

    // 2. Update Primary Meta Tags & Robots Directives
    setMetaTag('meta[name="description"]', 'name', 'description', meta.description);
    setMetaTag('meta[name="robots"]', 'name', 'robots', meta.robots || 'index, follow');
    setMetaTag('meta[name="googlebot"]', 'name', 'googlebot', meta.robots || 'index, follow');
    setMetaTag('meta[name="bingbot"]', 'name', 'bingbot', meta.robots || 'index, follow');

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
    setMetaTag('meta[property="og:image"]', 'property', 'og:image', meta.ogImage || DEFAULT_OG_IMAGE);
    setMetaTag('meta[property="og:image:secure_url"]', 'property', 'og:image:secure_url', meta.ogImage || DEFAULT_OG_IMAGE);
    setMetaTag('meta[property="og:image:type"]', 'property', 'og:image:type', 'image/jpeg');
    setMetaTag('meta[property="og:image:width"]', 'property', 'og:image:width', '1200');
    setMetaTag('meta[property="og:image:height"]', 'property', 'og:image:height', '630');
    setMetaTag('meta[property="og:image:alt"]', 'property', 'og:image:alt', 'BrixelLabs: Next-Generation Tech & AI Engineering');
    setMetaTag('meta[property="og:type"]', 'property', 'og:type', meta.ogType || 'website');
    setMetaTag('meta[property="og:site_name"]', 'property', 'og:site_name', 'BrixelLabs');

    // 5. Update Twitter Card Tags
    setMetaTag('meta[name="twitter:card"]', 'name', 'twitter:card', 'summary_large_image');
    setMetaTag('meta[name="twitter:site"]', 'name', 'twitter:site', '@brixellabs');
    setMetaTag('meta[name="twitter:title"]', 'name', 'twitter:title', meta.title);
    setMetaTag('meta[name="twitter:description"]', 'name', 'twitter:description', meta.description);
    setMetaTag('meta[name="twitter:image"]', 'name', 'twitter:image', meta.ogImage || DEFAULT_OG_IMAGE);
    setMetaTag('meta[name="twitter:image:alt"]', 'name', 'twitter:image:alt', 'BrixelLabs: Next-Generation Tech & AI Engineering');

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

    // 7. Dynamic Page-Specific Schema Markup (FAQPage, Article, AboutPage, ContactPage, etc.)
    let pageSpecificSchema = null;

    if (meta.schemaType === 'home' || currentPath === '/') {
      // FAQPage Rich Schema
      pageSpecificSchema = {
        "@context": "https://schema.org",
        "@type": "FAQPage",
        "mainEntity": FAQ_ITEMS.map((faq) => ({
          "@type": "Question",
          "name": faq.question,
          "acceptedAnswer": {
            "@type": "Answer",
            "text": faq.answer
          }
        }))
      };
    } else if (meta.schemaType === 'article') {
      pageSpecificSchema = {
        "@context": "https://schema.org",
        "@type": "TechArticle",
        "headline": meta.articleHeadline || meta.title,
        "description": meta.description,
        "url": canonicalUrl,
        "image": meta.ogImage || DEFAULT_OG_IMAGE,
        "author": {
          "@type": "Person",
          "name": "Shahzaib Ali",
          "jobTitle": "Principal Systems Architect",
          "url": `${BASE_URL}/about`,
          "sameAs": [
            "https://www.linkedin.com/company/brixellabs",
            "https://github.com/brixellabs"
          ]
        },
        "publisher": {
          "@type": "Organization",
          "name": "BrixelLabs",
          "logo": {
            "@type": "ImageObject",
            "url": `${BASE_URL}/assets/logo/logo.png`
          }
        },
        "mainEntityOfPage": {
          "@type": "WebPage",
          "@id": canonicalUrl
        }
      };
    } else if (meta.schemaType === 'about') {
      pageSpecificSchema = {
        "@context": "https://schema.org",
        "@type": "AboutPage",
        "name": meta.title,
        "description": meta.description,
        "url": canonicalUrl,
        "mainEntity": {
          "@type": "Organization",
          "name": "BrixelLabs",
          "url": BASE_URL,
          "founder": {
            "@type": "Person",
            "name": "Shahzaib Ali",
            "jobTitle": "Founder & Principal Systems Architect",
            "url": `${BASE_URL}/about#shahzaib-ali`,
            "sameAs": [
              "https://www.linkedin.com/company/brixellabs",
              "https://github.com/brixellabs"
            ],
            "knowsAbout": ["Distributed Systems", "Full-Stack Web Architecture", "Computer Vision", "Agentic AI", "FastAPI", "React"]
          },
          "employee": [
            {
              "@type": "Person",
              "name": "Danyal Ehsan",
              "jobTitle": "Lead Machine Learning & Data Pipeline Engineer",
              "url": `${BASE_URL}/about#danyal-ehsan`,
              "knowsAbout": ["Web Scraping", "Python", "Data Engineering", "LangGraph", "Predictive ML"]
            },
            {
              "@type": "Person",
              "name": "Sufyan Latif",
              "jobTitle": "Senior Solutions & Frontend Architect",
              "url": `${BASE_URL}/about#sufyan-latif`,
              "knowsAbout": ["React", "Flutter Mobile Development", "UI/UX Engineering", "Core Web Vitals"]
            }
          ]
        }
      };
    } else if (meta.schemaType === 'contact') {
      pageSpecificSchema = {
        "@context": "https://schema.org",
        "@type": "ContactPage",
        "name": meta.title,
        "description": meta.description,
        "url": canonicalUrl,
        "mainEntity": {
          "@id": `${BASE_URL}/#organization`
        }
      };
    }

    let pageSpecificScript = document.getElementById('dynamic-page-specific-schema');
    if (pageSpecificSchema) {
      if (!pageSpecificScript) {
        pageSpecificScript = document.createElement('script');
        pageSpecificScript.id = 'dynamic-page-specific-schema';
        pageSpecificScript.type = 'application/ld+json';
        document.head.appendChild(pageSpecificScript);
      }
      pageSpecificScript.textContent = JSON.stringify(pageSpecificSchema);
    } else if (pageSpecificScript) {
      pageSpecificScript.remove();
    }

    // 8. Track Google Analytics SPA Page View
    trackPageView(currentPath, meta.title);

  }, [currentPath]);

  return null;
};

export default SEOHead;
