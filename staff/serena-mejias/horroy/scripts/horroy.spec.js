describe("Horroy", function() {
  // WARN is this initializaton necessary?

  var horroy;

  beforeEach(function() {
    horroy = new Horroy();
  });

  describe("from", function() {
    it("should create a Horroy from string", function() {
      var string = "hola mundo";
      var horr = Horroy.from(string);
      expect(horr.toString()).toBe(string.split("").toString()); // h,o,l,a, ,m,u,n,d,o
    });
  });

  /*describe('push',function(){
        beforeEach(function() {
            horroy = new Horroy(1,2,3,4,5);
            console.log(horroy);
            
        });

        it('should add the values to the horroy and show the lenght os the new array', function(){
            console.log('serena');
            
            var result = horroy.push(1);
            console.log(result);
            //var expected = 6;
            //expect(result).toBe(expected);
        })
    });*/

  describe("fill", function() {
    beforeEach(function() {
      horroy = new Horroy(1, 2, 3, 4, 5);
    });

    it("should change the elements of horroy for the argument", function() {
      var result = horroy.fill(5, 1, 3);
      var expected = { 0: 1, 1: 5, 2: 5, 3: 4, 4: 5, length: 5 };
      expect(JSON.stringify(result)).toBe(JSON.stringify(expected));
    });

    it("end is an optional argument", function() {
      var result = horroy.fill(5, 1);
      var expected = { 0: 1, 1: 5, 2: 5, 3: 5, 4: 5, length: 5 };
      expect(JSON.stringify(result)).toBe(JSON.stringify(expected));
    });

    it("start is an optional argument", function() {
      var result = horroy.fill(5);
      var expected = { 0: 5, 1: 5, 2: 5, 3: 5, 4: 5, length: 5 };
      expect(JSON.stringify(result)).toBe(JSON.stringify(expected));
    });
  });

  describe("find", function() {
    beforeEach(function() {
      horroy = new Horroy(1, 2, 3);
    });

    it("should find the first element in the horroy that compy the callback", function() {
      var result = horroy.find(function(value) {
        return value < 2;
      });
      var expected = 1;
      expect(result).toBe(expected);
    });

    it("callback argument has to be a function", function() {
      expect(function(){horroy.find("find")}).toThrowError("callback is not a function");
    });
  });

  describe("indexof", function() {
    beforeEach(function() {
      horroy = new Horroy("jeff", "serena", "cersei");
    });

    it("should find the value in the horroy and return the index", function() {
      var result = horroy.indexof("serena");
      var expected = "1";

      expect(result).toBe(expected);
    });

    it("should find the value in the horroy and return the index", function() {
      horroy = new Horroy(1, 2, 3, 4, 5);

      var result = horroy.indexof(2);
      var expected = "1";

      expect(result).toBe(expected);
    });

    it("the argument must be a string or a number", function() {
      expect(function(){horroy.indexof([2])}).toThrowError('the argument must be a string or a number');
    });
  });

  describe("join", function(){
    beforeEach(function(){
      horroy = new Horroy('Fire', 'Wind', 'Rain');
    })

    it("should join the elements of an horroy by ,", function(){
      var result = horroy.join();
      var expected = 'Fire,Wind,Rain';

      expect(result).toBe(expected);
    })
    
    it("should join the elements of an horroy by +", function(){
      var result = horroy.join('+');
      var expected = 'Fire+Wind+Rain';

      expect(result).toBe(expected);
    })
    
    it("should join the elements of an horroy by nothing", function(){
      var result = horroy.join('');
      var expected = 'FireWindRain';

      expect(result).toBe(expected);
    })
  })

  describe("reverse", function(){
    beforeEach(function(){
      horroy = new Horroy('Fire', 'Wind', 'Rain');
    })

    it("should change the order of the elements of the horroy", function(){
      var result = horroy.reverse();
      var expected = new Horroy('Rain', 'Wind', 'Fire');

      expect(result).toEqual(expected);
    })
  })

  describe("push", function() {
    beforeEach(function(){
      horroy = new Horroy('Fire', 'Wind', 'Rain');
    })

    it("should add new elements to the horroy and return the new lenght", function(){
      var result = horroy.push('Snow');
      var expected = 4;

      expect(result).toEqual(expected);
    })
  })
  
  describe("pop", function() {
    beforeEach(function(){
      horroy = new Horroy('Fire', 'Wind', 'Rain');
    })

    it("should add new elements to the horroy and return the new lenght", function(){
      var result = horroy.pop();
      var expected = 'Rain';

      expect(result).toEqual(expected);
    })
  })
  
  /*describe("pop", function() {
    beforeEach(function(){
      horroy = new Horroy(1, 2, 3, 4);
    })

    it("should add new elements to the horroy and return the new lenghtexecutes a reducer function (that you provide) on each member of the array resulting in a single output value", function(){
      var reducer = function(accumulator, currentValue) { accumulator + currentValue};
      var result = horroy.reduce(reducer);
      var expected = 10;

      expect(result).toEqual(expected);
    })
  })*/

  describe("slice", function() {
    beforeEach(function(){
      horroy = new Horroy(1, 2, 3, 4);
    })
    
    it("returns a shallow copy of a portion of an array into a new array object selected from begin to end", function(){
      var result = horroy.slice(1,3);
      var expected = {0:2, 1:3};

      expect(JSON.stringify(result)).toBe(JSON.stringify(expected));
    })
  })

  describe("some", function() {
    beforeEach(function(){
      horroy = new Horroy(1, 2, 3, 4);
    })
    
    it("tests whether at least one element in the array passes the test implemented by the provided function", function(){
      var result = horroy.some(function(value){return value === 2});
      var expected = true;

      expect(result).toEqual(expected);
    })
    
    it("the argument must be a function", function() {
      expect(function(){horroy.some(2)} ).toThrowError('the argument must be a function');
    });
  })

});