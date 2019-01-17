suite('shift');

test('passing argument', function() {
    
    var a = [1, 2, 3, 4];

    var found = shift(a);
    var expected = 1;

    if (found !== expected) throw Error('found value ' + found + ' does not match expected ' + expected);
});

test('passing empty array', function() {
    
    var a = [];

    var found = shift(a);
    var expected = undefined;

    if (found !== expected) throw Error('found value ' + found + ' does not match expected ' + expected);
});