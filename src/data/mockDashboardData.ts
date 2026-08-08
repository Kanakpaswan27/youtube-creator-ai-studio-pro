import {
  AiSubEngineStatus,
  AnalyticsDataPoint,
  CreatorOverviewData,
  RecentProject,
  WorkflowStage,
  ActivityItem,
  NotificationItem,
} from '../types/dashboard';

export const AI_ENGINE_STATUS: {
  mainModel: string;
  provider: string;
  overallStatus: string;
  uptime: string;
  tokensPerSec: string;
  monthlyQuotaUsed: number;
  monthlyQuotaTotal: number;
  subEngines: AiSubEngineStatus[];
} = {
  mainModel: 'Gemini 2.5 Pro Ultra Agent',
  provider: 'Google AI Studio Core',
  overallStatus: 'Operational (100% Health)',
  uptime: '99.98%',
  tokensPerSec: '14,250 tokens/s',
  monthlyQuotaUsed: 84200,
  monthlyQuotaTotal: 100000,
  subEngines: [
    {
      id: 'script-gen',
      name: 'Script Synth v4.2',
      version: 'v4.2-pro',
      status: 'active',
      latency: '18ms',
      accuracyRate: '98.4%',
      color: '#FF0000',
    },
    {
      id: 'vision-thumb',
      name: 'Thumbnail Vision & CTR Model',
      version: 'v3.0-flash',
      status: 'active',
      latency: '34ms',
      accuracyRate: '96.8%',
      color: '#FF4D4D',
    },
    {
      id: 'seo-rank',
      name: 'YouTube Search Rank Predictor',
      version: 'v2.1-nitro',
      status: 'optimizing',
      latency: '22ms',
      accuracyRate: '99.1%',
      color: '#38BDF8',
    },
    {
      id: 'affiliate-ai',
      name: 'Smart Sponsor & Link Matcher',
      version: 'v1.8-auto',
      status: 'active',
      latency: '15ms',
      accuracyRate: '95.2%',
      color: '#10B981',
    },
  ],
};

export const CREATOR_OVERVIEW: CreatorOverviewData = {
  subscribers: '142,850',
  subscribersChange: '+12.4% this month',
  totalViews: '2,480,910',
  viewsChange: '+18.7% vs last 30d',
  estimatedRevenue: '$28,420.50',
  revenueChange: '+24.1% RPM peak',
  avgCtr: '9.4%',
  ctrChange: '+1.8% benchmark',
  watchTimeHours: '184.2K hrs',
  watchTimeChange: '+15.3%',
  avgViewDuration: '8m 42s',
};

export const ANALYTICS_GRAPH_DATA: AnalyticsDataPoint[] = [
  { date: 'Jul 10', views: 42000, subscribers: 1200, revenue: 480, ctr: 7.2 },
  { date: 'Jul 14', views: 58000, subscribers: 1800, revenue: 650, ctr: 8.1 },
  { date: 'Jul 18', views: 51000, subscribers: 1450, revenue: 590, ctr: 7.8 },
  { date: 'Jul 22', views: 89000, subscribers: 2900, revenue: 1120, ctr: 9.8 },
  { date: 'Jul 26', views: 112000, subscribers: 3800, revenue: 1480, ctr: 11.2 },
  { date: 'Jul 30', views: 98000, subscribers: 3100, revenue: 1310, ctr: 10.4 },
  { date: 'Aug 03', views: 135000, subscribers: 4500, revenue: 1890, ctr: 12.1 },
  { date: 'Aug 07', views: 168000, subscribers: 5800, revenue: 2450, ctr: 13.5 },
];

export const WORKFLOW_STAGES: WorkflowStage[] = [
  {
    id: 1,
    title: 'Idea & Trend Intelligence',
    iconName: 'Sparkles',
    status: 'completed',
    activeVideoTitle: 'AI Autonomous Agents in 2026',
    progressPercent: 100,
    eta: 'Completed',
    aiActionName: 'Extracted top 5 viral search topics with high CPM potential',
  },
  {
    id: 2,
    title: 'Script & Hook AI',
    iconName: 'FileText',
    status: 'completed',
    activeVideoTitle: 'AI Autonomous Agents in 2026',
    progressPercent: 100,
    eta: 'Completed',
    aiActionName: 'Generated 3 high-retention opening hooks (94% retention predicted)',
  },
  {
    id: 3,
    title: 'Thumbnail AI Rendering',
    iconName: 'Image',
    status: 'in_progress',
    activeVideoTitle: 'AI Autonomous Agents in 2026',
    progressPercent: 75,
    eta: '2 mins remaining',
    aiActionName: 'Rendering 4 high-contrast facial expressiveness variants',
  },
  {
    id: 4,
    title: 'SEO & Metadata Auto-Fill',
    iconName: 'Search',
    status: 'queued',
    activeVideoTitle: 'AI Autonomous Agents in 2026',
    progressPercent: 20,
    eta: 'Pending step 3',
    aiActionName: 'Queued tag cluster, chapter timestamps & description links',
  },
  {
    id: 5,
    title: 'Video Export & Scheduler',
    iconName: 'Video',
    status: 'queued',
    activeVideoTitle: 'AI Autonomous Agents in 2026',
    progressPercent: 0,
    eta: 'Scheduled for 6:00 PM EST',
    aiActionName: 'Targeting peak subscriber active window',
  },
];

