import React, { useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons';
import { motion } from 'framer-motion';

export const PrivacyPolicyPage = ({ navigate }) => {
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
    document.title = 'Privacy Policy & Data Protection | BrixelLabs';
  }, []);

  const sections = [
    {
      id: 'entity-details',
      title: '1. Business Entity & Data Controller Details',
      content: (
        <>
          This Privacy Policy governs the technical services, software engineering platforms, and website operations of BrixelLabs (&quot;we&quot;, &quot;us&quot;, or &quot;our&quot;).
          <br /><br />
          • Company: BrixelLabs<br />
          • Operations: Jinnah Colony, Faisalabad, 38000, Pakistan<br />
          • Official Email: <a href="mailto:brixellabs@gmail.com" className="text-cyan-400 underline hover:text-cyan-300">brixellabs@gmail.com</a><br />
          • Telephone / WhatsApp: <a href="tel:+923449254864" className="text-cyan-400 underline hover:text-cyan-300">+92 344 9254864</a>
        </>
      )
    },
    {
      id: 'commitment',
      title: '2. Core Privacy Commitment & AI Data Isolation Guarantee',
      content: `At BrixelLabs, we build custom AI models, camera computer vision systems, and enterprise web applications. We operate under a strict "Zero Public Model Training" guarantee:

• Your proprietary business datasets, source codebases, client activity logs, and technical specifications are NEVER used to train, retrain, or fine-tune public multi-tenant foundation models (such as OpenAI, Anthropic, Google, or Meta models) without explicit, contractual authorization.
• All neural weights, embeddings, vector indices, and database stores are deployed in isolated client-dedicated environments.
• Client intellectual property remains 100% private, sovereign, and secure.`
    },
    {
      id: 'data-minimization',
      title: '3. Data Minimization & Information We Collect',
      content: `In accordance with GDPR Article 5(1)(c) and privacy best practices, we practice strict data minimization. We only collect the minimal personal data strictly necessary to fulfill technical consultations and execute service contracts:

• Necessary Contact Information: Full name, business email address, optional contact phone/WhatsApp, and company name.
• Technical Project Briefs: Requirements, target architecture, budgets, and milestones voluntarily provided via consultation forms.
• Zero Payment Card Data: Our website does NOT host payment checkouts, credit card gateways, or billing input forms. We never collect, process, or store credit card numbers, CVVs, or cardholder financial credentials on our website or databases. All enterprise contracts and milestone retainers are settled off-platform via direct corporate bank wire (ACH / SWIFT) or official institutional invoicing.
• Telemetry & Performance Logs: Server diagnostic logs (IP address, user-agent, request timestamp) retained on an automated 30-day rolling rotation solely for DDoS mitigation, rate limiting, and incident forensics.

WHAT WE NEVER COLLECT:
We do NOT collect credit/debit card numbers, CVV codes, bank credentials, Social Security Numbers, government IDs, biometric data, sensitive demographic attributes, location tracking, or cross-site behavioral histories.`
    },
    {
      id: 'coppa-minors',
      title: '4. Children’s Privacy & Age Verification (COPPA / GDPR Art. 8)',
      content: (
        <>
          BrixelLabs services, platforms, and commercial software are strictly intended for business enterprises and individuals who are at least 18 years of age.
          <br /><br />
          • We do NOT knowingly solicit, collect, or store personal data from children under 13 (or under 16 within the European Economic Area and the United Kingdom).<br />
          • If we discover that personal information has been inadvertently submitted by a minor without verified parental/guardian consent, we immediately purge all associated records from our active databases.<br />
          • If you believe a minor has provided information to our platform, please immediately notify our Data Protection Officer at <a href="mailto:brixellabs@gmail.com" className="text-cyan-400 underline hover:text-cyan-300">brixellabs@gmail.com</a> with the subject line &quot;COPPA Data Erasure Request&quot;.
        </>
      )
    },
    {
      id: 'sdk-audit',
      title: '5. Third-Party SDK & Subprocessor Transparency Audit',
      content: `We audit and maintain strict vendor agreements with all third-party SDKs and service providers:

1. Cloudflare Turnstile:
   • Purpose: Privacy-first bot defense and contact form spam prevention.
   • Data Impact: Evaluates transient browser telemetry to distinguish human traffic without tracking browsing history across different sites or using interactive puzzle trackers.

2. Google Analytics 4 (GA4):
   • Purpose: Website navigation analytics and error monitoring.
   • Privacy Protection: Configured with IP Anonymization enforced, cross-device ad personalization disabled, and non-essential cookies gated behind our Cookie Consent Banner.

3. Zero Payment Gateway Subprocessors:
   • Scope: We do not integrate, load, or run any third-party payment gateways, checkout iframes, or transaction tracking scripts (e.g., Stripe, PayPal) on this website.

4. Typography & Icons (Google Fonts / FontAwesome):
   • Loaded under SIL Open Font License (OFL 1.1) and MIT licenses with privacy-preserving preconnect headers.`
    },
    {
      id: 'cookies',
      title: '6. Cookies & Tracking Technologies',
      content: `We use cookies strictly for security, essential site functionality, and aggregate performance metrics. We do NOT deploy third-party advertising retargeting or cross-site tracking pixels.

You can review our full cookie classification, duration periods, and consent controls in our dedicated Cookie Policy.`
    },
    {
      id: 'ip-ownership',
      title: '7. Intellectual Property (IP) Transfer & Bilateral NDAs',
      content: `All custom source code, models, neural network weights, configurations, and technical assets developed by BrixelLabs are transferred 100% to the client upon milestone payment settlement.

We routinely execute mutual non-disclosure agreements (NDAs) prior to architectural reviews to ensure complete legal protection of proprietary data.`
    },
    {
      id: 'user-rights',
      title: '8. Your Rights (GDPR, CCPA & Global Privacy Standards)',
      content: `Regardless of your physical location, BrixelLabs accords you full control over your personal data:

• Right of Access & Portability: Request an export of any personal records we retain regarding your inquiries.
• Right to Rectification: Correct inaccurate or outdated business contact details.
• Right to Erasure ("Right to be Forgotten"): Demand permanent deletion of your contact records and email subscriptions.
• Right to Opt-Out: Immediately withdraw consent from marketing emails and newsletters via the one-click unsubscribe links embedded in every email footer.
• Right to Non-Discrimination: Exercising your privacy rights will never result in altered service pricing or degraded support.`
    },
    {
      id: 'data-deletion-cta',
      title: '9. Self-Service Data Deletion Request',
      content: `Under GDPR Article 17 and CCPA, you can submit an instant self-service data erasure request at any time using our dedicated Data Deletion Request portal. Submitting your email immediately removes your records from active subscriber databases and anonymizes prior communication histories with an immutable compliance reference ID.`
    },
    {
      id: 'contact-dpo',
      title: '10. Contacting Our Data Protection Officer',
      content: (
        <>
          For inquiries regarding this Privacy Policy, data processing, or privacy requests, contact:
          <br /><br />
          BrixelLabs<br />
          Jinnah Colony, Faisalabad, 38000, Pakistan<br />
          Email: <a href="mailto:brixellabs@gmail.com" className="text-cyan-400 underline hover:text-cyan-300">brixellabs@gmail.com</a> · Phone/WhatsApp: <a href="tel:+923449254864" className="text-cyan-400 underline hover:text-cyan-300">+92 344 9254864</a>
        </>
      )
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
          Privacy Policy &amp; Data Governance
        </motion.h1>

        <motion.p 
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="text-sm sm:text-base text-slate-300 max-w-xl mx-auto font-normal leading-relaxed"
        >
          Effective Date: October 2026 · Last Updated: October 18, 2026
        </motion.p>
      </div>

      {/* Detailed Policy Sections */}
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

      {/* Legal Hub Quick Links */}
      <div className="mt-14 pt-8 border-t border-slate-800/80 flex flex-wrap items-center justify-between gap-4">
        <div className="flex flex-wrap items-center gap-3 text-xs">
          <button
            onClick={() => navigate('/terms-of-service')}
            className="text-slate-400 hover:text-cyan-300 transition-colors underline cursor-pointer"
          >
            Terms of Service
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
            Data Deletion Portal
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

export default PrivacyPolicyPage;
