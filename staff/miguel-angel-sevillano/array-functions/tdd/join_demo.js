'use strict'



suite('join', function() {
    test('should break on not an array', function () {
        
        try{
            join();

            throw Error('should not reach this point');
        }catch (error){
            expect(error.message,'is not an array');
        }      
    })
    test('should break if dont join the item in to the arrar',function(){

        var a=[1,2,3,4,5]
        var item ='='
        var actual = join(a,item)
        expect('1=2=3=4=5',actual)
    })
});