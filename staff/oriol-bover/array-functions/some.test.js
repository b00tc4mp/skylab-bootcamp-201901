suite('some');

test('funcitonal case', function(){
    var array = [1, 2, 3, 4, 5];

    var even = function(element) {
        // checks whether an element is even
        return element % 2 === 0;
    };

    var res =  some(array, even);

    var expected = true;

    assert(res === expected, 'the result should equal the expected');
});

test('should fail on passing an object instead of array' , function(){
    var even = function(element) {
        // checks whether an element is even
        return element % 2 === 0;
    };

    var error;
    try {
        some({}, even);
    } catch (err) {
        error = err;
    }

    assert(error, 'Should be an error');
    assert(error instanceof TypeError, 'Error should be an TypeError type');
});

test('should fail on passing an object instead of function' , function(){
    var array = [1, 2, 3, 4, 5];    
    
    var even = function(element) {
        // checks whether an element is even
        return element % 2 === 0;
    };

    var error;
    try {
        some(array, {});
    } catch (err) {
        error = err;
    }

    assert(error, 'Should be an error');
    assert(error instanceof TypeError, 'Error should be an TypeError type');
});