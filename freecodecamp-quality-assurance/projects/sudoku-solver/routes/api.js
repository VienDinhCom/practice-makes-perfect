'use strict';

const SudokuSolver = require('../controllers/sudoku-solver.js');

module.exports = function (app) {
  let solver = new SudokuSolver();

  app.route('/api/check').post((req, res) => {
    const { puzzle, coordinate, value } = req.body;

    // Check if all fields are present
    if (!puzzle || !coordinate || !value) {
      return res.json({ error: 'Required field(s) missing' });
    }

    // Validate puzzle string
    if (!solver.validate(puzzle)) {
      if (puzzle.length !== 81) {
        return res.json({ error: 'Expected puzzle to be 81 characters long' });
      }

      return res.json({ error: 'Invalid characters in puzzle' });
    }

    // Validate coordinate format
    if (!/^[A-I][1-9]$/.test(coordinate)) {
      return res.json({ error: 'Invalid coordinate' });
    }

    // Validate value
    if (!/^[1-9]$/.test(value)) {
      return res.json({ error: 'Invalid value' });
    }

    const row = coordinate[0];
    const column = parseInt(coordinate[1]);

    // Check if value is already placed at coordinate
    const index = (row.charCodeAt(0) - 65) * 9 + (column - 1);

    if (puzzle[index] === value.toString()) {
      return res.json({ valid: true });
    }

    // Check placement validity
    const rowValid = solver.checkRowPlacement(puzzle, row, column, value);
    const colValid = solver.checkColPlacement(puzzle, row, column, value);
    const regionValid = solver.checkRegionPlacement(puzzle, row, column, value);

    const conflicts = [];

    if (!rowValid) conflicts.push('row');
    if (!colValid) conflicts.push('column');
    if (!regionValid) conflicts.push('region');

    res.json({
      valid: conflicts.length === 0,
      conflict: conflicts.length > 0 ? conflicts : undefined,
    });
  });

  app.route('/api/solve').post((req, res) => {
    const { puzzle } = req.body;

    if (!puzzle) {
      return res.json({ error: 'Required field missing' });
    }

    if (!solver.validate(puzzle)) {
      if (puzzle.length !== 81) {
        return res.json({ error: 'Expected puzzle to be 81 characters long' });
      }
      return res.json({ error: 'Invalid characters in puzzle' });
    }

    const solution = solver.solve(puzzle);

    if (!solution) {
      return res.json({ error: 'Puzzle cannot be solved' });
    }

    res.json({ solution });
  });
};
