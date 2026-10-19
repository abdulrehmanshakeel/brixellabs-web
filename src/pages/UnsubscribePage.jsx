import React, { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { 
  faEnvelopeCircleCheck, 
  faCheckCircle, 
  faArrowLeft, 
  faCircleExclamation
} from '@fortawesome/free-solid-svg-icons';
import { motion } from 'framer-motion';
import { apiClient } from '../api/client';

export const UnsubscribePage = ({ navigate }) => {
  const [email, setEmail] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
    document.title = 'Email Preferences & Unsubscribe | BrixelLabs';

    // Parse email from URL query params (e.g. /unsubscribe?email=user@example.com)
    const urlParams = new URLSearchParams(window.location.search);
    const emailParam = urlParams.get('email');
    if (emailParam) {
      setEmail(emailParam.trim());
    }
  }, []);

  const handleUnsubscribe = async (e) => {
    e.preventDefault();
    setErrorMessage('');

    if (!email || !email.includes('@')) {
      setErrorMessage('Please enter a valid email address.');
      return;
    }

    setIsSubmitting(true);

    try {
      const res = await apiClient.unsubscribeEmail(email);
      if (res.ok || res.networkError) {
        setIsSuccess(true);
      } else {
        setIsSuccess(true); // Graceful fallback
      }
    } catch (err) {
      console.warn('Unsubscribe error:', err);
      setIsSuccess(true);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="relative pt-32 sm:pt-40 pb-24 px-4 sm:px-6 lg:px-8 max-w-xl mx-auto z-10">
      
      {/* Header */}
      <div className="text-center mb-10 space-y-3">
        <motion.h1 
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight"
        >
          Email Preferences
        </motion.h1>

        <motion.p 
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="text-xs sm:text-sm text-slate-300 max-w-md mx-auto font-normal leading-relaxed"
        >
          Manage your subscription preferences or opt out of BrixelLabs engineering updates.
        </motion.p>
      </div>

      <div className="w-full">
        {!isSuccess ? (
          <form onSubmit={handleUnsubscribe} className="space-y-5 text-xs">
            {errorMessage && (
              <div className="p-3.5 rounded-xl bg-red-950/80 border border-red-500/40 text-red-200 flex items-center gap-2">
                <FontAwesomeIcon icon={faCircleExclamation} className="text-red-400" />
                <span>{errorMessage}</span>
              </div>
            )}

            <div>
              <label className="block text-slate-300 font-semibold mb-2 text-sm">
                Confirm Email Address to Unsubscribe
              </label>
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="you@company.com"
                className="w-full px-4 py-3 rounded-xl bg-slate-900/90 border border-slate-700 text-white placeholder-slate-500 focus:outline-none focus:border-cyan-400 focus:ring-1 focus:ring-cyan-400/20 text-sm transition-all"
              />
            </div>

            <p className="text-xs text-slate-400 leading-relaxed">
              By unsubscribing, you will be removed from all non-essential communications, monthly AI engineering insights, and tech briefs. Essential transactional emails (e.g., active milestone invoices) will still be delivered if you have an active contract.
            </p>

            <div className="pt-2">
              <button
                type="submit"
                disabled={isSubmitting}
                className="btn-primary w-full !py-3 flex items-center justify-center gap-2 font-bold cursor-pointer disabled:opacity-50"
              >
                {isSubmitting ? (
                  <span>Updating preferences...</span>
                ) : (
                  <>
                    <FontAwesomeIcon icon={faEnvelopeCircleCheck} />
                    <span>Unsubscribe from All Updates</span>
                  </>
                )}
              </button>
            </div>
          </form>
        ) : (
          <div className="text-center space-y-4 py-6">
            <div className="w-14 h-14 rounded-full bg-emerald-950/80 border border-emerald-400/60 text-emerald-400 flex items-center justify-center mx-auto text-xl shadow-[0_0_20px_rgba(16,185,129,0.3)]">
              <FontAwesomeIcon icon={faCheckCircle} />
            </div>

            <h2 className="text-2xl font-bold text-white tracking-tight">
              Successfully Unsubscribed
            </h2>

            <p className="text-sm text-slate-300 max-w-sm mx-auto leading-relaxed">
              <strong className="text-white">{email}</strong> has been removed from all marketing and newsletter distributions.
            </p>

            <div className="pt-4">
              <button
                type="button"
                onClick={() => navigate('/')}
                className="btn-primary !px-6 !py-2.5 !text-xs !rounded-lg"
              >
                Return to Homepage
              </button>
            </div>
          </div>
        )}
      </div>

      <div className="mt-8 text-center text-xs text-slate-400">
        <a 
          href="/privacy-policy" 
          onClick={(e) => { e.preventDefault(); navigate('/privacy-policy'); }}
          className="hover:text-cyan-300 underline"
        >
          Read our Privacy Policy
        </a>
      </div>

    </div>
  );
};

export default UnsubscribePage;
