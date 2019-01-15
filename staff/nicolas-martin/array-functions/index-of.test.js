suite('indexOf()');

test('not found with one argument', function () {
    var arr = [1, 2, 3, 4, 5];
    var res = indexOf(arr, 6);
    var expected = -1;

    if (res !== expected) throw Error('result ' + res + ' does not satisfy the one expected: ' + expected);
});

test('found with one argument', function () {
    var arr = [1, 2, 3, 4, 5];
    var res = indexOf(arr, 5);
    var expected = 4;

    if (res !== expected) throw Error('result ' + res + ' does not satisfy the one expected: ' + expected);
});

test('not found with 2 arguments', function () {
    var arr = [1, 2, 3, 4, 5];
    var res = indexOf(arr, 1, 2);
    var expected = -1;

    if (res !== expected) throw Error('result ' + res + ' does not satisfy the one expected: ' + expected);
});
