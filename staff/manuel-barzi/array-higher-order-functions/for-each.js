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