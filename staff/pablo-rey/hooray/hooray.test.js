"use strict";

describe("hooray", function() {
describe("constructor", function() {
    it("should construct an empty hooray when no arguments", function() {
      var hooray = new Hooray();

      expect(hooray.length, 0);
      expect(Object.keys(hooray).length, 1);
    });

    it("should construct a non-empty hooray when existing arguments", function() {
      var hooray = new Hooray(1, 2, 3);

      expect(hooray.length, 3);
      expect(hooray, { 0: 1, 1: 2, 2: 3, length: 3 }, true);
      expect(Object.keys(hooray).length, 4);
    });

    it("should construct an empty hooray with length equal to when only one numeric argument", function() {
      var hooray = new Hooray(1);

      expect(hooray.length, 1);
      expect(Object.keys(hooray).length, 1);
    });

    it("should construct a non-empty hooray with only one non-numeric argument", function() {
      var hooray = new Hooray("1");

      expect(hooray.length, 1);
      expect(hooray, { 0: "1", length: 1 }, true);
      expect(Object.keys(hooray).length, 2);
    });
  });

  describe("push", function() {
    it("should add a value at the end of an hooray", function() {
      var hooray = new Hooray(1, 2, 3);

      var length = hooray.push(4);

      expect(hooray.length, 4);
      expect(length, hooray.length);
      expect(hooray, { 0: 1, 1: 2, 2: 3, 3: 4, length: 4 }, true);
    });

    it("should add multiple values at the end of an hooray in order", function() {
      var hooray = new Hooray(1, 2, 3);

      var length = hooray.push(4, 5);

      expect(hooray.length, 5);
      expect(length, hooray.length);
      expect(hooray, { 0: 1, 1: 2, 2: 3, 3: 4, 4: 5, length: 5 }, true);
    });

    it("should not add a non-provided value at the end of an hooray", function() {
      var hooray = new Hooray(1, 2, 3);

      var length = hooray.push();

      expect(hooray.length, 3);
      expect(length, hooray.length);
      expect(hooray, { 0: 1, 1: 2, 2: 3, length: 3 }, true);
    });
  });

  describe("slice", function() {
    function initialValue() {
      return new Hooray("ant", "bison", "camel", "duck", "elephant");
    }

    it("should return a copy of same hooray, not the original one ", function() {
      var hooray = initialValue();

      var result = hooray.slice();
      expect(result, initialValue(), true);
      expect(hooray, initialValue(), true);
      expect(hooray.length, result.length);
      expect(hooray === result, false);
    });

    it("should return all elements behind the position given", function() {
      var hooray = initialValue();
      var expected = { 0: "camel", 1: "duck", 2: "elephant", length: 3 };

      expect(hooray.slice(2), expected, true);
      expect(hooray, initialValue(), true);
    });
  });

  describe("concat", function() {
    it("should return concatenated elements of two hoorays", function() {
      var hooray1 = new Hooray("a", "b", "c");
      var hooray2 = new Hooray("d", "e", "f");
      var expected = {
        0: "a",
        1: "b",
        2: "c",
        3: "d",
        4: "e",
        5: "f",
        length: 6
      };

      var result = hooray1.concat(hooray2);
      expect(result.length, 6);
      expect(result, expected, true);
    });
  });

  describe("every", function() {
    function initialValue() {
      return new Hooray(1, 2, 3, 4, 5, 6);
    }

    it("should return true when all fulfill the condition", function() {
      var hooray = initialValue();
      var result = hooray.every(function(v) {
        return v > 0;
      });
      expect(result, true);
      expect(hooray, initialValue(), true);
    });

    it("should return false when any element not fulfill the condition", function() {
      var hooray = initialValue();
      var result = hooray.every(function(v) {
        return v > 1;
      });
      expect(result, false);
      expect(hooray, initialValue(), true);
    });

    common_throwError_callback(Hooray.prototype.every);
  });

  describe("fill", function() {
    function initialValue() {
      return new Hooray(1, 2, 3, 4, 5, 6);
    }

    it("should modified hooray only affect in middle positions", function() {
      var hooray = initialValue();
      var expected = { 0: 1, 1: 2, 2: 0, 3: 0, 4: 5, 5: 6, length: 6 };

      var result = hooray.fill(0, 2, 4);
      expect(result, expected, true);
    });

    it("should modified hooray affect from selected position to end", function() {
      var hooray = initialValue();
      var expected = { 0: 1, 1: 5, 2: 5, 3: 5, 4: 5, 5: 5, length: 6 };

      var result = hooray.fill(5, 1);
      expect(result, expected, true);
    });

    it("should fill all hooray with the value", function() {
      var hooray = initialValue();
      var expected = { 0: 6, 1: 6, 2: 6, 3: 6, 4: 6, 5: 6, length: 6 };

      var result = hooray.fill(6);
      expect(result, expected, true);
    });

  });

  describe("filter", function () {
    function initialValue() {
      return new Hooray('spray', 'limit', 'elite', 'exuberant', 'destruction', 'present');
    }
  
    it("should show only return elements that fulfill condition", function() {
      var words = initialValue();
      var expected = {0:"exuberant", 1:"destruction", 2:"present", length:3};
      expect(words.filter(function (word) { return word.length > 6; }), expected, true);
      expect(words, initialValue(), true);
    })
  
    common_throwError_callback(Hooray.prototype.filter);
  })
  
  describe("findIndex", function () {
    function initialValue() {
      return new Hooray(5, 12, 8, 130, 44);
    }
  
    it("should return first element that fulfill condition", function () {
      var hooray = initialValue();
      var expected = 3;
      expect(hooray.findIndex(function (element) { return element > 13; }), expected);
      expect(hooray, initialValue(), true);
    })
  
    common_throwError_callback(Hooray.prototype.findIndex);
  
  })

  describe("find", function () {
    function initialValue() {
      return new Hooray(5, 12, 8, 130, 44);
    }
  
    it("should return first element that fulfill condition", function () {
      var hooray = initialValue();
      var expected = 130;
      expect(hooray.find(function (element) { return element > 13; }), expected);
      expect(hooray, initialValue(), true);
    })
  
    common_throwError_callback(Hooray.prototype.find)
  
  })  

  describe("forEach", function() {
    it("should itearate an hooray without altering it", function() {
      var hooray = new Hooray(1, 2, 3);

      var result = new Hooray();

      hooray.forEach(function(v, i) {
        result.push(v);
      });
      // 0 1
      // 1 2
      // 2 3

      expect(result, hooray, true);

      var expected = { 0: 1, 1: 2, 2: 3, length: 3 };

      expect(hooray, expected, true);
    });

    it("should do nothing if hooray has not content", function() {
      var hooray = new Hooray();

      var result = new Hooray();

      hooray.forEach(function(v, i) {
        result.push(v);
      });

      expect(result.length, 0);
    });

    it("should break on undefined callback", function() {
      var hooray = new Hooray(1, 2, 3);

      try {
        hooray.forEach();

        throw Error("should not reach this point");
      } catch (error) {
        expect(error.message, "undefined is not a function");
      }
    });
  });
  
  describe("includes", function () {
      function initialHooray1() {
          return new Hooray(1, 2, 3);
        }
        function initialHoorayPets() {
            return new Hooray('cat', 'dog', 'bat');
    }
    
    it("should return true if includes a present element", function () {
        var hooray = initialHooray1();
      expect(hooray.includes(2), true);
      expect(hooray, initialHooray1(), true);
    })
    
    it("should return true if includes a present element", function () {
      var hooray = initialHoorayPets();
      expect(hooray.includes('cat'), true);
      expect(hooray, initialHoorayPets(), true);
    });
    
    it("should return false if not includes a exact coincidence", function () {
        var hooray = initialHoorayPets();
        expect(hooray.includes('at'), false);
        expect(hooray, initialHoorayPets(), true);
    });
    
});

describe("indexOf", function () {
    function initialValue() {
        return new Hooray('ant', 'bison', 'camel', 'duck', 'bison');
    }
    
    it("should return the index of first ocurrence", function () {
        var hooray = initialValue();
        
        expect(hooray.indexOf('bison'), 1);
        expect(hooray, initialValue(), true);
    })
    
    it("should return the index of ocurrence behind fromIndex", function () {
        var hooray = initialValue();
        
        expect(hooray.indexOf('bison', 2), 4);
        expect(hooray, initialValue(), true);
    })
    
    it("should return -1 if no coincidence", function () {
        var hooray = initialValue();
        
        expect(hooray.indexOf('giraffe'), -1);
        expect(hooray, initialValue(), true);
    })
    
});

describe("join", function () {
    function initialValue() {
        return new Hooray('Fire', 'Wind', 'Rain');
    }
    
    it("should return a string with elements merged with a comma", function () {
        var hooray = initialValue();
        
        expect(hooray.join(), "Fire,Wind,Rain");
        expect(hooray, initialValue(), true);
    })
    
    it("should return a string with elements merged without space", function () {
        var hooray = initialValue();
        
        expect(hooray.join(''), "FireWindRain");
        expect(hooray, initialValue(), true);
    })
    
    it("should return a string with elements merged with a separator", function () {
      var hooray = initialValue();
      
      expect(hooray.join('-'), "Fire-Wind-Rain");
      expect(hooray, initialValue(), true);
    })
    
});

describe("lastIndexOf", function() {
    function initialValue () {
        return new Hooray('Dodo', 'Tiger', 'Penguin', 'Dodo');
    }
  
    it("should return last element equal", function () {
        var hooray = initialValue();
        
        expect(hooray.lastIndexOf('Dodo'), 3);
        expect(hooray, initialValue(), true);
    })
    
    it("should return last element equal behind position given", function () {
      var hooray = initialValue();
      
      expect(hooray.lastIndexOf('Dodo', 2), 0);
      expect(hooray, initialValue(), true);
    })
  
})
  
  describe("map", function () {
    function initialValue () {
      return new Hooray(1, 4, 9, 16);
    }
    it("should return elements value doubled", function () {
        var hooray = initialValue();
      var expected = {0:2, 1:8, 2:18, 3:32, length: 4};
      
      expect(hooray.map(function (v) { return v * 2; }), expected, true);
      expect(hooray, initialValue(), true);
    });
  
    common_throwError_callback(Hooray.prototype.map);
});

describe("pop", function () {
    function initialValue() {
        return new Hooray(1,2,3,4);
    }
    
    it("pop a single element", function () {
        var hooray = initialValue();
      var expectedHooray = {0:1,1:2,2:3, length: 3};
      var expectedReturn = 4
      
      expect(hooray.pop(), expectedReturn);
      expect(hooray, expectedHooray, true);
    }); 
    
});

describe("reduceRight", function () {
    function initialValue () {
        return new Hooray([0, 1], [2, 3], [4, 5]);
    }
    
    it("should plain an horray of arrays in reverse order", function () {
        var hooray = initialValue();
      var expected = [4, 5, 2, 3, 0, 1];
      
      expect(hooray.reduceRight(function (acc, value) { return acc.concat(value); },[]), expected, true);
      //   expect(hooray, initialValue(), true);
    })
    
    common_throwError_callback(Hooray.prototype.reduceRight);
    
});

describe("reduce", function () {
    function initialValue() {
        return new Hooray(1, 2, 3, 4);
    }
    
    function reducer (acc, value) { 
        return acc + value; 
    }
    
    it("should sum all items in the hooray", function () {
        var hooray = initialValue();
        
        expect(hooray.reduce(reducer), 10);
        expect(hooray, initialValue(), true);
    })
    
    it("should sum all items in the hooray with initial value", function () {
        var hooray = initialValue();
        
        expect(hooray.reduce(reducer, 5), 10);
        expect(hooray, initialValue(), true);    
    })
    
    common_throwError_callback(Hooray.prototype.reduce);
    
})
});