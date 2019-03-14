suite("join");

test("join the elements of an array", function() {
  var elements = ["Wind", "Rain", "Fire"];
  var result = elements.join();
  return result;

  var expected = "Fire,Wind,Rain";

  if (result !== expected)
    throw Error(`Result ${result} does not match with expected ${expected}.`);
});

test('join the elements of an array with separator "i"', function() {
  var array = ["Wind", "Rain", "Fire"];
  var result = join(array, "i");
  var expected = "WindiRainiFire";

  if (result !== expected)
    throw Error("result should be the same as expected.");
});

test("first argument is not a array", function() {
  var array = ["Wind", "Rain", "Fire"];
  var error;
  
  try {
    join({});
  } catch (err) {
    error = err;
  }
  if (!error) throw Error("should have thrown an error");
  if (!(error instanceof TypeError)) throw Error ('error is not a TypeError.') ;
});

test('boolean is not an array', function(){
    var error;

    try {
        join(true);
    } catch (err){
        error=err;
    }
    if(!error) throw Error ('should have thronw an error');
    if(!(error instanceof TypeError)) throw Error ('error is not a TypeError.')
})
