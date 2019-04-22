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
            expect(JSON.stringify(hooray)).toBe(JSON.stringify({ 0: 1, 1: 2, 2: 3, length: 3 }));
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
            expect(JSON.stringify(hooray)).toBe(JSON.stringify({ 0: '1', length: 1 }));
            expect(Object.keys(hooray).length).toBe(2);
        });
    });

    describe('push', function () {
        it('should add a value at the end of an hooray', function () {
            var hooray = new Hooray(1, 2, 3);

            var length = hooray.push(4);

            expect(hooray.length).toBe(4);
            expect(length).toBe(hooray.length);
            expect(JSON.stringify(hooray)).toBe(JSON.stringify({ 0: 1, 1: 2, 2: 3, 3: 4, length: 4 }));
        });

        it('should add multiple values at the end of an hooray in order', function () {
            var hooray = new Hooray(1, 2, 3);

            var length = hooray.push(4, 5);

            expect(hooray.length, 5);
            expect(length, hooray.length);
            expect(JSON.stringify(hooray)).toBe(JSON.stringify({ 0: 1, 1: 2, 2: 3, 3: 4, 4: 5, length: 5 }));
        });

        it('should not add a non-provided value at the end of an hooray', function () {
            var hooray = new Hooray(1, 2, 3);

            var length = hooray.push();

            expect(hooray.length, 3);
            expect(length, hooray.length);
            expect(JSON.stringify(hooray)).toBe(JSON.stringify({ 0: 1, 1: 2, 2: 3 , length: 3 }));
        });
    });

    describe('forEach', function () {
        it('should itearate an hooray without altering it', function () {
            var hooray = new Hooray(1, 2, 3);

            var result = new Hooray;

            hooray.forEach(function (v) { result.push(v); });
            // 0 1
            // 1 2
            // 2 3

            expect(result, hooray, true);

            var expected = { 0: 1, 1: 2, 2: 3, length: 3 };

            expect(JSON.stringify(hooray)).toBe(JSON.stringify(expected));
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

    describe('concat', function () {

        it('should work as a concat', function () {
            var hooray1 = new Hooray('d');
            var hooray2 = new Hooray('a', 'b', 'c');  
            var newhooray= hooray2.concat(hooray1)
            expect(JSON.stringify(newhooray)).toBe(JSON.stringify({0:'a',1:'b',2:'c',3:'d',length:3}));
        });

        it('should break on undefined hooray 1', function () {
            var hooray1;
            var hooray2 = new Hooray('a', 'b', 'c');            
            try {
                hooray2.concat(hooray1);
                
                throw Error('should not reach this point');
            } catch (error) {
                expect(error.message).toBe('undefined is not an hooray');
            }
        });
    
        it('should break on undefined hooray 2', function () {
            var hooray2;
            var hooray1 = new Hooray('a', 'b', 'c');            
            try {
                hooray1.concat(hooray2);
                
                throw Error('should not reach this point');
            } catch (error) {
                expect(error.message).toBe('undefined is not an hooray');
            }
        });
    });

    describe('indexOf', function () {
        it('should return index of first item matching condition', function () {
            var hooray = new Hooray(1, 2, 3);

            var elem1 = 1;

            var exp = 0;

            var result = hooray.indexOf(elem1);

            expect(result).toBe(exp);
        });

        it('should return -1 if item not matching condition', function () {

            var hooray = new Hooray(3, 4, 6);

            var elem1 = 2;

            var exp = -1;

            var result = hooray.indexOf(elem1);

            expect(result).toBe(exp);
        });

        it('should return -1 if item is undefined', function () {

            var hooray = new Hooray(3, 7, 6);

            var exp = -1;

            var result = hooray.indexOf();

            expect(result).toBe(exp);
        });

    });

    describe('LastindexOf', function () {
        it('should return index of first item matching condition', function () {
            var hooray = new Hooray(1, 2, 3);

            var elem1 = 1;

            var exp = 0;

            var result = hooray.lastindexOf(elem1);

            expect(result).toBe(exp);
        });

        it('should return -1 if item not matching condition', function () {

            var hooray = new Hooray(3, 4, 6);

            var elem1 = 2;

            var exp = -1;

            var result = hooray.lastindexOf(elem1);

            expect(result).toBe(exp);
        });

        it('should return -1 if item is undefined', function () {

            var hooray = new Hooray(3, 7, 6);

            var exp = -1;

            var result = hooray.lastindexOf();

            expect(result).toBe(exp);
        });

    });

    describe('is-hooray', function () {

        it('should return true if is an hooray', function () {

            var hooray = new Hooray(1, 2, 4);

            var result = Hooray.isHooray(hooray);

            expect(result).toBe(true);

        });

        true && it('should return false if is not an hooray', function () {

            var elem = 3;

            var result = Hooray.isHooray(elem);

            expect(result).toBe(false);

        });

    });
    describe('sort', function () {
        it('should return an sort hooray', function () {
            var hooray = new Hooray(2, 1, 7, 9, 6, 5, 1);

            var result = hooray.sort();

            var expected = { 0: 1, 1: 1, 2: 2, 3: 5, 4: 6, 5: 7, 6: 9, length: 7 };
            expect(JSON.stringify(result)).toBe(JSON.stringify(expected))
        });

    });

    describe('splice', function () {
        it('should remove or replace existing elements and/or adding new elements ', function () {
            var hooray = new Hooray('Jan', 'March', 'April', 'June');

            var result = hooray.splice(1, 0, 'Feb');

            expect(JSON.stringify(result)).toBe(JSON.stringify({0:'Jan', 1:'Feb', 2:'March', 3:'April', 4:'June', length:5}));
        });

    });

    describe('join', function () {
        it('should join elements of array with a separator', function () {
            var hooray = new Hooray('good', 'BOY', 'cat');
            var expected = 'good,BOY,cat';
            var result = hooray.join(',');

            expect(result).toBe(expected);

        });

        it('should join elements of array without a separator', function () {
            var hooray = new Hooray('good', 'BOY', 'cat');
            var expected = 'good,BOY,cat';
            var result = hooray.join();

            expect(result).toBe(expected);

        });
    });

    describe('every', function () {
        it('should return true on all items matching condition', function () {
            var hooray = new Hooray(1, 2, 3);
    
            var result = hooray.every(function (v) { return v > 0; });
    
            expect(result).toBe(true);
        });
    
    
        it('should return false on any of the items not matching the condition', function () {
            var hooray = new Hooray(1, 2, 3);
    
            var result = hooray.every(function (v) { return v < 0; });
    
            expect(result).toBe(false);
        });
    
        it('should break on undefined callback', function () {
            var hooray = new Hooray(1, 2, 3);
    
            try {     
                hooray.every();
                throw Error('should not reach this point');
            } catch (error) {
                expect(error.message).toBe('undefined is not a function');
            }
        });
    });

    describe('Filter', function () {

        it('should work as a filter', function () {
            var hooray = new Hooray(12, 5, 8, 130, 44);
            hooray.filter(function(elemento) {
                return elemento >= 10;
              });
    
            expect(JSON.stringify(hooray)).toBe(JSON.stringify({0: 12, 1: 5, 2: 8, 3: 130, 4: 44, length:5}));
        });
        it('should break on undefined callback', function () {
            var hooray = new Hooray(1, 2, 3);
    
            try {
                hooray.filter();
    
                throw Error('should not reach this point');
            } catch (error) {
                expect(error.message).toBe('undefined is not a function');
            }
        });
    });

    describe('reverse', function () {
        it('should returns the reversed array', function () {
            var hooray = new Hooray('dino', 'gato', 2, 3);

            var result = hooray.reverse();

            var expected = { 0: 3, 1: 2, 2: 'gato', 3: 'dino', length: 4 };
            expect(JSON.stringify(result)).toBe(JSON.stringify(expected));
        });
    });

    describe('reduce', function () {
        it('should break on undefined callback', function () {
            var hooray = new Hooray(1, 2, 3);
    
            try {
                hooray.reduce();
    
                throw Error('should not reach this point');
            } catch (error) {
                expect(error.message).toBe('undefined is not a function');
            }
        });
        it('should work as a reduce', function () {
            var hooray = new Hooray(0, 1, 2, 3);
            var reduced= hooray.reduce(function(a, b){ return a + b; });
            expect(reduced).toBe(6);
        });
    });

    describe('reduceRight', function () {
        it('should break on undefined callback', function () {
            var hooray = new Hooray(1, 2, 3);
    
            try {
                hooray.reduceright();
    
                throw Error('should not reach this point');
            } catch (error) {
                expect(error.message).toBe('undefined is not a function');
            }
        });
        it('should work as a reduce right', function () {
            var hooray = new Hooray(0, 1, 2, 3);
            var reduced= hooray.reduceright(function(a, b){ return a + b; });
            expect(reduced).toBe(6);
        });
    });

    describe("some", function () {

        it("should return true when one reach the condition", function () {
            var hooray = new Hooray(1, 2, 3, 4, 5);
            var result = hooray.some(x=> x >= 0);

            expect(result).toBe(true);
        });

        it("should return false when any element reach the condition", function () {
            var hooray = new Hooray(1,2,3,5);
            var result = hooray.some(x=> x < 0);

            expect(result).toBe(false);
        });
    });

    describe('Map', function () {
        it('should break on undefined callback', function () {
            var hooray = new Hooray(1, 2, 3);
    
            try {
                hooray.map();
    
                throw Error('should not reach this point');
            } catch (error) {
                expect(error.message).toBe('undefined is not a function');
            }
        });

        it('should work as an array map', function () {
            var hooray = new Hooray(1, 5, 10, 15);
            var expected = new Hooray(2, 10, 20, 30);
            var mapped = hooray.map(function(x) {
                return x * 2;
             });
            expect(JSON.stringify(mapped)).toBe(JSON.stringify(expected));
        });
    });

    describe('Shift', function () {
        it('should work as an array shift', function () {
            var hooray = new Hooray('angel', 'payaso', 'mandarín', 'cirujano');
            var eliminado = hooray.shift();
            expect(eliminado).toBe('angel');
        });
    });
});
