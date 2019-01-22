suite('index-of');

test('passing all arguments', function () {
    var a = ['alex', 'barba', 'massana', 'barba'];
    var b = 'barba';
    var start = 2;
    var expected = 3;
    var result = indexOf(b,a, start);

    if (result !== expected) throw Error('found value ' + found + ' does not match expected ' + expected);
});

test('passing 2 arguments', function () {
    var a = ['alex', 'barba', 'massana', 'barba'];
    var b = 'barba';
    var expected = 1;
    var result = indexOf(b,a);

    if (result !== expected) throw Error('found value ' + found + ' does not match expected ' + expected);
});

test('fail on passing boolean as an array', function () {
    var error;
    var a = true;
    var b = 'barba';
    var start = 2;
    var expected = 3;
    try {
        indexOf(b,a, start);
    } catch (err) {
        error = err
    }
    if (!error) throw Error('should have thrown an error');
    if (!(error instanceof Error)) throw Error('error should be of type Error');
});

test('fail on passing object as an array', function () {
    var error;
    var a = {name: 'alex'}
    var b = 'alex';
    var start = 2;
    var expected = 3;
    try {
        indexOf(b,a, start);
    } catch (err) {
        error = err
    }
    if (!error) throw Error('should have thrown an error');
    if (!(error instanceof Error)) throw Error('error should be of type Error');
});

test('-1 as a result of passing > 3 elements', function () {
    var error;
    var a = ['alex', 'barba', 'massana', 'barba'];
    var b = 'alex';
    var start = 2;
    var expected = -1;
    var result = indexOf(b,a, start, b);

    if (result !== expected) throw Error('found value ' + found + ' does not match expected ' + expected);
});