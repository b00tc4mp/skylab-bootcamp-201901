suite('splice');

test('succeed using number in start', function () {
    var array = ['on1', 'on2', 'mambo', 'danzon'];
    var start = 2;
    var result = splice(array, start);
    var expectedResult = ['mambo', 'danzon'];
    var resultArray = ['on1', 'on2'];

    if (JSON.stringify(result) !== JSON.stringify(expectedResult))
        throw Error('result value: ' + result + ' is different from expectedResult ' + expectedResult);
        
    if (JSON.stringify(array) !== JSON.stringify(resultArray))
        throw Error('original array: ' + array + ' was change to an incorrect value ' + resultArray);
});

test('succeed returning an empty array without start', function () {
    var array = ['on1', 'on2', 'mambo', 'danzon'];
    var result = splice(array);
    var expectedResult = [];

    var resultArray = ['on1', 'on2', 'mambo', 'danzon'];

    if (JSON.stringify(result) !== JSON.stringify(expectedResult))
        throw Error('result value: ' + result + ' is different from expectedResult ' + expectedResult);
        
    if (JSON.stringify(resultArray) !== JSON.stringify(array))
        throw Error('original array: ' + array + ' was change to an incorrect value ' + resultArray);

});

test('succeed using object for start instead of number', function () {
    var array = ['on1', 'on2', 'mambo', 'danzon'];
    var start = {};
    var result = splice(array, start);
    var expectedResult = ['on1', 'on2', 'mambo', 'danzon'];
    var resultArray = [];

    if (JSON.stringify(result) !== JSON.stringify(expectedResult))
        throw Error('result value: ' + result + ' is different from expectedResult ' + expectedResult);
        
    if (JSON.stringify(resultArray) !== JSON.stringify(array))
        throw Error('original array: ' + array + ' was change to an incorrect value ' + resultArray);
});

test('succeed using array for start instead of number', function () {
    var array = ['on1', 'on2', 'mambo', 'danzon'];
    var start = [];
    var result = splice(array, start);
    var expectedResult = ['on1', 'on2', 'mambo', 'danzon'];
    var resultArray = [];

    if (JSON.stringify(result) !== JSON.stringify(expectedResult))
        throw Error('result value: ' + result + ' is different from expectedResult ' + expectedResult);
        
    if (JSON.stringify(resultArray) !== JSON.stringify(array))
        throw Error('original array: ' + array + ' was change to an incorrect value ' + resultArray);

});

test('succeed using negative number in start', function () {
    var array = ['on1', 'on2', 'mambo', 'danzon'];
    var start = -2;
    var result = splice(array, start);
    var expectedResult = ['mambo', 'danzon'];
    var resultArray = ['on1', 'on2'];

    if (JSON.stringify(result) !== JSON.stringify(expectedResult))
        throw Error('result value: ' + result + ' is different from expectedResult ' + expectedResult);
        
    if (JSON.stringify(resultArray) !== JSON.stringify(array))
        throw Error('original array: ' + array + ' was change to an incorrect value ' + resultArray);

});

test('succeed using start and non-zero deleteCount parameter', function () {
    var array = ['on1', 'on2', 'mambo', 'danzon'];
    var start = 2;
    var deleteCount = 1;
    debugger;
    var result = splice(array, start, deleteCount);
    var expectedResult = ['mambo'];
    var resultArray = ['on1', 'on2', 'danzon'];

    if (JSON.stringify(result) !== JSON.stringify(expectedResult))
        throw Error('result value: ' + result + ' is different from expectedResult ' + expectedResult);
        
    if (JSON.stringify(array) !== JSON.stringify(resultArray))
        throw Error('original array: ' + array + ' was change to an incorrect value ' + resultArray);
});

test('fails using string instead array', function () {
    var array = '', error;
    
    try {
        var result = splice(array);
    } catch (err) {
        error = err;        
    }

    if (!error) throw Error('it should thrown an error');
    if (!(error instanceof TypeError)) throw Error('it should thrown a TypeError');
       
});