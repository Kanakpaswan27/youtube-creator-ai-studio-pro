import React, { useState } from 'react';
import {
  DollarSign,
  Link as LinkIcon,
  ShoppingBag,
  ExternalLink,
  Copy,
  Check,
  TrendingUp,
  BarChart3,
  Sparkles,
  Zap,
  Tag,
  Share2,
  Percent,
  RefreshCw,
  Info,
  Layers,
  PieChart,
  ArrowRight,
  Globe,
  Award,
  ShieldCheck,
  CheckCircle2,
} from 'lucide-react';

interface GeneratedAffiliateLink {
  platform: 'Amazon' | 'Flipkart' | 'Meesho';
  originalUrl: string;
  optimizedUrl: string;
  shortUrl: string;
  utmUrl: string;
  category: string;
  commissionRate: string;
  estMonthlySales: number;
  estCommission: string;
  badgeColor: string;
  logoBg: string;
}

export const AffiliateAiModule: React.FC<{ onBackToDashboard?: () => void }> = () => {
  // Form Inputs
  const [amazonUrl, setAmazonUrl] = useState<string>(
    'https://www.amazon.in/dp/B0CX23GF43?th=1'
  );
  const [flipkartUrl, setFlipkartUrl] = useState<string>(
    'https://www.flipkart.com/apple-iphone-15-black-128-gb/p/itm6ac2b85d264f8'
  );
  const [meeshoUrl, setMeeshoUrl] = useState<string>(
    'https://www.meesho.com/s/p/6xq8z1?utm_source=ws'
  );
  const [affiliateTag, setAffiliateTag] = useState<string>('creatorhub-21');
  const [campaignName, setCampaignName] = useState<string>('yt_description_best_tech');

  const [isGenerating, setIsGenerating] = useState<boolean>(false);
  const [copiedKey, setCopiedKey] = useState<string | null>(null);

  // Generated State
  const [generatedLinks, setGeneratedLinks] = useState<GeneratedAffiliateLink[]>([
    {
      platform: 'Amazon',
      originalUrl: 'https://www.amazon.in/dp/B0CX23GF43?th=1',
      optimizedUrl: 'https://www.amazon.in/dp/B0CX23GF43?tag=creatorhub-21&linkCode=asi&ref_=as_li_ss_tl',
      shortUrl: 'https://yt.link/amzn-iphone15',
      utmUrl: 'https://yt.link/amzn-iphone15?utm_source=youtube&utm_medium=description&utm_campaign=yt_description_best_tech',
      category: 'Electronics & Mobiles',
      commissionRate: '5.0%',
      estMonthlySales: 145,
      estCommission: '₹47,125',
      badgeColor: 'bg-amber-500/10 text-amber-400 border-amber-500/30',
      logoBg: 'from-amber-500 to-yellow-600',
    },
    {
      platform: 'Flipkart',
      originalUrl: 'https://www.flipkart.com/apple-iphone-15-black-128-gb/p/itm6ac2b85d264f8',
      optimizedUrl: 'https://www.flipkart.com/apple-iphone-15-black-128-gb/p/itm6ac2b85d264f8?affid=creatorhub-21&affExtParam1=yt_desc',
      shortUrl: 'https://yt.link/fk-iphone15',
      utmUrl: 'https://yt.link/fk-iphone15?utm_source=youtube&utm_medium=description&utm_campaign=yt_description_best_tech',
      category: 'Smartphones & Gadgets',
      commissionRate: '4.5%',
      estMonthlySales: 110,
      estCommission: '₹34,650',
      badgeColor: 'bg-blue-500/10 text-blue-400 border-blue-500/30',
      logoBg: 'from-blue-500 to-cyan-600',
    },
    {
      platform: 'Meesho',
      originalUrl: 'https://www.meesho.com/s/p/6xq8z1?utm_source=ws',
      optimizedUrl: 'https://www.meesho.com/s/p/6xq8z1?meesho_aff=creatorhub-21&sub_id=yt_desc',
      shortUrl: 'https://yt.link/msho-case15',
      utmUrl: 'https://yt.link/msho-case15?utm_source=youtube&utm_medium=description&utm_campaign=yt_description_best_tech',
      category: 'Fashion & Accessories',
      commissionRate: '12.0%',
      estMonthlySales: 320,
      estCommission: '₹19,200',
      badgeColor: 'bg-pink-500/10 text-pink-400 border-pink-500/30',
      logoBg: 'from-pink-500 to-rose-600',
    },
  ]);

  const handleCopy = (key: string, text: string) => {
    navigator.clipboard.writeText(text);
    setCopiedKey(key);
    setTimeout(() => setCopiedKey(null), 2000);
  };

  const handleGenerateAffiliateLinks = (e: React.FormEvent) => {
    e.preventDefault();
    setIsGenerating(true);

    setTimeout(() => {
      const tag = affiliateTag.trim() || 'affiliate-21';
      const cmp = campaignName.trim() || 'yt_campaign';

      const results: GeneratedAffiliateLink[] = [];

      if (amazonUrl.trim()) {
        const cleanAmzn = amazonUrl.split('?')[0];
        results.push({
          platform: 'Amazon',
          originalUrl: amazonUrl,
          optimizedUrl: `${cleanAmzn}?tag=${tag}&linkCode=asi&ref_=as_li_ss_tl`,
          shortUrl: `https://yt.link/amzn-${Math.floor(1000 + Math.random() * 9000)}`,
          utmUrl: `https://yt.link/amzn-${Math.floor(1000 + Math.random() * 9000)}?utm_source=youtube&utm_medium=description&utm_campaign=${cmp}`,
          category: 'Consumer Electronics',
          commissionRate: '5.0%',
          estMonthlySales: 160,
          estCommission: '₹52,000',
          badgeColor: 'bg-amber-500/10 text-amber-400 border-amber-500/30',
          logoBg: 'from-amber-500 to-yellow-600',
        });
      }

      if (flipkartUrl.trim()) {
        const cleanFk = flipkartUrl.split('?')[0];
        results.push({
          platform: 'Flipkart',
          originalUrl: flipkartUrl,
          optimizedUrl: `${cleanFk}?affid=${tag}&affExtParam1=${cmp}`,
          shortUrl: `https://yt.link/fk-${Math.floor(1000 + Math.random() * 9000)}`,
          utmUrl: `https://yt.link/fk-${Math.floor(1000 + Math.random() * 9000)}?utm_source=youtube&utm_medium=description&utm_campaign=${cmp}`,
          category: 'Mobiles & Tech',
          commissionRate: '4.5%',
          estMonthlySales: 125,
          estCommission: '₹38,500',
          badgeColor: 'bg-blue-500/10 text-blue-400 border-blue-500/30',
          logoBg: 'from-blue-500 to-cyan-600',
        });
      }

      if (meeshoUrl.trim()) {
        const cleanMeesho = meeshoUrl.split('?')[0];
        results.push({
          platform: 'Meesho',
          originalUrl: meeshoUrl,
          optimizedUrl: `${cleanMeesho}?meesho_aff=${tag}&sub_id=${cmp}`,
          shortUrl: `https://yt.link/msho-${Math.floor(1000 + Math.random() * 9000)}`,
          utmUrl: `https://yt.link/msho-${Math.floor(1000 + Math.random() * 9000)}?utm_source=youtube&utm_medium=description&utm_campaign=${cmp}`,
          category: 'Fashion & Home',
          commissionRate: '12.0%',
          estMonthlySales: 290,
          estCommission: '₹21,800',
          badgeColor: 'bg-pink-500/10 text-pink-400 border-pink-500/30',
          logoBg: 'from-pink-500 to-rose-600',
        });
      }

      setGeneratedLinks(results);
      setIsGenerating(false);
    }, 700);
  };

  const handleCopyAllLinksText = () => {
    const formatted = generatedLinks
      .map((l) => `🛒 Buy on ${l.platform}: ${l.shortUrl}`)
      .join('\n');
    navigator.clipboard.writeText(formatted);
    setCopiedKey('copy-all-formatted');
    setTimeout(() => setCopiedKey(null), 2000);
  };

  return (
    <div className="space-y-6">
      {/* HEADER BANNER */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-white/10">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-emerald-500 via-teal-600 to-cyan-600 flex items-center justify-center text-white font-bold shadow-lg shadow-emerald-900/30">
            <DollarSign className="w-5 h-5" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h2 className="text-xl font-black text-white tracking-tight">
                Affiliate AI Workspace & Monetization Engine
              </h2>
              <span className="bg-emerald-500/10 text-emerald-400 text-xs font-bold px-2.5 py-0.5 rounded-full border border-emerald-500/20 font-mono">
                Module #5
              </span>
            </div>
            <p className="text-xs text-zinc-400 mt-0.5">
              Generate optimized affiliate links, UTM tracking, short links, and commission calculations for Amazon, Flipkart & Meesho
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={handleCopyAllLinksText}
            className="px-3.5 py-2 rounded-xl bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 text-white text-xs font-bold transition flex items-center gap-2 cursor-pointer shadow-md shadow-emerald-900/20 border border-emerald-400/30"
          >
            {copiedKey === 'copy-all-formatted' ? (
              <>
                <Check className="w-4 h-4 text-emerald-300" />
                <span>Copied YouTube Description Box!</span>
              </>
            ) : (
              <>
                <Copy className="w-4 h-4" />
                <span>Copy Description Block</span>
              </>
            )}
          </button>
        </div>
      </div>

      {/* TOP ANALYTICS STAT CARDS */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Stat 1: Est Monthly Revenue */}
        <div className="glass-card rounded-2xl p-4 border border-white/10 space-y-2 relative overflow-hidden">
          <div className="flex items-center justify-between">
            <span className="text-[11px] font-bold text-zinc-400 uppercase tracking-wider">Est. Monthly Earnings</span>
            <div className="p-2 rounded-xl bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
              <DollarSign className="w-4 h-4" />
            </div>
          </div>
          <div className="text-2xl font-black text-white tracking-tight">₹1,00,975</div>
          <p className="text-[10px] font-mono text-emerald-400 flex items-center gap-1">
            <TrendingUp className="w-3 h-3" /> +24.8% vs last video campaign
          </p>
        </div>

        {/* Stat 2: Total Clicks */}
        <div className="glass-card rounded-2xl p-4 border border-white/10 space-y-2 relative overflow-hidden">
          <div className="flex items-center justify-between">
            <span className="text-[11px] font-bold text-zinc-400 uppercase tracking-wider">Predicted Clicks</span>
            <div className="p-2 rounded-xl bg-blue-500/10 text-blue-400 border border-blue-500/20">
              <LinkIcon className="w-4 h-4" />
            </div>
          </div>
          <div className="text-2xl font-black text-white tracking-tight">14,820</div>
          <p className="text-[10px] font-mono text-blue-400 flex items-center gap-1">
            <BarChart3 className="w-3 h-3" /> 8.4% Description CTR
          </p>
        </div>

        {/* Stat 3: Avg Commission Rate */}
        <div className="glass-card rounded-2xl p-4 border border-white/10 space-y-2 relative overflow-hidden">
          <div className="flex items-center justify-between">
            <span className="text-[11px] font-bold text-zinc-400 uppercase tracking-wider">Avg Commission Rate</span>
            <div className="p-2 rounded-xl bg-amber-500/10 text-amber-400 border border-amber-500/20">
              <Percent className="w-4 h-4" />
            </div>
          </div>
          <div className="text-2xl font-black text-white tracking-tight">7.16%</div>
          <p className="text-[10px] font-mono text-amber-400">High margin category tags</p>
        </div>

        {/* Stat 4: Top Platform */}
        <div className="glass-card rounded-2xl p-4 border border-white/10 space-y-2 relative overflow-hidden">
          <div className="flex items-center justify-between">
            <span className="text-[11px] font-bold text-zinc-400 uppercase tracking-wider">Top Converting Platform</span>
            <div className="p-2 rounded-xl bg-pink-500/10 text-pink-400 border border-pink-500/20">
              <ShoppingBag className="w-4 h-4" />
            </div>
          </div>
          <div className="text-2xl font-black text-white tracking-tight">Amazon India</div>
          <p className="text-[10px] font-mono text-pink-400">46.7% share of sales</p>
        </div>
      </div>

      {/* INPUT FORM SECTION */}
      <div className="glass-card rounded-2xl p-6 border border-white/10 space-y-5">
        <div className="flex items-center justify-between border-b border-white/10 pb-3">
          <div className="flex items-center gap-2">
            <Share2 className="w-4 h-4 text-emerald-400" />
            <h3 className="font-extrabold text-sm text-white">Multi-Store Product URL Converter</h3>
          </div>
          <span className="text-[11px] text-zinc-400 font-mono">Supports Amazon, Flipkart & Meesho</span>
        </div>

        <form onSubmit={handleGenerateAffiliateLinks} className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Affiliate Tag Input */}
            <div className="space-y-1.5">
              <label className="text-xs font-bold text-zinc-200 flex items-center gap-1.5">
                <Tag className="w-3.5 h-3.5 text-emerald-400" />
                Primary Affiliate ID / Store Tag
              </label>
              <input
                type="text"
                required
                value={affiliateTag}
                onChange={(e) => setAffiliateTag(e.target.value)}
                placeholder="e.g. creatorhub-21 or meesho_aff_99"
                className="w-full glass-input rounded-xl px-3.5 py-2.5 text-xs text-white placeholder-zinc-500 focus:border-emerald-500 font-mono"
              />
            </div>

            {/* Campaign Name */}
            <div className="space-y-1.5">
              <label className="text-xs font-bold text-zinc-200 flex items-center gap-1.5">
                <Globe className="w-3.5 h-3.5 text-emerald-400" />
                UTM Campaign Tag
              </label>
              <input
                type="text"
                value={campaignName}
                onChange={(e) => setCampaignName(e.target.value)}
                placeholder="e.g. yt_tech_review_2026"
                className="w-full glass-input rounded-xl px-3.5 py-2.5 text-xs text-white placeholder-zinc-500 focus:border-emerald-500 font-mono"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-2">
            {/* Amazon URL */}
            <div className="space-y-1.5">
              <label className="text-xs font-bold text-amber-400 flex items-center gap-1.5">
                <ShoppingBag className="w-3.5 h-3.5" />
                Amazon Product URL
              </label>
              <input
                type="url"
                value={amazonUrl}
                onChange={(e) => setAmazonUrl(e.target.value)}
                placeholder="https://www.amazon.in/dp/..."
                className="w-full glass-input rounded-xl px-3.5 py-2.5 text-xs text-white placeholder-zinc-500 focus:border-amber-500"
              />
            </div>

            {/* Flipkart URL */}
            <div className="space-y-1.5">
              <label className="text-xs font-bold text-blue-400 flex items-center gap-1.5">
                <ShoppingBag className="w-3.5 h-3.5" />
                Flipkart Product URL
              </label>
              <input
                type="url"
                value={flipkartUrl}
                onChange={(e) => setFlipkartUrl(e.target.value)}
                placeholder="https://www.flipkart.com/..."
                className="w-full glass-input rounded-xl px-3.5 py-2.5 text-xs text-white placeholder-zinc-500 focus:border-blue-500"
              />
            </div>

            {/* Meesho URL */}
            <div className="space-y-1.5">
              <label className="text-xs font-bold text-pink-400 flex items-center gap-1.5">
                <ShoppingBag className="w-3.5 h-3.5" />
                Meesho Product URL
              </label>
              <input
                type="url"
                value={meeshoUrl}
                onChange={(e) => setMeeshoUrl(e.target.value)}
                placeholder="https://www.meesho.com/..."
                className="w-full glass-input rounded-xl px-3.5 py-2.5 text-xs text-white placeholder-zinc-500 focus:border-pink-500"
              />
            </div>
          </div>

          {/* GENERATE BUTTON */}
          <button
            type="submit"
            disabled={isGenerating}
            className="w-full py-3.5 rounded-xl bg-gradient-to-r from-emerald-600 via-teal-600 to-cyan-500 text-white font-extrabold text-xs tracking-wide shadow-xl shadow-emerald-900/30 hover:shadow-emerald-600/40 transition flex items-center justify-center gap-2 cursor-pointer border border-emerald-400/40 disabled:opacity-50"
          >
            <Zap className={`w-4 h-4 ${isGenerating ? 'animate-spin' : ''}`} />
            <span>{isGenerating ? 'Generating Short Links & Commission Metrics...' : 'Generate Optimized Affiliate Suite'}</span>
            <Sparkles className="w-4 h-4 text-amber-300" />
          </button>
        </form>
      </div>

      {/* GENERATED LINKS & COMMISSION BREAKDOWN CARDS */}
      <div className="space-y-4">
        <div className="flex items-center justify-between pb-2 border-b border-white/10">
          <h3 className="text-base font-extrabold text-white flex items-center gap-2">
            <LinkIcon className="w-4 h-4 text-emerald-400" /> Generated Optimized Links & Commission Analysis
          </h3>
          <span className="text-xs text-zinc-400 font-mono">{generatedLinks.length} Platforms Active</span>
        </div>

        <div className="grid grid-cols-1 gap-4">
          {generatedLinks.map((link, idx) => (
            <div
              key={idx}
              className="glass-card rounded-2xl p-5 border border-white/10 hover:border-emerald-500/40 transition space-y-4"
            >
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-white/10 pb-3">
                <div className="flex items-center gap-3">
                  <div
                    className={`w-9 h-9 rounded-xl bg-gradient-to-br ${link.logoBg} flex items-center justify-center text-white font-extrabold text-xs shadow-md`}
                  >
                    {link.platform.substring(0, 2)}
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <h4 className="font-extrabold text-sm text-white">{link.platform} Partner Link</h4>
                      <span className={`text-[10px] font-mono font-bold px-2 py-0.5 rounded-full border ${link.badgeColor}`}>
                        {link.category}
                      </span>
                    </div>
                    <p className="text-[11px] font-mono text-zinc-400 truncate max-w-md">
                      {link.originalUrl}
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-4 text-right">
                  <div>
                    <p className="text-[10px] font-mono text-zinc-400">Commission Rate</p>
                    <p className="text-sm font-black text-emerald-400 font-mono">{link.commissionRate}</p>
                  </div>
                  <div>
                    <p className="text-[10px] font-mono text-zinc-400">Est. Monthly Earnings</p>
                    <p className="text-sm font-black text-white font-mono">{link.estCommission}</p>
                  </div>
                </div>
              </div>

              {/* THREE LINK VARIATIONS WITH COPY BUTTONS */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-3 pt-1">
                {/* 1. Shortened YouTube Link */}
                <div className="p-3 rounded-xl bg-zinc-950 border border-white/10 space-y-1.5">
                  <div className="flex items-center justify-between text-[10px] font-mono text-zinc-400">
                    <span className="text-emerald-400 font-bold">1. Shortened Clean Link</span>
                    <button
                      onClick={() => handleCopy(`short-${idx}`, link.shortUrl)}
                      className="text-zinc-400 hover:text-white transition flex items-center gap-1 cursor-pointer"
                    >
                      {copiedKey === `short-${idx}` ? (
                        <Check className="w-3 h-3 text-emerald-400" />
                      ) : (
                        <Copy className="w-3 h-3" />
                      )}
                      <span>{copiedKey === `short-${idx}` ? 'Copied' : 'Copy'}</span>
                    </button>
                  </div>
                  <p className="text-xs font-mono font-bold text-white truncate">{link.shortUrl}</p>
                </div>

                {/* 2. Tagged Raw Affiliate URL */}
                <div className="p-3 rounded-xl bg-zinc-950 border border-white/10 space-y-1.5">
                  <div className="flex items-center justify-between text-[10px] font-mono text-zinc-400">
                    <span className="text-blue-400 font-bold">2. Tagged Affiliate URL</span>
                    <button
                      onClick={() => handleCopy(`opt-${idx}`, link.optimizedUrl)}
                      className="text-zinc-400 hover:text-white transition flex items-center gap-1 cursor-pointer"
                    >
                      {copiedKey === `opt-${idx}` ? (
                        <Check className="w-3 h-3 text-emerald-400" />
                      ) : (
                        <Copy className="w-3 h-3" />
                      )}
                      <span>{copiedKey === `opt-${idx}` ? 'Copied' : 'Copy'}</span>
                    </button>
                  </div>
                  <p className="text-xs font-mono text-zinc-300 truncate">{link.optimizedUrl}</p>
                </div>

                {/* 3. Full UTM Tracking URL */}
                <div className="p-3 rounded-xl bg-zinc-950 border border-white/10 space-y-1.5">
                  <div className="flex items-center justify-between text-[10px] font-mono text-zinc-400">
                    <span className="text-amber-400 font-bold">3. Full UTM Campaign URL</span>
                    <button
                      onClick={() => handleCopy(`utm-${idx}`, link.utmUrl)}
                      className="text-zinc-400 hover:text-white transition flex items-center gap-1 cursor-pointer"
                    >
                      {copiedKey === `utm-${idx}` ? (
                        <Check className="w-3 h-3 text-emerald-400" />
                      ) : (
                        <Copy className="w-3 h-3" />
                      )}
                      <span>{copiedKey === `utm-${idx}` ? 'Copied' : 'Copy'}</span>
                    </button>
                  </div>
                  <p className="text-xs font-mono text-zinc-300 truncate">{link.utmUrl}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
