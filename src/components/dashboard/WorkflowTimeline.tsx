import React from 'react';
import {
  Sparkles,
  FileText,
  Image as ImageIcon,
  Search,
  Video,
  CheckCircle2,
  Clock,
  Play,
  Layers,
  ArrowRight,
  Zap,
} from 'lucide-react';
import { WORKFLOW_STAGES } from '../../data/mockDashboardData';

export const WorkflowTimeline: React.FC = () => {
  const getIcon = (iconName: string) => {
    switch (iconName) {
      case 'Sparkles':
        return Sparkles;
      case 'FileText':
        return FileText;
      case 'Image':
        return ImageIcon;
      case 'Search':
        return Search;
      default:
        return Video;
    }
  };

  return (
    <div className="glass-card rounded-2xl p-5 border border-white/10 space-y-4">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-white/10">
        <div>
          <div className="flex items-center gap-2">
            <Layers className="w-5 h-5 text-red-500" />
            <h3 className="font-extrabold text-base text-white tracking-tight">
              AI Content Production Pipeline
            </h3>
            <span className="bg-red-500/10 text-red-400 text-xs font-bold px-2.5 py-0.5 rounded-full border border-red-500/20">
              Active Project: AI Autonomous Agents in 2026
            </span>
          </div>
          <p className="text-xs text-zinc-400 mt-0.5">
            Automated step-by-step pipeline running across Gemini 2.5 Pro Ultra sub-agents
          </p>
        </div>

        <div className="flex items-center gap-2">
          <button className="px-3.5 py-2 rounded-xl bg-gradient-to-r from-red-600 to-rose-600 hover:from-red-500 hover:to-rose-500 text-white font-bold text-xs shadow-lg shadow-red-900/30 flex items-center gap-1.5 transition cursor-pointer">
            <Zap className="w-3.5 h-3.5 fill-white" />
            <span>Batch Process Next Project</span>
          </button>
        </div>
      </div>

      {/* Pipeline Steps Grid */}
      <div className="grid grid-cols-1 md:grid-cols-5 gap-3 pt-2">
        {WORKFLOW_STAGES.map((stage, index) => {
          const Icon = getIcon(stage.iconName);
          const isCompleted = stage.status === 'completed';
          const isInProgress = stage.status === 'in_progress';

          return (
            <div
              key={stage.id}
              className={`p-4 rounded-xl border relative flex flex-col justify-between transition-all duration-300 ${
                isCompleted
                  ? 'bg-emerald-950/10 border-emerald-500/30 text-zinc-200'
                  : isInProgress
                  ? 'bg-red-950/20 border-red-500/50 text-white shadow-[0_0_20px_rgba(255,0,0,0.15)]'
                  : 'bg-zinc-900/40 border-white/5 text-zinc-400 opacity-80'
              }`}
            >
              {/* Connector arrow between stages */}
              {index < WORKFLOW_STAGES.length - 1 && (
                <div className="hidden md:block absolute -right-3 top-1/2 -translate-y-1/2 z-20">
                  <div className="w-6 h-6 rounded-full bg-[#181818] border border-white/20 flex items-center justify-center text-zinc-400">
                    <ArrowRight className="w-3 h-3" />
                  </div>
                </div>
              )}

              <div>
                <div className="flex items-center justify-between mb-3">
                  <div
                    className={`w-9 h-9 rounded-xl flex items-center justify-center ${
                      isCompleted
                        ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30'
                        : isInProgress
                        ? 'bg-red-600 text-white shadow-md red-glow-sm'
                        : 'bg-zinc-800 text-zinc-500'
                    }`}
                  >
                    <Icon className="w-4 h-4" />
                  </div>

                  {isCompleted ? (
                    <span className="flex items-center gap-1 text-[10px] font-bold text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded-full border border-emerald-500/20">
                      <CheckCircle2 className="w-3 h-3" /> Step {stage.id}
                    </span>
                  ) : isInProgress ? (
                    <span className="flex items-center gap-1 text-[10px] font-bold text-red-400 bg-red-500/20 px-2 py-0.5 rounded-full border border-red-500/40 animate-pulse">
                      <Clock className="w-3 h-3" /> Rendering
                    </span>
                  ) : (
                    <span className="text-[10px] font-bold text-zinc-500 bg-zinc-800 px-2 py-0.5 rounded-full">
                      Step {stage.id}
                    </span>
                  )}
                </div>

                <h4 className="font-bold text-xs text-white mb-1">{stage.title}</h4>
                <p className="text-[11px] text-zinc-400 leading-snug mb-3">
                  {stage.aiActionName}
                </p>
              </div>

              <div className="mt-2 pt-2 border-t border-white/5 space-y-1.5">
                <div className="flex items-center justify-between text-[10px] font-mono">
                  <span className="text-zinc-400">{stage.eta}</span>
                  <span className="font-bold text-white">{stage.progressPercent}%</span>
                </div>

                <div className="w-full bg-zinc-800 h-1.5 rounded-full overflow-hidden">
                  <div
                    className={`h-full rounded-full transition-all duration-500 ${
                      isCompleted
                        ? 'bg-emerald-500'
                        : isInProgress
                        ? 'bg-gradient-to-r from-red-600 to-amber-400 animate-pulse'
                        : 'bg-zinc-700'
                    }`}
                    style={{ width: `${stage.progressPercent}%` }}
                  ></div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
