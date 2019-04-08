console.log('DEMO', 'concat');

var array1 = ["The","world","is"];
var array2 = ["a","fuckin*","hell"];
var array3 = [6, 6, 6,];

console.log("Case 1");

console.log(concat(array1, array2));
// ["The","world","is", "a","fuckin*","hell"]

console.log("Case 2");

console.log(concat(array1, array2, array3));
// ["The","world","is", "a","fuckin*","hell", 6, 6, 6,];