import React, { createContext, useContext, useState, ReactNode } from 'react';
import { CreatorFormProfile, ChannelAiReport } from '../types/creator';

export interface LiveActivityItem {
  id: string;
  type: 'scan' | 'script' | 'thumbnail' | 'seo' | 'affiliate' | 'export';
  title: string;
  description: string;
  timestamp: string;
  status: 'completed' | 'alert' | 'in_progress';
  aiBadge: string;
}

export interface SessionStats {
  aiTasksCompleted: number;
  timeSavedHours: number;
  generatedAssets: number;
  seoScore: number;
  creatorProductivity: number;
  revenueOpportunities: string;
  subscribersEstimate: string;
  predictedViews: string;
}

export interface ToastNotification {
  id: string;
  message: string;
  type: 'success' | 'info' | 'warning';
}

export interface PipelineAgentData {
  projectName: string;
  topic: string;
  channelHandle: string;
  category: string;
  audience: string;

  // Agent 1: Channel Scan
  channelScanned: boolean;
  overallScore: number;
  personaArchetype: string;

  // Agent 2: SEO
  seoGenerated: boolean;
  viralTitle: string;
  topKeywords: string[];
  descriptionHook: string;
  tags: string[];

  // Agent 3: Script & Description
  scriptGenerated: boolean;
  scriptTitle: string;
  chaptersCount: number;
  wordCount: number;

  // Agent 4: Thumbnail Engine
  thumbnailGenerated: boolean;
  thumbnailOverlayText: string;
  thumbnailPrompt: string;
  thumbnailImageUrl: string;
  predictedCtr: string;

  // Agent 5: Affiliate AI
  affiliateGenerated: boolean;
  affiliateTag: string;
  affiliateLinksCount: number;
  topAffiliateLink: string;

  // Agent 6: Export Package
  exportCompiled: boolean;
  exportCompiledAt: string;
}

export interface PipelineProgress {
  active: boolean;
  moduleName: string;
  actionTitle: string;
  stepIndex: number;
  progressPercent: number;
  stepMessage: string;
}

interface CreatorContextType {
  profile: CreatorFormProfile;
  setProfile: React.Dispatch<React.SetStateAction<CreatorFormProfile>>;
  avatarUrl: string;
  setAvatarUrl: (url: string) => void;
  uploadAvatarFile: (file: File) => Promise<string>;
  report: ChannelAiReport | null;
  setReport: React.Dispatch<React.SetStateAction<ChannelAiReport | null>>;
  isScanning: boolean;
  setIsScanning: React.Dispatch<React.SetStateAction<boolean>>;
  hasCompletedScan: boolean;
  setHasCompletedScan: React.Dispatch<React.SetStateAction<boolean>>;
  generateAiReport: (form: CreatorFormProfile) => ChannelAiReport;

  // Multi-Agent Workflow State Data Flow
  pipelineData: PipelineAgentData;
  updatePipelineData: (updates: Partial<PipelineAgentData>) => void;

  // New Live Session State
  activities: LiveActivityItem[];
  addActivity: (activity: Omit<LiveActivityItem, 'id' | 'timestamp'>) => void;
  stats: SessionStats;
  updateStats: (updates: Partial<SessionStats>) => void;
  incrementStats: (tasksCompleted?: number, hoursSaved?: number, assets?: number) => void;

  // Toast Notifications
  toast: ToastNotification | null;
  showToast: (message: string, type?: 'success' | 'info' | 'warning') => void;

  // AI Pipeline Orchestration
  pipeline: PipelineProgress | null;
  runPipeline: (
    moduleName: string,
    actionTitle: string,
    onComplete: () => void
  ) => void;
}

const DEFAULT_AVATAR =
  'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=300&q=80';

const DEFAULT_PROFILE: CreatorFormProfile = {
  creatorName: 'Kanak Kumari',
  channelName: 'Creator Workspace (Demo)',
  channelHandle: '@kanakkumari_tech',
  category: 'Tech & Coding',
  experienceLevel: 'Advanced Creator',
  targetAudience: 'Developers, AI Enthusiasts & Tech Entrepreneurs',
  uploadFrequency: '2-3 videos / week',
  avatarUrl: DEFAULT_AVATAR,
};

