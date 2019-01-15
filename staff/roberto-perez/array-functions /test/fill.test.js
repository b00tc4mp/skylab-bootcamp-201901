suite("TEST fill");

// use case 1

test("All arguments are correct", function() {
  var arr = [1, 2, 3, 4, 5];

  var res = fill(arr, 0, 0, 2);

  var expected = [0, 0, 3, 4, 5];

  if (res !== arr) throw Error("array and result should be the same");
  if (res.toString() !== expected.toString())
    throw Error("result should be the one expected");
  if (arr.toString() !== expected.toString())
    throw Error("array should have been changed to the one expected");
});

// use case 2

test("use case 2", function() {
  var arr = [1, 2, 3, 4, 5];

  var res = fill(arr, 0, 2);

  var expected = [1, 2, 0, 0, 0];

  if (res !== arr) throw Error("array and result should be the same");
  if (res.toString() !== expected.toString())
    throw Error("result should be the one expected");
  if (arr.toString() !== expected.toString())
    throw Error("array should have been changed to the one expected");
});

// use case 3

test("use case 3", function() {
  var arr = [1, 2, 3, 4, 5];

  var res = fill(arr, 0);

  var expected = [0, 0, 0, 0, 0];

  if (res !== arr) throw Error("array and result should be the same");
  if (res.toString() !== expected.toString())
    throw Error("result should be the one expected");
  if (arr.toString() !== expected.toString())
    throw Error("array should have been changed to the one expected");
});

// use case 4

test("use case 4", function() {
  var arr = [1, 2, 3, 4, 5];

  var res = fill(arr, 0, -3, -2);

  var expected = [1, 2, 0, 4, 5];

  if (res !== arr) throw Error("array and result should be the same");
  if (res.toString() !== expected.toString())
    throw Error("result should be the one expected");
  if (arr.toString() !== expected.toString())
    throw Error("array should have been changed to the one expected");
});

// use case 5

test("use case 5", function() {
  var arr = [1, 2, 3, 4, 5];

  var res = fill(arr, 0, -3, 4);

  var expected = [1, 2, 0, 0, 5];

  if (res !== arr) throw Error("array and result should be the same");
  if (res.toString() !== expected.toString())
    throw Error("result should be the one expected");
  if (arr.toString() !== expected.toString())
    throw Error("array should have been changed to the one expected");
});


// use case 6

test("use case 6", function() {

    var error;

    try {
        fill({}, 0);
    } catch (err) {
        error = err;
    }

    if (!error) throw Error('should have thrown an error');
    if (!(error instanceof Error)) throw Error('should have thrown TypeError');
});


// use case 7

test("use case 7", function() {

    var error;

    try {
        fill(1, 0);
    } catch (err) {
        error = err;
    }

    if (!error) throw Error('should have thrown an error');
    if (!(error instanceof Error)) throw Error('should have thrown TypeError');
});


// use case 8

test("use case 8", function() {

    var error;

    try {
        fill(true, 0);
    } catch (err) {
        error = err;
    }

    if (!error) throw Error('should have thrown an error');
    if (!(error instanceof Error)) throw Error('should have thrown TypeError');
});


// use case 9

test('Fail on more than 4 arguments', function () {
    var error;

    var arr = [1, 2, 3, 4, 5];

    try {
        fill(arr, 0, 1, 3, true);
    } catch (err) {
        error = err;
    }

    if (!error) throw Error('should have thrown an error');
    if (!(error instanceof Error)) throw Error('should have thrown TypeError');
});
