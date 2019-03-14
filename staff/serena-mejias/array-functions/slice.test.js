suite("slice");

test("returns a copy of a portion of an array into a new array", function() {
  var animals = ["ant", "bison", "camel", "duck", "elephant"];

  var result = slice(animals,2,4);
  var expected = ["camel", "duck"];

  if (result !== expected) `${result} and ${expected} should be the same`;
});

test("the argument end is optional", function(){
    var animals = ["ant", "bison", "camel", "duck", "elephant"];

    var result = slice(animals,2);
    var expected = ["camel", "duck","elephant"];
  
    if (result !== expected) `${result} and ${expected} should be the same`;
})

test("the argument start is optional", function(){
    var animals = ["ant", "bison", "camel", "duck", "elephant"];

    var result = slice(animals);
    var expected = ["ant","bison","camel", "duck","elephant"];
  
    if (result !== expected) `${result} and ${expected} should be the same`;
})

test("first argument must be an array", function(){
    var error;

    try {
        slice('slice');
    } catch (err){
        error = err;
    }

    if(error){'should be an error'};
})
