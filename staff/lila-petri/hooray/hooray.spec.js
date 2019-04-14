"use strict";

describe("hooray", function() {
  describe("constructor", function() {
    true && it("should construct an empty hooray when no arguments", function() {
        var hooray = new Hooray();

        expect(hooray.length).toBe(0);
        expect(Object.keys(hooray).length).toBe(1);
      });

    true && it("should construct a non-empty hooray when existing arguments", function() {
        var hooray = new Hooray(1, 2, 3);

        expect(hooray.length).toBe(3);
        expect(JSON.stringify(hooray)).toBe(
          JSON.stringify({ 0: 1, 1: 2, 2: 3, length: 3 })
        );
        expect(Object.keys(hooray).length).toBe(4);
      });

    true && it("should construct an empty hooray with length equal to when only one numeric argument", function() {
        var hooray = new Hooray(1);

        expect(hooray.length).toBe(1);
        expect(Object.keys(hooray).length).toBe(1);
      });

    true && it("should construct a non-empty hooray with only one non-numeric argument", function() {
        var hooray = new Hooray("1");

        expect(hooray.length).toBe(1);
        expect(JSON.stringify(hooray)).toBe(
          JSON.stringify({ 0: "1", length: 1 })
        );
        expect(Object.keys(hooray).length).toBe(2);
      });
  });

  describe("push", function() {
    true && it("should add a value at the end of an hooray", function() {
        var hooray = new Hooray(1, 2, 3);

        var length = hooray.push(4);

        expect(hooray.length).toBe(4);
        expect(length).toBe(hooray.length);
        expect(JSON.stringify(hooray)).toBe(
          JSON.stringify({ 0: 1, 1: 2, 2: 3, 3: 4, length: 4 })
        );
        expect(hooray).toEqual(
          jasmine.objectContaining({ 0: 1, 1: 2, 2: 3, 3: 4, length: 4 })
        );
      });

    true && it("should add multiple values at the end of an hooray in order", function() {
        var hooray = new Hooray(1, 2, 3);

        var length = hooray.push(4, 5);

        expect(hooray.length).toBe(5);
        expect(length).toBe(hooray.length);
        expect(hooray).toEqual(
          jasmine.objectContaining({ 0: 1, 1: 2, 2: 3, 3: 4, 4: 5, length: 5 })
        );
      });

    true && it("should not add a non-provided value at the end of an hooray", function() {
        var hooray = new Hooray(1, 2, 3);

        var length = hooray.push();

        expect(hooray.length).toBe(3);
        expect(length).toBe(hooray.length);
        expect(hooray).toEqual(
          jasmine.objectContaining({ 0: 1, 1: 2, 2: 3, length: 3 })
        );
      });
  });

  describe("forEach", function() {
    true && it("should itearate an hooray without altering it", function() {
        var hooray = new Hooray(1, 2, 3);

        var result = new Hooray();

        hooray.forEach(function(v) {
          result.push(v);
        });

        expect(result).toEqual(jasmine.objectContaining(hooray));
        var expected = { 0: 1, 1: 2, 2: 3, length: 3 };

        expect(hooray).toEqual(
          jasmine.objectContaining({ 0: 1, 1: 2, 2: 3, length: 3 })
        );
      });

    true && it("should do nothing if hooray has not content", function() {
        var hooray = new Hooray();

        var result = new Hooray();

        hooray.forEach(function(v, i) {
          result.push(v);
        });

        expect(result.length).toBe(0);
      });

    true && it("should break on undefined callback", function() {
        var hooray = new Hooray(1, 2, 3);

        try {
          hooray.forEach();

          throw Error("should not reach this point");
        } catch (error) {
          expect(error.message).toBe("undefined is not a function");
        }
      });
  });
  describe("every", function() {
    true && it("should return true on all items matching condition", function() {
        var hooray = new Hooray(1, 2, 3);

        var result = new Hooray();

        result = hooray.every(function(v) {
          return v > 0;
        });

        expect(result).toBe(true);
      });

    true && it("should return false on any of the items not matching the condition", function() {
        var hooray = new Hooray(1, 2, 3);

        var result = hooray.every(function(v) {
          return v < 0;
        });

        expect(result).toBe(false);
      });

    true && it("should fail on undefined callback", function() {
        var hooray = new Hooray(1, 2, 3);

        try {
          hooray.every();

          throw Error("should not reach this point");
        } catch (error) {
          expect(error.message).toBe("undefined is not a function");
        }
      });
  });

  describe("concat", function() {
    true && it("Should create a new hooray from two hooray ", function() {
        var hooray = new Hooray(1, 2, 3);
        var hooray2 = new Hooray(4, 5, 6);
        var result = new Hooray();
        result = hooray.concat(hooray2);

        expect(result).toEqual(
          jasmine.objectContaining({
            0: 1,
            1: 2,
            2: 3,
            3: 4,
            4: 5,
            5: 6,
            length: 6
          })
        );
        expect(hooray).toEqual(
          jasmine.objectContaining({ 0: 1, 1: 2, 2: 3, length: 3 })
        );
      });
    true && it("Should create a new hooray from two hooray even if the second one is empty hooray", function() {
        var hooray = new Hooray(1, 2, 3);
        var hooray2 = new Hooray();
        var result = new Hooray();
        result = hooray.concat(hooray2);

        expect(result).toEqual(
          jasmine.objectContaining({ 0: 1, 1: 2, 2: 3, length: 3 })
        );
        expect(hooray).toEqual(
          jasmine.objectContaining({ 0: 1, 1: 2, 2: 3, length: 3 })
        );
      });

    true && it("Should fail with undefined arguments", function() {
        var hooray = new Hooray(1, 2, 3);
        try {
          hooray.concat();
          throw Error("should not reach this point");
        } catch (error) {
          expect(error.message).toBe("undefined is not an hooray");
        }
      });
  });

  describe("filter", function() {
    true && it("Should create a new hooray form an specific condition", function() {
        var hooray = new Hooray(1, 2, 3);
        var result = new Hooray();
        var expected = new Hooray(1);

        result = hooray.filter(function(v) {
          return v < 2;
        });
        expect(result).toEqual(jasmine.objectContaining(expected));
      });

    true && it("Should fail on undefined arguments", function() {
        var hooray = new Hooray(1, 2, 3);
        try {
          hooray.filter();
          throw Error("should not reach this point");
        } catch (error) {
          expect(error.message).toBe("undefined is not a function");
        }
      });

    true && it("Should fail if the argument is not a function", function() {
        var hooray = new Hooray(1, 2, 3);
        try {
          hooray.filter("string");
          throw Error("should not reach this point");
        } catch (error) {
          expect(error.message).toBe("string is not a function");
        }
      });

    true && it("Should fail if the second argument is null", function() {
        var hooray = new Hooray(1, 2, 3);
        try {
          hooray.filter(null);
          throw Error("should not reach this point");
        } catch (error) {
          expect(error.message).toBe("null is not a function");
        }
      });
  });
  describe("indexOf", function() {
    true && it("Should return the index of the element given", function() {
        var hooray = new Hooray(1, 2, 3);
        var searchElement = 1;
        var expected = 0;
        var result = new Hooray();

        result = hooray.indexOf(searchElement);

        expect(expected).toBe(result);
      });
    true && it("Should return -1 if the element does not exist on the array", function() {
        var hooray = new Hooray(1, 2, 3);
        var searchElement = 6;
        var expected = -1;
        var result = new Hooray();
        result = hooray.indexOf(searchElement);

        expect(expected).toBe(result);
      });

    true && it("Should return -1 if the searchElement is not send", function() {
        var hooray = new Hooray(1, 2, 3);
        var expected = -1;
        var result = new Hooray();
        result = hooray.indexOf();

        expect(expected).toBe(result);
      });

    true && it("Should return -1 if the searchElement is a null", function() {
        var hooray = new Hooray(1, 2, 3);
        var searchElement = null;
        var expected = -1;
        var result = new Hooray();
        result = hooray.indexOf();

        expect(expected).toBe(result);
      });
  });
  describe("isArray", function() {
    true && it("Should return true if the argument is an hooray", function() {
        var hooray = new Hooray(1, 2, 3);
        var result = new Hooray();
        result = hooray.isArray();
        expect(result).toBe(true);
      });

    true && it("Should return false if the argument is an string", function() {
        var result = new Hooray();
        result = Hooray.isHooray("String");
        expect(result).toBe(false);
      });

    true && it("Should return false if the argument is a number", function() {
        var result = new Hooray();
        result = Hooray.isHooray(7);
        expect(result).toBe(false);
      });
  });
  describe("join", function() {
    true && it("Should return all elements of the hooray as a string separated by the separator", function() {
        var hooray = new Hooray(1, 2, 3);
        var separator = "*_";
        var result = new Hooray();
        var expected = "1*_2*_3";
        result = hooray.join(separator);

        expect(expected).toBe(result);
      });

    true && it("Should return all elements of the hooray as a string separated by commas", function() {
        var hooray = new Hooray(1, 2, 3);
        var result = new Hooray();
        var expected = "1,2,3";
        result = hooray.join();

        expect(expected).toBe(result);
      });
    !true && it("Should return an empty string in case of empty hooray", function() {
        var array = [];
        var result;
        var expected = "";
        result = join(array);

        expect(expected, result);
      });
  });
  describe("map", function() {
    true && it("Should return an hooray where every element has been modified by the function", function() {
        var hooray = new Hooray(1, 2, 3);
        var expected = new Hooray(2, 4, 6);
        var result = new Hooray();
        result = hooray.map(function(v) {
          return v * 2;
        });

        expect(expected).toEqual(jasmine.objectContaining(result));
      });

    true && it("Should fail if the second argument is not a function", function() {
        var hooray = new Hooray(1, 2, 3);
        try {
          hooray.map("string");
          throw Error("should not reach this point");
        } catch (error) {
          expect(error.message).toBe("string is not a function");
        }
      });
  });
  describe("shift", function() {
    true && it("Should return the first element form the hooray and modify the lenght of the obejet", function() {
        var hooray = new Hooray("a", "b", "c");
        var result = new Hooray();
        var expected = "a";
        var expectedHorray = new Hooray("b", "c");
        result = hooray.shift();
        expect(expected).toBe(result);
        expect(expectedHorray).toEqual(jasmine.objectContaining(hooray));
      });
  });
  describe("some", function() {
    true && it("Should return false if no element in the array meets the condition", function() {
        var hooray = new Hooray(1, 2, 3);
        var result = new Hooray();
        result = hooray.some(function(e) {
          return e > 10;
        });

        expect(result).toBeFalsy();
      });

    true && it("Should return true if some element in the array meets the condition", function() {
        var hooray = new Hooray(1, 2, 3);
        var result = new Hooray();
        result = hooray.some(function(e) {
          return e > 2;
        });

        expect(result).toBeTruthy();
      });

    true && it("Should fail if the  argument is not a function", function() {
        var hooray = new Hooray(1, 2, 3);
        try {
          hooray.some();
          throw Error("should not reach this point");
        } catch (error) {
          expect(error.message).toBe("undefined is not a function");
        }
      });
  });
  describe("lastIndexOf", function() {
    true && it("Should return the last index of the element given", function() {
        var hooray = new Hooray(1, 2, 3, 4, 5, 3);
        var searchElement = 3;
        var expected = 5;
        var result = new Hooray();
        result = hooray.lastIndexOf(searchElement);

        expect(expected).toEqual(result);
      });
    true && it("Should return -1 if the element does not exist on the array", function() {
        var hooray = new Hooray(1, 2, 3);
        var searchElement = 6;
        var expected = -1;
        var result = new Hooray();
        result = hooray.lastIndexOf(searchElement);

        expect(expected).toEqual(result);
      });

    true && it("Should return -1 if the searchElement is not send", function() {
        var hooray = new Hooray(1, 2, 3);
        var expected = -1;
        var result = new Hooray();
        result = hooray.lastIndexOf();

        expect(expected).toEqual(result);
      });

    true && it("Should return -1 if the searchElement is a null", function() {
        var hooray = new Hooray(1, 2, 3);
        var searchElement = null;
        var expected = -1;
        var result = new Hooray();
        result = hooray.lastIndexOf(searchElement);

        expect(expected).toEqual(result);
      });
    true && it("Should return the searchElement  found from a specific index", function() {
        var hooray = new Hooray(2, 5, 9, 2);
        var searchElement = 2;
        var fromIndex = 3;
        var expected = 3;
        var result = new Hooray();
        result = hooray.lastIndexOf(searchElement, fromIndex);

        expect(expected).toEqual(result);
      });
    });

  describe("reduce", function() {
    true && it("Should return an accumulated value ", function() {
        var hooray = new Hooray(1, 2, 3);
        var result = new Hooray();
        var expected = 6;

        result = hooray.reduce(function(a, v) {
          return a + v;
        });

        expect(expected).toEqual(result);
      });
    true && it("Should fail if the second argument is not a function", function() {
        var hooray = new Hooray(1, 2, 3);
        try {
          hooray.reduce("string");
          throw Error("should not reach this point");
        } catch (error) {
          expect(error.message).toBe("string is not a function");
        }
      });
  });
  describe('reduceRight', function(){
   true && it('Should return an accumulated value ', function(){
        var hooray=new Hooray('a', 'b', 'c');    
        var expected='cba';
        var result=new Hooray;
        result=hooray.reduceRight(function(a,v) {return a+v;});

        expect(expected).toEqual(result);

    });

    true && it('Should fail if the second argument is not a function', function(){
       var horray=new Hooray(1,2,3);
        try{
            
            horray.reduceRight('string');
            throw Error ('should not reach this point');

        }catch(error){
            
            expect(error.message).toBe('string is not a function');

        }

    });

});

describe('reverse', function(){
    true && it('Should return an array with all its elements reversed.', function(){
       
        var hooray= new Hooray(1,2,3,4);
        var expected=new Hooray(4,3,2,1);
        var result=new Hooray;
        result=hooray.reverse();

        expect(expected).toEqual(jasmine.objectContaining(result));

    });
});
describe('slice', function(){
  true && it('Should return a copy of the array form index to the end index', function(){
      var hooray= new Hooray(1,2,3,4,5,6);
      var index=2;
      var indexEnd=4;
      var result= new Hooray;
      var expected= new Hooray(3,4);
      var expectedArray= new Hooray(1,2,3,4,5,6);
      result=hooray.slice(index, indexEnd);
      expect(expected).toEqual(jasmine.objectContaining(result));
      expect(expectedArray).toEqual(jasmine.objectContaining(hooray));
  });

  true && it("should return a copy of the same horrya on undefined arguments", function() {
      var hooray= new Hooray(1,2,3);
      var expected= new Hooray(1,2,3);
      var result= new Hooray;
      result=hooray.slice();
      expect(expected).toEqual(jasmine.objectContaining(result));

    });
  });
  describe('splice', function(){
    true && it('Should return the array without an specific element', function(){
      var hooray=new Hooray(1,2,3,4,5);
      var index=3;
      var expected=new Hooray(1,2,3,5);
      var result= new Hooray;
      result=hooray.splice(index);

      expect(expected).toEqual(jasmine.objectContaining(result));

    });
    true && it('Should modify the array with the new elements', function(){
      var hooray=new Hooray(1,2,3,4,5);
      var index=3;
      var expected=new Hooray(1,2,3,'a','b');
      var result= new Hooray;
      var deleteCount=2;
      result=hooray.splice(index,deleteCount,'a','b');

      expect(expected).toEqual(jasmine.objectContaining(result));

    });
    
    true && it('Should fail on undefined arguments', function(){
      var hooray=new Hooray(1,2,3,4,5);
        try{
          debugger
          hooray.splice();
            throw Error ('should not reach this point');

        }catch(error){
            
            expect(error.message).toBe('You have to send at least start index');

        }

    });

  });
  describe('sort', function(){
    true && it('Should order elemnts the hooray ', function(){
        var hooray=new Hooray(5,2,1,3,5,1);
        var expected=new Hooray(1,1,2,3,5,5);
        var result= new Hooray;
        result=hooray.sort();

        expect(expected).toEqual(jasmine.objectContaining(result));

    });

    true && it('Should return the same array if it an empty array', function(){
       
        var hooray=new Hooray;
        var expected=new Hooray;
        var result= new Hooray;
        result=hooray.sort();

        expect(expected).toEqual(jasmine.objectContaining(result));

    });

});
});
