console.log("DEMO", "fill");

var array1 = [1, 2, 3, 4,5,6];

console.log("Case 1");
// fill with 0 from position 2 until position 4
console.log(fill(array1, 0, 2, 4));
// expected output: [1, 2, 0, 0,5,6]

console.log("Case 2");
// fill with 5 from position 1
console.log(fill(array1, 5, 1));
// expected output: [1, 5, 5, 5,5,5]

console.log("Case 3");
console.log(fill(array1, 6));
// expected output: [6, 6, 6, 6, 6, 6]
