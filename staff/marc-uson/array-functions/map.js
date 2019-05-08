/**
 * creates a new array with the results of callback function aplied in each element of the given array
 * 
 * @param {Array} array 
 * @param {Function} callback 
 */

function map(array, callback){
    if (!(array instanceof Array)) throw TypeError(array + ' is not an array');
    if (typeof callback !== 'function') throw new TypeError(callback + ' is not a function');
    
    var newArr = [];
    for(var i = 0; i < array.length; i++) newArr[i] = callback(array[i]);

    return newArr;
}