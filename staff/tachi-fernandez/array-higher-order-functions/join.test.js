suite('join');

test('without specifying separation', function(){
    var arr=[1,2,3,4,5]

    res=join(arr)

    assert(res==='1,2,3,4,5','result unexpected')

});

test('speasserting the separation', function(){
    var arr=[1,2,3,4,5];

    res=join(arr,';')

    assert(res==='1;2;3;4;5','result unexpected')
});

test('specifing anything expet string', function(){
    var arr=[1,2,3,4,5];

    res=join(arr,true)

    assert(res==='1true2true3true4true5','result unexpected')
});

test('arr is not an Array', function(){
    var error;

    try {
        join({});
    } catch (err) {
        error = err;
    }

    assert (error,'should have thrown an error');
    assert (error instanceof TypeError,'should have thrown TypeError');

});

