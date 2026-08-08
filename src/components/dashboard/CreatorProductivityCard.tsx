import React from 'react';
import { useCreator } from '../../context/CreatorContext';
import {
  CheckCircle2,
  Clock,
  Sparkles,
  Zap,
  Award,
  Layers,
  BarChart3,
  ArrowUpRight,
  TrendingUp,
  Briefcase,
} from 'lucide-react';

export const CreatorProductivityCard: React.FC = () => {
  const { stats, activities } = useCreator();

  // Completion calculation for active project
  const projectTasks = [
    { name: 'Channel Competitor Scan', completed: true },
    { name: 'Viral Script & Chapters', completed: true },
    { name: '4K Thumbnail Render', completed: true },
    { name: '20 SEO Keywords & Tags', completed: true },
    { name: 'Affiliate UTM Links', completed: true },
    { name: 'Multi-Format Export Package', completed: true },
  ];

  const completedCount = projectTasks.filter((t) => t.completed).length;
  const projectCompletion = Math.round((completedCount / projectTasks.length) * 100);

  return (
    <div className="glass-card rounded-2xl p-6 border border-white/10 bg-gradient-to-br from-[#1A1A1A] via-[#141414] to-[#0E0E0E] relative overflow-hidden space-y-6">
      {/* Background Accent Gradient */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-red-600/10 rounded-full blur-3xl pointer-events-none"></div>

      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-white/10 relative z-10">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-red-600 via-rose-600 to-amber-500 flex items-center justify-center text-white shadow-lg shadow-red-900/40">
            <Award className="w-6 h-6" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h2 className="text-lg font-black text-white tracking-tight">
                Creator Productivity & Session Summary
              </h2>
              <span className="bg-emerald-500/10 text-emerald-400 text-xs font-bold px-2.5 py-0.5 rounded-full border border-emerald-500/20 font-mono flex items-center gap-1">
                <CheckCircle2 className="w-3 h-3" /> Production Ready
              </span>
            </div>
            <p className="text-xs text-zinc-400 mt-0.5">
              Live session metrics tracking AI automation efficiency and asset creation
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2 text-xs font-mono">
          <div className="bg-zinc-900/80 border border-white/10 px-3.5 py-2 rounded-xl flex items-center gap-2">
            <TrendingUp className="w-4 h-4 text-emerald-400" />
            <div>
              <p className="text-[10px] text-zinc-400 uppercase">Productivity Index</p>
              <p className="font-extrabold text-white">{stats.creatorProductivity}% (+34% AI Boost)</p>
            </div>
          </div>
        </div>
      </div>

      {/* 4 Core Summary Metrics */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 relative z-10">
        {/* Metric 1: Tasks Completed */}
        <div className="p-4 rounded-xl bg-white/[0.02] border border-white/5 space-y-1">
          <div className="flex items-center justify-between text-zinc-400">
            <span className="text-xs font-bold text-zinc-400">AI Tasks Completed</span>
            <CheckCircle2 className="w-4 h-4 text-emerald-400" />
          </div>
          <div className="text-2xl font-black text-white font-mono">{stats.aiTasksCompleted}</div>
          <p className="text-[10px] text-emerald-400 font-mono font-bold flex items-center gap-1">
            <ArrowUpRight className="w-3 h-3" /> +100% Verified Success
          </p>
        </div>

        {/* Metric 2: Estimated Time Saved */}
        <div className="p-4 rounded-xl bg-white/[0.02] border border-white/5 space-y-1">
          <div className="flex items-center justify-between text-zinc-400">
            <span className="text-xs font-bold text-zinc-400">Time Saved</span>
            <Clock className="w-4 h-4 text-amber-400" />
          </div>
          <div className="text-2xl font-black text-white font-mono">{stats.timeSavedHours} hrs</div>
          <p className="text-[10px] text-amber-400 font-mono font-bold flex items-center gap-1">
            <Zap className="w-3 h-3" /> Manual Work Automated
          </p>
        </div>

        {/* Metric 3: Generated Assets */}
        <div className="p-4 rounded-xl bg-white/[0.02] border border-white/5 space-y-1">
          <div className="flex items-center justify-between text-zinc-400">
            <span className="text-xs font-bold text-zinc-400">Generated Assets</span>
            <Layers className="w-4 h-4 text-rose-400" />
          </div>
          <div className="text-2xl font-black text-white font-mono">{stats.generatedAssets}</div>
          <p className="text-[10px] text-rose-400 font-mono font-bold flex items-center gap-1">
            <Sparkles className="w-3 h-3" /> Ready for Upload
          </p>
        </div>

        {/* Metric 4: Revenue Opportunities */}
        <div className="p-4 rounded-xl bg-white/[0.02] border border-white/5 space-y-1">
          <div className="flex items-center justify-between text-zinc-400">
            <span className="text-xs font-bold text-zinc-400">Revenue Opportunities</span>
            <BarChart3 className="w-4 h-4 text-blue-400" />
          </div>
          <div className="text-2xl font-black text-white font-mono">{stats.revenueOpportunities}</div>
          <p className="text-[10px] text-blue-400 font-mono font-bold flex items-center gap-1">
            <Briefcase className="w-3 h-3" /> Affiliate + AdSense
          </p>
        </div>
      </div>

      {/* Active Project Status & Progress Bar */}
      <div className="p-4 rounded-2xl bg-zinc-950/80 border border-white/10 space-y-3 relative z-10">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 text-xs">
          <div className="flex items-center gap-2">
            <span className="text-zinc-400 font-mono">Current Active Project:</span>
            <span className="font-extrabold text-white text-sm">
              "Building Full-Stack AI Apps in 2026"
            </span>
            <span className="bg-red-500/20 text-red-400 text-[10px] font-mono px-2 py-0.5 rounded border border-red-500/30">
              In Production
            </span>
          </div>

          <div className="font-mono text-emerald-400 font-bold text-xs flex items-center gap-1">
            <span>Project Completion: {projectCompletion}%</span>
          </div>
        </div>

        {/* Progress Bar */}
        <div className="w-full bg-zinc-900 h-2.5 rounded-full overflow-hidden border border-white/10">
          <div
            className="bg-gradient-to-r from-red-600 via-rose-500 to-emerald-400 h-full rounded-full transition-all duration-500 shadow-[0_0_10px_#10B981]"
            style={{ width: `${projectCompletion}%` }}
          ></div>
        </div>

        {/* Project Checklist Pills */}
        <div className="flex flex-wrap items-center gap-2 pt-1">
          {projectTasks.map((task, idx) => (
            <div
              key={idx}
              className="text-[10px] font-mono px-2.5 py-1 rounded-lg bg-zinc-900 border border-emerald-500/30 text-emerald-300 flex items-center gap-1.5"
            >
              <CheckCircle2 className="w-3 h-3 text-emerald-400" />
              <span>{task.name}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
