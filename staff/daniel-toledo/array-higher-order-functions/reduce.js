/**
 * Abstraction of reduce
 * 
 * TO DO
 * 
 * @param {Array} array  -The array to operate on
 * @param {Function} callback  - The expression to evaluate
 * @param {*} accumulator - the accumulator of the reduction value
 * 
 * @return {*} - The reduction value
 */
function reduce(array, callback, accumulator) {

    if (!(array instanceof Array)) throw TypeError(array + 'should be an array')
    if (!(callback instanceof Function)) throw TypeError(callback + 'should be a function ')

    var i;

    if(accumulator===undefined){
        accumulator=[0];
        i=1;

    }
    
    for(; i<array.length; i++){
        var item=array[i];

        accumulator=callback(accumulator,item);
    }

    return accumulator

}