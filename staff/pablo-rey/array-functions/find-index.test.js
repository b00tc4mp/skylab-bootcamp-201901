'use strict';

describe("findIndex", function () {
  function initialArray() {
    return [5, 12, 8, 130, 44];
  }

  it("should return first element that fulfill condition", function () {
    var array = initialArray();
    var expected = 3;
    expect(findIndex(array, function (element) { return element > 13; }), expected);
    expect(array, initialArray(), true);
  })

  common_throwError_array(findIndex);
  common_throwError_callback(findIndex, initialArray())

})
