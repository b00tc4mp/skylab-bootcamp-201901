suite('TEST unshift');

test('array and 2 numbers as parameters, all correct', function() {
    var arr = [1,2,3]

    var res = unshift(arr,8,9);

    var expected = 5;

    if(res !== expected) throw Error ("Expected result '" + expected + "' not matched");
});

test('first value not array', function() {
    var error;

    try{
        unshift(1,2,3);
    } catch(err) {
        error = err;
    }
    if(!error) throw Error ('should have thrown an error');
    if(!(error instanceof TypeError)) throw Error ('should have thrown TypeError');
});