const INITIAL_ACTIVITIES: LiveActivityItem[] = [
  {
    id: 'act-1',
    type: 'thumbnail',
    title: '4K Thumbnail Synthesized',
    description: 'Rendered "100X AGENT!" thumbnail with +12.8% CTR prediction.',
    timestamp: 'Just now',
    status: 'completed',
    aiBadge: 'Vision Model v3.0',
  },
  {
    id: 'act-2',
    type: 'script',
    title: 'Script Chaptering Optimized',
    description: 'Inserted 5 pattern interrupts & teleprompter cues for 8:45 duration.',
    timestamp: '14 mins ago',
    status: 'completed',
    aiBadge: 'Script Synth v4.2',
  },
  {
    id: 'act-3',
    type: 'seo',
    title: '20 SEO Keywords Indexed',
    description: 'Targeting "build full stack app with ai 2026" with low competition score 24.',
    timestamp: '32 mins ago',
    status: 'completed',
    aiBadge: 'Gemini Search Grounding',
  },
  {
    id: 'act-4',
    type: 'affiliate',
    title: 'Multi-Store Links Generated',
    description: 'Created short links for Amazon, Flipkart & Meesho with UTM campaign tracking.',
    timestamp: '1 hour ago',
    status: 'completed',
    aiBadge: 'Monetization Engine',
  },
  {
    id: 'act-5',
    type: 'scan',
    title: 'Channel Scan Completed',
    description: 'Scanned @kanakkumari_tech — 94/100 AI Growth Score achieved.',
    timestamp: '2 hours ago',
    status: 'completed',
    aiBadge: 'Competitor Intelligence',
  },
];

const INITIAL_STATS: SessionStats = {
  aiTasksCompleted: 18,
  timeSavedHours: 42.5,
  generatedAssets: 34,
  seoScore: 94,
  creatorProductivity: 92,
  revenueOpportunities: '₹1,24,500',
  subscribersEstimate: '1.24M',
  predictedViews: '2.48M',
};

const PIPELINE_STEPS = [
  '1. Scanning Channel Context & Workspace...',
  '2. Understanding Target Audience Psychographics...',
  '3. Optimizing SEO & CTR Benchmarks...',
  '4. Generating Production-Ready Output...',
  '5. Validating Quality Metrics & Rules...',
  '6. Complete & Synced to Live Workspace!',
];

const INITIAL_PIPELINE_DATA: PipelineAgentData = {
  projectName: '100X AI Studio Agent Masterclass',
  topic: 'Building Full-Stack AI Apps in 2026 with Gemini',
  channelHandle: '@kanakkumari_tech',
  category: 'Tech & Coding',
  audience: 'Junior & Senior Developers',

  channelScanned: true,
  overallScore: 94,
  personaArchetype: 'Technical Thought Leader & Builder',

  seoGenerated: true,
  viralTitle: 'I Tested Building Full-Stack AI Apps in 2026 (The Results Surprised Everyone!)',
  topKeywords: [
    'building full-stack ai apps tutorial 2026',
    'how to ai app step by step',
    'complete ai app masterclass 2026',
    'monetize ai app in 2026',
  ],
  descriptionHook: '🚀 Are you looking to master Building Full-Stack AI Apps in 2026 with Gemini? In this video, we break down the exact step-by-step strategy for developers to get 10X faster results!',
  tags: ['ai apps 2026', 'how to ai app', 'gemini tutorial', 'full stack coding'],

  scriptGenerated: true,
  scriptTitle: 'Building Full-Stack AI Apps in 2026 with Gemini',
  chaptersCount: 5,
  wordCount: 1420,

  thumbnailGenerated: true,
  thumbnailOverlayText: '100X AGENT!',
  thumbnailPrompt: '4K cinematic octane 3d render of developer working on glowing holographic AI studio screen',
  thumbnailImageUrl: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=800&q=80',
  predictedCtr: '12.8%',

  affiliateGenerated: true,
  affiliateTag: 'kanak-21',
  affiliateLinksCount: 3,
  topAffiliateLink: 'https://amzn.to/3xK9pL2_yt_campaign',

  exportCompiled: true,
  exportCompiledAt: 'Just now',
};

const CreatorContext = createContext<CreatorContextType | undefined>(undefined);

