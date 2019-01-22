suite('join');


//all arguments

test('all arguments', function(){
    arr = ['hello','world'];

    var output = join(arr, '+');

    var expected = 'hello+world';

    if(output !== expected) throw Error('the result is not what we expect');

});

test('no arguments', function(){
    arr = ['hello','world'];

    var output = join(arr);

    var expected = 'hello,world';

    if(output !== expected) throw Error('the result is not what we expect');

});

test('fail on to many arguments' , function(){
    var error;

    try {
        join([],1, true);
    } catch (err) {
        error = err;
    }

    if(!error) throw Error('should have thrown an error');
    if(!(error instanceof Error)) throw Error('error should be a Error type');
});

test('fail on isntanceof Array' , function(){
    var error;

    try {
        join(1, true);
    } catch (err) {
        error = err;
    }

    if(!error) throw Error('should have thrown an error');
    if(!(error instanceof TypeError)) throw Error('error should be a TypeError type');
});