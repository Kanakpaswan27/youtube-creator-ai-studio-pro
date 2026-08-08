import React from 'react';
import { Cpu, Zap, Activity, CheckCircle2, ShieldCheck, RefreshCw } from 'lucide-react';
import { AI_ENGINE_STATUS } from '../../data/mockDashboardData';

export const AiStatusCard: React.FC = () => {
  return (
    <div className="glass-card rounded-2xl p-5 border border-white/10 bg-gradient-to-br from-[#181818]/90 via-[#141414] to-[#0F0F0F] relative overflow-hidden group">
      {/* Background Ambient Red Glow */}
      <div className="absolute top-0 right-0 w-80 h-80 bg-red-600/10 rounded-full blur-3xl pointer-events-none group-hover:bg-red-600/15 transition-all duration-500"></div>

      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 pb-4 border-b border-white/10 relative z-10">
        <div className="flex items-center gap-3.5">
          <div className="relative">
            <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-red-600 via-rose-600 to-amber-600 flex items-center justify-center text-white shadow-lg shadow-red-900/40">
              <Cpu className="w-6 h-6 animate-pulse" />
            </div>
            <span className="absolute -bottom-1 -right-1 flex h-3.5 w-3.5">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-3.5 w-3.5 bg-emerald-500 border-2 border-[#181818]"></span>
            </span>
          </div>

          <div>
            <div className="flex items-center gap-2">
              <h2 className="font-extrabold text-base text-white tracking-tight">
                AI Engine Core Status
              </h2>
              <span className="bg-emerald-500/10 text-emerald-400 text-xs font-bold px-2.5 py-0.5 rounded-full border border-emerald-500/20 flex items-center gap-1">
                <CheckCircle2 className="w-3 h-3" /> {AI_ENGINE_STATUS.overallStatus}
              </span>
            </div>
            <p className="text-xs text-zinc-400 font-mono mt-0.5">
              Powered by{' '}
              <span className="text-white font-semibold">{AI_ENGINE_STATUS.mainModel}</span> • Uptime{' '}
              <span className="text-emerald-400 font-bold">{AI_ENGINE_STATUS.uptime}</span>
            </p>
          </div>
        </div>

        <div className="flex items-center gap-4 text-xs font-mono">
          <div className="bg-zinc-900/80 border border-white/10 px-3.5 py-2 rounded-xl flex items-center gap-2">
            <Zap className="w-4 h-4 text-amber-400" />
            <div>
              <p className="text-[10px] text-zinc-400 uppercase">Speed</p>
              <p className="font-bold text-white">{AI_ENGINE_STATUS.tokensPerSec}</p>
            </div>
          </div>

          <div className="bg-zinc-900/80 border border-white/10 px-3.5 py-2 rounded-xl flex items-center gap-2">
            <Activity className="w-4 h-4 text-red-500" />
            <div>
              <p className="text-[10px] text-zinc-400 uppercase">Avg Latency</p>
              <p className="font-bold text-white">22ms</p>
            </div>
          </div>

          <button className="bg-white/5 hover:bg-white/10 border border-white/10 text-zinc-200 hover:text-white px-3 py-2 rounded-xl flex items-center gap-1.5 transition cursor-pointer">
            <RefreshCw className="w-3.5 h-3.5 text-red-400" />
            <span className="font-sans font-semibold">Diagnostic</span>
          </button>
        </div>
      </div>

      {/* Sub-Engines Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 mt-4 relative z-10">
        {AI_ENGINE_STATUS.subEngines.map((engine) => (
          <div
            key={engine.id}
            className="p-3 rounded-xl bg-white/[0.02] border border-white/5 hover:border-white/15 transition-all flex items-center justify-between group/sub"
          >
            <div className="flex items-center gap-2.5">
              <span
                className="w-2 h-2 rounded-full shadow-[0_0_8px]"
                style={{ backgroundColor: engine.color, boxShadow: `0 0 8px ${engine.color}` }}
              ></span>
              <div>
                <p className="text-xs font-bold text-zinc-200 group-hover/sub:text-white transition">
                  {engine.name}
                </p>
                <p className="text-[10px] text-zinc-500 font-mono">
                  {engine.version} • {engine.latency}
                </p>
              </div>
            </div>

            <span className="text-[10px] font-bold font-mono text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded border border-emerald-500/20">
              {engine.accuracyRate}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};
