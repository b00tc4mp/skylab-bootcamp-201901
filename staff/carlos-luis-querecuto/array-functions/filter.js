/**
 * Gives you a new array made of elements that fits in your extression
 * 
 * @param {Array} array The array to filter.
 * @param {Expresion} callback The expression to evalute with array (involved array needs to be in the expression).
 * 
 * @array {boolean} a new array made of filtered elements
 */
function filter(array,callback){
    if (!(array instanceof Array)) throw TypeError(array + ' is not an array');
    if (typeof callback !== 'function') throw new TypeError(callback + ' is not a function');
    var array2= []
    for (var i = 0; i < array.length; i++){
        if(callback(array[i])) array2[array2.length]=array[i]
    }
    return array2;
}