suite('indexof');

// use case 1

test('use case 1: all arguments are correct, and found the value', function () {
    var array = [1,2,3,4,5,3,7];
    
    var res = indexOf(array,3,3);
        
    var expected = 5;

    if (res !== expected) throw Error('value must be found and index must be returned');
});

// use case 2

test('use case 2: all arguments are correct, value not found', function () {
    var array = [1,2,3,4,5,3,7];
    
    var res = indexOf(array,2,3);
        
    var expected = -1;

    if (res !== expected) throw Error('value must be not found and value returned must be = -1');
});

// use case 3

test('use case 3: first two arguments, they are correct, value found', function () {
    var array = [1,2,3,4,5,3,7];
    
    var res = indexOf(array,3);
        
    var expected = 2;

    if (res !== expected) throw Error('value must be found and index must be returned');
});

// use case 4

test('use case 4: first two arguments, they are correct, value not found', function () {
    var array = [1,2,3,4,5,3,7];
    
    var res = indexOf(array,8);
        
    var expected = -1;

    if (res !== expected) throw Error('value must be not found and value returned must be = -1');
});

// use case 5

test('use case 5: all arguments are correct, with negative value for start index', function() {
    var array = [1,2,3,4,5,3,7];
    
    var res = indexOf(array,3,-2);
        
    var expected = 5;

    if (res !== expected) throw Error('value must be found and index must be returned');
});

// use case 6

test('use case 6: the first argument is not an array, it is an empty object', function() {
    var error;

    try {
        indexOf({}, 0);
    } catch (err) {
        error = err;
    }

    if (!error) throw Error ('should have thrown an error');
    if (!(error instanceof TypeError)) throw Error ('should have thrown TypeError');
});

// use case 7

test('use case 7: the first argument is not an array, it is a number', function() {
    var error;

    try {
        indexOf(1, 0);
    } catch (err) {
        error = err;
    }

    if (!error) throw Error ('should have thrown an error');
    if (!(error instanceof TypeError)) throw Error ('should have thrown TypeError');
});

// use case 8

test('use case 8: the first argument is not an array, it is a boolean', function() {
    var error;

    try {
        indexOf(true, 0);
    } catch (err) {
        error = err;
    }

    if (!error) throw Error ('should have thrown an error');
    if (!(error instanceof TypeError)) throw Error ('should have thrown TypeError');
});

// use case 9

test('use case 9: too much arguments', function () {
    var error;

    var arr = [1, 2, 3, 4, 5];

    try {
        fill(arr, 0, 1, 3, true);
    } catch (err) {
        error = err;
    }

    if (!error) throw Error('should have thrown an error');
    if (!(error instanceof Error)) throw Error('should have thrown TypeError');
});