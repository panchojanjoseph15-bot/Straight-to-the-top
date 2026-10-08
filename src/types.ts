export interface TaskItem {
  id: string;
  title: string;
  completed: boolean;
  missed?: boolean;
}

export interface DayRecord {
  dateString: string; // YYYY-MM-DD format
  tasks: TaskItem[];
  reflection: string;
  finalized?: boolean;
  timestamp?: number;
}

export type ColorTier = 'green' | 'yellow' | 'orange' | 'red' | 'gray';

export interface DayColorInfo {
  tier: ColorTier;
  completedCount: number;
  totalCount: number;
  percentage: number;
  label: string;
}

export interface MonthStats {
  currentStreak: number;
  longestStreak: number;
  completionRate: number;
  counts: {
    green: number;
    yellow: number;
    orange: number;
    red: number;
    gray: number;
  };
  weakestTask: {
    title: string;
    missedDays: number;
    totalDays: number;
    percentageMissed: number;
  } | null;
}

export interface SuggestionCategory {
  category: string;
  iconName: string;
  items: string[];
}
