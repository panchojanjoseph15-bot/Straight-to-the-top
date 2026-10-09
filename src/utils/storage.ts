import { DayRecord, TaskItem } from '../types';

const RECORDS_KEY = 'stt_records_v1';
const TOMORROW_PRESET_KEY = 'stt_tomorrow_preset_v1';
const LAST_VISITED_DATE_KEY = 'stt_last_date_v1';

export function loadStoredRecords(): Record<string, DayRecord> {
  try {
    const raw = localStorage.getItem(RECORDS_KEY);
    if (!raw) {
      // Brand new install: starts completely empty
      return {};
    }
    return JSON.parse(raw);
  } catch (err) {
    console.error('Failed to load records from localStorage', err);
    return {};
  }
}

export function saveStoredRecords(records: Record<string, DayRecord>): void {
  try {
    localStorage.setItem(RECORDS_KEY, JSON.stringify(records));
  } catch (err) {
    console.error('Failed to save records', err);
  }
}

export function loadTomorrowPreset(): TaskItem[] {
  try {
    const raw = localStorage.getItem(TOMORROW_PRESET_KEY);
    if (!raw) return [];
    return JSON.parse(raw);
  } catch {
    return [];
  }
}

export function saveTomorrowPreset(tasks: TaskItem[]): void {
  try {
    localStorage.setItem(TOMORROW_PRESET_KEY, JSON.stringify(tasks));
  } catch (err) {
    console.error('Failed to save tomorrow preset', err);
  }
}

/**
 * Handle daily rollover:
 * If the user opens the app on a new calendar date:
 * - The previous day is finalized (its tasks and reflection are preserved as history).
 * - Today gets initialized with tomorrow's preset (or default tasks).
 */
export function handleDailyRollover(
  todayStr: string,
  records: Record<string, DayRecord>
): Record<string, DayRecord> {
  const lastDate = localStorage.getItem(LAST_VISITED_DATE_KEY);
  localStorage.setItem(LAST_VISITED_DATE_KEY, todayStr);

  const updatedRecords = { ...records };

  // If previous day exists and wasn't finalized, finalize it
  if (lastDate && lastDate < todayStr && updatedRecords[lastDate]) {
    updatedRecords[lastDate] = {
      ...updatedRecords[lastDate],
      finalized: true,
      tasks: updatedRecords[lastDate].tasks.map(t => ({
        ...t,
        missed: !t.completed,
      })),
    };
  }

  // If today doesn't have a record yet, create it from tomorrow's preset
  if (!updatedRecords[todayStr]) {
    const preset = loadTomorrowPreset();
    updatedRecords[todayStr] = {
      dateString: todayStr,
      tasks: preset.map(t => ({ ...t, completed: false, missed: false })),
      reflection: '',
      finalized: false,
    };
  }

  saveStoredRecords(updatedRecords);
  return updatedRecords;
}

export function exportDataAsJSON(records: Record<string, DayRecord>): void {
  const dataStr = 'data:text/json;charset=utf-8,' + encodeURIComponent(JSON.stringify(records, null, 2));
  const downloadAnchor = document.createElement('a');
  downloadAnchor.setAttribute('href', dataStr);
  downloadAnchor.setAttribute('download', `straight-to-the-top-backup-${new Date().toISOString().slice(0, 10)}.json`);
  document.body.appendChild(downloadAnchor);
  downloadAnchor.click();
  downloadAnchor.remove();
}
