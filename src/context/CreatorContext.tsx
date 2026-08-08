import React, { createContext, useContext, useState, ReactNode } from 'react';
import { CreatorFormProfile, ChannelAiReport } from '../types/creator';

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

  const generateAiReport = (form: CreatorFormProfile): ChannelAiReport => {
    const isTech = form.category.toLowerCase().includes('tech') || form.category.toLowerCase().includes('coding') || form.category.toLowerCase().includes('ai');
    
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
