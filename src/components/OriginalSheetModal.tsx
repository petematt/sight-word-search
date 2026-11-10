import React from 'react';
import { X, CheckCircle, ExternalLink, Play } from 'lucide-react';
import { WORD_PACKS, WordPack } from '../data/words';

interface OriginalSheetModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSelectColumn: (pack: WordPack) => void;
}

export const OriginalSheetModal: React.FC<OriginalSheetModalProps> = ({
  isOpen,
  onClose,
  onSelectColumn,
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-5 bg-black/60 backdrop-blur-sm animate-pop">
      <div className="bg-white dark:bg-slate-900 border-4 border-amber-400 rounded-3xl max-w-2xl w-full max-h-[92vh] flex flex-col shadow-2xl overflow-hidden">
        {/* Header */}
        <div className="flex items-center justify-between px-5 py-3.5 border-b border-slate-200 dark:border-slate-800 bg-amber-50 dark:bg-slate-800/60">
          <div className="flex items-center gap-2">
            <span className="text-xl">📄</span>
            <h3 className="text-base sm:text-lg font-bold text-slate-900 dark:text-white">
              Original Homework Sheet: List 11
            </h3>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-xl hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-500 hover:text-slate-900 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content body */}
        <div className="p-4 sm:p-6 overflow-y-auto space-y-4">
          <div className="text-xs sm:text-sm text-slate-600 dark:text-slate-300">
            This app uses all 20 sight words from your <strong>List 11</strong> worksheet picture, divided into 4 quick levels or playable all together:
          </div>

          {/* Photo Preview Container */}
          <div className="relative rounded-2xl overflow-hidden border-2 border-slate-300 dark:border-slate-700 bg-slate-100 dark:bg-slate-800 shadow-inner">
            <img
              src={`${import.meta.env.BASE_URL}assets/aistudio/17943167943216675034519693282581_274b2dc0.jpg`}
              alt="List 11 sight words homework worksheet"
              referrerPolicy="no-referrer"
              className="w-full h-auto max-h-72 object-contain mx-auto"
            />
          </div>

          {/* 4 Column Quick Play Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
            {WORD_PACKS.slice(0, 4).map((pack, idx) => (
              <div
                key={pack.id}
                className="p-3 rounded-2xl bg-slate-50 dark:bg-slate-800/80 border-2 border-slate-200 dark:border-slate-700 flex flex-col justify-between"
              >
                <div>
                  <div className="text-xs font-bold text-amber-600 dark:text-amber-400 mb-1">
                    Column {idx + 1}
                  </div>
                  <div className="flex flex-wrap gap-1 mb-2">
                    {pack.words.map((w) => (
                      <span
                        key={w}
                        className="px-2 py-0.5 rounded-lg bg-white dark:bg-slate-700 border border-slate-200 dark:border-slate-600 text-xs font-bold text-slate-800 dark:text-slate-200"
                      >
                        {w}
                      </span>
                    ))}
                  </div>
                </div>

                <button
                  onClick={() => {
                    onSelectColumn(pack);
                    onClose();
                  }}
                  className="w-full flex items-center justify-center gap-1.5 py-1.5 rounded-xl bg-amber-400 hover:bg-amber-500 text-amber-950 text-xs font-bold shadow-sm active:scale-95 transition-all"
                >
                  <Play className="w-3.5 h-3.5 fill-amber-950" />
                  <span>Play Column {idx + 1}</span>
                </button>
              </div>
            ))}
          </div>
        </div>

        {/* Footer */}
        <div className="px-5 py-3 border-t border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-850 flex justify-end">
          <button
            onClick={onClose}
            className="px-5 py-2 rounded-xl bg-slate-200 dark:bg-slate-700 hover:bg-slate-300 dark:hover:bg-slate-600 text-slate-800 dark:text-slate-200 text-xs font-bold transition-all"
          >
            Close Sheet
          </button>
        </div>
      </div>
    </div>
  );
};
