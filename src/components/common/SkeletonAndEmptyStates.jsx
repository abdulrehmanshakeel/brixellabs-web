import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faInbox, faRotateRight } from '@fortawesome/free-solid-svg-icons';

/**
 * Shimmer Loading Skeleton Card for project grid or service listings
 */
export const SkeletonCard = () => (
  <div className="rounded-2xl p-6 sm:p-7 flex flex-col justify-between border border-slate-800/80 bg-[#030e1a]/60 shadow-lg h-full">
    <div className="space-y-4">
      {/* Category Pill Skeleton */}
      <div className="w-24 h-5 rounded-md skeleton-loading" />
      {/* Title Skeleton */}
      <div className="w-3/4 h-7 rounded-lg skeleton-loading" />
      {/* Description lines */}
      <div className="space-y-2 pt-1">
        <div className="w-full h-4 rounded skeleton-loading" />
        <div className="w-5/6 h-4 rounded skeleton-loading" />
        <div className="w-2/3 h-4 rounded skeleton-loading" />
      </div>
    </div>
    {/* Bottom CTA Skeleton */}
    <div className="pt-6 mt-6 border-t border-slate-800/60 flex items-center justify-between">
      <div className="w-32 h-4 rounded skeleton-loading" />
      <div className="w-4 h-4 rounded-full skeleton-loading" />
    </div>
  </div>
);

/**
 * Shimmer Loading Skeleton Table Rows
 */
export const SkeletonTable = ({ rows = 4 }) => (
  <tbody className="divide-y divide-white/[0.04]">
    {Array.from({ length: rows }).map((_, idx) => (
      <tr key={idx} className="animate-pulse">
        <td className="py-4 px-4"><div className="w-28 h-4 rounded skeleton-loading" /></td>
        <td className="py-4 px-4"><div className="w-36 h-4 rounded skeleton-loading" /></td>
        <td className="py-4 px-4"><div className="w-20 h-4 rounded skeleton-loading" /></td>
        <td className="py-4 px-4"><div className="w-16 h-5 rounded skeleton-loading" /></td>
        <td className="py-4 px-4"><div className="w-20 h-4 rounded skeleton-loading" /></td>
        <td className="py-4 px-4 text-right"><div className="w-16 h-4 rounded skeleton-loading ml-auto" /></td>
      </tr>
    ))}
  </tbody>
);

/**
 * Reusable Futuristic Empty State Component
 */
export const EmptyState = ({
  icon = faInbox,
  title = "No results found",
  message = "Try adjusting your search criteria or filter to discover related engineering projects.",
  actionLabel,
  onAction,
  className = ""
}) => (
  <div className={`col-span-full py-16 px-6 text-center rounded-2xl border border-slate-800/80 bg-[#030e1a]/60 backdrop-blur-md flex flex-col items-center justify-center space-y-4 ${className}`}>
    <div className="w-14 h-14 rounded-2xl bg-cyan-950/60 border border-cyan-500/30 text-cyan-400 flex items-center justify-center text-xl shadow-[0_0_20px_rgba(0,240,255,0.15)] mb-1">
      <FontAwesomeIcon icon={icon} />
    </div>
    <div className="max-w-md space-y-1.5">
      <h3 className="text-base sm:text-lg font-heading font-bold text-white tracking-tight">
        {title}
      </h3>
      <p className="text-xs sm:text-sm text-slate-400 leading-relaxed">
        {message}
      </p>
    </div>
    {actionLabel && onAction && (
      <button
        type="button"
        onClick={onAction}
        className="mt-2 inline-flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-semibold text-cyan-300 bg-cyan-950/80 border border-cyan-500/40 hover:bg-cyan-900/60 hover:border-cyan-400 transition-all cursor-pointer shadow-sm"
      >
        <FontAwesomeIcon icon={faRotateRight} className="text-xs" />
        <span>{actionLabel}</span>
      </button>
    )}
  </div>
);
