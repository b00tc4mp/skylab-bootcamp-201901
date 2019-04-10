'use strict';

describe('isArray', function(){
  it('should break on invalid element', function () {
    try {
      isArray();

      throw Error('should not reach this point');
    } catch (error) {
      expect(error.message, 'undefined is not an array');
    }
  });

  it('should return true if the given element is an array', function () {
    var array = [1, 2, 3];
    var result = isArray(array);

    expect(result, true);
  });

  it('should return false if the given element is not an array', function () {
    var array = {foo: 123};
    var result = isArray(array);

    expect(result, false);
  });
});