const chai = require('chai');
let assert = chai.assert;
const ConvertHandler = require('../controllers/convertHandler.js');

let convertHandler = new ConvertHandler();

suite('Unit Tests', function () {
    // #1
    test('convertHandler should correctly read a whole number input.', function () {
        assert.equal(convertHandler.getNum('32gal'), 32, 'whole number input should be correctly');
        assert.equal(convertHandler.getNum('4mi'), 4, 'whole number input should be correctly');
        assert.equal(convertHandler.getNum('8lbs'), 8, 'whole number input should be correctly');
    });
    // #2
    test('convertHandler should correctly read a decimal number input.', function () {
        assert.equal(convertHandler.getNum('5.4L'), 5.4, 'decimal number input should be correctly');
        assert.equal(convertHandler.getNum('8.33km'), 8.33, 'decimal number input should be correctly');
        assert.equal(convertHandler.getNum('7.921kg'), 7.921, 'decimal number input should be correctly');
    });
    // #3
    test('convertHandler should correctly read a fractional input.', function () {
        assert.equal(convertHandler.getNum('8/4gal'), 8 / 4, 'fractional number input should be correctly');
        assert.equal(convertHandler.getNum('3/2L'), 3 / 2, 'fractional number input should be correctly');
        assert.equal(convertHandler.getNum('1/99kg'), 1 / 99, 'fractional number input should be correctly');
    });
    // #4
    test('convertHandler should correctly read a fractional input with a decimal.', function () {
        assert.equal(convertHandler.getNum('5/4gal'), 5 / 4, ' fractional input with a decimal should be correctly');
        assert.equal(convertHandler.getNum('3/2L'), 3 / 2, ' fractional input with a decimal should be correctly');
        assert.equal(convertHandler.getNum('1/99kg'), 1 / 99, ' fractional input with a decimal should be correctly');
    });
    // #5
    test('convertHandler should correctly return an error on a double-fraction (i.e. 3/2/3).', function () {
        assert.equal(convertHandler.getNum('3/2/3L'), 'invalid', 'double-fraction should return invalid');
        assert.equal(convertHandler.getNum('3/2/3kg'), 'invalid', 'double-fraction should return invalid');
        assert.equal(convertHandler.getNum('3/2/3mi'), 'invalid', 'double-fraction should return invalid');
    });
    // #6
    test('convertHandler should correctly default to a numerical input of 1 when no numerical input is provided.', function () {
        assert.equal(convertHandler.getNum('gal'), 1, ' default to a numerical input of 1 when no numerical input is provided');
        assert.equal(convertHandler.getNum('L'), 1, ' default to a numerical input of 1 when no numerical input is provided');
        assert.equal(convertHandler.getNum('mi'), 1, ' default to a numerical input of 1 when no numerical input is provided');
        assert.equal(convertHandler.getNum('km'), 1, ' default to a numerical input of 1 when no numerical input is provided');
        assert.equal(convertHandler.getNum('lbs'), 1, ' default to a numerical input of 1 when no numerical input is provided');
        assert.equal(convertHandler.getNum('kg'), 1, ' default to a numerical input of 1 when no numerical input is provided');
    });
    // #7
    test('convertHandler should correctly read each valid input unit.', function () {
        assert.equal(convertHandler.getUnit('32Gal'), 'gal', 'unit input should be correctly');
        assert.equal(convertHandler.getUnit('4mI'), 'mi', 'unit input should be correctly');
        assert.equal(convertHandler.getUnit('8LBS'), 'lbs', 'unit input should be correctly');
    });
    // #8
    test('convertHandler should correctly return an error for an invalid input unit.', function () {
        assert.equal(convertHandler.getUnit('32Ga'), 'invalid', 'wrong unit input should return invalid');
        assert.equal(convertHandler.getUnit('4mIi'), 'invalid', 'wrong unit input should return invalid');
        assert.equal(convertHandler.getUnit('8lls'), 'invalid', 'wrong unit input should return invalid');
    });
    // #9
    test('convertHandler should return the correct return unit for each valid input unit.', function () {
        assert.equal(convertHandler.getReturnUnit('L'), 'gal', 'unit input should be returned correctly');
        assert.equal(convertHandler.getReturnUnit('gal'), 'L', 'unit input should be returned correctly');
        assert.equal(convertHandler.getReturnUnit('mi'), 'km', 'unit input should be returned correctly');
    });
    // #10
    test('convertHandler should correctly return the spelled-out string unit for each valid input unit.', function () {
        assert.equal(convertHandler.spellOutUnit('gal'), 'gallons', 'spelled-out string unit for each valid input unit should be returned correctly');
        assert.equal(convertHandler.spellOutUnit('L'), 'liters', 'spelled-out string unit for each valid input unit should be returned correctly');
        assert.equal(convertHandler.spellOutUnit('mi'), 'miles', 'spelled-out string unit for each valid input unit should be returned correctly');
        assert.equal(convertHandler.spellOutUnit('km'), 'kilometers', 'spelled-out string unit for each valid input unit should be returned correctly');
        assert.equal(convertHandler.spellOutUnit('lbs'), 'pounds', 'spelled-out string unit for each valid input unit should be returned correctly');
        assert.equal(convertHandler.spellOutUnit('kg'), 'kilograms', 'spelled-out string unit for each valid input unit should be returned correctly');
    });
    // #11
    test('convertHandler should correctly convert gal to L', function () {
        assert.equal(convertHandler.convert(1, 'gal'), 3.78541, 'convert gal to L should be correctly');
    });
    // #11
    test('convertHandler should correctly convert L to gal.', function () {
        assert.equal(convertHandler.convert(1, 'L'), (1 / 3.78541).toFixed(5), 'convert gal to L should be correctly');
    });
    // #11
    test('convertHandler should correctly convert mi to km.', function () {
        assert.equal(convertHandler.convert(1, 'mi'), 1.60934, 'convert gal to L should be correctly');
    });
    // #11
    test('convertHandler should correctly convert km to mi.', function () {
        assert.equal(convertHandler.convert(1, 'km'), (1 / 1.60934).toFixed(5), 'convert gal to L should be correctly');
    });
    // #11
    test('convertHandler should correctly convert lbs to kg.', function () {
        assert.equal(convertHandler.convert(1, 'lbs'), 0.453592.toFixed(5), 'convert gal to L should be correctly');
    });
    // #12
    test('convertHandler should correctly convert kg to lbs', function () {
        assert.equal(convertHandler.convert(1, 'kg'), (1 / 0.453592).toFixed(5), 'convert gal to L should be correctly');
    });

});