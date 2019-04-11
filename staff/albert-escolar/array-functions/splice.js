'use strict';

function splice(array, startIndex) {
    var erasedArray = [];
    if (startIndex < 0){ 
        var index = array.length + startIndex; // Aqui se suma porque startIndex es negativo.
    } else {
        var index = startIndex
    }
    for (var i = index ; i < array.length; i++) {
        erasedArray[erasedArray.length] = array[i];
    }
    array.length = index;
    return erasedArray;

}