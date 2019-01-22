suite('for-each');

test('fail on boolean instead of function', function () {
    var error;
    var a = [1, 2, 3];
    try {
        forEach(a, true);
    } catch(err) {
        error = err;
    }

    if (!error) throw Error('should have thrown an error');
    if (!(error instanceof TypeError)) throw Error('should have thrown TypeError');  
});

test('fail on object instead of array', function () {
    var error;

    try {
        forEach({}, function(v) {console.log(v)});
    } catch(err) {
        error = err;
    }

    if (!error) throw Error('should have thrown an error');
    if (!(error instanceof TypeError)) throw Error('should have thrown TypeError');  

});

test('fail on number instead of array', function () {
    var error;

    try {
        forEach(1, function(v) {console.log(v)});
    } catch(err) {
        error = err;
    }

    if (!error) throw Error('should have thrown an error');
    if (!(error instanceof TypeError)) throw Error('should have thrown TypeError');  

});

test('fail on passing 0 arguments', function () {
    var error;

    try {
        forEach();
    } catch(err) {
        error = err;
    }

    if (!error) throw Error('should have thrown an error');
    if (!(error instanceof TypeError)) throw Error('should have thrown TypeError');  
});

test('fail on passing > 2 arguments', function () {
    var error;

    var a = [1,2,3]

    try {
        forEach(a, 3, function(v) {console.log(v)});
    } catch(err) {
        error = err;
    }

    if (!error) throw Error('should have thrown an error');
    if (!(error instanceof TypeError)) throw Error('should have thrown TypeError');  

});