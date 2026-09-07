import React, { useState } from 'react';
import { 
  Search, Plus, Edit2, Trash2, ExternalLink, Briefcase, 
  TrendingUp, Tag, X, Save, Eye, Star
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
    category: 'AI Agents',
    description: '',
    metric: '99.9% Automation',
    link: '#',
    featured: true,
    tagsInput: 'Python, FastAPI, RAG'
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

  const handleOpenAddModal = () => {
    setEditingItem(null);
    setFormData({
      id: '',
      title: '',
      client: '',
      category: 'AI Agents',
      description: '',
      metric: '4x Performance Boost',
      link: '#',
      featured: true,
      tagsInput: 'Python, LLM, Cloud'
    });
    setIsModalOpen(true);
  };

  const handleOpenEditModal = (item) => {
    setEditingItem(item);
    setFormData({
      id: item.id,
      title: item.title || '',
      client: item.client || '',
      category: item.category || 'AI Agents',
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
      showToast?.('Please provide title and description', 'error');
      return;
    }

    const tagsArray = formData.tagsInput
      .split(',')
      .map(t => t.trim())
      .filter(Boolean);

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
      showToast?.('Case study updated successfully', 'success');
    } else {
      adminStorage.addPortfolio(payload);
      showToast?.('New project added to portfolio', 'success');
    }

    setIsModalOpen(false);
    onRefresh?.();
  };

  const handleDelete = (id, title) => {
    if (window.confirm(`Delete case study "${title}"?`)) {
      adminStorage.deletePortfolio(id);
      showToast?.(`Case study "${title}" deleted`, 'info');
      onRefresh?.();
    }
  };

  const handleToggleFeatured = (item) => {
    const nextState = !item.featured;
    adminStorage.updatePortfolio(item.id, { featured: nextState });
    showToast?.(`Project ${nextState ? 'featured on homepage' : 'unfeatured'}`, 'info');
    onRefresh?.();
  };

  return (
    <div className="space-y-6">
      {/* Controls Bar */}
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 p-4 rounded-xl bg-[#030d17]/80 border border-cyan-900/30 backdrop-blur-md">
        <div className="flex flex-wrap items-center gap-3">
          <div className="relative min-w-[260px] flex-1 sm:flex-initial">
            <Search className="w-4 h-4 text-cyan-400/60 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Search projects, clients, tech..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full bg-[#02070e] border border-cyan-900/40 rounded-lg pl-10 pr-4 py-2 text-sm text-cyan-100 placeholder-cyan-700/60 focus:outline-none focus:border-cyan-500"
            />
          </div>

          <div className="flex items-center gap-1.5 p-1 bg-[#02070e] rounded-lg border border-cyan-900/40">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setCategoryFilter(cat)}
                className={`px-3 py-1.5 rounded-md text-xs font-medium capitalize transition-all ${
                  categoryFilter === cat
                    ? 'bg-cyan-500 text-black font-semibold'
                    : 'text-cyan-300/70 hover:text-cyan-100'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        <button
          onClick={handleOpenAddModal}
          className="flex items-center gap-2 px-4 py-2 rounded-lg bg-gradient-to-r from-cyan-500 to-blue-600 text-black font-semibold text-xs hover:from-cyan-400 hover:to-blue-500 transition-all shadow-md shadow-cyan-500/20"
        >
          <Plus className="w-4 h-4 stroke-[2.5]" />
          <span>Add Case Study</span>
        </button>
      </div>

      {/* Portfolio Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {filteredPortfolio.map((item) => (
          <div
            key={item.id}
            className="p-5 rounded-xl bg-[#030d17]/80 border border-cyan-900/40 hover:border-cyan-500/60 transition-all flex flex-col justify-between group hover:shadow-xl hover:shadow-cyan-950/40"
          >
            <div>
              {/* Top metadata */}
              <div className="flex items-center justify-between gap-2 mb-3">
                <span className="text-xs px-2.5 py-0.5 rounded-full bg-cyan-950/80 border border-cyan-800/60 text-cyan-300 font-medium">
                  {item.category || 'Engineering'}
                </span>
                <button
                  onClick={() => handleToggleFeatured(item)}
                  className={`flex items-center gap-1 text-[11px] px-2 py-0.5 rounded transition-colors ${
                    item.featured !== false
                      ? 'bg-amber-500/10 border border-amber-500/30 text-amber-400'
                      : 'bg-slate-800/40 border border-slate-700/40 text-slate-400'
                  }`}
                  title="Toggle featured state"
                >
                  <Star className={`w-3 h-3 ${item.featured !== false ? 'fill-amber-400' : ''}`} />
                  {item.featured !== false ? 'Featured' : 'Standard'}
                </button>
              </div>

              {/* Title & Client */}
              <h4 className="text-base font-bold text-white group-hover:text-cyan-300 transition-colors">
                {item.title}
              </h4>
              <div className="text-xs text-cyan-400/80 font-mono mb-2">
                Client: {item.client || 'Enterprise Partner'}
              </div>

              {/* Highlight Metric */}
              {item.metric && (
                <div className="flex items-center gap-1.5 p-2 rounded-lg bg-cyan-950/40 border border-cyan-800/30 text-cyan-300 text-xs font-semibold mb-3">
                  <TrendingUp className="w-3.5 h-3.5 text-cyan-400" />
                  <span>{item.metric}</span>
                </div>
              )}

              {/* Description */}
              <p className="text-xs text-cyan-200/80 line-clamp-3 leading-relaxed mb-4">
                {item.description}
              </p>

              {/* Tags */}
              {Array.isArray(item.tags) && item.tags.length > 0 && (
                <div className="flex flex-wrap gap-1.5 mb-4">
                  {item.tags.map((tag, i) => (
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

            {/* Actions */}
            <div className="flex items-center justify-between pt-3 border-t border-cyan-900/30">
              <span className="text-[11px] text-cyan-500/60 font-mono">ID: {item.id}</span>
              <div className="flex items-center gap-2">
                <button
                  onClick={() => handleOpenEditModal(item)}
                  className="p-1.5 rounded-lg bg-cyan-950/50 border border-cyan-800/40 text-cyan-300 hover:text-white hover:bg-cyan-900/60 transition-colors"
                  title="Edit Case Study"
                >
                  <Edit2 className="w-3.5 h-3.5" />
                </button>
                <button
                  onClick={() => handleDelete(item.id, item.title)}
                  className="p-1.5 rounded-lg bg-red-950/30 border border-red-900/40 text-red-400 hover:text-red-200 hover:bg-red-900/50 transition-colors"
                  title="Delete Case Study"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Add/Edit Modal */}
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
              {editingItem ? <Edit2 className="w-5 h-5 text-cyan-400" /> : <Plus className="w-5 h-5 text-cyan-400" />}
              {editingItem ? 'Edit Case Study' : 'Add New Portfolio Project'}
            </h3>

            <form onSubmit={handleSave} className="space-y-4">
              <div>
                <label className="text-xs text-cyan-400 font-medium block mb-1">Project / Case Study Title *</label>
                <input
                  type="text"
                  required
                  value={formData.title}
                  onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                  placeholder="e.g. Autonomous Customer Support Swarm"
                  className="w-full bg-[#02070e] border border-cyan-900/50 rounded-lg px-3 py-2 text-sm text-cyan-100 placeholder-cyan-800 focus:outline-none focus:border-cyan-500"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="text-xs text-cyan-400 font-medium block mb-1">Client / Company Name</label>
                  <input
                    type="text"
                    value={formData.client}
                    onChange={(e) => setFormData({ ...formData, client: e.target.value })}
                    placeholder="e.g. FinScale Dynamics"
                    className="w-full bg-[#02070e] border border-cyan-900/50 rounded-lg px-3 py-2 text-sm text-cyan-100 placeholder-cyan-800 focus:outline-none focus:border-cyan-500"
                  />
                </div>
                <div>
                  <label className="text-xs text-cyan-400 font-medium block mb-1">Domain / Category</label>
                  <input
                    type="text"
                    value={formData.category}
                    onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                    placeholder="e.g. AI Agents, Full-Stack"
                    className="w-full bg-[#02070e] border border-cyan-900/50 rounded-lg px-3 py-2 text-sm text-cyan-100 placeholder-cyan-800 focus:outline-none focus:border-cyan-500"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="text-xs text-cyan-400 font-medium block mb-1">Key Impact Metric</label>
                  <input
                    type="text"
                    value={formData.metric}
                    onChange={(e) => setFormData({ ...formData, metric: e.target.value })}
                    placeholder="e.g. 70% Resolution in <10s"
                    className="w-full bg-[#02070e] border border-cyan-900/50 rounded-lg px-3 py-2 text-sm text-cyan-100 placeholder-cyan-800 focus:outline-none focus:border-cyan-500"
                  />
                </div>
                <div>
                  <label className="text-xs text-cyan-400 font-medium block mb-1">Live / Case URL</label>
                  <input
                    type="text"
                    value={formData.link}
                    onChange={(e) => setFormData({ ...formData, link: e.target.value })}
                    placeholder="https://..."
                    className="w-full bg-[#02070e] border border-cyan-900/50 rounded-lg px-3 py-2 text-sm text-cyan-100 placeholder-cyan-800 focus:outline-none focus:border-cyan-500"
                  />
                </div>
              </div>

              <div>
                <label className="text-xs text-cyan-400 font-medium block mb-1">Project Description *</label>
                <textarea
                  rows="3"
                  required
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  placeholder="Summary of challenges solved, engineering architecture, and ROI delivered..."
                  className="w-full bg-[#02070e] border border-cyan-900/50 rounded-lg px-3 py-2 text-sm text-cyan-100 placeholder-cyan-800 focus:outline-none focus:border-cyan-500"
                />
              </div>

              <div>
                <label className="text-xs text-cyan-400 font-medium block mb-1">Technologies Used (comma separated)</label>
                <input
                  type="text"
                  value={formData.tagsInput}
                  onChange={(e) => setFormData({ ...formData, tagsInput: e.target.value })}
                  placeholder="e.g. Python, LangChain, Pinecone, FastAPI, Next.js"
                  className="w-full bg-[#02070e] border border-cyan-900/50 rounded-lg px-3 py-2 text-sm text-cyan-100 placeholder-cyan-800 focus:outline-none focus:border-cyan-500 font-mono"
                />
              </div>

              <div className="flex items-center gap-2 pt-2">
                <input
                  type="checkbox"
                  id="featuredCheck"
                  checked={formData.featured}
                  onChange={(e) => setFormData({ ...formData, featured: e.target.checked })}
                  className="w-4 h-4 rounded bg-[#02070e] border-cyan-700 text-cyan-500 focus:ring-0"
                />
                <label htmlFor="featuredCheck" className="text-xs text-cyan-300 cursor-pointer">
                  Feature prominently on Work & Case Studies showcase
                </label>
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
                  {editingItem ? 'Save Changes' : 'Create Case Study'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
