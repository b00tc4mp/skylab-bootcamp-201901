suite('indexOf()');

test('not found with 1 argument', function () {
    var arr = [1, 2, 3, 4, 5];
    var res = indexOf(arr, 6);
    var expected = -1;

    if (res !== expected) throw Error('result ' + res + ' does not satisfy the one expected: ' + expected);
});

test('found with 1 argument', function () {
    var arr = [1, 2, 3, 4, 5];
    var res = indexOf(arr, 5);
    var expected = 4;

    if (res !== expected) throw Error('result ' + res + ' does not satisfy the one expected: ' + expected);
});

test('not found with 2 arguments', function () {
    var arr = [1, 2, 3, 4, 5];
    var res = indexOf(arr, 1, 2);
    var expected = -1;

    if (res !== expected) throw Error('result ' + res + ' does not satisfy the one expected: ' + expected);
});

test('found with 2 arguments', function () {
    var arr = [1, 2, 3, 4, 5];
    var res = indexOf(arr, 1, 2);
    var expected = -1;

    if (res !== expected) throw Error('result ' + res + ' does not satisfy the one expected: ' + expected);
});

test('too many arguments', function () {
    var error;
    try {
        var res = indexOf({}, 1, 2, 3);
    } catch (err) {
        error = err;
    }
    
    if (!error) throw Error('should have thrown an error');
    if (!(error instanceof Error)) throw Error('error should be a type of Error');
});

test('fail on number instead of array', function () {
    var error;
    try {
        indexOf(1, 1, 0);
    } catch (err) {
        error = err;
    }

    if (!error) throw Error('should have thrown an error');
    if (!(error instanceof Error)) throw Error('error should be a type of Error');
});

test('fail on object instead of array', function () {
    var error;
    try {
        indexOf({}, 1, 0);
    } catch (err) {
        error = err;
    }

    if (!error) throw Error('should have thrown an error');
    if (!(error instanceof Error)) throw Error('error should be a type of Error');
});


