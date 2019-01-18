/**
 * 
 * @param {array} array1 
 * @param {array} array2 
 */

function join(array1, array2) {
    var newArray = '';
    for (var i = 0; i < array1.length; i++) {
        newArray += array1[i];
    };
    for (var i = (array1.length); i < (array1.length + array2.length); i++) {
        newArray += array2[i];
    };
    return newArray;
}
join([1, 2, 3], [4, 5, 6]);