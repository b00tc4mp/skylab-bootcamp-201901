suite('reverse');

test('Correct', function () {
    var a = [1, 2, 3, 4];

    var res = reverse(a);

    var expected = [4, 3, 2, 1];

    assert(res.toString() === expected.toString(), 'should return the correct answer');
});

test('Fail on too many arguments', function () {
    var a = [1, 2, 3, 4];

    try {
        reverse(a);
    } catch (err) {
        error = err;
    }

    assert(error, 'should have thrown an error');
});

test('Fail on boolean instead of array', function () {
    var a = true;

    try {
        reverse(a);
    } catch (err) {
        error = err;
    }

    assert(error instanceof TypeError, 'should have thrown an error');
});

test('Fail on object instead of array', function () {
    var a = {};

    try {
        reverse(a);
    } catch (err) {
        error = err;
    }

    assert(error instanceof TypeError, 'should have thrown an error');
});

test('Fail on number instead of array', function () {
    var a = 4;

    try {
        reverse(a);
    } catch (err) {
        error = err;
    }

    assert(error instanceof TypeError, 'should have thrown an error');
});

