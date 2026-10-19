import React from 'react';
import { Menu, ArrowUpRight, Download } from 'lucide-react';

const TAB_INFO = {
  overview: { title: 'Dashboard', subtitle: 'Overview & recent updates' },
  inquiries: { title: 'Messages', subtitle: 'Customer inquiries & leads' },
  services: { title: 'Services', subtitle: 'Manage website services' },
  portfolio: { title: 'Projects', subtitle: 'Manage case studies & projects' },
  team: { title: 'Team', subtitle: 'Manage team members' },
  settings: { title: 'Settings', subtitle: 'Website & login settings' },
  audit: { title: 'Activity', subtitle: 'Recent system history' },
};

export const AdminHeader = ({ 
  activeTab = 'overview',
  activeTabTitle,
  onLogout,
  onExportCSV,
  onToggleSidebar
}) => {
  const currentInfo = TAB_INFO[activeTab] || { title: activeTabTitle || 'Dashboard', subtitle: '' };

  return (
    <header className="sticky top-0 z-30 bg-[#02070e]/95 backdrop-blur-md border-b border-white/[0.06] px-4 sm:px-6 py-3 flex items-center justify-between gap-4">
      
      {/* Left: Mobile Toggle & Page Title */}
      <div className="flex items-center gap-3">
        <button
          onClick={onToggleSidebar}
          className="lg:hidden p-1.5 rounded-lg text-white hover:bg-white/[0.04] cursor-pointer"
          aria-label="Toggle Sidebar"
        >
          <Menu className="w-5 h-5 text-white" />
        </button>

        <div>
          <h1 className="text-base sm:text-lg font-bold text-white tracking-tight">
            {currentInfo.title}
          </h1>
          <p className="text-[11px] text-slate-400 hidden sm:block">
            {currentInfo.subtitle}
          </p>
        </div>
      </div>

      {/* Right Actions */}
      <div className="flex items-center gap-2">
        {(activeTab === 'inquiries' || activeTab === 'overview') && (
          <button
            onClick={onExportCSV}
            className="px-3 py-1.5 rounded-lg text-slate-200 hover:text-white hover:bg-white/[0.04] border border-white/[0.08] text-xs font-medium flex items-center gap-1.5 transition-colors cursor-pointer"
            title="Download inquiries as CSV"
          >
            <Download className="w-3.5 h-3.5 text-white" />
            <span className="hidden sm:inline">Export CSV</span>
          </button>
        )}

        <a
          href="/"
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-slate-200 hover:text-white hover:bg-white/[0.04] border border-white/[0.08] text-xs font-medium transition-colors"
          title="Open website in new tab"
        >
          <span>Live Site</span>
          <ArrowUpRight className="w-3.5 h-3.5 text-white" />
        </a>

        {/* User Pill */}
        <div className="flex items-center gap-2 pl-2 border-l border-white/[0.06]">
          <div className="w-7 h-7 rounded-full bg-white/[0.08] border border-white/20 flex items-center justify-center text-xs font-bold text-white">
            A
          </div>
          <span className="text-xs font-medium text-slate-300 hidden md:inline">
            admin
          </span>
        </div>
      </div>
    </header>
  );
};

export default AdminHeader;
