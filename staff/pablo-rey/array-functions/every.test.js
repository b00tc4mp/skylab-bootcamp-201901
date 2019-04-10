'use strict';

describe("every", function() {
  function initialArray() {
    return [1, 2, 3, 4, 5, 6];
  }

  it("should return true when all fulfill the condition", function() {
    var array = initialArray();
    var result = every(array, function(v) {
      return v > 0;
    });
    expect(result, true);
    expect(array, initialArray(), true);
  });

  it("should return false when any element not fulfill the condition", function() {
    var array = initialArray();
    var result = every(array, function(v) {
      return v > 1;
    });
    expect(result, false);
    expect(array, initialArray(), true);
  });

  common_throwError_array(every);
  common_throwError_callback(every, initialArray());

});
