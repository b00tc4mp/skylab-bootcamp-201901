suite('shift');


test('functional', function(){
    var arr = [1,2,3];

    var res = shift(arr);

    var expected_arr = [2,3];
    var expected_res = 1;

    assert(arr.toString() === expected_arr.toString(), 'The array '+arr+' and the expected array '+expected_arr+' should be equal');
    assert(res === expected_res,'The res '+res+' and the expected res '+expected_res+' should be equal');
});

test('one extra parameter',function(){
    var arr = ['hello', 'world'];

    var res = shift(arr, 'hellooo');

    var expected_arr = ['world'];
    var expected_res = 'hello';

    assert(arr.toString() === expected_arr.toString(), 'The array '+arr+' and the expected array '+expected_arr+' should be equal');
    assert(res === expected_res,'The res '+res+' and the expected res '+expected_res+' should be equal');    
});

test('not given array', function(){
    var error;

    try{
        shift({});
    }catch(err){
        error = err;
    }

    assert(error,'There is no error in this case');
    assert(error instanceof TypeError, 'The type of the error is not the spected');

});

