suite('some');

test('Correct full arguments', function () {
    var a = [1,2,3,4];
    
    var res = filter(a, function (v) {return v > 2});

    var expected = true;

    assert(res.toString() === expected.toString(), 'should return the correct value');
});

test('Fail too many arguments', function () {
    var a = [1,2,3,4];
    
    try {
        filter(a, function (v) {return v > 2});
    } catch (err) {
        error = err;
    }

    assert(error, 'should have thrown an error');
});

test('Fail on object instead of array', function () {
    var a = {};
    
    try {
        filter(a, function (v) {return v > 2});
    } catch (err) {
        error = err;
    }

    assert(error, 'should have thrown an error');
});

test('Fail on boolean instead of array', function () {
    var a = true;
    
    try {
        filter(a, function (v) {return v > 2});
    } catch (err) {
        error = err;
    }

    assert(error, 'should have thrown an error');
});

test('Fail on number instead of array', function () {
    var a = 4;
    
    try {
        filter(a, function (v) {return v > 2});
    } catch (err) {
        error = err;
    }

    assert(error, 'should have thrown an error');
});

