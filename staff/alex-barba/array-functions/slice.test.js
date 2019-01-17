suite('slice');

test('passing 3 arguments', function(){
    var array = [5, 12, 8, 130, 44];

    var found = slice(array, 2, 4);

    var expected = [8, 130];

    if (found.toString() !== expected.toString()) throw Error('found value ' + found + ' does not match expected ' + expected);
});

test('missing end arguments', function(){
    var array = [5, 12, 8, 130, 44];

    var found = slice(array, 2);

    var expected = [8, 130, 44];

    if (found.toString() !== expected.toString()) throw Error('found value ' + found + ' does not match expected ' + expected);
});

test('missing start arguments', function(){
    var array = [5, 12, 8, 130, 44];

    var found = slice(array, undefined, 2);

    var expected = [5, 12];

    if (found.toString() !== expected.toString()) throw Error('found value ' + found + ' does not match expected ' + expected);
});

test('missing end and start arguments', function(){
    var array = [5, 12, 8, 130, 44];

    var found = slice(array);

    var expected = [5, 12, 8, 130, 44];

    if (found.toString() !== expected.toString()) throw Error('found value ' + found + ' does not match expected ' + expected);
});

test('fail on passing object instead of array', function () {
    var error;
    var array = {};

    try {
        slice(array);
    } catch (err) {
        error = err;
    };

    if (!error) throw Error('should have thrown an error');
    if (!(error instanceof TypeError)) throw Error('error should be of type TypeError');
});