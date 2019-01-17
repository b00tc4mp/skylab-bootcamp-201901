suite('reverse');

test('passing all arguments', function (){
    var array = [1,2,3];

    var expected = [3,2,1];
    var found = reverse(array);

    if (found.toString() !== expected.toString()) throw Error('found value ' + found + ' does not match expected ' + expected);
});

test('fail on passing number instead of array', function () {
    var error;
    var a = 1;

    try {
        reverse(a);;
    } catch (err) {
        error = err;
    };

    if (!error) throw Error('should have thrown an error');
    if (!(error instanceof TypeError)) throw Error('error should be of type TypeError');
});

test('fail on passing boolean instead of array', function () {
    var error;
    var a = true;

    try {
        reverse(a);;
    } catch (err) {
        error = err;
    };

    if (!error) throw Error('should have thrown an error');
    if (!(error instanceof TypeError)) throw Error('error should be of type TypeError');
});

test('fail on passing string instead of array', function () {
    var error;
    var a = 'hello world';

    try {
        reverse(a);;
    } catch (err) {
        error = err;
    };

    if (!error) throw Error('should have thrown an error');
    if (!(error instanceof TypeError)) throw Error('error should be of type TypeError');
});

test('fail on passing object instead of array', function () {
    var error;
    var a = {};

    try {
        reverse(a);;
    } catch (err) {
        error = err;
    };

    if (!error) throw Error('should have thrown an error');
    if (!(error instanceof TypeError)) throw Error('error should be of type TypeError');
});