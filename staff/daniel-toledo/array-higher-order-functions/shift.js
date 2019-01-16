/**
 * Abstraction of Shift
 * 
 * This method removed the first element from an array and
 * returns that removed element. This methos changes the length of the array.
 * 
 * @param {Array} arr - Array to be shifted
 * 
 * @return {Array} - Array shifted
 */

function shift(arr){

    if(!(arr instanceof Array)) throw TypeError(arr+' should be an Array.')

    var first=arr[0];
    var copy=Object.assign([],arr)

    arr.length=arr.length-1
    for (var i=0; i<arr.length; i++){
        arr[i]=copy[i+1]
    }

    return first
}