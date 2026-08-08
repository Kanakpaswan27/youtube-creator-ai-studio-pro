import React, { useState, useEffect } from 'react';
import {
  Image,
  Sparkles,
  Wand2,
  Download,
  Star,
  History,
  Copy,
  Check,
  RefreshCw,
  Eye,
  Sliders,
  Maximize2,
  Palette,
  Smile,
  Layers,
  Ratio,
  Zap,
  Cpu,
  Brain,
  Trash2,
  Heart,
  Share2,
  Type,
  Flame,
  Info,
  CheckCircle2,
} from 'lucide-react';
import { useCreator } from '../../context/CreatorContext';

interface ThumbnailStyle {
  id: string;
  name: string;
  description: string;
  previewBg: string;
}

interface PromptHistoryItem {
  id: string;
  prompt: string;
  enhancedPrompt: string;
  style: string;
  mood: string;
  palette: string;
  aspectRatio: string;
  createdAt: string;
  isFavorite: boolean;
  generatedImageUrl: string;
  overlayText: string;
}

const STYLES: ThumbnailStyle[] = [
  {
    id: 'cyberpunk',
    name: 'Cyberpunk & Neon Tech',
    description: 'High contrast neon lights, dark futuristic UI elements, glowing holographic overlays',
    previewBg: 'from-[#FF0055] via-[#7928CA] to-[#00DFD8]',
  },
  {
    id: '3d-render',
    name: '3D Hyper-Realistic Render',
    description: 'Octane render style, smooth glossy materials, dramatic studio rim lighting',
    previewBg: 'from-[#FF4E50] to-[#F9D423]',
  },
  {
    id: 'photorealistic',
    name: 'Cinematic Photorealistic',
    description: 'DSLR shallow depth of field, 85mm lens, intense natural facial expressions',
    previewBg: 'from-[#11998e] to-[#38ef7d]',
  },
  {
    id: 'bold-typography',
    name: 'Bold Typography & High Contrast',
    description: 'Massive yellow/white drop-shadow text, high saturation, immediate eye catch',
    previewBg: 'from-[#E52D27] to-[#B31217]',
  },
  {
    id: 'anime-graphic',
    name: 'Anime & Graphic Illustration',
    description: 'Vibrant cell-shaded artwork, speed lines, dramatic action angle',
    previewBg: 'from-[#8E2DE2] to-[#4A00E0]',
  },
  {
    id: 'dark-mystery',
    name: 'Cinematic Dark Mystery',
    description: 'Moody shadows, subtle glowing eye accents, dark slate background',
    previewBg: 'from-[#141E30] to-[#243B55]',
  },
];

const MOODS = [
  { id: 'shocked', label: '😱 High Energy & Shocked', description: 'Open mouth, wide eyes, extreme urgency' },
  { id: 'mystery', label: '🕵️ Deep Mystery & Intrigue', description: 'Curious look, partial shadow, hidden secret' },
  { id: 'authority', label: '👑 Professional Authority', description: 'Confident smile, polished aesthetic, expert posture' },
  { id: 'warning', label: '⚠️ Urgent Warning / Mistake', description: 'Red warning badges, serious face, stop sign cue' },
  { id: 'clean-edu', label: '🎓 Clean & Educational', description: 'Bright lighting, friendly expression, structured diagram' },
];

const PALETTES = [
  { id: 'red-cyan', name: 'Neon Red & Cyber Cyan', colors: ['#FF0055', '#00DFD8', '#0F0F0F'] },
  { id: 'gold-black', name: 'Electric Gold & Matte Black', colors: ['#FFD700', '#FF8C00', '#121212'] },
  { id: 'purple-pink', name: 'Deep Purple & Neon Pink', colors: ['#8A2BE2', '#FF1493', '#181818'] },
  { id: 'yellow-black', name: 'High Contrast Yellow & Black', colors: ['#FFE600', '#000000', '#222222'] },
  { id: 'emerald-black', name: 'Emerald Green & Dark Slate', colors: ['#00FF87', '#60EFFF', '#0D1117'] },
];

