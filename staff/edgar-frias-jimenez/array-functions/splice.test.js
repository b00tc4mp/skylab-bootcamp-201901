'use strict';

describe('splice', function(){
  it('changes the content of an array by erasing existing elements and/or adding new ones.', function(){
    var array = ['Jan', 'March', 'April', 'June'];
    var result = splice(array, 1, 0, 'Feb');
    var expected = ['Jan', 'Feb', 'March', 'April', 'June'];

    expect(result, expected, true);
  });

  it('should break if startCount is not a number', function() {
    try {
      var array = ['Jan', 'March', 'April', 'June'];
      splice(array, 'hola', 0, 'Feb');

      throw Error('should not reach this point');
    } catch (error) {
      expect(error.message, 'hola is not a number');
    }
  });

  it('should break if deleteCount is not a number', function() {
    try {
      var array = ['Jan', 'March', 'April', 'June'];
      splice(array, 0, 'hola', 'Feb');

      throw Error('should not reach this point');
    } catch (error) {
      expect(error.message, 'hola is not a number');
    }
  });
});
