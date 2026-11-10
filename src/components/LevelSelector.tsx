import React, { useState } from 'react';
import { WORD_PACKS, WordPack, ALL_LIST_11_WORDS } from '../data/words';
import { KidTheme } from '../data/themes';
import { Star, Trophy, Sparkles, Check, Settings2 } from 'lucide-react';

interface LevelSelectorProps {
  currentPackId: string;
  onSelectPack: (pack: WordPack) => void;
  onCustomWordsSelected: (words: string[]) => void;
  starsEarned: Record<string, number>;
  theme: KidTheme;
}

export const LevelSelector: React.FC<LevelSelectorProps> = ({
  currentPackId,
  onSelectPack,
  onCustomWordsSelected,
  starsEarned,
  theme,
}) => {
  const [showCustomPicker, setShowCustomPicker] = useState(false);
  const [selectedCustomWords, setSelectedCustomWords] = useState<string[]>([
    'wash',
    'hot',
    'draw',
    'sing',
    'wish',
  ]);

  const toggleCustomWord = (word: string) => {
    setSelectedCustomWords((prev) => {
      if (prev.includes(word)) {
        if (prev.length <= 3) return prev; // Keep at least 3
        return prev.filter((w) => w !== word);
      } else {
        if (prev.length >= 15) return prev; // Max 15
        return [...prev, word];
      }
    });
  };

  const handleStartCustomGame = () => {
    onCustomWordsSelected(selectedCustomWords);
    setShowCustomPicker(false);
  };

  return (
    <div className={`p-4 sm:p-5 rounded-3xl transition-all duration-300 ${theme.cardBg}`}>
      {/* Header */}
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center gap-2">
          <Trophy className="w-5 h-5 text-amber-500" />
          <h2 className="text-base sm:text-lg font-bold tracking-tight">Game Levels</h2>
        </div>
        <span className="text-xs font-semibold text-slate-500 dark:text-slate-400">
          List 11
        </span>
      </div>

      {/* Levels list */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-1 gap-2.5">
        {WORD_PACKS.map((pack) => {
          const isSelected = currentPackId === pack.id;
          const stars = starsEarned[pack.id] || 0;

          return (
            <button
              key={pack.id}
              onClick={() => onSelectPack(pack)}
              className={`text-left p-3 rounded-2xl border-2 transition-all flex items-center justify-between gap-3 ${
                isSelected
                  ? 'bg-amber-100/90 dark:bg-amber-900/40 border-amber-400 ring-2 ring-amber-300/60 shadow-md'
                  : 'bg-white/80 dark:bg-slate-800/80 border-slate-200 dark:border-slate-700 hover:border-amber-300 hover:scale-[1.01]'
              }`}
            >
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 mb-0.5">
                  <span className="font-extrabold text-sm sm:text-base text-slate-900 dark:text-white truncate">
                    {pack.title}
                  </span>
                  <span className="text-[10px] font-bold px-1.5 py-0.5 rounded-md bg-amber-200 dark:bg-amber-800 text-amber-900 dark:text-amber-100 shrink-0">
                    {pack.badge}
                  </span>
                </div>
                <div className="text-xs text-slate-500 dark:text-slate-400 truncate">
                  {pack.subtitle}
                </div>
              </div>

              {/* Star Rating Badge */}
              <div className="flex items-center gap-0.5 shrink-0 bg-white/70 dark:bg-slate-900/70 px-2 py-1 rounded-xl border border-slate-200 dark:border-slate-700">
                {[1, 2, 3].map((starIdx) => (
                  <Star
                    key={starIdx}
                    className={`w-3.5 h-3.5 ${
                      starIdx <= stars
                        ? 'fill-amber-400 text-amber-400'
                        : 'text-slate-300 dark:text-slate-600'
                    }`}
                  />
                ))}
              </div>
            </button>
          );
        })}

        {/* Custom Practice Builder Button */}
        <button
          onClick={() => setShowCustomPicker(true)}
          className={`text-left p-3 rounded-2xl border-2 border-dashed transition-all flex items-center justify-between gap-3 ${
            currentPackId === 'custom'
              ? 'bg-purple-100/90 dark:bg-purple-900/40 border-purple-400 ring-2 ring-purple-300'
              : 'border-slate-300 dark:border-slate-700 hover:border-purple-400 bg-white/50 dark:bg-slate-800/50'
          }`}
        >
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-xl bg-purple-100 dark:bg-purple-900/50 flex items-center justify-center text-purple-600 dark:text-purple-300">
              <Settings2 className="w-4 h-4" />
            </div>
            <div>
              <div className="font-extrabold text-sm text-slate-900 dark:text-white">
                Pick Your Own Words
              </div>
              <div className="text-xs text-slate-500 dark:text-slate-400">
                Choose any words from List 11 to practice
              </div>
            </div>
          </div>
          <span className="text-xs font-bold text-purple-600 dark:text-purple-400">Customize</span>
        </button>
      </div>

      {/* Custom Picker Modal */}
      {showCustomPicker && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-sm animate-pop">
          <div className="bg-white dark:bg-slate-900 border-4 border-purple-400 rounded-3xl max-w-lg w-full p-5 shadow-2xl">
            <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-1">
              Pick Your Practice Words 🎯
            </h3>
            <p className="text-xs text-slate-500 dark:text-slate-400 mb-4">
              Select 3 to 10 words from List 11 for your custom word search puzzle:
            </p>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 max-h-64 overflow-y-auto p-1 mb-4">
              {ALL_LIST_11_WORDS.map((w) => {
                const isChecked = selectedCustomWords.includes(w.word);
                return (
                  <button
                    key={w.id}
                    onClick={() => toggleCustomWord(w.word)}
                    className={`flex items-center justify-between p-2 rounded-xl text-xs font-bold border-2 transition-all ${
                      isChecked
                        ? 'bg-purple-100 border-purple-500 text-purple-950 dark:bg-purple-950/60 dark:text-purple-200'
                        : 'bg-slate-50 border-slate-200 text-slate-600 dark:bg-slate-800 dark:border-slate-700 dark:text-slate-300'
                    }`}
                  >
                    <span>{w.word}</span>
                    {isChecked && <Check className="w-3.5 h-3.5 text-purple-600 shrink-0" />}
                  </button>
                );
              })}
            </div>

            <div className="flex items-center justify-between gap-3 pt-3 border-t border-slate-200 dark:border-slate-700">
              <span className="text-xs font-bold text-purple-600 dark:text-purple-400">
                {selectedCustomWords.length} words selected
              </span>

              <div className="flex gap-2">
                <button
                  onClick={() => setShowCustomPicker(false)}
                  className="px-4 py-2 rounded-xl bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 text-xs font-bold"
                >
                  Cancel
                </button>
                <button
                  onClick={handleStartCustomGame}
                  disabled={selectedCustomWords.length < 3}
                  className="px-5 py-2 rounded-xl bg-purple-600 hover:bg-purple-700 text-white text-xs font-bold shadow-md active:scale-95 transition-all disabled:opacity-50"
                >
                  Play Custom Puzzle!
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
