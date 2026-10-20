import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const DIST_DIR = path.resolve(__dirname, '../dist');
const BASE_URL = 'https://brixellabs.com';

const ROUTES = [
  {
    path: '/',
    title: 'BrixelLabs: Design · Build · Automate | Tech & AI Solutions',
    description: 'Design · Build · Automate. Custom AI models, scalable web & mobile apps, Shopify store development, web scraping, and enterprise workflow automation.',
    canonical: `${BASE_URL}/`,
    h1: 'Built by Engineers. Driven by Results.',
    content: `
      <main id="main-content">
        <section>
          <h1>Built by Engineers. Driven by Results.</h1>
          <p>BrixelLabs is an independent engineering studio. We architect high-performance web applications, custom Shopify stores, and practical AI systems that drive measurable commercial ROI.</p>
          <nav aria-label="Quick Navigation">
            <a href="/services">Engineering Services</a> |
            <a href="/process">4-Stage Process</a> |
            <a href="/case-studies">Production Case Studies</a> |
            <a href="/about">About Engineering Team</a> |
            <a href="/contact">Schedule Free Consultation</a>
          </nav>
        </section>
        <section>
          <h2>Core Engineering Capabilities</h2>
          <ul>
            <li><strong>AI Engineering & Applied Machine Learning:</strong> Custom neural classification, predictive models, LangGraph agent swarms, and computer vision systems.</li>
            <li><strong>High-Scale Web & Mobile Applications:</strong> React, Next.js, Flutter, and Django microservices with sub-200ms API response times.</li>
            <li><strong>Automated Data Harvesting & Market Intelligence:</strong> Playwright/Scrapy distributed clusters for enterprise web scraping and competitive telemetry.</li>
            <li><strong>Custom Shopify & E-Commerce Engineering:</strong> Liquid theme optimization, headless storefronts, and automated inventory sync.</li>
          </ul>
        </section>
      </main>
    `,
    breadcrumbs: [{ name: 'Home', url: `${BASE_URL}/` }]
  },
  {
    path: '/services',
    title: 'Custom Software, Web, Mobile & AI Services | BrixelLabs',
    description: 'Explore BrixelLabs engineering services: UI/UX design, full-stack web & mobile apps, custom AI/ML models, computer vision, and workflow automation.',
    canonical: `${BASE_URL}/services`,
    h1: 'Engineering Capabilities Built for Commercial Scale',
    content: `
      <main id="main-content">
        <nav aria-label="Breadcrumb">
          <ol>
            <li><a href="/">Home</a></li> /
            <li aria-current="page">Services</li>
          </ol>
        </nav>
        <h1>Engineering Capabilities Built for Commercial Scale</h1>
        <p>From custom predictive machine learning algorithms to sub-14ms computer vision inspection and high-concurrency React web apps, we build durable software that eliminates business bottlenecks.</p>
        <section>
          <h2>Our Specialized Technical Pillars</h2>
          <article>
            <h3>1. Custom AI & Machine Learning Solutions</h3>
            <p>Predictive analytics, continuous retraining pipelines, automated document parsing, and stateful multi-agent systems built with PyTorch, XGBoost, and LangGraph.</p>
          </article>
          <article>
            <h3>2. Full-Stack Web & Cross-Platform Mobile Applications</h3>
            <p>Production-grade architectures using React, Next.js, Tailwind CSS, Flutter, and Django REST/FastAPI backends with 99.99% uptime SLAs.</p>
          </article>
          <article>
            <h3>3. Real-Time Edge Computer Vision</h3>
            <p>Sub-14ms defect detection and object tracking using YOLOv8, YOLOv9, and NVIDIA TensorRT running on edge devices like NVIDIA Jetson Orin.</p>
          </article>
          <article>
            <h3>4. High-Throughput Web Scraping & Data Pipelines</h3>
            <p>Asynchronous scraping clusters with rotating proxy pools, CAPTCHA bypass, and automated PostgreSQL/BigQuery data warehouse loading.</p>
          </article>
        </section>
      </main>
    `,
    breadcrumbs: [{ name: 'Home', url: `${BASE_URL}/` }, { name: 'Services', url: `${BASE_URL}/services` }]
  },
  {
    path: '/process',
    title: 'Our Engineering Process & 4-Stage Agile Framework | BrixelLabs',
    description: 'Discover how BrixelLabs delivers successful digital products: 4-stage agile framework from Discover & Scope to Design, Build, and Launch with 24/7 SLA.',
    canonical: `${BASE_URL}/process`,
    h1: 'Our 4-Stage Agile Engineering Framework',
    content: `
      <main id="main-content">
        <nav aria-label="Breadcrumb">
          <ol>
            <li><a href="/">Home</a></li> /
            <li aria-current="page">Process</li>
          </ol>
        </nav>
        <h1>Our 4-Stage Agile Engineering Framework</h1>
        <p>We eliminate agency bloat and delivery delays with a transparent 4-stage development process: Discover & Scope, Design Architecture, Build in Sprints, and Launch with 30-Day Warranty.</p>
      </main>
    `,
    breadcrumbs: [{ name: 'Home', url: `${BASE_URL}/` }, { name: 'Process', url: `${BASE_URL}/process` }]
  },
  {
    path: '/case-studies',
    title: 'Case Studies & Production AI Deployments | BrixelLabs',
    description: 'Explore verified client case studies: Agentic AI assistants, real-time computer vision defect inspection, parental safety platforms, and predictive e-commerce ML.',
    canonical: `${BASE_URL}/case-studies`,
    h1: 'Verified Production Deployments & Case Studies',
    content: `
      <main id="main-content">
        <nav aria-label="Breadcrumb">
          <ol>
            <li><a href="/">Home</a></li> /
            <li aria-current="page">Case Studies</li>
          </ol>
        </nav>
        <h1>Verified Production Deployments & Case Studies</h1>
        <p>Explore real-world case studies demonstrating how BrixelLabs engineers and deploys high-scale AI, computer vision, and distributed software systems.</p>
        <ul>
          <li><a href="/case-studies/noesis">Noesis: Multi-Agent AI Study Assistant</a></li>
          <li><a href="/case-studies/the-watcher">The Watcher: AI Child Safety & Real-Time Content Filter</a></li>
          <li><a href="/case-studies/frontdesk-ai">FrontDesk AI: Autonomous WhatsApp Booking Bot</a></li>
          <li><a href="/case-studies/threadeye">ThreadEye: Industrial Real-Time Fabric Defect Inspection (99.8% Accuracy)</a></li>
          <li><a href="/case-studies/getscry">GetScry: Real-Time Visitor Intent Intelligence & Purchase Prediction</a></li>
        </ul>
      </main>
    `,
    breadcrumbs: [{ name: 'Home', url: `${BASE_URL}/` }, { name: 'Case Studies', url: `${BASE_URL}/case-studies` }]
  },
  {
    path: '/case-studies/noesis',
    title: 'Noesis Case Study: AI-Powered Study Assistant | BrixelLabs',
    description: 'Deep dive into Noesis: LangGraph stateful multi-agent system with dual-engine web search, level-adapted study notes, and interactive quizzes with HITL calibration.',
    canonical: `${BASE_URL}/case-studies/noesis`,
    h1: 'Noesis: Autonomous AI Study & Learning Assistant',
    content: `
      <main id="main-content">
        <nav aria-label="Breadcrumb">
          <ol>
            <li><a href="/">Home</a></li> /
            <li><a href="/case-studies">Case Studies</a></li> /
            <li aria-current="page">Noesis</li>
          </ol>
        </nav>
        <h1>Noesis: Autonomous AI Study & Learning Assistant</h1>
        <p>A multi-agent autonomous learning platform using LangGraph stateful swarms, Tavily + DuckDuckGo dual-engine search, and adaptive flashcard generation for over 50,000 active students.</p>
      </main>
    `,
    breadcrumbs: [{ name: 'Home', url: `${BASE_URL}/` }, { name: 'Case Studies', url: `${BASE_URL}/case-studies` }, { name: 'Noesis', url: `${BASE_URL}/case-studies/noesis` }]
  },
  {
    path: '/case-studies/the-watcher',
    title: 'The Watcher Case Study: AI Child Safety Platform | BrixelLabs',
    description: 'Case study on The Watcher: AI-driven parental safety platform with real-time content filtering, zero battery drain, and cross-platform mobile monitoring.',
    canonical: `${BASE_URL}/case-studies/the-watcher`,
    h1: 'The Watcher: AI-Powered Family Digital Safety',
    content: `
      <main id="main-content">
        <nav aria-label="Breadcrumb">
          <ol>
            <li><a href="/">Home</a></li> /
            <li><a href="/case-studies">Case Studies</a></li> /
            <li aria-current="page">The Watcher</li>
          </ol>
        </nav>
        <h1>The Watcher: AI-Powered Family Digital Safety</h1>
        <p>Real-time on-device content filtering and anomaly detection for Flutter mobile apps, analyzing outgoing/incoming media with sub-50ms latency and zero server-side storage of private media.</p>
      </main>
    `,
    breadcrumbs: [{ name: 'Home', url: `${BASE_URL}/` }, { name: 'Case Studies', url: `${BASE_URL}/case-studies` }, { name: 'The Watcher', url: `${BASE_URL}/case-studies/the-watcher` }]
  },
  {
    path: '/case-studies/frontdesk-ai',
    title: 'FrontDesk AI Case Study: WhatsApp Booking Assistant | BrixelLabs',
    description: 'Smart WhatsApp assistant managing appointment bookings, calendar scheduling, and customer FAQs in Roman Urdu & English with instant response times.',
    canonical: `${BASE_URL}/case-studies/frontdesk-ai`,
    h1: 'FrontDesk AI: Autonomous WhatsApp Booking Agent',
    content: `
      <main id="main-content">
        <nav aria-label="Breadcrumb">
          <ol>
            <li><a href="/">Home</a></li> /
            <li><a href="/case-studies">Case Studies</a></li> /
            <li aria-current="page">FrontDesk AI</li>
          </ol>
        </nav>
        <h1>FrontDesk AI: Autonomous WhatsApp Booking Agent</h1>
        <p>Enterprise WhatsApp Business Cloud API integration using FastAPI and Claude 3.5 Sonnet to schedule clinic appointments, manage cancellations, and sync real-time Google Calendar bookings.</p>
      </main>
    `,
    breadcrumbs: [{ name: 'Home', url: `${BASE_URL}/` }, { name: 'Case Studies', url: `${BASE_URL}/case-studies` }, { name: 'FrontDesk AI', url: `${BASE_URL}/case-studies/frontdesk-ai` }]
  },
  {
    path: '/case-studies/threadeye',
    title: 'ThreadEye Case Study: Real-Time Fabric Defect Detection | BrixelLabs',
    description: 'Industrial computer vision system powered by YOLOv8 and NVIDIA Jetson edge AI, inspecting textile fabric with 99.8% accuracy at sub-14ms latency.',
    canonical: `${BASE_URL}/case-studies/threadeye`,
    h1: 'ThreadEye: Real-Time Industrial Fabric Defect Detection',
    content: `
      <main id="main-content">
        <nav aria-label="Breadcrumb">
          <ol>
            <li><a href="/">Home</a></li> /
            <li><a href="/case-studies">Case Studies</a></li> /
            <li aria-current="page">ThreadEye</li>
          </ol>
        </nav>
        <h1>ThreadEye: Real-Time Industrial Fabric Defect Detection</h1>
        <p>NVIDIA Jetson edge deployment utilizing custom-trained YOLOv8 instance segmentation to detect weaving holes, oil stains, and mispicks at 45 meters per minute with 99.8% precision.</p>
      </main>
    `,
    breadcrumbs: [{ name: 'Home', url: `${BASE_URL}/` }, { name: 'Case Studies', url: `${BASE_URL}/case-studies` }, { name: 'ThreadEye', url: `${BASE_URL}/case-studies/threadeye` }]
  },
  {
    path: '/case-studies/getscry',
    title: 'GetScry Case Study: Real-Time Visitor Intent Intelligence | BrixelLabs',
    description: 'Predictive e-commerce AI system using XGBoost and SHAP explainability to predict purchase intent in real time under 35ms.',
    canonical: `${BASE_URL}/case-studies/getscry`,
    h1: 'GetScry: Real-Time Visitor Intent Intelligence',
    content: `
      <main id="main-content">
        <nav aria-label="Breadcrumb">
          <ol>
            <li><a href="/">Home</a></li> /
            <li><a href="/case-studies">Case Studies</a></li> /
            <li aria-current="page">GetScry</li>
          </ol>
        </nav>
        <h1>GetScry: Real-Time Visitor Intent Intelligence</h1>
        <p>High-speed e-commerce visitor telemetry pipeline processing clickstream events into sub-35ms purchase propensity scores with live dynamic discount triggers.</p>
      </main>
    `,
    breadcrumbs: [{ name: 'Home', url: `${BASE_URL}/` }, { name: 'Case Studies', url: `${BASE_URL}/case-studies` }, { name: 'GetScry', url: `${BASE_URL}/case-studies/getscry` }]
  },
  {
    path: '/about',
    title: 'About Us & Engineering Team | BrixelLabs',
    description: 'Learn about BrixelLabs: A remote-first engineering studio delivering end-to-end UI/UX, AI, automation, and data pipelines for modern high-growth businesses.',
    canonical: `${BASE_URL}/about`,
    h1: 'Engineering Studio Built by Systems Architects',
    content: `
      <main id="main-content">
        <nav aria-label="Breadcrumb">
          <ol>
            <li><a href="/">Home</a></li> /
            <li aria-current="page">About Us</li>
          </ol>
        </nav>
        <h1>Engineering Studio Built by Systems Architects</h1>
        <p>BrixelLabs is an independent engineering studio founded by experienced systems architects. We build production-ready digital products with 100% intellectual property ownership transferred to clients on day one.</p>
      </main>
    `,
    breadcrumbs: [{ name: 'Home', url: `${BASE_URL}/` }, { name: 'About', url: `${BASE_URL}/about` }]
  },
  {
    path: '/contact',
    title: 'Contact Us & Schedule Free Consultation | BrixelLabs',
    description: 'Get in touch with BrixelLabs senior engineers for your AI, web development, computer vision, or workflow automation project. 24-hour response time.',
    canonical: `${BASE_URL}/contact`,
    h1: 'Contact Our Senior Engineering Team',
    content: `
      <main id="main-content">
        <nav aria-label="Breadcrumb">
          <ol>
            <li><a href="/">Home</a></li> /
            <li aria-current="page">Contact</li>
          </ol>
        </nav>
        <h1>Contact Our Senior Engineering Team</h1>
        <p>Schedule a technical discovery call with our senior engineering leads. We review requirements, design architecture options, and deliver scoping estimates within 24 hours.</p>
        <p>Direct Email: <a href="mailto:brixellabs@gmail.com">brixellabs@gmail.com</a> | WhatsApp: +92 344 9254864</p>
      </main>
    `,
    breadcrumbs: [{ name: 'Home', url: `${BASE_URL}/` }, { name: 'Contact', url: `${BASE_URL}/contact` }]
  },
  {
    path: '/privacy-policy',
    title: 'Privacy Policy & Data Protection Standards | BrixelLabs',
    description: 'Read the BrixelLabs Privacy Policy: Client data confidentiality guarantees, zero-public-model-training policy, and enterprise encryption standards.',
    canonical: `${BASE_URL}/privacy-policy`,
    h1: 'Privacy Policy & Enterprise Data Protection',
    content: `
      <main id="main-content">
        <nav aria-label="Breadcrumb">
          <ol>
            <li><a href="/">Home</a></li> /
            <li aria-current="page">Privacy Policy</li>
          </ol>
        </nav>
        <h1>Privacy Policy & Enterprise Data Protection</h1>
        <p>BrixelLabs enforces strict privacy protections: client data is never used to train public AI models, all data in transit and at rest is AES-256 encrypted, and we fully comply with GDPR and CCPA regulations.</p>
      </main>
    `,
    breadcrumbs: [{ name: 'Home', url: `${BASE_URL}/` }, { name: 'Privacy Policy', url: `${BASE_URL}/privacy-policy` }]
  },
  {
    path: '/terms-of-service',
    title: 'Terms of Service & Engineering Agreement | BrixelLabs',
    description: 'BrixelLabs Terms of Service: Transparent milestone billing, 100% intellectual property ownership transfer, and zero hidden fees.',
    canonical: `${BASE_URL}/terms-of-service`,
    h1: 'Terms of Service & Engineering Agreement',
    content: `
      <main id="main-content">
        <nav aria-label="Breadcrumb">
          <ol>
            <li><a href="/">Home</a></li> /
            <li aria-current="page">Terms of Service</li>
          </ol>
        </nav>
        <h1>Terms of Service & Engineering Agreement</h1>
        <p>Our client terms guarantee 100% intellectual property ownership transfer upon milestone delivery, sprint-based milestone approvals, and transparent milestone fee structures with zero hidden costs.</p>
      </main>
    `,
    breadcrumbs: [{ name: 'Home', url: `${BASE_URL}/` }, { name: 'Terms of Service', url: `${BASE_URL}/terms-of-service` }]
  },
  {
    path: '/refund-policy',
    title: 'Refund & Milestone Cancellation Policy | BrixelLabs',
    description: 'BrixelLabs Refund Policy: 100% full refund prior to sprint kickoff, prorated milestone protections, and zero cancellation penalties.',
    canonical: `${BASE_URL}/refund-policy`,
    h1: 'Refund & Milestone Cancellation Policy',
    content: `
      <main id="main-content">
        <nav aria-label="Breadcrumb">
          <ol>
            <li><a href="/">Home</a></li> /
            <li aria-current="page">Refund Policy</li>
          </ol>
        </nav>
        <h1>Refund & Milestone Cancellation Policy</h1>
        <p>100% full refund available prior to sprint kickoff. Fair prorated milestone billing with zero hidden cancellation penalties.</p>
      </main>
    `,
    breadcrumbs: [{ name: 'Home', url: `${BASE_URL}/` }, { name: 'Refund Policy', url: `${BASE_URL}/refund-policy` }]
  },
  {
    path: '/cookie-policy',
    title: 'Cookie Policy & Consent Settings | BrixelLabs',
    description: 'Inspect BrixelLabs cookie usage, zero ad tracking guarantee, and manage your browser consent preferences.',
    canonical: `${BASE_URL}/cookie-policy`,
    h1: 'Cookie Policy & Consent Controls',
    content: `
      <main id="main-content">
        <nav aria-label="Breadcrumb">
          <ol>
            <li><a href="/">Home</a></li> /
            <li aria-current="page">Cookie Policy</li>
          </ol>
        </nav>
        <h1>Cookie Policy & Consent Controls</h1>
        <p>We do not deploy third-party advertising trackers or sell browsing data. Inspect functional cookies and manage your consent preferences at any time.</p>
      </main>
    `,
    breadcrumbs: [{ name: 'Home', url: `${BASE_URL}/` }, { name: 'Cookie Policy', url: `${BASE_URL}/cookie-policy` }]
  },
  {
    path: '/data-deletion',
    title: 'Data Deletion Request Portal (GDPR / CCPA) | BrixelLabs',
    description: 'Submit an instant self-service request to permanently delete personal data and records in compliance with GDPR Art. 17 and CCPA.',
    canonical: `${BASE_URL}/data-deletion`,
    h1: 'Self-Service Data Deletion Portal',
    content: `
      <main id="main-content">
        <nav aria-label="Breadcrumb">
          <ol>
            <li><a href="/">Home</a></li> /
            <li aria-current="page">Data Deletion</li>
          </ol>
        </nav>
        <h1>Self-Service Data Deletion Portal</h1>
        <p>Submit a formal data erasure request under GDPR Article 17 and CCPA. All corresponding records, communication history, and associated logs are purged within 30 days.</p>
      </main>
    `,
    breadcrumbs: [{ name: 'Home', url: `${BASE_URL}/` }, { name: 'Data Deletion', url: `${BASE_URL}/data-deletion` }]
  },
  {
    path: '/unsubscribe',
    title: 'Email Preferences & Unsubscribe | BrixelLabs',
    description: 'Manage your email preferences or instantly unsubscribe from BrixelLabs engineering updates and newsletters.',
    canonical: `${BASE_URL}/unsubscribe`,
    h1: 'Email Preferences & One-Click Unsubscribe',
    content: `
      <main id="main-content">
        <nav aria-label="Breadcrumb">
          <ol>
            <li><a href="/">Home</a></li> /
            <li aria-current="page">Unsubscribe</li>
          </ol>
        </nav>
        <h1>Email Preferences & One-Click Unsubscribe</h1>
        <p>Opt out of technical newsletters, case study briefings, or product updates with one click. Your email will be removed instantly.</p>
      </main>
    `,
    breadcrumbs: [{ name: 'Home', url: `${BASE_URL}/` }, { name: 'Unsubscribe', url: `${BASE_URL}/unsubscribe` }]
  },
  {
    path: '/thank-you',
    title: 'Inquiry Received | BrixelLabs',
    description: 'Thank you for reaching out to BrixelLabs. Our senior engineering leads will review your inquiry and connect within 24 hours.',
    canonical: `${BASE_URL}/thank-you`,
    h1: 'Inquiry Received & Logged',
    content: `
      <main id="main-content">
        <nav aria-label="Breadcrumb">
          <ol>
            <li><a href="/">Home</a></li> /
            <li aria-current="page">Thank You</li>
          </ol>
        </nav>
        <h1>Inquiry Received & Logged</h1>
        <p>Thank you for submitting your project inquiry. One of our senior engineering leads will review your architecture requirements and contact you within 24 hours.</p>
        <p>Need urgent technical assistance? Call <a href="tel:+923449254864">+92 344 9254864</a> or message us on WhatsApp.</p>
      </main>
    `,
    breadcrumbs: [{ name: 'Home', url: `${BASE_URL}/` }, { name: 'Thank You', url: `${BASE_URL}/thank-you` }]
  }
];

