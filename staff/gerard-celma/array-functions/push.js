/**
 * Abstraction of push.
 * 
 * Adds an element to an array in last position.
 * 
 * @param {Array} array 
 * @param {element} any 
 * @param {number} start 
 * @param {number} end 
 * 
 * @throws {Error} - If too many arguments (> 4)
 * @throws {TypeError} - If array is not an array
 */

function push(base) {
    for (var i = 1; i < arguments.length; i++) {
        arguments[0][arguments[0].length] = arguments[i];
    }

    return base;
}

var arr = [1,2,3];

console.log(push(arr,4,5,6));


// function fill(array, value, start, end) {
//     if (arguments.length > 4) throw Error('too many arguments');

//     if (!(array instanceof Array))
//         throw new TypeError(array + ' is not an array');

//     start = start === undefined ? 0 : (start < 0 ? array.length + start : start);
//     end = end === undefined ? array.length : (end < 0 ? array.length + end : end);

//     for (var i = start; i < end; i++)
//         array[i] = value;

//     return array;
// }