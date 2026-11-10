export interface CellCoord {
  row: number;
  col: number;
}

export interface PlacedWord {
  word: string;
  startRow: number;
  startCol: number;
  endRow: number;
  endCol: number;
  cells: CellCoord[];
  colorIndex: number;
}

export interface WordSearchGrid {
  size: number;
  letters: string[][]; // uppercase letters
  placedWords: PlacedWord[];
  unplacedWords: string[];
}

// Letter distribution for kid puzzles (common vowels and friendly letters)
const FREQUENT_LETTERS = 'EEEEAAAIIIOOOTTTNNNSSSRRRHHHLLLDDCCCUUUMMMFFFGGYYPPWWBBVK';

export function generateWordSearch(
  wordList: string[],
  requestedSize = 8,
  allowDiagonals = false,
  allowBackwards = false
): WordSearchGrid {
  const normalizedWords = Array.from(
    new Set(wordList.map((w) => w.trim().toLowerCase()))
  ).filter((w) => w.length > 0);

  // Find longest word length
  const maxWordLength = Math.max(...normalizedWords.map((w) => w.length), 4);
  // Ensure grid size is at least as large as the longest word
  const minSize = Math.max(requestedSize, maxWordLength);

  // Define valid directions
  // [dRow, dCol]
  const directions: [number, number][] = [
    [0, 1], // Horizontal (left to right)
    [1, 0], // Vertical (top to bottom)
  ];

  if (allowDiagonals) {
    directions.push([1, 1]); // Diagonal down-right
  }

  if (allowBackwards) {
    directions.push([0, -1]); // Horizontal right to left
    directions.push([-1, 0]); // Vertical bottom to top
    if (allowDiagonals) {
      directions.push([1, -1]); // Diagonal down-left
      directions.push([-1, 1]); // Diagonal up-right
      directions.push([-1, -1]); // Diagonal up-left
    }
  }

  // Attempt placement with gradual size bump if needed
  for (let attemptSize = minSize; attemptSize <= minSize + 4; attemptSize++) {
    const grid: string[][] = Array.from({ length: attemptSize }, () =>
      Array.from({ length: attemptSize }, () => '')
    );

    const placedWords: PlacedWord[] = [];
    // Sort words by length descending to place harder/longer words first
    const sortedWords = [...normalizedWords].sort((a, b) => b.length - a.length);

    let allPlaced = true;

    for (let i = 0; i < sortedWords.length; i++) {
      const word = sortedWords[i];
      let placed = false;

      // Try random positions first, then fallback to exhaustive search
      const maxTries = 250;
      for (let t = 0; t < maxTries; t++) {
        const [dRow, dCol] = directions[Math.floor(Math.random() * directions.length)];
        const row = Math.floor(Math.random() * attemptSize);
        const col = Math.floor(Math.random() * attemptSize);

        if (canPlaceWord(grid, word, row, col, dRow, dCol, attemptSize)) {
          const cells = placeWord(grid, word, row, col, dRow, dCol);
          placedWords.push({
            word,
            startRow: row,
            startCol: col,
            endRow: row + dRow * (word.length - 1),
            endCol: col + dCol * (word.length - 1),
            cells,
            colorIndex: i % 8,
          });
          placed = true;
          break;
        }
      }

      // If random tries failed, try exhaustive scan
      if (!placed) {
        for (let r = 0; r < attemptSize && !placed; r++) {
          for (let c = 0; c < attemptSize && !placed; c++) {
            for (const [dRow, dCol] of directions) {
              if (canPlaceWord(grid, word, r, c, dRow, dCol, attemptSize)) {
                const cells = placeWord(grid, word, r, c, dRow, dCol);
                placedWords.push({
                  word,
                  startRow: r,
                  startCol: c,
                  endRow: r + dRow * (word.length - 1),
                  endCol: c + dCol * (word.length - 1),
                  cells,
                  colorIndex: i % 8,
                });
                placed = true;
                break;
              }
            }
          }
        }
      }

      if (!placed) {
        allPlaced = false;
        break;
      }
    }

    if (allPlaced) {
      // Fill remaining empty cells with kid-friendly random uppercase letters
      for (let r = 0; r < attemptSize; r++) {
        for (let c = 0; c < attemptSize; c++) {
          if (!grid[r][c]) {
            const randomLetter =
              FREQUENT_LETTERS[Math.floor(Math.random() * FREQUENT_LETTERS.length)];
            grid[r][c] = randomLetter;
          }
        }
      }

      return {
        size: attemptSize,
        letters: grid,
        placedWords,
        unplacedWords: [],
      };
    }
  }

  // Fallback: Return best effort if extreme constraints
  const fallbackSize = Math.max(minSize, 10);
  const fallbackGrid = Array.from({ length: fallbackSize }, () =>
    Array.from({ length: fallbackSize }, () =>
      FREQUENT_LETTERS[Math.floor(Math.random() * FREQUENT_LETTERS.length)]
    )
  );

  return {
    size: fallbackSize,
    letters: fallbackGrid,
    placedWords: [],
    unplacedWords: normalizedWords,
  };
}

function canPlaceWord(
  grid: string[][],
  word: string,
  startRow: number,
  startCol: number,
  dRow: number,
  dCol: number,
  size: number
): boolean {
  const endRow = startRow + dRow * (word.length - 1);
  const endCol = startCol + dCol * (word.length - 1);

  if (endRow < 0 || endRow >= size || endCol < 0 || endCol >= size) {
    return false;
  }

  for (let k = 0; k < word.length; k++) {
    const r = startRow + dRow * k;
    const c = startCol + dCol * k;
    const char = word[k].toUpperCase();
    const existing = grid[r][c];

    if (existing !== '' && existing !== char) {
      return false; // Collision with a different letter
    }
  }

  return true;
}

function placeWord(
  grid: string[][],
  word: string,
  startRow: number,
  startCol: number,
  dRow: number,
  dCol: number
): CellCoord[] {
  const cells: CellCoord[] = [];
  for (let k = 0; k < word.length; k++) {
    const r = startRow + dRow * k;
    const c = startCol + dCol * k;
    const char = word[k].toUpperCase();
    grid[r][c] = char;
    cells.push({ row: r, col: c });
  }
  return cells;
}

// Helper to determine if a line of cells between start and end is valid
export function getLineCells(
  start: CellCoord,
  end: CellCoord,
  allowDiagonals = false
): CellCoord[] | null {
  const deltaRow = end.row - start.row;
  const deltaCol = end.col - start.col;

  // Single cell
  if (deltaRow === 0 && deltaCol === 0) {
    return [start];
  }

  const stepRow = deltaRow === 0 ? 0 : deltaRow > 0 ? 1 : -1;
  const stepCol = deltaCol === 0 ? 0 : deltaCol > 0 ? 1 : -1;

  const isHorizontal = deltaRow === 0 && deltaCol !== 0;
  const isVertical = deltaCol === 0 && deltaRow !== 0;
  const isDiagonal = Math.abs(deltaRow) === Math.abs(deltaCol);

  if (!isHorizontal && !isVertical && (!allowDiagonals || !isDiagonal)) {
    return null; // Not in a straight line
  }

  const length = Math.max(Math.abs(deltaRow), Math.abs(deltaCol)) + 1;
  const cells: CellCoord[] = [];

  for (let i = 0; i < length; i++) {
    cells.push({
      row: start.row + stepRow * i,
      col: start.col + stepCol * i,
    });
  }

  return cells;
}
