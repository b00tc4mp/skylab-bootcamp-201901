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
        !true && it('should add a value at the end of an hooray', function () {
            var hooray = new Hooray(1, 2, 3);

            var length = hooray.push(4);

            expect(hooray.length, 4);
            expect(length, hooray.length);
            expect(hooray, { 0: 1, 1: 2, 2: 3, 3: 4, length: 4 }, true);
        });

        !true && it('should add multiple values at the end of an hooray in order', function () {
            var hooray = new Hooray(1, 2, 3);

            var length = hooray.push(4, 5);

            expect(hooray.length, 5);
            expect(length, hooray.length);
            expect(hooray, { 0: 1, 1: 2, 2: 3, 3: 4, 4: 5, length: 5 }, true);
        });

        !true && it('should not add a non-provided value at the end of an hooray', function () {
            var hooray = new Hooray(1, 2, 3);

            var length = hooray.push();

            expect(hooray.length, 3);
            expect(length, hooray.length);
            expect(hooray, { 0: 1, 1: 2, 2: 3, length: 3 }, true);
        });
    });

    describe('forEach', function () {
        it('should itearate an hooray without altering it', function () {
            var hooray = new Hooray(1, 2, 3);
            var expected = JSON.stringify({ 0: 1, 1: 2, 2: 3, length: 3 });

            var result = new Hooray;

            hooray.forEach(function (v) { result.push(v); });
            // 0 1
            // 1 2
            // 2 3

            expect(JSON.stringify(hooray)).toEqual(expected)
        });

        it('should do nothing if hooray has not content', function () {
            var hooray = new Hooray;

            var result = new Hooray;

            hooray.forEach(function (v, i) { result.push(v); });

            expect(result.length).toBe(0)
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

    describe("filter", function () {
        it("should return a new array with the elements that pass the test", function () {
            var hooray = new Hooray('spray', 'limit', 'elite', 'exuberant', 'destruction', 'present');
            var expectedResult = JSON.stringify({ 0: 'exuberant', 1: 'destruction', 2: 'present', length: 3 })

            var result = hooray.filter(function (element) {
                if (element.length > 6) {
                    return true
                } else {
                    return false
                }
            });

            expect(JSON.stringify(result)).toBe(expectedResult)
        })
        it('should break on undefined callback', function () {
            var hooray = new Hooray("h", "b", "c");

            try {
                hooray.filter();

                throw Error('should not reach this point');
            } catch (error) {
                expect(error.message).toBe('undefined is not a function');
            }
        });
        it('should break if callback is not a function', function () {
            var hooray = new Hooray(5, 6, 7);
            var notFunction = 2;
            try {
                hooray.filter(notFunction);

                throw Error('should not reach this point');
            } catch (error) {
                expect(error.message).toBe('2 is not a function');
            }
        });
    });

    describe("indexof", function () {
        it("should return the index of the element that you are looking for", function () {
            var hooray = new Hooray(1, 2, 3, 4, 5, 6, 7);
            var number = 2;
            var expectedResult = 1;

            var result = hooray.indexOf(number);
            expect(result).toBe(expectedResult);
        });
        it('should break on undefined callback', function () {
            var hooray = new Hooray(1, 2, 3);
            var notANumber = "o";
            try {
                hooray.indexOf(notANumber);

                throw Error('should not reach this point');
            } catch (error) {
                expect(error.message).toBe('o is not a number.');
            }
        });
    });
    describe("concat", function () {
        it("it should merge two or more arrays", function () {
            var hooray1 = new Hooray("h", "h", "y");
            var hooray2 = new Hooray("m", "p", "y")
            var expectedResult = new Hooray("h", "h", "y", "m", "p", "y");

            var result = hooray1.concat(hooray2);
            expect(JSON.stringify(result)).toBe(JSON.stringify(expectedResult));

        });
    });
    describe("reduceRight", function () {
        it("should return a reduced from the right new Hooray", function () {
            var letters = new Hooray('A', 'B', 'C');
            var expectedResult = 'CBA';

            var result = letters.reduceRight(function (vacio, valorActual) {

                return vacio + valorActual;

            });

            expect(result).toBe(expectedResult);
        });
        it('should break on undefined callback', function () {
            var hooray = new Hooray(1, 2, 3);
            var notAFunction = "o";
            try {
                hooray.reduceRight(notAFunction);

                throw Error('should not reach this point');
            } catch (error) {
                expect(error.message).toBe('o is not a function.');
            }
        });
    });
    describe("reduce", function () {
        it("should return a reduced new Hooray", function () {
            var letters = new Hooray('A', 'B', 'C');
            var expectedResult = 'ABC';

            var result = letters.reduce(function (vacio, valorActual) {

                return vacio + valorActual;

            });

            expect(result).toBe(expectedResult);
        });
        it('should break if typeof callback is not function', function () {
            var hooray = new Hooray("a", "b", "c");
            expect(function () { hooray.reduce("b") }).toThrowError();

        });
    });
    describe("reverse", function () {
        it("should return a reversed new Hooray", function () {
            var letters = new Hooray('A', 'B', 'C');
            var expectedResult = new Hooray("C", "B", "A");

            var result = letters.reverse();
            expect(JSON.stringify(result)).toBe(JSON.stringify(expectedResult));
        });
    });
    describe("join", function () {
        it("should return a joined array", function () {
            var letters = new Hooray('A', 'B', 'C');
            var expectedResult = 'A,B,C,';
            var result = letters.join(",");

            expect(result).toBe(expectedResult);
        });
        it("should return separator is undefined", function () {
            var letters = new Hooray('A', 'B', 'C');

            expect(function () { letters.join() }).toThrowError();
        });
    });
    describe("lastindexOf", function () {
        it("should return the last index of the Hooray", function () {
            var listOfNumbers = ["a", "b", "c", "d"];
            var number = "c";
            var expectedResult = 2;

            var result = listOfNumbers.lastIndexOf(number)

            expect(result).toBe(expectedResult);
        });
        it("should return separator is undefined", function () {
            var letters = new Hooray('A', 'B', 'C');
            var notANumber = "b";

            expect(function () { letters.lastIndexOf(notANumber) }).toThrowError();
        });
    });
    describe("lastindexOf", function () {
        it("should return the last index of the Hooray", function () {
            var listOfNumbers = ["a", "b", "c", "d"];
            var number = "c";
            var expectedResult = 2;

            var result = listOfNumbers.lastIndexOf(number)

            expect(result).toBe(expectedResult);
        });
        it("should return separator is undefined", function () {
            var letters = new Hooray('A', 'B', 'C');
            var notANumber = "b";

            expect(function () { letters.lastIndexOf(notANumber) }).toThrowError();
        });
    });
    describe('map', function () {
        it('GOOD implementation', function () {
            var numbers = new Hooray(1, 5, 10, 15);
            var expectedResult = new Hooray(2, 10, 20, 30);
            var result = numbers.map(function (num) {
                return num * 2;
            });


            expect(result).toEqual(jasmine.objectContaining(expectedResult));

        });

        it('should break when dont receive a callback', function () {
            var numbers = new Hooray(1, 5, 10, 15);
            var notCallback = 9;
            expect(function () { numbers.map(notCallback) }).toThrowError();

        });
    })
    describe('shift', function () {

        it('should return first value of the array.', function () {
            var letters = new Hooray("b", "c", "d");
            var expectedResult = "b"
            var expectedLetters = new Hooray("c", "d")

            var result = letters.shift();

            expect(result).toBe(expectedResult);
            expect(JSON.stringify(letters)).toBe(JSON.stringify(expectedLetters));

        });
        it("should return undefined with empty hooray", function () {
            var letters = new Hooray();
            var expectedResult = undefined;
            var result = letters.shift();

            expect(result).toBe(expectedResult);

        });
    });
    describe('some', function () {
        it('iterates an array and returns true or false if at least one element in the array passes the test implemented', function () {
            var numbers = new Hooray(1, 5, 10, 15);
            var expectedResult = true;
            var num = 5;
            var result = numbers.some(function callback(element) {
                if (element === num) {
                    return true
                }
            });

            expect(result).toBe(expectedResult);

        });

        it('should break when dont receive a callback', function () {
            var numbers = new Hooray(1, 5, 10, 15);
            var notCallback = 9;
            expect(function () { numbers.some(notCallback) }).toThrowError();

        });
    })
    describe('pop', function () {
        it('should retrieve the last value from an array', function () {
            var hooray = new Hooray(1, 2, 3);

            var result = hooray.pop();
            var expectedResult = new Hooray(1, 2)
            expect(hooray.length).toBe(2);
            expect(result).toBe(3);
            expect(JSON.stringify(hooray)).toBe(JSON.stringify(expectedResult))

        });

        it('should do nothing because this hooray is empty', function () {
            var hooray = new Hooray();
            expect(function () { hooray.pop() }).toThrowError();
        });
    });
    describe("Slice", function () {
        it("should returns it as a new string, without modifying the original string.", function () {
            var numbers = new Hooray(1, 2, 3, 4, 5, 6);
            var expectedResult = new Hooray(3, 4, 5);
            var result = numbers.slice(2, 4);

            expect(JSON.stringify(result)).toBe(JSON.stringify(expectedResult));
        });

        it("should break if valorinicial is not a number", function () {
            var numbers = new Hooray(1, 5, 10, 15);
            var notANumber = ["a"]
            expect(function () { numbers.slice(notANumbers, 2) }).toThrowError();
        });
        it("should break if valorfinal is not a number", function () {
            var numbers = new Hooray(1, 5, 10, 15);
            var notANumber = ["a"]
            expect(function () { numbers.slice(2, notANumber) }).toThrowError();
        });
    });
    describe("isHooray", function () {
        it("should return true if instanceof is Hooray", function () {
            var listOfNumbers = new Hooray("a", "b", "c", "d");
            var result = Hooray.isHooray(listOfNumbers)
            var expectedResult = true;
            expect(result).toBe(expectedResult);
        });

        it("should return false if instanceof is not a Hooray", function () {
            var listOfNumbers = [1, 2, 3];
            var result = Hooray.isHooray(listOfNumbers);
            var expectedResult = false;
            expect(result).toBe(expectedResult);
        });
    });

    describe('splice', function () {
        it('should delete some elements and add anothers', function () {
            var numbers = new Hooray(1, 2, 3, 4, 5, 6);
            var result = numbers.splice(2, 3);
            var expectedResult = new Hooray(1, 2, 6);

            expect(result).toEqual(expectedResult);
        });

        it('should not delete any element', function () {
            var numbers = new Hooray(1, 2, 3, 4, 5, 6);
            var result = numbers.splice(2, 0);
            var expectedResult = new Hooray(1, 2, 3, 4, 5, 6);

            expect(result).toEqual(expectedResult);
        });

        it('should not delete any element and add elements', function () {
            var numbers = new Hooray(1, 2, 3, 4, 5, 6);
            var result = numbers.splice(2, 0, "b");
            var expectedResult = new Hooray(1, 2, "b", 3, 4, 5, 6);
            expect(result).toEqual(expectedResult);
        });
        it('should delete some elements and add other elements', function () {
            var numbers = new Hooray(1, 2, 3, 4, 5, 6);
            var result = numbers.splice(2, 2, "b");
            var expectedResult = new Hooray(1, 2, "b", 5, 6);
            expect(result).toEqual(expectedResult);
        });
        it('should add an element to the beginning when start is 0', function () {
            var numbers = new Hooray(1, 2, 3, 4, 5, 6);
            var result = numbers.splice(0, 0, "b");
            var expectedResult = new Hooray("b", 1, 2, 3, 4, 5, 6);
            expect(result).toEqual(expectedResult);
        })
    });


    describe("sort", function () {
        it('should sorts the elements of an hooray', function () {
            var numbers = new Hooray(7, 2, 8, 3, 4, 1, 3, 2, 3, 12);
            var expectedResult = new Hooray(1, 2, 2, 3, 3, 3, 4, 7, 8, 12);
            var result = numbers.sort(function (a, b) {
                return a >= b
            });

            expect(result).toEqual(expectedResult);
        });
    });


});



