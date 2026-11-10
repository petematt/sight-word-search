import React, { useState } from 'react';
import { Sparkles, CheckCircle2, Lightbulb, BookOpen, Volume2 } from 'lucide-react';
import { ALL_LIST_11_WORDS, SightWord } from '../data/words';
import { KidTheme } from '../data/themes';
import { soundManager } from '../utils/sound';

interface WordBankProps {
  currentWords: string[];
  foundWords: string[];
  isUppercase: boolean;
  theme: KidTheme;
  onHintRequested: () => void;
  hintWord: string | null;
}

export const WordBank: React.FC<WordBankProps> = ({
  currentWords,
  foundWords,
  isUppercase,
  theme,
  onHintRequested,
  hintWord,
}) => {
  const [selectedWordDetail, setSelectedWordDetail] = useState<SightWord | null>(null);

  // Map words to their rich metadata
  const wordMetadataMap = React.useMemo(() => {
    const map = new Map<string, SightWord>();
    for (const w of ALL_LIST_11_WORDS) {
      map.set(w.word.toLowerCase(), w);
    }
    return map;
  }, []);

  // Move found words to the bottom of the "words to find" list
  const orderedWords = React.useMemo(() => {
    const unfound = currentWords.filter((w) => !foundWords.includes(w.toLowerCase()));
    const found = currentWords.filter((w) => foundWords.includes(w.toLowerCase()));
    return [...unfound, ...found];
  }, [currentWords, foundWords]);

  const handleCardClick = (word: string) => {
    const detail = wordMetadataMap.get(word.toLowerCase());
    if (detail) {
      setSelectedWordDetail(detail);
    }
  };

  const handleSpeakModal = (word: string) => {
    soundManager.spellAndSpeakWord(word);
  };

  const foundCount = foundWords.length;
  const totalCount = currentWords.length;
  const progressPercent = Math.round((foundCount / totalCount) * 100);

  return (
    <div className={`p-4 sm:p-5 rounded-3xl transition-all duration-300 w-full ${theme.cardBg}`}>
      {/* Header & Progress */}
      <div className="flex items-center justify-between gap-3 mb-3">
        <div className="flex items-center gap-2">
          <BookOpen className="w-5 h-5 text-amber-500" />
          <h2 className="text-base sm:text-lg font-bold tracking-tight">Words to Find</h2>
        </div>

        <div className="flex items-center gap-2">
          <span className="text-xs sm:text-sm font-extrabold text-amber-600 dark:text-amber-400">
            {foundCount} / {totalCount} found
          </span>
          <div className="w-16 sm:w-24 h-3 bg-slate-200 dark:bg-slate-700 rounded-full overflow-hidden">
            <div
              className="h-full bg-gradient-to-r from-amber-400 to-emerald-500 rounded-full transition-all duration-500"
              style={{ width: `${progressPercent}%` }}
            />
          </div>
        </div>
      </div>

      {/* Words Grid - sorted so found words move to the bottom */}
      <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-1 gap-2.5">
        {orderedWords.map((word) => {
          const isFound = foundWords.includes(word.toLowerCase());
          const isHinted = hintWord?.toLowerCase() === word.toLowerCase();
          const detail = wordMetadataMap.get(word.toLowerCase());

          const displayWord = isUppercase ? word.toUpperCase() : word.toLowerCase();

          return (
            <div
              key={word}
              onClick={() => handleCardClick(word)}
              className={`group relative flex items-center justify-between p-2.5 sm:p-3 rounded-2xl border-2 transition-all duration-300 cursor-pointer ${
                isFound
                  ? 'bg-emerald-50/90 border-emerald-300 text-emerald-900 dark:bg-emerald-950/40 dark:border-emerald-700/60 dark:text-emerald-300 opacity-75'
                  : isHinted
                  ? 'bg-amber-100 border-amber-400 text-amber-950 dark:bg-amber-900/40 dark:border-amber-400 ring-2 ring-amber-300 animate-wiggle'
                  : 'bg-white/80 dark:bg-slate-800/80 border-slate-200 dark:border-slate-700 hover:border-amber-400 text-slate-800 dark:text-slate-100 hover:scale-[1.01]'
              } shadow-sm`}
            >
              <div className="flex items-center gap-2">
                <span className="text-lg sm:text-xl select-none">
                  {detail?.emoji || '⭐'}
                </span>
                <span
                  className={`text-base sm:text-lg font-extrabold tracking-wide ${
                    isFound ? 'line-through text-slate-400 dark:text-slate-500' : ''
                  }`}
                >
                  {displayWord}
                </span>
              </div>

              {/* Only show checkmark when found. No pronunciation button on chips */}
              <div className="flex items-center">
                {isFound && (
                  <CheckCircle2 className="w-5 h-5 text-emerald-500 shrink-0" />
                )}
              </div>
            </div>
          );
        })}
      </div>

      {/* Sparkle Hint Button */}
      <div className="mt-4 pt-3 border-t border-slate-200 dark:border-slate-700 flex flex-col sm:flex-row items-center gap-2 justify-between">
        <button
          onClick={onHintRequested}
          className="w-full flex items-center justify-center gap-2 px-4 py-2.5 rounded-2xl bg-amber-400 hover:bg-amber-300 text-amber-950 font-bold text-xs sm:text-sm shadow-md active:scale-95 transition-all"
        >
          <Lightbulb className="w-4 h-4 text-amber-900" />
          <span>Need a Sparkle Hint? ⭐</span>
        </button>
      </div>

      {/* Word Detail Card Modal / Drawer */}
      {selectedWordDetail && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-sm animate-pop">
          <div className="bg-white dark:bg-slate-900 border-4 border-amber-300 rounded-3xl max-w-sm w-full p-5 shadow-2xl relative text-center">
            <div className="w-16 h-16 rounded-full bg-amber-100 dark:bg-amber-900/50 flex items-center justify-center text-3xl mx-auto mb-3 shadow-inner">
              {selectedWordDetail.emoji}
            </div>

            <h3 className="text-3xl font-extrabold tracking-wide text-slate-900 dark:text-white uppercase mb-1">
              {selectedWordDetail.word}
            </h3>

            <div className="text-sm font-semibold text-amber-600 dark:text-amber-400 mb-3">
              Phonics: {selectedWordDetail.phonics}
            </div>

            <p className="text-slate-700 dark:text-slate-200 text-sm sm:text-base font-medium bg-amber-50 dark:bg-slate-800 p-3 rounded-2xl mb-4 border border-amber-200 dark:border-slate-700">
              "{selectedWordDetail.sentence}"
            </p>

            <div className="flex gap-2">
              <button
                onClick={() => handleSpeakModal(selectedWordDetail.word)}
                className="flex-1 flex items-center justify-center gap-1.5 py-2.5 rounded-xl bg-amber-400 hover:bg-amber-500 text-amber-950 font-bold text-sm shadow-sm active:scale-95 transition-all"
              >
                <Volume2 className="w-4 h-4" />
                <span>Hear Word</span>
              </button>
              <button
                onClick={() => setSelectedWordDetail(null)}
                className="px-5 py-2.5 rounded-xl bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-200 font-bold text-sm active:scale-95 transition-all"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
