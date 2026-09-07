import React, { useState } from 'react';
import { Lock, User, ShieldCheck, ArrowRight, Key, AlertCircle } from 'lucide-react';
import { motion } from 'framer-motion';
import { adminStorage } from '../../utils/adminStorage';

export const AdminLogin = ({ onLoginSuccess, onBackToSite }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [rememberMe, setRememberMe] = useState(true);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleLogin = async (e) => {
    e?.preventDefault();
    if (!username.trim() || !password) {
      setError('Please provide both administrative username/email and password.');
      return;
    }
    setError('');
    setLoading(true);

    try {
      const result = await adminStorage.login(username.trim(), password, rememberMe);
      setLoading(false);

      if (result.success) {
        onLoginSuccess?.();
      } else {
        setError(result.message || 'Invalid administrative credentials. Please verify your database login details.');
      }
    } catch (err) {
      setLoading(false);
      setError('Authentication server error. Please check your backend connection.');
    }
  };

  return (
    <div className="min-h-screen bg-[#02090f] flex items-center justify-center p-4 relative overflow-hidden">
      {/* Ambient background glows */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[600px] h-[400px] bg-cyan-500/10 rounded-full blur-[140px] pointer-events-none"></div>
      <div className="absolute bottom-10 right-10 w-[400px] h-[400px] bg-teal-500/10 rounded-full blur-[120px] pointer-events-none"></div>

      {/* Cyber Grid Texture */}
      <div className="absolute inset-0 bg-[radial-gradient(#082e4f_1px,transparent_1px)] [background-size:24px_24px] opacity-40 pointer-events-none"></div>

      <motion.div
        initial={{ opacity: 0, scale: 0.95, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className="relative z-10 w-full max-w-md gradient-card rounded-3xl p-8 sm:p-10 border border-cyan-500/35 shadow-[0_0_60px_rgba(0,240,255,0.25)]"
      >
        {/* Top Logo & Title */}
        <div className="text-center mb-8 space-y-2">
          <div className="w-16 h-16 mx-auto rounded-2xl bg-gradient-to-br from-[#082a44] to-[#041525] border border-cyan-500/40 flex items-center justify-center text-cyan-400 shadow-[0_0_25px_rgba(0,240,255,0.5)] mb-4">
            <Lock className="w-8 h-8" />
          </div>

          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-950/80 border border-cyan-500/30 text-cyan-300 text-xs font-mono">
            <ShieldCheck className="w-3.5 h-3.5" />
            <span>SECURE COMMAND CENTER</span>
          </div>

          <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
            Brixel<span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-teal-300">Labs</span> Admin
          </h1>
          <p className="text-xs text-slate-400 font-mono">
            Enterprise Management & Control Center
          </p>
        </div>

        {error && (
          <div className="mb-6 p-3 rounded-xl bg-red-950/60 border border-red-500/40 text-red-300 text-xs flex items-center gap-2 animate-shake">
            <AlertCircle className="w-4 h-4 flex-shrink-0" />
            <span>{error}</span>
          </div>
        )}

        {/* Login Form */}
        <form onSubmit={handleLogin} className="space-y-4">
          <div>
            <label className="block text-xs font-mono text-slate-300 mb-1.5 font-semibold">
              ADMIN USERNAME / EMAIL
            </label>
            <div className="relative">
              <User className="w-4 h-4 text-cyan-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                required
                placeholder="admin or user@brixellabs.com"
                className="w-full pl-10 pr-4 py-3 rounded-xl bg-[#051829] border border-cyan-500/30 text-white placeholder-slate-500 focus:outline-none focus:border-cyan-400 text-sm font-mono transition-all"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-mono text-slate-300 mb-1.5 font-semibold">
              SECURITY PASSWORD
            </label>
            <div className="relative">
              <Key className="w-4 h-4 text-cyan-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                placeholder="••••••••"
                className="w-full pl-10 pr-4 py-3 rounded-xl bg-[#051829] border border-cyan-500/30 text-white placeholder-slate-500 focus:outline-none focus:border-cyan-400 text-sm font-mono transition-all"
              />
            </div>
          </div>

          <div className="flex items-center justify-between text-xs pt-1">
            <label className="flex items-center gap-2 cursor-pointer text-slate-300 select-none">
              <input
                type="checkbox"
                checked={rememberMe}
                onChange={(e) => setRememberMe(e.target.checked)}
                className="w-4 h-4 rounded bg-[#051829] border border-cyan-500/40 accent-cyan-400"
              />
              <span>Remember session</span>
            </label>

            <span className="text-[11px] font-mono text-cyan-400/80">JWT Bearer SSL Encrypted</span>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full py-3.5 rounded-xl bg-gradient-to-r from-cyan-400 via-teal-300 to-cyan-400 hover:from-cyan-300 hover:to-teal-200 text-[#02111d] font-extrabold text-sm transition-all duration-300 shadow-[0_0_25px_rgba(0,240,255,0.55)] hover:shadow-[0_0_35px_rgba(0,240,255,0.85)] flex items-center justify-center gap-2 cursor-pointer active:scale-95 disabled:opacity-50"
          >
            <span>{loading ? 'Authenticating with Database...' : 'Enter Admin Control Center'}</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </form>

        <div className="mt-6 pt-4 border-t border-cyan-500/20 text-center">
          <button
            type="button"
            onClick={onBackToSite}
            className="text-xs text-slate-400 hover:text-cyan-300 transition-colors underline block mx-auto cursor-pointer"
          >
            ← Return to Public Website
          </button>
        </div>
      </motion.div>
    </div>
  );
};


export default AdminLogin;
