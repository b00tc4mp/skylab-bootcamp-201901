suite('slice');

test('Correct full arguments', function () {
    var a = [1,2,3,4,5];

    var res = slice(a,2,3);

    var expected = [3];

    assert(res.toString() === expected.toString(), 'should return the correct value');
});

test('Fail on too many arguments', function () {
    var a = [1,2,3,4,5];

    try {
        slice(a,2,3);
    } catch (err) {
        error = err;
    }

    assert(error, 'should have thrown error');
});

test('Fail on object instead of array', function () {
    var a = {};

    try {
        slice(a,2,3);
    } catch (err) {
        error = err;
    }

    assert(error instanceof TypeError, 'should have thrown error');
});

test('Fail on boolean instead of array', function () {
    var a = true;

    try {
        slice(a,2,3);
    } catch (err) {
        error = err;
    }

    assert(error instanceof TypeError, 'should have thrown error');
});

test('Fail on number instead of array', function () {
    var a = 4;

    try {
        slice(a,2,3);
    } catch (err) {
        error = err;
    }

    assert(error instanceof TypeError, 'should have thrown error');
});




