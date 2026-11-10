import React, { useState, useRef, useEffect, useCallback } from 'react';
import { CellCoord, PlacedWord, getLineCells } from '../utils/wordSearchGenerator';
import { KidTheme } from '../data/themes';
import { soundManager } from '../utils/sound';
import { Sparkles, Check, HelpCircle } from 'lucide-react';

interface WordSearchBoardProps {
  grid: string[][];
  placedWords: PlacedWord[];
  foundWords: string[];
  onWordFound: (word: string) => void;
  isUppercase: boolean;
  theme: KidTheme;
  hintCell: CellCoord | null;
  allowDiagonals: boolean;
}

export const WordSearchBoard: React.FC<WordSearchBoardProps> = ({
  grid,
  placedWords,
  foundWords,
  onWordFound,
  isUppercase,
  theme,
  hintCell,
  allowDiagonals,
}) => {
  const [startCell, setStartCell] = useState<CellCoord | null>(null);
  const [currentHoverCell, setCurrentHoverCell] = useState<CellCoord | null>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [lastAttemptInvalid, setLastAttemptInvalid] = useState(false);
  const boardRef = useRef<HTMLDivElement>(null);

  const size = grid.length;

  // Selected line of cells currently being dragged or two-tapped
  const activeLine: CellCoord[] = React.useMemo(() => {
    if (!startCell) return [];
    if (!currentHoverCell) return [startCell];
    const line = getLineCells(startCell, currentHoverCell, allowDiagonals);
    return line || [startCell];
  }, [startCell, currentHoverCell, allowDiagonals]);

  // Map of cells that belong to found words -> colorIndex
  const foundCellMap = React.useMemo(() => {
    const map = new Map<string, number>();
    for (const pw of placedWords) {
      if (foundWords.includes(pw.word.toLowerCase())) {
        for (const c of pw.cells) {
          const key = `${c.row}-${c.col}`;
          map.set(key, pw.colorIndex);
        }
      }
    }
    return map;
  }, [placedWords, foundWords]);

  // Check if a line of cells matches any unfound word
  const evaluateSelection = useCallback(
    (cells: CellCoord[]): boolean => {
      if (cells.length < 2) return false;

      // Extract letters in forward and backward order
      const forwardLetters = cells.map((c) => grid[c.row][c.col]).join('').toLowerCase();
      const reverseLetters = [...cells]
        .reverse()
        .map((c) => grid[c.row][c.col])
        .join('')
        .toLowerCase();

      // Find matching placed word
      const match = placedWords.find(
        (pw) =>
          !foundWords.includes(pw.word.toLowerCase()) &&
          (pw.word.toLowerCase() === forwardLetters || pw.word.toLowerCase() === reverseLetters)
      );

      if (match) {
        onWordFound(match.word.toLowerCase());
        setStartCell(null);
        setCurrentHoverCell(null);
        setIsDragging(false);
        setLastAttemptInvalid(false);
        return true;
      }

      return false;
    },
    [grid, placedWords, foundWords, onWordFound]
  );

  // Helper to get cell coordinate from pointer event
  const getCellFromEvent = (e: React.PointerEvent | PointerEvent): CellCoord | null => {
    const el = document.elementFromPoint(e.clientX, e.clientY);
    if (!el) return null;
    const cellEl = el.closest('[data-row][data-col]');
    if (!cellEl) return null;
    const r = parseInt(cellEl.getAttribute('data-row') || '-1', 10);
    const c = parseInt(cellEl.getAttribute('data-col') || '-1', 10);
    if (r >= 0 && r < size && c >= 0 && c < size) {
      return { row: r, col: c };
    }
    return null;
  };

  const handlePointerDown = (row: number, col: number, e: React.PointerEvent) => {
    e.preventDefault();

    // If already tapped first cell in Two-Tap mode:
    if (startCell && !isDragging) {
      // If tapped the same cell again, cancel
      if (startCell.row === row && startCell.col === col) {
        setStartCell(null);
        setCurrentHoverCell(null);
        soundManager.playInvalid();
        return;
      }

      // Tapped the second cell! Evaluate line
      const line = getLineCells(startCell, { row, col }, allowDiagonals);
      if (line && line.length >= 2) {
        const success = evaluateSelection(line);
        if (!success) {
          soundManager.playInvalid();
          setLastAttemptInvalid(true);
          setTimeout(() => setLastAttemptInvalid(false), 500);
          setStartCell(null);
          setCurrentHoverCell(null);
        }
      } else {
        // Not a straight line
        soundManager.playInvalid();
        setLastAttemptInvalid(true);
        setTimeout(() => setLastAttemptInvalid(false), 500);
        setStartCell(null);
        setCurrentHoverCell(null);
      }
      return;
    }

    // Start drag or first tap
    soundManager.playTilePop(0);
    setStartCell({ row, col });
    setCurrentHoverCell({ row, col });
    setIsDragging(true);
    setLastAttemptInvalid(false);
  };

  // Global pointer move listener during drag
  useEffect(() => {
    if (!isDragging) return;

    function onPointerMove(e: PointerEvent) {
      const cell = getCellFromEvent(e);
      if (cell) {
        setCurrentHoverCell((prev) => {
          if (!prev || prev.row !== cell.row || prev.col !== cell.col) {
            soundManager.playTilePop(Math.floor(Math.random() * 5));
            return cell;
          }
          return prev;
        });
      }
    }

    function onPointerUp(e: PointerEvent) {
      if (!isDragging) return;

      const endCell = getCellFromEvent(e) || currentHoverCell;

      if (startCell && endCell) {
        // If it was just a single quick click without moving cells, keep startCell for Two-Tap mode!
        if (startCell.row === endCell.row && startCell.col === endCell.col) {
          setIsDragging(false);
          // startCell stays active for two-tap mode!
          return;
        }

        // It was a drag! Evaluate line
        const line = getLineCells(startCell, endCell, allowDiagonals);
        if (line && line.length >= 2) {
          const success = evaluateSelection(line);
          if (!success) {
            soundManager.playInvalid();
            setLastAttemptInvalid(true);
            setTimeout(() => setLastAttemptInvalid(false), 500);
            setStartCell(null);
            setCurrentHoverCell(null);
          }
        } else {
          soundManager.playInvalid();
          setStartCell(null);
          setCurrentHoverCell(null);
        }
      }

      setIsDragging(false);
    }

    window.addEventListener('pointermove', onPointerMove);
    window.addEventListener('pointerup', onPointerUp);

    return () => {
      window.removeEventListener('pointermove', onPointerMove);
      window.removeEventListener('pointerup', onPointerUp);
    };
  }, [isDragging, startCell, currentHoverCell, allowDiagonals, evaluateSelection]);

  // Is a coordinate part of the currently active selection line?
  const isInActiveLine = (r: number, c: number) => {
    return activeLine.some((cell) => cell.row === r && cell.col === c);
  };

  // Determine current spelled string for display
  const currentSpelledString = activeLine
    .map((c) => grid[c.row][c.col])
    .join('')
    [isUppercase ? 'toUpperCase' : 'toLowerCase']();

  return (
    <div className="flex flex-col items-center w-full select-none">
      {/* Live Helper Status Bar for Kids */}
      <div className="h-10 mb-2 flex items-center justify-center">
        {startCell && !isDragging ? (
          <div className="flex items-center gap-2 px-4 py-1.5 rounded-full bg-amber-400 text-amber-950 font-bold text-xs sm:text-sm shadow-md animate-bounce">
            <span>👉 First letter chosen:</span>
            <span className="bg-white px-2 py-0.5 rounded-lg text-base font-extrabold text-amber-700">
              {isUppercase
                ? grid[startCell.row][startCell.col].toUpperCase()
                : grid[startCell.row][startCell.col].toLowerCase()}
            </span>
            <span>Now tap the LAST letter!</span>
          </div>
        ) : activeLine.length > 1 ? (
          <div className="flex items-center gap-2 px-4 py-1.5 rounded-full bg-white dark:bg-slate-800 border-2 border-amber-400 shadow-md">
            <span className="text-xs font-semibold text-slate-500">Spelling:</span>
            <span className="text-lg sm:text-xl font-extrabold tracking-widest text-amber-600 dark:text-amber-400">
              {currentSpelledString}
            </span>
          </div>
        ) : (
          <div className="flex items-center gap-1.5 text-xs text-slate-500 font-medium">
            <Sparkles className="w-4 h-4 text-amber-400" />
            <span>Swipe letters or tap the first & last letter!</span>
          </div>
        )}
      </div>

      {/* Word Search Grid Container */}
      <div
        ref={boardRef}
        className={`p-2.5 sm:p-4 rounded-3xl transition-all duration-300 relative touch-none ${theme.boardBg} ${
          lastAttemptInvalid ? 'animate-wiggle' : ''
        }`}
        style={{
          maxWidth: 'min(94vw, 560px)',
          width: '100%',
        }}
      >
        <div
          className="grid gap-1.5 sm:gap-2 justify-center"
          style={{
            gridTemplateColumns: `repeat(${size}, minmax(0, 1fr))`,
          }}
        >
          {grid.map((rowArr, r) =>
            rowArr.map((letter, c) => {
              const key = `${r}-${c}`;
              const isSelected = isInActiveLine(r, c);
              const foundColorIdx = foundCellMap.get(key);
              const isFound = foundColorIdx !== undefined;
              const isHint = hintCell && hintCell.row === r && hintCell.col === c;
              const isStart = startCell && startCell.row === r && startCell.col === c;

              // Display letter formatted
              const displayChar = isUppercase ? letter.toUpperCase() : letter.toLowerCase();

              // Styling computation
              let cellClass = theme.tileDefault;

              if (isSelected) {
                cellClass = theme.tileSelecting;
              } else if (isFound) {
                const colorScheme =
                  theme.highlightColors[foundColorIdx % theme.highlightColors.length];
                cellClass = `${colorScheme} border-2 shadow-sm font-black`;
              } else if (isHint) {
                cellClass =
                  'bg-yellow-300 text-yellow-950 border-3 border-amber-400 font-black animate-bounce shadow-lg shadow-yellow-300/60 ring-4 ring-amber-300/40';
              }

              return (
                <button
                  key={key}
                  type="button"
                  data-row={r}
                  data-col={c}
                  onPointerDown={(e) => handlePointerDown(r, c, e)}
                  className={`relative aspect-square flex items-center justify-center rounded-xl sm:rounded-2xl transition-all duration-150 select-none cursor-pointer text-center font-bold touch-none ${cellClass} ${
                    size <= 8
                      ? 'text-2xl sm:text-3xl'
                      : size <= 10
                      ? 'text-xl sm:text-2xl'
                      : 'text-lg sm:text-xl'
                  }`}
                  style={{
                    minWidth: size > 10 ? '30px' : '38px',
                    minHeight: size > 10 ? '30px' : '38px',
                  }}
                >
                  <span>{displayChar}</span>

                  {/* Hint indicator star */}
                  {isHint && !isSelected && (
                    <span className="absolute -top-2 -right-1 text-sm sm:text-base animate-bounce select-none pointer-events-none">
                      ⭐
                    </span>
                  )}

                  {/* Start cell marker in two-tap mode */}
                  {isStart && !isDragging && (
                    <span className="absolute inset-0 rounded-xl sm:rounded-2xl ring-4 ring-amber-400 ring-offset-2 animate-pulse pointer-events-none" />
                  )}
                </button>
              );
            })
          )}
        </div>
      </div>
    </div>
  );
};
