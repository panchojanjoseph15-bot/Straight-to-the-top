import React, { useState, useEffect } from 'react';
import { Header } from './components/Header';
import { TodayTasks } from './components/TodayTasks';
import { DayByDayCalendar } from './components/DayByDayCalendar';
import { InsightsPanel } from './components/InsightsPanel';
import { AddTaskModal } from './components/AddTaskModal';
import { TomorrowPresetModal } from './components/TomorrowPresetModal';
import { MobileNav, MobileTab } from './components/MobileNav';
import { TaskItem, DayRecord } from './types';
import {
  loadStoredRecords,
  saveStoredRecords,
  loadTomorrowPreset,
  saveTomorrowPreset,
  handleDailyRollover,
  exportDataAsJSON,
} from './utils/storage';
import { calculateMonthStats, formatDateKey } from './utils/calendar';
import { INITIAL_SEED_RECORDS } from './data/seedData';

export const App: React.FC = () => {
  // We use October 6, 2026 as the active base date to match the user's mockup & notes
  const [todayDateStr, setTodayDateStr] = useState<string>('2026-10-06');
  const [selectedDateStr, setSelectedDateStr] = useState<string>('2026-10-04');
  
  // Year & Month for the calendar view (October = month index 9)
  const [viewYear, setViewYear] = useState<number>(2026);
  const [viewMonth, setViewMonth] = useState<number>(9);

  // Core records storage
  const [records, setRecords] = useState<Record<string, DayRecord>>(() => {
    return loadStoredRecords();
  });

  // Tomorrow preset routine
  const [presetTasks, setPresetTasks] = useState<TaskItem[]>(() => {
    return loadTomorrowPreset();
  });

  // Modals & Navigation
  const [isAddTaskOpen, setIsAddTaskOpen] = useState(false);
  const [isTomorrowPresetOpen, setIsTomorrowPresetOpen] = useState(false);
  const [mobileTab, setMobileTab] = useState<MobileTab>('today');

  // Ensure current day record exists and run rollover check
  useEffect(() => {
    const updated = handleDailyRollover(todayDateStr, records);
    setRecords(updated);
  }, [todayDateStr]);

  // Today's record
  const todayRecord: DayRecord = records[todayDateStr] || {
    dateString: todayDateStr,
    tasks: [],
    reflection: '',
    finalized: false,
  };

  // Selected day's record (for the insights panel)
  const selectedRecord: DayRecord | undefined = records[selectedDateStr];

  // Month stats for the calendar and insights
  const monthStats = calculateMonthStats(viewYear, viewMonth, records, todayDateStr);

  // Handlers for today's tasks
  const handleToggleTask = (taskId: string) => {
    const updatedTasks = todayRecord.tasks.map(t =>
      t.id === taskId ? { ...t, completed: !t.completed } : t
    );
    const updatedRecord: DayRecord = {
      ...todayRecord,
      tasks: updatedTasks,
    };
    const newRecords = {
      ...records,
      [todayDateStr]: updatedRecord,
    };
    setRecords(newRecords);
    saveStoredRecords(newRecords);
  };

  const handleDeleteTask = (taskId: string) => {
    const updatedTasks = todayRecord.tasks.filter(t => t.id !== taskId);
    const updatedRecord: DayRecord = {
      ...todayRecord,
      tasks: updatedTasks,
    };
    const newRecords = {
      ...records,
      [todayDateStr]: updatedRecord,
    };
    setRecords(newRecords);
    saveStoredRecords(newRecords);
  };

  const handleAddTask = (title: string) => {
    const newTask: TaskItem = {
      id: `task-${Date.now()}`,
      title,
      completed: false,
    };
    const updatedRecord: DayRecord = {
      ...todayRecord,
      tasks: [...todayRecord.tasks, newTask],
    };
    const newRecords = {
      ...records,
      [todayDateStr]: updatedRecord,
    };
    setRecords(newRecords);
    saveStoredRecords(newRecords);
  };

  const handleChangeReflection = (val: string) => {
    const updatedRecord: DayRecord = {
      ...todayRecord,
      reflection: val,
    };
    const newRecords = {
      ...records,
      [todayDateStr]: updatedRecord,
    };
    setRecords(newRecords);
    saveStoredRecords(newRecords);
  };

  // Save tomorrow preset
  const handleSaveTomorrowPreset = (newPreset: TaskItem[]) => {
    setPresetTasks(newPreset);
    saveTomorrowPreset(newPreset);
  };

  // Month navigation
  const handlePrevMonth = () => {
    if (viewMonth === 0) {
      setViewMonth(11);
      setViewYear(y => y - 1);
    } else {
      setViewMonth(m => m - 1);
    }
  };

  const handleNextMonth = () => {
    if (viewMonth === 11) {
      setViewMonth(0);
      setViewYear(y => y + 1);
    } else {
      setViewMonth(m => m + 1);
    }
  };

  // Simulate advancing day (for live demonstration of rollover)
  const handleSimulateNextDay = () => {
    const [y, m, d] = todayDateStr.split('-').map(Number);
    const nextDate = new Date(y, m - 1, d + 1);
    const nextDateKey = formatDateKey(
      nextDate.getFullYear(),
      nextDate.getMonth(),
      nextDate.getDate()
    );

    // Finalize current day snapshot
    const finalizedToday: DayRecord = {
      ...todayRecord,
      finalized: true,
      tasks: todayRecord.tasks.map(t => ({ ...t, missed: !t.completed })),
    };

    // Load tomorrow's preset into the new day
    const nextDayTasks = presetTasks.map(t => ({
      ...t,
      id: `task-${Date.now()}-${Math.random().toString(36).substring(2, 6)}`,
      completed: false,
      missed: false,
    }));

    const nextDayRecord: DayRecord = {
      dateString: nextDateKey,
      tasks: nextDayTasks,
      reflection: '',
      finalized: false,
    };

    const newRecords = {
      ...records,
      [todayDateStr]: finalizedToday,
      [nextDateKey]: nextDayRecord,
    };

    setTodayDateStr(nextDateKey);
    setSelectedDateStr(nextDateKey);
    setViewYear(nextDate.getFullYear());
    setViewMonth(nextDate.getMonth());
    setRecords(newRecords);
    saveStoredRecords(newRecords);
  };

  // Reset demo seed data
  const handleResetSeedData = () => {
    if (window.confirm('Reset app data back to the demo showcase matching the mockups?')) {
      localStorage.clear();
      setRecords(INITIAL_SEED_RECORDS);
      saveStoredRecords(INITIAL_SEED_RECORDS);
      setTodayDateStr('2026-10-06');
      setSelectedDateStr('2026-10-04');
      setViewYear(2026);
      setViewMonth(9);
    }
  };

  const completedTodayCount = todayRecord.tasks.filter(t => t.completed).length;
  const ratioString = todayRecord.tasks.length > 0 ? `${completedTodayCount}/${todayRecord.tasks.length}` : '';

  return (
    <div className="min-h-screen bg-[#0b0e14] text-slate-100 flex flex-col justify-between selection:bg-sky-500/30 selection:text-white">
      <div className="max-w-7xl mx-auto w-full px-3 sm:px-6 py-5 sm:py-7 flex-1 flex flex-col">
        {/* Top Header */}
        <Header
          currentDateStr={todayDateStr}
          onResetSeedData={handleResetSeedData}
          onSimulateNextDay={handleSimulateNextDay}
          onExportData={() => exportDataAsJSON(records)}
        />

        {/* Desktop View: Three Column Artboard Layout */}
        <main className="mt-6 flex-1 hidden lg:grid lg:grid-cols-12 gap-6 items-stretch">
          {/* Left Column: Today's Tasks & Reflection */}
          <div className="lg:col-span-4 flex flex-col">
            <TodayTasks
              tasks={todayRecord.tasks}
              reflection={todayRecord.reflection}
              onToggleTask={handleToggleTask}
              onDeleteTask={handleDeleteTask}
              onOpenAddTask={() => setIsAddTaskOpen(true)}
              onOpenTomorrowPreset={() => setIsTomorrowPresetOpen(true)}
              onChangeReflection={handleChangeReflection}
            />
          </div>

          {/* Center Column: Day by Day Improvement Calendar */}
          <div className="lg:col-span-4 flex flex-col">
            <DayByDayCalendar
              currentYear={viewYear}
              currentMonth={viewMonth}
              todayDateStr={todayDateStr}
              selectedDateStr={selectedDateStr}
              records={records}
              onSelectDate={d => setSelectedDateStr(d)}
              onPrevMonth={handlePrevMonth}
              onNextMonth={handleNextMonth}
            />
          </div>

          {/* Right Column: Insights & The Climb */}
          <div className="lg:col-span-4 flex flex-col">
            <InsightsPanel
              selectedDateStr={selectedDateStr}
              selectedRecord={selectedRecord}
              stats={monthStats}
            />
          </div>
        </main>

        {/* Mobile View: Dynamic Tab View */}
        <main className="mt-5 flex-1 lg:hidden pb-16">
          {mobileTab === 'today' && (
            <TodayTasks
              tasks={todayRecord.tasks}
              reflection={todayRecord.reflection}
              onToggleTask={handleToggleTask}
              onDeleteTask={handleDeleteTask}
              onOpenAddTask={() => setIsAddTaskOpen(true)}
              onOpenTomorrowPreset={() => setIsTomorrowPresetOpen(true)}
              onChangeReflection={handleChangeReflection}
            />
          )}

          {mobileTab === 'calendar' && (
            <DayByDayCalendar
              currentYear={viewYear}
              currentMonth={viewMonth}
              todayDateStr={todayDateStr}
              selectedDateStr={selectedDateStr}
              records={records}
              onSelectDate={d => {
                setSelectedDateStr(d);
                setMobileTab('insights'); // Jump to insights to view day details
              }}
              onPrevMonth={handlePrevMonth}
              onNextMonth={handleNextMonth}
            />
          )}

          {mobileTab === 'insights' && (
            <InsightsPanel
              selectedDateStr={selectedDateStr}
              selectedRecord={selectedRecord}
              stats={monthStats}
            />
          )}
        </main>
      </div>

      {/* Mobile Bottom Navigation */}
      <MobileNav
        activeTab={mobileTab}
        onChangeTab={t => setMobileTab(t)}
        todayCompletedRatio={ratioString}
      />

      {/* Add Task Modal with Suggestions */}
      <AddTaskModal
        isOpen={isAddTaskOpen}
        onClose={() => setIsAddTaskOpen(false)}
        onAddTask={handleAddTask}
      />

      {/* Tomorrow's Preset Routine Modal */}
      <TomorrowPresetModal
        isOpen={isTomorrowPresetOpen}
        onClose={() => setIsTomorrowPresetOpen(false)}
        presetTasks={presetTasks}
        onSavePreset={handleSaveTomorrowPreset}
      />
    </div>
  );
};

export default App;
