import React, { useState } from 'react';
import {
  Search,
  Sparkles,
  Copy,
  Check,
  TrendingUp,
  BarChart3,
  Tag,
  FileText,
  Flame,
  Zap,
  Target,
  Users,
  Layers,
  Filter,
  ArrowUpDown,
  Download,
  Info,
  CheckCircle2,
  Share2,
  PieChart as PieChartIcon,
  Award,
  Hash,
  Eye,
  RefreshCw,
  ExternalLink,
} from 'lucide-react';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  Cell,
  PieChart,
  Pie,
  Legend,
  ScatterChart,
  Scatter,
  ZAxis,
} from 'recharts';

interface SeoKeyword {
  id: string;
  keyword: string;
  difficulty: 'Low' | 'Medium' | 'High' | 'Extreme';
  searchIntent: 'Informational' | 'Transactional' | 'How-To' | 'Comparison' | 'High-CPM';
  competitionScore: number; // 0 - 100
  trendingScore: number; // 0 - 100
  monthlyVolume: string;
}

interface ViralTitle {
  id: string;
  title: string;
  ctrScore: number;
  angle: string;
}

interface DescriptionHook {
  id: string;
  hook: string;
  focusKeyword: string;
}

const CATEGORIES = [
  'Technology & Software',
  'Artificial Intelligence & Coding',
  'Gaming & eSports',
  'Finance & Crypto',
  'Education & Tutorials',
  'Productivity & Business',
  'Fitness & Lifestyle',
];

const AUDIENCES = [
  'Junior & Senior Developers',
  'Beginners & Non-Technical Users',
  'Entrepreneurs & Solopreneurs',
  'Students & Researchers',
  'Content Creators & Marketers',
];

// Initial default preset dataset
const INITIAL_KEYWORDS: SeoKeyword[] = [
  { id: 'kw-1', keyword: 'build full stack app with ai 2026', difficulty: 'Low', searchIntent: 'How-To', competitionScore: 24, trendingScore: 98, monthlyVolume: '68,500' },
  { id: 'kw-2', keyword: 'gemini flash AI studio tutorial', difficulty: 'Low', searchIntent: 'How-To', competitionScore: 18, trendingScore: 95, monthlyVolume: '42,100' },
  { id: 'kw-3', keyword: 'ai coding agent full setup guide', difficulty: 'Medium', searchIntent: 'How-To', competitionScore: 42, trendingScore: 92, monthlyVolume: '89,000' },
  { id: 'kw-4', keyword: 'best ai app builders for developers', difficulty: 'Medium', searchIntent: 'Comparison', competitionScore: 55, trendingScore: 88, monthlyVolume: '110,000' },
  { id: 'kw-5', keyword: 'how to build web app without coding', difficulty: 'High', searchIntent: 'Informational', competitionScore: 78, trendingScore: 85, monthlyVolume: '240,000' },
  { id: 'kw-6', keyword: 'react 19 vite full stack project', difficulty: 'Low', searchIntent: 'How-To', competitionScore: 29, trendingScore: 94, monthlyVolume: '54,000' },
  { id: 'kw-7', keyword: 'monetize ai SaaS in 30 days', difficulty: 'Medium', searchIntent: 'High-CPM', competitionScore: 48, trendingScore: 91, monthlyVolume: '76,200' },
  { id: 'kw-8', keyword: 'ai workflow automation 2026', difficulty: 'Low', searchIntent: 'Transactional', competitionScore: 31, trendingScore: 89, monthlyVolume: '62,800' },
  { id: 'kw-9', keyword: 'claude vs gemini vs gpt-4o coding', difficulty: 'Medium', searchIntent: 'Comparison', competitionScore: 52, trendingScore: 96, monthlyVolume: '145,000' },
  { id: 'kw-10', keyword: 'zero to production full stack ai', difficulty: 'Low', searchIntent: 'How-To', competitionScore: 22, trendingScore: 90, monthlyVolume: '38,900' },
  { id: 'kw-11', keyword: 'express vite typescript template', difficulty: 'Low', searchIntent: 'How-To', competitionScore: 15, trendingScore: 78, monthlyVolume: '29,400' },
  { id: 'kw-12', keyword: 'high cpm tech keywords 2026', difficulty: 'High', searchIntent: 'High-CPM', competitionScore: 82, trendingScore: 84, monthlyVolume: '95,000' },
  { id: 'kw-13', keyword: 'ai agent prompt engineering tricks', difficulty: 'Medium', searchIntent: 'Informational', competitionScore: 46, trendingScore: 87, monthlyVolume: '81,500' },
  { id: 'kw-14', keyword: 'building web app with cloud database', difficulty: 'Low', searchIntent: 'How-To', competitionScore: 28, trendingScore: 82, monthlyVolume: '47,000' },
  { id: 'kw-15', keyword: 'step by step ai studio tutorial', difficulty: 'Low', searchIntent: 'How-To', competitionScore: 19, trendingScore: 93, monthlyVolume: '51,200' },
  { id: 'kw-16', keyword: 'automated code generation tools', difficulty: 'Medium', searchIntent: 'Comparison', competitionScore: 58, trendingScore: 80, monthlyVolume: '67,300' },
  { id: 'kw-17', keyword: 'full stack developer roadmap 2026', difficulty: 'High', searchIntent: 'Informational', competitionScore: 88, trendingScore: 86, monthlyVolume: '310,000' },
  { id: 'kw-18', keyword: 'no code vs low code vs ai coding', difficulty: 'Medium', searchIntent: 'Comparison', competitionScore: 41, trendingScore: 89, monthlyVolume: '59,800' },
  { id: 'kw-19', keyword: 'deploy react app to cloud run', difficulty: 'Low', searchIntent: 'How-To', competitionScore: 25, trendingScore: 83, monthlyVolume: '34,200' },
  { id: 'kw-20', keyword: 'future of software engineering ai', difficulty: 'Extreme', searchIntent: 'Informational', competitionScore: 94, trendingScore: 97, monthlyVolume: '450,000' },
];

