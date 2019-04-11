'use strict';


describe('push',function(){
    it ('sould add a value at the end of the array',function(){
        var array=[1,2,3,4]

        var length = push(array,4)

        expect(array.length,4)

        expect(length,array.length)
        
        expect(array,[1,2,3,4],true)
    });
    it ('should break on undefinded array',function(){
        try{
            push()

            throw error('sould not arraive here')
        }catch(error){
            expect(error.message,' is not an array')
        }
    });
})