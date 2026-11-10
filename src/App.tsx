import React, { useState, useEffect, useCallback } from 'react';
import { TopNav } from './components/TopNav';
import { WordSearchBoard } from './components/WordSearchBoard';
import { WordBank } from './components/WordBank';
import { PuzzleSettings } from './components/PuzzleSettings';
import { LevelSelector } from './components/LevelSelector';
import { VictoryModal } from './components/VictoryModal';
import { OriginalSheetModal } from './components/OriginalSheetModal';
import { PrintModal } from './components/PrintModal';
import { KID_THEMES, KidTheme } from './data/themes';
import { WORD_PACKS, WordPack, ALL_LIST_11_WORDS } from './data/words';
import { generateWordSearch, WordSearchGrid, CellCoord } from './utils/wordSearchGenerator';
import { soundManager } from './utils/sound';

export default function App() {
  // Theme state
  const [themeId, setThemeId] = useState<string>(() => {
    try {
      return localStorage.getItem('kids_ws_theme') || 'candy';
    } catch {
      return 'candy';
    }
  });

  const currentTheme: KidTheme = KID_THEMES[themeId] || KID_THEMES.candy;

  // Uppercase vs Lowercase state
  const [isUppercase, setIsUppercase] = useState<boolean>(true);

  // Sound mute state
  const [isMuted, setIsMuted] = useState<boolean>(soundManager.isMuted);

  // Current level / pack state
  const [currentPack, setCurrentPack] = useState<WordPack>(WORD_PACKS[0]);

  // Allowed directions settings
  const [allowDiagonals, setAllowDiagonals] = useState<boolean>(() => {
    try {
      return localStorage.getItem('kids_ws_allow_diagonals') === 'true';
    } catch {
      return false;
    }
  });

  const [allowBackwards, setAllowBackwards] = useState<boolean>(() => {
    try {
      return localStorage.getItem('kids_ws_allow_backwards') === 'true';
    } catch {
      return false;
    }
  });

  // Word Search Grid Data
  const [gridData, setGridData] = useState<WordSearchGrid>(() =>
    generateWordSearch(
      WORD_PACKS[0].words,
      WORD_PACKS[0].recommendedGridSize,
      allowDiagonals,
      allowBackwards
    )
  );

  // Found words
  const [foundWords, setFoundWords] = useState<string[]>([]);

  // Hint state
  const [hintCell, setHintCell] = useState<CellCoord | null>(null);
  const [hintWord, setHintWord] = useState<string | null>(null);

  // Star ratings for levels
  const [starsEarned, setStarsEarned] = useState<Record<string, number>>(() => {
    try {
      const saved = localStorage.getItem('kids_ws_stars');
      return saved ? JSON.parse(saved) : {};
    } catch {
      return {};
    }
  });

  // Modals state
  const [showVictoryModal, setShowVictoryModal] = useState<boolean>(false);
  const [showPhotoModal, setShowPhotoModal] = useState<boolean>(false);
  const [showPrintModal, setShowPrintModal] = useState<boolean>(false);

  // Generate / regenerate puzzle
  const createNewPuzzle = useCallback(
    (words: string[], size: number, diagonals: boolean, backwards: boolean) => {
      const newGrid = generateWordSearch(words, size, diagonals, backwards);
      setGridData(newGrid);
      setFoundWords([]);
      setHintCell(null);
      setHintWord(null);
      setShowVictoryModal(false);
    },
    []
  );

  // Handlers for settings - automatically regenerates puzzle when changed
  const handleToggleDiagonals = (newVal: boolean) => {
    setAllowDiagonals(newVal);
    try {
      localStorage.setItem('kids_ws_allow_diagonals', String(newVal));
    } catch {}
    createNewPuzzle(currentPack.words, currentPack.recommendedGridSize, newVal, allowBackwards);
  };

  const handleToggleBackwards = (newVal: boolean) => {
    setAllowBackwards(newVal);
    try {
      localStorage.setItem('kids_ws_allow_backwards', String(newVal));
    } catch {}
    createNewPuzzle(currentPack.words, currentPack.recommendedGridSize, allowDiagonals, newVal);
  };

  // Initialize or re-create puzzle when pack changes
  const handleSelectPack = (pack: WordPack) => {
    setCurrentPack(pack);
    createNewPuzzle(pack.words, pack.recommendedGridSize, allowDiagonals, allowBackwards);
  };

  const handleCustomWordsSelected = (words: string[]) => {
    const customPack: WordPack = {
      id: 'custom',
      title: 'Custom Practice',
      subtitle: `${words.length} chosen sight words`,
      badge: `${words.length} Words`,
      color: 'from-purple-500 to-indigo-500',
      words,
      recommendedGridSize: Math.max(8, Math.min(12, Math.ceil(Math.sqrt(words.length * 8)))),
    };
    setCurrentPack(customPack);
    createNewPuzzle(words, customPack.recommendedGridSize, allowDiagonals, allowBackwards);
  };

  // Word found callback
  const handleWordFound = (word: string) => {
    if (foundWords.includes(word.toLowerCase())) return;

    soundManager.playWordFound();
    soundManager.cheerWordFound(word);

    const nextFound = [...foundWords, word.toLowerCase()];
    setFoundWords(nextFound);

    // Clear active hint if it was for this word
    if (hintWord?.toLowerCase() === word.toLowerCase()) {
      setHintCell(null);
      setHintWord(null);
    }

    // Check level completion
    if (nextFound.length >= currentPack.words.length) {
      setTimeout(() => {
        // Award 3 stars
        setStarsEarned((prev) => {
          const updated = { ...prev, [currentPack.id]: 3 };
          try {
            localStorage.setItem('kids_ws_stars', JSON.stringify(updated));
          } catch {}
          return updated;
        });
        setShowVictoryModal(true);
      }, 600);
    }
  };

  // Sparkle Hint Handler
  const handleHintRequested = () => {
    const unfound = currentPack.words.filter((w) => !foundWords.includes(w.toLowerCase()));
    if (unfound.length === 0) return;

    // Pick first unfound word
    const targetWord = unfound[0];
    const placed = gridData.placedWords.find(
      (pw) => pw.word.toLowerCase() === targetWord.toLowerCase()
    );

    if (placed && placed.cells.length > 0) {
      soundManager.playSparkle();
      const firstCell = placed.cells[0];
      setHintCell(firstCell);
      setHintWord(targetWord);

      // Speak gentle clue
      const letter = isUppercase
        ? gridData.letters[firstCell.row][firstCell.col].toUpperCase()
        : gridData.letters[firstCell.row][firstCell.col].toLowerCase();
      soundManager.speakWord(`Look for the letter ${letter} to find ${targetWord}!`);

      // Auto clear hint bouncing star after 7 seconds
      setTimeout(() => {
        setHintCell((curr) => (curr === firstCell ? null : curr));
        setHintWord((curr) => (curr === targetWord ? null : curr));
      }, 7000);
    }
  };

  // Next level navigation
  const currentPackIndex = WORD_PACKS.findIndex((p) => p.id === currentPack.id);
  const hasNextLevel = currentPackIndex >= 0 && currentPackIndex < WORD_PACKS.length - 1;

  const handleNextLevel = () => {
    if (hasNextLevel) {
      const nextPack = WORD_PACKS[currentPackIndex + 1];
      handleSelectPack(nextPack);
    } else {
      createNewPuzzle(
        currentPack.words,
        currentPack.recommendedGridSize,
        allowDiagonals,
        allowBackwards
      );
    }
  };

  const handleSelectTheme = (newThemeId: string) => {
    setThemeId(newThemeId);
    try {
      localStorage.setItem('kids_ws_theme', newThemeId);
    } catch {}
  };

  const handleToggleMute = () => {
    const muted = soundManager.toggleMute();
    setIsMuted(muted);
  };

  // Sync dark class on root if theme is space
  useEffect(() => {
    if (themeId === 'space') {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [themeId]);

  return (
    <div
      className={`min-h-screen flex flex-col transition-colors duration-300 font-sans ${currentTheme.pageBg}`}
    >
      {/* Top Navigation */}
      <TopNav
        currentTheme={currentTheme}
        onSelectTheme={handleSelectTheme}
        isUppercase={isUppercase}
        onToggleCase={() => setIsUppercase(!isUppercase)}
        isMuted={isMuted}
        onToggleMute={handleToggleMute}
        onOpenPhoto={() => setShowPhotoModal(true)}
        onOpenPrint={() => setShowPrintModal(true)}
        onNewGame={() =>
          createNewPuzzle(
            currentPack.words,
            currentPack.recommendedGridSize,
            allowDiagonals,
            allowBackwards
          )
        }
        levelTitle={currentPack.title}
        allowDiagonals={allowDiagonals}
        onToggleDiagonals={handleToggleDiagonals}
        allowBackwards={allowBackwards}
        onToggleBackwards={handleToggleBackwards}
      />

      {/* Main Game Stage */}
      <main className="flex-1 max-w-6xl w-full mx-auto px-3 sm:px-6 py-4 sm:py-6 flex flex-col lg:flex-row items-center lg:items-start justify-center gap-6">
        {/* Left / Center Column: Word Search Game Board */}
        <section className="flex-1 flex flex-col items-center w-full max-w-xl">
          <WordSearchBoard
            grid={gridData.letters}
            placedWords={gridData.placedWords}
            foundWords={foundWords}
            onWordFound={handleWordFound}
            isUppercase={isUppercase}
            theme={currentTheme}
            hintCell={hintCell}
            allowDiagonals={allowDiagonals}
          />
        </section>

        {/* Right Column: Words To Find, Settings & Level Progression */}
        <aside className="w-full lg:w-80 flex flex-col gap-4">
          {/* Words to Find list (found words automatically drop to bottom) */}
          <WordBank
            currentWords={currentPack.words}
            foundWords={foundWords}
            isUppercase={isUppercase}
            theme={currentTheme}
            onHintRequested={handleHintRequested}
            hintWord={hintWord}
          />

          {/* Puzzle Settings: Allow Diagonal & Allow Backwards */}
          <PuzzleSettings
            allowDiagonals={allowDiagonals}
            onToggleDiagonals={handleToggleDiagonals}
            allowBackwards={allowBackwards}
            onToggleBackwards={handleToggleBackwards}
            theme={currentTheme}
          />

          {/* Game Levels & Packs */}
          <LevelSelector
            currentPackId={currentPack.id}
            onSelectPack={handleSelectPack}
            onCustomWordsSelected={handleCustomWordsSelected}
            starsEarned={starsEarned}
            theme={currentTheme}
          />
        </aside>
      </main>

      {/* Modals */}
      {showVictoryModal && (
        <VictoryModal
          wordCount={currentPack.words.length}
          levelTitle={currentPack.title}
          onPlayAgain={() =>
            createNewPuzzle(
              currentPack.words,
              currentPack.recommendedGridSize,
              allowDiagonals,
              allowBackwards
            )
          }
          onNextLevel={handleNextLevel}
          hasNextLevel={hasNextLevel}
        />
      )}

      <OriginalSheetModal
        isOpen={showPhotoModal}
        onClose={() => setShowPhotoModal(false)}
        onSelectColumn={handleSelectPack}
      />

      <PrintModal
        isOpen={showPrintModal}
        onClose={() => setShowPrintModal(false)}
        gridData={gridData}
        words={currentPack.words}
        levelTitle={currentPack.title}
        isUppercase={isUppercase}
      />
    </div>
  );
}
