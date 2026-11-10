export interface SightWord {
  id: string;
  word: string;
  sentence: string;
  phonics: string;
  emoji: string;
  category: string;
}

// Exactly the 20 words from List 11 in the user's photo
export const ALL_LIST_11_WORDS: SightWord[] = [
  // Column 1
  {
    id: 'wash',
    word: 'wash',
    sentence: 'I wash my hands with warm water and soap.',
    phonics: 'w - a - sh',
    emoji: '🧼',
    category: 'Daily Fun',
  },
  {
    id: 'show',
    word: 'show',
    sentence: 'Can you show me your favorite toy?',
    phonics: 'sh - ow',
    emoji: '🎪',
    category: 'Daily Fun',
  },
  {
    id: 'hot',
    word: 'hot',
    sentence: 'The hot soup is delicious on a cold day.',
    phonics: 'h - o - t',
    emoji: '☀️',
    category: 'Daily Fun',
  },
  {
    id: 'because',
    word: 'because',
    sentence: 'I smiled because I saw my best friend.',
    phonics: 'be - cause',
    emoji: '💡',
    category: 'Daily Fun',
  },
  {
    id: 'far',
    word: 'far',
    sentence: 'The shiny stars are very far away in space.',
    phonics: 'f - ar',
    emoji: '🚀',
    category: 'Daily Fun',
  },

  // Column 2
  {
    id: 'live',
    word: 'live',
    sentence: 'Fishes live in the big blue ocean.',
    phonics: 'l - i - ve',
    emoji: '🏡',
    category: 'Creatures & Art',
  },
  {
    id: 'draw',
    word: 'draw',
    sentence: 'I love to draw colorful rainbows with crayons.',
    phonics: 'd - r - aw',
    emoji: '🎨',
    category: 'Creatures & Art',
  },
  {
    id: 'clean',
    word: 'clean',
    sentence: 'We clean up all our building blocks together.',
    phonics: 'c - l - ean',
    emoji: '✨',
    category: 'Creatures & Art',
  },
  {
    id: 'grow',
    word: 'grow',
    sentence: 'Water and sunshine help little seeds grow tall.',
    phonics: 'g - r - ow',
    emoji: '🌱',
    category: 'Creatures & Art',
  },
  {
    id: 'best',
    word: 'best',
    sentence: 'You are the best helper in the whole class!',
    phonics: 'b - e - s - t',
    emoji: '🏆',
    category: 'Creatures & Art',
  },

  // Column 3
  {
    id: 'upon',
    word: 'upon',
    sentence: 'Once upon a time, a friendly dragon visited us.',
    phonics: 'u - p - on',
    emoji: '📖',
    category: 'Together & Kindness',
  },
  {
    id: 'these',
    word: 'these',
    sentence: 'These sweet strawberries taste super yummy.',
    phonics: 'th - e - se',
    emoji: '🍓',
    category: 'Together & Kindness',
  },
  {
    id: 'sing',
    word: 'sing',
    sentence: 'Little birds sing a happy song in the morning.',
    phonics: 's - i - ng',
    emoji: '🎵',
    category: 'Together & Kindness',
  },
  {
    id: 'together',
    word: 'together',
    sentence: 'We can play and build the tower together!',
    phonics: 'to - geth - er',
    emoji: '🤝',
    category: 'Together & Kindness',
  },
  {
    id: 'please',
    word: 'please',
    sentence: 'May I please have an apple for my snack?',
    phonics: 'p - l - ease',
    emoji: '🙏',
    category: 'Together & Kindness',
  },

  // Column 4
  {
    id: 'thank',
    word: 'thank',
    sentence: 'Always say thank you when someone gives you a gift.',
    phonics: 'th - a - nk',
    emoji: '🎁',
    category: 'Heart & Smile',
  },
  {
    id: 'wish',
    word: 'wish',
    sentence: 'Make a special birthday wish and blow out the candle.',
    phonics: 'w - i - sh',
    emoji: '⭐',
    category: 'Heart & Smile',
  },
  {
    id: 'many',
    word: 'many',
    sentence: 'Look how many colorful butterflies are in the garden!',
    phonics: 'm - a - ny',
    emoji: '🦋',
    category: 'Heart & Smile',
  },
  {
    id: 'shall',
    word: 'shall',
    sentence: 'Shall we go to the playground after school?',
    phonics: 'sh - a - ll',
    emoji: '🎪',
    category: 'Heart & Smile',
  },
  {
    id: 'laugh',
    word: 'laugh',
    sentence: 'Silly jokes make us laugh and giggle so much!',
    phonics: 'l - au - gh',
    emoji: '😄',
    category: 'Heart & Smile',
  },
];

export interface WordPack {
  id: string;
  title: string;
  subtitle: string;
  badge: string;
  color: string;
  words: string[];
  recommendedGridSize: number;
}

export const WORD_PACKS: WordPack[] = [
  {
    id: 'col1',
    title: 'Level 1: Column 1',
    subtitle: 'wash · show · hot · because · far',
    badge: '5 Words · Easy',
    color: 'from-amber-400 to-orange-400',
    words: ['wash', 'show', 'hot', 'because', 'far'],
    recommendedGridSize: 8,
  },
  {
    id: 'col2',
    title: 'Level 2: Column 2',
    subtitle: 'live · draw · clean · grow · best',
    badge: '5 Words · Easy',
    color: 'from-emerald-400 to-teal-500',
    words: ['live', 'draw', 'clean', 'grow', 'best'],
    recommendedGridSize: 8,
  },
  {
    id: 'col3',
    title: 'Level 3: Column 3',
    subtitle: 'upon · these · sing · together · please',
    badge: '5 Words · Fun',
    color: 'from-sky-400 to-blue-500',
    words: ['upon', 'these', 'sing', 'together', 'please'],
    recommendedGridSize: 9,
  },
  {
    id: 'col4',
    title: 'Level 4: Column 4',
    subtitle: 'thank · wish · many · shall · laugh',
    badge: '5 Words · Fun',
    color: 'from-purple-400 to-pink-500',
    words: ['thank', 'wish', 'many', 'shall', 'laugh'],
    recommendedGridSize: 8,
  },
  {
    id: 'all20',
    title: 'Mega Quest: All 20 Words',
    subtitle: 'The full List 11 sight word master challenge!',
    badge: '20 Words · Champion',
    color: 'from-rose-500 via-purple-500 to-indigo-500',
    words: ALL_LIST_11_WORDS.map((w) => w.word),
    recommendedGridSize: 12,
  },
];
