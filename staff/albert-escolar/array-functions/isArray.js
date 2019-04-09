/**
 * Iterates a value and checks if its an array or not.
 * 
 * @param {Array} value value to be checked.
 * 
 * @returns {boolean} True if all value is an array, otherwise false.
 */

function isArray(value){
    if(value instanceof Array){
        return true;
    }else{
        return false;
    }
}