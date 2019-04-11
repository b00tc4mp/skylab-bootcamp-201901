'use strict';
/**
 * The some() method tests whether at least one element in the array passes the test implemented by the provided function.
 * @param {function} callback 
 * @param {Array} array 
 * @returns {boolean} 
 */

function some(array, callback){
    
    if (!(array instanceof Array)) throw TypeError(array + ' is not an array');

    if (typeof callback !== 'function') throw new TypeError(callback + ' is not a function');

      for (var i = 0; i < array.length; i++){
        if (callback(array[i], i) === true){
            return true
        }  
     }  
    return false
  }