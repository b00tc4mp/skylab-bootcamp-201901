/**
 * returns a copy of a part of the given array, starting at begining and ending at end without including the end index element
 * 
 * @param {array} array 
 * @param {number} begin 
 * @param {number} end 
 */


function slice(array, begin, end){
    var newArr = [];
    var j = 0;
    var z = (end === undefined) ? array.length : end;
    for(i=begin; i < z; i++){
        newArr[j] = array[i];
        j++
    }
    return newArr;
}