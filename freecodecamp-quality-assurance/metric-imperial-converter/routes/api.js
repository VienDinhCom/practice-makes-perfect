'use strict';

const expect = require('chai').expect;
const ConvertHandler = require('../controllers/convertHandler.js');

module.exports = function (app) {
  let convertHandler = new ConvertHandler();

  app.get('/api/convert', (req, res) => {
    const input = req.query.input;

    const initNum = convertHandler.getNum(input);
    const initUnit = convertHandler.getUnit(input);

    if (initNum === null && initUnit === null) return res.send('invalid number and unit');
    if (initNum === null) return res.send('invalid number');
    if (initUnit === null) return res.send('invalid unit');

    console.log({ input, initNum, initUnit });

    const result = convertHandler.convert(initNum, initUnit);

    res.status(200).json(result);
  });
};
