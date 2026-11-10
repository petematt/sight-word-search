import React from 'react';
import { KidTheme } from '../data/themes';
import { Sliders, ArrowUpRight, ArrowLeftRight, Sparkles } from 'lucide-react';

interface PuzzleSettingsProps {
  allowDiagonals: boolean;
  onToggleDiagonals: (value: boolean) => void;
  allowBackwards: boolean;
  onToggleBackwards: (value: boolean) => void;
  theme: KidTheme;
}

export const PuzzleSettings: React.FC<PuzzleSettingsProps> = ({
  allowDiagonals,
  onToggleDiagonals,
  allowBackwards,
  onToggleBackwards,
  theme,
}) => {
  return (
    <div className={`p-4 sm:p-5 rounded-3xl transition-all duration-300 w-full ${theme.cardBg}`}>
      <div className="flex items-center justify-between gap-2 mb-3">
        <div className="flex items-center gap-2">
          <Sliders className="w-5 h-5 text-amber-500" />
          <h2 className="text-base sm:text-lg font-bold tracking-tight">Puzzle Settings</h2>
        </div>
        <span className="text-[11px] font-semibold text-slate-500 dark:text-slate-400">
          Auto-regenerates
        </span>
      </div>

      <div className="space-y-3">
        {/* Allow Diagonals Toggle */}
        <div className="flex items-center justify-between p-3 rounded-2xl bg-white/80 dark:bg-slate-800/80 border-2 border-slate-200 dark:border-slate-700 hover:border-amber-300 transition-all">
          <div className="flex items-center gap-2.5">
            <div
              className={`w-9 h-9 rounded-xl flex items-center justify-center transition-colors ${
                allowDiagonals
                  ? 'bg-amber-400 text-amber-950 font-black shadow-sm'
                  : 'bg-slate-100 dark:bg-slate-700 text-slate-500'
              }`}
            >
              <ArrowUpRight className="w-5 h-5" />
            </div>
            <div>
              <div className="text-xs sm:text-sm font-extrabold text-slate-900 dark:text-white">
                Allow Diagonal
              </div>
              <div className="text-[11px] text-slate-500 dark:text-slate-400">
                Words can run diagonally (↘ ↗)
              </div>
            </div>
          </div>

          <button
            type="button"
            role="switch"
            aria-checked={allowDiagonals}
            onClick={() => onToggleDiagonals(!allowDiagonals)}
            className={`relative inline-flex h-7 w-12 shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none ${
              allowDiagonals ? 'bg-amber-400' : 'bg-slate-300 dark:bg-slate-600'
            }`}
          >
            <span
              className={`pointer-events-none inline-block h-6 w-6 transform rounded-full bg-white shadow-md ring-0 transition duration-200 ease-in-out ${
                allowDiagonals ? 'translate-x-5' : 'translate-x-0'
              }`}
            />
          </button>
        </div>

        {/* Allow Backwards Toggle */}
        <div className="flex items-center justify-between p-3 rounded-2xl bg-white/80 dark:bg-slate-800/80 border-2 border-slate-200 dark:border-slate-700 hover:border-amber-300 transition-all">
          <div className="flex items-center gap-2.5">
            <div
              className={`w-9 h-9 rounded-xl flex items-center justify-center transition-colors ${
                allowBackwards
                  ? 'bg-amber-400 text-amber-950 font-black shadow-sm'
                  : 'bg-slate-100 dark:bg-slate-700 text-slate-500'
              }`}
            >
              <ArrowLeftRight className="w-5 h-5" />
            </div>
            <div>
              <div className="text-xs sm:text-sm font-extrabold text-slate-900 dark:text-white">
                Allow Backwards
              </div>
              <div className="text-[11px] text-slate-500 dark:text-slate-400">
                Words can be spelled backwards (← ↑)
              </div>
            </div>
          </div>

          <button
            type="button"
            role="switch"
            aria-checked={allowBackwards}
            onClick={() => onToggleBackwards(!allowBackwards)}
            className={`relative inline-flex h-7 w-12 shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none ${
              allowBackwards ? 'bg-amber-400' : 'bg-slate-300 dark:bg-slate-600'
            }`}
          >
            <span
              className={`pointer-events-none inline-block h-6 w-6 transform rounded-full bg-white shadow-md ring-0 transition duration-200 ease-in-out ${
                allowBackwards ? 'translate-x-5' : 'translate-x-0'
              }`}
            />
          </button>
        </div>
      </div>
    </div>
  );
};
