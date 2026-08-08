export type SidebarTab =
  | 'dashboard'
  | 'channel-ai'
  | 'script-ai'
  | 'thumbnail-ai'
  | 'seo-ai'
  | 'affiliate-ai'
  | 'video-export'
  | 'settings';

export interface AiSubEngineStatus {
  id: string;
  name: string;
  version: string;
  status: 'active' | 'idle' | 'optimizing';
  latency: string;
  accuracyRate: string;
  color: string;
}

export interface CreatorOverviewData {
  subscribers: string;
  subscribersChange: string;
  totalViews: string;
  viewsChange: string;
  estimatedRevenue: string;
  revenueChange: string;
  avgCtr: string;
  ctrChange: string;
  watchTimeHours: string;
  watchTimeChange: string;
  avgViewDuration: string;
}

export interface AnalyticsDataPoint {
  date: string;
  views: number;
  subscribers: number;
  revenue: number;
  ctr: number;
}

export interface WorkflowStage {
  id: number;
  title: string;
  iconName: string;
  status: 'completed' | 'in_progress' | 'queued' | 'ai_processing';
  activeVideoTitle: string;
  progressPercent: number;
  eta: string;
  aiActionName: string;
}

export interface RecentProject {
  id: string;
  title: string;
  thumbnailUrl: string;
  duration: string;
  status: 'Published' | 'Rendering' | 'Script Approved' | 'Thumbnail Testing' | 'SEO Processing';
  statusColor: string;
  predictedCtr: string;
  seoScore: number;
  viewsOrTarget: string;
  publishedDate: string;
  category: string;
}

export interface ActivityItem {
  id: string;
  timestamp: string;
  type: 'script' | 'thumbnail' | 'seo' | 'analytics' | 'affiliate' | 'export';
  title: string;
  description: string;
  aiBadge: string;
  status: 'completed' | 'processing' | 'alert';
}

export interface NotificationItem {
  id: string;
  title: string;
  time: string;
  read: boolean;
  type: 'success' | 'info' | 'warning';
}
