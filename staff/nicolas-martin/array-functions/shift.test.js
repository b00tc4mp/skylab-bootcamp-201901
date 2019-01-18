suite('slice');

test('succeed on create the array without begin', function () {
    var array = ['on1', 'on2', 'mambo', 'danzon'];
    var resultArray = slice(array);
    var expectedArray = array;

    if (JSON.stringify(resultArray) !== JSON.stringify(expectedArray))
        throw Error('expected value ' + expectedArray + ' is different than result array ' + resultArray);
});

test('succeed on create the array with begin only', function () {
    var array = ['on1', 'on2', 'mambo', 'danzon'];
    var resultArray = slice(array, 3);
    var expectedArray = ['danzon'];

    if (JSON.stringify(resultArray) !== JSON.stringify(expectedArray))
        throw Error('expected value ' + expectedArray + ' is different than result array ' + resultArray);
});

test('succeed on create the array with end only', function () {
    var array = ['on1', 'on2', 'mambo', 'danzon'];
    var resultArray = slice(array, undefined, 3);
    var expectedArray = ['on1', 'on2', 'mambo'];

    if (JSON.stringify(resultArray) !== JSON.stringify(expectedArray))
        throw Error('expected value ' + expectedArray + ' is different than result array ' + resultArray);
});

test('succeed on create the array with begin higher than end', function () {
    var array = ['on1', 'on2', 'mambo', 'danzon'];
    var resultArray = slice(array, 3, 2);
    var expectedArray = [];

    if (JSON.stringify(resultArray) !== JSON.stringify(expectedArray))
        throw Error('expected value ' + expectedArray + ' is different than result array ' + resultArray);
});

test('succeed on create the array with empty array', function () {
    var array = [];
    var resultArray = slice(array, 3, 2);
    var expectedArray = [];

    if (JSON.stringify(resultArray) !== JSON.stringify(expectedArray))
        throw Error('expected value ' + expectedArray + ' is different than result array ' + resultArray);
});

test('succeed on create the array with negative begin', function () {
    var array = ['0', '1', '2', '3', '4', '5'];
    var resultArray = slice(array, -5, 2);
    var expectedArray = ['1'];

    if (JSON.stringify(resultArray) !== JSON.stringify(expectedArray))
        throw Error('expected value ' + expectedArray + ' is different than result array ' + resultArray);    
});

test('succeed on create the array with negative end', function () {
    var array = ['0', '1', '2', '3', '4', '5'];
    var resultArray = slice(array, 2, -2);
    var expectedArray = ['2', '3'];

    if (JSON.stringify(resultArray) !== JSON.stringify(expectedArray))
        throw Error('expected value ' + expectedArray + ' is different than result array ' + resultArray); 
});

test('succeed on create the array with negative begin and negative end', function () {
    var array = ['0', '1', '2', '3', '4', '5'];
    var resultArray = slice(array, -2, -1);
    var expectedArray = ['4'];

    if (JSON.stringify(resultArray) !== JSON.stringify(expectedArray))
        throw Error('expected value ' + expectedArray + ' is different than result array ' + resultArray); 
});

test('fails on create the array using a object instead of array', function () {
    var array = {};
    var error;

    try {
        var resultArray = slice(array, -2, -1);
    } catch (err) {
        error = err;
    }
    
    var expectedArray = ['4'];

    if (!error) throw Error('it should thrown an Error');
    if (!(error instanceof TypeError)) throw Error('it should thrown an Error');
});

test('fails on create the array using a string in begin instead of a number', function () {
    var array = '';
    var error;

    try {
        var resultArray = slice(array, -2, -1);
    } catch (err) {
        error = err;
    }

    if (!error) throw Error('it should thrown an Error');
    if (!(error instanceof TypeError)) throw Error('it should thrown an Error');
});

test('fails on too many arguments', function () {
    var array = '';
    var error;

    try {
        var resultArray = slice(array, -2, -1, {}, 'test', 'hola');
    } catch (err) {
        error = err;
    }

    if (!error) throw Error('it should thrown an Error');
});

test('fails without arguments', function () {
    var array = '';
    var error;

    try {
        var resultArray = slice();
    } catch (err) {
        error = err;
    }

    if (!error) throw Error('it should thrown an Error');
});