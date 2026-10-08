import React, { useState } from 'react';
import { X, Plus, Sparkles, Apple, Activity, BookOpen, Moon, CheckCircle } from 'lucide-react';
import { TASK_SUGGESTIONS } from '../data/suggestions';

interface AddTaskModalProps {
  isOpen: boolean;
  onClose: () => void;
  onAddTask: (title: string) => void;
}

const CATEGORY_ICONS: Record<string, React.ReactNode> = {
  'Health & Nutrition': <Apple className="w-4 h-4 text-emerald-400" />,
  'Fitness & Activity': <Activity className="w-4 h-4 text-sky-400" />,
  'Learning & Growth': <BookOpen className="w-4 h-4 text-amber-400" />,
  'Rest & Well-being': <Moon className="w-4 h-4 text-indigo-400" />,
  'Focus & Productivity': <CheckCircle className="w-4 h-4 text-rose-400" />,
};

export const AddTaskModal: React.FC<AddTaskModalProps> = ({
  isOpen,
  onClose,
  onAddTask,
}) => {
  const [taskName, setTaskName] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('All');

  if (!isOpen) return null;

  const handleSubmit = (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    if (taskName.trim()) {
      onAddTask(taskName.trim());
      setTaskName('');
      onClose();
    }
  };

  const handleSelectSuggestion = (suggestion: string) => {
    setTaskName(suggestion);
  };

  const handleQuickAdd = (suggestion: string) => {
    onAddTask(suggestion);
    onClose();
  };

  const filteredCategories =
    selectedCategory === 'All'
      ? TASK_SUGGESTIONS
      : TASK_SUGGESTIONS.filter(c => c.category === selectedCategory);

  return (
    <div className="fixed inset-0 z-50 bg-black/75 backdrop-blur-sm flex items-center justify-center p-3 sm:p-5">
      <div className="bg-[#161b22] border border-[#30363d] w-full max-w-3xl rounded-2xl shadow-2xl overflow-hidden flex flex-col max-h-[90vh]">
        {/* Modal Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-[#30363d] bg-[#111620]">
          <div className="flex items-center gap-2.5">
            <div className="p-1.5 bg-sky-500/10 rounded-lg text-sky-400">
              <Plus className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-lg font-bold text-white">Add New Task</h2>
              <p className="text-xs text-slate-400">Create a custom habit or select from suggestions</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 text-slate-400 hover:text-white rounded-lg hover:bg-[#21262d] transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Body: Two column layout on md+ */}
        <div className="flex-1 overflow-y-auto grid grid-cols-1 md:grid-cols-12 divide-y md:divide-y-0 md:divide-x divide-[#30363d]">
          {/* Left Side: Custom Input */}
          <div className="p-6 md:col-span-6 flex flex-col justify-between">
            <div>
              <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-2">
                Task Name
              </label>
              <form onSubmit={handleSubmit} className="space-y-4">
                <input
                  type="text"
                  autoFocus
                  value={taskName}
                  onChange={e => setTaskName(e.target.value)}
                  placeholder="e.g. Read 20 pages, Hydrate 2L..."
                  className="w-full bg-[#0d1117] border border-[#30363d] focus:border-sky-500 focus:ring-1 focus:ring-sky-500 rounded-xl px-4 py-3 text-sm text-white placeholder-slate-500 outline-none transition-all"
                />

                <div className="bg-[#0d1117]/60 border border-[#30363d]/70 rounded-xl p-3 text-xs text-slate-400 flex items-start gap-2.5">
                  <Sparkles className="w-4 h-4 text-sky-400 shrink-0 mt-0.5" />
                  <span>
                    Pick a suggestion on the right to auto-fill, or click the <span className="text-sky-400 font-medium">+ Quick Add</span> button to add immediately.
                  </span>
                </div>
              </form>
            </div>

            <div className="pt-6 flex gap-3">
              <button
                type="button"
                onClick={onClose}
                className="flex-1 py-2.5 px-4 rounded-xl text-xs font-semibold text-slate-300 bg-[#21262d] hover:bg-[#30363d] transition-all"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={() => handleSubmit()}
                disabled={!taskName.trim()}
                className="flex-1 py-2.5 px-4 rounded-xl text-xs font-bold text-slate-950 bg-sky-400 hover:bg-sky-300 disabled:opacity-50 disabled:cursor-not-allowed transition-all shadow-md shadow-sky-500/20"
              >
                Add Task
              </button>
            </div>
          </div>

          {/* Right Side: Scrollable Suggestions Panel */}
          <div className="p-6 md:col-span-6 bg-[#0f131a]/50 flex flex-col max-h-[460px]">
            <div className="flex items-center justify-between mb-3">
              <span className="text-xs font-semibold text-slate-300 uppercase tracking-wider flex items-center gap-1.5">
                <Sparkles className="w-3.5 h-3.5 text-amber-400" />
                Suggestions
              </span>
              <span className="text-[11px] text-slate-500">Scrollable catalog</span>
            </div>

            {/* Category filter pills */}
            <div className="flex gap-1.5 overflow-x-auto pb-2 mb-3 scrollbar-none text-[11px]">
              <button
                onClick={() => setSelectedCategory('All')}
                className={`px-2.5 py-1 rounded-lg shrink-0 font-medium transition-all ${
                  selectedCategory === 'All'
                    ? 'bg-sky-500/20 text-sky-300 border border-sky-500/40'
                    : 'bg-[#21262d] text-slate-400 hover:text-white'
                }`}
              >
                All
              </button>
              {TASK_SUGGESTIONS.map(cat => (
                <button
                  key={cat.category}
                  onClick={() => setSelectedCategory(cat.category)}
                  className={`px-2.5 py-1 rounded-lg shrink-0 font-medium transition-all ${
                    selectedCategory === cat.category
                      ? 'bg-sky-500/20 text-sky-300 border border-sky-500/40'
                      : 'bg-[#21262d] text-slate-400 hover:text-white'
                  }`}
                >
                  {cat.category.split(' ')[0]}
                </button>
              ))}
            </div>

            {/* Suggestions list */}
            <div className="flex-1 overflow-y-auto space-y-4 pr-1">
              {filteredCategories.map(cat => (
                <div key={cat.category} className="space-y-1.5">
                  <div className="flex items-center gap-1.5 text-xs font-semibold text-slate-400 px-1">
                    {CATEGORY_ICONS[cat.category]}
                    <span>{cat.category}</span>
                  </div>
                  <div className="space-y-1">
                    {cat.items.map(item => (
                      <div
                        key={item}
                        className="group flex items-center justify-between p-2 rounded-lg bg-[#161b22] hover:bg-[#21262d] border border-transparent hover:border-[#30363d] transition-all cursor-pointer text-xs"
                        onClick={() => handleSelectSuggestion(item)}
                      >
                        <span className="text-slate-200 group-hover:text-white font-medium">
                          {item}
                        </span>
                        <div className="flex items-center gap-1 opacity-80 group-hover:opacity-100">
                          <button
                            type="button"
                            onClick={(e) => {
                              e.stopPropagation();
                              handleQuickAdd(item);
                            }}
                            title="Add immediately"
                            className="px-2 py-0.5 rounded text-[10px] font-semibold bg-sky-500/10 hover:bg-sky-500 text-sky-400 hover:text-slate-950 transition-colors"
                          >
                            + Add
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
