suite('TEST join');

test('test without specifying separation', function(){
    var arr=[1,2,3,4,5]

    res=join(arr)

    if(res!=='1,2,3,4,5') throw Error('result unexpected')

});

test('test specifing the separation', function(){
    var arr=[1,2,3,4,5];

    res=join(arr,';')

    if(res!=='1;2;3;4;5') throw Error('result unexpected')
});

test('test specifing anything expet string', function(){
    var arr=[1,2,3,4,5];

    res=join(arr,true)

    if(res!=='1true2true3true4true5') throw Error('result unexpected')
});

test('test arr is not an Array', function(){
    var error;

    try {
        join({});
    } catch (err) {
        error = err;
    }

    if (!error) throw Error('should have thrown an error');
    if (!error instanceof TypeError) throw Error('should have thrown TypeError');

});

test('test too many arguments', function(){
    var error;

    try {
        join([1,2,3,4,5],'g','h');
    } catch (err) {
        error = err;
    }

    if (!error) throw Error('should have thrown an error');

});