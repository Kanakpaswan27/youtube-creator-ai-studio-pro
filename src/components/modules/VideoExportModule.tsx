import React, { useState } from 'react';
import {
  Download,
  Copy,
  Check,
  FileCode,
  FileText,
  Send,
  Sparkles,
  Zap,
  CheckCircle2,
  Share2,
  Tv,
  Image as ImageIcon,
  Search,
  DollarSign,
  Layers,
  Code,
  Globe,
  RefreshCw,
  Info,
  Terminal,
  ExternalLink,
  ShieldCheck,
  Flame,
  ArrowRight,
  Eye,
} from 'lucide-react';
import { useCreator } from '../../context/CreatorContext';

interface ExportData {
  channelProfile: {
    channelName: string;
    subscribers: string;
    niche: string;
    targetAudience: string;
    brandTone: string;
  };
  script: {
    title: string;
    duration: string;
    hook: string;
    chapters: { time: string; title: string }[];
    callToAction: string;
  };
  thumbnail: {
    prompt: string;
    style: string;
    mood: string;
    palette: string;
    aspectRatio: string;
    overlayText: string;
    predictedCtr: string;
  };
  seo: {
    focusKeyword: string;
    viralTitle: string;
    keywordsCount: number;
    keywordsList: string[];
    tagsString: string;
    searchIntent: string;
  };
  affiliateLinks: {
    amazon: string;
    flipkart: string;
    meesho: string;
    estRevenue: string;
  };
  description: string;
}

const DEFAULT_PACKAGE_DATA: ExportData = {
  channelProfile: {
    channelName: 'TechVerse AI Studio',
    subscribers: '1.24M Subscribers',
    niche: 'AI Coding & SaaS Software',
    targetAudience: 'Developers, Solopreneurs & Tech Enthusiasts',
    brandTone: 'High Energy, Actionable Authority & Professional',
  },
  script: {
    title: 'I Built a Full-Stack AI App in 10 Minutes (No Code Required!)',
    duration: '08:45',
    hook: '😱 What if you could build a complete full-stack web application with database and live AI capabilities in less than 10 minutes? In this video, I am showing you the exact blueprint...',
    chapters: [
      { time: '00:00', title: 'The 10-Minute AI Challenge' },
      { time: '01:15', title: 'Architecture & Stack Setup (Vite + React 19)' },
      { time: '03:40', title: 'Wiring Gemini API & Database Schema' },
      { time: '06:10', title: 'Testing Sub-Agent Autonomous Workflow' },
      { time: '08:00', title: 'One-Click Cloud Deployment & Results' },
    ],
    callToAction: 'If this saved you 50 hours of coding, hit subscribe and check the link in the description to grab the full source code!',
  },
  thumbnail: {
    prompt: 'Hyper-detailed 3D Octane render of a young developer with an ecstatic expression holding a floating holographic neon-cyan AI sphere, high contrast yellow typography reading "100X AGENT!"',
    style: 'Cyberpunk & Neon Tech',
    mood: 'High Energy & Shocked',
    palette: 'Neon Red & Cyber Cyan (#FF0055, #00DFD8)',
    aspectRatio: '16:9 (1280x720 px)',
    overlayText: '100X AGENT!',
    predictedCtr: '12.8% (Top 5% Benchmark)',
  },
  seo: {
    focusKeyword: 'build full stack app with ai 2026',
    viralTitle: 'I Built a Full-Stack AI App in 10 Minutes (No Code Required!)',
    keywordsCount: 20,
    keywordsList: [
      'build full stack app with ai 2026',
      'gemini flash AI studio tutorial',
      'ai coding agent full setup guide',
      'best ai app builders for developers',
      'how to build web app without coding',
      'react 19 vite full stack project',
      'monetize ai SaaS in 30 days',
      'ai workflow automation 2026',
      'claude vs gemini vs gpt-4o coding',
      'zero to production full stack ai',
      'express vite typescript template',
      'high cpm tech keywords 2026',
      'ai agent prompt engineering tricks',
      'building web app with cloud database',
      'step by step ai studio tutorial',
      'automated code generation tools',
      'full stack developer roadmap 2026',
      'no code vs low code vs ai coding',
      'deploy react app to cloud run',
      'future of software engineering ai',
    ],
    tagsString:
      'ai app development 2026, build full stack app with ai, gemini ai studio tutorial, ai coding agent, react 19 project tutorial, build web app without code, monetize ai saas, claude vs gemini coding, ai workflow automation',
    searchIntent: 'How-To / High CPM',
  },
  affiliateLinks: {
    amazon: 'https://yt.link/amzn-iphone15',
    flipkart: 'https://yt.link/fk-iphone15',
    meesho: 'https://yt.link/msho-case15',
    estRevenue: '₹1,00,975 / video',
  },
  description: `🚀 In this video, we build a production-ready full-stack AI application in under 10 minutes using Gemini AI Studio!

⏱️ CHAPTER TIMESTAMPS:
00:00 - The 10-Minute AI Challenge
01:15 - Architecture & Stack Setup (Vite + React 19)
03:40 - Wiring Gemini API & Database Schema
06:10 - Testing Sub-Agent Autonomous Workflow
08:00 - One-Click Cloud Deployment & Results

🛒 GEAR & AFFILIATE LINKS:
- 📱 Amazon India Deal: https://yt.link/amzn-iphone15
- 💻 Flipkart Store: https://yt.link/fk-iphone15
- 🛍️ Meesho Accessories: https://yt.link/msho-case15

🔥 KEYWORDS & TAGS:
#AICoding #FullStackApp #BuildWithAI #GeminiAI #WebDev2026 #DeveloperTools

⚠️ DISCLOSURE:
Some links above are affiliate links where we earn a small commission at no additional cost to you. Thank you for supporting TechVerse AI Studio!`,
};

