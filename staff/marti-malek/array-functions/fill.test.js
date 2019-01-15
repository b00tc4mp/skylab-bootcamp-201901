suite('fill');

test('correct full arguments', function () {
    var arr = [1, 2, 3, 4, 5];

    var res = fill(arr, 0, 0, 2);

    var expected = [0, 0, 3, 4, 5];

    if (res !== arr) throw Error('array and result should be the same');
    if (res.toString() !== expected.toString()) throw Error('result should be the one expected');
    if (arr.toString() !== expected.toString()) throw Error('array should have been changed to the one expected');
});

test('3 correct arguments', function () {
    var arr = [1, 2, 3, 4, 5];

    var res = fill(arr, 0, 2);

    var expected = [1, 2, 0, 0, 0];

    if (res !== arr) throw Error('array and result should be the same');
    if (res.toString() !== expected.toString()) throw Error('result should be the one expected');
    if (arr.toString() !== expected.toString()) throw Error('array should have been changed to the one expected');
});

test('2 correct arguments', function () {
    var arr = [1, 2, 3, 4, 5];

    var res = fill(arr, 0);

    var expected = [0, 0, 0, 0, 0];

    if (res !== arr) throw Error ('array and result should be the same');
    if (res.toString() !== expected.toString()) throw Error('result should be the one expected');
    if (arr.toString() !== expected.toString()) throw Error('array should have been changed to the one expected');
});

test('negative start and end', function () {
    var arr = [1, 2, 3, 4, 5];

    var res = fill(arr, 0, -3, -2);

    var expected = [1, 2, 0, 4, 5];

    if (res !== arr) throw Error ('array and result should be the same');
    if (res.toString() !== expected.toString()) throw Error ('result should be the one expected');
    if (arr.toString() !== expected.toString()) throw Error ('array should have been changed to the one expected');
});

test('negative start', function () {
    var arr = [1, 2, 3, 4, 5];

    var res = fill(arr, 0, -3, 4);

    var expected = [1, 2, 0, 0, 5];

    if (res !== arr) throw Error ('array and result should be the same');
    if (res.toString() !== expected.toString()) throw Error ('result should be the one expected');
    if (arr.toString() !== expected.toString()) throw Error ('array should have been changed to the one expected');
});

test('fail on object instead of array', function () {
    var error;

    try {
        fill({}, 0);
    } catch (err) {
        error = err;
    }

    if (!error) throw Error ('should have thrown an error');
    if (!error instanceof TypeError) throw Error ('should have thrown TypeError');
});

test('fail on number instead of array', function () {
    var error;

    try {
        fill(1, 0);
    } catch (err) {
        error = err;
    }

    if (!error) throw Error ('should have thrown an error');
    if (!error instanceof TypeError) throw Error ('should have thrown TypeError');
});


// use case 8

test('fail on boolean instead of array', function () {
    var error;

    try {
        fill(true, 0);
    } catch (err) {
        error = err;
    }

    if (!error) throw Error ('should have thrown an error');
    if (!error instanceof TypeError) throw Error ('should have thrown TypeError');
});

test('fail on too many arguments', function () {
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