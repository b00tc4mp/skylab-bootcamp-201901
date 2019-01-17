suite('fill');

// use case 1

test('use case 1', function () {
    var arr = [1, 2, 3, 4, 5];

    var res = fill(arr, 0, 0, 2);

    var expected = [0, 0, 3, 4, 5];

    assert (res === arr,'array and result should be the same');
    assert (res.toString() === expected.toString(),'result should be the one expected');
    assert (arr.toString() === expected.toString(),'array should have been changed to the one expected');
});

// use case 2

test('use case 2', function () {
    var arr = [1, 2, 3, 4, 5];

    var res = fill(arr, 0, 2);

    var expected = [1, 2, 0, 0, 0];

    assert (res === arr,'array and result should be the same');
    assert (res.toString() === expected.toString(),'result should be the one expected');
    assert (arr.toString() === expected.toString(),'array should have been changed to the one expected');
});

//use case 3

test('use case 3', function() {
    var arr = [1, 2, 3, 4, 5];

    var res = fill(arr, 0);

    var expected = [0, 0, 0, 0, 0];

    assert (res === arr,'array and result should be the same');
    assert (res.toString() === expected.toString(),'result should be the one expected');
    assert (arr.toString() === expected.toString(),'array should have been changed to the one expected');
});


// // use case 4

test('use case 4', function() {
    var arr = [1, 2, 3, 4, 5];

    var res = fill(arr, 0, -3, -2);

    var expected = [1, 2, 0, 4, 5];

    assert (res === arr,'array and result should be the same');
    assert (res.toString() === expected.toString(), 'result should be the one expected');
    assert (arr.toString() === expected.toString(), 'array should have been changed to the one expected');
});


// use case 5

test('use case 5', function() {
    var arr = [1, 2, 3, 4, 5];

    var res = fill(arr, 0, -3, 4);

    var expected = [1, 2, 0, 0, 5];

    assert (res === arr,'array and result should be the same');
    assert (res.toString() === expected.toString(),'result should be the one expected');
    assert (arr.toString() === expected.toString(),'array should have been changed to the one expected');
});


// use case 6

test ('use case 6', function() {

    var error;

    try {
        fill({}, 0);
    } catch (err) {
        error = err;
    }

    assert (error,'should have thrown an error');
    assert (error instanceof TypeError,'should have thrown TypeError');
});


// use case 7

test('user case 6', function() {
    var error;

    try {
        fill(1, 0);
    } catch (err) {
        error = err;
    }

    assert (error,'should have thrown an error');
    assert (error instanceof TypeError,'should have thrown TypeError');
});

// use case 8

test('use case 8',function() {
    var error;

    try {
        fill(true, 0);
    } catch (err) {
        error = err;
    }

    assert (error,'should have thrown an error');
    assert (error instanceof TypeError,'should have thrown TypeError');
});

// use case 9

test('use case 9', function () {
    var error;

    var arr = [1, 2, 3, 4, 5];

    try {
        fill(arr, 0, 1, 3, true);
    } catch (err) {
        error = err;
    }

    assert (error,'should have thrown an error');
    assert (error instanceof Error,'should have thrown TypeError');
});