/*Function indexOf: Searches through the array "arr" for the "value" from position in "start" of the array */

function indexOf(arr, value, start) {
    for (; start < arr.length; start++) {
        if (arr[start] === value)
        return start;
    }
};

var a = [1,2,3,4];

var res = indexOf(a, 3, 1);

console.log(res);