import React, { useState, useEffect, useRef } from 'react';
import {
  Search,
  Bell,
  Sparkles,
  Command,
  Play,
  CheckCircle2,
  ChevronDown,
  ExternalLink,
  ShieldCheck,
  X,
  Zap,
  LayoutDashboard,
  Tv,
  FileText,
  Image as ImageIcon,
  DollarSign,
  Download,
  SlidersHorizontal,
  ArrowRight,
  Clock,
  CornerDownLeft,
  History,
  Upload,
} from 'lucide-react';
import { NOTIFICATIONS } from '../data/mockDashboardData';
import { SidebarTab } from '../types/dashboard';
import { useCreator } from '../context/CreatorContext';

interface ModuleSearchResult {
  id: SidebarTab;
  title: string;
  category: string;
  description: string;
  keywords: string[];
  icon: React.ElementType;
  iconBg: string;
  iconColor: string;
}

const COMMAND_MODULES: ModuleSearchResult[] = [
  {
    id: 'dashboard',
    title: 'Dashboard Overview',
    category: 'Main Hub',
    description: 'YouTube automation control panel, analytics, workflow & AI status.',
    keywords: ['dashboard', 'home', 'overview', 'analytics', 'stats', 'timeline', 'workflow', 'recent', 'projects', 'feed'],
    icon: LayoutDashboard,
    iconBg: 'from-red-600/20 to-rose-600/20',
    iconColor: 'text-red-500',
  },
  {
    id: 'channel-ai',
    title: 'Channel AI',
    category: 'Branding & Profile',
    description: 'Channel profile, target audience definition, brand tone & subscriber stats.',
    keywords: ['creator', 'channel', 'profile', 'niche', 'branding', 'tone', 'audience', 'identity', 'subscribers'],
    icon: Tv,
    iconBg: 'from-amber-600/20 to-orange-600/20',
    iconColor: 'text-amber-500',
  },
  {
    id: 'script-ai',
    title: 'Script AI',
    category: 'Content Creation',
    description: 'Multi-chapter video script synthesis, high-retention hooks & teleprompter.',
    keywords: ['script', 'writer', 'hook', 'chapters', 'outline', 'teleprompter', 'video script', 'content', 'storyboard'],
    icon: FileText,
    iconBg: 'from-emerald-600/20 to-teal-600/20',
    iconColor: 'text-emerald-500',
  },
  {
    id: 'thumbnail-ai',
    title: 'Thumbnail AI',
    category: 'Visual Design',
    description: '4K Octane 3D image prompts, CTR prediction & face expression tuning.',
    keywords: ['thumbnail', 'image', 'octane', 'ctr', 'visuals', 'prompt', 'pollinations', 'render', 'art'],
    icon: ImageIcon,
    iconBg: 'from-rose-600/20 to-pink-600/20',
    iconColor: 'text-rose-500',
  },
  {
    id: 'seo-ai',
    title: 'SEO AI',
    category: 'Optimization',
    description: '20 high-CPM keyword clusters, viral title generator & YouTube tags box.',
    keywords: ['seo', 'keywords', 'tags', 'title', 'viral title', 'ranking', 'search', 'algorithm', 'cpm', 'traffic'],
    icon: Search,
    iconBg: 'from-blue-600/20 to-indigo-600/20',
    iconColor: 'text-blue-500',
  },
  {
    id: 'affiliate-ai',
    title: 'Affiliate AI',
    category: 'Monetization',
    description: 'Affiliate short links (Amazon, Flipkart, Meesho) & revenue calculators.',
    keywords: ['affiliate', 'monetization', 'amazon', 'flipkart', 'meesho', 'revenue', 'products', 'links', 'earnings'],
    icon: DollarSign,
    iconBg: 'from-green-600/20 to-emerald-600/20',
    iconColor: 'text-green-500',
  },
  {
    id: 'video-export',
    title: 'Video Export',
    category: 'Publishing',
    description: 'Bundle channel, script, thumbnail & SEO into JSON, Markdown & Webhook exports.',
    keywords: ['video', 'export', 'package', 'json', 'markdown', 'webhook', 'copy', 'download', 'bundle', 'publish'],
    icon: Download,
    iconBg: 'from-purple-600/20 to-violet-600/20',
    iconColor: 'text-purple-500',
  },
  {
    id: 'settings',
    title: 'Enterprise Settings',
    category: 'System Config',
    description: 'Profile metadata, Gemini API, Firebase backup, theme & privacy controls.',
    keywords: ['settings', 'profile', 'api', 'keys', 'gemini', 'firebase', 'preferences', 'appearance', 'privacy', 'config', 'user'],
    icon: SlidersHorizontal,
    iconBg: 'from-zinc-700/30 to-zinc-800/30',
    iconColor: 'text-zinc-300',
  },
];

