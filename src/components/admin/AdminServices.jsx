import React, { useState } from 'react';
import { 
  Search, Plus, Edit2, Trash2, Layers, Bot, MessageSquareCode, 
  BarChart3, Code2, Globe, Cpu, X, Eye, EyeOff
} from 'lucide-react';
import { adminStorage } from '../../utils/adminStorage';

const ICON_OPTIONS = [
  { name: 'Bot', icon: Bot, label: 'Bot / AI' },
  { name: 'MessageSquareCode', icon: MessageSquareCode, label: 'Chatbot' },
  { name: 'BarChart3', icon: BarChart3, label: 'Analytics' },
  { name: 'Code2', icon: Code2, label: 'Development' },
  { name: 'Globe', icon: Globe, label: 'Web / Shopify' },
  { name: 'Cpu', icon: Cpu, label: 'Cloud' },
  { name: 'Layers', icon: Layers, label: 'Architecture' }
];

export default function AdminServices({ services = [], onRefresh, showToast }) {
  const [searchTerm, setSearchTerm] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('all');
  const [editingService, setEditingService] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const [formData, setFormData] = useState({
    id: '',
    title: '',
    category: 'AI & Automation',
    description: '',
    iconName: 'Bot',
    active: true,
    tagsInput: ''
  });

  const categories = ['all', ...Array.from(new Set(services.map(s => s.category).filter(Boolean)))];

  const filteredServices = services.filter(service => {
    const matchesSearch = 
      (service.title || '').toLowerCase().includes(searchTerm.toLowerCase()) ||
      (service.description || '').toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = categoryFilter === 'all' || service.category === categoryFilter;
    return matchesSearch && matchesCategory;
  });

  const handleOpenAdd = () => {
    setEditingService(null);
    setFormData({
      id: '',
      title: '',
      category: 'AI & Automation',
      description: '',
      iconName: 'Bot',
      active: true,
      tagsInput: 'Python, Automation'
    });
    setIsModalOpen(true);
  };

  const handleOpenEdit = (service) => {
    setEditingService(service);
    setFormData({
      id: service.id,
      title: service.title || '',
      category: service.category || 'AI & Automation',
      description: service.description || '',
      iconName: service.iconName || 'Bot',
      active: service.active !== false,
      tagsInput: Array.isArray(service.tags) ? service.tags.join(', ') : (service.tags || '')
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
      category: formData.category,
      description: formData.description,
      iconName: formData.iconName,
      active: formData.active,
      tags: tagsArray
    };

    if (editingService) {
      adminStorage.updateService(editingService.id, payload);
      showToast?.('Service updated', 'success');
    } else {
      adminStorage.addService(payload);
      showToast?.('Service added', 'success');
    }

    setIsModalOpen(false);
    onRefresh?.();
  };

  const handleDelete = (id, title) => {
    if (window.confirm(`Delete "${title}"?`)) {
      adminStorage.deleteService(id);
      showToast?.(`"${title}" deleted`, 'info');
      onRefresh?.();
    }
  };

  const handleToggleActive = (service) => {
    const nextState = !service.active;
    adminStorage.updateService(service.id, { active: nextState });
    showToast?.(`Service ${nextState ? 'shown' : 'hidden'}`, 'info');
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
              placeholder="Search services..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full bg-white/[0.03] border border-white/[0.08] rounded-lg pl-8 pr-3 py-1.5 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-cyan-400/50"
            />
          </div>

          <div className="flex items-center gap-1">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setCategoryFilter(cat)}
                className={`px-2.5 py-1 rounded-md text-xs font-medium capitalize transition-colors cursor-pointer ${
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
          <span>New Service</span>
        </button>
      </div>

      {/* Grid Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
        {filteredServices.map((service) => {
          const IconComponent = ICON_OPTIONS.find(i => i.name === service.iconName)?.icon || Layers;
          const isLive = service.active !== false;

          return (
            <div
              key={service.id}
              className={`p-4 rounded-xl border transition-colors flex flex-col justify-between ${
                isLive 
                  ? 'bg-white/[0.02] border-white/[0.06] hover:border-white/10' 
                  : 'bg-white/[0.01] border-white/[0.03] opacity-50'
              }`}
            >
              <div>
                <div className="flex items-start justify-between gap-2 mb-2">
                  <div className="w-8 h-8 rounded-lg bg-white/[0.04] border border-white/10 flex items-center justify-center text-white">
                    <IconComponent className="w-4 h-4 text-white" />
                  </div>
                  
                  <button
                    onClick={() => handleToggleActive(service)}
                    className={`text-[11px] px-2 py-0.5 rounded font-medium border flex items-center gap-1 cursor-pointer transition-colors ${
                      isLive
                        ? 'bg-emerald-500/10 border-emerald-500/20 text-emerald-300'
                        : 'bg-white/[0.04] border-white/10 text-slate-500'
                    }`}
                  >
                    {isLive ? <Eye className="w-3 h-3 text-white" /> : <EyeOff className="w-3 h-3 text-white" />}
                    <span>{isLive ? 'Live' : 'Hidden'}</span>
                  </button>
                </div>

                <h4 className="text-sm font-semibold text-white">
                  {service.title}
                </h4>
                <div className="text-[11px] text-slate-500 font-mono mb-2">
                  {service.category}
                </div>

                <p className="text-xs text-slate-400 line-clamp-3 leading-relaxed mb-3">
                  {service.description}
                </p>

                {Array.isArray(service.tags) && service.tags.length > 0 && (
                  <div className="flex flex-wrap gap-1 mb-3">
                    {service.tags.map((tag, i) => (
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
                  onClick={() => handleOpenEdit(service)}
                  className="p-1.5 rounded text-white hover:bg-white/[0.08] transition-colors"
                  title="Edit"
                >
                  <Edit2 className="w-3.5 h-3.5 text-white" />
                </button>
                <button
                  onClick={() => handleDelete(service.id, service.title)}
                  className="p-1.5 rounded text-white hover:text-rose-400 hover:bg-rose-500/10 transition-colors"
                  title="Delete"
                >
                  <Trash2 className="w-3.5 h-3.5 text-white hover:text-rose-400" />
                </button>
              </div>
            </div>
          );
        })}
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
              {editingService ? 'Edit Service' : 'New Service'}
            </h3>

            <form onSubmit={handleSave} className="space-y-3 text-xs">
              <div>
                <label className="text-slate-400 block mb-1">Title *</label>
                <input
                  type="text"
                  required
                  value={formData.title}
                  onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                  placeholder="Service title"
                  className="w-full bg-white/[0.03] border border-white/10 rounded-lg px-3 py-2 text-white placeholder-slate-600 focus:outline-none focus:border-cyan-400/50"
                />
              </div>

              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="text-slate-400 block mb-1">Category</label>
                  <input
                    type="text"
                    value={formData.category}
                    onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                    placeholder="AI, Web, Data"
                    className="w-full bg-white/[0.03] border border-white/10 rounded-lg px-3 py-2 text-white placeholder-slate-600 focus:outline-none focus:border-cyan-400/50"
                  />
                </div>
                <div>
                  <label className="text-slate-400 block mb-1">Icon</label>
                  <select
                    value={formData.iconName}
                    onChange={(e) => setFormData({ ...formData, iconName: e.target.value })}
                    className="w-full bg-white/[0.03] border border-white/10 rounded-lg px-3 py-2 text-white focus:outline-none focus:border-cyan-400/50"
                  >
                    {ICON_OPTIONS.map((opt) => (
                      <option key={opt.name} value={opt.name} className="bg-[#030e1a] text-white">{opt.label}</option>
                    ))}
                  </select>
                </div>
              </div>

              <div>
                <label className="text-slate-400 block mb-1">Description *</label>
                <textarea
                  rows="3"
                  required
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  placeholder="Short explanation..."
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
                  id="activeCheck"
                  checked={formData.active}
                  onChange={(e) => setFormData({ ...formData, active: e.target.checked })}
                  className="w-3.5 h-3.5 rounded bg-white/[0.03] border-white/20 accent-cyan-400 cursor-pointer"
                />
                <label htmlFor="activeCheck" className="text-slate-300 cursor-pointer">
                  Show on website
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
