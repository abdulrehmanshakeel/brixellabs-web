import React, { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { 
  faShieldHalved, 
  faRotateRight, 
  faXmark
} from '@fortawesome/free-solid-svg-icons';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  checkUpdateStatus, 
  executeHardAppUpdate, 
  CLIENT_APP_VERSION 
} from '../../utils/versionManager';

export const ForceUpdateScreen = () => {
  const [updateState, setUpdateState] = useState({
    needsForceUpdate: false,
    updateAvailable: false,
    config: null
  });
  const [isUpdating, setIsUpdating] = useState(false);
  const [toastDismissed, setToastDismissed] = useState(false);

  // Check version on mount and on periodic intervals
  useEffect(() => {
    let isMounted = true;

    const runCheck = async () => {
      try {
        const res = await checkUpdateStatus();
        if (isMounted) {
          setUpdateState({
            needsForceUpdate: res.needsForceUpdate,
            updateAvailable: res.updateAvailable,
            config: res.config
          });
        }
      } catch (err) {
        console.warn('Version check error:', err);
      }
    };

    runCheck();

    // Re-check periodically every 15 minutes and when window regains focus
    const interval = setInterval(runCheck, 15 * 60 * 1000);
    window.addEventListener('focus', runCheck);

    return () => {
      isMounted = false;
      clearInterval(interval);
      window.removeEventListener('focus', runCheck);
    };
  }, []);

  const handleApplyUpdate = async () => {
    setIsUpdating(true);
    await executeHardAppUpdate();
  };

  const { needsForceUpdate, updateAvailable, config } = updateState;

  // ============================================================================
  // 1. MANDATORY HARD UPDATE SCREEN (NON-DISMISSIBLE)
  // ============================================================================
  if (needsForceUpdate) {
    return (
      <div 
        className="fixed inset-0 z-[100000] bg-[#030c14]/98 backdrop-blur-2xl flex items-center justify-center p-4 sm:p-6 select-none overflow-y-auto"
        role="alertdialog"
        aria-modal="true"
        aria-labelledby="force-update-title"
      >
        {/* Cyber Neon Ambient Circles */}
        <div className="absolute top-1/3 left-1/2 -translate-x-1/2 w-96 h-96 bg-cyan-500/15 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-10 right-10 w-72 h-72 bg-rose-500/10 rounded-full blur-3xl pointer-events-none" />

        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 15 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{ duration: 0.3 }}
          className="relative z-10 w-full max-w-lg bg-[#030e1a]/95 backdrop-blur-xl border border-cyan-400/40 rounded-3xl p-6 sm:p-10 shadow-[0_25px_60px_-15px_rgba(0,0,0,0.9),0_0_35px_rgba(0,240,255,0.2)] text-center"
        >
          {/* Header Icon */}
          <div className="relative w-16 h-16 sm:w-20 sm:h-20 mx-auto rounded-3xl bg-gradient-to-tr from-cyan-500/20 via-teal-500/20 to-cyan-400/30 border border-cyan-400/50 flex items-center justify-center text-cyan-300 shadow-[0_0_30px_rgba(0,240,255,0.35)] mb-6">
            <div className="absolute inset-0 rounded-3xl bg-cyan-400/20 animate-ping pointer-events-none" />
            <FontAwesomeIcon icon={faShieldHalved} className="text-2xl sm:text-3xl text-white relative z-10" />
          </div>

          {/* Title */}
          <h2 id="force-update-title" className="font-heading text-2xl sm:text-3xl font-extrabold text-white tracking-tight leading-tight mb-2">
            {config?.updateTitle || 'Platform Update Required'}
          </h2>

          {/* Description */}
          <p className="text-xs sm:text-sm text-slate-300 leading-relaxed max-w-md mx-auto mb-6">
            {config?.updateMessage || 'A mandatory security and architectural update is required to continue accessing BrixelLabs.'}
          </p>

          {/* Version Differential Badge */}
          <div className="flex items-center justify-center gap-3 py-2 px-4 rounded-xl bg-slate-900/80 border border-slate-700/80 mb-6 text-xs font-mono">
            <span className="text-slate-400">Your Version: <span className="text-rose-400 font-bold">v{CLIENT_APP_VERSION}</span></span>
            <span className="text-slate-600">→</span>
            <span className="text-slate-400">Required: <span className="text-cyan-300 font-bold">v{config?.currentVersion || '2.4.0'}</span></span>
          </div>

          {/* Release Highlights */}
          {config?.releaseNotes && config.releaseNotes.length > 0 && (
            <div className="text-left bg-black/40 border border-white/[0.06] rounded-2xl p-4 mb-8">
              <span className="text-[11px] font-mono text-cyan-400 font-bold uppercase tracking-wider block mb-2">
                What's in this release:
              </span>
              <ul className="space-y-1.5 text-xs text-slate-300">
                {config.releaseNotes.map((note, idx) => (
                  <li key={idx} className="flex items-start gap-2">
                    <span className="text-cyan-400 mt-0.5">•</span>
                    <span>{note}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* Primary Action Button */}
          <button
            onClick={handleApplyUpdate}
            disabled={isUpdating}
            className="btn-primary w-full !py-3.5 !text-sm !rounded-xl flex items-center justify-center gap-2.5 shadow-[0_0_30px_rgba(0,240,255,0.4)] cursor-pointer"
          >
            {isUpdating ? (
              <>
                <span className="w-4 h-4 rounded-full border-2 border-[#031422] border-t-transparent animate-spin" />
                <span>Applying Update &amp; Reloading...</span>
              </>
            ) : (
              <>
                <FontAwesomeIcon icon={faRotateRight} className="text-sm" />
                <span>Update Now &amp; Reload Application</span>
              </>
            )}
          </button>

          <p className="text-[11px] font-mono text-slate-500 mt-4">
            Cache will be flushed and fresh assets loaded instantly.
          </p>
        </motion.div>
      </div>
    );
  }

  // ============================================================================
  // 2. SOFT UPDATE TOAST NOTIFICATION (DISMISSIBLE)
  // ============================================================================
  return (
    <AnimatePresence>
      {updateAvailable && !toastDismissed && (
        <motion.div
          initial={{ opacity: 0, y: 50, scale: 0.95 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 20, scale: 0.95 }}
          transition={{ type: 'spring', stiffness: 350, damping: 25 }}
          className="fixed bottom-5 sm:bottom-6 left-4 sm:left-6 z-50 max-w-sm rounded-2xl bg-[#030e1a]/95 backdrop-blur-xl border border-cyan-500/40 p-4 shadow-[0_15px_35px_rgba(0,0,0,0.6),0_0_20px_rgba(0,240,255,0.25)] select-none"
        >
          <div className="flex items-start gap-3">
            <div className="w-9 h-9 rounded-xl bg-cyan-500/15 border border-cyan-400/40 text-cyan-300 flex items-center justify-center flex-shrink-0">
              <FontAwesomeIcon icon={faRotateRight} className="text-sm" />
            </div>

            <div className="flex-1 min-w-0">
              <div className="flex items-center justify-between gap-2">
                <span className="font-heading text-xs font-bold text-white">Update Available</span>
                <button
                  onClick={() => setToastDismissed(true)}
                  className="text-slate-500 hover:text-white p-1 rounded transition-colors cursor-pointer"
                  aria-label="Dismiss notification"
                >
                  <FontAwesomeIcon icon={faXmark} className="text-xs" />
                </button>
              </div>
              <p className="text-[11px] text-slate-300 mt-0.5 leading-snug">
                BrixelLabs v{config?.currentVersion || '2.4.0'} is available with performance and security enhancements.
              </p>

              <div className="flex items-center gap-2 mt-3">
                <button
                  onClick={handleApplyUpdate}
                  disabled={isUpdating}
                  className="btn-primary !px-3.5 !py-1.5 !text-[11px] !rounded-lg"
                >
                  <span>{isUpdating ? 'Updating...' : 'Update Now'}</span>
                </button>
                <button
                  onClick={() => setToastDismissed(true)}
                  className="px-2.5 py-1.5 rounded-lg text-[11px] text-slate-400 hover:text-white transition-colors cursor-pointer"
                >
                  Later
                </button>
              </div>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
