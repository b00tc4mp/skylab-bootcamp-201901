/**
 * returns a copy of a part of the given array, starting at begining and ending at end without including the end index element
 * 
 * @param {array} array 
 * @param {number} begin 
 * @param {number} end 
 */


function slice(array, begin, end){
    if (!(array instanceof Array)) throw TypeError(array + ' is not an array')
    
    var newArr = [];
    if ((typeof end ==='number')||(end === undefined)){
        if((begin !== undefined)&&(typeof begin == 'number')){
            i = begin;
        }else if(typeof begin !=='number'){
            i = 0;
        }
        var j = 0;
        var z = (end === undefined) ? array.length : end;
        for(i; i < z; i++){
            newArr[j] = array[i];
            j++
        }
    }
    return newArr;
}