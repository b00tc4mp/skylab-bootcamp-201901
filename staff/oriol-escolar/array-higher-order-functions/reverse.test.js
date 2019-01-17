suite('reverse')

test('Use Case 1',function(){


    var array = ['piedras','patatas','manzanas'];


    
    var expected = ['manzanas','patatas','piedras'];
    
    
    if ((array!==expected)) { throw new Error (array + ' is not equal to '+ expected); }
    
    
    });



