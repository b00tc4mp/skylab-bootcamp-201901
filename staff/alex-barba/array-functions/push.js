/**
 * Abstraction of push.
 * 
 * Adds element at the end of an Array.
 * 
 * @param {Element} element - The element to add.
 * @param {Array} arr - The array to add the object at the end.
 * @param {Function} func - The expression to evaluate.
 */
function push(element, arr, func) {
    arr[arr.length]=element 
    func(arr);
}

// use case 1

var a = [1, 2, 3];

var b = 4;

push(b, a, function (v) { console.log(v) }); // output: 1, 2, 3, 4