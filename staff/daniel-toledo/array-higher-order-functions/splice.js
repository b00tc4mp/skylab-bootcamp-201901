/**
 * Abstraction of splice.
 * 
 * this method changes the contents of an array by removing or replacing existing 
 * elements and/or adding new elements.
 * 
 * @param {Array} arr -array to splice
 * @param {number} start -number to start to splice
 * @param {number} del - number of elements to delate
 * @param {*} items - items that I want to add. The number of items can be infinit.
 * 
 */

function splice(arr, start, del) {
    if(!(arr instanceof Array)) throw TypeError(arr+' should be an Array');
    if ( typeof start!=="number") throw TypeError(start+' is not a number');

    del = del===undefined? arr.length : del

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

    for (var i = 0; i < arr.length; i++) {
        if (i >= start && i < (del + start)) {
            res[res.length] = arr[i];

        } else if (i >= (del + start)) {
            final[final.length] = arr[i];

        } else {
            orig[orig.length] = arr[i];
        }
    }



    arr.length = orig.length + items.length + final.length;


    for (var i = 0; i < arr.length; i++) {
        if (i >= start && countItems < items.length) {
            arr[i] = items[countItems];
            countItems++;

        } else if (i >= start && countItems === items.length) {
            arr[i] = final[countFinal];
            countFinal++;

        } else {
            arr[i] = orig[i];
        }


     }
     return res
}
