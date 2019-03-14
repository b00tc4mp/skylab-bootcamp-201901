suite('PUSH')

test('test with only one parameter', function(){
    var arr=[1,2,3,4,5]

    res=push(arr,6)

    assert(res===6,'Unexpected value')
    assert(arr.toString()===[1,2,3,4,5,6].toString(),'the Array have not been modified')

});

test('test with more than one parameter', function(){
    var arr=[1,2,3,4,5]

    res=push(arr,6,7,8)

    assert(res===8,'Unexpected value')
    assert(arr.toString()===[1,2,3,4,5,6,7,8].toString(),'the Array have not been modified')

});

test('test arr is not an Array', function(){
    var error;

    try{
       push({},5) 
    } catch(err){
        error=err
    }

    assert(error,'it should show an error')
    assert(error instanceof TypeError,'error should be typeError')

});