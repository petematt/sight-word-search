import React, { useEffect } from 'react';
import confetti from 'canvas-confetti';
import { Star, Trophy, Sparkles, ArrowRight, RotateCcw } from 'lucide-react';
import { soundManager } from '../utils/sound';

interface VictoryModalProps {
  wordCount: number;
  levelTitle: string;
  onPlayAgain: () => void;
  onNextLevel: () => void;
  hasNextLevel: boolean;
}

export const VictoryModal: React.FC<VictoryModalProps> = ({
  wordCount,
  levelTitle,
  onPlayAgain,
  onNextLevel,
  hasNextLevel,
}) => {
  useEffect(() => {
    // Play fanfare
    soundManager.playVictory();

    // Trigger colorful confetti fireworks for kids
    const count = 200;
    const defaults = {
      origin: { y: 0.7 },
      zIndex: 9999,
    };

    function fire(particleRatio: number, opts: confetti.Options) {
      confetti({
        ...defaults,
        ...opts,
        particleCount: Math.floor(count * particleRatio),
      });
    }

    fire(0.25, {
      spread: 26,
      startVelocity: 55,
      colors: ['#EC4899', '#F59E0B', '#10B981', '#3B82F6'],
    });
    fire(0.2, {
      spread: 60,
      colors: ['#8B5CF6', '#F43F5E', '#06B6D4'],
    });
    fire(0.35, {
      spread: 100,
      decay: 0.91,
      scalar: 1.1,
    });
    fire(0.1, {
      spread: 120,
      startVelocity: 25,
      decay: 0.92,
      scalar: 1.3,
    });
    fire(0.1, {
      spread: 120,
      startVelocity: 45,
    });
  }, []);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-md animate-pop">
      <div className="bg-white dark:bg-slate-900 border-4 border-amber-400 rounded-3xl max-w-md w-full p-6 text-center shadow-2xl relative overflow-hidden">
        {/* Glow backdrop */}
        <div className="absolute -top-12 -left-12 w-36 h-36 bg-amber-300/30 rounded-full blur-2xl pointer-events-none" />
        <div className="absolute -bottom-12 -right-12 w-36 h-36 bg-pink-300/30 rounded-full blur-2xl pointer-events-none" />

        {/* Mascot / Trophy */}
        <div className="w-20 h-20 mx-auto mb-3 bg-gradient-to-tr from-amber-400 to-yellow-300 rounded-3xl flex items-center justify-center shadow-lg shadow-amber-300/40 text-4xl animate-bounce">
          🏆
        </div>

        {/* 3 Animated Stars */}
        <div className="flex items-center justify-center gap-2 mb-3">
          <Star className="w-8 h-8 fill-amber-400 text-amber-500 animate-pop" style={{ animationDelay: '100ms' }} />
          <Star className="w-10 h-10 fill-amber-400 text-amber-500 -mt-2 animate-pop" style={{ animationDelay: '250ms' }} />
          <Star className="w-8 h-8 fill-amber-400 text-amber-500 animate-pop" style={{ animationDelay: '400ms' }} />
        </div>

        <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white tracking-tight mb-1">
          Super Job! 🌟
        </h2>

        <p className="text-sm sm:text-base font-bold text-amber-600 dark:text-amber-400 mb-2">
          You finished {levelTitle}!
        </p>

        <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 mb-6 bg-amber-50 dark:bg-slate-800/80 p-3 rounded-2xl border border-amber-200 dark:border-slate-700">
          You read and found all <strong className="text-amber-600 dark:text-amber-300">{wordCount}</strong> sight words like a champion reader!
        </p>

        {/* Buttons */}
        <div className="flex flex-col sm:flex-row gap-2.5 justify-center">
          {hasNextLevel && (
            <button
              onClick={onNextLevel}
              className="flex items-center justify-center gap-2 px-6 py-3 rounded-2xl bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-600 hover:to-teal-600 text-white font-extrabold text-sm sm:text-base shadow-lg shadow-emerald-400/30 active:scale-95 transition-all"
            >
              <span>Next Level</span>
              <ArrowRight className="w-4 h-4 sm:w-5 sm:h-5" />
            </button>
          )}

          <button
            onClick={onPlayAgain}
            className="flex items-center justify-center gap-2 px-5 py-3 rounded-2xl bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 text-slate-800 dark:text-white font-bold text-sm sm:text-base active:scale-95 transition-all"
          >
            <RotateCcw className="w-4 h-4" />
            <span>Play Again</span>
          </button>
        </div>
      </div>
    </div>
  );
};
