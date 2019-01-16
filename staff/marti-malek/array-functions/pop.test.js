suite('pop');

test('Correct full arguments', function () {
    var a = [1,2,3,4];

    var res = pop(a);

    var expected = 4;

    assert(res.toString() === expected.toString(), 'should return correct output')
});

test('Fail too many arguments', function () {
    var error;
    var a = [1,2,3,4];

    try {
        pop(a,2)
    } catch (err) {
        error = err;
    }

    assert(error, 'should return error')
});

test('Fail on object instead of array', function () {
    var error;
    var a = {};

    try {
        pop(a)
    } catch (err) {
        error = err;
    }

    assert(error, 'should return error')
});

test('Fail on string instead of array', function () {
    var error;
    var a = 'hello';

    try {
        pop(a)
    } catch (err) {
        error = err;
    }

    assert(error, 'should return error')
});

test('Fail on number instead of array', function () {
    var error;
    var a = 4;

    try {
        pop(a)
    } catch (err) {
        error = err;
    }

    assert(error, 'should return error')
});