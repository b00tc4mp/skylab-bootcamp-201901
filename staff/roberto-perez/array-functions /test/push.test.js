suite("push");

test("Push arguments into arr", function() {
  var error;

  var arr = ["soccer", "baseball"];

  var expected = 4;

  var newLength = push(arr, "football", "swimming");

  if (expected !== newLength) throw Error('The new array length ' + newLength + ' does not match expected ' + expected);

});

test("No push arguments into arr", function() {
  var error;

  var arr = ["soccer", "baseball"];

  var expected = 2;

  var newLength = push(arr);

  if (expected !== newLength) throw Error('The new array length ' + newLength + ' does not match expected ' + expected);

});

test("Arr has been modified", function() {
  var error;

  var arr = ["soccer", "baseball"];

  var expected = ["soccer", "baseball", "football", "swimming"];

  push(arr, "football", "swimming");

  if (arr.toString() !== expected.toString()) throw Error('The new array ' + arr + ' does not match expected ' + expected);

});

test("First argument is not array", function() {
  var error;

  var obj = {};

  var newLength;

  try {
    newLength = push(arr, "football", "swimming");
  } catch (err) {
    error = err;
  }

  if (!error) throw Error("should have thrown an error");
  if (!(error instanceof Error)) throw Error("should have thrown TypeError");
});