'use strict';

describe("push", function () {
  function initialArray() {
    return [1,2,3,4];
  }

  it("push a single element", function () {
    var array = initialArray();
    var expected = [1,2,3,4,5];

    push(array, 5);
    expect(array, expected, true);
  }); 

  it("push multiple elements", function () {
    var array = initialArray();
    var expected = [1,2,3,4,5,6,7];

    push(array, 5, 6, 7);
    expect(array, expected, true);
  });

  common_throwError_array(push);

});