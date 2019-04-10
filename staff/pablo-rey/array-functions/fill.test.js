'use strict'; 

describe("fill", function() {
  function initialArray() {
    return [1, 2, 3, 4, 5, 6];
  }

  it("should modified array only affect in middle positions", function() {
    var array = initialArray();
    var expected = [1, 2, 0, 0, 5, 6];
    
    var result = fill(array, 0, 2, 4);
    expect(result, expected, true);
  });

  it("should modified array affect from selected position to end", function() {
    var array = initialArray();
    var expected = [1, 5, 5, 5, 5, 5];
    
    var result = fill(array, 5, 1);
    expect(result, expected, true);
  });

  it("should fill all array with the value", function() {
    var array = initialArray();
    var expected = [6, 6, 6, 6, 6, 6];
    
    var result = fill(array, 6);
    expect(result, expected, true);
  });  

  common_throwError_array(fill);

});
