'use strict';

const SudokuSolver = require('../controllers/sudoku-solver.js');

module.exports = function (app) {

  let solver = new SudokuSolver();
  app.route('/api/solve')
    .post((req, res) => {
      let validatedRequest = solver.validate(req.body, '/api/solve')
      if (validatedRequest) {
        return res.status(200).json(validatedRequest.msg)
      }
    })

  app.route('/api/check')
    .post((req, res) => {
      let validatedRequest = solver.validate(req.body, '/api/check')
      if (validatedRequest) {
        return res.status(200).json(validatedRequest.msg)
      }
    });

  ;
};
