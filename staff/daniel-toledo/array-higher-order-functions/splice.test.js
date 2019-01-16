suite('test SPLICE')

test('test splicing only with a start', function(){
    var arr=[1,2,3,4,5,6];

    res=splice(arr, 2);

    if(res.toString()!==[3, 4, 5, 6].toString()) throw Error('Unexpected return value')
    if(arr.toString()!==[1,2].toString()) throw Error('Unexpected arr value')

});

test('test splicing only with a start and end', function(){
    var arr=[1,2,3,4,5,6];

    res=splice(arr, 2, 2);

    if(res.toString()!==[3, 4].toString()) throw Error('Unexpected return value')
    if(arr.toString()!==[1,2,5,6].toString()) throw Error('Unexpected arr value')

});

test('test splicing with start, end and items', function(){
    var arr=[1,2,3,4,5,6];

    res=splice(arr, 2, 2, 'FUNCIONA!');

    if(res.toString()!==[3, 4].toString()) throw Error('Unexpected return value')
    if(arr.toString()!==[1,2,'FUNCIONA!',5,6].toString()) throw Error('Unexpected arr value')

});

test('test error start is not a number', function(){
    var error;
    var arr=[1,2,3,4,5,6];

    try{
        splice(arr, 'hola', 3)
    } catch(err){
        error=err
    }

    if(!error) throw Error('should throw an error');
    if (!(error instanceof TypeError)) throw Error('error should be type Error')

});

test('test arr is not an Array', function(){
    var error;

    try{
        splice({},2,3)
    } catch(err){
        error=err
    }

    if(!error) throw Error('Should shown an error');
    if(!(error instanceof TypeError)) throw Error('error type should be TypeError');

});