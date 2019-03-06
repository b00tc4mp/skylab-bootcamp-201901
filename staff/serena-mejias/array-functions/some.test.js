suite("some");

var fruits = ["apple", "banana", "mango", "guava"];

test("tests whether at least one element in the array passes the test implemented by the provided function", function() {
  var result = some(fruits, function(value) {
    return value === "strawberry";
  });
  var expected = false;

  if (!result === expected) "should be the same";
});

test('first argument must be an array', function(){
    var error;

    try {
        some('some');
    } catch(err) {
        error = err;
    }
    if (error) "should be an error";
})

test('second argument must be an array', function(){
    var error;

    try {
        some([],'some');
    } catch(err) {
        error = err;
    }
    if (error) "should be an error";
})