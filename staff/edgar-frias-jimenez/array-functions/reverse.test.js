'use strict';

describe('reverse', function(){
  it('should place items from an array in a reverse order', function(){
    var array = [1, 2, 3];
    var result = reverse(array);
    var expected = [3, 2, 1];

    expect(result, expected, true);
  });

  it('should break on undefined array', function () {
    try {
      reverse();

      throw Error('should not reach this point');
    } catch (error) {
      expect(error.message, 'undefined is not an array');
    }
  });
});
