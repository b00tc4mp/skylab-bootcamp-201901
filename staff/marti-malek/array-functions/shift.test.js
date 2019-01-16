suite('shift');

test('Correct', function () {
    var a = [1,2,3,4];

    var res = shift(a);

    var expected = 1;

    assert(res.toString() === expected.toString(), 'should have returned correct');
});

test('Fail on too many arguments', function () {
    var a = [1,2,3,4];

    try {
        shift(a);
    } catch (err) {
        error = err;
    }

    assert(error, 'should have thrown error');
});

test('Fail on object instead of array', function () {
    var a = {};

    try {
        shift(a);
    } catch (err) {
        error = err;
    }

    assert(error instanceof TypeError, 'should have thrown error');
});

test('Fail on boolean instead of array', function () {
    var a = true;

    try {
        shift(a);
    } catch (err) {
        error = err;
    }

    assert(error instanceof TypeError, 'should have thrown error');
});

test('Fail on number instead of array', function () {
    var a = 4;

    try {
        shift(a);
    } catch (err) {
        error = err;
    }

    assert(error instanceof TypeError, 'should have thrown error');
});