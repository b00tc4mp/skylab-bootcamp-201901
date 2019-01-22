suite('pop');

test('functional', function(){
    var arr = [1,2,3,4,5];

    var removed = pop(arr);
    var expected_removed = 5;
    var expected_arr = [1,2,3,4];

    if(expected_removed !== removed) throw Error('The removed element '+removed+'should be equal to the expected removed element '+expected_removed);
    if(arr.toString() !== expected_arr.toString()) throw Error('The array '+arr+'should be equal to the expected array '+expected_arr);
});

test('empty array', function(){
    var arr = [];
    var removed = pop(arr);

    if(removed !== undefined) throw Error('The result should be undefined');
});

test('fail on isntanceof Array' , function(){
    var error;

    try {
        pop(1);
    } catch (err) {
        error = err;
    }

    if(!error) throw Error('should have thrown an error');
    if(!(error instanceof TypeError)) throw Error('error should be a TypeError type');
});