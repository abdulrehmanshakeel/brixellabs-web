import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCopy, faCheck } from '@fortawesome/free-solid-svg-icons';
import { showToast } from './Toast';

export const CopyButton = ({ 
  text, 
  label = "Copy", 
  copiedLabel = "Copied!", 
  className = "",
  iconOnly = false 
}) => {
  const [copied, setCopied] = useState(false);

  const handleCopy = async (e) => {
    e?.stopPropagation?.();
    if (!text) return;

    try {
      if (navigator.clipboard && navigator.clipboard.writeText) {
        await navigator.clipboard.writeText(text);
      } else {
        // Fallback for older browsers
        const textArea = document.createElement('textarea');
        textArea.value = text;
        textArea.style.position = 'fixed';
        textArea.style.left = '-9999px';
        document.body.appendChild(textArea);
        textArea.focus();
        textArea.select();
        document.execCommand('copy');
        document.body.removeChild(textArea);
      }
      setCopied(true);
      showToast('Copied to clipboard!', 'success', 2500);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.warn('Could not copy text:', err);
      showToast('Failed to copy to clipboard', 'error', 3000);
    }
  };

  return (
    <button
      type="button"
      onClick={handleCopy}
      className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md text-xs font-mono transition-all duration-200 cursor-pointer ${
        copied 
          ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/40 shadow-[0_0_10px_rgba(16,185,129,0.25)]' 
          : 'bg-white/[0.04] text-slate-300 hover:text-white border border-white/10 hover:border-cyan-400/40'
      } ${className}`}
      title={copied ? copiedLabel : `Copy "${text}"`}
      aria-label={copied ? copiedLabel : `Copy "${text}"`}
    >
      <FontAwesomeIcon 
        icon={copied ? faCheck : faCopy} 
        className={`text-[10px] ${copied ? 'text-emerald-400' : 'text-slate-400'}`} 
      />
      {!iconOnly && <span>{copied ? copiedLabel : label}</span>}
    </button>
  );
};
