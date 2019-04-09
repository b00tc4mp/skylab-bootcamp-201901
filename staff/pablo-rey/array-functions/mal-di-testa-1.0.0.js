'use strict';

/**
 * Runs a test suite.
 * 
 * @param {string} title The suite title.
 * @param {function} callback The suite expression to evaluate.
 */
function suite(title, callback) {
    console.log('TEST', title);

    callback();
}

/**
 * Runs a unit test case.
 * 
 * @param {string} title The test case title.
 * @param {function} callback The test case expression to evaluate.
 */
function test(title, callback) {
    try {
        callback();

        console.log('%c CASE ' + title, 'color: green');
    } catch (error) {
        console.error('CASE ' + title + '\n', error);
    }
}

/**
 * Checks wether a condition is satisfied, otherwise throws an error.
 * 
 * @param {*} actual The actual value to check agains the expected value.
 * @param {*} expected The expected value.
 */
function expect(actual, expected) {
    if (actual instanceof Array && expected instanceof Array) {
        if (actual.length !== expected.length) {
            throw Error('expected and actual results are arrays with diferent lengths');
        }
        for (var index in expected) {
            if (expect(actual[index], expected[index])) {
                throw Error('expected ' + expected[index] + ' at index ' + index + '; received ' + actual[index]);
            }
        }
    } else if (actual !== expected) throw Error('expected ' + actual + ' to be ' + expected);
}