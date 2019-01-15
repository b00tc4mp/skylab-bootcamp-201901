
suite('TEST indexOf');

//use case 1

test('test with value inside array', function(){
    var arr=[1,2,3,4,5]
    var find=5

    res=indexOf(arr,find)

    if (res!=4) throw Error ('it should give the expected index')

});

test('test with value outside array', function(){
    var arr=[1,2,3,4,5];
    var find=8;

    res=indexOf(arr,find)

    if (res!=-1) throw Error ('it should give the expected index')


});

test ('test different start', function(){
    var arr=[1,8,3,8,5];
    var find=8;
    var start=2

    res=indexOf(arr,find,start)

    if (res!=3) throw Error ('Unexpected value')

});

test('test arr is not an Array', function(){
    
    var error;

    try {
        indexOf({}, 8);
    } catch (err) {
        error = err;
    }

    if (!error) throw Error('should have thrown an error');
    if (!error instanceof TypeError) throw Error('should have thrown TypeError');

});

test('test too many arguments', function(){
    var arr=[1,2,3,4,5];
    var error;

    try {
        indexOf(arr, 8, 3, 5);
    } catch (err) {
        error = err;
    }

    if (!error) throw Error('should have thrown an error');

});

