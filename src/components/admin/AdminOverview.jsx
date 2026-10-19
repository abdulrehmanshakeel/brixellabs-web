import React from 'react';
import { 
  Users, 
  MessageSquare, 
  Layers, 
  Briefcase, 
  ArrowUpRight, 
  Mail, 
  Phone, 
  Globe,
  Settings,
  ArrowRight
} from 'lucide-react';

export const AdminOverview = ({ 
  inquiries = [], 
  services = [], 
  portfolio = [], 
  team = [], 
  auditLogs = [],
  setActiveTab,
  onNavigateTab,
  onSelectLead 
}) => {
  const navigateTo = onNavigateTab || setActiveTab || (() => {});

  const totalLeads = inquiries.length;
  const newLeads = inquiries.filter(i => (i.status || '').toLowerCase() === 'new').length;
  const activeServicesCount = services.filter(s => s.active !== false).length;
  const totalProjectsCount = portfolio.length;

  const stats = [
    {
      title: 'New Messages',
      value: newLeads,
      label: newLeads === 1 ? '1 unread' : `${newLeads} unread`,
      icon: MessageSquare,
      onClick: () => navigateTo('inquiries')
    },
    {
      title: 'Total Inquiries',
      value: totalLeads,
      label: 'All time inquiries',
      icon: Users,
      onClick: () => navigateTo('inquiries')
    },
    {
      title: 'Active Services',
      value: activeServicesCount,
      label: 'Live on website',
      icon: Layers,
      onClick: () => navigateTo('services')
    },
    {
      title: 'Projects',
      value: totalProjectsCount,
      label: 'Case studies',
      icon: Briefcase,
      onClick: () => navigateTo('portfolio')
    }
  ];

  const getWhatsAppLink = (phone, name) => {
    if (!phone) return null;
    const cleanNumber = phone.replace(/[^0-9]/g, '');
    const message = encodeURIComponent(`Hi ${name || 'there'}, thanks for contacting BrixelLabs! How can we help you?`);
    return `https://wa.me/${cleanNumber}?text=${message}`;
  };

  return (
    <div className="space-y-4 max-w-6xl mx-auto">
      {/* 4 Minimal Metric Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
        {stats.map((item, idx) => {
          const Icon = item.icon;
          return (
            <div
              key={idx}
              onClick={item.onClick}
              className="p-4 rounded-xl bg-white/[0.02] hover:bg-white/[0.04] border border-white/[0.06] hover:border-white/10 transition-colors cursor-pointer group"
            >
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs text-slate-400 font-medium">{item.title}</span>
                <Icon className="w-3.5 h-3.5 text-white" />
              </div>
              <div className="text-2xl font-bold text-white tracking-tight">
                {item.value}
              </div>
              <div className="mt-1 text-[11px] text-slate-500 font-medium">
                {item.label}
              </div>
            </div>
          );
        })}
      </div>

      {/* Recent Messages Section */}
      <div className="rounded-xl bg-white/[0.02] border border-white/[0.06] overflow-hidden">
        <div className="p-4 border-b border-white/[0.06] flex items-center justify-between">
          <div>
            <h3 className="text-sm font-semibold text-white">
              Recent Messages
            </h3>
            <p className="text-xs text-slate-400 mt-0.5">
              Latest inquiries from website visitors
            </p>
          </div>

          <button
            onClick={() => navigateTo('inquiries')}
            className="text-xs text-cyan-400 hover:text-cyan-300 font-medium flex items-center gap-1 transition-colors cursor-pointer"
          >
            <span>View all ({totalLeads})</span>
            <ArrowRight className="w-3.5 h-3.5 text-white" />
          </button>
        </div>

        {inquiries.length === 0 ? (
          <div className="p-10 text-center text-slate-500 text-xs">
            No messages received yet.
          </div>
        ) : (
          <div className="divide-y divide-white/[0.04]">
            {inquiries.slice(0, 5).map((inq) => {
              const waLink = getWhatsAppLink(inq.phone, inq.name);
              const isNew = (inq.status || 'new').toLowerCase() === 'new';

              return (
                <div
                  key={inq.id}
                  className="p-4 hover:bg-white/[0.02] transition-colors flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs"
                >
                  <div className="space-y-1 min-w-0">
                    <div className="flex items-center gap-2">
                      <span className="text-sm font-semibold text-white">
                        {inq.name}
                      </span>
                      {inq.company && (
                        <span className="text-[11px] text-slate-400 bg-white/[0.04] px-1.5 py-0.5 rounded">
                          {inq.company}
                        </span>
                      )}
                      {isNew && (
                        <span className="px-1.5 py-0.5 rounded text-[10px] font-mono bg-cyan-400/10 text-cyan-300 border border-cyan-400/20">
                          New
                        </span>
                      )}
                    </div>

                    <div className="text-xs text-slate-400 flex flex-wrap items-center gap-x-2">
                      <span className="text-slate-300">{inq.service || 'Inquiry'}</span>
                      {inq.budget && <span>• {inq.budget}</span>}
                      {inq.phone && <span className="font-mono text-slate-500">• {inq.phone}</span>}
                    </div>

                    {inq.projectBrief && (
                      <p className="text-xs text-slate-400 line-clamp-1">
                        {inq.projectBrief}
                      </p>
                    )}
                  </div>

                  {/* Actions */}
                  <div className="flex items-center gap-1.5 shrink-0 self-start sm:self-center">
                    {waLink && (
                      <a
                        href={waLink}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="px-2.5 py-1.5 rounded-lg bg-emerald-500/10 hover:bg-emerald-500/20 text-emerald-300 text-xs font-medium flex items-center gap-1 transition-colors"
                        title="Open WhatsApp chat"
                      >
                        <Phone className="w-3 h-3 text-white" />
                        <span>WhatsApp</span>
                      </a>
                    )}

                    {inq.email && (
                      <a
                        href={`mailto:${inq.email}`}
                        className="px-2.5 py-1.5 rounded-lg bg-white/[0.04] hover:bg-white/[0.08] text-slate-300 hover:text-white text-xs font-medium flex items-center gap-1 transition-colors"
                        title="Send email"
                      >
                        <Mail className="w-3 h-3 text-white" />
                        <span>Email</span>
                      </a>
                    )}

                    <button
                      onClick={() => {
                        if (onSelectLead) onSelectLead(inq);
                        navigateTo('inquiries');
                      }}
                      className="px-2.5 py-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-white/[0.04] text-xs font-medium transition-colors cursor-pointer"
                    >
                      View
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>

      {/* Quick Navigation Cards */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
        <button
          onClick={() => navigateTo('inquiries')}
          className="p-3 rounded-xl bg-white/[0.02] hover:bg-white/[0.04] border border-white/[0.06] text-left transition-colors cursor-pointer"
        >
          <div className="text-xs font-semibold text-white">Messages</div>
          <div className="text-[11px] text-slate-500 mt-0.5">{totalLeads} total leads</div>
        </button>

        <button
          onClick={() => navigateTo('services')}
          className="p-3 rounded-xl bg-white/[0.02] hover:bg-white/[0.04] border border-white/[0.06] text-left transition-colors cursor-pointer"
        >
          <div className="text-xs font-semibold text-white">Services</div>
          <div className="text-[11px] text-slate-500 mt-0.5">{activeServicesCount} live on site</div>
        </button>

        <button
          onClick={() => navigateTo('portfolio')}
          className="p-3 rounded-xl bg-white/[0.02] hover:bg-white/[0.04] border border-white/[0.06] text-left transition-colors cursor-pointer"
        >
          <div className="text-xs font-semibold text-white">Projects</div>
          <div className="text-[11px] text-slate-500 mt-0.5">{totalProjectsCount} case studies</div>
        </button>

        <button
          onClick={() => navigateTo('settings')}
          className="p-3 rounded-xl bg-white/[0.02] hover:bg-white/[0.04] border border-white/[0.06] text-left transition-colors cursor-pointer"
        >
          <div className="text-xs font-semibold text-white">Settings</div>
          <div className="text-[11px] text-slate-500 mt-0.5">Phone, email & notice</div>
        </button>
      </div>
    </div>
  );
};

export default AdminOverview;
