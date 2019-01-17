suite('Unshift');

test('adding text to the array', function(){
    var arr=[1,2,3,4,5];

    res=unshift(arr, 'hola', 'josep');

    assert(res === 7,'Unexpected value');
    assert(arr.toString() === ['hola','josep',1,2,3,4,5].toString(),'Unexpetec arr value');

});

test('adding 10 value to the array', function(){
    var arr=[1,2,3,4,5];

    res=unshift(arr, 'hola', 'josep',6,7,8,'middle',9,10,'adeu', 'adria');

    assert(res === 15,'Unexpected value');
    assert(arr.toString() === ['hola', 'josep',6,7,8,'middle',9,10,'adeu', 'adria',1,2,3,4,5].toString(),'Unexpetec arr value');

});

test('arr is not an Array', function(){
    var error;

    try{
        unshift({});
    } catch(err){
        error=err;
    }

    assert(error,'sould throw an error');
    assert(error instanceof TypeError,'error should be TypeError')

});