suite('join');

test('succed on joining elements without parameter', function (){
    var arr = [1, 2, 3];
    var res = join(arr);
    var expected = '1,2,3';
    if (res !== expected) throw Error('return value from join: ' + res + ' does not match expected: ' + expected);
});

test('succed on joining elements with a string separator ', function (){
    var arr = ['a', 'c'];
    var res = join(arr, 'b');
    var expected = 'abc';

    if (res !== expected) throw Error('result ' + res + ' does not satisfy the one expected: ' + expected);

});

test('fail on number instead of array', function (){
    var err;
    var arr = {};

    try {
        join(arr);
    } catch (error) {
        err = error;    
    }

    if (!err) throw Error('should have thrown an error');
    if (!(err instanceof Error)) throw Error('should have thrown an error');
});