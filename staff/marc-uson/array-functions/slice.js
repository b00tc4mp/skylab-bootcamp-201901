/**
 * returns a copy of a part of the given array, starting at begining and ending at end without including the end index element
 * 
 * @param {array} array 
 * @param {number} begin 
 * @param {number} end 
 */


function slice(array, begin, end){
    if (!(array instanceof Array)) throw TypeError(array + ' is not an array');
    if ((begin !== undefined) && (typeof begin !=='number')) throw new TypeError(begin + 'is not a number');
    if ((end !== undefined) && (typeof end !=='number')) throw new TypeError(end + 'is not a number');
    
    if((begin !== undefined)&&(typeof begin == 'number')){
        i = begin;
    }else{
        i = 0;
    }
    var newArr = [];
    var j = 0;
    var z = (end === undefined) ? array.length : end;
    for(i; i < z; i++){
        newArr[j] = array[i];
        j++
    }
    return newArr;
}