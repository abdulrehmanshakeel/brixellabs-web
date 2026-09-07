import React, { useState } from 'react';
import { 
  Search, Plus, Edit2, Trash2, CheckCircle2, XCircle, 
  Layers, Bot, Database, MessageSquareCode, Cpu, ShieldCheck, 
  Terminal, BarChart3, Code2, Globe, Tag, X, Save, RefreshCw
} from 'lucide-react';
import { adminStorage } from '../../utils/adminStorage';

const ICON_OPTIONS = [
  { name: 'Bot', icon: Bot, label: 'Bot (AI Agents)' },
  { name: 'MessageSquareCode', icon: MessageSquareCode, label: 'MessageSquareCode (Chatbot / RAG)' },
  { name: 'BarChart3', icon: BarChart3, label: 'BarChart3 (Data Analytics)' },
  { name: 'Terminal', icon: Terminal, label: 'Terminal (NLP / Text)' },
  { name: 'Code2', icon: Code2, label: 'Code2 (Full-Stack Dev)' },
  { name: 'Cpu', icon: Cpu, label: 'Cpu (Cloud & DevOps)' },
  { name: 'ShieldCheck', icon: ShieldCheck, label: 'ShieldCheck (Cyber Security)' },
  { name: 'Globe', icon: Globe, label: 'Globe (Web Platform)' },
  { name: 'Layers', icon: Layers, label: 'Layers (Architecture)' }
];

