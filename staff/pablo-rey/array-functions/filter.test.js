'use strict';

describe("filter", function () {
  function initialValue() {
    return ['spray', 'limit', 'elite', 'exuberant', 'destruction', 'present']
  }

  it("should show only return elements that fulfill condition", function() {
    var words = initialValue();
    var expected = ["exuberant", "destruction", "present"];
    expect(filter(words, function (word) { return word.length > 6; }), expected, true);
    expect(words, initialValue(), true);
  })

  common_throwError_array(filter);
})
