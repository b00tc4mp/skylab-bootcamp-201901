'use strict';

describe('some', function(){
  it('will check if at least one item comply with the given condition', function(){
    var array = [1, 2, 3, 4, 5];

    var even = function(element){
      return element % 2 === 0;
    }

    var result = some(array, even);
    var expected = true;

    expect(result, expected);
  });

  it('should break on undefined array', function () {
    try {
      some();

      throw Error('should not reach this point');
    } catch (error) {
      expect(error.message, 'undefined is not an array');
    }
  });

  it('should break on undefined callback', function () {
    var array = [1, 2, 3];

    try {
      some(array);

      throw Error('should not reach this point');
    } catch (error) {
      expect(error.message, 'undefined is not a function');
    }
  });
});