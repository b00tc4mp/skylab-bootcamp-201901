/**
 * Abstraction of fill.
 * 
 * Fills all the elements of an array from a start index to an end index with a static value.
 * 
 * @param {Array} array - The array to modify.
 * @param {*} value - The element to be added
 * @param {Number} start - The start index.
 * @param {Number} end - The end index.
 * 
 * @throws {Error} - If too many arguments (>4).
 * @throws {TypeError} - If array is not an Array.
 * 
 * @returns {Array} - The modified array.
 */
function fill(array, value, start, end) {
    if (arguments.length > 4) throw new Error ('too many arguments')
    
    if (!(array instanceof Array)) {
        throw new TypeError(array + ' is not an array');
    }
    end = end === undefined ? array.length : (end < 0? array.length + end : end);
    start = start === undefined ? 0 : (start < 0? array.length + start : start);
    for (var i = start; i < end; i++)
        array[i] = value;
    return array;
}

// use case 1
var a = [1, 2, 3, 4, 5];

fill(a, 0, 0, 2); // output: [0, 0, 3, 4, 5]

console.log(a)

// use case 2
var a = [1, 2, 3, 4, 5];

fill(a, 0, 'a'); // output: [1, 2, 0, 0, 0]

console.log(a)

// use case 3
var a = [1, 2, 3, 4, 5];

fill(a, 0); // output: [0, 0, 0, 0, 0]

console.log(a)

// use case 4
var a = [1, 2, 3, 4, 5];

fill(a, 0, -3, -2); // output: [1, 2, 0, 4, 5]

console.log(a)

// use case 5
var a = [1, 2, 3, 4, 5];

fill(a, 0, -3, 4); // output: [1, 2, 0, 0, 5]

console.log(a)

// use case 6

var error;

try {
    fill({}, 0);
} catch(err) {
    error = err;
}

console.log(error)

// use case 7

var error;

try {
    fill(1, 0);
} catch(err) {
    error = err;
}

console.log(error)
