suite('join');

test('Join elements', function () {
    var array = ['Fire', 'Wind', 'Rain'];

    var joinElements = join(array, '-');

    var expected = 'Fire-Wind-Rain';

    if (joinElements !== expected) throw Error('Joined value ' + array + ' does not match expected ' + expected);
});

test('Join elements without separator argument', function () {
    var array = ['Fire', 'Wind', 'Rain'];

    var joinElements = join(array);

    var expected = 'FireWindRain';

    if (joinElements !== expected) throw Error('Joined value ' + array + ' does not match expected ' + expected);
});

test('Pass empty array argument', function () {
    var array = [];

    var joinElements = join(array);

    var expected = '';

    if (joinElements !== expected) throw Error('Joined value ' + array + ' does not match expected ' + expected);
});

test('Fail on object instead of array', function () {
    var error;

    try {
        join({}, '-');
    } catch (err) {
        error = err;
    }

    if (!error) throw Error('should have thrown an error');
    if (!(error instanceof TypeError)) throw Error('should have thrown TypeError');
});