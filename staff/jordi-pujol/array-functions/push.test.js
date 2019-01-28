suite ("push");

test('1 element', function () {
    var arr = [1, 2, 3, 4, 5];

    var res = push(arr, 6);

    var expected = 6;

    if (res.length !== arr.length) throw Error('array and result should have the same length');
    if (res.length !== expected) throw Error('result should have the expected length');
    if (arr.length !== expected) throw Error('array should have the expected length');
});

test('more than 1 element', function () {
    var arr = [1, 2, 3, 4, 5];

    var res = push(arr, 6, 7, 8, 9);

    var expected = 9;

    if (res.length !== arr.length) throw Error('array and result should have the same length');
    if (res.length !== expected) throw Error('result should have the expected length');
    if (arr.length !== expected) throw Error('array should have the expected length');});

test('fail on object instead of array', function () {
    var error;

    try {
        push({}, 0);
    } catch (err) {
        error = err;
    }

    if (!error) throw Error('should have thrown an error');
    if (!(error instanceof TypeError)) throw Error('should have thrown TypeError');
});


test('fail on number instead of array', function () {
    var error;

    try{
        push({},1,2,3)
    } catch(err){
        error = err
    }

    if (!error) throw Error ("shoud have thrown an error");
    if (!(error instanceof TypeError)) throw Error ('should have thrown TypeError')
});

test('fail on boolean instead of array', function () {
    var error;

    try{
        push(true, 7,8,9)
    } catch (err) {
        error = err
    }

    if (!error) throw Error ('should have thrown an error')
    if (!(error instanceof TypeError)) throw Error ('should have thrown TypeError')
});