import React, { useState, useEffect } from 'react';
import {
  Sparkles,
  Search,
  Cpu,
  Brain,
  Zap,
  CheckCircle2,
  Tv,
  User,
  AtSign,
  Tag,
  Award,
  Users,
  Calendar,
  BarChart3,
  TrendingUp,
  Clock,
  RefreshCw,
  Lightbulb,
  ShieldAlert,
  Target,
  Share2,
  Download,
  Flame,
  ArrowRight,
  ChevronRight,
  Info,
  Upload,
} from 'lucide-react';
import { useCreator } from '../../context/CreatorContext';
import { CreatorFormProfile } from '../../types/creator';

export const ChannelAiModule: React.FC<{ onBackToDashboard?: () => void }> = ({
  onBackToDashboard,
}) => {
  const {
    profile,
    setProfile,
    report,
    isScanning,
    setIsScanning,
    hasCompletedScan,
    generateAiReport,
    avatarUrl,
    uploadAvatarFile,
  } = useCreator();

  // Local form state initialized with profile
  const [formData, setFormData] = useState<CreatorFormProfile>(profile);

  // Scanning animation states
  const [scanStep, setScanStep] = useState<number>(0);
  const [scanProgress, setScanProgress] = useState<number>(0);

  const scanStepsList = [
    {
      title: 'Connecting YouTube Data Pipeline',
      description: 'Parsing channel handle, video metadata, and historical upload cadence...',
      icon: Tv,
    },
    {
      title: 'Neural Pattern & Retention Analysis',
      description: 'Running Gemini vision model across thumbnails, titles, and audience drop-offs...',
      icon: Cpu,
    },
    {
      title: 'Competitor & Gap Matrix Scanning',
      description: 'Evaluating top 50 niche creators, search volume spikes, and saturated topics...',
      icon: Search,
    },
    {
      title: 'Audience Psychographic Mapping',
      description: 'Calculating subscriber intent, retention triggers, and CPM monetization potential...',
      icon: Brain,
    },
    {
      title: 'Synthesizing Channel AI Strategy',
      description: 'Generating custom content pillars, upload windows, and growth score benchmark...',
      icon: Sparkles,
    },
  ];

  const handleStartScan = (e: React.FormEvent) => {
    e.preventDefault();
    setProfile(formData);
    setIsScanning(true);
    setScanStep(0);
    setScanProgress(0);
  };

  // 5-step scanning effect timer
  useEffect(() => {
    if (!isScanning) return;

    const interval = setInterval(() => {
      setScanProgress((prev) => {
        const next = prev + 2;
        if (next >= 100) {
          clearInterval(interval);
          setTimeout(() => {
            generateAiReport(formData);
            setIsScanning(false);
          }, 600);
          return 100;
        }

        // Calculate step (0 to 4)
        const currentStep = Math.min(4, Math.floor(next / 20));
        setScanStep(currentStep);

        return next;
      });
    }, 80);

    return () => clearInterval(interval);
  }, [isScanning, formData]);

  const categoryOptions = [
    'Tech & Coding',
    'AI Breakdown & News',
    'Gaming & Esports',
    'Business & SaaS',
    'Personal Finance & Crypto',
    'Lifestyle & Vlogs',
    'Educational & Science',
    'Entertainment & Comedy',
  ];

  const experienceOptions = [
    'Beginner Creator (< 10 Videos)',
    'Intermediate Creator (10 - 50 Videos)',
    'Advanced Creator (50+ Videos)',
    'Elite Niche Leader',
  ];

  const frequencyOptions = [
    '1 video / week',
    '2-3 videos / week',
    'Daily Uploads',
    'Bi-weekly (Every 2 weeks)',
    'Shorts + Longform Hybrid',
  ];

  return (
    <div className="space-y-6">
      {/* Module Title Banner */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-white/10">
        <div>
          <div className="flex items-center gap-2">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-red-600 to-rose-600 flex items-center justify-center text-white font-bold shadow-lg shadow-red-900/30">
              <Tv className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h2 className="text-xl font-black text-white tracking-tight">
                  Channel AI Onboarding & Intelligence
                </h2>
                <span className="bg-red-500/10 text-red-400 text-xs font-bold px-2.5 py-0.5 rounded-full border border-red-500/20 font-mono">
                  Module #1
                </span>
              </div>
              <p className="text-xs text-zinc-400 mt-0.5">
                Run deep AI channel scanning to generate persona profiles, audience retention maps, and growth scores
              </p>
            </div>
          </div>
        </div>

        {hasCompletedScan && !isScanning && (
          <button
            onClick={() => setIsScanning(false)}
            className="px-3.5 py-2 rounded-xl bg-zinc-900 border border-white/10 hover:border-white/20 text-zinc-300 hover:text-white text-xs font-bold transition flex items-center gap-2 cursor-pointer self-start sm:self-auto"
          >
            <RefreshCw className="w-3.5 h-3.5 text-red-400" />
            <span>Update Onboarding Parameters</span>
          </button>
        )}
      </div>

      {/* 1. SCANNING ANIMATION STATE OVERLAY */}
      {isScanning && (
        <div className="glass-card rounded-2xl p-8 border border-red-500/40 bg-gradient-to-br from-[#181818] via-[#141414] to-[#0F0F0F] relative overflow-hidden text-center space-y-8 animate-in fade-in duration-300 shadow-[0_0_50px_rgba(255,0,0,0.15)]">
          {/* Ambient Glowing Background Effect */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-red-600/15 rounded-full blur-3xl pointer-events-none animate-pulse"></div>

          {/* Central Neural Scanner Visual */}
          <div className="relative z-10 flex flex-col items-center justify-center">
            <div className="relative w-28 h-28 mb-4">
              {/* Spinning outer ring */}
              <div className="absolute inset-0 rounded-full border-2 border-dashed border-red-500/50 animate-spin"></div>
              {/* Pulsing glow ring */}
              <div className="absolute inset-2 rounded-full bg-gradient-to-r from-red-600 to-rose-600 opacity-20 blur-md animate-ping"></div>
              {/* Inner core container */}
              <div className="absolute inset-3 rounded-full bg-[#181818] border border-red-500 flex items-center justify-center text-red-500 shadow-inner">
                <Brain className="w-10 h-10 animate-bounce text-red-500" />
              </div>
            </div>

            <h3 className="text-2xl font-black text-white tracking-tight flex items-center gap-2">
              <Sparkles className="w-6 h-6 text-red-500 animate-pulse" />
              Deep AI Neural Channel Scan
            </h3>
            <p className="text-xs text-zinc-400 max-w-md mt-1 font-mono">
              Simulating deep YouTube API metadata & Gemini 2.5 Pro Ultra pattern evaluation
            </p>
          </div>

          {/* 5-Step Progress Bar */}
          <div className="max-w-xl mx-auto space-y-3 relative z-10">
            <div className="flex items-center justify-between text-xs font-mono">
              <span className="text-zinc-400">Scan Progress</span>
              <span className="font-bold text-red-400">{scanProgress}%</span>
            </div>

            <div className="w-full bg-zinc-900 h-3 rounded-full overflow-hidden p-0.5 border border-white/10 shadow-inner">
              <div
                className="bg-gradient-to-r from-red-600 via-rose-500 to-amber-400 h-full rounded-full transition-all duration-150 shadow-[0_0_15px_#FF0000]"
                style={{ width: `${scanProgress}%` }}
              ></div>
            </div>
          </div>

          {/* Active Step Indicator & Status Message */}
          <div className="max-w-2xl mx-auto grid grid-cols-1 sm:grid-cols-5 gap-2 relative z-10">
            {scanStepsList.map((step, idx) => {
              const StepIcon = step.icon;
              const isCurrent = scanStep === idx;
              const isDone = scanStep > idx;

              return (
                <div
                  key={idx}
                  className={`p-2.5 rounded-xl border text-left transition-all duration-300 ${
                    isCurrent
                      ? 'bg-red-950/40 border-red-500/60 text-white shadow-[0_0_15px_rgba(255,0,0,0.2)] scale-105'
                      : isDone
                      ? 'bg-emerald-950/20 border-emerald-500/30 text-emerald-400'
                      : 'bg-zinc-900/30 border-white/5 text-zinc-600'
                  }`}
                >
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-[10px] font-mono font-bold">Step {idx + 1}</span>
                    {isDone ? (
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                    ) : isCurrent ? (
                      <span className="relative flex h-2 w-2">
                        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
                        <span className="relative inline-flex rounded-full h-2 w-2 bg-red-500"></span>
                      </span>
                    ) : null}
                  </div>
                  <p className="text-[11px] font-bold line-clamp-1">{step.title}</p>
                </div>
              );
            })}
          </div>

          {/* Current Step Status Message Card */}
          <div className="p-4 rounded-xl bg-zinc-900/80 border border-white/10 max-w-lg mx-auto relative z-10 flex items-center gap-3 text-left">
            <div className="w-9 h-9 rounded-lg bg-red-500/20 border border-red-500/30 flex items-center justify-center text-red-400 shrink-0">
              <Zap className="w-4 h-4 animate-pulse" />
            </div>
            <div>
              <p className="text-xs font-bold text-white">
                {scanStepsList[scanStep]?.title}
              </p>
              <p className="text-[11px] text-zinc-400 font-mono mt-0.5">
                {scanStepsList[scanStep]?.description}
              </p>
            </div>
          </div>
        </div>
      )}

      {/* 2. ONBOARDING FORM VIEW (When not scanning and report not generated yet or when editing) */}
      {!isScanning && !hasCompletedScan && (
        <form onSubmit={handleStartScan} className="space-y-6">
          <div className="glass-card rounded-2xl p-6 border border-white/10 space-y-6">
            <div className="flex items-center justify-between pb-4 border-b border-white/10">
              <div>
                <h3 className="text-base font-extrabold text-white tracking-tight flex items-center gap-2">
                  <User className="w-4 h-4 text-red-500" />
                  Creator & Channel Onboarding Profile
                </h3>
                <p className="text-xs text-zinc-400">
                  Fill in your channel credentials to calibrate Gemini 2.5 Pro Ultra for your target audience
                </p>
              </div>

              <span className="text-[10px] bg-red-500/20 text-red-400 font-mono font-bold px-2.5 py-1 rounded-full border border-red-500/30">
                Setup 100% Ready
              </span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
              {/* Creator Name */}
              <div className="space-y-1.5">
                <label className="text-xs font-bold text-zinc-300 flex items-center gap-1.5">
                  <User className="w-3.5 h-3.5 text-red-500" /> Creator Name
                </label>
                <input
                  type="text"
                  required
                  value={formData.creatorName}
                  onChange={(e) =>
                    setFormData({ ...formData, creatorName: e.target.value })
                  }
                  placeholder="e.g. Kanak Kumari"
                  className="w-full glass-input rounded-xl px-3.5 py-2.5 text-xs text-white placeholder-zinc-500 focus:border-red-500"
                />
              </div>

              {/* Channel Name */}
              <div className="space-y-1.5">
                <label className="text-xs font-bold text-zinc-300 flex items-center gap-1.5">
                  <Tv className="w-3.5 h-3.5 text-red-500" /> Channel Name
                </label>
                <input
                  type="text"
                  required
                  value={formData.channelName}
                  onChange={(e) =>
                    setFormData({ ...formData, channelName: e.target.value })
                  }
                  placeholder="e.g. Creator Workspace (Demo)"
                  className="w-full glass-input rounded-xl px-3.5 py-2.5 text-xs text-white placeholder-zinc-500 focus:border-red-500"
                />
              </div>

              {/* Channel Handle */}
              <div className="space-y-1.5">
                <label className="text-xs font-bold text-zinc-300 flex items-center gap-1.5">
                  <AtSign className="w-3.5 h-3.5 text-red-500" /> Channel Handle
                </label>
                <input
                  type="text"
                  required
                  value={formData.channelHandle}
                  onChange={(e) =>
                    setFormData({ ...formData, channelHandle: e.target.value })
                  }
                  placeholder="e.g. @kanakkumari_tech"
                  className="w-full glass-input rounded-xl px-3.5 py-2.5 text-xs text-white font-mono placeholder-zinc-500 focus:border-red-500"
                />
              </div>

              {/* Category */}
              <div className="space-y-1.5">
                <label className="text-xs font-bold text-zinc-300 flex items-center gap-1.5">
                  <Tag className="w-3.5 h-3.5 text-red-500" /> Content Niche / Category
                </label>
                <select
                  value={formData.category}
                  onChange={(e) =>
                    setFormData({ ...formData, category: e.target.value })
                  }
                  className="w-full glass-input rounded-xl px-3.5 py-2.5 text-xs text-white bg-[#181818] focus:border-red-500 cursor-pointer"
                >
                  {categoryOptions.map((cat) => (
                    <option key={cat} value={cat} className="bg-[#181818] text-white">
                      {cat}
                    </option>
                  ))}
                </select>
              </div>

              {/* Experience Level */}
              <div className="space-y-1.5">
                <label className="text-xs font-bold text-zinc-300 flex items-center gap-1.5">
                  <Award className="w-3.5 h-3.5 text-red-500" /> Experience Level
                </label>
                <select
                  value={formData.experienceLevel}
                  onChange={(e) =>
                    setFormData({ ...formData, experienceLevel: e.target.value })
                  }
                  className="w-full glass-input rounded-xl px-3.5 py-2.5 text-xs text-white bg-[#181818] focus:border-red-500 cursor-pointer"
                >
                  {experienceOptions.map((exp) => (
                    <option key={exp} value={exp} className="bg-[#181818] text-white">
                      {exp}
                    </option>
                  ))}
                </select>
              </div>

              {/* Upload Frequency */}
              <div className="space-y-1.5">
                <label className="text-xs font-bold text-zinc-300 flex items-center gap-1.5">
                  <Calendar className="w-3.5 h-3.5 text-red-500" /> Target Upload Cadence
                </label>
                <select
                  value={formData.uploadFrequency}
                  onChange={(e) =>
                    setFormData({ ...formData, uploadFrequency: e.target.value })
                  }
                  className="w-full glass-input rounded-xl px-3.5 py-2.5 text-xs text-white bg-[#181818] focus:border-red-500 cursor-pointer"
                >
                  {frequencyOptions.map((freq) => (
                    <option key={freq} value={freq} className="bg-[#181818] text-white">
                      {freq}
                    </option>
                  ))}
                </select>
              </div>

              {/* Target Audience (Full width on md) */}
              <div className="md:col-span-2 lg:col-span-3 space-y-1.5">
                <label className="text-xs font-bold text-zinc-300 flex items-center gap-1.5">
                  <Users className="w-3.5 h-3.5 text-red-500" /> Target Audience Persona
                </label>
                <input
                  type="text"
                  required
                  value={formData.targetAudience}
                  onChange={(e) =>
                    setFormData({ ...formData, targetAudience: e.target.value })
                  }
                  placeholder="e.g. Developers, AI Enthusiasts & Tech Entrepreneurs seeking actionable tutorials"
                  className="w-full glass-input rounded-xl px-3.5 py-2.5 text-xs text-white placeholder-zinc-500 focus:border-red-500"
                />
              </div>
            </div>

            {/* Glowing CTA Button */}
            <div className="pt-4 flex flex-col sm:flex-row items-center justify-between gap-4 border-t border-white/10">
              <div className="flex items-center gap-2 text-xs text-zinc-400">
                <Info className="w-4 h-4 text-red-400 shrink-0" />
                <span>Deep scan runs across Gemini 2.5 Pro Ultra pattern recognition models</span>
              </div>

              {/* LARGE GLOWING DEEP AI SCAN BUTTON */}
              <button
                type="submit"
                className="w-full sm:w-auto relative group px-8 py-4 rounded-2xl bg-gradient-to-r from-red-600 via-rose-600 to-amber-500 text-white font-extrabold text-sm tracking-wide shadow-2xl shadow-red-900/50 hover:shadow-red-600/40 transition-all duration-300 hover:scale-[1.02] cursor-pointer border border-red-400/40 flex items-center justify-center gap-3 overflow-hidden"
              >
                {/* Button Ambient Glow */}
                <div className="absolute inset-0 bg-gradient-to-r from-red-500 via-rose-500 to-amber-400 opacity-0 group-hover:opacity-100 transition-opacity duration-300 blur-xl"></div>
                <Cpu className="w-5 h-5 animate-pulse relative z-10" />
                <span className="relative z-10">Deep AI Scan</span>
                <Sparkles className="w-4 h-4 relative z-10 text-amber-300" />
              </button>
            </div>
          </div>
        </form>
      )}

      {/* 3. GENERATED AI REPORT VIEW */}
      {!isScanning && hasCompletedScan && report && (
        <div className="space-y-6 animate-in fade-in duration-500">
          {/* Header Bar with Re-Scan CTA */}
          <div className="p-4 rounded-2xl bg-gradient-to-r from-red-950/50 via-[#181818] to-[#121212] border border-red-500/40 flex flex-col sm:flex-row sm:items-center justify-between gap-4 shadow-xl">
            <div className="flex items-center gap-3">
              <div className="w-11 h-11 rounded-xl bg-gradient-to-br from-red-600 to-rose-600 flex items-center justify-center text-white font-black shadow-lg">
                <Brain className="w-6 h-6" />
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <h3 className="font-extrabold text-base text-white">
                    AI Channel Intelligence Report
                  </h3>
                  <span className="bg-emerald-500/20 text-emerald-400 text-[10px] font-bold px-2 py-0.5 rounded-full border border-emerald-500/30 font-mono">
                    Scanned {report.scannedAt}
                  </span>
                </div>
                <p className="text-xs text-zinc-400">
                  Calibrated for <span className="text-white font-bold">{profile.channelName}</span> ({profile.channelHandle})
                </p>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={() => setIsScanning(false)}
                className="px-4 py-2 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 text-xs font-bold text-zinc-200 transition flex items-center gap-1.5 cursor-pointer"
              >
                <RefreshCw className="w-3.5 h-3.5 text-red-400" />
                <span>Re-Scan Channel</span>
              </button>
            </div>
          </div>

          {/* AI Growth Score Card */}
          <div className="glass-card rounded-2xl p-6 border border-white/10 bg-gradient-to-br from-[#181818] via-[#141414] to-[#0F0F0F] relative overflow-hidden">
            <div className="flex flex-col lg:flex-row items-center justify-between gap-6">
              <div className="flex items-center gap-6">
                {/* Circular Score Gauge */}
                <div className="relative w-28 h-28 flex items-center justify-center shrink-0">
                  <svg className="w-full h-full transform -rotate-90" viewBox="0 0 36 36">
                    <path
                      className="text-zinc-800"
                      strokeWidth="3.5"
                      stroke="currentColor"
                      fill="none"
                      d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                    />
                    <path
                      className="text-red-500"
                      strokeDasharray={`${report.aiGrowthScore.overall}, 100`}
                      strokeWidth="3.5"
                      strokeLinecap="round"
                      stroke="currentColor"
                      fill="none"
                      d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                    />
                  </svg>
                  <div className="absolute flex flex-col items-center justify-center">
                    <span className="text-2xl font-black text-white">{report.aiGrowthScore.overall}</span>
                    <span className="text-[9px] text-zinc-400 uppercase font-mono font-bold">Growth Score</span>
                  </div>
                </div>

                <div>
                  <div className="flex items-center gap-2">
                    <h4 className="font-extrabold text-lg text-white">
                      Top 2% Growth Potential Niche
                    </h4>
                    <span className="bg-red-500/20 text-red-400 text-xs font-bold px-2 py-0.5 rounded border border-red-500/30">
                      High Velocity
                    </span>
                  </div>
                  <p className="text-xs text-zinc-300 mt-1 max-w-xl leading-relaxed">
                    {report.creatorPersona.summary}
                  </p>
                </div>
              </div>

              {/* Growth Score Breakdown Meters */}
              <div className="grid grid-cols-2 gap-3 w-full lg:w-72 font-mono text-xs">
                <div className="p-2.5 rounded-xl bg-zinc-900/80 border border-white/5 space-y-1">
                  <div className="flex justify-between text-zinc-400 text-[10px]">
                    <span>CTR Potential</span>
                    <span className="text-emerald-400 font-bold">{report.aiGrowthScore.breakdown.ctrPotential}%</span>
                  </div>
                  <div className="w-full bg-zinc-800 h-1.5 rounded-full overflow-hidden">
                    <div className="bg-emerald-500 h-full rounded-full" style={{ width: `${report.aiGrowthScore.breakdown.ctrPotential}%` }}></div>
                  </div>
                </div>

                <div className="p-2.5 rounded-xl bg-zinc-900/80 border border-white/5 space-y-1">
                  <div className="flex justify-between text-zinc-400 text-[10px]">
                    <span>Retention</span>
                    <span className="text-red-400 font-bold">{report.aiGrowthScore.breakdown.audienceRetention}%</span>
                  </div>
                  <div className="w-full bg-zinc-800 h-1.5 rounded-full overflow-hidden">
                    <div className="bg-red-500 h-full rounded-full" style={{ width: `${report.aiGrowthScore.breakdown.audienceRetention}%` }}></div>
                  </div>
                </div>

                <div className="p-2.5 rounded-xl bg-zinc-900/80 border border-white/5 space-y-1">
                  <div className="flex justify-between text-zinc-400 text-[10px]">
                    <span>SEO Synergy</span>
                    <span className="text-amber-400 font-bold">{report.aiGrowthScore.breakdown.seoSynergy}%</span>
                  </div>
                  <div className="w-full bg-zinc-800 h-1.5 rounded-full overflow-hidden">
                    <div className="bg-amber-400 h-full rounded-full" style={{ width: `${report.aiGrowthScore.breakdown.seoSynergy}%` }}></div>
                  </div>
                </div>

                <div className="p-2.5 rounded-xl bg-zinc-900/80 border border-white/5 space-y-1">
                  <div className="flex justify-between text-zinc-400 text-[10px]">
                    <span>RPM Efficiency</span>
                    <span className="text-blue-400 font-bold">{report.aiGrowthScore.breakdown.monetizationEfficiency}%</span>
                  </div>
                  <div className="w-full bg-zinc-800 h-1.5 rounded-full overflow-hidden">
                    <div className="bg-blue-400 h-full rounded-full" style={{ width: `${report.aiGrowthScore.breakdown.monetizationEfficiency}%` }}></div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* 2x2 Grid: Persona, Style, Audience, Upload Strategy */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Creator Persona */}
            <div className="glass-card rounded-2xl p-5 border border-white/10 space-y-3">
              <div className="flex items-center justify-between pb-2 border-b border-white/10">
                <div className="flex items-center gap-2">
                  <User className="w-4 h-4 text-red-500" />
                  <h4 className="font-extrabold text-sm text-white">Creator Persona & Tone</h4>
                </div>
                <span className="text-[10px] text-zinc-400 font-mono">Channel Verified</span>
              </div>

              {/* Creator Profile Header Avatar Block */}
              <div className="flex items-center gap-3 p-3 bg-zinc-900/80 rounded-xl border border-white/5">
                <div className="relative w-12 h-12 rounded-full overflow-hidden border-2 border-red-500 shadow-[0_0_15px_rgba(239,68,68,0.6)] shrink-0">
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
                <div className="flex-1 min-w-0">
                  <div className="font-extrabold text-xs text-white flex items-center gap-1 truncate">
                    {profile.creatorName}
                    <CheckCircle2 className="w-3.5 h-3.5 text-red-500 fill-red-500/20 shrink-0" />
                  </div>
                  <span className="text-[10px] text-zinc-400 font-mono block truncate">
                    {profile.channelHandle}
                  </span>
                </div>
                <label className="px-3 py-1.5 rounded-lg bg-red-600/20 hover:bg-red-600 text-red-300 hover:text-white border border-red-500/30 text-[10px] font-bold transition flex items-center gap-1.5 cursor-pointer shrink-0">
                  <Upload className="w-3 h-3" />
                  <span>Upload Photo</span>
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

              <div className="space-y-2 text-xs">
                <div className="p-2.5 rounded-xl bg-zinc-900/60 border border-white/5">
                  <span className="text-zinc-500 block text-[10px] uppercase font-mono">Archetype</span>
                  <span className="font-bold text-white text-sm">{report.creatorPersona.archetype}</span>
                </div>
                <div className="p-2.5 rounded-xl bg-zinc-900/60 border border-white/5">
                  <span className="text-zinc-500 block text-[10px] uppercase font-mono">Tone of Voice</span>
                  <span className="text-zinc-200">{report.creatorPersona.toneOfVoice}</span>
                </div>
                <div className="p-2.5 rounded-xl bg-zinc-900/60 border border-white/5">
                  <span className="text-zinc-500 block text-[10px] uppercase font-mono">Unfair Niche Advantage</span>
                  <span className="text-emerald-400 font-semibold">{report.creatorPersona.unreachableCompetitorEdge}</span>
                </div>
              </div>
            </div>

            {/* Content Style & Pacing */}
            <div className="glass-card rounded-2xl p-5 border border-white/10 space-y-3">
              <div className="flex items-center gap-2 pb-2 border-b border-white/10">
                <Flame className="w-4 h-4 text-amber-500" />
                <h4 className="font-extrabold text-sm text-white">Content Style & Pacing Strategy</h4>
              </div>
              <div className="space-y-2 text-xs">
                <div className="p-2.5 rounded-xl bg-zinc-900/60 border border-white/5">
                  <span className="text-zinc-500 block text-[10px] uppercase font-mono">Visual Format</span>
                  <span className="text-zinc-200">{report.contentStyle.format}</span>
                </div>
                <div className="p-2.5 rounded-xl bg-zinc-900/60 border border-white/5">
                  <span className="text-zinc-500 block text-[10px] uppercase font-mono">Editing Density & Pacing</span>
                  <span className="text-zinc-200">{report.contentStyle.pacing}</span>
                </div>
                <div className="p-2.5 rounded-xl bg-zinc-900/60 border border-white/5">
                  <span className="text-zinc-500 block text-[10px] uppercase font-mono">First 5s Visual Hook</span>
                  <span className="text-red-400 font-semibold">{report.contentStyle.visualHookStrategy}</span>
                </div>
              </div>
            </div>

            {/* Audience Demographics */}
            <div className="glass-card rounded-2xl p-5 border border-white/10 space-y-3">
              <div className="flex items-center gap-2 pb-2 border-b border-white/10">
                <Users className="w-4 h-4 text-blue-500" />
                <h4 className="font-extrabold text-sm text-white">Audience Psychographics</h4>
              </div>
              <div className="space-y-2 text-xs">
                <div className="p-2.5 rounded-xl bg-zinc-900/60 border border-white/5 flex justify-between items-center">
                  <span className="text-zinc-400">Primary Age Group:</span>
                  <span className="font-mono font-bold text-white">{report.audienceProfile.primaryAgeGroup}</span>
                </div>
                <div className="p-2.5 rounded-xl bg-zinc-900/60 border border-white/5">
                  <span className="text-zinc-500 block text-[10px] uppercase font-mono mb-1">Top Geographic Demographics</span>
                  <div className="flex flex-wrap gap-1.5">
                    {report.audienceProfile.topLocations.map((loc, i) => (
                      <span key={i} className="bg-zinc-800 text-zinc-300 text-[10px] px-2 py-0.5 rounded font-mono border border-white/5">
                        {loc}
                      </span>
                    ))}
                  </div>
                </div>
                <div className="p-2.5 rounded-xl bg-zinc-900/60 border border-white/5">
                  <span className="text-zinc-500 block text-[10px] uppercase font-mono">Core Retention Trigger</span>
                  <span className="text-zinc-200">{report.audienceProfile.retentionTrigger}</span>
                </div>
              </div>
            </div>

            {/* Upload Strategy & Posting Window */}
            <div className="glass-card rounded-2xl p-5 border border-white/10 space-y-3">
              <div className="flex items-center gap-2 pb-2 border-b border-white/10">
                <Clock className="w-4 h-4 text-emerald-500" />
                <h4 className="font-extrabold text-sm text-white">Optimal Upload Strategy</h4>
              </div>
              <div className="space-y-2 text-xs">
                <div className="p-2.5 rounded-xl bg-emerald-950/20 border border-emerald-500/30 flex items-center justify-between">
                  <div>
                    <span className="text-zinc-400 text-[10px] uppercase font-mono block">Best Posting Window</span>
                    <span className="font-bold text-emerald-400 text-sm">{report.uploadStrategy.bestTimeWindow}</span>
                  </div>
                  <span className="bg-emerald-500/20 text-emerald-300 text-[10px] font-bold px-2 py-0.5 rounded border border-emerald-500/30">
                    Peak CTR
                  </span>
                </div>
                <div className="p-2.5 rounded-xl bg-zinc-900/60 border border-white/5 flex justify-between items-center">
                  <span className="text-zinc-400">Best Posting Days:</span>
                  <span className="font-mono font-bold text-white">{report.uploadStrategy.bestDays.join(', ')}</span>
                </div>
                <div className="p-2.5 rounded-xl bg-zinc-900/60 border border-white/5 flex justify-between items-center">
                  <span className="text-zinc-400">Optimal Video Duration:</span>
                  <span className="font-mono font-bold text-amber-400">{report.uploadStrategy.optimalDuration}</span>
                </div>
              </div>
            </div>
          </div>

          {/* Strengths & Weaknesses Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Strengths */}
            <div className="glass-card rounded-2xl p-5 border border-emerald-500/30 bg-emerald-950/10 space-y-3">
              <div className="flex items-center gap-2 pb-2 border-b border-emerald-500/20">
                <CheckCircle2 className="w-5 h-5 text-emerald-400" />
                <h4 className="font-extrabold text-sm text-emerald-300">Channel Competitive Strengths</h4>
              </div>
              <ul className="space-y-2 text-xs">
                {report.strengths.map((str, i) => (
                  <li key={i} className="flex items-start gap-2 text-zinc-200">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 mt-1.5 shrink-0"></span>
                    <span>{str}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Weaknesses / Opportunities */}
            <div className="glass-card rounded-2xl p-5 border border-amber-500/30 bg-amber-950/10 space-y-3">
              <div className="flex items-center gap-2 pb-2 border-b border-amber-500/20">
                <ShieldAlert className="w-5 h-5 text-amber-400" />
                <h4 className="font-extrabold text-sm text-amber-300">Growth Optimization Opportunities</h4>
              </div>
              <ul className="space-y-2 text-xs">
                {report.weaknesses.map((weak, i) => (
                  <li key={i} className="flex items-start gap-2 text-zinc-200">
                    <span className="w-1.5 h-1.5 rounded-full bg-amber-400 mt-1.5 shrink-0"></span>
                    <span>{weak}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Recommended Content Pillars */}
          <div className="glass-card rounded-2xl p-5 border border-white/10 space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-white/10">
              <div>
                <h4 className="font-extrabold text-base text-white tracking-tight flex items-center gap-2">
                  <Target className="w-5 h-5 text-red-500" /> Recommended AI Content Pillars
                </h4>
                <p className="text-xs text-zinc-400">
                  Target topic blueprints designed to maximize views, RPM revenue, and subscriber conversion
                </p>
              </div>

              <span className="text-[10px] bg-red-500/20 text-red-400 font-mono font-bold px-2.5 py-0.5 rounded-full border border-red-500/30">
                3 High-RPM Pillars
              </span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {report.contentPillars.map((pillar, idx) => (
                <div
                  key={idx}
                  className="p-4 rounded-xl bg-zinc-900/60 border border-white/10 hover:border-red-500/40 transition-all duration-300 flex flex-col justify-between space-y-3"
                >
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="text-[10px] font-mono font-bold bg-red-500/20 text-red-400 px-2 py-0.5 rounded border border-red-500/30">
                        Pillar #{idx + 1}
                      </span>
                      <span className="text-[11px] font-mono font-bold text-emerald-400">
                        RPM {pillar.estimatedRpm}
                      </span>
                    </div>

                    <h5 className="font-bold text-sm text-white">{pillar.title}</h5>
                    <p className="text-xs text-zinc-400 leading-snug">{pillar.description}</p>
                  </div>

                  <div className="space-y-2 pt-3 border-t border-white/5 font-mono text-[11px]">
                    <div className="flex justify-between text-zinc-400">
                      <span>Proj. Views:</span>
                      <span className="font-bold text-white">{pillar.projectedViews}</span>
                    </div>
                    <div className="flex justify-between text-zinc-400">
                      <span>Target CTR:</span>
                      <span className="font-bold text-red-400">{pillar.targetCtr}</span>
                    </div>

                    <div className="p-2 rounded-lg bg-zinc-950 border border-white/5 text-[10px] text-zinc-300">
                      <span className="text-zinc-500 font-sans block text-[9px] uppercase font-bold">
                        Example Viral Topic:
                      </span>
                      <span className="text-white font-medium">"{pillar.exampleTopic}"</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
