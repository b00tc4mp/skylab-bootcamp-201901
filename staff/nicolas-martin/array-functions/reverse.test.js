suite('reverse');

test('succed on reverse an array', function () {
    var arr = ['a', 'b', 'c'];
    var res = reverse(arr);
    var expected = ['c', 'b', 'a'];

    if (expected.toString() !== res.toString()) throw Error('Expected value: ' + expected + ' does not match the result' + res);
});

test('use a number instead of an array', function () {
    var err, arr = 3;
    try {
        var res = reverse(arr);
    } catch (error) {
        err = error;
    }
    if (!err) throw Error('should have thrown an error');
    if (!(err instanceof TypeError)) throw Error('error should be of type TypeError');
});

test('succeed on change the original array', function () {
    var arr = ['a', 'b', 'c'];
    var res = reverse(arr);
    var expected = ['c', 'b', 'a'];

    if (arr !== res ) throw Error('Expected value: ' + expected + ' does not match the result' + res);
    if (expected.toString() !== arr.toString()) throw Error('Expected array ' + expected + ' does not match the result' + res);

});

