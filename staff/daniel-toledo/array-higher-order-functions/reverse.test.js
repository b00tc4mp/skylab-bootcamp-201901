suite('test Reverse')

test('test array of 3 items', function(){
    var arr=[1,2,3];

    res=reverse(arr);

    if(res.toString()!==[3,2,1].toString()) throw Error('Unexpected value')

});

test('test array of 6 items', function(){
    var arr=[1,2,3,4,5,6];

    res=reverse(arr);

    if(res.toString()!==[6,5,4,3,2,1].toString()) throw Error('Unexpected value')

});

test('test arr is not an Array', function(){
    var error;

    try{
        reverse({})
    } catch(err){
        error=err
    }

    if(!error) throw Error('it should show an error');
    if(!(error instanceof TypeError)) throw Error('error shoud be typeError')

});