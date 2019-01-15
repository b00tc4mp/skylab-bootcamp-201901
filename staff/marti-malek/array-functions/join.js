/* Function join: Join takes the elements of the array "arr" and adds them into a string which returns */
function join(arr) {
    var res = '';
    for (var i = 0; i < arr.length; i++) {
        res += arr[i];
    }
    return res;
}

var a = ['hello', 'world'];

join(a);