'use strict';

function slice(array, startIndex, endIndex) {
    var newArray = [];
    if (!(endIndex)) {
        endIndex = array.length;
    }
    if (startIndex < 0 && !endIndex) {
        endIndex = array.length+startIndex;
        startIndex = 0;
    }
    if (startIndex > array.length) {
        return newArray;
    }
    for (var i = startIndex; i < endIndex; i++) {
        newArray[newArray.length] = array[i];

    }
    return newArray;
}