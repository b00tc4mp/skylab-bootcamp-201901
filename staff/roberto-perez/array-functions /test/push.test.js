suite("TEST push");

test("All arguments are correct", function() {
  var error;

  var arr = ["soccer", "baseball"];

  var expected = ["soccer", "baseball", "football", "swimming"];

  var pushIndexElement = push(arr, "football", "swimming");

  console.log(expected);
  console.log(arr);

  if (expected !== arr) throw Error("arr and pushIndexElement should be the same");

});