import React, { useState } from 'react';
import { 
  Search, Plus, Edit2, Trash2, Users, Github, 
  Linkedin, Twitter, Globe, Tag, X, Save, Shield
} from 'lucide-react';
import { adminStorage } from '../../utils/adminStorage';

export default function AdminTeam({ team = [], onRefresh, showToast }) {
  const [searchTerm, setSearchTerm] = useState('');
  const [editingMember, setEditingMember] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const [formData, setFormData] = useState({
    id: '',
    name: '',
    role: '',
    specialty: '',
    avatar: '',
    github: '',
    linkedin: '',
    twitter: '',
    tagsInput: 'Python, LLMs, Cloud'
  });

  const filteredTeam = team.filter(member => {
    return (
      (member.name || '').toLowerCase().includes(searchTerm.toLowerCase()) ||
      (member.role || '').toLowerCase().includes(searchTerm.toLowerCase()) ||
      (member.specialty || '').toLowerCase().includes(searchTerm.toLowerCase())
    );
  });

  const handleOpenAddModal = () => {
    setEditingMember(null);
    setFormData({
      id: '',
      name: '',
      role: 'Senior AI Engineer',
      specialty: 'Autonomous Agents & Distributed Systems',
      avatar: '',
      github: 'https://github.com',
      linkedin: 'https://linkedin.com',
      twitter: '',
      tagsInput: 'Python, RAG, PyTorch'
    });
    setIsModalOpen(true);
  };

  const handleOpenEditModal = (member) => {
    setEditingMember(member);
    setFormData({
      id: member.id,
      name: member.name || '',
      role: member.role || '',
      specialty: member.specialty || '',
      avatar: member.avatar || '',
      github: member.github || '',
      linkedin: member.linkedin || '',
      twitter: member.twitter || '',
      tagsInput: Array.isArray(member.tags) ? member.tags.join(', ') : (member.tags || '')
    });
    setIsModalOpen(true);
  };

  const handleSave = (e) => {
    e.preventDefault();
    if (!formData.name || !formData.role) {
      showToast?.('Please fill in Member Name and Role', 'error');
      return;
    }

    const tagsArray = formData.tagsInput
      .split(',')
      .map(t => t.trim())
      .filter(Boolean);

    const payload = {
      name: formData.name,
      role: formData.role,
      specialty: formData.specialty,
      avatar: formData.avatar,
      github: formData.github,
      linkedin: formData.linkedin,
      twitter: formData.twitter,
      tags: tagsArray
    };

    if (editingMember) {
      adminStorage.updateTeamMember(editingMember.id, payload);
      showToast?.('Team member updated', 'success');
    } else {
      adminStorage.addTeamMember(payload);
      showToast?.('New team member added', 'success');
    }

    setIsModalOpen(false);
    onRefresh?.();
  };

  const handleDelete = (id, name) => {
    if (window.confirm(`Remove "${name}" from team directory?`)) {
      adminStorage.deleteTeamMember(id);
      showToast?.(`Team member "${name}" removed`, 'info');
      onRefresh?.();
    }
  };

  return (
    <div className="space-y-6">
      {/* Top Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-4 rounded-xl bg-[#030d17]/80 border border-cyan-900/30 backdrop-blur-md">
        <div className="relative min-w-[260px] flex-1 sm:flex-initial">
          <Search className="w-4 h-4 text-cyan-400/60 absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="Search team members by name or role..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full bg-[#02070e] border border-cyan-900/40 rounded-lg pl-10 pr-4 py-2 text-sm text-cyan-100 placeholder-cyan-700/60 focus:outline-none focus:border-cyan-500"
          />
        </div>

        <button
          onClick={handleOpenAddModal}
          className="flex items-center gap-2 px-4 py-2 rounded-lg bg-gradient-to-r from-cyan-500 to-blue-600 text-black font-semibold text-xs hover:from-cyan-400 hover:to-blue-500 transition-all shadow-md shadow-cyan-500/20"
        >
          <Plus className="w-4 h-4 stroke-[2.5]" />
          <span>Add Team Member</span>
        </button>
      </div>

      {/* Team Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {filteredTeam.map((member) => (
          <div
            key={member.id}
            className="p-5 rounded-xl bg-[#030d17]/80 border border-cyan-900/40 hover:border-cyan-500/60 transition-all flex flex-col justify-between group hover:shadow-xl hover:shadow-cyan-950/40"
          >
            <div>
              {/* Member avatar & Role badge */}
              <div className="flex items-start justify-between gap-3 mb-4">
                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-cyan-500/20 to-blue-600/30 border border-cyan-500/40 flex items-center justify-center font-bold text-cyan-300 text-lg group-hover:scale-105 transition-transform">
                  {member.name ? member.name.charAt(0).toUpperCase() : 'M'}
                </div>
                <span className="text-[11px] px-2.5 py-0.5 rounded-full bg-cyan-950/80 border border-cyan-800/60 text-cyan-400 font-mono">
                  {member.role}
                </span>
              </div>

              {/* Name & Specialty */}
              <h4 className="text-base font-bold text-white group-hover:text-cyan-300 transition-colors">
                {member.name}
              </h4>
              <p className="text-xs text-cyan-300/80 mt-1 mb-3 leading-relaxed">
                {member.specialty}
              </p>

              {/* Tags */}
              {Array.isArray(member.tags) && member.tags.length > 0 && (
                <div className="flex flex-wrap gap-1.5 mb-4">
                  {member.tags.map((tag, i) => (
                    <span
                      key={i}
                      className="text-[11px] px-2 py-0.5 rounded bg-[#02070e] border border-cyan-900/60 text-cyan-300 font-mono"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              )}
            </div>

            {/* Footer with social links & Actions */}
            <div className="flex items-center justify-between pt-3 border-t border-cyan-900/30">
              <div className="flex items-center gap-2">
                {member.github && (
                  <a
                    href={member.github}
                    target="_blank"
                    rel="noreferrer"
                    className="p-1 rounded text-cyan-400/60 hover:text-cyan-300"
                    title="GitHub Profile"
                  >
                    <Github className="w-3.5 h-3.5" />
                  </a>
                )}
                {member.linkedin && (
                  <a
                    href={member.linkedin}
                    target="_blank"
                    rel="noreferrer"
                    className="p-1 rounded text-cyan-400/60 hover:text-cyan-300"
                    title="LinkedIn Profile"
                  >
                    <Linkedin className="w-3.5 h-3.5" />
                  </a>
                )}
              </div>

              <div className="flex items-center gap-2">
                <button
                  onClick={() => handleOpenEditModal(member)}
                  className="p-1.5 rounded-lg bg-cyan-950/50 border border-cyan-800/40 text-cyan-300 hover:text-white hover:bg-cyan-900/60 transition-colors"
                  title="Edit Member"
                >
                  <Edit2 className="w-3.5 h-3.5" />
                </button>
                <button
                  onClick={() => handleDelete(member.id, member.name)}
                  className="p-1.5 rounded-lg bg-red-950/30 border border-red-900/40 text-red-400 hover:text-red-200 hover:bg-red-900/50 transition-colors"
                  title="Delete Member"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Add / Edit Member Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-fadeIn">
          <div className="bg-[#030d17] border border-cyan-500/40 rounded-2xl w-full max-w-lg p-6 relative shadow-2xl max-h-[90vh] overflow-y-auto">
            <button
              onClick={() => setIsModalOpen(false)}
              className="absolute top-4 right-4 p-2 rounded-lg bg-cyan-950/40 border border-cyan-800/40 text-cyan-400 hover:text-white"
            >
              <X className="w-4 h-4" />
            </button>

            <h3 className="text-lg font-bold text-white mb-4 flex items-center gap-2">
              {editingMember ? <Edit2 className="w-5 h-5 text-cyan-400" /> : <Plus className="w-5 h-5 text-cyan-400" />}
              {editingMember ? 'Edit Team Member' : 'Add New Team Member'}
            </h3>

            <form onSubmit={handleSave} className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="text-xs text-cyan-400 font-medium block mb-1">Full Name *</label>
                  <input
                    type="text"
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    placeholder="e.g. Zaid Khan"
                    className="w-full bg-[#02070e] border border-cyan-900/50 rounded-lg px-3 py-2 text-sm text-cyan-100 placeholder-cyan-800 focus:outline-none focus:border-cyan-500"
                  />
                </div>
                <div>
                  <label className="text-xs text-cyan-400 font-medium block mb-1">Role / Title *</label>
                  <input
                    type="text"
                    required
                    value={formData.role}
                    onChange={(e) => setFormData({ ...formData, role: e.target.value })}
                    placeholder="e.g. Lead AI Engineer"
                    className="w-full bg-[#02070e] border border-cyan-900/50 rounded-lg px-3 py-2 text-sm text-cyan-100 placeholder-cyan-800 focus:outline-none focus:border-cyan-500"
                  />
                </div>
              </div>

              <div>
                <label className="text-xs text-cyan-400 font-medium block mb-1">Specialty & Background</label>
                <textarea
                  rows="2"
                  value={formData.specialty}
                  onChange={(e) => setFormData({ ...formData, specialty: e.target.value })}
                  placeholder="e.g. Multi-agent systems, RAG optimization, distributed inference..."
                  className="w-full bg-[#02070e] border border-cyan-900/50 rounded-lg px-3 py-2 text-sm text-cyan-100 placeholder-cyan-800 focus:outline-none focus:border-cyan-500"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="text-xs text-cyan-400 font-medium block mb-1">GitHub Profile URL</label>
                  <input
                    type="text"
                    value={formData.github}
                    onChange={(e) => setFormData({ ...formData, github: e.target.value })}
                    placeholder="https://github.com/..."
                    className="w-full bg-[#02070e] border border-cyan-900/50 rounded-lg px-3 py-2 text-sm text-cyan-100 placeholder-cyan-800 focus:outline-none focus:border-cyan-500"
                  />
                </div>
                <div>
                  <label className="text-xs text-cyan-400 font-medium block mb-1">LinkedIn Profile URL</label>
                  <input
                    type="text"
                    value={formData.linkedin}
                    onChange={(e) => setFormData({ ...formData, linkedin: e.target.value })}
                    placeholder="https://linkedin.com/in/..."
                    className="w-full bg-[#02070e] border border-cyan-900/50 rounded-lg px-3 py-2 text-sm text-cyan-100 placeholder-cyan-800 focus:outline-none focus:border-cyan-500"
                  />
                </div>
              </div>

              <div>
                <label className="text-xs text-cyan-400 font-medium block mb-1">Core Tech Skills (comma separated)</label>
                <input
                  type="text"
                  value={formData.tagsInput}
                  onChange={(e) => setFormData({ ...formData, tagsInput: e.target.value })}
                  placeholder="e.g. Python, SQL, NLP, PyTorch, FastMCP"
                  className="w-full bg-[#02070e] border border-cyan-900/50 rounded-lg px-3 py-2 text-sm text-cyan-100 placeholder-cyan-800 focus:outline-none focus:border-cyan-500 font-mono"
                />
              </div>

              <div className="flex items-center justify-end gap-3 pt-3 border-t border-cyan-900/40">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="px-4 py-2 rounded-lg bg-cyan-950/40 text-cyan-400 text-xs hover:bg-cyan-900/50"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 rounded-lg bg-gradient-to-r from-cyan-500 to-blue-600 text-black font-semibold text-xs hover:from-cyan-400 hover:to-blue-500 transition-all shadow-md flex items-center gap-1.5"
                >
                  <Save className="w-3.5 h-3.5" />
                  {editingMember ? 'Save Changes' : 'Add Member'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
