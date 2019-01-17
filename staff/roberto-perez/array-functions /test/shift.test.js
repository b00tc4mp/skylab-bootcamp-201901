suite("shift");

test("Shift elements array", function() {
  var arr = ["ángel", "payaso", "mandarín", "cirujano"];

  var expected = "ángel";

  var result = shift(arr);

  if (result.toString() !== expected.toString())
    throw Error("result should be the one expected");
});

test("Not array", function() {
  var obj = {};

  try {
    var result = shift(obj);
  } catch (err) {
    error = err;
  }

  if (!error) throw Error("Should have thrown an error");
  if (!(error instanceof TypeError))
    throw Error("should have thrown TypeError");
});
