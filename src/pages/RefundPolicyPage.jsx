import React, { useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons';
import { motion } from 'framer-motion';

export const RefundPolicyPage = ({ navigate }) => {
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
    document.title = 'Refund & Milestone Cancellation Policy | BrixelLabs';
  }, []);

  const sections = [
    {
      id: 'commitment',
      title: '1. Transparent Milestone-Based Refund Framework',
      content: `At BrixelLabs, we operate on an engineering milestone and deliverable model. Because our engagements involve senior engineering teams, custom machine learning models, and architectural sprints, we structure our refund policy to ensure fairness, accountability, and complete transparency.

We do NOT impose hidden penalty charges, complex cancellation fees, or non-refundable lock-ins.`
    },
    {
      id: 'pre-kickoff',
      title: '2. 100% Full Refund Prior to Sprint Kickoff',
      content: `• Retainer Cancellation Window: If you pay an initial sprint retainer or consultation deposit and decide to cancel before our engineering team begins sprint discovery, systems scoping, or code execution (within 5 business days of payment), you are entitled to a 100% full refund.
• No Questions Asked: No cancellation fees, processing penalties, or administrative charges will be deducted. The full amount paid is credited back directly to your originating corporate bank account or issued as an immediate credit note.`
    },
    {
      id: 'in-progress-milestones',
      title: '3. In-Progress Milestone Prorated Adjustments',
      content: `If a project is discontinued mid-sprint by mutual agreement:
• Completed Deliverables: Any milestone completed, reviewed, and accepted by the client is non-refundable, and full IP ownership of all source code, models, and assets is permanently transferred to the client.
• Unstarted Milestones: Any funds held on retainer for future, uncommenced milestones are 100% fully refunded immediately.
• Partial Milestones: If work is halted during an active milestone, billing is prorated based on verified sprint deliverables achieved, and any unused balance is promptly returned.`
    },
    {
      id: 'warranty-remedy',
      title: '4. 14-Day Delivery Warranty & Milestone Remedy',
      content: `Every milestone delivery is accompanied by a complimentary 14-day Acceptance & Review Window:
• Defect Remedy Guarantee: If delivered code, AI models, or web interfaces fail to perform in accordance with the mutually executed Statement of Work (SOW), our team will fix and remediate all reproducible bugs at zero additional cost.
• Failure to Remediate: In the rare event that BrixelLabs is unable to deliver a functional solution meeting the core technical criteria of the agreed milestone within the remedy window, the client will receive a 100% refund for that specific milestone.`
    },
    {
      id: 'no-hidden-fees',
      title: '5. Zero Hidden Cancellation Fees Guarantee',
      content: `• We guarantee that the price stated on your contract or invoice is the exact final transaction amount.
• We do not assess arbitrary cancellation fees, restocking charges, or software licensing exit penalties.
• Outgoing corporate bank wire, ACH, or SWIFT transfer remittance fees for valid refunds initiated prior to kickoff are fully absorbed by BrixelLabs.`
    },
    {
      id: 'processing-time',
      title: '6. Refund Processing Timelines & Direct Settlement Methods',
      content: `• No On-Site Card Processing: BrixelLabs does not collect, charge, or process credit card payments through the public website. All commercial payments and disbursements are executed strictly through verified corporate banking channels.
• Corporate Bank Wire / ACH Refunds: Once approved, wire transfer refunds are dispatched via corporate domestic ACH or international SWIFT wire directly to your business bank account within 3 business days of bank detail confirmation.
• Written Confirmation: You will receive an official PDF credit memo and bank remittance transaction receipt verifying the refund dispatch.`
    },
    {
      id: 'request-process',
      title: '7. How to Submit a Refund Request',
      content: (
        <>
          To submit a milestone cancellation or refund inquiry:
          <br /><br />
          1. Email our billing department at <a href="mailto:brixellabs@gmail.com" className="text-cyan-400 underline hover:text-cyan-300">brixellabs@gmail.com</a> with the subject line &quot;Refund Request - [Your Invoice/Contract #]&quot;.<br />
          2. Include your company name, project title, and the specific milestone in question.<br />
          3. Our accounts team will review and respond with a formal resolution within 24 business hours.
          <br /><br />
          You may also contact your assigned Engineering Lead directly, call us directly at <a href="tel:+923449254864" className="text-cyan-400 underline hover:text-cyan-300">+92 344 9254864</a>, or reach our billing support team via WhatsApp at <a href="https://wa.me/923449254864" target="_blank" rel="noopener noreferrer" className="text-emerald-400 underline hover:text-emerald-300">+92 344 9254864</a>.
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
          Refund &amp; Cancellation Policy
        </motion.h1>

        <motion.p 
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="text-sm sm:text-base text-slate-300 max-w-xl mx-auto font-normal leading-relaxed"
        >
          100% pre-kickoff refunds, prorated milestone protections, and zero hidden penalty fees.
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

      {/* Quick Navigation Footer */}
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
            onClick={() => navigate('/terms-of-service')}
            className="text-slate-400 hover:text-cyan-300 transition-colors underline cursor-pointer"
          >
            Terms of Service
          </button>
          <span className="text-slate-600">·</span>
          <button
            onClick={() => navigate('/cookie-policy')}
            className="text-slate-400 hover:text-cyan-300 transition-colors underline cursor-pointer"
          >
            Cookie Policy
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

export default RefundPolicyPage;
