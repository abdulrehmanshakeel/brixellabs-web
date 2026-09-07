import React, { useState } from 'react';
import { 
  ShieldCheck, Search, Filter, Trash2, Key, 
  FileEdit, PlusCircle, Trash, Settings, Download, AlertTriangle, Clock
} from 'lucide-react';
import { adminStorage } from '../../utils/adminStorage';

const ACTION_ICONS = {
  AUTH_LOGIN: { icon: Key, color: 'text-emerald-400', bg: 'bg-emerald-500/10' },
  AUTH_LOGOUT: { icon: Key, color: 'text-slate-400', bg: 'bg-slate-500/10' },
  PASSWORD_CHANGED: { icon: Key, color: 'text-amber-400', bg: 'bg-amber-500/10' },
  CREATE_INQUIRY: { icon: PlusCircle, color: 'text-cyan-400', bg: 'bg-cyan-500/10' },
  UPDATE_INQUIRY: { icon: FileEdit, color: 'text-blue-400', bg: 'bg-blue-500/10' },
  DELETE_INQUIRY: { icon: Trash, color: 'text-red-400', bg: 'bg-red-500/10' },
  CREATE_SERVICE: { icon: PlusCircle, color: 'text-cyan-400', bg: 'bg-cyan-500/10' },
  UPDATE_SERVICE: { icon: FileEdit, color: 'text-blue-400', bg: 'bg-blue-500/10' },
  DELETE_SERVICE: { icon: Trash, color: 'text-red-400', bg: 'bg-red-500/10' },
  CREATE_PORTFOLIO: { icon: PlusCircle, color: 'text-cyan-400', bg: 'bg-cyan-500/10' },
  UPDATE_PORTFOLIO: { icon: FileEdit, color: 'text-blue-400', bg: 'bg-blue-500/10' },
  DELETE_PORTFOLIO: { icon: Trash, color: 'text-red-400', bg: 'bg-red-500/10' },
  SETTINGS_UPDATED: { icon: Settings, color: 'text-purple-400', bg: 'bg-purple-500/10' },
  EXPORT_CSV: { icon: Download, color: 'text-teal-400', bg: 'bg-teal-500/10' },
  RESET_DEFAULTS: { icon: AlertTriangle, color: 'text-red-400', bg: 'bg-red-500/10' },
};

export default function AdminAuditLogs({ auditLogs = [], onRefresh, showToast }) {
  const [searchTerm, setSearchTerm] = useState('');
  const [filterType, setFilterType] = useState('all');

  const filteredLogs = auditLogs.filter(log => {
    const matchesSearch = 
      (log.action || '').toLowerCase().includes(searchTerm.toLowerCase()) ||
      (log.details || '').toLowerCase().includes(searchTerm.toLowerCase());
    
    if (filterType === 'all') return matchesSearch;
    if (filterType === 'auth') return matchesSearch && log.action.startsWith('AUTH');
    if (filterType === 'crud') return matchesSearch && (log.action.includes('CREATE') || log.action.includes('UPDATE') || log.action.includes('DELETE'));
    if (filterType === 'settings') return matchesSearch && log.action.includes('SETTINGS');
    return matchesSearch;
  });

  const handleClearLogs = () => {
    if (window.confirm('Are you sure you want to clear all security audit logs?')) {
      adminStorage.clearAuditLogs();
      showToast?.('Audit log history cleared', 'info');
      onRefresh?.();
    }
  };

  return (
    <div className="space-y-6">
      {/* Top Controls */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-4 rounded-xl bg-[#030d17]/80 border border-cyan-900/30 backdrop-blur-md">
        <div className="flex flex-wrap items-center gap-3">
          <div className="relative min-w-[260px] flex-1 sm:flex-initial">
            <Search className="w-4 h-4 text-cyan-400/60 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Search audit trail..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full bg-[#02070e] border border-cyan-900/40 rounded-lg pl-10 pr-4 py-2 text-sm text-cyan-100 placeholder-cyan-700/60 focus:outline-none focus:border-cyan-500"
            />
          </div>

          <div className="flex items-center gap-1.5 p-1 bg-[#02070e] rounded-lg border border-cyan-900/40">
            {['all', 'auth', 'crud', 'settings'].map((f) => (
              <button
                key={f}
                onClick={() => setFilterType(f)}
                className={`px-3 py-1.5 rounded-md text-xs font-medium capitalize transition-all ${
                  filterType === f
                    ? 'bg-cyan-500 text-black font-semibold'
                    : 'text-cyan-300/70 hover:text-cyan-100'
                }`}
              >
                {f}
              </button>
            ))}
          </div>
        </div>

        <button
          onClick={handleClearLogs}
          className="flex items-center gap-2 px-3.5 py-2 rounded-lg bg-red-950/30 border border-red-900/40 text-red-400 text-xs font-medium hover:bg-red-900/50 hover:text-white transition-all"
        >
          <Trash2 className="w-3.5 h-3.5" />
          <span>Clear Logs</span>
        </button>
      </div>

      {/* Log list */}
      <div className="rounded-xl bg-[#030d17]/80 border border-cyan-900/30 backdrop-blur-md overflow-hidden shadow-xl">
        <div className="p-4 border-b border-cyan-900/40 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <ShieldCheck className="w-4 h-4 text-cyan-400" />
            <h3 className="text-sm font-bold text-white">Immutable Event Journal</h3>
          </div>
          <span className="text-xs text-cyan-500/70 font-mono">
            {filteredLogs.length} logged actions recorded
          </span>
        </div>

        <div className="divide-y divide-cyan-900/20 max-h-[650px] overflow-y-auto">
          {filteredLogs.length === 0 ? (
            <div className="p-12 text-center text-cyan-500/60 text-sm">
              <Clock className="w-8 h-8 mx-auto mb-2 text-cyan-600/40" />
              No audit logs matching this search filter.
            </div>
          ) : (
            filteredLogs.map((log) => {
              const meta = ACTION_ICONS[log.action] || { icon: ShieldCheck, color: 'text-cyan-400', bg: 'bg-cyan-500/10' };
              const Icon = meta.icon;
              return (
                <div key={log.id} className="p-4 hover:bg-cyan-950/20 transition-colors flex items-start gap-4">
                  <div className={`w-8 h-8 rounded-lg ${meta.bg} flex items-center justify-center shrink-0 border border-cyan-800/30 ${meta.color}`}>
                    <Icon className="w-4 h-4" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between gap-2">
                      <span className="text-xs font-mono font-bold text-white tracking-wide">
                        {log.action}
                      </span>
                      <span className="text-[11px] text-cyan-500/70 font-mono shrink-0">
                        {log.timestamp ? new Date(log.timestamp).toLocaleString() : 'Just now'}
                      </span>
                    </div>
                    <p className="text-xs text-cyan-300/80 mt-1 font-mono break-all">
                      {log.details}
                    </p>
                  </div>
                </div>
              );
            })
          )}
        </div>
      </div>
    </div>
  );
}