export default function AdminServices({ services = [], onRefresh, showToast }) {
  const [searchTerm, setSearchTerm] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('all');
  const [editingService, setEditingService] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const [formData, setFormData] = useState({
    id: '',
    title: '',
    subtitle: '',
    category: 'AI & Machine Learning',
    description: '',
    iconName: 'Bot',
    badge: 'Production Ready',
    active: true,
    tagsInput: ''
  });

  const categories = ['all', ...Array.from(new Set(services.map(s => s.category).filter(Boolean)))];

  const filteredServices = services.filter(service => {
    const matchesSearch = 
      (service.title || '').toLowerCase().includes(searchTerm.toLowerCase()) ||
      (service.description || '').toLowerCase().includes(searchTerm.toLowerCase()) ||
      (service.subtitle || '').toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = categoryFilter === 'all' || service.category === categoryFilter;
    return matchesSearch && matchesCategory;
  });

  const handleOpenAddModal = () => {
    setEditingService(null);
    setFormData({
      id: '',
      title: '',
      subtitle: '',
      category: 'AI & Machine Learning',
      description: '',
      iconName: 'Bot',
      badge: 'Active Service',
      active: true,
      tagsInput: 'Python, LLMs, Automation'
    });
    setIsModalOpen(true);
  };

  const handleOpenEditModal = (service) => {
    setEditingService(service);
    setFormData({
      id: service.id,
      title: service.title || '',
      subtitle: service.subtitle || '',
      category: service.category || 'AI & Machine Learning',
      description: service.description || '',
      iconName: service.iconName || 'Bot',
      badge: service.badge || '',
      active: service.active !== false,
      tagsInput: Array.isArray(service.tags) ? service.tags.join(', ') : (service.tags || '')
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
      subtitle: formData.subtitle,
      category: formData.category,
      description: formData.description,
      iconName: formData.iconName,
      badge: formData.badge,
      active: formData.active,
      tags: tagsArray
    };

    if (editingService) {
      adminStorage.updateService(editingService.id, payload);
      showToast?.('Service updated successfully', 'success');
    } else {
      adminStorage.addService(payload);
      showToast?.('New service added to catalog', 'success');
    }

    setIsModalOpen(false);
    onRefresh?.();
  };

  const handleDelete = (id, title) => {
    if (window.confirm(`Are you sure you want to remove "${title}" from the catalog?`)) {
      adminStorage.deleteService(id);
      showToast?.(`Service "${title}" removed`, 'info');
      onRefresh?.();
    }
  };

  const handleToggleActive = (service) => {
    const nextState = !service.active;
    adminStorage.updateService(service.id, { active: nextState });
    showToast?.(`Service set to ${nextState ? 'Active' : 'Draft'}`, 'info');
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
              placeholder="Search services & descriptions..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full bg-[#02070e] border border-cyan-900/40 rounded-lg pl-10 pr-4 py-2 text-sm text-cyan-100 placeholder-cyan-700/60 focus:outline-none focus:border-cyan-500"
            />
          </div>

          {/* Category Filter */}
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

        {/* Action */}
        <button
          onClick={handleOpenAddModal}
          className="flex items-center gap-2 px-4 py-2 rounded-lg bg-gradient-to-r from-cyan-500 to-blue-600 text-black font-semibold text-xs hover:from-cyan-400 hover:to-blue-500 transition-all shadow-md shadow-cyan-500/20"
        >
          <Plus className="w-4 h-4 stroke-[2.5]" />
          <span>Add New Service</span>
        </button>
      </div>

      {/* Services Grid Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {filteredServices.map((service) => {
          const IconComponent = ICON_OPTIONS.find(i => i.name === service.iconName)?.icon || Layers;
          return (
            <div
              key={service.id}
              className={`p-5 rounded-xl border transition-all flex flex-col justify-between group ${
                service.active !== false 
                  ? 'bg-[#030d17]/80 border-cyan-900/40 hover:border-cyan-500/60 hover:shadow-lg hover:shadow-cyan-950/50' 
                  : 'bg-[#02070e]/60 border-slate-800/60 opacity-60'
              }`}
            >
              <div>
                {/* Header with Icon, Category badge and Active toggle */}
                <div className="flex items-start justify-between gap-3 mb-3">
                  <div className="w-10 h-10 rounded-lg bg-cyan-950/60 border border-cyan-700/50 flex items-center justify-center text-cyan-400 group-hover:scale-105 group-hover:border-cyan-400 transition-all">
                    <IconComponent className="w-5 h-5" />
                  </div>
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => handleToggleActive(service)}
                      className={`text-[11px] px-2 py-0.5 rounded font-medium border transition-colors ${
                        service.active !== false
                          ? 'bg-emerald-500/10 border-emerald-500/30 text-emerald-400'
                          : 'bg-slate-800 border-slate-700 text-slate-400'
                      }`}
                      title="Toggle active visibility"
                    >
                      {service.active !== false ? 'Active' : 'Draft'}
                    </button>
                    {service.badge && (
                      <span className="text-[11px] px-2 py-0.5 rounded font-medium bg-cyan-500/10 border border-cyan-500/30 text-cyan-400">
                        {service.badge}
                      </span>
                    )}
                  </div>
                </div>

                {/* Service Title */}
                <h4 className="text-base font-bold text-white group-hover:text-cyan-300 transition-colors">
                  {service.title}
                </h4>
                <div className="text-xs text-cyan-400/70 font-mono mb-2">{service.subtitle || service.category}</div>

                {/* Description */}
                <p className="text-xs text-cyan-200/80 line-clamp-3 leading-relaxed mb-4">
                  {service.description}
                </p>

                {/* Tech Tags */}
                {Array.isArray(service.tags) && service.tags.length > 0 && (
                  <div className="flex flex-wrap gap-1.5 mb-4">
                    {service.tags.map((tag, i) => (
                      <span
                        key={i}
                        className="text-[11px] px-2 py-0.5 rounded bg-cyan-950/50 border border-cyan-900/60 text-cyan-300 font-mono"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                )}
              </div>

              {/* Actions Footer */}
              <div className="flex items-center justify-between pt-3 border-t border-cyan-900/30">
                <span className="text-[11px] text-cyan-500/60 font-mono">ID: {service.id}</span>
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => handleOpenEditModal(service)}
                    className="p-1.5 rounded-lg bg-cyan-950/50 border border-cyan-800/40 text-cyan-300 hover:text-white hover:bg-cyan-900/60 transition-colors"
                    title="Edit Service"
                  >
                    <Edit2 className="w-3.5 h-3.5" />
                  </button>
                  <button
                    onClick={() => handleDelete(service.id, service.title)}
                    className="p-1.5 rounded-lg bg-red-950/30 border border-red-900/40 text-red-400 hover:text-red-200 hover:bg-red-900/50 transition-colors"
                    title="Delete Service"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Add / Edit Service Modal */}
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
              {editingService ? <Edit2 className="w-5 h-5 text-cyan-400" /> : <Plus className="w-5 h-5 text-cyan-400" />}
              {editingService ? 'Edit Service Offering' : 'Add New Service Offering'}
            </h3>

            <form onSubmit={handleSave} className="space-y-4">
              <div>
                <label className="text-xs text-cyan-400 font-medium block mb-1">Service Title *</label>
                <input
                  type="text"
                  required
                  value={formData.title}
                  onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                  placeholder="e.g. Chatbot Integration & RAG Systems"
                  className="w-full bg-[#02070e] border border-cyan-900/50 rounded-lg px-3 py-2 text-sm text-cyan-100 placeholder-cyan-800 focus:outline-none focus:border-cyan-500"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="text-xs text-cyan-400 font-medium block mb-1">Subtitle / Punchline</label>
                  <input
                    type="text"
                    value={formData.subtitle}
                    onChange={(e) => setFormData({ ...formData, subtitle: e.target.value })}
                    placeholder="e.g. Context-Aware AI Assistants"
                    className="w-full bg-[#02070e] border border-cyan-900/50 rounded-lg px-3 py-2 text-sm text-cyan-100 placeholder-cyan-800 focus:outline-none focus:border-cyan-500"
                  />
                </div>
                <div>
                  <label className="text-xs text-cyan-400 font-medium block mb-1">Category</label>
                  <input
                    type="text"
                    value={formData.category}
                    onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                    placeholder="e.g. AI & Machine Learning"
                    className="w-full bg-[#02070e] border border-cyan-900/50 rounded-lg px-3 py-2 text-sm text-cyan-100 placeholder-cyan-800 focus:outline-none focus:border-cyan-500"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="text-xs text-cyan-400 font-medium block mb-1">Vector Icon</label>
                  <select
                    value={formData.iconName}
                    onChange={(e) => setFormData({ ...formData, iconName: e.target.value })}
                    className="w-full bg-[#02070e] border border-cyan-900/50 rounded-lg px-3 py-2 text-sm text-cyan-100 focus:outline-none focus:border-cyan-500"
                  >
                    {ICON_OPTIONS.map((opt) => (
                      <option key={opt.name} value={opt.name}>{opt.label}</option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="text-xs text-cyan-400 font-medium block mb-1">Highlight Badge</label>
                  <input
                    type="text"
                    value={formData.badge}
                    onChange={(e) => setFormData({ ...formData, badge: e.target.value })}
                    placeholder="e.g. In Demand / Enterprise"
                    className="w-full bg-[#02070e] border border-cyan-900/50 rounded-lg px-3 py-2 text-sm text-cyan-100 placeholder-cyan-800 focus:outline-none focus:border-cyan-500"
                  />
                </div>
              </div>

              <div>
                <label className="text-xs text-cyan-400 font-medium block mb-1">Service Description *</label>
                <textarea
                  rows="3"
                  required
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  placeholder="Detailed explanation of what Brixel Labs delivers for this service..."
                  className="w-full bg-[#02070e] border border-cyan-900/50 rounded-lg px-3 py-2 text-sm text-cyan-100 placeholder-cyan-800 focus:outline-none focus:border-cyan-500"
                />
              </div>

              <div>
                <label className="text-xs text-cyan-400 font-medium block mb-1">Tech Stack Tags (comma separated)</label>
                <input
                  type="text"
                  value={formData.tagsInput}
                  onChange={(e) => setFormData({ ...formData, tagsInput: e.target.value })}
                  placeholder="e.g. Python, Pinecone, LangChain, RAG, OpenAI"
                  className="w-full bg-[#02070e] border border-cyan-900/50 rounded-lg px-3 py-2 text-sm text-cyan-100 placeholder-cyan-800 focus:outline-none focus:border-cyan-500 font-mono"
                />
              </div>

              <div className="flex items-center gap-2 pt-2">
                <input
                  type="checkbox"
                  id="activeCheck"
                  checked={formData.active}
                  onChange={(e) => setFormData({ ...formData, active: e.target.checked })}
                  className="w-4 h-4 rounded bg-[#02070e] border-cyan-700 text-cyan-500 focus:ring-0"
                />
                <label htmlFor="activeCheck" className="text-xs text-cyan-300 cursor-pointer">
                  Publish service actively on public website
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
                  {editingService ? 'Save Changes' : 'Create Service'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
