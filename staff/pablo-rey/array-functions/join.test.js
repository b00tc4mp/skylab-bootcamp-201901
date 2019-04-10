'use strict';

describe("join", function () {
  function initialArray() {
    return ['Fire', 'Wind', 'Rain'];    
  }

  it("should return a string with elements merged with a comma", function () {
    var array = initialArray();

    expect(join(array), "Fire,Wind,Rain");
    expect(array, initialArray(), true);
  })

  it("should return a string with elements merged without space", function () {
    var array = initialArray();

    expect(join(array, ''), "FireWindRain");
    expect(array, initialArray(), true);
  })

  it("should return a string with elements merged with a separator", function () {
    var array = initialArray();

    expect(join(array, '-'), "Fire-Wind-Rain");
    expect(array, initialArray(), true);
  })

  common_throwError_array(join);
});
