console.log('DEMO', 'some');

var array = [1, 2, 3, 4, 5];

console.log("Case 1");

var even = function(element) {
  // checks whether an element is even
  return element % 2 === 0;
};

console.log(some(array, even));
// expected output: true

console.log("Case 2");
console.log(some(array, function (value) { return value > 10; }));
// false
