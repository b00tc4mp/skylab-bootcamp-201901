suite("reverse");

test("Reverse arr", function() {
  var arr = [1, 2, 3, 4];

  var expected = [4, 3, 2, 1];

  reverse(arr);

  if (arr.toString() !== expected.toString())
    throw Error(
      "The new array " + arr + " does not match expected " + expected
    );
});

test("First argument is not array", function() {
  var error;

  var obj = {};

  var newArr;

  try {
    newArr = reverse(obj);
  } catch (err) {
    error = err;
  }

  if (!error) throw Error("should have thrown an error");
  if (!(error instanceof Error)) throw Error("should have thrown TypeError");
});

test("Pass empty array", function() {
  var arr = [];

  var expected = [];

  reverse(arr);

  if (arr.toString() !== expected.toString())
    throw Error("The new array [] does not match expected []");
});
