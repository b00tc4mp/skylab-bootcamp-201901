suite('Slice');

test('cutting one argument diffining start and end', function(){
    var arr=[1,2,3,4,5];

    res=slice(arr,2,3)

    assert(res.toString()===[3].toString(),'Unexpected value')

});

test('cutting arguments without ending', function(){
    var arr=[1,2,3,4,5];

    res=slice(arr,2);

    assert(res.toString()===[3,4,5].toString(),'Unexpected value');
    assert(arr.toString()===[1,2,3,4,5].toString(),'The arr should not be modified')
});

test('cutting arguments without start and ending', function(){
    var arr=[1,2,3,4,5];

    res=slice(arr, undefined, 5);

    assert(res.toString()===[1,2,3,4,5].toString(),'Unexpected value')
});

test('cutting arguments with start higher than end', function(){
    var arr=[1,2,3,4,5];

    res=slice(arr, 3, 2);

    assert(res.toString()===[].toString(),'Unexpected value')
});

test('arr is not an Array', function(){
    var error;

    try{
        slice({},2,3)
    } catch(err){
        error=err
    }

    assert(error,'Should shown an error');
    assert(error instanceof TypeError,'error type should be TypeError');

});

