'use strict';
const express = require('express');
const app = express()

const expect = require('chai').expect;
const ConvertHandler = require('../controllers/convertHandler.js');

module.exports = function (app) {

  let convertHandler = new ConvertHandler();

  app.route('/api/convert').get((req, res) => {
    let { input } = req.query
    let initNum = convertHandler.getNum(input)
    let initUnit = convertHandler.getUnit(input)

    if (initNum == 'invalid' && initUnit == 'invalid') {
      return res.status(200).send("invalid number and unit")
    }

    if (initUnit == 'invalid') {
      return res.status(200).send("invalid unit")
    }

    if (initNum == 'invalid') {
      return res.status(200).send("invalid number")
    }

    let returnNum = convertHandler.convert(initNum, initUnit)
    let returnUnit = convertHandler.getReturnUnit(initUnit)
    let string = convertHandler.getString(initNum, initUnit, returnNum, returnUnit)

    return res.status(200).json({
      initNum: +initNum,
      initUnit,
      returnNum: +returnNum,
      returnUnit,
      string
    })
  })

};
