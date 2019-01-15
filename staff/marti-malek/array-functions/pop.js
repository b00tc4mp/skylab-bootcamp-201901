/*Function pop: Erases the last element of the "arr*/

function pop(arr) {
    for (var i = 0; i < arr.length; i++) {
        if (i == arr.length-1) {
            arr.length = arr.length-1;
        }
    }
    return arr;
}

var a = [1,2,3,4];

pop(a);