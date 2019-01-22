/**
 * Abstraction of splyce
 * 
 * Iterate an array and  changes the contents of an array by removing or replacing existing elements and/or adding new elements.
 * 
 * @param {Array} array 
 * @param {Number} start 
 * @param {Number} deleteCount 
 * 
 * @returns {Array} - An array containing the deleted elements.
 */


function splice(array, start, deleteCount) {
    if (!(array instanceof Array)) throw TypeError(array + ' should be an Array');
    if (typeof start !== 'number') throw TypeError(start + ' should be a Number');
    if (typeof deleteCount !== 'number') throw TypeError(deleteCount + ' should be a Number');

    start = start > array.length ? array.length : (start >= 0 ? start : Math.max(0, array.length + start));
    deleteCount = typeof deleteCount === 'undefined' || deleteCount > array.length ? array.length : (deleteCount > 0 ? deleteCount : 0);
    
    var array2 = [];// Object.assign([], array);    
    var elements = [];
    var res = [];

    //copy array
    for (var i = 0; i < array.length; i++) {
        var element = array[i];
        array2[i] = element;
    }
    
    //array of new elements
    for (var a = 3; a < arguments.length; a++) {
        elements[elements.length] = arguments[a];
    }

    //get elements deleted
    if(deleteCount > 0)
        for (var d = start; d < start+deleteCount; d++) {
            res[res.length] = array[d];
        }

    //resets copy
    array2.length = start;
    
    //give new values
    for (var n = 0; n < elements.length; n++) {
        var value = elements[n];
        array2[array2.length] = value;
    }
    
    //give old values
    for (var z = start+deleteCount; z < array.length; z++) {
        var value = array[z];
        array2[array2.length] = value;
    }

    //reboot original array
    for (var i = 0; i < array2.length; i++) {
        var value = array2[i];       
        array[i] = value;
    }       

    //delete extra elements
    array.length = array2.length;

    //return deleted elemetns
    return res;
}