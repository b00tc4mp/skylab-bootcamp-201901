suite('unshift');

test('Correct functionality', function(){
    var array = [1, 2, 3];
    var res = unshift(array,4,5);

    var expected = 5;
    var expected_array =  [4, 5, 1, 2, 3];

    assert(array.toString() === expected_array.toString(),'array should be equal to expected_array');
    assert(expected === res,'res should be equal to expected');
});

test('negative numbers', function(){
    var array = [1, 2];
    var res = unshift(array, -2, -1);
    
    var expected = 4
    var expected_array = [-2, -1, 1, 2];

    assert(array.toString() === expected_array.toString(),'array should be equal to expected_array');
    assert(expected === res,'res should be equal to expected');
});

test('add 0 number', function(){
    var array = [1, 2];
    var res = unshift(array, 0); 
    
    var expected =  3;
    var expected_array =  [0, 1, 2];

    assert(array.toString() === expected_array.toString(),'array should be equal to expected_array');
    assert(expected === res,'res should be equal to expected');
});

test('add array into array', function(){
    var array = [1, 2];
    var res = unshift(array, [-3]); 
   
    var expected =  3;
    var expected_array =  [[-3], 1, 2];

    assert(array.toString() === expected_array.toString(),'array should be equal to expected_array');
    assert(expected === res,'res should be equal to expected');

});

test('Not passing an array' , function(){
    var error;
    try {
        unshift({},1,2, 'may');
    } catch (err) {
        error = err;
    }

    assert(error, 'Should be an error');
    assert(error instanceof TypeError, 'Error should be an Error type');
});