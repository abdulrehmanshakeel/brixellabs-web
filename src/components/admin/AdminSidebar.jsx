import React from 'react';
import { 
  LayoutDashboard, 
  Users, 
  Layers, 
  Briefcase, 
  Settings, 
  FileText, 
  Activity, 
  LogOut, 
  Globe, 
  ShieldCheck,
  ChevronRight,
  Database,
  Cpu
} from 'lucide-react';
import { motion } from 'framer-motion';

export const AdminSidebar = ({ 
  activeTab, 
  setActiveTab, 
  inquiriesCount = 0, 
  onLogout, 
  onViewLiveSite = () => { window.location.href = '/'; },
  isOpen = false,
  onClose
}) => {
  const menuItems = [
    {
      id: 'overview',
      label: 'Overview & Analytics',
      icon: LayoutDashboard,
      badge: null
    },
    {
      id: 'inquiries',
      label: 'Leads & Inquiries (CRM)',
      icon: Users,
      badge: inquiriesCount > 0 ? inquiriesCount : null,
      badgeColor: 'bg-cyan-500 text-black'
    },
    {
      id: 'services',
      label: 'Services Manager',
      icon: Layers,
      badge: '8 Active'
    },
    {
      id: 'portfolio',
      label: 'Portfolio & Case Studies',
      icon: Briefcase,
      badge: null
    },
    {
      id: 'team',
      label: 'Team & Specialists',
      icon: Cpu,
      badge: null
    },
    {
      id: 'settings',
      label: 'Site & Tagline Settings',
      icon: Settings,
      badge: null
    },
    {
      id: 'audit',
      label: 'Security & Audit Logs',
      icon: Activity,
      badge: 'Live'
    }
  ];

  return (
    <>
      {/* Mobile Backdrop */}
      {isOpen && (
        <div 
          onClick={onClose}
          className="fixed inset-0 bg-black/70 backdrop-blur-sm z-40 lg:hidden"
        />
      )}

      <aside 
        className={`fixed lg:static top-0 left-0 bottom-0 z-50 lg:z-10 w-64 shrink-0 h-screen bg-[#030d17] border-r border-cyan-500/25 flex flex-col justify-between transition-transform duration-300 ${
          isOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'
        }`}
      >
      {/* Top Branding */}
      <div>
        <div className="p-5 border-b border-cyan-500/20 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="relative w-9 h-9 flex items-center justify-center">
              <div className="absolute inset-0 bg-cyan-400/20 rounded-full blur-md"></div>
              <img 
                src="/logo + Banner/logo without background.png" 
                alt="BrixelLabs Logo" 
                className="w-8 h-8 object-contain relative z-10 drop-shadow-[0_0_8px_rgba(0,240,255,0.7)]"
              />
            </div>
            <div>
              <div className="text-base font-extrabold text-white tracking-tight leading-none">
                Brixel<span className="text-cyan-400">Labs</span>
              </div>
              <div className="text-[10px] font-mono text-cyan-400/90 font-bold uppercase tracking-wider mt-1">
                Admin Command
              </div>
            </div>
          </div>

          <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" title="Live Connection"></span>
        </div>

        {/* Navigation Menu */}
        <nav className="p-3 space-y-1.5 mt-2">
          {menuItems.map((item) => {
            const IconComp = item.icon;
            const isActive = activeTab === item.id;

            return (
              <button
                key={item.id}
                onClick={() => setActiveTab(item.id)}
                className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl text-xs font-medium transition-all duration-200 cursor-pointer ${
                  isActive
                    ? 'bg-gradient-to-r from-cyan-500/30 to-teal-500/20 text-white border border-cyan-400/60 shadow-[0_0_15px_rgba(0,240,255,0.25)] font-bold'
                    : 'text-slate-300 hover:text-white hover:bg-cyan-950/40 hover:border-cyan-500/30 border border-transparent'
                }`}
              >
                <div className="flex items-center gap-3">
                  <IconComp className={`w-4 h-4 ${isActive ? 'text-cyan-400' : 'text-slate-400'}`} />
                  <span>{item.label}</span>
                </div>

                {item.badge && (
                  <span className={`px-2 py-0.5 rounded-full text-[10px] font-mono font-bold ${item.badgeColor || 'bg-cyan-950 text-cyan-300 border border-cyan-500/40'}`}>
                    {item.badge}
                  </span>
                )}
              </button>
            );
          })}
        </nav>
      </div>

      {/* Bottom Footer Actions */}
      <div className="p-3 border-t border-cyan-500/20 space-y-2">
        {/* Quick Link to Live Website */}
        <button
          onClick={onViewLiveSite}
          className="w-full py-2 px-3 rounded-xl bg-[#061e31] hover:bg-[#0a2e4b] text-cyan-300 border border-cyan-500/30 text-xs font-semibold flex items-center justify-between transition-all cursor-pointer shadow-sm"
        >
          <div className="flex items-center gap-2">
            <Globe className="w-3.5 h-3.5 text-cyan-400" />
            <span>View Public Site</span>
          </div>
          <ChevronRight className="w-3.5 h-3.5" />
        </button>

        {/* Admin Logout */}
        <button
          onClick={onLogout}
          className="w-full py-2 px-3 rounded-xl bg-red-950/40 hover:bg-red-900/60 text-red-300 border border-red-500/30 text-xs font-semibold flex items-center justify-center gap-2 transition-all cursor-pointer"
        >
          <LogOut className="w-3.5 h-3.5" />
          <span>Exit Admin Session</span>
        </button>

        <div className="text-center text-[10px] font-mono text-slate-500 pt-1">
          v4.2.0-SECURE · BRIXEL AI
        </div>
      </div>
    </aside>
    </>
  );
};

export default AdminSidebar;
