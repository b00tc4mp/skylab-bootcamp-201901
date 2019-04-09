'use strict';

suite("join", function () {
  function initialArray() {
    return ['Fire', 'Wind', 'Rain'];    
  }

  test("should return a string with elements merged with a comma", function () {
    var array = initialArray();

    expect(join(array), "Fire,Wind,Rain");
    expect(array, initialArray());
  })

  test("should return a string with elements merged without space", function () {
    var array = initialArray();

    expect(join(array, ''), "FireWindRain");
    expect(array, initialArray());
  })

  test("should return a string with elements merged with a separator", function () {
    var array = initialArray();

    expect(join(array, '-'), "Fire-Wind-Rain");
    expect(array, initialArray());
  })

  common_throwError_array(join);
});
