'use strict';

/**
 * Checks wether a condition is satisfied, otherwise throws an error.
 * 
 * @param {*} actual The actual value to check agains the expected value.
 * @param {*} expected The expected value.
 * @param {boolean} [deep] Indicates wether the interal check comparison must be deep or not (in case of arrays or objects).
 */
function expect(actual, expected, deep) {
    if (!deep) {
        if (actual !== expected) throw Error('expected ' + actual + ' to be ' + expected);
    } 
    else if (Array.isArray(actual) && Array.isArray(expected)) {
        if (actual.length === expected.length) {
            for (var i in actual)
                if (actual[i] !== expected[i]) throw Error('expected iteration value ' + actual[i] + ' to be ' + expected[i] + ' for index ' + i);
        } 
        else{
            throw Error('expected length ' + actual.length + ' to be ' + expected.length);
        } 
    } else if (actual instanceof Object && expected instanceof Object) {
        var actualKeys = Object.keys(actual);
        var expectedKeys = Object.keys(expected);

        expect(actualKeys, expectedKeys, true);

        for (var i in expectedKeys) {
            var key = expectedKeys[i];

            expect(actual[key], expected[key]);
        }
    } else{
        throw Error(actual + ' and ' + expected + ' are not of the same type, and both should be arrays');
    } 
}