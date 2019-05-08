'use strict';

describe('hooray', function () {
    describe('constructor', function () {
        true && it('should construct an empty hooray when no arguments', function () {
            var hooray = new Hooray;

            expect(hooray.length).toBe(0);
            expect(Object.keys(hooray).length).toBe(1);
        });

        true && it('should construct a non-empty hooray when existing arguments', function () {
            var hooray = new Hooray(1, 2, 3);

            expect(hooray.length).toBe(3);
            expect(hooray).toEqual(jasmine.objectContaining({ 0: 1, 1: 2, 2: 3, length: 3 }));
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
            expect(hooray).toEqual(jasmine.objectContaining({0: "1", length: 1}));
            expect(Object.keys(hooray).length).toBe(2);
        });
    });

    describe('push', function () {
        true && it('should add a value at the end of an hooray', function () {
            var hooray = new Hooray(1, 2, 3);

            var length = hooray.push(4);

            expect(hooray.length).toBe(4);
            expect(length).toBe(hooray.length);
            expect(hooray).toEqual(jasmine.objectContaining({0: 1, 1: 2, 2: 3, 3: 4, length: 4}));
        });

        true && it('should add multiple values at the end of an hooray in order', function () {
            var hooray = new Hooray(1, 2, 3);

            var length = hooray.push(4, 5);

            expect(hooray.length).toBe(5);
            expect(length).toBe(hooray.length);
            expect(hooray).toEqual(jasmine.objectContaining({ 0: 1, 1: 2, 2: 3, 3: 4, 4: 5, length: 5 }));
        });

        true && it('should not add a non-provided value at the end of an hooray', function () {
            var hooray = new Hooray(1, 2, 3);

            var length = hooray.push();

            expect(hooray.length).toBe(3);
            expect(length).toBe(hooray.length);
            expect(hooray).toEqual(jasmine.objectContaining({ 0: 1, 1: 2, 2: 3, length: 3 }));
        });
    });

    describe('forEach', function () {
        true && it('should itearate a hooray without altering it', function () {
            var hooray = new Hooray(1, 2, 3);

            var result = new Hooray;

            hooray.forEach(function (v, i) { result.push(v); });
            // 0 1
            // 1 2
            // 2 3

            expect(jasmine.objectContaining(result)).toEqual(jasmine.objectContaining(hooray));
            expect(hooray).toEqual(jasmine.objectContaining({ 0: 1, 1: 2, 2: 3, length: 3 }));
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

    describe('of', function () {
        true && it('should create an empty hooray', function () {
            var hooray = Hooray.prototype.of();

            expect(hooray.length).toBe(0);
            expect(Object.keys(hooray).length).toBe(1);
            expect(hooray).toEqual(jasmine.objectContaining({length: 0}));
        });
        true && it('should create an empty hooray', function () {
            var hooray = Hooray.prototype.of(1,2,3);

            expect(hooray.length).toBe(3);
            expect(Object.keys(hooray).length).toBe(4);
            expect(hooray).toEqual(jasmine.objectContaining({0:1, 1:2, 2:3, length: 3}));
        });

    });

    describe('concat', function(){
        true && it('should create a new hooray merging the given hooray and the arguments', function(){
            var hooray = new Hooray();
            var result = hooray.concat(1,2,3);

            expect(hooray.length).toBe(0);
            expect(Object.keys(hooray).length).toBe(1);
            expect(hooray).toEqual(jasmine.objectContaining({length: 0}));
            expect(result.length).toBe(3);
            expect(Object.keys(result).length).toBe(4);
            expect(result).toEqual(jasmine.objectContaining({0: 1, 1: 2, 2: 3, length: 3}));
        });

        true && it('should create an hooray concatening the original hooray and the one passed like argument', function(){
                var hooray = new Hooray(1, 2, 3);
                var hooray2 = new Hooray(4, 5, 6);

                var result = hooray.concat(hooray2);
                expect(result.length).toBe(6);
                expect(Object.keys(result).length).toBe(7);
                expect(result).toEqual(jasmine.objectContaining({0: 1, 1: 2, 2: 3, 3: 4, 4: 5, 5: 6, length: 6}));
        });

        true && it('should create an hooray concatening the original hooray and the arguments', function(){
            var hooray = new Hooray(1, 2, 3);

            var result = hooray.concat(4,5,6);
            expect(result.length).toBe(6);
            expect(Object.keys(result).length).toBe(7);
            expect(result).toEqual(jasmine.objectContaining({0: 1, 1: 2, 2: 3, 3: 4, 4: 5, 5: 6, length: 6}));
        });
    });

    describe('every', function () {
        true && it('should return true on all items matching condition', function () {
            var hooray = new Hooray(1, 2, 3);

            var result = hooray.every(function (v) { return v > 0; });

            expect(result).toBe(true);
        });

        true && it('should return false on any of the items not matching the condition', function () {
            var hooray =new Hooray(1, 2, 3);

            var result = hooray.every(function (v) { return v < 0; });

            expect(result).toBe(false);
        });

        true && it('should break on undefined callback', function () {
            var hooray = new Hooray(1, 2, 3);

            try {
                hooray.every();

                throw Error('should not reach this point');
            } catch (error) {
                expect(error.message).toBe('undefined is not a function');
            }
        });
    });
    describe('fill', function(){
        true && it('should return the hooray full of the given value', function(){
            var hooray = new Hooray(1, 2, 3, 4, 5);
            var value = 'b'

            var result = hooray.fill(value);

            expect(result).toEqual(jasmine.objectContaining( {0:'b', 1:'b', 2:'b', 3:'b', 4:'b', length: 5}));
            expect(hooray).toEqual(jasmine.objectContaining( {0:'b', 1:'b', 2:'b', 3:'b', 4:'b', length: 5}));
        });

        true && it('should return the elements in the hooray defined from index to end changed the given value', function(){
            var hooray = new Hooray(1, 2, 3, 4, 5);
            var value = 'b'
            var index = 2;
            var end = 4;

            var result = hooray.fill(value, index, end);

            expect(result).toEqual(jasmine.objectContaining({0:1,1:2,2:'b',3:'b',4:5, length: 5}));
            expect(hooray).toEqual(jasmine.objectContaining({0:1,1:2,2:'b',3:'b',4:5, length: 5}));
        });

        true && it('should break because the value of index is not a number', function(){
            var hooray = new Hooray(1, 2, 3, 4, 5);
            var value = 'b'
            var index = 'a';
            var end = 4;

            try {
                hooray.fill(value, index, end);
                throw Error('should not reach this point');
            } catch (error) {
                expect(error.message).toBe('a is not a number');
            }
        });

        true && it('should break because end is not a number', function(){
            var hooray = new Hooray(1, 2, 3, 4, 5);
            var value = 'b'
            var index = 4;
            var end = 'b';

            try {
                hooray.fill(value, index,end);
            } catch (error) {
                expect(error.message).toBe('b is not a number');
            }
        });
    });

    describe('filter', function(){
        true && it('should return the given hooray without elements biger than 3', function(){
            var hooray = new Hooray(1, 2, 3, 1, 2);

            var result = hooray.filter(function(v){return v < 3 ? true : false});

            expect(result).toEqual(jasmine.objectContaining({0:1, 1:2, 2:1, 3:2, length:4}));
            expect(hooray).toEqual(jasmine.objectContaining({0:1, 1:2, 2:3, 3:1, 4:2, length:5}))
        });

        true && it('should return the values of the given hooray biger than 2', function(){
            var hooray = new Hooray(1, 2, 3, 1, 2);

            var result = hooray.filter(function(v){return v > 2 ? true : false});

            expect(result).toEqual(jasmine.objectContaining({0:3, length: 1}));
        });

        true && it('shoud break cause no function is passed', function(){
            var hooray = new Hooray();
            try {
                hooray.filter();
            } catch (error) {
                expect(error.message).toBe('undefined is not a function');
            }
        });
    });

    describe('findIndex', function(){
        true && it('should return the value of the first index of the hooray that matches the given condition', function(){
            var hooray = new Hooray(1, 2, 5, 10, 20);
            var result = hooray.findIndex(function(v){return v > 3 ? true : false});

            expect(result).toBe(2);

        });

        true && it('should return the value of the first index of the hooray that matches the given condition', function(){
            var hooray = new Hooray(1, 2, 5, 10, 20);
            var result = hooray.findIndex(function(v){return v > 20 ? true : false});

            expect(result).toBe(undefined);

        });

        true && it('should break cause the first parameter is not an hooray', function(){
            var hooray = new Hooray(1, 2, 5, 10, 20);

            try {
                hooray.findIndex();

                throw Error('should not reach this point');
            } catch (error) {
                expect(error.message).toBe('undefined is not a function');
            }
        });
    });

    describe('includes', function(){
        true && it('should return true because the given hooray includes the given variable', function(){
            var hooray = new Hooray(1, 2, 5, 10, 20);
            var variable = 10;

            var result = hooray.includes(variable);

            expect(result).toBeTruthy();
        });

        true && it('should return false because the given hooray not includes the given variable', function(){
            var hooray = new Hooray(1, 2, 5, 10, 20);
            var variable = 30;

            var result = hooray.includes(variable);

            expect(result).toBeFalsy();
        });

        true && it('should return true because the given hooray includes the given variable', function(){
            var hooray = new Hooray(1, 2, 5, 10, 20);
            var variable = 2;

            var result = hooray.includes(variable, 2);

            expect(result).toBeFalsy();
        });

        true && it('should break on index is not a number', function(){
            var hooray = new Hooray(1, 2, 3, 4);
            var variable = 10;
            var index = 'a';

            try {
                    hooray.includes(variable, index);

                    throw Error('should not reach this point');
            } catch (error) {
                expect(error.message).toBe('a is not a number');
            }
        });
    });

    describe('indexOf', function(){
        true && it('should return 3 because is the index where we can find the given variable', function(){
            var hooray = new Hooray(1, 2, 5, 10, 20);
            var variable = 10;

            var result = hooray.indexOf(variable);

            expect(result).toBe(3);
        });

        true && it('should return -1 because can\'t find the given variable starting at the given index', function(){
            var hooray = new Hooray(1, 2, 5, 10, 20);
            var variable = 1;
            var index = 1;

            var result = hooray.indexOf(variable, index);

            expect(result).toBe(-1);
        });

        true && it('should break on a is not a number', function(){
            var hooray = new Hooray();
            var variable = 1;
            var index = 'a';

            try {
                hooray.indexOf(variable, index);

                throw Error('should not reach this point');
            } catch (error) {
                expect(error.message).toBe('a is not a number');
            }
        });
    });

    describe('isHooray', function(){
        true && it('should return true cause hooray is a hooray', function(){
            var hooray = new Hooray(1, 2, 3);

            var result = Hooray.prototype.isHooray(hooray);

            expect(result).toBeTruthy();
        });

        true && it('should return false cause hooray is not a hooray', function(){
            var hooray = 'not an hooray';

            var result = Hooray.prototype.isHooray(hooray);

            expect(result).toBeFalsy();
        });
    });

    describe('join', function(){
        true && it('should join the given hooray with \'+\'', function(){
            var hooray = new Hooray(1, 2, 5, 10, 20);
            var joinSymbol = '+';

            var result = hooray.join(joinSymbol);

            expect(result).toBe('1+2+5+10+20');
        });

        true && it('should join the given hooray with \',\'', function(){
            var hooray = new Hooray(1, 2, 5, 10, 20);
            var joinSymbol = ',';

            var result = hooray.join(joinSymbol);

            expect(result).toBe('1,2,5,10,20');
        });
    });

    describe('lastIndexOf', function(){
        true && it('should return 3 cause is the last index cointaining the given variable', function(){
            var hooray = new Hooray(1, 2, 5, 1, 20);
            var variable = 1;

            var result = hooray.lastIndexOf(variable);

            expect(result).toBe(3);
        });

        true && it('should return 3 cause is the last index cointaining the given variable', function(){
            var hooray = new Hooray('a', 'b', 'c', 3, 4, 'a');
            var variable = 'a';

            var result = hooray.lastIndexOf(variable);

            expect(result).toBe(5);
        });
    });

    describe('map', function(){
        true && it('should return the given hooray transformed with the function operation', function(){
            var hooray = new Hooray(1, 2, 5, 1, 20);

            var result = hooray.map(function(value){return value * 2});

            expect(result).toEqual(jasmine.objectContaining({0:2, 1:4, 2:10, 3:2, 4:40, length:5}));
        });

        true && it('should return the given hooray transformed with the function operation', function(){
            var hooray = new Hooray(1, 2, 5, 1, 20);

            var result = hooray.map(function(value){return value / 2});

            expect(result).toEqual(jasmine.objectContaining({0:0.5, 1:1, 2:2.5, 3:0.5, 4:10, length:5}));
        });

        true && it('should break on undefined is not a function', function(){
            var hooray = new Hooray();

            try {
                hooray.map();

                throw Error('should not reach this point');
            } catch (error) {
                expect(error.message).toBe('undefined is not a function');
            }
        });
    });

    describe('reduce Right', function(){
        true && it('should return 29', function(){
            var hooray = new Hooray(1, 2, 5, 1, 20);

            var result = hooray.reduceRight(function(anterior, actual){ return anterior + actual});

            expect(result).toBe(29);
        });

        true && it('should return Aabcde', function(){
            var hooray = new Hooray('a', 'b', 'c', 'd', 'e');

            var result = hooray.reduceRight(function(anterior, actual){ return anterior + actual});

            expect(result).toBe('edcba');
        });
        true && it('should break on undefined is not a function', function(){
            var hooray = new Hooray();

            try {
                hooray.reduceRight();

                throw Error('should not reach this point');
            } catch (error) {
                expect(error.message).toBe('undefined is not a function');
            }
        });

        true && it('should break on a is not a number', function(){
            var hooray = new Hooray();

            try {
                hooray.reduceRight(function(){}, 'a');

                throw Error('should not reach this point');
            } catch (error) {
                expect(error.message).toBe('a is not a number');
            }
        });
    });

    describe('reduce', function(){
        true && it('should return 29', function(){
            var hooray = new Hooray(1, 2, 5, 1, 20);

            var result = hooray.reduce(function(anterior, actual){ return anterior + actual});

            expect(result).toBe(29);
        });

        true && it('should return abcde', function(){
            var hooray = new Hooray('a', 'b', 'c', 'd', 'e');

            var result = hooray.reduce(function(anterior, actual){ return anterior + actual});

            expect(result).toBe('abcde');
        });

        true && it('should break on undefined is not a function', function(){
            var hooray = new Hooray();

            try {
                hooray.reduce();

                throw Error('should not reach this point');
            } catch (error) {
                expect(error.message).toBe('undefined is not a function');
            }
        });

        true && it('should break on a is not a number', function(){
            var hooray = new Hooray();

            try {
                hooray.reduce(function(){}, 'a');

                throw Error('should not reach this point');
            } catch (error) {
                expect(error.message).toBe('a is not a number');
            }
        });

    });

    describe('reverse', function(){
        true && it('should return {20,1,5,2,1}', function(){
            var hooray = new Hooray(1, 2, 5, 1, 20);

            var result = hooray.reverse();

            expect(result).toEqual(jasmine.objectContaining({0:20, 1:1, 2:5, 3:2, 4:1, length: 5}));
            expect(hooray).toEqual(jasmine.objectContaining({0:20, 1:1, 2:5, 3:2, 4:1, length: 5}));
        });

        true && it('should return {e,d,c,b,a}', function(){
            var hooray = new Hooray('a', 'b', 'c', 'd', 'e');

            var result = hooray.reverse();

            expect(result).toEqual(jasmine.objectContaining({0:'e',1:'d', 2:'c', 3:'b', 4:'a', length: 5}));
            expect(hooray).toEqual(jasmine.objectContaining({0:'e',1:'d', 2:'c', 3:'b', 4:'a', length: 5}));
        });
    });

    describe('shift', function(){
        true && it('should return 1 and hooray modified {2,5,1,20}', function(){
            var hooray = new Hooray(1, 2, 5, 1, 20);
            var result = hooray.shift();

            expect(hooray).toEqual(jasmine.objectContaining({0:2, 1:5, 2:1, 3:20, length:4}));
            expect(result).toBe(1);
        });

        true && it('should return a and hooray modified {b,c,d,e}', function(){
            var hooray = new Hooray('a', 'b', 'c', 'd', 'e');
            var result = hooray.shift();

            expect(hooray).toEqual(jasmine.objectContaining({0:'b', 1:'c', 2:'d', 3:'e', length:4}));
            expect(result).toBe('a');
        });
    });

    describe('slice', function(){
        true && it('should return {5,1,20}', function(){
            var hooray = new Hooray(1, 2, 5, 1, 20);

            var result = hooray.slice(1);

            expect(result).toEqual(jasmine.objectContaining({0:2, 1:5, 2:1, 3:20, length:4}));
            expect(hooray).toEqual(jasmine.objectContaining({0:1, 1:2, 2:5, 3:1, 4:20, length:5}));
        });

        true && it('should return {b,c,d}', function(){
            var hooray = new Hooray('a', 'b', 'c', 'd', 'e');

            var result = hooray.slice(1,4);

            expect(result).toEqual(jasmine.objectContaining({0:'b', 1:'c', 2:'d', length:3}));
            expect(hooray).toEqual(jasmine.objectContaining({0:'a', 1:'b', 2:'c', 3:'d', 4:'e', length:5}));
        });

        true && it('should return {}', function(){
            var hooray = new Hooray('a', 'b', 'c', 'd', 'e');

            var result = hooray.slice(1,'a');

            expect(result).toEqual(jasmine.objectContaining({length: 0}));
            expect(hooray).toEqual(jasmine.objectContaining({0:'a', 1:'b', 2:'c', 3:'d', 4:'e', length:5}));
        });

        true && it('should return {1,2,5,1,20}', function(){
            var hooray = new Hooray(1, 2, 5, 1, 20);

            var result = hooray.slice('a');

            expect(result).toEqual(jasmine.objectContaining({0:1, 1:2, 2:5, 3:1, 4:20, length:5}));
            expect(hooray).toEqual(jasmine.objectContaining({0:1, 1:2, 2:5, 3:1, 4:20, length:5}));
        });
    });

    describe('some', function(){
        true && it('shoud return true cause some element in the hooray matches the function call', function(){
            var hooray = new Hooray(1, 2, 5, 1, 20);

            var result = hooray.some(function(element){return (element===5);});

            expect(result).toBeTruthy();
        });

        true && it('shoud return false cause some element in the hooray matches the function call', function(){
            var hooray = new Hooray('a', 'b', 'c', 'd', 'e');

            var result = hooray.some(function(element){return (element===5);});

            expect(result).toBeFalsy();
        });

        true && it('should break on undefined is not a function', function(){
            var hooray = new Hooray();

            try {
                var result = hooray.some();

                throw Error('should not reach this point');
            } catch (error) {
                expect(error.message).toBe('undefined is not a function');
            }
        });
    });

    describe('sort', function(){
        true && it('should return the hooray modified {1, 1, 2, 5, 20}', function(){
            var hooray = new Hooray(1, 2, 5, 1, 20);

            hooray.sort();

            expect(hooray).toEqual(jasmine.objectContaining({0:1, 1:1, 2:2, 3:5, 4:20, length:5}));
        });

        true && it('should return the hooray modified {1, 2, a, b, c, d}', function(){
            var hooray = new Hooray('a', 'd', 2, 'c', 'b', 1);

            hooray.sort();

            expect(hooray).toEqual(jasmine.objectContaining({0:1, 1:2, 2:'a', 3:'b', 4:'c', 5:'d', length:6}));
        });
    });

    describe('splice', function(){
        true && it('should return an hooray modified {1, 2, 3,4,5,6,7,8,9} and {} as a result', function(){
            var hooray = new Hooray(1, 2, 3, 4, 5, 6, 7, 8, 9);

            var result = hooray.splice();

            expect(hooray).toEqual(jasmine.objectContaining({0:1, 1:2, 2:3, 3:4, 4:5, 5:6, 6:7, 7:8, 8:9, length:9}));
            expect(result).toBeTruthy();

        });
        true && it('should return an hooray modified {1, 2, 3,4,5,6,7,8,9} and {} as a result', function(){
            var hooray = new Hooray(1, 2, 3, 4, 5, 6, 7, 8, 9);

            var result = hooray.splice(20);

            expect(hooray).toEqual(jasmine.objectContaining({0:1, 1:2, 2:3, 3:4, 4:5, 5:6, 6:7, 7:8, 8:9, length:9}));
            expect(result).toBeTruthy();

        });
        true && it('should return an hooray modified {1,2,3,4,5,6,7,8,9} and {} as a result', function(){
            var hooray = new Hooray(1, 2, 3, 4, 5, 6, 7, 8, 9);

            var result = hooray.splice(1, 0);

            expect(hooray).toEqual(jasmine.objectContaining({0:1, 1:2, 2:3, 3:4, 4:5, 5:6, 6:7, 7:8, 8:9, length:9}));
            expect(result).toBeTruthy();

        });
        true && it('should return an hooray modified {1, 2, 3} and {4,5,6,7,8,9} as a result', function(){
            var hooray = new Hooray(1, 2, 3, 4, 5, 6, 7, 8, 9);

            var result = hooray.splice(3);

            expect(hooray).toEqual(jasmine.objectContaining({0:1, 1:2, 2:3, length:3}));
            expect(result).toEqual(jasmine.objectContaining({0:4, 1:5, 2:6, 3:7, 4:8, 5:9, length: 6}));

        });
        true && it('should return an hooray modified {1, a, 2, 3, 4, 5, 6, 7, 8, 9} and {} as a result', function(){
            var hooray = new Hooray(1, 2, 3, 4, 5, 6, 7, 8, 9);

            var result = hooray.splice(1, 2, 'a');

            expect(hooray).toEqual(jasmine.objectContaining({0:1, 1:'a', 2:3, 3:4, 4:5, 5:6, 6:7, 7:8, 8:9, length:9}));
            expect(result).toEqual(jasmine.objectContaining({0:2, length:1}));
        });

        true && it('should return an hooray modified {a,b,1,2,3}', function(){
            var hooray = new Hooray('a', 'b', 'c', 'd', 'e');

            var result = hooray.splice(2, 3, 1, 2, 3);

            expect(hooray).toEqual(jasmine.objectContaining({0:'a', 1:'b', 2:1, 3:2, 4:3, length:5}));
            expect(result).toEqual(jasmine.objectContaining({0:'c', 1:'d', 2:'e', length:3}));
        });

        true && it('should break on a is not  number', function(){
            var hooray = new Hooray();

            try {
                hooray.splice('a');

                throw Error('should not reach this point');
            } catch (error) {
                expect(error.message).toBe('a is not a number');
            }
        });

        true && it('should break on a is not  number', function(){
            var hooray = new Hooray();

            try {
                hooray.splice(0, 'a');

                throw Error('should not reach this point');
            } catch (error) {
                expect(error.message).toBe('a is not a number');
            }
        });
    });

});
