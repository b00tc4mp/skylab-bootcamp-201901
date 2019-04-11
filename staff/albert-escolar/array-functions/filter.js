'use strict' 

function filter(array, callback) {
    if(!(array instanceof Array)) throw TypeError(array+' is not an array');
    if(!(callback instanceof Function)) throw TypeError(callback + ' is not a function')
    var newArray = [];
    for (var i = 0; i < array.length; i++) {
        if(callback(array[i])){
            newArray[newArray.length] = array[i];
        }

    } 
    return newArray;

}
