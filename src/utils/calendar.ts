import { DayColorInfo, DayRecord, MonthStats } from '../types';

export function getDaysInMonth(year: number, month: number): number {
  return new Date(year, month + 1, 0).getDate();
}

/**
 * Returns 0 for Monday, 1 for Tuesday, ..., 6 for Sunday
 */
export function getFirstDayOfWeek(year: number, month: number): number {
  const day = new Date(year, month, 1).getDay();
  // Sunday is 0 in JS, make Monday 0
  return (day + 6) % 7;
}

export function formatDateKey(year: number, month: number, day: number): string {
  const m = String(month + 1).padStart(2, '0');
  const d = String(day).padStart(2, '0');
  return `${year}-${m}-${d}`;
}

export function formatHumanDate(dateStr: string): string {
  const [y, m, d] = dateStr.split('-').map(Number);
  const date = new Date(y, m - 1, d);
  return date.toLocaleDateString('en-US', {
    weekday: 'long',
    month: 'long',
    day: 'numeric',
  });
}

export function getDayColorInfo(record?: DayRecord): DayColorInfo {
  if (!record || !record.tasks || record.tasks.length === 0) {
    return {
      tier: 'gray',
      completedCount: 0,
      totalCount: 0,
      percentage: 0,
      label: 'No tasks set',
    };
  }

  const total = record.tasks.length;
  const completed = record.tasks.filter(t => t.completed).length;
  const percentage = Math.round((completed / total) * 100);

  if (completed === 0) {
    return {
      tier: 'red',
      completedCount: completed,
      totalCount: total,
      percentage,
      label: '0% done',
    };
  } else if (percentage < 50) {
    return {
      tier: 'orange',
      completedCount: completed,
      totalCount: total,
      percentage,
      label: '1% to 49% done',
    };
  } else if (percentage < 100) {
    return {
      tier: 'yellow',
      completedCount: completed,
      totalCount: total,
      percentage,
      label: '50% to 99% done',
    };
  } else {
    return {
      tier: 'green',
      completedCount: completed,
      totalCount: total,
      percentage: 100,
      label: '100% done',
    };
  }
}

export function calculateMonthStats(
  year: number,
  month: number,
  records: Record<string, DayRecord>,
  todayStr: string
): MonthStats {
  const daysInMonth = getDaysInMonth(year, month);
  const counts = { green: 0, yellow: 0, orange: 0, red: 0, gray: 0 };
  let totalTasksScheduled = 0;
  let totalTasksCompleted = 0;

  // Track task miss frequencies
  const taskMissMap: Record<string, { total: number; missed: number }> = {};

  for (let day = 1; day <= daysInMonth; day++) {
    const key = formatDateKey(year, month, day);
    const rec = records[key];

    if (rec && rec.tasks && rec.tasks.length > 0) {
      const color = getDayColorInfo(rec);
      counts[color.tier]++;

      const completed = rec.tasks.filter(t => t.completed).length;
      totalTasksScheduled += rec.tasks.length;
      totalTasksCompleted += completed;

      // Only count towards weakest task for days up to today or finalized days
      if (key <= todayStr || rec.finalized) {
        rec.tasks.forEach(t => {
          const normTitle = t.title.trim();
          if (!taskMissMap[normTitle]) {
            taskMissMap[normTitle] = { total: 0, missed: 0 };
          }
          taskMissMap[normTitle].total++;
          if (!t.completed) {
            taskMissMap[normTitle].missed++;
          }
        });
      }
    } else {
      counts.gray++;
    }
  }

  const completionRate =
    totalTasksScheduled > 0
      ? Math.round((totalTasksCompleted / totalTasksScheduled) * 100)
      : 0;

  // Calculate streaks across records leading up to today
  // A qualifying streak day is at least Yellow (percentage >= 50%)
  const sortedDates = Object.keys(records).sort();
  let currentStreak = 0;
  let longestStreak = 0;
  let tempStreak = 0;

  for (const d of sortedDates) {
    if (d > todayStr) continue;
    const rec = records[d];
    const color = getDayColorInfo(rec);
    if (color.tier === 'green' || color.tier === 'yellow') {
      tempStreak++;
      if (tempStreak > longestStreak) {
        longestStreak = tempStreak;
      }
    } else {
      tempStreak = 0;
    }
  }

  // Calculate current streak backward from today
  const [curY, curM, curD] = todayStr.split('-').map(Number);
  let checkDate = new Date(curY, curM - 1, curD);

  while (true) {
    const dStr = checkDate.toISOString().split('T')[0];
    const rec = records[dStr];
    if (!rec) break;
    const color = getDayColorInfo(rec);
    if (color.tier === 'green' || color.tier === 'yellow') {
      currentStreak++;
      // check day before
      checkDate.setDate(checkDate.getDate() - 1);
    } else {
      break;
    }
  }

  // Find weakest task (most missed days)
  let weakest: MonthStats['weakestTask'] = null;
  let maxMissed = 0;

  for (const [title, stats] of Object.entries(taskMissMap)) {
    if (stats.missed > maxMissed) {
      maxMissed = stats.missed;
      weakest = {
        title,
        missedDays: stats.missed,
        totalDays: stats.total,
        percentageMissed: Math.round((stats.missed / stats.total) * 100),
      };
    }
  }

  return {
    currentStreak,
    longestStreak: Math.max(longestStreak, currentStreak),
    completionRate,
    counts,
    weakestTask: weakest,
  };
}
