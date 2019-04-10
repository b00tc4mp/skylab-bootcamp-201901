'use strict';

suite("reverse", function () {
  function initialArray() {
    return ['one', 'two', 'three'];
  }

  test("should sum all items in the array", function () {
    var array = initialArray();
    var expected = ['three', 'two', 'one'];
    
    reverse(array);
    expect(array, expected);
  })

  common_throwError_array(reverse);
});
