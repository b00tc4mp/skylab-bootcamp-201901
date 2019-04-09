/**
 * Returns a new array containing the elements from the original array that matches the callback function condition
 * 
 * @param {Array} array 
 * @param {Function} callback 
 */

function filter(array, callback){
    if (!(array instanceof Array)) throw TypeError(array + ' is not an array');
    if (typeof callback !== 'function') throw new TypeError(callback + ' is not a function');

    var newArr = [];
    var j = 0;
    for(var i = 0; i < array.length; i++){
        if (callback(array[i]) == true){
            newArr[j]=array[i];
            j++;
        }
    }
    return newArr;
}