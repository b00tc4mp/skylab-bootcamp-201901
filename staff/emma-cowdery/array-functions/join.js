/**
 * 
 * @param {array} array1 
 * @param {string} separator
 */




function join(array, separator) {
    var newString = '';
    if (separator === undefined) {
        for (var i = 0; i < array1.length; i++) {
            newString += ',' + array1[i];
        };
    };

}

join([1, 2, 3])

function join(array1, array2) {
    var newArray = '';
    for (var i = 0; i < array1.length; i++) {
        newArray += array1[i];
    };
    for (var i = 0; i < array2.length; i++) {
        newArray += array2[i];
    };
    return newArray;
}
join([1, 2, 3], [4, 5, 6]);