export const VideoExportModule: React.FC<{ onBackToDashboard?: () => void }> = () => {
  const { addActivity, incrementStats, showToast, runPipeline, pipeline, pipelineData } = useCreator();
  const [activeFormat, setActiveFormat] = useState<'json' | 'markdown' | 'text' | 'webhook'>('json');

  const [copiedKey, setCopiedKey] = useState<string | null>(null);
  const [webhookSent, setWebhookSent] = useState<boolean>(false);
  const [webhookUrl, setWebhookUrl] = useState<string>(
    'https://hooks.zapier.com/v1/workflows/creator-studio-export'
  );

  // Dynamic state populated from multi-agent pipelineData
  const exportPackageData: ExportData = {
    channelProfile: {
      channelName: pipelineData.channelHandle || '@kanakkumari_tech',
      subscribers: '1.24M Subscribers',
      niche: pipelineData.category || 'Tech & Coding',
      targetAudience: pipelineData.audience || 'Junior & Senior Developers',
      brandTone: pipelineData.personaArchetype || 'Technical Thought Leader & Builder',
    },
    script: {
      title: pipelineData.viralTitle || pipelineData.scriptTitle || 'Building Full-Stack AI Apps in 2026',
      duration: '14:20',
      hook: pipelineData.descriptionHook || '🚀 Are you looking to master Building Full-Stack AI Apps in 2026?',
      chapters: [
        { time: '00:00', title: 'The 2026 AI Agent Architecture' },
        { time: '02:15', title: 'Connecting Gemini Pro Models' },
        { time: '05:40', title: 'Multi-Agent State Orchestration' },
        { time: '09:10', title: 'Live Demonstration & Benchmarks' },
        { time: '12:30', title: 'Final Deployment & Monetization' },
      ],
      callToAction: 'Hit subscribe and grab the full CreatorOS AI source code below!',
    },
    thumbnail: {
      prompt: pipelineData.thumbnailPrompt || '4K cinematic octane 3d render of developer working on glowing holographic AI studio screen',
      style: 'Cinematic Cyberpunk',
      mood: 'Shocked / Technical',
      palette: 'Neon Red & Electric Cyan',
      aspectRatio: '16:9 (3840x2160 4K)',
      overlayText: pipelineData.thumbnailOverlayText || '100X AGENT!',
      predictedCtr: pipelineData.predictedCtr || '12.8%',
    },
    seo: {
      focusKeyword: pipelineData.topKeywords?.[0] || 'building full stack ai apps 2026',
      viralTitle: pipelineData.viralTitle || 'I Tested Building Full-Stack AI Apps in 2026',
      keywordsCount: pipelineData.topKeywords?.length || 20,
      keywordsList: pipelineData.topKeywords?.length ? pipelineData.topKeywords : DEFAULT_PACKAGE_DATA.seo.keywordsList,
      tagsString: pipelineData.tags?.length ? pipelineData.tags.join(', ') : DEFAULT_PACKAGE_DATA.seo.tagsString,
      searchIntent: 'How-To / High CPM Tech',
    },
    affiliateLinks: {
      amazon: pipelineData.topAffiliateLink || 'https://amzn.to/3xK9pL2_yt_campaign',
      flipkart: 'https://fkrt.co/creatoros_deal',
      meesho: 'https://msho.co/creatoros_spec',
      estRevenue: '₹1,05,000 / video',
    },
    description: `🚀 ${pipelineData.viralTitle || pipelineData.scriptTitle}

${pipelineData.descriptionHook || 'In this video, we break down the complete step-by-step strategy.'}

⏱️ CHAPTER TIMESTAMPS:
00:00 - The 2026 AI Agent Architecture
02:15 - Connecting Gemini Pro Models
05:40 - Multi-Agent State Orchestration
09:10 - Live Demonstration & Benchmarks
12:30 - Final Deployment & Monetization

🛒 AFFILIATE & MONETIZATION LINKS:
- 📱 Top Equipment: ${pipelineData.topAffiliateLink || 'https://amzn.to/3xK9pL2_yt_campaign'}
- 💻 Tech Workspace: https://fkrt.co/creatoros_deal
- 🛍️ Accessories: https://msho.co/creatoros_spec

🔥 TAGS & KEYWORDS:
${pipelineData.tags?.map((t) => `#${t.replace(/\s+/g, '')}`).join(' ') || '#AICoding #FullStackAI'}

📊 AI PERFORMANCE SCORE: ${pipelineData.overallScore || 94}/100 Growth Score
`,
  };

  const data = exportPackageData;

  // Compile / Animate Export Package
  const handleRunExportAnimation = () => {
    runPipeline('Video Export', 'Compiling Master Creator Package Bundle', () => {
      addActivity({
        type: 'export',
        title: '✓ Metadata Creator Package Compiled',
        description: `Bundled Title, Script, Thumbnail Prompts, ${data.seo.keywordsCount} Keywords & ${data.affiliateLinks.amazon}`,
        status: 'completed',
        aiBadge: 'Export Engine v3.0',
      });
      incrementStats(1, 2.5, 4);
      showToast('✓ Consolidated Creator Package ready for YouTube & distribution!', 'success');
    });
  };

  const handleCopyText = (key: string, content: string) => {
    navigator.clipboard.writeText(content);
    setCopiedKey(key);
    setTimeout(() => setCopiedKey(null), 2000);
  };

  // FORMATTED STRINGS FOR EXPORT
  const jsonExportString = JSON.stringify(data, null, 2);

  const markdownExportString = `# 🚀 ${data.script.title}

## 📺 Channel Profile
- **Channel**: ${data.channelProfile.channelName} (${data.channelProfile.subscribers})
- **Niche**: ${data.channelProfile.niche}
- **Brand Tone**: ${data.channelProfile.brandTone}

---

## 📜 Video Script & Metadata
- **Duration**: ${data.script.duration}
- **Intro Hook**: ${data.script.hook}
- **Call To Action**: ${data.script.callToAction}

### ⏱️ Chapters
${data.script.chapters.map((c) => `- **${c.time}** - ${c.title}`).join('\n')}

---

## 🎨 Thumbnail AI Prompt Configuration
- **Prompt**: \`${data.thumbnail.prompt}\`
- **Style**: ${data.thumbnail.style}
- **Mood**: ${data.thumbnail.mood}
- **Palette**: ${data.thumbnail.palette}
- **Aspect Ratio**: ${data.thumbnail.aspectRatio}
- **Overlay Text**: ${data.thumbnail.overlayText}
- **Predicted CTR**: ${data.thumbnail.predictedCtr}

---

## 🔍 SEO Strategy & Keywords
- **Focus Keyword**: \`${data.seo.focusKeyword}\`
- **Viral Title**: "${data.seo.viralTitle}"
- **Search Intent**: ${data.seo.searchIntent}
- **Tags String**: \`${data.seo.tagsString}\`

### 🏷️ 20 Ranked Keywords
${data.seo.keywordsList.map((k, i) => `${i + 1}. ${k}`).join('\n')}

---

## 🛒 Affiliate Monetization Links
- **Amazon India**: ${data.affiliateLinks.amazon}
- **Flipkart**: ${data.affiliateLinks.flipkart}
- **Meesho**: ${data.affiliateLinks.meesho}
- **Est. Monthly Revenue**: ${data.affiliateLinks.estRevenue}

---

## 📝 YouTube Description Box Text
\`\`\`text
${data.description}
\`\`\`
`;

  const plainTextExportString = `TITLE: ${data.script.title}

DESCRIPTION:
${data.description}

TAGS:
${data.seo.tagsString}

THUMBNAIL PROMPT:
${data.thumbnail.prompt}
Overlay Text: ${data.thumbnail.overlayText}
Style: ${data.thumbnail.style}

AFFILIATE SHORT LINKS:
Amazon: ${data.affiliateLinks.amazon}
Flipkart: ${data.affiliateLinks.flipkart}
Meesho: ${data.affiliateLinks.meesho}
`;

  const webhookPayloadString = JSON.stringify(
    {
      event: 'video.package.published',
      timestamp: new Date().toISOString(),
      creator: data.channelProfile.channelName,
      video: {
        title: data.script.title,
        duration: data.script.duration,
        focusKeyword: data.seo.focusKeyword,
        tags: data.seo.keywordsList,
        description: data.description,
        thumbnailConfig: data.thumbnail,
        monetization: data.affiliateLinks,
      },
      status: 'ready_for_youtube_upload',
    },
    null,
    2
  );

  const getActiveContent = () => {
    switch (activeFormat) {
      case 'json':
        return jsonExportString;
      case 'markdown':
        return markdownExportString;
      case 'text':
        return plainTextExportString;
      case 'webhook':
        return webhookPayloadString;
    }
  };

  const handleDownloadFile = () => {
    const content = getActiveContent();
    const extMap = {
      json: 'json',
      markdown: 'md',
      text: 'txt',
      webhook: 'json',
    };
    const extension = extMap[activeFormat];
    const filename = `YouTube_Video_Package_${Date.now()}.${extension}`;

    const blob = new Blob([content], { type: 'text/plain;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = filename;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  const handleTriggerWebhook = () => {
    setWebhookSent(true);
    setTimeout(() => setWebhookSent(false), 3000);
  };

  return (
    <div className="space-y-6">
      {/* HEADER BANNER */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-white/10">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-purple-600 via-indigo-600 to-violet-600 flex items-center justify-center text-white font-bold shadow-lg shadow-purple-900/30">
            <Download className="w-5 h-5" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h2 className="text-xl font-black text-white tracking-tight">
                Video Export Workspace & Multi-Format Packager
              </h2>
              <span className="bg-purple-500/10 text-purple-400 text-xs font-bold px-2.5 py-0.5 rounded-full border border-purple-500/20 font-mono">
                Module #6
              </span>
            </div>
            <p className="text-xs text-zinc-400 mt-0.5">
              Consolidate metadata from Channel AI, Script AI, Thumbnail AI, SEO AI & Affiliate AI into unified JSON, Markdown & Webhook exports
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={handleRunExportAnimation}
            disabled={!!pipeline?.active}
            className="px-4 py-2 rounded-xl bg-gradient-to-r from-purple-600 via-indigo-600 to-violet-600 hover:from-purple-500 hover:to-indigo-500 text-white text-xs font-extrabold transition flex items-center gap-2 cursor-pointer shadow-lg shadow-purple-900/30 border border-purple-400/30 disabled:opacity-50"
          >
            <RefreshCw className={`w-4 h-4 ${pipeline?.active ? 'animate-spin' : ''}`} />
            <span>{pipeline?.active ? 'Re-Compiling...' : 'Re-Compile Export Package'}</span>
          </button>
        </div>
      </div>

      {/* SUMMARY OVERVIEW OF COLLECTED DATA MODULES */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
        {/* Module 1: Channel Profile */}
        <div className="glass-card rounded-xl p-3 border border-white/10 space-y-1">
          <div className="flex items-center justify-between">
            <span className="text-[10px] font-bold text-zinc-400">1. Channel</span>
            <Tv className="w-3.5 h-3.5 text-red-500" />
          </div>
          <p className="text-xs font-bold text-white truncate">{data.channelProfile.channelName}</p>
          <span className="text-[9px] font-mono text-emerald-400">Verified Profile</span>
        </div>

        {/* Module 2: Script */}
        <div className="glass-card rounded-xl p-3 border border-white/10 space-y-1">
          <div className="flex items-center justify-between">
            <span className="text-[10px] font-bold text-zinc-400">2. Script</span>
            <FileText className="w-3.5 h-3.5 text-amber-500" />
          </div>
          <p className="text-xs font-bold text-white truncate">{data.script.duration} Length</p>
          <span className="text-[9px] font-mono text-amber-400">5 Chapters Synced</span>
        </div>

        {/* Module 3: Thumbnail */}
        <div className="glass-card rounded-xl p-3 border border-white/10 space-y-1">
          <div className="flex items-center justify-between">
            <span className="text-[10px] font-bold text-zinc-400">3. Thumbnail</span>
            <ImageIcon className="w-3.5 h-3.5 text-rose-500" />
          </div>
          <p className="text-xs font-bold text-white truncate">{data.thumbnail.overlayText}</p>
          <span className="text-[9px] font-mono text-rose-400">{data.thumbnail.predictedCtr} CTR</span>
        </div>

        {/* Module 4: SEO */}
        <div className="glass-card rounded-xl p-3 border border-white/10 space-y-1">
          <div className="flex items-center justify-between">
            <span className="text-[10px] font-bold text-zinc-400">4. SEO Keywords</span>
            <Search className="w-3.5 h-3.5 text-blue-500" />
          </div>
          <p className="text-xs font-bold text-white truncate">20 Keywords</p>
          <span className="text-[9px] font-mono text-blue-400">Tags Box Generated</span>
        </div>

        {/* Module 5: Affiliate */}
        <div className="glass-card rounded-xl p-3 border border-white/10 space-y-1">
          <div className="flex items-center justify-between">
            <span className="text-[10px] font-bold text-zinc-400">5. Affiliate</span>
            <DollarSign className="w-3.5 h-3.5 text-emerald-500" />
          </div>
          <p className="text-xs font-bold text-white truncate">3 Store Links</p>
          <span className="text-[9px] font-mono text-emerald-400">{data.affiliateLinks.estRevenue}</span>
        </div>

        {/* Module 6: Description */}
        <div className="glass-card rounded-xl p-3 border border-white/10 space-y-1">
          <div className="flex items-center justify-between">
            <span className="text-[10px] font-bold text-zinc-400">6. Description</span>
            <Code className="w-3.5 h-3.5 text-purple-500" />
          </div>
          <p className="text-xs font-bold text-white truncate">YouTube Ready</p>
          <span className="text-[9px] font-mono text-purple-400">Complete Format</span>
        </div>
      </div>

      {/* EXPORT WORKSPACE PREVIEW CARD WITH FORMAT SWITCHER */}
      <div className="glass-card rounded-2xl p-6 border border-white/10 space-y-5">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-white/10 pb-4">
          {/* FORMAT TABS SWITCHER */}
          <div className="flex items-center gap-1.5 p-1 rounded-xl bg-[#141414] border border-white/10 text-xs font-mono">
            <button
              onClick={() => setActiveFormat('json')}
              className={`px-3.5 py-2 rounded-lg font-bold transition flex items-center gap-1.5 cursor-pointer ${
                activeFormat === 'json'
                  ? 'bg-purple-600 text-white shadow-md'
                  : 'text-zinc-400 hover:text-white'
              }`}
            >
              <FileCode className="w-3.5 h-3.5" />
              <span>JSON Format</span>
            </button>
            <button
              onClick={() => setActiveFormat('markdown')}
              className={`px-3.5 py-2 rounded-lg font-bold transition flex items-center gap-1.5 cursor-pointer ${
                activeFormat === 'markdown'
                  ? 'bg-purple-600 text-white shadow-md'
                  : 'text-zinc-400 hover:text-white'
              }`}
            >
              <FileText className="w-3.5 h-3.5" />
              <span>Markdown (.md)</span>
            </button>
            <button
              onClick={() => setActiveFormat('text')}
              className={`px-3.5 py-2 rounded-lg font-bold transition flex items-center gap-1.5 cursor-pointer ${
                activeFormat === 'text'
                  ? 'bg-purple-600 text-white shadow-md'
                  : 'text-zinc-400 hover:text-white'
              }`}
            >
              <Terminal className="w-3.5 h-3.5" />
              <span>Plain Text</span>
            </button>
            <button
              onClick={() => setActiveFormat('webhook')}
              className={`px-3.5 py-2 rounded-lg font-bold transition flex items-center gap-1.5 cursor-pointer ${
                activeFormat === 'webhook'
                  ? 'bg-purple-600 text-white shadow-md'
                  : 'text-zinc-400 hover:text-white'
              }`}
            >
              <Send className="w-3.5 h-3.5" />
              <span>Webhook API Payload</span>
            </button>
          </div>

          {/* DOWNLOAD & COPY BUTTONS */}
          <div className="flex items-center gap-2">
            <button
              onClick={handleDownloadFile}
              className="px-3.5 py-2 rounded-xl bg-zinc-900 border border-white/10 hover:border-white/20 text-white text-xs font-bold transition flex items-center gap-1.5 cursor-pointer"
            >
              <Download className="w-4 h-4 text-purple-400" />
              <span>Download File</span>
            </button>

            <button
              onClick={() => handleCopyText('active-format', getActiveContent())}
              className="px-4 py-2 rounded-xl bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-500 hover:to-indigo-500 text-white text-xs font-bold transition flex items-center gap-1.5 cursor-pointer shadow-md shadow-purple-900/30 border border-purple-400/30"
            >
              {copiedKey === 'active-format' ? (
                <>
                  <Check className="w-4 h-4 text-emerald-300" />
                  <span>Copied to Clipboard!</span>
                </>
              ) : (
                <>
                  <Copy className="w-4 h-4" />
                  <span>Copy {activeFormat.toUpperCase()}</span>
                </>
              )}
            </button>
          </div>
        </div>

        {/* WEBHOOK URL TRIGGER BAR (If Webhook Tab Selected) */}
        {activeFormat === 'webhook' && (
          <div className="p-4 rounded-xl bg-purple-950/20 border border-purple-500/30 space-y-3">
            <div className="flex items-center justify-between text-xs">
              <span className="font-bold text-purple-300 flex items-center gap-1.5">
                <Globe className="w-4 h-4" />
                Zapier / Make.com Webhook Endpoint URL
              </span>
              <span className="text-[10px] font-mono text-emerald-400">REST POST Ready</span>
            </div>

            <div className="flex items-center gap-2">
              <input
                type="url"
                value={webhookUrl}
                onChange={(e) => setWebhookUrl(e.target.value)}
                className="flex-1 glass-input rounded-xl px-3.5 py-2 text-xs text-white font-mono placeholder-zinc-500"
              />
              <button
                onClick={handleTriggerWebhook}
                className="px-4 py-2 rounded-xl bg-purple-600 hover:bg-purple-500 text-white text-xs font-bold transition flex items-center gap-1.5 cursor-pointer shrink-0"
              >
                <Send className="w-3.5 h-3.5" />
                <span>Send Test Event</span>
              </button>
            </div>

            {webhookSent && (
              <div className="p-2.5 rounded-lg bg-emerald-500/20 border border-emerald-500/40 text-emerald-300 text-xs font-mono flex items-center gap-2 animate-in fade-in">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>HTTP 200 OK — Webhook payload delivered successfully!</span>
              </div>
            )}
          </div>
        )}

        {/* FORMATTED CODE DISPLAY AREA */}
        <div className="relative rounded-2xl bg-[#0B0B0C] border border-white/10 overflow-hidden">
          <div className="flex items-center justify-between px-4 py-2.5 bg-zinc-950 border-b border-white/10 text-[11px] font-mono text-zinc-400">
            <span className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-red-500"></span>
              <span className="w-2.5 h-2.5 rounded-full bg-amber-500"></span>
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-500"></span>
              <span className="ml-2 text-zinc-300 font-bold">export_package.{activeFormat}</span>
            </span>

            <button
              onClick={() => handleCopyText('code-block', getActiveContent())}
              className="text-zinc-400 hover:text-white transition flex items-center gap-1 cursor-pointer"
            >
              {copiedKey === 'code-block' ? (
                <Check className="w-3.5 h-3.5 text-emerald-400" />
              ) : (
                <Copy className="w-3.5 h-3.5" />
              )}
              <span>{copiedKey === 'code-block' ? 'Copied' : 'Copy Code'}</span>
            </button>
          </div>

          <pre className="p-5 font-mono text-xs text-zinc-200 leading-relaxed overflow-x-auto max-h-[500px] selection:bg-purple-500 selection:text-white">
            <code>{getActiveContent()}</code>
          </pre>
        </div>
      </div>
    </div>
  );
};
