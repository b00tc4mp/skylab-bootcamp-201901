'use strict'; 

suite("fill", function() {
  function initialArray() {
    return [1, 2, 3, 4, 5, 6];
  }

  test("should modified array only affect in middle positions", function() {
    var array = initialArray();
    var expected = [1, 2, 0, 0, 5, 6];
    
    var result = fill(array, 0, 2, 4);
    expect(result, expected);
  });

  test("should modified array affect from selected position to end", function() {
    var array = initialArray();
    var expected = [1, 5, 5, 5, 5, 5];
    
    var result = fill(array, 5, 1);
    expect(result, expected);
  });

  test("should fill all array with the value", function() {
    var array = initialArray();
    var expected = [6, 6, 6, 6, 6, 6];
    
    var result = fill(array, 6);
    expect(result, expected);
  });  

  common_throwError_array(fill);

});
