import React, { useState } from 'react';
import { 
  Search, Download, Plus, Mail, Phone, 
  Trash2, Eye, X, Tag
} from 'lucide-react';
import { adminStorage } from '../../utils/adminStorage';
import { ConfirmationModal } from '../common/ConfirmationModal';

const STATUS_CONFIG = {
  new: { label: 'New', badge: 'bg-cyan-400/10 text-cyan-300 border-cyan-400/20' },
  'in-progress': { label: 'In Review', badge: 'bg-amber-400/10 text-amber-300 border-amber-400/20' },
  completed: { label: 'Done', badge: 'bg-emerald-500/10 text-emerald-300 border-emerald-500/20' },
  archived: { label: 'Archived', badge: 'bg-white/[0.04] text-slate-400 border-white/10' },
};

export default function AdminInquiries({ inquiries = [], onRefresh, showToast }) {
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [selectedLead, setSelectedLead] = useState(null);
  const [leadToDelete, setLeadToDelete] = useState(null);
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
    source: 'Manual'
  });

  const filteredInquiries = inquiries.filter(item => {
    const matchesSearch = 
      (item.name || '').toLowerCase().includes(searchTerm.toLowerCase()) ||
      (item.email || '').toLowerCase().includes(searchTerm.toLowerCase()) ||
      (item.company || '').toLowerCase().includes(searchTerm.toLowerCase()) ||
      (item.service || '').toLowerCase().includes(searchTerm.toLowerCase()) ||
      (item.phone || '').toLowerCase().includes(searchTerm.toLowerCase());
    
    const itemStatus = (item.status || 'new').toLowerCase();
    const matchesStatus = statusFilter === 'all' || itemStatus === statusFilter.toLowerCase();
    return matchesSearch && matchesStatus;
  });

  const handleStatusChange = (id, newStatus) => {
    adminStorage.updateInquiry(id, { status: newStatus });
    if (selectedLead && selectedLead.id === id) {
      setSelectedLead(prev => ({ ...prev, status: newStatus }));
    }
    showToast?.(`Status set to ${newStatus}`, 'success');
    onRefresh?.();
  };

  const handleDelete = (leadOrId, e) => {
    e?.stopPropagation();
    const targetLead = typeof leadOrId === 'object' ? leadOrId : inquiries.find(item => item.id === leadOrId) || { id: leadOrId, name: 'Lead' };
    setLeadToDelete(targetLead);
  };

  const handleConfirmDelete = () => {
    if (leadToDelete) {
      adminStorage.deleteInquiry(leadToDelete.id);
      if (selectedLead && selectedLead.id === leadToDelete.id) setSelectedLead(null);
      showToast?.('Message permanently deleted', 'info');
      setLeadToDelete(null);
      onRefresh?.();
    }
  };

  const handleExportCSV = () => {
    adminStorage.exportInquiriesCSV();
    showToast?.('Exported to CSV', 'success');
  };

  const handleCreateLead = (e) => {
    e.preventDefault();
    if (!newLeadData.name || !newLeadData.email) {
      showToast?.('Name and email are required', 'error');
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
      source: 'Manual'
    });
    showToast?.('Message added', 'success');
    onRefresh?.();
  };

  return (
    <div className="space-y-4 max-w-6xl mx-auto">
      {/* Top Filter & Search Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 p-3 rounded-xl bg-white/[0.02] border border-white/[0.06]">
        <div className="flex flex-wrap items-center gap-2">
          {/* Search Box */}
          <div className="relative min-w-[220px]">
            <Search className="w-3.5 h-3.5 text-white absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Search messages..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full bg-white/[0.03] border border-white/[0.08] rounded-lg pl-8 pr-3 py-1.5 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-cyan-400/50"
            />
          </div>

          {/* Status Tabs */}
          <div className="flex items-center gap-1">
            {[
              { id: 'all', label: 'All' },
              { id: 'new', label: 'New' },
              { id: 'in-progress', label: 'In Review' },
              { id: 'completed', label: 'Done' },
              { id: 'archived', label: 'Archived' }
            ].map((item) => (
              <button
                key={item.id}
                onClick={() => setStatusFilter(item.id)}
                className={`px-2.5 py-1 rounded-md text-xs font-medium transition-colors cursor-pointer ${
                  statusFilter === item.id
                    ? 'bg-white/[0.08] text-white font-semibold'
                    : 'text-slate-400 hover:text-white'
                }`}
              >
                {item.label}
              </button>
            ))}
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex items-center gap-2">
          <button
            onClick={handleExportCSV}
            className="px-2.5 py-1.5 rounded-lg text-slate-300 hover:text-white hover:bg-white/[0.04] text-xs font-medium flex items-center gap-1.5 transition-colors cursor-pointer"
            title="Download CSV"
          >
            <Download className="w-3.5 h-3.5 text-white" />
            <span>Export</span>
          </button>
          <button
            onClick={() => setIsAddModalOpen(true)}
            className="btn-primary !px-3 !py-1.5 !text-xs !rounded-lg flex items-center gap-1 font-semibold"
          >
            <Plus className="w-3.5 h-3.5 stroke-[2.5] text-white" />
            <span>New Message</span>
          </button>
        </div>
      </div>

      {/* Main Table View */}
      <div className="rounded-xl bg-white/[0.02] border border-white/[0.06] overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs text-slate-300">
            <thead className="bg-white/[0.02] text-[11px] font-medium text-slate-400 uppercase tracking-wider border-b border-white/[0.06]">
              <tr>
                <th className="py-3 px-4">Client</th>
                <th className="py-3 px-4">Service</th>
                <th className="py-3 px-4">Budget</th>
                <th className="py-3 px-4">Status</th>
                <th className="py-3 px-4">Date</th>
                <th className="py-3 px-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/[0.04]">
              {filteredInquiries.length === 0 ? (
                <tr>
                  <td colSpan="6" className="py-10 text-center text-slate-500">
                    No messages found.
                  </td>
                </tr>
              ) : (
                filteredInquiries.map((lead) => {
                  const statusInfo = STATUS_CONFIG[lead.status] || STATUS_CONFIG.new;
                  return (
                    <tr
                      key={lead.id}
                      onClick={() => setSelectedLead(lead)}
                      className="hover:bg-white/[0.02] cursor-pointer transition-colors"
                    >
                      {/* Customer */}
                      <td className="py-3 px-4">
                        <div className="font-medium text-white">
                          {lead.name}
                        </div>
                        <div className="text-[11px] text-slate-500 font-mono">
                          {lead.email}
                        </div>
                      </td>

                      {/* Service */}
                      <td className="py-3 px-4">
                        <span className="text-slate-300">
                          {lead.service || 'Consultation'}
                        </span>
                        {lead.company && (
                          <div className="text-[10px] text-slate-500">
                            {lead.company}
                          </div>
                        )}
                      </td>

                      {/* Budget */}
                      <td className="py-3 px-4 text-slate-400">
                        {lead.budget || 'Custom'}
                      </td>

                      {/* Status */}
                      <td className="py-3 px-4" onClick={(e) => e.stopPropagation()}>
                        <select
                          value={lead.status || 'new'}
                          onChange={(e) => handleStatusChange(lead.id, e.target.value)}
                          className={`text-[11px] px-2 py-0.5 rounded border font-medium cursor-pointer focus:outline-none bg-[#02070e] ${statusInfo.badge}`}
                        >
                          <option value="new" className="bg-[#02070e] text-cyan-300">New</option>
                          <option value="in-progress" className="bg-[#02070e] text-amber-300">In Review</option>
                          <option value="completed" className="bg-[#02070e] text-emerald-300">Done</option>
                          <option value="archived" className="bg-[#02070e] text-slate-400">Archived</option>
                        </select>
                      </td>

                      {/* Date */}
                      <td className="py-3 px-4 text-[11px] text-slate-500 font-mono">
                        {lead.createdAt || lead.date ? new Date(lead.createdAt || lead.date).toLocaleDateString(undefined, { month: 'short', day: 'numeric' }) : 'Recent'}
                      </td>

                      {/* Actions */}
                      <td className="py-3 px-4 text-right">
                        <div className="flex items-center justify-end gap-1.5" onClick={(e) => e.stopPropagation()}>
                          {lead.phone && (
                            <a
                              href={`https://wa.me/${lead.phone.replace(/[^0-9]/g, '')}?text=${encodeURIComponent(`Hi ${lead.name || 'there'}, thanks for contacting BrixelLabs!`)}`}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="p-1.5 rounded text-white hover:bg-white/[0.08] transition-colors"
                              title="Chat on WhatsApp"
                            >
                              <Phone className="w-3.5 h-3.5 text-white" />
                            </a>
                          )}
                          <a
                            href={`mailto:${lead.email}`}
                            className="p-1.5 rounded text-white hover:bg-white/[0.08] transition-colors"
                            title="Send email"
                          >
                            <Mail className="w-3.5 h-3.5 text-white" />
                          </a>
                          <button
                            onClick={() => setSelectedLead(lead)}
                            className="p-1.5 rounded text-white hover:bg-white/[0.08] transition-colors cursor-pointer"
                            title="View details"
                          >
                            <Eye className="w-3.5 h-3.5 text-white" />
                          </button>
                          <button
                            onClick={(e) => handleDelete(lead.id, e)}
                            className="p-1.5 rounded text-white hover:text-rose-400 hover:bg-rose-500/10 transition-colors cursor-pointer"
                            title="Delete"
                          >
                            <Trash2 className="w-3.5 h-3.5 text-white hover:text-rose-400" />
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

      {/* Minimal Customer Detail Modal */}
      {selectedLead && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm">
          <div className="bg-[#030e1a] border border-white/10 rounded-xl w-full max-w-lg p-6 relative shadow-2xl">
            <button
              onClick={() => setSelectedLead(null)}
              className="absolute top-4 right-4 p-1.5 rounded text-white hover:bg-white/[0.04]"
            >
              <X className="w-4 h-4 text-white" />
            </button>

            <div className="mb-4 pb-3 border-b border-white/[0.06]">
              <h3 className="text-base font-bold text-white">{selectedLead.name}</h3>
              <p className="text-xs text-slate-400 font-mono mt-0.5">{selectedLead.email} {selectedLead.phone ? `• ${selectedLead.phone}` : ''}</p>
            </div>

            <div className="grid grid-cols-2 gap-3 mb-4 text-xs">
              <div>
                <span className="text-slate-500 block">Company</span>
                <span className="text-white font-medium">{selectedLead.company || '—'}</span>
              </div>
              <div>
                <span className="text-slate-500 block">Service</span>
                <span className="text-cyan-300 font-medium">{selectedLead.service || '—'}</span>
              </div>
              <div>
                <span className="text-slate-500 block">Budget</span>
                <span className="text-white font-medium">{selectedLead.budget || '—'}</span>
              </div>
              <div>
                <span className="text-slate-500 block">Timeline</span>
                <span className="text-white font-medium">{selectedLead.timeline || 'Flexible'}</span>
              </div>
            </div>

            <div className="p-3 rounded-lg bg-white/[0.02] border border-white/[0.06] mb-4 text-xs">
              <span className="text-slate-500 block mb-1">Message</span>
              <p className="text-slate-200 whitespace-pre-wrap leading-relaxed">
                {selectedLead.projectBrief || selectedLead.message || 'No message provided.'}
              </p>
            </div>

            <div className="flex items-center justify-between pt-3 border-t border-white/[0.06]">
              <div className="flex items-center gap-1.5">
                {['new', 'in-progress', 'completed', 'archived'].map((st) => (
                  <button
                    key={st}
                    onClick={() => handleStatusChange(selectedLead.id, st)}
                    className={`px-2 py-0.5 rounded text-[11px] font-medium capitalize transition-colors ${
                      selectedLead.status === st
                        ? 'bg-cyan-400 text-slate-950 font-semibold'
                        : 'text-slate-400 hover:text-white hover:bg-white/[0.04]'
                    }`}
                  >
                    {STATUS_CONFIG[st]?.label || st}
                  </button>
                ))}
              </div>

              <div className="flex items-center gap-2">
                {selectedLead.phone && (
                  <a
                    href={`https://wa.me/${selectedLead.phone.replace(/[^0-9]/g, '')}?text=${encodeURIComponent(`Hi ${selectedLead.name || 'there'}, thanks for contacting BrixelLabs!`)}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-3 py-1.5 rounded-lg bg-emerald-500/15 hover:bg-emerald-500/25 text-emerald-300 text-xs font-medium flex items-center gap-1"
                  >
                    <Phone className="w-3.5 h-3.5 text-white" />
                    <span>WhatsApp</span>
                  </a>
                )}
                <a
                  href={`mailto:${selectedLead.email}`}
                  className="btn-primary !px-3 !py-1.5 !text-xs !rounded-lg flex items-center gap-1"
                >
                  <Mail className="w-3.5 h-3.5 text-white" />
                  <span>Email</span>
                </a>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Minimal Add Lead Modal */}
      {isAddModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm">
          <div className="bg-[#030e1a] border border-white/10 rounded-xl w-full max-w-md p-6 relative shadow-2xl">
            <button
              onClick={() => setIsAddModalOpen(false)}
              className="absolute top-4 right-4 p-1.5 rounded text-white hover:bg-white/[0.04]"
            >
              <X className="w-4 h-4 text-white" />
            </button>

            <h3 className="text-base font-bold text-white mb-4">
              New Message
            </h3>

            <form onSubmit={handleCreateLead} className="space-y-3 text-xs">
              <div>
                <label className="text-slate-400 block mb-1">Name *</label>
                <input
                  type="text"
                  required
                  value={newLeadData.name}
                  onChange={(e) => setNewLeadData({ ...newLeadData, name: e.target.value })}
                  placeholder="Client name"
                  className="w-full bg-white/[0.03] border border-white/10 rounded-lg px-3 py-2 text-white placeholder-slate-600 focus:outline-none focus:border-cyan-400/50"
                />
              </div>

              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="text-slate-400 block mb-1">Email *</label>
                  <input
                    type="email"
                    required
                    value={newLeadData.email}
                    onChange={(e) => setNewLeadData({ ...newLeadData, email: e.target.value })}
                    placeholder="email@example.com"
                    className="w-full bg-white/[0.03] border border-white/10 rounded-lg px-3 py-2 text-white placeholder-slate-600 focus:outline-none focus:border-cyan-400/50"
                  />
                </div>
                <div>
                  <label className="text-slate-400 block mb-1">Phone</label>
                  <input
                    type="text"
                    value={newLeadData.phone}
                    onChange={(e) => setNewLeadData({ ...newLeadData, phone: e.target.value })}
                    placeholder="+92 300..."
                    className="w-full bg-white/[0.03] border border-white/10 rounded-lg px-3 py-2 text-white placeholder-slate-600 focus:outline-none focus:border-cyan-400/50"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="text-slate-400 block mb-1">Company</label>
                  <input
                    type="text"
                    value={newLeadData.company}
                    onChange={(e) => setNewLeadData({ ...newLeadData, company: e.target.value })}
                    placeholder="Company name"
                    className="w-full bg-white/[0.03] border border-white/10 rounded-lg px-3 py-2 text-white placeholder-slate-600 focus:outline-none focus:border-cyan-400/50"
                  />
                </div>
                <div>
                  <label className="text-slate-400 block mb-1">Budget</label>
                  <input
                    type="text"
                    value={newLeadData.budget}
                    onChange={(e) => setNewLeadData({ ...newLeadData, budget: e.target.value })}
                    placeholder="$1,000"
                    className="w-full bg-white/[0.03] border border-white/10 rounded-lg px-3 py-2 text-white placeholder-slate-600 focus:outline-none focus:border-cyan-400/50"
                  />
                </div>
              </div>

              <div>
                <label className="text-slate-400 block mb-1">Message</label>
                <textarea
                  rows="3"
                  value={newLeadData.message}
                  onChange={(e) => setNewLeadData({ ...newLeadData, message: e.target.value })}
                  placeholder="Notes or requirements..."
                  className="w-full bg-white/[0.03] border border-white/10 rounded-lg px-3 py-2 text-white placeholder-slate-600 focus:outline-none focus:border-cyan-400/50 resize-none"
                />
              </div>

              <div className="flex items-center justify-end gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => setIsAddModalOpen(false)}
                  className="px-3 py-1.5 rounded-lg text-slate-400 hover:text-white"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="btn-primary !px-4 !py-1.5 !text-xs !rounded-lg"
                >
                  Save
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Confirmation Modal for Destructive Delete */}
      <ConfirmationModal
        isOpen={!!leadToDelete}
        onClose={() => setLeadToDelete(null)}
        onConfirm={handleConfirmDelete}
        title="Delete Inquiry / Lead"
        message={`Are you sure you want to permanently delete the inquiry from "${leadToDelete?.name || 'this client'}"? This action cannot be reversed.`}
        confirmText="Delete Inquiry"
        cancelText="Cancel"
        isDestructive={true}
      />
    </div>
  );
}
