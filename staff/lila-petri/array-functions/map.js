/**
 * Ceate a new array with the results of the function called
 * @param {Array} array 
 * @param {Function} callback 
 */
function map(array, callback) {
    var newarray=[];
    for (var i = 0; i < array.length; i++){
        
            newarray[i]=callback(array[i], i, array);
        }
    
    return newarray;
}

