suite("indexof");

test("find index of the argument", function() {
  var paragraph =
    "The quick brown fox jumped over the lazy dog. If the dog barked, was it really lazy?";
  var searchTerm = "dog";
  var indexOfFirst = paragraph.indexOf(searchTerm);

  return (
    'The index of the first "' +
    searchTerm +
    '" from the beginning is ' +
    indexOfFirst
  );

  var expected = "The index of the first dog from the beginning is 41";
  if (indexOfFirst !== expected)
    throw Error(
      "index value " + indexOfFirst + " does not match expected " + expected
    );
});

test("argument is an array", function() {
  var array = ["p", "a", "b", "l", "o", "", "e", "m", "i", "l", "i", "o"];
  var error;
  try {
    indexof([], value);
  } catch (err) {
    error = err;
  }
  if (!error) throw Error("should have thrown an error");
  if (typeof array !== String) throw Error("the argument has to be a string");
});

test("argument is an array", function() {
  var value = ["p", "a", "b", "l", "o", "", "e", "m", "i", "l", "i", "o"];
  var error;
  try {
    indexof(string, []);
  } catch (err) {
    error = err;
  }
  if (!error) throw Error("should have thrown an error");
  if (typeof array !== String) throw Error("the argument has to be a string");
});
