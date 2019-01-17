suite('pop');

test('passing argument', function() {
    
    var a = [1, 2, 3, 4];

    var found = pop(a);
    var expected = 4;

    if (found !== expected) throw Error('found value ' + found + ' does not match expected ' + expected);
});

test('passing empty array', function() {
    
    var a = [];

    var found = pop(a);
    var expected = undefined;

    if (found !== expected) throw Error('found value ' + found + ' does not match expected ' + expected);
});

test('fail on passing number instead of an array', function() {
    var error;

    var a = 1;
    
    try {
        pop(a);;
    } catch (err) {
        error = err;
    };

    if (!error) throw Error('should have thrown an error');
    if (!(error instanceof TypeError)) throw Error('error should be of type TypeError');
});

test('fail on passing boolean instead of an array', function() {
    var error;

    var a = true;
    
    try {
        pop(a);;
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
        pop(a);;
    } catch (err) {
        error = err;
    };

    if (!error) throw Error('should have thrown an error');
    if (!(error instanceof TypeError)) throw Error('error should be of type TypeError');
});

