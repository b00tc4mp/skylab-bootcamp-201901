suite("indexOf");

test('Find element index that exists', function () {
  var array = [2, 9, 9];

  var found = indexOf(array, 2);

  var expected = 0;

  if (found !== expected) throw Error('found index ' + found + ' does not match expected ' + expected);
});


test('Fail on number instead of array', function () {
  var error;

  var array = 10;

  try {
      find(array, 2);
  } catch (err) {
      error = err;
  }

  if (!error) throw Error('should have thrown an error');
  if (!(error instanceof TypeError)) throw Error('error should be of type TypeError');

  var expectedErrorMessage = array + ' is not an array';

  if (error.message !== expectedErrorMessage) throw Error('error message (' + error.message + ')  does not match expected (' + expectedErrorMessage + ')');
});

test('Find element negative index', function () {
  var array = [2, 9, 9];

  var found = indexOf(array, 2, -3);

  var expected = -1;

  if (found !== expected) throw Error('found index ' + found + ' does not match expected ' + expected);
});

// test("First argument is not array", function() {
//   var error;

//   var arr = [2, 9, 9];

//   var found;

//   try {
//     found = indexOf(2, 2);
//   } catch (err) {
//     error = err;
//   }

//   if (!error) throw Error("should have thrown an error");
//   if (!(error instanceof Error)) throw Error("should have thrown TypeError");
// });

// test("Second argument is necessary", function() {
//   var error;

//   var arr = [2, 9, 9];

//   var found;

//   try {
//     found = indexOf(arr);
//   } catch (err) {
//     error = err;
//   }

//   if (!error) throw Error("should have thrown an error");
//   if (!(error instanceof Error)) throw Error("should have thrown TypeError");
// });






