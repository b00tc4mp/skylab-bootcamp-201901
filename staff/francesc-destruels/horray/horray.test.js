'use strict';

//HORRAY MAIN TEST
describe('hooray', function () {
    var hooray, hooray2, hooray3, array, array2, array3, r = Math.floor(Math.random()*500 -3), r2 = Math.floor(Math.random()*700), r3 = Math.floor(Math.random()*50) > 25? (Math.floor(Math.random())*50).toString() : Math.floor(Math.random()*50) 

    beforeEach(function(){
        var v, w, x, y, z;

        v = Math.floor(Math.random()*100);
        w = Math.floor(Math.random()*120);
        x = Math.floor(Math.random()*50);

        if (x < 25){
            y = Math.floor(Math.random()*25);
        }

        if (y > 20){
            z = Math.floor(Math.random()*500);
        }

        if (y !== undefined && z !== undefined){
            hooray = new Hooray(v, w, x, y, z);
            hooray2 = new Hooray(w, x, y, z, v)
            array = [v, w, x, y, z];
            array2 = [w, x, y, z, v];
            hooray3 = new Hooray(x, v, x, y, y);
            array3 = [x, v, x, y, y];
            

        }else  if (y !== undefined){
            hooray = new Hooray(v, w, x, y);
            array = [v, w, x, y];
            hooray2 = new Hooray(v, w, x, y);
            array2 = [v, w, x, y]
            hooray3 = new Hooray(v, x, x, y);
            array3 = [v, x, x, y];
        } else {
            hooray = new Hooray(v, w, x);
            array = [v, w, x];
            hooray2 = new Hooray(v, v, x);
            array2 = [v, v, x];
            hooray3 = new Hooray(x, w, x);
            array3 = [x, w, x];
        }
    })

    //CONSTRUCTOR BDD
    describe('constructor', function () {

        true && it('should construct an empty hooray when no arguments', function () {
            hooray = new Hooray;

            expect(hooray.length).toBe(0);
            expect(Object.keys(hooray).length).toBe(1);
        });

        true && it('should construct a non-empty hooray when existing arguments', function () {

            expect(hooray.length).toBe(array.length);
            expect(hooray).toEqual(jasmine.objectContaining(array));
            expect(Object.keys(hooray).length).toBe(Object.keys(array).length +1);
        });

        true && it('should construct an empty hooray with length equal to when only one numeric argument', function () {
            hooray = new Hooray(r);
            array = new Array(r);

            expect(hooray.length).toBe(array.length);
            expect(Object.keys(hooray).length).toBe(Object.keys(array).length +1);
        });

        true && it('should construct a non-empty hooray with only one non-numeric argument', function () {

            hooray = new Hooray(r.toString());
            array = new Array(r.toString());

            expect(hooray.length).toBe(array.length);
            expect(hooray).toEqual(jasmine.objectContaining(array));
            expect(Object.keys(hooray).length).toBe(Object.keys(array).length +1);
        });
    });

    //PUSH BDD
    describe('push', function () {
        true && it('should add a value at the end of an hooray', function () {

            hooray.push(r);
            array.push(r);

            expect(hooray.length).toBe(array.length);
            expect(hooray).toEqual(jasmine.objectContaining(array));
        });

        true && it('should add multiple values at the end of an hooray in order', function () {
            hooray.push(r, r2);
            array.push(r, r2);

            expect(hooray.length).toBe(array.length);
            expect(hooray).toEqual(jasmine.objectContaining(array));
        });

        true && it('should not add a non-provided value at the end of an hooray', function () {
            hooray.push();
            array.push();

            expect(hooray.length).toBe(array.length);
            expect(hooray).toEqual(jasmine.objectContaining(array));
        });
    });

    //FOR EACH BDD
    describe('forEach', function () {
        true && it('should itearate an hooray without altering it', function () {
            hooray.forEach(function (v, i) { return v; });
            array.forEach(function (v, i) { return v; });

            expect(hooray.length).toBe(array.length);
            expect(hooray).toEqual(jasmine.objectContaining(array));
            expect(Object.keys(hooray).length).toBe(Object.keys(array).length +1);
        });

        true && it('should do nothing if hooray has not content', function () {
            hooray = new Hooray();
            array = [];

            hooray.forEach(function (v, i) { return v; });
            array.forEach(function (v, i) { return v; });

            expect(hooray.length).toBe(array.length);
            expect(hooray).toEqual(jasmine.objectContaining(array));
            expect(Object.keys(hooray).length).toBe(Object.keys(array).length +1);
        });

        true && it('should break on undefined callback', function () {
            expect(function () { hooray.forEach() }).toThrowError();
        });
    });

    //EVERY BDD
    describe('every', function () {
        true && it('should return true on all items matching condition', function () {
            expect(hooray.every(function (v) { return v >= 0; })).toBeTruthy();
        });

        true && it('should return false on any of the items not matching the condition', function () {
            expect(hooray.every(function (v) { return v < 2; })).toBeFalsy();

        });

        true && it('should break on undefined callback', function () {
            expect(function () { hooray.forEach() }).toThrowError();

        });
    });

    //SOME BDD
    describe('some', function () {
        true && it('Should return true', function () {
            expect(hooray.some(function (v) { return v > v -1})).toBeTruthy();
            expect(array.some(function (v) { return v > v -1})).toBeTruthy();

        });

        true && it('should return false', function () {
            expect(hooray.some(function (v) { return v > v +1 })).toBeFalsy();
            expect(array.some(function (v) { return v > v +1 })).toBeFalsy();
        });

        true && it('should break on undefined callback', function () {
            expect(function () { hooray.forEach() }).toThrowError();

        });
    });

    //SORT NOT BDD BECAUSE THE ARRAY SORT() METOD DO NOT WORK THE SAME WAY (it does 1, 12, 2, not 1, 2, 12);
    describe('sort', function () {
        true && it('Should return the same array', function () {
            var answer = new Hooray(1, 2, 3, 4, 5);
            hooray = new Hooray(1, 2, 3, 4, 5);


            expect(hooray.sort()).toEqual(answer);
        });

        true && it('Should return it ordenated', function () {
            
            var answer = new Hooray(1, 3, 4, 5, 6);
            hooray = new Hooray(1, 6, 4, 3, 5);

            expect(hooray.sort()).toEqual(answer);
        });

    });

    //SLICE BDD
    describe('slice', function () {
        true && it('Should return an array without the given id', function () {
            array =  ['ant', 'bison', 'camel', 'duck', 'elephant'];
            hooray = new Hooray('ant', 'bison', 'camel', 'duck', 'elephant');

            expect(hooray.length).toBe(array.length);
            expect(hooray).toEqual(jasmine.objectContaining(array));
        });


        true && it('should add each element starting by the last index', function () {
            array = [1, 2, 3, 4, 5, 6];
            hooray = new Hooray(1, 2, 3, 4, 5, 6);

            expect(hooray.length).toBe(array.length);
            expect(hooray).toEqual(jasmine.objectContaining(array));
        });
    });

    //SHIFT BDD
    describe('shift', function () {
        true && it('Should return the substracted element from the original array', function () {
            expect(hooray.shift()).toBe(array.shift());
            expect(hooray.length).toBe(array.length);

        });


        true && it('should add each element starting by the last index', function () {
            expect(hooray.shift()).toEqual(array.shift()); 
            expect(hooray.length).toBe(array.length);

        });
    });

    //REVERSE BDD
    describe('reverse', function () {
        true && it('should reverse the hooray #1', function () {
            expect(hooray.reverse()).toEqual(jasmine.objectContaining(array.reverse()));
            expect(hooray.length).toBe(array.length);

        });

        true && it('should reverse the hooray #2', function () {
            expect(hooray.reverse()).toEqual(jasmine.objectContaining(array.reverse()));
            expect(hooray.length).toBe(array.length);

        });
    });

    //POP BDD
    describe('pop', function () {
        true && it('should return undefined on empty horray', function () {
            hooray = new Hooray();

            expect(hooray.length).toBe(0);
            expect(hooray.pop()).toBe(undefined);

        });

        true && it('should return the array shortened and the value of the last index', function () {
            expect(hooray.pop()).toBe(array.pop());
            expect(hooray.length).toBe(array.length);

        });
    });

    //FILTER BDD
    describe('filter', function () {
        true && it('should filter the values matching the callback #1', function () {
            expect(hooray.filter(function (v) { return v.length > 50})).toEqual(jasmine.objectContaining(array.filter(function (v) { return v.length > 50})));
            expect(hooray.length).toBe(array.length);

        });

        true && it('should filter the values matching the callback #2', function () {
            expect(hooray.filter(function (v) { return v.length < 50})).toEqual(jasmine.objectContaining(array.filter(function (v) { return v.length < 50})));
            expect(hooray.length).toBe(array.length);

        });

        true && it('should break on undefined callback', function () {
            expect(function () { hooray.filter() }).toThrowError();

        });
    });

    //MAP BDD
    describe('map', function () {
        true && it('should break on undefined callback', function () {
            expect(function () { hooray.map() }).toThrowError();

        });

        true && it('should multiply every element for three', function () {
            expect(hooray.map(function (v) { return v * 3 })).toEqual(jasmine.objectContaining(array.map(function (v) { return v * 3 })));

        });

        true && it('should add 5 to each element', function () {
            expect(hooray.map(function (v) { return v + 5})).toEqual(jasmine.objectContaining(array.map(function (v) { return v + 5 })));

        });
    });

    //INDEX OF "NO BDD PARA CONCRETAR";
    describe('indexof', function () {
        true && it('should return the first index for maching element', function () {
            array = [1, 2, 1, 3, 1];
            hooray = new Hooray(1, 2, 1, 3, 1);

            expect(hooray.indexof(1)).toBe(array.indexOf(1));
        });

        true && it('should should return the first element for matching element looking from given index', function () {
            array = [1, 2, 1, 3, 1];
            hooray = new Hooray(1, 2, 1, 3, 1);

            expect(hooray.indexof(1, 3)).toBe(array.indexOf(1, 3));
        });

        true && it('should give -1 because there is no match', function () {
            array = [1, 2, 1, 3, 1];
            hooray = new Hooray(1, 2, 1, 3, 1);

            expect(hooray.indexof(6)).toBe(array.indexOf(6));
        });
    });

    //LAST INDEX OF "NO BDD PARA CONCRETAR";
    describe('lastindexof', function () {
        true && it('should return the last index for matching elements', function () {
            array = [1, 2, 3, 4, 3, 6, 7, 8, 4, 3];
            hooray = new Hooray(1, 2, 3, 4, 3, 6, 7, 8, 4, 3);

            expect(hooray.lastIndexOf(3)).toBe(array.lastIndexOf(3));

        });

        true && it('should return -1 becuase no matching', function () {
            array = ["hola", "adios", "perro"];
            hooray = new Hooray("hola", "adios", "perro");

            expect(hooray.lastIndexOf("gato")).toBe(array.lastIndexOf("gato"));
        });
    });

    //IS HOORAY BDD
    describe('ishooray', function () {
        true && it('should return true because it is a hooray', function () {
            expect(Hooray.isHooray(hooray)).toBeTruthy();

        });

        true && it('should return false because it is not a hooray', function () {
            expect(Hooray.isHooray(r3)).toBeFalsy();

        });
    });

    //JOIN BDD
    describe('join', function () {
        true && it('should join every value directly', function () {
            expect(hooray.join("")).toBe(array.join(""));

        });

        true && it('shouldjoin values with an space', function () {
            expect(hooray.join(r3)).toBe(array.join(r3));

        });
    });

    //SPLICE BDD
    describe('splice', function () {
        true && it('Should return the array with the element introduced on the given index', function () {
            expect(hooray.splice(2, 0, "cabra")).toEqual(jasmine.objectContaining(array.splice(2, 0, "cabra")));
            expect(hooray.length).toBe(array.length);
        });
            
        true && it('return the array with the element introduced on the given index', function () {
            expect(hooray.splice(2, 1, "cabra")).toEqual(jasmine.objectContaining(array.splice(2, 1, "cabra")));
            expect(hooray.length).toBe(array.length);
        });

        true && it('should break on undefined callback', function () {
            expect(function () { hooray.splice() }).toThrowError();
        });
    });

    //REDUCE BDD
    describe('reduce', function () {
        true && it('should add all the elements', function () {
            expect(hooray.reduce(function (acc, value) { return acc + value })).toBe(array.reduce(function (acc, value) { return acc + value }));
        });

        true && it('should add add all elements plus 2', function () {
            expect(hooray.reduce(function (acc, value) { return acc + value }, 2)).toBe(array.reduce(function (acc, value) { return acc + value }, 2));
        });

        true && it('should break on undefined callback', function () {
            expect(function () { hooray.reduce() }).toThrowError();

        });
    });

    //REDUCE RIGHT BDD
    describe('reduce right', function () {
        true && it('should add all the elements', function () {
            expect(hooray.reduceRight(function (acc, value) { return acc + value })).toBe(array.reduceRight(function (acc, value) { return acc + value }));
        });

        true && it('should add add all elements plus 2', function () {
            expect(hooray.reduceRight(function (acc, value) { return acc + value }, 2)).toBe(array.reduceRight(function (acc, value) { return acc + value }, 2));
        });

        true && it('should break on undefined callback', function () {
            expect(function () { hooray.reduceRight() }).toThrowError();
            
        });
    });

    //FILL BDD
    describe('fill', function () {
        true && it('should fill the array with the value given', function () {
            expect(hooray.fill(r)).toEqual(jasmine.objectContaining(array.fill(r)));

        });

        true && it('should fill the array with the value given starting on the given index', function () {
            expect(hooray.fill(r, 2)).toEqual(jasmine.objectContaining(array.fill(r, 2)));

        });
    });

    //CONCAT BDD
    describe('concat', function () {
        true && it('should return an array with all items concadenated', function () {
            expect(hooray.concat(hooray2, hooray3)).toEqual(jasmine.objectContaining(array.concat(array2, array3)));

        });
    });
});
