export interface ScriptBlock {
  id: string;
  blockNumber: number;
  sectionTitle: string; // e.g., "01. Visual Pattern Interrupt Hook"
  timestampRange: string; // e.g., "0:00 - 0:15"
  scriptContent: string;
  talkingPoints: string[];
  hookSuggestions: string[];
  emotionalTone: string; // e.g., "Urgent, Captivating, Mysterious"
  bRollIdeas: string[];
  cameraAngleSuggestions: string[];
  backgroundMusicStyle: string; // e.g., "Deep Dark Synth Bassline + Subtle Heartbeat Pulse"
  engagementTrigger: string; // e.g., "Ask viewers: 'Have you built an AI agent yet? Comment below.'"
}

export interface ParsedScriptDocument {
  filename: string;
  wordCount: number;
  estimatedDuration: string;
  targetCtrScore: string;
  parsedAt: string;
  blocks: ScriptBlock[];
}
