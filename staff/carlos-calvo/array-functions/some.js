/**
 * 
 * @param {Array} array 
 * @param {Function} func 
 * 
 * returns true if element fit conditions in the function
 */

function some(array, func){
    if(!(array instanceof Array)) throw new Error('Not an array')
    if(!(func instanceof Function)) throw new Error('Not a function')
    if(!(arguments.length == 2)) throw new Error('Incorrect number of parameters')

    for(var i = 0; i < array.length; i++){
        if(func(array[i])) return true
    }
    return false
}