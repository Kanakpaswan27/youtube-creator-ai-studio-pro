import React, { useState } from 'react';
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
} from 'recharts';
import {
  TrendingUp,
  Sparkles,
  Search,
  ExternalLink,
  PieChart as PieIcon,
  Zap,
} from 'lucide-react';
import { ANALYTICS_GRAPH_DATA } from '../../data/mockDashboardData';

export const AnalyticsCards: React.FC = () => {
  const [timeframe, setTimeframe] = useState<'7d' | '30d' | '90d'>('30d');
  const [metric, setMetric] = useState<'views' | 'revenue'>('views');

  const trafficSources = [
    { name: 'YouTube Search', percentage: 48, count: '1.19M views', color: 'bg-red-500' },
    { name: 'Suggested Videos', percentage: 32, count: '793.8K views', color: 'bg-rose-500' },
    { name: 'Browse Features', percentage: 12, count: '297.7K views', color: 'bg-amber-500' },
    { name: 'External & Social', percentage: 8, count: '198.4K views', color: 'bg-blue-500' },
  ];

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
      {/* Left 2 Cols: Main Analytics Area Graph */}
      <div className="lg:col-span-2 glass-card rounded-2xl p-5 border border-white/10 flex flex-col justify-between">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-white/10">
          <div>
            <div className="flex items-center gap-2">
              <h3 className="font-extrabold text-base text-white tracking-tight">
                Channel Growth Velocity
              </h3>
              <span className="text-[10px] bg-red-500/10 text-red-400 font-bold px-2 py-0.5 rounded-full border border-red-500/20">
                AI Pattern Engine
              </span>
            </div>
            <p className="text-xs text-zinc-400 mt-0.5">
              Daily views & RPM revenue trajectories projected by Gemini
            </p>
          </div>

          <div className="flex items-center gap-2">
            {/* Metric Switcher */}
            <div className="p-1 rounded-xl bg-zinc-900 border border-white/10 flex items-center gap-1 text-xs">
              <button
                onClick={() => setMetric('views')}
                className={`px-3 py-1 rounded-lg font-bold transition cursor-pointer ${
                  metric === 'views'
                    ? 'bg-red-600 text-white shadow-md'
                    : 'text-zinc-400 hover:text-white'
                }`}
              >
                Views
              </button>
              <button
                onClick={() => setMetric('revenue')}
                className={`px-3 py-1 rounded-lg font-bold transition cursor-pointer ${
                  metric === 'revenue'
                    ? 'bg-red-600 text-white shadow-md'
                    : 'text-zinc-400 hover:text-white'
                }`}
              >
                Revenue
              </button>
            </div>

            {/* Timeframe Switcher */}
            <div className="p-1 rounded-xl bg-zinc-900 border border-white/10 flex items-center gap-1 text-xs">
              {(['7d', '30d', '90d'] as const).map((t) => (
                <button
                  key={t}
                  onClick={() => setTimeframe(t)}
                  className={`px-2.5 py-1 rounded-lg font-mono font-bold transition cursor-pointer ${
                    timeframe === t
                      ? 'bg-white/10 text-white'
                      : 'text-zinc-400 hover:text-white'
                  }`}
                >
                  {t}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Recharts Area Chart */}
        <div className="h-64 my-4 w-full">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={ANALYTICS_GRAPH_DATA}>
              <defs>
                <linearGradient id="redGradient" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#FF0000" stopOpacity={0.4} />
                  <stop offset="95%" stopColor="#FF0000" stopOpacity={0.0} />
                </linearGradient>
                <linearGradient id="emeraldGradient" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#10B981" stopOpacity={0.4} />
                  <stop offset="95%" stopColor="#10B981" stopOpacity={0.0} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" />
              <XAxis
                dataKey="date"
                stroke="#a1a1aa"
                fontSize={11}
                tickLine={false}
              />
              <YAxis stroke="#a1a1aa" fontSize={11} tickLine={false} />
              <Tooltip
                contentStyle={{
                  backgroundColor: '#181818',
                  borderColor: 'rgba(255,255,255,0.15)',
                  borderRadius: '12px',
                  color: '#fff',
                  fontSize: '12px',
                }}
              />
              <Area
                type="monotone"
                dataKey={metric === 'views' ? 'views' : 'revenue'}
                stroke={metric === 'views' ? '#FF0000' : '#10B981'}
                strokeWidth={3}
                fillOpacity={1}
                fill={`url(#${metric === 'views' ? 'redGradient' : 'emeraldGradient'})`}
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>

        {/* Gemini AI Insight Callout Banner */}
        <div className="p-3.5 rounded-xl bg-gradient-to-r from-red-950/40 via-red-900/20 to-transparent border border-red-500/30 flex items-center gap-3">
          <div className="w-8 h-8 rounded-lg bg-red-500/20 border border-red-500/40 flex items-center justify-center text-red-400 shrink-0">
            <Sparkles className="w-4 h-4 animate-pulse" />
          </div>
          <div className="text-xs">
            <span className="font-bold text-white flex items-center gap-1">
              Gemini AI Optimization Tip:
            </span>
            <span className="text-zinc-300">
              Publishing video tutorials on Thursdays between 5:00 PM – 6:30 PM EST increases initial 2-hour CTR by +28.4%.
            </span>
          </div>
        </div>
      </div>

      {/* Right Col: Traffic Source Breakdown */}
      <div className="glass-card rounded-2xl p-5 border border-white/10 flex flex-col justify-between">
        <div>
          <div className="flex items-center justify-between pb-3 border-b border-white/10 mb-4">
            <div className="flex items-center gap-2">
              <PieIcon className="w-4 h-4 text-red-500" />
              <h3 className="font-extrabold text-base text-white tracking-tight">
                Traffic Acquisition
              </h3>
            </div>
            <span className="text-[10px] text-zinc-400 font-mono">Real-time</span>
          </div>

          <div className="space-y-4">
            {trafficSources.map((source, i) => (
              <div key={i} className="space-y-1.5">
                <div className="flex items-center justify-between text-xs">
                  <span className="text-zinc-200 font-medium">{source.name}</span>
                  <div className="flex items-center gap-2 font-mono">
                    <span className="text-zinc-400 text-[11px]">{source.count}</span>
                    <span className="font-bold text-white">{source.percentage}%</span>
                  </div>
                </div>

                <div className="w-full bg-zinc-800 h-2 rounded-full overflow-hidden">
                  <div
                    className={`${source.color} h-full rounded-full transition-all duration-500`}
                    style={{ width: `${source.percentage}%` }}
                  ></div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="mt-6 p-3 rounded-xl bg-zinc-900/80 border border-white/5 space-y-2">
          <div className="flex items-center justify-between text-xs font-bold text-zinc-300">
            <span className="flex items-center gap-1.5">
              <Zap className="w-3.5 h-3.5 text-amber-400" /> SEO Keyword Synergy
            </span>
            <span className="text-emerald-400 font-mono">98.2% match</span>
          </div>
          <p className="text-[11px] text-zinc-400 leading-snug">
            Your channel currently ranks #1 for "AI Agent Tutorial" and #2 for "Gemini Studio Setup".
          </p>
        </div>
      </div>
    </div>
  );
};
