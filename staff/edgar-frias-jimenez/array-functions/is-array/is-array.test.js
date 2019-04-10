'use strict';

suite('isArray', function(){
  test('should break on invalid element', function () {
    try {
      isArray();

      throw Error('should not reach this point');
    } catch (error) {
      expect(error.message, 'undefined is not an array');
    }
  });

  test('should return true if the given element is an array', function () {
    var array = [1, 2, 3];
    var result = isArray(array);

    expect(result, true);
  });

  test('should return false if the given element is not an array', function () {
    var array = {foo: 123};
    var result = isArray(array);

    expect(result, false);
  });
});