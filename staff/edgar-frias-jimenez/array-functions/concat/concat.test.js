'use strict';

suite('concat', function(){
  test('Two arrays should merge into one', function(){
    var array1 = ['a', 'b', 'c'];
    var array2 = ['d', 'e', 'f'];

    var results = ['a', 'b', 'c', 'd', 'e', 'f'];
    var concated = concat(array1, array2);

    expect(concated.toString(), results.toString());
  });

  test('If one value provided is void', function() {
    var array1 = ['a', 'b', 'c'];

    try {
      concat(array1);

      console.log("You shouldn't get to this point");
    } catch(error) {
      expect(error.message, 'undefined is not an array');
    }
  });

  test('If one array is undefined', function(){
    var array1 = ['a', 'b', 'c'];
    var array3;

    try {
      concat(array3, array1);

      console.log("You shouldn't get to this point");
    } catch(error) {
      expect(error.message, 'undefined is not an array');
    }
  });

  test('If one array is undefined', function(){
    var array1 = ['a', 'b', 'c'];
    var array4 = 'hola';

    try {
      concat(array1, array4);

      console.log("You shouldn't get to this point");
    } catch(error) {
      expect(error.message, array4 + ' is not an array');
    }
  });
});
