import {
  UIUXIcon,
  WebDevIcon,
  MobileDevIcon,
  AIMLIcon,
  NLPIcon,
  ComputerVisionIcon,
  AgenticAIIcon,
  DataAnalyticsIcon,
  ShopifyDevIcon,
  WebScrapingIcon,
  APIDevIcon,
  CustomSoftwareIcon
} from '../assets/icons';

export const SERVICES_DATA = {
  'shopify-development': {
    slug: 'shopify-development',
    id: 'shopify-development',
    shortTitle: 'Shopify Development',
    title: 'Custom Shopify Development & E-Commerce Engineering',
    metaTitle: 'Custom Shopify Development & E-Commerce Engineering | BrixelLabs',
    metaDescription: 'High-converting custom Shopify stores, Liquid theme engineering, headless Hydrogen commerce, sub-second load times, and custom checkout apps.',
    category: 'Design & Full-Stack Development',
    icon: ShopifyDevIcon,
    heroBadge: 'Certified Shopify Theme & App Specialists',
    tagline: 'Custom Liquid Themes, Headless Hydrogen, Sub-Second Speeds & Maximized Conversion Rates',
    overview: 'Generic Shopify templates and bloated app stacks slow down your storefront, kill mobile conversions, and inflate monthly SaaS costs. BrixelLabs engineers high-performance, bespoke Shopify stores built from scratch with clean Liquid code, custom checkout extensions, and seamless third-party ERP/CRM integrations.',
    metrics: [
      { label: 'Mobile Page Speed', value: '<0.8s', hint: 'Core Web Vitals Pass' },
      { label: 'Conversion Lift', value: '+34%', hint: 'A/B Tested Architecture' },
      { label: 'App Bloat Reduction', value: '70%', hint: 'Native Feature Builds' }
    ],
    theProblem: {
      headline: 'The Pitfall: Bloated Off-the-Shelf Themes & Slow Load Times',
      description: 'Most online retailers install heavy marketplace themes bundled with 25+ third-party apps. Each app injects render-blocking JavaScript and conflicting CSS, causing your store to fail Google Core Web Vitals and leak potential customers before pages even finish loading.',
      points: [
        { title: 'Excessive App Script Bloat', desc: 'Dozens of tracking and UI scripts battling in the browser, driving bounce rates over 65%.' },
        { title: 'Cookie-Cutter Storefronts', desc: 'Identical layouts that fail to establish brand premium or differentiate product offerings.' },
        { title: 'Fragmented Checkout & Inventory Sync', desc: 'Failed API webhooks leading to inventory overselling and broken order routing.' }
      ]
    },
    ourSolution: {
      headline: 'Our Engineering Approach: Tailored Code, Headless Speed, Zero Waste',
      description: 'We build Shopify storefronts the way enterprise software should be built: modular Liquid components, atomic Tailwind CSS styling, native Storefront GraphQL API queries, and serverless backend workers for automated fulfillment.',
      points: [
        { title: 'Ultra-Clean Custom Liquid Themes', desc: 'Coded from scratch with zero dependency bloat, ensuring instant first contentful paints.' },
        { title: 'Custom Shopify Functions & Apps', desc: 'Native discount rules, custom bundles, and shipping calculations built via Shopify CLI.' },
        { title: 'Headless E-Commerce Architecture', desc: 'Next.js and Hydrogen frontends connected to Shopify backends for maximum speed.' }
      ]
    },
    capabilities: [
      {
        title: 'Bespoke Liquid Theme Engineering',
        desc: 'Pixel-perfect, responsive Liquid themes built specifically around your brand identity with custom dynamic sections and zero bloated third-party dependencies.'
      },
      {
        title: 'Headless Shopify (Hydrogen & Next.js)',
        desc: 'Decoupled frontend architectures powered by Shopify Storefront API, React, and Next.js for sub-200ms page transitions and global edge caching.'
      },
      {
        title: 'Custom Private Shopify Apps',
        desc: 'Node.js and Python microservices built to automate warehouse inventory sync, custom ERP feeds, tiered B2B pricing, and recurring subscription flows.'
      },
      {
        title: 'Checkout Extensibility & Custom Logic',
        desc: 'Shopify Functions and Checkout UI Extensions that safely customize upsells, address validation, and payment gateways without violating platform guardrails.'
      },
      {
        title: 'Core Web Vitals & Speed Optimization',
        desc: 'Image CDN optimization, lazy loading, font subsetting, and JS bundle pruning to achieve 90+ Google PageSpeed mobile scores.'
      },
      {
        title: 'Platform Migration & Data Integrity',
        desc: 'Flawless zero-downtime migration from WooCommerce, Magento, or BigCommerce to Shopify Plus with full preservation of SEO rankings and customer history.'
      }
    ],
    technologies: [
      { name: 'Shopify', category: 'Storefront Platform', icon: 'Shopify' },
      { name: 'React', category: 'Headless UI Framework', icon: 'React' },
      { name: 'TailwindCSS', category: 'High-Performance CSS', icon: 'TailwindCSS' },
      { name: 'GraphQL', category: 'Storefront Data API', icon: 'WebSockets' },
      { name: 'FastAPI', category: 'Custom Webhook Backend', icon: 'FastAPI' },
      { name: 'PostgreSQL', category: 'ERP Warehouse Sync', icon: 'PostgreSQL' },
      { name: 'Docker', category: 'App Microservices', icon: 'Docker' },
      { name: 'Redis', category: 'Real-Time Cache', icon: 'Redis' }
    ],
    connectedCaseStudy: {
      slug: 'getscry',
      title: 'GetScry: Predictive E-Commerce Visitor Intelligence',
      badge: 'Case Study',
      description: 'Discover how we engineered a high-throughput visitor intent prediction system for e-commerce stores with sub-100ms real-time recommendations.'
    },
    faqs: [
      {
        question: 'Do you build custom Shopify themes from scratch or customize existing templates?',
        answer: 'We specialize in custom themes coded from the ground up using clean Liquid and Tailwind CSS. This guarantees zero bloat, lightning speed, and 100% brand originality. However, if you already have an existing theme, we can audit, optimize, and refactor it.'
      },
      {
        question: 'Can you build custom features without buying expensive monthly Shopify apps?',
        answer: 'Yes! That is one of our primary value propositions. Most apps charge $20 to $100+ per month for simple features like variant swatches, sticky carts, or bundle builders. We engineer these features directly into your theme code with zero ongoing monthly app fees.'
      },
      {
        question: 'How do you ensure my Shopify store passes Google Core Web Vitals?',
        answer: 'We optimize critical rendering paths, eliminate render-blocking scripts, utilize next-gen WebP/AVIF formats with responsive srcset, preload key assets, and isolate third-party tracking scripts so they do not block main-thread execution.'
      },
      {
        question: 'Can you migrate our store from WooCommerce or Magento without losing Google SEO rankings?',
        answer: 'Absolutely. We carry out 1-to-1 URL redirect mapping, structured metadata preservation, collection hierarchy mirroring, and zero-downtime product/customer data transfers to ensure your Google rankings are fully protected.'
      }
    ]
  },

  'ai-chatbots': {
    slug: 'ai-chatbots',
    id: 'ai-chatbots',
    shortTitle: 'AI Chatbots',
    title: 'AI Chatbot Development & Conversational Virtual Assistants',
    metaTitle: 'AI Chatbot Development & Conversational Assistants | BrixelLabs',
    metaDescription: 'Production-ready AI chatbots for WhatsApp, Telegram, and web. Custom LLMs, verified document RAG, sub-second replies, and seamless human agent handover.',
    category: 'AI & Intelligent Automation',
    icon: NLPIcon,
    heroBadge: 'WhatsApp Business API & Conversational LLM Engineers',
    tagline: 'Instant 24/7 Customer Engagement, Zero Hallucinations & Enterprise Human-in-the-Loop Handover',
    overview: 'Static decision-tree bots frustrate customers, while basic OpenAI wrapper bots hallucinate facts and leak confidential business rules. BrixelLabs engineers robust conversational AI agents powered by stateful LLMs, real-time retrieval-augmented generation (RAG), and official WhatsApp Cloud API integrations that resolve customer inquiries with factual precision.',
    metrics: [
      { label: 'First Response Time', value: '<400ms', hint: 'Sub-Second Latency' },
      { label: 'Inquiry Resolution', value: '78%', hint: 'Zero Human Intervention' },
      { label: 'Operational Uptime', value: '99.95%', hint: 'High-Concurrency Cluster' }
    ],
    theProblem: {
      headline: 'The Problem: Clunky Keyword Bots & Unsafe AI Hallucinations',
      description: 'Customers expect immediate, human-sounding answers on WhatsApp and live chat. Off-the-shelf bots either trap users in rigid "Press 1 for Sales" loops or rely on uncalibrated models that hallucinate inaccurate pricing, invent policies, and damage brand trust.',
      points: [
        { title: 'Rigid Keyword Matching', desc: 'Failure to understand typos, conversational context, slang, or multilingual user phrasing.' },
        { title: 'Ungrounded LLM Hallucinations', desc: 'Promising unapproved discounts or providing outdated warranty information to customers.' },
        { title: 'Abrupt Bot Dead-Ends', desc: 'No mechanism for human supervisors to intervene in high-stakes sales conversations.' }
      ]
    },
    ourSolution: {
      headline: 'Our Architecture: Grounded Vector RAG, Stateful Multi-Turn Logic & Live Agent Takeover',
      description: 'We develop intelligent conversational systems anchored strictly to your business PDFs, product catalogs, and databases. Every response is grounded in truth, with automated sentiment analysis and smooth human agent escalation.',
      points: [
        { title: 'Zero-Hallucination Guardrails', desc: 'Strict retrieval filters and system prompt boundaries ensure the bot never speculates.' },
        { title: 'Official WhatsApp Cloud API', desc: 'Direct webhook integration with interactive buttons, carousels, and order routing.' },
        { title: 'Human-in-the-Loop Handover', desc: 'Instant Slack or CRM alerts allowing your human sales team to take over any conversation.' }
      ]
    },
    capabilities: [
      {
        title: 'Official WhatsApp Cloud API Integration',
        desc: 'Direct, verified Meta Cloud API connection with automated message templates, interactive list menus, location handling, and media streaming.'
      },
      {
        title: 'Document-Grounded RAG (Vector Search)',
        desc: 'Embed your product catalogs, warranty documents, and training manuals into pgvector or Pinecone so the bot answers with strict source citations.'
      },
      {
        title: 'CRM & Database Synchronization',
        desc: 'Automatically capture lead emails, book consultation calendar slots, check order status in PostgreSQL, and update HubSpot or Salesforce in real time.'
      },
      {
        title: 'Multilingual & Context-Aware Processing',
        desc: 'Natural language understanding capable of switching between English, Urdu, Spanish, and Arabic while retaining multi-turn session memory.'
      },
      {
        title: 'Live Human Supervisor Console',
        desc: 'Internal web dashboard and webhook notifications that trigger an immediate agent takeover when complex sentiment or high customer value is detected.'
      },
      {
        title: 'Enterprise Guardrails & Privacy',
        desc: 'PII scrubbing, prompt injection defense, and local on-premise model deployment options to ensure client data is never used to train public models.'
      }
    ],
    technologies: [
      { name: 'FastAPI', category: 'High-Throughput Webhook', icon: 'FastAPI' },
      { name: 'WhatsApp', category: 'Meta Cloud API', icon: 'WhatsApp' },
      { name: 'LangChain', category: 'Prompt & Memory Chains', icon: 'LangChain' },
      { name: 'Meta', category: 'LLaMA 3.3 Reasoning', icon: 'Meta' },
      { name: 'Groq', category: 'Ultra-Fast Inference', icon: 'Groq' },
      { name: 'PostgreSQL', category: 'Vector Knowledge Store', icon: 'PostgreSQL' },
      { name: 'Redis', category: 'Session Memory', icon: 'Redis' },
      { name: 'Docker', category: 'Deployment', icon: 'Docker' }
    ],
    connectedCaseStudy: {
      slug: 'frontdesk-ai',
      title: 'FrontDesk AI: Autonomous WhatsApp Consultation Bot',
      badge: 'Case Study',
      description: 'Explore how we deployed an automated WhatsApp AI booking agent with sub-second response times, automated qualification, and human supervisor failover.'
    },
    faqs: [
      {
        question: 'Can the chatbot connect directly to our official WhatsApp Business number?',
        answer: 'Yes. We utilize the official Meta WhatsApp Cloud API. We handle verified phone number setup, interactive button templates, webhooks, and compliance approvals so your business operates safely without risk of ban.'
      },
      {
        question: 'How do you prevent the AI bot from making up false information or discounts?',
        answer: 'We employ Retrieval-Augmented Generation (RAG) with strict temperature calibration and system guardrails. The bot is programmatically instructed to only answer from your verified documents and gracefully escalate if an answer is not in its knowledge base.'
      },
      {
        question: 'What happens when a customer asks a question only a human can answer?',
        answer: 'Our Human-in-the-Loop (HITL) module immediately detects the unresolved state or negative sentiment, pauses automated bot replies for that session, and alerts your team via Slack, WhatsApp, or dashboard for instant live takeover.'
      },
      {
        question: 'Can the bot book appointments and save leads into our CRM?',
        answer: 'Yes. We connect the bot via REST APIs to Google Calendar, Calendly, HubSpot, Salesforce, or your custom internal database to confirm appointments and store user details automatically.'
      }
    ]
  },

  'computer-vision': {
    slug: 'computer-vision',
    id: 'computer-vision',
    shortTitle: 'Computer Vision',
    title: 'Computer Vision Solutions & Real-Time Edge AI Inspection',
    metaTitle: 'Computer Vision Solutions & Edge AI Camera Inspection | BrixelLabs',
    metaDescription: 'Industrial computer vision systems, sub-14ms defect detection, YOLOv8/YOLOv9 object tracking, edge deployment on NVIDIA Jetson, and automated visual QA.',
    category: 'AI & Intelligent Automation',
    icon: ComputerVisionIcon,
    heroBadge: 'Edge Computer Vision & Real-Time Inspection Specialists',
    tagline: 'Sub-14ms Real-Time Defect Detection, Edge Hardware Optimization & Automated Visual QA',
    overview: 'Manual visual inspection is slow, inconsistent, and expensive. Standard cloud computer vision APIs introduce unacceptable network latency and recurring API cost. BrixelLabs builds custom edge computer vision systems utilizing customized YOLO models, NVIDIA TensorRT acceleration, and industrial camera pipelines that detect flaws at speeds up to 120 FPS.',
    metrics: [
      { label: 'Inference Speed', value: '<14ms', hint: 'Per Frame Latency' },
      { label: 'Inspection Frame Rate', value: '120 FPS', hint: 'Real-Time Edge Throughput' },
      { label: 'Defect Detection Accuracy', value: '99.4%', hint: 'Calibrated Mean Average Precision' }
    ],
    theProblem: {
      headline: 'The Challenge: Inspection Fatigue, Human Errors & High Scrap Rates',
      description: 'Human inspectors tire after 20 minutes of continuous scanning, allowing microscopic flaws, fabric holes, and surface scratches to slip through to customers. Meanwhile, cloud-dependent AI vision tools fail in factory environments due to high bandwidth demands and unpredictable network lag.',
      points: [
        { title: 'Costly Product Recalls', desc: 'Defective units leaving production lines, causing customer chargebacks and brand damage.' },
        { title: 'Cloud Latency & Privacy Risks', desc: 'Sending high-res video streams over the internet creates latency bottlenecks and leaks facility footage.' },
        { title: 'Model Drift on Varied Lighting', desc: 'Generic models failing when factory ambient lighting, camera angles, or shadows shift.' }
      ]
    },
    ourSolution: {
      headline: 'Our Architecture: Custom Edge Neural Networks & TensorRT Hardware Acceleration',
      description: 'We train proprietary neural architectures tailored specifically to your visual datasets. Models are compiled into optimized TensorRT engines and deployed directly on edge devices (NVIDIA Jetson, industrial IPCs) with zero external cloud dependencies.',
      points: [
        { title: 'Sub-14ms Real-Time Inference', desc: 'Lightning-fast on-device processing allowing instant robotic rejection or alarm triggers.' },
        { title: '100% On-Premise Air-Gapped Privacy', desc: 'Video streams never leave your facility, ensuring zero cloud subscription costs and strict security.' },
        { title: 'Robust Augmentation Pipelines', desc: 'Trained on diverse lighting, specular reflections, and production vibrations for rock-solid reliability.' }
      ]
    },
    capabilities: [
      {
        title: 'Real-Time Defect Inspection & Quality Assurance',
        desc: 'Microsecond surface defect classification, fabric weave tears, solder bridge checks, weld inspections, and cosmetic scratch spotting at production line speeds.'
      },
      {
        title: 'High-Speed Object Tracking & Counting',
        desc: 'Multi-object tracking using ByteTrack and DeepSORT for automated package counting, warehouse conveyor telemetry, and inventory movement monitoring.'
      },
      {
        title: 'Custom Model Training & Synthetic Augmentation',
        desc: 'Dataset curation, balanced annotations, and synthetic data generation to train custom YOLOv8, YOLOv9, and custom vision transformers with 99%+ precision.'
      },
      {
        title: 'NVIDIA TensorRT Edge Compilation',
        desc: 'Quantizing models to FP16 and INT8 precision to run with ultra-low power consumption on NVIDIA Jetson Orin Nano, AGX, and industrial edge workstations.'
      },
      {
        title: 'Industrial Camera & Sensor Integration',
        desc: 'Interfacing with GigE Vision, USB3 Vision, Basler, and FLIR industrial cameras with hardware strobe synchronization and hardware GPIO triggers.'
      },
      {
        title: 'Factory Floor Telemetry Dashboards',
        desc: 'Real-time WebSocket web dashboards displaying defect heatmaps, reject rates, hourly throughput charts, and historical defect image archives.'
      }
    ],
    technologies: [
      { name: 'PyTorch', category: 'Deep Learning Core', icon: 'PyTorch' },
      { name: 'YOLO', category: 'Ultralytics Architecture', icon: 'YOLO' },
      { name: 'OpenCV', category: 'Image Processing & Filters', icon: 'OpenCV' },
      { name: 'NVIDIA', category: 'Jetson Orin Edge Compute', icon: 'NVIDIA' },
      { name: 'CUDA', category: 'GPU Hardware Acceleration', icon: 'CUDA' },
      { name: 'FastAPI', category: 'Telemetry & Event Server', icon: 'FastAPI' },
      { name: 'React', category: 'Industrial Inspection UI', icon: 'React' },
      { name: 'Docker', category: 'Edge Containerization', icon: 'Docker' }
    ],
    connectedCaseStudy: {
      slug: 'threadeye',
      title: 'ThreadEye: 120 FPS Industrial Fabric Defect Inspection Engine',
      badge: 'Case Study',
      description: 'See how we engineered an ultra-fast real-time computer vision system capable of inspecting high-speed textile looms with sub-14ms detection times.'
    },
    faqs: [
      {
        question: 'Does the computer vision system require an active internet connection to run?',
        answer: 'No. All our industrial computer vision deployments run completely on-device (Edge AI) using hardware like NVIDIA Jetson or on-premise industrial PCs. Video feeds never touch the internet, guaranteeing zero cloud latency and 100% data confidentiality.'
      },
      {
        question: 'How fast can the system inspect products on a moving conveyor belt?',
        answer: 'Our optimized TensorRT neural engines process frames in under 14 milliseconds, enabling sustained inspection speeds of 60 to 120 frames per second. This allows seamless integration into high-velocity production lines.'
      },
      {
        question: 'What happens if we do not have thousands of defect images to train a model?',
        answer: 'We specialize in small-data training methodologies, including advanced synthetic data augmentation, zero-shot anomaly detection, and transfer learning, enabling high-accuracy models with as few as 100 to 200 defect samples.'
      },
      {
        question: 'Can the vision system trigger automated physical rejection mechanisms?',
        answer: 'Yes. We program direct hardware GPIO, PLC (Programmable Logic Controller), and Modbus/TCP signals to trigger pneumatic reject arms, alarms, or conveyor stops the moment a defect is identified.'
      }
    ]
  },

  'web-development': {
    slug: 'web-development',
    id: 'web-development',
    shortTitle: 'Web Development',
    title: 'Custom Full-Stack Web Development & High-Scale Cloud SaaS',
    metaTitle: 'Custom Web Development & Cloud SaaS Engineering | BrixelLabs',
    metaDescription: 'Full-stack web applications, React & Next.js architectures, Django microservices, sub-200ms API response times, and scalable enterprise web platforms.',
    category: 'Design & Full-Stack Development',
    icon: WebDevIcon,
    heroBadge: 'Modern React, Next.js & Cloud Architecture',
    tagline: 'High-Concurrency React Applications, Resilient Microservices & Enterprise Cloud Scale',
    overview: 'Modern businesses need web platforms that load instantaneously, look stunning across all viewports, and scale gracefully to millions of concurrent users. BrixelLabs architects full-stack web applications using React, Next.js, Django, and PostgreSQL engineered for enterprise reliability, high conversion rates, and sub-200ms API response times.',
    metrics: [
      { label: 'Page Load Time', value: '<0.9s', hint: 'Core Web Vitals Optimized' },
      { label: 'API Latency', value: '<180ms', hint: '99th Percentile SLA' },
      { label: 'System Uptime', value: '99.99%', hint: 'Redundant Cloud Nodes' }
    ],
    theProblem: {
      headline: 'The Problem: Sluggish Legacy Systems & Costly Architectural Debt',
      description: 'Slow, outdated web systems frustrate users, inflate hosting overhead, and block new product features. When monolithic codebases lack clean architectural separation, scaling up traffic causes frequent database lockups, crashes, and lost revenue.',
      points: [
        { title: 'Poor Core Web Vitals', desc: 'Slow loading web pages penalized by Google search algorithms and abandoned by users.' },
        { title: 'Unscalable Backend Monoliths', desc: 'Database connection exhaustion and thread starvation during peak traffic surges.' },
        { title: 'Security & Vulnerability Leaks', desc: 'Outdated libraries and unescaped queries leaving customer databases exposed.' }
      ]
    },
    ourSolution: {
      headline: 'Our Solution: Modern Component Systems, Async APIs & Auto-Scaling Clouds',
      description: 'We build web software using clean, decoupled architectural patterns: responsive React and Next.js frontends, modular Django REST and FastAPI backends, and distributed PostgreSQL databases protected by Redis caching.',
      points: [
        { title: 'Fluid, High-Speed Frontend UI', desc: 'Tailwind CSS and React component architectures optimized for sub-second visual rendering.' },
        { title: 'Asynchronous Cloud Backends', desc: 'Microservice APIs capable of handling thousands of requests per second with zero downtime.' },
        { title: 'Automated CI/CD & Security Audits', desc: 'Every commit passes automated testing, container builds, and security vulnerability scans.' }
      ]
    },
    capabilities: [
      {
        title: 'Custom Web Applications & Portals',
        desc: 'Bespoke client portals, multi-tenant B2B platforms, and internal operational tools built with modern React, TypeScript, and Tailwind CSS.'
      },
      {
        title: 'High-Scale Backend Microservices',
        desc: 'Robust Python Django and FastAPI microservice backends featuring connection pooling, distributed background Celery workers, and caching.'
      },
      {
        title: 'Database Architecture & Query Tuning',
        desc: 'Relational database schema modeling in PostgreSQL, indexing strategies, read-replica scaling, and high-performance Redis cache layers.'
      },
      {
        title: 'Progressive Web Apps (PWAs)',
        desc: 'Offline-capable web applications with service workers, native mobile-like push notifications, and home screen installation.'
      },
      {
        title: 'Authentication & Role-Based Access (RBAC)',
        desc: 'Enterprise security integrations including JWT, OAuth 2.0, Multi-Factor Authentication (2FA), and granular permission control.'
      },
      {
        title: 'Cloud DevOps & Auto-Scaling Infrastructure',
        desc: 'Docker containerization, Nginx reverse proxy load balancing, and automated zero-downtime deployment pipelines on AWS, Vercel, and DigitalOcean.'
      }
    ],
    technologies: [
      { name: 'React', category: 'Modern Frontend Library', icon: 'React' },
      { name: 'TailwindCSS', category: 'Utility-First Styling', icon: 'TailwindCSS' },
      { name: 'FastAPI', category: 'High-Speed Python Backend', icon: 'FastAPI' },
      { name: 'PostgreSQL', category: 'Relational Database', icon: 'PostgreSQL' },
      { name: 'Redis', category: 'Distributed Cache', icon: 'Redis' },
      { name: 'Docker', category: 'Container Orchestration', icon: 'Docker' }
    ],
    connectedCaseStudy: {
      slug: 'getscry',
      title: 'GetScry: High-Volume Analytics Web Platform',
      badge: 'Case Study',
      description: 'Explore how we engineered a high-concurrency React and Python dashboard processing millions of real-time event telemetry pings.'
    },
    faqs: [
      {
        question: 'What technology stack do you recommend for our custom web project?',
        answer: 'For most high-performance web products, we build on React with Tailwind CSS on the frontend, combined with Python (Django or FastAPI) on the backend and PostgreSQL for storage. This stack delivers exceptional speed, security, and long-term maintainability.'
      },
      {
        question: 'Do you design the UI/UX as part of the web development contract?',
        answer: 'Yes. Our senior product designers create high-fidelity interactive Figma wireframes and design token systems before coding begins, ensuring the user experience is thoroughly aligned with your brand.'
      },
      {
        question: 'How do you guarantee the website will be responsive on all devices?',
        answer: 'We test across physical iPhones, Androids, iPads, and ultra-wide desktop displays using automated responsive test suites. Every layout is built mobile-first with smooth fluid typography and touch-optimized navigation.'
      },
      {
        question: 'Who owns the intellectual property and code when development is completed?',
        answer: 'You do. 100% of the code, intellectual property, Git repositories, and documentation belong completely to your organization upon project milestone sign-off.'
      }
    ]
  },

  'ai-agents': {
    slug: 'ai-agents',
    id: 'ai-agents',
    shortTitle: 'AI Agents',
    title: 'Autonomous AI Agents & Enterprise Workflow Automations',
    metaTitle: 'Autonomous AI Agents & LangGraph Workflow Automation | BrixelLabs',
    metaDescription: 'Stateful multi-agent systems, LangGraph swarms, autonomous tool-calling loops, document synthesis, and self-operating AI business automations.',
    category: 'AI & Intelligent Automation',
    icon: AgenticAIIcon,
    heroBadge: 'LangGraph & Multi-Agent Systems Specialists',
    tagline: 'Self-Operating Agent Swarms, Multi-Step Tool Calling & Reliable Business Automation',
    overview: 'Single-prompt AI chatbots hit a ceiling when tasks require multiple steps, verification loops, and real-world software interactions. BrixelLabs architects autonomous multi-agent systems using LangGraph and LangChain that collaborate, critique each other, call external APIs, and execute end-to-end business operations autonomously.',
    metrics: [
      { label: 'Task Autonomy', value: '94%', hint: 'Multi-Step Execution' },
      { label: 'Reasoning Latency', value: '<1.2s', hint: 'Groq LPU Acceleration' },
      { label: 'Error Reduction', value: '88%', hint: 'Self-Correction Cycles' }
    ],
    theProblem: {
      headline: 'The Problem: Brittle Automations & Unsupervised AI Loops',
      description: 'Traditional Zapier/Make automations break the moment an API structure shifts or a user enters unstructured data. Meanwhile, naive autonomous agent experiments get stuck in infinite token loops, hallucinate tool calls, and rack up enormous cloud bills without completing work.',
      points: [
        { title: 'Infinite Looping & Budget Burns', desc: 'Unconstrained agents calling APIs in endless cycles without reaching a solution.' },
        { title: 'Inability to Self-Correct', desc: 'Failing silently when a document format changes or web search returns conflicting data.' },
        { title: 'Lack of State Persistence', desc: 'Losing context across multi-day workflows and requiring humans to start over.' }
      ]
    },
    ourSolution: {
      headline: 'Our Solution: Graph-Based State Machines with Human-in-the-Loop Supervision',
      description: 'We build agents as deterministic directed graphs using LangGraph. Every agent has explicit state nodes, specialized sub-agent roles (Researcher, Synthesizer, Validator), and hard stop criteria with human escalation gates.',
      points: [
        { title: 'Cyclic Graph State Machines', desc: 'Predictable node transitions that test, verify, and retry before committing actions.' },
        { title: 'Specialized Multi-Agent Swarms', desc: 'Dividing complex tasks among lightweight specialist models for speed and precision.' },
        { title: 'Hard Budget & Time Enforcements', desc: 'Configurable token caps, execution timeouts, and audit logging for every tool call.' }
      ]
    },
    capabilities: [
      {
        title: 'Multi-Agent Workflow Orchestration',
        desc: 'LangGraph state machines where specialized agents coordinate research, data extraction, synthesis, and peer review before final output.'
      },
      {
        title: 'Autonomous Tool-Calling & API Execution',
        desc: 'Agents capable of querying SQL databases, searching live web data via Tavily, executing Python calculations, and drafting emails.'
      },
      {
        title: 'Self-Correction & Reflection Loops',
        desc: 'Built-in critique nodes that inspect outputs against defined quality criteria and automatically trigger revisions when discrepancies appear.'
      },
      {
        title: 'Automated Document & Report Synthesis',
        desc: 'End-to-end extraction from 100+ page contracts, financial audits, or medical papers into structured summaries with verified citations.'
      },
      {
        title: 'Persistent Checkpointing & Resumption',
        desc: 'PostgreSQL-backed state checkpoints allowing workflows to pause, request human validation, and resume seamlessly days later.'
      },
      {
        title: 'Audit Logging & Safety Monitoring',
        desc: 'Complete step-by-step transparency dashboards showing every intermediate prompt, tool argument, and execution cost.'
      }
    ],
    technologies: [
      { name: 'LangGraph', category: 'Multi-Agent State Graph', icon: 'LangGraph' },
      { name: 'LangChain', category: 'Prompt & Tool Chains', icon: 'LangChain' },
      { name: 'Meta', category: 'LLaMA 3.3 70B Reasoning', icon: 'Meta' },
      { name: 'Groq', category: 'Sub-300ms Inference', icon: 'Groq' },
      { name: 'FastAPI', category: 'Microservice Backend', icon: 'FastAPI' },
      { name: 'Tavily', category: 'Real-Time Web Search', icon: 'Tavily' },
      { name: 'PostgreSQL', category: 'Persistent State Store', icon: 'PostgreSQL' },
      { name: 'Docker', category: 'Containerized Agents', icon: 'Docker' }
    ],
    connectedCaseStudy: {
      slug: 'noesis',
      title: 'Noesis: Autonomous Multi-Agent Study Assistant',
      badge: 'Case Study',
      description: 'See how we designed a LangGraph multi-agent architecture with dual-engine web verification, level-adapted notes, and adaptive quiz calibration.'
    },
    faqs: [
      {
        question: 'What is the difference between a normal chatbot and an autonomous AI agent?',
        answer: 'A chatbot simply answers a single prompt with text. An AI agent is given an objective (e.g., "Analyze our competitors, summarize their pricing, and draft a comparison report"), and it autonomously plans the steps, queries tools, evaluates its work, and delivers the finished artifact.'
      },
      {
        question: 'How do you prevent agents from running wild or spending too much money?',
        answer: 'We architect every agent using LangGraph with strict cycle boundaries, token budget ceilings, execution timeouts, and required human approvals for critical actions like database modifications or outbound messages.'
      },
      {
        question: 'Can AI agents interact with our internal business software and databases?',
        answer: 'Yes. We expose secure API tools that allow the agent to read databases, fetch records, create support tickets, or generate PDF files while respecting user access permissions.'
      },
      {
        question: 'What happens if an agent produces an incorrect intermediate step?',
        answer: 'Our architectures include automated Evaluator and Critic nodes. If an intermediate step fails validation, the state machine routes the context back to a correction node with explicit error feedback.'
      }
    ]
  },

  'web-scraping': {
    slug: 'web-scraping',
    id: 'web-scraping',
    shortTitle: 'Web Scraping',
    title: 'Enterprise Web Scraping & Automated Data Extraction Pipelines',
    metaTitle: 'Enterprise Web Scraping & Automated Data Pipelines | BrixelLabs',
    metaDescription: 'Industrial web scraping clusters, Playwright/Scrapy automation, Cloudflare Turnstile bypass, rotating proxy pools, and structured ETL database loading.',
    category: 'Data Analytics & Web Scraping',
    icon: WebScrapingIcon,
    heroBadge: 'Distributed Scraping & Anti-Bot Bypass Engineers',
    tagline: 'High-Concurrency Data Harvesting, Cloudflare Bypass & Clean Structured Database Ingestion',
    overview: 'Clean, real-time market data provides an unbeatable competitive advantage. However, modern websites protect their data behind sophisticated anti-bot firewalls, CAPTCHAs, and dynamic JavaScript rendering. BrixelLabs develops industrial-grade scraping infrastructure utilizing Playwright, Scrapy, and rotating residential IP pools to harvest high-volume records reliably.',
    metrics: [
      { label: 'Scrape Success Rate', value: '99.2%', hint: 'Anti-Bot Bypass' },
      { label: 'Daily Data Throughput', value: '10M+', hint: 'Distributed Records' },
      { label: 'Pipeline Reliability', value: '99.9%', hint: 'Automated Failover' }
    ],
    theProblem: {
      headline: 'The Problem: Anti-Bot IP Bans, Broken Selectors & Dirty Data',
      description: 'Off-the-shelf scraping tools and freelance scripts break the moment a target site updates its CSS, deploys Cloudflare Turnstile, or enforces rate limits. Businesses waste hundreds of hours manually fixing broken scrapers and cleaning duplicated data.',
      points: [
        { title: 'Aggressive IP Bans & CAPTCHAs', desc: 'Target sites blocking requests, triggering Cloudflare challenges, and halting pipelines.' },
        { title: 'Dynamic Single-Page App Rendering', desc: 'Standard HTTP scrapers failing to render React, Vue, and heavy JavaScript content.' },
        { title: 'Messy, Unstructured Datasets', desc: 'Scraped data full of missing fields, encoding errors, and duplicate entries.' }
      ]
    },
    ourSolution: {
      headline: 'Our Architecture: Headless Clusters, Smart Proxy Rotation & Automated ETL',
      description: 'We engineer asynchronous harvesting pipelines that emulate real human browser behavior. Requests are distributed across pools of residential proxies with automated CAPTCHA solving, structured schema validation, and direct database sync.',
      points: [
        { title: 'Headless Browser Clusters', desc: 'Playwright and Puppeteer clusters rendering full DOMs with natural mouse jitter.' },
        { title: 'Perimeter & Anti-Bot Bypass', desc: 'Automated TLS fingerprinting, user-agent randomization, and Cloudflare bypass.' },
        { title: 'Automated Cleansing & Normalization', desc: 'Pydantic data models enforcing strict schema validation before database insertion.' }
      ]
    },
    capabilities: [
      {
        title: 'High-Throughput Asynchronous Harvesting',
        desc: 'Scrapy and aiohttp crawler clusters capable of extracting millions of product, real estate, or directory records per day with distributed worker queues.'
      },
      {
        title: 'Dynamic SPA & JavaScript Rendering',
        desc: 'Playwright and Puppeteer automation to interact with infinite scrolls, dynamic dropdowns, click-to-reveal phone numbers, and hidden canvas elements.'
      },
      {
        title: 'Anti-Bot & Turnstile Bypass',
        desc: 'Advanced browser fingerprint spoofing, TLS header alignment, cookie retention, and rotating proxy integration to maintain 99%+ extraction success.'
      },
      {
        title: 'Automated Scheduled Cron Pipelines',
        desc: 'Automated hourly, daily, or weekly cron jobs that execute incremental scrapes, capturing newly added or modified records without re-scraping the entire site.'
      },
      {
        title: 'Data Transformation, Cleansing & Deduplication',
        desc: 'Automated parsing of addresses, prices, currencies, and emails into normalized JSON, PostgreSQL schemas, Google BigQuery, or structured Excel sheets.'
      },
      {
        title: 'Webhook & Real-Time Alert Feeds',
        desc: 'Instant notifications when competitor prices change, new inventory drops, or targeted keywords appear on industry forums and marketplaces.'
      }
    ],
    technologies: [
      { name: 'Python', category: 'Core Language', icon: 'Python' },
      { name: 'FastAPI', category: 'Data Feed API', icon: 'FastAPI' },
      { name: 'PostgreSQL', category: 'Target Warehouse', icon: 'PostgreSQL' },
      { name: 'Redis', category: 'Crawler Job Queue', icon: 'Redis' },
      { name: 'Docker', category: 'Cluster Deployment', icon: 'Docker' }
    ],
    connectedCaseStudy: {
      slug: 'getscry',
      title: 'GetScry: High-Volume Data Streaming',
      badge: 'Case Study',
      description: 'Learn how our high-throughput data extraction and session monitoring pipelines ingest and structure high-frequency digital telemetry.'
    },
    faqs: [
      {
        question: 'Is web scraping legal and compliant with data privacy regulations?',
        answer: 'Yes, when conducted ethically on publicly accessible web data. We adhere strictly to robots.txt guidelines where required, avoid harvesting private or password-protected user data, and operate in full compliance with GDPR and public data precedents.'
      },
      {
        question: 'How do you handle websites protected by Cloudflare Turnstile or DataDome?',
        answer: 'We utilize advanced headless browser automation with Playwright, rotating residential proxy networks, randomized hardware fingerprints, and realistic human interaction heuristics to bypass perimeter bot walls without interruptions.'
      },
      {
        question: 'Where can the scraped data be delivered?',
        answer: 'We can deliver your clean data directly into PostgreSQL, MySQL, MongoDB, AWS S3, Google BigQuery, Google Sheets, or via a custom REST API endpoint that your application can query on demand.'
      },
      {
        question: 'What happens when a target website changes its layout or CSS selectors?',
        answer: 'We write robust scrapers using semantic XPath, regex pattern matching, and fallback selectors. Furthermore, all client pipelines include automated monitoring alerts that notify our engineers instantly if a target website alters its structure.'
      }
    ]
  },

  'mobile-development': {
    slug: 'mobile-development',
    id: 'mobile-development',
    shortTitle: 'Mobile Development',
    title: 'Mobile App Development for iOS & Android (Flutter & React Native)',
    metaTitle: 'Mobile App Development (iOS & Android) | BrixelLabs',
    metaDescription: 'Production-grade cross-platform mobile apps built with Flutter and React Native. Smooth 60 FPS animations, native hardware access, and offline-first cloud sync.',
    category: 'Design & Full-Stack Development',
    icon: MobileDevIcon,
    heroBadge: 'Flutter & React Native Cross-Platform Specialists',
    tagline: 'Native Performance, Fluid 60 FPS Animations & Scalable Offline-First Architectures',
    overview: 'Maintaining two separate native codebases for iOS and Android doubles your development budget and slows down release cycles. BrixelLabs engineers high-performance cross-platform mobile applications using Flutter and React Native that deliver 100% native look-and-feel, hardware sensor access, and seamless app store releases from a single unified codebase.',
    metrics: [
      { label: 'Render Performance', value: '60 FPS', hint: 'Zero Frame Drops' },
      { label: 'Codebase Sharing', value: '95%', hint: 'Unified iOS & Android' },
      { label: 'Battery Consumption', value: '<2%', hint: 'Optimized Background Sync' }
    ],
    theProblem: {
      headline: 'The Problem: Clunky Hybrid Wrappers & Expensive Dual Teams',
      description: 'Many hybrid apps feel like sluggish web pages trapped inside a mobile container with clunky touch response and poor gesture support. Conversely, building two separate Swift and Kotlin teams leads to fragmented features and exorbitant development costs.',
      points: [
        { title: 'Sluggish Jittery Animations', desc: 'Hybrid web-view apps lagging during scroll gestures and navigation transitions.' },
        { title: 'App Store Rejections', desc: 'Failing Apple App Store and Google Play guidelines due to improper permissions and crashes.' },
        { title: 'Offline Data Loss', desc: 'Apps completely crashing when users enter elevators, subways, or intermittent cellular dead zones.' }
      ]
    },
    ourSolution: {
      headline: 'Our Solution: Flutter & React Native with Native C++ & Swift Bridges',
      description: 'We write compiled mobile architectures that run directly on bare metal GPU pipelines. When deep hardware sensor access is required, we build custom native Swift and Kotlin bridges for maximum responsiveness.',
      points: [
        { title: 'True 60 FPS Native Rendering', desc: 'Hardware-accelerated Skia and Impeller graphics pipelines for butter-smooth interactions.' },
        { title: 'Offline-First SQLite Caching', desc: 'Users can read and write data offline; the app automatically syncs when connectivity returns.' },
        { title: 'Guaranteed App Store Approvals', desc: 'Strict adherence to Apple Human Interface Guidelines and Google Material Design standards.' }
      ]
    },
    capabilities: [
      {
        title: 'Cross-Platform Flutter & React Native Engineering',
        desc: 'Single-source-code mobile development for iOS and Android delivering native performance, responsive layouts, and shared business logic.'
      },
      {
        title: 'Native Device Hardware & Sensor Integration',
        desc: 'Direct integration with cameras, Bluetooth Low Energy (BLE), GPS location tracking, accelerometers, biometrics (Face ID/Fingerprint), and NFC.'
      },
      {
        title: 'Offline-First Architecture & Background Sync',
        desc: 'Local SQLite and Realm caching with intelligent conflict-resolution algorithms that sync data seamlessly with cloud backends upon reconnection.'
      },
      {
        title: 'Push Notifications & Deep Linking',
        desc: 'Targeted push notifications via Firebase Cloud Messaging (FCM) and OneSignal, configured with universal deep links for marketing attribution.'
      },
      {
        title: 'In-App Purchases & Subscription Billing',
        desc: 'RevenueCat, Apple StoreKit 2, and Google Play Billing integrations with receipt validation, paywall A/B testing, and churn management.'
      },
      {
        title: 'App Store Submission & Compliance',
        desc: 'Complete handling of Apple App Store and Google Play Store submission, privacy manifests, screenshot design, and compliance reviews.'
      }
    ],
    technologies: [
      { name: 'Flutter', category: 'Cross-Platform Framework', icon: 'Flutter' },
      { name: 'React', category: 'React Native Ecosystem', icon: 'React' },
      { name: 'Kotlin', category: 'Native Android Bridge', icon: 'Kotlin' },
      { name: 'Android', category: 'Platform API', icon: 'Android' },
      { name: 'FastAPI', category: 'REST API Backend', icon: 'FastAPI' },
      { name: 'PostgreSQL', category: 'Cloud Database', icon: 'PostgreSQL' },
      { name: 'Redis', category: 'Real-Time Sync', icon: 'Redis' }
    ],
    connectedCaseStudy: {
      slug: 'the-watcher',
      title: 'The Watcher: Real-Time Mobile Child Safety Guardian',
      badge: 'Case Study',
      description: 'Discover how we engineered a cross-platform mobile application with real-time on-device content filtering and zero battery drain.'
    },
    faqs: [
      {
        question: 'Should we build our mobile app with Flutter or React Native?',
        answer: 'Both are premier cross-platform frameworks. We typically recommend Flutter when custom, pixel-perfect branding and heavy visual animation are prioritized, and React Native when your team already has React web expertise or requires heavy native JavaScript library sharing.'
      },
      {
        question: 'Can a cross-platform app access native phone features like camera and GPS?',
        answer: 'Yes, 100%. Both Flutter and React Native provide native channel bridges that grant full hardware access to the camera, Bluetooth, GPS, biometrics, Apple HealthKit, and Google Fit.'
      },
      {
        question: 'Will our app work when the user does not have an internet connection?',
        answer: 'Yes. We engineer our mobile apps using an offline-first architecture. User actions are written to local on-device SQLite databases immediately and queued for background synchronization when connectivity is restored.'
      },
      {
        question: 'Do you help get the app approved on the Apple App Store and Google Play?',
        answer: 'Yes. We guide your app through the entire submission lifecycle: preparing screenshots, writing privacy policies, configuring export compliance, and resolving any app review team inquiries.'
      }
    ]
  },

  'api-development': {
    slug: 'api-development',
    id: 'api-development',
    shortTitle: 'API Development',
    title: 'High-Throughput API Development & System Integration',
    metaTitle: 'High-Throughput API Development & System Integration | BrixelLabs',
    metaDescription: 'High-performance REST & GraphQL APIs, microservice architectures, sub-50ms endpoint latencies, rate limiting, and legacy enterprise integrations.',
    category: 'Design & Full-Stack Development',
    icon: APIDevIcon,
    heroBadge: 'Async REST, GraphQL & Microservices Engineers',
    tagline: 'High-Throughput Endpoints, Sub-50ms Response Times & Bulletproof Security Guardrails',
    overview: 'APIs are the digital central nervous system of any modern business. Slow, unmonitored endpoints create system bottlenecks and expose confidential databases to unauthorized access. BrixelLabs designs and deploys high-throughput RESTful and GraphQL APIs using FastAPI, Django, and Node.js built for sub-50ms response times, automated OpenAPI documentation, and high security.',
    metrics: [
      { label: 'P95 Response Latency', value: '<45ms', hint: 'Async Non-Blocking IO' },
      { label: 'Throughput Capacity', value: '15k+ req/s', hint: 'Benchmarked Under Load' },
      { label: 'Security Compliance', value: 'OWASP Top 10', hint: 'Zero Vulnerabilities' }
    ],
    theProblem: {
      headline: 'The Problem: Brittle Endpoints, Data Leaks & Microservice Sprawl',
      description: 'Unoptimized APIs suffer from N+1 database queries, lack rate limiting, and leak internal server errors to callers. As applications grow, uncoordinated API versions break mobile apps and create endless maintenance nightmares.',
      points: [
        { title: 'Severe Response Latencies', desc: 'Synchronous blocking calls causing API gateways to timeout under moderate user load.' },
        { title: 'Security & Auth Vulnerabilities', desc: 'Missing token expiry, broken object-level authorization (BOLA), and SQL injections.' },
        { title: 'Lack of Documentation & Versioning', desc: 'Third-party developers struggling to integrate due to outdated API docs and sudden breaking changes.' }
      ]
    },
    ourSolution: {
      headline: 'Our Solution: Asynchronous Pipelines, Strict Schemas & Real-Time Telemetry',
      description: 'We develop APIs using strict type validation with Pydantic and TypeScript. Database interactions use optimized connection pools and Redis cache-aside patterns, with comprehensive OpenAPI interactive swagger documentation.',
      points: [
        { title: 'Async Non-Blocking I/O', desc: 'High-concurrency event loops capable of serving thousands of simultaneous requests per worker.' },
        { title: 'Defense-in-Depth Security', desc: 'JWT rotation, OAuth 2.0 scopes, token bucket rate limiters, and payload sanitization.' },
        { title: 'Interactive OpenAPI Specs', desc: 'Auto-generated Swagger/Postman documentation with instant mock request testing.' }
      ]
    },
    capabilities: [
      {
        title: 'Custom RESTful & GraphQL API Design',
        desc: 'Cleanly structured, versioned REST and GraphQL endpoints adhering strictly to HTTP conventions, JSON:API standards, and caching headers.'
      },
      {
        title: 'Legacy Enterprise System Integration',
        desc: 'Bridging modern frontends and cloud apps with older legacy databases, SAP, Salesforce, custom ERPs, and banking mainframes.'
      },
      {
        title: 'Real-Time WebSockets & Event Streaming',
        desc: 'Bi-directional WebSocket pipelines and Redis Pub/Sub channels for live chat, telemetry feeds, financial tickers, and notification hubs.'
      },
      {
        title: 'Third-Party SaaS Integrations & Webhooks',
        desc: 'Robust webhook receivers with idempotency keys and exponential backoff retry workers for Stripe, PayPal, Twilio, and Shopify.'
      },
      {
        title: 'Rate Limiting & DDoS Prevention',
        desc: 'Token-bucket and sliding-window rate limiters implemented in Redis to defend your core database against abuse and scraping.'
      },
      {
        title: 'Microservices & Gateway Orchestration',
        desc: 'Designing lightweight microservices orchestrated through Nginx reverse proxies with SSL termination and centralized logging.'
      }
    ],
    technologies: [
      { name: 'FastAPI', category: 'High-Speed Python Framework', icon: 'FastAPI' },
      { name: 'PostgreSQL', category: 'High-Concurrency Database', icon: 'PostgreSQL' },
      { name: 'Redis', category: 'In-Memory Cache & Pub/Sub', icon: 'Redis' },
      { name: 'Docker', category: 'Microservice Containers', icon: 'Docker' },
      { name: 'WebSockets', category: 'Real-Time Channels', icon: 'WebSockets' }
    ],
    connectedCaseStudy: {
      slug: 'frontdesk-ai',
      title: 'FrontDesk AI: High-Speed Webhook Engine',
      badge: 'Case Study',
      description: 'See how our asynchronous webhook routing engine processes incoming Meta WhatsApp events with zero queue congestion.'
    },
    faqs: [
      {
        question: 'Should we build a REST API or a GraphQL API?',
        answer: 'We evaluate based on your use case. REST is optimal for public third-party developer integrations and microservice communication due to standard HTTP caching. GraphQL is superior for complex mobile and dashboard frontends that need to request tailored nested data in a single round-trip.'
      },
      {
        question: 'How do you prevent unauthorized users from accessing sensitive API endpoints?',
        answer: 'We implement stateless JWT tokens, OAuth 2.0 PKCE authentication, and granular Role-Based Access Control (RBAC). Furthermore, we enforce object-level authorization checks on every query so users can never view other users records.'
      },
      {
        question: 'Can your APIs handle sudden spikes in traffic during marketing campaigns?',
        answer: 'Yes. By leveraging asynchronous non-blocking I/O in FastAPI, Redis cache-aside layers, and PostgreSQL connection pooling, our API architectures absorb massive traffic surges with sub-50ms latencies.'
      },
      {
        question: 'Do you provide documentation for our internal or external developers?',
        answer: 'Yes. Every API we build includes self-documenting OpenAPI (Swagger) and Redoc endpoints, complete with interactive sandbox testing, request/response schema validations, and sample curl commands.'
      }
    ]
  },

  'ui-ux-design': {
    slug: 'ui-ux-design',
    id: 'ui-ux-design',
    shortTitle: 'UI/UX Design',
    title: 'UI/UX Design, Interactive Prototypes & Scalable Design Systems',
    metaTitle: 'UI/UX Design & Design Token Systems | BrixelLabs',
    metaDescription: 'Human-centered UI/UX design, interactive Figma prototypes, design token systems, user research, wireframing, and conversion-optimized interfaces.',
    category: 'Design & Full-Stack Development',
    icon: UIUXIcon,
    heroBadge: 'Figma Specialists & Design Systems Architects',
    tagline: 'High-Fidelity Wireframes, Design Token Architectures & Conversion-Focused Interfaces',
    overview: 'A software product can have flawless backend code, but if the interface is confusing or clunky, users will abandon it. BrixelLabs delivers human-centered UI/UX design from discovery research and user journey mapping to interactive Figma prototypes and scalable design token systems that seamlessly translate into production code.',
    metrics: [
      { label: 'User Retention Lift', value: '+42%', hint: 'Streamlined User Journeys' },
      { label: 'Dev Handoff Speed', value: '3x Faster', hint: 'Design Token System' },
      { label: 'Task Completion Rate', value: '96%', hint: 'Usability Tested' }
    ],
    theProblem: {
      headline: 'The Problem: Cluttered Interfaces, Confusing Navigation & Dev Handoff Gaps',
      description: 'Many agencies design superficial mockups that look pretty on Dribbble but fall apart during real development. Inconsistent button styles, neglected empty states, and unconsidered mobile responsive views cost months of engineering rework.',
      points: [
        { title: 'High Churn & User Drop-Off', desc: 'Complex onboarding flows and confusing checkout steps driving valuable customers away.' },
        { title: 'Inconsistent Visual Design', desc: 'Fragmented font sizes, color palettes, and spacing that undermine user trust.' },
        { title: 'Painful Developer Handoff', desc: 'Designers delivering static images without responsive specs, hover states, or design tokens.' }
      ]
    },
    ourSolution: {
      headline: 'Our Method: User-Centric Research, Atomic Components & Seamless Code Alignment',
      description: 'We treat design like engineering. We build complete atomic design systems in Figma with auto-layout, variable modes (dark/light), and documented design tokens that match Tailwind CSS classes 1-to-1.',
      points: [
        { title: 'Clickable Interactive Prototypes', desc: 'Experience the flow, click through screens, and validate logic before writing code.' },
        { title: 'Atomic Design Token Systems', desc: 'Reusable components, accessible typography scales, and tokenized color variables.' },
        { title: 'Zero Developer Friction', desc: 'Every design file includes responsive breakpoints, hover states, error cases, and animations.' }
      ]
    },
    capabilities: [
      {
        title: 'User Research & Journey Mapping',
        desc: 'Analyzing user mental models, interviewing stakeholders, mapping customer journey funnels, and identifying friction bottlenecks.'
      },
      {
        title: 'Low-Fidelity Wireframing & Information Architecture',
        desc: 'Establishing clear visual hierarchy, content grouping, and intuitive navigation flows before focusing on aesthetic polish.'
      },
      {
        title: 'High-Fidelity Interactive Figma Prototyping',
        desc: 'Pixel-perfect, clickable UI prototypes with realistic transitions and micro-interactions that look and feel like production software.'
      },
      {
        title: 'Scalable Design Systems & Token Architecture',
        desc: 'Building atomic component libraries in Figma with auto-layout 5.0, variables, and dark/light modes that integrate with Tailwind CSS.'
      },
      {
        title: 'Mobile App & SaaS Dashboard Specialization',
        desc: 'Crafting responsive mobile screens for iOS/Android and dense, high-clarity analytics dashboards with clear data visualization.'
      },
      {
        title: 'Usability Testing & Accessibility (WCAG 2.1)',
        desc: 'Conducting remote user testing sessions and ensuring strict color contrast compliance for WCAG AA/AAA accessibility standards.'
      }
    ],
    technologies: [
      { name: 'TailwindCSS', category: 'Design Token Alignment', icon: 'TailwindCSS' },
      { name: 'React', category: 'Component Mapping', icon: 'React' }
    ],
    connectedCaseStudy: {
      slug: 'noesis',
      title: 'Noesis: Interactive Study UI/UX',
      badge: 'Case Study',
      description: 'Explore the intuitive, distraction-free learning interface engineered for students navigating dense adaptive study material.'
    },
    faqs: [
      {
        question: 'What deliverables do we receive at the end of the UI/UX phase?',
        answer: 'You receive an organized Figma master file containing clickable prototypes, mobile and desktop responsive artboards, user flow diagrams, exported vector assets, and an atomic Design System with color/typography tokens.'
      },
      {
        question: 'Can you redesign our existing application without breaking existing functionality?',
        answer: 'Yes. We conduct an interface audit, identify core friction points, and iteratively overhaul the UI and user journeys while preserving familiar user workflows and database schemas.'
      },
      {
        question: 'How do you ensure our developers can easily build what you design?',
        answer: 'Our designers write code! We design strictly using Figma auto-layout, standard 8px grid systems, and naming conventions that map directly to Tailwind CSS classes, ensuring zero developer friction.'
      },
      {
        question: 'Do you create both light and dark modes for applications?',
        answer: 'Yes. Using Figma variables, we architect our design systems with built-in token swapping so your application can seamlessly toggle between light and dark themes with full color contrast compliance.'
      }
    ]
  },

  'custom-software': {
    slug: 'custom-software',
    id: 'custom-software',
    shortTitle: 'Custom Software',
    title: 'Custom Software & Cloud-Native SaaS Engineering',
    metaTitle: 'Custom Software & Cloud SaaS Development | BrixelLabs',
    metaDescription: 'End-to-end bespoke software engineering, multi-tenant SaaS architectures, distributed microservices, 99.99% uptime, and scalable cloud databases.',
    category: 'Design & Full-Stack Development',
    icon: CustomSoftwareIcon,
    heroBadge: 'Multi-Tenant SaaS & Custom Enterprise Architecture',
    tagline: 'Bespoke Software Architectures Built for 10x Scale, High Security & Commercial ROI',
    overview: 'Off-the-shelf software forces your business into someone elses workflow, with costly monthly license fees per seat and zero competitive differentiation. BrixelLabs engineers custom, proprietary software systems and multi-tenant SaaS platforms tailored to your business rules, built for durability, security, and exponential growth.',
    metrics: [
      { label: 'System Uptime SLA', value: '99.99%', hint: 'Redundant Cloud Nodes' },
      { label: 'License Cost Savings', value: '60%+', hint: 'Zero Third-Party SaaS Fees' },
      { label: 'Architecture Longevity', value: '10+ Years', hint: 'Modern Tech Stack' }
    ],
    theProblem: {
      headline: 'The Problem: Outgrowing Rigid Commercial SaaS',
      description: 'Your business processes are unique. When you rely on generic off-the-shelf software, you are forced to pay exorbitant per-seat license fees, deal with rigid feature roadmaps, and endure clumsy manual spreadsheets to bridge software gaps.',
      points: [
        { title: 'Expensive Per-Seat Licensing', desc: 'Monthly software bills ballooning into thousands of dollars as your team scales.' },
        { title: 'Zero Competitive Moat', desc: 'Using the exact same software tools as all your competitors, offering zero differentiation.' },
        { title: 'Disjointed Data Silos', desc: 'Manual copy-pasting of records across three different software platforms that refuse to sync.' }
      ]
    },
    ourSolution: {
      headline: 'Our Solution: 100% Owned, Scalable, Custom Software Platforms',
      description: 'We build end-to-end proprietary software tailored to your specific workflows. You own 100% of the code, pay zero ongoing per-seat licenses, and scale smoothly to enterprise capacity.',
      points: [
        { title: 'Tailored to Your Operations', desc: 'Every button, field, and workflow aligns precisely with how your company operates.' },
        { title: 'Multi-Tenant SaaS Architecture', desc: 'Secure data isolation allowing you to onboard thousands of commercial clients.' },
        { title: '100% IP & Code Ownership', desc: 'Complete ownership of all intellectual property, source repositories, and database schemas.' }
      ]
    },
    capabilities: [
      {
        title: 'Multi-Tenant SaaS Platform Engineering',
        desc: 'Architecting cloud-native SaaS platforms with isolated tenant databases, automated onboarding, subscription billing, and enterprise security.'
      },
      {
        title: 'Internal Operational ERP & CRM Systems',
        desc: 'Custom business management software unifying customer tracking, job scheduling, inventory management, and automated invoicing.'
      },
      {
        title: 'High-Concurrency Cloud Microservices',
        desc: 'Decoupled, containerized microservices built with Python and Node.js running behind Nginx load balancers with automated failover.'
      },
      {
        title: 'Legacy Software Modernization',
        desc: 'Refactoring outdated, legacy desktop systems into modern, responsive cloud-based web applications with zero downtime.'
      },
      {
        title: 'Data Migration & Continuous Backup',
        desc: 'Automated point-in-time PostgreSQL backups, geo-redundant storage, and complete historical data migration from old software.'
      },
      {
        title: '24/7 Monitoring & Production SLA Support',
        desc: 'Automated health telemetry, error reporting, and dedicated engineer response SLAs to keep your software running uninterrupted.'
      }
    ],
    technologies: [
      { name: 'Python', category: 'Backend Language', icon: 'Python' },
      { name: 'FastAPI', category: 'High-Throughput API', icon: 'FastAPI' },
      { name: 'React', category: 'Modern Web UI', icon: 'React' },
      { name: 'PostgreSQL', category: 'Enterprise DB', icon: 'PostgreSQL' },
      { name: 'Redis', category: 'Cache & Session Store', icon: 'Redis' },
      { name: 'Docker', category: 'Containerization', icon: 'Docker' }
    ],
    connectedCaseStudy: {
      slug: 'getscry',
      title: 'GetScry: Scalable SaaS Architecture',
      badge: 'Case Study',
      description: 'Discover how we built an enterprise-grade multi-tenant e-commerce intelligence SaaS platform handling millions of daily records.'
    },
    faqs: [
      {
        question: 'Why should we build custom software instead of buying an existing SaaS?',
        answer: 'Buying commercial SaaS works for generic tasks like email, but for core business operations, custom software eliminates expensive per-user monthly licenses, automates unique competitive processes, and becomes a valuable intellectual property asset on your company balance sheet.'
      },
      {
        question: 'How long does it take to develop a custom software MVP?',
        answer: 'Most initial custom software MVPs and core operational tools ship within 4 to 8 weeks through agile 1-week sprint milestones, allowing you to test and deploy working software rapidly.'
      },
      {
        question: 'Who owns the source code once the project is finished?',
        answer: 'You do. BrixelLabs provides 100% intellectual property transfer upon project completion. You receive full Git repository access with complete documentation and zero vendor lock-in.'
      },
      {
        question: 'How do you handle maintenance and updates after launch?',
        answer: 'Every project includes a 30-day zero-cost warranty. Afterward, we offer flexible monthly engineering maintenance packages covering security updates, server monitoring, feature additions, and 24/7 SLA support.'
      }
    ]
  },

  'machine-learning': {
    slug: 'machine-learning',
    id: 'machine-learning',
    shortTitle: 'Machine Learning',
    title: 'Custom AI & Applied Machine Learning Solutions',
    metaTitle: 'Custom AI & Applied Machine Learning Solutions | BrixelLabs',
    metaDescription: 'Predictive machine learning models, custom neural networks, automated retraining pipelines, XGBoost, PyTorch, and production AI deployments.',
    category: 'AI & Intelligent Automation',
    icon: AIMLIcon,
    heroBadge: 'PyTorch, XGBoost & Predictive Modeling Engineers',
    tagline: 'Custom Neural Models, Predictive Analytics & Scalable Production Retraining Pipelines',
    overview: 'Generic off-the-shelf AI models fail when applied to proprietary business problems. BrixelLabs engineers custom machine learning models trained specifically on your company data using PyTorch, Scikit-Learn, and XGBoost to predict customer churn, automate underwriting, forecast demand, and unlock commercial insights.',
    metrics: [
      { label: 'Forecast Accuracy', value: '94.8%', hint: 'Trained on Clean Data' },
      { label: 'Model Inference', value: '<25ms', hint: 'Optimized Model Quantization' },
      { label: 'Manual Time Saved', value: '80%+', hint: 'Automated Decisions' }
    ],
    theProblem: {
      headline: 'The Problem: Proof-of-Concept Toys That Never Reach Production',
      description: '80% of enterprise AI projects fail because data science models built in Jupyter Notebooks cannot handle messy real-world data, lack automated retraining pipelines, or introduce unsustainable cloud inference costs.',
      points: [
        { title: 'Model Drift & Degraded Accuracy', desc: 'Models failing over time as consumer behaviors and market trends evolve.' },
        { title: 'Massive GPU Inference Bills', desc: 'Deploying oversized models when lightweight, quantized architectures achieve the same result.' },
        { title: 'Dirty & Missing Training Data', desc: 'Inconsistent database records causing predictions to fail on edge cases.' }
      ]
    },
    ourSolution: {
      headline: 'Our Solution: Production MLOps, Model Quantization & Continuous Retraining',
      description: 'We build machine learning systems designed for production reality. Our data pipelines handle automated data cleaning, continuous model retraining, containerized inference endpoints, and real-time accuracy telemetry.',
      points: [
        { title: 'Continuous Retraining (MLOps)', desc: 'Pipelines that automatically ingest new records and retrain models to stay accurate.' },
        { title: 'Sub-25ms Quantized Inference', desc: 'Compiling models to ONNX and TensorRT for minimal compute overhead and fast replies.' },
        { title: 'Explainable AI Predictions', desc: 'SHAP and feature importance dashboards so your executives understand why a prediction was made.' }
      ]
    },
    capabilities: [
      {
        title: 'Predictive Customer & Churn Analytics',
        desc: 'Machine learning algorithms that predict customer lifetime value (LTV), identify churn risks weeks in advance, and recommend retention offers.'
      },
      {
        title: 'Demand Forecasting & Inventory Optimization',
        desc: 'Time-series forecasting models using Prophet and XGBoost to optimize stock levels, prevent stockouts, and reduce storage waste.'
      },
      {
        title: 'Automated Document & Text Classification',
        desc: 'Natural language models that parse incoming invoices, insurance claims, and legal filings, extracting structured data with 99%+ accuracy.'
      },
      {
        title: 'Recommendation Engines & Personalization',
        desc: 'Collaborative filtering and vector-based recommendation algorithms that suggest relevant products and content, driving higher cart sizes.'
      },
      {
        title: 'Continuous MLOps Pipelines',
        desc: 'Automated data validation, model tracking via MLflow, containerized deployment, and drift monitoring dashboards in production.'
      },
      {
        title: 'Local On-Premise AI Deployment',
        desc: 'Deploying neural networks securely inside your private cloud or on-premise servers with zero data sharing to external public model providers.'
      }
    ],
    technologies: [
      { name: 'PyTorch', category: 'Deep Learning Engine', icon: 'PyTorch' },
      { name: 'Python', category: 'Core Language', icon: 'Python' },
      { name: 'ScikitLearn', category: 'Statistical Modeling', icon: 'ScikitLearn' },
      { name: 'Pandas', category: 'Data Wrangling', icon: 'Pandas' },
      { name: 'NumPy', category: 'Array Computation', icon: 'NumPy' },
      { name: 'FastAPI', category: 'Inference Endpoint', icon: 'FastAPI' },
      { name: 'PostgreSQL', category: 'Feature Store', icon: 'PostgreSQL' },
      { name: 'Docker', category: 'Deployment', icon: 'Docker' }
    ],
    connectedCaseStudy: {
      slug: 'getscry',
      title: 'GetScry: Predictive Visitor Intent AI',
      badge: 'Case Study',
      description: 'Explore how we trained high-speed predictive machine learning models to detect real-time e-commerce buyer intent.'
    },
    faqs: [
      {
        question: 'How much data do we need to build a custom machine learning model?',
        answer: 'It depends on the complexity of the task. For tabular predictive problems (like churn or demand forecasting), a few thousand historical records are often sufficient. For complex deep learning tasks, we use transfer learning and synthetic augmentation to achieve high accuracy even with smaller datasets.'
      },
      {
        question: 'Will our proprietary company data be shared with OpenAI or public models?',
        answer: 'Never. We train models exclusively in private, isolated cloud or on-premise environments. Your data is strictly your property and is never used to train public third-party models.'
      },
      {
        question: 'How do you monitor the model to ensure it does not lose accuracy over time?',
        answer: 'We deploy MLOps drift telemetry that continuously tracks real-world model accuracy against predictions. If performance dips below an established threshold, the system triggers automated retraining pipelines.'
      },
      {
        question: 'Can the machine learning model be integrated into our existing web or mobile app?',
        answer: 'Yes. We package the trained model into a lightweight, containerized FastAPI microservice with sub-25ms response times that your existing application can query via standard REST requests.'
      }
    ]
  },

  'data-analytics': {
    slug: 'data-analytics',
    id: 'data-analytics',
    shortTitle: 'Data Analytics',
    title: 'Data Analytics, SQL Reporting & Executive KPI Dashboards',
    metaTitle: 'Data Analytics & Custom Executive KPI Dashboards | BrixelLabs',
    metaDescription: 'Transform raw database records into executive clarity. Python data science, advanced Excel models, PostgreSQL/SQL analytics, and automated dashboards.',
    category: 'Data Analytics & Web Scraping',
    icon: DataAnalyticsIcon,
    heroBadge: 'Python, SQL & Advanced Excel Analytics Specialists',
    tagline: 'Raw Database Records Transformed into High-Clarity Executive Dashboards & Strategic Foresight',
    overview: 'Businesses generate millions of database rows, transactions, and user logs every month, but without clear analytics, executives fly blind. BrixelLabs transforms fragmented numbers into clean statistical models, automated KPI dashboards, and high-clarity reporting decks built with Python, SQL, and Microsoft Excel.',
    metrics: [
      { label: 'Reporting Automation', value: '100%', hint: 'Zero Manual Copy-Paste' },
      { label: 'Query Execution Speed', value: '8x Faster', hint: 'Optimized SQL Indices' },
      { label: 'Data Accuracy Rate', value: '99.9%', hint: 'Automated Reconciliation' }
    ],
    theProblem: {
      headline: 'The Problem: Spreadsheet Chaos, Delayed Reports & Blind Decisions',
      description: 'Finance and operations teams spend 15+ hours every week manually exporting CSVs, wrestling with broken Excel VLOOKUP formulas, and arguing over conflicting metrics. By the time leadership receives a monthly report, the data is already weeks out of date.',
      points: [
        { title: 'Manual Spreadsheet Hell', desc: 'Hours wasted manually copying numbers between disconnected software platforms.' },
        { title: 'Conflicting Business Metrics', desc: 'Marketing, sales, and finance reporting three completely different revenue figures.' },
        { title: 'Slow Unindexed SQL Queries', desc: 'Database queries taking 45+ seconds to run, locking production tables and causing timeouts.' }
      ]
    },
    ourSolution: {
      headline: 'Our Solution: Single Source of Truth, Automated Pipelines & High-Clarity Visuals',
      description: 'We establish unified database analytics architectures. Using optimized SQL views, automated Python data wrangling pipelines, and dynamic dashboard interfaces, your executive team gets real-time insights with zero manual effort.',
      points: [
        { title: 'Single Source of Truth', desc: 'Unified database models that reconcile numbers across marketing, sales, and billing.' },
        { title: 'Automated Python Pipelines', desc: 'Automated cron scripts that clean, aggregate, and publish updated reports daily.' },
        { title: 'Executive-Ready Visualizations', desc: 'High-clarity charts, interactive filters, and summary decks designed for instant decision-making.' }
      ]
    },
    capabilities: [
      {
        title: 'Python Statistical Analysis & Data Wrangling',
        desc: 'Advanced exploratory data analysis (EDA), cohort analysis, and statistical significance testing using Pandas, NumPy, Matplotlib, and Seaborn.'
      },
      {
        title: 'Complex SQL Query Optimization & Data Modeling',
        desc: 'Designing star schemas, materialized views, window functions, and indexing strategies in PostgreSQL and MySQL for sub-second query performance.'
      },
      {
        title: 'Advanced Dynamic Excel Financial Models',
        desc: 'Dynamic multi-scenario financial forecasts, automated pivot tables, macro-enabled workflows, and executive C-suite spreadsheet suites.'
      },
      {
        title: 'Custom Web KPI Dashboards',
        desc: 'Interactive, real-time web dashboards built with React, Recharts, and WebSockets providing live revenue, conversion, and operational telemetry.'
      },
      {
        title: 'Automated Reconciliation & Audit Pipelines',
        desc: 'Automated scripts that cross-check Stripe payments, bank ledger records, and database orders to spot discrepancies immediately.'
      },
      {
        title: 'Cohort & Customer Lifetime Value (LTV) Modeling',
        desc: 'Deep-dive retention curves, customer acquisition cost (CAC) payback analysis, and product feature adoption funnels.'
      }
    ],
    technologies: [
      { name: 'Python', category: 'Data Science Core', icon: 'Python' },
      { name: 'Pandas', category: 'Data Wrangling', icon: 'Pandas' },
      { name: 'NumPy', category: 'Statistical Computation', icon: 'NumPy' },
      { name: 'PostgreSQL', category: 'Analytics Database', icon: 'PostgreSQL' },
      { name: 'FastAPI', category: 'Dashboard API', icon: 'FastAPI' },
      { name: 'React', category: 'Interactive Web Charts', icon: 'React' }
    ],
    connectedCaseStudy: {
      slug: 'getscry',
      title: 'GetScry: Real-Time E-Commerce Analytics',
      badge: 'Case Study',
      description: 'See how we engineered an enterprise analytics platform processing millions of real-time user browsing telemetry records.'
    },
    faqs: [
      {
        question: 'What data formats and databases can you connect to?',
        answer: 'We connect directly to PostgreSQL, MySQL, SQL Server, MongoDB, Google BigQuery, Snowflake, REST APIs, CSVs, and Excel workbooks to pull your disparate data sources into a unified reporting pipeline.'
      },
      {
        question: 'Can you help us automate our weekly and monthly Excel reports?',
        answer: 'Yes! That is one of our most popular services. We build automated Python scripts that pull fresh data directly from your database and populate clean, formatted Excel files automatically with zero manual copying.'
      },
      {
        question: 'Why not just use Microsoft PowerBI or Tableau?',
        answer: 'PowerBI and Tableau are great for basic charts, but they require expensive per-user monthly seat licenses, struggle with custom complex calculations, and lock your data into proprietary ecosystems. We build lightweight, custom dashboards and Python pipelines that you own completely with zero licensing fees.'
      },
      {
        question: 'How do you ensure our sensitive business metrics remain confidential?',
        answer: 'All data analysis is performed under strict Non-Disclosure Agreements (NDAs). We work on anonymized datasets, inside your secure private cloud, or on-premise without ever moving raw records to unverified third-party tools.'
      }
    ]
  }
};

