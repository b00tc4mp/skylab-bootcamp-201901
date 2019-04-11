'use strict'


function map(array, callback) {
    if(!(array instanceof Array)) throw TypeError(array + ' is not an array');
    if(!(callback instanceof Function)) throw TypeError(callback + ' is not a function');

    var newArray = [];
    for (var i = 0; i < array.length; i++) {
        newArray[i] = callback(array[i])
    }
    return newArray;
}