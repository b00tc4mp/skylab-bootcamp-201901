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
    if (actual !== expected) throw Error('expected ' + actual + ' must be ' + expected);
}