'use strict';

/**
 * search for an element and gives you the last index, if nor -1 will be given
 * 
 * @param {Array} array The array to be searched with element
 * @param {element} element element that will be searched in array
 * @param {index} number (Optional) if you want to start from some specific index
 * 
 * @index {int} index of element if found, otherwise -1 will be given
 */
function lastindexOf(array,element,start){
    if (!(array instanceof Array)) throw TypeError(array + ' is not an array');
    if (typeof element === 'undefined') throw new TypeError(element + ' is not an object');
    if (typeof start !== 'Number') throw new TypeError(start + ' is not a number');
    start = start || 0;
    var index=-1;
    for (var i = start; i < array.length; i++){
        if(element===array[i]) index=i
    }
    return index;
}