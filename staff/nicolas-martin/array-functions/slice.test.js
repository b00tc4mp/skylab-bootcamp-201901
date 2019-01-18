suite('slice');

test('succeed on create the array without begin', function () {
    var array = ['on1', 'on2', 'mambo', 'danzon'];
    var resultArray = slice(array);
    var expectedArray = array;

    if (JSON.stringify(resultArray) != JSON.stringify(expectedArray))
        throw Error('expected value ' + expectedArray + ' is different than result array ' + resultArray);
    
});

test('succeed on create the array without end', function () {
    
});

test('succeed on create the array without begin and end', function () {
    
});

test('succeed on create the array with empty array', function () {
    
});

test('succeed on create the array with negative begin', function () {
    
});

test('succeed on create the array with negative end', function () {
    
});

test('succeed on create the array with negative begin and negative end', function () {
    
});

test('succeed on create the array working this multidimensional arrays', function () {
    
});

test('fails on create the array using a object instead of array', function () {
    
});

test('fails on create the array using a string in begin instead of a number', function () {
    
});

test('fails on too many arguments', function () {
    
});

test('fails without arguments', function () {
    
});

