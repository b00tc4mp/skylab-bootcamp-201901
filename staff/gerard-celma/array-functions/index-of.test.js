suite('TEST indexOf');

test('look for one element, found', function() {
    var arr = [1,2,3,4,5,6];

    var res = indexOf(arr,2);

    var expected = 1;

    if(res !== expected) throw Error ("Expected result " + expected +" not matched!");
});

test('look for one element, not found', function() {
    var arr = [1,2,3,4,5,6];

    var res = indexOf(arr,8);

    var expected = -1;

    if(res !== expected) throw Error ("Expected result " + expected +" not matched!");
});

test('look for one element from index, found', function() {
    var arr = [1,2,3,4,5,6];

    var res = indexOf(arr,4,2);

    var expected = 3;

    if(res !== expected) throw Error ("Expected result " + expected +" not matched!");
});

test('look for one element from index, not found', function() {
    var arr = [1,2,3,4,5,6];

    var res = indexOf(arr,2,4 );

    var expected = -1;

    if(res !== expected) throw Error ("Expected result " + expected +" not matched!");
});


test('1st parameter passed is not array', function() {
    var arr = 6;
    var error;

    try {
        indexOf(6,1,0);
    } catch(err) {
        error = err;
    }

    if(!error) throw Error ('should have thrown Error');
    if(!(error instanceof TypeError)) throw Error ('should have thrown TypeError');
});