export const SERVICES_LIST = Object.values(SERVICES_DATA);

export const getServiceBySlug = (slug) => {
  if (!slug) return null;
  const cleanSlug = slug.toLowerCase().replace(/^\/services\/?/, '').replace(/^\//, '').replace(/\/$/, '');
  
  // Direct match
  if (SERVICES_DATA[cleanSlug]) {
    return SERVICES_DATA[cleanSlug];
  }

  // Alias mapping
  const ALIAS_MAP = {
    'shopify': 'shopify-development',
    'shopify-store-development': 'shopify-development',
    'custom-shopify-development': 'shopify-development',
    'chatbots': 'ai-chatbots',
    'ai-chatbot': 'ai-chatbots',
    'chatbot': 'ai-chatbots',
    'smart-chatbots': 'ai-chatbots',
    'camera-ai': 'computer-vision',
    'computer-vision-solutions': 'computer-vision',
    'vision-ai': 'computer-vision',
    'webdev': 'web-development',
    'custom-web-development': 'web-development',
    'agentic-ai': 'ai-agents',
    'ai-agent-automation': 'ai-agents',
    'scraping': 'web-scraping',
    'automated-data-extraction': 'web-scraping',
    'data-scraping': 'web-scraping',
    'mobile': 'mobile-development',
    'mobile-app-development': 'mobile-development',
    'flutter-development': 'mobile-development',
    'api': 'api-development',
    'api-engineering': 'api-development',
    'rest-api-development': 'api-development',
    'uiux': 'ui-ux-design',
    'ui-ux': 'ui-ux-design',
    'product-design': 'ui-ux-design',
    'saas': 'custom-software',
    'saas-development': 'custom-software',
    'custom-software-development': 'custom-software',
    'aiml': 'machine-learning',
    'ai-ml': 'machine-learning',
    'ai-machine-learning': 'machine-learning',
    'analytics': 'data-analytics',
    'business-intelligence': 'data-analytics',
    'python-data-analytics': 'data-analytics'
  };

  const mappedKey = ALIAS_MAP[cleanSlug];
  if (mappedKey && SERVICES_DATA[mappedKey]) {
    return SERVICES_DATA[mappedKey];
  }

  return null;
};

