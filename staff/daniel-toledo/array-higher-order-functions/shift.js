/**
 * Abstraction of Shift
 * 
 * This method removed the first element from an array and
 * returns that removed element. This methos changes the length of the array.
 * 
 * @param {Array} arr - Array to be shifted
 * 
 * @throws {TypeError} - when array is not an Array
 * 
 * @return {Array} - Array shifted
 */

function shift(array){

    if(!(array instanceof Array)) throw TypeError(array+' should be an Array.')

    var first=array[0];
    var copy=Object.assign([],array)

    array.length=array.length-1
    for (var i=0; i<array.length; i++){
        array[i]=copy[i+1]
    }

    return first
}