const ASPECT_RATIOS = [
  { id: '16:9', label: '16:9 YouTube Thumbnail', dims: '1280 x 720 px' },
  { id: '9:16', label: '9:16 Shorts / Reels', dims: '1080 x 1920 px' },
  { id: '1:1', label: '1:1 Community Post', dims: '1080 x 1080 px' },
  { id: '4:3', label: '4:3 Banner / Classic', dims: '1024 x 768 px' },
];

const DEFAULT_HISTORY: PromptHistoryItem[] = [
  {
    id: 'hist-1',
    prompt: 'Developer holding glowing AI sphere with shocked expression, 100X AGENT text overlay',
    enhancedPrompt: 'Hyper-detailed 3D Octane render of a young developer with an ecstatic expression, holding a floating holographic neon-cyan AI sphere emitting electric particles. Cinematic studio rim lighting in dark background with bold high-contrast yellow typography reading "100X AGENT" with drop shadow.',
    style: 'cyberpunk',
    mood: 'shocked',
    palette: 'red-cyan',
    aspectRatio: '16:9',
    createdAt: '10 mins ago',
    isFavorite: true,
    generatedImageUrl: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=1280&q=80',
    overlayText: '100X AGENT!',
  },
  {
    id: 'hist-2',
    prompt: 'Side by side comparison of old coding vs AI studio agent building',
    enhancedPrompt: 'Split-screen YouTube thumbnail design. Left side: Frustrated programmer in dark blue ambient light sitting at cluttered desk with red "SLOW" badge. Right side: Futuristic AI developer with glowing green cyan code stream and gold "20 MINS" badge. High saturation, dramatic lighting.',
    style: 'bold-typography',
    mood: 'warning',
    palette: 'gold-black',
    aspectRatio: '16:9',
    createdAt: '1 hour ago',
    isFavorite: false,
    generatedImageUrl: 'https://images.unsplash.com/photo-1550745165-9bc0b252726f?auto=format&fit=crop&w=1280&q=80',
    overlayText: 'OLD vs AI STUDIO',
  },
];