function prerender() {
  const templatePath = path.join(DIST_DIR, 'index.html');
  if (!fs.existsSync(templatePath)) {
    console.error('Error: dist/index.html not found! Run "npm run build" first.');
    process.exit(1);
  }

  const baseHtml = fs.readFileSync(templatePath, 'utf-8');
  console.log(`Starting SSG Pre-rendering for ${ROUTES.length} routes...`);

  ROUTES.forEach(route => {
    let html = baseHtml;

    // 1. Replace Title Tag
    html = html.replace(/<title>.*?<\/title>/s, `<title>${route.title}</title>`);

    // 2. Replace Meta Description
    html = html.replace(
      /<meta\s+name=["']description["']\s+content=["'][^"']*["']\s*\/?>/i,
      `<meta name="description" content="${route.description}" />`
    );

    // 3. Replace Canonical Link
    html = html.replace(
      /<link\s+rel=["']canonical["']\s+href=["'][^"']*["']\s*\/?>/i,
      `<link rel="canonical" href="${route.canonical}" />`
    );

    // 4. Update Open Graph Title & Description & URL
    html = html.replace(
      /<meta\s+property=["']og:title["']\s+content=["'][^"']*["']\s*\/?>/i,
      `<meta property="og:title" content="${route.title}" />`
    );
    html = html.replace(
      /<meta\s+property=["']og:description["']\s+content=["'][^"']*["']\s*\/?>/i,
      `<meta property="og:description" content="${route.description}" />`
    );
    html = html.replace(
      /<meta\s+property=["']og:url["']\s+content=["'][^"']*["']\s*\/?>/i,
      `<meta property="og:url" content="${route.canonical}" />`
    );

    // 5. Update Twitter Title & Description
    html = html.replace(
      /<meta\s+name=["']twitter:title["']\s+content=["'][^"']*["']\s*\/?>/i,
      `<meta name="twitter:title" content="${route.title}" />`
    );
    html = html.replace(
      /<meta\s+name=["']twitter:description["']\s+content=["'][^"']*["']\s*\/?>/i,
      `<meta name="twitter:description" content="${route.description}" />`
    );

    // 6. Ensure index, follow robots directive
    html = html.replace(
      /<meta\s+name=["']robots["']\s+content=["'][^"']*["']\s*\/?>/i,
      `<meta name="robots" content="index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1" />`
    );

    // 7. Inject Breadcrumbs Schema
    const breadcrumbsJson = JSON.stringify({
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      "itemListElement": route.breadcrumbs.map((b, idx) => ({
        "@type": "ListItem",
        "position": idx + 1,
        "name": b.name,
        "item": b.url
      }))
    });

    const breadcrumbsScript = `<script type="application/ld+json" id="static-breadcrumb-schema">${breadcrumbsJson}</script>`;
    html = html.replace('</head>', `  ${breadcrumbsScript}\n</head>`);

    // 8. Inject Server-Side Semantic HTML inside #root
    html = html.replace('<div id="root"></div>', `<div id="root">${route.content}</div>`);

    // Write file
    let targetDir = DIST_DIR;
    if (route.path !== '/') {
      targetDir = path.join(DIST_DIR, route.path.replace(/^\//, ''));
      if (!fs.existsSync(targetDir)) {
        fs.mkdirSync(targetDir, { recursive: true });
      }
    }

    const targetFile = path.join(targetDir, 'index.html');
    fs.writeFileSync(targetFile, html, 'utf-8');
    console.log(`Pre-rendered route [${route.path}] -> ${path.relative(DIST_DIR, targetFile)}`);
  });

  console.log(`SSG Pre-rendering completed successfully for all ${ROUTES.length} routes!`);
}

prerender();
