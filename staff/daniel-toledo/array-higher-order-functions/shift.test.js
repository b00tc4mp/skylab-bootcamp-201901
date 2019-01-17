suite('Shift');

test('delating first element', function () {
    arr = ['hola', 'mundo']

    res = shift(arr);

    assert(res === 'hola','Unexpected value')
    assert(arr.toString() === ['mundo'].toString(),'Unexpected arr value')
});

test('arr is not an Array', function(){
    var error;

    try{
        shift({});
    } catch(err){
        error=err;
    }

    assert(error,'sould throw an error');
    assert(error instanceof TypeError,'error should be TypeError')

});