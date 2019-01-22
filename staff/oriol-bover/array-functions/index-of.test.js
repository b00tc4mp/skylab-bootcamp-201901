suite('index-of');


//all arguments
test(' 1 arguments', function () {
    var arr = [1, 2, 3, 4, 5];
    
    var output = indexOf(arr, 4);
    var expected = 3;

    if (output !== expected) throw Error('output should be the one expected');
});

//all arguments
test(' all arguments', function () {
    var arr = [1, 2, 3, 3, 2];
    
    var output = indexOf(arr, 2, 2);
    var expected = 4;

    if (output !== expected) throw Error('output should be the one expected');
});

test('more arguments than 3', function () {
    
    var error;

    try {
        fill([], 2, 3, true);
    } catch (err) {
        error = err;
    }

    if(!error) throw Error('should have thrown an error');
    if(!(error instanceof Error)) throw Error('should have thrown Error');
});

test('first argument is not an array', function () {
    
    var error;

    try {
        indexOf(2, 2, 3);
    } catch (err) {
        error = err;
    }

    if(!error) throw Error('should have thrown an error');
    if(!(error instanceof TypeError)) throw Error('should have thrown TypeError');
});