import React from 'react';
import { motion } from 'framer-motion';

export const PartnerLogos = () => {
  const partners = [
    { name: 'SONY', type: 'sony' },
    { name: 'amazon', type: 'amazon' },
    { name: 'Microsoft', type: 'microsoft' },
    { name: 'ebay', type: 'ebay' },
    { name: 'Showwork', type: 'showwork' },
    { name: 'NVIDIA AI', type: 'nvidia' },
  ];

  return (
    <section className="relative py-14 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto z-10 border-y border-cyan-500/15 overflow-hidden">
      
      {/* Title */}
      <div className="text-center mb-6">
        <span className="text-[11px] font-mono tracking-widest uppercase text-slate-500">
          Trusted by Technology Pioneers & Modern Enterprise Stacks
        </span>
      </div>

      <div className="flex flex-wrap items-center justify-center gap-10 sm:gap-16 lg:gap-24 opacity-60 hover:opacity-100 transition-opacity duration-500">
        
        {/* SONY */}
        <div className="text-xl sm:text-2xl font-serif font-black tracking-widest text-slate-300 hover:text-cyan-300 hover:scale-105 transition-all cursor-default">
          SONY
        </div>

        {/* amazon */}
        <div className="text-xl sm:text-2xl font-sans font-bold tracking-tight text-slate-300 hover:text-cyan-300 hover:scale-105 transition-all cursor-default flex items-center">
          amazon<span className="text-cyan-400 text-sm ml-0.5">⌣</span>
        </div>

        {/* Microsoft */}
        <div className="flex items-center gap-2 text-lg sm:text-xl font-semibold text-slate-300 hover:text-cyan-300 hover:scale-105 transition-all cursor-default">
          <div className="grid grid-cols-2 gap-0.5 w-4 h-4">
            <div className="bg-[#f25022]"></div>
            <div className="bg-[#7fba00]"></div>
            <div className="bg-[#00a4ef]"></div>
            <div className="bg-[#ffb900]"></div>
          </div>
          <span>Microsoft</span>
        </div>

        {/* ebay */}
        <div className="text-xl sm:text-2xl font-bold tracking-tighter text-slate-300 hover:text-cyan-300 hover:scale-105 transition-all cursor-default">
          <span className="text-red-400">e</span>
          <span className="text-blue-400">b</span>
          <span className="text-yellow-400">a</span>
          <span className="text-green-400">y</span>
        </div>

        {/* Showwork */}
        <div className="flex items-center gap-2 text-lg sm:text-xl font-bold text-slate-300 hover:text-cyan-300 hover:scale-105 transition-all cursor-default">
          <div className="w-5 h-5 rounded-full border-2 border-cyan-400 flex items-center justify-center text-[10px] text-cyan-400 font-mono">
            SW
          </div>
          <span>Showwork</span>
        </div>

        {/* NVIDIA AI */}
        <div className="flex items-center gap-1.5 text-lg font-bold text-slate-300 hover:text-emerald-400 hover:scale-105 transition-all cursor-default font-mono">
          <span className="text-emerald-400">⚡</span>
          <span>NVIDIA AI</span>
        </div>

      </div>
    </section>
  );
};
