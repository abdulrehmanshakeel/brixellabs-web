import React, { useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons';
import { motion } from 'framer-motion';

export const TermsOfServicePage = ({ navigate }) => {
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
    document.title = 'Terms of Service | BrixelLabs';
  }, []);

  const sections = [
    {
      id: 'entity',
      title: '1. Contracting Entity & Acceptance of Terms',
      content: (
        <>
          These Terms of Service (&quot;Terms&quot;) constitute a legally binding agreement between you or the entity you represent (&quot;Client&quot;, &quot;you&quot;) and BrixelLabs (&quot;we&quot;, &quot;us&quot;, or &quot;our&quot;).
          <br /><br />
          • Company: BrixelLabs<br />
          • Operations: Jinnah Colony, Faisalabad, 38000, Pakistan<br />
          • Official Email: <a href="mailto:brixellabs@gmail.com" className="text-cyan-400 underline hover:text-cyan-300">brixellabs@gmail.com</a><br />
          • Telephone / WhatsApp: <a href="tel:+923449254864" className="text-cyan-400 underline hover:text-cyan-300">+92 344 9254864</a>
          <br /><br />
          By scheduling technical consultations, approving Statements of Work (SOW), or engaging BrixelLabs for engineering services, you confirm that you have read, understood, and agree to be bound by these Terms and our Privacy Policy.
        </>
      )
    },
    {
      id: 'services',
      title: '2. Professional Engineering Services Scope',
      content: `BrixelLabs provides specialized software engineering and artificial intelligence services including:
• Custom AI, Machine Learning, and Computer Vision models (YOLOv8, OpenCV, LangGraph).
• High-performance full-stack web platforms and backend API architectures.
• Custom Shopify store development, theme customization, and API integrations.
• Automated web extraction pipelines and enterprise data dashboards.

Each commercial project is governed by a mutually executed Statement of Work (SOW) defining technical specifications, sprint deliverables, timelines, and payment milestones.`
    },
    {
      id: 'zero-hidden-fees',
      title: '3. Transparent Pricing & Zero Hidden Fees Guarantee',
      content: `We adhere to a strict Zero Dark Pattern and Zero Hidden Fees standard:

• The price agreed upon in your written Statement of Work or invoice is the exact final price.
• BrixelLabs never charges hidden administrative surcharges, unannounced platform fees, or recurring membership subscriptions.
• Any optional out-of-scope work, third-party API costs (e.g. OpenAI tokens, AWS hosting, Shopify app licenses), or scope expansion must be explicitly authorized in writing via a signed change order before any work begins.`
    },
    {
      id: 'milestones-retainers',
      title: '4. Milestone Billing & Retainers',
      content: `To ensure alignment and transparency, projects are billed on a structured milestone basis via direct corporate bank wire (ACH / SWIFT) or official institutional invoicing. No payment processing or card entry occurs on the public website:
• Kickoff Sprint Retainer: Typically required prior to commencing technical discovery, systems architecture, and sprint 1 deliverables.
• Milestone Deliveries: Intermediate milestone payments are invoiced and due only upon staging review and client demonstration of specified deliverables.
• Final Settlement: Final source code handover, production deployment, and repository ownership transfers occur upon settlement of the final invoice.`
    },
    {
      id: 'ip-transfer',
      title: '5. Intellectual Property (IP) Ownership Transfer',
      content: `We believe in total client sovereignty over engineered software:

• Client Ownership: Upon 100% payment settlement for a milestone, all custom deliverables, including application source code, neural network fine-tuning checkpoints, trained models, database schemas, and technical documentation, are assigned 100% to the Client.
• Zero Public Model Training: BrixelLabs will NEVER utilize your proprietary business datasets, trade secrets, customer data, or code to train or improve third-party public foundation models.
• Pre-existing Utilities: Any open-source libraries (e.g., React, Django, TailwindCSS, PyTorch) or pre-existing developer boilerplates retained by BrixelLabs are licensed to the Client on a perpetual, royalty-free, worldwide basis.`
    },
    {
      id: 'fonts-assets',
      title: '6. Fonts, Icons & Digital Asset Licensing',
      content: `All design assets and libraries integrated by BrixelLabs comply with commercial licensing standards:
• Typography: Plus Jakarta Sans and Inter are licensed under the SIL Open Font License (OFL 1.1) for unrestricted commercial use.
• Iconography: Font Awesome Free (OFL / MIT / CC-BY 4.0) and Lucide Icons (ISC License).
• Stock Photography & Media: All demonstration photography and mockups are custom generated or licensed under commercial Creative Commons / Unsplash commercial licenses.`
    },
    {
      id: 'acceptable-use',
      title: '7. Prohibited & Unlawful Uses',
      content: `Clients agree not to engage BrixelLabs to develop, reverse engineer, or deploy systems intended for:
• Autonomous weapons, unmonitored physical harm, or surveillance targeting protected classes.
• Malicious automated scraping violating federal anti-hacking statutes (CFAA) or deliberate DDoS vectors.
• Deceptive deepfakes, non-consensual biometric processing, or automated fraud schemes.
• Any application knowingly collecting personal information from children under 13 in violation of COPPA.`
    },
    {
      id: 'warranty',
      title: '8. 14-Day Delivery Warranty & Defect Remedy',
      content: `We stand behind the engineering quality of shipped systems:

• Each milestone deliverable is accompanied by a complimentary 14-day Acceptance & Review Period commencing upon staging handover.
• During this window, BrixelLabs will remediate any reproducible bugs, deviations from the agreed SOW, or software crashes at zero additional cost.
• Ongoing post-deployment maintenance and SLA support are available under dedicated support retainers.`
    },
    {
      id: 'liability',
      title: '9. Limitation of Liability & Governing Law',
      content: `• Cap on Liability: To the maximum extent permitted by applicable law, BrixelLabs' aggregate liability arising out of any engagement shall not exceed the total fees actually paid by the Client under the applicable SOW during the preceding six (6) month period.
• Consequential Damages: Neither party shall be liable for indirect, incidental, punitive, or consequential damages.
• Governing Law: These Terms and any related disputes shall be governed by and construed in accordance with applicable laws, without regard to conflicts of law principles.
• Dispute Resolution: Parties agree to first attempt resolution through good-faith executive mediation before initiating formal legal proceedings.`
    },
    {
      id: 'modifications',
      title: '10. Amendments & Updates',
      content: `We may revise these Terms periodically to reflect evolving regulatory frameworks or architectural enhancements. Active contracts will always be governed by the version in effect at the time the SOW was executed.`
    }
  ];

  return (
    <div className="relative pt-32 sm:pt-40 pb-24 px-4 sm:px-6 lg:px-8 max-w-4xl mx-auto z-10">
      
      {/* Header */}
      <div className="text-center mb-14 space-y-3">
        <motion.h1 
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="text-4xl sm:text-5xl font-extrabold text-white tracking-tight"
        >
          Terms of Service
        </motion.h1>

        <motion.p 
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="text-sm sm:text-base text-slate-300 max-w-xl mx-auto font-normal leading-relaxed"
        >
          Clear, milestone-based terms protecting your intellectual property, data sovereignty, and deliverables.
        </motion.p>
      </div>


      {/* Detailed Sections */}
      <div className="space-y-10 border-t border-slate-800/80 pt-10">
        {sections.map((section, idx) => (
          <motion.div
            key={section.id}
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.05 + idx * 0.03 }}
            className="space-y-3"
          >
            <h2 className="text-lg sm:text-xl font-bold text-white tracking-tight">
              {section.title}
            </h2>

            <div className="text-sm text-slate-300 leading-relaxed whitespace-pre-line">
              {section.content}
            </div>
          </motion.div>
        ))}
      </div>

      {/* Legal Footer Navigation */}
      <div className="mt-14 pt-8 border-t border-slate-800/80 flex flex-wrap items-center justify-between gap-4">
        <div className="flex flex-wrap items-center gap-3 text-xs">
          <button
            onClick={() => navigate('/privacy-policy')}
            className="text-slate-400 hover:text-cyan-300 transition-colors underline cursor-pointer"
          >
            Privacy Policy
          </button>
          <span className="text-slate-600">·</span>
          <button
            onClick={() => navigate('/refund-policy')}
            className="text-slate-400 hover:text-cyan-300 transition-colors underline cursor-pointer"
          >
            Refund Policy
          </button>
          <span className="text-slate-600">·</span>
          <button
            onClick={() => navigate('/cookie-policy')}
            className="text-slate-400 hover:text-cyan-300 transition-colors underline cursor-pointer"
          >
            Cookie Policy
          </button>
          <span className="text-slate-600">·</span>
          <button
            onClick={() => navigate('/data-deletion')}
            className="text-slate-400 hover:text-cyan-300 transition-colors underline cursor-pointer"
          >
            Data Deletion
          </button>
        </div>

        <button
          onClick={() => navigate('/')}
          className="inline-flex items-center gap-2 text-white hover:text-cyan-300 text-sm font-semibold cursor-pointer"
        >
          <FontAwesomeIcon icon={faArrowLeft} className="w-4 h-4 text-white" />
          <span>Return to Homepage</span>
        </button>
      </div>

    </div>
  );
};

export default TermsOfServicePage;
