/**
 * Ceate a new array with the results of the function called
 * @param {Array} array 
 * @param {Function} callback 
 */
function map(array, callback) {

    if(!(array instanceof Array)) throw TypeError(array + ' is not an array')
    if(typeof callback !== 'function') throw TypeError (callback+' is not a function')
    var newarray=[];
    for (var i = 0; i < array.length; i++){
        
            newarray[i]=callback(array[i], i, array);
        }
    
    return newarray;
}

