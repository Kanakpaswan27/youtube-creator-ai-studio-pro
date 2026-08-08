import React from 'react';
import {
  Tv,
  Search,
  FileText,
  Image as ImageIcon,
  DollarSign,
  Download,
  ArrowRight,
  CheckCircle2,
  Sparkles,
  Zap,
} from 'lucide-react';
import { SidebarTab } from '../../types/dashboard';
import { useCreator } from '../../context/CreatorContext';

interface MultiAgentPipelineNavProps {
  currentTab: SidebarTab;
  onNavigateTab: (tab: SidebarTab) => void;
}

const AGENT_STAGES = [
  {
    id: 'channel-ai' as SidebarTab,
    stepNum: 1,
    name: 'Channel Scanner',
    shortName: '1. Scanner',
    icon: Tv,
    badgeColor: 'text-amber-400 bg-amber-500/10 border-amber-500/30',
  },
  {
    id: 'seo-ai' as SidebarTab,
    stepNum: 2,
    name: 'SEO Generator',
    shortName: '2. SEO',
    icon: Search,
    badgeColor: 'text-blue-400 bg-blue-500/10 border-blue-500/30',
  },
  {
    id: 'script-ai' as SidebarTab,
    stepNum: 3,
    name: 'Description Studio',
    shortName: '3. Script/Desc',
    icon: FileText,
    badgeColor: 'text-emerald-400 bg-emerald-500/10 border-emerald-500/30',
  },
  {
    id: 'thumbnail-ai' as SidebarTab,
    stepNum: 4,
    name: 'Thumbnail Engine',
    shortName: '4. Thumbnail',
    icon: ImageIcon,
    badgeColor: 'text-rose-400 bg-rose-500/10 border-rose-500/30',
  },
  {
    id: 'affiliate-ai' as SidebarTab,
    stepNum: 5,
    name: 'Affiliate Generator',
    shortName: '5. Affiliate',
    icon: DollarSign,
    badgeColor: 'text-green-400 bg-green-500/10 border-green-500/30',
  },
  {
    id: 'video-export' as SidebarTab,
    stepNum: 6,
    name: 'Metadata Export',
    shortName: '6. Export',
    icon: Download,
    badgeColor: 'text-purple-400 bg-purple-500/10 border-purple-500/30',
  },
];

export const MultiAgentPipelineNav: React.FC<MultiAgentPipelineNavProps> = ({
  currentTab,
  onNavigateTab,
}) => {
  const { pipelineData, runPipeline, showToast } = useCreator();

  // Determine current stage index
  const currentIndex = AGENT_STAGES.findIndex((s) => s.id === currentTab);
  const nextStage = currentIndex >= 0 && currentIndex < AGENT_STAGES.length - 1 ? AGENT_STAGES[currentIndex + 1] : null;

  const handleNextAgent = () => {
    if (!nextStage) return;
    runPipeline(
      nextStage.name,
      `Handing off project "${pipelineData.topic}" to ${nextStage.name}...`,
      () => {
        onNavigateTab(nextStage.id);
        showToast(`✓ Data passed to ${nextStage.name}! Sync completed.`, 'success');
      }
    );
  };

  const handleRunFullSequence = () => {
    runPipeline(
      'Multi-Agent Autonomous Pipeline',
      'Orchestrating Channel Scanner → SEO → Description → Thumbnail → Affiliate → Metadata Export...',
      () => {
        onNavigateTab('video-export');
        showToast('✓ Full Multi-Agent pipeline execution completed & synced to Export Center!', 'success');
      }
    );
  };

  return (
    <div className="glass-card rounded-2xl p-4 border border-white/10 bg-gradient-to-r from-[#181818]/90 via-[#141414] to-[#0F0F0F] space-y-3">
      {/* Top Header Row */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-white/10">
        <div className="flex items-center gap-2.5">
          <div className="w-7 h-7 rounded-lg bg-gradient-to-br from-red-600 to-rose-600 flex items-center justify-center text-white shadow-md">
            <Sparkles className="w-4 h-4 animate-pulse" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h3 className="text-xs font-black text-white tracking-tight">
                Multi-Agent Workflow Pipeline
              </h3>
              <span className="text-[10px] font-mono font-bold text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded-full border border-emerald-500/20 flex items-center gap-1">
                <CheckCircle2 className="w-3 h-3" /> Auto Data Flow Synced
              </span>
            </div>
            <p className="text-[11px] text-zinc-400 font-mono">
              Active Project: <span className="text-white font-bold">{pipelineData.topic || pipelineData.projectName}</span>
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={handleRunFullSequence}
            className="px-3 py-1.5 rounded-xl bg-gradient-to-r from-red-600 to-rose-600 hover:from-red-500 hover:to-rose-500 text-white text-xs font-bold transition flex items-center gap-1.5 cursor-pointer shadow-md shadow-red-900/30 border border-red-400/30"
          >
            <Zap className="w-3.5 h-3.5 fill-white" />
            <span>Run All 6 Agents</span>
          </button>

          {nextStage && (
            <button
              onClick={handleNextAgent}
              className="px-3 py-1.5 rounded-xl bg-zinc-800 hover:bg-zinc-700 text-white text-xs font-bold transition flex items-center gap-1.5 cursor-pointer border border-white/10"
            >
              <span>Pass to {nextStage.shortName}</span>
              <ArrowRight className="w-3.5 h-3.5 text-red-500" />
            </button>
          )}
        </div>
      </div>

      {/* Workflow Pipeline Steps Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-2">
        {AGENT_STAGES.map((stage) => {
          const Icon = stage.icon;
          const isActive = stage.id === currentTab;

          return (
            <button
              key={stage.id}
              onClick={() => {
                runPipeline(
                  stage.name,
                  `Loading ${stage.name} with live project context...`,
                  () => onNavigateTab(stage.id)
                );
              }}
              className={`p-2.5 rounded-xl border text-left transition-all duration-200 cursor-pointer flex flex-col justify-between group ${
                isActive
                  ? 'bg-gradient-to-br from-red-950/80 via-zinc-900 to-zinc-900 border-red-500/50 text-white shadow-lg shadow-red-900/20'
                  : 'bg-zinc-900/50 border-white/5 text-zinc-400 hover:bg-zinc-900 hover:border-white/20 hover:text-white'
              }`}
            >
              <div className="flex items-center justify-between gap-1 mb-1.5">
                <span className="text-[10px] font-mono font-bold text-zinc-400 uppercase">
                  Step {stage.stepNum}
                </span>
                <span
                  className={`text-[9px] font-mono font-bold px-1.5 py-0.5 rounded border ${
                    isActive ? 'bg-red-500/20 text-red-300 border-red-500/30' : stage.badgeColor
                  }`}
                >
                  {isActive ? 'Active' : 'Synced ✓'}
                </span>
              </div>

              <div className="flex items-center gap-2">
                <div
                  className={`w-6 h-6 rounded-lg bg-zinc-800 flex items-center justify-center shrink-0 ${
                    isActive ? 'text-red-500' : 'text-zinc-400 group-hover:text-white'
                  }`}
                >
                  <Icon className="w-3.5 h-3.5" />
                </div>
                <span className="text-xs font-bold line-clamp-1">{stage.name}</span>
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
};
