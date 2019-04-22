/**
 * method tests whether at least one element in the array passes the test implemented by the provided function
 * @param {*} array array to iterate
 * @param {*} callback Function to test for each element
 */
function some(array,callback){
    if(!(array instanceof Array)) throw TypeError(array + ' is not an array');
    if(typeof callback !== 'function') throw TypeError(callback + ' is not a function');

    for(var i = 0; i < array.length; i ++){
        var result = false;
        if(callback(array[i])){
            result = true;
        }   
    }
    return result;
} 