suite('map');

test('all arguments', function () {
    var a = [1, 2, 3];

    var res = map(a, function (v) { return v + 10; });

    var expected = [11, 12, 13];

    if (res.toString() !== expected.toString()) throw Error('result should be the one expected');
});

test('fail on number instead of array', function () {
    var error;
    var a = 1;

    try {
        map(a, function (v) { return v + 10; });;
    } catch (err) {
        error = err;
    };

    if (!error) throw Error('should have thrown an error');
    if (!(error instanceof TypeError)) throw Error('error should be of type TypeError');
});

test('fail on boolean instead of array', function () {
    var error;
    var a = true;

    try {
        map(a, function (v) { return v + 10; });;
    } catch (err) {
        error = err;
    };

    if (!error) throw Error('should have thrown an error');
    if (!(error instanceof TypeError)) throw Error('error should be of type TypeError');
});

test('fail on more than 2 arguments', function () {
    var error;
    var a = [1, 2, 3, 4];

    try {
        map(a, 3, function (v) { return v + 10; });;
    } catch (err) {
        error = err;
    };

    if (!error) throw Error('should have thrown an error');
    if (!(error instanceof TypeError)) throw Error('error should be of type TypeError');
});

test('fail on not passing function as an argument', function () {
    var error;
    var a = [1, 2, 3, 4];

    try {
        map(a, '123');;
    } catch (err) {
        error = err;
    };

    if (!error) throw Error('should have thrown an error');
    if (!(error instanceof TypeError)) throw Error('error should be of type TypeError');
});

