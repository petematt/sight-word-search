import React, { useRef } from 'react';
import { X, Printer, Download } from 'lucide-react';
import { WordSearchGrid } from '../utils/wordSearchGenerator';

interface PrintModalProps {
  isOpen: boolean;
  onClose: () => void;
  gridData: WordSearchGrid;
  words: string[];
  levelTitle: string;
  isUppercase: boolean;
}

export const PrintModal: React.FC<PrintModalProps> = ({
  isOpen,
  onClose,
  gridData,
  words,
  levelTitle,
  isUppercase,
}) => {
  const printAreaRef = useRef<HTMLDivElement>(null);

  if (!isOpen) return null;

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-5 bg-black/60 backdrop-blur-sm animate-pop">
      <div className="bg-white dark:bg-slate-900 border-4 border-purple-400 rounded-3xl max-w-2xl w-full max-h-[92vh] flex flex-col shadow-2xl overflow-hidden">
        {/* Header (hidden in print) */}
        <div className="flex items-center justify-between px-5 py-3.5 border-b border-slate-200 dark:border-slate-800 bg-purple-50 dark:bg-slate-800/60 print:hidden">
          <div className="flex items-center gap-2">
            <Printer className="w-5 h-5 text-purple-600" />
            <h3 className="text-base sm:text-lg font-bold text-slate-900 dark:text-white">
              Printable Homework Worksheet
            </h3>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-xl hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-500 hover:text-slate-900 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Printable Sheet Content */}
        <div className="p-6 overflow-y-auto bg-white text-slate-900" ref={printAreaRef}>
          {/* Header on Paper */}
          <div className="border-b-2 border-slate-900 pb-3 mb-4">
            <div className="flex justify-between items-start mb-3">
              <div>
                <h1 className="text-2xl font-black tracking-tight">Sight Words Word Search</h1>
                <p className="text-sm font-bold text-slate-600">List 11 · {levelTitle}</p>
              </div>
              <div className="text-xs font-semibold text-right space-y-1">
                <div>Name: ______________________</div>
                <div>Date: ______________________</div>
              </div>
            </div>
            <p className="text-xs text-slate-600 italic">
              Directions: Find and circle the sight words in the puzzle below! Color each word with a fun crayon!
            </p>
          </div>

          {/* Puzzle Grid */}
          <div className="flex justify-center my-4">
            <div
              className="grid gap-1 border-2 border-slate-900 p-2 rounded-xl"
              style={{
                gridTemplateColumns: `repeat(${gridData.size}, minmax(0, 1fr))`,
              }}
            >
              {gridData.letters.map((row, r) =>
                row.map((letter, c) => (
                  <div
                    key={`${r}-${c}`}
                    className="w-8 h-8 sm:w-10 sm:h-10 flex items-center justify-center border border-slate-300 font-bold text-base sm:text-lg select-none"
                  >
                    {isUppercase ? letter.toUpperCase() : letter.toLowerCase()}
                  </div>
                ))
              )}
            </div>
          </div>

          {/* Word Bank to Check Off */}
          <div className="mt-4 pt-3 border-t-2 border-dashed border-slate-400">
            <h4 className="text-sm font-extrabold uppercase tracking-wider mb-2">
              Word Bank (Check them off as you find them!):
            </h4>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 text-sm font-bold">
              {words.map((w) => (
                <div key={w} className="flex items-center gap-2">
                  <div className="w-4 h-4 border-2 border-slate-900 rounded-sm" />
                  <span>{isUppercase ? w.toUpperCase() : w.toLowerCase()}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Footer with Print Action (hidden in print) */}
        <div className="px-5 py-3 border-t border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-850 flex justify-between items-center print:hidden">
          <span className="text-xs text-slate-500">
            Ready to print on standard letter paper (8.5" x 11")
          </span>
          <div className="flex gap-2">
            <button
              onClick={onClose}
              className="px-4 py-2 rounded-xl bg-slate-200 dark:bg-slate-700 text-slate-800 dark:text-slate-200 text-xs font-bold"
            >
              Cancel
            </button>
            <button
              onClick={handlePrint}
              className="flex items-center gap-1.5 px-5 py-2 rounded-xl bg-purple-600 hover:bg-purple-700 text-white text-xs font-bold shadow-md active:scale-95 transition-all"
            >
              <Printer className="w-4 h-4" />
              <span>Print Worksheet Now</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
