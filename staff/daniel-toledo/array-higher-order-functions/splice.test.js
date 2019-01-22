suite('SPLICE')

test('splicing only with a start', function () {
    var arr = [1, 2, 3, 4, 5, 6];

    res = splice(arr, 2);

    assert(res.toString() === [3, 4, 5, 6].toString(), 'Unexpected return value')
    assert(arr.toString() === [1, 2].toString(), 'Unexpected arr value')

});

test('splicing only with a start and end', function () {
    var arr = [1, 2, 3, 4, 5, 6];

    res = splice(arr, 2, 2);

    assert(res.toString() === [3, 4].toString(), 'Unexpected return value')
    assert(arr.toString() === [1, 2, 5, 6].toString(), 'Unexpected arr value')

});

test('splicing with start, end and items', function () {
    var arr = [1, 2, 3, 4, 5, 6];

    res = splice(arr, 2, 2, 'FUNCIONA!');

    assert(res.toString() === [3, 4].toString(), 'Unexpected return value')
    assert(arr.toString() === [1, 2, 'FUNCIONA!', 5, 6].toString(), 'Unexpected arr value')

});

test('error start is not a number', function () {
    var error;
    var arr = [1, 2, 3, 4, 5, 6];

    try {
        splice(arr, 'hola', 3)
    } catch (err) {
        error = err
    }

    assert(error, 'should throw an error');
    assert(error instanceof TypeError, 'error should be type Error')

});

test('arr is not an Array', function () {
    var error;

    try {
        splice({}, 2, 3)
    } catch (err) {
        error = err
    }

    assert(error, 'Should shown an error');
    assert(error instanceof TypeError, 'error type should be TypeError');

});