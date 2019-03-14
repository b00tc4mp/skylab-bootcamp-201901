suite("pop");

test("delete the last value of an array and show it",function(){
    var array = ['broccoli', 'cauliflower', 'cabbage', 'kale', 'tomato']

var result = pop(array);
var expected = 'tomato';

if(result !== expected) `${result} and ${expected} should be the same`
});
 test("the argument must be an array", function(){
     
    var error;
    try {
        pop({})
    } catch(err) { 
        error = err;
    }

    if(!(typeof error === TypeError)) {'sholud be an error'};
 })