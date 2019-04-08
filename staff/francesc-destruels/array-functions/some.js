

/**
 * The some() method tests whether at least one element in the array passes the test implemented by the provided function.
 * @param {array} array array to iterate
 * @param {function} callback function to proces the array
 */

function some(array, callback){
    var i;

    for (i = 0; i < array.length; i++){
        if(callback(array[i]) === true) {
            return true
        }
    }

    return false;
}