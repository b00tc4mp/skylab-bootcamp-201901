suite('test PUSH')

test('test with only one parameter', function(){
    var arr=[1,2,3,4,5]

    res=push(arr,6)

    if (res!==6) throw Error('Unexpected value')
    if (arr.toString()!==[1,2,3,4,5,6].toString()) throw Error('the Array have not been modified')

});

test('test with more than one parameter', function(){
    var arr=[1,2,3,4,5]

    res=push(arr,6,7,8)

    if (res!==8) throw Error('Unexpected value')
    if (arr.toString()!==[1,2,3,4,5,6,7,8].toString()) throw Error('the Array have not been modified')

});

test('test arr is not an Array', function(){
    var error;

    try{
       push({},5) 
    } catch(err){
        error=err
    }

    if(!error) throw Error('it should show an error')
    if(!(error instanceof TypeError)) throw Error('error should be typeError')

});