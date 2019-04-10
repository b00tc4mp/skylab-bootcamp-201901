'use strict';

describe("concat", function() {
  it("should return concatenated elements of two array", function() {
    var array1 = ["a", "b", "c"];
    var array2 = ["d", "e", "f"];
    var expected = ['a', 'b', 'c', 'd', 'e','f'];
    
    var result = concat(array1, array2);
    expect(result, expected, true);
  });

});
