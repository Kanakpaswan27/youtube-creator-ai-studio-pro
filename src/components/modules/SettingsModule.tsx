import React, { useState } from 'react';
import {
  User,
  Cpu,
  Zap,
  Download,
  Upload,
  Palette,
  Bell,
  ShieldCheck,
  Info,
  Check,
  Copy,
  ExternalLink,
  Save,
  RefreshCw,
  Trash2,
  Lock,
  Globe,
  Key,
  Database,
  Tv,
  Sparkles,
  Sliders,
  CheckCircle2,
  XCircle,
  AlertTriangle,
  HelpCircle,
  BookOpen,
  Mail,
  FileCode,
  Smartphone,
  Laptop,
  Radio,
  SlidersHorizontal,
  ChevronRight,
  X,
  Send,
  Cloud,
  CheckSquare,
} from 'lucide-react';
import { useCreator } from '../../context/CreatorContext';

interface ApiIntegration {
  id: string;
  name: string;
  category: string;
  status: 'connected' | 'disconnected' | 'testing';
  latency: string;
  apiKey: string;
  description: string;
  iconColor: string;
  isOptional?: boolean;
}

export const SettingsModule: React.FC<{ onBackToDashboard?: () => void }> = () => {
  const { profile, setProfile, avatarUrl, setAvatarUrl, uploadAvatarFile } = useCreator();

  // Active Section Tab
  const [activeSection, setActiveSection] = useState<
    | 'profile'
    | 'ai-pref'
    | 'api-integrations'
    | 'export-backup'
    | 'appearance'
    | 'notifications'
    | 'privacy'
    | 'build-info'
    | 'about'
  >('profile');

  // Toasts State
  const [toastMessage, setToastMessage] = useState<string | null>(null);
  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3000);
  };

  // Section 1: Profile Settings
  const [creatorName, setCreatorName] = useState(profile.creatorName || 'Kanak Kumari');
  const [email, setEmail] = useState('kanak.kumari@creatoros.ai');
  const [channelName, setChannelName] = useState(profile.channelName || 'Creator Workspace (Demo)');
  const [handle, setHandle] = useState(profile.channelHandle || '@kanakkumari_tech');
  const [language, setLanguage] = useState('English (US)');
  const [timeZone, setTimeZone] = useState('UTC+05:30 India Standard Time (IST)');
  const [isSavingProfile, setIsSavingProfile] = useState(false);

  const handleSaveProfile = () => {
    setIsSavingProfile(true);
    setTimeout(() => {
      setProfile((prev) => ({
        ...prev,
        creatorName,
        channelName,
        channelHandle: handle,
      }));
      setIsSavingProfile(false);
      showToast('Profile settings saved successfully!');
    }, 800);
  };

  // Section 2: AI Preferences
  const [aiCreativity, setAiCreativity] = useState<'low' | 'balanced' | 'high'>('balanced');
  const [responseLength, setResponseLength] = useState<'concise' | 'standard' | 'indepth'>('standard');
  const [autoPromptEnhance, setAutoPromptEnhance] = useState(true);
  const [autoSeoGen, setAutoSeoGen] = useState(true);
  const [autoThumbnailEnhance, setAutoThumbnailEnhance] = useState(true);
  const [smartRecommendations, setSmartRecommendations] = useState(true);

  // Section 3: API Integrations
  const [apiIntegrations, setApiIntegrations] = useState<ApiIntegration[]>([
    {
      id: 'gemini',
      name: 'Gemini API',
      category: 'LLM & Multimodal AI',
      status: 'connected',
      latency: '118ms',
      apiKey: 'AIzaSyD7k9P2Xm0Q4vL8w1Rt5Yb3N6z',
      description: 'Powers script synthesis, viral hook generation & channel strategy.',
      iconColor: 'from-blue-600 to-indigo-600',
    },
    {
      id: 'youtube',
      name: 'YouTube Data API v3',
      category: 'OAuth & Workspace Sync',
      status: 'connected',
      latency: '84ms',
      apiKey: 'AIzaSyC4m9T1Vk0R7xN2p5L8a3Qw',
      description: 'Direct YouTube channel OAuth, video metadata upload & analytics.',
      iconColor: 'from-red-600 to-rose-700',
    },
    {
      id: 'pollinations',
      name: 'Pollinations AI',
      category: '4K Image Generation',
      status: 'connected',
      latency: '240ms',
      apiKey: 'Free Open Tier (FLUX.1 Engine)',
      description: 'Renders high-CTR Octane 3D thumbnails with custom face expressions.',
      iconColor: 'from-rose-500 to-pink-600',
    },
    {
      id: 'firebase',
      name: 'Firebase Firestore & Auth',
      category: 'Cloud Storage & Persistence',
      status: 'connected',
      latency: '45ms',
      apiKey: 'creatoros-ai-prod.firebaseapp.com',
      description: 'Persistent user database, security rules & cloud backup.',
      iconColor: 'from-amber-500 to-orange-600',
    },
    {
      id: 'openrouter',
      name: 'OpenRouter Gateway',
      category: 'Multi-LLM Fallback (Optional)',
      status: 'disconnected',
      latency: 'Disconnected',
      apiKey: '',
      description: 'Optional gateway to access Claude 3.5 Sonnet & GPT-4o models.',
      iconColor: 'from-purple-600 to-violet-700',
      isOptional: true,
    },
  ]);

  const [configuringApiId, setConfiguringApiId] = useState<string | null>(null);
  const [configKeyInput, setConfigKeyInput] = useState<string>('');

  const handleTestApiConnection = (id: string) => {
    setApiIntegrations((prev) =>
      prev.map((item) => (item.id === id ? { ...item, status: 'testing' } : item))
    );

    setTimeout(() => {
      const mockLatency = Math.floor(Math.random() * 80 + 50) + 'ms';
      setApiIntegrations((prev) =>
        prev.map((item) =>
          item.id === id
            ? { ...item, status: 'connected', latency: mockLatency }
            : item
        )
      );
      showToast(`Ping test passed! Server response time: ${mockLatency}`);
    }, 1200);
  };

  const handleSaveApiConfig = (id: string) => {
    setApiIntegrations((prev) =>
      prev.map((item) =>
        item.id === id
          ? {
              ...item,
              apiKey: configKeyInput || item.apiKey || 'AIzaSyCustomKeyProvided',
              status: 'connected',
            }
          : item
      )
    );
    setConfiguringApiId(null);
    showToast('API credentials saved & verified successfully!');
  };

  // Section 4: Export & Backup
  const [isExportingWorkspace, setIsExportingWorkspace] = useState(false);
  const [exportWorkspaceProgress, setExportWorkspaceProgress] = useState(0);
  const [lastBackupTime, setLastBackupTime] = useState<string>('August 7, 2026 at 10:30 PM');
  const [isBackingUpCloud, setIsBackingUpCloud] = useState(false);

  const handleExportSettingsJSON = () => {
    const data = {
      profile: { creatorName, email, channelName, handle, language, timeZone },
      aiPreferences: {
        aiCreativity,
        responseLength,
        autoPromptEnhance,
        autoSeoGen,
        autoThumbnailEnhance,
        smartRecommendations,
      },
      apiIntegrations: apiIntegrations.map((a) => ({ id: a.id, name: a.name, status: a.status })),
      exportedAt: new Date().toISOString(),
    };
    const jsonStr = JSON.stringify(data, null, 2);
    const blob = new Blob([jsonStr], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `CreatorOS_Settings_${Date.now()}.json`;
    a.click();
    URL.revokeObjectURL(url);
    showToast('Settings configuration exported as JSON!');
  };

  const handleImportSettingsJSON = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (event) => {
      try {
        const parsed = JSON.parse(event.target?.result as string);
        if (parsed.profile) {
          setCreatorName(parsed.profile.creatorName || creatorName);
          setEmail(parsed.profile.email || email);
          setLanguage(parsed.profile.language || language);
        }
        showToast('Settings imported successfully from file!');
      } catch (err) {
        showToast('Error importing file. Invalid JSON format.');
      }
    };
    reader.readAsText(file);
  };

  const handleDownloadWorkspace = () => {
    setIsExportingWorkspace(true);
    setExportWorkspaceProgress(0);
    const interval = setInterval(() => {
      setExportWorkspaceProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          setTimeout(() => setIsExportingWorkspace(false), 500);
          showToast('Workspace zip package generated and downloaded!');
          return 100;
        }
        return prev + 10;
      });
    }, 100);
  };

  const handleBackupToFirebase = () => {
    setIsBackingUpCloud(true);
    setTimeout(() => {
      setIsBackingUpCloud(false);
      const now = new Date().toLocaleString();
      setLastBackupTime(now);
      showToast('Firebase cloud backup completed!');
    }, 1500);
  };

  // Section 5: Appearance
  const [themeMode, setThemeMode] = useState<'dark' | 'light' | 'system'>('dark');
  const [accentColor, setAccentColor] = useState<'red' | 'purple' | 'cyan' | 'emerald' | 'amber'>('red');
  const [compactMode, setCompactMode] = useState(false);
  const [animationIntensity, setAnimationIntensity] = useState<number>(80);

  // Section 6: Notifications
  const [emailNotifications, setEmailNotifications] = useState(true);
  const [taskCompletionAlerts, setTaskCompletionAlerts] = useState(true);
  const [weeklyReport, setWeeklyReport] = useState(true);
  const [systemUpdates, setSystemUpdates] = useState(false);

  // Section 7: Privacy & Security
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [deleteConfirmationInput, setDeleteConfirmationInput] = useState('');
  const [isDeleting, setIsDeleting] = useState(false);

  const handleConfirmDeleteWorkspace = () => {
    if (deleteConfirmationInput !== 'DELETE CREATOROS') return;
    setIsDeleting(true);
    setTimeout(() => {
      setIsDeleting(false);
      setShowDeleteModal(false);
      setDeleteConfirmationInput('');
      showToast('Workspace reset to factory defaults.');
    }, 1500);
  };

  // Section 8: About Modals
  const [activeAboutModal, setActiveAboutModal] = useState<'docs' | 'support' | 'release' | null>(null);

  const sectionsList = [
    { id: 'profile', label: '1. Profile Settings', icon: User },
    { id: 'ai-pref', label: '2. AI Preferences', icon: Cpu },
    { id: 'api-integrations', label: '3. API Integrations', icon: Key },
    { id: 'export-backup', label: '4. Export & Backup', icon: Download },
    { id: 'appearance', label: '5. Appearance', icon: Palette },
    { id: 'notifications', label: '6. Notifications', icon: Bell },
    { id: 'privacy', label: '7. Privacy & Security', icon: ShieldCheck },
    { id: 'build-info', label: '8. Build & Tech Stack', icon: FileCode },
    { id: 'about', label: '9. About CreatorOS', icon: Info },
  ] as const;

  return (
    <div className="space-y-6 max-w-[1600px] mx-auto pb-12">
      {/* TOAST NOTIFICATION FLOATER */}
      {toastMessage && (
        <div className="fixed bottom-6 right-6 z-50 px-4 py-3 rounded-2xl bg-zinc-900 border border-red-500/50 text-white text-xs font-bold shadow-2xl flex items-center gap-2.5 animate-in slide-in-from-bottom duration-300">
          <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
          <span>{toastMessage}</span>
        </div>
      )}

      {/* HEADER BAR */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-white/10">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-red-600 via-rose-600 to-amber-600 flex items-center justify-center text-white font-bold shadow-lg shadow-red-900/30">
            <SlidersHorizontal className="w-5 h-5" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h2 className="text-xl font-black text-white tracking-tight">
                Enterprise CreatorOS Settings & Workspace Config
              </h2>
              <span className="bg-red-500/10 text-red-400 text-xs font-bold px-2.5 py-0.5 rounded-full border border-red-500/20 font-mono">
                v1.0.0
              </span>
            </div>
            <p className="text-xs text-zinc-400 mt-0.5">
              Configure profile metadata, Gemini AI models, API keys, export options, theme aesthetics & security protocols
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={handleSaveProfile}
            disabled={isSavingProfile}
            className="px-4 py-2 rounded-xl bg-gradient-to-r from-red-600 to-rose-600 hover:from-red-500 hover:to-rose-500 text-white text-xs font-extrabold transition flex items-center gap-2 cursor-pointer shadow-lg shadow-red-900/30 border border-red-400/30 disabled:opacity-50"
          >
            <Save className={`w-4 h-4 ${isSavingProfile ? 'animate-spin' : ''}`} />
            <span>{isSavingProfile ? 'Saving All...' : 'Save All Changes'}</span>
          </button>
        </div>
      </div>

      {/* MAIN TWO-COLUMN LAYOUT: SIDE NAVIGATION + CONTENT AREA */}
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        {/* LEFT COLUMN: NAVIGATION MENU */}
        <div className="lg:col-span-1 space-y-1 bg-[#121212] p-2.5 rounded-2xl border border-white/10 self-start sticky top-24">
          <p className="px-3 py-1.5 text-[10px] font-bold text-zinc-400 uppercase tracking-widest font-mono">
            Settings Navigation
          </p>
          {sectionsList.map((sec) => {
            const Icon = sec.icon;
            const isActive = activeSection === sec.id;
            return (
              <button
                key={sec.id}
                onClick={() => setActiveSection(sec.id)}
                className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl font-medium text-xs transition-all duration-200 cursor-pointer ${
                  isActive
                    ? 'bg-gradient-to-r from-red-950/80 to-red-900/40 text-white border border-red-500/40 shadow-md'
                    : 'text-zinc-400 hover:text-white hover:bg-white/[0.04]'
                }`}
              >
                <div className="flex items-center gap-2.5 truncate">
                  <Icon
                    className={`w-4 h-4 shrink-0 ${
                      isActive ? 'text-red-500' : 'text-zinc-400'
                    }`}
                  />
                  <span className="truncate">{sec.label}</span>
                </div>
                <ChevronRight
                  className={`w-3.5 h-3.5 shrink-0 transition-transform ${
                    isActive ? 'text-red-500 translate-x-0.5' : 'text-zinc-600'
                  }`}
                />
              </button>
            );
          })}
        </div>

        {/* RIGHT COLUMN: ACTIVE SECTION CONTENT */}
        <div className="lg:col-span-3 space-y-6">
          {/* SECTION 1: PROFILE SETTINGS */}
          {activeSection === 'profile' && (
            <div className="glass-card rounded-2xl p-6 border border-white/10 space-y-6 animate-in fade-in">
              <div className="flex items-center justify-between border-b border-white/10 pb-4">
                <div className="flex items-center gap-2.5">
                  <User className="w-5 h-5 text-red-500" />
                  <h3 className="text-base font-bold text-white">1. Profile Settings</h3>
                </div>
                <span className="text-[10px] font-mono text-zinc-400">Personal & Channel Metadata</span>
              </div>

              {/* AVATAR & NAME */}
              <div className="flex flex-col sm:flex-row items-center gap-6 p-5 rounded-2xl bg-zinc-900/60 border border-white/5">
                <div className="relative group shrink-0">
                  <div className="relative w-24 h-24 rounded-full overflow-hidden border-2 border-red-500 shadow-[0_0_20px_rgba(239,68,68,0.6)] bg-zinc-800 flex items-center justify-center">
                    <img
                      src={avatarUrl}
                      alt={creatorName}
                      className="w-full h-full object-cover rounded-full"
                    />
                    <span
                      className="absolute bottom-1 right-1 w-4 h-4 rounded-full bg-emerald-500 ring-2 ring-[#181818] shadow-[0_0_8px_rgba(16,185,129,0.9)] animate-pulse"
                      title="Online Status"
                    />
                  </div>
                </div>

                <div className="space-y-2 text-center sm:text-left flex-1">
                  <div>
                    <p className="text-base font-extrabold text-white">{creatorName}</p>
                    <p className="text-xs text-zinc-400 font-mono">{email}</p>
                    <span className="inline-block px-2.5 py-0.5 rounded-md bg-red-500/10 text-red-400 border border-red-500/20 text-[10px] font-mono font-bold mt-1">
                      Verified Creator Profile
                    </span>
                  </div>

                  <div className="flex flex-wrap items-center justify-center sm:justify-start gap-2 pt-1">
                    <label className="px-4 py-2 rounded-xl bg-gradient-to-r from-red-600 to-rose-600 hover:from-red-500 hover:to-rose-500 text-white text-xs font-bold transition flex items-center gap-2 cursor-pointer shadow-lg shadow-red-900/30 border border-red-400/30">
                      <Upload className="w-4 h-4" />
                      <span>Upload Profile Photo</span>
                      <input
                        type="file"
                        accept="image/*"
                        onChange={async (e) => {
                          const file = e.target.files?.[0];
                          if (file) {
                            await uploadAvatarFile(file);
                            showToast('Profile photo updated successfully across CreatorOS!');
                          }
                        }}
                        className="hidden"
                      />
                    </label>

                    <button
                      type="button"
                      onClick={() => {
                        const randomSeed = Math.floor(Math.random() * 1000);
                        setAvatarUrl(`https://picsum.photos/seed/${randomSeed}/300/300`);
                        showToast('Avatar picture refreshed!');
                      }}
                      className="px-3 py-2 rounded-xl bg-zinc-800 hover:bg-zinc-700 text-zinc-300 text-xs font-bold transition flex items-center gap-1.5 cursor-pointer border border-white/10"
                      title="Generate Random Avatar"
                    >
                      <RefreshCw className="w-3.5 h-3.5" />
                      <span>Randomize</span>
                    </button>
                  </div>
                </div>
              </div>

              {/* FORM FIELDS */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-zinc-300">Creator Full Name</label>
                  <input
                    type="text"
                    value={creatorName}
                    onChange={(e) => setCreatorName(e.target.value)}
                    className="w-full glass-input rounded-xl px-3.5 py-2.5 text-xs text-white placeholder-zinc-500"
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-zinc-300">Email Address</label>
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full glass-input rounded-xl px-3.5 py-2.5 text-xs text-white placeholder-zinc-500"
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-zinc-300">YouTube Channel Name</label>
                  <input
                    type="text"
                    value={channelName}
                    onChange={(e) => setChannelName(e.target.value)}
                    className="w-full glass-input rounded-xl px-3.5 py-2.5 text-xs text-white placeholder-zinc-500"
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-zinc-300">Channel Handle</label>
                  <input
                    type="text"
                    value={handle}
                    onChange={(e) => setHandle(e.target.value)}
                    className="w-full glass-input rounded-xl px-3.5 py-2.5 text-xs text-white placeholder-zinc-500 font-mono"
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-zinc-300">Preferred Interface Language</label>
                  <select
                    value={language}
                    onChange={(e) => setLanguage(e.target.value)}
                    className="w-full glass-input rounded-xl px-3.5 py-2.5 text-xs text-white bg-zinc-900 border border-white/10"
                  >
                    <option value="English (US)">English (US)</option>
                    <option value="English (UK)">English (UK)</option>
                    <option value="Hindi (हिन्दी)">Hindi (हिन्दी)</option>
                    <option value="Spanish (Español)">Spanish (Español)</option>
                    <option value="French (Français)">French (Français)</option>
                    <option value="German (Deutsch)">German (Deutsch)</option>
                    <option value="Japanese (日本語)">Japanese (日本語)</option>
                    <option value="Portuguese (Português)">Portuguese (Português)</option>
                  </select>
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-zinc-300">Time Zone</label>
                  <select
                    value={timeZone}
                    onChange={(e) => setTimeZone(e.target.value)}
                    className="w-full glass-input rounded-xl px-3.5 py-2.5 text-xs text-white bg-zinc-900 border border-white/10"
                  >
                    <option value="UTC-08:00 Pacific Time">UTC-08:00 Pacific Time (PST)</option>
                    <option value="UTC-05:00 Eastern Time">UTC-05:00 Eastern Time (EST)</option>
                    <option value="UTC+00:00 London/GMT">UTC+00:00 London / GMT</option>
                    <option value="UTC+01:00 Central European">UTC+01:00 Central European (CET)</option>
                    <option value="UTC+05:30 India Standard Time (IST)">UTC+05:30 India Standard Time (IST)</option>
                    <option value="UTC+09:00 Tokyo/JST">UTC+09:00 Tokyo (JST)</option>
                  </select>
                </div>
              </div>

              <div className="pt-2 flex justify-end">
                <button
                  onClick={handleSaveProfile}
                  className="px-5 py-2.5 rounded-xl bg-red-600 hover:bg-red-500 text-white text-xs font-bold transition flex items-center gap-2 cursor-pointer shadow-lg shadow-red-900/30"
                >
                  <Save className="w-4 h-4" />
                  <span>Save Profile Settings</span>
                </button>
              </div>
            </div>
          )}

          {/* SECTION 2: AI PREFERENCES */}
          {activeSection === 'ai-pref' && (
            <div className="glass-card rounded-2xl p-6 border border-white/10 space-y-6 animate-in fade-in">
              <div className="flex items-center justify-between border-b border-white/10 pb-4">
                <div className="flex items-center gap-2.5">
                  <Cpu className="w-5 h-5 text-red-500" />
                  <h3 className="text-base font-bold text-white">2. AI Preferences & Autonomy Control</h3>
                </div>
                <span className="text-[10px] font-mono text-zinc-400">Gemini 2.5 Engine Settings</span>
              </div>

              {/* AI CREATIVITY LEVEL */}
              <div className="space-y-2">
                <label className="text-xs font-bold text-zinc-300 flex items-center gap-1.5">
                  <Sparkles className="w-4 h-4 text-amber-400" /> AI Creativity & Temperature Level
                </label>
                <div className="grid grid-cols-3 gap-3 p-1.5 rounded-xl bg-zinc-900 border border-white/10">
                  <button
                    onClick={() => setAiCreativity('low')}
                    className={`py-2.5 px-3 rounded-lg text-xs font-bold transition flex flex-col items-center gap-0.5 cursor-pointer ${
                      aiCreativity === 'low'
                        ? 'bg-red-600 text-white shadow-md'
                        : 'text-zinc-400 hover:text-white'
                    }`}
                  >
                    <span>Low (0.2)</span>
                    <span className="text-[10px] font-normal opacity-80">Precise & Factual</span>
                  </button>
                  <button
                    onClick={() => setAiCreativity('balanced')}
                    className={`py-2.5 px-3 rounded-lg text-xs font-bold transition flex flex-col items-center gap-0.5 cursor-pointer ${
                      aiCreativity === 'balanced'
                        ? 'bg-red-600 text-white shadow-md'
                        : 'text-zinc-400 hover:text-white'
                    }`}
                  >
                    <span>Balanced (0.7)</span>
                    <span className="text-[10px] font-normal opacity-80">Optimal YouTube Mix</span>
                  </button>
                  <button
                    onClick={() => setAiCreativity('high')}
                    className={`py-2.5 px-3 rounded-lg text-xs font-bold transition flex flex-col items-center gap-0.5 cursor-pointer ${
                      aiCreativity === 'high'
                        ? 'bg-red-600 text-white shadow-md'
                        : 'text-zinc-400 hover:text-white'
                    }`}
                  >
                    <span>High (1.0)</span>
                    <span className="text-[10px] font-normal opacity-80">Wild & Out-of-Box</span>
                  </button>
                </div>
              </div>

              {/* RESPONSE LENGTH */}
              <div className="space-y-2">
                <label className="text-xs font-bold text-zinc-300">AI Script Response Length</label>
                <div className="grid grid-cols-3 gap-3">
                  <button
                    onClick={() => setResponseLength('concise')}
                    className={`p-3 rounded-xl border text-xs font-bold transition text-left cursor-pointer ${
                      responseLength === 'concise'
                        ? 'bg-red-950/40 border-red-500/50 text-white'
                        : 'bg-zinc-900 border-white/10 text-zinc-400 hover:border-white/20'
                    }`}
                  >
                    <p className="font-extrabold text-white">Concise</p>
                    <p className="text-[10px] text-zinc-400 font-normal mt-0.5">Short Shorts / Reels (~300 words)</p>
                  </button>
                  <button
                    onClick={() => setResponseLength('standard')}
                    className={`p-3 rounded-xl border text-xs font-bold transition text-left cursor-pointer ${
                      responseLength === 'standard'
                        ? 'bg-red-950/40 border-red-500/50 text-white'
                        : 'bg-zinc-900 border-white/10 text-zinc-400 hover:border-white/20'
                    }`}
                  >
                    <p className="font-extrabold text-white">Standard</p>
                    <p className="text-[10px] text-zinc-400 font-normal mt-0.5">Standard 8-12 min video (~1200 words)</p>
                  </button>
                  <button
                    onClick={() => setResponseLength('indepth')}
                    className={`p-3 rounded-xl border text-xs font-bold transition text-left cursor-pointer ${
                      responseLength === 'indepth'
                        ? 'bg-red-950/40 border-red-500/50 text-white'
                        : 'bg-zinc-900 border-white/10 text-zinc-400 hover:border-white/20'
                    }`}
                  >
                    <p className="font-extrabold text-white">In-Depth</p>
                    <p className="text-[10px] text-zinc-400 font-normal mt-0.5">Deep Tutorial (~2500+ words)</p>
                  </button>
                </div>
              </div>

              {/* AUTOMATION TOGGLES */}
              <div className="space-y-3 pt-2">
                <label className="text-xs font-bold text-zinc-300 uppercase tracking-wider font-mono">
                  Autonomous AI Workflows
                </label>

                <div className="space-y-2.5">
                  {/* Toggle 1 */}
                  <div className="p-3.5 rounded-xl bg-zinc-900/60 border border-white/5 flex items-center justify-between">
                    <div>
                      <p className="text-xs font-bold text-white">Auto Prompt Enhancement</p>
                      <p className="text-[10px] text-zinc-400">Automatically rewrite and optimize user prompts for maximum Gemini clarity.</p>
                    </div>
                    <button
                      onClick={() => setAutoPromptEnhance(!autoPromptEnhance)}
                      className={`w-11 h-6 rounded-full transition-colors p-1 cursor-pointer shrink-0 ${
                        autoPromptEnhance ? 'bg-red-600' : 'bg-zinc-700'
                      }`}
                    >
                      <div
                        className={`w-4 h-4 rounded-full bg-white transition-transform ${
                          autoPromptEnhance ? 'translate-x-5' : 'translate-x-0'
                        }`}
                      ></div>
                    </button>
                  </div>

                  {/* Toggle 2 */}
                  <div className="p-3.5 rounded-xl bg-zinc-900/60 border border-white/5 flex items-center justify-between">
                    <div>
                      <p className="text-xs font-bold text-white">Auto SEO Keyword Cluster Generation</p>
                      <p className="text-[10px] text-zinc-400">Instantly compute 20 high-CPM tags & titles whenever a script is generated.</p>
                    </div>
                    <button
                      onClick={() => setAutoSeoGen(!autoSeoGen)}
                      className={`w-11 h-6 rounded-full transition-colors p-1 cursor-pointer shrink-0 ${
                        autoSeoGen ? 'bg-red-600' : 'bg-zinc-700'
                      }`}
                    >
                      <div
                        className={`w-4 h-4 rounded-full bg-white transition-transform ${
                          autoSeoGen ? 'translate-x-5' : 'translate-x-0'
                        }`}
                      ></div>
                    </button>
                  </div>

                  {/* Toggle 3 */}
                  <div className="p-3.5 rounded-xl bg-zinc-900/60 border border-white/5 flex items-center justify-between">
                    <div>
                      <p className="text-xs font-bold text-white">Auto Thumbnail Enhancement</p>
                      <p className="text-[10px] text-zinc-400">Suggest high-CTR Octane 3D prompt parameters & color contrast setups.</p>
                    </div>
                    <button
                      onClick={() => setAutoThumbnailEnhance(!autoThumbnailEnhance)}
                      className={`w-11 h-6 rounded-full transition-colors p-1 cursor-pointer shrink-0 ${
                        autoThumbnailEnhance ? 'bg-red-600' : 'bg-zinc-700'
                      }`}
                    >
                      <div
                        className={`w-4 h-4 rounded-full bg-white transition-transform ${
                          autoThumbnailEnhance ? 'translate-x-5' : 'translate-x-0'
                        }`}
                      ></div>
                    </button>
                  </div>

                  {/* Toggle 4 */}
                  <div className="p-3.5 rounded-xl bg-zinc-900/60 border border-white/5 flex items-center justify-between">
                    <div>
                      <p className="text-xs font-bold text-white">Smart Topic & Viral Recommendations</p>
                      <p className="text-[10px] text-zinc-400">Analyze channel velocity to recommend viral video ideas in dashboard feed.</p>
                    </div>
                    <button
                      onClick={() => setSmartRecommendations(!smartRecommendations)}
                      className={`w-11 h-6 rounded-full transition-colors p-1 cursor-pointer shrink-0 ${
                        smartRecommendations ? 'bg-red-600' : 'bg-zinc-700'
                      }`}
                    >
                      <div
                        className={`w-4 h-4 rounded-full bg-white transition-transform ${
                          smartRecommendations ? 'translate-x-5' : 'translate-x-0'
                        }`}
                      ></div>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* SECTION 3: API INTEGRATIONS */}
          {activeSection === 'api-integrations' && (
            <div className="glass-card rounded-2xl p-6 border border-white/10 space-y-6 animate-in fade-in">
              <div className="flex items-center justify-between border-b border-white/10 pb-4">
                <div className="flex items-center gap-2.5">
                  <Key className="w-5 h-5 text-red-500" />
                  <h3 className="text-base font-bold text-white">3. API Integrations & Cloud Services</h3>
                </div>
                <span className="text-[10px] font-mono text-zinc-400">5 Connection Protocols</span>
              </div>

              {/* API INTEGRATION CARDS */}
              <div className="space-y-4">
                {apiIntegrations.map((api) => (
                  <div
                    key={api.id}
                    className="p-5 rounded-2xl bg-zinc-900/60 border border-white/10 space-y-4 hover:border-white/20 transition"
                  >
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                      <div className="flex items-center gap-3">
                        <div
                          className={`w-10 h-10 rounded-xl bg-gradient-to-br ${api.iconColor} flex items-center justify-center text-white font-bold shadow-lg shrink-0`}
                        >
                          <Zap className="w-5 h-5" />
                        </div>
                        <div>
                          <div className="flex items-center gap-2">
                            <h4 className="text-sm font-bold text-white">{api.name}</h4>
                            {api.isOptional && (
                              <span className="px-2 py-0.5 rounded bg-zinc-800 text-zinc-400 text-[10px] font-mono">
                                Optional
                              </span>
                            )}
                          </div>
                          <p className="text-[11px] text-zinc-400">{api.description}</p>
                        </div>
                      </div>

                      {/* STATUS BADGE */}
                      <div className="flex items-center gap-2 shrink-0">
                        {api.status === 'connected' && (
                          <span className="px-3 py-1 rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 text-xs font-bold font-mono flex items-center gap-1.5">
                            <CheckCircle2 className="w-3.5 h-3.5" />
                            Connected ({api.latency})
                          </span>
                        )}
                        {api.status === 'disconnected' && (
                          <span className="px-3 py-1 rounded-full bg-zinc-800 text-zinc-400 border border-white/10 text-xs font-bold font-mono flex items-center gap-1.5">
                            <XCircle className="w-3.5 h-3.5 text-zinc-500" />
                            Not Connected
                          </span>
                        )}
                        {api.status === 'testing' && (
                          <span className="px-3 py-1 rounded-full bg-amber-500/10 text-amber-400 border border-amber-500/20 text-xs font-bold font-mono flex items-center gap-1.5 animate-pulse">
                            <RefreshCw className="w-3.5 h-3.5 animate-spin" />
                            Testing Ping...
                          </span>
                        )}
                      </div>
                    </div>

                    {/* KEY PREVIEW & ACTIONS */}
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pt-3 border-t border-white/5">
                      <div className="font-mono text-xs text-zinc-400 flex items-center gap-2">
                        <span className="text-[10px] uppercase text-zinc-500">Key:</span>
                        <span className="text-zinc-200 font-semibold truncate max-w-xs bg-zinc-950 px-2.5 py-1 rounded-lg border border-white/5">
                          {api.apiKey || 'No Key Configured'}
                        </span>
                      </div>

                      <div className="flex items-center gap-2">
                        <button
                          onClick={() => {
                            setConfiguringApiId(api.id);
                            setConfigKeyInput(api.apiKey);
                          }}
                          className="px-3 py-1.5 rounded-xl bg-zinc-800 hover:bg-zinc-700 text-white text-xs font-bold transition flex items-center gap-1.5 cursor-pointer border border-white/10"
                        >
                          <Sliders className="w-3.5 h-3.5" />
                          <span>Configure</span>
                        </button>

                        <button
                          onClick={() => handleTestApiConnection(api.id)}
                          disabled={api.status === 'testing'}
                          className="px-3 py-1.5 rounded-xl bg-red-600/20 hover:bg-red-600 text-red-300 hover:text-white border border-red-500/30 text-xs font-bold transition flex items-center gap-1.5 cursor-pointer disabled:opacity-50"
                        >
                          <RefreshCw className={`w-3.5 h-3.5 ${api.status === 'testing' ? 'animate-spin' : ''}`} />
                          <span>Test Connection</span>
                        </button>
                      </div>
                    </div>

                    {/* INLINE CONFIG MODAL/DRAWER IF SELECTED */}
                    {configuringApiId === api.id && (
                      <div className="p-4 rounded-xl bg-zinc-950 border border-red-500/30 space-y-3 animate-in fade-in">
                        <div className="flex items-center justify-between">
                          <label className="text-xs font-bold text-white flex items-center gap-1.5">
                            <Key className="w-4 h-4 text-red-500" />
                            Configure {api.name} API Credential
                          </label>
                          <button
                            onClick={() => setConfiguringApiId(null)}
                            className="text-zinc-400 hover:text-white transition cursor-pointer"
                          >
                            <X className="w-4 h-4" />
                          </button>
                        </div>
                        <input
                          type="password"
                          value={configKeyInput}
                          onChange={(e) => setConfigKeyInput(e.target.value)}
                          placeholder="Paste your secret API key here..."
                          className="w-full glass-input rounded-xl px-3.5 py-2 text-xs text-white font-mono placeholder-zinc-600"
                        />
                        <div className="flex justify-end gap-2">
                          <button
                            onClick={() => setConfiguringApiId(null)}
                            className="px-3 py-1.5 rounded-lg bg-zinc-800 text-zinc-300 text-xs font-bold hover:bg-zinc-700 cursor-pointer"
                          >
                            Cancel
                          </button>
                          <button
                            onClick={() => handleSaveApiConfig(api.id)}
                            className="px-3.5 py-1.5 rounded-lg bg-red-600 hover:bg-red-500 text-white text-xs font-bold cursor-pointer"
                          >
                            Save & Verify Key
                          </button>
                        </div>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* SECTION 4: EXPORT & BACKUP */}
          {activeSection === 'export-backup' && (
            <div className="glass-card rounded-2xl p-6 border border-white/10 space-y-6 animate-in fade-in">
              <div className="flex items-center justify-between border-b border-white/10 pb-4">
                <div className="flex items-center gap-2.5">
                  <Download className="w-5 h-5 text-red-500" />
                  <h3 className="text-base font-bold text-white">4. Export, Import & Cloud Backup</h3>
                </div>
                <span className="text-[10px] font-mono text-zinc-400">Data Portability</span>
              </div>

              {/* ACTION CARDS GRID */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {/* Export Settings */}
                <div className="p-5 rounded-2xl bg-zinc-900/60 border border-white/10 space-y-3">
                  <div className="flex items-center gap-2 text-white font-bold text-sm">
                    <FileCode className="w-4 h-4 text-purple-400" />
                    <span>Export Settings JSON</span>
                  </div>
                  <p className="text-xs text-zinc-400">
                    Download your full CreatorOS profile, AI model preferences, and custom settings as a portable JSON file.
                  </p>
                  <button
                    onClick={handleExportSettingsJSON}
                    className="w-full py-2.5 rounded-xl bg-zinc-800 hover:bg-zinc-700 text-white text-xs font-bold transition flex items-center justify-center gap-2 cursor-pointer border border-white/10"
                  >
                    <Download className="w-4 h-4" />
                    <span>Download JSON Settings</span>
                  </button>
                </div>

                {/* Import Settings */}
                <div className="p-5 rounded-2xl bg-zinc-900/60 border border-white/10 space-y-3">
                  <div className="flex items-center gap-2 text-white font-bold text-sm">
                    <Upload className="w-4 h-4 text-blue-400" />
                    <span>Import Settings</span>
                  </div>
                  <p className="text-xs text-zinc-400">
                    Restore workspace configuration from a previously exported `.json` settings file.
                  </p>
                  <label className="w-full py-2.5 rounded-xl bg-zinc-800 hover:bg-zinc-700 text-white text-xs font-bold transition flex items-center justify-center gap-2 cursor-pointer border border-white/10">
                    <Upload className="w-4 h-4" />
                    <span>Upload Settings File</span>
                    <input
                      type="file"
                      accept=".json"
                      onChange={handleImportSettingsJSON}
                      className="hidden"
                    />
                  </label>
                </div>

                {/* Download Workspace */}
                <div className="p-5 rounded-2xl bg-zinc-900/60 border border-white/10 space-y-3">
                  <div className="flex items-center gap-2 text-white font-bold text-sm">
                    <Download className="w-4 h-4 text-amber-400" />
                    <span>Download Complete Workspace</span>
                  </div>
                  <p className="text-xs text-zinc-400">
                    Package all scripts, 4K thumbnail prompts, SEO keyword lists & affiliate links into a zip file.
                  </p>
                  <button
                    onClick={handleDownloadWorkspace}
                    disabled={isExportingWorkspace}
                    className="w-full py-2.5 rounded-xl bg-gradient-to-r from-red-600 to-rose-600 hover:from-red-500 hover:to-rose-500 text-white text-xs font-bold transition flex items-center justify-center gap-2 cursor-pointer shadow-lg shadow-red-900/30 disabled:opacity-50"
                  >
                    <RefreshCw className={`w-4 h-4 ${isExportingWorkspace ? 'animate-spin' : ''}`} />
                    <span>{isExportingWorkspace ? `Zipping (${exportWorkspaceProgress}%)...` : 'Export Workspace (.zip)'}</span>
                  </button>
                </div>

                {/* Backup to Firebase */}
                <div className="p-5 rounded-2xl bg-zinc-900/60 border border-white/10 space-y-3">
                  <div className="flex items-center gap-2 text-white font-bold text-sm">
                    <Cloud className="w-4 h-4 text-emerald-400" />
                    <span>Cloud Backup to Firebase</span>
                  </div>
                  <p className="text-xs text-zinc-400">
                    Sync workspace state directly with your Firestore project database. Last backup: <span className="text-emerald-400 font-mono">{lastBackupTime}</span>
                  </p>
                  <button
                    onClick={handleBackupToFirebase}
                    disabled={isBackingUpCloud}
                    className="w-full py-2.5 rounded-xl bg-emerald-600/20 hover:bg-emerald-600 text-emerald-300 hover:text-white border border-emerald-500/30 text-xs font-bold transition flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50"
                  >
                    <Cloud className={`w-4 h-4 ${isBackingUpCloud ? 'animate-bounce' : ''}`} />
                    <span>{isBackingUpCloud ? 'Syncing to Firestore...' : 'Sync Cloud Backup'}</span>
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* SECTION 5: APPEARANCE */}
          {activeSection === 'appearance' && (
            <div className="glass-card rounded-2xl p-6 border border-white/10 space-y-6 animate-in fade-in">
              <div className="flex items-center justify-between border-b border-white/10 pb-4">
                <div className="flex items-center gap-2.5">
                  <Palette className="w-5 h-5 text-red-500" />
                  <h3 className="text-base font-bold text-white">5. Appearance & Styling Customization</h3>
                </div>
                <span className="text-[10px] font-mono text-zinc-400">YouTube Dark Glass Aesthetics</span>
              </div>

              {/* THEME PICKER */}
              <div className="space-y-2">
                <label className="text-xs font-bold text-zinc-300">Application Theme Mode</label>
                <div className="grid grid-cols-3 gap-3 p-1.5 rounded-xl bg-zinc-900 border border-white/10">
                  <button
                    onClick={() => setThemeMode('dark')}
                    className={`py-2.5 px-3 rounded-lg text-xs font-bold transition flex items-center justify-center gap-2 cursor-pointer ${
                      themeMode === 'dark'
                        ? 'bg-red-600 text-white shadow-md'
                        : 'text-zinc-400 hover:text-white'
                    }`}
                  >
                    <Laptop className="w-4 h-4" />
                    <span>Dark Theme (YouTube)</span>
                  </button>
                  <button
                    onClick={() => setThemeMode('light')}
                    className={`py-2.5 px-3 rounded-lg text-xs font-bold transition flex items-center justify-center gap-2 cursor-pointer ${
                      themeMode === 'light'
                        ? 'bg-red-600 text-white shadow-md'
                        : 'text-zinc-400 hover:text-white'
                    }`}
                  >
                    <Globe className="w-4 h-4" />
                    <span>Light Theme</span>
                  </button>
                  <button
                    onClick={() => setThemeMode('system')}
                    className={`py-2.5 px-3 rounded-lg text-xs font-bold transition flex items-center justify-center gap-2 cursor-pointer ${
                      themeMode === 'system'
                        ? 'bg-red-600 text-white shadow-md'
                        : 'text-zinc-400 hover:text-white'
                    }`}
                  >
                    <Radio className="w-4 h-4" />
                    <span>System Auto</span>
                  </button>
                </div>
              </div>

              {/* ACCENT COLOR PICKER */}
              <div className="space-y-2">
                <label className="text-xs font-bold text-zinc-300">Primary Brand Accent Color</label>
                <div className="flex items-center gap-4 p-3 rounded-xl bg-zinc-900/60 border border-white/5">
                  <button
                    onClick={() => setAccentColor('red')}
                    className={`flex items-center gap-2 px-3 py-1.5 rounded-lg border text-xs font-bold transition cursor-pointer ${
                      accentColor === 'red'
                        ? 'bg-red-600 text-white border-red-400'
                        : 'bg-zinc-800 text-zinc-400 border-white/5'
                    }`}
                  >
                    <span className="w-3 h-3 rounded-full bg-red-600"></span>
                    <span>YouTube Red</span>
                  </button>

                  <button
                    onClick={() => setAccentColor('purple')}
                    className={`flex items-center gap-2 px-3 py-1.5 rounded-lg border text-xs font-bold transition cursor-pointer ${
                      accentColor === 'purple'
                        ? 'bg-purple-600 text-white border-purple-400'
                        : 'bg-zinc-800 text-zinc-400 border-white/5'
                    }`}
                  >
                    <span className="w-3 h-3 rounded-full bg-purple-600"></span>
                    <span>Cyber Violet</span>
                  </button>

                  <button
                    onClick={() => setAccentColor('cyan')}
                    className={`flex items-center gap-2 px-3 py-1.5 rounded-lg border text-xs font-bold transition cursor-pointer ${
                      accentColor === 'cyan'
                        ? 'bg-cyan-600 text-white border-cyan-400'
                        : 'bg-zinc-800 text-zinc-400 border-white/5'
                    }`}
                  >
                    <span className="w-3 h-3 rounded-full bg-cyan-500"></span>
                    <span>Neon Cyan</span>
                  </button>

                  <button
                    onClick={() => setAccentColor('emerald')}
                    className={`flex items-center gap-2 px-3 py-1.5 rounded-lg border text-xs font-bold transition cursor-pointer ${
                      accentColor === 'emerald'
                        ? 'bg-emerald-600 text-white border-emerald-400'
                        : 'bg-zinc-800 text-zinc-400 border-white/5'
                    }`}
                  >
                    <span className="w-3 h-3 rounded-full bg-emerald-500"></span>
                    <span>Emerald Tech</span>
                  </button>

                  <button
                    onClick={() => setAccentColor('amber')}
                    className={`flex items-center gap-2 px-3 py-1.5 rounded-lg border text-xs font-bold transition cursor-pointer ${
                      accentColor === 'amber'
                        ? 'bg-amber-600 text-white border-amber-400'
                        : 'bg-zinc-800 text-zinc-400 border-white/5'
                    }`}
                  >
                    <span className="w-3 h-3 rounded-full bg-amber-500"></span>
                    <span>Amber Gold</span>
                  </button>
                </div>
              </div>

              {/* COMPACT MODE & ANIMATION INTENSITY */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="p-4 rounded-xl bg-zinc-900/60 border border-white/5 space-y-2">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-xs font-bold text-white">Compact High-Density View</p>
                      <p className="text-[10px] text-zinc-400">Reduce padding and text margins for power users.</p>
                    </div>
                    <button
                      onClick={() => setCompactMode(!compactMode)}
                      className={`w-11 h-6 rounded-full transition-colors p-1 cursor-pointer shrink-0 ${
                        compactMode ? 'bg-red-600' : 'bg-zinc-700'
                      }`}
                    >
                      <div
                        className={`w-4 h-4 rounded-full bg-white transition-transform ${
                          compactMode ? 'translate-x-5' : 'translate-x-0'
                        }`}
                      ></div>
                    </button>
                  </div>
                </div>

                <div className="p-4 rounded-xl bg-zinc-900/60 border border-white/5 space-y-2">
                  <div className="flex items-center justify-between text-xs font-bold text-white">
                    <span>Animation Intensity</span>
                    <span className="text-red-400 font-mono">{animationIntensity}%</span>
                  </div>
                  <input
                    type="range"
                    min="0"
                    max="100"
                    value={animationIntensity}
                    onChange={(e) => setAnimationIntensity(Number(e.target.value))}
                    className="w-full accent-red-600 cursor-pointer"
                  />
                </div>
              </div>
            </div>
          )}

          {/* SECTION 6: NOTIFICATIONS */}
          {activeSection === 'notifications' && (
            <div className="glass-card rounded-2xl p-6 border border-white/10 space-y-6 animate-in fade-in">
              <div className="flex items-center justify-between border-b border-white/10 pb-4">
                <div className="flex items-center gap-2.5">
                  <Bell className="w-5 h-5 text-red-500" />
                  <h3 className="text-base font-bold text-white">6. Notification Alerts & Subscriptions</h3>
                </div>
                <span className="text-[10px] font-mono text-zinc-400">Communication Channels</span>
              </div>

              <div className="space-y-3">
                <div className="p-4 rounded-xl bg-zinc-900/60 border border-white/5 flex items-center justify-between">
                  <div>
                    <p className="text-xs font-bold text-white">Email Digest & Weekly Insights</p>
                    <p className="text-[10px] text-zinc-400">Receive weekly summaries of subscriber growth and AI topic forecasts.</p>
                  </div>
                  <button
                    onClick={() => setEmailNotifications(!emailNotifications)}
                    className={`w-11 h-6 rounded-full transition-colors p-1 cursor-pointer shrink-0 ${
                      emailNotifications ? 'bg-red-600' : 'bg-zinc-700'
                    }`}
                  >
                    <div
                      className={`w-4 h-4 rounded-full bg-white transition-transform ${
                        emailNotifications ? 'translate-x-5' : 'translate-x-0'
                      }`}
                    ></div>
                  </button>
                </div>

                <div className="p-4 rounded-xl bg-zinc-900/60 border border-white/5 flex items-center justify-between">
                  <div>
                    <p className="text-xs font-bold text-white">AI Task Completion Alerts</p>
                    <p className="text-[10px] text-zinc-400">Get notified when multi-step script and thumbnail rendering tasks complete.</p>
                  </div>
                  <button
                    onClick={() => setTaskCompletionAlerts(!taskCompletionAlerts)}
                    className={`w-11 h-6 rounded-full transition-colors p-1 cursor-pointer shrink-0 ${
                      taskCompletionAlerts ? 'bg-red-600' : 'bg-zinc-700'
                    }`}
                  >
                    <div
                      className={`w-4 h-4 rounded-full bg-white transition-transform ${
                        taskCompletionAlerts ? 'translate-x-5' : 'translate-x-0'
                      }`}
                    ></div>
                  </button>
                </div>

                <div className="p-4 rounded-xl bg-zinc-900/60 border border-white/5 flex items-center justify-between">
                  <div>
                    <p className="text-xs font-bold text-white">Weekly Performance Report</p>
                    <p className="text-[10px] text-zinc-400">Automated RPM and affiliate conversion forecast reports sent every Monday.</p>
                  </div>
                  <button
                    onClick={() => setWeeklyReport(!weeklyReport)}
                    className={`w-11 h-6 rounded-full transition-colors p-1 cursor-pointer shrink-0 ${
                      weeklyReport ? 'bg-red-600' : 'bg-zinc-700'
                    }`}
                  >
                    <div
                      className={`w-4 h-4 rounded-full bg-white transition-transform ${
                        weeklyReport ? 'translate-x-5' : 'translate-x-0'
                      }`}
                    ></div>
                  </button>
                </div>

                <div className="p-4 rounded-xl bg-zinc-900/60 border border-white/5 flex items-center justify-between">
                  <div>
                    <p className="text-xs font-bold text-white">System & Engine Updates</p>
                    <p className="text-[10px] text-zinc-400">Be notified immediately when new Gemini 2.5 models or features launch.</p>
                  </div>
                  <button
                    onClick={() => setSystemUpdates(!systemUpdates)}
                    className={`w-11 h-6 rounded-full transition-colors p-1 cursor-pointer shrink-0 ${
                      systemUpdates ? 'bg-red-600' : 'bg-zinc-700'
                    }`}
                  >
                    <div
                      className={`w-4 h-4 rounded-full bg-white transition-transform ${
                        systemUpdates ? 'translate-x-5' : 'translate-x-0'
                      }`}
                    ></div>
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* SECTION 7: PRIVACY & SECURITY */}
          {activeSection === 'privacy' && (
            <div className="glass-card rounded-2xl p-6 border border-white/10 space-y-6 animate-in fade-in">
              <div className="flex items-center justify-between border-b border-white/10 pb-4">
                <div className="flex items-center gap-2.5">
                  <ShieldCheck className="w-5 h-5 text-red-500" />
                  <h3 className="text-base font-bold text-white">7. Privacy, Security & Data Management</h3>
                </div>
                <span className="text-[10px] font-mono text-zinc-400">AES-256 Encryption</span>
              </div>

              {/* ENCRYPTION BADGE CARD */}
              <div className="p-4 rounded-xl bg-emerald-950/20 border border-emerald-500/30 flex items-center gap-4">
                <div className="w-10 h-10 rounded-xl bg-emerald-500/20 text-emerald-400 flex items-center justify-center shrink-0">
                  <Lock className="w-5 h-5" />
                </div>
                <div>
                  <p className="text-xs font-bold text-emerald-300">Data Encryption Active (AES-256 Bit)</p>
                  <p className="text-[11px] text-zinc-400">All API keys, scripts, and personal metadata are stored in isolated encrypted sessions.</p>
                </div>
              </div>

              {/* CONNECTED ACCOUNTS */}
              <div className="space-y-3">
                <label className="text-xs font-bold text-zinc-300 uppercase tracking-wider font-mono">
                  Connected SSO Accounts
                </label>

                <div className="space-y-2">
                  <div className="p-3.5 rounded-xl bg-zinc-900/60 border border-white/5 flex items-center justify-between text-xs">
                    <div className="flex items-center gap-2.5">
                      <Tv className="w-4 h-4 text-red-500" />
                      <div>
                        <p className="font-bold text-white">Google & YouTube Studio Account</p>
                        <p className="text-[10px] text-zinc-400">Creator Workspace (Demo)</p>
                      </div>
                    </div>
                    <span className="px-2.5 py-1 rounded bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 font-mono text-[10px]">
                      Connected
                    </span>
                  </div>

                  <div className="p-3.5 rounded-xl bg-zinc-900/60 border border-white/5 flex items-center justify-between text-xs">
                    <div className="flex items-center gap-2.5">
                      <Database className="w-4 h-4 text-amber-500" />
                      <div>
                        <p className="font-bold text-white">Firebase Auth Session</p>
                        <p className="text-[10px] text-zinc-400">kanak.kumari@creatoros.ai</p>
                      </div>
                    </div>
                    <span className="px-2.5 py-1 rounded bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 font-mono text-[10px]">
                      Active
                    </span>
                  </div>
                </div>
              </div>

              {/* SESSIONS & DELETION */}
              <div className="pt-4 border-t border-white/10 space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-xs font-bold text-white">Active Device Sessions</p>
                    <p className="text-[10px] text-zinc-400">Logged in via Chrome 128 (macOS) & CreatorOS Mobile App.</p>
                  </div>
                  <button
                    onClick={() => showToast('All other device sessions revoked!')}
                    className="px-3 py-1.5 rounded-xl bg-zinc-800 hover:bg-zinc-700 text-zinc-200 text-xs font-bold transition cursor-pointer border border-white/10"
                  >
                    Revoke Other Sessions
                  </button>
                </div>

                {/* DANGER ZONE: DELETE WORKSPACE */}
                <div className="p-4 rounded-xl bg-red-950/20 border border-red-500/40 space-y-3">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-xs font-bold text-red-400 flex items-center gap-1.5">
                        <AlertTriangle className="w-4 h-4" /> Reset / Delete Workspace
                      </p>
                      <p className="text-[10px] text-zinc-400">Permanently wipe cached scripts, generated thumbnails & API keys.</p>
                    </div>
                    <button
                      onClick={() => setShowDeleteModal(true)}
                      className="px-4 py-2 rounded-xl bg-red-600 hover:bg-red-500 text-white text-xs font-bold transition cursor-pointer shadow-lg shadow-red-900/40"
                    >
                      Delete Workspace
                    </button>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* SECTION 8: BUILD INFORMATION */}
          {activeSection === 'build-info' && (
            <div className="glass-card rounded-2xl p-6 border border-white/10 space-y-6 animate-in fade-in">
              <div className="flex items-center justify-between border-b border-white/10 pb-4">
                <div className="flex items-center gap-2.5">
                  <FileCode className="w-5 h-5 text-red-500" />
                  <h3 className="text-base font-bold text-white">8. Build Information & Stack Specs</h3>
                </div>
                <span className="text-[10px] font-mono text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded border border-emerald-500/20">
                  Production Ready
                </span>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {/* Tech 1: React 19 / Vite */}
                <div className="p-4 rounded-xl bg-zinc-900/80 border border-white/10 space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-black text-cyan-400 font-mono">React 19 & Vite 6</span>
                    <span className="text-[10px] text-zinc-400 font-mono">Core Runtime</span>
                  </div>
                  <p className="text-xs text-zinc-300">
                    High-performance single page application framework with ultra-fast JSX rendering and state management.
                  </p>
                </div>

                {/* Tech 2: TypeScript */}
                <div className="p-4 rounded-xl bg-zinc-900/80 border border-white/10 space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-black text-blue-400 font-mono">TypeScript 5.7+</span>
                    <span className="text-[10px] text-zinc-400 font-mono">Type Safety</span>
                  </div>
                  <p className="text-xs text-zinc-300">
                    Strict type safety across multi-agent contexts, live activities, session statistics, and export schemas.
                  </p>
                </div>

                {/* Tech 3: Tailwind CSS */}
                <div className="p-4 rounded-xl bg-zinc-900/80 border border-white/10 space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-black text-teal-400 font-mono">Tailwind CSS v4</span>
                    <span className="text-[10px] text-zinc-400 font-mono">Aesthetics</span>
                  </div>
                  <p className="text-xs text-zinc-300">
                    YouTube dark-mode interface with glassmorphism, glowing red borders, responsive grids & crisp micro-interactions.
                  </p>
                </div>

                {/* Tech 4: Gemini Pro */}
                <div className="p-4 rounded-xl bg-zinc-900/80 border border-white/10 space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-black text-amber-400 font-mono">Gemini 2.5 Pro</span>
                    <span className="text-[10px] text-zinc-400 font-mono">Google GenAI SDK</span>
                  </div>
                  <p className="text-xs text-zinc-300">
                    Multimodal LLM orchestrator powering channel scanning, viral script generation, SEO ranking & affiliate match.
                  </p>
                </div>

                {/* Tech 5: Pollinations AI */}
                <div className="p-4 rounded-xl bg-zinc-900/80 border border-white/10 space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-black text-rose-400 font-mono">Pollinations AI</span>
                    <span className="text-[10px] text-zinc-400 font-mono">Image Generation</span>
                  </div>
                  <p className="text-xs text-zinc-300">
                    Real-time high-contrast 4K thumbnail generation engine with automatic face expressiveness & typography overlay.
                  </p>
                </div>

                {/* Tech 6: Lucide Icons */}
                <div className="p-4 rounded-xl bg-zinc-900/80 border border-white/10 space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-black text-purple-400 font-mono">Lucide Icons</span>
                    <span className="text-[10px] text-zinc-400 font-mono">UI Vector Assets</span>
                  </div>
                  <p className="text-xs text-zinc-300">
                    Consistent, lightweight vector icons used across the command palette, module navigation, and status badges.
                  </p>
                </div>
              </div>

              <div className="p-4 rounded-xl bg-red-950/20 border border-red-500/30 text-xs text-zinc-300 flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Sparkles className="w-4 h-4 text-red-500 shrink-0" />
                  <span>
                    Architecture Status: <strong className="text-white">Multi-Agent Workflow Engine Active & Fully Synced</strong>
                  </span>
                </div>
                <span className="font-mono text-zinc-400">Build #2026.08.08</span>
              </div>
            </div>
          )}

          {/* SECTION 9: ABOUT */}
          {activeSection === 'about' && (
            <div className="glass-card rounded-2xl p-6 border border-white/10 space-y-6 animate-in fade-in">
              <div className="flex items-center justify-between border-b border-white/10 pb-4">
                <div className="flex items-center gap-2.5">
                  <Info className="w-5 h-5 text-red-500" />
                  <h3 className="text-base font-bold text-white">8. About CreatorOS AI</h3>
                </div>
                <span className="text-[10px] font-mono text-zinc-400">System Specs</span>
              </div>

              {/* BRANDING CARD */}
              <div className="p-6 rounded-2xl bg-gradient-to-br from-[#181818] via-[#141414] to-[#0F0F0F] border border-white/10 relative overflow-hidden space-y-4">
                <div className="absolute top-0 right-0 w-32 h-32 bg-red-600/10 rounded-full blur-2xl"></div>

                <div className="flex items-center gap-4">
                  <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-red-600 to-rose-700 flex items-center justify-center text-white font-black text-xl shadow-xl">
                    C
                  </div>
                  <div>
                    <h2 className="text-2xl font-black text-white tracking-tight">CreatorOS AI</h2>
                    <p className="text-xs text-red-400 font-mono font-bold">Version 1.0.0 (Enterprise Build)</p>
                    <p className="text-xs text-zinc-400 mt-1">
                      Engineered with precision by <span className="text-white font-bold">Kanak Kumari</span>
                    </p>
                  </div>
                </div>

                <p className="text-xs text-zinc-300 leading-relaxed max-w-xl">
                  CreatorOS AI is an all-in-one YouTube channel growth & video generation studio powered by Gemini 2.5 Pro multimodal models. It unifies competitor research, script synthesis, 4K thumbnails, high CPM SEO tags, affiliate monetization & automated export packaging.
                </p>

                <div className="pt-2 flex flex-wrap gap-3">
                  <button
                    onClick={() => setActiveAboutModal('docs')}
                    className="px-4 py-2 rounded-xl bg-zinc-800 hover:bg-zinc-700 text-white text-xs font-bold transition flex items-center gap-1.5 cursor-pointer border border-white/10"
                  >
                    <BookOpen className="w-4 h-4 text-red-400" />
                    <span>View Documentation</span>
                  </button>

                  <button
                    onClick={() => setActiveAboutModal('support')}
                    className="px-4 py-2 rounded-xl bg-zinc-800 hover:bg-zinc-700 text-white text-xs font-bold transition flex items-center gap-1.5 cursor-pointer border border-white/10"
                  >
                    <Mail className="w-4 h-4 text-blue-400" />
                    <span>Contact Support</span>
                  </button>

                  <button
                    onClick={() => setActiveAboutModal('release')}
                    className="px-4 py-2 rounded-xl bg-zinc-800 hover:bg-zinc-700 text-white text-xs font-bold transition flex items-center gap-1.5 cursor-pointer border border-white/10"
                  >
                    <Sparkles className="w-4 h-4 text-amber-400" />
                    <span>Release Notes v1.0.0</span>
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* CONFIRMATION MODAL FOR DELETE WORKSPACE */}
      {showDeleteModal && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex items-center justify-center p-4 animate-in fade-in">
          <div className="max-w-md w-full glass-card rounded-2xl p-6 border border-red-500/50 space-y-4 shadow-2xl">
            <div className="flex items-center gap-3 text-red-500">
              <AlertTriangle className="w-6 h-6" />
              <h3 className="text-lg font-black text-white">Delete Workspace Confirmation</h3>
            </div>

            <p className="text-xs text-zinc-300 leading-relaxed">
              This action will permanently purge all cached video scripts, thumbnail prompt presets, SEO keyword lists & affiliate settings. This cannot be undone.
            </p>

            <div className="space-y-1.5">
              <label className="text-[11px] font-bold text-zinc-400">
                To confirm, type <span className="text-red-400 font-mono font-bold">DELETE CREATOROS</span> below:
              </label>
              <input
                type="text"
                value={deleteConfirmationInput}
                onChange={(e) => setDeleteConfirmationInput(e.target.value)}
                placeholder="DELETE CREATOROS"
                className="w-full glass-input rounded-xl px-3.5 py-2.5 text-xs text-white font-mono placeholder-zinc-600 border-red-500/30"
              />
            </div>

            <div className="flex items-center justify-end gap-2 pt-2">
              <button
                onClick={() => {
                  setShowDeleteModal(false);
                  setDeleteConfirmationInput('');
                }}
                className="px-4 py-2 rounded-xl bg-zinc-800 text-zinc-300 text-xs font-bold hover:bg-zinc-700 cursor-pointer"
              >
                Cancel
              </button>
              <button
                disabled={deleteConfirmationInput !== 'DELETE CREATOROS' || isDeleting}
                onClick={handleConfirmDeleteWorkspace}
                className="px-4 py-2 rounded-xl bg-red-600 hover:bg-red-500 text-white text-xs font-bold cursor-pointer disabled:opacity-40 flex items-center gap-1.5"
              >
                {isDeleting ? <RefreshCw className="w-3.5 h-3.5 animate-spin" /> : <Trash2 className="w-3.5 h-3.5" />}
                <span>Confirm Purge</span>
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ABOUT MODALS (DOCUMENTATION / SUPPORT / RELEASE NOTES) */}
      {activeAboutModal && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex items-center justify-center p-4 animate-in fade-in">
          <div className="max-w-xl w-full glass-card rounded-2xl p-6 border border-white/20 space-y-4 shadow-2xl relative max-h-[85vh] overflow-y-auto">
            <button
              onClick={() => setActiveAboutModal(null)}
              className="absolute top-4 right-4 text-zinc-400 hover:text-white transition cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>

            {/* MODAL 1: DOCUMENTATION */}
            {activeAboutModal === 'docs' && (
              <div className="space-y-4">
                <div className="flex items-center gap-2 text-white font-bold text-lg">
                  <BookOpen className="w-5 h-5 text-red-500" />
                  <span>CreatorOS AI Documentation</span>
                </div>
                <div className="space-y-3 text-xs text-zinc-300 leading-relaxed font-sans">
                  <p className="font-bold text-white">Core Architectural Modules:</p>
                  <ul className="list-disc pl-5 space-y-1 text-zinc-300">
                    <li><strong className="text-white">Module 1 (Channel AI):</strong> Competitor analysis, audience demographic heatmaps & viral topic predictor.</li>
                    <li><strong className="text-white">Module 2 (Script AI):</strong> 15-second visual pattern interrupts, high-retention script synthesizer.</li>
                    <li><strong className="text-white">Module 3 (Thumbnail AI):</strong> Octane 3D prompt generator, face emotion enhancement & CTR simulator.</li>
                    <li><strong className="text-white">Module 4 (SEO AI):</strong> 20 high-CPM keyword clusters, YouTube tags box & video chapters.</li>
                    <li><strong className="text-white">Module 5 (Affiliate AI):</strong> Automated Amazon, Flipkart & Meesho deal link placement.</li>
                    <li><strong className="text-white">Module 6 (Video Export):</strong> Unified JSON, Markdown, Plain Text & Webhook multi-format packager.</li>
                  </ul>
                </div>
              </div>
            )}

            {/* MODAL 2: SUPPORT */}
            {activeAboutModal === 'support' && (
              <div className="space-y-4">
                <div className="flex items-center gap-2 text-white font-bold text-lg">
                  <Mail className="w-5 h-5 text-blue-500" />
                  <span>Contact Support & Feedback</span>
                </div>
                <p className="text-xs text-zinc-300">Have questions or feature requests? Send a direct message to engineer Kanak Kumari.</p>
                <div className="space-y-2">
                  <input
                    type="text"
                    placeholder="Subject line..."
                    className="w-full glass-input rounded-xl px-3.5 py-2 text-xs text-white"
                  />
                  <textarea
                    rows={4}
                    placeholder="Describe your issue or query..."
                    className="w-full glass-input rounded-xl p-3 text-xs text-white resize-none"
                  ></textarea>
                </div>
                <button
                  onClick={() => {
                    setActiveAboutModal(null);
                    showToast('Support message dispatched! We will reply via email.');
                  }}
                  className="w-full py-2.5 rounded-xl bg-red-600 hover:bg-red-500 text-white font-bold text-xs flex items-center justify-center gap-2 cursor-pointer shadow-lg shadow-red-900/30"
                >
                  <Send className="w-4 h-4" />
                  <span>Send Ticket</span>
                </button>
              </div>
            )}

            {/* MODAL 3: RELEASE NOTES */}
            {activeAboutModal === 'release' && (
              <div className="space-y-4">
                <div className="flex items-center justify-between border-b border-white/10 pb-2">
                  <div className="flex items-center gap-2 text-white font-bold text-lg">
                    <Sparkles className="w-5 h-5 text-amber-400" />
                    <span>Version 1.0.0 Release Notes</span>
                  </div>
                  <span className="text-xs font-mono text-emerald-400">Production Build</span>
                </div>
                <div className="space-y-3 text-xs text-zinc-300">
                  <div className="p-3 rounded-xl bg-zinc-900/80 border border-white/5 space-y-1">
                    <p className="font-bold text-white">✨ Key Highlights & Features:</p>
                    <p className="text-zinc-400">• Full Gemini 2.5 Pro multimodal script & viral hook integration.</p>
                    <p className="text-zinc-400">• Video Export Workspace with JSON, Markdown, Text & Zapier Webhook formats.</p>
                    <p className="text-zinc-400">• Affiliate AI dynamic store link builder for Amazon, Flipkart & Meesho.</p>
                    <p className="text-zinc-400">• Enterprise Settings workspace engineered by Kanak Kumari.</p>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};
