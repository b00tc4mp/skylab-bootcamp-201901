suite('some');

test('succeed on checks if only one even number in array', function () {
    var arr = [1, 2];
    var result = some(arr, function(element){
        return element % 2 === 0;
    });
    var expectedValue = false;

    if (result === expectedValue) throw Error('result value ' + result + ' is different from expect value ' + expectedValue);
});

test('succeed using empty array', function () {
    var arr = [];
    var result = some(arr, function(element){
        return element % 2 === 0;
    });
    var expectedValue = false;

    if (result === expectedValue) throw Error('result value ' + result + ' is different from expect value ' + expectedValue);
});

test('too many arguments', function () {
    var arr = [1, 2];
    var error;

    try {
        var result = some(arr, function(element){
            return element % 2 === 0;
        }, [], {}, 'ey!');        
    } catch (err) {
        error = err;
    }
    if (!error) throw Error('should thrown an error');
    if (!(error instanceof Error)) throw Error('it should thrown an Error');
});