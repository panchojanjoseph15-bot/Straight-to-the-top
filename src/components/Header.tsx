import React, { useState } from 'react';
import { ArrowUp, RotateCcw, Download, FastForward, HelpCircle } from 'lucide-react';

interface HeaderProps {
  currentDateStr: string;
  onResetSeedData: () => void;
  onSimulateNextDay: () => void;
  onExportData: () => void;
  onBackToLanding: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  currentDateStr,
  onResetSeedData,
  onSimulateNextDay,
  onExportData,
  onBackToLanding,
}) => {
  const [showHelp, setShowHelp] = useState(false);

  // Format date display (e.g. "Tuesday, October 6")
  const [y, m, d] = currentDateStr.split('-').map(Number);
  const formattedDate = new Date(y, m - 1, d).toLocaleDateString('en-US', {
    weekday: 'long',
    month: 'long',
    day: 'numeric',
  });

  return (
    <header className="flex flex-col sm:flex-row sm:items-center justify-between pb-6 border-b border-border/70 gap-4">
      <div className="flex items-center gap-3.5">
        <div className="w-11 h-11 rounded-xl bg-gradient-to-br from-brand-accent to-sky-400 p-[1px] shadow-lg shadow-sky-500/20">
          <div className="w-full h-full bg-[#111620] rounded-[11px] flex items-center justify-center text-brand-blue group-hover:scale-105 transition-transform">
            <ArrowUp className="w-6 h-6 stroke-[2.5] text-sky-400" />
          </div>
        </div>
        <div>
          <h1 className="text-xl sm:text-2xl font-bold tracking-tight text-white flex items-center gap-2">
            Straight to the Top
          </h1>
          <p className="text-sm font-medium text-slate-400">
            {formattedDate}
          </p>
        </div>
      </div>

      <div className="flex items-center gap-2 self-end sm:self-auto flex-wrap">
        <button
          onClick={onBackToLanding}
          title="Return to the Landing Page / Website"
          className="px-3 py-1.5 text-xs font-semibold bg-surface hover:bg-surfaceHover border border-sky-500/40 rounded-lg text-sky-400 hover:text-sky-300 flex items-center gap-1.5 transition-all shadow-sm"
        >
          <span>← Website</span>
        </button>

        <button
          onClick={onSimulateNextDay}
          title="Simulate advancing to next day (test rollover & presets)"
          className="px-3 py-1.5 text-xs font-semibold bg-surface hover:bg-surfaceHover border border-border rounded-lg text-slate-300 hover:text-white flex items-center gap-1.5 transition-all shadow-sm"
        >
          <FastForward className="w-3.5 h-3.5 text-amber-400" />
          <span>Next Day</span>
        </button>

        <button
          onClick={onExportData}
          title="Export data backup as JSON"
          className="p-1.5 sm:px-3 sm:py-1.5 text-xs font-semibold bg-surface hover:bg-surfaceHover border border-border rounded-lg text-slate-300 hover:text-white flex items-center gap-1.5 transition-all shadow-sm"
        >
          <Download className="w-3.5 h-3.5 text-sky-400" />
          <span className="hidden sm:inline">Export</span>
        </button>

        <button
          onClick={onResetSeedData}
          title="Clear all tasks and start fresh"
          className="p-1.5 sm:px-3 sm:py-1.5 text-xs font-semibold bg-surface hover:bg-surfaceHover border border-border rounded-lg text-slate-300 hover:text-white flex items-center gap-1.5 transition-all shadow-sm"
        >
          <RotateCcw className="w-3.5 h-3.5 text-slate-400" />
          <span className="hidden sm:inline">Clear Data</span>
        </button>

        <button
          onClick={() => setShowHelp(!showHelp)}
          title="App Guide"
          className="p-1.5 text-xs font-semibold bg-surface hover:bg-surfaceHover border border-border rounded-lg text-slate-400 hover:text-white transition-all shadow-sm"
        >
          <HelpCircle className="w-4 h-4" />
        </button>
      </div>

      {showHelp && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-surface border border-border max-w-lg w-full rounded-2xl p-6 shadow-2xl relative">
            <h3 className="text-lg font-bold text-white mb-2 flex items-center gap-2">
              <ArrowUp className="w-5 h-5 text-sky-400" />
              How Straight to the Top Works
            </h3>
            <div className="text-sm text-slate-300 space-y-3 mt-3">
              <p>
                <strong>Daily Habit Tracking:</strong> Check off habits as you complete them today. Unfinished tasks reset at midnight so every morning is a clean slate.
              </p>
              <p>
                <strong>The Monthly Heatmap:</strong> Inspired by GitHub contributions, each day box displays your count (e.g., 3/5) and color:
              </p>
              <ul className="text-xs space-y-1.5 pl-3 border-l-2 border-border my-2">
                <li><span className="inline-block w-3 h-3 rounded-sm bg-status-green mr-2"></span><strong>Green (100%):</strong> All daily tasks completed.</li>
                <li><span className="inline-block w-3 h-3 rounded-sm bg-status-yellow mr-2"></span><strong>Yellow (50-99%):</strong> At least half completed.</li>
                <li><span className="inline-block w-3 h-3 rounded-sm bg-status-orange mr-2"></span><strong>Orange (1-49%):</strong> Partial progress.</li>
                <li><span className="inline-block w-3 h-3 rounded-sm bg-status-red mr-2"></span><strong>Red (0%):</strong> No tasks finished.</li>
                <li><span className="inline-block w-3 h-3 rounded-sm bg-[#1a212d] mr-2"></span><strong>Gray:</strong> No tasks scheduled.</li>
              </ul>
              <p>
                <strong>The Climb:</strong> Maintain a daily streak (Yellow or Green) to scale from <em>Base Camp</em> through <em>Mid-Climb</em> to the <em>Summit</em>!
              </p>
            </div>
            <button
              onClick={() => setShowHelp(false)}
              className="mt-6 w-full py-2 bg-sky-500 hover:bg-sky-400 text-slate-950 font-bold rounded-xl transition-all"
            >
              Got it
            </button>
          </div>
        </div>
      )}
    </header>
  );
};
