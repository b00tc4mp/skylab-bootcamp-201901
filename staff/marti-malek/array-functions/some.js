/**
 * 
 * Abstraction of some.
 * 
 * Evaluates if any element in an array fullfills a condition.
 * 
 * @param {Array} arr 
 * @param {function} func 
 * 
 * @returns {boolean}
 * 
 * @throws {Error} - If too many arguments
 * @throws {TypeError} - If arr is not an array
 */
function filter(arr, func) {
    if (arguments.length > 2) throw Error ('too many arguments');
    if (!(arr instanceof Array)) throw TypeError (arr + 'is not an array')

    for (var i = 0; i < arr.length; i++) {
        if (func(arr[i])) {
            return true;
        }
    }
    return false;
};

var a = [1,2,3,4];

filter(a, function (v) {return v > 2});