const chai = require('chai');
const assert = chai.assert;

const Solver = require('../controllers/sudoku-solver.js');
let solver = new Solver();

suite('Unit Tests', () => {
    let validPuzzleString = '1.5..2.84..63.12.7.2..5.....9..1....8.2.3674.3.7.2..9.47...8..1..16....926914.37.';
    let invalidPuzzleStringCharacters = '1.5..2.84..63.12.7.2..5..A..9..1....8.2.3674.3.7.2..9.47...8..1..16....926914.37.';
    let invalidPuzzleStringLength = '1.5..2.84..63.12.7.2..5.....9..1....8.2.3674.3.7.2..9.47...8..1..16....926914.3';

    test('Logic handles a valid puzzle string of 81 characters', function () {
        assert.equal(validPuzzleString.length, 81, 'The length of puzzleString should be 81');
    });

    test('Logic handles a puzzle string with invalid characters (not 1-9 or .)', function () {
        let result = solver.validate({ puzzle: invalidPuzzleStringCharacters }, '/api/solve');
        assert.propertyVal(result.msg, 'error', 'Invalid characters in puzzle', 'Puzzle with invalid characters should throw an error');
    });

    test('Logic handles a puzzle string that is not 81 characters in length', function () {
        let result = solver.validate({ puzzle: invalidPuzzleStringLength }, '/api/solve');
        assert.propertyVal(result.msg, 'error', 'Expected puzzle to be 81 characters long', 'Puzzle with invalid length should throw an error');
    });

    test('Logic handles a valid row placement', function () {
        let board = solver.stringToBoard(validPuzzleString);
        let result = solver.checkRowPlacement(board, 0, 2, '5');
        assert.isFalse(result, 'Valid row placement should return false for conflicts');
    });

    test('Logic handles an invalid row placement', function () {
        let board = solver.stringToBoard(validPuzzleString);
        let result = solver.checkRowPlacement(board, 0, 2, '1');
        assert.isObject(result, 'Invalid row placement should return a conflict object');
        assert.propertyVal(result, 'conflict', 'row', 'Conflict type should be "row"');
    });

    test('Logic handles a valid column placement', function () {
        let board = solver.stringToBoard(validPuzzleString);
        let result = solver.checkColPlacement(board, 0, 2, '5');
        assert.isFalse(result, 'Valid column placement should return false for conflicts');
    });

    test('Logic handles an invalid column placement', function () {
        let board = solver.stringToBoard(validPuzzleString);
        let result = solver.checkColPlacement(board, 0, 2, '6');
        assert.isObject(result, 'Invalid column placement should return a conflict object');
        assert.propertyVal(result, 'conflict', 'column', 'Conflict type should be "column"');
    });

    test('Logic handles a valid region (3x3 grid) placement', function () {
        let board = solver.stringToBoard(validPuzzleString);
        let result = solver.checkRegionPlacement(board, 0, 2, '3');
        assert.isFalse(result, 'Valid region placement should return false for conflicts');
    });

    test('Logic handles an invalid region (3x3 grid) placement', function () {
        let board = solver.stringToBoard(validPuzzleString);
        let result = solver.checkRegionPlacement(board, 0, 1, '5');

        assert.isObject(result, 'Invalid region placement should return a conflict object');
        assert.propertyVal(result, 'conflict', 'region', 'Conflict type should be "region"');
    });

    test('Valid puzzle strings pass the solver', function () {
        let result = solver.validate({ puzzle: validPuzzleString }, '/api/solve');
        assert.property(result.msg, 'solution', 'Solver should return a solution for valid puzzle strings');
    });

    test('Invalid puzzle strings fail the solver', function () {
        let result = solver.validate({ puzzle: invalidPuzzleStringCharacters }, '/api/solve');
        assert.propertyVal(result.msg, 'error', 'Invalid characters in puzzle', 'Invalid puzzle strings should return an error');
    });

    test('Solver returns the expected solution for an incomplete puzzle', function () {
        let solution = solver.solveSudoku(validPuzzleString);
        let expectedSolution = '135762984946381257728459613694517832812936745357824196473298561581673429269145378';
        assert.equal(solution, expectedSolution, 'Solver should return the correct solution for the puzzle');
    });
});
