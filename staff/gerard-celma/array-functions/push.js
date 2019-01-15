/**
 * Abstraction of push.
 * 
 * Adds an element to an array in last position.
 * 
 * @param {base} array + ilimited parameters, separated with ","  
 * 
 * @throws {Error} - If only one parameter (!array) is entered
 * @throws {TypeError} - If first parameter is !array
 */

function push(base) { 
    if ((arguments.length < 2) && (!(arguments[0] instanceof Array)))
        throw new TypeError("the value '" + arguments[0] + "' is not array");
        
    if(!(arguments[0] instanceof Array))
        throw new TypeError("'" +arguments[0] + "' is not an array");

    for (var i = 1; i < arguments.length; i++) {
        arguments[0][arguments[0].length] = arguments[i];
    }

    return arguments[0].length;
}