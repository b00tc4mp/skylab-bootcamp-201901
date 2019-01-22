suite('push');

test('functional', function(){
    arr = [1,2,3];

    var length = push(arr, 4, 5,'chicken');

    var expected_length = 6;
    var expected_arr = [1,2,3,4,5,'chicken'];


    if(length !== expected_length) throw Error('Length '+length+'should be equal to the expected length '+expected_length);
    if(arr.toString() !== expected_arr.toString()) throw Error('The array '+arr+'should be equal to the expected array '+expected_arr);
});

test('fail on isntanceof Array' , function(){
    var error;

    try {
        push(1,1);
    } catch (err) {
        error = err;
    }

    if(!error) throw Error('should have thrown an error');
    if(!(error instanceof TypeError)) throw Error('error should be a TypeError type');
});