'use strict';
// jasmine.objectContaining
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
            var expected = new Hooray(1,2,3,4);

            var length = hooray.push(4);

            expect(hooray).toEqual(expected);
            expect(hooray.length).toBe(expected.length);
        });

        it('should add multiple values at the end of an hooray in order', function () {
            var hooray = new Hooray(1, 2, 3);
            var expected = new Hooray(1,2,3,4,5);
            var length = hooray.push(4,5);


            expect(hooray).toEqual(expected);
            expect(hooray.length).toBe(expected.length);
        });

        it('should not add a non-provided value at the end of an hooray', function () {
            var hooray = new Hooray(1, 2, 3);
            var expected = new Hooray(1, 2, 3);

            var length = hooray.push();

            expect(hooray).toEqual(expected);
            expect(hooray.length).toBe(expected.length);
        });
    });
    describe('forEach', function () {
        it('should itearate an hooray without altering it', function () {
            var hooray = new Hooray(1, 2, 3);
            var expected = new Hooray;

            hooray.forEach(function (v, i) { expected.push(v); });
            // 0 1
            // 1 2
            // 2 3

            expect(hooray).toEqual(expected);
            expect(hooray.length).toEqual(expected.length);
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
    describe('concat', function(){
        it('should merge two or more arrays', function(){
            var hooray1 = new Hooray ('A','B','C');
            var hooray2 = new Hooray ('D','E','F');
            var expected = new Hooray ('A','B','C','D','E','F');
            expect(hooray1.concat(hooray2)).toEqual(expected);
            expect(hooray1.concat(hooray2).length).toBe(6);
        });
        it('should break on pass string ', function () {
            var hooray = new Hooray ('A','B','C');
            var string = 'string';
            try {
                hooray.concat(string);
            }catch(error){
                expect(error.message).toBe('string is not an Hooray.');
                
            }
            
        });

        it('should break on undefined ', function () {
            var hooray = new Hooray ('A','B','C');
            try {
                hooray.concat();
            }catch(error){
                expect(error.message).toBe('undefined is not an Hooray.');
                
            }
        });




    });
    describe('every', function (){
        it('should return false if the callback function returns a falsy value for every array element', function(){

            var hooray = new Hooray(20,22,15,5,61); 

            var callback = function (element){
               if (element > 12) {
                   return true;                   
               } else {
                   return false;
               }
            }

            expect(hooray.every(callback)).toBeFalsy();
        });
        it('should return true if the callback function returns a truthy value for every array element', function(){

            var hooray = new Hooray(20,22,15,5,61); 
            var callback = function (element){
                if (element > 3) {
                    return true;                   
                } else {
                    return false;
                }
             }
            expect(hooray.every(callback)).toBeTruthy();
        });
        it('should return false if the callback function returns a truthy value for every array element', function(){

            var hooray = new Hooray(20,22,15,5,61); 
            var callback = function (element){
                if (element < 6) {
                    return true;                   
                } else {
                    return false;
                }
             }
            expect(hooray.every(callback)).toBeFalsy();
        });
        
// ............................................................................ FILTER  
    });
    describe('filter', function (){
        it('should return a new Hooray with all elements that pass the test implemented by callback', function (){
            var hooray = new Hooray(20,22,15,5,61); 
            var expected = new Hooray(20,22,61);
            var func = function (element){
                if (element > 16) {
                    return true;                   
                } else {
                    return false;
                }
             }
            expect(hooray.filter(func)).toEqual(expected);
            expect(hooray.filter(func).length).toBe(3);
        });
        it('should return error',function(){
            var hooray = new Hooray(20,22,15,5,61); 
            try {
                expect(hooray.filter('string'));
            } catch (error) {
                expect(error.message).toBe('string is not a function.')
            }
        });
    });
    describe('indexOf', function(){
        it('should return the index of the element searched' , function(){
            var hooray = new Hooray(20,22,15,5,61); 
            expect(hooray.indexOf(15)).toBe(2);
            expect(hooray.indexOf(61)).toBe(4);
        });
        it('should retur -1 ', function(){
            var hooray = new Hooray(20,22,15,5,61); 
            expect(hooray.indexOf(50)).toBe(-1);
        });
        it('should return error by passing undefined instead of function ', function(){
            var hooray = new Hooray(20,22,15,5,61);
        try {
            hooray.indexOf();
        } catch (error){
            expect(error.message).toBe('undefined is not a number.')
        }
        });
    });
    describe('isArray', function (){
        it('should return true if its an Hooray', function () {
            var hooray = new Hooray(7,5,9,5,2,2); 
            expect(Hooray.prototype.isArray(hooray)).toBeTruthy();
        });
        it('should return an error on undefined',function(){
            var hooray = new Hooray(7,5,9,5,2,2); 
            try {
                Hooray.prototype.isArray();
            } catch (error){
                expect(error.message).toBe('undefined is not an Hooray.');
            }
        });

    });
    describe('join', function(){
        it('should return a string by concatening two hoorays.' , function(){
            var hooray = new Hooray(1,2,3,4,5,6);  
            var expected1 = '1-2-3-4-5-6';
            var expected2 = '1,2,3,4,5,6';

            expect(hooray.join('-')).toBe(expected1);
            expect(hooray.join()).toBe(expected2)
        });
        it('should return error ... ', function(){
            var hooray = new Hooray(1,2,3,4,5,6);  
            try{
                hooray.join(hooray);
            }catch(error){
                expect(error.message).toBe('Can not be a Hooray.')
            }
        });
    });
    describe('lastIndexOf', function(){
        it('should return the last index of the element searched' , function(){
            var hooray = new Hooray(20,22,15,22,20); 
            expect(hooray.lastIndexOf(22)).toBe(3);
            expect(hooray.lastIndexOf(20)).toBe(4);
        });
        it('should return -1 ', function(){
            var hooray = new Hooray(20,22,15,22,20);            
            expect(hooray.lastIndexOf(0)).toBe(-1);
            expect(hooray.lastIndexOf(5)).toBe(-1); 
        });
        it('should return error', function(){
            var hooray = new Hooray(20,22,15,22,20);      
            expect(function(){ hooray.lastIndexOf(hooray)}).toThrowError();
        }); 
    });
    describe('map', function(){
        it('should create new Hooray with the results of calling a callback.', function(){
            var hooray = new Hooray(20,22,15,22,20); 
            var func = function (v){ return v;};            
            expect(hooray.map(func)).toEqual(hooray);
        });
        it('should return error by passing a Hooray as argument instead of a function', function(){
            var hooray = new Hooray(20,22,15,22,20); 
            var func = function (v){ return v;};            
            expect(function(){hooray.map(hooray)}).toThrowError(TypeError);
        });
    });
    describe('pop', function (){
        it('should removes the last element from an array and returns that element', function (){
            var hooray = new Hooray(20,22,15,22,20);
            var expected = 20;
            expect(hooray.pop()).toBe(expected);
        });
        
    });
    describe('reduce', function (){
        it('should return the value that results from the reduction of the Horray.', function(){
            var hooray = new Hooray(1,2,3,4);
            var expected = 10;
            var func = function (acumulator,element){return acumulator + element};
            expect(hooray.reduce(func)).toBe(expected);
        });
        it('should return error by trying to apply it on a string', function(){
            var string = 'aString';
            expect(function(){string.reduce()}).toThrowError();
        });
        it('should return error by trying execute not a function', function(){
            var hooray = new Hooray(1,2,3,4);
            var func = function (acumulator,element){return acumulator + element};
            var string = 'aString';
            expect(function(){hooray.reduce('aString')}).toThrowError();
        });
    });
    describe('reduceRight', function (){
        it('should return the value that results from the reduction of the Horray.', function(){
            var hooray = new Hooray(1,2,3,4);
            var expected = 10;
            var func = function (acumulator,element){return acumulator + element};
            expect(hooray.reduceRight(func)).toBe(expected);
        });
        it('should return error by trying to apply it on a string', function(){
            var string = 'aString';
            expect(function(){string.reduceRight()}).toThrowError();
        });
        it('should return error by trying execute not a function', function(){
            var hooray = new Hooray(1,2,3,4);
            var func = function (acumulator,element){return acumulator + element};
            var string = 'aString';
            expect(function(){hooray.reduceRight('aString')}).toThrowError();
        });
    });
    describe('reverse', function(){
        it('should modify the order of the hooray ,he first array element becomes the last, and the last array element becomes the first.', function (){
            var hooray = new Hooray ('One', 'Two', 'Three');
            var expected = new Hooray ('Three','Two','One');
            expect(hooray.reverse()).toEqual(expected);
        });
        it('should return error by trying to apply it on a string', function(){
            var string = 'aString';
            expect(function (){string.reverse()}).toThrowError();
        });
    });
    describe('shift', function(){
        it('should removes the first element from an array and returns that removed element.', function(){
            var hooray = new Hooray ('One', 'Two', 'Three'); 
            var expected = 'One';
            expect(hooray.shift()).toBe(expected);
        });
    });
    describe('slice', function(){
        it('should return a shallow copy of a portion of an hooray ', function(){
            var hooray = new Hooray(20,22,15,22,20); 
            var expected = new Hooray(22,15);
            expect(hooray.slice(1,3)).toEqual(expected);
        });
        it('should return an TypeError by using string insted of a number', function(){
            var hooray = new Hooray(20,22,15,22,20);             
            expect(function () {hooray.slice('a','b')}).toThrowError(TypeError);
        });
        it('should return an ReferenceError by using string insted of a Hooray', function(){
            var string = 'aString';          
            expect(function () {aString.slice()}).toThrowError(ReferenceError);
        });
    });
    describe('some', function(){
        it('should return tru if find an element that passes the test', function(){
            var hooray = new Hooray(1,2,3,4,5,6);
            var expecte = true;
            var func = function (elem,index) {
                if(elem === 2) {
                    return true;
                }
            }
            expect(hooray.some(func)).toBeTruthy();
        });
        it('should give an error if not use function on callback', function(){
            var hooray = new Hooray(1,2,3,4,5,6);
            expect(function(){hooray.some('string')}).toThrowError();
        });
    });;
    describe('splice', function(){
        it('happy path 1', function(){
            var hooray = new Hooray(20,22,15,22,20); 
            var expected = new Hooray(20,'A','B',15,22,20);
            expect(hooray.splice(1,1,'A','B')).toEqual(expected);
        });
        it('happy path 2', function(){
            var hooray = new Hooray(20,22,15,22,20); 
            var expected = new Hooray(20,'A','B',22,20);
            expect(hooray.splice(1,2,'A','B')).toEqual(expected);
        });
        it('happy path 3', function(){
            var hooray = new Hooray(20,22,15,22,20); 
            var expected = new Hooray(20,'A',22,20);
            expect(hooray.splice(1,2,'A',0)).toEqual(expected);
        });
    });
    describe('sort', function(){
        it('happy path', function(){
            var hooray = new Hooray(5,3,11,1,4,2,4);
            var expected = new Hooray(1,2,3,4,4,5,11);
            expect(hooray.sort()).toEqual(expected);
        });
        it('happy path', function(){
            var hooray = new Hooray('d','a','c','b');
            var expected = new Hooray('a','b','c','d');
            expect(hooray.sort()).toEqual(expected);
        });
    })
});