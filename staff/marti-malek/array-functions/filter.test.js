suite('filter');

test('Correct with all the arguments', function () {
    var a = [1,2,3,4];

    var res = filter(a, function (v) {return v > 2});

    var expected = [3,4];

    assert(res.toString() === expected.toString(), 'should return correct output');
});

test('Correct without changing the original array', function () {
    var a = [1,2,3,4];

    filter(a, function (v) {return v > 2});

    var expected = [1,2,3,4];

    assert(a.toString() === expected.toString(), 'should return correct output');
});

test('Fail too many arguments', function () {
    var a = [1,2,3,4];

    try {
        filter(a, function (v) {return v > 2},true);
    } catch (err) {
        error = err;
    }

    assert(Error, 'should have thrown an error');
});

test('Fail on object instead of array', function () {
    var a = {};

    try {
        filter(a, function (v) {return v > 2});
    } catch (err) {
        error = err;
    }

    assert(TypeError, 'should have thrown an error');
});

test('Fail on boolean instead of array', function () {
    var a = true;

    try {
        filter(a, function (v) {return v > 2});
    } catch (err) {
        error = err;
    }

    assert(TypeError, 'should have thrown an error');
});

test('Fail on number instead of array', function () {
    var a = 4;

    try {
        filter(a, function (v) {return v > 2});
    } catch (err) {
        error = err;
    }

    assert(TypeError, 'should have thrown an error');
});

