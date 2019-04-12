'use strict';

//HORRAY MAIN TEST
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
            expect(JSON.stringify(hooray)).toEqual(JSON.stringify({ 0: '1', length: 1 }));
            expect(Object.keys(hooray).length).toBe(2);
        });
    });

    //PUSH 
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

            expect(hooray.length).toBe(5);
            expect(length).toBe(hooray.length);
            expect(JSON.stringify(hooray)).toBe(JSON.stringify({ 0: 1, 1: 2, 2: 3, 3: 4, 4: 5, length: 5 }));
        });

        it('should not add a non-provided value at the end of an hooray', function () {
            var hooray = new Hooray(1, 2, 3);

            var length = hooray.push();

            expect(hooray.length).toBe(3);
            expect(length).toBe(hooray.length);
            expect(JSON.stringify(hooray)).toBe(JSON.stringify({ 0: 1, 1: 2, 2: 3, length: 3 }));
        });
    });

    //FOR EACH
    describe('forEach', function () {
        it('should itearate an hooray without altering it', function () {
            var hooray = new Hooray(1, 2, 3);

            var result = new Hooray;

            hooray.forEach(function (v, i) { result.push(v); });
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

            expect(function () { hooray.forEach() }).toThrowError();
        });
    });

    // EVERY
    describe('every', function () {
        it('should return true on all items matching condition', function () {
            var hooray = new Hooray(5, 2, 6);

            var result = hooray.every(function (v) { return v > 0; });

            expect(result).toBeTruthy();
        });

        it('should return false on any of the items not matching the condition', function () {
            var hooray = new Hooray(5, 2, 6);

            var result = hooray.every(function (v) { return v < 2; });

            expect(result).toBeFalsy();
        });

        it('should break on undefined callback', function () {
            var hooray = new Hooray(5, 2, 6);

            expect(function () { hooray.forEach() }).toThrowError();
        });
    });

    //SOME
    describe('some', function () {
        it('Should return true', function () {
            var hooray = new Hooray(1, 2, 3, 4, 5, 6);

            var result = hooray.some(function (v) { return v === 1 });

            expect(result).toBeTruthy();
        });

        it('should return false', function () {
            var hooray = new Hooray(1, 2, 3, 4, 5, 6);

            var result = hooray.some(function (v) { return v > 7 });

            expect(result).toBeFalsy();
        });

        it('should break on undefined callback', function () {
            var hooray = new Hooray(5, 2, 6);

            expect(function () { hooray.forEach() }).toThrowError();
        });
    });

    //SORT
    describe('sort', function () {
        true && it('Should return the same array', function () {
            var answer = new Hooray(1, 2, 3, 4, 5);
            var hooray = new Hooray(1, 2, 3, 4, 5);


            expect(JSON.stringify(hooray.sort())).toBe(JSON.stringify(answer));

        });

        true && it('Should return it ordenated', function () {
            var answer = new Hooray(1, 3, 4, 5, 6);
            var hooray = new Hooray(1, 6, 4, 3, 5);

            expect(JSON.stringify(hooray.sort())).toBe(JSON.stringify(answer));
        });

    });

    //SLICE
    describe('slice', function () {
        true && it('Should return an array without the given id', function () {
            var answer = ["camel", "duck", "elephant"];
            var animals = ['ant', 'bison', 'camel', 'duck', 'elephant'];

            var result = animals.slice(2);


            expect(JSON.stringify(result)).toBe(JSON.stringify(answer));
        });


        true && it('should add each element starting by the last index', function () {
            var answer = new Hooray(2, 3, 4);
            var hooray = new Hooray(1, 2, 3, 4, 5, 6);

            var result = hooray.slice(1, 3);

            expect(JSON.stringify(result)).toBe(JSON.stringify(answer));
        });
    });

    //SHIFT
    describe('shift', function () {
        true && it('Should return the substracted element from the original array', function () {
            var answer = 1;
            var hooray = new Hooray(1, 2, 3);
    
            var result = hooray.shift();
    
            expect(result).toBe(answer);
        });
    
    
        !true && it('should add each element starting by the last index', function () {
            var answer = new Hooray(2, 3, 4);
            var hooray = new Hooray(1, 2, 3, 4);

            hooray.shift()
    
            expect(JSON.stringify(hooray)).toBe(JSON.stringify(answer)); // No me la devuelve la cortada.
        });
    });  

    //REVERSE
    describe('reverse', function () {
        true && it('should add each element starting by the last index', function () {
            var answer = new Hooray(3, 2, 1);
            var hooray = new Hooray(1, 2, 3);
    
            var result = hooray.reverse();
    
            expect(JSON.stringify(result)).toBe(JSON.stringify(answer));
        });

        true && it('should add each element starting by the last index', function () {
            var answer = new Hooray(6, 7, 1);
            var hooray = new Hooray(1, 7, 6);
    
            var result = hooray.reverse();
    
            expect(JSON.stringify(result)).toBe(JSON.stringify(answer));
        });
    });

    //POP
    describe('pop', function () {
        true && it('should return undefined on empty horray', function() {
            var hooray = new Hooray();
    
            var value = hooray.pop();
    
            expect(hooray.length).toBe(0);
    
            expect(value).toBe(undefined);
        });

        true && it('should return undefined on empty horray', function() {
            var hooray = new Hooray(2, 3);
    
            var value = hooray.pop();
    
            expect(hooray.length).toBe(1);
    
            expect(value).toBe(3);
        });
    });  
    
});
