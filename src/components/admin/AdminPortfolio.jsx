import React, { useState } from 'react';
import { 
  Search, Plus, Edit2, Trash2, Star, X
} from 'lucide-react';
import { adminStorage } from '../../utils/adminStorage';

export default function AdminPortfolio({ portfolio = [], onRefresh, showToast }) {
  const [searchTerm, setSearchTerm] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('all');
  const [editingItem, setEditingItem] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const [formData, setFormData] = useState({
    id: '',
    title: '',
    client: '',
    category: 'AI Assistant',
    description: '',
    metric: '',
    link: '#',
    featured: true,
    tagsInput: ''
  });

  const categories = ['all', ...Array.from(new Set(portfolio.map(p => p.category).filter(Boolean)))];

  const filteredPortfolio = portfolio.filter(item => {
    const matchesSearch = 
      (item.title || '').toLowerCase().includes(searchTerm.toLowerCase()) ||
      (item.client || '').toLowerCase().includes(searchTerm.toLowerCase()) ||
      (item.description || '').toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = categoryFilter === 'all' || item.category === categoryFilter;
    return matchesSearch && matchesCategory;
  });

  const handleOpenAdd = () => {
    setEditingItem(null);
    setFormData({
      id: '',
      title: '',
      client: '',
      category: 'AI Assistant',
      description: '',
      metric: 'Fast Results',
      link: '#',
      featured: true,
      tagsInput: 'Python, AI'
    });
    setIsModalOpen(true);
  };

  const handleOpenEdit = (item) => {
    setEditingItem(item);
    setFormData({
      id: item.id,
      title: item.title || '',
      client: item.client || '',
      category: item.category || 'AI Assistant',
      description: item.description || '',
      metric: item.metric || '',
      link: item.link || '#',
      featured: item.featured !== false,
      tagsInput: Array.isArray(item.tags) ? item.tags.join(', ') : (item.tags || '')
    });
    setIsModalOpen(true);
  };

  const handleSave = (e) => {
    e.preventDefault();
    if (!formData.title || !formData.description) {
      showToast?.('Title and description are required', 'error');
      return;
    }

    const tagsArray = formData.tagsInput.split(',').map(t => t.trim()).filter(Boolean);

    const payload = {
      title: formData.title,
      client: formData.client,
      category: formData.category,
      description: formData.description,
      metric: formData.metric,
      link: formData.link,
      featured: formData.featured,
      tags: tagsArray
    };

    if (editingItem) {
      adminStorage.updatePortfolio(editingItem.id, payload);
      showToast?.('Project updated', 'success');
    } else {
      adminStorage.addPortfolio(payload);
      showToast?.('Project added', 'success');
    }

    setIsModalOpen(false);
    onRefresh?.();
  };

  const handleDelete = (id, title) => {
    if (window.confirm(`Delete "${title}"?`)) {
      adminStorage.deletePortfolio(id);
      showToast?.(`"${title}" deleted`, 'info');
      onRefresh?.();
    }
  };

  const handleToggleFeatured = (item) => {
    const nextState = !item.featured;
    adminStorage.updatePortfolio(item.id, { featured: nextState });
    showToast?.(`Project ${nextState ? 'featured' : 'unfeatured'}`, 'info');
    onRefresh?.();
  };

  return (
    <div className="space-y-4 max-w-6xl mx-auto">
      {/* Top Filter & Search */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 p-3 rounded-xl bg-white/[0.02] border border-white/[0.06]">
        <div className="flex flex-wrap items-center gap-2">
          <div className="relative min-w-[200px]">
            <Search className="w-3.5 h-3.5 text-white absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Search projects..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full bg-white/[0.03] border border-white/[0.08] rounded-lg pl-8 pr-3 py-1.5 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-cyan-400/50"
            />
          </div>

          <div className="flex items-center gap-1 overflow-x-auto">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setCategoryFilter(cat)}
                className={`px-2.5 py-1 rounded-md text-xs font-medium capitalize transition-colors cursor-pointer whitespace-nowrap ${
                  categoryFilter === cat
                    ? 'bg-white/[0.08] text-white font-semibold'
                    : 'text-slate-400 hover:text-white'
                }`}
              >
                {cat === 'all' ? 'All' : cat}
              </button>
            ))}
          </div>
        </div>

        <button
          onClick={handleOpenAdd}
          className="btn-primary !px-3 !py-1.5 !text-xs !rounded-lg flex items-center gap-1 font-semibold"
        >
          <Plus className="w-3.5 h-3.5 stroke-[2.5] text-white" />
          <span>New Project</span>
        </button>
      </div>

      {/* Grid Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
        {filteredPortfolio.map((item) => (
          <div
            key={item.id}
            className="p-4 rounded-xl bg-white/[0.02] hover:bg-white/[0.04] border border-white/[0.06] hover:border-white/10 transition-colors flex flex-col justify-between"
          >
            <div>
              <div className="flex items-center justify-between gap-2 mb-2">
                <span className="text-[11px] text-slate-400 font-mono">
                  {item.category || 'Case Study'}
                </span>
                <button
                  onClick={() => handleToggleFeatured(item)}
                  className={`flex items-center gap-1 text-[11px] px-2 py-0.5 rounded cursor-pointer transition-colors ${
                    item.featured !== false
                      ? 'text-white bg-white/[0.1]'
                      : 'text-slate-400 hover:text-white'
                  }`}
                  title="Toggle featured status"
                >
                  <Star className={`w-3 h-3 text-white ${item.featured !== false ? 'fill-white' : ''}`} />
                  <span>{item.featured !== false ? 'Featured' : 'Normal'}</span>
                </button>
              </div>

              <h4 className="text-sm font-semibold text-white">
                {item.title}
              </h4>
              <div className="text-[11px] text-slate-500 mb-2">
                {item.client || 'Client project'}
              </div>

              {item.metric && (
                <div className="text-xs text-cyan-300 font-medium mb-2">
                  • {item.metric}
                </div>
              )}

              <p className="text-xs text-slate-400 line-clamp-3 leading-relaxed mb-3">
                {item.description}
              </p>

              {Array.isArray(item.tags) && item.tags.length > 0 && (
                <div className="flex flex-wrap gap-1 mb-3">
                  {item.tags.map((tag, i) => (
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

            <div className="flex items-center justify-end gap-1 pt-2 border-t border-white/[0.04]">
              <button
                onClick={() => handleOpenEdit(item)}
                className="p-1.5 rounded text-white hover:bg-white/[0.08] transition-colors"
                title="Edit"
              >
                <Edit2 className="w-3.5 h-3.5 text-white" />
              </button>
              <button
                onClick={() => handleDelete(item.id, item.title)}
                className="p-1.5 rounded text-white hover:text-rose-400 hover:bg-rose-500/10 transition-colors"
                title="Delete"
              >
                <Trash2 className="w-3.5 h-3.5 text-white hover:text-rose-400" />
              </button>
            </div>
          </div>
        ))}
      </div>

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
              {editingItem ? 'Edit Project' : 'New Project'}
            </h3>

            <form onSubmit={handleSave} className="space-y-3 text-xs">
              <div>
                <label className="text-slate-400 block mb-1">Project Title *</label>
                <input
                  type="text"
                  required
                  value={formData.title}
                  onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                  placeholder="Project name"
                  className="w-full bg-white/[0.03] border border-white/10 rounded-lg px-3 py-2 text-white placeholder-slate-600 focus:outline-none focus:border-cyan-400/50"
                />
              </div>

              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="text-slate-400 block mb-1">Client</label>
                  <input
                    type="text"
                    value={formData.client}
                    onChange={(e) => setFormData({ ...formData, client: e.target.value })}
                    placeholder="Client or industry"
                    className="w-full bg-white/[0.03] border border-white/10 rounded-lg px-3 py-2 text-white placeholder-slate-600 focus:outline-none focus:border-cyan-400/50"
                  />
                </div>
                <div>
                  <label className="text-slate-400 block mb-1">Category</label>
                  <input
                    type="text"
                    value={formData.category}
                    onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                    placeholder="AI, App, Web"
                    className="w-full bg-white/[0.03] border border-white/10 rounded-lg px-3 py-2 text-white placeholder-slate-600 focus:outline-none focus:border-cyan-400/50"
                  />
                </div>
              </div>

              <div>
                <label className="text-slate-400 block mb-1">Key Result / Highlight</label>
                <input
                  type="text"
                  value={formData.metric}
                  onChange={(e) => setFormData({ ...formData, metric: e.target.value })}
                  placeholder="e.g. 4x Faster or 99% Accuracy"
                  className="w-full bg-white/[0.03] border border-white/10 rounded-lg px-3 py-2 text-white placeholder-slate-600 focus:outline-none focus:border-cyan-400/50"
                />
              </div>

              <div>
                <label className="text-slate-400 block mb-1">Description *</label>
                <textarea
                  rows="3"
                  required
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  placeholder="What was built and how it helped..."
                  className="w-full bg-white/[0.03] border border-white/10 rounded-lg px-3 py-2 text-white placeholder-slate-600 focus:outline-none focus:border-cyan-400/50 resize-none"
                />
              </div>

              <div>
                <label className="text-slate-400 block mb-1">Tags (comma separated)</label>
                <input
                  type="text"
                  value={formData.tagsInput}
                  onChange={(e) => setFormData({ ...formData, tagsInput: e.target.value })}
                  placeholder="Python, React, API"
                  className="w-full bg-white/[0.03] border border-white/10 rounded-lg px-3 py-2 text-white placeholder-slate-600 focus:outline-none focus:border-cyan-400/50"
                />
              </div>

              <div className="flex items-center gap-2 pt-1">
                <input
                  type="checkbox"
                  id="featuredCheck"
                  checked={formData.featured}
                  onChange={(e) => setFormData({ ...formData, featured: e.target.checked })}
                  className="w-3.5 h-3.5 rounded bg-white/[0.03] border-white/20 accent-cyan-400 cursor-pointer"
                />
                <label htmlFor="featuredCheck" className="text-slate-300 cursor-pointer">
                  Feature on website homepage
                </label>
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
