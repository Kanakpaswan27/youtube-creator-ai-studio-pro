import React from 'react';
import {
  LayoutDashboard,
  Tv,
  FileText,
  Image as ImageIcon,
  Search,
  DollarSign,
  Download,
  Settings,
  Sparkles,
  ChevronRight,
  TrendingUp,
  SlidersHorizontal,
} from 'lucide-react';
import { SidebarTab } from '../types/dashboard';

interface SidebarProps {
  activeTab: SidebarTab;
  setActiveTab: (tab: SidebarTab) => void;
  collapsed: boolean;
  setCollapsed: (collapsed: boolean) => void;
}

export const Sidebar: React.FC<SidebarProps> = ({
  activeTab,
  setActiveTab,
  collapsed,
}) => {
  const navItems = [
    {
      id: 'dashboard' as SidebarTab,
      label: 'Dashboard',
      icon: LayoutDashboard,
      badge: null,
    },
    {
      id: 'channel-ai' as SidebarTab,
      label: 'Channel AI',
      icon: Tv,
      badge: 'Live',
    },
    {
      id: 'script-ai' as SidebarTab,
      label: 'Script AI',
      icon: FileText,
      badge: 'v4.2',
    },
    {
      id: 'thumbnail-ai' as SidebarTab,
      label: 'Thumbnail AI',
      icon: ImageIcon,
      badge: 'CTR 98%',
    },
    {
      id: 'seo-ai' as SidebarTab,
      label: 'SEO AI',
      icon: Search,
      badge: null,
    },
    {
      id: 'affiliate-ai' as SidebarTab,
      label: 'Affiliate AI',
      icon: DollarSign,
      badge: 'Auto',
    },
    {
      id: 'video-export' as SidebarTab,
      label: 'Video Export',
      icon: Download,
      badge: '4K',
    },
    {
      id: 'settings' as SidebarTab,
      label: 'Settings',
      icon: Settings,
      badge: null,
    },
  ];

  return (
    <aside
      className={`sticky top-[65px] h-[calc(100vh-65px)] bg-[#0F0F0F] border-r border-white/10 flex flex-col justify-between transition-all duration-300 z-30 ${
        collapsed ? 'w-20' : 'w-64'
      }`}
    >
      <div className="p-3 space-y-4 overflow-y-auto flex-1">
        {/* Channel Switcher Card */}
        {!collapsed ? (
          <div className="p-3 rounded-2xl bg-[#181818] border border-white/10 flex items-center justify-between group hover:border-red-500/40 transition cursor-pointer">
            <div className="flex items-center gap-3">
              <div className="relative w-9 h-9 rounded-xl bg-gradient-to-br from-red-600 to-rose-700 flex items-center justify-center text-white font-bold shadow-lg">
                <Tv className="w-5 h-5" />
              </div>
              <div className="flex flex-col">
                <span className="text-xs font-bold text-white group-hover:text-red-400 transition">
                  Creator Workspace (Demo)
                </span>
                <span className="text-[10px] text-zinc-400 flex items-center gap-1 font-mono">
                  <TrendingUp className="w-2.5 h-2.5 text-emerald-400" /> AI Simulation Profile
                </span>
              </div>
            </div>
            <SlidersHorizontal className="w-3.5 h-3.5 text-zinc-500 group-hover:text-zinc-300" />
          </div>
        ) : (
          <div className="w-12 h-12 mx-auto rounded-xl bg-[#181818] border border-white/10 flex items-center justify-center text-red-500 font-bold">
            <Tv className="w-6 h-6" />
          </div>
        )}

        {/* Navigation Section */}
        <div className="space-y-1">
          {!collapsed && (
            <p className="px-3 text-[10px] font-bold text-zinc-500 uppercase tracking-widest mb-2 font-mono">
              Core AI Modules
            </p>
          )}

          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = activeTab === item.id;

            return (
              <button
                key={item.id}
                onClick={() => setActiveTab(item.id)}
                className={`w-full flex items-center gap-3.5 px-3 py-2.5 rounded-xl font-medium text-sm transition-all duration-200 cursor-pointer relative group ${
                  isActive
                    ? 'bg-gradient-to-r from-red-950/60 to-red-900/30 text-white border border-red-500/40 shadow-[0_0_15px_rgba(255,0,0,0.15)]'
                    : 'text-zinc-400 hover:text-white hover:bg-white/[0.04]'
                }`}
              >
                {/* Active Indicator Bar */}
                {isActive && (
                  <span className="absolute left-0 top-2 bottom-2 w-1 bg-red-600 rounded-r-full shadow-[0_0_8px_#FF0000]"></span>
                )}

                <Icon
                  className={`w-5 h-5 shrink-0 transition-transform duration-200 ${
                    isActive
                      ? 'text-red-500 scale-110'
                      : 'text-zinc-400 group-hover:text-white group-hover:scale-105'
                  }`}
                />

                {!collapsed && (
                  <div className="flex items-center justify-between flex-1">
                    <span className="truncate">{item.label}</span>
                    {item.badge && (
                      <span
                        className={`text-[10px] font-bold px-1.5 py-0.5 rounded-md uppercase font-mono ${
                          isActive
                            ? 'bg-red-500 text-white'
                            : 'bg-zinc-800 text-zinc-400 border border-zinc-700/60'
                        }`}
                      >
                        {item.badge}
                      </span>
                    )}
                  </div>
                )}
              </button>
            );
          })}
        </div>
      </div>

      {/* Sidebar Footer: AI Quota & Pro Badge */}
      {!collapsed && (
        <div className="p-3 m-3 rounded-2xl bg-gradient-to-b from-[#181818] to-[#121212] border border-white/10 space-y-3">
          <div className="flex items-center justify-between text-xs">
            <span className="text-zinc-300 font-semibold flex items-center gap-1.5">
              <Sparkles className="w-3.5 h-3.5 text-red-500" /> AI Tokens
            </span>
            <span className="text-zinc-400 font-mono text-[11px]">84.2%</span>
          </div>

          <div className="w-full bg-zinc-800 h-1.5 rounded-full overflow-hidden">
            <div
              className="bg-gradient-to-r from-red-600 via-rose-500 to-amber-400 h-full rounded-full transition-all duration-500 shadow-[0_0_10px_rgba(255,0,0,0.5)]"
              style={{ width: '84.2%' }}
            ></div>
          </div>

          <div className="flex items-center justify-between text-[10px] text-zinc-400 font-mono">
            <span>84.2K / 100K used</span>
            <span className="text-red-400 font-bold">Pro Tier</span>
          </div>

          <button className="w-full py-2 bg-gradient-to-r from-red-600 to-rose-600 hover:from-red-500 hover:to-rose-500 text-white font-bold text-xs rounded-xl shadow-lg shadow-red-900/30 flex items-center justify-center gap-1 transition cursor-pointer">
            <span>Upgrade Limit</span>
            <ChevronRight className="w-3.5 h-3.5" />
          </button>
        </div>
      )}
    </aside>
  );
};
