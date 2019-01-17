suite('pop')

test('delating last item of array', function(){
    var arr=[1,2,3,4,5];
    
    pop(arr)

    assert(arr.toString()===[1,2,3,4].toString(),'Unexpected value')

});

test('arr is not Array', function(){
    var error;

    try{
        pop({})
    }catch(err){
        error=err
    }

    assert(error,'Should show an error')
    assert (error instanceof TypeError,'should have thrown TypeError');

});