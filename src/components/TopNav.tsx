import React, { useState, useRef, useEffect } from 'react';
import {
  Volume2,
  VolumeX,
  Sparkles,
  Image as ImageIcon,
  Printer,
  Palette,
  RefreshCw,
  ArrowUpRight,
  ArrowLeftRight,
} from 'lucide-react';
import { KID_THEMES, KidTheme } from '../data/themes';

interface TopNavProps {
  currentTheme: KidTheme;
  onSelectTheme: (themeId: string) => void;
  isUppercase: boolean;
  onToggleCase: () => void;
  isMuted: boolean;
  onToggleMute: () => void;
  onOpenPhoto: () => void;
  onOpenPrint: () => void;
  onNewGame: () => void;
  levelTitle: string;
  allowDiagonals: boolean;
  onToggleDiagonals: (val: boolean) => void;
  allowBackwards: boolean;
  onToggleBackwards: (val: boolean) => void;
}

export const TopNav: React.FC<TopNavProps> = ({
  currentTheme,
  onSelectTheme,
  isUppercase,
  onToggleCase,
  isMuted,
  onToggleMute,
  onOpenPhoto,
  onOpenPrint,
  onNewGame,
  levelTitle,
  allowDiagonals,
  onToggleDiagonals,
  allowBackwards,
  onToggleBackwards,
}) => {
  const [themeMenuOpen, setThemeMenuOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Close theme dropdown on outside click
  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setThemeMenuOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <header
      className={`w-full sticky top-0 z-30 px-3 sm:px-6 py-2.5 sm:py-3 transition-colors duration-300 ${currentTheme.headerBg}`}
    >
      <div className="max-w-6xl mx-auto flex items-center justify-between gap-2 sm:gap-4">
        {/* Brand Zone */}
        <div className="flex items-center gap-2 shrink-0">
          <div className="w-9 h-9 sm:w-11 sm:h-11 rounded-2xl bg-amber-400 flex items-center justify-center text-xl sm:text-2xl shadow-md shadow-amber-300/40 select-none animate-float">
            {currentTheme.icon}
          </div>
          <div className="flex flex-col">
            <span
              className={`text-base sm:text-xl font-bold tracking-tight whitespace-nowrap ${currentTheme.textPrimary}`}
            >
              Sight Word Quest
            </span>
            <span className="text-[11px] sm:text-xs font-semibold text-amber-600 dark:text-amber-400 -mt-0.5 whitespace-nowrap">
              List 11 · {levelTitle}
            </span>
          </div>
        </div>

        {/* Center Controls & Settings */}
        <div className="flex items-center gap-1.5 sm:gap-2">
          {/* Quick Toggle: Allow Diagonal */}
          <button
            onClick={() => onToggleDiagonals(!allowDiagonals)}
            title={
              allowDiagonals
                ? 'Diagonal words are ON. Click to turn OFF (regenerates puzzle).'
                : 'Diagonal words are OFF. Click to allow diagonal words (regenerates puzzle).'
            }
            className={`flex items-center gap-1 px-2 sm:px-2.5 py-1.5 rounded-xl text-xs font-bold border-2 active:scale-95 transition-all shadow-sm ${
              allowDiagonals
                ? 'bg-amber-400 border-amber-500 text-amber-950 font-black'
                : 'bg-white/80 dark:bg-slate-800 border-slate-200 dark:border-slate-700 text-slate-500 dark:text-slate-400'
            }`}
          >
            <ArrowUpRight className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">Diagonal</span>
            <span className="text-[10px] uppercase font-bold sm:ml-0.5">
              {allowDiagonals ? 'ON' : 'OFF'}
            </span>
          </button>

          {/* Quick Toggle: Allow Backwards */}
          <button
            onClick={() => onToggleBackwards(!allowBackwards)}
            title={
              allowBackwards
                ? 'Backwards words are ON. Click to turn OFF (regenerates puzzle).'
                : 'Backwards words are OFF. Click to allow backwards words (regenerates puzzle).'
            }
            className={`flex items-center gap-1 px-2 sm:px-2.5 py-1.5 rounded-xl text-xs font-bold border-2 active:scale-95 transition-all shadow-sm ${
              allowBackwards
                ? 'bg-amber-400 border-amber-500 text-amber-950 font-black'
                : 'bg-white/80 dark:bg-slate-800 border-slate-200 dark:border-slate-700 text-slate-500 dark:text-slate-400'
            }`}
          >
            <ArrowLeftRight className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">Backwards</span>
            <span className="text-[10px] uppercase font-bold sm:ml-0.5">
              {allowBackwards ? 'ON' : 'OFF'}
            </span>
          </button>

          {/* ABC / abc Case Toggle */}
          <button
            onClick={onToggleCase}
            title={isUppercase ? 'Switch to lowercase (abc)' : 'Switch to UPPERCASE (ABC)'}
            className="flex items-center gap-1 px-2.5 sm:px-3 py-1.5 rounded-xl text-xs sm:text-sm font-bold bg-white/90 dark:bg-slate-800 border-2 border-slate-200 dark:border-slate-700 hover:border-amber-400 active:scale-95 transition-all shadow-sm"
          >
            <span className="text-amber-500 font-extrabold text-sm sm:text-base">
              {isUppercase ? 'ABC' : 'abc'}
            </span>
          </button>

          {/* Theme Picker Dropdown */}
          <div className="relative" ref={dropdownRef}>
            <button
              onClick={() => setThemeMenuOpen(!themeMenuOpen)}
              title="Pick a fun colorful theme"
              className="flex items-center gap-1 sm:gap-1.5 px-2 sm:px-2.5 py-1.5 rounded-xl text-xs sm:text-sm font-bold bg-white/90 dark:bg-slate-800 border-2 border-slate-200 dark:border-slate-700 hover:border-amber-400 active:scale-95 transition-all shadow-sm"
            >
              <Palette className="w-4 h-4 text-pink-500" />
              <span className="hidden md:inline text-xs font-semibold">{currentTheme.name}</span>
            </button>

            {themeMenuOpen && (
              <div className="absolute right-0 mt-2 w-52 sm:w-60 bg-white dark:bg-slate-900 border-2 border-amber-300 rounded-2xl shadow-2xl p-2 z-50 animate-pop">
                <div className="text-[11px] font-bold text-slate-400 uppercase tracking-wider px-2 py-1">
                  Choose Color Theme
                </div>
                <div className="space-y-1">
                  {Object.values(KID_THEMES).map((theme) => (
                    <button
                      key={theme.id}
                      onClick={() => {
                        onSelectTheme(theme.id);
                        setThemeMenuOpen(false);
                      }}
                      className={`w-full flex items-center gap-2.5 px-3 py-2 rounded-xl text-left text-xs sm:text-sm font-semibold transition-all ${
                        currentTheme.id === theme.id
                          ? 'bg-amber-100 text-amber-950 dark:bg-amber-900/40 dark:text-amber-200 font-bold'
                          : 'text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800'
                      }`}
                    >
                      <span className="text-xl">{theme.icon}</span>
                      <div className="flex flex-col">
                        <span>{theme.name}</span>
                        <span className="text-[10px] text-slate-400 font-normal">
                          {theme.subtitle}
                        </span>
                      </div>
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Sound Toggle */}
          <button
            onClick={onToggleMute}
            title={isMuted ? 'Turn Sound ON' : 'Mute Sound'}
            className="p-1.5 sm:p-2 rounded-xl bg-white/90 dark:bg-slate-800 border-2 border-slate-200 dark:border-slate-700 hover:border-amber-400 active:scale-95 transition-all shadow-sm"
          >
            {isMuted ? (
              <VolumeX className="w-4 h-4 sm:w-5 sm:h-5 text-rose-500" />
            ) : (
              <Volume2 className="w-4 h-4 sm:w-5 sm:h-5 text-emerald-500" />
            )}
          </button>

          {/* View Homework Photo */}
          <button
            onClick={onOpenPhoto}
            title="View original List 11 paper photo"
            className="p-1.5 sm:p-2 rounded-xl bg-white/90 dark:bg-slate-800 border-2 border-slate-200 dark:border-slate-700 hover:border-blue-400 active:scale-95 transition-all shadow-sm"
          >
            <ImageIcon className="w-4 h-4 text-blue-500" />
          </button>

          {/* Print Worksheet */}
          <button
            onClick={onOpenPrint}
            title="Print paper worksheet"
            className="p-1.5 sm:p-2 rounded-xl bg-white/90 dark:bg-slate-800 border-2 border-slate-200 dark:border-slate-700 hover:border-purple-400 active:scale-95 transition-all shadow-sm hidden sm:flex"
          >
            <Printer className="w-4 h-4 sm:w-5 sm:h-5 text-purple-500" />
          </button>
        </div>

        {/* Action Button: Restart / New Shuffle */}
        <button
          onClick={onNewGame}
          className={`flex items-center gap-1.5 px-3 sm:px-4 py-1.5 sm:py-2 rounded-xl text-xs sm:text-sm font-bold active:scale-95 transition-all whitespace-nowrap ${currentTheme.primaryButton}`}
        >
          <RefreshCw className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
          <span>New Grid</span>
        </button>
      </div>
    </header>
  );
};
