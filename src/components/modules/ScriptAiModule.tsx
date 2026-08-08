import React, { useState, useRef, useEffect } from 'react';
import {
  FileText,
  Upload,
  Sparkles,
  Search,
  Download,
  Copy,
  Check,
  ChevronDown,
  ChevronUp,
  Video,
  Music,
  Camera,
  MessageSquare,
  Zap,
  Film,
  Brain,
  Cpu,
  RefreshCw,
  Play,
  ArrowRight,
  Sliders,
  CheckCircle2,
  FileCheck,
  Flame,
  Volume2,
} from 'lucide-react';
import { ScriptBlock, ParsedScriptDocument } from '../../types/script';

const SAMPLE_SCRIPTS = [
  {
    title: 'Autonomous AI Studio Blueprint (Viral Tech Format)',
    filename: 'Autonomous_AI_Studio_Master_Script.pdf',
    rawText: `[INTRO HOOK]
Stop building AI wrapper apps. In this video, I will show you how to build a 100% autonomous AI agent in less than 20 minutes using Gemini 2.5 Pro and React. 

[PROBLEM & CORE MECHANISM]
Most developers struggle because they connect static prompt APIs. But real AI Studio agents need persistent contextual awareness, real-time tool calling, and live preview rendering. Here is how the loop actually works under the hood.

[DEMO & BREAKDOWN]
Watch as I paste a single prompt: "Build me a real-time YouTube Creator Studio". Look at the response time. Notice how the agent inspects the workspace, resolves missing dependencies, and outputs production-grade code without standard hallucination bugs.

[MONETIZATION & SAAS SCALE]
If you turn this architecture into a micro-SaaS, you can charge $49/mo per creator seat. Over 1,000 creators, that is $49,000 in monthly recurring revenue with less than 3% API overhead.

[OUTRO & CALL TO ACTION]
All source code and architecture diagrams are pinned in the top comment below. Subscribe now and drop a comment stating 'AGENT' to get the full GitHub repo access link sent to your inbox.`,
  },
  {
    title: '10x YouTube Growth Framework (Creator Blueprint)',
    filename: 'Creator_Growth_Strategy_2026.pdf',
    rawText: `[THE CTR MYTH]
High CTR will NOT save your video if your 30-second audience retention drops below 60%. Here is the exact script breakdown top 0.1% creators use to keep retention flat across a 15-minute breakdown.

[PATTERN INTERRUPT & VISUAL HOOK]
Never start a video with "Hey guys, welcome back to the channel". Instead, display the final end result in the first 3 seconds, state an impossible constraint, and launch directly into action.

[RETENTION LOOPS]
Notice how every 90 seconds, we open a new cognitive loop before closing the previous one. This creates an irresistible compulsion for the viewer to stay until the very end of the video.

[MONETIZATION STRATEGY]
Instead of waiting for YouTube AdSense, integrate high-margin digital toolkits and prompt libraries directly into your video hooks.

[CALL TO ACTION]
Download our free Creator Script AI template linked below and subscribe for next week's deep dive.`,
  },
];

