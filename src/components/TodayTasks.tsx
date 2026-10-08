import React from 'react';
import { Check, Plus, Calendar, Trash2, BookHeart } from 'lucide-react';
import confetti from 'canvas-confetti';
import { TaskItem } from '../types';

interface TodayTasksProps {
  tasks: TaskItem[];
  reflection: string;
  onToggleTask: (id: string) => void;
  onDeleteTask: (id: string) => void;
  onOpenAddTask: () => void;
  onOpenTomorrowPreset: () => void;
  onChangeReflection: (val: string) => void;
}

export const TodayTasks: React.FC<TodayTasksProps> = ({
  tasks,
  reflection,
  onToggleTask,
  onDeleteTask,
  onOpenAddTask,
  onOpenTomorrowPreset,
  onChangeReflection,
}) => {
  const completedCount = tasks.filter(t => t.completed).length;
  const totalCount = tasks.length;

  const handleToggle = (task: TaskItem) => {
    // If completing the last remaining task, fire celebratory confetti!
    if (!task.completed && completedCount + 1 === totalCount && totalCount > 0) {
      confetti({
        particleCount: 80,
        spread: 60,
        origin: { y: 0.6 },
        colors: ['#22c55e', '#38bdf8', '#fbbf24', '#a855f7'],
      });
    }
    onToggleTask(task.id);
  };

  return (
    <div className="bg-[#161b22] border border-[#30363d] rounded-2xl p-5 flex flex-col justify-between shadow-xl">
      {/* Top Section: Tasks Header & List */}
      <div>
        <div className="flex items-center justify-between pb-4 border-b border-[#30363d]/60 mb-4">
          <h2 className="text-base font-bold text-white tracking-tight">
            List of tasks today
          </h2>
          <span className="text-xs font-semibold text-slate-400 font-mono bg-[#0d1117] px-2.5 py-1 rounded-md border border-[#30363d]/80">
            {completedCount} of {totalCount} done
          </span>
        </div>

        {/* Scrollable Tasks Container */}
        <div className="space-y-2.5 max-h-[300px] sm:max-h-[340px] overflow-y-auto pr-1">
          {tasks.length === 0 ? (
            <div className="py-8 text-center text-xs text-slate-500 border border-dashed border-[#30363d] rounded-xl">
              No tasks added for today yet. Click <strong>+ Add task</strong> below!
            </div>
          ) : (
            tasks.map(task => (
              <div
                key={task.id}
                onClick={() => handleToggle(task)}
                className={`group flex items-center justify-between p-3 rounded-xl border transition-all cursor-pointer select-none ${
                  task.completed
                    ? 'bg-[#111c2a] border-sky-500/40 text-slate-200'
                    : 'bg-[#0d1117] border-[#30363d] hover:border-[#484f58] text-slate-300'
                }`}
              >
                <div className="flex items-center gap-3">
                  {/* Custom Checkbox */}
                  <div
                    className={`w-5 h-5 rounded-md flex items-center justify-center transition-all ${
                      task.completed
                        ? 'bg-sky-500 text-slate-950 shadow-sm shadow-sky-500/50'
                        : 'border border-[#484f58] group-hover:border-sky-400 bg-[#161b22]'
                    }`}
                  >
                    {task.completed && <Check className="w-3.5 h-3.5 stroke-[3]" />}
                  </div>

                  <span
                    className={`text-sm font-medium transition-all ${
                      task.completed
                        ? 'line-through text-slate-400'
                        : 'text-slate-100'
                    }`}
                  >
                    {task.title}
                  </span>
                </div>

                {/* Delete task button */}
                <button
                  type="button"
                  onClick={e => {
                    e.stopPropagation();
                    onDeleteTask(task.id);
                  }}
                  className="opacity-0 group-hover:opacity-100 text-slate-500 hover:text-rose-400 p-1 rounded-md transition-all"
                  title="Remove task"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                </button>
              </div>
            ))
          )}
        </div>

        {/* Action Buttons */}
        <div className="mt-4 space-y-2">
          <button
            onClick={onOpenAddTask}
            className="w-full py-2.5 px-4 rounded-xl border border-sky-500/30 bg-sky-500/10 hover:bg-sky-500/20 text-sky-400 font-semibold text-xs tracking-wide flex items-center justify-center gap-2 transition-all shadow-sm group"
          >
            <Plus className="w-4 h-4 group-hover:scale-110 transition-transform" />
            <span>+ Add task</span>
          </button>

          <button
            onClick={onOpenTomorrowPreset}
            className="w-full py-2 px-4 rounded-xl border border-[#30363d] bg-[#0d1117] hover:bg-[#21262d] text-slate-300 hover:text-white font-medium text-xs flex items-center justify-center gap-2 transition-all"
          >
            <Calendar className="w-3.5 h-3.5 text-slate-400" />
            <span>Set tasks for tomorrow</span>
          </button>
        </div>
      </div>

      {/* Bottom Section: Reflection */}
      <div className="mt-6 pt-5 border-t border-[#30363d]/60">
        <div className="flex items-center justify-between mb-2">
          <label
            htmlFor="daily-reflection"
            className="text-xs font-bold text-white tracking-tight flex items-center gap-1.5"
          >
            <BookHeart className="w-3.5 h-3.5 text-rose-400" />
            Reflection of this day
          </label>
          <span className="text-[10px] text-slate-500">Auto-saved</span>
        </div>

        <textarea
          id="daily-reflection"
          value={reflection}
          onChange={e => onChangeReflection(e.target.value)}
          placeholder="Write about your day: what happened, how you felt, and what areas you can improve on..."
          rows={5}
          className="w-full bg-[#0d1117] border border-[#30363d] focus:border-sky-500 focus:ring-1 focus:ring-sky-500 rounded-xl p-3 text-xs text-slate-200 placeholder-slate-500 outline-none resize-none transition-all"
        />
      </div>
    </div>
  );
};
