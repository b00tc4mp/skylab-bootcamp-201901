'use strict';

suite("push", function () {
  function initialArray() {
    return [1,2,3,4];
  }

  test("push a single element", function () {
    var array = initialArray();
    var expected = [1,2,3,4,5];

    push(array, 5);
    expect(array, expected);
  }); 

  test("push multiple elements", function () {
    var array = initialArray();
    var expected = [1,2,3,4,5,6,7];

    push(array, 5, 6, 7);
    expect(array, expected);
  });

  common_throwError_array(push);

});