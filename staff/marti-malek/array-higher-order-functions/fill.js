/*Function fill: Fills the "arr" with the desired "value" from position "start" to position "end"*/

function fill(arr, value, start, end) {
    for (; start < arr.length; start++) {
        if (arr[start] == arr[end]) {
            return;
        } else {
            arr[start] = value;
        }
    }
}

var a = [1,2,3,4]

fill(a, 4, 1, 3);

console.log(a);