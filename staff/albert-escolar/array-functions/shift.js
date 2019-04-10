'use strict'


function shift(array) {
    var extractedIndex = [];
    extractedIndex[0] = array[0];
    var temporalArray = [];
    var j = 0;
    for (var i = 1; i < array.length; i++){
        temporalArray[j] = array[i];
        j++;
    }
    array.length = temporalArray.length;
    for(var i =0; i<array.length;i++){
        array[i]=temporalArray[i];
    }
    return extractedIndex
}
