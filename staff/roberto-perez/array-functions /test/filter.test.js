suite("filter");

test("Filter elements into array", function() {
  var arr = ["spray", "limit", "elite", "exuberant", "destruction", "present"];

  var expected = ["exuberant", "destruction", "present"];

  var result = filter(arr, function(word) {
    return word.length > 6;
  });

  if (result.toString() !== expected.toString())
    throw Error("result should be the one expected");
});

test("First argument is not array", function() {
  var error;

  var arr = {};

  var result;

  try {
    result = filter(arr, function(word) {
      return word.length > 6;
    });
  } catch (err) {
    error = err;
  }

  if (!error) throw Error("should have thrown an error");
  if (!(error instanceof Error)) throw Error("should have thrown TypeError");
});

test("Second argument is not a function", function() {
  var error;

  var arr = [1, 2, 3, 4, 5];

  var even;

  try {
    result = filter(arr, 2);
  } catch (err) {
    error = err;
  }

  if (!error) throw Error("should have thrown an error");
  if (!(error instanceof Error)) throw Error("should have thrown TypeError");
});
