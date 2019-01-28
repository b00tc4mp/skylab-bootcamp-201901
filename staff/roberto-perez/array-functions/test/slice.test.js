suite("slice");

test("Slice arr", function() {
  var arr = ["Rita", "Pedro", "Miguel", "Ana", "Vanesa"];

  var expected = ["Pedro", "Miguel"];

  var masculino = slice(arr, 1, 3);

  if (masculino.toString() !== expected.toString())
    throw Error(
      "The new array " + masculino + " does not match expected " + expected
    );
});

test("Slice arr with end argument > arr length", function() {
  var arr = ["Rita", "Pedro", "Miguel", "Ana", "Vanesa"];

  var expected = ["Pedro", "Miguel", "Ana", "Vanesa"];

  var masculino = slice(arr, 1, 10);

  if (masculino.toString() !== expected.toString())
    throw Error(
      "The new array " + masculino + " does not match expected " + expected
    );
});

test("Negative start argument", function() {
  var arr = ["Rita", "Pedro", "Miguel", "Ana", "Vanesa"];

  var expected = ["Miguel", "Ana", "Vanesa"];

  var masculino = slice(arr, -3);

  if (masculino.toString() !== expected.toString())
    throw Error(
      "The new array " + masculino + " does not match expected " + expected
    );
});

test("Negative end argument", function() {
  var arr = ["Rita", "Pedro", "Miguel", "Ana", "Vanesa"];

  var expected = ["Pedro"];

  var masculino = slice(arr, 1, -3);

  if (masculino.toString() !== expected.toString())
    throw Error(
      "The new array " + masculino + " does not match expected " + expected
    );
});

test("First argument is not array", function() {
  var error;

  var obj = {};

  var masculino;

  try {
    masculino = slice(obj, 1, -3);
  } catch (err) {
    error = err;
  }

  if (!error) throw Error("should have thrown an error");
  if (!(error instanceof Error)) throw Error("should have thrown TypeError");
});
