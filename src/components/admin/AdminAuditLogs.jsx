import React, { useState } from 'react';
import { 
  Search, Trash2, Key, FileEdit, PlusCircle, Trash, Settings, Download, AlertTriangle, Clock, Activity
} from 'lucide-react';
import { adminStorage } from '../../utils/adminStorage';

const ACTION_ICONS = {
  AUTH_LOGIN: { icon: Key, color: 'text-white' },
  AUTH_LOGOUT: { icon: Key, color: 'text-white' },
  PASSWORD_CHANGED: { icon: Key, color: 'text-white' },
  CREATE_INQUIRY: { icon: PlusCircle, color: 'text-white' },
  UPDATE_INQUIRY: { icon: FileEdit, color: 'text-white' },
  DELETE_INQUIRY: { icon: Trash, color: 'text-white' },
  CREATE_SERVICE: { icon: PlusCircle, color: 'text-white' },
  UPDATE_SERVICE: { icon: FileEdit, color: 'text-white' },
  DELETE_SERVICE: { icon: Trash, color: 'text-white' },
  CREATE_PORTFOLIO: { icon: PlusCircle, color: 'text-white' },
  UPDATE_PORTFOLIO: { icon: FileEdit, color: 'text-white' },
  DELETE_PORTFOLIO: { icon: Trash, color: 'text-white' },
  SETTINGS_UPDATED: { icon: Settings, color: 'text-white' },
  EXPORT_CSV: { icon: Download, color: 'text-white' },
  RESET_DEFAULTS: { icon: AlertTriangle, color: 'text-white' },
};

const ACTION_LABELS = {
  AUTH_LOGIN: 'Admin Signed In',
  AUTH_LOGOUT: 'Admin Logged Out',
  PASSWORD_CHANGED: 'Password Changed',
  CREATE_INQUIRY: 'New Message Received',
  UPDATE_INQUIRY: 'Message Status Updated',
  DELETE_INQUIRY: 'Message Deleted',
  CREATE_SERVICE: 'Service Added',
  UPDATE_SERVICE: 'Service Updated',
  DELETE_SERVICE: 'Service Deleted',
  CREATE_PORTFOLIO: 'Project Added',
  UPDATE_PORTFOLIO: 'Project Updated',
  DELETE_PORTFOLIO: 'Project Deleted',
  SETTINGS_UPDATED: 'Settings Saved',
  EXPORT_CSV: 'Data Exported to CSV',
  RESET_DEFAULTS: 'Data Reset to Defaults',
};

export default function AdminAuditLogs({ auditLogs = [], onRefresh, showToast }) {
  const [searchTerm, setSearchTerm] = useState('');
  const [filterType, setFilterType] = useState('all');

  const filteredLogs = auditLogs.filter(log => {
    const actionLabel = ACTION_LABELS[log.action] || log.action || '';
    const matchesSearch = 
      actionLabel.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (log.action || '').toLowerCase().includes(searchTerm.toLowerCase()) ||
      (log.details || '').toLowerCase().includes(searchTerm.toLowerCase());
    
    if (!matchesSearch) return false;
    if (filterType === 'all') return true;
    if (filterType === 'auth') return log.action.startsWith('AUTH');
    if (filterType === 'content') return log.action.includes('SERVICE') || log.action.includes('PORTFOLIO') || log.action.includes('INQUIRY');
    if (filterType === 'settings') return log.action.includes('SETTINGS') || log.action.includes('PASSWORD') || log.action.includes('RESET');
    return true;
  });

  const handleClearLogs = () => {
    if (window.confirm('Clear all activity logs?')) {
      adminStorage.clearAuditLogs();
      showToast?.('Activity logs cleared', 'info');
      onRefresh?.();
    }
  };

  const formatDate = (isoString) => {
    if (!isoString) return '';
    try {
      const d = new Date(isoString);
      return d.toLocaleDateString('en-US', {
        month: 'short',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit'
      });
    } catch (e) {
      return isoString;
    }
  };

  return (
    <div className="space-y-4 max-w-4xl mx-auto">
      {/* Controls Toolbar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 p-3 rounded-xl bg-white/[0.02] border border-white/[0.06]">
        <div className="flex flex-wrap items-center gap-2">
          <div className="relative min-w-[200px]">
            <Search className="w-3.5 h-3.5 text-white absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Search activity..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full bg-white/[0.03] border border-white/[0.08] rounded-lg pl-8 pr-3 py-1.5 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-cyan-400/50"
            />
          </div>

          <div className="flex items-center gap-1">
            {[
              { id: 'all', label: 'All' },
              { id: 'auth', label: 'Logins' },
              { id: 'content', label: 'Content' },
              { id: 'settings', label: 'Settings' }
            ].map((f) => (
              <button
                key={f.id}
                onClick={() => setFilterType(f.id)}
                className={`px-2.5 py-1 rounded-md text-xs font-medium transition-colors cursor-pointer ${
                  filterType === f.id
                    ? 'bg-white/[0.08] text-white font-semibold'
                    : 'text-slate-400 hover:text-white'
                }`}
              >
                {f.label}
              </button>
            ))}
          </div>
        </div>

        {auditLogs.length > 0 && (
          <button
            onClick={handleClearLogs}
            className="px-2.5 py-1.5 rounded-lg text-slate-300 hover:text-rose-400 hover:bg-rose-500/10 text-xs font-medium flex items-center gap-1.5 transition-colors cursor-pointer self-start sm:self-center"
            title="Clear all logs"
          >
            <Trash2 className="w-3.5 h-3.5 text-white hover:text-rose-400" />
            <span>Clear History</span>
          </button>
        )}
      </div>

      {/* Logs List */}
      {filteredLogs.length === 0 ? (
        <div className="p-10 text-center rounded-xl bg-white/[0.02] border border-white/[0.06] text-slate-400">
          <Activity className="w-8 h-8 mx-auto text-white mb-2" />
          <p className="text-sm font-semibold text-white">No activity found</p>
          <p className="text-xs text-slate-400 mt-1">Actions you perform in the admin panel will appear here.</p>
        </div>
      ) : (
        <div className="space-y-1.5">
          {filteredLogs.map((log) => {
            const itemConfig = ACTION_ICONS[log.action] || { icon: Activity, color: 'text-white' };
            const Icon = itemConfig.icon;
            const title = ACTION_LABELS[log.action] || log.action || 'Activity Event';

            return (
              <div
                key={log.id}
                className="p-3 rounded-lg bg-white/[0.02] border border-white/[0.04] hover:border-white/[0.08] transition-colors flex items-center justify-between gap-3 text-xs"
              >
                <div className="flex items-center gap-3 min-w-0">
                  <div className="w-7 h-7 rounded-md bg-white/[0.06] flex items-center justify-center shrink-0 text-white">
                    <Icon className="w-3.5 h-3.5 text-white" />
                  </div>
                  <div className="min-w-0">
                    <p className="font-medium text-white truncate">
                      {title}
                    </p>
                    {log.details && (
                      <p className="text-[11px] text-slate-400 truncate">
                        {log.details}
                      </p>
                    )}
                  </div>
                </div>

                <div className="flex items-center gap-1.5 text-[11px] text-slate-400 shrink-0 font-mono">
                  <Clock className="w-3 h-3 text-white" />
                  <span>{formatDate(log.timestamp)}</span>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
