suite('unshift');

test('passing all arguments', function() {
    var a = [1]
    
    var expected = 2;
    var found = unshift(a, 2);

    if (found !== expected) throw Error('found value ' + found + ' does not match expected ' + expected);
});

test('passing > arguments', function() {
    
    var a = [1]
    
    var expected = 4;
    var found = unshift(a, 2,3,4);

    if (found !== expected) throw Error('found value ' + found + ' does not match expected ' + expected);
});

test('passing array with 0 length', function() {
    
    var a = [];
    
    var expected = 3;
    var found = unshift(a, 2,3,4);

    if (found !== expected) throw Error('found value ' + found + ' does not match expected ' + expected);
});

test('fail on passing number instead of an array', function() {
    var error;

    var a = 1;
    
    try {
        unshift(a, 2,3,4);
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
        unshift(a, 2,3,4);
    } catch (err) {
        error = err;
    };

    if (!error) throw Error('should have thrown an error');
    if (!(error instanceof TypeError)) throw Error('error should be of type TypeError');
});