'use strict';

suite("pop", function () {
  function initialArray() {
    return [1,2,3,4];
  }

  test("pop a single element", function () {
    var array = initialArray();
    var expectedArray = [1,2,3];
    var expectedReturn = 4

    expect(pop(array), expectedReturn);
    expect(array, expectedArray);
  }); 

  common_throwError_array(pop);

});