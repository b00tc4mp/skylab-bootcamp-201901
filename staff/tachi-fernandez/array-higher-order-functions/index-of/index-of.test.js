suite("Test Index-of")

// Case 1:

test("all arguments" , function(){

var array = [1,2,3,4,5];
var res = indexOf(array,4);
var expected = 3;

if (res.toString() !== expected.toString()) throw Error('result should be the one expected');
});

//Case:2

test("searchValue in an string" , function(){


    var array = [1,2,3,4,5];
    var res = indexOf(array,"cuatro")
    var expected = -1

    if (res.toString() !== expected.toString()) throw Error('result should be the one expected');


    
});

//Case:3

test("searchValue is negative" , function(){

    

    var array = [1,2,3,4,5];
    var res = indexOf(array,-3)
    var expected = -1

    if (res.toString() !== expected.toString()) throw Error('result should be the one expected');


    
});

//Case:4

test("more arguments" , function(){

    var error;

    try {
        indexOf(array, 0,3);
    } catch (err) {
        error = err;
    }

    if (!error) throw Error('should have thrown an error');
    if (!(error instanceof Error)) throw Error('should have thrown TypeError');
});

//Case:5

test("argument is a booleano" , function(){


    var error;

    try {
        fill(1,false);
    } catch (err) {
        error = err;
    }

    if (!error) throw Error('should have thrown an error');
    if (!(error instanceof Error)) throw Error('should have thrown TypeError');
});











