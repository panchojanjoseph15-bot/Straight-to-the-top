import React from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { DayRecord, ColorTier } from '../types';
import {
  getDaysInMonth,
  getFirstDayOfWeek,
  formatDateKey,
  getDayColorInfo,
} from '../utils/calendar';

interface DayByDayCalendarProps {
  currentYear: number;
  currentMonth: number; // 0-indexed (9 = October)
  todayDateStr: string;
  selectedDateStr: string;
  records: Record<string, DayRecord>;
  onSelectDate: (dateStr: string) => void;
  onPrevMonth: () => void;
  onNextMonth: () => void;
}

const COLOR_CLASSES: Record<ColorTier, { bg: string; text: string; border: string }> = {
  green: {
    bg: 'bg-[#22c55e]',
    text: 'text-slate-950 font-bold',
    border: 'border-[#16a34a]',
  },
  yellow: {
    bg: 'bg-[#eab308]',
    text: 'text-slate-950 font-bold',
    border: 'border-[#ca8a04]',
  },
  orange: {
    bg: 'bg-[#f97316]',
    text: 'text-slate-950 font-bold',
    border: 'border-[#ea580c]',
  },
  red: {
    bg: 'bg-[#ef4444]',
    text: 'text-white font-bold',
    border: 'border-[#dc2626]',
  },
  gray: {
    bg: 'bg-[#18202c]',
    text: 'text-slate-500',
    border: 'border-[#263040]',
  },
};

const WEEKDAYS = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];

export const DayByDayCalendar: React.FC<DayByDayCalendarProps> = ({
  currentYear,
  currentMonth,
  todayDateStr,
  selectedDateStr,
  records,
  onSelectDate,
  onPrevMonth,
  onNextMonth,
}) => {
  const daysInMonth = getDaysInMonth(currentYear, currentMonth);
  const startDayOffset = getFirstDayOfWeek(currentYear, currentMonth);

  const monthName = new Date(currentYear, currentMonth).toLocaleDateString('en-US', {
    month: 'long',
  });

  return (
    <div className="bg-[#161b22] border border-[#30363d] rounded-2xl p-5 shadow-xl flex flex-col justify-between">
      <div>
        {/* Calendar Card Header */}
        <div className="flex items-center justify-between pb-4 border-b border-[#30363d]/60 mb-5">
          <h2 className="text-base font-bold text-white tracking-tight">
            Day by Day Improvement
          </h2>

          {/* Month Selector */}
          <div className="flex items-center gap-2 bg-[#0d1117] border border-[#30363d] rounded-xl px-2.5 py-1">
            <button
              onClick={onPrevMonth}
              className="p-1 rounded-md text-slate-400 hover:text-white hover:bg-[#21262d] transition-colors"
              title="Previous month"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>
            <span className="text-xs font-bold text-slate-200 tracking-wide min-w-[110px] text-center">
              {monthName} {currentYear}
            </span>
            <button
              onClick={onNextMonth}
              className="p-1 rounded-md text-slate-400 hover:text-white hover:bg-[#21262d] transition-colors"
              title="Next month"
            >
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Weekday Row */}
        <div className="grid grid-cols-7 gap-2 mb-2 text-center">
          {WEEKDAYS.map(day => (
            <span key={day} className="text-[11px] font-semibold text-slate-400 tracking-wider">
              {day}
            </span>
          ))}
        </div>

        {/* Days Grid */}
        <div className="grid grid-cols-7 gap-2.5">
          {/* Empty leading days */}
          {Array.from({ length: startDayOffset }).map((_, i) => (
            <div key={`empty-${i}`} className="aspect-square opacity-0 pointer-events-none" />
          ))}

          {/* Month Days */}
          {Array.from({ length: daysInMonth }).map((_, i) => {
            const dayNum = i + 1;
            const dateKey = formatDateKey(currentYear, currentMonth, dayNum);
            const record = records[dateKey];
            const colorInfo = getDayColorInfo(record);
            const isToday = dateKey === todayDateStr;
            const isSelected = dateKey === selectedDateStr;
            const colors = COLOR_CLASSES[colorInfo.tier];

            return (
              <button
                key={dateKey}
                onClick={() => onSelectDate(dateKey)}
                title={`${dateKey}: ${colorInfo.label} (${colorInfo.completedCount}/${colorInfo.totalCount})`}
                className={`relative aspect-square rounded-xl p-1.5 flex flex-col justify-between transition-all duration-150 group border ${colors.bg} ${colors.border} ${
                  isSelected ? 'ring-2 ring-sky-400 ring-offset-2 ring-offset-[#161b22] scale-105 z-10' : ''
                } ${
                  isToday && !isSelected ? 'ring-2 ring-sky-500/70' : ''
                } hover:scale-105 hover:shadow-lg`}
              >
                {/* Day number */}
                <span
                  className={`text-[11px] font-semibold text-left leading-none ${
                    colorInfo.tier === 'gray' ? 'text-slate-400' : 'opacity-85'
                  }`}
                >
                  {dayNum}
                </span>

                {/* Task ratio count (e.g. 3/5) */}
                <div className="text-center w-full">
                  {colorInfo.totalCount > 0 ? (
                    <span className={`text-[11px] tracking-tight ${colors.text}`}>
                      {colorInfo.completedCount}/{colorInfo.totalCount}
                    </span>
                  ) : (
                    <span className="text-[10px] text-slate-600 block opacity-0 group-hover:opacity-100">
                      -
                    </span>
                  )}
                </div>

                {/* Today Indicator Dot */}
                {isToday && (
                  <span className="absolute top-1 right-1 w-1.5 h-1.5 rounded-full bg-sky-300 shadow-sm" />
                )}
              </button>
            );
          })}
        </div>
      </div>

      {/* Legend Row */}
      <div className="mt-6 pt-4 border-t border-[#30363d]/60 flex items-center justify-between flex-wrap gap-2 text-[11px] text-slate-400">
        <div className="flex items-center gap-1.5">
          <span className="w-3 h-3 rounded-md bg-[#ef4444]" />
          <span>0% done</span>
        </div>
        <div className="flex items-center gap-1.5">
          <span className="w-3 h-3 rounded-md bg-[#f97316]" />
          <span>1% to 49%</span>
        </div>
        <div className="flex items-center gap-1.5">
          <span className="w-3 h-3 rounded-md bg-[#eab308]" />
          <span>50% to 99%</span>
        </div>
        <div className="flex items-center gap-1.5">
          <span className="w-3 h-3 rounded-md bg-[#22c55e]" />
          <span>100%</span>
        </div>
        <div className="flex items-center gap-1.5">
          <span className="w-3 h-3 rounded-md bg-[#18202c] border border-[#263040]" />
          <span>No tasks set</span>
        </div>
      </div>
    </div>
  );
};
