/**
 * Creates a new array with all elements that pass the test implemented by the provided function.
 * 
 * @param {Array}    array    - The array to filter
 * @param {Function} callback - The expression to evaluate.
 * 
 * @returns {Array} - A new array with the elements that pass the test. 
 * If no elements pass the test, an empty array will be returned.
 */

'use strict';

function filter(array, callback) {

    var newArray=[];
    var j= 0;

	for (var i = 0; i < array.length; i++) {
        if(callback(array[i])){
            newArray[j] = array[i];
            j++;
        }
    }
        
    return newArray;
}