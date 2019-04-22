'use strict';

describe('reduce-right', function(){
  it('will apply a callback into an accumulator and to the content of a given array from right to left, then it will return a unique value.', function(){
    var array = ['r', 'y', 'b', 'a', 'v'];
    var result = reduceRight(array, function(a, b){ return a + b; });
    var expected = 'vabyr';

    expect(result, expected);
  });

  it('will apply an initial value to the accumulator in order to initialize it.', function(){
    var array = [0, 1, 2, 3, 4];
    var result = reduceRight(array, function(a, b){ return a + b; }, 10);
    var expected = 20;

    expect(result, expected);
  });

  it('should break on undefined array', function () {
    try {
      reduceRight();

      throw Error('should not reach this point');
    } catch (error) {
      expect(error.message, 'undefined is not an array');
    }
  });

  it('should break on undefined callback', function () {
    var array = [1, 2, 3];

    try {
      reduceRight(array);

      throw Error('should not reach this point');
    } catch (error) {
      expect(error.message, 'undefined is not a function');
    }
  });
});