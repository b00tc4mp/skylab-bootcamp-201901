suite('TEST pop')

test('test delating last item of array', function(){
    var arr=[1,2,3,4,5];
    
    pop(arr)

    if(arr.toString()!==[1,2,3,4].toString()) throw Error('Unexpected value')

});

test('test arr is not Array', function(){
    var error;

    try{
        pop({})
    }catch(err){
        error=err
    }

    if(!error) throw Error('Should show an error')

});