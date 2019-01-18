suite("some");

test('Some element into array', function() {
    
    var arr = [1, 2, 3, 4, 5];

    var expected = true;

    var even = some(arr, function(element) {
        return element % 2 === 0;
    });

    if (even !== expected) throw Error('found value ' + even + ' does not match expected ' + expected);

});

test("First argument is not array", function() {
    var error;
  
    var arr = {};
  
    var even;

    try {
        even = some(arr, function(element) {
            return element % 2 === 0;
        });
    } catch (err) {
      error = err;
    }
  
    if (!error) throw Error("should have thrown an error");
    if (!(error instanceof Error)) throw Error("should have thrown TypeError");
  });


test("Second argument is not a function", function() {
    var error;
  
    var arr = [1, 2, 3, 4, 5];
  
    var even;

    try {
        even = some(arr, 2);
    } catch (err) {
      error = err;
    }
  
    if (!error) throw Error("should have thrown an error");
    if (!(error instanceof Error)) throw Error("should have thrown TypeError");
  });