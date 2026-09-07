import React, { useState } from 'react';
import { 
  Search, Filter, Download, Plus, Mail, Phone, Calendar, 
  Trash2, CheckCircle2, Clock, AlertCircle, Archive, ChevronRight,
  ExternalLink, MessageSquare, Tag, FileSpreadsheet, X, Eye, DollarSign
} from 'lucide-react';
import { adminStorage } from '../../utils/adminStorage';

const STATUS_CONFIG = {
  new: { label: 'New Lead', bg: 'bg-emerald-500/10', border: 'border-emerald-500/30', text: 'text-emerald-400', icon: AlertCircle },
  'in-progress': { label: 'In Review', bg: 'bg-cyan-500/10', border: 'border-cyan-500/30', text: 'text-cyan-400', icon: Clock },
  completed: { label: 'Converted', bg: 'bg-blue-500/10', border: 'border-blue-500/30', text: 'text-blue-400', icon: CheckCircle2 },
  archived: { label: 'Archived', bg: 'bg-slate-500/10', border: 'border-slate-500/30', text: 'text-slate-400', icon: Archive },
};

export default function AdminInquiries({ inquiries = [], onRefresh, showToast }) {
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [selectedLead, setSelectedLead] = useState(null);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [newLeadData, setNewLeadData] = useState({
    name: '',
    email: '',
    phone: '',
    company: '',
    service: 'AI Agents & Automation',
    budget: '$5,000 - $15,000',
    timeline: '1-2 Months',
    message: '',
    source: 'Admin Manual Entry'
  });

  const filteredInquiries = inquiries.filter(item => {
    const matchesSearch = 
      (item.name || '').toLowerCase().includes(searchTerm.toLowerCase()) ||
      (item.email || '').toLowerCase().includes(searchTerm.toLowerCase()) ||
      (item.company || '').toLowerCase().includes(searchTerm.toLowerCase()) ||
      (item.service || '').toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesStatus = statusFilter === 'all' || item.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const handleStatusChange = (id, newStatus) => {
    adminStorage.updateInquiry(id, { status: newStatus });
    if (selectedLead && selectedLead.id === id) {
      setSelectedLead(prev => ({ ...prev, status: newStatus }));
    }
    showToast?.(`Lead status updated to ${newStatus}`, 'success');
    onRefresh?.();
  };

  const handleDelete = (id, e) => {
    e?.stopPropagation();
    if (window.confirm('Are you sure you want to delete this lead record permanently?')) {
      adminStorage.deleteInquiry(id);
      if (selectedLead && selectedLead.id === id) setSelectedLead(null);
      showToast?.('Inquiry record deleted', 'info');
      onRefresh?.();
    }
  };

  const handleExportCSV = () => {
    adminStorage.exportInquiriesCSV();
    showToast?.('Inquiries exported to CSV successfully', 'success');
  };

  const handleCreateLead = (e) => {
    e.preventDefault();
    if (!newLeadData.name || !newLeadData.email) {
      showToast?.('Please fill in Name and Email', 'error');
      return;
    }
    adminStorage.addInquiry(newLeadData);
    setIsAddModalOpen(false);
    setNewLeadData({
      name: '',
      email: '',
      phone: '',
      company: '',
      service: 'AI Agents & Automation',
      budget: '$5,000 - $15,000',
      timeline: '1-2 Months',
      message: '',
      source: 'Admin Manual Entry'
    });
    showToast?.('New client lead created successfully', 'success');
    onRefresh?.();
  };

  return (
    <div className="space-y-6">
      {/* Controls Bar */}
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 p-4 rounded-xl bg-[#030d17]/80 border border-cyan-900/30 backdrop-blur-md">
        <div className="flex flex-wrap items-center gap-3">
          {/* Search Box */}
          <div className="relative min-w-[260px] flex-1 sm:flex-initial">
            <Search className="w-4 h-4 text-cyan-400/60 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Search leads, emails, companies..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full bg-[#02070e] border border-cyan-900/40 rounded-lg pl-10 pr-4 py-2 text-sm text-cyan-100 placeholder-cyan-700/60 focus:outline-none focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500/40"
            />
          </div>

          {/* Status Filter */}
          <div className="flex items-center gap-1.5 p-1 bg-[#02070e] rounded-lg border border-cyan-900/40">
            {['all', 'new', 'in-progress', 'completed', 'archived'].map((status) => (
              <button
                key={status}
                onClick={() => setStatusFilter(status)}
                className={`px-3 py-1.5 rounded-md text-xs font-medium capitalize transition-all ${
                  statusFilter === status
                    ? 'bg-cyan-500 text-black font-semibold shadow-sm'
                    : 'text-cyan-300/70 hover:text-cyan-100 hover:bg-cyan-950/40'
                }`}
              >
                {status}
              </button>
            ))}
          </div>
        </div>

        {/* Actions */}
        <div className="flex items-center gap-3">
          <button
            onClick={handleExportCSV}
            className="flex items-center gap-2 px-3.5 py-2 rounded-lg bg-cyan-950/40 border border-cyan-800/40 text-cyan-300 text-xs font-medium hover:bg-cyan-900/40 hover:text-white transition-all shadow-sm"
          >
            <Download className="w-3.5 h-3.5 text-cyan-400" />
            <span>Export CSV</span>
          </button>
          <button
            onClick={() => setIsAddModalOpen(true)}
            className="flex items-center gap-2 px-4 py-2 rounded-lg bg-gradient-to-r from-cyan-500 to-blue-600 text-black font-semibold text-xs hover:from-cyan-400 hover:to-blue-500 transition-all shadow-md shadow-cyan-500/20"
          >
            <Plus className="w-4 h-4 stroke-[2.5]" />
            <span>Add Inbound Lead</span>
          </button>
        </div>
      </div>

      {/* Main Table View */}
      <div className="rounded-xl bg-[#030d17]/80 border border-cyan-900/30 backdrop-blur-md overflow-hidden shadow-xl">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm text-cyan-200">
            <thead className="bg-[#02070e] text-xs font-semibold text-cyan-400/80 uppercase tracking-wider border-b border-cyan-900/40">
              <tr>
                <th className="py-3.5 px-4">Client / Prospect</th>
                <th className="py-3.5 px-4">Requested Service</th>
                <th className="py-3.5 px-4">Budget / Timeline</th>
                <th className="py-3.5 px-4">Status</th>
                <th className="py-3.5 px-4">Date Received</th>
                <th className="py-3.5 px-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-cyan-900/20">
              {filteredInquiries.length === 0 ? (
                <tr>
                  <td colSpan="6" className="py-12 text-center text-cyan-500/60">
                    <MessageSquare className="w-8 h-8 mx-auto mb-2 text-cyan-600/40" />
                    No inquiries or leads found matching the selected filter.
                  </td>
                </tr>
              ) : (
                filteredInquiries.map((lead) => {
                  const statusInfo = STATUS_CONFIG[lead.status] || STATUS_CONFIG.new;
                  const StatusIcon = statusInfo.icon;
                  return (
                    <tr
                      key={lead.id}
                      onClick={() => setSelectedLead(lead)}
                      className="hover:bg-cyan-950/20 cursor-pointer transition-colors group"
                    >
                      {/* Client info */}
                      <td className="py-4 px-4">
                        <div className="flex items-center gap-3">
                          <div className="w-9 h-9 rounded-lg bg-cyan-900/30 border border-cyan-700/40 flex items-center justify-center font-bold text-cyan-300 text-sm shrink-0">
                            {lead.name ? lead.name.charAt(0).toUpperCase() : 'U'}
                          </div>
                          <div className="min-w-0">
                            <div className="font-semibold text-white group-hover:text-cyan-300 transition-colors flex items-center gap-2">
                              {lead.name}
                              {lead.company && (
                                <span className="text-xs font-normal text-cyan-400/70 border border-cyan-800/40 bg-cyan-950/40 px-1.5 py-0.5 rounded">
                                  {lead.company}
                                </span>
                              )}
                            </div>
                            <div className="text-xs text-cyan-400/60 truncate font-mono">
                              {lead.email}
                            </div>
                          </div>
                        </div>
                      </td>

                      {/* Service */}
                      <td className="py-4 px-4">
                        <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-cyan-950/50 border border-cyan-800/40 text-cyan-200 text-xs">
                          <Tag className="w-3 h-3 text-cyan-400" />
                          {lead.service || 'General Inquiry'}
                        </span>
                      </td>

                      {/* Budget / Timeline */}
                      <td className="py-4 px-4">
                        <div className="text-xs text-cyan-300 font-medium">{lead.budget || 'Custom Scope'}</div>
                        <div className="text-[11px] text-cyan-500/70">{lead.timeline || 'Flexible'}</div>
                      </td>

                      {/* Status Dropdown */}
                      <td className="py-4 px-4" onClick={(e) => e.stopPropagation()}>
                        <select
                          value={lead.status}
                          onChange={(e) => handleStatusChange(lead.id, e.target.value)}
                          className={`text-xs px-2.5 py-1 rounded-md border font-medium cursor-pointer focus:outline-none bg-[#02090f] ${statusInfo.border} ${statusInfo.text}`}
                        >
                          <option value="new" className="bg-[#030d17] text-emerald-400">● New Lead</option>
                          <option value="in-progress" className="bg-[#030d17] text-cyan-400">● In Review</option>
                          <option value="completed" className="bg-[#030d17] text-blue-400">● Converted</option>
                          <option value="archived" className="bg-[#030d17] text-slate-400">● Archived</option>
                        </select>
                      </td>

                      {/* Date */}
                      <td className="py-4 px-4 text-xs text-cyan-400/70 font-mono">
                        {lead.date ? new Date(lead.date).toLocaleDateString(undefined, { month: 'short', day: 'numeric', year: 'numeric' }) : 'Recent'}
                      </td>

                      {/* Actions */}
                      <td className="py-4 px-4 text-right">
                        <div className="flex items-center justify-end gap-2" onClick={(e) => e.stopPropagation()}>
                          <a
                            href={`mailto:${lead.email}?subject=Brixel Labs - Consultation follow-up for ${encodeURIComponent(lead.name)}`}
                            className="p-1.5 rounded-lg bg-cyan-950/40 border border-cyan-800/40 text-cyan-400 hover:text-white hover:bg-cyan-900/60 transition-colors"
                            title="Send direct email"
                          >
                            <Mail className="w-3.5 h-3.5" />
                          </a>
                          <button
                            onClick={() => setSelectedLead(lead)}
                            className="p-1.5 rounded-lg bg-cyan-950/40 border border-cyan-800/40 text-cyan-300 hover:text-white hover:bg-cyan-900/60 transition-colors"
                            title="View lead details"
                          >
                            <Eye className="w-3.5 h-3.5" />
                          </button>
                          <button
                            onClick={(e) => handleDelete(lead.id, e)}
                            className="p-1.5 rounded-lg bg-red-950/30 border border-red-900/40 text-red-400 hover:text-red-200 hover:bg-red-900/50 transition-colors"
                            title="Delete lead"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  );
                })
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Lead Detail Modal */}
      {selectedLead && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-fadeIn">
          <div className="bg-[#030d17] border border-cyan-500/40 rounded-2xl w-full max-w-2xl p-6 relative shadow-2xl shadow-cyan-950/80 max-h-[90vh] overflow-y-auto">
            {/* Close button */}
            <button
              onClick={() => setSelectedLead(null)}
              className="absolute top-4 right-4 p-2 rounded-lg bg-cyan-950/40 border border-cyan-800/40 text-cyan-400 hover:text-white hover:bg-cyan-900/50"
            >
              <X className="w-4 h-4" />
            </button>

            {/* Header */}
            <div className="flex items-start gap-4 pb-4 border-b border-cyan-900/40">
              <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-cyan-500/20 to-blue-600/20 border border-cyan-500/40 flex items-center justify-center font-bold text-cyan-300 text-lg">
                {selectedLead.name ? selectedLead.name.charAt(0).toUpperCase() : 'L'}
              </div>
              <div className="flex-1">
                <div className="flex items-center gap-3">
                  <h3 className="text-xl font-bold text-white">{selectedLead.name}</h3>
                  <span className={`text-xs px-2.5 py-0.5 rounded-full border font-medium ${STATUS_CONFIG[selectedLead.status]?.bg} ${STATUS_CONFIG[selectedLead.status]?.border} ${STATUS_CONFIG[selectedLead.status]?.text}`}>
                    {STATUS_CONFIG[selectedLead.status]?.label || selectedLead.status}
                  </span>
                </div>
                <p className="text-xs text-cyan-400/70 mt-0.5 font-mono">{selectedLead.email} • {selectedLead.phone || 'No phone provided'}</p>
              </div>
            </div>

            {/* Body */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 py-4">
              <div className="p-3 rounded-lg bg-[#02070e] border border-cyan-900/30">
                <div className="text-xs text-cyan-500/80 uppercase font-semibold">Company / Organization</div>
                <div className="text-sm font-medium text-white mt-1">{selectedLead.company || 'Individual Prospect'}</div>
              </div>
              <div className="p-3 rounded-lg bg-[#02070e] border border-cyan-900/30">
                <div className="text-xs text-cyan-500/80 uppercase font-semibold">Service Requirement</div>
                <div className="text-sm font-medium text-cyan-300 mt-1">{selectedLead.service || 'General Inbound'}</div>
              </div>
              <div className="p-3 rounded-lg bg-[#02070e] border border-cyan-900/30">
                <div className="text-xs text-cyan-500/80 uppercase font-semibold">Budget Tier</div>
                <div className="text-sm font-medium text-emerald-400 mt-1">{selectedLead.budget || 'Custom Project'}</div>
              </div>
              <div className="p-3 rounded-lg bg-[#02070e] border border-cyan-900/30">
                <div className="text-xs text-cyan-500/80 uppercase font-semibold">Target Timeline</div>
                <div className="text-sm font-medium text-cyan-200 mt-1">{selectedLead.timeline || 'Flexible Schedule'}</div>
              </div>
            </div>

            {/* Project description / message */}
            <div className="p-4 rounded-xl bg-[#02070e] border border-cyan-900/30 mb-4">
              <div className="text-xs text-cyan-500/80 uppercase font-semibold mb-1.5">Project Scope / Client Message</div>
              <p className="text-sm text-cyan-100 whitespace-pre-wrap leading-relaxed">
                {selectedLead.message || 'No specific notes provided during submission.'}
              </p>
            </div>

            {/* Lead Status Manager & Quick Actions */}
            <div className="flex flex-wrap items-center justify-between gap-3 pt-4 border-t border-cyan-900/40">
              <div className="flex items-center gap-2">
                <span className="text-xs text-cyan-400 font-medium">Update Status:</span>
                {['new', 'in-progress', 'completed', 'archived'].map((st) => (
                  <button
                    key={st}
                    onClick={() => handleStatusChange(selectedLead.id, st)}
                    className={`px-2.5 py-1 rounded text-xs capitalize transition-all ${
                      selectedLead.status === st
                        ? 'bg-cyan-500 text-black font-semibold'
                        : 'bg-cyan-950/40 border border-cyan-900 text-cyan-300 hover:bg-cyan-900/50'
                    }`}
                  >
                    {st}
                  </button>
                ))}
              </div>

              <div className="flex items-center gap-2">
                <a
                  href={`mailto:${selectedLead.email}?subject=Brixel Labs Consultation - Next Steps`}
                  className="px-4 py-2 rounded-lg bg-gradient-to-r from-cyan-500 to-blue-600 text-black font-semibold text-xs flex items-center gap-1.5 shadow-md hover:from-cyan-400 hover:to-blue-500 transition-all"
                >
                  <Mail className="w-3.5 h-3.5" />
                  Reply via Email
                </a>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Manual Add Lead Modal */}
      {isAddModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-fadeIn">
          <div className="bg-[#030d17] border border-cyan-500/40 rounded-2xl w-full max-w-lg p-6 relative shadow-2xl">
            <button
              onClick={() => setIsAddModalOpen(false)}
              className="absolute top-4 right-4 p-2 rounded-lg bg-cyan-950/40 border border-cyan-800/40 text-cyan-400 hover:text-white"
            >
              <X className="w-4 h-4" />
            </button>

            <h3 className="text-lg font-bold text-white mb-4 flex items-center gap-2">
              <Plus className="w-5 h-5 text-cyan-400" />
              Add Inbound Client Lead
            </h3>

            <form onSubmit={handleCreateLead} className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="text-xs text-cyan-400 font-medium block mb-1">Prospect Name *</label>
                  <input
                    type="text"
                    required
                    value={newLeadData.name}
                    onChange={(e) => setNewLeadData({ ...newLeadData, name: e.target.value })}
                    placeholder="e.g. Alex Morgan"
                    className="w-full bg-[#02070e] border border-cyan-900/50 rounded-lg px-3 py-2 text-sm text-cyan-100 placeholder-cyan-800 focus:outline-none focus:border-cyan-500"
                  />
                </div>
                <div>
                  <label className="text-xs text-cyan-400 font-medium block mb-1">Company / Studio</label>
                  <input
                    type="text"
                    value={newLeadData.company}
                    onChange={(e) => setNewLeadData({ ...newLeadData, company: e.target.value })}
                    placeholder="e.g. Synthetix AI"
                    className="w-full bg-[#02070e] border border-cyan-900/50 rounded-lg px-3 py-2 text-sm text-cyan-100 placeholder-cyan-800 focus:outline-none focus:border-cyan-500"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="text-xs text-cyan-400 font-medium block mb-1">Email Address *</label>
                  <input
                    type="email"
                    required
                    value={newLeadData.email}
                    onChange={(e) => setNewLeadData({ ...newLeadData, email: e.target.value })}
                    placeholder="alex@example.com"
                    className="w-full bg-[#02070e] border border-cyan-900/50 rounded-lg px-3 py-2 text-sm text-cyan-100 placeholder-cyan-800 focus:outline-none focus:border-cyan-500"
                  />
                </div>
                <div>
                  <label className="text-xs text-cyan-400 font-medium block mb-1">Phone Number</label>
                  <input
                    type="text"
                    value={newLeadData.phone}
                    onChange={(e) => setNewLeadData({ ...newLeadData, phone: e.target.value })}
                    placeholder="+1 (555) 000-0000"
                    className="w-full bg-[#02070e] border border-cyan-900/50 rounded-lg px-3 py-2 text-sm text-cyan-100 placeholder-cyan-800 focus:outline-none focus:border-cyan-500"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="text-xs text-cyan-400 font-medium block mb-1">Service Interest</label>
                  <select
                    value={newLeadData.service}
                    onChange={(e) => setNewLeadData({ ...newLeadData, service: e.target.value })}
                    className="w-full bg-[#02070e] border border-cyan-900/50 rounded-lg px-3 py-2 text-sm text-cyan-100 focus:outline-none focus:border-cyan-500"
                  >
                    <option value="AI Agents & Automation">AI Agents & Automation</option>
                    <option value="Chatbot & RAG Systems">Chatbot & RAG Systems</option>
                    <option value="Data Analytics & Dashboards">Data Analytics & Dashboards</option>
                    <option value="NLP & Text Engineering">NLP & Text Engineering</option>
                    <option value="Full-Stack Web Development">Full-Stack Web Development</option>
                    <option value="Cloud Architecture & DevOps">Cloud Architecture & DevOps</option>
                  </select>
                </div>
                <div>
                  <label className="text-xs text-cyan-400 font-medium block mb-1">Estimated Budget</label>
                  <input
                    type="text"
                    value={newLeadData.budget}
                    onChange={(e) => setNewLeadData({ ...newLeadData, budget: e.target.value })}
                    placeholder="$5,000 - $15,000"
                    className="w-full bg-[#02070e] border border-cyan-900/50 rounded-lg px-3 py-2 text-sm text-cyan-100 placeholder-cyan-800 focus:outline-none focus:border-cyan-500"
                  />
                </div>
              </div>

              <div>
                <label className="text-xs text-cyan-400 font-medium block mb-1">Requirement Notes / Scope</label>
                <textarea
                  rows="3"
                  value={newLeadData.message}
                  onChange={(e) => setNewLeadData({ ...newLeadData, message: e.target.value })}
                  placeholder="Details of client requirements..."
                  className="w-full bg-[#02070e] border border-cyan-900/50 rounded-lg px-3 py-2 text-sm text-cyan-100 placeholder-cyan-800 focus:outline-none focus:border-cyan-500"
                />
              </div>

              <div className="flex items-center justify-end gap-3 pt-2">
                <button
                  type="button"
                  onClick={() => setIsAddModalOpen(false)}
                  className="px-4 py-2 rounded-lg bg-cyan-950/40 text-cyan-400 text-xs hover:bg-cyan-900/50"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 rounded-lg bg-gradient-to-r from-cyan-500 to-blue-600 text-black font-semibold text-xs hover:from-cyan-400 hover:to-blue-500 transition-all shadow-md"
                >
                  Create Lead
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
