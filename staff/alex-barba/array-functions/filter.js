/**
 * Abstraction of filter.
 * 
 * Creates a new array with all elements that pass the test implemented by the provided     function.
 * 
 * @param {*} array 
 * @param {*} callback
 * 
 * @throws {TypeError} -if array is not an array.
 * @throws {TypeError} -if callback is not an function.
 * 
 * @returns {Array} 
 */

function filter(array, callback) {
    if(!(array instanceof Array)) throw TypeError(array + ' is not an array');
    if(!(callback instanceof Function)) throw TypeError(callback + ' is not a function');

    var res = [];
    
    for (var i = 0; i < array.length; i++) {
        if(callback(array[i]) === true) {
            res[res.length] = array[i];
        }
    }
    return res
};

var words = [12, 5, 8, 130, 44]

function isBigEnough(value) {
return value >= 10;
};

var res = filter(words, isBigEnough);