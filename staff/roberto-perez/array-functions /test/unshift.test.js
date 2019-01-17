suite("unshift");

test("Unshift elements array", function() {
  var arr = [1, 2];

  var expected = 3;

  var result = unshift(arr, 0);

  if (result.toString() !== expected.toString())
    throw Error("result should be the one expected");
});

test("Unshift array element into array", function() {
  var arr = [1, 2];

  var expected = 3;

  var result = unshift(arr, [-3]);

  if (result.toString() !== expected.toString())
    throw Error("result should be the one expected");
});

test("Not array", function() {
  var obj = {};

  try {
    var result = unshift(obj);
  } catch (err) {
    error = err;
  }

  if (!error) throw Error("Should have thrown an error");
  if (!(error instanceof TypeError))
    throw Error("should have thrown TypeError");
});
