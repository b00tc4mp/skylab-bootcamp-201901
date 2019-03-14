suite("shift");

var array1 = [1, 2, 3];

test("removes the first element from an array and returns that removed element", function() {
    var result = array1.shift();
    var expected = 1;
    
    if(result !== expected){'result and expected shoulb be the same'}

});

test("argument must be an array", function(){
    var error;

    try {
        shift('shift');
    } catch (err){
        error = err;
    }

    if(error){'should be an error'};
})
