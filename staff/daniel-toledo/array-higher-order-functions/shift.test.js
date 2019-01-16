suite('Test Shift');

test('test delating first element', function () {
    arr = ['hola', 'mundo']

    res = shift(arr);

    if (res !== 'hola') throw Error('Unexpected value')
    if (arr.toString() !== ['mundo'].toString()) throw Error('Unexpected arr value')
});

test('test arr is not an Array', function(){
    var error;

    try{
        shift({});
    } catch(err){
        error=err;
    }

    if(!error) throw Error('sould throw an error');
    if(!(error instanceof TypeError)) throw Error('error should be TypeError')

});