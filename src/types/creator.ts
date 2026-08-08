export interface CreatorFormProfile {
  creatorName: string;
  channelName: string;
  channelHandle: string;
  category: string;
  experienceLevel: string;
  targetAudience: string;
  uploadFrequency: string;
  avatarUrl?: string;
}

export interface ContentPillar {
  title: string;
  description: string;
  projectedViews: string;
  estimatedRpm: string;
  targetCtr: string;
  exampleTopic: string;
}

export interface ChannelAiReport {
  scannedAt: string;
  creatorPersona: {
    archetype: string;
    summary: string;
    toneOfVoice: string;
    unreachableCompetitorEdge: string;
  };
  contentStyle: {
    format: string;
    pacing: string;
    visualHookStrategy: string;
    editingDensity: string;
  };
  audienceProfile: {
    primaryAgeGroup: string;
    topLocations: string[];
    psychographics: string;
    retentionTrigger: string;
  };
  strengths: string[];
  weaknesses: string[];
  uploadStrategy: {
    frequency: string;
    bestDays: string[];
    bestTimeWindow: string;
    timezone: string;
    optimalDuration: string;
  };
  contentPillars: ContentPillar[];
  aiGrowthScore: {
    overall: number;
    breakdown: {
      ctrPotential: number;
      audienceRetention: number;
      seoSynergy: number;
      monetizationEfficiency: number;
    };
  };
}
