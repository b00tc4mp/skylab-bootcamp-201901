// TODO do it nice!
suite("Horroy", function() {
  describe("Create array", function() {
    it("should createa empty horrory", function() {
      var horroy = new Horroy();
      expect(horroy.length === 0, "Unexpected value");
      expect(horroy.toString() === "", "Unexpected value");
    });

    it("should createa horrory with length equal seven", function() {
      var horroy = new Horroy(7);
      expect(horroy.toString() === ",,,,,,", "Unexpected value");
    });

    it("should createa horrory", function() {
      var horroy = new Horroy(1, 2, 3);
      expect(horroy.length === 3, "Unexpected value length");
    });
  });

  describe("FUnction push", function() {
    it("should add new elements at the end of our horrory", function() {
      var horroy = new Horroy(1, 2, 3);

      horroy.push(4);

      var expected = new Horroy(1, 2, 3, 4);

      expect(
        horroy.toString() === expected.toString(),
        "Unexpected value. The element has not been added."
      );
    });

    it("should add new elements at the end of our horrory and return the new length", function() {
      var horroy = new Horroy(1, 2, 3);

      var pushed = horroy.push(4);

      var expected = 4;

      expect(pushed === expected, "Unexpected value.");
    });
  });

  describe("Function forEach()", function() {
    it("should fail if the argument is not a function", function() {
      var horroy = new Horroy(1, 2, 3);

      var error;

      try {
        horroy.forEach("function");
      } catch (err) {
        error = err;
      }

      expect(error, "It should throw an error");
      expect(error instanceof TypeError, "The error should be TypeError");
    });

    it("should return undefined", function() {
      var horroy = new Horroy();

      var result = horroy.forEach(function(element) {
        console.log(element);
      });

      var expected = undefined;

      expect(
        result === expected,
        "The function should return a undefined value"
      );
    });
  });

  describe("Function map()", function() {
    it("should fail if the argument is not a function", function() {
      var horroy = new Horroy(1, 2, 3);

      var error;

      try {
        horroy.map("function");
      } catch (err) {
        error = err;
      }

      expect(error, "It should throw an error");
      expect(error instanceof TypeError, "The error should be TypeError");
    });

    it("should return a new generated array with the results of the call to the indicated function applied to each of its elements", function() {
      var horroy = new Horroy(1, 2, 3);

      var newArr = horroy.map(function(value) {
        return value * 2;
      });

      var expected = new Horroy(2, 4, 6);

      expect(
        newArr.toString() === expected.toString(),
        "Unexpected value. The array has not been mapped."
      );
    });
  });

  describe("Function toString()", function() {
    it("should return a string of characters representing the specified array and its elements", function() {
      var horroy = new Horroy(1, 2, 3);

      var arrString = horroy.toString();

      var expected = "1,2,3";

      expect(arrString === expected, "Unexpected value.");
    });
  });

  describe("Function from()", function() {
    it("should return a new instance of Array from a string", function() {
      var horroy = Horroy.from("Hola mundo");

      var arrString = horroy.toString();

      var expected = "H,o,l,a, ,m,u,n,d,o";

      expect(arrString === expected, "Unexpected value.");
    });

    it("should return a new instance of Array from a array", function() {
      var horroy = Horroy.from([[1, 2], [2, 4], [4, 8]]);

      var arrString = horroy.toString();

      var expected = "1,2,2,4,4,8";

      expect(arrString === expected, "Unexpected value.");
    });

    it("should return a new instance of Array from a array", function() {
      var horroy = Horroy.from([[1, 2], [2, 4], [4, 8]]);

      var arrString = horroy.toString();

      var expected = "1,2,2,4,4,8";

      expect(arrString === expected, "Unexpected value.");
    });

    it("should return a new instance of Array when pass a callback function", function() {
      var horroy = Horroy.from([1, 2, 3], function(x) {
        return x + x;
      });

      var arrString = horroy.toString();

      var expected = "2,4,6";

      expect(arrString === expected, "Unexpected value.");
    });

    it("should return a new empty instance of Array from not iterable object", function() {
      var horroy = Horroy.from(true);

      var arrString = horroy.toString();

      var expected = "";

      expect(arrString === expected, "Unexpected value.");
    });

    // it('LOOOOOOL', function() {
    //     var horroy = Horroy.from({length: 5}, function(v, i) {
    //         return i;
    //     });

    //     var arrString = horroy.toString();

    //     var expected = '0,1,2,3,4';

    //     expect(arrString === expected, 'Unexpected value.');
    // });
  });

  describe("Function isHorrory()", function() {
    it("should return true if the argument is an Horroy", function() {
      var horroy = new Horroy(1, 2, 3);

      var isHorrory = Horroy.isHorroy(horroy);

      var expected = true;

      expect(isHorrory === expected, "Unexpected value.");
    });

    it("should return true if the argument is not an Horroy", function() {
      var horroy = [1, 2, 3];

      var isHorrory = Horroy.isHorroy(horroy);

      var expected = false;

      expect(isHorrory === expected, "Unexpected value.");
    });
  });

  describe("Function of()", function() {
    it("should createa an horroy with one number", function() {
      var horroy = Horroy.of(1);
      var expected = new Horroy();
      expected.push(1);
      expect(horroy.toString() === expected.toString(), "Unexpected value");
    });

    it("should createa an horroy with multiple numbers", function() {
      var horroy = Horroy.of(1, 2, 3);
      var expected = new Horroy(1, 2, 3);
      expect(horroy.toString() === expected.toString(), "Unexpected value");
    });

    it("should createa an horroy with multiple elements (number and no numbers)", function() {
      var horroy = Horroy.of(1, undefined, true);
      var expected = new Horroy(1, undefined, true);
      expect(horroy.toString() === expected.toString(), "Unexpected value");
    });
  });

  describe("Function concat()", function() {
    it("should concat two numerical horroy", function() {
      var horroy1 = new Horroy(1, 2);
      var horroy2 = new Horroy(3, 4);

      var newHorroy = horroy1.concat(horroy2);
      var expected = new Horroy(1, 2, 3, 4);

      expect(newHorroy.toString() === expected.toString(), "Unexpected value");
    });

    it("should concat two differents horroy", function() {
      var horroy1 = new Horroy("a", "b", "c");
      var horroy2 = new Horroy(1, 2, 3);

      var newHorroy = horroy1.concat(horroy2);
      var expected = new Horroy("a", "b", "c", 1, 2, 3);

      expect(newHorroy.toString() === expected.toString(), "Unexpected value");
    });

    it("should concat three horroy", function() {
      var horroy1 = new Horroy(1, 2, 3);
      var horroy2 = new Horroy(4, 5, 6);
      var horroy3 = new Horroy(7, 8, 9);

      var newHorroy = horroy1.concat(horroy2, horroy3);
      var expected = new Horroy(1, 2, 3, 4, 5, 6, 7, 8, 9);

      expect(newHorroy.toString() === expected.toString(), "Unexpected value");
    });

    it("should concat a empty horroy", function() {
      var horroy1 = new Horroy(1, 2, 3);
      var horroy2 = new Horroy();

      var newHorroy = horroy1.concat(horroy2);
      var expected = new Horroy(1, 2, 3);

      expect(newHorroy.toString() === expected.toString(), "Unexpected value");
    });

    it("should concat a horroy and a string", function() {
      var horroy1 = new Horroy(1, 2, 3);
      var string = "hello";

      var newHorroy = horroy1.concat(string);
      var expected = new Horroy(1, 2, 3, string);

      expect(newHorroy.toString() === expected.toString(), "Unexpected value");
    });

    it("should concat a horroy and a boolean", function() {
      var horroy1 = new Horroy(1, 2, 3);
      var boolean = true;

      var newHorroy = horroy1.concat(boolean);
      var expected = new Horroy(1, 2, 3, boolean);

      expect(newHorroy.toString() === expected.toString(), "Unexpected value");
    });
  });

  describe("Function copyWithin()", function() {
    it("should transfer a copy with 3 arguments", function() {
      var horroy1 = new Horroy("a", "b", "c", "d", "e");

      horroy1.copyWithin(0, 3, 4);
      var expected = new Horroy("d", "b", "c", "d", "e");

      expect(horroy1.toString() === expected.toString(), "Unexpected value");
    });

    it("should transfer a copy with 2 arguments", function() {
      var horroy1 = new Horroy("d", "b", "c", "d", "e");

      horroy1.copyWithin(1, 3);
      var expected = new Horroy("d", "d", "e", "d", "e");

      expect(horroy1.toString() === expected.toString(), "Unexpected value");
    });

    it("should transfer a copy with 1 negative arguments", function() {
      var horroy1 = new Horroy(1, 2, 3, 4, 5);

      horroy1.copyWithin(-2);
      var expected = new Horroy(1, 2, 3, 1, 2);

      expect(horroy1.toString() === expected.toString(), "Unexpected value");
    });

    it("should transfer a copy with 3 negative arguments", function() {
      var horroy1 = new Horroy(1, 2, 3, 4, 5);

      horroy1.copyWithin(-2, -3, -1);
      var expected = new Horroy(1, 2, 3, 3, 4);

      expect(horroy1.toString() === expected.toString(), "Unexpected value");
    });

    it("should return the same horroy if we pass a string argument", function() {
      var horroy1 = new Horroy(1, 2, 3, 4, 5);

      horroy1.copyWithin("hola");
      var expected = new Horroy(1, 2, 3, 4, 5);

      expect(horroy1.toString() === expected.toString(), "Unexpected value");
    });

    it("should transfer a empty horroy", function() {
      var horroy1 = new Horroy();

      horroy1.copyWithin(2);
      var expected = new Horroy();

      expect(horroy1.toString() === expected.toString(), "Unexpected value");
    });
  });

  describe("Function entries()", function() {
    it("should generate a new iterator horroy", function() {
      var horroy1 = new Horroy("a", "b", "c");

      var iterator1 = horroy1.entries();
      var expected = new Horroy("a", "b", "c");

      var iterator1Horroy = new Horroy(3);

      for (var i in iterator1) {
        iterator1Horroy[i] = iterator1[i];
      }

      expect(
        iterator1Horroy.toString() === expected.toString(),
        "Unexpected value"
      );
    });

    it("should return an error to generate a new iterator horroy with string", function() {
      var horroy1 = "hello";

      var error;

      try {
        var iterator1 = horroy1.entries();
      } catch (err) {
        error = err;
      }

      expect(error, "It should throw an error");
      expect(error instanceof TypeError, "The error should be TypeError");
    });
  });

  describe("Function every()", function() {
    it("should return true", function() {
      var horroy1 = new Horroy(1, 30, 39, 29, 10, 1);

      var every = horroy1.every(function(element) {
        return element < 40;
      });

      expect(every, "Unexpected value");
    });

    it("should return false", function() {
      var horroy1 = new Horroy(12, 5, 8, 130, 44);

      var every = horroy1.every(function(element) {
        return element >= 10;
      });

      expect(!every, "Unexpected value");
    });

    it("should return an error to generate a new iterator horroy with string", function() {
      var horroy1 = new Horroy(12, 5, 8, 130, 44);

      var error;

      try {
        var every = horroy1.every("hello");
      } catch (err) {
        error = err;
      }

      expect(error, "It should throw an error");
      expect(error instanceof TypeError, "The error should be TypeError");
    });
  });

  describe("Function flat()", function() {
    it("should return length 3", function() {
      var horroy = new Horroy(1, 2, new Horroy(3, 4, new Horroy(5, 6)));
      horroy.flat(0);
      var expected = 3;
      expect(horroy.length === expected, "Unexpected value");
    });

    it("should return length 5", function() {
      var horroy = new Horroy(1, 2, new Horroy(3, 4, new Horroy(5, 6)));
      var hooryFlat = horroy.flat();
      var expected = 5;
      expect(hooryFlat.length === expected, "Unexpected value");
    });
  });

  describe("Function includes()", function() {
    it("should return true", function() {
      var horroy = new Horroy(1, 2, 3);
      var boolean = horroy.includes(2);
      expect(boolean, "Unexpected value");
    });

    it("should return false", function() {
      var horroy = new Horroy(1, 2, 3);
      var boolean = horroy.includes(4);
      expect(!boolean, "Unexpected value");
    });

    it("should return false when we pass 100 like second argument", function() {
      var horroy = new Horroy("a", "b", "c");
      var boolean = horroy.includes("c", 100);
      expect(!boolean, "Unexpected value");
    });

    it("should return false when we pass -100 like second argument", function() {
      var horroy = new Horroy("a", "b", "c");
      var boolean = horroy.includes("a", -100);
      expect(boolean, "Unexpected value");
    });

    it("should fail if the second argument is not a number", function() {
      var horroy = new Horroy("a", "b", "c");

      var error;

      try {
        var boolean = horroy.includes("a", "s");
      } catch (err) {
        error = err;
      }

      expect(error, "It should throw an error");
      expect(error instanceof TypeError, "The error should be TypeError");
    });
  });

  describe("Function keys()", function() {
    it("should return all keys form Horroy iterator", function() {
      var horroy = new Horroy(1, 2, 3);
      var keys = horroy.keys();

      var expected = "0,1,2";
      expect(keys.toString() === expected, "Unexpected value");
    });
  });

  describe("Function flatMap()", function() {
    it("should return a new horry", function() {
      var horroy = new Horroy(1, 2, 3, 4);
      var horroyFlatMap = horroy.flatMap(function(x) {
        return x * 2;
      });
      var expected = "2,4,6,8";
      expect(horroyFlatMap.toString() === expected, "Unexpected value");
    });

    it("hould fail if the argument is not a function", function() {
      var error;
      var horroy = new Horroy(1, 2, 3, 4);

      try {
        horroy.flatMap("function");
      } catch (err) {
        error = err;
      }

      expect(error, "It should throw an error");
      expect(error instanceof TypeError, "The error should be TypeError");
    });
  });

  describe("Function lastIndexOf()", function() {
    it("should return the last index of the element in the array", function() {
      var horroy = new Horroy(2, 5, 9, 2);
      var horroyIndex = horroy.lastIndexOf(2);
      var expected = 3;
      expect(horroyIndex === expected, "Unexpected value");
    });

    it("should return the last index of the element in the array passing a second argument", function() {
      var horroy = new Horroy(2, 5, 9, 2);
      var horroyIndex = horroy.lastIndexOf(2, 2);
      var expected = 0;
      expect(horroyIndex === expected, "Unexpected value");
    });

    it("should fail if the second argument is not a number", function() {
      var horroy = new Horroy(2, 5, 9, 2);

      var error;

      try {
        var index = horroy.lastIndexOf(2, "s");
      } catch (err) {
        error = err;
      }

      expect(error, "It should throw an error");
      expect(error instanceof TypeError, "The error should be TypeError");
    });

    it("should fail if the second argument is a negative number", function() {
      var horroy = new Horroy(2, 5, 9, 2);
      var horroyIndex = horroy.lastIndexOf(2, -1);
      var expected = 3;
      expect(horroyIndex === expected, "Unexpected value");
    });
  });

  describe("Function reduceRight()", function() {
    it("should reduce array with all arguments", function() {
      var horroy = new Horroy(0, 1, 2, 3, 4);
      var horroyReduceRight = horroy.reduceRight(function(
        valorPrevio,
        valorActual
      ) {
        return valorPrevio + valorActual;
      });
      var expected = 10;
      console.log("#", horroyReduceRight);
      expect(horroyReduceRight === expected, "Unexpected value");
    });

    it("should reduce array with all arguments and initial value", function() {
      var horroy = new Horroy(0, 1, 2, 3, 4);
      var horroyReduceRight = horroy.reduceRight(function(
        valorPrevio,
        valorActual
      ) {
        return valorPrevio + valorActual;
      },
      10);
      var expected = 20;
      expect(horroyReduceRight === expected, "Unexpected value");
    });
  });

  describe("Function sort()", function() {
    it("should sort horry of numbers without compareFunction", function() {
      var horroy = new Horroy(40, 1, 5, 200);
      horroy.sort();
      var expected = "1,200,40,5";
      expect(horroy.toString() === expected, "Unexpected value");
    });

    it("should sort horry of strings without compareFunction", function() {
      var horroy = new Horroy("word", "Word", "1 Word", "2 Words");
      horroy.sort();
      var expected = "1 Word,2 Words,Word,word";
      expect(horroy.toString() === expected, "Unexpected value");
    });

    it("should sort horry of numbers with compareFunction", function() {
      var horroy = new Horroy(4, 2, 5, 1, 3);
      horroy.sort(function(a, b) {
        return b - a;
      });
      var expected = "5,4,3,2,1";
      expect(horroy.toString() === expected, "Unexpected value");
    });

    //Not working
    // it("should sort horry of object with compareFunction", function() {
    //   var horroy = new Horroy(
    //     { name: 'Edward', value: 21 },
    //     { name: 'Sharpe', value: 37 },
    //     { name: 'And', value: 45 },
    //     { name: 'The', value: -12 },
    //     { name: 'Magnetic' },
    //     { name: 'Zeros', value: 37 }
    //   );
    //   horroy.sort(function(a, b) {
    //     if (a.name > b.name) {
    //       return 1;
    //     }
    //     if (a.name < b.name) {
    //       return -1;
    //     }
    //     return 0;
    //   });
    //   console.log(horroy);
    //   var expected = '5,4,3,2,1';
    //   expect(horroy.toString() === expected, "Unexpected value");
    // });
  });

  describe("Function toSource()", function() {
    it("should examine the source code of horroy", function() {
      var horroy = new Horroy("a", "b", "c");
      var expected = "['a', 'b', 'c']";
      expect(horroy.toSource() === expected, "Unexpected value");
    });
  });

  describe("Function fill()", function() {
    it("should fill with arguments are correct", function() {
      var horroy = new Horroy(1, 2, 3, 4, 5);

      var res = horroy.fill(0, 0, 2);

      var expected = "0,0,3,4,5";

      if (res !== horroy) throw Error("array and result should be the same");
      if (res.toString() !== expected)
        throw Error("result should be the one expected");
      if (res.toString() !== expected)
        throw Error("array should have been changed to the one expected");
    });

    it("should fill with two arguments", function() {
      var horroy = new Horroy(1, 2, 3, 4, 5);

      var res = horroy.fill(0, 2);

      var expected = "1,2,0,0,0";

      if (res !== horroy) throw Error("array and result should be the same");
      if (res.toString() !== expected)
        throw Error("result should be the one expected");
      if (horroy.toString() !== expected)
        throw Error("array should have been changed to the one expected");
    });

    it("should fill with one argument", function() {
      var horroy = new Horroy(1, 2, 3, 4, 5);

      var res = horroy.fill(0);

      var expected = "0,0,0,0,0";

      if (res !== horroy) throw Error("array and result should be the same");
      if (res.toString() !== expected)
        throw Error("result should be the one expected");
      if (horroy.toString() !== expected)
        throw Error("array should have been changed to the one expected");
    });

    it("should fill with negatve arguments", function() {
      var horroy = new Horroy(1, 2, 3, 4, 5);

      var res = horroy.fill(0, -3, -2);

      var expected = "1,2,0,4,5";

      if (res !== horroy) throw Error("array and result should be the same");
      if (res.toString() !== expected)
        throw Error("result should be the one expected");
      if (horroy.toString() !== expected)
        throw Error("array should have been changed to the one expected");
    });
  });

  describe("Function filter()", function() {
    it("should filter elements into array", function() {
      var horroy = new Horroy(
        "spray",
        "limit",
        "elite",
        "exuberant",
        "destruction",
        "present"
      );

      var expected = "exuberant,destruction,present";

      var result = horroy.filter(function(word) {
        return word.length > 6;
      });

      if (result.toString() !== expected)
        throw Error("result should be the one expected");
    });

    it("should filter when second argument is not a function", function() {
      var error;

      var horroy = new Horroy(
        "spray",
        "limit",
        "elite",
        "exuberant",
        "destruction",
        "present"
      );

      try {
        result = horroy.filter(2);
      } catch (err) {
        error = err;
      }

      if (!error) throw Error("should have thrown an error");
      if (!(error instanceof Error))
        throw Error("should have thrown TypeError");
    });
  });

  describe("Function find()", function() {
    it("should finds element that exists", function() {
      var horroy = new Horroy(5, 12, 8, 130, 44);

      var found = horroy.find(function(element) {
        return element > 10;
      });

      var expected = 12;

      if (found !== expected)
        throw Error(
          "found value " + found + " does not match expected " + expected
        );
    });

    it("should finds element that exists (products demo)", function() {
      var horroy = new Horroy(
        { product: "T-Shirt", price: 12 },
        { product: "Slips", price: 7 },
        { product: "Shorts", price: 22 },
        { product: "Sockets", price: 3 }
      );

      var found = horroy.find(function(product) {
        return product.price > 5 && product.price < 10;
      });

      var expected = horroy[1];

      if (found !== expected)
        throw Error(
          "found value " + found + " does not match expected " + expected
        );
    });
  });

  describe("Function indexOf()", function() {
    it("should find element index that exists", function() {
      var horroy = new Horroy(2, 9, 9);

      var found = horroy.indexOf(2);

      var expected = 0;

      if (found !== expected)
        throw Error(
          "found index " + found + " does not match expected " + expected
        );
    });

    it("should find element negative index", function() {
      var horroy = new Horroy(2, 9, 9);

      var found = horroy.indexOf(2, -3);

      var expected = 0;

      if (found !== expected)
        throw Error(
          "found index " + found + " does not match expected " + expected
        );
    });

    it("should find non existent element", function() {
      var horroy = new Horroy(2, 9, 9);

      var found = horroy.indexOf(7);

      var expected = -1;

      if (found !== expected)
        throw Error(
          "found index " + found + " does not match expected " + expected
        );
    });
  });

  describe("Function join()", function() {
    it("should join elements", function() {
      var horroy = new Horroy("Fire", "Wind", "Rain");

      var joinElements = horroy.join("-");

      var expected = "Fire-Wind-Rain";

      if (joinElements !== expected)
        throw Error(
          "Joined value " + horroy + " does not match expected " + expected
        );
    });

    it("should join elements without separator argument", function() {
      var horroy = new Horroy("Fire", "Wind", "Rain");

      var joinElements = horroy.join();

      var expected = "FireWindRain";

      if (joinElements !== expected)
        throw Error(
          "Joined value " + horroy + " does not match expected " + expected
        );
    });

    it("should join passing empty array argument", function() {
      var horroy = new Horroy();

      var joinElements = horroy.join();

      var expected = "";

      if (joinElements !== expected)
        throw Error(
          "Joined value " + horroy + " does not match expected " + expected
        );
    });
  });

  describe("Function pop()", function() {
    it("should pop element from array", function() {
      var horroy = new Horroy("angel", "clown", "mandarin", "sturgeon");

      var popped = horroy.pop();

      var expected = "sturgeon";

      if (popped !== expected)
        throw Error(
          "Joined value " + popped + " does not match expected " + expected
        );
    });
  });

  describe("Function reverse()", function() {
    it("should reverse horroy", function() {
      var horroy = new Horroy(1, 2, 3, 4);

      var expected = "4,3,2,1";

      horroy.reverse();

      if (horroy.toString() !== expected)
        throw Error(
          "The new array " + horroy + " does not match expected " + expected
        );
    });
  });

  describe("Function shift()", function() {
    it("should shift elements array", function() {
      var horroy = new Horroy("ángel", "payaso", "mandarín", "cirujano");

      var expected = "ángel";

      var result = horroy.shift();

      if (result.toString() !== expected)
        throw Error("result should be the one expected");
    });
  });

  describe("Function slice()", function() {
    it("should slice horroy", function() {
      var horroy = new Horroy("Rita", "Pedro", "Miguel", "Ana", "Vanesa");

      var expected = "Pedro,Miguel";

      var masculino = horroy.slice(1, 3);

      if (masculino.toString() !== expected)
        throw Error(
          "The new array " + masculino + " does not match expected " + expected
        );
    });

    it("Should slice horroy with end argument > horroy length", function() {
      var horroy = new Horroy("Rita", "Pedro", "Miguel", "Ana", "Vanesa");

      var expected = "Pedro,Miguel,Ana,Vanesa";

      var masculino = horroy.slice(1, 10);

      if (masculino.toString() !== expected)
        throw Error(
          "The new array " + masculino + " does not match expected " + expected
        );
    });

    it("Should slice horroy with negative start argument", function() {
      var horroy = new Horroy("Rita", "Pedro", "Miguel", "Ana", "Vanesa");

      var expected = "Miguel,Ana,Vanesa";

      var masculino = horroy.slice(-3);

      if (masculino.toString() !== expected)
        throw Error(
          "The new array " + masculino + " does not match expected " + expected
        );
    });

    it("should slice with negative end argument", function() {
      var horroy = new Horroy("Rita", "Pedro", "Miguel", "Ana", "Vanesa");

      var expected = "Pedro";

      var masculino = horroy.slice(1, -3);

      if (masculino.toString() !== expected)
        throw Error(
          "The new array " + masculino + " does not match expected " + expected
        );
    });
  });

  describe("Function some()", function() {
    it("Some element into array", function() {
      var horroy = new Horroy(1, 2, 3, 4, 5);

      var expected = true;

      var even = horroy.some(function(element) {
        return element % 2 === 0;
      });

      if (even !== expected)
        throw Error(
          "found value " + even + " does not match expected " + expected
        );
    });
  });

  describe("Function splice()", function() {
    it('Delete 0 items from index 2 and insert "drum"', function() {
      var horroy = new Horroy("angel", "clown", "mandarin", "sturgeon");

      var expected = "";
      var mutatedExpected = "angel,clown,drum,mandarin,sturgeon";

      var removed = horroy.splice(2, 0, "drum");

      if (removed.toString() !== expected)
        throw Error(
          "The new array " + removed + " does not match expected " + expected
        );
      if (horroy.toString() !== mutatedExpected)
        throw Error(
          "The new array " +
            horroy +
            " does not match expected " +
            mutatedExpected
        );
    });

    it("Remove 1 item from index 3", function() {
      var horroy = new Horroy("angel", "clown", "drum", "mandarin", "sturgeon");

      var expected = "mandarin";
      var mutatedExpected = "angel,clown,drum,sturgeon";

      var removed = horroy.splice(3, 1);

      if (removed.toString() !== expected)
        throw Error(
          "The new array " + removed + " does not match expected " + expected
        );
      if (horroy.toString() !== mutatedExpected)
        throw Error(
          "The new array " +
            horroy +
            " does not match expected " +
            mutatedExpected
        );
    });

    it('Remove 1 element from index 2 and insert "trumpet"', function() {
      var horroy = new Horroy("angel", "clown", "drum", "sturgeon");

      var expected = "drum";
      var mutatedExpected = "angel,clown,trumpet,sturgeon";

      var removed = horroy.splice(2, 1, "trumpet");

      if (removed.toString() !== expected)
        throw Error(
          "The new array " + removed + " does not match expected " + expected
        );
      if (horroy.toString() !== mutatedExpected)
        throw Error(
          "The new array " +
            horroy +
            " does not match expected " +
            mutatedExpected
        );
    });

    it('Delete 2 elements from index 0 and insert "parrot", "anemone" and "blue"', function() {
      var horroy = new Horroy("angel", "clown", "trumpet", "sturgeon");

      var expected = "angel,clown";
      var mutatedExpected = "parrot,anemone,blue,trumpet,sturgeon";

      var removed = horroy.splice(0, 2, "parrot", "anemone", "blue");

      if (removed.toString() !== expected)
        throw Error(
          "The new array " + removed + " does not match expected " + expected
        );
      if (horroy.toString() !== mutatedExpected)
        throw Error(
          "The new array " +
            horroy +
            " does not match expected " +
            mutatedExpected
        );
    });

    it("Remove 1 item from index -2", function() {
      var horroy = new Horroy("angel", "clown", "mandarin", "sturgeon");

      var expected = "mandarin";
      var mutatedExpected = "angel,clown,sturgeon";

      var removed = horroy.splice(-2, 1);

      if (removed.toString() !== expected)
        throw Error(
          "The new array " + removed + " does not match expected " + expected
        );
      if (horroy.toString() !== mutatedExpected)
        throw Error(
          "The new array " +
            horroy +
            " does not match expected " +
            mutatedExpected
        );
    });

    it("Remove all elements after index 2", function() {
      var horroy = new Horroy("angel", "clown", "mandarin", "sturgeon");

      var expected = "mandarin,sturgeon";
      var mutatedExpected = "angel,clown";

      var removed = horroy.splice(2);

      if (removed.toString() !== expected)
        throw Error(
          "The new array " + removed + " does not match expected " + expected
        );
      if (horroy.toString() !== mutatedExpected)
        throw Error(
          "The new array " +
            horroy +
            " does not match expected " +
            mutatedExpected
        );
    });

    it("If third argument is 0 or negative, do nothing", function() {
      var horroy = new Horroy("angel", "clown", "mandarin", "sturgeon");

      var expected = "";
      var mutatedExpected = "angel,clown,mandarin,sturgeon";

      var removed = horroy.splice(2, 0);

      if (removed.toString() !== expected)
        throw Error(
          "The new array " + removed + " does not match expected " + expected
        );
      if (horroy.toString() !== mutatedExpected)
        throw Error(
          "The new array " +
            horroy +
            " does not match expected " +
            mutatedExpected
        );
    });
  });

  describe("Function unshift()", function() {
    it("should unshift one element array", function() {
      var horroy = new Horroy(1, 2);

      var expected = 3;

      var result = horroy.unshift(0);

      if (result !== expected) throw Error("result should be the one expected");
    });

    it("should unshift elements array", function() {
      var horroy = new Horroy(1, 2);

      var expected = 5;

      var result = horroy.unshift(0, 4, 5);

      if (result !== expected) throw Error("result should be the one expected");
    });

    it("should unshift array element into array", function() {
      var horroy = new Horroy(1, 2);

      var expected = 3;

      var result = horroy.unshift([-3]);

      if (result !== expected) throw Error("result should be the one expected");
    });
  });
});
