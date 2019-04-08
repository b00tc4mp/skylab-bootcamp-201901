/**
 * creates a new array with the results of callback function aplied in each element of the given array
 * 
 * @param {Array} array 
 * @param {Function} callback 
 */

function map(array, callback){
    var newArr = [];
    for(var i = 0; i < array.length; i++) newArr[i] = callback(array[i]);

    return newArr;
}