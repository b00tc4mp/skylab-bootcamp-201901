/**
 * Abstraction of splice.
 * 
 * this method changes the contents of an array by removing or replacing existing 
 * elements and/or adding new elements.
 * 
 * @param {Array} array -array to splice
 * @param {number} start -number to start to splice
 * @param {number} delated - number of elements to delate
 * @param {*} items - items that I want to add. The number of items can be infinit.
 * 
 * @throws {TypeError} - when array is not an Array
 * @throws {TypeError} - when del or start are not numbers
 * 
 * @return {Array} - cut array
 */

function splice(array, start, delated) {
    if(!(array instanceof Array)) throw TypeError(array+' should be an Array');
    if ( typeof start!=="number") throw TypeError(start+' is not a number');

    delated = delated===undefined? array.length : delated

    var res = [];
    var orig = [];
    var final = [];
    var items = [];

    var countFinal = 0;

    var countItems = 0;


    //Miro cuantos items tengo
    if (arguments.length > 3) {
        items.length = arguments.length - 3;

        for (var i = 0; i < arguments.length - 3; i++) {
            items[i] = arguments[i + 3];

        }
    }

    for (var i = 0; i < array.length; i++) {
        if (i >= start && i < (delated + start)) {
            res[res.length] = array[i];

        } else if (i >= (delated + start)) {
            final[final.length] = array[i];

        } else {
            orig[orig.length] = array[i];
        }
    }



    array.length = orig.length + items.length + final.length;


    for (var i = 0; i < array.length; i++) {
        if (i >= start && countItems < items.length) {
            array[i] = items[countItems];
            countItems++;

        } else if (i >= start && countItems === items.length) {
            array[i] = final[countFinal];
            countFinal++;

        } else {
            array[i] = orig[i];
        }


     }
     return res
}
