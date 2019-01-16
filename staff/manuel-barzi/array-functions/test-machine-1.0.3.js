/**
 * Prints the suite title in the console.
 * 
 * Convenient method to be called before the test cases.
 * 
 * @param {string} title - Test suite title.
 */
function suite(title) {
    console.log('%c TEST ' + title, 'font-weight: bold; font-size: 50px; color: red; text-shadow: 3px 3px 0 rgb(217,31,38) , 6px 6px 0 rgb(226,91,14) , 9px 9px 0 rgb(245,221,8) , 12px 12px 0 rgb(5,148,68) , 15px 15px 0 rgb(2,135,206) , 18px 18px 0 rgb(4,77,145) , 21px 21px 0 rgb(42,21,113)');
}

/**
 * Runs a test expression and prints the result in the console.
 * 
 * @param {string} description - Description of the test case.
 * @param {Function} expression - Test expression to evaluate.
 */
function test(description, expression) {
    try {
        expression();

        console.log('%c CASE ' + description, 'color: green;');
    } catch (err) {
        console.error('CASE ' + description);

        console.error(err);
    }
}