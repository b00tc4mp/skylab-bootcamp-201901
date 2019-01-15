suite('map');

test('all arguments are correct', function () {
    var a = [1, 2, 3]

    var res = map(a, function (v) { return v + 10; });

    var expected = [11, 12, 13];

    if (res.toString() !== expected.toString()) throw Error ('result should be the one exected');
});

test('Fail on string instead of array', function () {
    var error;

    var a = 'hola';

    try{
        map(a, function (v) { return v + 10; });
    } catch (err) {
        error = err;
    }

    if (!error) throw Error ('Should have thrown error');
    if (!error instanceof TypeError) throw Error ('should have thrown TypeError');
});

test('Fail on number instead of array', function () {
    var error;

    var a = 4;

    try{
        map(a, function (v) { return v + 10; });
    } catch (err) {
        error = err;
    }

    if (!error) throw Error ('Should have thrown error');
    if (!error instanceof TypeError) throw Error ('should have thrown TypeError');
});

test('Fail on boolean instead of array', function () {
    var error;

    var a = true;

    try{
        map(a, function (v) { return v + 10; });
    } catch (err) {
        error = err;
    }

    if (!error) throw Error ('Should have thrown error');
    if (!error instanceof TypeError) throw Error ('should have thrown TypeError');
});

test('Fail on object instead of array', function () {
    var error;

    var a = {};

    try{
        map(a, function (v) { return v + 10; });
    } catch (err) {
        error = err;
    }

    if (!error) throw Error ('Should have thrown error');
    if (!error instanceof TypeError) throw Error ('should have thrown TypeError');
});

test('Fail with 1 argument', function () {
    var error;

    var a = [1, 2, 3]

    try{
        map(a);
    } catch (err) {
        error = err;
    }

    if (!error) throw Error ('Should have thrown error');
});

