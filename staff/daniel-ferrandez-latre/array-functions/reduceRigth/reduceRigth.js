'use strict';
/**
 * Convine all element into an array depending the instruction is passad by
 * 
 * @param {Array} array The array to iterate.
 * 
 * @param {Function} callback The expression to evalute.
 * 

 */
function reduceRigth(array, callback, value) {
    if(arguments.length === 0) {
        throw TypeError(' no arguments are passed.');
    } else if(!(arguments[0] instanceof Array)) {
        throw TypeError(array + ' is not an array.');
    } else if( arguments.length > 1 && !(arguments[1] instanceof Function)){
        throw new TypeError(callback + ' is not a function');
    }
    
    var result = value || array[array.length - 1];
    var index = typeof value !== 'undefined' ? array.length - 3 : array.length - 2;
    for(var i = index; i > -1 ; i--) {
            result = callback(result, array[i]);
    }
    return result;
}
   /** TODO Object reducing functionality **/
