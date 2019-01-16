suite('test SLICE')

test('test cutting one argument diffining start and end', function(){
    var arr=[1,2,3,4,5];

    res=slice(arr,2,3)

    if(res.toString()!==[3].toString()) throw Error('Unexpected value')

});

test('test cutting arguments without ending', function(){
    var arr=[1,2,3,4,5];

    res=slice(arr,2);

    if(res.toString()!==[3,4,5].toString()) throw Error('Unexpected value');
    if(arr.toString()!==[1,2,3,4,5].toString()) throw Error('The arr should not be modified')
});

test('test cutting arguments without start and ending', function(){
    var arr=[1,2,3,4,5];

    res=slice(arr, undefined, 5);

    if(res.toString()!==[1,2,3,4,5].toString()) throw Error('Unexpected value')
});

test('test cutting arguments with start higher than end', function(){
    var arr=[1,2,3,4,5];

    res=slice(arr, 3, 2);

    if(res.toString()!==[].toString()) throw Error('Unexpected value')
});

test('test arr is not an Array', function(){
    var error;

    try{
        slice({},2,3)
    } catch(err){
        error=err
    }

    if(!error) throw Error('Should shown an error');
    if(!(error instanceof TypeError)) throw Error('error type should be TypeError');

});

