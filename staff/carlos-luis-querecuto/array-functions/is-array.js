/**
 * Verify if argument is an array
 * 
 * @param {Object} obj The object to evaluate
 */


function isArray(obj) {    
    if (typeof obj !== 'Object') throw new TypeError(obj + ' is not an object');
    return obj instanceof Array
}