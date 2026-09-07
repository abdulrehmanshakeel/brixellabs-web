import os
from django.core.management.base import BaseCommand
from django.contrib.auth.models import User
from core.models import Inquiry, Service, PortfolioItem, TeamMember, SiteSetting, AuditLog

class Command(BaseCommand):
    help = 'Seeds the database with initial BrixelLabs data and creates superuser'

    def handle(self, *args, **options):
        self.stdout.write(self.style.NOTICE("Seeding BrixelLabs Database..."))

        # 1. Create Superuser / Admin
        username = os.environ.get('DJANGO_ADMIN_USER', 'admin')
        email = os.environ.get('DJANGO_ADMIN_EMAIL', 'admin@brixellabs.com')
        password = os.environ.get('DJANGO_ADMIN_PASS', 'Admin@Brixel2026')

        user, created = User.objects.get_or_create(username=username, defaults={'email': email, 'is_staff': True, 'is_superuser': True})
        if created:
            user.set_password(password)
            user.save()
            self.stdout.write(self.style.SUCCESS(f"Created initial superuser: {username} ({email})"))
        else:
            self.stdout.write(self.style.NOTICE(f"Superuser '{username}' already exists in DB. Keeping existing password."))


        # 2. Inquiries table kept clean for real clients

        # 3. Seed Services

        services_data = [
            {
                'id': 'srv-uiux',
                'title': 'UI/UX Design',
                'category': 'Design & Dev',
                'description': 'Human-centric UI/UX design, interactive wireframing, high-fidelity prototypes, and comprehensive multi-platform design systems.',
                'bullets': ['User Research & Journeys', 'Wireframing & Interactive Prototypes', 'Design System Architecture'],
                'active': True,
                'order': 1
            },
            {
                'id': 'srv-fullstack',
                'title': 'Web & Mobile Full-Stack',
                'category': 'Engineering',
                'description': 'Modern web and mobile applications using React, Next.js, Node.js, Python/Django, and Flutter built for massive scale.',
                'bullets': ['Responsive Next.js / React Apps', 'Cross-Platform Flutter / Kotlin', 'Scalable Cloud Microservices'],
                'active': True,
                'order': 2
            },
            {
                'id': 'srv-agentic',
                'title': 'Agentic AI & Automation',
                'category': 'AI & ML',
                'description': 'Custom multi-agent workflows, LangGraph graphs, autonomous tool-calling loops, and intelligent workflow automations.',
                'bullets': ['LangGraph Multi-Agent Workflows', 'Autonomous Tool Calling & HITL', 'Groq & OpenAI Low-Latency Pipelines'],
                'active': True,
                'order': 3
            },
            {
                'id': 'srv-vision',
                'title': 'Computer Vision',
                'category': 'AI & ML',
                'description': 'High-precision object detection, defect inspection, and spatial telemetry built on YOLOv8, PyTorch, and OpenCV.',
                'bullets': ['Industrial Defect Detection (YOLOv8)', 'Real-Time Edge Camera Pipelines', 'Segmentation & Anomaly Scoring'],
                'active': True,
                'order': 4
            },
            {
                'id': 'srv-chatbot',
                'title': 'Chatbot Integration & RAG',
                'category': 'AI & ML',
                'description': 'Domain-specific enterprise conversational agents and Retrieval-Augmented Generation across your private knowledge base.',
                'bullets': ['Vector Database Embeddings (Qdrant/Pinecone)', 'Private Knowledge RAG Search', 'Multi-Turn Conversational Checkpoints'],
                'active': True,
                'order': 5
            },
            {
                'id': 'srv-analytics',
                'title': 'Data Analytics (Python, Excel, SQL)',
                'category': 'Data Intelligence',
                'description': 'End-to-end data pipelines, statistical modeling in Python, interactive dashboards, and executive reporting.',
                'bullets': ['Automated Python ETL Pipelines', 'Advanced SQL Warehousing & Views', 'Executive Excel / Tableau KPI Dashboards'],
                'active': True,
                'order': 6
            }
        ]

        for item in services_data:
            Service.objects.update_or_create(id=item['id'], defaults=item)
        self.stdout.write(self.style.SUCCESS(f"Seeded {len(services_data)} services"))

        # 4. Seed Portfolio Case Studies
        portfolio_data = [
            {
                'id': 'noesis',
                'title': 'Noesis — AI Study Assistant',
                'client': 'EdTech Research',
                'category': 'Agentic AI / LLM',
                'metric': 'HITL Interrupt + MemorySaver',
                'accuracy': '100% Adaptive Synthesis',
                'description': 'Autonomous multi-agent learning assistant built on LangGraph that adapts topic synthesis, conducts live web research, and generates calibrated quizzes.',
                'tags': ['LangGraph', 'LangChain', 'Groq (LLaMA 3.3 70B)', 'Tavily Search API', 'Wikipedia API', 'Streamlit'],
                'link': '/case-studies/noesis',
                'featured': True,
                'order': 1
            },
            {
                'id': 'the-watcher',
                'title': 'The Watcher — AI Child Monitoring',
                'client': 'Family & Child Safety',
                'category': 'AI Child Safety & Mobile',
                'metric': 'Real-Time Telemetry Inference',
                'accuracy': 'Contextual ML Risk Engine',
                'description': 'Intelligent parental safety platform combining real-time ML activity classification with LangGraph agentic reasoning across Flutter & Kotlin apps.',
                'tags': ['LangGraph', 'Django', 'Flutter', 'Kotlin', 'Machine Learning', 'Python'],
                'link': '/case-studies/the-watcher',
                'featured': True,
                'order': 2
            },
            {
                'id': 'threadeye',
                'title': 'ThreadEye — Defect Inspection',
                'client': 'Industrial Manufacturing',
                'category': 'Computer Vision / Edge ML',
                'metric': '<18ms Inference Latency',
                'accuracy': '94.2% Flaw Detection Recall',
                'description': 'Real-time fabric flaw and weave blemish segmentation system benchmarked on AITEX research datasets for continuous industrial loom operations.',
                'tags': ['PyTorch', 'YOLOv8-seg', 'OpenCV', 'FastAPI', 'AITEX Dataset'],
                'link': '/case-studies/threadeye',
                'featured': True,
                'order': 3
            },
            {
                'id': 'getscry',
                'title': 'GetScry — Predictive Retention Engine',
                'client': 'E-Commerce Enterprise',
                'category': 'Machine Learning / Analytics',
                'metric': '+34% Conversion Lift',
                'accuracy': '94.8% ROC-AUC Accuracy',
                'description': 'Real-time intent scoring and coupon leakage prevention engine calculating checkout exit likelihood via calibrated XGBoost classifiers.',
                'tags': ['XGBoost', 'Scikit-Learn', 'FastAPI', 'SHAP', 'React / Tailwind'],
                'link': '/case-studies/getscry',
                'featured': True,
                'order': 4
            },
            {
                'id': 'frontdesk-ai',
                'title': 'FrontDesk AI — Autonomous Receptionist',
                'client': 'Hospitality & Healthcare',
                'category': 'Conversational AI / RAG',
                'metric': 'Zero Queue Wait Time',
                'accuracy': '98.5% Intent Classification',
                'description': 'Multi-modal voice and chat front-desk orchestrator handling visitor check-ins, appointment scheduling, and domain-specific triage.',
                'tags': ['FastAPI', 'Whisper AI', 'LangChain', 'PostgreSQL', 'Twilio'],
                'link': '/case-studies/frontdesk-ai',
                'featured': False,
                'order': 5
            }
        ]

        for item in portfolio_data:
            PortfolioItem.objects.update_or_create(id=item['id'], defaults=item)
        self.stdout.write(self.style.SUCCESS(f"Seeded {len(portfolio_data)} portfolio case studies"))

        # 5. Team members table kept clean for custom team members

        # 6. Seed Site Settings
        settings_data = [
            {
                'key': 'general',
                'value': {
                    'agencyName': 'BrixelLabs AI Systems',
                    'tagline': 'Engineering Autonomous AI Agents & Production Computer Vision',
                    'contactEmail': 'contact@brixellabs.com',
                    'contactPhone': '+1 (555) 019-2834',
                    'officeLocation': 'Global Distributed AI Studio',
                    'consultationCalendarUrl': 'https://cal.com/brixellabs',
                    'maintenanceMode': False
                },
                'description': 'Primary agency contact information and branding metadata'
            }
        ]

        for item in settings_data:
            SiteSetting.objects.update_or_create(key=item['key'], defaults=item)
        self.stdout.write(self.style.SUCCESS(f"Seeded {len(settings_data)} site settings"))

        # 7. Seed Initial Audit Log
        AuditLog.objects.create(
            action="System Initialized",
            details="Django REST Framework backend successfully seeded and initialized.",
            user="System Seeder",
            ip_address="127.0.0.1"
        )
        self.stdout.write(self.style.SUCCESS("Database seeding completed successfully!"))
