
suite('indexOf');

//use case 1

test('value inside array', function(){
    var arr=[1,2,3,4,5]
    var find=5

    res=indexOf(arr,find)

    assert(res===4,'it should give the expected index')

});

test('value outside array', function(){
    var arr=[1,2,3,4,5];
    var find=8;

    res=indexOf(arr,find)

    assert(res===-1,'it should give the expected index')


});

test ('different start', function(){
    var arr=[1,8,3,8,5];
    var find=8;
    var start=2

    res=indexOf(arr,find,start)

    assert(res===3,'Unexpected value')

});

test('arr is not an Array', function(){
    
    var error;

    try {
        indexOf({}, 8);
    } catch (err) {
        error = err;
    }

    assert(error,'should have thrown an error');
    assert(error instanceof TypeError,'should have thrown TypeError');

});

test('too many arguments', function(){
    var arr=[1,2,3,4,5];
    var error;

    try {
        indexOf(arr, 8, 3, 5);
    } catch (err) {
        error = err;
    }

    assert(error,'should have thrown an error');

});

