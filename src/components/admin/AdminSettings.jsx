import React, { useState } from 'react';
import { 
  Building2, Lock, Bell, AlertTriangle, Save, KeyRound
} from 'lucide-react';
import { adminStorage } from '../../utils/adminStorage';

export default function AdminSettings({ settings = {}, onRefresh, showToast }) {
  const [formData, setFormData] = useState({
    companyName: settings.companyName || 'BrixelLabs',
    tagline: settings.tagline || 'Design · Build · Automate',
    email: settings.email || 'brixellabs@gmail.com',
    phone: settings.phone || '+92 344 9254864',
    workingModel: settings.workingModel || '100% Remote & Globally Distributed',
    consultationLink: settings.consultationLink || 'https://calendly.com',
    announcementActive: settings.announcementActive || false,
    announcementText: settings.announcementText || '🚀 Now accepting enterprise AI & Automation partnerships.'
  });

  const [passwordData, setPasswordData] = useState({
    currentPassword: '',
    newPassword: '',
    confirmPassword: ''
  });

  const handleSaveGeneral = (e) => {
    e.preventDefault();
    adminStorage.updateSettings(formData);
    showToast?.('Settings saved', 'success');
    onRefresh?.();
  };

  const handleChangePassword = async (e) => {
    e.preventDefault();
    if (!passwordData.newPassword || !passwordData.confirmPassword) {
      showToast?.('Please fill out all password fields', 'error');
      return;
    }
    if (passwordData.newPassword !== passwordData.confirmPassword) {
      showToast?.('New passwords do not match', 'error');
      return;
    }
    if (passwordData.newPassword.length < 8) {
      showToast?.('Password must be at least 8 characters', 'error');
      return;
    }

    const isMatch = await adminStorage.verifyPassword(passwordData.currentPassword);
    if (!isMatch) {
      showToast?.('Current password is incorrect', 'error');
      return;
    }

    const currentCreds = adminStorage.getAuthCredentials();
    await adminStorage.setAuthCredentials(currentCreds.username, passwordData.newPassword);
    setPasswordData({ currentPassword: '', newPassword: '', confirmPassword: '' });
    showToast?.('Password updated and cryptographically hashed successfully', 'success');
  };

  const handleResetDefaults = () => {
    if (window.confirm('Reset all website data and sample items back to original?')) {
      adminStorage.resetToDefaults();
      showToast?.('Data reset to default', 'info');
      onRefresh?.();
    }
  };

  return (
    <div className="space-y-4 max-w-4xl mx-auto">
      {/* 1. Company & Contact Info */}
      <div className="p-5 rounded-xl bg-white/[0.02] border border-white/[0.06]">
        <div className="flex items-center gap-2.5 pb-3 mb-4 border-b border-white/[0.06]">
          <div className="w-8 h-8 rounded-lg bg-white/[0.04] border border-white/10 flex items-center justify-center text-white">
            <Building2 className="w-4 h-4 text-white" />
          </div>
          <div>
            <h3 className="text-sm font-semibold text-white">Company Information</h3>
            <p className="text-xs text-slate-400">Public details displayed across the website</p>
          </div>
        </div>

        <form onSubmit={handleSaveGeneral} className="space-y-3 text-xs">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className="text-slate-400 block mb-1">Company Name</label>
              <input
                type="text"
                value={formData.companyName}
                onChange={(e) => setFormData({ ...formData, companyName: e.target.value })}
                className="w-full bg-white/[0.03] border border-white/10 rounded-lg px-3 py-2 text-white placeholder-slate-600 focus:outline-none focus:border-cyan-400/50"
              />
            </div>
            <div>
              <label className="text-slate-400 block mb-1">Tagline</label>
              <input
                type="text"
                value={formData.tagline}
                onChange={(e) => setFormData({ ...formData, tagline: e.target.value })}
                className="w-full bg-white/[0.03] border border-white/10 rounded-lg px-3 py-2 text-white placeholder-slate-600 focus:outline-none focus:border-cyan-400/50"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className="text-slate-400 block mb-1">Contact Email</label>
              <input
                type="email"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                className="w-full bg-white/[0.03] border border-white/10 rounded-lg px-3 py-2 text-white placeholder-slate-600 focus:outline-none focus:border-cyan-400/50"
              />
            </div>
            <div>
              <label className="text-slate-400 block mb-1">WhatsApp / Phone</label>
              <input
                type="text"
                value={formData.phone}
                onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                className="w-full bg-white/[0.03] border border-white/10 rounded-lg px-3 py-2 text-white placeholder-slate-600 focus:outline-none focus:border-cyan-400/50"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className="text-slate-400 block mb-1">Work Location</label>
              <input
                type="text"
                value={formData.workingModel}
                onChange={(e) => setFormData({ ...formData, workingModel: e.target.value })}
                className="w-full bg-white/[0.03] border border-white/10 rounded-lg px-3 py-2 text-white placeholder-slate-600 focus:outline-none focus:border-cyan-400/50"
              />
            </div>
            <div>
              <label className="text-slate-400 block mb-1">Calendar / Booking Link</label>
              <input
                type="url"
                value={formData.consultationLink}
                onChange={(e) => setFormData({ ...formData, consultationLink: e.target.value })}
                className="w-full bg-white/[0.03] border border-white/10 rounded-lg px-3 py-2 text-white placeholder-slate-600 focus:outline-none focus:border-cyan-400/50"
              />
            </div>
          </div>

          <div className="flex justify-end pt-2">
            <button
              type="submit"
              className="btn-primary !px-4 !py-1.5 !text-xs !rounded-lg flex items-center gap-1.5"
            >
              <Save className="w-3.5 h-3.5 text-white" />
              <span>Save Changes</span>
            </button>
          </div>
        </form>
      </div>

      {/* 2. Top Notice Banner */}
      <div className="p-5 rounded-xl bg-white/[0.02] border border-white/[0.06]">
        <div className="flex items-center gap-2.5 pb-3 mb-4 border-b border-white/[0.06]">
          <div className="w-8 h-8 rounded-lg bg-white/[0.04] border border-white/10 flex items-center justify-center text-white">
            <Bell className="w-4 h-4 text-white" />
          </div>
          <div>
            <h3 className="text-sm font-semibold text-white">Notice Banner</h3>
            <p className="text-xs text-slate-400">Show an alert message at the top of the website</p>
          </div>
        </div>

        <form onSubmit={handleSaveGeneral} className="space-y-3 text-xs">
          <div className="flex items-center gap-2">
            <input
              type="checkbox"
              id="bannerToggle"
              checked={formData.announcementActive}
              onChange={(e) => setFormData({ ...formData, announcementActive: e.target.checked })}
              className="w-3.5 h-3.5 rounded bg-white/[0.03] border-white/20 accent-cyan-400 cursor-pointer"
            />
            <label htmlFor="bannerToggle" className="text-slate-300 font-medium cursor-pointer">
              Show notice banner on website
            </label>
          </div>

          {formData.announcementActive && (
            <div>
              <label className="text-slate-400 block mb-1">Banner Message</label>
              <input
                type="text"
                value={formData.announcementText}
                onChange={(e) => setFormData({ ...formData, announcementText: e.target.value })}
                placeholder="e.g. Now taking on new Q4 clients."
                className="w-full bg-white/[0.03] border border-white/10 rounded-lg px-3 py-2 text-white placeholder-slate-600 focus:outline-none focus:border-cyan-400/50"
              />
            </div>
          )}

          <div className="flex justify-end pt-2">
            <button
              type="submit"
              className="btn-primary !px-4 !py-1.5 !text-xs !rounded-lg flex items-center gap-1.5"
            >
              <Save className="w-3.5 h-3.5 text-white" />
              <span>Save Banner</span>
            </button>
          </div>
        </form>
      </div>

      {/* 3. Password & Security */}
      <div className="p-5 rounded-xl bg-white/[0.02] border border-white/[0.06]">
        <div className="flex items-center gap-2.5 pb-3 mb-4 border-b border-white/[0.06]">
          <div className="w-8 h-8 rounded-lg bg-white/[0.04] border border-white/10 flex items-center justify-center text-white">
            <Lock className="w-4 h-4 text-white" />
          </div>
          <div>
            <h3 className="text-sm font-semibold text-white">Change Password</h3>
            <p className="text-xs text-slate-400">Update your admin login password</p>
          </div>
        </div>

        <form onSubmit={handleChangePassword} className="space-y-3 text-xs">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            <div>
              <label className="text-slate-400 block mb-1">Current Password</label>
              <input
                type="password"
                required
                value={passwordData.currentPassword}
                onChange={(e) => setPasswordData({ ...passwordData, currentPassword: e.target.value })}
                placeholder="••••••"
                className="w-full bg-white/[0.03] border border-white/10 rounded-lg px-3 py-2 text-white placeholder-slate-600 focus:outline-none focus:border-cyan-400/50"
              />
            </div>
            <div>
              <label className="text-slate-400 block mb-1">New Password</label>
              <input
                type="password"
                required
                value={passwordData.newPassword}
                onChange={(e) => setPasswordData({ ...passwordData, newPassword: e.target.value })}
                placeholder="••••••"
                className="w-full bg-white/[0.03] border border-white/10 rounded-lg px-3 py-2 text-white placeholder-slate-600 focus:outline-none focus:border-cyan-400/50"
              />
            </div>
            <div>
              <label className="text-slate-400 block mb-1">Confirm New Password</label>
              <input
                type="password"
                required
                value={passwordData.confirmPassword}
                onChange={(e) => setPasswordData({ ...passwordData, confirmPassword: e.target.value })}
                placeholder="••••••"
                className="w-full bg-white/[0.03] border border-white/10 rounded-lg px-3 py-2 text-white placeholder-slate-600 focus:outline-none focus:border-cyan-400/50"
              />
            </div>
          </div>

          <div className="flex justify-end pt-2">
            <button
              type="submit"
              className="btn-primary !px-4 !py-1.5 !text-xs !rounded-lg flex items-center gap-1.5"
            >
              <KeyRound className="w-3.5 h-3.5 text-white" />
              <span>Update Password</span>
            </button>
          </div>
        </form>
      </div>

      {/* 4. Reset Data Section */}
      <div className="p-5 rounded-xl bg-white/[0.02] border border-rose-500/10">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div>
            <h4 className="text-sm font-semibold text-white flex items-center gap-2">
              <AlertTriangle className="w-4 h-4 text-white" />
              <span>Reset Data</span>
            </h4>
            <p className="text-xs text-slate-400 mt-0.5">
              Restore default services, projects, team members, and settings.
            </p>
          </div>

          <button
            onClick={handleResetDefaults}
            className="px-3.5 py-1.5 rounded-lg border border-rose-500/30 text-rose-300 hover:bg-rose-500/10 text-xs font-medium transition-colors cursor-pointer self-start sm:self-center"
          >
            Reset to Default
          </button>
        </div>
      </div>
    </div>
  );
}
