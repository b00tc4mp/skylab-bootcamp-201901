'use strict';
/**
 * Gives you a new array made from a union of 2 other arrays
 * 
 * @param {Array} array1 to make an union
 * @param {Array} array2 to make an union
 * 
 */
function concat(array1, array2) {
    if (!(array1 instanceof Array)) throw TypeError(array1 + ' is not an array');
    if (!(array2 instanceof Array)) throw TypeError(array2 + ' is not an array');
    var array3= [];
	for (var i = 0; i < (array1.length); i++) {
        array3[i]=array1[i];
    }
    for (var i = 0; i < (array2.length); i++) {
        array3[array1.length+i]=array2[i];
    }
	return array3;
}