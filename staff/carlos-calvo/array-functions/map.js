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
 */
function map(arr, func) {
    var res = [];

    for (var i = 0; i < arr.length; i++) res[i] = func(arr[i]);

    return res;
}

