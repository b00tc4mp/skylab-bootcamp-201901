'use strict';

/**
 * Iterate diferents arrays to concatenate the values into a new array.
 * 
 * @param  {arguments} args The array (or arrays) to concatenate
 * 
 * @returns {Array}
 */

function concat() {
    var args = Array.from(arguments);
    var result = [];
    var i = 0;
    for(item of args) {
        if (!(item instanceof Array)) {
            result[i] = item;
            i++;
        } else {
            for(var j = 0; j < item.length; j++) {
                result[i] = item[j];
                i++;
            }
        }
    }
    return result;
}