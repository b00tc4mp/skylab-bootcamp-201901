suite("TEST indexOf");

test("First argument is not array", function() {
  var error;

  var arr = [2, 9, 9];

  var found;

  try {
    found = indexOf(2, 2);
  } catch (err) {
    error = err;
  }

  if (!error) throw Error("should have thrown an error");
  if (!(error instanceof Error)) throw Error("should have thrown TypeError");
});

test("Second argument is necessary", function() {
  var error;

  var arr = [2, 9, 9];

  var found;

  try {
    found = indexOf(arr);
  } catch (err) {
    error = err;
  }

  if (!error) throw Error("should have thrown an error");
  if (!(error instanceof Error)) throw Error("should have thrown TypeError");
});






