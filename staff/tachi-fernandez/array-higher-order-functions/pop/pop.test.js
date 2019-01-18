suite("Test pop")

// if the argument is an array

test("use case 1" , function(){

var array = [1,2,3,4,5]

var res = pop(array)

if((array === Array)) throw TypeError ("array is not an Array")

});

//if the arguments > 1

test("use case 2", function(){

var array = [1,2,3,4,5]

var error;

try {
    pop(array, "hello");
} catch (err) {
    error = err;
}

if (!error) throw Error('should have thrown an error');
if (!(error instanceof Error)) throw Error('should have thrown TypeError');


});

//If dont have any argument

test("use case 3", function(){

    
    
    var error;
    
    try {
        pop();
    } catch (err) {
        error = err;
    }
    
    if (!error) throw Error('should have thrown an error');
    if (!(error instanceof Error)) throw Error('should have thrown TypeError');
    
    
    });

// if array is not an array

test("use case 4", function(){

    
    
    var error;
    
    try {
        pop("hola");
    } catch (err) {
        error = err;
    }
    
    if (!error) throw Error('should have thrown an error');
    if (!(error instanceof Error)) throw Error('should have thrown TypeError');
    
    
    });