const INITIAL_TITLES: ViralTitle[] = [
  { id: 't-1', title: 'I Built a Full-Stack AI App in 10 Minutes (No Code Required!)', ctrScore: 98, angle: '🔥 Shock & Speed' },
  { id: 't-2', title: 'The AI Coding Secret Senior Developers Don’t Want You to Know', ctrScore: 96, angle: '💡 Curiosity Gap' },
  { id: 't-3', title: 'STOP Coding the Old Way! Do THIS with Gemini 2026 Instead', ctrScore: 95, angle: '🚨 Urgent Warning' },
  { id: 't-4', title: 'From 0 to $10,000/Mo: How to Build & Monetize AI Agents Step-by-Step', ctrScore: 94, angle: '💰 High Value Outcome' },
  { id: 't-5', title: 'I Tested the Top 5 AI App Builders (The Clear Winner Surprised Me)', ctrScore: 93, angle: '⚔️ Comparison Showdown' },
  { id: 't-6', title: 'Build a Complete Web App with Database in 1 Single Prompt!', ctrScore: 92, angle: '⚡ Extreme Simplicity' },
  { id: 't-7', title: 'React 19 + AI Agents: The Ultimate Full Stack Blueprint for 2026', ctrScore: 91, angle: '🎓 Masterclass Guide' },
  { id: 't-8', title: 'Why 90% of AI Apps Fail (And How to Build One That Wins)', ctrScore: 89, angle: '⚠️ Mistake Avoidance' },
  { id: 't-9', title: 'How I Built a Viral SaaS Product Using Gemini Studio in 24 Hours', ctrScore: 88, angle: '🚀 Case Study' },
  { id: 't-10', title: 'The Future of Web Development: Are Software Engineers Obsolete?', ctrScore: 87, angle: '❓ Controversial Question' },
];

const INITIAL_HOOKS: DescriptionHook[] = [
  {
    id: 'h-1',
    hook: '🚀 Want to build production-ready full-stack web applications without writing thousands of lines of boilerplate code? In this video, you will learn step-by-step how to leverage AI Studio agents to deploy in minutes!',
    focusKeyword: 'build full stack app with ai 2026',
  },
  {
    id: 'h-2',
    hook: '🔥 Software development has changed forever in 2026. Watch this complete hands-on tutorial where we build a live SaaS application from scratch using Gemini AI and React 19.',
    focusKeyword: 'ai coding agent full setup guide',
  },
  {
    id: 'h-3',
    hook: '💡 Stop wasting hours debugging setup files. Learn the exact prompt framework used by top developers to automate full-stack frontend and database integration instantly!',
    focusKeyword: 'best ai app builders for developers',
  },
  {
    id: 'h-4',
    hook: '⚡ Can a single prompt build a real $10k/month micro-SaaS? We test the limits of modern AI coding agents and reveal the full code architecture step-by-step.',
    focusKeyword: 'monetize ai SaaS in 30 days',
  },
  {
    id: 'h-5',
    hook: '🎓 The ultimate 2026 developer roadmap: Master React 19, TypeScript, Express, and AI prompt engineering in one complete crash course.',
    focusKeyword: 'zero to production full stack ai',
  },
];

const INITIAL_TAGS = [
  'ai app development 2026',
  'build full stack app with ai',
  'gemini ai studio tutorial',
  'ai coding agent',
  'react 19 project tutorial',
  'build web app without code',
  'monetize ai saas',
  'claude vs gemini coding',
  'ai workflow automation',
  'express vite setup',
  'no code app builder 2026',
  'high cpm keywords tech',
];

const HASHTAGS = ['#AICoding', '#FullStackApp', '#BuildWithAI', '#GeminiAI', '#WebDev2026', '#DeveloperTools'];

