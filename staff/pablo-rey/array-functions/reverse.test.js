'use strict';

describe("reverse", function () {
  function initialArray() {
    return ['one', 'two', 'three'];
  }

  it("should sum all items in the array", function () {
    var array = initialArray();
    var expected = ['three', 'two', 'one'];
    
    reverse(array);
    expect(array, expected, true);
  })

  common_throwError_array(reverse);
});
