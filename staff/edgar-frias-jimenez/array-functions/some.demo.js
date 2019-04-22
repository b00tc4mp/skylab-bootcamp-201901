console.log('-----');
console.log('DEMO', 'some');

console.log('Case 1');
var b = [1, 2, 3, 4, 5];

console.log('var b = [1, 2, 3, 4, 5]; -> some(b, even)?');

var even = function(element) {
  // checks whether an element is even
  return element % 2 === 0;
};

console.log(some(b, even));
// expected output: true

console.log('Case 2');
var letters = ['a', 1, true];

console.log("var letters = ['a', 1, true]; -> some strings?");

var hasLetters = function(element) {
  //check if there are letters inside an array
  return typeof element === "string";
}

console.log(some(letters, hasLetters));
// expected output true
