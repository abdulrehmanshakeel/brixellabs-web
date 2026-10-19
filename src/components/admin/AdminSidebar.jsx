import React from 'react';
import { 
  LayoutDashboard, 
  MessageSquare, 
  Layers, 
  Briefcase, 
  Users, 
  Settings, 
  Activity, 
  LogOut, 
  Globe, 
  ArrowUpRight
} from 'lucide-react';
import logoImg from '../../assets/logo.webp';

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
    { id: 'overview', label: 'Dashboard', icon: LayoutDashboard },
    { id: 'inquiries', label: 'Messages', icon: MessageSquare, badge: inquiriesCount > 0 ? inquiriesCount : null },
    { id: 'services', label: 'Services', icon: Layers },
    { id: 'portfolio', label: 'Projects', icon: Briefcase },
    { id: 'team', label: 'Team', icon: Users },
    { id: 'settings', label: 'Settings', icon: Settings },
    { id: 'audit', label: 'Activity', icon: Activity },
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
        className={`fixed lg:static top-0 left-0 bottom-0 z-50 lg:z-10 w-60 shrink-0 h-screen bg-[#02070e] border-r border-white/[0.06] flex flex-col justify-between transition-transform duration-200 ${
          isOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'
        }`}
      >
        {/* Top Minimal Branding */}
        <div>
          <div className="px-5 py-5 border-b border-white/[0.06] flex items-center justify-between">
            <a 
              href="/"
              className="flex items-center gap-2.5 group cursor-pointer select-none"
            >
              <div className="w-8 h-8 rounded-lg bg-white/[0.04] border border-white/10 flex items-center justify-center group-hover:border-cyan-400/40 transition-colors">
                <img 
                  src={logoImg} 
                  alt="BrixelLabs Logo" 
                  className="w-5 h-5 object-contain"
                />
              </div>
              <div>
                <div className="font-heading text-sm font-bold tracking-tight text-white group-hover:text-cyan-300 transition-colors">
                  Brixel<span className="text-cyan-400">Labs</span>
                </div>
                <div className="text-[10px] text-slate-400 font-mono">
                  Admin
                </div>
              </div>
            </a>
          </div>

          {/* Navigation Menu */}
          <nav className="p-3 space-y-1">
            {menuItems.map((item) => {
              const IconComp = item.icon;
              const isActive = activeTab === item.id;

              return (
                <button
                  key={item.id}
                  onClick={() => {
                    setActiveTab(item.id);
                    if (onClose) onClose();
                  }}
                  className={`w-full flex items-center justify-between px-3 py-2 rounded-lg text-xs font-medium transition-colors cursor-pointer ${
                    isActive
                      ? 'bg-cyan-500/10 text-cyan-300 font-semibold'
                      : 'text-slate-400 hover:text-white hover:bg-white/[0.03]'
                  }`}
                >
                  <div className="flex items-center gap-2.5">
                    <IconComp className="w-4 h-4 text-white" />
                    <span>{item.label}</span>
                  </div>

                  {item.badge && (
                    <span className="px-1.5 py-0.5 rounded-full text-[10px] font-bold bg-cyan-400 text-slate-950">
                      {item.badge}
                    </span>
                  )}
                </button>
              );
            })}
          </nav>
        </div>

        {/* Bottom Minimal Footer Actions */}
        <div className="p-3 border-t border-white/[0.06] space-y-1">
          <button
            onClick={onViewLiveSite}
            className="w-full py-2 px-3 rounded-lg text-slate-400 hover:text-white hover:bg-white/[0.03] text-xs font-medium flex items-center justify-between transition-colors cursor-pointer"
          >
            <div className="flex items-center gap-2">
              <Globe className="w-3.5 h-3.5 text-white" />
              <span>Visit Website</span>
            </div>
            <ArrowUpRight className="w-3 h-3 text-white" />
          </button>

          <button
            onClick={onLogout}
            className="w-full py-2 px-3 rounded-lg text-slate-400 hover:text-rose-400 hover:bg-rose-500/5 text-xs font-medium flex items-center gap-2 transition-colors cursor-pointer"
          >
            <LogOut className="w-3.5 h-3.5 text-white" />
            <span>Log Out</span>
          </button>
        </div>
      </aside>
    </>
  );
};

export default AdminSidebar;
