'use strict'

describe('push', function(){
    it('should add a value at the end of an array', function(){
        var array=[1,2,3];
        push(array,4)
        expect(array.length,4);
        expect(array,[1,2,3,4]);
    });

    it('should break on undefined array', function(){
        var array=[1,2,3];
        push(array,4)
        expect(array.length,4);
        expect(array,[1,2,3,4]);
    });
});