import React from 'react';
import {
  Play,
  Sparkles,
  Search,
  ExternalLink,
  MoreVertical,
  CheckCircle2,
  Clock,
  ArrowUpRight,
  Eye,
  Sliders,
} from 'lucide-react';
import { RECENT_PROJECTS } from '../../data/mockDashboardData';

export const RecentProjects: React.FC = () => {
  return (
    <div className="glass-card rounded-2xl p-5 border border-white/10 space-y-4">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-white/10">
        <div>
          <div className="flex items-center gap-2">
            <Play className="w-5 h-5 text-red-500 fill-red-500/20" />
            <h3 className="font-extrabold text-base text-white tracking-tight">
              Recent Projects & Production Queue
            </h3>
            <span className="text-[10px] bg-zinc-800 text-zinc-300 font-bold px-2.5 py-0.5 rounded-full border border-white/10 font-mono">
              4 Active Pipelines
            </span>
          </div>
          <p className="text-xs text-zinc-400 mt-0.5">
            Monitor thumbnail CTR A/B testing, script outputs, and automated YouTube uploads
          </p>
        </div>

        <button className="text-xs font-bold text-red-400 hover:text-red-300 transition flex items-center gap-1 cursor-pointer">
          <span>View All 28 Projects</span>
          <ArrowUpRight className="w-3.5 h-3.5" />
        </button>
      </div>

      {/* Projects Grid / Table */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-4">
        {RECENT_PROJECTS.map((project) => (
          <div
            key={project.id}
            className="p-3.5 rounded-xl bg-white/[0.02] border border-white/5 hover:border-white/20 transition-all duration-300 flex flex-col justify-between group glass-card-hover"
          >
            <div>
              {/* Thumbnail Preview Container */}
              <div className="relative aspect-video rounded-lg overflow-hidden mb-3 border border-white/10 group-hover:border-red-500/40 transition">
                <img
                  src={project.thumbnailUrl}
                  alt={project.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition duration-500"
                />

                {/* Duration Badge */}
                <div className="absolute bottom-2 right-2 bg-black/80 backdrop-blur-md text-white text-[10px] font-mono font-bold px-1.5 py-0.5 rounded border border-white/20">
                  {project.duration}
                </div>

                {/* Predicted CTR Overlay Pill */}
                <div className="absolute top-2 left-2 bg-red-600/90 backdrop-blur-md text-white text-[10px] font-bold px-2 py-0.5 rounded-full shadow-lg flex items-center gap-1 border border-red-400/30">
                  <Sparkles className="w-2.5 h-2.5" /> CTR {project.predictedCtr}
                </div>

                {/* Category Tag */}
                <div className="absolute bottom-2 left-2 bg-zinc-900/80 backdrop-blur-md text-zinc-300 text-[10px] font-semibold px-2 py-0.5 rounded border border-white/10">
                  {project.category}
                </div>
              </div>

              {/* Title & Status */}
              <div className="space-y-2">
                <div className="flex items-start justify-between gap-2">
                  <h4 className="font-bold text-xs text-white line-clamp-2 leading-snug group-hover:text-red-400 transition">
                    {project.title}
                  </h4>
                  <button className="text-zinc-500 hover:text-white p-1 cursor-pointer">
                    <MoreVertical className="w-3.5 h-3.5" />
                  </button>
                </div>

                <div className="flex items-center gap-2 text-[11px]">
                  <span
                    className={`px-2 py-0.5 rounded-full border text-[10px] font-bold ${project.statusColor}`}
                  >
                    {project.status}
                  </span>
                  <span className="text-zinc-500">•</span>
                  <span className="text-zinc-400 font-mono text-[10px]">
                    SEO: <span className="text-emerald-400 font-bold">{project.seoScore}/100</span>
                  </span>
                </div>
              </div>
            </div>

            {/* Footer Stats & Actions */}
            <div className="mt-4 pt-3 border-t border-white/5 flex items-center justify-between text-xs font-mono">
              <span className="text-zinc-400 flex items-center gap-1 text-[11px]">
                <Eye className="w-3 h-3 text-red-500" /> {project.viewsOrTarget}
              </span>

              <button className="px-2.5 py-1 rounded-lg bg-zinc-800 hover:bg-red-600 text-zinc-200 hover:text-white text-[11px] font-sans font-bold transition flex items-center gap-1 cursor-pointer">
                <Sliders className="w-3 h-3" />
                <span>Optimize</span>
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
