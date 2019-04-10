'use strict';

describe("pop", function () {
  function initialArray() {
    return [1,2,3,4];
  }

  it("pop a single element", function () {
    var array = initialArray();
    var expectedArray = [1,2,3];
    var expectedReturn = 4

    expect(pop(array), expectedReturn);
    expect(array, expectedArray, true);
  }); 

  common_throwError_array(pop);

});