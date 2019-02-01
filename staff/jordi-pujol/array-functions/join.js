/**
 * Abstraction of join
 * 
 * Method creates and returns a new string by concatenating all of the elements in an array, separated by commas or a specified separator string.
 * 
 * 
 * @param {Array} arr 
 * @param {*} separator
 * 
 * @throws {Error} If array is not an array
 * 
 * @returns {Number} The new length property of the object upon which the method was called.
 */

function join (arr, separator){

    if (!(arr instanceof Array)) throw TypeError (arr + ' should be an array')
    if (arguments.length > 2) throw Error('too many arguments');

    var str=""

    if (!separator && separator !=="") separator = ",";

    if (arr.length === 1) str = arr[0].toString()

    else if (arr.length>1){
        for (var i =0; i< arr.length; i++){
            if (i === arr.length-1) str += arr[i].toString()
            else str += (arr[i].toString() + separator);
        };
    }

    return str;
}