suite('push');

test('passing all arguments', function() {
    
    var array = [1,2,3]
    var element = 4;
   
    var expected = 4;
    var found =  push(array, element);

    if (found !== expected) throw Error('found value ' + found + ' does not match expected ' + expected);
});

test('passing > arguments', function() {
    
    var array = [1,2,3]
    var element = 4;
    var element2 = 5;
   
    var expected = 5;
    var found =  push(array, element, element2);

    if (found !== expected) throw Error('found value ' + found + ' does not match expected ' + expected);
});

test('passing array with 0 length', function() {
    
    var array = []
    var element = 4;
    var element2 = 5;
   
    var expected = 2;
    var found =  push(array, element, element2);

    if (found !== expected) throw Error('found value ' + found + ' does not match expected ' + expected);
});

test('fail on passing number instead of an array', function() {
    var error;

    var array = 1;
    var element = 4;
    
    try {
        push(array, element);
    } catch (err) {
        error = err;
    };

    if (!error) throw Error('should have thrown an error');
    if (!(error instanceof TypeError)) throw Error('error should be of type TypeError');
});

test('fail on passing boolean instead of an array', function() {
    var error;

    var array = true;
    var element = 4;
    
    try {
        push(array, element);
    } catch (err) {
        error = err;
    };

    if (!error) throw Error('should have thrown an error');
    if (!(error instanceof TypeError)) throw Error('error should be of type TypeError');
});