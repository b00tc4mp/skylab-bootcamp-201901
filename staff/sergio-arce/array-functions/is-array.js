/**
 * Iterates an array and evaluates an expression on each of its values.
 * 
 * @param {Array} arr
 * 
 * @returns {Boolean}
 */
function isArray(arr) {

    if ((typeof arr === 'undefined')) throw TypeError(`is undefined`);
    else{
        return arr instanceof Array; 
    } 
    
}


