'use strict';

describe('pop', function(){
  it('should erase the last value of a given array and then give the resulting array', function(){
    var array = [1, 2, 3, 4, 5];
    var result = pop(array);
    var expected = [1, 2, 3, 4];

    expect(result, expected, true);
  });

  it('should return undefined on empty array', function() {
      var array = [];
      var value = pop(array);

      expect(array.length, 0);
      expect(value, undefined);
  });

  it('will break if the array provided is undefined', function(){
    try {
      pop();

      throw Error('should not arrive here');
    } catch(error) {
      expect(error.message, 'undefined is not an array');
    }
  });
});