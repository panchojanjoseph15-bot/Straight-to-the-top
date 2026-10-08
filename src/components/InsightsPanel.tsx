import React from 'react';
import { Check, X as XIcon, AlertCircle, Quote } from 'lucide-react';
import { DayRecord, MonthStats } from '../types';
import { formatHumanDate, getDayColorInfo } from '../utils/calendar';
import { ClimbVisual } from './ClimbVisual';

interface InsightsPanelProps {
  selectedDateStr: string;
  selectedRecord?: DayRecord;
  stats: MonthStats;
}

export const InsightsPanel: React.FC<InsightsPanelProps> = ({
  selectedDateStr,
  selectedRecord,
  stats,
}) => {
  const colorInfo = getDayColorInfo(selectedRecord);
  const formattedSelectedDate = formatHumanDate(selectedDateStr);

  return (
    <div className="space-y-4 flex flex-col justify-between">
      {/* 1. Day Detail Card */}
      <div className="bg-[#161b22] border border-[#30363d] rounded-2xl p-5 shadow-xl">
        <div className="flex items-center justify-between pb-3 border-b border-[#30363d]/60 mb-3">
          <div>
            <h3 className="text-sm font-bold text-white tracking-tight">Day detail</h3>
            <p className="text-xs text-slate-400 mt-0.5">
              {formattedSelectedDate}
              {colorInfo.totalCount > 0 && (
                <span className="ml-1 text-slate-300 font-semibold font-mono">
                  · {colorInfo.completedCount}/{colorInfo.totalCount}
                </span>
              )}
            </p>
          </div>

          {colorInfo.totalCount > 0 && (
            <span
              className={`text-[10px] font-bold px-2 py-0.5 rounded-md border ${
                colorInfo.tier === 'green'
                  ? 'bg-green-500/10 text-green-400 border-green-500/30'
                  : colorInfo.tier === 'yellow'
                  ? 'bg-yellow-500/10 text-yellow-400 border-yellow-500/30'
                  : colorInfo.tier === 'orange'
                  ? 'bg-orange-500/10 text-orange-400 border-orange-500/30'
                  : colorInfo.tier === 'red'
                  ? 'bg-red-500/10 text-red-400 border-red-500/30'
                  : 'bg-slate-800 text-slate-400 border-slate-700'
              }`}
            >
              {colorInfo.label}
            </span>
          )}
        </div>

        {/* Tasks breakdown for this selected day */}
        {!selectedRecord || selectedRecord.tasks.length === 0 ? (
          <div className="py-5 text-center text-xs text-slate-500 border border-dashed border-[#30363d] rounded-xl">
            No tasks recorded for this day.
          </div>
        ) : (
          <div className="space-y-2 mb-4">
            {selectedRecord.tasks.map(task => (
              <div
                key={task.id}
                className="flex items-center gap-2.5 text-xs font-medium text-slate-300"
              >
                {task.completed ? (
                  <span className="w-4 h-4 rounded flex items-center justify-center bg-green-500/10 text-green-400">
                    <Check className="w-3.5 h-3.5 stroke-[3]" />
                  </span>
                ) : (
                  <span className="w-4 h-4 rounded flex items-center justify-center bg-rose-500/10 text-rose-400">
                    <XIcon className="w-3.5 h-3.5 stroke-[3]" />
                  </span>
                )}
                <span className={task.completed ? 'text-slate-200' : 'text-slate-400'}>
                  {task.title}
                </span>
              </div>
            ))}
          </div>
        )}

        {/* Reflection quotation */}
        <div className="mt-3 p-3 bg-[#0d1117] rounded-xl border border-[#30363d]/80 text-xs">
          <div className="flex items-center gap-1.5 text-slate-400 mb-1 text-[11px] font-semibold">
            <Quote className="w-3 h-3 text-sky-400" />
            <span>Saved Reflection</span>
          </div>
          {selectedRecord && selectedRecord.reflection ? (
            <p className="text-slate-300 italic leading-relaxed text-xs">
              "{selectedRecord.reflection}"
            </p>
          ) : (
            <p className="text-slate-500 italic text-[11px]">
              [No reflection saved for this day]
            </p>
          )}
        </div>
      </div>

      {/* 2. Streak and Stats Card */}
      <div className="bg-[#161b22] border border-[#30363d] rounded-2xl p-5 shadow-xl">
        <h3 className="text-sm font-bold text-white tracking-tight mb-3">
          Streak and stats
        </h3>

        <div className="grid grid-cols-3 gap-2 text-center mb-4">
          <div className="bg-[#0d1117] border border-[#30363d]/80 rounded-xl p-2.5">
            <div className="text-xl font-extrabold text-white">
              {stats.currentStreak}
            </div>
            <div className="text-[10px] text-slate-400 font-medium">Current streak</div>
          </div>
          <div className="bg-[#0d1117] border border-[#30363d]/80 rounded-xl p-2.5">
            <div className="text-xl font-extrabold text-white">
              {stats.longestStreak}
            </div>
            <div className="text-[10px] text-slate-400 font-medium">Longest streak</div>
          </div>
          <div className="bg-[#0d1117] border border-[#30363d]/80 rounded-xl p-2.5">
            <div className="text-xl font-extrabold text-sky-400">
              {stats.completionRate}%
            </div>
            <div className="text-[10px] text-slate-400 font-medium">Completion</div>
          </div>
        </div>

        {/* Color Badge Counts */}
        <div className="grid grid-cols-4 gap-1.5 text-center text-xs">
          <div className="bg-emerald-500/15 border border-emerald-500/30 text-emerald-400 rounded-lg py-1 px-1.5 font-bold">
            Green {stats.counts.green}
          </div>
          <div className="bg-yellow-500/15 border border-yellow-500/30 text-yellow-400 rounded-lg py-1 px-1.5 font-bold">
            Yellow {stats.counts.yellow}
          </div>
          <div className="bg-orange-500/15 border border-orange-500/30 text-orange-400 rounded-lg py-1 px-1.5 font-bold">
            Orange {stats.counts.orange}
          </div>
          <div className="bg-rose-500/15 border border-rose-500/30 text-rose-400 rounded-lg py-1 px-1.5 font-bold">
            Red {stats.counts.red}
          </div>
        </div>
      </div>

      {/* 3. Weakest Task Card */}
      <div className="bg-[#161b22] border border-[#30363d] rounded-2xl p-5 shadow-xl">
        <div className="flex items-center justify-between mb-2">
          <h3 className="text-sm font-bold text-white tracking-tight flex items-center gap-1.5">
            <AlertCircle className="w-3.5 h-3.5 text-orange-400" />
            <span>Weakest task</span>
          </h3>
          <span className="text-[10px] text-slate-500">Area to improve</span>
        </div>

        {stats.weakestTask && stats.weakestTask.missedDays > 0 ? (
          <div>
            <div className="text-sm font-bold text-slate-100 mb-1">
              {stats.weakestTask.title}
            </div>
            <p className="text-xs text-slate-400 mb-2">
              Missed {stats.weakestTask.missedDays} of {stats.weakestTask.totalDays} scheduled days this month
            </p>
            {/* Miss Rate Progress Bar */}
            <div className="w-full bg-[#0d1117] h-2 rounded-full overflow-hidden border border-[#30363d]/60">
              <div
                className="h-full bg-gradient-to-r from-orange-500 to-rose-500 rounded-full transition-all duration-500"
                style={{ width: `${Math.min(stats.weakestTask.percentageMissed, 100)}%` }}
              />
            </div>
          </div>
        ) : (
          <div className="text-xs text-slate-400 py-2">
            No missed tasks detected this month. Outstanding discipline!
          </div>
        )}
      </div>

      {/* 4. The Climb Visual */}
      <ClimbVisual currentStreak={stats.currentStreak} />
    </div>
  );
};
