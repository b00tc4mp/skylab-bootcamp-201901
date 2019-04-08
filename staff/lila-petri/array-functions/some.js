/**
 * Iterates an array and check if at least one element of the array meets the condition implemented by the function
 * @param {Array} array Array to check
 * @param {Function} callback The expression to evaluate.
 */

function some(array, callback) {
    var flag= false;
    for (var i = 0; i < array.length; i++){
        if(callback(array[i], i, array)){
            flag=true;
        }
    }
    return flag;
}

