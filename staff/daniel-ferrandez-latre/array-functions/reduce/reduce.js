/**
 * Return combine all elements into an Array in one
 * 
 * @param {Array} array The array to iterate.
 * 
 * @param {Function} callback The expression to evalute.
 * 

 */
function reduce(array, callback) {
    var resultTotal = 0;
    
    if(array !== null && array !== undefined) {
        var result = 0;
        var arrayResult = []
        for(var i = 0; i < array.length; i++) {
            if(i == 0){
                result = callback(array[i], array[i + 1]);
                arrayResult[arrayResult.length] = result;
            }
            arrayResult[arrayResult.length] = callback(arrayResult[arrayResult.length], array[i]);     
        }
        return arrayResult[arrayResult.length];
    }
    return resultTotal;
}
   
