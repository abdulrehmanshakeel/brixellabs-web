import React from 'react';
import { 
  Search, 
  Plus, 
  Download, 
  Menu, 
  Bell, 
  ShieldCheck, 
  RotateCcw,
  Layers,
  Globe
} from 'lucide-react';

const TAB_TITLES = {
  overview: 'Executive Dashboard & Overview',
  inquiries: 'Inbound Inquiries & CRM Leads',
  services: 'Services Catalog Management',
  portfolio: 'Case Studies & Solutions Portfolio',
  team: 'Team Directory & Staffing',
  settings: 'Site Configuration & Brand Settings',
  audit: 'System Telemetry & Audit Trail',
};

export const AdminHeader = ({ 
  activeTab = 'overview',
  activeTabTitle,
  onLogout,
  onAddLead,
  onNewLead,
  onExportCSV,
  onToggleSidebar
}) => {
  const displayTitle = activeTabTitle || TAB_TITLES[activeTab] || 'Admin Console';
  const handleAddLead = onAddLead || onNewLead;

  return (
    <header className="sticky top-0 z-30 bg-[#030d17]/90 backdrop-blur-xl border-b border-cyan-500/25 px-4 sm:px-6 py-3.5 flex items-center justify-between gap-4">
      
      {/* Left: Mobile Toggle & Page Title */}
      <div className="flex items-center gap-3">
        <button
          onClick={onToggleSidebar}
          className="lg:hidden p-2 rounded-xl bg-[#061e31] border border-cyan-500/30 text-cyan-300 hover:text-white"
          aria-label="Toggle Sidebar"
        >
          <Menu className="w-5 h-5" />
        </button>

        <div>
          <div className="text-xs font-mono text-cyan-400 font-bold uppercase tracking-wider flex items-center gap-1.5">
            <span className="w-1.5 h-1.5 rounded-full bg-cyan-400"></span>
            <span>ADMIN CONSOLE</span>
          </div>
          <h1 className="text-lg sm:text-xl font-extrabold text-white tracking-tight">
            {displayTitle}
          </h1>
        </div>
      </div>

      {/* Center: Global Search Bar */}
      <div className="hidden md:flex items-center flex-1 max-w-md mx-4">
        <div className="relative w-full">
          <Search className="w-4 h-4 text-cyan-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="Search leads, services, case studies, or tags..."
            className="w-full pl-10 pr-4 py-2 rounded-xl bg-[#051829] border border-cyan-500/30 text-white placeholder-slate-500 focus:outline-none focus:border-cyan-400 text-xs transition-all shadow-inner"
          />
        </div>
      </div>

      {/* Right Action Buttons */}
      <div className="flex items-center gap-2.5">
        
        {/* System Health Badge */}
        <div className="hidden sm:inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-cyan-950/80 border border-cyan-500/35 text-[11px] font-mono text-cyan-300 shadow-[0_0_10px_rgba(0,240,255,0.15)]">
          <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping"></span>
          <span>99.99% OPERATIONAL</span>
        </div>

        {/* Quick New Lead Button */}
        <button
          onClick={handleAddLead}
          className="p-2 sm:px-3 sm:py-2 rounded-xl bg-gradient-to-r from-cyan-400 to-teal-300 hover:from-cyan-300 hover:to-teal-200 text-[#031422] font-bold text-xs flex items-center gap-1.5 transition-all shadow-[0_0_15px_rgba(0,240,255,0.4)] cursor-pointer"
          title="Add New Inbound Lead"
        >
          <Plus className="w-3.5 h-3.5" />
          <span className="hidden sm:inline">Add Lead</span>
        </button>

        {/* Quick Export CSV Button */}
        <button
          onClick={onExportCSV}
          className="p-2 sm:px-3 sm:py-2 rounded-xl bg-[#061e31] hover:bg-[#0a2f4d] text-cyan-300 border border-cyan-500/30 text-xs font-semibold flex items-center gap-1.5 transition-all cursor-pointer shadow-sm"
          title="Export Inquiries to CSV"
        >
          <Download className="w-3.5 h-3.5 text-cyan-400" />
          <span className="hidden sm:inline">Export CSV</span>
        </button>

        {/* Admin Profile Icon */}
        <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-cyan-500/30 to-blue-600/30 border border-cyan-400/50 flex items-center justify-center text-cyan-300 font-bold font-mono text-xs shadow-[0_0_10px_rgba(0,240,255,0.3)]">
          AD
        </div>
      </div>
    </header>
  );
};

export default AdminHeader;
