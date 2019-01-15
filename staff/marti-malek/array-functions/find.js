/**
 * Abstraction of find.
 * 
 * Finds in an array the first element that evaluates 
 * 
 * @param {Array} arr 
 * @param {Function} func 
 */

function find(arr, func) {
    for (var i = 0; i < arr.length; i++) {
        if (func(arr[i])) {
            return arr[i];
        }
    }
}

var a = [1,2,3,4];

find(a, function(x) {return x > 2});

