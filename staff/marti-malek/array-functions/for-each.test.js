suite('forEach');

test('Fail on boolean instead of function', function () {
    var error;
    var a = [1, 2, 3];

    try {
        forEach(a, true);
    } catch (err) {
        error = err;
    }

    assert(Error, 'should have thrown an error');
    assert(error instanceof TypeError, 'should have thrown an error');
});

test('Fail on number instead of function', function () {
    var error;
    var a = [1, 2, 3];

    try {
        forEach(a, 4);
    } catch (err) {
        error = err;
    }

    assert(Error, 'should have thrown an error');
    assert(error instanceof TypeError, 'should have thrown an error');
});

test('Fail on string instead of function', function () {
    var error;
    var a = [1, 2, 3];

    try {
        forEach(a, "hello");
    } catch (err) {
        error = err;
    }

    assert(Error, 'should have thrown an error');
    assert(error instanceof TypeError, 'should have thrown an error');
});

test('Fail on object instead of function', function () {
    var error;
    var a = [1, 2, 3];

    try {
        forEach(a, {});
    } catch (err) {
        error = err;
    }

    assert(Error, 'should have thrown an error');
    assert(error instanceof TypeError, 'should have thrown an error');
});

test('Fail on too many arguments', function () {
    var error;
    var a = [1, 2, 3];
    var sum = 0;

    try {
        forEach(a, function (v) {sum += v}, true);
    } catch (err) {
        error = err;
    }

    assert(Error, 'should have thrown an error');
});


