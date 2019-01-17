/**
 * Abstraction of reduce
 * 
 * this method method executes a reducer function 
 * (that you provide) on each member of the array resulting 
 * in a single output value.
 * 
 * @param {Array} array  -The array to operate on
 * @param {Function} callback  - The expression to evaluate
 * @param {*} accumulator - the accumulator of the reduction value
 * 
 * @throws {TypeError} - when array is not an Array
 * @throws {TypeError} - when callback is not an Function
 * 
 * @return {*} - The reduction value
 */
function reduce(array, callback, accumulator) {

    if (!(array instanceof Array)) throw TypeError(array + 'should be an array')
    if (!(callback instanceof Function)) throw TypeError(callback + 'should be a function ')

    var i;

    if(accumulator===undefined){
        accumulator=array[0];
        i=1;

    } else{i=0}
    
    for(; i<array.length; i++){
        var item=array[i];

        accumulator=callback(accumulator,item);
    }

    return accumulator

}