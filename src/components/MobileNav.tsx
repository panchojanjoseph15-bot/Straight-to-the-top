import React from 'react';
import { CheckSquare, Calendar, BarChart3 } from 'lucide-react';

export type MobileTab = 'today' | 'calendar' | 'insights';

interface MobileNavProps {
  activeTab: MobileTab;
  onChangeTab: (tab: MobileTab) => void;
  todayCompletedRatio: string;
}

export const MobileNav: React.FC<MobileNavProps> = ({
  activeTab,
  onChangeTab,
  todayCompletedRatio,
}) => {
  return (
    <nav className="lg:hidden fixed bottom-0 left-0 right-0 z-40 bg-[#111620]/95 backdrop-blur-md border-t border-[#30363d] px-4 py-2 flex items-center justify-around shadow-2xl">
      <button
        onClick={() => onChangeTab('today')}
        className={`flex flex-col items-center gap-1 py-1 px-4 rounded-xl transition-all relative ${
          activeTab === 'today'
            ? 'text-sky-400 font-bold'
            : 'text-slate-400 hover:text-slate-200 font-medium'
        }`}
      >
        <CheckSquare className="w-5 h-5" />
        <span className="text-[11px]">Today</span>
        {todayCompletedRatio && (
          <span className="absolute top-0 right-1 text-[9px] px-1 bg-sky-500/20 text-sky-300 rounded font-mono">
            {todayCompletedRatio}
          </span>
        )}
      </button>

      <button
        onClick={() => onChangeTab('calendar')}
        className={`flex flex-col items-center gap-1 py-1 px-4 rounded-xl transition-all ${
          activeTab === 'calendar'
            ? 'text-sky-400 font-bold'
            : 'text-slate-400 hover:text-slate-200 font-medium'
        }`}
      >
        <Calendar className="w-5 h-5" />
        <span className="text-[11px]">Calendar</span>
      </button>

      <button
        onClick={() => onChangeTab('insights')}
        className={`flex flex-col items-center gap-1 py-1 px-4 rounded-xl transition-all ${
          activeTab === 'insights'
            ? 'text-sky-400 font-bold'
            : 'text-slate-400 hover:text-slate-200 font-medium'
        }`}
      >
        <BarChart3 className="w-5 h-5" />
        <span className="text-[11px]">Insights</span>
      </button>
    </nav>
  );
};
