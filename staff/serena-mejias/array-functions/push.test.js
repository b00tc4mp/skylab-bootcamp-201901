suite("push");

test("show the length of the new array",function(){
var animals = ['pigs', 'goats', 'sheep'];

var result = push(animals,"cow");
var expected = 4;

if(result !== expected) `${result} and ${expected} should be the same`
})

test("arguments")