suite('Reverse')

test('array of 3 items', function(){
    var arr=[1,2,3];

    res=reverse(arr);

    assert(res.toString()===[3,2,1].toString(),'Unexpected value')

});

test('array of 6 items', function(){
    var arr=[1,2,3,4,5,6];

    res=reverse(arr);

    assert(res.toString()===[6,5,4,3,2,1].toString(),'Unexpected value')

});

test('arr is not an Array', function(){
    var error;

    try{
        reverse({})
    } catch(err){
        error=err
    }

    assert(error,'it should show an error');
    assert(error instanceof TypeError,'error shoud be typeError')

});