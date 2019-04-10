
/**
 * The function changes the contents of an array by removing or replacing existing elements and/or adding new elements in place.
 * 
 * @param {array} array 
 * @param {number} origin 
 * @param {number} erase 
 * @param {*} add 
 */

var splice = (function (array, start, todelete, item) {
    "use strict";
    if (!(array instanceof Array)) throw TypeError(array + ' is not an array');
    if (isNaN(start) && start === undefined ) throw TypeError(start + ' is not a starting value');
    if (todelete > (array.length - start) || todelete === undefined) { todelete = array.length - start };

    var items = [], initial = [], end = [], items = [], tempArr = [], i, k = 0;

    //add the items for the arguments in items array;
    if (arguments.length > 3) {
        for (var i = 3; i < arguments.length; i++) {
            items[items.length] = arguments[i];
        }
    }

    //Start of the new
    for (i = 0; i < start; i++) {
        initial[i] = array[i]
    };

    //end of the new
    for (i = (start + todelete); i < array.length; i++) {
        end[k] = array[i]
        k++;
    };


    //Put all argumnets into an array 
    for (i = 0; i < initial.length; i++) {
        tempArr[tempArr.length] = initial[i];
    }
    for (i = 0; i < items.length; i++) {
        tempArr[tempArr.length] = items[i];
    }
    for (i = 0; i < end.length; i++) {
        tempArr[tempArr.length] = end[i];
    }

    array.length = tempArr.length;

    for (i = 0; i < tempArr.length; i++) {
        array[i] = tempArr[i];
    }

    return array;
});
