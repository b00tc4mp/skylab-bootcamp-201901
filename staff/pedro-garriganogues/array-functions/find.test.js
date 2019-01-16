suite('TEST find');


// use case 1

test('CASE word coincidence', function () {

    var arr = [1, 2, 3, 4, 5];
    var expected = 4;
    var res = finder(arr, function (element) {
        return element > 3;
    });

    if (res !== expected) {
        throw Error('parameter and result should be the same')
    };

});

// use case 2   

test('CASE object inside', function () {
    var arr = {};

    try {
        finder(arr, function (element) {
            return element;
        });
    } catch (err) {
        error = err;
    }
    if (arr === Object) throw Error('object inside');

});

// use case 3   

test('CASE text inside', function () {
    var arr = {};

    try {
        finder(arr, function (element) {
            return element;
        });
    } catch (err) {
        error = err;
    }
    if (arr === Text) throw Error('object inside');

});

// use case 4

test('CASE empty inside', function () {
    var arr = {};

    try {
        finder('', function (element) {
            return element;
        });
    } catch (err) {
        error = err;
    }
    if (arr === '') throw Error('object inside');

});

// use case 5 

test('CASE empty inside', function () {
    var arr = {};

    try {
        finder('', function (element) {
            return element;
        });
    } catch (err) {
        error = err;
    }
    if (arr === '') throw Error('object inside');

});










