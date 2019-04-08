console.log("DEMO", "findIndex");

var array1 = [5, 12, 8, 130, 44];

function isLargeNumber(element) {
  return element > 13;
}

console.log(findIndex(array1, isLargeNumber));
// expected output: 3
