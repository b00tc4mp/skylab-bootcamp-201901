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

    //PUSH 
    describe('push', function () {
        it('should add a value at the end of an hooray', function () {
            var hooray = new Hooray(1, 2, 3);
            var result = new Hooray(1, 2, 3, 4);

            var length = hooray.push(4);

            expect(hooray.length).toBe(4);
            expect(length).toBe(hooray.length);
            expect(hooray).toEqual(result);
        });

        it('should add multiple values at the end of an hooray in order', function () {
            var hooray = new Hooray(1, 2, 3);
            var result = new Hooray(1, 2, 3, 4, 5)

            var length = hooray.push(4, 5);

            expect(hooray.length).toBe(5);
            expect(length).toBe(hooray.length);
            expect(hooray).toEqual(result);
        });

        it('should not add a non-provided value at the end of an hooray', function () {
            var hooray = new Hooray(1, 2, 3);

            var length = hooray.push();

            expect(hooray.length).toBe(3);
            expect(length).toBe(hooray.length);
            expect(hooray).toEqual(jasmine.objectContaining({ 0: 1, 1: 2, 2: 3, length: 3 }));
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

            expect(result).toEqual(hooray);

            var expected = new Hooray(1, 2, 3);

            expect(hooray).toEqual(expected);
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

    //EVERY
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


            expect(hooray.sort()).toEqual(answer);

        });

        true && it('Should return it ordenated', function () {
            var answer = new Hooray(1, 3, 4, 5, 6);
            var hooray = new Hooray(1, 6, 4, 3, 5);

            expect(hooray.sort()).toEqual(answer);
        });

    });

    //SLICE
    describe('slice', function () {
        true && it('Should return an array without the given id', function () {
            var answer = new Hooray("camel", "duck", "elephant");
            var hooray = new Hooray('ant', 'bison', 'camel', 'duck', 'elephant');

            var result = hooray.slice(2);

            expect(result).toEqual(answer);
        });


        true && it('should add each element starting by the last index', function () {
            var answer = new Hooray(2, 3, 4);
            var hooray = new Hooray(1, 2, 3, 4, 5, 6);

            var result = hooray.slice(1, 3);

            expect(result).toEqual(answer);
        });
    });

    //SHIFT !!!
    describe('shift', function () {
        true && it('Should return the substracted element from the original array', function () {
            var answer = 1;
            var hooray = new Hooray(1, 2, 3);

            var result = hooray.shift();

            expect(result).toBe(answer);
        });


        true && it('should add each element starting by the last index', function () {
            var answer = new Hooray(2, 3, 4);
            var hooray = new Hooray(1, 2, 3, 4);

            hooray.shift()

            expect(hooray).toEqual(answer); // No me la devuelve la cortada.
        });
    });

    //REVERSE
    describe('reverse', function () {
        true && it('should add each element starting by the last index', function () {
            var answer = new Hooray(3, 2, 1);
            var hooray = new Hooray(1, 2, 3);

            var result = hooray.reverse();

            expect(result).toEqual(answer);
        });

        true && it('should add each element starting by the last index', function () {
            var answer = new Hooray(6, 7, 1);
            var hooray = new Hooray(1, 7, 6);

            var result = hooray.reverse();

            expect(result).toEqual(answer);
        });
    });

    //POP
    describe('pop', function () {
        true && it('should return undefined on empty horray', function () {
            var hooray = new Hooray();

            var value = hooray.pop();

            expect(hooray.length).toBe(0);

            expect(value).toBe(undefined);
        });

        true && it('should return the array shortened and the value of the last index', function () {
            var hooray = new Hooray(2, 3);

            var value = hooray.pop();

            expect(hooray.length).toBe(1);

            expect(value).toBe(3);
        });
    });

    //FILTER
    describe('filter', function () {
        true && it('should fill the array with the value given', function () {
            var answer = new Hooray("carrot", "tomato", "minishcap", "alloyd");
            var hooray = new Hooray("hair", "carrot", "tomato", "sun", "minishcap", "alloyd");

            var result = hooray.filter(function (v) { return v.length > 5 });

            expect(result).toEqual(answer);
        });

        true && it('should fill the array with the value given starting on the given index', function () {
            var answer = new Hooray("minishcap");
            var hooray = new Hooray("hair", "carrot", "tomato", "sun", "minishcap", "alloyd");

            var result = hooray.filter(function (v) { return v.length - 2 > 5 });

            expect(result).toEqual(answer);
        });

        true && it('should break on undefined callback', function () {
            var hooray = new Hooray(1, 2, 3);

            expect(function () { hooray.filter() }).toThrowError();
        });
    });

    //MAP
    describe('map', function () {
        true && it('should break on undefined callback', function () {
            var hooray = new Hooray(1, 2, 3);

            expect(function () { hooray.map() }).toThrowError();
        });

        true && it('should multiply every element for three', function () {
            var answer = new Hooray(3, 6, 9, 12, 15, 18);
            var hooray = new Hooray(1, 2, 3, 4, 5, 6);

            var result = hooray.map(function (v) { return v * 3 });

            expect(result).toEqual(answer);
        });

        true && it('should add 5 to each element', function () {
            var answer = new Hooray(6, 7, 8, 9, 10, 11);
            var hooray = new Hooray(1, 2, 3, 4, 5, 6);

            var result = hooray.map(function (v) { return v + 5 });

            expect(result).toEqual(answer);
        });

    });

    //INDEX OF
    describe('indexof', function () {
        true && it('should return the first index for maching element', function () {
            var answer = 0;
            var hooray = new Hooray(1, 2, 1, 3, 1);

            var result = hooray.indexof(1);

            expect(result).toBe(answer);
        });

        true && it('should should return the first element for matching element looking from given index', function () {
            var answer = 4;
            var hooray = new Hooray(1, 2, 1, 3, 1);

            var result = hooray.indexof(1, 3);

            expect(result).toBe(answer);
        });

        true && it('should give -1 because there is no match', function () {
            var answer = -1;
            var hooray = new Hooray(1, 2, 1, 3, 1);

            var result = hooray.indexof(6);

            expect(result).toBe(answer);
        });
    });

    //LAST INDEX OF
    describe('lastindexof', function () {
        true && it('should return the last index for matching elements', function () {
            var answer = 9;
            var hooray = new Hooray(1, 2, 3, 4, 3, 6, 7, 8, 4, 3);

            var result = hooray.lastindexof(3);

            expect(result).toEqual(answer);
        });

        true && it('should return -1 becuase no matching', function () {
            var answer = -1;
            var hooray = new Hooray("hola", "adios", "perro");

            var result = hooray.lastindexof("gato");

            expect(result).toBe(answer);
        });
    });

    //IS HOORAY
    describe('ishooray', function () {
        true && it('should return true because it is a hooray', function () {
            var hooray = new Hooray(1, 2, 1, 3, 1);

            var result = Hooray.isHooray(hooray);

            expect(result).toBeTruthy();
        });

        true && it('should return false because it is not a hooray', function () {
            var a = 3;

            var result = Hooray.isHooray(a);

            expect(result).toBeFalsy();
        });
    });

    //JOIN
    describe('join', function () {
        true && it('should join every value directly', function () {
            var answer = "666"
            var hooray = new Hooray(6, 6, 6);

            var result = hooray.join("");

            expect(result).toBe(answer);
        });

        true && it('shouldjoin values with an space', function () {
            var answer = "calle 2 puerta 4"
            var hooray = new Hooray("calle", 2, "puerta", 4);

            var result = hooray.join(" ");

            expect(result).toBe(answer);
        });

        true && it('should join with backslashes', function () {
            var answer = "solo/2/3"
            var hooray = new Hooray("solo", 2, 3);

            var result = hooray.join("/");
            expect(result).toBe(answer);
        });
    });

    //SPLICE
    describe('splice', function () {
        true && it('Should return the array with the element introduced on the given index', function () {
            var answer = new Hooray('ant', 'bison', 'cabra', 'camel', 'duck', 'elephant');
            var hooray = new Hooray('ant', 'bison', 'camel', 'duck', 'elephant');

            var result = hooray.splice(2, 0, "cabra");

            expect(result).toEqual(answer);
        });


        true && it('should add each element starting by the last index', function () {
            var answer = new Hooray('ant', 'bison', 'cabra', 'duck', 'elephant');
            var hooray = new Hooray('ant', 'bison', 'camel', 'duck', 'elephant');

            var result = hooray.splice(2, 1, "cabra");

            expect(result).toEqual(answer);
        });


        it('should break on undefined callback', function () {
            var hooray = new Hooray(5, 2, 6);

            expect(function () { hooray.splice() }).toThrowError();
        });
    });

    //REDUCE
    describe('reduce', function () {
        true && it('should add all the elements', function () {
            var answer = 21;
            var hooray = new Hooray(1, 2, 3, 4, 5, 6);

            var result = hooray.reduce(function (acc, value) { return acc + value });

            expect(result).toBe(answer);
        });

        true && it('should add add all elements plus 2', function () {
            var answer = 23;
            var hooray = new Hooray(1, 2, 3, 4, 5, 6);

            var result = hooray.reduce(function (acc, value) { return acc + value }, 2);

            expect(result).toBe(answer);
        });

        true && it('should break on undefined callback', function () {
            var hooray = new Hooray(1, 2, 3, 4, 5, 6);

            expect(function () { hooray.reduce() }).toThrowError();
        });
    });

    //REDUCE RIGHT
    describe('reduceright', function () {
        true && it('should add each element starting by the last index', function () {
            var answer = 21;
            var hooray = new Hooray(1, 2, 3, 4, 5, 6);

            var result = hooray.reduceright(function (acc, value) { return acc + value });

            expect(result).toBe(answer);
        });

        true && it('should add each element starting by the last index', function () {
            var answer = 23;
            var hooray = new Hooray(1, 2, 3, 4, 5, 6);

            var result = hooray.reduceright(function (acc, value) { return acc + value }, 2);

            expect(result).toBe(answer);
        });

        true && it('should break on undefined callback', function () {
            var hooray = new Hooray(1, 2, 3, 4, 5, 6);

            expect(function () { hooray.reduceright() }).toThrowError();
        });
    });

    //FILL
    describe('fill', function () {
        true && it('should fill the array with the value given', function () {
            var answer = new Hooray(4, 4, 4, 4, 4, 4, 4);
            var hooray = new Hooray(1, 2, 3, 4, 5, 6, 7);

            var result = hooray.fill(4);

            expect(result).toEqual(answer);
        });

        true && it('should fill the array with the value given starting on the given index', function () {
            var answer = new Hooray(1, 2, 3, 4, 4, 4, 4);
            var hooray = new Hooray(1, 2, 3, 4, 5, 6, 7);

            var result = hooray.fill(4, 3);

            expect(result).toEqual(answer);
        });
    });

    //CONCAT
    describe('concat', function () {
        true && it('should return an array with all items concadenated', function () {
            var hooray = new Hooray("The", "world", "is");
            var hoorayX = new Hooray("a", "fuckin*", "hell");
            var hoorayY = new Hooray(6, 6, 6);

            var result = hooray.concat(hoorayX, hoorayY);

            var answer = new Hooray("The", "world", "is", "a", "fuckin*", "hell", 6, 6, 6);

            expect(result).toEqual(answer);
        });

        true && it('should return an array with all items concadenated', function () {
            var answer = new Hooray("The", "world", "is", 6, 6, 6)

            var hooray = new Hooray("The", "world", "is");
            var hoorayX = new Hooray(6, 6, 6);

            var result = hooray.concat(hoorayX);

            expect(result).toEqual(answer);
        });
    });
});
