function ConvertHandler() {

  this.getNum = function (input) {
    let unitRegex = /(gal|L|mi|km|lbs|kg)$/i;
    let initNum = input.replace(unitRegex, '')

    if (!initNum) {
      return 1
    }

    if (initNum.length == input.length) {
      initNum = input.replace(/\D+/, '')
    }

    // HANDLE INVALID NUMBER
    // More than 2 slashes
    let slashRegex = /\/.*\//
    // Include + - * operands
    let operatorRegex = /[\+|\-|\*]/
    // Match any word (except +-*/.)
    let wordRegex = /[^0-9|\+|\-|\*|\/|\.]+/

    if (slashRegex.test(initNum) || operatorRegex.test(initNum) || wordRegex.test(initNum)) {
      return 'invalid'
    }


    return eval(initNum)
  };

  this.getUnit = function (input) {
    // let unitRegex = /^(\d*)(gal|L|mi|km|lbs|kg)$/i;
    let unitRegex = /(gal|L|mi|km|lbs|kg)$/i;


    // Handle Invalid Unit
    let initUnit = input.match(unitRegex)

    if (!initUnit) {
      return 'invalid'
    }

    return (initUnit[0] == 'l' || initUnit[0] == 'L') ? initUnit[0].toUpperCase() : initUnit[0].toLowerCase()
  };

  this.getReturnUnit = function (initUnit) {
    let mapping = {
      'gal': 'L',
      'L': 'gal',
      'mi': 'km',
      'km': 'mi',
      'lbs': 'kg',
      'kg': 'lbs'
    }

    let returnUnit = mapping[initUnit]

    return returnUnit;
  };

  this.spellOutUnit = function (unit) {
    let mapping = {
      'gal': 'gallons',
      'L': 'liters',
      'mi': 'miles',
      'km': 'kilometers',
      'lbs': 'pounds',
      'kg': 'kilograms'
    }

    let unitName = mapping[unit]

    return unitName;
  };

  this.convert = function (initNum, initUnit) {
    const galToL = 3.78541;
    const miToKm = 1.60934;
    const lbsToKg = 0.453592;

    let mapping = {
      'gal': galToL,
      'L': 1 / galToL,
      'mi': miToKm,
      'km': 1 / miToKm,
      'lbs': lbsToKg,
      'kg': 1 / lbsToKg
    }

    let returnNum = initNum * mapping[initUnit]
    return returnNum.toFixed(5)
  };

  this.getString = function (initNum, initUnit, returnNum, returnUnit) {

    let initUnitName = this.spellOutUnit(initUnit)
    let returnUnitName = this.spellOutUnit(returnUnit)

    let string = `${initNum} ${initUnitName} converts to ${returnNum} ${returnUnitName}`

    return string;
  };

}

module.exports = ConvertHandler;
