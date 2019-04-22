'use strict';

describe('slice', function() {
  it('should returns part of an array starting from start to end', function() {
    var array = ['Rita', 'Pedro', 'Miguel', 'Ana', 'Vanesa'];
    var result = slice(array, 1, 3);
    var expected = ['Pedro', 'Miguel'];

    expect(result, expected, true);
  });

  it('should break if start is not a number', function() {
    try {
      var array = ['Rita', 'Pedro', 'Miguel', 'Ana', 'Vanesa'];
      var result = slice(array, 'hola', 3);

      throw Error('should not reach this point');
    } catch (error) {
      expect(error.message, 'hola is not a number');
    }
  });

  it('should break if end is not a number', function() {
    try {
      var array = ['Rita', 'Pedro', 'Miguel', 'Ana', 'Vanesa'];
      var result = slice(array, 1, 'adios');

      throw Error('should not reach this point');
    } catch (error) {
      expect(error.message, 'adios is not a number');
    }
  });
});