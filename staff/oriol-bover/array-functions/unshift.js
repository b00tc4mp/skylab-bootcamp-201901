/**
 * Abstraction of unshift
 * 
 * Adds one or more elements to the beginning of an array and returns the new length of the array.
 * 
 * 
 * @param {Array} array - array to itetarte and push the elements
 * @param {*} Items - Items to push to begining of the array 
 * 
 * @returns {Number} - The new length property of the object upon which the method was called.
 */

function unshift(array) {
    if(!(array instanceof Array)) throw TypeError( array +' should be an Array');

    var array2 = [];

    for (var i = 1; i < arguments.length; i++) {
        var element = arguments[i];
        array2[array2.length] = element;
    }

    for (var i = 0; i < array.length; i++) {
        var element = array[i];
        array2[array2.length] = element;        
    }

    for (var i = 0; i < array2.length; i++) {
        var element = array2[i];
        array[i] = element;
    }

    array.length = array2.length;

    return array.length;
}