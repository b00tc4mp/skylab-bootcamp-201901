suite('join');

test('passing all arguments', function() {

    var separator = ' '
    var array = ['alex', 'in love', 'martí']
    join(array, separator);

    var expected = 'alex in love martí'
    var found = join(array, separator);

    if (found !== expected) throw Error('found value ' + found + ' does not match expected ' + expected);
});

test('passing 1 argument', function() {

    var array = ['alex', 'in love', 'martí']
    join(array);

    var expected = 'alexin lovemartí'
    var found = join(array);

    if (found !== expected) throw Error('found value ' + found + ' does not match expected ' + expected);
});

test('passing null element in array', function() {

    var array = ['alex', null, 'martí']
    join(array);

    var expected = 'alexmartí'
    var found = join(array);

    if (found !== expected) throw Error('found value ' + found + ' does not match expected ' + expected);
});

test('passing undefined element in array', function() {

    var array = ['alex', undefined, 'martí']
    join(array);

    var expected = 'alexmartí'
    var found = join(array);

    if (found !== expected) throw Error('found value ' + found + ' does not match expected ' + expected);
});

test('passing boolean element in array', function() {

    var separator = ' '
    var array = ['alex', true, 'martí']
    join(array, separator);

    var expected = 'alex true martí'
    var found = join(array, separator);

    if (found !== expected) throw Error('found value ' + found + ' does not match expected ' + expected);
});

