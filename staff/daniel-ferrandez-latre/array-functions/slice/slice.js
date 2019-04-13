/**
 * Return a new array mapped by callback fuction instuctions
 * 
 * @param {Array} array Takes of the first position of the array and rearrenge it into current state
 * 
 *  @param {Number} indexStart Takes of the first position of the array and rearrenge it into current state
 * 
 *  @param {Number} indexEnd Takes of the first position of the array and rearrenge it into current state
 * 
 */
function slice(array, indexStart) {
    if(arguments.length === 0) {
        throw TypeError(' no arguments are passed.');
    } else if(!(arguments[0] instanceof Array)) {
        throw TypeError(array + ' is not an array.');
    }

    var arraySliced = [];
    if(indexStart > array.length) return [];

    for(var i = indexStart; i < array.length; i++) {
        arraySliced[arraySliced.length] = array[i];
    }

    return arraySliced;
}

