function ConvertHandler() {
  this.getNum = function (input) {
    return parseInt(input.match(/^[\d/]+/)[0] || '0');
  };

  this.getUnit = function (input) {
    return input.match(/[a-z]+$/i)[0];
  };

  this.getReturnUnit = function (initUnit) {
    switch (initUnit) {
      case 'gal':
        return 'L';

      case 'L':
        return 'gal';

      case 'lbs':
        return 'kg';

      case 'kg':
        return 'lbs';

      case 'mi':
        return 'km';

      case 'km':
        return 'mi';

      default:
        throw new Error('Unit is not valid.');
    }
  };

  this.spellOutUnit = function (unit) {
    switch (unit) {
      case 'gal':
        return 'gallons';

      case 'L':
        return 'liters';

      case 'lbs':
        return 'pounds';

      case 'kg':
        return 'kilograms';

      case 'mi':
        return 'miles';

      case 'km':
        return 'kilometers';

      default:
        throw new Error('Unit is not valid.');
    }
  };

  this.convert = function (initNum, initUnit) {
    let returnNum = (() => {
      const galToL = 3.78541;
      const lbsToKg = 0.453592;
      const miToKm = 1.60934;

      switch (initUnit) {
        case 'gal':
          return initNum * galToL;

        case 'L':
          return parseFloat((initNum / galToL).toFixed(5));

        case 'lbs':
          return 'pounds';

        case 'kg':
          return 'kilograms';

        case 'mi':
          return 'miles';

        case 'km':
          return 'kilometers';

        default:
          throw new Error('Unit is not valid.');
      }
    })();

    let returnUnit = this.getReturnUnit(initUnit);
    let string = this.getString(initNum, initUnit, returnNum, returnUnit);

    return { initNum, initUnit, returnNum, returnUnit, string };
  };

  this.getString = function (initNum, initUnit, returnNum, returnUnit) {
    return `${initNum} ${this.spellOutUnit(initUnit)} converts to ${returnNum} ${this.spellOutUnit(returnUnit)}`;
  };
}

module.exports = ConvertHandler;
