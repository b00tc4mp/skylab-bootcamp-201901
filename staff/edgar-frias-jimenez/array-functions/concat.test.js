'use strict';

describe('concat', function(){
  it('should merge two arrays into one', function(){
    var array1 = ['a', 'b', 'c'];
    var array2 = ['d', 'e', 'f'];

    var results = ['a', 'b', 'c', 'd', 'e', 'f'];
    var concated = concat(array1, array2);

    expect(concated.toString(), results.toString());
  });

  it('will breaks if one value provided is void', function() {
    var array1 = ['a', 'b', 'c'];

    try {
      concat(array1);

      throw Error("You shouldn't get to this point");
    } catch(error) {
      expect(error.message, 'undefined is not an array');
    }
  });

  it('will breaks if one array is undefined', function(){
    var array1 = ['a', 'b', 'c'];
    var array3;

    try {
      concat(array3, array1);

      throw Error("You shouldn't get to this point");
    } catch(error) {
      expect(error.message, 'undefined is not an array');
    }
  });
});
