import React, { useState } from 'react';
import { Lock, User, ArrowRight, Key, AlertCircle, Eye, EyeOff, ShieldCheck } from 'lucide-react';
import { motion } from 'framer-motion';
import { adminStorage } from '../../utils/adminStorage';
import { TurnstileWidget } from '../common/TurnstileWidget';
import logoImg from '../../assets/logo.webp';

export const AdminLogin = ({ onLoginSuccess, onBackToSite }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(true);
  const [turnstileToken, setTurnstileToken] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [failedAttempts, setFailedAttempts] = useState(0);
  const [lockoutTime, setLockoutTime] = useState(0);

  // 2FA Challenge State
  const [is2FAChallenge, setIs2FAChallenge] = useState(false);
  const [tempToken, setTempToken] = useState('');
  const [twoFactorCode, setTwoFactorCode] = useState('');

  // Decrement lockout timer if active
  React.useEffect(() => {
    if (lockoutTime > 0) {
      const timer = setInterval(() => {
        setLockoutTime((prev) => (prev > 0 ? prev - 1 : 0));
      }, 1000);
      return () => clearInterval(timer);
    }
  }, [lockoutTime]);

  const handleLogin = async (e) => {
    e?.preventDefault();
    if (lockoutTime > 0) {
      setError(`Too many failed attempts. Security cooldown active for ${lockoutTime}s.`);
      return;
    }
    if (!username.trim() || !password) {
      setError('Please enter your username and password.');
      return;
    }
    setError('');
    setLoading(true);

    try {
      const result = await adminStorage.login(username.trim(), password, rememberMe);
      setLoading(false);

      if (result.requires2FA) {
        setIs2FAChallenge(true);
        setTempToken(result.tempToken);
        setError('');
        setFailedAttempts(0);
        return;
      }

      if (result.success) {
        setFailedAttempts(0);
        onLoginSuccess?.();
      } else {
        const newAttempts = failedAttempts + 1;
        setFailedAttempts(newAttempts);
        if (newAttempts >= 5) {
          setLockoutTime(60);
          setError('Maximum login attempts exceeded. Security lockout active for 60 seconds.');
        } else {
          setError(result.message || 'Incorrect username or password. Please try again.');
        }
      }
    } catch (err) {
      setLoading(false);
      setError('Connection error. Please try again.');
    }
  };

  const handleVerify2FA = async (e) => {
    e?.preventDefault();
    const cleanCode = twoFactorCode.trim();
    if (!cleanCode) {
      setError('Please enter your 6-digit authenticator or recovery code.');
      return;
    }
    setError('');
    setLoading(true);

    try {
      const result = await adminStorage.verify2FA(tempToken, cleanCode, rememberMe);
      setLoading(false);

      if (result.success) {
        onLoginSuccess?.();
      } else {
        setError(result.message || 'Invalid verification code. Please check your authenticator app.');
      }
    } catch (err) {
      setLoading(false);
      setError('Verification connection error. Please try again.');
    }
  };

  const handleBack = onBackToSite || (() => { window.location.href = '/'; });

  return (
    <div className="min-h-screen bg-[#030c14] flex items-center justify-center p-4 relative overflow-hidden font-sans">
      {/* Ambient background glows matching website */}
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 w-[500px] h-[350px] bg-cyan-500/5 rounded-full blur-[140px] pointer-events-none" />

      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.25 }}
        className="relative z-10 w-full max-w-sm bg-[#02070e] rounded-xl p-6 sm:p-8 border border-white/[0.08] shadow-2xl"
      >
        {/* Top Logo & Title */}
        <div className="text-center mb-6 space-y-2">
          <a 
            href="/"
            title="Return to BrixelLabs Home"
            className="inline-block group cursor-pointer focus:outline-none"
          >
            <div className="w-10 h-10 mx-auto rounded-lg bg-white/[0.04] border border-white/10 flex items-center justify-center group-hover:border-cyan-400/50 group-hover:shadow-[0_0_15px_rgba(0,240,255,0.3)] transition-all">
              <img 
                src={logoImg} 
                alt="BrixelLabs Logo" 
                className="w-6 h-6 object-contain transition-transform group-hover:scale-105"
              />
            </div>
            <h1 className="text-lg font-bold text-white tracking-tight mt-2 group-hover:text-cyan-300 transition-colors">
              Brixel<span className="text-cyan-400">Labs</span> Admin
            </h1>
          </a>
          <p className="text-xs text-slate-400">
            {is2FAChallenge ? 'Two-Factor Authentication Required' : 'Sign in to manage messages, services, and projects'}
          </p>
        </div>

        {error && (
          <div className="mb-4 p-2.5 rounded-lg bg-rose-500/10 border border-rose-500/20 text-rose-300 text-xs flex items-center gap-2">
            <AlertCircle className="w-4 h-4 shrink-0 text-rose-400" />
            <span>{error}</span>
          </div>
        )}

        {/* 2FA Challenge Screen */}
        {is2FAChallenge ? (
          <form onSubmit={handleVerify2FA} className="space-y-4 text-xs">
            <div className="p-3 rounded-lg bg-cyan-500/10 border border-cyan-500/20 text-cyan-200 text-xs flex items-center gap-2.5">
              <ShieldCheck className="w-5 h-5 text-cyan-400 shrink-0" />
              <span>Two-Factor Authentication is active on this account. Open your authenticator app to retrieve your code.</span>
            </div>

            <div>
              <label className="block font-medium text-slate-300 mb-1.5 text-xs">
                6-Digit TOTP / Backup Code
              </label>
              <div className="relative group">
                <div className="absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none z-10 text-cyan-400">
                  <Key className="w-4 h-4" />
                </div>
                <input
                  type="text"
                  value={twoFactorCode}
                  onChange={(e) => setTwoFactorCode(e.target.value)}
                  required
                  autoFocus
                  maxLength={16}
                  placeholder="123 456"
                  className="w-full pl-9 pr-3 py-2.5 rounded-lg bg-slate-900/90 border border-slate-700/80 text-white font-mono text-center tracking-widest text-sm placeholder-slate-500 focus:outline-none focus:border-cyan-400 focus:ring-1 focus:ring-cyan-400/30 transition-all"
                />
              </div>
              <p className="text-[11px] text-slate-500 mt-1 text-center">
                Enter code from Google Authenticator, Authy, or an emergency backup code.
              </p>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="btn-primary w-full !py-2.5 !text-xs flex items-center justify-center gap-2 disabled:opacity-50 cursor-pointer font-bold shadow-lg shadow-cyan-500/10 group"
            >
              <span>{loading ? 'Verifying Code...' : 'Verify & Enter Command Center'}</span>
              <ArrowRight className="w-4 h-4 text-[#009ca6] group-hover:translate-x-0.5 transition-transform" />
            </button>

            <button
              type="button"
              onClick={() => { setIs2FAChallenge(false); setTwoFactorCode(''); setError(''); }}
              className="w-full py-1 text-center text-slate-400 hover:text-white transition-colors cursor-pointer text-xs"
            >
              ← Cancel & Sign In with Different Account
            </button>
          </form>
        ) : (
          /* Standard Login Form */
          <form onSubmit={handleLogin} className="space-y-4 text-xs">
            <div>
              <label className="block font-medium text-slate-300 mb-1.5 text-xs">
                Username
              </label>
              <div className="relative group">
                <div className="absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none z-10 text-cyan-400 group-focus-within:text-cyan-300 transition-colors">
                  <User className="w-4 h-4" />
                </div>
                <input
                  type="text"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  required
                  placeholder="admin"
                  autoComplete="username"
                  className="w-full pl-9 pr-3 py-2.5 rounded-lg bg-slate-900/90 border border-slate-700/80 text-white placeholder-slate-500 focus:outline-none focus:border-cyan-400 focus:ring-1 focus:ring-cyan-400/30 transition-all text-xs"
                />
              </div>
            </div>

            <div>
              <label className="block font-medium text-slate-300 mb-1.5 text-xs">
                Password
              </label>
              <div className="relative group">
                <div className="absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none z-10 text-cyan-400 group-focus-within:text-cyan-300 transition-colors">
                  <Key className="w-4 h-4" />
                </div>
                <input
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  placeholder="••••••••"
                  autoComplete="current-password"
                  className="w-full pl-9 pr-10 py-2.5 rounded-lg bg-slate-900/90 border border-slate-700/80 text-white placeholder-slate-500 focus:outline-none focus:border-cyan-400 focus:ring-1 focus:ring-cyan-400/30 transition-all text-xs"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-2.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-cyan-300 transition-colors p-1.5 cursor-pointer focus:outline-none z-10"
                  title={showPassword ? "Hide password" : "Show password"}
                  aria-label={showPassword ? "Hide password" : "Show password"}
                >
                  {showPassword ? <EyeOff className="w-4 h-4 text-cyan-400" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>

            <div className="flex items-center justify-between pt-0.5">
              <label className="flex items-center gap-2 cursor-pointer text-slate-300 hover:text-white select-none text-xs transition-colors">
                <input
                  type="checkbox"
                  checked={rememberMe}
                  onChange={(e) => setRememberMe(e.target.checked)}
                  className="w-4 h-4 rounded bg-slate-900 border-slate-700 text-cyan-500 accent-cyan-400 cursor-pointer"
                />
                <span>Remember me</span>
              </label>
            </div>

            {/* Cloudflare Turnstile Bot Defense */}
            <TurnstileWidget 
              onVerify={(token) => setTurnstileToken(token)}
              onError={() => setTurnstileToken('dev-fallback-token')}
              size="normal"
              className="my-2"
            />

            <button
              type="submit"
              disabled={loading}
              className="btn-primary w-full !py-2.5 !text-xs flex items-center justify-center gap-2 disabled:opacity-50 cursor-pointer font-bold shadow-lg shadow-cyan-500/10 group"
            >
              <span>{loading ? 'Signing in...' : 'Sign In'}</span>
              <ArrowRight className="w-4 h-4 text-[#009ca6] group-hover:translate-x-0.5 transition-transform" />
            </button>

          </form>
        )}

        <div className="mt-5 pt-3 border-t border-white/[0.06] text-center">
          <button
            type="button"
            onClick={handleBack}
            className="text-xs text-slate-500 hover:text-white transition-colors cursor-pointer"
          >
            ← Back to Website
          </button>
        </div>
      </motion.div>
    </div>
  );
};

export default AdminLogin;
