import React from 'react';
import { Mountain, Flame } from 'lucide-react';

interface ClimbVisualProps {
  currentStreak: number;
}

export const ClimbVisual: React.FC<ClimbVisualProps> = ({ currentStreak }) => {
  // Milestones:
  // 0 - 3 days: Base Camp (progress 0% -> 25%)
  // 4 - 7 days: Mid-Climb (progress 25% -> 60%)
  // 8 - 14+ days: Summit (progress 60% -> 100%)
  const maxStreak = 14;
  const progressRatio = Math.min(Math.max(currentStreak / maxStreak, 0.08), 0.95);

  // Calculate coordinates along mountain ridge for the climber dot:
  // SVG viewBox: 0 0 300 110
  // Left: (20, 95) -> Mid Camp: (140, 60) -> Summit: (260, 22)
  let dotX = 35 + progressRatio * 225;
  let dotY = 90 - Math.pow(progressRatio, 0.75) * 65;

  let rank = 'Base Camp';
  if (currentStreak >= 8) {
    rank = 'Summit Achiever';
  } else if (currentStreak >= 4) {
    rank = 'Mid-Climb Elevation';
  }

  return (
    <div className="bg-[#161b22] border border-[#30363d] rounded-2xl p-4 shadow-xl">
      <div className="flex items-center justify-between mb-2">
        <div className="flex items-center gap-1.5 text-xs font-bold text-white tracking-tight">
          <Mountain className="w-3.5 h-3.5 text-sky-400" />
          <span>The climb</span>
        </div>
        <div className="flex items-center gap-1 text-[11px] font-semibold text-amber-400">
          <Flame className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
          <span>{currentStreak} day streak</span>
        </div>
      </div>

      {/* Mountain Illustration SVG */}
      <div className="relative w-full h-24 overflow-hidden rounded-xl bg-[#0d1117] border border-[#30363d]/60 flex items-center justify-center">
        <svg
          viewBox="0 0 300 100"
          className="w-full h-full preserve-3d"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <defs>
            <linearGradient id="mountainGrad1" x1="150" y1="20" x2="150" y2="100" gradientUnits="userSpaceOnUse">
              <stop stopColor="#1e293b" />
              <stop stopColor="#0f172a" />
            </linearGradient>
            <linearGradient id="mountainGrad2" x1="260" y1="15" x2="260" y2="100" gradientUnits="userSpaceOnUse">
              <stop stopColor="#334155" />
              <stop stopColor="#1e293b" />
            </linearGradient>
            <linearGradient id="ridgeGlow" x1="0" y1="0" x2="1" y2="0">
              <stop offset="0%" stopColor="#38bdf8" stopOpacity="0.1" />
              <stop offset="50%" stopColor="#38bdf8" stopOpacity="0.4" />
              <stop offset="100%" stopColor="#38bdf8" stopOpacity="0.8" />
            </linearGradient>
          </defs>

          {/* Background mountain peaks */}
          <path
            d="M50 100 L125 38 L195 100 Z"
            fill="url(#mountainGrad1)"
            opacity="0.6"
          />

          {/* Main mountain ridge */}
          <path
            d="M10 100 L110 52 L170 70 L255 18 L295 100 Z"
            fill="url(#mountainGrad2)"
          />

          {/* Mountain Ridge Accent Line */}
          <path
            d="M10 100 L110 52 L170 70 L255 18"
            stroke="url(#ridgeGlow)"
            strokeWidth="1.5"
            strokeLinecap="round"
          />

          {/* Base Camp Dot & Marker */}
          <circle cx="35" cy="90" r="2.5" fill="#64748b" />
          {/* Mid-Climb Marker */}
          <circle cx="140" cy="62" r="2.5" fill="#64748b" />
          {/* Summit Marker Flag */}
          <circle cx="255" cy="18" r="3" fill="#38bdf8" />

          {/* Active Climber Glowing Indicator */}
          <g transform={`translate(${dotX}, ${dotY})`}>
            {/* Outer pulse */}
            <circle cx="0" cy="0" r="6" fill="#38bdf8" opacity="0.3" className="animate-ping" />
            {/* Solid glowing orb */}
            <circle cx="0" cy="0" r="4" fill="#38bdf8" />
            <circle cx="0" cy="0" r="1.5" fill="#ffffff" />
          </g>
        </svg>

        {/* Floating status tag */}
        <div className="absolute top-1.5 left-2 px-2 py-0.5 rounded bg-[#161b22]/90 border border-[#30363d] text-[10px] font-medium text-slate-300">
          Rank: <span className="text-sky-400 font-semibold">{rank}</span>
        </div>
      </div>

      {/* Milestones labels */}
      <div className="flex items-center justify-between text-[11px] text-slate-400 mt-2 px-1 font-medium">
        <span className={currentStreak <= 3 ? 'text-sky-400 font-bold' : ''}>
          Base Camp
        </span>
        <span className={currentStreak > 3 && currentStreak < 8 ? 'text-sky-400 font-bold' : ''}>
          Mid-Climb
        </span>
        <span className={currentStreak >= 8 ? 'text-sky-400 font-bold' : ''}>
          Summit
        </span>
      </div>
    </div>
  );
};
