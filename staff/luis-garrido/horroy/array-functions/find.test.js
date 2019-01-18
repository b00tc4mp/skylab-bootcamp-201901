suite('find');

// use case 1

test('use case 1: all arguments are correct, value finded', function () {
    var arr = ['a', 'b', 'c', 'd', 'e'];

    var res = find(arr, function(element) {return element==='c';});

    var expected = 'c';

    if (res !== expected) throw Error('returned finded value');

});

// use case 2

test('use case 2: all arguments are correct, value not found', function () {
    var arr = ['a', 'b', 'c', 'd', 'e'];

    var res = find(arr, function(element) {return element==='f';});

    var expected = undefined;

    if (res !== expected) throw Error('returned undefined, value not found');
});

// use case 3

test('use case 3: the first argument is not an array, it is an empty object', function() {
    var error;

    try {
        find({}, function(element) {return element==='f';});
    } catch (err) {
        error = err;
    }

    if (!error) throw Error ('should have thrown an error');
    if (!(error instanceof TypeError)) throw Error ('should have thrown TypeError');
});

// use case 4

test('use case 4: the first argument is not an array, it is a number', function() {
    var error;

    try {
        find(1, function(element) {return element==='f';});
    } catch (err) {
        error = err;
    }

    if (!error) throw Error ('should have thrown an error');
    if (!(error instanceof TypeError)) throw Error ('should have thrown TypeError');
});

// use case 5

test('use case 5: the first argument is not an array, it is a boolean', function() {
    var error;

    try {
        find(true, 0);
    } catch (err) {
        error = err;
    }

    if (!error) throw Error ('should have thrown an error');
    if (!(error instanceof TypeError)) throw Error ('should have thrown TypeError');
});

// use case 6

test('use case 6: the second argument is not a function', function () {
    var error;

    var arr = [1, 2, 3, 4, 5];

    try {
        find(arr, 3);
    } catch (err) {
        error = err;
    }

    if (!error) throw Error('should have thrown an error');
    if (!(error instanceof Error)) throw Error('should have thrown TypeError');
});

