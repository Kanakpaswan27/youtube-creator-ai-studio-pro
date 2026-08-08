import React from 'react';
import {
  Tv,
  FileText,
  Image as ImageIcon,
  Search,
  DollarSign,
  Download,
  Settings as SettingsIcon,
  Sparkles,
  ArrowLeft,
  Bot,
  Zap,
  CheckCircle2,
  Lock,
} from 'lucide-react';
import { SidebarTab } from '../../types/dashboard';
import { ChannelAiModule } from '../modules/ChannelAiModule';
import { ScriptAiModule } from '../modules/ScriptAiModule';
import { ThumbnailAiModule } from '../modules/ThumbnailAiModule';
import { SeoAiModule } from '../modules/SeoAiModule';
import { AffiliateAiModule } from '../modules/AffiliateAiModule';
import { VideoExportModule } from '../modules/VideoExportModule';
import { SettingsModule } from '../modules/SettingsModule';
import { MultiAgentPipelineNav } from '../common/MultiAgentPipelineNav';

interface ModuleViewProps {
  tab: SidebarTab;
  onBackToDashboard: () => void;
  onNavigateTab?: (tab: SidebarTab) => void;
}

export const ModuleView: React.FC<ModuleViewProps> = ({
  tab,
  onBackToDashboard,
  onNavigateTab,
}) => {
  const handleNavigateTab = (newTab: SidebarTab) => {
    if (onNavigateTab) {
      onNavigateTab(newTab);
    }
  };

  // Directly render Channel AI functional module when tab is 'channel-ai'
  if (tab === 'channel-ai') {
    return (
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <button
            onClick={onBackToDashboard}
            className="px-3.5 py-2 rounded-xl bg-[#181818] border border-white/10 hover:border-white/20 text-zinc-300 hover:text-white text-xs font-bold transition flex items-center gap-2 cursor-pointer"
          >
            <ArrowLeft className="w-4 h-4 text-red-500" />
            <span>Back to Main Dashboard</span>
          </button>
        </div>

        <MultiAgentPipelineNav currentTab={tab} onNavigateTab={handleNavigateTab} />

        <ChannelAiModule onBackToDashboard={onBackToDashboard} />
      </div>
    );
  }

  // Directly render Script AI functional module when tab is 'script-ai'
  if (tab === 'script-ai') {
    return (
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <button
            onClick={onBackToDashboard}
            className="px-3.5 py-2 rounded-xl bg-[#181818] border border-white/10 hover:border-white/20 text-zinc-300 hover:text-white text-xs font-bold transition flex items-center gap-2 cursor-pointer"
          >
            <ArrowLeft className="w-4 h-4 text-red-500" />
            <span>Back to Main Dashboard</span>
          </button>
        </div>

        <MultiAgentPipelineNav currentTab={tab} onNavigateTab={handleNavigateTab} />

        <ScriptAiModule onBackToDashboard={onBackToDashboard} />
      </div>
    );
  }

  // Directly render Thumbnail AI functional module when tab is 'thumbnail-ai'
  if (tab === 'thumbnail-ai') {
    return (
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <button
            onClick={onBackToDashboard}
            className="px-3.5 py-2 rounded-xl bg-[#181818] border border-white/10 hover:border-white/20 text-zinc-300 hover:text-white text-xs font-bold transition flex items-center gap-2 cursor-pointer"
          >
            <ArrowLeft className="w-4 h-4 text-red-500" />
            <span>Back to Main Dashboard</span>
          </button>
        </div>

        <MultiAgentPipelineNav currentTab={tab} onNavigateTab={handleNavigateTab} />

        <ThumbnailAiModule onBackToDashboard={onBackToDashboard} />
      </div>
    );
  }

  // Directly render SEO AI functional module when tab is 'seo-ai'
  if (tab === 'seo-ai') {
    return (
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <button
            onClick={onBackToDashboard}
            className="px-3.5 py-2 rounded-xl bg-[#181818] border border-white/10 hover:border-white/20 text-zinc-300 hover:text-white text-xs font-bold transition flex items-center gap-2 cursor-pointer"
          >
            <ArrowLeft className="w-4 h-4 text-red-500" />
            <span>Back to Main Dashboard</span>
          </button>
        </div>

        <MultiAgentPipelineNav currentTab={tab} onNavigateTab={handleNavigateTab} />

        <SeoAiModule onBackToDashboard={onBackToDashboard} />
      </div>
    );
  }

  // Directly render Affiliate AI functional module when tab is 'affiliate-ai'
  if (tab === 'affiliate-ai') {
    return (
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <button
            onClick={onBackToDashboard}
            className="px-3.5 py-2 rounded-xl bg-[#181818] border border-white/10 hover:border-white/20 text-zinc-300 hover:text-white text-xs font-bold transition flex items-center gap-2 cursor-pointer"
          >
            <ArrowLeft className="w-4 h-4 text-red-500" />
            <span>Back to Main Dashboard</span>
          </button>
        </div>

        <MultiAgentPipelineNav currentTab={tab} onNavigateTab={handleNavigateTab} />

        <AffiliateAiModule onBackToDashboard={onBackToDashboard} />
      </div>
    );
  }

  // Directly render Video Export workspace module when tab is 'video-export'
  if (tab === 'video-export') {
    return (
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <button
            onClick={onBackToDashboard}
            className="px-3.5 py-2 rounded-xl bg-[#181818] border border-white/10 hover:border-white/20 text-zinc-300 hover:text-white text-xs font-bold transition flex items-center gap-2 cursor-pointer"
          >
            <ArrowLeft className="w-4 h-4 text-red-500" />
            <span>Back to Main Dashboard</span>
          </button>
        </div>

        <MultiAgentPipelineNav currentTab={tab} onNavigateTab={handleNavigateTab} />

        <VideoExportModule onBackToDashboard={onBackToDashboard} />
      </div>
    );
  }

  // Directly render Enterprise Settings module when tab is 'settings'
  if (tab === 'settings') {
    return (
      <div className="space-y-6">
        <button
          onClick={onBackToDashboard}
          className="px-3.5 py-2 rounded-xl bg-[#181818] border border-white/10 hover:border-white/20 text-zinc-300 hover:text-white text-xs font-bold transition flex items-center gap-2 cursor-pointer"
        >
          <ArrowLeft className="w-4 h-4 text-red-500" />
          <span>Back to Main Dashboard</span>
        </button>

        <SettingsModule onBackToDashboard={onBackToDashboard} />
      </div>
    );
  }

  const getModuleInfo = () => {
    switch (tab) {
      case 'channel-ai':
        return {
          title: 'Channel AI & Competitor Intelligence',
          description:
            'Deep AI analytics on subscriber demographics, viral topic forecasting, and automatic upload scheduling.',
          icon: Tv,
          badge: 'Gemini 2.5 Pro Live',
          accent: 'from-red-600 to-rose-600',
          stats: [
            { label: 'Audience Overlap', value: '88.4%' },
            { label: 'Niche Saturation', value: 'Low (High Demand)' },
            { label: 'Recommended Uploads', value: '3x / week' },
          ],
          features: [
            'Competitor Video Spike Counter-Strategies',
            'Automated Community Post Generator',
            'Subscriber Retention Drop-Off Heatmap',
            'Audience Peak Active Hours Optimizer',
          ],
        };
      case 'script-ai':
        return {
          title: 'Script AI & Viral Hook Synthesizer',
          description:
            'Generate full YouTube video scripts with structured intro hooks, pattern interrupts, call to actions, and sponsor slots.',
          icon: FileText,
          badge: 'Script Synth v4.2',
          accent: 'from-amber-500 to-orange-600',
          stats: [
            { label: 'Retention Prediction', value: '94.2%' },
            { label: 'Word Count Range', value: '1,800 - 3,500' },
            { label: 'Hook Impact Score', value: '98/100' },
          ],
          features: [
            '15-Second Pattern Interrupt Generator',
            'MrBeast Style Pacing & Cut Markers',
            'Automated Teleprompter Export',
            'Multi-Language Voiceover Scripts',
          ],
        };
      case 'thumbnail-ai':
        return {
          title: 'Thumbnail AI & CTR Prediction Engine',
          description:
            'Render high-contrast 4K thumbnails with face expressiveness enhancements, title text hierarchy, and predicted CTR scores.',
          icon: ImageIcon,
          badge: 'Vision Model v3.0',
          accent: 'from-rose-500 to-pink-600',
          stats: [
            { label: 'CTR Benchmark', value: '12.8% Average' },
            { label: 'Face Detection Rating', value: 'High Emotional Impact' },
            { label: 'Color Contrast', value: '99% Perfect' },
          ],
          features: [
            '4-Variant A/B Test Renderer',
            'Automatic Background Removal & Glow',
            'YouTube Search Results Simulator',
            'Font Hierarchy & Text Legibility Check',
          ],
        };
      case 'seo-ai':
        return {
          title: 'SEO AI & Tag Cluster Engine',
          description:
            'Rank #1 in YouTube search with AI-generated high CPM keyword clusters, timestamps, auto-descriptions, and pinned comments.',
          icon: Search,
          badge: 'YouTube Rank Predictor',
          accent: 'from-blue-500 to-cyan-600',
          stats: [
            { label: 'Search Rank Potential', value: '#1 - #3 Spot' },
            { label: 'Tag Cluster Volume', value: '45K Monthly Searches' },
            { label: 'Description Match', value: '100% Keyword Cohesion' },
          ],
          features: [
            'High CPM Keyword Auto-Insertion',
            'Video Chapter Marker Calculator',
            'Description Affiliate Link Organizer',
            'Multi-Language Tag Translation',
          ],
        };
      case 'affiliate-ai':
        return {
          title: 'Affiliate AI & Sponsor Matcher',
          description:
            'Automatically pair your video topics with high-payout brand sponsorships, affiliate links, and dynamic revenue links.',
          icon: DollarSign,
          badge: 'Smart Sponsor Matcher',
          accent: 'from-emerald-500 to-teal-600',
          stats: [
            { label: 'Est. Sponsor Revenue', value: '+$3,400 / video' },
            { label: 'Affiliate Conversion', value: '4.8% CTR' },
            { label: 'Active Deals', value: '12 Brands Ready' },
          ],
          features: [
            'Sponsor Pitch Email Generator',
            'Automatic Description Link Placement',
            'Real-Time Click Analytics & Earnings',
            'Legal Disclosure Auto-Insertion',
          ],
        };
      case 'video-export':
        return {
          title: 'Video Export & Multi-Platform Scheduler',
          description:
            'Export 4K HDR master files directly to YouTube, Shorts, TikTok, and Instagram Reels with custom aspect ratios.',
          icon: Download,
          badge: '4K Ultra Export',
          accent: 'from-purple-500 to-indigo-600',
          stats: [
            { label: 'Rendering Engine', value: 'Hardware Accelerated' },
            { label: 'Resolution Support', value: '4K 60FPS HDR' },
            { label: 'Auto-Crop Ratio', value: '16:9 & 9:16' },
          ],
          features: [
            'YouTube Direct API Auto-Upload',
            'Shorts / Reels Auto-Clipping Engine',
            'Subtitles & Captions Auto-Burn',
            'Scheduled Peak Hours Publishing',
          ],
        };
      default:
        return {
          title: 'CreatorOS Engine Settings',
          description:
            'Configure Gemini API keys, YouTube OAuth credentials, brand presets, and AI agent permissions.',
          icon: SettingsIcon,
          badge: 'Enterprise Config',
          accent: 'from-[#FF0000] to-rose-700',
          stats: [
            { label: 'Connected Channel', value: 'Creator Workspace (Demo)' },
            { label: 'AI Studio Key Status', value: 'Active & Verified' },
            { label: 'Security Protocols', value: 'OAuth 2.0 Encryption' },
          ],
          features: [
            'Gemini API Key Management',
            'Brand Voice & Custom Prompt Presets',
            'Sub-Agent Autonomy Thresholds',
            'Team Collaboration & Roles',
          ],
        };
    }
  };

  const info = getModuleInfo();
  const Icon = info.icon;

  return (
    <div className="space-y-6">
      {/* Top Header */}
      <div className="flex items-center justify-between">
        <button
          onClick={onBackToDashboard}
          className="px-3.5 py-2 rounded-xl bg-[#181818] border border-white/10 hover:border-white/20 text-zinc-300 hover:text-white text-xs font-bold transition flex items-center gap-2 cursor-pointer"
        >
          <ArrowLeft className="w-4 h-4 text-red-500" />
          <span>Back to Main Dashboard</span>
        </button>

        <span className="bg-red-500/10 text-red-400 text-xs font-bold px-3 py-1 rounded-full border border-red-500/30 flex items-center gap-1.5 font-mono">
          <Bot className="w-3.5 h-3.5" /> {info.badge}
        </span>
      </div>

      {/* Hero Module Card */}
      <div className="glass-card rounded-2xl p-6 border border-white/10 relative overflow-hidden">
        <div
          className={`absolute top-0 left-0 right-0 h-1 bg-gradient-to-r ${info.accent}`}
        ></div>

        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="flex items-start gap-4">
            <div
              className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${info.accent} flex items-center justify-center text-white shadow-xl shrink-0`}
            >
              <Icon className="w-7 h-7" />
            </div>

            <div>
              <h2 className="text-xl font-black text-white tracking-tight">{info.title}</h2>
              <p className="text-xs text-zinc-300 mt-1 max-w-2xl leading-relaxed">
                {info.description}
              </p>
            </div>
          </div>

          <button className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-red-600 to-rose-600 hover:from-red-500 hover:to-rose-500 text-white font-bold text-xs shadow-lg shadow-red-900/30 flex items-center gap-2 transition cursor-pointer self-start md:self-auto">
            <Zap className="w-4 h-4 fill-white" />
            <span>Launch AI Workspace</span>
          </button>
        </div>

        {/* Stats Row */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mt-6 pt-6 border-t border-white/10">
          {info.stats.map((stat, i) => (
            <div
              key={i}
              className="p-3.5 rounded-xl bg-white/[0.02] border border-white/5 font-mono"
            >
              <p className="text-[10px] text-zinc-400 uppercase tracking-wider">
                {stat.label}
              </p>
              <p className="text-base font-extrabold text-white mt-0.5">{stat.value}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Feature Capabilities Grid */}
      <div className="glass-card rounded-2xl p-6 border border-white/10 space-y-4">
        <h3 className="text-sm font-bold text-white uppercase tracking-wider font-mono flex items-center gap-2">
          <Sparkles className="w-4 h-4 text-red-500" /> Module Capabilities & Features
        </h3>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {info.features.map((feature, i) => (
            <div
              key={i}
              className="p-4 rounded-xl bg-zinc-900/50 border border-white/5 flex items-center gap-3"
            >
              <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0" />
              <span className="text-xs font-semibold text-zinc-200">{feature}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
