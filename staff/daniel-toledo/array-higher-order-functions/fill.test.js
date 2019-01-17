suite('fill');

test('all arguments', function () {
    var arr = [1, 2, 3, 4, 5];

    var res = fill(arr, 0, 0, 2);

    var expected = [0, 0, 3, 4, 5];

    assert(res === arr, 'array and result should be the same');
    assert(res.toString() === expected.toString(), 'result should be the one expected');
    assert(arr.toString() === expected.toString(), 'array should have been changed to the one expected');
});

test('3 arguments', function () {
    var arr = [1, 2, 3, 4, 5];

    var res = fill(arr, 0, 2);

    var expected = [1, 2, 0, 0, 0];

    assert(res === arr, 'array and result should be the same');
    assert(res.toString() === expected.toString(), 'result should be the one expected');
    assert(arr.toString() === expected.toString(), 'array should have been changed to the one expected');
});

test('2 arguments', function () {
    var arr = [1, 2, 3, 4, 5];

    var res = fill(arr, 0);

    var expected = [0, 0, 0, 0, 0];

    assert(res === arr, 'array and result should be the same');
    assert(res.toString() === expected.toString(), 'result should be the one expected');
    assert(arr.toString() === expected.toString(), 'array should have been changed to the one expected');
});

test('negative start and end', function () {
    var arr = [1, 2, 3, 4, 5];

    var res = fill(arr, 0, -3, -2);

    var expected = [1, 2, 0, 4, 5];

    assert(res === arr, 'array and result should be the same');
    assert(res.toString() === expected.toString(), 'result should be the one expected');
    assert(arr.toString() === expected.toString(), 'array should have been changed to the one expected');
});


test('negative start', function () {
    var arr = [1, 2, 3, 4, 5];

    var res = fill(arr, 0, -3, 4);

    var expected = [1, 2, 0, 0, 5];

    assert(res === arr, 'array and result should be the same');
    assert(res.toString() === expected.toString(), 'result should be the one expected');
    assert(arr.toString() === expected.toString(), 'array should have been changed to the one expected');
});

test('fail on object instead of array', function () {
    var error;

    try {
        fill({}, 0);
    } catch (err) {
        error = err;
    }

    assert(error, 'should have thrown an error');
    assert(error instanceof TypeError, 'should have thrown TypeError');
});


test('fail on number instead of array', function () {
    var error;

    try {
        fill(1, 0);
    } catch (err) {
        error = err;
    }

    assert(error, 'should have thrown an error');
    assert(error instanceof TypeError, 'should have thrown TypeError');
});

test('fail on boolean instead of array', function () {
    var error;

    try {
        fill(true, 0);
    } catch (err) {
        error = err;
    }

    assert(error, 'should have thrown an error');
    assert(error instanceof TypeError, 'should have thrown TypeError');
});

test('fail on more than 4 arguments', function () {
    var error;

    var arr = [1, 2, 3, 4, 5];

    try {
        fill(arr, 0, 1, 3, true);
    } catch (err) {
        error = err;
    }

    assert(error, 'should have thrown an error');
    assert(error instanceof Error, 'should have thrown TypeError');
});