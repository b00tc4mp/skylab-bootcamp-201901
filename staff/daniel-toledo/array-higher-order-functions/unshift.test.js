suite('test Unshift');

test('test adding text to the array', function(){
    var arr=[1,2,3,4,5];

    res=unshift(arr, 'hola', 'josep');

    if(res !== 7) throw Error('Unexpected value');
    if(arr.toString() !== ['hola','josep',1,2,3,4,5].toString()) throw Error('Unexpetec arr value');

});

test('test adding 10 value to the array', function(){
    var arr=[1,2,3,4,5];

    res=unshift(arr, 'hola', 'josep',6,7,8,'middle',9,10,'adeu', 'adria');

    if(res !== 15) throw Error('Unexpected value');
    if(arr.toString() !== ['hola', 'josep',6,7,8,'middle',9,10,'adeu', 'adria',1,2,3,4,5].toString()) throw Error('Unexpetec arr value');

});

test('test arr is not an Array', function(){
    var error;

    try{
        unshift({});
    } catch(err){
        error=err;
    }

    if(!error) throw Error('sould throw an error');
    if(!(error instanceof TypeError)) throw Error('error should be TypeError')

});