const QUICK_ACTIONS = [
  { label: 'Generate Viral Script', tab: 'script-ai' as SidebarTab, icon: FileText },
  { label: 'Render 4K Thumbnail Prompt', tab: 'thumbnail-ai' as SidebarTab, icon: ImageIcon },
  { label: 'Optimize 20 SEO Keywords', tab: 'seo-ai' as SidebarTab, icon: Search },
  { label: 'Export Video Package', tab: 'video-export' as SidebarTab, icon: Download },
  { label: 'Configure API Integrations', tab: 'settings' as SidebarTab, icon: SlidersHorizontal },
];

interface HeaderProps {
  onSearchClick?: () => void;
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  activeTab: string;
  setActiveTab?: (tab: SidebarTab) => void;
}

export const Header: React.FC<HeaderProps> = ({
  searchQuery,
  setSearchQuery,
  setActiveTab,
}) => {
  const { profile, avatarUrl, uploadAvatarFile } = useCreator();
  const [showNotifications, setShowNotifications] = useState(false);
  const [notifications, setNotifications] = useState(NOTIFICATIONS);
  const [showProfileMenu, setShowProfileMenu] = useState(false);
  const [unreadCount, setUnreadCount] = useState(2);

  // Command Palette State
  const [isOpen, setIsOpen] = useState(false);
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [recentSearches, setRecentSearches] = useState<SidebarTab[]>([
    'script-ai',
    'thumbnail-ai',
    'seo-ai',
  ]);

  const searchInputRef = useRef<HTMLInputElement>(null);
  const paletteRef = useRef<HTMLDivElement>(null);

  const markAllRead = () => {
    setNotifications((prev) => prev.map((n) => ({ ...n, read: true })));
    setUnreadCount(0);
  };

  useEffect(() => {
    const unread = notifications.filter((n) => !n.read).length;
    setUnreadCount(unread);
  }, [notifications]);

  // Keyboard Shortcut Ctrl+K / Cmd+K listener
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault();
        setIsOpen(true);
        searchInputRef.current?.focus();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  // Filter Matching Modules based on search query
  const queryTrimmed = searchQuery.trim().toLowerCase();
  const filteredModules = COMMAND_MODULES.filter((m) => {
    if (!queryTrimmed) return true;
    const inTitle = m.title.toLowerCase().includes(queryTrimmed);
    const inCategory = m.category.toLowerCase().includes(queryTrimmed);
    const inDesc = m.description.toLowerCase().includes(queryTrimmed);
    const inKeywords = m.keywords.some((k) => k.toLowerCase().includes(queryTrimmed));
    return inTitle || inCategory || inDesc || inKeywords;
  });

  // Handle Keyboard Arrows Navigation inside Palette
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (!isOpen) return;

    if (e.key === 'ArrowDown') {
      e.preventDefault();
      setSelectedIndex((prev) => (prev + 1) % (filteredModules.length || 1));
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      setSelectedIndex((prev) =>
        prev === 0 ? Math.max(0, filteredModules.length - 1) : prev - 1
      );
    } else if (e.key === 'Enter') {
      e.preventDefault();
      if (filteredModules.length > 0 && selectedIndex < filteredModules.length) {
        handleSelectModule(filteredModules[selectedIndex].id);
      }
    } else if (e.key === 'Escape') {
      setIsOpen(false);
      searchInputRef.current?.blur();
    }
  };

  // Select Module Action
  const handleSelectModule = (tab: SidebarTab) => {
    if (setActiveTab) {
      setActiveTab(tab);
    }
    // Track in recent searches
    setRecentSearches((prev) => [tab, ...prev.filter((t) => t !== tab)].slice(0, 4));
    setIsOpen(false);
    setSearchQuery('');
  };

  // Close Palette when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (paletteRef.current && !paletteRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Helper to Highlight Matching Text
  const renderHighlightedText = (text: string, query: string) => {
    if (!query) return text;
    const parts = text.split(new RegExp(`(${query})`, 'gi'));
    return parts.map((part, i) =>
      part.toLowerCase() === query.toLowerCase() ? (
        <span key={i} className="bg-red-500/30 text-red-300 font-bold px-0.5 rounded">
          {part}
        </span>
      ) : (
        part
      )
    );
  };

  return (
    <header className="sticky top-0 z-40 w-full bg-[#0F0F0F]/90 backdrop-blur-xl border-b border-white/10 px-4 lg:px-8 py-3 transition-all">
      <div className="flex items-center justify-between gap-4 max-w-[1800px] mx-auto">
        {/* Left Section: Logo & Brand */}
        <div className="flex items-center gap-3">
          <div
            onClick={() => setActiveTab && setActiveTab('dashboard')}
            className="relative group cursor-pointer"
          >
            <div className="absolute -inset-1 bg-gradient-to-r from-red-600 to-rose-600 rounded-xl blur-sm opacity-70 group-hover:opacity-100 transition duration-300"></div>
            <div className="relative w-10 h-10 rounded-xl bg-[#181818] border border-white/20 flex items-center justify-center text-red-500 font-black shadow-inner">
              <Play className="w-5 h-5 fill-red-600 text-red-600 ml-0.5" />
            </div>
          </div>

          <div
            onClick={() => setActiveTab && setActiveTab('dashboard')}
            className="flex flex-col cursor-pointer"
          >
            <div className="flex items-center gap-2">
              <span className="font-extrabold text-xl tracking-tight text-white font-sans">
                Creator<span className="text-red-500">OS</span>
              </span>
              <span className="bg-gradient-to-r from-red-600 to-rose-600 text-white text-[10px] font-bold px-2 py-0.5 rounded-full uppercase tracking-wider shadow-sm flex items-center gap-1">
                <Sparkles className="w-2.5 h-2.5" /> AI
              </span>
            </div>
            <span className="text-[11px] text-zinc-400 font-medium tracking-wide">
              YouTube Automation Suite
            </span>
          </div>
        </div>

        {/* Center Section: AI COMMAND PALETTE SEARCH BAR */}
        <div ref={paletteRef} className="relative hidden md:flex items-center flex-1 max-w-xl mx-4">
          <div className="relative w-full group">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-400 group-focus-within:text-red-500 transition-colors pointer-events-none" />
            <input
              ref={searchInputRef}
              type="text"
              placeholder="Jump to module... (e.g., thumbnail, script, seo, export, settings)"
              value={searchQuery}
              onFocus={() => setIsOpen(true)}
              onChange={(e) => {
                setSearchQuery(e.target.value);
                setIsOpen(true);
                setSelectedIndex(0);
              }}
              onKeyDown={handleKeyDown}
              className="w-full bg-[#181818] border border-white/10 rounded-xl pl-10 pr-20 py-2.5 text-xs text-zinc-200 placeholder-zinc-500 focus:outline-none focus:border-red-500/60 focus:ring-2 focus:ring-red-500/20 transition-all font-medium"
            />
            
            <div className="absolute right-3 top-1/2 -translate-y-1/2 flex items-center gap-1 px-2 py-1 rounded-md bg-zinc-800 border border-zinc-700/60 text-[10px] font-mono text-zinc-400 shadow-sm pointer-events-none">
              <Command className="w-3 h-3" />
              <span>K</span>
            </div>
          </div>

          {/* ANIMATED DROPDOWN PALETTE PANEL */}
          {isOpen && (
            <div className="absolute top-full left-0 right-0 mt-2 bg-[#121212]/95 border border-white/15 rounded-2xl shadow-2xl p-3 z-50 animate-in fade-in zoom-in-95 duration-150 backdrop-blur-2xl space-y-3 max-h-[520px] overflow-y-auto">
              
              {/* RECENT SEARCHES (When query is empty) */}
              {!queryTrimmed && recentSearches.length > 0 && (
                <div className="space-y-1.5 pb-2 border-b border-white/10">
                  <div className="flex items-center justify-between text-[10px] font-mono text-zinc-400 uppercase tracking-wider px-2">
                    <span className="flex items-center gap-1">
                      <History className="w-3 h-3 text-red-500" /> Recent Modules
                    </span>
                    <span>Quick Jump</span>
                  </div>
                  <div className="flex flex-wrap gap-1.5">
                    {recentSearches.map((tabId) => {
                      const mod = COMMAND_MODULES.find((m) => m.id === tabId);
                      if (!mod) return null;
                      const Icon = mod.icon;
                      return (
                        <button
                          key={tabId}
                          onClick={() => handleSelectModule(tabId)}
                          className="px-2.5 py-1 rounded-lg bg-zinc-900 border border-white/10 hover:border-red-500/40 text-xs text-zinc-300 hover:text-white transition flex items-center gap-1.5 cursor-pointer font-medium"
                        >
                          <Icon className={`w-3.5 h-3.5 ${mod.iconColor}`} />
                          <span>{mod.title}</span>
                        </button>
                      );
                    })}
                  </div>
                </div>
              )}

              {/* QUICK ACTIONS BAR (When query is empty) */}
              {!queryTrimmed && (
                <div className="space-y-1.5 pb-2 border-b border-white/10">
                  <div className="text-[10px] font-mono text-zinc-400 uppercase tracking-wider px-2 flex items-center gap-1">
                    <Zap className="w-3 h-3 text-amber-400" /> Quick Actions
                  </div>
                  <div className="grid grid-cols-2 gap-1.5">
                    {QUICK_ACTIONS.map((action, idx) => {
                      const ActionIcon = action.icon;
                      return (
                        <button
                          key={idx}
                          onClick={() => handleSelectModule(action.tab)}
                          className="p-2 rounded-xl bg-zinc-900/60 border border-white/5 hover:border-red-500/30 hover:bg-zinc-800 text-left text-xs font-semibold text-zinc-300 hover:text-white transition flex items-center gap-2 cursor-pointer"
                        >
                          <ActionIcon className="w-3.5 h-3.5 text-red-500 shrink-0" />
                          <span className="truncate">{action.label}</span>
                        </button>
                      );
                    })}
                  </div>
                </div>
              )}

              {/* FILTERED MODULE RESULTS */}
              <div className="space-y-1">
                <div className="flex items-center justify-between text-[10px] font-mono text-zinc-400 uppercase tracking-wider px-2 py-1">
                  <span>{queryTrimmed ? `Matching Modules (${filteredModules.length})` : 'All Available Modules'}</span>
                  <span className="flex items-center gap-1">
                    <CornerDownLeft className="w-3 h-3" /> Select
                  </span>
                </div>

                {filteredModules.length === 0 ? (
                  <div className="p-6 text-center space-y-2">
                    <Search className="w-8 h-8 text-zinc-600 mx-auto animate-bounce" />
                    <p className="text-xs font-bold text-zinc-300">No matching module found.</p>
                    <p className="text-[11px] text-zinc-500">
                      Try searching keywords like <span className="text-red-400 font-mono">script</span>, <span className="text-red-400 font-mono">thumbnail</span>, <span className="text-red-400 font-mono">seo</span>, or <span className="text-red-400 font-mono">export</span>.
                    </p>
                  </div>
                ) : (
                  filteredModules.map((item, index) => {
                    const Icon = item.icon;
                    const isSelected = selectedIndex === index;
                    return (
                      <div
                        key={item.id}
                        onClick={() => handleSelectModule(item.id)}
                        onMouseEnter={() => setSelectedIndex(index)}
                        className={`p-2.5 rounded-xl transition flex items-center justify-between cursor-pointer border ${
                          isSelected
                            ? 'bg-gradient-to-r from-red-950/60 to-zinc-900 border-red-500/40 text-white shadow-md'
                            : 'bg-zinc-900/40 border-transparent text-zinc-300 hover:bg-zinc-900 hover:border-white/10'
                        }`}
                      >
                        <div className="flex items-center gap-3">
                          <div
                            className={`w-9 h-9 rounded-xl bg-gradient-to-br ${item.iconBg} border border-white/10 flex items-center justify-center ${item.iconColor} shrink-0`}
                          >
                            <Icon className="w-4 h-4" />
                          </div>
                          <div>
                            <div className="flex items-center gap-2">
                              <span className="text-xs font-bold text-white">
                                {renderHighlightedText(item.title, queryTrimmed)}
                              </span>
                              <span className="text-[9px] font-mono font-bold px-2 py-0.5 rounded bg-zinc-800 text-zinc-400 border border-white/5">
                                {item.category}
                              </span>
                            </div>
                            <p className="text-[10px] text-zinc-400 line-clamp-1 mt-0.5">
                              {renderHighlightedText(item.description, queryTrimmed)}
                            </p>
                          </div>
                        </div>

                        <ArrowRight
                          className={`w-4 h-4 shrink-0 transition-transform ${
                            isSelected ? 'text-red-500 translate-x-1' : 'text-zinc-600'
                          }`}
                        />
                      </div>
                    );
                  })
                )}
              </div>

            </div>
          )}
        </div>

        {/* Right Section: Glowing Badges, Notifications, Profile */}
        <div className="flex items-center gap-2 sm:gap-3">
          {/* AI Simulation Mode Glowing Badge */}
          <div className="relative group hidden xl:block">
            <div className="absolute -inset-0.5 bg-gradient-to-r from-emerald-500 via-teal-400 to-cyan-500 rounded-full blur-sm opacity-80 group-hover:opacity-100 transition duration-300"></div>
            <div className="relative flex items-center gap-1.5 bg-[#121212] border border-emerald-500/50 rounded-full px-3 py-1 text-xs font-bold text-emerald-300 shadow-md">
              <span>🧪</span>
              <span>AI Simulation Mode</span>
            </div>
          </div>

          {/* REQUIRED PREMIUM GLOWING BADGE */}
          <div className="relative group hidden sm:block">
            {/* Outer ambient glow effect */}
            <div className="absolute -inset-0.5 bg-gradient-to-r from-red-600 via-rose-500 to-amber-500 rounded-full blur-sm opacity-85 group-hover:opacity-100 transition duration-500 badge-glow"></div>

            <div className="relative flex items-center gap-2 bg-[#121212] hover:bg-[#1a1a1a] border border-red-500/50 rounded-full px-3.5 py-1.5 transition-all duration-300">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-red-500"></span>
              </span>
              <Sparkles className="w-3.5 h-3.5 text-amber-400 animate-pulse" />
              <span className="text-xs font-semibold tracking-wide text-zinc-100">
                Engineered by{' '}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-red-400 via-rose-300 to-amber-200 font-bold">
                  Kanak Kumari
                </span>
              </span>
            </div>
          </div>

          {/* Notifications Dropdown Button */}
          <div className="relative">
            <button
              onClick={() => setShowNotifications(!showNotifications)}
              className="relative p-2.5 rounded-xl bg-[#181818] border border-white/10 hover:border-white/20 text-zinc-300 hover:text-white transition-all cursor-pointer"
              aria-label="Notifications"
            >
              <Bell className="w-4 h-4" />
              {unreadCount > 0 && (
                <span className="absolute -top-1 -right-1 w-4 h-4 bg-red-600 text-white text-[10px] font-bold rounded-full flex items-center justify-center animate-pulse border border-[#0F0F0F]">
                  {unreadCount}
                </span>
              )}
            </button>

            {/* Notifications Menu */}
            {showNotifications && (
              <div className="absolute right-0 mt-2 w-80 sm:w-96 bg-[#181818] border border-white/10 rounded-2xl shadow-2xl p-4 z-50 animate-in fade-in zoom-in-95 duration-150 backdrop-blur-2xl">
                <div className="flex items-center justify-between pb-3 border-b border-white/10 mb-3">
                  <div className="flex items-center gap-2">
                    <Bell className="w-4 h-4 text-red-500" />
                    <span className="font-bold text-sm text-white">
                      AI Notifications
                    </span>
                    {unreadCount > 0 && (
                      <span className="bg-red-500/20 text-red-400 text-xs px-2 py-0.5 rounded-full font-semibold border border-red-500/30">
                        {unreadCount} new
                      </span>
                    )}
                  </div>
                  <div className="flex items-center gap-2">
                    {unreadCount > 0 && (
                      <button
                        onClick={markAllRead}
                        className="text-xs text-zinc-400 hover:text-red-400 transition cursor-pointer"
                      >
                        Mark read
                      </button>
                    )}
                    <button
                      onClick={() => setShowNotifications(false)}
                      className="text-zinc-500 hover:text-white cursor-pointer"
                    >
                      <X className="w-4 h-4" />
                    </button>
                  </div>
                </div>

                <div className="space-y-2 max-h-80 overflow-y-auto pr-1">
                  {notifications.map((item) => (
                    <div
                      key={item.id}
                      className={`p-3 rounded-xl border text-xs transition ${
                        item.read
                          ? 'bg-zinc-900/40 border-white/5 text-zinc-400'
                          : 'bg-red-950/20 border-red-500/30 text-zinc-200 font-medium'
                      }`}
                    >
                      <div className="flex items-start justify-between gap-2">
                        <p className="leading-snug">{item.title}</p>
                        <span className="text-[10px] text-zinc-500 whitespace-nowrap">
                          {item.time}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="mt-3 pt-2 border-t border-white/10 text-center">
                  <span className="text-xs text-zinc-400 hover:text-white cursor-pointer font-medium flex items-center justify-center gap-1">
                    <Zap className="w-3 h-3 text-red-500" /> Auto-optimizations running in background
                  </span>
                </div>
              </div>
            )}
          </div>

          {/* User Profile Menu */}
          <div className="relative">
            <button
              onClick={() => setShowProfileMenu(!showProfileMenu)}
              className="flex items-center gap-2 p-1.5 pr-2.5 rounded-xl bg-[#181818] border border-white/10 hover:border-white/20 transition cursor-pointer"
            >
              <div className="relative w-8 h-8 rounded-full overflow-hidden border-2 border-red-500 shadow-[0_0_12px_rgba(239,68,68,0.6)] bg-zinc-800 flex items-center justify-center shrink-0">
                <img
                  src={avatarUrl}
                  alt={profile.creatorName}
                  className="w-full h-full object-cover rounded-full"
                />
                <span
                  className="absolute bottom-0 right-0 w-2.5 h-2.5 rounded-full bg-emerald-500 ring-2 ring-[#181818] shadow-[0_0_6px_rgba(16,185,129,0.9)] animate-pulse"
                  title="Online"
                />
              </div>
              <div className="hidden lg:flex flex-col text-left">
                <span className="text-xs font-bold text-zinc-200 truncate max-w-[120px]">
                  {profile.creatorName}
                </span>
                <span className="text-[10px] text-zinc-400 font-mono truncate max-w-[120px]">
                  {profile.channelHandle}
                </span>
              </div>
              <ChevronDown className="w-3.5 h-3.5 text-zinc-400" />
            </button>

            {/* Profile Dropdown */}
            {showProfileMenu && (
              <div className="absolute right-0 mt-2 w-72 bg-[#181818] border border-white/10 rounded-2xl shadow-2xl p-3.5 z-50 animate-in fade-in zoom-in-95 duration-150">
                <div className="flex flex-col gap-2 p-3 bg-zinc-900/80 rounded-xl mb-2 border border-white/5">
                  <div className="flex items-center gap-3">
                    <div className="relative w-12 h-12 rounded-full overflow-hidden border-2 border-red-500 shadow-[0_0_16px_rgba(239,68,68,0.6)] shrink-0">
                      <img
                        src={avatarUrl}
                        alt={profile.creatorName}
                        className="w-full h-full object-cover rounded-full"
                      />
                      <span
                        className="absolute bottom-0 right-0 w-3 h-3 rounded-full bg-emerald-500 ring-2 ring-[#181818] shadow-[0_0_8px_rgba(16,185,129,0.9)] animate-pulse"
                        title="Online Status"
                      />
                    </div>
                    <div className="overflow-hidden">
                      <div className="font-bold text-sm text-white flex items-center gap-1 truncate">
                        {profile.creatorName}{' '}
                        <CheckCircle2 className="w-3.5 h-3.5 text-red-500 fill-red-500/20 shrink-0" />
                      </div>
                      <span className="text-xs text-zinc-400 font-mono block truncate">
                        {profile.channelHandle}
                      </span>
                    </div>
                  </div>

                  {/* UPLOAD PROFILE PHOTO BUTTON */}
                  <label className="w-full mt-1 py-2 px-3 rounded-xl bg-gradient-to-r from-red-600 to-rose-600 hover:from-red-500 hover:to-rose-500 text-white text-xs font-bold transition flex items-center justify-center gap-2 cursor-pointer shadow-lg shadow-red-900/30 border border-red-400/30">
                    <Upload className="w-3.5 h-3.5" />
                    <span>Upload Profile Photo</span>
                    <input
                      type="file"
                      accept="image/*"
                      onChange={async (e) => {
                        const file = e.target.files?.[0];
                        if (file) {
                          await uploadAvatarFile(file);
                        }
                      }}
                      className="hidden"
                    />
                  </label>
                </div>

                <div className="space-y-1 text-xs text-zinc-300 font-medium">
                  <div
                    onClick={() => {
                      setActiveTab && setActiveTab('settings');
                      setShowProfileMenu(false);
                    }}
                    className="p-2 hover:bg-zinc-800 rounded-lg cursor-pointer flex items-center justify-between text-white"
                  >
                    <span>Enterprise Settings</span>
                    <SlidersHorizontal className="w-3.5 h-3.5 text-red-500" />
                  </div>
                  <div className="p-2 hover:bg-zinc-800 rounded-lg cursor-pointer flex items-center justify-between">
                    <span>Connected YouTube Account</span>
                    <ShieldCheck className="w-4 h-4 text-emerald-400" />
                  </div>
                  <div className="p-2 hover:bg-zinc-800 rounded-lg cursor-pointer flex items-center justify-between">
                    <span>Gemini API Studio Tier</span>
                    <span className="text-[10px] bg-red-500/20 text-red-400 px-1.5 py-0.5 rounded font-bold">
                      Enterprise
                    </span>
                  </div>
                  <div className="p-2 hover:bg-zinc-800 rounded-lg cursor-pointer flex items-center justify-between">
                    <span>YouTube Channel Studio</span>
                    <ExternalLink className="w-3.5 h-3.5 text-zinc-400" />
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};
