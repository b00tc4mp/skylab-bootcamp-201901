console.log('DEMO', 'reduce');


const array7 = [1, 2, 3, 4];
const reducer = function (accumulator, currentValue) { return accumulator + currentValue; };

console.log("Case 1");
// 1 + 2 + 3 + 4
console.log(reduce(array7, reducer));
// expected output: 10

console.log("Case 2");
// 5 + 1 + 2 + 3 + 4
console.log(reduce(array7, reducer, 5));
// expected output: 15
