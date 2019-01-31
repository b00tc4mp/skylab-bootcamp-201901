suite('TEST findIndex');

test('all arguments are correct', function() {
    var arr = [1, 2, 3, 4, 5];
    var res = findIndex(arr, function(element) {return element > 2});
    var exp = 2;
    if (arr === res) throw Error("array and result shouldn't be the same");
    if (res.toString() !== exp.toString()) throw Error('expected and result should be the same');
});

test('fail on object instead of array', function () {
    var error;
    try {
        findIndex({}, function(element) {return element > 2});
    } catch (err) {
        error = err;
    }
    if (!error) throw Error('should have thrown an error');
    if (!error instanceof TypeError) throw Error('should have thrown TypeError');
})

test('fail on number instead of array', function () {
    var error;
    try {
        findIndex(1, function(element) {return element > 2});
    } catch (err) {
        error = err;
    }
    if (!error) throw Error('should have thrown an error');
    if (!error instanceof TypeError) throw Error('should have thrown TypeError');
})