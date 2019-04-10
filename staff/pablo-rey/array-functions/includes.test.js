'use strict';

describe("includes", function () {
  function initialArray1() {
    return [1, 2, 3];
  }
  function initialArrayPets() {
    return ['cat', 'dog', 'bat'];
  }

  it("should return true if includes a present element", function () {
    var array = initialArray1();
    expect(includes(array, 2), true);
    expect(array, initialArray1(), true);
  })

  it("should return true if includes a present element", function () {
    var array = initialArrayPets();
    expect(includes(array, 'cat'), true);
    expect(array, initialArrayPets(), true);
  });

  it("should return false if not includes a exact coincidence", function () {
    var array = initialArrayPets();
    expect(includes(array, 'at'), false);
    expect(array, initialArrayPets(), true);
  });

  common_throwError_array(includes);

});


