'use strict';

describe("reduce", function () {
  function initialArray() {
    return [1, 2, 3, 4];
  }

  function reducer (acc, value) { 
    return acc + value; 
  }

  it("should sum all items in the array", function () {
    var array = initialArray();
    
    expect(reduce(array, reducer), 10);
    expect(array, initialArray(), true);
  })

  it("should sum all items in the array with initial value", function () {
    var array = initialArray();
    
    expect(reduce(array, reducer, 5), 10);
    expect(array, initialArray(), true);    
  })

  common_throwError_array(reduce);
  common_throwError_callback(reduce, initialArray());

})
