'use strict';

describe('hooray', function () {
    describe('constructor', function () {
        
        it('should construct an empty hooray when no arguments', function () {
            var hooray = new Hooray;

            expect(hooray.length).toBe(0)
        });

        it('should construct a non-empty hooray when existing arguments', function () {
            
            var hooray = new Hooray(1, 2, 3);

            expect(hooray.length).toBe(3)

        });

        it('should construct an empty hooray with length equal to when only one numeric argument', function () {
            var hooray = new Hooray(1);

            expect(hooray.length).toBe(1)
        });

        it('should construct a non-empty hooray with only one non-numeric argument', function () {
            var hooray = new Hooray('1');

            expect(hooray.length).toBe(1)
        });
    });

    describe('forEach', function () {
        it('should itearate an hooray without altering it', function () {
            var hooray = new Hooray(1, 2, 3);

            var result = new Hooray;

            hooray.forEach( function (v, i) { result[i] = v; } );
            
           expect(result[0]).toBe(1)
           expect(result[1]).toBe(2)
           expect(result[2]).toBe(3)

        });

        it('should thrown an error when callback is undefined', function(){
            var hooray = new Hooray();

            var callback = undefined

            expect(
                () => hooray.forEach(undefined)
            ).toThrowError(TypeError, `undefined is not a function`)

        });


        it('should do nothing if hooray has not content', function () {
           
            var hooray = new Hooray;

            var result = new Hooray;

            hooray.forEach(function (v, i) { result[i] = v; });

            expect(result[0]).toBeUndefined()
            expect(result.length).toBe(0)


        });

        it('should break on undefined callback', function () {
            var hooray = new Hooray(1, 2, 3);

            expect(
                () => hooray.forEach(undefined)
            ).toThrowError(TypeError, `undefined is not a function`)
            
        });
    });

    describe('push', () => {
       it('should add an element to the end of the hooray ', () => {
            
        
            var hooray = new Hooray()
        
            var newLength = hooray.push(8)
            
            expect(hooray[0]).toEqual(8)

       }) 

       it('should change the length of the hooray', () => {
            
        
            var hooray = new Hooray()
        
            var result = hooray.push(8)
            
            expect(result).toBe(1)

            expect(hooray[0]).toBe(8)
           

        }) 

    });


    describe('pop', () => {
        it('should return the last element', () => {
             
         
             var hooray = new Hooray(1, 2, 3)
         
             var elemt = hooray.pop()
             
             expect(elemt).toBe(3)
 
        }) 
 
        it('should modify the original hooray', () => {
             
             var hooray = new Hooray(1, 2, 3)
            
             hooray.pop()

             expect(hooray.length).toBe(2)
 
         }) 
 
     });
});
