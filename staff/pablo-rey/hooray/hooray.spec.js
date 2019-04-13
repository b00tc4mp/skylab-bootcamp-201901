"use strict";
function common_throwError_callback(functionToTest) {
  it("should break when you not pass a callback function", function() {
    expect(function() {
      return functionToTest.call(new Hooray());
    }).toThrowError(Error, "undefined is not a function");
  });

  it("should break when you pass a callback that is not function", function() {
    expect(function() {
      return functionToTest.call(new Hooray(), 1);
    }).toThrowError(Error, "undefined is not a function");
  });
}

function newEmptyHooray() {
  return new Hooray();
}

function newHorrayFromArray(array) {
  var horray = new Hooray;
  Hooray.apply(horray, array);
  return horray;
}

function randomObject(length, deep) {
  var array = randomArray(length, deep);
  var result = {};
  for (var k = 0; k < array.length; k++) {
    var key = Math.random() < 0.5 ? k : String(k);
    result[key] = array[key];
  }
  return result;
}

function createRandomDefaultFn(maxType) {
    var type = Math.floor(Math.random() * maxType);
    switch (type) {
      case 0:
        return Math.floor(Math.random() * 10000);
      case 1:
        return Math.random() * 10000;
      case 2:
        return String(Math.random() * 10000);
      case 3:
        return randomArray();
      case 4:
        return randomObject();
    }
}

function randomArray(length, createElementfn) {  
  if (!length) length = Math.floor(Math.random() * 20 + 1);
  createElementfn = createElementfn || createRandomDefaultFn;
  var result = [];
  for (var k = 0; k < length; k++) {
    result.push(createElementfn(3));
  }
  return result;
}

function resultObjectFromArray(array) {
  var result = {};
  for (var k in array) {
    result[k] = array[k];
  }
  result['length'] = array.length;
  return result;
}

