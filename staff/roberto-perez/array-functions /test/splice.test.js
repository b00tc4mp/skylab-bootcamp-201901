suite("splice");

test('Delete 0 items from index 2 and insert "drum"', function() {
  var arr = ["angel", "clown", "mandarin", "sturgeon"];

  var expected = [];
  var mutatedExpected = ["angel", "clown", "drum", "mandarin", "sturgeon"];

  var removed = splice(arr, 2, 0, "drum");

  if (removed.toString() !== expected.toString())
    throw Error(
      "The new array " + removed + " does not match expected " + expected
    );
  if (arr.toString() !== mutatedExpected.toString())
    throw Error(
      "The new array " + arr + " does not match expected " + mutatedExpected
    );
});

test("Remove 1 item from index 3", function() {
  var arr = ["angel", "clown", "drum", "mandarin", "sturgeon"];

  var expected = ["mandarin"];
  var mutatedExpected = ["angel", "clown", "drum", "sturgeon"];

  var removed = splice(arr, 3, 1);

  if (removed.toString() !== expected.toString())
    throw Error(
      "The new array " + removed + " does not match expected " + expected
    );
  if (arr.toString() !== mutatedExpected.toString())
    throw Error(
      "The new array " + arr + " does not match expected " + mutatedExpected
    );
});

test('Remove 1 element from index 2 and insert "trumpet"', function() {
  var arr = ["angel", "clown", "drum", "sturgeon"];

  var expected = ["drum"];
  var mutatedExpected = ["angel", "clown", "trumpet", "sturgeon"];

  var removed = splice(arr, 2, 1, "trumpet");

  if (removed.toString() !== expected.toString())
    throw Error(
      "The new array " + removed + " does not match expected " + expected
    );
  if (arr.toString() !== mutatedExpected.toString())
    throw Error(
      "The new array " + arr + " does not match expected " + mutatedExpected
    );
});

test('Delete 2 elements from index 0 and insert "parrot", "anemone" and "blue"', function() {
  var arr = ["angel", "clown", "trumpet", "sturgeon"];

  var expected = ["angel", "clown"];
  var mutatedExpected = ["parrot", "anemone", "blue", "trumpet", "sturgeon"];

  var removed = splice(arr, 0, 2, "parrot", "anemone", "blue");

  if (removed.toString() !== expected.toString())
    throw Error(
      "The new array " + removed + " does not match expected " + expected
    );
  if (arr.toString() !== mutatedExpected.toString())
    throw Error(
      "The new array " + arr + " does not match expected " + mutatedExpected
    );
});

test("Remove 1 item from index -2", function() {
  var arr = ["angel", "clown", "mandarin", "sturgeon"];

  var expected = ["mandarin"];
  var mutatedExpected = ["angel", "clown", "sturgeon"];

  var removed = splice(arr, -2, 1);

  if (removed.toString() !== expected.toString())
    throw Error(
      "The new array " + removed + " does not match expected " + expected
    );
  if (arr.toString() !== mutatedExpected.toString())
    throw Error(
      "The new array " + arr + " does not match expected " + mutatedExpected
    );
});

test("Remove all elements after index 2", function() {
  var arr = ["angel", "clown", "mandarin", "sturgeon"];

  var expected = ["mandarin", "sturgeon"];
  var mutatedExpected = ["angel", "clown"];

  var removed = splice(arr, 2);

  if (removed.toString() !== expected.toString())
    throw Error(
      "The new array " + removed + " does not match expected " + expected
    );
  if (arr.toString() !== mutatedExpected.toString())
    throw Error(
      "The new array " + arr + " does not match expected " + mutatedExpected
    );
});

test("First argument is not array", function() {
  var error;

  var arr = ["angel", "clown", "mandarin", "sturgeon"];

  var masculino;

  try {
    masculino = splice(obj, "hola", 1);
  } catch (err) {
    error = err;
  }

  if (!error) throw Error("should have thrown an error");
  if (!(error instanceof Error)) throw Error("should have thrown TypeError");
});

test("Second argument is not a number", function() {
  var error;

  var obj = {};

  var masculino;

  try {
    masculino = splice(obj, 2, 1);
  } catch (err) {
    error = err;
  }

  if (!error) throw Error("should have thrown an error");
  if (!(error instanceof Error)) throw Error("should have thrown TypeError");
});

test("If third argument is 0 or negative, do nothing", function() {
  var arr = ["angel", "clown", "mandarin", "sturgeon"];

  var expected = [];
  var mutatedExpected = ["angel", "clown", "mandarin", "sturgeon"];

  var removed = splice(arr, 2, 0);

  if (removed.toString() !== expected.toString())
    throw Error(
      "The new array " + removed + " does not match expected " + expected
    );
  if (arr.toString() !== mutatedExpected.toString())
    throw Error(
      "The new array " + arr + " does not match expected " + mutatedExpected
    );
});
