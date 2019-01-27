/**
 * Prints the suite title in the console.
 * 
 * Convenient method to be called before the test cases.
 * 
 * @param {string} title - Test suite title.
 * @param {function} body - Suite of tests to evaluate.
 */
function suite(title, body) {
    console.log('%c ' + title, 'font-weight: bold; font-size: 50px; color: red; text-shadow: 3px 3px 0 rgb(217,31,38) , 6px 6px 0 rgb(226,91,14) , 9px 9px 0 rgb(245,221,8) , 12px 12px 0 rgb(5,148,68) , 15px 15px 0 rgb(2,135,206) , 18px 18px 0 rgb(4,77,145) , 21px 21px 0 rgb(42,21,113)');

    body();
}

/**
 * Describes a set or sub-set ot test cases.
 * 
 * @param {string} description - Test set description.
 * @param {*} body - Set or sub-set of tests to evaluate.
 */
function describe(description, body) {
    console.log('%c ' + description, 'color: blue;');

    body();
}

/**
 * Runs a test expression and prints the result in the console.
 * 
 * @param {string} description - Description of the test case.
 * @param {Function} expression - Test case to evaluate.
 */
function it(description, expression) {
    try {
        expression();

        console.log('%c ' + description, 'color: green;');
    } catch (err) {
        console.error(description);

        console.error(err);
    }
}

/**
 * Asserts a condition.
 * 
 * @param {boolean} condition - The condition to be checked.
 * @param {string} description - Description of the condition to be accomplished.
 * 
 * @throws {Error} - If condition is not satisfied.
 */
function expect(condition, description) {
    if (!condition) throw Error(description);
}