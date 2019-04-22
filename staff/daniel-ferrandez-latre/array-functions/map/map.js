/**
 * Return a new array mapped by callback fuction instuctions
 * 
 * @param {Array} array The array to iterate.
 * 
 * @param {Function} callback The expression to evalute.
 * 
 * @param {Number} index The expression to evalute.
 */
function map(array, callback) {
    if(arguments.length === 0) {
        throw TypeError(' no arguments are passed.');
    } else if(!(arguments[0] instanceof Array)) {
        throw TypeError(array + ' is not an array.');
    } else if( arguments.length > 1 && !(arguments[1] instanceof Function)){
        throw new TypeError(callback + ' is not a function');
    } else if(arguments.length > 2) {
        throw new Error(' to many arguments passed.');
    }

    var arrayMap = [];
    if(array !== null && array !== undefined) {
        for(var i = 0; i < array.length; i++) {
                arrayMap[arrayMap.length] = callback(array[i], i, array);
        }
        return arrayMap;
    }
    return arrayMap;
}
   
