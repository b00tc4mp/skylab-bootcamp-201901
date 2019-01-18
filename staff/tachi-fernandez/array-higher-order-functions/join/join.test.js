suite("Test Join")

// If join() have two arguments

test("case 1" , function(){ 

var array = [1, 2, 3, 4, 5, 7]

join(array,",")

if (!(array instanceof Array)) throw new typeError("array in not an array")

});

// If separtor is undefined

test("case 2" , function(){ 

    var array = [1, 2, 3, 4, 5, 7]
    
    join(array,undefined)
    
    if (!(array instanceof Array)) throw new typeError("array in not an array")
    
    });

// If separator is null

test("case 3" , function(){ 

    var array = [1, 2, 3, 4, 5, 7]
    
    join(array,null)
    
    if (!(array instanceof Array)) throw new typeError("array in not an array")
    
    });

// If  there is not separator

test("case 4" , function(){ 

    var array = [1, 2, 3, 4, 5, 7]
    
    join(array)
    
    if (!(array instanceof Array)) throw new typeError("array in not an array")
    
    });

// If there is not array

test("case 5" , function() {
    

    var error;

    try {
        join("hola");
    } catch (err) {
        error = err;
    }

    if (!error) throw Error('should have thrown an error');
    if (!(error instanceof Error)) throw Error('should have thrown TypeError');
});




