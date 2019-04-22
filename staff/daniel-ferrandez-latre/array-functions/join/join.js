'use strict';
/**
 * Join all element inside an array or and arraylike object together on a String
 * 
 * @param {Array} Array The array to iterate.
 * 
 * @returns {String} Concatenate by the string is passed by.
 */
function join(array, srtElement) {

    if(arguments.length === 0) {
        throw TypeError(' no arguments are passed.');
    } else if(arguments.length > 2){
        throw new Error(' to many arguments passed');
    }

    var strJoin = '';
    if(array instanceof Array) {
        if(srtElement instanceof String) {
            for(var i = 0; i < array.length; i++) {
                strJoin += array[i];
            }
        } else if(typeof srtElement === 'undefined') {
            for(var i = 0; i < array.length; i++) {
                strJoin += array[i] + ',';
            }
            
            return strJoin.slice(0, strJoin.length - 1);
        } else {
            for(var i = 0; i < array.length; i++) {
                if (i < array.length - 1) {
                    strJoin += array[i] + srtElement;
                } else {
                    strJoin += array[i];
                }
        }
    }
        return strJoin;
    } else {
        return [];
    }
}