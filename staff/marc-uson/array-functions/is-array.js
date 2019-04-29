/**
 * Returns true if the variable passed is an array. if not, returns false.
 * 
 * @param {Variable} variable 
 */

function isArray(variable){
    return variable.constructor === Array ? true : false ;
}