describe("hooray", function() {
  describe("constructor", function() {
    it("should construct an empty hooray when no arguments", function() {
      var hooray = newEmptyHooray();

      expect(hooray.length).toBe(0);
      expect(Object.keys(hooray).length).toBe(1);
    });

    it("should construct a non-empty hooray when existing arguments", function() {
      var hooray = new Hooray(1, 2, 3);

      expect(hooray.length).toBe(3);
      expect(hooray).toEqual(
        jasmine.objectContaining({ 0: 1, 1: 2, 2: 3, length: 3 })
      );
      expect(Object.keys(hooray).length).toBe(4);
    });

    it("should construct an empty hooray with length equal to when only one numeric argument", function() {
      var hooray = new Hooray(1);

      expect(hooray.length).toBe(1);
      expect(Object.keys(hooray).length).toBe(1);
    });

    it("should construct a non-empty hooray with only one non-numeric argument", function() {
      var hooray = new Hooray("1");

      expect(hooray.length).toBe(1);
      expect(hooray).toEqual(jasmine.objectContaining({ 0: "1", length: 1 }));
      expect(Object.keys(hooray).length).toBe(2);
    });
  });

  describe("push", function() {
    it("should add a value at the end of an hooray", function() {
      var hooray = new Hooray(1, 2, 3);

      var length = hooray.push(4);

      expect(hooray.length).toBe(4);
      expect(length).toBe(hooray.length);
      expect(hooray).toEqual(
        jasmine.objectContaining({ 0: 1, 1: 2, 2: 3, 3: 4, length: 4 })
      );
    });

    it("should add multiple values at the end of an hooray in order", function() {
      var hooray = new Hooray(1, 2, 3);

      var length = hooray.push(4, 5);

      expect(hooray.length).toBe(5);
      expect(length).toBe(hooray.length);
      expect(hooray).toEqual(
        jasmine.objectContaining({ 0: 1, 1: 2, 2: 3, 3: 4, 4: 5, length: 5 })
      );
    });

    it("should not add a non-provided value at the end of an hooray", function() {
      var hooray = new Hooray(1, 2, 3);

      var length = hooray.push();

      expect(hooray.length).toBe(3);
      expect(length).toBe(hooray.length);
      expect(hooray).toEqual(
        jasmine.objectContaining({ 0: 1, 1: 2, 2: 3, length: 3 })
      );
    });
  });

  describe("slice", function() {
    function initialValue() {
      return new Hooray("ant", "bison", "camel", "duck", "elephant");
    }

    it("should return a copy of same hooray, not the original one ", function() {
      var hooray = initialValue();

      var result = hooray.slice();
      expect(result).toEqual(jasmine.objectContaining(initialValue()));
      expect(hooray).toEqual(jasmine.objectContaining(initialValue()));
      expect(hooray.length).toBe(result.length);
      expect(hooray).not.toBe(result);
    });

    it("should return all elements behind the position given", function() {
      var hooray = initialValue();
      var expected = { 0: "camel", 1: "duck", 2: "elephant", length: 3 };

      expect(hooray.slice(2)).toEqual(jasmine.objectContaining(expected));
      expect(hooray).toEqual(jasmine.objectContaining(initialValue()));
    });
  });

  describe("concat", function() {
    it("should return concatenated elements of two hoorays", function() {
      var newArray1 = randomArray();
      var newArray2 = randomArray();
      var hooray1 = newHorrayFromArray(newArray1);
      var hooray2 = newHorrayFromArray(newArray2);

      var expectedArray = newArray1.concat(newArray2);
      var expectedLength = expectedArray.length;
      var expected = resultObjectFromArray(newArray1.concat(newArray2));

      var result = hooray1.concat(hooray2);
      expect(result.length).toBe(expectedLength);
      expect(result).toEqual(jasmine.objectContaining(expected));
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
      expect(result).toBeTruthy();
      expect(hooray).toEqual(jasmine.objectContaining(initialValue()));
    });

    it("should return false when any element not fulfill the condition", function() {
      var hooray = initialValue();
      var result = hooray.every(function(v) {
        return v > 1;
      });
      expect(result).toBeFalsy();
      expect(hooray).toEqual(jasmine.objectContaining(initialValue()));
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
      expect(result).toEqual(jasmine.objectContaining(expected));
    });

    it("should modified hooray affect from selected position to end", function() {
      var hooray = initialValue();
      var expected = { 0: 1, 1: 5, 2: 5, 3: 5, 4: 5, 5: 5, length: 6 };

      var result = hooray.fill(5, 1);
      expect(result).toEqual(jasmine.objectContaining(expected));
    });

    it("should fill all hooray with the value", function() {
      var hooray = initialValue();
      var expected = { 0: 6, 1: 6, 2: 6, 3: 6, 4: 6, 5: 6, length: 6 };

      var result = hooray.fill(6);
      expect(result).toEqual(jasmine.objectContaining(expected));
    });
  });

  describe("filter", function() {
    function initialValue() {
      return new Hooray(
        "spray",
        "limit",
        "elite",
        "exuberant",
        "destruction",
        "present"
      );
    }

    it("should show only return elements that fulfill condition", function() {
      var words = initialValue();
      var expected = {
        0: "exuberant",
        1: "destruction",
        2: "present",
        length: 3
      };
      expect(
        words.filter(function(word) {
          return word.length > 6;
        })
      ).toEqual(jasmine.objectContaining(expected));
      expect(words).toEqual(jasmine.objectContaining(initialValue()));
    });

    common_throwError_callback(Hooray.prototype.filter);
  });

  describe("findIndex", function() {
    function initialValue() {
      return new Hooray(5, 12, 8, 130, 44);
    }

    it("should return first element that fulfill condition", function() {
      var hooray = initialValue();
      var expected = 3;
      expect(
        hooray.findIndex(function(element) {
          return element > 13;
        })
      ).toBe(expected);
      expect(hooray).toEqual(jasmine.objectContaining(initialValue()));
    });

    common_throwError_callback(Hooray.prototype.findIndex);
  });

  describe("find", function() {
    function initialValue() {
      return new Hooray(5, 12, 8, 130, 44);
    }

    it("should return first element that fulfill condition", function() {
      var hooray = initialValue();
      var expected = 130;
      expect(
        hooray.find(function(element) {
          return element > 13;
        })
      ).toBe(expected);
      expect(hooray).toEqual(jasmine.objectContaining(initialValue()));
    });

    common_throwError_callback(Hooray.prototype.find);
  });

  describe("forEach", function() {
    it("should iterate an hooray without altering it", function() {
      var hooray = new Hooray(1, 2, 3);
      var result = new Hooray();

      hooray.forEach(function(v, i) {
        result.push(v);
      });

      expect(result).toEqual(jasmine.objectContaining(hooray));

      var expected = { 0: 1, 1: 2, 2: 3, length: 3 };

      expect(hooray).toEqual(jasmine.objectContaining(expected));
    });

    it("should do nothing if hooray has not content", function() {
      var hooray = new Hooray();
      var result = new Hooray();

      hooray.forEach(function(v, i) {
        result.push(v);
      });

      expect(result.length).toBe(0);
    });

    common_throwError_callback(Hooray.prototype.forEach);
  });

  describe("includes", function() {
    function initialHooray1() {
      return new Hooray(1, 2, 3);
    }
    function initialHoorayPets() {
      return new Hooray("cat", "dog", "bat");
    }

    it("should return true if includes a present element", function() {
      var hooray = initialHooray1();
      expect(hooray.includes(2)).toBeTruthy();
      expect(hooray).toEqual(jasmine.objectContaining(initialHooray1()));
    });

    it("should return true if includes a present element", function() {
      var hooray = initialHoorayPets();
      expect(hooray.includes("cat")).toBeTruthy();
      expect(hooray).toEqual(jasmine.objectContaining(initialHoorayPets()));
    });

    it("should return false if not includes a exact coincidence", function() {
      var hooray = initialHoorayPets();
      expect(hooray.includes("at")).toBeFalsy();
      expect(hooray).toEqual(jasmine.objectContaining(initialHoorayPets()));
    });
  });

  describe("indexOf", function() {
    function initialValue() {
      return new Hooray("ant", "bison", "camel", "duck", "bison");
    }

    it("should return the index of first ocurrence", function() {
      var hooray = initialValue();

      expect(hooray.indexOf("bison")).toBe(1);
      expect(hooray).toEqual(jasmine.objectContaining(initialValue()));
    });

    it("should return the index of ocurrence behind fromIndex", function() {
      var hooray = initialValue();

      expect(hooray.indexOf("bison", 2)).toBe(4);
      expect(hooray).toEqual(jasmine.objectContaining(initialValue()));
    });

    it("should return -1 if no coincidence", function() {
      var hooray = initialValue();

      expect(hooray.indexOf("giraffe")).toBe(-1);
      expect(hooray).toEqual(jasmine.objectContaining(initialValue()));
    });
  });

  describe("join", function() {
    function initialValue() {
      return new Hooray("Fire", "Wind", "Rain");
    }

    it("should return a string with elements merged with a comma", function() {
      var hooray = initialValue();

      expect(hooray.join()).toBe("Fire,Wind,Rain");
      expect(hooray).toEqual(jasmine.objectContaining(initialValue()));
    });

    it("should return a string with elements merged without space", function() {
      var hooray = initialValue();

      expect(hooray.join("")).toBe("FireWindRain");
      expect(hooray).toEqual(jasmine.objectContaining(initialValue()));
    });

    it("should return a string with elements merged with a separator", function() {
      var hooray = initialValue();

      expect(hooray.join("-")).toBe("Fire-Wind-Rain");
      expect(hooray).toEqual(jasmine.objectContaining(initialValue()));
    });
  });

  describe("lastIndexOf", function() {
    function initialValue() {
      return new Hooray("Dodo", "Tiger", "Penguin", "Dodo");
    }

    it("should return last element equal", function() {
      var hooray = initialValue();

      expect(hooray.lastIndexOf("Dodo")).toBe(3);
      expect(hooray).toEqual(jasmine.objectContaining(initialValue()));
    });

    it("should return last element equal behind position given", function() {
      var hooray = initialValue();

      expect(hooray.lastIndexOf("Dodo", 2)).toBe(0);
      expect(hooray).toEqual(jasmine.objectContaining(initialValue()));
    });
  });

  describe("map", function() {
    function initialValue() {
      return new Hooray(1, 4, 9, 16);
    }
    it("should return elements value doubled", function() {
      var hooray = initialValue();
      var expected = { 0: 2, 1: 8, 2: 18, 3: 32, length: 4 };

      expect(
        hooray.map(function(v) {
          return v * 2;
        }),
        expected,
        true
      );
      expect(hooray).toEqual(jasmine.objectContaining(initialValue()));
    });

    common_throwError_callback(Hooray.prototype.map);
  });

  describe("pop", function() {
    function initialValue() {
      return new Hooray(1, 2, 3, 4);
    }

    it("pop a single element", function() {
      var hooray = initialValue();
      var expectedHooray = { 0: 1, 1: 2, 2: 3, length: 3 };
      var expectedReturn = 4;

      expect(hooray.pop()).toBe(expectedReturn);
      expect(hooray).toEqual(jasmine.objectContaining(expectedHooray));
    });
  });

  describe("reduceRight", function() {
    function initialValue() {
      return new Hooray([0, 1], [2, 3], [4, 5]);
    }

    it("should plain an horray of arrays in reverse order", function() {
      var hooray = initialValue();
      var expected = [4, 5, 2, 3, 0, 1];

      expect(hooray.reduceRight(function(acc, value) {return acc.concat(value);}, []))
        .toEqual(expected);
      //   expect(hooray, initialValue(), true);
    });

    common_throwError_callback(Hooray.prototype.reduceRight);
  });

  describe("reduce", function() {
    function initialValue() {
      return new Hooray(1, 2, 3, 4);
    }

    function reducer(acc, value) {
      return acc + value;
    }

    it("should sum all items in the hooray", function() {
      var hooray = initialValue();

      expect(hooray.reduce(reducer)).toBe(10);
      expect(hooray).toEqual(jasmine.objectContaining(initialValue()));
    });

    it("should sum all items in the hooray with initial value", function() {
      var hooray = initialValue();

      expect(hooray.reduce(reducer, 5)).toBe(10);
      expect(hooray).toEqual(jasmine.objectContaining(initialValue()));
    });

    common_throwError_callback(Hooray.prototype.reduce);
  });

  describe("shift", function() {
    function initialValue() {
      return new Hooray(1, 2, 3);
    }

    it("should return the element deleted and change original hooray", function() {
      var hooray = initialValue();
      var expectedReturn = 1;
      var expectedHooray = { 0: 2, 1: 3, length: 2 };

      expect(hooray.shift()).toBe(expectedReturn);
      expect(hooray).toEqual(jasmine.objectContaining(expectedHooray));
    });
  });

  describe("some", function() {
    function initialValue() {
      return new Hooray(1, 2, 3, 4, 5);
    }

    it("should return true when all fulfill the condition", function() {
      var hooray = initialValue();

      expect(
        hooray.some(function(element) {
          return element % 2 === 0;
        })).toBeTruthy();
      expect(hooray).toEqual(jasmine.objectContaining(initialValue()));
    });

    it("should return false when all elements not fulfills the condition", function() {
      var hooray = initialValue();

      expect(
        hooray.some(function(value) {
          return value > 10;
        })).toBeFalsy();
      expect(hooray).toEqual(jasmine.objectContaining(initialValue()));
    });

    common_throwError_callback(Hooray.prototype.some);
  });

  describe("sort", function() {
    function initialHoorayStrings() {
      return new Hooray("March", "Jan", "Feb", "Dec");
    }
    function initialHoorayNumbers() {
      return new Hooray(1, 30, 4, 21, 100000);
    }

    it("should sort original hooray of strings", function() {
      var hooray = initialHoorayStrings();
      var expected = { 0: "Dec", 1: "Feb", 2: "Jan", 3: "March", length: 4 };

      hooray.sort();
      expect(hooray).toEqual(jasmine.objectContaining(expected));
    });

    it("should sort original hooray of strings", function() {
      var hooray = initialHoorayNumbers();
      var expected = { 0: 1, 1: 100000, 2: 21, 3: 30, 4: 4, length: 5 };

      hooray.sort();
      expect(hooray).toEqual(jasmine.objectContaining(expected));
    });

    it("should sort numbers in right why with proper compare function", function() {
      var hooray = initialHoorayNumbers();
      var expected = { 0: 1, 1: 4, 2: 21, 3: 30, 4: 100000, length: 5 };

      hooray.sort(function(a, b) {
        return a > b;
      });
      expect(hooray).toEqual(jasmine.objectContaining(expected));
    });
  });

  describe("splice", function() {
    function initialValue1() {
      return new Hooray("Jan", "March", "April", "June");
    }

    function initialValue2() {
      return new Hooray("Jan", "Feb", "March", "April", "June");
    }

    it("should inserts at 1st index position", function() {
      var hooray = initialValue1();
      var expected = {
        0: "Jan",
        1: "Feb",
        2: "March",
        3: "April",
        4: "June",
        length: 5
      };

      hooray.splice(1, 0, "Feb");
      expect(hooray).toEqual(jasmine.objectContaining(expected));
    });

    it("should replaces 1 element at 4th index", function() {
      var hooray = initialValue2();
      var expected = {
        0: "Jan",
        1: "Feb",
        2: "March",
        3: "April",
        4: "May",
        length: 5
      };

      hooray.splice(4, 1, "May");
      expect(hooray).toEqual(jasmine.objectContaining(expected));
    });
  });
});
