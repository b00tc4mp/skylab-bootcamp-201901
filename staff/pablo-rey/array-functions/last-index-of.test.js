'use strict';

describe("lastIndexOf", function() {
  function initialArray () {
    return ['Dodo', 'Tiger', 'Penguin', 'Dodo'];    
  }

  it("should return last element equal", function () {
    var array = initialArray();

    expect(lastIndexOf(array, 'Dodo'), 3);
    expect(array, initialArray(), true);
  })

  it("should return last element equal behind position given", function () {
    var array = initialArray();

    expect(lastIndexOf(array, 'Dodo', 2), 0);
    expect(array, initialArray(), true);
  })

  common_throwError_array(lastIndexOf);

})
