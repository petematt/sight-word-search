export interface KidTheme {
  id: string;
  name: string;
  icon: string;
  subtitle: string;
  pageBg: string;
  boardBg: string;
  cardBg: string;
  headerBg: string;
  tileDefault: string;
  tileSelecting: string;
  textPrimary: string;
  textSecondary: string;
  primaryButton: string;
  sparkleColor: string;
  highlightColors: string[];
}

export const KID_THEMES: Record<string, KidTheme> = {
  candy: {
    id: 'candy',
    name: 'Candy Kingdom',
    icon: '🍭',
    subtitle: 'Sweet strawberry and cotton candy fun',
    pageBg: 'bg-gradient-to-b from-pink-100 via-rose-50 to-pink-200 text-slate-800',
    boardBg: 'bg-white/95 border-4 border-pink-300 shadow-xl shadow-pink-200/50',
    cardBg: 'bg-white/90 border-2 border-pink-200 shadow-lg shadow-pink-100',
    headerBg: 'bg-white/90 border-b-2 border-pink-200 backdrop-blur-md',
    tileDefault:
      'bg-pink-50/80 hover:bg-pink-100/90 text-pink-900 border-2 border-pink-200/80 shadow-sm active:scale-95',
    tileSelecting:
      'bg-amber-300 text-amber-950 border-3 border-amber-500 scale-105 shadow-md shadow-amber-300/50',
    textPrimary: 'text-pink-950',
    textSecondary: 'text-pink-700',
    primaryButton:
      'bg-gradient-to-r from-pink-500 to-rose-500 hover:from-pink-600 hover:to-rose-600 text-white shadow-md shadow-pink-400/30',
    sparkleColor: '#EC4899',
    highlightColors: [
      'bg-rose-400 text-white border-rose-500',
      'bg-sky-400 text-white border-sky-500',
      'bg-amber-400 text-amber-950 border-amber-500',
      'bg-emerald-400 text-white border-emerald-500',
      'bg-purple-400 text-white border-purple-500',
      'bg-teal-400 text-white border-teal-500',
      'bg-indigo-400 text-white border-indigo-500',
      'bg-orange-400 text-white border-orange-500',
    ],
  },

  dino: {
    id: 'dino',
    name: 'Dino Jungle',
    icon: '🦕',
    subtitle: 'Wild prehistoric safari adventure',
    pageBg: 'bg-gradient-to-b from-emerald-100 via-green-50 to-teal-100 text-emerald-950',
    boardBg: 'bg-white/95 border-4 border-emerald-400 shadow-xl shadow-emerald-200/50',
    cardBg: 'bg-white/90 border-2 border-emerald-200 shadow-lg shadow-emerald-100',
    headerBg: 'bg-white/90 border-b-2 border-emerald-200 backdrop-blur-md',
    tileDefault:
      'bg-emerald-50/80 hover:bg-emerald-100/90 text-emerald-900 border-2 border-emerald-200/80 shadow-sm active:scale-95',
    tileSelecting:
      'bg-yellow-300 text-yellow-950 border-3 border-amber-500 scale-105 shadow-md shadow-yellow-300/50',
    textPrimary: 'text-emerald-950',
    textSecondary: 'text-emerald-700',
    primaryButton:
      'bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-700 hover:to-teal-700 text-white shadow-md shadow-emerald-400/30',
    sparkleColor: '#10B981',
    highlightColors: [
      'bg-emerald-500 text-white border-emerald-600',
      'bg-orange-400 text-white border-orange-500',
      'bg-lime-400 text-lime-950 border-lime-500',
      'bg-teal-500 text-white border-teal-600',
      'bg-amber-400 text-amber-950 border-amber-500',
      'bg-cyan-500 text-white border-cyan-600',
      'bg-rose-400 text-white border-rose-500',
      'bg-indigo-400 text-white border-indigo-500',
    ],
  },

  space: {
    id: 'space',
    name: 'Space Galaxy',
    icon: '🚀',
    subtitle: 'Cosmic stars, planets and rockets',
    pageBg: 'bg-gradient-to-b from-slate-900 via-indigo-950 to-slate-950 text-indigo-100',
    boardBg: 'bg-slate-900/90 border-4 border-indigo-500/80 shadow-2xl shadow-indigo-500/30 backdrop-blur-md',
    cardBg: 'bg-slate-900/80 border-2 border-indigo-500/40 shadow-xl shadow-indigo-950',
    headerBg: 'bg-slate-900/90 border-b-2 border-indigo-500/40 backdrop-blur-md',
    tileDefault:
      'bg-indigo-950/70 hover:bg-indigo-900/80 text-cyan-200 border-2 border-indigo-700/60 shadow-sm active:scale-95',
    tileSelecting:
      'bg-yellow-400 text-slate-950 border-3 border-amber-300 scale-105 shadow-md shadow-yellow-400/50',
    textPrimary: 'text-white',
    textSecondary: 'text-indigo-300',
    primaryButton:
      'bg-gradient-to-r from-cyan-500 to-indigo-600 hover:from-cyan-400 hover:to-indigo-500 text-white shadow-md shadow-cyan-500/30',
    sparkleColor: '#F59E0B',
    highlightColors: [
      'bg-cyan-500 text-slate-950 border-cyan-300 font-bold',
      'bg-fuchsia-500 text-white border-fuchsia-300 font-bold',
      'bg-amber-400 text-slate-950 border-amber-200 font-bold',
      'bg-emerald-400 text-slate-950 border-emerald-200 font-bold',
      'bg-violet-500 text-white border-violet-300 font-bold',
      'bg-rose-500 text-white border-rose-300 font-bold',
      'bg-blue-500 text-white border-blue-300 font-bold',
      'bg-teal-400 text-slate-950 border-teal-200 font-bold',
    ],
  },

  ocean: {
    id: 'ocean',
    name: 'Ocean Splash',
    icon: '🌊',
    subtitle: 'Under-the-sea coral and dolphins',
    pageBg: 'bg-gradient-to-b from-sky-100 via-cyan-50 to-blue-200 text-sky-950',
    boardBg: 'bg-white/95 border-4 border-sky-400 shadow-xl shadow-sky-300/40',
    cardBg: 'bg-white/90 border-2 border-sky-200 shadow-lg shadow-sky-100',
    headerBg: 'bg-white/90 border-b-2 border-sky-200 backdrop-blur-md',
    tileDefault:
      'bg-sky-50/80 hover:bg-sky-100/90 text-sky-900 border-2 border-sky-200/80 shadow-sm active:scale-95',
    tileSelecting:
      'bg-amber-300 text-amber-950 border-3 border-amber-500 scale-105 shadow-md shadow-amber-300/50',
    textPrimary: 'text-sky-950',
    textSecondary: 'text-sky-700',
    primaryButton:
      'bg-gradient-to-r from-sky-500 to-blue-600 hover:from-sky-600 hover:to-blue-700 text-white shadow-md shadow-sky-400/30',
    sparkleColor: '#0284C7',
    highlightColors: [
      'bg-sky-500 text-white border-sky-600',
      'bg-teal-400 text-white border-teal-500',
      'bg-coral-500 bg-rose-400 text-white border-rose-500',
      'bg-amber-400 text-amber-950 border-amber-500',
      'bg-indigo-400 text-white border-indigo-500',
      'bg-emerald-400 text-white border-emerald-500',
      'bg-cyan-500 text-white border-cyan-600',
      'bg-purple-400 text-white border-purple-500',
    ],
  },

  rainbow: {
    id: 'rainbow',
    name: 'Rainbow Sky',
    icon: '🌈',
    subtitle: 'Cheerful sunshine and colorful rainbows',
    pageBg: 'bg-gradient-to-b from-amber-50 via-sky-50 to-violet-50 text-slate-800',
    boardBg: 'bg-white/95 border-4 border-amber-300 shadow-xl shadow-amber-200/40',
    cardBg: 'bg-white/90 border-2 border-amber-200 shadow-lg shadow-amber-100',
    headerBg: 'bg-white/90 border-b-2 border-amber-200 backdrop-blur-md',
    tileDefault:
      'bg-amber-50/70 hover:bg-amber-100/80 text-slate-800 border-2 border-amber-200/70 shadow-sm active:scale-95',
    tileSelecting:
      'bg-violet-400 text-white border-3 border-violet-600 scale-105 shadow-md shadow-violet-400/50',
    textPrimary: 'text-slate-900',
    textSecondary: 'text-slate-600',
    primaryButton:
      'bg-gradient-to-r from-violet-500 via-pink-500 to-amber-500 hover:opacity-95 text-white shadow-md shadow-violet-300/40',
    sparkleColor: '#8B5CF6',
    highlightColors: [
      'bg-rose-400 text-white border-rose-500',
      'bg-amber-400 text-amber-950 border-amber-500',
      'bg-emerald-400 text-white border-emerald-500',
      'bg-sky-400 text-white border-sky-500',
      'bg-violet-400 text-white border-violet-500',
      'bg-pink-400 text-white border-pink-500',
      'bg-teal-400 text-white border-teal-500',
      'bg-indigo-400 text-white border-indigo-500',
    ],
  },
};