export const ThumbnailAiModule: React.FC<{ onBackToDashboard?: () => void }> = () => {
  const { addActivity, incrementStats, showToast, runPipeline } = useCreator();
  const [prompt, setPrompt] = useState<string>(
    'Shocked creator pointing at floating holographic Gemini AI code editor, high contrast YouTube thumbnail'
  );
  const [enhancedPrompt, setEnhancedPrompt] = useState<string>('');
  const [isEnhancing, setIsEnhancing] = useState<boolean>(false);

  const [selectedStyle, setSelectedStyle] = useState<string>('cyberpunk');
  const [selectedMood, setSelectedMood] = useState<string>('shocked');
  const [selectedPalette, setSelectedPalette] = useState<string>('red-cyan');
  const [selectedRatio, setSelectedRatio] = useState<string>('16:9');
  const [overlayText, setOverlayText] = useState<string>('I BUILT AN AI AGENT!');

  const [isGenerating, setIsGenerating] = useState<boolean>(false);
  const [generationStep, setGenerationStep] = useState<number>(0);
  const [generationProgress, setGenerationProgress] = useState<number>(0);

  const [currentImage, setCurrentImage] = useState<string>(DEFAULT_HISTORY[0].generatedImageUrl);
  const [history, setHistory] = useState<PromptHistoryItem[]>(DEFAULT_HISTORY);
  const [activeTab, setActiveTab] = useState<'editor' | 'history' | 'favorites'>('editor');
  const [copiedText, setCopiedText] = useState<boolean>(false);

  // AI Prompt Enhancement Logic
  const handleEnhancePrompt = () => {
    if (!prompt.trim()) return;
    setIsEnhancing(true);

    setTimeout(() => {
      const styleObj = STYLES.find((s) => s.id === selectedStyle);
      const moodObj = MOODS.find((m) => m.id === selectedMood);
      const paletteObj = PALETTES.find((p) => p.id === selectedPalette);

      const enhanced = `Ultra-detailed ${selectedRatio} YouTube thumbnail in ${styleObj?.name} style. Subject: ${prompt}. Mood: ${moodObj?.description}. Color scheme: ${paletteObj?.name} (${paletteObj?.colors.join(', ')}). Features bold 3D high-contrast text overlay reading "${overlayText}", shallow depth of field, dramatic rim lighting, 8k resolution visual fidelity, high click-through rate design.`;

      setEnhancedPrompt(enhanced);
      setIsEnhancing(false);
      showToast('✓ Gemini prompt enhanced with CTR principles!', 'info');
    }, 800);
  };

  // Generate Thumbnail Simulation
  const handleGenerateThumbnail = (e: React.FormEvent) => {
    e.preventDefault();
    if (!prompt.trim()) return;

    runPipeline('Thumbnail AI', `Rendering 4K Thumbnail: ${overlayText}`, () => {
      const seed = Math.floor(Math.random() * 1000);
      const newImageUrl = `https://picsum.photos/seed/${seed}/1280/720`;
      setCurrentImage(newImageUrl);

      const newItem: PromptHistoryItem = {
        id: `hist-${Date.now()}`,
        prompt,
        enhancedPrompt: enhancedPrompt || prompt,
        style: selectedStyle,
        mood: selectedMood,
        palette: selectedPalette,
        aspectRatio: selectedRatio,
        createdAt: 'Just now',
        isFavorite: false,
        generatedImageUrl: newImageUrl,
        overlayText,
      };

      setHistory((prev) => [newItem, ...prev]);

      addActivity({
        type: 'thumbnail',
        title: '✓ 4K Thumbnail Rendered',
        description: `Synthesized "${overlayText}" thumbnail (+12.8% CTR prediction).`,
        status: 'completed',
        aiBadge: 'Vision Model v3.0',
      });
      incrementStats(1, 1.5, 1);
      showToast(`✓ 4K Thumbnail "${overlayText}" rendered & saved to workspace!`, 'success');
    });
  };


  const toggleFavorite = (id: string) => {
    setHistory((prev) =>
      prev.map((item) =>
        item.id === id ? { ...item, isFavorite: !item.isFavorite } : item
      )
    );
  };

  const restoreFromHistory = (item: PromptHistoryItem) => {
    setPrompt(item.prompt);
    setEnhancedPrompt(item.enhancedPrompt);
    setSelectedStyle(item.style);
    setSelectedMood(item.mood);
    setSelectedPalette(item.palette);
    setSelectedRatio(item.aspectRatio);
    setOverlayText(item.overlayText);
    setCurrentImage(item.generatedImageUrl);
    setActiveTab('editor');
  };

  const handleDownloadThumbnail = () => {
    // Create an anchor element to download the image file
    const link = document.createElement('a');
    link.href = currentImage;
    link.target = '_blank';
    link.download = `YouTube_Thumbnail_${Date.now()}.jpg`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const handleCopyPrompt = (textToCopy: string) => {
    navigator.clipboard.writeText(textToCopy);
    setCopiedText(true);
    setTimeout(() => setCopiedText(false), 2000);
  };

  return (
    <div className="space-y-6">
      {/* Module Title Banner */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-white/10">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-red-600 to-rose-600 flex items-center justify-center text-white font-bold shadow-lg shadow-red-900/30">
            <Image className="w-5 h-5" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h2 className="text-xl font-black text-white tracking-tight">
                Thumbnail AI Studio & CTR Generator
              </h2>
              <span className="bg-red-500/10 text-red-400 text-xs font-bold px-2.5 py-0.5 rounded-full border border-red-500/20 font-mono">
                Module #3
              </span>
            </div>
            <p className="text-xs text-zinc-400 mt-0.5">
              Generate high-CTR YouTube thumbnails with Gemini prompt enhancement, style presets, and 4K preview rendering
            </p>
          </div>
        </div>

        {/* Tab switcher */}
        <div className="flex items-center gap-1.5 p-1 rounded-xl bg-[#141414] border border-white/10 self-start sm:self-auto font-mono text-xs">
          <button
            onClick={() => setActiveTab('editor')}
            className={`px-3 py-1.5 rounded-lg font-bold transition flex items-center gap-1.5 cursor-pointer ${
              activeTab === 'editor'
                ? 'bg-red-600 text-white shadow-md'
                : 'text-zinc-400 hover:text-white'
            }`}
          >
            <Wand2 className="w-3.5 h-3.5" />
            <span>Studio Editor</span>
          </button>
          <button
            onClick={() => setActiveTab('history')}
            className={`px-3 py-1.5 rounded-lg font-bold transition flex items-center gap-1.5 cursor-pointer ${
              activeTab === 'history'
                ? 'bg-red-600 text-white shadow-md'
                : 'text-zinc-400 hover:text-white'
            }`}
          >
            <History className="w-3.5 h-3.5" />
            <span>History ({history.length})</span>
          </button>
          <button
            onClick={() => setActiveTab('favorites')}
            className={`px-3 py-1.5 rounded-lg font-bold transition flex items-center gap-1.5 cursor-pointer ${
              activeTab === 'favorites'
                ? 'bg-red-600 text-white shadow-md'
                : 'text-zinc-400 hover:text-white'
            }`}
          >
            <Star className="w-3.5 h-3.5" />
            <span>Favorites ({history.filter((h) => h.isFavorite).length})</span>
          </button>
        </div>
      </div>

      {/* ACTIVE VIEW 1: STUDIO EDITOR */}
      {activeTab === 'editor' && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          {/* LEFT PANEL: CONTROLS & PROMPT FORM (7 Cols) */}
          <div className="lg:col-span-7 space-y-6">
            <form onSubmit={handleGenerateThumbnail} className="space-y-6">
              {/* Prompt Input Box */}
              <div className="glass-card rounded-2xl p-5 border border-white/10 space-y-3">
                <div className="flex items-center justify-between">
                  <label className="text-xs font-bold text-white flex items-center gap-2">
                    <Sparkles className="w-4 h-4 text-red-500" />
                    Thumbnail Visual Concept Prompt
                  </label>
                  <button
                    type="button"
                    onClick={handleEnhancePrompt}
                    disabled={isEnhancing || !prompt.trim()}
                    className="px-3 py-1 rounded-lg bg-gradient-to-r from-amber-500/20 to-red-500/20 border border-amber-500/40 text-amber-300 hover:text-white text-xs font-bold transition flex items-center gap-1.5 cursor-pointer disabled:opacity-50"
                  >
                    <Wand2 className={`w-3.5 h-3.5 ${isEnhancing ? 'animate-spin' : ''}`} />
                    <span>{isEnhancing ? 'Enhancing...' : 'Enhance with Gemini'}</span>
                  </button>
                </div>

                <textarea
                  rows={3}
                  required
                  value={prompt}
                  onChange={(e) => setPrompt(e.target.value)}
                  placeholder="Describe your thumbnail visual scene (e.g. Creator holding glowing laptop with shocked expression, high contrast neon text)..."
                  className="w-full glass-input rounded-xl p-3.5 text-xs text-white placeholder-zinc-500 leading-relaxed focus:border-red-500"
                ></textarea>

                {/* Enhanced Prompt Display */}
                {enhancedPrompt && (
                  <div className="p-3 rounded-xl bg-amber-950/20 border border-amber-500/30 space-y-1 text-xs animate-in fade-in">
                    <div className="flex items-center justify-between text-amber-400 font-mono text-[10px] font-bold">
                      <span className="flex items-center gap-1">
                        <Sparkles className="w-3 h-3" /> Gemini AI Enhanced Prompt
                      </span>
                      <button
                        type="button"
                        onClick={() => handleCopyPrompt(enhancedPrompt)}
                        className="text-zinc-400 hover:text-white transition flex items-center gap-1"
                      >
                        {copiedText ? <Check className="w-3 h-3 text-emerald-400" /> : <Copy className="w-3 h-3" />}
                        <span>{copiedText ? 'Copied' : 'Copy'}</span>
                      </button>
                    </div>
                    <p className="text-zinc-300 font-mono text-[11px] leading-relaxed">
                      "{enhancedPrompt}"
                    </p>
                  </div>
                )}

                {/* Overlay Text Input */}
                <div className="pt-2 space-y-1.5">
                  <label className="text-[11px] font-bold text-zinc-300 flex items-center gap-1.5">
                    <Type className="w-3.5 h-3.5 text-red-500" /> High-Contrast Overlay Text
                  </label>
                  <input
                    type="text"
                    value={overlayText}
                    onChange={(e) => setOverlayText(e.target.value)}
                    placeholder="e.g. 100X AGENT!, NO CODE!, $50K / MO"
                    className="w-full glass-input rounded-xl px-3.5 py-2 text-xs text-white font-mono placeholder-zinc-500"
                  />
                </div>
              </div>

              {/* Visual Style Selector */}
              <div className="glass-card rounded-2xl p-5 border border-white/10 space-y-3">
                <label className="text-xs font-bold text-white flex items-center gap-2">
                  <Layers className="w-4 h-4 text-red-500" />
                  Select Visual Render Style
                </label>

                <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5">
                  {STYLES.map((style) => {
                    const isSelected = selectedStyle === style.id;
                    return (
                      <div
                        key={style.id}
                        onClick={() => setSelectedStyle(style.id)}
                        className={`p-3 rounded-xl border transition-all duration-200 cursor-pointer space-y-1 ${
                          isSelected
                            ? 'bg-red-950/40 border-red-500 shadow-[0_0_15px_rgba(255,0,0,0.2)] scale-[1.02]'
                            : 'bg-zinc-900/60 border-white/5 hover:border-white/20'
                        }`}
                      >
                        <div
                          className={`w-full h-2 rounded-full bg-gradient-to-r ${style.previewBg} mb-1.5`}
                        ></div>
                        <p className="text-xs font-bold text-white line-clamp-1">{style.name}</p>
                        <p className="text-[10px] text-zinc-400 line-clamp-1">{style.description}</p>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Mood & Expression Selector */}
              <div className="glass-card rounded-2xl p-5 border border-white/10 space-y-3">
                <label className="text-xs font-bold text-white flex items-center gap-2">
                  <Smile className="w-4 h-4 text-red-500" />
                  Emotional Expression & Mood
                </label>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                  {MOODS.map((mood) => {
                    const isSelected = selectedMood === mood.id;
                    return (
                      <div
                        key={mood.id}
                        onClick={() => setSelectedMood(mood.id)}
                        className={`p-2.5 rounded-xl border transition cursor-pointer flex items-center justify-between ${
                          isSelected
                            ? 'bg-red-500/20 border-red-500 text-white'
                            : 'bg-zinc-900/60 border-white/5 hover:border-white/20 text-zinc-300'
                        }`}
                      >
                        <div>
                          <p className="text-xs font-bold">{mood.label}</p>
                          <p className="text-[10px] text-zinc-400">{mood.description}</p>
                        </div>
                        {isSelected && <CheckCircle2 className="w-4 h-4 text-red-400 shrink-0" />}
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Color Palette & Aspect Ratio Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                {/* Color Palette */}
                <div className="glass-card rounded-2xl p-5 border border-white/10 space-y-3">
                  <label className="text-xs font-bold text-white flex items-center gap-2">
                    <Palette className="w-4 h-4 text-red-500" />
                    Color Palette
                  </label>

                  <div className="space-y-2">
                    {PALETTES.map((pal) => {
                      const isSelected = selectedPalette === pal.id;
                      return (
                        <div
                          key={pal.id}
                          onClick={() => setSelectedPalette(pal.id)}
                          className={`p-2 rounded-xl border transition cursor-pointer flex items-center justify-between ${
                            isSelected
                              ? 'bg-red-500/20 border-red-500'
                              : 'bg-zinc-900/60 border-white/5 hover:border-white/20'
                          }`}
                        >
                          <span className="text-xs font-bold text-white">{pal.name}</span>
                          <div className="flex items-center gap-1">
                            {pal.colors.map((c, i) => (
                              <span
                                key={i}
                                className="w-3.5 h-3.5 rounded-full border border-white/20"
                                style={{ backgroundColor: c }}
                              ></span>
                            ))}
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>

                {/* Aspect Ratio */}
                <div className="glass-card rounded-2xl p-5 border border-white/10 space-y-3">
                  <label className="text-xs font-bold text-white flex items-center gap-2">
                    <Ratio className="w-4 h-4 text-red-500" />
                    Aspect Ratio
                  </label>

                  <div className="space-y-2">
                    {ASPECT_RATIOS.map((ratio) => {
                      const isSelected = selectedRatio === ratio.id;
                      return (
                        <div
                          key={ratio.id}
                          onClick={() => setSelectedRatio(ratio.id)}
                          className={`p-2.5 rounded-xl border transition cursor-pointer flex items-center justify-between ${
                            isSelected
                              ? 'bg-red-500/20 border-red-500'
                              : 'bg-zinc-900/60 border-white/5 hover:border-white/20'
                          }`}
                        >
                          <div>
                            <p className="text-xs font-bold text-white">{ratio.label}</p>
                            <p className="text-[10px] font-mono text-zinc-400">{ratio.dims}</p>
                          </div>
                          {isSelected && <CheckCircle2 className="w-4 h-4 text-red-400 shrink-0" />}
                        </div>
                      );
                    })}
                  </div>
                </div>
              </div>

              {/* Large Glowing Generate Button */}
              <button
                type="submit"
                disabled={isGenerating}
                className="w-full relative group py-4 rounded-2xl bg-gradient-to-r from-red-600 via-rose-600 to-amber-500 text-white font-extrabold text-sm tracking-wide shadow-2xl shadow-red-900/50 hover:shadow-red-600/40 transition-all duration-300 hover:scale-[1.01] cursor-pointer border border-red-400/40 flex items-center justify-center gap-3 overflow-hidden disabled:opacity-50"
              >
                <div className="absolute inset-0 bg-gradient-to-r from-red-500 via-rose-500 to-amber-400 opacity-0 group-hover:opacity-100 transition-opacity duration-300 blur-xl"></div>
                <Zap className="w-5 h-5 animate-pulse relative z-10" />
                <span className="relative z-10">Generate High-CTR AI Thumbnail</span>
                <Sparkles className="w-4 h-4 relative z-10 text-amber-300" />
              </button>
            </form>
          </div>

          {/* RIGHT PANEL: LIVE PREVIEW & AI THINKING ANIMATION (5 Cols) */}
          <div className="lg:col-span-5 space-y-6">
            {/* Live Render Canvas Card */}
            <div className="glass-card rounded-2xl p-5 border border-white/10 space-y-4 sticky top-24">
              <div className="flex items-center justify-between border-b border-white/10 pb-3">
                <div className="flex items-center gap-2">
                  <Eye className="w-4 h-4 text-red-500" />
                  <h3 className="font-extrabold text-sm text-white">Live 4K Thumbnail Preview</h3>
                </div>
                <span className="text-[10px] font-mono font-bold bg-red-500/20 text-red-400 px-2 py-0.5 rounded border border-red-500/30">
                  {selectedRatio}
                </span>
              </div>

              {/* PREVIEW IMAGE / AI THINKING ANIMATION AREA */}
              <div className="relative rounded-xl overflow-hidden border border-white/15 bg-black aspect-video flex items-center justify-center group shadow-2xl">
                {isGenerating ? (
                  /* AI THINKING ANIMATION OVERLAY */
                  <div className="absolute inset-0 bg-[#0F0F0F] flex flex-col items-center justify-center p-6 text-center space-y-4">
                    <div className="relative w-20 h-20">
                      <div className="absolute inset-0 rounded-full border-2 border-dashed border-red-500 animate-spin"></div>
                      <div className="absolute inset-2 rounded-full bg-red-600/20 animate-ping"></div>
                      <div className="absolute inset-3 rounded-full bg-[#181818] border border-red-500 flex items-center justify-center text-red-500">
                        <Brain className="w-8 h-8 animate-pulse text-red-500" />
                      </div>
                    </div>

                    <div className="space-y-1">
                      <p className="text-sm font-black text-white tracking-tight flex items-center justify-center gap-2">
                        <Sparkles className="w-4 h-4 text-amber-400 animate-bounce" />
                        Generating AI Thumbnail...
                      </p>
                      <p className="text-[11px] text-zinc-400 font-mono">
                        {[
                          'Analyzing CTR contrast metrics...',
                          'Synthesizing 3D lighting & facial geometry...',
                          'Applying neon palette rim light filters...',
                          'Rendering high-contrast overlay text banner...',
                        ][generationStep]}
                      </p>
                    </div>

                    <div className="w-full max-w-xs bg-zinc-900 h-2 rounded-full overflow-hidden border border-white/10">
                      <div
                        className="bg-gradient-to-r from-red-600 to-amber-400 h-full rounded-full transition-all duration-150 shadow-[0_0_10px_#FF0000]"
                        style={{ width: `${generationProgress}%` }}
                      ></div>
                    </div>
                  </div>
                ) : (
                  /* GENERATED IMAGE DISPLAY WITH HIGH-CONTRAST OVERLAY TEXT */
                  <>
                    <img
                      src={currentImage}
                      alt="Generated YouTube Thumbnail"
                      referrerPolicy="no-referrer"
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                    />

                    {/* Gradient Dark Vignette Overlay */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-black/30 pointer-events-none"></div>

                    {/* DYNAMIC TEXT OVERLAY BANNER */}
                    {overlayText && (
                      <div className="absolute bottom-4 left-4 right-4 pointer-events-none">
                        <div className="inline-block bg-gradient-to-r from-yellow-400 via-amber-400 to-yellow-500 text-black px-4 py-2 rounded-xl font-black text-lg sm:text-xl tracking-tight uppercase shadow-[0_10px_30px_rgba(0,0,0,0.8)] border-2 border-black transform -rotate-1">
                          {overlayText}
                        </div>
                      </div>
                    )}

                    {/* TOP BADGE */}
                    <div className="absolute top-3 left-3 bg-red-600 text-white font-mono font-bold text-[10px] px-2.5 py-1 rounded-md shadow-md border border-red-400/50">
                      AI CTR PREVIEW: 12.8%
                    </div>
                  </>
                )}
              </div>

              {/* ACTION BUTTONS */}
              <div className="flex items-center gap-2 pt-2">
                <button
                  onClick={handleDownloadThumbnail}
                  disabled={isGenerating}
                  className="flex-1 py-3 rounded-xl bg-gradient-to-r from-red-600 to-rose-600 hover:from-red-500 hover:to-rose-500 text-white font-extrabold text-xs transition shadow-lg flex items-center justify-center gap-2 cursor-pointer border border-red-400/40 disabled:opacity-50"
                >
                  <Download className="w-4 h-4" />
                  <span>Download 4K Thumbnail</span>
                </button>

                <button
                  onClick={() => {
                    const item = history.find((h) => h.generatedImageUrl === currentImage);
                    if (item) toggleFavorite(item.id);
                  }}
                  className="p-3 rounded-xl bg-zinc-900 border border-white/10 hover:border-white/20 text-amber-400 transition cursor-pointer"
                  title="Save to Favorites"
                >
                  <Star className="w-4 h-4 fill-amber-400" />
                </button>
              </div>

              {/* Tip info */}
              <div className="p-3 rounded-xl bg-zinc-900/60 border border-white/5 text-[11px] text-zinc-400 flex items-start gap-2">
                <Info className="w-4 h-4 text-red-400 shrink-0 mt-0.5" />
                <span>
                  Tip: Thumbnails with human facial expressions and 3-word bold yellow overlay text consistently deliver 35% higher click-through rates.
                </span>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ACTIVE VIEW 2 & 3: HISTORY & FAVORITES */}
      {(activeTab === 'history' || activeTab === 'favorites') && (
        <div className="space-y-4">
          <div className="flex items-center justify-between pb-2 border-b border-white/10">
            <h3 className="text-base font-extrabold text-white flex items-center gap-2">
              {activeTab === 'favorites' ? (
                <>
                  <Star className="w-4 h-4 text-amber-400 fill-amber-400" /> Saved Favorite Prompts
                </>
              ) : (
                <>
                  <History className="w-4 h-4 text-red-500" /> Recent Thumbnail Prompt History
                </>
              )}
            </h3>
            <span className="text-xs text-zinc-400 font-mono">
              {activeTab === 'favorites'
                ? `${history.filter((h) => h.isFavorite).length} items saved`
                : `${history.length} recent renders`}
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {history
              .filter((item) => (activeTab === 'favorites' ? item.isFavorite : true))
              .map((item) => (
                <div
                  key={item.id}
                  className="glass-card rounded-2xl p-4 border border-white/10 hover:border-red-500/40 transition duration-200 flex flex-col justify-between space-y-3"
                >
                  <div className="space-y-2">
                    <div className="relative rounded-xl overflow-hidden aspect-video border border-white/10 bg-black">
                      <img
                        src={item.generatedImageUrl}
                        alt="Thumbnail preview"
                        referrerPolicy="no-referrer"
                        className="w-full h-full object-cover"
                      />
                      {item.overlayText && (
                        <div className="absolute bottom-2 left-2 inline-block bg-yellow-400 text-black px-2 py-0.5 rounded font-black text-xs">
                          {item.overlayText}
                        </div>
                      )}
                    </div>

                    <div className="flex items-center justify-between text-[10px] font-mono text-zinc-400">
                      <span>{item.createdAt}</span>
                      <span className="text-red-400 font-bold uppercase">{item.style}</span>
                    </div>

                    <p className="text-xs text-white font-medium line-clamp-2">
                      "{item.prompt}"
                    </p>
                  </div>

                  <div className="flex items-center justify-between pt-2 border-t border-white/5">
                    <button
                      onClick={() => restoreFromHistory(item)}
                      className="px-3 py-1.5 rounded-lg bg-red-600/20 text-red-400 border border-red-500/30 text-xs font-bold hover:bg-red-600 hover:text-white transition cursor-pointer"
                    >
                      Load in Studio Editor
                    </button>

                    <button
                      onClick={() => toggleFavorite(item.id)}
                      className="p-1.5 text-amber-400 hover:text-amber-300 transition cursor-pointer"
                    >
                      <Star className={`w-4 h-4 ${item.isFavorite ? 'fill-amber-400' : ''}`} />
                    </button>
                  </div>
                </div>
              ))}
          </div>
        </div>
      )}
    </div>
  );
};
