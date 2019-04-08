/**
 * returns the first index of the passed array that satisfies the condition provided in the callback function
 * 
 * @param {Array} array 
 * @param {Function} callback 
 */

function findIndex(array, callback){
    for(var i = 0; i < array.length; i++){
        if (callback(array[i])) return i;
    }
    return undefined;
}