'use strict';

describe("indexOf", function () {
  function initialArray() {
    return ['ant', 'bison', 'camel', 'duck', 'bison'];
  }

  it("should return the index of first ocurrence", function () {
    var array = initialArray();
    
    expect(indexOf(array, 'bison'), 1);
    expect(array, initialArray(), true);
  })

  it("should return the index of ocurrence behind fromIndex", function () {
    var array = initialArray();
    
    expect(indexOf(array, 'bison', 2), 4);
    expect(array, initialArray(), true);
  })

  it("should return -1 if no coincidence", function () {
    var array = initialArray();
    
    expect(indexOf(array, 'giraffe'), -1);
    expect(array, initialArray(), true);
  })

  common_throwError_array(indexOf);

});
