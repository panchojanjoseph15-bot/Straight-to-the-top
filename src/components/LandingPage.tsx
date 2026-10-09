import React from 'react';
import {
  ArrowUp,
  Download,
  Monitor,
  Smartphone,
  Globe,
  ShieldCheck,
  Sparkles,
  Mountain,
  Flame,
  Calendar,
  CheckCircle2,
  ChevronRight,
  ExternalLink,
  Lock,
  Zap
} from 'lucide-react';

interface LandingPageProps {
  onLaunchApp: () => void;
}

export const LandingPage: React.FC<LandingPageProps> = ({ onLaunchApp }) => {
  const WINDOWS_DOWNLOAD_URL = 'https://github.com/panchojanjoseph15-bot/Straight-to-the-top/releases/latest/download/Straight.to.the.Top.Setup.0.1.0.exe';
  const WINDOWS_PORTABLE_URL = 'https://github.com/panchojanjoseph15-bot/Straight-to-the-top/releases/latest/download/Straight.to.the.Top.0.1.0.exe';

  // PWA & Mobile Installation state
  const [deferredPrompt, setDeferredPrompt] = React.useState<any>(null);
  const [showIosModal, setShowIosModal] = React.useState<boolean>(false);
  const [isInstalled, setIsInstalled] = React.useState<boolean>(false);

  React.useEffect(() => {
    const handleBeforeInstallPrompt = (e: Event) => {
      e.preventDefault();
      setDeferredPrompt(e);
    };

    window.addEventListener('beforeinstallprompt', handleBeforeInstallPrompt);
    window.addEventListener('appinstalled', () => {
      setIsInstalled(true);
      setDeferredPrompt(null);
    });

    return () => {
      window.removeEventListener('beforeinstallprompt', handleBeforeInstallPrompt);
    };
  }, []);

  const handleInstallMobile = async () => {
    if (deferredPrompt) {
      deferredPrompt.prompt();
      const choice = await deferredPrompt.userChoice;
      if (choice.outcome === 'accepted') {
        setIsInstalled(true);
      }
      setDeferredPrompt(null);
    } else {
      const isIos = /iPad|iPhone|iPod/.test(navigator.userAgent) && !(window as any).MSStream;
      if (isIos) {
        setShowIosModal(true);
      } else {
        onLaunchApp();
      }
    }
  };

  return (
    <div className="min-h-screen bg-[#0b0e14] text-slate-100 flex flex-col font-sans selection:bg-sky-500/30 selection:text-white">
      {/* 1. Navigation Header */}
      <nav className="sticky top-0 z-50 bg-[#0b0e14]/90 backdrop-blur-md border-b border-[#30363d]/70 px-4 sm:px-8 py-4">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-sky-500 to-brand-accent p-[1px] shadow-lg shadow-sky-500/20">
              <div className="w-full h-full bg-[#111620] rounded-[11px] flex items-center justify-center">
                <ArrowUp className="w-5 h-5 text-sky-400 stroke-[2.5]" />
              </div>
            </div>
            <span className="text-lg font-bold tracking-tight text-white">
              Straight to the Top
            </span>
          </div>

          <div className="hidden md:flex items-center gap-6 text-sm font-medium text-slate-300">
            <a href="#features" className="hover:text-white transition-colors">Features</a>
            <a href="#the-climb" className="hover:text-white transition-colors">The Climb</a>
            <a href="#download-center" className="hover:text-white transition-colors">Download</a>
            <a href="#faq" className="hover:text-white transition-colors">FAQ</a>
          </div>

          <div className="flex items-center gap-3">
            <a
              href={WINDOWS_DOWNLOAD_URL}
              download="Straight-to-the-Top-Setup-0.1.0.exe"
              className="hidden sm:flex items-center gap-2 px-3.5 py-2 text-xs font-semibold bg-[#161b22] hover:bg-[#21262d] border border-[#30363d] rounded-xl text-slate-200 hover:text-white transition-all shadow-sm"
            >
              <Download className="w-3.5 h-3.5 text-sky-400" />
              <span>Download (.exe)</span>
            </a>
            <button
              onClick={onLaunchApp}
              className="flex items-center gap-2 px-4 py-2 text-xs font-bold bg-sky-400 hover:bg-sky-300 text-slate-950 rounded-xl transition-all shadow-md shadow-sky-500/20"
            >
              <span>Launch Web App</span>
              <ChevronRight className="w-3.5 h-3.5 stroke-[3]" />
            </button>
          </div>
        </div>
      </nav>

      {/* 2. Hero Section */}
      <section className="relative pt-12 sm:pt-20 pb-16 px-4 sm:px-8 overflow-hidden">
        {/* Ambient Gradient Glows */}
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[350px] bg-sky-500/10 rounded-full blur-[120px] pointer-events-none" />
        <div className="absolute top-1/3 left-1/3 w-[300px] h-[200px] bg-emerald-500/10 rounded-full blur-[100px] pointer-events-none" />

        <div className="max-w-5xl mx-auto text-center relative z-10 space-y-6">
          {/* Release Badge */}
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#161b22] border border-[#30363d] text-xs text-slate-300 shadow-sm">
            <span className="flex h-2 w-2 rounded-full bg-emerald-400 animate-pulse" />
            <span className="font-semibold text-emerald-400">v0.1 Available Now</span>
            <span className="text-slate-500">·</span>
            <span>Free, Open-Source & Local-First</span>
          </div>

          <h1 className="text-4xl sm:text-6xl lg:text-7xl font-extrabold tracking-tight text-white leading-[1.1]">
            Build Unbreakable Habits, <br />
            <span className="bg-gradient-to-r from-sky-400 via-sky-300 to-emerald-400 bg-clip-text text-transparent">
              One Day at a Time.
            </span>
          </h1>

          <p className="max-w-2xl mx-auto text-base sm:text-lg text-slate-400 leading-relaxed font-normal">
            A GitHub-inspired daily habit tracker and reflection journal. Watch your day-by-day consistency turn into a visual mountain climb. No accounts, no subscriptions, zero clutter.
          </p>

          {/* CTA Buttons */}
          <div className="pt-2 flex flex-col sm:flex-row items-center justify-center gap-3.5">
            <a
              href={WINDOWS_DOWNLOAD_URL}
              download="Straight-to-the-Top-Setup-0.1.0.exe"
              className="w-full sm:w-auto px-6 py-3.5 rounded-xl font-bold text-sm bg-sky-400 hover:bg-sky-300 text-slate-950 flex items-center justify-center gap-2.5 transition-all shadow-lg shadow-sky-500/25 hover:scale-[1.02]"
            >
              <Download className="w-4 h-4 stroke-[2.5]" />
              <span>Download for Windows (.exe)</span>
            </a>

            <button
              onClick={handleInstallMobile}
              className="w-full sm:w-auto px-6 py-3.5 rounded-xl font-bold text-sm bg-purple-500/20 hover:bg-purple-500/30 border border-purple-500/40 text-purple-200 flex items-center justify-center gap-2.5 transition-all hover:scale-[1.02]"
            >
              <Smartphone className="w-4 h-4 text-purple-400" />
              <span>{isInstalled ? 'Mobile Installed ✓' : 'Install on Phone'}</span>
            </button>

            <button
              onClick={onLaunchApp}
              className="w-full sm:w-auto px-6 py-3.5 rounded-xl font-bold text-sm bg-[#161b22] hover:bg-[#21262d] border border-[#30363d] text-white flex items-center justify-center gap-2.5 transition-all shadow-sm hover:scale-[1.02]"
            >
              <Globe className="w-4 h-4 text-sky-400" />
              <span>Launch Web App</span>
            </button>
          </div>

          {/* Platform badges */}
          <div className="pt-2 flex items-center justify-center gap-6 text-xs text-slate-400">
            <div className="flex items-center gap-1.5">
              <Monitor className="w-4 h-4 text-slate-500" />
              <span>Windows 10 / 11</span>
            </div>
            <span className="text-slate-700">•</span>
            <div className="flex items-center gap-1.5">
              <Smartphone className="w-4 h-4 text-slate-500" />
              <span>Mobile PWA (iOS & Android)</span>
            </div>
            <span className="text-slate-700">•</span>
            <div className="flex items-center gap-1.5">
              <ShieldCheck className="w-4 h-4 text-emerald-400" />
              <span>100% Offline & Private</span>
            </div>
          </div>
        </div>

        {/* Hero Interactive App Mockup Preview */}
        <div className="max-w-6xl mx-auto mt-12 sm:mt-16 rounded-2xl border border-[#30363d] bg-[#161b22]/90 p-2 sm:p-4 shadow-2xl shadow-sky-950/40 relative group cursor-pointer" onClick={onLaunchApp}>
          <div className="absolute -top-3 left-1/2 -translate-x-1/2 px-4 py-1 rounded-full bg-sky-500 text-slate-950 font-bold text-xs shadow-md tracking-wide flex items-center gap-1.5">
            <Sparkles className="w-3.5 h-3.5 fill-slate-950" />
            <span>Interactive 3-Column Interface · Click to Launch</span>
          </div>

          {/* Window Chrome Header */}
          <div className="flex items-center justify-between px-3 py-2 border-b border-[#30363d]/70 mb-3 text-xs text-slate-400">
            <div className="flex items-center gap-2">
              <span className="w-3 h-3 rounded-full bg-[#ef4444]/80 inline-block" />
              <span className="w-3 h-3 rounded-full bg-[#eab308]/80 inline-block" />
              <span className="w-3 h-3 rounded-full bg-[#22c55e]/80 inline-block" />
              <span className="ml-2 font-mono text-[11px] text-slate-400">straight-to-the-top — Desktop View</span>
            </div>
            <div className="flex items-center gap-1.5 text-sky-400 font-semibold text-[11px]">
              <span>Open Full App</span>
              <ExternalLink className="w-3 h-3" />
            </div>
          </div>

          {/* 3 Columns Preview Grid */}
          <div className="grid grid-cols-1 md:grid-cols-12 gap-3 text-left p-1">
            {/* Left Preview: Today */}
            <div className="md:col-span-4 bg-[#0d1117] border border-[#30363d] rounded-xl p-3.5 space-y-3">
              <div className="flex justify-between items-center text-xs font-bold text-white">
                <span>List of tasks today</span>
                <span className="text-[10px] font-mono bg-[#161b22] px-2 py-0.5 rounded border border-[#30363d] text-slate-400">2 of 5 done</span>
              </div>
              <div className="space-y-1.5 text-xs">
                <div className="p-2 rounded-lg bg-[#111c2a] border border-sky-500/30 flex items-center gap-2">
                  <span className="w-4 h-4 rounded bg-sky-400 text-slate-950 flex items-center justify-center font-bold text-[10px]">✓</span>
                  <span className="line-through text-slate-400">Cook healthy</span>
                </div>
                <div className="p-2 rounded-lg bg-[#111c2a] border border-sky-500/30 flex items-center gap-2">
                  <span className="w-4 h-4 rounded bg-sky-400 text-slate-950 flex items-center justify-center font-bold text-[10px]">✓</span>
                  <span className="line-through text-slate-400">Workout 15 min</span>
                </div>
                <div className="p-2 rounded-lg bg-[#161b22] border border-[#30363d] flex items-center gap-2">
                  <span className="w-4 h-4 rounded border border-slate-600 inline-block" />
                  <span className="text-slate-200">Study 15 min</span>
                </div>
                <div className="p-2 rounded-lg bg-[#161b22] border border-[#30363d] flex items-center gap-2">
                  <span className="w-4 h-4 rounded border border-slate-600 inline-block" />
                  <span className="text-slate-200">5,000 steps</span>
                </div>
              </div>
              <div className="pt-1">
                <div className="text-[11px] font-bold text-slate-300 mb-1">Reflection of this day</div>
                <div className="p-2 bg-[#161b22] rounded-lg border border-[#30363d] text-[10px] text-slate-400 italic">
                  "Pushed through the morning workout. Need to set earlier study block..."
                </div>
              </div>
            </div>

            {/* Center Preview: Calendar Heatmap */}
            <div className="md:col-span-4 bg-[#0d1117] border border-[#30363d] rounded-xl p-3.5 space-y-3">
              <div className="flex justify-between items-center text-xs font-bold text-white">
                <span>Day by Day Improvement</span>
                <span className="text-[10px] text-slate-400 font-mono">October 2026</span>
              </div>
              <div className="grid grid-cols-7 gap-1.5 text-center text-[10px]">
                <div className="text-slate-500">M</div><div className="text-slate-500">T</div><div className="text-slate-500">W</div><div className="text-slate-500">T</div><div className="text-slate-500">F</div><div className="text-slate-500">S</div><div className="text-slate-500">S</div>
                <div className="aspect-square opacity-0"></div><div className="aspect-square opacity-0"></div><div className="aspect-square opacity-0"></div>
                <div className="aspect-square rounded bg-[#eab308] text-slate-950 font-bold flex flex-col justify-between p-0.5"><span>1</span><span className="text-[8px]">3/5</span></div>
                <div className="aspect-square rounded bg-[#ef4444] text-white font-bold flex flex-col justify-between p-0.5"><span>2</span><span className="text-[8px]">0/5</span></div>
                <div className="aspect-square rounded bg-[#22c55e] text-slate-950 font-bold flex flex-col justify-between p-0.5"><span>3</span><span className="text-[8px]">5/5</span></div>
                <div className="aspect-square rounded bg-[#eab308] text-slate-950 font-bold flex flex-col justify-between p-0.5"><span>4</span><span className="text-[8px]">4/5</span></div>
                <div className="aspect-square rounded bg-[#22c55e] text-slate-950 font-bold flex flex-col justify-between p-0.5"><span>5</span><span className="text-[8px]">5/5</span></div>
                <div className="aspect-square rounded bg-[#f97316] text-slate-950 font-bold flex flex-col justify-between p-0.5 ring-1 ring-sky-400"><span>6</span><span className="text-[8px]">2/5</span></div>
                <div className="aspect-square rounded bg-[#18202c] text-slate-600 flex items-center justify-center">7</div>
                <div className="aspect-square rounded bg-[#18202c] text-slate-600 flex items-center justify-center">8</div>
                <div className="aspect-square rounded bg-[#18202c] text-slate-600 flex items-center justify-center">9</div>
                <div className="aspect-square rounded bg-[#18202c] text-slate-600 flex items-center justify-center">10</div>
                <div className="aspect-square rounded bg-[#18202c] text-slate-600 flex items-center justify-center">11</div>
              </div>
              <div className="flex items-center justify-between text-[9px] text-slate-400 pt-1">
                <span className="flex items-center gap-1"><span className="w-2 h-2 rounded bg-[#ef4444]" /> 0%</span>
                <span className="flex items-center gap-1"><span className="w-2 h-2 rounded bg-[#f97316]" /> 1-49%</span>
                <span className="flex items-center gap-1"><span className="w-2 h-2 rounded bg-[#eab308]" /> 50-99%</span>
                <span className="flex items-center gap-1"><span className="w-2 h-2 rounded bg-[#22c55e]" /> 100%</span>
              </div>
            </div>

            {/* Right Preview: Insights & The Climb */}
            <div className="md:col-span-4 bg-[#0d1117] border border-[#30363d] rounded-xl p-3.5 space-y-2.5">
              <div className="flex justify-between items-center text-xs font-bold text-white">
                <span>The Climb</span>
                <span className="text-[10px] text-amber-400 font-semibold flex items-center gap-1">
                  <Flame className="w-3 h-3 fill-amber-400" /> 3-day streak
                </span>
              </div>
              <div className="h-16 bg-[#161b22] rounded-lg border border-[#30363d] p-1.5 flex flex-col justify-between relative overflow-hidden">
                <div className="text-[10px] text-slate-400">Status: <span className="text-sky-400 font-bold">Base Camp</span></div>
                <div className="flex justify-between text-[9px] text-slate-500 font-medium">
                  <span className="text-sky-400 font-bold">Base Camp</span>
                  <span>Mid-Climb</span>
                  <span>Summit</span>
                </div>
              </div>
              <div className="p-2 bg-[#161b22] rounded-lg border border-[#30363d] space-y-1 text-[11px]">
                <div className="text-slate-400 font-medium">Weakest Task: <strong className="text-slate-200">Study 15 min</strong></div>
                <div className="text-[10px] text-slate-500">Missed 4 of 6 scheduled days</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 3. Core Features Section */}
      <section id="features" className="py-20 px-4 sm:px-8 border-t border-[#30363d]/50 bg-[#0d1117]/60">
        <div className="max-w-6xl mx-auto space-y-12">
          <div className="text-center space-y-3">
            <h2 className="text-xs font-bold text-sky-400 tracking-wider uppercase">Built For Results</h2>
            <h3 className="text-3xl sm:text-4xl font-extrabold text-white">Everything You Need to Level Up</h3>
            <p className="text-sm sm:text-base text-slate-400 max-w-xl mx-auto">
              Designed around behavioral psychology: immediate visual feedback, zero carry-over guilt, and clear progress milestones.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Feature 1 */}
            <div className="bg-[#161b22] border border-[#30363d] rounded-2xl p-6 space-y-3.5 hover:border-sky-500/50 transition-all">
              <div className="w-10 h-10 rounded-xl bg-sky-500/10 border border-sky-500/20 flex items-center justify-center text-sky-400">
                <Calendar className="w-5 h-5" />
              </div>
              <h4 className="text-base font-bold text-white">GitHub-Style Contribution Heatmap</h4>
              <p className="text-xs sm:text-sm text-slate-400 leading-relaxed">
                Color-coded monthly matrix with 4 distinct thresholds and explicit counts on every box. Colorblind-safe and instantly readable at a glance.
              </p>
            </div>

            {/* Feature 2 */}
            <div className="bg-[#161b22] border border-[#30363d] rounded-2xl p-6 space-y-3.5 hover:border-sky-500/50 transition-all">
              <div className="w-10 h-10 rounded-xl bg-amber-500/10 border border-amber-500/20 flex items-center justify-center text-amber-400">
                <Zap className="w-5 h-5" />
              </div>
              <h4 className="text-base font-bold text-white">Daily Reset & Tomorrow's Preset</h4>
              <p className="text-xs sm:text-sm text-slate-400 leading-relaxed">
                Missed habits don't snowball or clutter your list. Midnight gives you a fresh start, while past days are frozen into permanent historical records.
              </p>
            </div>

            {/* Feature 3 */}
            <div className="bg-[#161b22] border border-[#30363d] rounded-2xl p-6 space-y-3.5 hover:border-sky-500/50 transition-all">
              <div className="w-10 h-10 rounded-xl bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center text-emerald-400">
                <Mountain className="w-5 h-5" />
              </div>
              <h4 className="text-base font-bold text-white">The Climb Mountain Visualizer</h4>
              <p className="text-xs sm:text-sm text-slate-400 leading-relaxed">
                Stay accountable with the mountain altitude climber. Push your streak past 50% consistency to scale from Base Camp through Mid-Climb to the Summit.
              </p>
            </div>

            {/* Feature 4 */}
            <div className="bg-[#161b22] border border-[#30363d] rounded-2xl p-6 space-y-3.5 hover:border-sky-500/50 transition-all">
              <div className="w-10 h-10 rounded-xl bg-rose-500/10 border border-rose-500/20 flex items-center justify-center text-rose-400">
                <CheckCircle2 className="w-5 h-5" />
              </div>
              <h4 className="text-base font-bold text-white">Weakest Task Analyzer</h4>
              <p className="text-xs sm:text-sm text-slate-400 leading-relaxed">
                Pinpoints the exact task you struggle with most this month. Provides actionable data directly targeting your daily reflection's "areas to improve".
              </p>
            </div>

            {/* Feature 5 */}
            <div className="bg-[#161b22] border border-[#30363d] rounded-2xl p-6 space-y-3.5 hover:border-sky-500/50 transition-all">
              <div className="w-10 h-10 rounded-xl bg-purple-500/10 border border-purple-500/20 flex items-center justify-center text-purple-400">
                <Sparkles className="w-5 h-5" />
              </div>
              <h4 className="text-base font-bold text-white">Curated Habit Suggestions</h4>
              <p className="text-xs sm:text-sm text-slate-400 leading-relaxed">
                Browse through healthy lifestyle suggestions (Health, Fitness, Learning, Sleep, Productivity) and add them to your routine with a single click.
              </p>
            </div>

            {/* Feature 6 */}
            <div className="bg-[#161b22] border border-[#30363d] rounded-2xl p-6 space-y-3.5 hover:border-sky-500/50 transition-all">
              <div className="w-10 h-10 rounded-xl bg-teal-500/10 border border-teal-500/20 flex items-center justify-center text-teal-400">
                <Lock className="w-5 h-5" />
              </div>
              <h4 className="text-base font-bold text-white">100% Private & Local-First</h4>
              <p className="text-xs sm:text-sm text-slate-400 leading-relaxed">
                Zero telemetry, no logins, no cloud tracking. All data is saved on your machine with one-click JSON backup export whenever you need it.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 4. The Climb Gamification Spotlight */}
      <section id="the-climb" className="py-20 px-4 sm:px-8 border-t border-[#30363d]/50 bg-[#0b0e14]">
        <div className="max-w-5xl mx-auto rounded-3xl bg-gradient-to-b from-[#161b22] to-[#0f141d] border border-[#30363d] p-8 sm:p-12 space-y-8 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-80 h-80 bg-sky-500/5 rounded-full blur-[80px] pointer-events-none" />

          <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
            <div className="space-y-2 max-w-xl">
              <div className="inline-flex items-center gap-1.5 text-xs font-bold text-amber-400 bg-amber-500/10 border border-amber-500/20 px-3 py-1 rounded-full">
                <Flame className="w-3.5 h-3.5 fill-amber-400" />
                <span>Gamified Consistency</span>
              </div>
              <h3 className="text-2xl sm:text-3xl font-extrabold text-white">The Mountain Climb</h3>
              <p className="text-sm text-slate-400 leading-relaxed">
                Consistency is hard when it feels abstract. In Straight to the Top, each consecutive day you achieve 50% or more completion advances your glowing climber along the ridge.
              </p>
            </div>

            <div className="bg-[#0d1117] border border-[#30363d] p-4 rounded-2xl flex items-center gap-6">
              <div className="text-center">
                <div className="text-2xl font-black text-white">0–3</div>
                <div className="text-[10px] text-slate-400 uppercase font-semibold">Base Camp</div>
              </div>
              <div className="text-slate-600">→</div>
              <div className="text-center">
                <div className="text-2xl font-black text-sky-400">4–7</div>
                <div className="text-[10px] text-slate-400 uppercase font-semibold">Mid-Climb</div>
              </div>
              <div className="text-slate-600">→</div>
              <div className="text-center">
                <div className="text-2xl font-black text-emerald-400">8+</div>
                <div className="text-[10px] text-slate-400 uppercase font-semibold">Summit</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 5. Download Center Section */}
      <section id="download-center" className="py-20 px-4 sm:px-8 border-t border-[#30363d]/50 bg-[#0d1117]">
        <div className="max-w-5xl mx-auto space-y-12">
          <div className="text-center space-y-3">
            <h2 className="text-xs font-bold text-sky-400 tracking-wider uppercase">Direct Downloads</h2>
            <h3 className="text-3xl sm:text-4xl font-extrabold text-white">Get Straight to the Top Today</h3>
            <p className="text-sm sm:text-base text-slate-400 max-w-xl mx-auto">
              Download the native Windows desktop app, install it as a lightweight Progressive Web App on mobile, or launch in your browser.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Windows Download Card */}
            <div className="bg-[#161b22] border-2 border-sky-500/40 rounded-2xl p-6 flex flex-col justify-between shadow-xl relative group">
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="w-12 h-12 rounded-xl bg-sky-500/10 border border-sky-500/30 flex items-center justify-center text-sky-400">
                    <Monitor className="w-6 h-6" />
                  </div>
                  <span className="text-[11px] font-bold px-2.5 py-0.5 rounded-full bg-sky-500/20 text-sky-300 border border-sky-500/30">
                    Recommended
                  </span>
                </div>

                <div>
                  <h4 className="text-lg font-bold text-white">Windows Desktop</h4>
                  <p className="text-xs text-slate-400 mt-1">
                    Native desktop experience with taskbar integration and offline storage.
                  </p>
                </div>

                <div className="space-y-1.5 text-xs text-slate-300 font-medium pt-2">
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                    <span>Windows 10 / 11 (64-bit)</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                    <span>Self-contained .exe Installer</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                    <span>Automatic Offline Storage</span>
                  </div>
                </div>
              </div>

              <div className="pt-6 space-y-2.5">
                <a
                  href={WINDOWS_DOWNLOAD_URL}
                  download="Straight-to-the-Top-Setup-0.1.0.exe"
                  className="w-full py-3 px-4 rounded-xl font-bold text-xs bg-sky-400 hover:bg-sky-300 text-slate-950 flex items-center justify-center gap-2 transition-all shadow-md shadow-sky-500/20"
                >
                  <Download className="w-4 h-4 stroke-[2.5]" />
                  <span>Download Installer (.exe)</span>
                </a>
                <div className="flex items-center justify-center gap-3 text-[11px] text-slate-400 pt-1">
                  <a
                    href={WINDOWS_PORTABLE_URL}
                    download="Straight-to-the-Top-Portable-0.1.0.exe"
                    className="hover:text-sky-300 underline underline-offset-2 transition-colors"
                  >
                    Portable .exe
                  </a>
                  <span>·</span>
                  <a
                    href="https://github.com/panchojanjoseph15-bot/Straight-to-the-top/releases"
                    target="_blank"
                    rel="noreferrer"
                    className="hover:text-sky-300 underline underline-offset-2 transition-colors"
                  >
                    GitHub Releases
                  </a>
                </div>
                <p className="text-[10px] text-center text-slate-500 font-mono">
                  SHA-256 Verified · 100% Free & Open Source
                </p>
              </div>
            </div>

            {/* Mobile / PWA Card */}
            <div className="bg-[#161b22] border border-[#30363d] rounded-2xl p-6 flex flex-col justify-between shadow-xl">
              <div className="space-y-4">
                <div className="w-12 h-12 rounded-xl bg-purple-500/10 border border-purple-500/30 flex items-center justify-center text-purple-400">
                  <Smartphone className="w-6 h-6" />
                </div>

                <div>
                  <h4 className="text-lg font-bold text-white">Mobile App (PWA)</h4>
                  <p className="text-xs text-slate-400 mt-1">
                    Instantly installable on iPhone & Android with dedicated 3-tab layout.
                  </p>
                </div>

                <div className="space-y-1.5 text-xs text-slate-300 font-medium pt-2">
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                    <span>iOS: 'Add to Home Screen'</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                    <span>Android: 1-Tap Home Screen Install</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                    <span>Works completely offline without store</span>
                  </div>
                </div>
              </div>

              <div className="pt-6 space-y-2">
                <button
                  onClick={handleInstallMobile}
                  className="w-full py-3 px-4 rounded-xl font-bold text-xs bg-purple-500 hover:bg-purple-400 text-slate-950 flex items-center justify-center gap-2 transition-all shadow-md shadow-purple-500/20"
                >
                  <Smartphone className="w-4 h-4 text-slate-950" />
                  <span>{isInstalled ? 'App Installed ✓' : deferredPrompt ? 'Install on Android' : 'Install / Open on Mobile'}</span>
                </button>
                <button
                  onClick={onLaunchApp}
                  className="w-full py-2 px-3 text-[11px] text-slate-400 hover:text-white transition-colors text-center"
                >
                  Or launch mobile web app in browser →
                </button>
              </div>
            </div>

            {/* Web App Live Card */}
            <div className="bg-[#161b22] border border-[#30363d] rounded-2xl p-6 flex flex-col justify-between shadow-xl">
              <div className="space-y-4">
                <div className="w-12 h-12 rounded-xl bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center text-emerald-400">
                  <Globe className="w-6 h-6" />
                </div>

                <div>
                  <h4 className="text-lg font-bold text-white">Instant Web App</h4>
                  <p className="text-xs text-slate-400 mt-1">
                    No installation required. Runs directly in any modern browser.
                  </p>
                </div>

                <div className="space-y-1.5 text-xs text-slate-300 font-medium pt-2">
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                    <span>Zero install or setup</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                    <span>Instant full dashboard</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                    <span>Export / Import anytime</span>
                  </div>
                </div>
              </div>

              <div className="pt-6">
                <button
                  onClick={onLaunchApp}
                  className="w-full py-3 px-4 rounded-xl font-bold text-xs bg-emerald-500 hover:bg-emerald-400 text-slate-950 flex items-center justify-center gap-2 transition-all shadow-md shadow-emerald-500/20"
                >
                  <span>Launch in Browser</span>
                  <ChevronRight className="w-4 h-4 stroke-[3]" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 6. FAQ Section */}
      <section id="faq" className="py-20 px-4 sm:px-8 border-t border-[#30363d]/50 bg-[#0b0e14]">
        <div className="max-w-3xl mx-auto space-y-8">
          <div className="text-center space-y-2">
            <h2 className="text-xs font-bold text-sky-400 tracking-wider uppercase">Got Questions?</h2>
            <h3 className="text-2xl sm:text-3xl font-extrabold text-white">Frequently Asked Questions</h3>
          </div>

          <div className="space-y-4 text-xs sm:text-sm">
            <div className="bg-[#161b22] border border-[#30363d] rounded-2xl p-5 space-y-2">
              <h4 className="font-bold text-white text-sm">How does the daily reset work?</h4>
              <p className="text-slate-400 leading-relaxed">
                When a new day begins, yesterday's tasks and reflection are frozen into a permanent historical snapshot. Incomplete tasks are cleared rather than carrying over, allowing you to start each morning with a fresh slate.
              </p>
            </div>

            <div className="bg-[#161b22] border border-[#30363d] rounded-2xl p-5 space-y-2">
              <h4 className="font-bold text-white text-sm">Where is my data stored?</h4>
              <p className="text-slate-400 leading-relaxed">
                100% on your device! We don't have accounts, telemetry, or remote servers tracking your habits. Everything stays in your browser/app's secure local storage, and you can export a full JSON backup anytime.
              </p>
            </div>

            <div className="bg-[#161b22] border border-[#30363d] rounded-2xl p-5 space-y-2">
              <h4 className="font-bold text-white text-sm">What counts toward "The Climb" streak?</h4>
              <p className="text-slate-400 leading-relaxed">
                Any day where you complete at least 50% of your habits (Yellow or Green status) maintains and builds your streak. Hitting consecutive days scales your rank from Base Camp to Mid-Climb and Summit!
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 7. Footer */}
      <footer className="border-t border-[#30363d] py-10 px-4 sm:px-8 bg-[#0b0e14] text-xs text-slate-500">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <div className="w-6 h-6 rounded-lg bg-sky-500/20 border border-sky-500/30 flex items-center justify-center">
              <ArrowUp className="w-3.5 h-3.5 text-sky-400 stroke-[2.5]" />
            </div>
            <span className="font-bold text-slate-300">Straight to the Top</span>
            <span>· MIT License</span>
          </div>

          <div className="flex items-center gap-6">
            <button onClick={onLaunchApp} className="hover:text-slate-300 transition-colors">
              Web App
            </button>
            <a href="#download-center" className="hover:text-slate-300 transition-colors">
              Downloads
            </a>
            <a href="https://github.com/panchojanjoseph15-bot/Straight-to-the-top" target="_blank" rel="noreferrer" className="hover:text-slate-300 transition-colors">
              GitHub
            </a>
          </div>
        </div>
      </footer>
      {/* 8. iOS Add to Home Screen Modal */}
      {showIosModal && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-end sm:items-center justify-center p-4">
          <div className="bg-[#161b22] border border-[#30363d] rounded-2xl p-6 max-w-md w-full space-y-4 shadow-2xl animate-in fade-in slide-in-from-bottom-4 duration-200">
            <div className="flex items-center justify-between pb-2 border-b border-[#30363d]">
              <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-lg bg-purple-500/20 border border-purple-500/30 flex items-center justify-center text-purple-400">
                  <Smartphone className="w-4 h-4" />
                </div>
                <h3 className="font-bold text-white text-sm">Install on iPhone / iPad</h3>
              </div>
              <button
                onClick={() => setShowIosModal(false)}
                className="text-slate-400 hover:text-white p-1 text-sm font-bold"
              >
                ✕
              </button>
            </div>

            <p className="text-xs text-slate-300 leading-relaxed">
              Apple requires saving web apps via Safari to install them to your Home Screen:
            </p>

            <div className="space-y-3 text-xs bg-[#0d1117] p-3.5 rounded-xl border border-[#30363d]">
              <div className="flex items-start gap-3">
                <span className="w-5 h-5 rounded-full bg-purple-500/20 text-purple-400 font-bold flex items-center justify-center shrink-0 text-[10px]">1</span>
                <p className="text-slate-300">
                  Tap the <strong className="text-white">Share</strong> button at the bottom of Safari (<span className="text-sky-400 font-mono">⎋</span> or square with arrow).
                </p>
              </div>
              <div className="flex items-start gap-3">
                <span className="w-5 h-5 rounded-full bg-purple-500/20 text-purple-400 font-bold flex items-center justify-center shrink-0 text-[10px]">2</span>
                <p className="text-slate-300">
                  Scroll down the menu and tap <strong className="text-white">'Add to Home Screen'</strong> (<span className="text-emerald-400 font-mono">⊕</span>).
                </p>
              </div>
              <div className="flex items-start gap-3">
                <span className="w-5 h-5 rounded-full bg-purple-500/20 text-purple-400 font-bold flex items-center justify-center shrink-0 text-[10px]">3</span>
                <p className="text-slate-300">
                  Tap <strong className="text-white">'Add'</strong> in the top-right corner.
                </p>
              </div>
            </div>

            <div className="pt-2 flex gap-2">
              <button
                onClick={() => {
                  setShowIosModal(false);
                  onLaunchApp();
                }}
                className="w-full py-2.5 rounded-xl font-bold text-xs bg-sky-400 hover:bg-sky-300 text-slate-950 transition-all text-center"
              >
                Open Web App Now
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
