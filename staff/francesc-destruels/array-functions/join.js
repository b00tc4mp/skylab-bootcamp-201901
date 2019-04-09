
/**It while join all the values of an array into a string.
 * 
 * @param {array} array Array to iterate 
 * @param {primitive} separator value between valies
 */


var join= (function(array, separator){
    "use strict";
    if (!(array instanceof Array)) throw TypeError(array + ' is not an array');
    if (separator === (undefined || NaN)) throw TypeError(separator + ' is not  valid separator');


    var i, ensurestring = separator.toString(), newString = "";

    for (i = 0; i < array.length; i++){
        if (i + 1 < array.length){
            newString += (array[i] + ensurestring);
        } else{
            newString += (array[i]);
        }
    }
    return newString
});