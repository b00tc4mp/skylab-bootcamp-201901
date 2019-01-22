suite('reverse');


test('functional', function(){
    var arr = [1,2,3];
    reverse(arr);

    var expected = [3,2,1];

    if(arr.toString() !== expected.toString()) throw Error('The array returned and the expected aren\'t equal');
});

test('fail on isntanceof Array' , function(){
    var error;

    try {
        reverse(1);
    } catch (err) {
        error = err;
    }

    if(!error) throw Error('should have thrown an error');
    if(!(error instanceof TypeError)) throw Error('error should be a TypeError type');
});