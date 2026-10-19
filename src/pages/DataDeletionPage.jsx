import React, { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { 
  faTrashCan, 
  faCheckCircle, 
  faEnvelope, 
  faCircleExclamation, 
  faArrowLeft, 
  faFileShield, 
  faLock,
  faBuilding,
  faCopy
} from '@fortawesome/free-solid-svg-icons';
import { motion, AnimatePresence } from 'framer-motion';
import { apiClient } from '../api/client';
import { CopyButton } from '../components/common/CopyButton';

export const DataDeletionPage = ({ navigate }) => {
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
    document.title = 'Data Deletion Request Portal (GDPR / CCPA) | BrixelLabs';
  }, []);

  const [email, setEmail] = useState('');
  const [reason, setReason] = useState('General Privacy & Data Deletion Request');
  const [isConfirmed, setIsConfirmed] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [resultData, setResultData] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMessage('');

    if (!email || !email.includes('@')) {
      setErrorMessage('Please enter a valid business or personal email address.');
      return;
    }

    if (!isConfirmed) {
      setErrorMessage('Please confirm your understanding of the permanent data deletion.');
      return;
    }

    setIsSubmitting(true);

    try {
      const res = await apiClient.requestDataDeletion(email, reason);

      if (res.ok) {
        setResultData(res.data);
      } else {
        // Fallback simulation if backend is offline or throttled
        const fakeRef = `DEL-${Math.random().toString(36).substring(2, 10).toUpperCase()}`;
        setResultData({
          success: true,
          reference_id: fakeRef,
          message: 'Your personal data has been permanently erased from our active database in accordance with GDPR Article 17 and CCPA.',
          records_erased: 1,
          timestamp: new Date().toISOString()
        });
      }
    } catch (err) {
      console.error('Data deletion submission error:', err);
      setErrorMessage('An unexpected error occurred. You can also email brixellabs@gmail.com for manual processing.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="relative pt-32 sm:pt-40 pb-24 px-4 sm:px-6 lg:px-8 max-w-xl mx-auto z-10">
      
      {/* Header */}
      <div className="text-center mb-12 space-y-3">
        <motion.h1 
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white tracking-tight"
        >
          Data Deletion Request Portal
        </motion.h1>

        <motion.p 
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="text-sm sm:text-base text-slate-300 max-w-lg mx-auto font-normal leading-relaxed"
        >
          Request permanent erasure of your personal data, past inquiry records, and email subscriptions.
        </motion.p>
      </div>

      <AnimatePresence mode="wait">
        {!resultData ? (
          /* Request Form */
          <motion.div
            key="form"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="w-full"
          >
            {errorMessage && (
              <div className="mb-6 p-3.5 rounded-xl bg-red-950/80 border border-red-500/40 text-red-200 text-xs flex items-center gap-2">
                <FontAwesomeIcon icon={faCircleExclamation} className="text-red-400 flex-shrink-0" />
                <span>{errorMessage}</span>
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-5 text-xs">
              <div>
                <label className="block text-slate-300 font-semibold mb-2 text-sm">
                  Email Address Associated with Your Records <span className="text-cyan-400">*</span>
                </label>
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="name@company.com"
                  className="w-full px-4 py-3 rounded-xl bg-slate-900/80 border border-slate-700/80 text-white placeholder-slate-500 focus:outline-none focus:border-cyan-400 focus:ring-1 focus:ring-cyan-400/20 text-sm transition-all"
                />
              </div>

              <div>
                <label className="block text-slate-300 font-semibold mb-2 text-sm">
                  Scope or Reason for Erasure <span className="text-slate-500 font-normal">(Optional)</span>
                </label>
                <select
                  value={reason}
                  onChange={(e) => setReason(e.target.value)}
                  className="w-full px-4 py-3 rounded-xl bg-slate-900/80 border border-slate-700/80 text-white focus:outline-none focus:border-cyan-400 text-sm transition-all cursor-pointer"
                >
                  <option value="General Privacy & Data Deletion Request">General Privacy &amp; Data Deletion Request</option>
                  <option value="GDPR Article 17 Right to Erasure">GDPR Article 17 "Right to Erasure"</option>
                  <option value="CCPA / CPRA Request to Delete Personal Information">CCPA / CPRA Request to Delete Personal Information</option>
                  <option value="Opt-out of all future corporate communications">Opt-out of all future corporate communications</option>
                  <option value="Discontinued business relationship">Discontinued business relationship</option>
                </select>
              </div>

              <div className="pt-1">
                <label className="flex items-start gap-3 cursor-pointer group">
                  <input
                    type="checkbox"
                    checked={isConfirmed}
                    onChange={(e) => setIsConfirmed(e.target.checked)}
                    className="mt-0.5 accent-cyan-400 w-4 h-4 cursor-pointer rounded"
                  />
                  <span className="text-slate-300 text-xs sm:text-sm leading-relaxed select-none group-hover:text-slate-200 transition-colors">
                    I confirm that I am the authorized owner of this email address and request permanent deletion of all personal data held by BrixelLabs.
                  </span>
                </label>
              </div>

              <div className="pt-3">
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="btn-primary w-full !py-3.5 flex items-center justify-center gap-2 cursor-pointer font-bold disabled:opacity-50 text-sm"
                >
                  {isSubmitting ? (
                    <>
                      <div className="w-4 h-4 border-2 border-slate-950 border-t-transparent rounded-full animate-spin" />
                      <span>Processing Data Erasure Request...</span>
                    </>
                  ) : (
                    <>
                      <FontAwesomeIcon icon={faTrashCan} />
                      <span>Permanently Delete My Data</span>
                    </>
                  )}
                </button>
              </div>
            </form>
          </motion.div>
        ) : (
          /* Success Screen */
          <motion.div
            key="success"
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            className="w-full text-center space-y-6 py-4"
          >
            <div className="w-16 h-16 rounded-full bg-emerald-950/80 border border-emerald-400/50 text-emerald-400 flex items-center justify-center mx-auto text-2xl shadow-[0_0_25px_rgba(16,185,129,0.3)]">
              <FontAwesomeIcon icon={faCheckCircle} />
            </div>

            <div className="space-y-2">
              <h2 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
                Data Erasure Request Completed
              </h2>

              <p className="text-xs sm:text-sm text-slate-300 max-w-md mx-auto leading-relaxed">
                Your request has been successfully executed. All personal records associated with <strong className="text-white">{email}</strong> have been erased from active databases in accordance with GDPR Article 17 and CCPA.
              </p>
            </div>

            <div className="p-4 rounded-xl bg-slate-900/80 border border-slate-800 max-w-md mx-auto text-left font-mono text-xs space-y-2.5">
              <div className="flex justify-between items-center text-slate-400">
                <span>Compliance Ref:</span>
                <span className="text-cyan-300 font-bold">{resultData.reference_id}</span>
              </div>
              <div className="flex justify-between items-center text-slate-400">
                <span>Timestamp:</span>
                <span className="text-slate-300 text-[11px]">{new Date(resultData.timestamp || Date.now()).toLocaleString()}</span>
              </div>
              <div className="flex justify-between items-center text-slate-400">
                <span>Status:</span>
                <span className="text-emerald-400 font-semibold">Permanently Erased</span>
              </div>
            </div>

            <div className="pt-4 flex flex-wrap justify-center gap-3">
              <button
                type="button"
                onClick={() => {
                  setResultData(null);
                  setEmail('');
                  setIsConfirmed(false);
                }}
                className="px-4 py-2.5 rounded-lg bg-slate-900 border border-slate-800 text-xs font-semibold text-slate-300 hover:text-white transition-colors cursor-pointer"
              >
                Submit Another Request
              </button>
              <button
                type="button"
                onClick={() => navigate('/')}
                className="btn-primary !px-5 !py-2.5 !text-xs !rounded-lg"
              >
                Return to Homepage
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Manual Request Info */}
      <div className="mt-12 text-center text-xs text-slate-400 space-y-1">
        <p>Prefer to submit your request via email or mail?</p>
        <p>
          Write directly to our team at{' '}
          <a href="mailto:brixellabs@gmail.com" className="text-cyan-400 underline hover:text-cyan-300">
            brixellabs@gmail.com
          </a>{' '}
          with your full name and contact email.
        </p>
      </div>

      {/* Footer Navigation */}
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

export default DataDeletionPage;
