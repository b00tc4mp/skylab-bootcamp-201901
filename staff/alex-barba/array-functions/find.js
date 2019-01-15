/**
 * Abstraction of find.
 * 
 * Returns the value of the first element in an array that pass a test
 * 
 * @param {Array} array - The array to pass the test.
 * @param {Function} callback - The expression to evaluate.
 * 
 * @returns {*} - Matching element.
 */
function find(array, callback) {

    if (arguments.length > 2) throw Error ('too many arguments');

    if (!(array instanceof Array)) throw TypeError ('this argument is not an array')

    if (!(callback instanceof Function)) throw Error ('this arguments is not a function')

    for (var i = 0; i < array.length; i++) {
        var value = array[i]
        if (callback(value)) return value;
    }
};

// use case 1

var a = [1, 2, 3, 4, 5];

function checkNumber(x) {
    return x > 3
};

find(a, checkNumber); // output: 4