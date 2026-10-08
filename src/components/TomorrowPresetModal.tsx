import React, { useState } from 'react';
import { X, Calendar, Plus, Trash2, Check, Sparkles } from 'lucide-react';
import { TaskItem } from '../types';

interface TomorrowPresetModalProps {
  isOpen: boolean;
  onClose: () => void;
  presetTasks: TaskItem[];
  onSavePreset: (tasks: TaskItem[]) => void;
}

export const TomorrowPresetModal: React.FC<TomorrowPresetModalProps> = ({
  isOpen,
  onClose,
  presetTasks,
  onSavePreset,
}) => {
  const [tasks, setTasks] = useState<TaskItem[]>(presetTasks);
  const [newTaskTitle, setNewTaskTitle] = useState('');

  if (!isOpen) return null;

  const handleAddTask = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTaskTitle.trim()) return;
    const newTask: TaskItem = {
      id: `preset-${Date.now()}`,
      title: newTaskTitle.trim(),
      completed: false,
    };
    setTasks([...tasks, newTask]);
    setNewTaskTitle('');
  };

  const handleRemoveTask = (id: string) => {
    setTasks(tasks.filter(t => t.id !== id));
  };

  const handleSave = () => {
    onSavePreset(tasks);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/75 backdrop-blur-sm flex items-center justify-center p-3 sm:p-5">
      <div className="bg-[#161b22] border border-[#30363d] w-full max-w-lg rounded-2xl shadow-2xl overflow-hidden flex flex-col max-h-[85vh]">
        {/* Modal Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-[#30363d] bg-[#111620]">
          <div className="flex items-center gap-2.5">
            <div className="p-1.5 bg-sky-500/10 rounded-lg text-sky-400">
              <Calendar className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-lg font-bold text-white">Preset Tasks for Tomorrow</h2>
              <p className="text-xs text-slate-400">These tasks will automatically load when tomorrow begins</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 text-slate-400 hover:text-white rounded-lg hover:bg-[#21262d] transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-6 flex-1 overflow-y-auto space-y-5">
          {/* Add item form */}
          <form onSubmit={handleAddTask} className="flex gap-2">
            <input
              type="text"
              value={newTaskTitle}
              onChange={e => setNewTaskTitle(e.target.value)}
              placeholder="Add task for tomorrow..."
              className="flex-1 bg-[#0d1117] border border-[#30363d] focus:border-sky-500 rounded-xl px-4 py-2.5 text-sm text-white placeholder-slate-500 outline-none"
            />
            <button
              type="submit"
              disabled={!newTaskTitle.trim()}
              className="px-4 py-2.5 bg-[#21262d] hover:bg-[#30363d] disabled:opacity-40 text-sky-400 font-semibold rounded-xl text-sm transition-all flex items-center gap-1.5"
            >
              <Plus className="w-4 h-4" />
              <span>Add</span>
            </button>
          </form>

          {/* Preset list */}
          <div className="space-y-2">
            <div className="flex items-center justify-between text-xs font-semibold text-slate-400">
              <span>Tomorrow's Planned Routine ({tasks.length})</span>
            </div>

            {tasks.length === 0 ? (
              <div className="p-6 text-center text-xs text-slate-500 border border-dashed border-[#30363d] rounded-xl">
                No preset tasks configured yet. Add some habits above!
              </div>
            ) : (
              <div className="space-y-1.5 max-h-[300px] overflow-y-auto pr-1">
                {tasks.map((task, idx) => (
                  <div
                    key={task.id}
                    className="flex items-center justify-between p-3 rounded-xl bg-[#0d1117] border border-[#30363d]/80 group hover:border-[#38bdf8]/50 transition-all"
                  >
                    <div className="flex items-center gap-3">
                      <span className="text-xs text-slate-500 font-mono w-4">
                        {idx + 1}.
                      </span>
                      <span className="text-sm font-medium text-slate-200">
                        {task.title}
                      </span>
                    </div>
                    <button
                      type="button"
                      onClick={() => handleRemoveTask(task.id)}
                      className="text-slate-500 hover:text-rose-400 p-1 rounded-lg transition-colors opacity-70 group-hover:opacity-100"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>

          <div className="p-3 bg-sky-500/10 border border-sky-500/20 rounded-xl text-xs text-sky-300 flex items-start gap-2.5">
            <Sparkles className="w-4 h-4 shrink-0 mt-0.5" />
            <span>
              Unfinished tasks from today do not pile up — tomorrow starts fresh with this preset routine.
            </span>
          </div>
        </div>

        {/* Modal Footer */}
        <div className="px-6 py-4 border-t border-[#30363d] bg-[#111620] flex justify-end gap-3">
          <button
            onClick={onClose}
            className="px-4 py-2 text-xs font-semibold text-slate-400 hover:text-white rounded-xl hover:bg-[#21262d] transition-all"
          >
            Cancel
          </button>
          <button
            onClick={handleSave}
            className="px-5 py-2 text-xs font-bold text-slate-950 bg-sky-400 hover:bg-sky-300 rounded-xl transition-all shadow-md shadow-sky-500/20 flex items-center gap-1.5"
          >
            <Check className="w-4 h-4 stroke-[3]" />
            <span>Save Tomorrow's Routine</span>
          </button>
        </div>
      </div>
    </div>
  );
};
