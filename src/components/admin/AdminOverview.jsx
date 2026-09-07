import React from 'react';
import { 
  Users, 
  DollarSign, 
  Layers, 
  Activity, 
  TrendingUp, 
  Clock, 
  CheckCircle2, 
  ArrowUpRight, 
  Cpu, 
  Server, 
  Zap, 
  ShieldCheck,
  Eye,
  Mail
} from 'lucide-react';
import { motion } from 'framer-motion';

export const AdminOverview = ({ 
  inquiries = [], 
  services = [], 
  portfolio = [], 
  onSelectLead,
  onNavigateTab 
}) => {
  // Compute analytics
  const totalLeads = inquiries.length;
  const newLeads = inquiries.filter(i => i.status === 'New').length;
  const closedLeads = inquiries.filter(i => i.status === 'Closed / Won').length;

  // Pipeline estimation based on budget strings
  const estimatePipeline = () => {
    let total = 0;
    inquiries.forEach(i => {
      if (i.budget === '$50k+') total += 65000;
      else if (i.budget === '$25k - $50k') total += 37500;
      else if (i.budget === '$10k - $25k') total += 17500;
      else total += 8000;
    });
    return total;
  };

  const pipelineValue = estimatePipeline();

  const metrics = [
    {
      title: 'Total Active Inquiries',
      value: totalLeads,
      change: `+${newLeads} new today`,
      icon: Users,
      gradient: 'from-cyan-400 to-teal-300',
      bgGrad: 'from-cyan-500/20 to-blue-600/10'
    },
    {
      title: 'Projected Deal Pipeline',
      value: `$${(pipelineValue / 1000).toFixed(1)}k`,
      change: `${closedLeads} contracts closed`,
      icon: DollarSign,
      gradient: 'from-emerald-300 to-teal-400',
      bgGrad: 'from-emerald-500/20 to-cyan-600/10'
    },
    {
      title: 'Active Tech Services',
      value: services.filter(s => s.active !== false).length,
      change: '8 core capabilities',
      icon: Layers,
      gradient: 'from-cyan-300 to-indigo-400',
      bgGrad: 'from-blue-500/20 to-indigo-600/10'
    },
    {
      title: 'Avg Inference Latency',
      value: '13.4ms',
      change: '99.99% Edge SLA',
      icon: Activity,
      gradient: 'from-indigo-300 to-cyan-300',
      bgGrad: 'from-indigo-500/20 to-teal-600/10'
    }
  ];

  return (
    <div className="space-y-6">
      
      {/* 4 Top KPI Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {metrics.map((item, idx) => {
          const IconComp = item.icon;
          return (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.08 }}
              className="gradient-card rounded-2xl p-5 border border-cyan-500/30 relative overflow-hidden shadow-lg"
            >
              <div className={`absolute -top-12 -right-12 w-28 h-28 rounded-full blur-2xl opacity-30 bg-gradient-to-br ${item.bgGrad} pointer-events-none`}></div>
              
              <div className="flex items-center justify-between mb-3">
                <span className="text-xs font-mono text-slate-400 font-semibold">{item.title}</span>
                <div className="w-8 h-8 rounded-xl bg-cyan-950/80 border border-cyan-500/40 flex items-center justify-center text-cyan-400">
                  <IconComp className="w-4 h-4" />
                </div>
              </div>

              <div className={`text-2xl sm:text-3xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r ${item.gradient} font-mono`}>
                {item.value}
              </div>

              <div className="text-[11px] text-slate-400 mt-2 flex items-center gap-1.5 font-medium">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400"></span>
                <span>{item.change}</span>
              </div>
            </motion.div>
          );
        })}
      </div>

      {/* Main Grid: Recent Inquiries + Live Telemetry */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        
        {/* Left Col (8 cols): Recent Inbound Leads */}
        <div className="lg:col-span-8 gradient-card rounded-3xl p-6 border border-cyan-500/30 shadow-xl space-y-4">
          <div className="flex items-center justify-between pb-3 border-b border-cyan-500/20">
            <div>
              <h2 className="text-lg font-bold text-white tracking-tight flex items-center gap-2">
                <Users className="w-5 h-5 text-cyan-400" />
                <span>Recent Inbound Client Inquiries</span>
              </h2>
              <p className="text-xs text-slate-400">Live submissions captured across website forms</p>
            </div>

            <button
              onClick={() => onNavigateTab('inquiries')}
              className="text-xs font-mono text-cyan-400 hover:text-cyan-300 font-bold flex items-center gap-1 transition-colors cursor-pointer"
            >
              <span>View All CRM ({totalLeads})</span>
              <ArrowUpRight className="w-3.5 h-3.5" />
            </button>
          </div>

          {/* Table / List */}
          <div className="space-y-2.5">
            {inquiries.slice(0, 5).map((inq) => (
              <div
                key={inq.id}
                onClick={() => onSelectLead(inq)}
                className="p-3.5 rounded-2xl bg-[#041525]/90 hover:bg-[#07243c] border border-cyan-500/25 hover:border-cyan-400/60 transition-all flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 cursor-pointer group shadow-sm"
              >
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <span className="text-sm font-bold text-white group-hover:text-cyan-300 transition-colors">
                      {inq.name}
                    </span>
                    <span className="text-xs text-slate-400 font-mono">
                      · {inq.company || 'Enterprise'}
                    </span>
                    {inq.status === 'New' && (
                      <span className="px-2 py-0.5 rounded-full bg-cyan-950 text-cyan-300 border border-cyan-400 text-[10px] font-mono font-bold animate-pulse">
                        NEW
                      </span>
                    )}
                  </div>
                  <div className="text-xs text-slate-400 flex items-center gap-3">
                    <span>{inq.service}</span>
                    <span className="text-cyan-400 font-mono font-semibold">{inq.budget}</span>
                  </div>
                </div>

                <div className="flex items-center gap-3 self-end sm:self-center">
                  <span className={`px-2.5 py-1 rounded-xl text-xs font-mono font-bold border ${
                    inq.status === 'Closed / Won'
                      ? 'bg-emerald-950/80 text-emerald-300 border-emerald-500/40'
                      : inq.status === 'In Review'
                      ? 'bg-amber-950/80 text-amber-300 border-amber-500/40'
                      : inq.status === 'Contacted'
                      ? 'bg-indigo-950/80 text-indigo-300 border-indigo-500/40'
                      : 'bg-cyan-950/80 text-cyan-300 border-cyan-500/40'
                  }`}>
                    {inq.status}
                  </span>
                  <span className="text-[11px] font-mono text-slate-500">
                    {new Date(inq.createdAt).toLocaleDateString()}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Right Col (4 cols): Server & Cluster Telemetry */}
        <div className="lg:col-span-4 space-y-6">
          
          {/* Cluster Telemetry Widget */}
          <div className="gradient-card rounded-3xl p-6 border border-cyan-500/30 shadow-xl space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-cyan-500/20">
              <h3 className="text-sm font-bold text-white font-mono uppercase flex items-center gap-2">
                <Cpu className="w-4 h-4 text-cyan-400" />
                <span>Node Cluster Telemetry</span>
              </h3>
              <span className="text-[10px] font-mono text-emerald-400 bg-emerald-950/80 px-2 py-0.5 rounded border border-emerald-500/40">ONLINE</span>
            </div>

            <div className="space-y-3 text-xs">
              <div>
                <div className="flex items-center justify-between text-slate-300 mb-1">
                  <span>Edge AI GPU Load (NVIDIA Jetson)</span>
                  <span className="font-mono text-cyan-300 font-bold">24.2%</span>
                </div>
                <div className="h-1.5 w-full bg-[#051829] rounded-full overflow-hidden">
                  <div className="h-full bg-gradient-to-r from-cyan-400 to-teal-300 w-[24.2%]"></div>
                </div>
              </div>

              <div>
                <div className="flex items-center justify-between text-slate-300 mb-1">
                  <span>Inference Engine Memory (TensorRT)</span>
                  <span className="font-mono text-teal-300 font-bold">4.8 GB / 32 GB</span>
                </div>
                <div className="h-1.5 w-full bg-[#051829] rounded-full overflow-hidden">
                  <div className="h-full bg-gradient-to-r from-teal-300 to-cyan-400 w-[15%]"></div>
                </div>
              </div>

              <div>
                <div className="flex items-center justify-between text-slate-300 mb-1">
                  <span>FastAPI Microservices Throughput</span>
                  <span className="font-mono text-indigo-300 font-bold">1,840 req/min</span>
                </div>
                <div className="h-1.5 w-full bg-[#051829] rounded-full overflow-hidden">
                  <div className="h-full bg-gradient-to-r from-indigo-400 to-cyan-400 w-[38%]"></div>
                </div>
              </div>

              <div>
                <div className="flex items-center justify-between text-slate-300 mb-1">
                  <span>PostgreSQL Pool Utilization</span>
                  <span className="font-mono text-cyan-300 font-bold">12 / 100 Connections</span>
                </div>
                <div className="h-1.5 w-full bg-[#051829] rounded-full overflow-hidden">
                  <div className="h-full bg-gradient-to-r from-cyan-400 to-blue-400 w-[12%]"></div>
                </div>
              </div>
            </div>

            <div className="pt-2 border-t border-cyan-500/15 flex items-center justify-between text-[11px] font-mono text-slate-400">
              <span>Cloud Region: global-us-east-1</span>
              <span className="text-emerald-400 font-bold">SLA: 99.99%</span>
            </div>
          </div>

          {/* Quick Action Card */}
          <div className="gradient-card rounded-3xl p-5 border border-cyan-500/30 shadow-xl text-center space-y-3">
            <h4 className="text-sm font-bold text-white">Need to update capabilities or tagline?</h4>
            <p className="text-xs text-slate-400">
              Manage the 8 live services or modify global branding parameters in real-time.
            </p>
            <div className="flex items-center justify-center gap-2 pt-1">
              <button
                onClick={() => onNavigateTab('services')}
                className="px-3 py-1.5 rounded-xl bg-[#082844] hover:bg-cyan-950 text-cyan-300 border border-cyan-500/40 text-xs font-semibold transition-all cursor-pointer"
              >
                Services
              </button>
              <button
                onClick={() => onNavigateTab('settings')}
                className="px-3 py-1.5 rounded-xl bg-[#082844] hover:bg-cyan-950 text-cyan-300 border border-cyan-500/40 text-xs font-semibold transition-all cursor-pointer"
              >
                Settings
              </button>
            </div>
          </div>

        </div>

      </div>

    </div>
  );
};

export default AdminOverview;
