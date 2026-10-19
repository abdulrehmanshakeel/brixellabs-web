import React, { useState } from 'react';
import { 
  Search, Plus, Edit2, Trash2, Users, Github, 
  Linkedin, Twitter, Globe, X
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
    tagsInput: 'React, Node, Python'
  });

  const filteredTeam = team.filter(member => {
    return (
      (member.name || '').toLowerCase().includes(searchTerm.toLowerCase()) ||
      (member.role || '').toLowerCase().includes(searchTerm.toLowerCase()) ||
      (member.specialty || '').toLowerCase().includes(searchTerm.toLowerCase())
    );
  });

  const handleOpenAdd = () => {
    setEditingMember(null);
    setFormData({
      id: '',
      name: '',
      role: 'Full-Stack Developer',
      specialty: 'Web & mobile applications',
      avatar: '',
      github: '',
      linkedin: '',
      twitter: '',
      tagsInput: 'React, Node, Cloud'
    });
    setIsModalOpen(true);
  };

  const handleOpenEdit = (member) => {
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
      showToast?.('Name and role are required', 'error');
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
      adminStorage.updateMember(editingMember.id, payload);
      showToast?.('Team member updated', 'success');
    } else {
      adminStorage.addMember(payload);
      showToast?.('Team member added', 'success');
    }

    setIsModalOpen(false);
    onRefresh?.();
  };

  const handleDelete = (id, name) => {
    if (window.confirm(`Delete "${name}"?`)) {
      adminStorage.deleteMember(id);
      showToast?.(`"${name}" removed`, 'info');
      onRefresh?.();
    }
  };

  return (
    <div className="space-y-4 max-w-6xl mx-auto">
      {/* Top Controls Toolbar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 p-3 rounded-xl bg-white/[0.02] border border-white/[0.06]">
        <div className="relative min-w-[220px]">
          <Search className="w-3.5 h-3.5 text-white absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="Search members..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full bg-white/[0.03] border border-white/[0.08] rounded-lg pl-8 pr-3 py-1.5 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-cyan-400/50"
          />
        </div>

        <button
          onClick={handleOpenAdd}
          className="btn-primary !px-3 !py-1.5 !text-xs !rounded-lg flex items-center gap-1.5 font-semibold"
        >
          <Plus className="w-3.5 h-3.5 stroke-[2.5] text-white" />
          <span>New Member</span>
        </button>
      </div>

      {/* Team Grid */}
      {filteredTeam.length === 0 ? (
        <div className="p-10 text-center rounded-xl bg-white/[0.02] border border-white/[0.06] text-slate-400">
          <Users className="w-8 h-8 mx-auto text-white mb-2" />
          <p className="text-sm font-semibold text-white">No team members found</p>
          <p className="text-xs text-slate-400 mt-1">Add your team members to display them on the website.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
          {filteredTeam.map((member) => (
            <div
              key={member.id}
              className="p-4 rounded-xl bg-white/[0.02] border border-white/[0.06] hover:border-white/10 transition-colors flex flex-col justify-between"
            >
              <div>
                <div className="flex items-start justify-between gap-3 mb-3">
                  <div className="w-9 h-9 rounded-lg bg-white/[0.04] border border-white/10 flex items-center justify-center font-bold text-white text-sm">
                    {member.name ? member.name.charAt(0).toUpperCase() : 'M'}
                  </div>
                  <span className="text-[11px] px-2 py-0.5 rounded font-mono bg-cyan-500/10 border border-cyan-500/20 text-cyan-300">
                    {member.role}
                  </span>
                </div>

                <h4 className="text-sm font-semibold text-white">
                  {member.name}
                </h4>
                <p className="text-xs text-slate-400 mt-1 mb-2 line-clamp-2 leading-relaxed">
                  {member.specialty}
                </p>

                {Array.isArray(member.tags) && member.tags.length > 0 && (
                  <div className="flex flex-wrap gap-1 mb-3">
                    {member.tags.map((tag, i) => (
                      <span
                        key={i}
                        className="text-[10px] px-1.5 py-0.5 rounded bg-white/[0.03] text-slate-400 font-mono"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                )}
              </div>

              {/* Actions & Links */}
              <div className="flex items-center justify-between pt-2 border-t border-white/[0.04]">
                <div className="flex items-center gap-1.5 text-white">
                  {member.github && (
                    <a href={member.github} target="_blank" rel="noopener noreferrer" className="hover:opacity-80 transition-opacity" title="GitHub">
                      <Github className="w-3.5 h-3.5 text-white" />
                    </a>
                  )}
                  {member.linkedin && (
                    <a href={member.linkedin} target="_blank" rel="noopener noreferrer" className="hover:opacity-80 transition-opacity" title="LinkedIn">
                      <Linkedin className="w-3.5 h-3.5 text-white" />
                    </a>
                  )}
                  {member.twitter && (
                    <a href={member.twitter} target="_blank" rel="noopener noreferrer" className="hover:opacity-80 transition-opacity" title="Twitter / X">
                      <Twitter className="w-3.5 h-3.5 text-white" />
                    </a>
                  )}
                </div>

                <div className="flex items-center gap-1">
                  <button
                    onClick={() => handleOpenEdit(member)}
                    className="p-1.5 rounded text-white hover:bg-white/[0.08] transition-colors"
                    title="Edit"
                  >
                    <Edit2 className="w-3.5 h-3.5 text-white" />
                  </button>
                  <button
                    onClick={() => handleDelete(member.id, member.name)}
                    className="p-1.5 rounded text-white hover:text-rose-400 hover:bg-rose-500/10 transition-colors"
                    title="Delete"
                  >
                    <Trash2 className="w-3.5 h-3.5 text-white hover:text-rose-400" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Add / Edit Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm">
          <div className="bg-[#030e1a] border border-white/10 rounded-xl w-full max-w-md p-6 relative shadow-2xl">
            <button
              onClick={() => setIsModalOpen(false)}
              className="absolute top-4 right-4 p-1.5 rounded text-white hover:bg-white/[0.04]"
            >
              <X className="w-4 h-4 text-white" />
            </button>

            <h3 className="text-base font-bold text-white mb-4">
              {editingMember ? 'Edit Member' : 'New Member'}
            </h3>

            <form onSubmit={handleSave} className="space-y-3 text-xs">
              <div>
                <label className="text-slate-400 block mb-1">Full Name *</label>
                <input
                  type="text"
                  required
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  placeholder="e.g. John Doe"
                  className="w-full bg-white/[0.03] border border-white/10 rounded-lg px-3 py-2 text-white placeholder-slate-600 focus:outline-none focus:border-cyan-400/50"
                />
              </div>

              <div>
                <label className="text-slate-400 block mb-1">Role *</label>
                <input
                  type="text"
                  required
                  value={formData.role}
                  onChange={(e) => setFormData({ ...formData, role: e.target.value })}
                  placeholder="e.g. Lead AI Engineer"
                  className="w-full bg-white/[0.03] border border-white/10 rounded-lg px-3 py-2 text-white placeholder-slate-600 focus:outline-none focus:border-cyan-400/50"
                />
              </div>

              <div>
                <label className="text-slate-400 block mb-1">Bio / Specialty</label>
                <textarea
                  rows="2"
                  value={formData.specialty}
                  onChange={(e) => setFormData({ ...formData, specialty: e.target.value })}
                  placeholder="Short summary of expertise..."
                  className="w-full bg-white/[0.03] border border-white/10 rounded-lg px-3 py-2 text-white placeholder-slate-600 focus:outline-none focus:border-cyan-400/50 resize-none"
                />
              </div>

              <div>
                <label className="text-slate-400 block mb-1">Skills & Tags (comma separated)</label>
                <input
                  type="text"
                  value={formData.tagsInput}
                  onChange={(e) => setFormData({ ...formData, tagsInput: e.target.value })}
                  placeholder="Python, React, PyTorch"
                  className="w-full bg-white/[0.03] border border-white/10 rounded-lg px-3 py-2 text-white placeholder-slate-600 focus:outline-none focus:border-cyan-400/50"
                />
              </div>

              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="text-slate-400 block mb-1">LinkedIn URL</label>
                  <input
                    type="url"
                    value={formData.linkedin}
                    onChange={(e) => setFormData({ ...formData, linkedin: e.target.value })}
                    placeholder="https://linkedin.com/in/..."
                    className="w-full bg-white/[0.03] border border-white/10 rounded-lg px-3 py-2 text-white placeholder-slate-600 focus:outline-none focus:border-cyan-400/50"
                  />
                </div>
                <div>
                  <label className="text-slate-400 block mb-1">GitHub URL</label>
                  <input
                    type="url"
                    value={formData.github}
                    onChange={(e) => setFormData({ ...formData, github: e.target.value })}
                    placeholder="https://github.com/..."
                    className="w-full bg-white/[0.03] border border-white/10 rounded-lg px-3 py-2 text-white placeholder-slate-600 focus:outline-none focus:border-cyan-400/50"
                  />
                </div>
              </div>

              <div className="flex items-center justify-end gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
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
    </div>
  );
}
