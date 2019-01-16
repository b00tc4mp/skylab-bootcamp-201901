suite("some");

test('Some element into array', function() {
    
    var arr = [1, 2, 3, 4, 5];

    var expected = true;

    var even = some(arr, function(element) {
        return element % 2 === 0;
    });

    if (even !== expected) throw Error('found value ' + even + ' does not match expected ' + expected);

});
