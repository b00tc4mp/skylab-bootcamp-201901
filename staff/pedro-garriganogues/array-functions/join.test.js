suite('TEST join');


// use case 1

test('CASE result coincidence', function () {
    var arr = [1, 2, 3, 4, 5];
    var separador = ','
    var expected = '1,2,3,4,5';
    var res = juntar(arr, separador);

    if (res !== expected) {
        console.log(res)
        console.log(expected)
        throw Error('parameter and result should be the same')
    };
    
    if (!error) throw Error('Se esperaba un error');
});