suite('filter');

test('all arguments', function () {
    var words = [12, 5, 8, 130, 44]

    function isBigEnough(value) {
    return value >= 10;
    };

    var res = filter(words, isBigEnough);

    var expected = [12, 130, 44];

    if (res.toString() !== expected.toString()) throw Error('res' + res + 'and expected ' + expected + 'should be the same');
});

test('all arguments with no result', function () {
    var words = [12, 5, 8, 130, 44]

    function isBigEnough(value) {
    return value >= 150;
    };

    var res = filter(words, isBigEnough);

    var expected = [];

    if (res.toString() !== expected.toString()) throw Error('res' + res + 'and expected ' + expected + 'should be the same');
});

test('does not mutate array on which it is called ', function () {
    var words = [12, 5, 8, 130, 44];

    function isBigEnough(value) {
    return value >= 10;
    };

    var res = filter(words, isBigEnough);

    var expected = [12, 5, 8, 130, 44]

    if (words.toString() !== expected.toString()) throw Error('res' + res + 'and expected ' + expected + 'should be the same');
});

test('fail on passing object instead of array', function () {
    var error;

    var words = {name: 'àlex'};

    function isBigEnough(value) {
    return value >= 10;
    };

    try {
        filter(words, isBigEnough);
    } catch (err) {
        error = err;
    }

    if (!error) throw Error('should have thrown an error');
    if (!(error instanceof TypeError)) throw Error('should have thrown TypeError');
});

test('fail on passing boolean instead of array', function () {
    var error;

    var words = true;

    function isBigEnough(value) {
    return value >= 10;
    };

    try {
        filter(words, isBigEnough);
    } catch (err) {
        error = err;
    }

    if (!error) throw Error('should have thrown an error');
    if (!(error instanceof TypeError)) throw Error('should have thrown TypeError');
});