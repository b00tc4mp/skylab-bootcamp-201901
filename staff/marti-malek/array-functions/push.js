/* Function push: Adds the "value" to the "arr" */

function push(arr, value) {
    for (var i = 0; i < arr.length; i++) {
        if (i == arr.length-1) {
            arr[i+1] = value;
            return arr.length;
        }
    }
}

var a = ["Hola", "mundo", "ciao"];

push(a, "mondo");

console.log(a);

