import React, { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheckCircle, faExclamationCircle, faInfoCircle, faTriangleExclamation, faXmark } from '@fortawesome/free-solid-svg-icons';

// Simple event listener mechanism for global toast dispatch
const TOAST_EVENT = 'brixel_toast_event';

export const showToast = (message, type = 'success', duration = 3500) => {
  if (typeof window === 'undefined') return;
  const event = new CustomEvent(TOAST_EVENT, {
    detail: { id: Date.now() + Math.random(), message, type, duration }
  });
  window.dispatchEvent(event);
};

export const toast = {
  success: (msg, duration) => showToast(msg, 'success', duration),
  error: (msg, duration) => showToast(msg, 'error', duration),
  info: (msg, duration) => showToast(msg, 'info', duration),
  warning: (msg, duration) => showToast(msg, 'warning', duration),
};

export const ToastContainer = () => {
  const [toasts, setToasts] = useState([]);

  useEffect(() => {
    const handleToast = (e) => {
      const newToast = e.detail;
      setToasts((prev) => [...prev, newToast]);

      if (newToast.duration > 0) {
        setTimeout(() => {
          setToasts((prev) => prev.filter((t) => t.id !== newToast.id));
        }, newToast.duration);
      }
    };

    window.addEventListener(TOAST_EVENT, handleToast);
    return () => window.removeEventListener(TOAST_EVENT, handleToast);
  }, []);

  const removeToast = (id) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  };

  if (toasts.length === 0) return null;

  return (
    <div 
      className="fixed bottom-6 right-6 z-[99999] flex flex-col gap-2.5 max-w-sm w-full pointer-events-none px-4 sm:px-0"
      aria-live="polite"
      role="region"
      aria-label="Notifications"
    >
      {toasts.map((item) => {
        const isSuccess = item.type === 'success';
        const isError = item.type === 'error';
        const isWarning = item.type === 'warning';

        return (
          <div
            key={item.id}
            role="status"
            className={`pointer-events-auto flex items-start gap-3 p-4 rounded-xl border backdrop-blur-xl shadow-2xl transition-all duration-300 transform translate-y-0 opacity-100 animate-in fade-in slide-in-from-bottom-2 ${
              isSuccess
                ? 'bg-[#031520]/95 border-emerald-500/40 text-emerald-200 shadow-[0_4px_24px_rgba(16,185,129,0.2)]'
                : isError
                ? 'bg-[#1a0a0f]/95 border-rose-500/40 text-rose-200 shadow-[0_4px_24px_rgba(244,63,94,0.2)]'
                : isWarning
                ? 'bg-[#181308]/95 border-amber-500/40 text-amber-200 shadow-[0_4px_24px_rgba(245,158,11,0.2)]'
                : 'bg-[#030e1a]/95 border-cyan-500/40 text-cyan-200 shadow-[0_4px_24px_rgba(0,240,255,0.2)]'
            }`}
          >
            <div className="shrink-0 mt-0.5 text-base">
              {isSuccess && <FontAwesomeIcon icon={faCheckCircle} className="text-emerald-400" />}
              {isError && <FontAwesomeIcon icon={faExclamationCircle} className="text-rose-400" />}
              {isWarning && <FontAwesomeIcon icon={faTriangleExclamation} className="text-amber-400" />}
              {!isSuccess && !isError && !isWarning && (
                <FontAwesomeIcon icon={faInfoCircle} className="text-cyan-400" />
              )}
            </div>
            <div className="flex-1 text-xs sm:text-sm font-medium leading-snug">
              {item.message}
            </div>
            <button
              type="button"
              onClick={() => removeToast(item.id)}
              className="shrink-0 text-slate-400 hover:text-white transition-colors p-1 -mr-1 -mt-1 cursor-pointer"
              aria-label="Close notification"
            >
              <FontAwesomeIcon icon={faXmark} className="text-xs" />
            </button>
          </div>
        );
      })}
    </div>
  );
};
