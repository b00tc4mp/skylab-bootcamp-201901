'use strict';

describe('Hooray', function () {
    describe('constructor', function () {
        true && it('should construct an empty hooray when no arguments', function () {
            var hooray = new Hooray;

            expect(hooray.length).toBe(0);
            expect(Object.keys(hooray).length).toBe(1);
        });

        true && it('should construct a non-empty hooray when existing arguments', function () {
            var hooray = new Hooray(1, 2, 3);

            expect(hooray.length).toBe(3);
            expect(JSON.stringify(hooray)).toBe(JSON.stringify({ 0: 1, 1: 2, 2: 3, length: 3 }));
            expect(Object.keys(hooray).length).toBe(4);
        });

        true && it('should construct an empty hooray with length equal to when only one numeric argument', function () {
            var hooray = new Hooray(1);

            expect(hooray.length).toBe(1);
            expect(Object.keys(hooray).length).toBe(1);
        });

        true && it('should construct a non-empty hooray with only one non-numeric argument', function () {
            var hooray = new Hooray('1');

            expect(hooray.length).toBe(1);
            expect(JSON.stringify(hooray)).toBe(JSON.stringify({ 0: '1', length: 1 }));
            expect(Object.keys(hooray).length).toBe(2);
        });
    });

    describe('push', function () {
        true && it('should add a value at the end of an hooray', function () {
            var hooray = new Hooray(1, 2, 3);

            var length = hooray.push(4);

            expect(hooray.length).toBe(4);
            expect(length).toBe(hooray.length);
            expect(JSON.stringify(hooray)).toBe(JSON.stringify({ 0: 1, 1: 2, 2: 3, 3: 4, length: 4 }));
        });

        true && it('should add multiple values at the end of an hooray in order', function () {
            var hooray = new Hooray(1, 2, 3);

            var length = hooray.push(4, 5);

            expect(hooray.length).toBe(5);
            expect(length).toBe(hooray.length);
            expect(JSON.stringify(hooray)).toBe(JSON.stringify({ 0: 1, 1: 2, 2: 3, 3: 4, 4: 5, length: 5 }));
        });

        true && it('should not add a non-provided value at the end of an hooray', function () {
            var hooray = new Hooray(1, 2, 3);

            var length = hooray.push();

            expect(hooray.length).toBe(3);
            expect(length).toBe(hooray.length);
            expect(JSON.stringify(hooray)).toBe(JSON.stringify({ 0: 1, 1: 2, 2: 3, length: 3 }));
        });
    });

    describe('forEach', function () {
        true && it('should itearate an hooray without altering it', function () {
            var hooray = new Hooray(1, 2, 3);

            var result = new Hooray;

            hooray.forEach(function (v, i) { result.push(v); });

            expect(JSON.stringify(result)).toBe(JSON.stringify(hooray));

            var expected = { 0: 1, 1: 2, 2: 3, length: 3 };

            expect(JSON.stringify(hooray)).toBe(JSON.stringify(expected));
        });

        true && it('should do nothing if hooray has not content', function () {
            var hooray = new Hooray;

            var result = new Hooray;

            hooray.forEach(function (v, i) { result.push(v); });

            expect(result.length).toBe(0);
        });

        true && it('should break on undefined callback', function () {
            var hooray = new Hooray(1, 2, 3);

            try {
                hooray.forEach();

                throw Error('should not reach this point');
            } catch (error) {
                expect(error.message).toBe('undefined is not a function');
            }
        });
    });

    describe ('isHooray', function () {
        true && it('is a Hooray object',function(){
            var hooray = new Hooray(1, 2, 3);

            var result = hooray.isHooray();
            expect(result).toBeTruthy();         
        });
    });


    describe ('of', function () {
        true && it('should create a new Hooray instance from a variable number of arguments', function() {
            var expected = { 0:'a', 1:'b', 2:'c', 3:1, 4:2, 5:3, 6:'pepe', length: 7 };           
            var result = new Hooray().of('a', 'b', 'c', 1, 2, 3, 'pepe');
            expect(JSON.stringify(expected)).toBe(JSON.stringify(result));
        });
    });



    describe ('concat', function () { 
        true && it('should concatenate the hoorays with the original hooray without altering it', function() {
            var hooray1 = new Hooray('a', 'b', 'c');
            var original = hooray1;
            var hooray2 = new Hooray(1, 2, 3);
            var hooray3 = new Hooray('pepe');

            var expected = { 0:'a', 1:'b', 2:'c', 3:1, 4:2, 5:3, 6:'pepe', length: 7 };
           
            var result = hooray1.concat(hooray2,hooray3);
            expect(JSON.stringify(expected)).toBe(JSON.stringify(result));

            expect(JSON.stringify(original)).toBe(JSON.stringify(hooray1));
        });
    });


    
    describe ('every', function () {

        true && it('should break on undefined callback', function () {
            var hooray = new Hooray(1, 2, 3);

            try {
                hooray.every();

                throw Error('should not reach this point');
            } catch (error) {
                expect(error.message).toBe('undefined is not a function');
            }
        });


        true && it('should return true if callback is true for all the values of horroy, otherwise should return false', function() {
            var hooray = new Hooray(1, 2, 3);

            var result = hooray.every(function(v) { return v > 0; });
            expect(result).toBeTruthy();

            var result = hooray.every(function(v) { return v < 2; });
            expect(result).toBeFalsy();

        });

    });


    describe('fill', function () {
        it('should break if value is not a string or number', function () {
            try {
                var hooray = new Hooray(1, 2, 3, 4);
                var value = [];
    
                hooray.fill(value);
    
                throw Error('should not reach this point');
            } catch (error) {
                expect(error.message).toBe(value + ' is not a number or string');
            }
        });
    
        it('shounld break if start is not a number',function () {
            try {
                var hooray = new Hooray(1, 2, 3, 4);
                var value = 2;
                var start = 'a';
    
                hooray.fill(value,start);
    
                throw Error('should not reach this point');            
    
            } catch (error) {
                expect(error.message).toBe(start + ' is not a number');
            }
            
        });
    
        it('shounld break if end is informed but is not a number',function () {
            try {
                var hooray = new Hooray(1, 2, 3, 4);
                var value = 2;
                var start = 2;
                var end = 'a';
    
                hooray.fill(value,start,end);
    
                throw Error('should not reach this point');            
    
            } catch (error) {
                expect(error.message).toBe(end + ' is not a number');
            }
        });        

        it('should fills all the elements of a hooray from a start index to an end index', function () {
            var hooray = new Hooray(1, 2, 3, 4);
            var expected = { 0:1, 1:2, 2:0 , 3:0, length: 4 };
            hooray.fill(0, 2, 4);
            expect(JSON.stringify(hooray)).toBe(JSON.stringify(expected));
    
        });
    
    });
    
    describe ('filter', function () {

        it('should break on undefined callback', function () {
            var hooray = new Hooray(1, 2, 3);

            try {
                hooray.filter();

                throw Error('should not reach this point');
            } catch (error) {
                expect(error.message).toBe('undefined is not a function');
            }
        });

        it('should create a new hooray with all elements that pass the test implemented by the provided function', function () {
            var hooray = new Hooray('spray', 'limit', 'elite', 'exuberant', 'destruction', 'present');
            var expected = {0: "exuberant", 1: "destruction", 2: "present", length: 3 };

            var result = hooray.filter(function(word){return word.length > 6});

            expect(JSON.stringify(result)).toBe(JSON.stringify(expected));
    
        });
    });


    describe ('findIndex', function () {

        it('should break on undefined callback', function () {
            var hooray = new Hooray(1, 2, 3);

            try {
                hooray.findIndex();

                throw Error('should not reach this point');
            } catch (error) {
                expect(error.message).toBe('undefined is not a function');
            }
        });

        it('should returns the index of the first element in the hooray that satisfies the provided testing function', function () {
            var hooray = new Hooray(5, 12, 8,130, 44);
            var expected = 3;
            var result = hooray.findIndex(function (element) {return element > 13;});
            expect(result).toBe(expected);
        });

        it('should returns -1 if none of the elements in the hooray satisfies the provided testing function', function () {
            var hooray = new Hooray(5, 12, 8,130, 44);
            var expected = -1;
            var result = hooray.findIndex(function (element) {return element > 240;});
            expect(result).toBe(expected);
        });
    });

    describe ('find', function () {
        it('should break on undefined callback', function () {
            var hooray = new Hooray(1, 2, 3);

            try {
                hooray.find();

                throw Error('should not reach this point');
            } catch (error) {
                expect(error.message).toBe('undefined is not a function');
            }
        });

        it('should returns the first element in the hooray that satisfies the provided testing function', function () {
            var hooray = new Hooray(5, 12, 8, 130, 44);
            var expected = 130;
            var result = hooray.find(function (element) {return element > 13;});
            expect(result).toBe(expected);
        });

        it('should returns undefined if none of the elements in the hooray satisfies the provided testing function', function () {
            var hooray = new Hooray(5, 12, 8,130, 44);
            var expected;
            var result = hooray.find(function (element) {return element > 240;});
            expect(result).toBe(expected);
        });
    });



    describe('includes', function () {
        it('should break if the value to search is not a string or number', function () {
            try {
                var hooray = new Hooray(1, 2, 3, 4);
                var value = [];
    
                hooray.includes(value);
    
                throw Error('should not reach this point');
            } catch (error) {
                expect(error.message).toBe(value + ' is not a number or string');
            }
        });
    
        it('shounld break if from index is informed but is not a number',function () {
            try {
                var hooray = new Hooray(1, 2, 3, 4);
                var value = 2;
                var fromIndex = 'a';
    
                hooray.includes(value,fromIndex);
    
                throw Error('should not reach this point');            
    
            } catch (error) {
                expect(error.message).toBe(fromIndex + ' is not a number');
            }
        });        

        it('should return true if the value to search is found', function () {
            var hooray = new Hooray(1, 2, 3, 4);
            var value = 2;

            var result = hooray.includes(value);
            expect(result).toBeTruthy();
        });
    
        it('should retur false if the value to search is not found', function () {
            var hooray = new Hooray(1, 2, 3, 4);
            var value = 6;

            var result = hooray.includes(value);
            expect(result).toBeFalsy();
        });
    });

    describe ('indexOf', function () {
        it('should break if the value to search is not a string or number', function () {
            try {
                var hooray = new Hooray(1, 2, 3, 4);
                var value = [];
    
                hooray.indexOf(value);
    
                throw Error('should not reach this point');
            } catch (error) {
                expect(error.message).toBe(value + ' is not a number or string');
            }
        });
    
        it('shounld break if from index is informed but is not a number',function () {
            try {
                var hooray = new Hooray(1, 2, 3, 4);
                var value = 2;
                var fromIndex = 'a';
    
                hooray.indexOf(value,fromIndex);
    
                throw Error('should not reach this point');            
    
            } catch (error) {
                expect(error.message).toBe(fromIndex + ' is not a number');
            }
        });        

        it('should returns the first index at which a given element can be found in the hooray', function () {
            var hooray = new Hooray(2, 9, 9);
            var expected = 0;
            var result = hooray.indexOf(2);
            expect(result).toBe(expected);
        });


        it("should returns -1 if the element can't be found in the hooray", function () {
            var hooray = new Hooray(2, 9, 9);
            var expected = -1;
            var result = hooray.indexOf(7);
            expect(result).toBe(expected);
        });

        it('should returns the first index at which a given element can be found in the hooray, with a start index', function () {
            var hooray = new Hooray(2, 9, 9);
            var expected = 2;
            var result = hooray.indexOf(9, 2);
            expect(result).toBe(expected);
        });

        it('should returns the first index at which a given element can be found in the hooray, with a negative start index', function () {
            var hooray = new Hooray(2, 9, 9);
            var expected = 0;
            var result = hooray.indexOf(2, -3);
            expect(result).toBe(expected);
        });
    });

    describe ('join', function () {
        it('should break if the separator is informed but is not a string', function () {
            try {
                var hooray = new Hooray(1, 2, 3, 4);
                var separator = 1;
    
                result = hooray.join(separator);
    
                throw Error('should not reach this point');
            } catch (error) {
                expect(error.message).toBe(separator + ' is not a string');
            }
        });

        it('should returns all the elements concatenated without separation if it is not informed', function () {
            var hooray = new Hooray('Fire', 'Wind', 'Rain');
            var expected = 'Fire,Wind,Rain';
            var result = hooray.join();
            expect(result).toBe(expected);
        });

        it('should returns all the elements concatenated with the separator between', function () {
            var hooray = new Hooray('Fire', 'Wind', 'Rain');
            var separator = '-';
            var expected = 'Fire-Wind-Rain';
            var result = hooray.join(separator);
            expect(result).toBe(expected);
        });

    });


    describe ('lastindexOf', function () {
        it('should break if the value to search is not a string or number', function () {
            try {
                var hooray = new Hooray(1, 2, 3, 4);
                var value = [];
    
                hooray.lastIndexOf(value);
    
                throw Error('should not reach this point');
            } catch (error) {
                expect(error.message).toBe(value + ' is not a number or string');
            }
        });
    
        it('shounld break if from index is informed but is not a number',function () {
            try {
                var hooray = new Hooray(1, 2, 3, 4);
                var value = 2;
                var fromIndex = 'a';
    
                hooray.lastIndexOf(value,fromIndex);
    
                throw Error('should not reach this point');            
    
            } catch (error) {
                expect(error.message).toBe(fromIndex + ' is not a number');
            }
        });        

        it('should returns the last index at which a given element can be found in the hooray', function () {
            var hooray = new Hooray(2, 9, 9);
            var expected = 0;
            var result = hooray.lastIndexOf(2);
            expect(result).toBe(expected);
        });


        it("should returns -1 if the element can't be found in the hooray", function () {
            var hooray = new Hooray(2, 5, 9, 2);
            var expected = -1;
            var result = hooray.lastIndexOf(7);
            expect(result).toBe(expected);
        });

        it('should returns the last index at which a given element can be found in the hooray, with a start index', function () {
            var hooray = new Hooray(2, 5, 9, 2);
            var expected = 3;
            var result = hooray.lastIndexOf(2, 3);
            expect(result).toBe(expected);
        });

        it('should returns the last index at which a given element can be found in the hooray, with a negative start index', function () {
            var hooray = new Hooray(2, 5, 9, 2);
            var expected = 3;
            var result = hooray.lastIndexOf(2, -1);
            expect(result).toBe(expected);
        });
    });

    describe('map', function () {
        it('should return a new hooray with the value returned by the callback for each element', function () {
            var hooray = new Hooray(1, 2, 3);
            var expected = {0: 3, 1: 4, 2: 5, length: 3};
    
            var result = hooray.map(function(x){ return x + 2;});
            
            expect(JSON.stringify(result)).toBe(JSON.stringify(expected));
        });
       
        it('should break on undefined callback', function () {
            var hooray = new Hooray(1, 2, 3);
    
            try {
                hooray.map();
    
                throw Error('should not reach this point');
            } catch (error) {
                expect(error.message).toBe('undefined is not a function');
            }
        });    
    });

    describe('pop', function() {
        it("should retrieves the last value of a hooray, decrementing it's length by 1", function() {
            var hooray = new Hooray(1, 2, 3);
            var InitialLength = hooray.length;
            var expectedValue = 3;
            var expectedHooray = {0: 1, 1: 2, length: 2};

            var value = hooray.pop();
            var length = hooray.length;
            
    
            expect(length).toBe(InitialLength - 1);
            expect(value).toBe(expectedValue);
            expect(JSON.stringify(hooray)).toBe(JSON.stringify(expectedHooray));
        });
    
        it('should return undefined on empty hooray', function() {
            var hooray = new Hooray();
    
            var value = hooray.pop();
    
            expect(hooray.length).toBe(0);
            expect(value).toBe(undefined);
        });
    });

    describe('reduce', function () {
 
        it('should return a single value resulting of applying a reducer function on each member of the hooray', function () {
            var hooray = new Hooray(1, 2, 3, 4);
            var expected = 10;
    
            var result = hooray.reduce(function(x, i){ return x + i;});
            
            expect(result).toBe(expected);
        });

        it('should return a single value resulting of applying a reducer function on each member of the hooray, plus the initial value if it exists', function () {
            var hooray = new Hooray(1, 2, 3, 4);
            var expected = 20;
    
            var result = hooray.reduce(function(x, i){ return x + i;}, 10);
            
            expect(result).toBe(expected);
        });

        it('should break on undefined callback', function () {
            var hooray = new Hooray(1, 2, 3, 4);
    
            try {
                hooray.reduce();
    
                throw Error('should not reach this point');
            } catch (error) {
                expect(error.message).toBe('undefined is not a function');
            }
        });

        it('shounld break if initial value is informed but is not a number',function () {
            try {
                var hooray = new Hooray(1, 2, 3, 4);
                var initialValue = 'a';
    
                hooray.reduce(function(x, i){ return x + i;}, initialValue);
    
                throw Error('should not reach this point');            
    
            } catch (error) {
                expect(error.message).toBe(initialValue + ' is not a number');
            }
        });        


    });

    describe('reduceRight', function () {
  
        it('should return a single value resulting of applying a reducer function (from right-to-left) on each member of the hooray ', function () {
            var hooray = new Hooray(1, 2, 3, 4);
            var expected = 10;
    
            var result = hooray.reduceRight(function(x, i){ return x + i;});
            
            expect(result).toBe(expected);
        });

        it('should return a single value resulting of applying a reducer function (from right-to-left) on each member of the hooray, plus the initial value if it exists', function () {
            var hooray = new Hooray(1, 2, 3, 4);
            var expected = 20;
    
            var result = hooray.reduceRight(function(x, i){ return x + i;}, 10);
            
            expect(result).toBe(expected);
        });

        it('should break on undefined callback', function () {    
            try {
                var hooray = new Hooray(1, 2, 3, 4);

                hooray.reduceRight();
    
                throw Error('should not reach this point');
            } catch (error) {
                expect(error.message).toBe('undefined is not a function');
            }
        });

        it('shounld break if initial value is informed but is not a number',function () {
            try {
                var hooray = new Hooray(1, 2, 3, 4);
                var initialValue = 'a';
    
                hooray.reduceRight(function(x, i){ return x + i;}, initialValue);
    
                throw Error('should not reach this point');            
    
            } catch (error) {
                expect(error.message).toBe(initialValue + ' is not a number');
            }
        });        
    });

    describe('reverse', function () {  
        it('should return a new Hooray with all elements in reverse order ', function () {
            var hooray = new Hooray('a', 'b', 'c');
            var expected = {0: 'c', 1: 'b', 2: 'a', length: 3};
    
            var result = hooray.reverse();
            
            expect(JSON.stringify(result)).toBe(JSON.stringify(expected));
        });
    });


    describe('shift', function () {  
        it('should delete the first element from the hooray and return it, changing the length of the hooray', function () {
            var hooray = new Hooray('angel', 'clown', 'mandarin', 'surgeon');

            var lengthExpected = hooray.length - 1; 
            var valueExpected = 'angel';
            var hoorayExpected = {0: 'clown', 1: 'mandarin', 2: 'surgeon', length: 3};

            var valueResult = hooray.shift();
            
            expect(valueResult).toBe(valueExpected);
            expect(JSON.stringify(hooray)).toBe(JSON.stringify(hoorayExpected));
            expect(hooray.length).toBe(lengthExpected);
        });
    });

    describe('slice', function () {
        it('should returns a new hooray with the elements between start index and end index', function () {
            var hooray = new Hooray(1, 2, 3, 4, 5);
            var expected = {0: 3, 1: 4, length: 2};
    
            var result = hooray.slice(2, 4);
            
            expect(JSON.stringify(result)).toBe(JSON.stringify(expected));
        });
    
    });


    describe('some', function () {
        it('should return true if at least one element in the hooray passes the test implemented by the function', function () {
            var hooray = new Hooray(1, 2, 3, 4, 5);
    
            var result = hooray.some(function(x){ return x > 3; });
            
            expect(result).toBeTruthy();
        });
    
        it('should return false if none of the elements in the hooray passes the test implemented by the function', function () {
            var hooray = new Hooray(1, 2, 3, 4, 5);
    
            var result = hooray.some(function(x){ return x > 10; });
            
            expect(result).toBeFalsy();
        });
       
        it('should break on undefined callback', function () {
            try {
                var hooray = new Hooray(1, 2, 3, 4, 5);

                hooray.some();
    
                throw Error('should not reach this point');
            } catch (error) {
                expect(error.message).toBe('undefined is not a function');
            }
        });
    });

    describe('sort', function () {
        it('should return the hooray with the elements sorted', function () {
            var hooray = new Hooray('March', 'Jan', 'Feb', 'Dec');
            var expected = {0: 'Dec', 1: 'Feb', 2: 'Jan', 3: 'March', length: 4};

            hooray.sort();
            
            expect(JSON.stringify(hooray)).toBe(JSON.stringify(expected));
        });
    });
    
    
    describe('splice', function () {

        it('shounld break if start value is not a number',function () {
            try {
                var hooray = new Hooray(1, 2, 3, 4);
                var start = 'a';
    
                hooray.splice(start, 0, 'pepe');
    
                throw Error('should not reach this point');            
    
            } catch (error) {
                expect(error.message).toBe(start + ' is not a number');
            }
        });        

        it('shounld break if deleteCount is informed but is not a number',function () {
            try {
                var hooray = new Hooray(1, 2, 3, 4);
                var start = 0;
                var deleteCount = 'a';
    
                hooray.splice(start, deleteCount, 'pepe');
    
                throw Error('should not reach this point');            
    
            } catch (error) {
                expect(error.message).toBe(deleteCount + ' is not a number');
            }
        });    

        it('should remove elements and insert new elements', function () {
            var hooray = new Hooray('angel', 'clown', 'trumpet', 'sturgeon');
            var expectedHooray = {0: "parrot", 1: "anemone", 2: "blue", 3: "trumpet", 4: "sturgeon", length: 5};
            var expectedResult = {0: "angel", 1: "clown", length: 2};
    
            var result = hooray.splice(0, 2, 'parrot', 'anemone', 'blue');
            
            expect(JSON.stringify(result)).toBe(JSON.stringify(expectedResult));
            expect(JSON.stringify(hooray)).toBe(JSON.stringify(expectedHooray));

        });

        it('should remove 0 elements and insert new elements', function () {
            var hooray = new Hooray('angel', 'clown', 'mandarin', 'sturgeon');
            var expectedHooray = {0: "angel", 1: "clown", 2: "drum", 3: "guitar", 4: "mandarin", 5: "sturgeon", length: 6};
            var expectedResult = new Hooray();
    
            var result = hooray.splice(2, 0,'drum', 'guitar');
            
            expect(JSON.stringify(result)).toBe(JSON.stringify(expectedResult));
            expect(JSON.stringify(hooray)).toBe(JSON.stringify(expectedHooray));

        });

        it('should remove elements with negative start index', function () {
            var hooray = new Hooray('angel', 'clown', 'mandarin', 'sturgeon');
            var expectedHooray = {0: "angel", 1: "clown", 2: "sturgeon", length: 3};
            var expectedResult = {0: "mandarin", length: 1};
    
            var result = hooray.splice(-2, 1);
            
            expect(JSON.stringify(result)).toBe(JSON.stringify(expectedResult));
            expect(JSON.stringify(hooray)).toBe(JSON.stringify(expectedHooray));

        });

    });  

});

