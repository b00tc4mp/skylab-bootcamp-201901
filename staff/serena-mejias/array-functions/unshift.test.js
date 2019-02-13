suite("unshift");

var array1 = [1, 2, 3];

test("adds one or more elements to the beginning of an array and returns the new length of the array", function() {
  var result = unshift(array1,4, 5);
  var expected = 5;

  if(result !== expected){'result and expected shoulb be the same'}
});

test("argument must be an array", function(){
    var error;

    try {
        unshift('unshift');
    } catch (err){
        error = err;
    }

    if(error){'should be an error'};
})
