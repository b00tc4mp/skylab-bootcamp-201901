console.log("DEMO", "find");

var array1 = [5, 12, 8, 130, 44];

function isLargeNumber(element) {
  return element > 13;
}

console.log(find(array1, isLargeNumber));
// expected output: 130
