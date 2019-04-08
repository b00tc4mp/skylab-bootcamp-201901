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
    var arrayMap = [];
    if(array !== null && array !== undefined) {
        for(var i = 0; i < array.length; i++) {
                arrayMap[arrayMap.length] = callback(array[i], i, array);
        }
        return arrayMap;
    }
    return arrayMap;
}
   
