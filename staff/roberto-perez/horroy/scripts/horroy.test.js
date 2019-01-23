// TODO do it nice!
suite("Horroy", function() {
  // describe('Create array', function() {

  //     it('should createa empty horrory', function() {
  //         var horroy = new Horroy();
  //         expect(horroy.length === 0, 'Unexpected value');
  //         expect(horroy.toString() === '', 'Unexpected value')
  //     });

  //     it('should createa horrory with length equal seven', function() {
  //         var horroy = new Horroy(7);
  //         expect(horroy.toString() === ',,,,,,', 'Unexpected value')
  //     });

  //     it('should createa horrory', function() {
  //         var horroy = new Horroy(1, 2, 3);
  //         expect(horroy.length === 3, 'Unexpected value length');
  //     });

  // });

  // describe('FUnction push', function() {

  //     it('should add new elements at the end of our horrory', function() {
  //         var horroy = new Horroy(1, 2, 3);

  //         horroy.push(4);

  //         var expected = new Horroy(1, 2, 3, 4);

  //         expect(horroy.toString() === expected.toString(), 'Unexpected value. The element has not been added.')
  //     });

  //     it('should add new elements at the end of our horrory and return the new length', function() {
  //         var horroy = new Horroy(1, 2, 3);

  //         var pushed = horroy.push(4);

  //         var expected = 4;

  //         expect((pushed === expected), 'Unexpected value.')
  //     });

  // });

  // describe('Function forEach()', function() {

  //     it('should fail if the argument is not a function', function() {
  //         var horroy = new Horroy(1, 2, 3);

  //         var error;

  //         try {
  //             horroy.forEach('function');
  //         } catch (err) {
  //             error = err;
  //         }

  //         expect(error, 'It should throw an error');
  //         expect(error instanceof TypeError, 'The error should be TypeError');
  //     });

  //     it('should return undefined', function() {
  //         var horroy = new Horroy();

  //         var result = horroy.forEach(function(element){
  //             console.log(element);
  //         });

  //         var expected = undefined;

  //         expect(result === expected, 'The function should return a undefined value');
  //     });

  // });

  // describe('Function map()', function() {

  //     it('should fail if the argument is not a function', function() {
  //         var horroy = new Horroy(1, 2, 3);

  //         var error;

  //         try {
  //             horroy.map('function');
  //         } catch (err) {
  //             error = err;
  //         }

  //         expect(error, 'It should throw an error');
  //         expect(error instanceof TypeError, 'The error should be TypeError');
  //     });

  //     it('should return a new generated array with the results of the call to the indicated function applied to each of its elements', function() {
  //         var horroy = new Horroy(1, 2, 3);

  //         var newArr = horroy.map(function (value) { return value * 2; });

  //         var expected = new Horroy(2, 4, 6);

  //         expect(newArr.toString() === expected.toString(), 'Unexpected value. The array has not been mapped.');
  //     });

  // });

  // describe('Function toString()', function() {

  //     it('should return a string of characters representing the specified array and its elements', function() {
  //         var horroy = new Horroy(1, 2, 3);

  //         var arrString = horroy.toString();

  //         var expected = '1,2,3';

  //         expect(arrString === expected, 'Unexpected value.')
  //     });

  // });

  // describe('Function from()', function() {

  //     it('should return a new instance of Array from a string', function() {
  //         var horroy = Horroy.from('Hola mundo');

  //         var arrString = horroy.toString();

  //         var expected = 'H,o,l,a, ,m,u,n,d,o';

  //         expect(arrString === expected, 'Unexpected value.')
  //     });

  //     it('should return a new instance of Array from a array', function() {
  //         var horroy = Horroy.from([[1, 2], [2, 4], [4, 8]]);

  //         var arrString = horroy.toString();

  //         var expected = '1,2,2,4,4,8';

  //         expect(arrString === expected, 'Unexpected value.')
  //     });

  //     it('should return a new instance of Array from a array', function() {
  //         var horroy = Horroy.from([[1, 2], [2, 4], [4, 8]]);

  //         var arrString = horroy.toString();

  //         var expected = '1,2,2,4,4,8';

  //         expect(arrString === expected, 'Unexpected value.')
  //     });

  //     it('should return a new instance of Array when pass a callback function', function() {
  //         var horroy = Horroy.from([1, 2, 3], function(x) {
  //             return x + x;
  //         });

  //         var arrString = horroy.toString();

  //         var expected = '2,4,6';

  //         expect(arrString === expected, 'Unexpected value.')
  //     });

  //     it('should return a new empty instance of Array from not iterable object', function() {
  //         var horroy = Horroy.from(true);

  //         var arrString = horroy.toString();

  //         var expected = '';

  //         expect(arrString === expected, 'Unexpected value.')
  //     });

  //     // it('LOOOOOOL', function() {
  //     //     var horroy = Horroy.from({length: 5}, function(v, i) {
  //     //         return i;
  //     //     });

  //     //     var arrString = horroy.toString();

  //     //     var expected = '0,1,2,3,4';

  //     //     expect(arrString === expected, 'Unexpected value.');
  //     // });

  // });

  // describe('Function isHorrory()', function() {

  //     it('should return true if the argument is an Horroy', function() {
  //         var horroy = new Horroy(1, 2, 3);

  //         var isHorrory = Horroy.isHorroy(horroy);

  //         var expected = true;

  //         expect(isHorrory === expected, 'Unexpected value.')
  //     });

  //     it('should return true if the argument is not an Horroy', function() {
  //         var horroy = [1, 2, 3];

  //         var isHorrory = Horroy.isHorroy(horroy);

  //         var expected = false;

  //         expect(isHorrory === expected, 'Unexpected value.')
  //     });

  // });

  // describe('Function of()', function() {

  //     it('should createa an horroy with one number', function() {
  //         var horroy = Horroy.of(1);
  //         var expected = new Horroy;
  //         expected.push(1);
  //         expect(horroy.toString() === expected.toString(), 'Unexpected value');
  //     });

  //     it('should createa an horroy with multiple numbers', function() {
  //         var horroy = Horroy.of(1, 2, 3);
  //         var expected = new Horroy(1, 2, 3);
  //         expect(horroy.toString() === expected.toString(), 'Unexpected value');
  //     });

  //     it('should createa an horroy with multiple elements (number and no numbers)', function() {
  //         var horroy = Horroy.of(1, undefined, true);
  //         var expected = new Horroy(1, undefined, true);
  //         expect(horroy.toString() === expected.toString(), 'Unexpected value');
  //     });

  // });

  // describe('Function concat()', function() {

  //     it('should concat two numerical horroy', function() {
  //         var horroy1 = new Horroy(1, 2);
  //         var horroy2 = new Horroy(3, 4);

  //         var newHorroy = horroy1.concat(horroy2);
  //         var expected = new Horroy(1, 2, 3, 4);

  //         expect(newHorroy.toString() === expected.toString(), 'Unexpected value');
  //     });

  //     it('should concat two differents horroy', function() {
  //         var horroy1 = new Horroy('a', 'b', 'c');
  //         var horroy2 = new Horroy(1, 2, 3);

  //         var newHorroy = horroy1.concat(horroy2);
  //         var expected = new Horroy('a', 'b', 'c', 1, 2, 3);

  //         expect(newHorroy.toString() === expected.toString(), 'Unexpected value');
  //     });

  //     it('should concat three horroy', function() {
  //         var horroy1 = new Horroy(1, 2, 3);
  //         var horroy2 = new Horroy(4, 5, 6);
  //         var horroy3 = new Horroy(7, 8, 9);

  //         var newHorroy = horroy1.concat(horroy2, horroy3);
  //         var expected = new Horroy(1, 2, 3, 4, 5, 6, 7, 8, 9);

  //         expect(newHorroy.toString() === expected.toString(), 'Unexpected value');
  //     });

  //     it('should concat a empty horroy', function() {
  //         var horroy1 = new Horroy(1, 2, 3);
  //         var horroy2 = new Horroy();

  //         var newHorroy = horroy1.concat(horroy2);
  //         var expected = new Horroy(1, 2, 3);

  //         expect(newHorroy.toString() === expected.toString(), 'Unexpected value');
  //     });

  //     it('should concat a horroy and a string', function() {
  //         var horroy1 = new Horroy(1, 2, 3);
  //         var string = 'hello';

  //         var newHorroy = horroy1.concat(string);
  //         var expected = new Horroy(1, 2, 3, string);

  //         expect(newHorroy.toString() === expected.toString(), 'Unexpected value');
  //     });

  //     it('should concat a horroy and a boolean', function() {
  //         var horroy1 = new Horroy(1, 2, 3);
  //         var boolean = true;

  //         var newHorroy = horroy1.concat(boolean);
  //         var expected = new Horroy(1, 2, 3, boolean);

  //         expect(newHorroy.toString() === expected.toString(), 'Unexpected value');
  //     });

  // });

  // describe('Function copyWithin()', function() {

  //     it('should transfer a copy with 3 arguments', function() {
  //         var horroy1 = new Horroy('a', 'b', 'c', 'd', 'e');

  //         horroy1.copyWithin(0, 3, 4);
  //         var expected = new Horroy("d", "b", "c", "d", "e");

  //         expect(horroy1.toString() === expected.toString(), 'Unexpected value');
  //     });

  //     it('should transfer a copy with 2 arguments', function() {
  //         var horroy1 = new Horroy("d", "b", "c", "d", "e");

  //         horroy1.copyWithin(1, 3);
  //         var expected = new Horroy("d", "d", "e", "d", "e");

  //         expect(horroy1.toString() === expected.toString(), 'Unexpected value');
  //     });

  //     it('should transfer a copy with 1 negative arguments', function() {
  //         var horroy1 = new Horroy(1, 2, 3, 4, 5);

  //         horroy1.copyWithin(-2);
  //         var expected = new Horroy(1, 2, 3, 1, 2);

  //         expect(horroy1.toString() === expected.toString(), 'Unexpected value');
  //     });

  //     it('should transfer a copy with 3 negative arguments', function() {
  //         var horroy1 = new Horroy(1, 2, 3, 4, 5);

  //         horroy1.copyWithin(-2, -3, -1);
  //         var expected = new Horroy(1, 2, 3, 3, 4);

  //         expect(horroy1.toString() === expected.toString(), 'Unexpected value');
  //     });

  //     it('should return the same horroy if we pass a string argument', function() {
  //         var horroy1 = new Horroy(1, 2, 3, 4, 5);

  //         horroy1.copyWithin('hola');
  //         var expected = new Horroy(1, 2, 3, 4, 5);

  //         expect(horroy1.toString() === expected.toString(), 'Unexpected value');
  //     });

  //     it('should transfer a empty horroy', function() {
  //         var horroy1 = new Horroy();

  //         horroy1.copyWithin(2);
  //         var expected = new Horroy();

  //         expect(horroy1.toString() === expected.toString(), 'Unexpected value');
  //     });

  // });

  // describe('Function entries()', function() {

  //     it('should generate a new iterator horroy', function() {
  //         var horroy1 = new Horroy('a', 'b', 'c');

  //         var iterator1 = horroy1.entries();
  //         var expected = new Horroy("a", "b", "c");

  //         var iterator1Horroy =new Horroy(3);

  //         for (var i in iterator1) {
  //             iterator1Horroy[i] = iterator1[i]
  //         }

  //         expect(iterator1Horroy.toString() === expected.toString(), 'Unexpected value');
  //     });

  //     it('should return an error to generate a new iterator horroy with string', function() {
  //         var horroy1 = 'hello';

  //         var error;

  //         try {
  //             var iterator1 = horroy1.entries();
  //         } catch (err) {
  //             error = err;
  //         }

  //         expect(error, 'It should throw an error');
  //         expect(error instanceof TypeError, 'The error should be TypeError');
  //     });

  // });

  // describe('Function every()', function() {

  //     it('should return true', function() {
  //         var horroy1 = new Horroy(1, 30, 39, 29, 10, 1);

  //         var every = horroy1.every(function(element) {
  //             return element < 40;
  //         });

  //         expect(every, 'Unexpected value');
  //     });

  //     it('should return false', function() {
  //         var horroy1 = new Horroy(12, 5, 8, 130, 44);

  //         var every = horroy1.every(function(element) {
  //             return element >= 10;
  //         });

  //         expect(!every, 'Unexpected value');
  //     });

  //     it('should return an error to generate a new iterator horroy with string', function() {
  //         var horroy1 = new Horroy(12, 5, 8, 130, 44);

  //         var error;

  //         try {
  //             var every = horroy1.every('hello');
  //         } catch (err) {
  //             error = err;
  //         }

  //         expect(error, 'It should throw an error');
  //         expect(error instanceof TypeError, 'The error should be TypeError');
  //     });

  // });

  // describe("Function flat()", function() {

  //   it("should return length 3", function() {
  //     var horroy = new Horroy(1, 2, new Horroy(3, 4, new Horroy(5, 6)));
  //     horroy.flat(0);
  //     var expected = 3;
  //     expect(horroy.length === expected, "Unexpected value");
  //   });

  //   it("should return length 5", function() {
  //     var horroy = new Horroy(1, 2, new Horroy(3, 4, new Horroy(5, 6)));
  //     var hooryFlat = horroy.flat();
  //     var expected = 5;
  //     expect(hooryFlat.length === expected, "Unexpected value");
  //   });

  // });

  // describe("Function includes()", function() {

  //   it("should return true", function() {
  //     var horroy = new Horroy(1, 2, 3);
  //     var boolean = horroy.includes(2);
  //     expect(boolean, "Unexpected value");
  //   });

  //   it("should return false", function() {
  //     var horroy = new Horroy(1, 2, 3);
  //     var boolean = horroy.includes(4);
  //     expect(!boolean, "Unexpected value");
  //   });

  //   it("should return false when we pass 100 like second argument", function() {
  //     var horroy = new Horroy("a", "b", "c");
  //     var boolean = horroy.includes("c", 100);
  //     expect(!boolean, "Unexpected value");
  //   });

  //   it("should return false when we pass -100 like second argument", function() {
  //     var horroy = new Horroy("a", "b", "c");
  //     var boolean = horroy.includes("a", -100);
  //     expect(boolean, "Unexpected value");
  //   });

  //   it("should fail if the second argument is not a number", function() {
  //     var horroy = new Horroy("a", "b", "c");

  //     var error;

  //     try {
  //       var boolean = horroy.includes("a", 's');
  //     } catch (err) {
  //       error = err;
  //     }

  //     expect(error, "It should throw an error");
  //     expect(error instanceof TypeError, "The error should be TypeError");
  //   });

  // });

  // describe("Function keys()", function() {

  //   it("should return all keys form Horroy iterator", function() {
  //     var horroy = new Horroy(1, 2, 3);
  //     var keys = horroy.keys();

  //     var expected = '0,1,2';
  //     expect(keys.toString() === expected, "Unexpected value");
  //   });

  // });

  // describe("Function flatMap()", function() {
  //   it("should return a new horry", function() {
  //     var horroy = new Horroy(1, 2, 3, 4);
  //     var horroyFlatMap = horroy.flatMap(function(x) {
  //       return x * 2;
  //     });
  //     var expected = "2,4,6,8";
  //     expect(horroyFlatMap.toString() === expected, "Unexpected value");
  //   });

  //   it("hould fail if the argument is not a function", function() {
  //     var error;
  //     var horroy = new Horroy(1, 2, 3, 4);

  //     try {
  //       horroy.flatMap('function');
  //     } catch (err) {
  //       error = err;
  //     }

  //     expect(error, "It should throw an error");
  //     expect(error instanceof TypeError, "The error should be TypeError");
  //   });
  // });

  // describe("Function lastIndexOf()", function() {
  //   it("should return the last index of the element in the array", function() {
  //     var horroy = new Horroy(2, 5, 9, 2);
  //     var horroyIndex = horroy.lastIndexOf(2);
  //     var expected = 3;
  //     expect(horroyIndex === expected, "Unexpected value");
  //   });

  //   it("should return the last index of the element in the array passing a second argument", function() {
  //     var horroy = new Horroy(2, 5, 9, 2);
  //     var horroyIndex = horroy.lastIndexOf(2, 2);
  //     var expected = 0;
  //     expect(horroyIndex === expected, "Unexpected value");
  //   });

  //   it("should fail if the second argument is not a number", function() {
  //     var horroy = new Horroy(2, 5, 9, 2);

  //     var error;

  //     try {
  //       var index = horroy.lastIndexOf(2, "s");
  //     } catch (err) {
  //       error = err;
  //     }

  //     expect(error, "It should throw an error");
  //     expect(error instanceof TypeError, "The error should be TypeError");
  //   });

  //   it("should fail if the second argument is a negative number", function() {
  //     var horroy = new Horroy(2, 5, 9, 2);
  //     var horroyIndex = horroy.lastIndexOf(2, -1);
  //     var expected = 3;
  //     expect(horroyIndex === expected, "Unexpected value");
  //   });
  // });

  // describe("Function reduceRight()", function() {
  //   it("should reduce array with all arguments", function() {
  //     var horroy = new Horroy(0,1,2,3,4);
  //     var horroyReduceRight = horroy.reduceRight(function(valorPrevio, valorActual){
  //       return valorPrevio + valorActual;
  //     });
  //     var expected = 10;
  //     console.log('#', horroyReduceRight);
  //     expect(horroyReduceRight === expected, "Unexpected value");
  //   });

  //   it("should reduce array with all arguments and initial value", function() {
  //     var horroy = new Horroy(0,1,2,3,4);
  //     var horroyReduceRight = horroy.reduceRight(function(valorPrevio, valorActual){
  //       return valorPrevio + valorActual;
  //     }, 10);
  //     var expected = 20;
  //     expect(horroyReduceRight === expected, "Unexpected value");
  //   });
  // });

  describe("Function sort()", function() {
    it("should sort horry of numbers without  compareFunction", function() {
      var horroy = new Horroy(40, 1, 5, 200);
      horroy.sort();
      console.log(horroy);
      var expected = '1,200,40,5';
      expect(horroy.toString() === expected, "Unexpected value");
    });
  });

});
