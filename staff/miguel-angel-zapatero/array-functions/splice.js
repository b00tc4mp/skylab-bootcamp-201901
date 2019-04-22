'use strict';

/**
 * Changes the contents of an array by removing or replacing existing elements and/or adding new elements in place. 
 * 
 * @param {Array} array The array to be changed.
 * @param {number} start The index to start the changes.
 * @param {[*]} end The final index to end the changes.
 * @param {[*]} value The value to add/change into the array.
 * 
 * @returns {array} A new array with the values erased.
 */
function splice(array, start, end, value) {
    if(!(array instanceof Array)) throw TypeError(array + ' is not an array');
    if((typeof start !== 'number' && start !== undefined)) throw TypeError(start + ' is not a number');
    if((typeof start !== 'number' && start !== undefined)) throw TypeError(end + ' is not an number');

    var arrayStart = [];
    var arrayEnd = [];
    var arrElem = [];
    var arrayDelete = [];
    var args = Array.from(arguments);

    if(args.length > 3) {
        for(var i = 3; i < args.length; i++) {
            arrElem[arrElem.length] = args[i];
        };
    }
    
    if(start < 0) {
        start = array.length + start;
    }
    if(!end || end >= array.length - start) {
        end = array.length;
    }
    if(end <= 0) end = start;

    for(var i = 0; i < start; i++) {
        arrayStart[arrayStart.length] = array[i]; 
    }

    for(var i = start; i < end; i++) {
        arrayDelete[arrayDelete.length] = array[i]; 
    }

    for(var i = end; i < array.length; i++) {
        arrayEnd[arrayEnd.length] = array[i]; 
    }

    array.length = 0;
    var totalArr = [arrayStart, arrElem, arrayEnd];
    for(var i = 0; i < totalArr.length; i++) {
        if(totalArr[i].length !== 0) {
            for(var j = 0; j < totalArr[i].length; j++) {
                array[array.length] = totalArr[i][j];
            }
        }
    }
    
    return arrayDelete; 
}