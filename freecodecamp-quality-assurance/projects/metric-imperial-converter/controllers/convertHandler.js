const mathjs = require('mathjs');

const convertUnits = {
  gal: 'L',
  L: 'gal',
  mi: 'km',
  km: 'mi',
  lbs: 'kg',
  kg: 'lbs',
};

const spellOutUnits = {
  gal: 'gallons',
  L: 'liters',
  mi: 'miles',
  km: 'kilometers',
  lbs: 'pounds',
  kg: 'kilograms',
};

function ConvertHandler() {
  this.getNum = function (input) {
    // If no number is provided, return 1
    if (!input.match(/[0-9]/)) return 1;

    // Extract number part
    const numStr = input.match(/^[0-9./]+/);

    if (!numStr) return null;

    // Validate and evaluate the number
    try {
      // Check for multiple fractions
      if ((numStr[0].match(/\//g) || []).length > 1) return null;

      return mathjs.evaluate(numStr[0]);
    } catch (e) {
      return null;
    }
  };

  this.getUnit = function (input) {
    const unit = input.match(/[a-zA-Z]+$/);

    if (!unit) return null;

    // Normalize unit
    let unitStr = unit[0].toLowerCase();
    if (unitStr === 'l') unitStr = 'L';

    return Object.keys(convertUnits).includes(unitStr) ? unitStr : null;
  };

  this.getReturnUnit = function (initUnit) {
    return convertUnits[initUnit];
  };

  this.spellOutUnit = function (unit) {
    return spellOutUnits[unit];
  };

  this.convert = function (initNum, initUnit) {
    const galToL = 3.78541;
    const lbsToKg = 0.453592;
    const miToKm = 1.60934;

    if (initNum === null || initUnit === null) {
      throw new Error('Invalid number or unit');
    }

    let returnNum;

    switch (initUnit.toLowerCase()) {
      case 'gal':
        returnNum = initNum * galToL;
        break;

      case 'l':
        returnNum = initNum / galToL;
        break;

      case 'lbs':
        returnNum = initNum * lbsToKg;
        break;

      case 'kg':
        returnNum = initNum / lbsToKg;
        break;

      case 'mi':
        returnNum = initNum * miToKm;
        break;

      case 'km':
        returnNum = initNum / miToKm;
        break;

      default:
        throw new Error('Invalid unit');
    }

    // Round to 5 decimal places
    returnNum = Math.round(returnNum * 100000) / 100000;

    const returnUnit = this.getReturnUnit(initUnit);
    const string = this.getString(initNum, initUnit, returnNum, returnUnit);

    return {
      initNum,
      initUnit,
      returnNum,
      returnUnit,
      string,
    };
  };

  this.getString = function (initNum, initUnit, returnNum, returnUnit) {
    return `${initNum} ${this.spellOutUnit(initUnit)} converts to ${returnNum} ${this.spellOutUnit(returnUnit)}`;
  };
}

module.exports = ConvertHandler;