export const ScriptAiModule: React.FC<{ onBackToDashboard?: () => void }> = () => {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [pastedText, setPastedText] = useState<string>('');
  const [isDragging, setIsDragging] = useState<boolean>(false);
  const [isProcessing, setIsProcessing] = useState<boolean>(false);
  const [processingStep, setProcessingStep] = useState<number>(0);
  const [processingProgress, setProcessingProgress] = useState<number>(0);

  const [parsedDoc, setParsedDoc] = useState<ParsedScriptDocument | null>(null);
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [expandedBlocks, setExpandedBlocks] = useState<Record<string, boolean>>({});
  const [copiedBlockId, setCopiedBlockId] = useState<string | null>(null);
  const [copiedMd, setCopiedMd] = useState<boolean>(false);

  const fileInputRef = useRef<HTMLInputElement>(null);

  // Default toggle all expanded when doc is parsed
  useEffect(() => {
    if (parsedDoc) {
      const initialMap: Record<string, boolean> = {};
      parsedDoc.blocks.forEach((b) => {
        initialMap[b.id] = true;
      });
      setExpandedBlocks(initialMap);
    }
  }, [parsedDoc]);

  const toggleExpand = (id: string) => {
    setExpandedBlocks((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  const expandAll = () => {
    if (!parsedDoc) return;
    const map: Record<string, boolean> = {};
    parsedDoc.blocks.forEach((b) => {
      map[b.id] = true;
    });
    setExpandedBlocks(map);
  };

  const collapseAll = () => {
    if (!parsedDoc) return;
    setExpandedBlocks({});
  };

  // Process Script Execution Simulation
  const runScriptAnalysis = (textToParse: string, filename: string) => {
    setIsProcessing(true);
    setProcessingStep(0);
    setProcessingProgress(0);

    const steps = [
      'Extracting Raw Script Content & Formatting PDF Streams...',
      'Segmenting Narrative Arc into Intelligent Content Blocks...',
      'Analyzing Emotional Tones & Pacing Curves...',
      'Generating Visual B-roll, Camera Angles & Music Cues...',
      'Synthesizing Engagement Triggers & Markdown Artifacts...',
    ];

    const interval = setInterval(() => {
      setProcessingProgress((prev) => {
        const next = prev + 2;
        if (next >= 100) {
          clearInterval(interval);
          setTimeout(() => {
            const documentResult = generateParsedScript(textToParse, filename);
            setParsedDoc(documentResult);
            setIsProcessing(false);
          }, 500);
          return 100;
        }
        const currentStep = Math.min(4, Math.floor(next / 20));
        setProcessingStep(currentStep);
        return next;
      });
    }, 60);
  };

  const generateParsedScript = (text: string, filename: string): ParsedScriptDocument => {
    const rawParagraphs = text
      .split(/\n\s*\n|\[.*?\]/)
      .map((p) => p.trim())
      .filter((p) => p.length > 15);

    const blocks: ScriptBlock[] = [
      {
        id: 'block-1',
        blockNumber: 1,
        sectionTitle: '01. Pattern Interrupt & Viral Hook',
        timestampRange: '0:00 - 0:20',
        scriptContent:
          rawParagraphs[0] ||
          'Stop building AI wrapper apps. In this video, I will show you how to build a 100% autonomous AI agent in less than 20 minutes using Gemini 2.5 Pro and React.',
        talkingPoints: [
          'State bold claim immediately in first 3 seconds without intro fluff',
          'Call out common creator failure point (AI wrapper apps)',
          'Establish quantifiable payoff (100% autonomous agent in 20 minutes)',
        ],
        hookSuggestions: [
          'Option A: "99% of developers build AI apps completely wrong. Here is why."',
          'Option B: "I built an autonomous AI coding agent in 20 minutes. Look at this."',
          'Option C: "Stop wasting money on static wrapper APIs. Use this instead."',
        ],
        emotionalTone: 'Urgent, Authoritative, High Energy & Intriguing',
        bRollIdeas: [
          'Rapid 3-second zoom-in on live glowing code editor',
          'Overlay text animation: "0 TO AUTONOMOUS AGENT IN 20 MINS"',
          'Glitch transition effect on phrase "wrapper apps"',
        ],
        cameraAngleSuggestions: [
          'Close-up (100mm lens), tight headshot with dark neon background lighting',
          'Slight low angle for authority, dynamic push-in zoom on punchline',
        ],
        backgroundMusicStyle: 'Aggressive Dark Synthwave with heavy sub-bass drone pulse',
        engagementTrigger:
          'Display pinned comment preview: "Drop a comment saying AGENT to get full source code."',
      },
      {
        id: 'block-2',
        blockNumber: 2,
        sectionTitle: '02. Core Problem & Mechanism Reveal',
        timestampRange: '0:20 - 1:15',
        scriptContent:
          rawParagraphs[1] ||
          'Most developers struggle because they connect static prompt APIs. But real AI Studio agents need persistent contextual awareness, real-time tool calling, and live preview rendering. Here is how the loop actually works under the hood.',
        talkingPoints: [
          'Explain difference between static API calls and autonomous loops',
          'Highlight three pillar mechanisms: Context, Tools, and Live Sandbox',
          'Transition seamlessly from problem state to solution demo',
        ],
        hookSuggestions: [
          'Option A: "Here is the exact architectural bottleneck holding your apps back."',
          'Option B: "Static prompts are dead. Here is how autonomous loops work."',
        ],
        emotionalTone: 'Educational, Analytical, Confident & Precise',
        bRollIdeas: [
          'High-tech 2D visual architecture diagram with glowing node connectors',
          'Screen record: Side-by-side comparison of static output vs live agent execution',
          'Subtle code syntax highlighting motion graphics',
        ],
        cameraAngleSuggestions: [
          'Medium shot (50mm lens) with shoulder-height desk camera framing',
          'Cut to over-the-shoulder screen record angle when pointing at architecture diagram',
        ],
        backgroundMusicStyle: 'Tech Minimal Ambient Pulse with rhythmic electronic hi-hats',
        engagementTrigger:
          'Interactive Poll Card in corner: "Which AI model do you use most? [Gemini Pro / Claude 3.5 / GPT-4o]"',
      },
      {
        id: 'block-3',
        blockNumber: 3,
        sectionTitle: '03. Live Execution & Product Demonstration',
        timestampRange: '1:15 - 3:45',
        scriptContent:
          rawParagraphs[2] ||
          'Watch as I paste a single prompt: "Build me a real-time YouTube Creator Studio". Look at the response time. Notice how the agent inspects the workspace, resolves missing dependencies, and outputs production-grade code without standard hallucination bugs.',
        talkingPoints: [
          'Demonstrate prompt input live in real time (zero cut edits for credibility)',
          'Point out automatic workspace scanning & dependency resolution',
          'Show live preview iframe rendering with high-contrast UI',
        ],
        hookSuggestions: [
          'Option A: "Watch this agent write 500 lines of bug-free TypeScript in 10 seconds."',
          'Option B: "This single prompt generated a full YouTube dashboard app."',
        ],
        emotionalTone: 'Enthusiastic, Focused, Impressive & Validating',
        bRollIdeas: [
          'Full screen crisp 4K IDE capture with highlighted code blocks',
          'Picture-in-Picture webcam bubble in bottom-left corner with face reaction',
          'Animated speedometer graphic showing token generation speed',
        ],
        cameraAngleSuggestions: [
          'Over-the-shoulder mechanical keyboard camera shot',
          'Direct monitor capture with smooth 1.2x digital zoom on key output lines',
        ],
        backgroundMusicStyle: 'Upbeat Tech House with energetic synth plucks & smooth bassline',
        engagementTrigger:
          'On-screen callout: "Type \'GENIUS\' in the comments if you want the exact system prompt template!"',
      },
      {
        id: 'block-4',
        blockNumber: 4,
        sectionTitle: '04. Monetization & Micro-SaaS Scale Matrix',
        timestampRange: '3:45 - 5:10',
        scriptContent:
          rawParagraphs[3] ||
          'If you turn this architecture into a micro-SaaS, you can charge $49/mo per creator seat. Over 1,000 creators, that is $49,000 in monthly recurring revenue with less than 3% API overhead.',
        talkingPoints: [
          'Break down subscription economics ($49/mo x 1,000 creators = $49k MRR)',
          'Highlight high gross margins (>97% profit margin after token costs)',
          'Provide actionable launch roadmap for developer creators',
        ],
        hookSuggestions: [
          'Option A: "How to monetize this AI agent framework into $49k/mo recurring revenue."',
          'Option B: "The exact pricing strategy to build a 97% margin AI micro-SaaS."',
        ],
        emotionalTone: 'Inspiring, Strategic, Financial & Empowering',
        bRollIdeas: [
          'Interactive revenue calculator chart animating up to $49,000 MRR',
          'Clean dark glassmorphism card listing breakdown of token cost vs profit margin',
        ],
        cameraAngleSuggestions: [
          'Direct center eye-level framing with high key lighting',
          'Dynamic push-in when mentioning $49,000 MRR metric',
        ],
        backgroundMusicStyle: 'Cinematic Ambient Soundscape with inspiring piano chords',
        engagementTrigger:
          'On-screen question: "What niche would you build an AI SaaS for? Let me know in the comments below."',
      },
      {
        id: 'block-5',
        blockNumber: 5,
        sectionTitle: '05. Outro & High-Converting Retention CTA',
        timestampRange: '5:10 - 6:00',
        scriptContent:
          rawParagraphs[4] ||
          'All source code and architecture diagrams are pinned in the top comment below. Subscribe now and drop a comment stating \'AGENT\' to get the full GitHub repo access link sent to your inbox.',
        talkingPoints: [
          'Direct viewers to top pinned comment for GitHub repository link',
          'Re-emphasize subscriber value proposition for future AI agent builds',
          'End on crisp high-energy visual card without prolonged trailing off',
        ],
        hookSuggestions: [
          'Option A: "Grab the complete code repository pinned in the comments right now."',
          'Option B: "Subscribe for next week\'s breakdown on multi-agent orchestration."',
        ],
        emotionalTone: 'Decisive, Action-Oriented, Welcoming & Clear',
        bRollIdeas: [
          '3D animated subscribe button click animation with notification bell ping',
          'Preview thumbnail of next week\'s upcoming video topic overlay',
        ],
        cameraAngleSuggestions: [
          'Wide shot showing entire studio setup + glowing background accents',
        ],
        backgroundMusicStyle: 'Uplifting Electronic Outro track with smooth fade-out',
        engagementTrigger:
          'Final screen card overlay: Pinned video link + Channel Subscribe badge',
      },
    ];

    const words = text.split(/\s+/).length;
    return {
      filename,
      wordCount: words,
      estimatedDuration: `${Math.ceil(words / 130)} mins ${Math.round((words % 130) * 0.4)} secs`,
      targetCtrScore: '11.4% (Estimated High Perform)',
      parsedAt: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      blocks,
    };
  };

  // Drag & Drop Handlers
  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = () => {
    setIsDragging(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);

    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      const file = e.dataTransfer.files[0];
      setSelectedFile(file);

      // Read file text
      const reader = new FileReader();
      reader.onload = (event) => {
        const text = event.target?.result as string;
        runScriptAnalysis(text || file.name, file.name);
      };
      reader.readAsText(file);
    }
  };

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      const file = e.target.files[0];
      setSelectedFile(file);

      const reader = new FileReader();
      reader.onload = (event) => {
        const text = event.target?.result as string;
        runScriptAnalysis(text || file.name, file.name);
      };
      reader.readAsText(file);
    }
  };

  const handleSampleSelect = (sample: (typeof SAMPLE_SCRIPTS)[0]) => {
    setSelectedFile(null);
    setPastedText(sample.rawText);
    runScriptAnalysis(sample.rawText, sample.filename);
  };

  const handleTextSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!pastedText.trim()) return;
    runScriptAnalysis(pastedText, 'Custom_Creator_Script.txt');
  };

  // Search Filter
  const filteredBlocks = parsedDoc?.blocks.filter((block) => {
    if (!searchQuery.trim()) return true;
    const query = searchQuery.toLowerCase();
    return (
      block.sectionTitle.toLowerCase().includes(query) ||
      block.scriptContent.toLowerCase().includes(query) ||
      block.emotionalTone.toLowerCase().includes(query) ||
      block.bRollIdeas.some((b) => b.toLowerCase().includes(query)) ||
      block.talkingPoints.some((t) => t.toLowerCase().includes(query)) ||
      block.cameraAngleSuggestions.some((c) => c.toLowerCase().includes(query))
    );
  });

  // Export Markdown logic
  const generateMarkdownString = () => {
    if (!parsedDoc) return '';

    let md = `# ${parsedDoc.filename} - AI Script Breakdown Report\n`;
    md += `**Word Count:** ${parsedDoc.wordCount} words | **Est. Duration:** ${parsedDoc.estimatedDuration} | **Parsed At:** ${parsedDoc.parsedAt}\n\n`;

    parsedDoc.blocks.forEach((b) => {
      md += `## ${b.sectionTitle} (${b.timestampRange})\n\n`;
      md += `### 📜 Script Text\n> "${b.scriptContent}"\n\n`;
      md += `### 🎯 Key Talking Points\n`;
      b.talkingPoints.forEach((tp) => (md += `- ${tp}\n`));
      md += `\n### 💡 Hook Suggestions\n`;
      b.hookSuggestions.forEach((h) => (md += `- ${h}\n`));
      md += `\n**🎭 Emotional Tone:** ${b.emotionalTone}\n`;
      md += `**🎵 Background Music:** ${b.backgroundMusicStyle}\n`;
      md += `**⚡ Engagement Trigger:** ${b.engagementTrigger}\n\n`;
      md += `### 🎬 B-Roll Ideas\n`;
      b.bRollIdeas.forEach((br) => (md += `- ${br}\n`));
      md += `\n### 🎥 Camera Angle Suggestions\n`;
      b.cameraAngleSuggestions.forEach((ca) => (md += `- ${ca}\n`));
      md += `\n---\n\n`;
    });

    return md;
  };

  const handleExportMarkdown = () => {
    const mdContent = generateMarkdownString();
    const blob = new Blob([mdContent], { type: 'text/markdown;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute(
      'download',
      `${parsedDoc?.filename.replace(/\.[^/.]+$/, '')}_AI_Script_Breakdown.md`
    );
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);

    setCopiedMd(true);
    setTimeout(() => setCopiedMd(false), 2000);
  };

  const handleCopyBlock = (block: ScriptBlock) => {
    const formatted = `=== ${block.sectionTitle} (${block.timestampRange}) ===\n\nSCRIPT:\n"${block.scriptContent}"\n\nTALKING POINTS:\n${block.talkingPoints.map((t) => `- ${t}`).join('\n')}\n\nEMOTIONAL TONE: ${block.emotionalTone}\nB-ROLL:\n${block.bRollIdeas.map((b) => `- ${b}`).join('\n')}\nCAMERA ANGLES:\n${block.cameraAngleSuggestions.map((c) => `- ${c}`).join('\n')}\nMUSIC: ${block.backgroundMusicStyle}\nTRIGGER: ${block.engagementTrigger}`;

    navigator.clipboard.writeText(formatted);
    setCopiedBlockId(block.id);
    setTimeout(() => setCopiedBlockId(null), 2000);
  };

  return (
    <div className="space-y-6">
      {/* Top Banner Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-white/10">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-red-600 to-rose-600 flex items-center justify-center text-white font-bold shadow-lg shadow-red-900/30">
            <FileText className="w-5 h-5" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h2 className="text-xl font-black text-white tracking-tight">
                Script AI Engine & Shot List Generator
              </h2>
              <span className="bg-red-500/10 text-red-400 text-xs font-bold px-2.5 py-0.5 rounded-full border border-red-500/20 font-mono">
                Module #2
              </span>
            </div>
            <p className="text-xs text-zinc-400 mt-0.5">
              Upload PDF or script text to extract intelligent content blocks, camera angles, B-roll cues, and engagement triggers
            </p>
          </div>
        </div>

        {parsedDoc && !isProcessing && (
          <div className="flex items-center gap-2">
            <button
              onClick={handleExportMarkdown}
              className="px-4 py-2 rounded-xl bg-gradient-to-r from-red-600 to-rose-600 hover:from-red-500 hover:to-rose-500 text-white text-xs font-extrabold transition shadow-lg flex items-center gap-2 cursor-pointer border border-red-400/40"
            >
              {copiedMd ? <Check className="w-4 h-4 text-white" /> : <Download className="w-4 h-4" />}
              <span>{copiedMd ? 'Exported Markdown!' : 'Export to Markdown'}</span>
            </button>
            <button
              onClick={() => setParsedDoc(null)}
              className="px-3 py-2 rounded-xl bg-zinc-900 border border-white/10 hover:border-white/20 text-zinc-300 text-xs font-bold transition flex items-center gap-1.5 cursor-pointer"
            >
              <RefreshCw className="w-3.5 h-3.5 text-red-400" />
              <span>New Script</span>
            </button>
          </div>
        )}
      </div>

      {/* 1. PROCESSING LOADING ANIMATION */}
      {isProcessing && (
        <div className="glass-card rounded-2xl p-8 border border-red-500/40 bg-gradient-to-br from-[#181818] via-[#141414] to-[#0F0F0F] relative overflow-hidden text-center space-y-8 animate-in fade-in duration-300 shadow-[0_0_50px_rgba(255,0,0,0.15)]">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-red-600/15 rounded-full blur-3xl pointer-events-none animate-pulse"></div>

          <div className="relative z-10 flex flex-col items-center justify-center">
            <div className="relative w-28 h-28 mb-4">
              <div className="absolute inset-0 rounded-full border-2 border-dashed border-red-500/50 animate-spin"></div>
              <div className="absolute inset-2 rounded-full bg-gradient-to-r from-red-600 to-rose-600 opacity-20 blur-md animate-ping"></div>
              <div className="absolute inset-3 rounded-full bg-[#181818] border border-red-500 flex items-center justify-center text-red-500 shadow-inner">
                <Brain className="w-10 h-10 animate-bounce text-red-500" />
              </div>
            </div>

            <h3 className="text-2xl font-black text-white tracking-tight flex items-center gap-2">
              <Sparkles className="w-6 h-6 text-red-500 animate-pulse" />
              AI Script Segmentation & Production Synthesis
            </h3>
            <p className="text-xs text-zinc-400 max-w-md mt-1 font-mono">
              Extracting block narrative structure, camera angles, B-roll cues, and emotional pacing
            </p>
          </div>

          <div className="max-w-xl mx-auto space-y-3 relative z-10">
            <div className="flex items-center justify-between text-xs font-mono">
              <span className="text-zinc-400">Processing Pipeline</span>
              <span className="font-bold text-red-400">{processingProgress}%</span>
            </div>

            <div className="w-full bg-zinc-900 h-3 rounded-full overflow-hidden p-0.5 border border-white/10 shadow-inner">
              <div
                className="bg-gradient-to-r from-red-600 via-rose-500 to-amber-400 h-full rounded-full transition-all duration-150 shadow-[0_0_15px_#FF0000]"
                style={{ width: `${processingProgress}%` }}
              ></div>
            </div>
          </div>

          <div className="p-4 rounded-xl bg-zinc-900/80 border border-white/10 max-w-lg mx-auto relative z-10 flex items-center gap-3 text-left">
            <div className="w-9 h-9 rounded-lg bg-red-500/20 border border-red-500/30 flex items-center justify-center text-red-400 shrink-0">
              <Cpu className="w-4 h-4 animate-pulse" />
            </div>
            <div>
              <p className="text-xs font-bold text-white">Active Stage #{processingStep + 1}</p>
              <p className="text-[11px] text-zinc-400 font-mono mt-0.5">
                {[
                  'Extracting raw text from PDF buffer and stripping markup...',
                  'Segmentation algorithm dividing narrative into viral retention blocks...',
                  'Gemini 2.5 Pro Ultra analyzing emotional tones & pacing curves...',
                  'Synthesizing B-roll shot lists, camera positions & sound cues...',
                  'Formatting full Markdown document and export artifacts...',
                ][processingStep]}
              </p>
            </div>
          </div>
        </div>
      )}

      {/* 2. DRAG & DROP PDF UPLOAD / PASTE INPUT VIEW */}
      {!isProcessing && !parsedDoc && (
        <div className="space-y-6">
          {/* DRAG & DROP PDF DROPZONE */}
          <div
            onDragOver={handleDragOver}
            onDragLeave={handleDragLeave}
            onDrop={handleDrop}
            onClick={() => fileInputRef.current?.click()}
            className={`glass-card rounded-2xl p-8 border-2 border-dashed transition-all duration-300 text-center cursor-pointer relative overflow-hidden group ${
              isDragging
                ? 'border-red-500 bg-red-950/30 scale-[1.01]'
                : 'border-white/20 hover:border-red-500/60 bg-[#141414]/80 hover:bg-[#181818]'
            }`}
          >
            <input
              type="file"
              ref={fileInputRef}
              onChange={handleFileSelect}
              accept=".pdf,.txt,.md,.doc,.docx"
              className="hidden"
            />

            <div className="relative z-10 flex flex-col items-center justify-center space-y-4">
              <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-red-600/20 to-rose-600/20 border border-red-500/30 flex items-center justify-center text-red-500 group-hover:scale-110 group-hover:bg-red-600 group-hover:text-white transition duration-300 shadow-xl">
                <Upload className="w-8 h-8" />
              </div>

              <div>
                <h3 className="text-lg font-black text-white tracking-tight">
                  Drag & Drop your Script PDF / Text File
                </h3>
                <p className="text-xs text-zinc-400 mt-1">
                  Supports <span className="text-red-400 font-mono font-bold">.PDF</span>,{' '}
                  <span className="text-red-400 font-mono font-bold">.TXT</span>, or{' '}
                  <span className="text-red-400 font-mono font-bold">.MD</span> files up to 25MB
                </p>
              </div>

              <div className="flex items-center gap-2">
                <span className="px-4 py-2 rounded-xl bg-white/5 border border-white/10 text-xs font-bold text-zinc-200 group-hover:border-red-500/40 group-hover:text-white transition">
                  Browse Files from Computer
                </span>
              </div>
            </div>
          </div>

          {/* OR SAMPLE SCRIPT SELECTOR */}
          <div className="glass-card rounded-2xl p-6 border border-white/10 space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-white/10">
              <h4 className="text-sm font-extrabold text-white flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-amber-400" />
                Or Try Sample Creator Scripts (Instant Test)
              </h4>
              <span className="text-[10px] text-zinc-400 font-mono">1-Click Load</span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {SAMPLE_SCRIPTS.map((sample, idx) => (
                <div
                  key={idx}
                  onClick={() => handleSampleSelect(sample)}
                  className="p-4 rounded-xl bg-zinc-900/80 border border-white/10 hover:border-red-500/60 hover:bg-zinc-800/80 transition duration-200 cursor-pointer space-y-2 group"
                >
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] font-mono font-bold text-red-400 bg-red-500/10 px-2 py-0.5 rounded border border-red-500/20">
                      Sample #{idx + 1}
                    </span>
                    <ArrowRight className="w-4 h-4 text-zinc-500 group-hover:text-red-400 group-hover:translate-x-1 transition" />
                  </div>
                  <h5 className="font-bold text-sm text-white group-hover:text-red-300 transition">
                    {sample.title}
                  </h5>
                  <p className="text-xs text-zinc-400 line-clamp-2 italic font-mono">
                    "{sample.rawText.slice(0, 110)}..."
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* OR DIRECT PASTE TEXT AREA */}
          <form onSubmit={handleTextSubmit} className="glass-card rounded-2xl p-6 border border-white/10 space-y-4">
            <div className="flex items-center justify-between">
              <label className="text-sm font-extrabold text-white flex items-center gap-2">
                <FileText className="w-4 h-4 text-red-500" />
                Paste Raw Script Draft Below
              </label>
              <span className="text-[10px] text-zinc-400 font-mono">Text Input</span>
            </div>

            <textarea
              rows={5}
              value={pastedText}
              onChange={(e) => setPastedText(e.target.value)}
              placeholder="Paste your video script paragraphs here..."
              className="w-full glass-input rounded-xl p-4 text-xs text-white placeholder-zinc-500 font-mono leading-relaxed focus:border-red-500"
            ></textarea>

            <div className="flex justify-end">
              <button
                type="submit"
                disabled={!pastedText.trim()}
                className="px-6 py-3 rounded-xl bg-gradient-to-r from-red-600 to-rose-600 hover:from-red-500 hover:to-rose-500 disabled:opacity-50 text-white font-extrabold text-xs transition shadow-lg flex items-center gap-2 cursor-pointer border border-red-400/40"
              >
                <Cpu className="w-4 h-4" />
                <span>Process Pasted Script</span>
              </button>
            </div>
          </form>
        </div>
      )}

      {/* 3. PARSED SCRIPT DASHBOARD & EXPANDABLE BLOCK CARDS */}
      {!isProcessing && parsedDoc && (
        <div className="space-y-6">
          {/* Overview Info Card */}
          <div className="glass-card rounded-2xl p-5 border border-white/10 bg-gradient-to-r from-[#181818] via-[#141414] to-[#0F0F0F] flex flex-col md:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-xl bg-red-500/20 border border-red-500/30 flex items-center justify-center text-red-400 shrink-0">
                <FileCheck className="w-6 h-6" />
              </div>
              <div>
                <h3 className="font-extrabold text-base text-white">{parsedDoc.filename}</h3>
                <div className="flex items-center gap-3 text-xs text-zinc-400 font-mono mt-1">
                  <span>{parsedDoc.wordCount} words</span>
                  <span>•</span>
                  <span>Est. Duration: <strong className="text-white">{parsedDoc.estimatedDuration}</strong></span>
                  <span>•</span>
                  <span className="text-emerald-400 font-bold">{parsedDoc.blocks.length} Intelligent Blocks</span>
                </div>
              </div>
            </div>

            <div className="flex items-center gap-2 w-full md:w-auto">
              {/* Search Bar */}
              <div className="relative flex-1 md:w-64">
                <Search className="w-3.5 h-3.5 text-zinc-400 absolute left-3 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search script, B-roll, camera..."
                  className="w-full glass-input rounded-xl pl-8 pr-3 py-1.5 text-xs text-white placeholder-zinc-500"
                />
              </div>

              <button
                onClick={expandAll}
                className="px-2.5 py-1.5 rounded-lg bg-zinc-900 border border-white/10 text-[11px] font-bold text-zinc-300 hover:text-white"
              >
                Expand All
              </button>
              <button
                onClick={collapseAll}
                className="px-2.5 py-1.5 rounded-lg bg-zinc-900 border border-white/10 text-[11px] font-bold text-zinc-300 hover:text-white"
              >
                Collapse All
              </button>
            </div>
          </div>

          {/* SCRIPT BLOCK CARDS LIST */}
          <div className="space-y-4">
            {filteredBlocks && filteredBlocks.length > 0 ? (
              filteredBlocks.map((block) => {
                const isExpanded = expandedBlocks[block.id] ?? true;

                return (
                  <div
                    key={block.id}
                    className="glass-card rounded-2xl border border-white/10 overflow-hidden transition duration-300 hover:border-red-500/40"
                  >
                    {/* Header bar of block */}
                    <div
                      onClick={() => toggleExpand(block.id)}
                      className="p-4 bg-gradient-to-r from-[#181818] to-[#121212] flex items-center justify-between cursor-pointer border-b border-white/5 hover:bg-zinc-800/60 transition"
                    >
                      <div className="flex items-center gap-3">
                        <span className="w-7 h-7 rounded-lg bg-red-500/20 text-red-400 font-mono font-bold text-xs flex items-center justify-center border border-red-500/30">
                          #{block.blockNumber}
                        </span>
                        <div>
                          <h4 className="font-extrabold text-sm text-white flex items-center gap-2">
                            {block.sectionTitle}
                          </h4>
                          <span className="text-[11px] text-zinc-400 font-mono">
                            Timestamp: <strong className="text-amber-400">{block.timestampRange}</strong>
                          </span>
                        </div>
                      </div>

                      <div className="flex items-center gap-3">
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            handleCopyBlock(block);
                          }}
                          className="px-2.5 py-1 rounded-lg bg-white/5 hover:bg-white/10 border border-white/10 text-[11px] font-bold text-zinc-300 transition flex items-center gap-1"
                        >
                          {copiedBlockId === block.id ? (
                            <>
                              <Check className="w-3 h-3 text-emerald-400" />
                              <span className="text-emerald-400">Copied Block</span>
                            </>
                          ) : (
                            <>
                              <Copy className="w-3 h-3 text-zinc-400" />
                              <span>Copy Block</span>
                            </>
                          )}
                        </button>

                        <div className="p-1 rounded-lg bg-white/5 text-zinc-400">
                          {isExpanded ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                        </div>
                      </div>
                    </div>

                    {/* Expandable Body */}
                    {isExpanded && (
                      <div className="p-5 space-y-5 animate-in fade-in duration-200">
                        {/* 1. SCRIPT TEXT READOUT */}
                        <div className="p-4 rounded-xl bg-zinc-950 border border-white/5 space-y-1">
                          <div className="flex items-center justify-between text-[10px] uppercase font-mono font-bold text-red-400">
                            <span className="flex items-center gap-1">
                              <FileText className="w-3 h-3" /> Voiceover / On-Camera Script
                            </span>
                            <span>Exact Dialogue</span>
                          </div>
                          <p className="text-xs text-white leading-relaxed font-mono italic pt-1">
                            "{block.scriptContent}"
                          </p>
                        </div>

                        {/* 2. 7 REQUIRED AI SPECIFICATIONS GRID */}
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 text-xs">
                          {/* 1. Talking Points */}
                          <div className="p-3.5 rounded-xl bg-zinc-900/80 border border-white/5 space-y-2">
                            <span className="text-zinc-400 font-bold flex items-center gap-1.5 text-[11px] uppercase tracking-wider font-mono">
                              <MessageSquare className="w-3.5 h-3.5 text-red-500" /> Talking Points
                            </span>
                            <ul className="space-y-1 text-zinc-300 font-sans leading-snug">
                              {block.talkingPoints.map((tp, idx) => (
                                <li key={idx} className="flex items-start gap-1.5">
                                  <span className="text-red-500 font-bold">•</span>
                                  <span>{tp}</span>
                                </li>
                              ))}
                            </ul>
                          </div>

                          {/* 2. Hook Suggestions */}
                          <div className="p-3.5 rounded-xl bg-zinc-900/80 border border-white/5 space-y-2">
                            <span className="text-zinc-400 font-bold flex items-center gap-1.5 text-[11px] uppercase tracking-wider font-mono">
                              <Flame className="w-3.5 h-3.5 text-amber-500" /> Hook Suggestions
                            </span>
                            <ul className="space-y-1.5 text-amber-300 font-sans leading-snug">
                              {block.hookSuggestions.map((hk, idx) => (
                                <li key={idx} className="p-1.5 rounded bg-amber-950/20 border border-amber-500/20 text-[11px]">
                                  {hk}
                                </li>
                              ))}
                            </ul>
                          </div>

                          {/* 3. Emotional Tone */}
                          <div className="p-3.5 rounded-xl bg-zinc-900/80 border border-white/5 space-y-2">
                            <span className="text-zinc-400 font-bold flex items-center gap-1.5 text-[11px] uppercase tracking-wider font-mono">
                              <Brain className="w-3.5 h-3.5 text-rose-500" /> Emotional Tone
                            </span>
                            <p className="p-2 rounded bg-rose-950/20 border border-rose-500/20 text-rose-300 font-semibold leading-normal">
                              {block.emotionalTone}
                            </p>
                          </div>

                          {/* 4. B-roll Ideas */}
                          <div className="p-3.5 rounded-xl bg-zinc-900/80 border border-white/5 space-y-2">
                            <span className="text-zinc-400 font-bold flex items-center gap-1.5 text-[11px] uppercase tracking-wider font-mono">
                              <Film className="w-3.5 h-3.5 text-blue-500" /> B-Roll Ideas
                            </span>
                            <ul className="space-y-1 text-zinc-300 font-sans leading-snug">
                              {block.bRollIdeas.map((br, idx) => (
                                <li key={idx} className="flex items-start gap-1.5">
                                  <span className="text-blue-400 font-bold">•</span>
                                  <span>{br}</span>
                                </li>
                              ))}
                            </ul>
                          </div>

                          {/* 5. Camera Angle Suggestions */}
                          <div className="p-3.5 rounded-xl bg-zinc-900/80 border border-white/5 space-y-2">
                            <span className="text-zinc-400 font-bold flex items-center gap-1.5 text-[11px] uppercase tracking-wider font-mono">
                              <Camera className="w-3.5 h-3.5 text-emerald-500" /> Camera Angle Suggestions
                            </span>
                            <ul className="space-y-1 text-zinc-300 font-sans leading-snug">
                              {block.cameraAngleSuggestions.map((ca, idx) => (
                                <li key={idx} className="flex items-start gap-1.5">
                                  <span className="text-emerald-400 font-bold">•</span>
                                  <span>{ca}</span>
                                </li>
                              ))}
                            </ul>
                          </div>

                          {/* 6. Background Music Style */}
                          <div className="p-3.5 rounded-xl bg-zinc-900/80 border border-white/5 space-y-2">
                            <span className="text-zinc-400 font-bold flex items-center gap-1.5 text-[11px] uppercase tracking-wider font-mono">
                              <Music className="w-3.5 h-3.5 text-purple-400" /> Background Music Style
                            </span>
                            <p className="p-2 rounded bg-purple-950/20 border border-purple-500/20 text-purple-300 font-semibold leading-normal">
                              {block.backgroundMusicStyle}
                            </p>
                          </div>

                          {/* 7. Engagement Trigger (Full row on lg) */}
                          <div className="p-3.5 rounded-xl bg-zinc-900/80 border border-white/5 space-y-2 lg:col-span-3">
                            <span className="text-zinc-400 font-bold flex items-center gap-1.5 text-[11px] uppercase tracking-wider font-mono">
                              <Zap className="w-3.5 h-3.5 text-amber-400" /> Engagement Trigger & Retention Mechanism
                            </span>
                            <div className="p-2.5 rounded-lg bg-amber-950/20 border border-amber-500/30 text-amber-200 font-medium">
                              {block.engagementTrigger}
                            </div>
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                );
              })
            ) : (
              <div className="p-8 text-center text-zinc-400 font-mono text-xs glass-card rounded-2xl border border-white/10">
                No script blocks matched your search filter "{searchQuery}".
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};
