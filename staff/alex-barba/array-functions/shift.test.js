suite('shift');

test('passing argument', function() {
    
    var a = [1, 2, 3, 4];

    var found = shift(a);
    var expected = 1;

    if (found !== expected) throw Error('found value ' + found + ' does not match expected ' + expected);
});

test('passing empty array', function() {
    
    var a = [];

    var found = shift(a);
    var expected = undefined;

    if (found !== expected) throw Error('found value ' + found + ' does not match expected ' + expected);
});

test('fail on passing boolean instead of an array', function() {
    var error;

    var a = true;
    
    try {
        shift(a);;
    } catch (err) {
        error = err;
    };

    if (!error) throw Error('should have thrown an error');
    if (!(error instanceof TypeError)) throw Error('error should be of type TypeError');
});

test('fail on passing string instead of an array', function() {
    var error;

    var a = 'true';
    
    try {
        shift(a);;
    } catch (err) {
        error = err;
    };

    if (!error) throw Error('should have thrown an error');
    if (!(error instanceof TypeError)) throw Error('error should be of type TypeError');
});

test('fail on passing object instead of an array', function() {
    var error;

    var a = {};
    
    try {
        shift(a);;
    } catch (err) {
        error = err;
    };

    if (!error) throw Error('should have thrown an error');
    if (!(error instanceof TypeError)) throw Error('error should be of type TypeError');
});