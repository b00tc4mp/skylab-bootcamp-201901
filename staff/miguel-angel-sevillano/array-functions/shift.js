'use strict'


/**This function removes the first element of an array passed by or retuns undefined if length is 0
 * 
 * @param {array} array The array to do the shift
 */



function shift(array) {
    if (!(array instanceof Array)) throw TypeError('is not an array');
    var temp = []
    var n = 0

    if (array.length != 0) {
        for (var i = 1; i < array.length; i++) {
            temp[n] = array[i]
            n++
        }

        return temp
    }
    else{
        return undefined
    }
}


