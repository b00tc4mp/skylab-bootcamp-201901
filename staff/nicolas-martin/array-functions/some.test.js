suite('some');

test('succeed on checks if only one even number in array', function () {
    var arr = [1, 2];
    var result = some(arr, function(element){
        return element % 2 === 0;
    });
    var expectedValue = false;

    if (result === expectedValue) throw Error('result value ' + result + ' is different from expect value ' + expectedValue);
});