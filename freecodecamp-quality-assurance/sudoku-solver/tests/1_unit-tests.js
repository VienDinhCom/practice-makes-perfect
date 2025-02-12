const chai = require('chai');
const assert = chai.assert;
const Solver = require('../controllers/sudoku-solver.js');

suite('Unit Tests', () => {
  let solver;
  let validPuzzle = '1.5..2.84..63.12.7.2..5.....9..1....8.2.3674.3.7.2..9.47...8..1..16....926914.37.';
  let solution = '135762984946381257728459613694517832812936745357824196473298561581673429269145378';

  beforeEach(() => {
    solver = new Solver();
  });

  suite('Input Validation Tests', () => {
    test('Logic handles a valid puzzle string of 81 characters', () => {
      assert.isTrue(solver.validate(validPuzzle));
    });

    test('Logic handles a puzzle string with invalid characters', () => {
      let invalidPuzzle = validPuzzle.replace('.', 'x');
      assert.isFalse(solver.validate(invalidPuzzle));
    });

    test('Logic handles a puzzle string that is not 81 characters', () => {
      let shortPuzzle = validPuzzle.slice(0, -1);
      let longPuzzle = validPuzzle + '1';
      assert.isFalse(solver.validate(shortPuzzle));
      assert.isFalse(solver.validate(longPuzzle));
    });
  });

  suite('Placement Validation Tests', () => {
    test('Logic handles a valid row placement', () => {
      assert.isTrue(solver.checkRowPlacement(validPuzzle, 'A', 2, 3));
    });

    test('Logic handles an invalid row placement', () => {
      // Try to place '1' where it already exists in row A
      assert.isFalse(solver.checkRowPlacement(validPuzzle, 'A', 2, 1));
    });

    test('Logic handles a valid column placement', () => {
      assert.isTrue(solver.checkColPlacement(validPuzzle, 'A', 2, 3));
    });

    test('Logic handles an invalid column placement', () => {
      // Try to place '6' where it already exists in column 2
      assert.isFalse(solver.checkColPlacement(validPuzzle, 'A', 2, 6));
    });

    test('Logic handles a valid region placement', () => {
      assert.isTrue(solver.checkRegionPlacement(validPuzzle, 'A', 2, 3));
    });

    test('Logic handles an invalid region placement', () => {
      // Try to place '5' where it conflicts with the same region
      assert.isFalse(solver.checkRegionPlacement(validPuzzle, 'A', 2, 5));
    });
  });

  suite('Solver Tests', () => {
    test('Valid puzzle strings pass the solver', () => {
      assert.equal(solver.solve(validPuzzle), solution);
    });

    test('Invalid puzzle strings fail the solver', () => {
      // Create an unsolvable puzzle by placing the same number (1) twice in the first row
      let invalidPuzzle = '11...2.84..63.12.7.2..5.....9..1....8.2.3674.3.7.2..9.47...8..1..16....926914.37.';
      assert.isFalse(solver.solve(invalidPuzzle));
    });

    test('Solver returns the expected solution for an incomplete puzzle', () => {
      let incompletePuzzle = '1.5..2.84..63.12.7.2..5.....9..1....8.2.3674.3.7.2..9.47...8..1..16....926914.37.';
      let expectedSolution = '135762984946381257728459613694517832812936745357824196473298561581673429269145378';
      assert.equal(solver.solve(incompletePuzzle), expectedSolution);
    });
  });
});