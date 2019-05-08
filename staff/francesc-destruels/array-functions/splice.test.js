describe('splice', function () {
    it('Should return the array with the element introduced on the given index', function () {
        var answer = ['ant', 'bison','cabra', 'camel', 'duck', 'elephant'];
        var animals = ['ant', 'bison', 'camel', 'duck', 'elephant'];

        try {
            var result = splice(animals, 2, 0, "cabra");
  
            throw Error('should not reach this point');
          } catch (error) {
            expect(result, answer, true);
          }
    });


    it('should add each element starting by the last index', function () {
        var answer = ['ant', 'bison','cabra', 'duck', 'elephant'];
        var animals = ['ant', 'bison', 'camel', 'duck', 'elephant'];

        try {
            var result = splice(animals, 2, 1, "cabra");
  
            throw Error('should not reach this point');
          } catch (error) {
            expect(result, answer, true);
          }
    });


    it('should break because of undefined array', function () {
        try {
          splice();

            throw Error('should not reach this point');
        } catch (error) {
            expect(error.message, 'undefined is not an array');
        }
    });

    it('should break because of undefined array', function () {
        var animals = ['ant', 'bison', 'camel', 'duck', 'elephant'];

        try {
          splice(animals);

            throw Error('should not reach this point');
        } catch (error) {
            expect(error.message,  'undefined is not a starting value');
        }
    });
});  
