'use strict';
/**
 * Return combine all elements into an Array in one
 * 
 * @param {Array} array The array to iterate.
 * 
 * @param {Function} callback The expression to evalute.
 * 

 */
function reduce(array, callback, value) {
    if(arguments.length === 0) {
        throw TypeError(' no arguments are passed.');
    } else if(!(arguments[0] instanceof Array)) {
        throw TypeError(array + ' is not an array.');
    } else if( arguments.length > 1 && !(arguments[1] instanceof Function)){
        throw new TypeError(callback + ' is not a function');
    }
        var result = value || array[0];
        var index = typeof value !== 'undefined' ? 0 : 1;

        for(var i = index; i < array.length; i++) {
                result = callback(result, array[i]);
        }
        return result;
    
}
   
