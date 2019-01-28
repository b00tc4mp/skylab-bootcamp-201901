suite('TEST slice');

test('array and 2 numbers as parameters, all correct', function() {
    var arr = [1,2,3,4,5,6,7,8]

    var res = slice(arr,2,8);

    var expected = [3,4,5,6,7,8];

    if(res.toString() !== expected.toString()) throw Error ("Expected result '" + expected + "' not matched");
});

test('first value not array', function() {
    var error;

    try{
        slice(1,2,3);
    } catch(err) {
        error = err;
    }
    if(!error) throw Error ('should have thrown an error');
    if(!(error instanceof TypeError)) throw Error ('should have thrown TypeError');
});

