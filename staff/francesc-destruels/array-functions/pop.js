/**It will introduce a new index with the value given
 * 
 * @param {array} array array tpo work on
 *
 */

var pop = (function(array){
    "use strict";
    if (!(array instanceof Array)) throw TypeError(array + ' is not an array');

    array.length--;
    return array;
});