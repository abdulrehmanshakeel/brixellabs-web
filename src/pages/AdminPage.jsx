import React, { useState, useEffect } from 'react';
import { adminStorage } from '../utils/adminStorage';
import AdminLogin from '../components/admin/AdminLogin';
import AdminSidebar from '../components/admin/AdminSidebar';
import AdminHeader from '../components/admin/AdminHeader';
import AdminOverview from '../components/admin/AdminOverview';
import AdminInquiries from '../components/admin/AdminInquiries';
import AdminServices from '../components/admin/AdminServices';
import AdminPortfolio from '../components/admin/AdminPortfolio';
import AdminTeam from '../components/admin/AdminTeam';
import AdminSettings from '../components/admin/AdminSettings';
import AdminAuditLogs from '../components/admin/AdminAuditLogs';
import { CheckCircle2, AlertCircle, Info, X } from 'lucide-react';

export default function AdminPage() {
  const [isAuthenticated, setIsAuthenticated] = useState(adminStorage.isAuthenticated());
  const [activeTab, setActiveTab] = useState('overview');
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [toast, setToast] = useState(null);

  // Dynamic Data States
  const [inquiries, setInquiries] = useState([]);
  const [services, setServices] = useState([]);
  const [portfolio, setPortfolio] = useState([]);
  const [team, setTeam] = useState([]);
  const [settings, setSettings] = useState({});
  const [auditLogs, setAuditLogs] = useState([]);

  const refreshData = () => {
    setInquiries(adminStorage.getInquiries());
    setServices(adminStorage.getServices());
    setPortfolio(adminStorage.getPortfolio());
    setTeam(adminStorage.getTeam());
    setSettings(adminStorage.getSettings());
    setAuditLogs(adminStorage.getAuditLogs());
  };

  useEffect(() => {
    refreshData();
    window.scrollTo(0, 0);
  }, [isAuthenticated]);

  const showToast = (message, type = 'success') => {
    setToast({ message, type });
    setTimeout(() => {
      setToast(null);
    }, 4000);
  };

  const handleLoginSuccess = () => {
    setIsAuthenticated(true);
    refreshData();
    showToast('Welcome to Brixel Labs Command Center', 'success');
  };

  const handleLogout = () => {
    adminStorage.logout();
    setIsAuthenticated(false);
    showToast('Logged out of Admin Portal', 'info');
  };

  if (!isAuthenticated) {
    return <AdminLogin onLoginSuccess={handleLoginSuccess} />;
  }

  return (
    <div className="min-h-screen bg-[#02090f] text-slate-100 flex relative selection:bg-cyan-500 selection:text-black font-sans">
      {/* Toast Notification Container */}
      {toast && (
        <div className="fixed top-6 right-6 z-50 animate-bounce-short flex items-center gap-3 px-4 py-3 rounded-xl bg-[#030d17] border border-cyan-500/50 shadow-2xl shadow-cyan-950/80 text-sm text-cyan-200">
          {toast.type === 'success' && <CheckCircle2 className="w-5 h-5 text-emerald-400" />}
          {toast.type === 'error' && <AlertCircle className="w-5 h-5 text-rose-400" />}
          {toast.type === 'info' && <Info className="w-5 h-5 text-cyan-400" />}
          <span className="font-medium text-white">{toast.message}</span>
          <button onClick={() => setToast(null)} className="text-cyan-500 hover:text-cyan-300 ml-2">
            <X className="w-4 h-4" />
          </button>
        </div>
      )}

      {/* Admin Sidebar Navigation */}
      <AdminSidebar
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        onLogout={handleLogout}
        inquiriesCount={inquiries.filter(i => i.status === 'new').length}
        servicesCount={services.length}
        portfolioCount={portfolio.length}
        teamCount={team.length}
        isOpen={isSidebarOpen}
        onClose={() => setIsSidebarOpen(false)}
      />

      {/* Main Admin Content Body */}
      <div className="flex-1 flex flex-col min-w-0 h-screen overflow-y-auto">
        {/* Top Header */}
        <AdminHeader
          activeTab={activeTab}
          onLogout={handleLogout}
          onToggleSidebar={() => setIsSidebarOpen(!isSidebarOpen)}
          onAddLead={() => setActiveTab('inquiries')}
          onExportCSV={() => {
            adminStorage.exportInquiriesCSV();
            showToast('Inquiries CSV exported', 'success');
          }}
        />

        {/* Tab Content Panes */}
        <main className="p-4 sm:p-6 lg:p-8 flex-1 max-w-7xl w-full mx-auto pb-16">
          {activeTab === 'overview' && (
            <AdminOverview
              inquiries={inquiries}
              services={services}
              portfolio={portfolio}
              team={team}
              auditLogs={auditLogs}
              setActiveTab={setActiveTab}
            />
          )}

          {activeTab === 'inquiries' && (
            <AdminInquiries
              inquiries={inquiries}
              onRefresh={refreshData}
              showToast={showToast}
            />
          )}

          {activeTab === 'services' && (
            <AdminServices
              services={services}
              onRefresh={refreshData}
              showToast={showToast}
            />
          )}

          {activeTab === 'portfolio' && (
            <AdminPortfolio
              portfolio={portfolio}
              onRefresh={refreshData}
              showToast={showToast}
            />
          )}

          {activeTab === 'team' && (
            <AdminTeam
              team={team}
              onRefresh={refreshData}
              showToast={showToast}
            />
          )}

          {activeTab === 'settings' && (
            <AdminSettings
              settings={settings}
              onRefresh={refreshData}
              showToast={showToast}
            />
          )}

          {activeTab === 'audit' && (
            <AdminAuditLogs
              auditLogs={auditLogs}
              onRefresh={refreshData}
              showToast={showToast}
            />
          )}
        </main>
      </div>
    </div>
  );
}
