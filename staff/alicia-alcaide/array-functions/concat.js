/**
 *  Used to merge two or more arrays. 
 *  This method does not change the existing arrays, but instead returns a new array.
 * 
 * @param {*} values Arrays and/or values to concatenate into a new array. If valueN is undefined, concat returns a shallow copy of the existing array on which it is called. See the description below for more details.
 * 
 * @returns {Array} A new Array instance.
 */

'use strict';

function concat() {

  var newArray = [];
  
  for (var j=0; j <arguments.length; j++) {
    for (var k=0; k < arguments[j].length; k++) {
        newArray[newArray.length] = arguments[j][k];
    }
  }
  
  return newArray;
}