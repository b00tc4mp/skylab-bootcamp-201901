suite('shift');

test('succeed on return the first element', function () {
    var array = [1, 2, 3, 4, 5];
    var result = shift(array);
    var expectedResult = 1;

    if (expectedResult !== result) throw Error('expected value ' + expectedResult + ' is different from result ' + result);
});


test('succeed on change length of the original array', function () {
    var array = [{ name: 'salsa' },
    { name: 'rumba' },
    { name: 'bomba' },
    { name: 'plena' }];

    var result = shift(array);
    var expectedResult = { name: 'salsa' };

    var expectedLength = 3;

    if (expectedResult.toString() !== result.toString())
        throw Error('expected value ' + expectedResult + ' is different from result ' + result);

    if (array.length !== expectedLength)
        throw Error('the length of array should be ' + expectedLength + ' and is ' + array.length);
});

test('succeed on returns undefined working with empty array', function () {
    var array = [];
    var result = shift(array);
    var expectedResult = undefined;
    var expectedLength = 0;

    if (expectedResult !== result)
        throw Error('expected value ' + expectedResult + ' is different from result ' + result);

    if (array.length !== expectedLength)
        throw Error('the length of array should be ' + expectedLength + ' and is ' + array.length);
});

test('fails on working with string instead of array', function () {
    var array = '';
    var error;

    try {
        var result = shift(array);
    } catch (err) {
        error = err
    }
    
    var expectedResult = undefined;
    var expectedLength = 0;

    if (!error) throw Error('should thrown an Error');
    if (expectedResult !== result)
        throw Error('expected value ' + expectedResult + ' is different from result ' + result);

    if (array.length !== expectedLength)
        throw Error('the length of array should be ' + expectedLength + ' and is ' + array.length);
});