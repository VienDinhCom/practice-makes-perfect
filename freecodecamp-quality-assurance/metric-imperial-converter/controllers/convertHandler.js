const convertUnits = {
  gal: 'l',
  l: 'gal',
  mi: 'km',
  km: 'mi',
  lbs: 'kg',
  kg: 'lbs',
};

const spellOutUnits = {
  gal: 'gallons',
  l: 'litters',
  mi: 'miles',
  km: 'kilometers',
  lbs: 'pounds',
  kg: 'kilograms',
};

function ConvertHandler() {
  this.getNum = function (input = '') {
    return Number(input.match(/^\d+(?:\/\/\d+)?(?=[a-zA-Z])/)[0]);
  };

  this.getUnit = function (input) {
    const unit = input.match(/[A-Za-z]+$/)[0].toLowerCase();

    return spellOutUnits[unit] ? unit : null;
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

    const returnNum = (() => {
      switch (initUnit) {
        case 'gal':
          return initNum * galToL;

        case 'L':
          return initNum / galToL;

        case 'lbs':
          return initNum * lbsToKg;

        case 'kg':
          return initNum / lbsToKg;

        case 'mi':
          return initNum * miToKm;

        case 'km':
          return initNum / miToKm;

        default:
          throw new Error('Input is invalid');
      }
    })();

    const returnUnit = this.getReturnUnit(initUnit);
    const string = this.getString(initNum, initUnit, returnNum, returnUnit);

    // console.log({ initNum, initUnit, returnNum, returnUnit, string });

    return {
      initNum,
      initUnit,
      returnNum,
      returnUnit,
      string,
    };
  };

  this.getString = function (initNum, initUnit, returnNum, returnUnit) {
    let result;

    return `${initNum} ${this.spellOutUnit(initUnit)} converts to ${returnNum} ${this.spellOutUnit(returnUnit)}`;
  };
}

module.exports = ConvertHandler;
