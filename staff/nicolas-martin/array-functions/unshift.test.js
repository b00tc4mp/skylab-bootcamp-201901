suite('unshift');

test('succeed on add one element only', function () {
    var array = [1, 2, 3, 4, 5];
    var result = unshift(array, 12);
    var expectedResult = [12, 1, 2, 3, 4, 5];
    var expectedNewLength = 6;


    if (array.length !== expectedNewLength) throw Error('original array was not changed');
    if (expectedResult.toString() !== array.toString()) 
        throw Error('expected value ' + expectedResult + ' is different from result ' + result);
  
});

test('succeed on add three elements with different type', function () {
    var array = [1, 2, 3, 4, 5];
    var result = unshift(array, 12, [1, 2, 3], 'salsa');
    var expectedResult = [12, [1, 2, 3], 'salsa', 1, 2, 3, 4, 5];
    var expectedNewLength = 8;


    if (result !== expectedNewLength) throw Error('original array was not changed');
    if (JSON.stringify(expectedResult) !== JSON.stringify(array)) 
        throw Error('expected value ' + JSON.stringify(expectedResult)  + ' is different from result ' + JSON.stringify(array) );
  
});

test('succeed on add working with empty array', function () {
    var array = [];
    var result = unshift(array, 1, 2, ['3']);
    var expectedResult = [1, 2, ['3']];
    var expectedNewLength = 3;

    if (result !== expectedNewLength) throw Error('original array was not changed');
    if (JSON.stringify(expectedResult) !== JSON.stringify(array)) 
        throw Error('expected value ' + JSON.stringify(expectedResult)  + ' is different from result ' + JSON.stringify(array) );
    
});

test('fails on working with string instead of array', function(){
    var array = '';
    var error;

    try {
        var result = unshift(array, 2, 'ey!');        
    } catch (err) {
        error = err;
    }

    if (!error) throw Error('should thrown an TypeError');
});