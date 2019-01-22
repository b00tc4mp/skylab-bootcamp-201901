suite('some');

test('passing all argument', function() {
    var array = [1, 3, 5];

    var even = function(element) {
    return element % 2 === 0;
    };

   var found = some(array, even);

   var expected = false;

   if (found !== expected) throw Error('found value ' + found + ' does not match expected ' + expected);
});

test('fails on passing number as an array', function() {
    var error;
    var array = 1;

    var even = function(element) {
    return element % 2 === 0;
    };

    try {
        some(array, even)
    } catch(err) {
        error = err;
    }

    if (!error) throw Error('should have thrown an error');
    if (!(error instanceof Error)) throw Error('error should be of type Error');
});

test('fails on passing object as a function', function() {
    var error;
    var array = [1,2,3];

    var even = {name: 'àlex'};

    try {
        some(array, even)
    } catch(err) {
        error = err;
    }

    if (!error) throw Error('should have thrown an error');
    if (!(error instanceof Error)) throw Error('error should be of type Error');
});

test('fails on passing string as a function', function() {
    var error;
    var array = [1,2,3];

    var even = 'àlex';

    try {
        some(array, even)
    } catch(err) {
        error = err;
    }

    if (!error) throw Error('should have thrown an error');
    if (!(error instanceof Error)) throw Error('error should be of type Error');
});

test('fails on passing boolean as a function', function() {
    var error;
    var array = [1,2,3];

    var even = true;

    try {
        some(array, even)
    } catch(err) {
        error = err;
    }

    if (!error) throw Error('should have thrown an error');
    if (!(error instanceof Error)) throw Error('error should be of type Error');
});