export const RECENT_PROJECTS: RecentProject[] = [
  {
    id: 'proj-1',
    title: 'I Built a $100K/Mo AI Agent Platform in 48 Hours',
    thumbnailUrl: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=600&q=80',
    duration: '14:22',
    status: 'Published',
    statusColor: 'bg-emerald-500/20 text-emerald-400 border-emerald-500/30',
    predictedCtr: '12.8%',
    seoScore: 98,
    viewsOrTarget: '482.5K views',
    publishedDate: '2 days ago',
    category: 'Tech & Coding',
  },
  {
    id: 'proj-2',
    title: 'Gemini 2.5 Pro vs GPT-5: The Ultimate Creator Benchmark',
    thumbnailUrl: 'https://images.unsplash.com/photo-1620712943543-bcc4688e7485?auto=format&fit=crop&w=600&q=80',
    duration: '18:45',
    status: 'Published',
    statusColor: 'bg-emerald-500/20 text-emerald-400 border-emerald-500/30',
    predictedCtr: '11.4%',
    seoScore: 95,
    viewsOrTarget: '298.1K views',
    publishedDate: '5 days ago',
    category: 'AI Breakdown',
  },
  {
    id: 'proj-3',
    title: '10 YouTube Secrets Nobody Tells You About the Algorithm',
    thumbnailUrl: 'https://images.unsplash.com/photo-1550745165-9bc0b252726f?auto=format&fit=crop&w=600&q=80',
    duration: '12:08',
    status: 'Thumbnail Testing',
    statusColor: 'bg-amber-500/20 text-amber-400 border-amber-500/30',
    predictedCtr: '14.2%',
    seoScore: 92,
    viewsOrTarget: 'Target: 500K+',
    publishedDate: 'A/B Testing Stage',
    category: 'Creator Advice',
  },
  {
    id: 'proj-4',
    title: 'Building CreatorOS: The Future of YouTube Automation',
    thumbnailUrl: 'https://images.unsplash.com/photo-1633356122544-f134324a6cee?auto=format&fit=crop&w=600&q=80',
    duration: '16:50',
    status: 'Rendering',
    statusColor: 'bg-red-500/20 text-red-400 border-red-500/30',
    predictedCtr: '13.1%',
    seoScore: 99,
    viewsOrTarget: 'Processing 4K HDR',
    publishedDate: 'Scheduled 6 PM',
    category: 'SaaS / Dev',
  },
];

export const ACTIVITY_FEED: ActivityItem[] = [
  {
    id: 'act-1',
    timestamp: '2 minutes ago',
    type: 'thumbnail',
    title: 'Thumbnail AI Variant Generated',
    description: 'Rendered Variant B with red glow facial outline (+2.4% expected CTR lift).',
    aiBadge: 'Thumbnail Vision Engine',
    status: 'completed',
  },
  {
    id: 'act-2',
    timestamp: '14 minutes ago',
    type: 'seo',
    title: 'SEO Auto-Optimization Complete',
    description: 'Generated 30 high-volume tags, 5 chapter markers, and automated pinned comment.',
    aiBadge: 'YouTube Rank Predictor',
    status: 'completed',
  },
  {
    id: 'act-3',
    timestamp: '45 minutes ago',
    type: 'script',
    title: 'Viral Hook Polished',
    description: 'Applied "Pattern Interrupt" hook strategy to first 15 seconds of script.',
    aiBadge: 'Script Synth v4.2',
    status: 'completed',
  },
  {
    id: 'act-4',
    timestamp: '1 hour ago',
    type: 'affiliate',
    title: 'Smart Sponsor Links Synced',
    description: 'Matched 3 relevant dev tools affiliate sponsors with estimated $1,400 bonus revenue.',
    aiBadge: 'Affiliate Matcher',
    status: 'completed',
  },
  {
    id: 'act-5',
    timestamp: '2 hours ago',
    type: 'analytics',
    title: 'Competitor Spike Detected',
    description: 'Channel "Tech AI Daily" uploaded a video on same topic. SEO AI auto-countered keywords.',
    aiBadge: 'Realtime Radar',
    status: 'alert',
  },
];

export const NOTIFICATIONS: NotificationItem[] = [
  {
    id: 'notif-1',
    title: 'Your thumbnail test for Video #104 reached 13.8% CTR (Top 1%)',
    time: '5m ago',
    read: false,
    type: 'success',
  },
  {
    id: 'notif-2',
    title: 'Gemini 2.5 Pro finished generating 12 short clip script variations',
    time: '22m ago',
    read: false,
    type: 'info',
  },
  {
    id: 'notif-3',
    title: 'RPM increased by +14.2% following auto-inserted mid-roll ad placement',
    time: '1h ago',
    read: true,
    type: 'success',
  },
  {
    id: 'notif-4',
    title: 'Kanak Kumari added a new AI script template: "3-Part Storytelling Framework"',
    time: '3h ago',
    read: true,
    type: 'info',
  },
];
