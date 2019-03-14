/**
 * Abstraction of for-each.
 * 
 * Iterates an array evaluating and expression on each of its values.
 * 
 * @param {Array} array - The array to iterate.
 * @param {Function} callback - The expression to evaluate.
 * 
 * @throws {TypeError} - when array is not an Array
 * @throws {TypeError} - when callback is not a Function
 * 
 */
function forEach(array, callback) {
    if (!(array instanceof Array))
        throw new TypeError(array + ' is not an array');

    // if (!(callback instanceof Function))
    if (typeof callback !== 'function')
        throw new TypeError(callback + ' is not a function');

    for (var i = 0; i < array.length; i++) callback(array[i]);
}

// console.log('TEST forEach');

// // use case 1

// console.log('use case 1');

// var a = [1, 2, 3];

// forEach(a, function (v) { console.log(v) }); // output: 1, 2, 3

// // use case 2

// console.log('use case 2');

// var sum = 0;

// forEach(a, function (v) { sum += v; });

// console.log(sum); // output: 6

// // use case 3

// console.log('use case 3');

// var error;

// try {
//     forEach({}, function() {});
// } catch(err) {
//     error = err;
// }

// console.log(error);