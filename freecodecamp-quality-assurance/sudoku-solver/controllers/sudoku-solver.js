class SudokuSolver {
  validate(puzzleString) {
    if (!puzzleString) return false;
    if (puzzleString.length !== 81) return false;
    if (!/^[1-9.]+$/.test(puzzleString)) return false;
    return true;
  }

  checkRowPlacement(puzzleString, row, column, value) {
    // Convert row from letter (A-I) to number (0-8)
    const rowIndex = row.charCodeAt(0) - 65;
    const rowStart = rowIndex * 9;
    const rowValues = puzzleString.slice(rowStart, rowStart + 9);

    // Don't count the value at the current position
    const currentPos = column - 1;
    return !rowValues
      .split('')
      .filter((_, index) => index !== currentPos)
      .includes(value.toString());
  }

  checkColPlacement(puzzleString, row, column, value) {
    const colIndex = column - 1;
    const colValues = [];

    // Extract column values
    for (let i = 0; i < 9; i++) {
      colValues.push(puzzleString[i * 9 + colIndex]);
    }

    // Don't count the value at the current position
    const rowIndex = row.charCodeAt(0) - 65;

    return !colValues.filter((_, index) => index !== rowIndex).includes(value.toString());
  }

  checkRegionPlacement(puzzleString, row, column, value) {
    const rowIndex = row.charCodeAt(0) - 65;
    const colIndex = column - 1;

    // Find the top-left corner of the 3x3 region
    const regionRow = Math.floor(rowIndex / 3) * 3;
    const regionCol = Math.floor(colIndex / 3) * 3;

    // Check all cells in the region
    for (let i = 0; i < 3; i++) {
      for (let j = 0; j < 3; j++) {
        const cellIndex = (regionRow + i) * 9 + (regionCol + j);
        if (cellIndex !== rowIndex * 9 + colIndex && puzzleString[cellIndex] === value.toString()) {
          return false;
        }
      }
    }

    return true;
  }

  solve(puzzleString) {
    if (!this.validate(puzzleString)) return false;

    const board = puzzleString.split('').map((char) => (char === '.' ? 0 : parseInt(char)));

    const solveRecursive = (board) => {
      // Find an empty cell
      const emptyCell = board.findIndex((cell) => cell === 0);

      if (emptyCell === -1) return true; // Puzzle is solved

      const row = String.fromCharCode(Math.floor(emptyCell / 9) + 65);
      const col = (emptyCell % 9) + 1;

      // Try digits 1-9
      for (let num = 1; num <= 9; num++) {
        // Convert board back to string format for checking
        const boardString = board.join('');

        // Check if placement is valid
        if (
          this.checkRowPlacement(boardString, row, col, num) &&
          this.checkColPlacement(boardString, row, col, num) &&
          this.checkRegionPlacement(boardString, row, col, num)
        ) {
          board[emptyCell] = num;

          if (solveRecursive(board)) return true;

          board[emptyCell] = 0; // Backtrack
        }
      }

      return false;
    };

    if (solveRecursive(board)) {
      return board.join('');
    }

    return false;
  }
}

module.exports = SudokuSolver;
