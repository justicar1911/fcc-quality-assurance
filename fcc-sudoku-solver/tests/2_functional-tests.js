const chai = require("chai");
const chaiHttp = require('chai-http');
const assert = chai.assert;
const server = require('../server');

chai.use(chaiHttp);

suite('Functional Tests', () => {
    let validPuzzleString = '1.5..2.84..63.12.7.2..5.....9..1....8.2.3674.3.7.2..9.47...8..1..16....926914.37.'
    let expectedSolution = '135762984946381257728459613694517832812936745357824196473298561581673429269145378'
    let invalidPuzzleString = 'A.5..2.84..63.12.7.2..5.....9..1....8.2.3674.3.7.2..9.47...8..1..16....926914.37.'
    let incorectLenghthPuzzleString = '1.5..2.84..63.12.7.2..5....9..1....8.2.3674.3.7.2..9.47...8..1..16....926914.37.'
    let cannotSolvePuzzleString = '..9..5.1.85.4....2432......1...6988.39.....6.62.71...9......1945....4.37.4.3..6..'
    // #1
    test('Solve a puzzle with valid puzzle string: POST request to /api/solve', function (done) {
        chai
            .request(server)
            .post('/api/solve')
            .send({
                puzzle: validPuzzleString
            })
            .end((err, res) => {
                assert.equal(res.status, 200)
                assert.isObject(res.body, 'Response should be an Object');
                assert.property(res.body, 'solution', 'Response should include solution property');
                assert.equal(res.body.solution, expectedSolution, 'Solution should be match');
                done()
            })
    })

    // #2
    test('Solve a puzzle with missing puzzle string: POST request to /api/solve', function (done) {
        chai
            .request(server)
            .post('/api/solve')
            .send({
            })
            .end((err, res) => {
                assert.equal(res.status, 200)
                assert.isObject(res.body, 'Response should be an Object');
                assert.property(res.body, 'error', 'Response should include error property');
                assert.equal(res.body.error, "Required field missing", 'Error message should be match');
                done()
            })
    })

    // #3
    test('Solve a puzzle with invalid characters: POST request to /api/solve', function (done) {
        chai
            .request(server)
            .post('/api/solve')
            .send({
                puzzle: invalidPuzzleString
            })
            .end((err, res) => {
                assert.equal(res.status, 200)
                assert.isObject(res.body, 'Response should be an Object');
                assert.property(res.body, 'error', 'Response should include error property');
                assert.equal(res.body.error, "Invalid characters in puzzle", 'Error message should be match');
                done()
            })
    })

    // #4
    test('Solve a puzzle with incorrect length: POST request to /api/solve', function (done) {
        chai
            .request(server)
            .post('/api/solve')
            .send({
                puzzle: incorectLenghthPuzzleString
            })
            .end((err, res) => {
                assert.equal(res.status, 200)
                assert.isObject(res.body, 'Response should be an Object');
                assert.property(res.body, 'error', 'Response should include error property');
                assert.equal(res.body.error, "Expected puzzle to be 81 characters long", 'Error message should be match');
                done()
            })
    })

    // #5
    test('Solve a puzzle that cannot be solved: POST request to /api/solve', function (done) {
        chai
            .request(server)
            .post('/api/solve')
            .send({
                puzzle: cannotSolvePuzzleString
            })
            .end((err, res) => {
                assert.equal(res.status, 200)
                assert.isObject(res.body, 'Response should be an Object');
                assert.property(res.body, 'error', 'Response should include error property');
                assert.equal(res.body.error, "Puzzle cannot be solved", 'Error message should be match');
                done()
            })
    })

    // #6
    test('Check a puzzle placement with all fields: POST request to /api/check', function (done) {
        chai
            .request(server)
            .post('/api/check')
            .send({
                puzzle: validPuzzleString,
                coordinate: 'A1',
                value: '1'
            })
            .end((err, res) => {
                assert.equal(res.status, 200)
                assert.isObject(res.body, 'Response should be an Object');
                assert.property(res.body, 'valid', 'Response should include valid property');
                assert.isTrue(res.body.valid, 'Valid value should be match');
                done()
            })
    })

    // #7
    test('Check a puzzle placement with single placement conflict: POST request to /api/check', function (done) {
        chai
            .request(server)
            .post('/api/check')
            .send({
                puzzle: validPuzzleString,
                coordinate: 'A2',
                value: '7'
            })
            .end((err, res) => {
                assert.equal(res.status, 200)
                assert.isObject(res.body, 'Response should be an Object');
                assert.property(res.body, 'valid', 'Response should include valid property');
                assert.isFalse(res.body.valid, 'Valid value should be match');
                assert.property(res.body, 'conflict', 'Response should include conflict property');
                assert.isArray(res.body.conflict, 'conflict should be match');
                assert.equal(res.body.conflict.length, 1, 'Should have single placement conflict')
                done()
            })
    })

    // #7
    test('Check a puzzle placement with multiple placement conflicts: POST request to /api/check', function (done) {
        chai
            .request(server)
            .post('/api/check')
            .send({
                puzzle: validPuzzleString,
                coordinate: 'A2',
                value: '5'
            })
            .end((err, res) => {
                assert.equal(res.status, 200)
                assert.isObject(res.body, 'Response should be an Object');
                assert.property(res.body, 'valid', 'Response should include valid property');
                assert.isFalse(res.body.valid, 'Valid value should be match');
                assert.property(res.body, 'conflict', 'Response should include conflict property');
                assert.isArray(res.body.conflict, 'conflict should be match');
                assert.equal(res.body.conflict.length, 2, 'Should have multiple placement conflict')
                done()
            })
    })

    // #8
    test('Check a puzzle placement with all placement conflicts: POST request to /api/check', function (done) {
        chai
            .request(server)
            .post('/api/check')
            .send({
                puzzle: validPuzzleString,
                coordinate: 'A2',
                value: '2'
            })
            .end((err, res) => {
                assert.equal(res.status, 200)
                assert.isObject(res.body, 'Response should be an Object');
                assert.property(res.body, 'valid', 'Response should include valid property');
                assert.isFalse(res.body.valid, 'Valid value should be match');
                assert.property(res.body, 'conflict', 'Response should include conflict property');
                assert.isArray(res.body.conflict, 'conflict should be match');
                assert.equal(res.body.conflict.length, 3, 'Should have multiple placement conflict')
                done()
            })
    })

    // #9
    test('Check a puzzle placement with missing required fields: POST request to /api/check', function (done) {
        chai
            .request(server)
            .post('/api/check')
            .send({
                puzzle: validPuzzleString
            })
            .end((err, res) => {
                assert.equal(res.status, 200)
                assert.isObject(res.body, 'Response should be an Object');
                assert.property(res.body, 'error', 'Response should include error property');
                assert.equal(res.body.error, "Required field(s) missing", 'Error message should be match');
                done()
            })
    })

    // #10
    test('Check a puzzle placement with invalid characters: POST request to /api/check', function (done) {
        chai
            .request(server)
            .post('/api/check')
            .send({
                puzzle: invalidPuzzleString,
                coordinate: 'A2',
                value: '2'
            })
            .end((err, res) => {
                assert.equal(res.status, 200)
                assert.isObject(res.body, 'Response should be an Object');
                assert.property(res.body, 'error', 'Response should include error property');
                assert.equal(res.body.error, "Invalid characters in puzzle", 'Error message should be match');
                done()
            })
    })

    // #11
    test('Check a puzzle placement with incorrect length: POST request to /api/check', function (done) {
        chai
            .request(server)
            .post('/api/check')
            .send({
                puzzle: incorectLenghthPuzzleString,
                coordinate: 'A2',
                value: '2'
            })
            .end((err, res) => {
                assert.equal(res.status, 200)
                assert.isObject(res.body, 'Response should be an Object');
                assert.property(res.body, 'error', 'Response should include error property');
                assert.equal(res.body.error, "Expected puzzle to be 81 characters long", 'Error message should be match');
                done()
            })
    })

    // #12
    test('Check a puzzle placement with invalid placement coordinate: POST request to /api/check', function (done) {
        chai
            .request(server)
            .post('/api/check')
            .send({
                puzzle: validPuzzleString,
                coordinate: 'Z2',
                value: '2'
            })
            .end((err, res) => {
                assert.equal(res.status, 200)
                assert.isObject(res.body, 'Response should be an Object');
                assert.property(res.body, 'error', 'Response should include error property');
                assert.equal(res.body.error, "Invalid coordinate", 'Error message should be match');
                done()
            })
    })

    // #13
    test('Check a puzzle placement with invalid placement value: POST request to /api/check', function (done) {
        chai
            .request(server)
            .post('/api/check')
            .send({
                puzzle: validPuzzleString,
                coordinate: 'A2',
                value: '11'
            })
            .end((err, res) => {
                assert.equal(res.status, 200)
                assert.isObject(res.body, 'Response should be an Object');
                assert.property(res.body, 'error', 'Response should include error property');
                assert.equal(res.body.error, "Invalid value", 'Error message should be match');
                done()
            })
    })
});

