'use strict';

function slice(array, startIndex, endIndex) {
    var newArray = [];
    
    if (!(endIndex)) {
        endIndex = array.length;
    }
    if (startIndex > array.length) {
        return newArray;
    }
    for (var i = startIndex; i < endIndex; i++) {
        newArray[newArray.length] = array[i];

    }
    return newArray;
}