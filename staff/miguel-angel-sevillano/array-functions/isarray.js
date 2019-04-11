'use strict'
/**
 * This function checks if the argument passed is an array or not
 * @param {Array} item The array to check
 */

function isArray(item){

    if(item === undefined )throw TypeError('its undefined');
    if(item instanceof Array){
        return true
    }
    else{return false}
}

