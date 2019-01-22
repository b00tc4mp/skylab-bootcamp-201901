suite('find');

//case find element that exists

test('find element that exist', function() {
    var arr = [1,2,3,4,5];

    var res = find(arr, function(val){
        return val > 2;
    });

    var expected = 3;
        
    if(res !== 3) throw Error('found value '+ res +'does not match expected'+ expected);
});

//case array objects

test('array objects', function() {
    var arr = [
        {name: 'hello', val: 1},
        {name: 'world', val: 2}
    ]

    var res = find(arr, function(val) {
        return val.name === 'hello';
    });

    var expected = arr[0];

    if(res !== arr[0]) throw Error('found value '+ res +'does not match expected'+ expected);

});

//too many arguments

test('fail on to many arguments' , function(){
    var error;

    try {
        find([],1, true);
    } catch (err) {
        error = err;
    }

    if(!error) throw Error('should have thrown an error');
    if(!(error instanceof Error)) throw Error('error should be a Error type');
});

test('fail on isntanceof Array' , function(){
    var error;

    try {
        find(1, true);
    } catch (err) {
        error = err;
    }

    if(!error) throw Error('should have thrown an error');
    if(!(error instanceof TypeError)) throw Error('error should be a TypeError type');
});

test('fail on instance of function' , function(){
    var error;

    try {
        find([],1);
    } catch (err) {
        error = err;
    }

    if(!error) throw Error('should have thrown an error');
    if(!(error instanceof Error)) throw Error('error should be a Error type');
});