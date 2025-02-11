const chai = require('chai');
const ConvertHandler = require('../controllers/convertHandler.js');

let assert = chai.assert;
let convertHandler = new ConvertHandler();

suite('Unit Tests', function () {
  suite('Function getNum(input)', function () {
    test('Whole number input', function () {
      assert.equal(convertHandler.getNum('32L'), 32);
    });

    test('Decimal Input', function () {
      assert.equal(convertHandler.getNum('3.1mi'), 3.1);
    });

    test('Fractional Input', function () {
      assert.equal(convertHandler.getNum('1/2km'), 0.5);
    });

    test('Fractional Input w/ Decimal', function () {
      assert.equal(convertHandler.getNum('5.4/3lbs'), 1.8);
    });

    test('Invalid Input (double fraction)', function () {
      assert.isNull(convertHandler.getNum('3/2/3kg'));
    });

    test('No Numerical Input', function () {
      assert.equal(convertHandler.getNum('kg'), 1);
    });
  });

  suite('Function getUnit(input)', function () {
    test('For Each Valid Unit Inputs', function () {
      const validUnits = ['gal', 'l', 'mi', 'km', 'lbs', 'kg', 'GAL', 'L', 'MI', 'KM', 'LBS', 'KG'];

      validUnits.forEach(function (unit) {
        assert.isNotNull(convertHandler.getUnit('1' + unit));
      });
    });

    test('Unknown Unit Input', function () {
      assert.isNull(convertHandler.getUnit('1invalid'));
    });

    test('Correct Unit Case Output', function () {
      assert.equal(convertHandler.getUnit('1l'), 'L');
      assert.equal(convertHandler.getUnit('1gal'), 'gal');
    });
  });

  suite('Function getReturnUnit(initUnit)', function () {
    test('For Each Valid Unit Inputs', function () {
      const input = ['gal', 'L', 'mi', 'km', 'lbs', 'kg'];
      const expected = ['L', 'gal', 'km', 'mi', 'kg', 'lbs'];

      input.forEach(function (unit, i) {
        assert.equal(convertHandler.getReturnUnit(unit), expected[i]);
      });
    });
  });

  suite('Function spellOutUnit(unit)', function () {
    test('For Each Valid Unit Inputs', function () {
      const input = ['gal', 'L', 'mi', 'km', 'lbs', 'kg'];
      const expected = ['gallons', 'liters', 'miles', 'kilometers', 'pounds', 'kilograms'];

      input.forEach(function (unit, i) {
        assert.equal(convertHandler.spellOutUnit(unit), expected[i]);
      });
    });
  });

  suite('Function convert(initNum, initUnit)', function () {
    test('Gal to L', function () {
      assert.approximately(convertHandler.convert(1, 'gal').returnNum, 3.78541, 0.00001);
    });

    test('L to Gal', function () {
      assert.approximately(convertHandler.convert(3.78541, 'L').returnNum, 1, 0.00001);
    });

    test('Mi to Km', function () {
      assert.approximately(convertHandler.convert(1, 'mi').returnNum, 1.60934, 0.00001);
    });

    test('Km to Mi', function () {
      assert.approximately(convertHandler.convert(1.60934, 'km').returnNum, 1, 0.00001);
    });

    test('Lbs to Kg', function () {
      assert.approximately(convertHandler.convert(1, 'lbs').returnNum, 0.45359, 0.00001);
    });

    test('Kg to Lbs', function () {
      assert.approximately(convertHandler.convert(0.45359, 'kg').returnNum, 1, 0.00001);
    });

    test('Error on Invalid Input', function () {
      assert.throws(() => convertHandler.convert(null, 'gal'), Error);
      assert.throws(() => convertHandler.convert(1, null), Error);
      assert.throws(() => convertHandler.convert(1, 'invalid'), Error);
    });
  });

  suite('Function getString(initNum, initUnit, returnNum, returnUnit)', function () {
    test('Valid String Output', function () {
      const result = convertHandler.getString(1, 'gal', 3.78541, 'L');

      assert.equal(result, '1 gallons converts to 3.78541 liters');
    });
  });
});
