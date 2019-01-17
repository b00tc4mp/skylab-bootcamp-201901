suite('splice');

test('passing all arguments', function(){
    var array = [1,2,2,4,5];

    var found = splice(array, 2, 3, 3, 3, 3);

    var expected = [2,4,5];

    if (found.toString() !== expected.toString()) throw Error('found value ' + found + ' does not match expected ' + expected);
});

test('if deleteCount omitted, all elements from start should be deleted', function(){
    var array = [1,2,2,4,5];

    var found = splice(array, 2);

    var expected = [2,4,5];

    if (found.toString() !== expected.toString()) throw Error('found value ' + found + ' does not match expected ' + expected);
});

test('if deleteCount value is larger than length, all elements from start should be deleted', function(){
    var array = [1,2,2,4,5];

    var found = splice(array, 2, 9);

    var expected = [2,4,5];

    if (found.toString() !== expected.toString()) throw Error('found value ' + found + ' does not match expected ' + expected);
});

test('passing > 3 items to be added to the array', function(){
    var array = [1,2,6];

    var found = splice(array, 2, 0, 3, 4, 5);

    var expected = [1,2,3,4,5,6];

    if (array.toString() !== expected.toString()) throw Error('found value ' + found + ' does not match expected ' + expected);
});

test('fail on passing object instead of array', function () {
    var error;
    var array = {};

    try {
        splice(array, 2, 0, 3);
    } catch (err) {
        error = err;
    };

    if (!error) throw Error('should have thrown an error');
    if (!(error instanceof TypeError)) throw Error('error should be of type TypeError');
});