import React, { useState } from 'react';
import {
  Activity,
  Sparkles,
  FileText,
  Image as ImageIcon,
  Search,
  DollarSign,
  AlertTriangle,
  CheckCircle2,
  Filter,
  Tv,
  Download,
} from 'lucide-react';
import { useCreator } from '../../context/CreatorContext';

export const ActivityFeed: React.FC = () => {
  const { activities } = useCreator();
  const [filter, setFilter] = useState<string>('all');

  const filteredItems = activities.filter((item) => {
    if (filter === 'all') return true;
    return item.type === filter;
  });

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'thumbnail':
        return ImageIcon;
      case 'script':
        return FileText;
      case 'seo':
        return Search;
      case 'affiliate':
        return DollarSign;
      case 'scan':
        return Tv;
      case 'export':
        return Download;
      default:
        return Sparkles;
    }
  };

  return (
    <div className="glass-card rounded-2xl p-5 border border-white/10 space-y-4">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-white/10">
        <div>
          <div className="flex items-center gap-2">
            <Activity className="w-5 h-5 text-red-500 animate-pulse" />
            <h3 className="font-extrabold text-base text-white tracking-tight">
              Live Activity Timeline
            </h3>
            <span className="flex h-2 w-2 relative">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
            </span>
          </div>
          <p className="text-xs text-zinc-400 mt-0.5">
            Real-time activity log from Gemini 2.5 Pro sub-agents optimizing your channel workspace
          </p>
        </div>

        {/* Filter Tabs */}
        <div className="flex items-center gap-1.5 p-1 rounded-xl bg-zinc-900 border border-white/10 text-xs">
          <Filter className="w-3.5 h-3.5 text-zinc-500 ml-1.5" />
          {[
            { id: 'all', label: 'All' },
            { id: 'scan', label: 'Scans' },
            { id: 'script', label: 'Scripts' },
            { id: 'thumbnail', label: 'Thumbnails' },
            { id: 'seo', label: 'SEO' },
            { id: 'affiliate', label: 'Affiliate' },
          ].map((f) => (
            <button
              key={f.id}
              onClick={() => setFilter(f.id)}
              className={`px-2.5 py-1 rounded-lg font-bold text-[11px] transition cursor-pointer ${
                filter === f.id
                  ? 'bg-red-600 text-white shadow-md'
                  : 'text-zinc-400 hover:text-white'
              }`}
            >
              {f.label}
            </button>
          ))}
        </div>
      </div>

      {/* Activity Feed List */}
      <div className="space-y-3">
        {filteredItems.map((item) => {
          const Icon = getTypeIcon(item.type);
          const isAlert = item.status === 'alert';

          return (
            <div
              key={item.id}
              className={`p-3.5 rounded-xl border transition-all duration-200 flex items-start justify-between gap-4 ${
                isAlert
                  ? 'bg-amber-950/20 border-amber-500/30'
                  : 'bg-white/[0.02] border-white/5 hover:border-white/15'
              }`}
            >
              <div className="flex items-start gap-3">
                <div
                  className={`w-9 h-9 rounded-xl flex items-center justify-center shrink-0 ${
                    isAlert
                      ? 'bg-amber-500/20 text-amber-400 border border-amber-500/30'
                      : 'bg-red-500/10 text-red-500 border border-red-500/20'
                  }`}
                >
                  <Icon className="w-4 h-4" />
                </div>

                <div className="space-y-1">
                  <div className="flex items-center gap-2 flex-wrap">
                    <h4 className="font-bold text-xs text-white">{item.title}</h4>
                    <span className="text-[10px] font-mono font-bold bg-zinc-800 text-zinc-300 px-2 py-0.5 rounded border border-white/5">
                      {item.aiBadge}
                    </span>
                  </div>
                  <p className="text-xs text-zinc-300 leading-snug">{item.description}</p>
                </div>
              </div>

              <div className="flex flex-col items-end shrink-0 font-mono text-[10px]">
                <span className="text-zinc-500">{item.timestamp}</span>
                {isAlert ? (
                  <span className="text-amber-400 font-bold flex items-center gap-1 mt-1">
                    <AlertTriangle className="w-3 h-3" /> Priority Alert
                  </span>
                ) : (
                  <span className="text-emerald-400 font-bold flex items-center gap-1 mt-1">
                    <CheckCircle2 className="w-3 h-3" /> Live Synced
                  </span>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

