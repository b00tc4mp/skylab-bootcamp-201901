/**
 * Abstraction of map.
 * 
 * Iterates an array evaluating an expression on each of its values. 
 * The result is located and returned in a new array.
 * 
 * @param {Array} arr - The array to map.
 * @param {Function} func - The expression to evaluate.
 * 
 * @returns {Array} - A new array with the resulting values.
 * 
 * @throws {Error} - If too many arguments (> 2)
 * @throws {TypeError} - If arr is not an array
 */
function map(arr, func) {
    
    if (arguments.length < 2) throw Error ('more arguments are needed');
    if (!(arr instanceof Array)) throw new TypeError(arr + ' is not an array');
    
    var res = [];
    
    for (var i = 0; i < arr.length; i++) res[i] = func(arr[i]);

    return res;
};