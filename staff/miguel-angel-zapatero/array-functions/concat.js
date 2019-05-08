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
    for(var item of args) {
        if (!(item instanceof Array)) {
            result[result.length] = item;
        } else {
            for(var i = 0; i < item.length; i++) {
                result[result.length] = item[i];
            }
        }
    }
    return result;
}