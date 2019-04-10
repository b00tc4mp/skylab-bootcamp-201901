'use strict';
/**
 * 
 * Method creates a new array with all elements that pass the test implemented by the provided function.
 * 
 * @param {array} Array and/or values to concatenate into a new array. If valueN is undefined, concat returns a shallow copy of the existing array on which it is called. See the description below for more details.
 * 
 * @param {callback} function is a predicate, to test each element of the array. Return true to keep the element, false otherwise. It accepts three arguments:
 * 
 * @returns {Array} A new array with the elements that pass the test. If no elements pass the test, an empty array will be returned.
 */

  
  function filter(array, callback){
   var n = 0
   var newArray = [];  
      for (var i = 0; i < array.length; i++){
        if (callback(array[i], i) === true){
           newArray[n] = array[i]
           n++
        }  
     }  
    return newArray
  }