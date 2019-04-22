'use strict';

describe('shift', function(){
  it('should return the first element by extracting it from the array modifying its length', function(){
    var array = [1, 2, 3, 4, 5];
    var expected = array[0];
    var result = shift(array);

    expect(result, expected);

    var expected2 = [2, 3, 4, 5];

    expect(array, expected2, true);
  });

  it('wil return undefined if the array provided has a length of 0', function(){
    var result = shift([]);
    var expected = undefined;

    expect(result, expected);
  });

  it('will break if the array provided is undefined', function(){
    try {
      shift();

      throw Error('should not arrive here');
    } catch(error) {
      expect(error.message, 'undefined is not an array');
    }
  });
});