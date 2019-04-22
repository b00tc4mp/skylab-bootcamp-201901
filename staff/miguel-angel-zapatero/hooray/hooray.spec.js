'use strict';

describe('hooray', function () {
    describe('constructor', function () {
        it('should construct an empty hooray when no arguments', function () {
            var hooray = new Hooray;

            expect(hooray.length).toBe(0);
            expect(Object.keys(hooray).length).toBe(1);
        });

        it('should construct a non-empty hooray when existing arguments', function () {
            var hooray = new Hooray(1, 2, 3);

            expect(hooray.length).toBe(3);
            expect(hooray).toEqual(jasmine.objectContaining({ 0: 1, 1: 2, 2: 3, length: 3 }));
            expect(Object.keys(hooray).length).toBe(4);
        });

        it('should construct an empty hooray with length equal to when only one numeric argument', function () {
            var hooray = new Hooray(1);

            expect(hooray.length).toBe(1);
            expect(Object.keys(hooray).length).toBe(1);
        });

        it('should construct a non-empty hooray with only one non-numeric argument', function () {
            var hooray = new Hooray('1');

            expect(hooray.length).toBe(1);
            expect(hooray).toEqual(jasmine.objectContaining({ 0: '1', length: 1 }));
            expect(Object.keys(hooray).length).toBe(2);
        });
    });

    describe('push', function () {
        it('should add a value at the end of an hooray', function () {
            var hooray = new Hooray(1, 2, 3);

            var length = hooray.push(4);

            expect(hooray.length).toBe(4);
            expect(length).toBe(hooray.length);
            expect(hooray).toEqual(jasmine.objectContaining({ 0: 1, 1: 2, 2: 3, 3: 4, length: 4 }));
        });

        it('should add multiple values at the end of an hooray in order', function () {
            var hooray = new Hooray(1, 2, 3);

            var length = hooray.push(4, 5);

            expect(hooray.length).toBe(5);
            expect(length).toBe(hooray.length);
            expect(hooray).toEqual(jasmine.objectContaining({ 0: 1, 1: 2, 2: 3, 3: 4, 4: 5, length: 5 }));
        });

        it('should not add a non-provided value at the end of an hooray', function () {
            var hooray = new Hooray(1, 2, 3);

            var length = hooray.push();

            expect(hooray.length).toBe(3);
            expect(length).toBe(hooray.length);
            expect(hooray).toEqual(jasmine.objectContaining({ 0: 1, 1: 2, 2: 3, length: 3 }));
        });
    });

    describe('forEach', function () {
        it('should itearate an hooray without altering it', function () {
            var hooray = new Hooray(1, 2, 3);
            
            var result = new Hooray;

            hooray.forEach(function (v, i) { result.push(v); });

            expect(result).toEqual(hooray);
            expect(hooray).toEqual(jasmine.objectContaining({ 0: 1, 1: 2, 2: 3, length: 3 }));
        });

        it('should do nothing if hooray has not content', function () {
            var hooray = new Hooray;

            var result = new Hooray;

            hooray.forEach(function (v, i) { result.push(v); });

            expect(result.length).toBe(0);
        });

        it('should break on undefined callback', function () {
            var hooray = new Hooray(1, 2, 3);

            try {
                hooray.forEach();

                throw Error('should not reach this point');
            } catch (error) {
                expect(error.message).toBe('undefined is not a function');
            }
        });
    });

    describe('isHooray', function() {
        it('should return true', function() {
            var hooray = new Hooray(1, 2, 3);
            
            var result = Hooray.isHooray(hooray);
            
            expect(result).toBeTruthy();
        });
    
        it('should return false', function() {
            var str = 'hello';
    
            var result = Hooray.isHooray(str);
    
            expect(result).toBeFalsy();
        });
    });

    describe('concat', function() {
        it('should return the new hooray with only one passed argument', function() {
            var hooray = new Hooray(1, 2, 3);

            var result = hooray.concat();
            
            expect(result).toEqual(jasmine.objectContaining({ 0: 1, 1: 2, 2: 3, length: 3}));
        })
    
        it('should return the new hooray concatenating the two hoorays passed', function(){
            var hooray1 = new Hooray(1, 2, 3);
            var hooray2 = new Hooray(4, 5, 6);
    
            var result = hooray1.concat(hooray2);
            var expected = jasmine.objectContaining({ 0: 1, 1: 2, 2: 3, 3: 4, 4: 5, 5: 6, length: 6});
            expect(result).toEqual(expected);
        });
    
        it('should return the new hooray concatenating diferent type arguments', function(){
            var hooray1 = new Hooray(1, 2, 3);
            var hooray2 = new Hooray('hello', 25);
            var str = 'world';
            var num = 88;
    
            var result = hooray1.concat(hooray2, str, num);
    
            var expected = jasmine.objectContaining({ 0: 1, 1: 2, 2: 3, 3: 'hello', 4: 25, 5: 'world', 6 :88, length: 7});
            
            expect(result).toEqual(expected);
        });
    });

    describe('every', function() {
        it('should return true on all items matching condition', function() {
            var hooray = new Hooray(1, 2, 3);
    
            var result = hooray.every(function(v) { return v > 0; });
    
            expect(result).toBeTruthy();
        });
    
        it('should return false on any of the items not matching the condition', function() {
            var hooray = new Hooray(1, 2, 3);
    
            var result = hooray.every(function(v) { return v < 2; });
    
            expect(result).toBeFalsy();
        });
    
        it('should break an undefined function', function() {
            try {
                var hooray = new Hooray(1, 2, 3);
                hooray.every();
                throw Error('should not reach this point');
            } catch (error) {
                expect(error.message).toBe('undefined is not a function');
            }
        });
    });

    describe('fill', function() {
        it('should fill all the elements of the hooray with the value passed', function() {
            var hooray = new Hooray(1, 2, 3, 4, 5);
    
            var result = hooray.fill(8);
    
            var expected = new Hooray(8, 8, 8, 8, 8);
    
            expect(result).toEqual(expected);
        });
    
        it('should fill all the elements of the hooray with the value, starting and ending with the index passed', function() {
            var hooray = new Hooray(1, 2, 3, 4, 5);
    
            var result = hooray.fill(8, 2, 4);
    
            var expected = new Hooray(1, 2, 8, 8, 5);
    
            expect(result).toEqual(expected);
        });
    });

    describe('filter', function() {
        it('should return a new hooray with all the matched items of the condition', function() {
            var hooray = new Hooray(1, 2, 3);
    
            var result = hooray.filter(function(v) { return v > 1; });
    
            var expected = new Hooray(2, 3);
    
            expect(result).toEqual(expected);
        });
    
        it('should break an undefined hooray', function() {
            try {
                var hooray = new Hooray(1, 2, 3);
                hooray.filter();
                throw Error('should not reach this point');
            } catch (error) {
                expect(error.message).toBe('undefined is not a function');
            }
        });
    });

    describe('findIndex', function() {
        it('should return the index of any items matching condition', function() {
            var hooray = new Hooray(5, 12, 8, 130, 44);
    
            var result = hooray.findIndex(function(v) { return v > 13; });
    
            expect(result).toBe(3);
        });
    
        it('should return -1', function() {
            var hooray = new Hooray(5, 12, 8, 13, 44);
    
            var result = hooray.findIndex(function(v) { return v > 50; });
    
            expect(result).toBe(-1);
        });
    
        it('should break an undefined function', function() {
            try {
                var hooray = new Hooray(1, 2, 3);
                hooray.findIndex();
                throw Error('should not reach this point');
            } catch (error) {
                expect(error.message).toBe('undefined is not a function');
            }
        });
    });

    describe('find', function(){
        it('should return the matched value', function() {
            var hooray = new Hooray(1, 2, 3, 5);
    
            var result = hooray.find(function(v) { return v > 3; });
    
            expect(result).toBe(5);
        });
    
        it('should return undefined', function() {
            var hooray = new Hooray(1, 2, 3);
    
            var result = find(hooray, function(v) { return v > 5; });
    
            expect(result).toBeFalsy();
        });
    
        it('should break an undefined function', function() {
            try {
                var hooray = new Hooray(1, 2, 3);
                hooray.find();
                throw Error('should not reach this point');
            } catch (error) {
                expect(error.message).toBe('undefined is not a function');
            }
        });
    });    

    describe('includes', function () {
        beforeEach(function() {
            this.hooray = new Hooray('cat', 'dog', 'bat');
        });
        
        it('should returns true on the matched value', function () {
            var result = this.hooray.includes('dog');
    
            expect(result).toBeTruthy();
        });
    
        it('should returns false on the not matched value', function() {
            var result = this.hooray.includes(2);
    
            expect(result).toBeFalsy();
        });
    });

    describe('indexOf', function () {
        beforeEach(function() {
            this.hooray = new Hooray('cat', 'dog', 'bat', 'dog');
        });

        it('should return the index of the matched value', function () {
            var result = this.hooray.indexOf('dog', -2);
    
            expect(result).toBe(3);
        });
    
        it('should returns -1 on the not matched value', function() {
            var result = this.hooray.indexOf('dino');
    
            expect(result).toBe(-1);
        });
    
        it('should break when the index value is not a number', function () {
            try {
                this.hooray.indexOf(3, 'string');
    
                throw Error('should not reach this point');
            } catch (error) {
                expect(error.message).toBe('string is not a number');
            }
        });
    });

    describe('join', function() {
        beforeEach(function() {
            this.hooray = new Hooray(2, 'world', 'miguel');
        });

        it('should concatenate the hoorays values with specified separator string', function() {
            // var hooray = new Hooray(2, 'world', 'miguel');
    
            var result = this.hooray.join('-');
    
            var expected = '2-world-miguel';
            
            expect(result).toBe(expected);
        });
    
        it('should concatenate the hoorays values without specified separator string', function() {
            // var hooray = ['hello', 'world', 'miguel'];
    
            var result = this.hooray.join();
    
            var expected = '2,world,miguel';
            
            expect(result).toBe(expected);
        });
    });

    describe('lastIndexOf', function () {
        beforeEach(function() {
            this.hooray = new Hooray('cat', 'dog', 'bat', 'dog', 'dino');
        });

        it('should return the index of the matched value', function () {
            var result = this.hooray.lastIndexOf('dog');
    
            expect(result).toBe(3);
        });
    
        it('should return the index of the matched value with negative index passed', function () {
            var result = this.hooray.lastIndexOf('dog', -3);
    
            expect(result).toBe(1);
        });

        it('should returns -1 on the not matched value', function() {
            var result = this.hooray.lastIndexOf('snake');
    
            expect(result).toBe(-1);
        });
    
        it('should break when the index value is not a number', function () {
            try {
                this.hooray.lastIndexOf(3, 'string');
    
                throw Error('should not reach this point');
            } catch (error) {
                expect(error.message).toBe('string is not a number');
            }
        });
    });

    describe('map', function() {
        beforeEach(function() {
            this.hooray = new Hooray(1, 10, 25);
        });

        it('should return a new hooray with the results of the provided function', function() {
            var result = this.hooray.map(function(v) { return v * 2 });
    
            var expected = new Hooray(2, 20, 50);
            
            expect(result).toEqual(expected);
        });
    
        it('should break an undefined hooray', function() {
            try {
                this.hooray.map();
                throw Error('should not reach this point');
            } catch (error) {
                expect(error.message).toBe('undefined is not a function');
            }
        });
    });

    describe('pop', function() {
        it('should removes the last element and return it', function() {
            var hooray = new Hooray('camel', 'bison', 'dino');
    
            var result = hooray.pop();
    
            expect(result).toBe('dino');
            expect(hooray.length).toBe(2);
            
            var expected = new Hooray('camel', 'bison');
            expect(hooray).toEqual(expected);
        });

        it('should return undefined', function() {
            var hooray = new Hooray();
    
            var result = hooray.pop();
            
            expect(result).toBeFalsy();
            expect(hooray.length).toBe(0);
        });
    }); 

    describe('reduceRight', function() {
        it('should return the multiplication of all the hooray\'s values', function() {
            var hooray = new Hooray(1, 10, 25);
    
            var result = hooray.reduceRight(function(x, y) { return x * y; });
            
            expect(result).toBe(250);
        });
    
        it('should break an undefined function', function() {
            try {
                var hooray = new Hooray(1, 2, 3);
                hooray.reduceRight();
                throw Error('should not reach this point');
            } catch (error) {
                expect(error.message).toBe('undefined is not a function');
            }
        });
    });

    describe('reduce', function() {
        it('should return the sum of all the hooray\'s values', function() {
            var hooray = new Hooray(1, 10, 25);
    
            var result = hooray.reduce(function(x, y) { return x + y; });
            
            expect(result).toBe(36);
        });
    
        it('should break an undefined function', function() {
            try {
                var hooray = new Hooray(1, 2, 3);
                hooray.reduce();
                throw Error('should not reach this point');
            } catch (error) {
                expect(error.message).toBe('undefined is not a function');
            }
        });
    });

    describe('reverse', function() {
        it('should returns the reversed hooray', function() {
            var hooray = new Hooray('dino', 'gato', 2, 3);
    
            var result = hooray.reverse();
    
            var expected = new Hooray(3, 2, 'gato', 'dino');
            expect(result).toEqual(expected);
        });
    });

    describe('shift', function() {
        it('should removes the first element and return it', function() {
            var hooray = new Hooray('camel', 'bison', 'dino');
    
            var result = hooray.shift();
    
            expect(result).toBe('camel');
    
            var expected = new Hooray('bison', 'dino');
            expect(hooray).toEqual(expected);
        });
    });

    describe('slice', function() {
        beforeEach(function() {
            this.hooray = new Hooray('ant', 'bison', 'camel', 'duck', 'elephant');
        });

        it('should return an sliced hooray', function() {
            var result = this.hooray.slice(1, 3);
    
            var expected = new Hooray('bison', 'camel');
            
            expect(result).toEqual(expected);
        });
    
        it('should return an sliced hooray with start index negative', function() {
            var result = this.hooray.slice(-2);
    
            var expected = new Hooray('duck', 'elephant');
            
            expect(result).toEqual(expected);
        });
    
        it('should return an sliced hooray with end index negative', function() {
            var result = this.hooray.slice(2, -1);
    
            var expected = new Hooray('camel', 'duck');
           
            expect(result).toEqual(expected);
        });
        
        it('should return an empty hooray', function() {
            var result = this.hooray.slice(9);
    
            expect(result.length).toBe(0);
        });
    
        it('should break when start index is not a number and undefined', function() {
            try {
                var hooray = new Hooray('cat', 'dog', 'dino');
                hooray.slice('a');
                throw Error('should not reach this point');
            } catch (error) {
                expect(error.message).toBe('a is not a number');
            }
        });
    
        it('should break when end index is not a number and undefined', function() {
            try {
                var hooray = new Hooray('cat', 'dog');
                hooray.slice(2, 'a');
                throw Error('should not reach hits point');
            } catch (error){
                expect(error.message).toBe('a is not a number');
            }
        });
    }); 

    describe('some', function() {
        it('should return true', function() {
            var hooray = new Hooray(1, 2, 3, 4, 5);
    
            var result = hooray.some(function(v) {
                return v % 2 === 0;
            });
    
            expect(result).toBeTruthy();
        });
    
        it('should return false', function() {
            var hooray = new Hooray(1, 3, 5);
    
            var result = hooray.some(function(v) {
                return v % 2 === 0;
            });
            
            expect(result).toBeFalsy();
        });
    
        it('should return false with an empty hooray', function() {
            var hooray = new Hooray();
    
            var result = hooray.some(function(v) {
                return v % 2 === 0;
            });
            
            expect(result).toBeFalsy();
        });
    
        it('should break on undefined function', function() {
            var hooray = new Hooray();
    
            try {
                hooray.some();
    
                throw Error('should not reach this point');
            } catch(error) {
                expect(error.message).toBe('undefined is not a function');
            }
        });
    });

    describe('sort', function() {
        it('should return an sliced hooray', function() {
            var hooray = new Hooray('camel', 'bison', 'duck', 9, 'elephant', 'ant', 1);
    
            var result = hooray.sort();
    
            var expected = new Hooray(1, 9, 'ant', 'bison', 'camel', 'duck', 'elephant');
            expect(result).toEqual(expected);
        });
    }); 

    describe('splice', function() {
        beforeEach(function() {
            this.hooray = new Hooray('Jan', 'Feb', 'Mar', 'Apr', 'May');
        });

        it('should delete the elements on the passed hooray and return the erased elements', function() {
            var result = this.hooray.splice(2);
    
            var expected = new Hooray('Mar', 'Apr', 'May');
            expect(result).toEqual(expected);
            
            var expected = new Hooray('Jan', 'Feb');
            expect(this.hooray).toEqual(expected);
        });
    
        it('should delete the horray\'s elements and add the given elements', function() {
            var result = this.hooray.splice(2, 3, 'DINO');
    
            var expected = new Hooray('Mar', 'Apr', 'May');
            expect(result).toEqual(expected);
    
            var expected = new Hooray('Jan', 'Feb', 'DINO');
            expect(this.hooray).toEqual(expected);        
        });
    
        it('should delete the hooray\'s elements and add the given elements', function() {    
            var result = this.hooray.splice(-1, 3, 'DINO');
    
            var expected = new Hooray('May');
            expect(result).toEqual(expected);
    
            var expected = new Hooray('Jan', 'Feb', 'Mar', 'Apr', 'DINO');
            expect(this.hooray).toEqual(expected);        
        });
    
        it('should delete the horray\'s elements and add the given elements', function() {
            var result = this.hooray.splice(1, -2, 'DINO');
    
            var expected = new Hooray();
            expect(result.length).toBe(0);
    
            var expected = new Hooray('Jan', 'DINO', 'Feb', 'Mar', 'Apr', 'May');
            expect(this.hooray).toEqual(expected);        
        });
    
        it('should break if index is not a number', function() {
            try {
                this.hooray.splice('a');
            } catch (error) {
                expect(error.message).toBe('a is not a number');
            }
        });
    });
});