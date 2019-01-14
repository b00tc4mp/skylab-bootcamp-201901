/**
 * Abstraction of for-each.
 * 
 * Iterates an array evaluating and expression on each of its values.
 * 
 * @param {Array} arr - The array to iterate.
 * @param {Function} func - The expression to evaluate.
 */
function forEach(arr, func) {
    for (var i = 0; i < arr.length; i++) func(arr[i]);
}

// use case 1

var a = [1, 2, 3];

forEach(a, function (v) { console.log(v) }); // output: 1, 2, 3

// use case 2

var sum = 0;

forEach(a, function (v) { sum += v; });

console.log(sum); // output: 6

/**
 * Abstraction of map.
 * 
 * Iterates an array evaluating an expression on each of its values. 
 * The result is located and returned in a new array.
 * 
 * @param {Array} arr - The array to map.
 * @param {Function} func - The expression to evaluate.
 */
function map(arr, func) {
    var res = [];

    for (var i = 0; i < arr.length; i++) res[i] = func(arr[i]);

    return res;
}

// use case

var a = [1, 2, 3]

var res = map(a, function (v) { return v + 10; });

console.log(res); // output: [11, 12, 13]