export const CreatorProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [profile, setProfile] = useState<CreatorFormProfile>(() => {
    const savedAvatar = typeof window !== 'undefined' ? localStorage.getItem('creatoros_avatar_url') : null;
    return {
      ...DEFAULT_PROFILE,
      avatarUrl: savedAvatar || DEFAULT_AVATAR,
    };
  });

  const [avatarUrl, setAvatarUrlState] = useState<string>(() => {
    const savedAvatar = typeof window !== 'undefined' ? localStorage.getItem('creatoros_avatar_url') : null;
    return savedAvatar || DEFAULT_AVATAR;
  });

  const setAvatarUrl = (url: string) => {
    setAvatarUrlState(url);
    if (typeof window !== 'undefined') {
      localStorage.setItem('creatoros_avatar_url', url);
    }
    setProfile((prev) => ({ ...prev, avatarUrl: url }));
  };

  const uploadAvatarFile = (file: File): Promise<string> => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = (e) => {
        const result = e.target?.result as string;
        if (result) {
          setAvatarUrl(result);
          resolve(result);
        } else {
          reject(new Error('Failed to read file'));
        }
      };
      reader.onerror = () => reject(new Error('Error reading image file'));
      reader.readAsDataURL(file);
    });
  };

  const [report, setReport] = useState<ChannelAiReport | null>(null);
  const [isScanning, setIsScanning] = useState<boolean>(false);
  const [hasCompletedScan, setHasCompletedScan] = useState<boolean>(false);

  // Shared Multi-Agent Pipeline Data
  const [pipelineData, setPipelineData] = useState<PipelineAgentData>(INITIAL_PIPELINE_DATA);

  const updatePipelineData = (updates: Partial<PipelineAgentData>) => {
    setPipelineData((prev) => ({ ...prev, ...updates }));
  };

  // New Live Session States
  const [activities, setActivities] = useState<LiveActivityItem[]>(INITIAL_ACTIVITIES);
  const [stats, setStats] = useState<SessionStats>(INITIAL_STATS);
  const [toast, setToast] = useState<ToastNotification | null>(null);
  const [pipeline, setPipeline] = useState<PipelineProgress | null>(null);

  const showToast = (message: string, type: 'success' | 'info' | 'warning' = 'success') => {
    const newToast: ToastNotification = {
      id: `toast-${Date.now()}`,
      message,
      type,
    };
    setToast(newToast);
    setTimeout(() => {
      setToast((prev) => (prev?.id === newToast.id ? null : prev));
    }, 3500);
  };

  const addActivity = (activity: Omit<LiveActivityItem, 'id' | 'timestamp'>) => {
    const newItem: LiveActivityItem = {
      ...activity,
      id: `act-${Date.now()}`,
      timestamp: 'Just now',
    };
    setActivities((prev) => [newItem, ...prev]);
  };

  const updateStats = (updates: Partial<SessionStats>) => {
    setStats((prev) => ({ ...prev, ...updates }));
  };

  const incrementStats = (tasksCompleted = 1, hoursSaved = 2.0, assets = 1) => {
    setStats((prev) => {
      const newTasks = prev.aiTasksCompleted + tasksCompleted;
      const newHours = parseFloat((prev.timeSavedHours + hoursSaved).toFixed(1));
      const newAssets = prev.generatedAssets + assets;
      const newProd = Math.min(99, prev.creatorProductivity + 1);
      return {
        ...prev,
        aiTasksCompleted: newTasks,
        timeSavedHours: newHours,
        generatedAssets: newAssets,
        creatorProductivity: newProd,
      };
    });
  };

  const runPipeline = (
    moduleName: string,
    actionTitle: string,
    onComplete: () => void
  ) => {
    setPipeline({
      active: true,
      moduleName,
      actionTitle,
      stepIndex: 0,
      progressPercent: 0,
      stepMessage: PIPELINE_STEPS[0],
    });

    let progress = 0;
    const interval = setInterval(() => {
      progress += 4;
      if (progress >= 100) {
        clearInterval(interval);
        setPipeline({
          active: true,
          moduleName,
          actionTitle,
          stepIndex: 5,
          progressPercent: 100,
          stepMessage: PIPELINE_STEPS[5],
        });

        setTimeout(() => {
          setPipeline(null);
          onComplete();
        }, 500);
      } else {
        const stepIdx = Math.min(5, Math.floor(progress / 18));
        setPipeline({
          active: true,
          moduleName,
          actionTitle,
          stepIndex: stepIdx,
          progressPercent: progress,
          stepMessage: PIPELINE_STEPS[stepIdx],
        });
      }
    }, 60);
  };

  const generateAiReport = (form: CreatorFormProfile): ChannelAiReport => {
    const isTech =
      form.category.toLowerCase().includes('tech') ||
      form.category.toLowerCase().includes('coding') ||
      form.category.toLowerCase().includes('ai');

    const newReport: ChannelAiReport = {
      scannedAt: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      creatorPersona: {
        archetype: isTech ? 'Technical Thought Leader & Builder' : 'Dynamic Authority & Storyteller',
        summary: `Highly engaging ${form.experienceLevel.toLowerCase()} focusing on ${form.category}. Combines deep domain expertise with high-tempo visual pacing targeting ${form.targetAudience}.`,
        toneOfVoice: 'Authoritative yet approachable, high-energy, data-driven and actionable',
        unreachableCompetitorEdge: 'Deep hands-on execution speed combined with real-world AI prototype demonstrations.',
      },
      contentStyle: {
        format: 'Screen-share breakdowns + Talking head + Animated visual diagrams',
        pacing: 'Fast (120-140 cuts per 10 mins) with pattern interrupts every 15s',
        visualHookStrategy: 'Dynamic code/result preview in first 5 seconds + bold high-contrast question',
        editingDensity: 'High motion overlays, ambient dark UI sound effects, clean typography',
      },
      audienceProfile: {
        primaryAgeGroup: '22 - 38 Years (78% male / 22% female)',
        topLocations: ['United States (38%)', 'India (24%)', 'Germany (12%)', 'United Kingdom (9%)'],
        psychographics: 'High-intent builders, tech innovators, early adopters seeking tangible results over fluff',
        retentionTrigger: 'Immediate value delivery without artificial 3-minute intros',
      },
      strengths: [
        'Exceptional topic depth and rapid build demonstrations',
        'Strong visual brand consistency with YouTube dark theme UI',
        'High audience trust index with zero clickbait disappointment',
        'Solid conversion potential for software sponsorships and digital assets',
      ],
      weaknesses: [
        'Opportunity to repurpose long-form videos into 60s YouTube Shorts',
        'Initial 30s retention can drop if code setup takes longer than 20 seconds',
        'Community tab interaction could be boosted with weekly poll questions',
      ],
      uploadStrategy: {
        frequency: form.uploadFrequency,
        bestDays: ['Thursday', 'Sunday', 'Tuesday'],
        bestTimeWindow: '5:00 PM - 6:30 PM EST',
        timezone: 'EST (US Eastern)',
        optimalDuration: '14 to 18 minutes',
      },
      contentPillars: [
        {
          title: 'Full-Stack AI Prototypes',
          description: 'Step-by-step engineering of autonomous AI agents and web apps',
          projectedViews: '250K - 500K',
          estimatedRpm: '$18.50',
          targetCtr: '11.8%',
          exampleTopic: 'I Built a 100% Autonomous AI Studio Agent in 24 Hours',
        },
        {
          title: 'Model Benchmarks & Breakdowns',
          description: 'Deep dives comparing Gemini 2.5 Pro vs GPT-5 vs Claude 3.5',
          projectedViews: '180K - 350K',
          estimatedRpm: '$16.20',
          targetCtr: '10.4%',
          exampleTopic: 'Gemini 2.5 Pro vs Claude 3.5 Sonnet: The Ultimate Dev Benchmark',
        },
        {
          title: 'Creator SaaS & Monetization',
          description: 'Scaling YouTube automation & developer tools to $50k/mo',
          projectedViews: '120K - 280K',
          estimatedRpm: '$24.00',
          targetCtr: '9.8%',
          exampleTopic: 'How Developer Creators Can Build & Sell AI Micro-SaaS',
        },
      ],
      aiGrowthScore: {
        overall: 94,
        breakdown: {
          ctrPotential: 96,
          audienceRetention: 91,
          seoSynergy: 98,
          monetizationEfficiency: 92,
        },
      },
    };

    setReport(newReport);
    setHasCompletedScan(true);

    // Dynamic state updates
    addActivity({
      type: 'scan',
      title: '✓ Channel Scan Completed',
      description: `Scanned ${form.channelHandle} — 94/100 AI Growth Score generated.`,
      status: 'completed',
      aiBadge: 'Competitor Intelligence',
    });
    incrementStats(1, 3.5, 3);
    showToast('✓ Channel scan completed successfully! Stats updated.', 'success');

    return newReport;
  };

  return (
    <CreatorContext.Provider
      value={{
        profile,
        setProfile,
        avatarUrl,
        setAvatarUrl,
        uploadAvatarFile,
        report,
        setReport,
        isScanning,
        setIsScanning,
        hasCompletedScan,
        setHasCompletedScan,
        generateAiReport,

        // Multi-Agent Workflow State Data Flow
        pipelineData,
        updatePipelineData,

        // Live Session
        activities,
        addActivity,
        stats,
        updateStats,
        incrementStats,

        // Toast & Pipeline
        toast,
        showToast,
        pipeline,
        runPipeline,
      }}
    >
      {children}
    </CreatorContext.Provider>
  );
};

export const useCreator = () => {
  const context = useContext(CreatorContext);
  if (!context) {
    throw new Error('useCreator must be used within a CreatorProvider');
  }
  return context;
};