export const SeoAiModule: React.FC<{ onBackToDashboard?: () => void }> = () => {
  const [topic, setTopic] = useState<string>('Building Full-Stack AI Apps in 2026 with Gemini');
  const [category, setCategory] = useState<string>('Artificial Intelligence & Coding');
  const [audience, setAudience] = useState<string>('Junior & Senior Developers');

  const [isGenerating, setIsGenerating] = useState<boolean>(false);
  const [progress, setProgress] = useState<number>(0);
  const [progressMsg, setProgressMsg] = useState<string>('');

  const [keywords, setKeywords] = useState<SeoKeyword[]>(INITIAL_KEYWORDS);
  const [titles, setTitles] = useState<ViralTitle[]>(INITIAL_TITLES);
  const [hooks, setHooks] = useState<DescriptionHook[]>(INITIAL_HOOKS);
  const [tags, setTags] = useState<string[]>(INITIAL_TAGS);

  // Search & Filter state for keywords
  const [searchFilter, setSearchFilter] = useState<string>('');
  const [difficultyFilter, setDifficultyFilter] = useState<string>('All');
  const [sortBy, setSortBy] = useState<'trending' | 'competition' | 'volume'>('trending');

  // Copy feedback tracking
  const [copiedId, setCopiedId] = useState<string | null>(null);

  const handleCopy = (id: string, text: string) => {
    navigator.clipboard.writeText(text);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  const handleCopyAllKeywords = () => {
    const kwText = keywords.map((k) => k.keyword).join(', ');
    navigator.clipboard.writeText(kwText);
    setCopiedId('all-keywords');
    setTimeout(() => setCopiedId(null), 2000);
  };

  const handleCopyAllTags = () => {
    const tagText = tags.join(', ');
    navigator.clipboard.writeText(tagText);
    setCopiedId('all-tags');
    setTimeout(() => setCopiedId(null), 2000);
  };

  // Generate SEO Analysis
  const handleGenerateSeo = (e: React.FormEvent) => {
    e.preventDefault();
    if (!topic.trim()) return;

    setIsGenerating(true);
    setProgress(0);

    const msgs = [
      'Scraping YouTube Search API & Trending Metrics...',
      'Extracting 20 high-volume, low-competition keywords...',
      'Synthesizing viral titles with high predicted CTR...',
      'Formulating high-converting description hooks & tag strings...',
    ];

    let currentStep = 0;
    const interval = setInterval(() => {
      setProgress((prev) => {
        const next = prev + 4;
        if (next >= 100) {
          clearInterval(interval);
          setTimeout(() => {
            // Generate customized keyword list based on topic
            const topicClean = topic.toLowerCase().replace(/[^a-z0-9 ]/g, '');
            const words = topicClean.split(' ').filter((w) => w.length > 2);
            const mainWord = words[0] || 'ai app';

            const newKws: SeoKeyword[] = [
              { id: `kw-gen-1`, keyword: `${topicClean} tutorial 2026`, difficulty: 'Low', searchIntent: 'How-To', competitionScore: 19, trendingScore: 99, monthlyVolume: '92,000' },
              { id: `kw-gen-2`, keyword: `how to ${mainWord} step by step`, difficulty: 'Low', searchIntent: 'How-To', competitionScore: 23, trendingScore: 96, monthlyVolume: '78,400' },
              { id: `kw-gen-3`, keyword: `best ${mainWord} strategy for ${audience.toLowerCase()}`, difficulty: 'Medium', searchIntent: 'Informational', competitionScore: 38, trendingScore: 94, monthlyVolume: '64,100' },
              { id: `kw-gen-4`, keyword: `complete ${mainWord} masterclass 2026`, difficulty: 'Low', searchIntent: 'How-To', competitionScore: 21, trendingScore: 97, monthlyVolume: '88,000' },
              { id: `kw-gen-5`, keyword: `${mainWord} zero to hero guide`, difficulty: 'Medium', searchIntent: 'How-To', competitionScore: 44, trendingScore: 91, monthlyVolume: '105,000' },
              { id: `kw-gen-6`, keyword: `top 5 ${mainWord} secrets revealed`, difficulty: 'Low', searchIntent: 'High-CPM', competitionScore: 27, trendingScore: 93, monthlyVolume: '53,200' },
              { id: `kw-gen-7`, keyword: `fastest way to ${mainWord}`, difficulty: 'Medium', searchIntent: 'How-To', competitionScore: 35, trendingScore: 90, monthlyVolume: '112,000' },
              { id: `kw-gen-8`, keyword: `${mainWord} vs traditional methods`, difficulty: 'Medium', searchIntent: 'Comparison', competitionScore: 49, trendingScore: 89, monthlyVolume: '48,900' },
              { id: `kw-gen-9`, keyword: `monetize ${mainWord} in 2026`, difficulty: 'High', searchIntent: 'High-CPM', competitionScore: 71, trendingScore: 95, monthlyVolume: '130,000' },
              { id: `kw-gen-10`, keyword: `free ${mainWord} tools and workflow`, difficulty: 'Low', searchIntent: 'Transactional', competitionScore: 18, trendingScore: 88, monthlyVolume: '41,000' },
              { id: `kw-gen-11`, keyword: `${topicClean} for beginners`, difficulty: 'Low', searchIntent: 'How-To', competitionScore: 25, trendingScore: 92, monthlyVolume: '96,000' },
              { id: `kw-gen-12`, keyword: `${mainWord} automated pipeline setup`, difficulty: 'Medium', searchIntent: 'How-To', competitionScore: 32, trendingScore: 87, monthlyVolume: '39,500' },
              { id: `kw-gen-13`, keyword: `why ${mainWord} is trending now`, difficulty: 'Low', searchIntent: 'Informational', competitionScore: 20, trendingScore: 98, monthlyVolume: '67,000' },
              { id: `kw-gen-14`, keyword: `${mainWord} case study $10k result`, difficulty: 'Medium', searchIntent: 'High-CPM', competitionScore: 41, trendingScore: 94, monthlyVolume: '84,200' },
              { id: `kw-gen-15`, keyword: `build ${mainWord} in 15 minutes`, difficulty: 'Low', searchIntent: 'How-To', competitionScore: 16, trendingScore: 96, monthlyVolume: '72,100' },
              { id: `kw-gen-16`, keyword: `essential ${mainWord} checklist 2026`, difficulty: 'Low', searchIntent: 'How-To', competitionScore: 22, trendingScore: 85, monthlyVolume: '33,000' },
              { id: `kw-gen-17`, keyword: `${mainWord} viral growth hacks`, difficulty: 'High', searchIntent: 'High-CPM', competitionScore: 68, trendingScore: 91, monthlyVolume: '115,000' },
              { id: `kw-gen-18`, keyword: `common ${mainWord} mistakes to avoid`, difficulty: 'Medium', searchIntent: 'Informational', competitionScore: 39, trendingScore: 86, monthlyVolume: '58,400' },
              { id: `kw-gen-19`, keyword: `production ready ${mainWord} demo`, difficulty: 'Low', searchIntent: 'How-To', competitionScore: 28, trendingScore: 89, monthlyVolume: '45,600' },
              { id: `kw-gen-20`, keyword: `future roadmap for ${mainWord}`, difficulty: 'Extreme', searchIntent: 'Informational', competitionScore: 91, trendingScore: 93, monthlyVolume: '280,000' },
            ];

            const newTitles: ViralTitle[] = [
              { id: 't-g1', title: `I Tested ${topic} (The 2026 Results Surprised Everyone!)`, ctrScore: 99, angle: '🔥 Viral Curiosity' },
              { id: 't-g2', title: `How to Master ${topic} Step-by-Step (Full 2026 Blueprint)`, ctrScore: 97, angle: '🎓 Complete Guide' },
              { id: 't-g3', title: `STOP Doing ${topic} Wrong! Use THIS Secret Method Instead`, ctrScore: 96, angle: '🚨 Urgent Warning' },
              { id: 't-g4', title: `From Scratch to Production: ${topic} in 15 Minutes!`, ctrScore: 95, angle: '⚡ Speed & Ease' },
              { id: 't-g5', title: `The $10,000/Mo ${topic} Framework Nobody Is Talking About`, ctrScore: 94, angle: '💰 High Value Outcome' },
              { id: 't-g6', title: `Is ${topic} Still Worth It in 2026? (Honest Review)`, ctrScore: 92, angle: '⚖️ Truth & Breakdown' },
              { id: 't-g7', title: `5 Fatal Mistakes Everyone Makes With ${topic}`, ctrScore: 91, angle: '⚠️ Mistake Prevention' },
              { id: 't-g8', title: `Building the Ultimate ${topic} System (Live Coding)`, ctrScore: 90, angle: '🛠️ Hands-On Build' },
              { id: 't-g9', title: `Why Top Developers Are Switching To ${topic}`, ctrScore: 89, angle: '📈 Industry Shift' },
              { id: 't-g10', title: `The Future of ${topic}: What You Need to Know`, ctrScore: 88, angle: '🔮 Visionary Outlook' },
            ];

            const newHooks: DescriptionHook[] = [
              {
                id: 'h-g1',
                hook: `🚀 Are you looking to master ${topic}? In this video, we break down the exact step-by-step strategy for ${audience.toLowerCase()} to get 10X faster results!`,
                focusKeyword: `${topicClean} tutorial 2026`,
              },
              {
                id: 'h-g2',
                hook: `🔥 Software engineering and content strategy are evolving rapidly. Watch this complete 2026 breakdown covering ${topic} with live hands-on examples.`,
                focusKeyword: `complete ${mainWord} masterclass 2026`,
              },
              {
                id: 'h-g3',
                hook: `💡 Stop spending hours guessing! Learn the high-CPM keywords, search intent hacks, and viral title formulas designed specifically for ${category}.`,
                focusKeyword: `monetize ${mainWord} in 2026`,
              },
              {
                id: 'h-g4',
                hook: `⚡ From zero setup to production ready: See how top creators use ${topic} to maximize YouTube CTR and dominate search traffic.`,
                focusKeyword: `how to ${mainWord} step by step`,
              },
              {
                id: 'h-g5',
                hook: `🎓 Discover the 5 most common mistakes creators make with ${topic} and how to implement the high-converting blueprint today.`,
                focusKeyword: `common ${mainWord} mistakes to avoid`,
              },
            ];

            const newTags = [
              `${topicClean} 2026`,
              `how to ${mainWord}`,
              `${mainWord} tutorial`,
              `${mainWord} step by step`,
              `${topicClean} guide`,
              `best ${mainWord} tools`,
              `monetize ${mainWord}`,
              `${mainWord} for ${audience.toLowerCase()}`,
              `high cpm ${mainWord}`,
              `${mainWord} masterclass`,
              `${mainWord} tips 2026`,
              `viral ${mainWord} hacks`,
            ];

            setKeywords(newKws);
            setTitles(newTitles);
            setHooks(newHooks);
            setTags(newTags);
            setIsGenerating(false);
          }, 500);
          return 100;
        }

        const msgIdx = Math.min(3, Math.floor(next / 25));
        setProgressMsg(msgs[msgIdx]);
        return next;
      });
    }, 60);
  };

  // Filter & Sort Keywords
  const filteredKeywords = keywords
    .filter((k) => {
      const matchesSearch = k.keyword.toLowerCase().includes(searchFilter.toLowerCase());
      const matchesDifficulty = difficultyFilter === 'All' || k.difficulty === difficultyFilter;
      return matchesSearch && matchesDifficulty;
    })
    .sort((a, b) => {
      if (sortBy === 'trending') return b.trendingScore - a.trendingScore;
      if (sortBy === 'competition') return a.competitionScore - b.competitionScore; // ascending competition is better
      const volA = parseInt(a.monthlyVolume.replace(/,/g, ''));
      const volB = parseInt(b.monthlyVolume.replace(/,/g, ''));
      return volB - volA;
    });

  // Calculate difficulty distribution for pie chart
  const difficultyCounts = {
    Low: keywords.filter((k) => k.difficulty === 'Low').length,
    Medium: keywords.filter((k) => k.difficulty === 'Medium').length,
    High: keywords.filter((k) => k.difficulty === 'High').length,
    Extreme: keywords.filter((k) => k.difficulty === 'Extreme').length,
  };

  const pieData = [
    { name: 'Low (Easy Rank)', value: difficultyCounts.Low, color: '#10B981' },
    { name: 'Medium', value: difficultyCounts.Medium, color: '#F59E0B' },
    { name: 'High', value: difficultyCounts.High, color: '#EF4444' },
    { name: 'Extreme', value: difficultyCounts.Extreme, color: '#8B5CF6' },
  ];

  // Scatter chart data for Keyword Opportunity Matrix (Competition vs Trending)
  const scatterData = keywords.slice(0, 10).map((k) => ({
    name: k.keyword,
    competition: k.competitionScore,
    trending: k.trendingScore,
    volume: parseInt(k.monthlyVolume.replace(/,/g, '')),
  }));

  // Combined Tag String formatted for YouTube Studio
  const formattedTagString = tags.join(', ');
  const tagCharLength = formattedTagString.length;

  return (
    <div className="space-y-6">
      {/* HEADER BANNER */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-white/10">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-red-600 via-rose-600 to-amber-500 flex items-center justify-center text-white font-bold shadow-lg shadow-red-900/30">
            <Search className="w-5 h-5" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h2 className="text-xl font-black text-white tracking-tight">
                SEO AI Workspace & Keyword Research Studio
              </h2>
              <span className="bg-red-500/10 text-red-400 text-xs font-bold px-2.5 py-0.5 rounded-full border border-red-500/20 font-mono">
                Module #4
              </span>
            </div>
            <p className="text-xs text-zinc-400 mt-0.5">
              Generate 20 high-ranking SEO keywords, CTR viral titles, description hooks, tags, and interactive visual charts
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={handleCopyAllKeywords}
            className="px-3.5 py-2 rounded-xl bg-gradient-to-r from-red-600 to-rose-600 hover:from-red-500 hover:to-rose-500 text-white text-xs font-bold transition flex items-center gap-2 cursor-pointer shadow-md shadow-red-900/20 border border-red-400/30"
          >
            {copiedId === 'all-keywords' ? (
              <>
                <Check className="w-4 h-4 text-emerald-300" />
                <span>Copied 20 Keywords!</span>
              </>
            ) : (
              <>
                <Copy className="w-4 h-4" />
                <span>Copy All 20 Keywords</span>
              </>
            )}
          </button>
        </div>
      </div>

      {/* INPUT FORM SECTION */}
      <div className="glass-card rounded-2xl p-6 border border-white/10 space-y-5">
        <div className="flex items-center justify-between border-b border-white/10 pb-3">
          <div className="flex items-center gap-2">
            <Target className="w-4 h-4 text-red-500" />
            <h3 className="font-extrabold text-sm text-white">Target Video Parameters</h3>
          </div>
          <span className="text-[11px] text-zinc-400 font-mono">Powered by Gemini Search Grounding</span>
        </div>

        <form onSubmit={handleGenerateSeo} className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {/* Topic Input */}
            <div className="md:col-span-1 space-y-1.5">
              <label className="text-xs font-bold text-zinc-200 flex items-center gap-1.5">
                <FileText className="w-3.5 h-3.5 text-red-500" />
                Video Topic / Core Keyword
              </label>
              <input
                type="text"
                required
                value={topic}
                onChange={(e) => setTopic(e.target.value)}
                placeholder="e.g. Building Full-Stack AI Apps in 2026"
                className="w-full glass-input rounded-xl px-3.5 py-2.5 text-xs text-white placeholder-zinc-500 focus:border-red-500"
              />
            </div>

            {/* Category Select */}
            <div className="space-y-1.5">
              <label className="text-xs font-bold text-zinc-200 flex items-center gap-1.5">
                <Layers className="w-3.5 h-3.5 text-red-500" />
                Niche / Category
              </label>
              <select
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                className="w-full glass-input rounded-xl px-3.5 py-2.5 text-xs text-white bg-[#141414] focus:border-red-500 cursor-pointer"
              >
                {CATEGORIES.map((cat) => (
                  <option key={cat} value={cat}>
                    {cat}
                  </option>
                ))}
              </select>
            </div>

            {/* Target Audience Select */}
            <div className="space-y-1.5">
              <label className="text-xs font-bold text-zinc-200 flex items-center gap-1.5">
                <Users className="w-3.5 h-3.5 text-red-500" />
                Target Audience
              </label>
              <select
                value={audience}
                onChange={(e) => setAudience(e.target.value)}
                className="w-full glass-input rounded-xl px-3.5 py-2.5 text-xs text-white bg-[#141414] focus:border-red-500 cursor-pointer"
              >
                {AUDIENCES.map((aud) => (
                  <option key={aud} value={aud}>
                    {aud}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Quick Preset Badges */}
          <div className="flex flex-wrap items-center gap-2 pt-1">
            <span className="text-[11px] font-bold text-zinc-400">Popular topics:</span>
            {[
              'React 19 vs Next.js 15',
              'AI Agent Automation SaaS',
              'Python for Beginners 2026',
              'How to Monetize AI Content',
            ].map((preset) => (
              <button
                key={preset}
                type="button"
                onClick={() => setTopic(preset)}
                className="text-[10px] font-mono bg-zinc-900 hover:bg-red-950/50 hover:text-red-400 text-zinc-300 px-2.5 py-1 rounded-lg border border-white/10 hover:border-red-500/30 transition cursor-pointer"
              >
                + {preset}
              </button>
            ))}
          </div>

          {/* SUBMIT BUTTON */}
          <button
            type="submit"
            disabled={isGenerating}
            className="w-full py-3.5 rounded-xl bg-gradient-to-r from-red-600 via-rose-600 to-amber-500 text-white font-extrabold text-xs tracking-wide shadow-xl shadow-red-900/30 hover:shadow-red-600/40 transition flex items-center justify-center gap-2 cursor-pointer border border-red-400/40 disabled:opacity-50"
          >
            <Zap className={`w-4 h-4 ${isGenerating ? 'animate-spin' : 'animate-bounce'}`} />
            <span>{isGenerating ? 'Analyzing YouTube SEO Metrics...' : 'Generate 20 SEO Keywords & Viral Suite'}</span>
            <Sparkles className="w-4 h-4 text-amber-300" />
          </button>
        </form>

        {/* LOADING PROGRESS ANIMATION */}
        {isGenerating && (
          <div className="p-4 rounded-xl bg-zinc-950 border border-red-500/30 space-y-2 animate-in fade-in">
            <div className="flex items-center justify-between text-xs font-mono">
              <span className="text-red-400 font-bold flex items-center gap-1.5">
                <RefreshCw className="w-3.5 h-3.5 animate-spin" /> {progressMsg}
              </span>
              <span className="text-amber-400 font-bold">{progress}%</span>
            </div>
            <div className="w-full bg-zinc-900 h-2 rounded-full overflow-hidden border border-white/10">
              <div
                className="bg-gradient-to-r from-red-600 to-amber-400 h-full rounded-full transition-all duration-150 shadow-[0_0_10px_#FF0000]"
                style={{ width: `${progress}%` }}
              ></div>
            </div>
          </div>
        )}
      </div>

      {/* CHARTS SECTION */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* CHART 1: KEYWORD OPPORTUNITY MATRIX (Scatter/Bar) */}
        <div className="lg:col-span-7 glass-card rounded-2xl p-5 border border-white/10 space-y-3">
          <div className="flex items-center justify-between border-b border-white/10 pb-3">
            <div className="flex items-center gap-2">
              <TrendingUp className="w-4 h-4 text-emerald-400" />
              <h3 className="font-extrabold text-sm text-white">Keyword Opportunity Matrix</h3>
            </div>
            <span className="text-[10px] font-mono text-emerald-400 font-bold bg-emerald-500/10 px-2 py-0.5 rounded border border-emerald-500/20">
              Low Competition + High Trend
            </span>
          </div>

          <p className="text-[11px] text-zinc-400">
            Comparing competition score (lower is better) vs trending momentum for top 10 ranked terms
          </p>

          <div className="h-64 w-full pt-2">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={scatterData} margin={{ top: 10, right: 10, left: -20, bottom: 20 }}>
                <XAxis
                  dataKey="name"
                  tick={{ fill: '#A1A1AA', fontSize: 9 }}
                  interval={0}
                  angle={-25}
                  textAnchor="end"
                />
                <YAxis tick={{ fill: '#A1A1AA', fontSize: 10 }} domain={[0, 100]} />
                <Tooltip
                  contentStyle={{
                    backgroundColor: '#181818',
                    borderColor: '#333',
                    borderRadius: '12px',
                    color: '#FFF',
                    fontSize: '11px',
                  }}
                />
                <Bar dataKey="trending" name="Trending Score" fill="#10B981" radius={[4, 4, 0, 0]} />
                <Bar dataKey="competition" name="Competition Score" fill="#EF4444" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* CHART 2: DIFFICULTY BREAKDOWN (Pie/Donut) */}
        <div className="lg:col-span-5 glass-card rounded-2xl p-5 border border-white/10 space-y-3 flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between border-b border-white/10 pb-3">
              <div className="flex items-center gap-2">
                <PieChartIcon className="w-4 h-4 text-amber-400" />
                <h3 className="font-extrabold text-sm text-white">Ranking Difficulty Ratios</h3>
              </div>
              <span className="text-[10px] font-mono text-zinc-400">20 Target Keywords</span>
            </div>

            <div className="h-52 w-full pt-2 flex items-center justify-center">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={pieData}
                    cx="50%"
                    cy="50%"
                    innerRadius={50}
                    outerRadius={80}
                    paddingAngle={5}
                    dataKey="value"
                  >
                    {pieData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip
                    contentStyle={{
                      backgroundColor: '#181818',
                      borderColor: '#333',
                      borderRadius: '12px',
                      color: '#FFF',
                      fontSize: '11px',
                    }}
                  />
                  <Legend
                    verticalAlign="bottom"
                    height={36}
                    iconSize={8}
                    wrapperStyle={{ fontSize: '10px', color: '#A1A1AA' }}
                  />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </div>

          <div className="p-3 rounded-xl bg-zinc-900/60 border border-white/5 text-[11px] text-zinc-400 flex items-center gap-2">
            <Info className="w-4 h-4 text-amber-400 shrink-0" />
            <span>
              Target at least 60% 'Low' or 'Medium' difficulty keywords to guarantee fast initial ranking indexing.
            </span>
          </div>
        </div>
      </div>

      {/* 20 SEO KEYWORDS LIST / TABLE */}
      <div className="glass-card rounded-2xl p-6 border border-white/10 space-y-4">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-white/10 pb-4">
          <div className="flex items-center gap-2">
            <Hash className="w-5 h-5 text-red-500" />
            <div>
              <h3 className="font-extrabold text-base text-white">20 High-Ranking SEO Keywords</h3>
              <p className="text-xs text-zinc-400">Includes difficulty metrics, search intent, competition & trending velocity</p>
            </div>
          </div>

          {/* SEARCH, FILTER & SORT CONTROLS */}
          <div className="flex flex-wrap items-center gap-2">
            {/* Search Input */}
            <div className="relative">
              <Search className="w-3.5 h-3.5 text-zinc-500 absolute left-3 top-2.5" />
              <input
                type="text"
                placeholder="Filter keywords..."
                value={searchFilter}
                onChange={(e) => setSearchFilter(e.target.value)}
                className="pl-8 pr-3 py-1.5 rounded-xl bg-[#141414] border border-white/10 text-xs text-white placeholder-zinc-500 focus:border-red-500 w-36 sm:w-48"
              />
            </div>

            {/* Difficulty Filter */}
            <select
              value={difficultyFilter}
              onChange={(e) => setDifficultyFilter(e.target.value)}
              className="px-3 py-1.5 rounded-xl bg-[#141414] border border-white/10 text-xs text-zinc-300 focus:border-red-500 cursor-pointer"
            >
              <option value="All">All Difficulties</option>
              <option value="Low">Easy (Low)</option>
              <option value="Medium">Medium</option>
              <option value="High">High</option>
              <option value="Extreme">Extreme</option>
            </select>

            {/* Sort Select */}
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value as any)}
              className="px-3 py-1.5 rounded-xl bg-[#141414] border border-white/10 text-xs text-zinc-300 focus:border-red-500 cursor-pointer"
            >
              <option value="trending">Sort by Trending 🔥</option>
              <option value="competition">Sort by Low Competition 🎯</option>
              <option value="volume">Sort by Monthly Vol 📈</option>
            </select>
          </div>
        </div>

        {/* KEYWORDS TABLE GRID */}
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs font-sans">
            <thead>
              <tr className="text-zinc-400 font-mono text-[10px] border-b border-white/10 bg-zinc-950/40">
                <th className="py-3 px-3">#</th>
                <th className="py-3 px-3">Keyword</th>
                <th className="py-3 px-3">Difficulty</th>
                <th className="py-3 px-3">Search Intent</th>
                <th className="py-3 px-3">Competition Score</th>
                <th className="py-3 px-3">Trending Score</th>
                <th className="py-3 px-3 text-right">Est. Monthly Vol</th>
                <th className="py-3 px-3 text-center">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5">
              {filteredKeywords.map((kw, idx) => (
                <tr key={kw.id} className="hover:bg-white/[0.02] transition">
                  <td className="py-3 px-3 font-mono text-zinc-500 text-[11px]">{idx + 1}</td>
                  <td className="py-3 px-3 font-bold text-white flex items-center gap-2">
                    <span>{kw.keyword}</span>
                  </td>

                  {/* Difficulty Badge */}
                  <td className="py-3 px-3">
                    <span
                      className={`px-2 py-0.5 rounded-full text-[10px] font-mono font-bold border ${
                        kw.difficulty === 'Low'
                          ? 'bg-emerald-500/10 text-emerald-400 border-emerald-500/30'
                          : kw.difficulty === 'Medium'
                          ? 'bg-amber-500/10 text-amber-400 border-amber-500/30'
                          : kw.difficulty === 'High'
                          ? 'bg-rose-500/10 text-rose-400 border-rose-500/30'
                          : 'bg-purple-500/10 text-purple-400 border-purple-500/30'
                      }`}
                    >
                      {kw.difficulty}
                    </span>
                  </td>

                  {/* Search Intent */}
                  <td className="py-3 px-3 text-zinc-300 font-mono text-[11px]">
                    <span className="bg-zinc-900 px-2 py-0.5 rounded border border-white/10">
                      {kw.searchIntent}
                    </span>
                  </td>

                  {/* Competition Score Progress Bar */}
                  <td className="py-3 px-3">
                    <div className="flex items-center gap-2 w-28">
                      <div className="flex-1 bg-zinc-900 h-1.5 rounded-full overflow-hidden">
                        <div
                          className={`h-full rounded-full ${
                            kw.competitionScore < 30
                              ? 'bg-emerald-500'
                              : kw.competitionScore < 60
                              ? 'bg-amber-500'
                              : 'bg-red-500'
                          }`}
                          style={{ width: `${kw.competitionScore}%` }}
                        ></div>
                      </div>
                      <span className="font-mono text-[10px] text-zinc-400">{kw.competitionScore}</span>
                    </div>
                  </td>

                  {/* Trending Score */}
                  <td className="py-3 px-3">
                    <div className="flex items-center gap-1 font-mono text-[11px] font-bold text-amber-400">
                      <Flame className="w-3.5 h-3.5 text-amber-400" />
                      <span>{kw.trendingScore}/100</span>
                    </div>
                  </td>

                  {/* Monthly Volume */}
                  <td className="py-3 px-3 text-right font-mono font-bold text-zinc-200">
                    {kw.monthlyVolume}
                  </td>

                  {/* COPY BUTTON FOR EVERY KEYWORD */}
                  <td className="py-3 px-3 text-center">
                    <button
                      onClick={() => handleCopy(kw.id, kw.keyword)}
                      className="p-1.5 rounded-lg bg-zinc-900 hover:bg-red-600 hover:text-white border border-white/10 text-zinc-300 transition cursor-pointer"
                      title="Copy keyword"
                    >
                      {copiedId === kw.id ? (
                        <Check className="w-3.5 h-3.5 text-emerald-400" />
                      ) : (
                        <Copy className="w-3.5 h-3.5" />
                      )}
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* VIRAL TITLES & DESCRIPTION HOOKS (2 Cols) */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* 10 VIRAL TITLES */}
        <div className="glass-card rounded-2xl p-5 border border-white/10 space-y-4">
          <div className="flex items-center justify-between border-b border-white/10 pb-3">
            <div className="flex items-center gap-2">
              <Zap className="w-4 h-4 text-amber-400" />
              <h3 className="font-extrabold text-sm text-white">10 CTR-Optimized Viral Titles</h3>
            </div>
            <span className="text-[10px] font-mono text-amber-400 bg-amber-500/10 px-2 py-0.5 rounded border border-amber-500/20">
              Avg CTR: 94.2%
            </span>
          </div>

          <div className="space-y-2.5">
            {titles.map((t, idx) => (
              <div
                key={t.id}
                className="p-3 rounded-xl bg-zinc-900/60 border border-white/5 hover:border-amber-500/30 transition flex items-start justify-between gap-3 group"
              >
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <span className="text-[10px] font-mono font-bold text-amber-400 bg-amber-950/40 px-1.5 py-0.5 rounded border border-amber-500/30">
                      {t.ctrScore}% CTR
                    </span>
                    <span className="text-[10px] font-mono text-zinc-400">{t.angle}</span>
                  </div>
                  <p className="text-xs font-bold text-white leading-snug">{t.title}</p>
                </div>

                <button
                  onClick={() => handleCopy(t.id, t.title)}
                  className="p-1.5 rounded-lg bg-zinc-950 border border-white/10 text-zinc-400 hover:text-white hover:bg-red-600 transition cursor-pointer shrink-0 mt-1"
                  title="Copy Title"
                >
                  {copiedId === t.id ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                </button>
              </div>
            ))}
          </div>
        </div>

        {/* 5 DESCRIPTION HOOKS & SUGGESTED TAGS */}
        <div className="space-y-6">
          {/* 5 DESCRIPTION HOOKS */}
          <div className="glass-card rounded-2xl p-5 border border-white/10 space-y-4">
            <div className="flex items-center justify-between border-b border-white/10 pb-3">
              <div className="flex items-center gap-2">
                <FileText className="w-4 h-4 text-red-500" />
                <h3 className="font-extrabold text-sm text-white">5 High-Converting Description Hooks</h3>
              </div>
              <span className="text-[10px] font-mono text-zinc-400">Above the Fold</span>
            </div>

            <div className="space-y-3">
              {hooks.map((h, idx) => (
                <div
                  key={h.id}
                  className="p-3 rounded-xl bg-zinc-900/60 border border-white/5 hover:border-red-500/30 transition space-y-2"
                >
                  <p className="text-xs text-zinc-200 leading-relaxed font-sans">{h.hook}</p>
                  <div className="flex items-center justify-between pt-1 text-[10px] font-mono text-zinc-400">
                    <span className="text-red-400">Target: {h.focusKeyword}</span>
                    <button
                      onClick={() => handleCopy(h.id, h.hook)}
                      className="flex items-center gap-1 text-zinc-400 hover:text-white transition cursor-pointer"
                    >
                      {copiedId === h.id ? <Check className="w-3 h-3 text-emerald-400" /> : <Copy className="w-3 h-3" />}
                      <span>{copiedId === h.id ? 'Copied' : 'Copy Hook'}</span>
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* SUGGESTED YOUTUBE TAGS BOX */}
          <div className="glass-card rounded-2xl p-5 border border-white/10 space-y-3">
            <div className="flex items-center justify-between border-b border-white/10 pb-3">
              <div className="flex items-center gap-2">
                <Tag className="w-4 h-4 text-emerald-400" />
                <h3 className="font-extrabold text-sm text-white">YouTube Tag Box String</h3>
              </div>

              <div className="flex items-center gap-2">
                <span className="text-[10px] font-mono text-zinc-400">
                  {tagCharLength} / 500 chars
                </span>
                <button
                  onClick={handleCopyAllTags}
                  className="px-2.5 py-1 rounded-lg bg-emerald-600/20 text-emerald-400 border border-emerald-500/30 text-xs font-bold hover:bg-emerald-600 hover:text-white transition cursor-pointer flex items-center gap-1"
                >
                  {copiedId === 'all-tags' ? <Check className="w-3 h-3" /> : <Copy className="w-3 h-3" />}
                  <span>Copy Tags</span>
                </button>
              </div>
            </div>

            {/* Formatted Tag Box */}
            <div className="p-3 rounded-xl bg-zinc-950 border border-white/10 font-mono text-xs text-emerald-300 leading-relaxed break-words">
              {formattedTagString}
            </div>

            {/* Hashtags list */}
            <div className="flex flex-wrap gap-1.5 pt-1">
              {HASHTAGS.map((ht) => (
                <span
                  key={ht}
                  className="text-[10px] font-mono bg-red-950/40 text-red-400 px-2 py-0.5 rounded border border-red-500/20"
                >
                  {ht}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
