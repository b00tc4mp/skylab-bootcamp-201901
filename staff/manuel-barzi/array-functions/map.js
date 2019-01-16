/**
 * Abstraction of map.
 * 
 * Iterates an array evaluating an expression on each of its values. 
 * The result is located and returned in a new array.
 * 
 * @param {Array} array - The array to map.
 * @param {Function} callback - The expression to evaluate.
 * 
 * @returns {Array} - A new array with the resulting values.
 */
function map(array, callback) {
    var res = [];

    for (var i = 0; i < array.length; i++) res[i] = callback(array[i]);

    return res;
}

console.log('TEST map');

// use case 1

console.log('use case 1');

var a = [1, 2, 3]

var res = map(a, function (v) { return v + 10; });

console.log(res); // output: [11, 12, 13]