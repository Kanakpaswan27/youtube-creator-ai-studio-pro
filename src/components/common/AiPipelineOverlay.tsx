import React from 'react';
import { useCreator } from '../../context/CreatorContext';
import { Sparkles, Cpu, CheckCircle2, Zap, Layers, RefreshCw } from 'lucide-react';

const STEPS = [
  { id: 0, label: 'Scanning', desc: 'Channel & Topic Data' },
  { id: 1, label: 'Understanding', desc: 'Audience Psychographics' },
  { id: 2, label: 'Optimizing', desc: 'SEO & CTR Algorithms' },
  { id: 3, label: 'Generating', desc: 'High-Yield Creator Asset' },
  { id: 4, label: 'Validating', desc: 'Quality & Rule Check' },
  { id: 5, label: 'Completed', desc: 'Workspace Live Synced' },
];

export const AiPipelineOverlay: React.FC = () => {
  const { pipeline } = useCreator();

  if (!pipeline || !pipeline.active) return null;

  return (
    <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex items-center justify-center p-4 animate-in fade-in duration-200">
      <div className="glass-card max-w-2xl w-full rounded-3xl p-6 sm:p-8 border border-red-500/40 bg-[#121212]/95 shadow-[0_0_50px_rgba(255,0,0,0.25)] space-y-6 relative overflow-hidden">
        {/* Background Ambient Red Glow */}
        <div className="absolute -top-20 -right-20 w-64 h-64 bg-red-600/20 rounded-full blur-3xl pointer-events-none"></div>

        {/* Header */}
        <div className="flex items-center justify-between border-b border-white/10 pb-4">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-red-600 via-rose-600 to-amber-500 flex items-center justify-center text-white shadow-lg shadow-red-900/50">
              <Cpu className="w-6 h-6 animate-pulse" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="text-lg font-black text-white tracking-tight">
                  CreatorOS AI Processing Pipeline
                </h3>
                <span className="bg-red-500/10 text-red-400 text-xs font-mono font-bold px-2.5 py-0.5 rounded-full border border-red-500/30">
                  {pipeline.moduleName}
                </span>
              </div>
              <p className="text-xs text-zinc-400 mt-0.5 font-mono">
                Running autonomous optimization: <span className="text-white font-bold">{pipeline.actionTitle}</span>
              </p>
            </div>
          </div>

          <div className="text-right font-mono">
            <div className="text-2xl font-black text-amber-400">{pipeline.progressPercent}%</div>
            <div className="text-[10px] text-zinc-400 uppercase tracking-widest">Progress</div>
          </div>
        </div>

        {/* 6 Step Indicators */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-2">
          {STEPS.map((step) => {
            const isDone = pipeline.stepIndex > step.id;
            const isCurrent = pipeline.stepIndex === step.id;

            return (
              <div
                key={step.id}
                className={`p-3 rounded-2xl border text-center transition-all duration-300 flex flex-col items-center justify-between gap-1.5 ${
                  isDone
                    ? 'bg-emerald-950/20 border-emerald-500/40 text-emerald-400'
                    : isCurrent
                    ? 'bg-red-950/40 border-red-500 text-white shadow-[0_0_15px_rgba(255,0,0,0.3)] scale-105'
                    : 'bg-zinc-900/40 border-white/5 text-zinc-600'
                }`}
              >
                <div
                  className={`w-7 h-7 rounded-full flex items-center justify-center text-xs font-mono font-bold ${
                    isDone
                      ? 'bg-emerald-500 text-black'
                      : isCurrent
                      ? 'bg-red-600 text-white animate-pulse'
                      : 'bg-zinc-800 text-zinc-500'
                  }`}
                >
                  {isDone ? <CheckCircle2 className="w-4 h-4" /> : step.id + 1}
                </div>
                <div>
                  <p className="text-[11px] font-extrabold leading-tight">{step.label}</p>
                  <p className="text-[9px] font-mono text-zinc-400 mt-0.5">{step.desc}</p>
                </div>
              </div>
            );
          })}
        </div>

        {/* Active Progress Message Bar */}
        <div className="p-4 rounded-2xl bg-zinc-950 border border-white/10 space-y-2">
          <div className="flex items-center justify-between text-xs font-mono">
            <span className="text-red-400 font-bold flex items-center gap-2">
              <RefreshCw className="w-4 h-4 animate-spin text-amber-400" />
              {pipeline.stepMessage}
            </span>
            <span className="text-zinc-500 text-[10px]">Gemini 2.5 Pro Ultra</span>
          </div>

          <div className="w-full bg-zinc-900 h-2.5 rounded-full overflow-hidden border border-white/10">
            <div
              className="bg-gradient-to-r from-red-600 via-rose-500 to-amber-400 h-full rounded-full transition-all duration-150 shadow-[0_0_12px_#FF0000]"
              style={{ width: `${pipeline.progressPercent}%` }}
            ></div>
          </div>
        </div>

        <div className="flex items-center justify-between text-[11px] font-mono text-zinc-500">
          <span>Targeting +25% RPM & Top 5% CTR</span>
          <span className="flex items-center gap-1 text-emerald-400">
            <Zap className="w-3.5 h-3.5" /> High Precision Studio Output
          </span>
        </div>
      </div>
    </div>
  );
};
