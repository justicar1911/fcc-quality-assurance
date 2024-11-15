class SudokuSolver {
  // Convert String to Board Array
  stringToBoard(puzzleString) {
    let board = []
    for (let i = 0; i < 9; i++) {
      let row = puzzleString.slice(i * 9, (i + 1) * 9).split('')
      board.push(row)
    }
    return board
  }

  // Convert Board Array to String
  boardToString(board) {
    return board.map(row => row.join('')).join('')
  }

  // Convert "A1" coordinate to [row, col] format
  convertCoordinate(coordinate) {
    let row = coordinate[0].toUpperCase().charCodeAt() - 65
    let col = coordinate[1] - 1

    return [row, col]
  }

  // Validate the request
  validate(data, route) {
    let { puzzle: puzzleString, coordinate, value } = data

    // If the object submitted to /api/check is missing puzzle, coordinate or value
    if (route == '/api/check') {
      if (!puzzleString || !coordinate || !value) {
        return { msg: { error: 'Required field(s) missing' } }
      }
    }

    // If the object submitted to /api/solve is missing puzzle
    if (!puzzleString) {
      return { msg: { error: 'Required field missing' } }
    }

    // If the puzzle submitted to /api/solve and /api/check contains values which are not numbers or periods
    if (/[^1-9\.]/.test(puzzleString)) {
      return { msg: { error: 'Invalid characters in puzzle' } }
    }

    // If the puzzle submitted to /api/solve and /api/check is greater or less than 81 characters,
    if (puzzleString.length !== 81) {
      return { msg: { error: 'Expected puzzle to be 81 characters long' } }
    }

    if (route == '/api/solve') {
      let solution = this.solveSudoku(puzzleString)
      if (solution == puzzleString) {
        return { msg: { error: 'Puzzle cannot be solved' } }
      }
      return { msg: { solution } }
    }

    if (route == '/api/check') {
      // If the value submitted to /api/check is not a number between 1 and 9
      if (!/^[1-9]$/i.test(value)) {
        return { msg: { error: 'Invalid value' } }
      }

      // If the coordinate submitted to api/check does not point to an existing grid cell
      if (!/^[a-i][1-9]$/i.test(coordinate)) {
        return { msg: { error: 'Invalid coordinate' } }
      }

      let board = this.stringToBoard(puzzleString)
      let [row, col] = this.convertCoordinate(coordinate)

      // If value submitted to /api/check is already placed in puzzle on that coordinate
      if (board[row][col] == parseInt(value)) {
        return { msg: { valid: true } }
      }

      // The return value from the POST to /api/check will be an object containing a valid property, which is true if the number may be placed at the provided coordinate and false if the number may not. If false, the returned object will also contain a conflict property which is an array containing the strings "row", "column", and/or "region" depending on which makes the placement invalid.
      let conflictResult = this.isConflict(board, row, col, value)

      return conflictResult ? conflictResult : { msg: { valid: true } }
    }
  }

  checkRowPlacement(board, row, column, value) {
    for (let i = 0; i < 9; i++) {
      if (board[row][i] == value.toString() && i !== column) {
        return { conflict: "row" }
      }
    }
    return false
  }

  checkColPlacement(board, row, column, value) {
    for (let i = 0; i < 9; i++) {
      if (board[i][column] == value.toString() && i !== row) {
        return { conflict: "column" }
      }
    }
    return false
  }

  checkRegionPlacement(board, row, column, value) {
    const boxRow = Math.floor(row / 3) * 3;
    const boxCol = Math.floor(column / 3) * 3;
    for (let i = 0; i < 3; i++) {
      for (let j = 0; j < 3; j++) {
        if (board[boxRow + i][boxCol + j] === value) {
          return { conflict: "region" }
        }
      }
    }
    return false;
  };

  isConflict(board, row, column, value) {
    let rowConflict = this.checkRowPlacement(board, row, column, value)
    let columnConflict = this.checkColPlacement(board, row, column, value)
    let regionConflict = this.checkRegionPlacement(board, row, column, value)

    if (rowConflict || columnConflict || regionConflict) {
      return {
        msg: {
          valid: false,
          conflict: [rowConflict?.conflict, columnConflict?.conflict, regionConflict?.conflict].filter(value => value !== undefined)
        }
      }
    }

    return false
  }

  solveSudoku(puzzleString) {
    const board = this.stringToBoard(puzzleString)

    // Find first row, col which contain "." value
    const findEmptyCell = () => {
      for (let row = 0; row < 9; row++) {
        for (let col = 0; col < 9; col++) {
          if (board[row][col] == '.') return [row, col]
        }
      }
      return null
    }

    const solve = () => {
      const cell = findEmptyCell()
      if (!cell) return true // Puzzle solved

      const [row, col] = cell
      for (let num = 1; num <= 9; num++) {
        if (!this.isConflict(board, row, col, num.toString())) {
          board[row][col] = num.toString();

          if (solve()) return true
          board[row][col] = '.';
        }
      }
      return false; // Backtracking
    }

    solve()
    return this.boardToString(board)
  };
}


module.exports = SudokuSolver;

