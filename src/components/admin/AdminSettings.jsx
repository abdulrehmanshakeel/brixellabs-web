import React, { useState } from 'react';
import { 
  Sliders, Save, Lock, Bell, Mail, Phone, Globe, 
  CheckCircle2, ShieldAlert, KeyRound, Radio, ExternalLink
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
    announcementText: settings.announcementText || '🚀 Now accepting Q3/Q4 Enterprise AI & Automation partnerships.'
  });


  const [passwordData, setPasswordData] = useState({
    currentPassword: '',
    newPassword: '',
    confirmPassword: ''
  });

  const handleSaveGeneral = (e) => {
    e.preventDefault();
    adminStorage.updateSettings(formData);
    showToast?.('Site settings saved and applied', 'success');
    onRefresh?.();
  };

  const handleChangePassword = (e) => {
    e.preventDefault();
    if (!passwordData.newPassword || !passwordData.confirmPassword) {
      showToast?.('Please fill out all password fields', 'error');
      return;
    }
    if (passwordData.newPassword !== passwordData.confirmPassword) {
      showToast?.('New passwords do not match', 'error');
      return;
    }
    if (passwordData.newPassword.length < 6) {
      showToast?.('Password must be at least 6 characters', 'error');
      return;
    }

    const currentCreds = adminStorage.getAuthCredentials();
    if (passwordData.currentPassword !== currentCreds.password) {
      showToast?.('Current password entered is incorrect', 'error');
      return;
    }

    adminStorage.setAuthCredentials(currentCreds.username, passwordData.newPassword);
    setPasswordData({ currentPassword: '', newPassword: '', confirmPassword: '' });
    showToast?.('Admin password updated successfully!', 'success');
  };

  const handleResetDefaults = () => {
    if (window.confirm('Reset all website settings and mock data back to factory defaults?')) {
      adminStorage.resetToDefaults();
      showToast?.('System reset to default state', 'info');
      onRefresh?.();
    }
  };

  return (
    <div className="space-y-6 max-w-4xl">
      {/* General Company & Branding Settings */}
      <div className="p-6 rounded-2xl bg-[#030d17]/80 border border-cyan-900/30 backdrop-blur-md shadow-xl">
        <div className="flex items-center gap-3 pb-4 mb-6 border-b border-cyan-900/40">
          <div className="w-9 h-9 rounded-lg bg-cyan-950/60 border border-cyan-700/50 flex items-center justify-center text-cyan-400">
            <Sliders className="w-5 h-5" />
          </div>
          <div>
            <h3 className="text-base font-bold text-white">Brand & General Configuration</h3>
            <p className="text-xs text-cyan-400/60">Update global headers, official tagline, and contact credentials</p>
          </div>
        </div>

        <form onSubmit={handleSaveGeneral} className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="text-xs text-cyan-400 font-medium block mb-1">Company / Brand Name</label>
              <input
                type="text"
                value={formData.companyName}
                onChange={(e) => setFormData({ ...formData, companyName: e.target.value })}
                className="w-full bg-[#02070e] border border-cyan-900/50 rounded-lg px-3.5 py-2 text-sm text-cyan-100 focus:outline-none focus:border-cyan-500"
              />
            </div>
            <div>
              <label className="text-xs text-cyan-400 font-medium block mb-1">Official Company Tagline</label>
              <input
                type="text"
                value={formData.tagline}
                onChange={(e) => setFormData({ ...formData, tagline: e.target.value })}
                className="w-full bg-[#02070e] border border-cyan-900/50 rounded-lg px-3.5 py-2 text-sm text-cyan-100 font-semibold focus:outline-none focus:border-cyan-500"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="text-xs text-cyan-400 font-medium block mb-1">Inquiry Contact Email</label>
              <input
                type="email"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                className="w-full bg-[#02070e] border border-cyan-900/50 rounded-lg px-3.5 py-2 text-sm text-cyan-100 focus:outline-none focus:border-cyan-500 font-mono"
              />
            </div>
            <div>
              <label className="text-xs text-cyan-400 font-medium block mb-1">Contact Phone / WhatsApp</label>
              <input
                type="text"
                value={formData.phone}
                onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                className="w-full bg-[#02070e] border border-cyan-900/50 rounded-lg px-3.5 py-2 text-sm text-cyan-100 focus:outline-none focus:border-cyan-500 font-mono"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="text-xs text-cyan-400 font-medium block mb-1">Operating Model (Remote Badge)</label>
              <input
                type="text"
                value={formData.workingModel}
                onChange={(e) => setFormData({ ...formData, workingModel: e.target.value })}
                className="w-full bg-[#02070e] border border-cyan-900/50 rounded-lg px-3.5 py-2 text-sm text-cyan-100 focus:outline-none focus:border-cyan-500"
              />
            </div>
            <div>
              <label className="text-xs text-cyan-400 font-medium block mb-1">Consultation Calendar URL (e.g. Calendly)</label>
              <input
                type="text"
                value={formData.consultationLink}
                onChange={(e) => setFormData({ ...formData, consultationLink: e.target.value })}
                className="w-full bg-[#02070e] border border-cyan-900/50 rounded-lg px-3.5 py-2 text-sm text-cyan-100 focus:outline-none focus:border-cyan-500 font-mono"
              />
            </div>
          </div>

          {/* Announcement Banner */}
          <div className="p-4 rounded-xl bg-[#02070e] border border-cyan-900/40 space-y-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Bell className="w-4 h-4 text-cyan-400" />
                <span className="text-xs text-cyan-200 font-semibold">Top Announcement Banner</span>
              </div>
              <label className="relative inline-flex items-center cursor-pointer">
                <input
                  type="checkbox"
                  checked={formData.announcementActive}
                  onChange={(e) => setFormData({ ...formData, announcementActive: e.target.checked })}
                  className="sr-only peer"
                />
                <div className="w-9 h-5 bg-slate-800 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:bg-cyan-500"></div>
              </label>
            </div>
            <input
              type="text"
              value={formData.announcementText}
              onChange={(e) => setFormData({ ...formData, announcementText: e.target.value })}
              placeholder="Announcement text banner for all visitors..."
              className="w-full bg-[#030d17] border border-cyan-900/50 rounded-lg px-3 py-2 text-xs text-cyan-100 placeholder-cyan-800 focus:outline-none focus:border-cyan-500"
            />
          </div>

          <div className="flex justify-end pt-2">
            <button
              type="submit"
              className="flex items-center gap-2 px-5 py-2.5 rounded-lg bg-gradient-to-r from-cyan-500 to-blue-600 text-black font-semibold text-xs hover:from-cyan-400 hover:to-blue-500 transition-all shadow-md shadow-cyan-500/20"
            >
              <Save className="w-4 h-4" />
              <span>Save System Settings</span>
            </button>
          </div>
        </form>
      </div>

      {/* Security & Access Management */}
      <div className="p-6 rounded-2xl bg-[#030d17]/80 border border-cyan-900/30 backdrop-blur-md shadow-xl">
        <div className="flex items-center gap-3 pb-4 mb-6 border-b border-cyan-900/40">
          <div className="w-9 h-9 rounded-lg bg-cyan-950/60 border border-cyan-700/50 flex items-center justify-center text-cyan-400">
            <KeyRound className="w-5 h-5" />
          </div>
          <div>
            <h3 className="text-base font-bold text-white">Security & Password Management</h3>
            <p className="text-xs text-cyan-400/60">Update your root administrative credentials</p>
          </div>
        </div>

        <form onSubmit={handleChangePassword} className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label className="text-xs text-cyan-400 font-medium block mb-1">Current Password *</label>
              <input
                type="password"
                required
                value={passwordData.currentPassword}
                onChange={(e) => setPasswordData({ ...passwordData, currentPassword: e.target.value })}
                placeholder="Current password"
                className="w-full bg-[#02070e] border border-cyan-900/50 rounded-lg px-3.5 py-2 text-sm text-cyan-100 focus:outline-none focus:border-cyan-500 font-mono"
              />
            </div>
            <div>
              <label className="text-xs text-cyan-400 font-medium block mb-1">New Password *</label>
              <input
                type="password"
                required
                value={passwordData.newPassword}
                onChange={(e) => setPasswordData({ ...passwordData, newPassword: e.target.value })}
                placeholder="Minimum 6 characters"
                className="w-full bg-[#02070e] border border-cyan-900/50 rounded-lg px-3.5 py-2 text-sm text-cyan-100 focus:outline-none focus:border-cyan-500 font-mono"
              />
            </div>
            <div>
              <label className="text-xs text-cyan-400 font-medium block mb-1">Confirm New Password *</label>
              <input
                type="password"
                required
                value={passwordData.confirmPassword}
                onChange={(e) => setPasswordData({ ...passwordData, confirmPassword: e.target.value })}
                placeholder="Repeat new password"
                className="w-full bg-[#02070e] border border-cyan-900/50 rounded-lg px-3.5 py-2 text-sm text-cyan-100 focus:outline-none focus:border-cyan-500 font-mono"
              />
            </div>
          </div>

          <div className="flex justify-end pt-2">
            <button
              type="submit"
              className="flex items-center gap-2 px-5 py-2.5 rounded-lg bg-cyan-950/60 border border-cyan-700/60 text-cyan-300 font-semibold text-xs hover:bg-cyan-900/60 hover:text-white transition-all shadow-md"
            >
              <Lock className="w-4 h-4" />
              <span>Update Credentials</span>
            </button>
          </div>
        </form>
      </div>

      {/* Danger Zone */}
      <div className="p-6 rounded-2xl bg-red-950/10 border border-red-900/30 backdrop-blur-md">
        <div className="flex items-center justify-between">
          <div>
            <h4 className="text-sm font-bold text-red-400 flex items-center gap-2">
              <ShieldAlert className="w-4 h-4" />
              Factory Reset & Data Purge
            </h4>
            <p className="text-xs text-red-300/60 mt-0.5">
              Reset all inquiries, services, portfolio, and settings back to initial factory demo seed state.
            </p>
          </div>
          <button
            onClick={handleResetDefaults}
            className="px-4 py-2 rounded-lg bg-red-950/40 border border-red-800/50 text-red-400 text-xs font-semibold hover:bg-red-900/50 hover:text-white transition-colors"
          >
            Reset to Factory Defaults
          </button>
        </div>
      </div>
    </div>
  );
}
