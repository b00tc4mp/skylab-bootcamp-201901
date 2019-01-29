suite('filter');

test('succeed on filter only even numbers', function () {
    var array = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
    var result = filter(array, function(element, index, array){
        return element % 2 === 0;
    });
    var expectedResult = [2, 4, 6, 8, 10];

    if (expectedResult.toString() !== result.toString()) 
        throw Error('result value ' + result + ' is differente from expected result ' + expectedResult );
});

test('fail when use a string instead an array', function () {
    var array = '';
    var error;

    try {
        var result = filter(array, function(element){
            return true;
        });
    } catch (err) {
        error = err;
    }

    if (!error) 
        throw Error('should thrown an error');
});