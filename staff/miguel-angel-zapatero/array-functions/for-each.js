'use strict';

/**
 * Iterates an array and evaluates an expression on each of its values.
 * 
 * @param {Array} array The array to iterate.
 * @param {Function} callback The expression to evaluate.
 */
function forEach(arr, callback) { 
    if(!(arr instanceof Array)) throw TypeError(arr + ' is not an array');
    if(!(callback instanceof Function)) throw TypeError(callback + ' is not a function');

    for(var i = 0; i < arr.length; i++) {
        callback(arr[i], i);
    }
}


// Make a for without using it (clue --> recursive function)

// function forEach(arr, callback) {
//     function loop(i) {
//         callback(arr[i], i);
//         if(++i > arr.length) loop(i);
//     }
//     loop(0);
// }

// function forEach(arr, callback) {
//     arr.length && (function loop(i){
//         callback(arr[i], i);
//         if(++i > arr.length) loop(i);
//     })(0);
// }