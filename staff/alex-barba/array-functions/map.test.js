suite('map');

test('all arguments are correct', function () {
    var a = [1, 2, 3];

    var res = map(a, function (v) { return v + 10; });

    var expected = [11, 12, 13];

    if (res.toString() !== expected.toString()) throw Error('result should be the one expected');
});


