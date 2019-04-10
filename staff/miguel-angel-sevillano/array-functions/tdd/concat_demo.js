'use strict'



suite('concat', function() {
    test('should break on undefined', function () {

        try{
            concat();

            throw Error('should not reach this point');
        }catch (error){
            expect(error.message,'undefined');
        }
    })

    test('Should break on not an array',function (){
        try{
            concat("c");

            throw Error('should not reach this point');
        }catch (error){
            expect(error.message,'not an array');
        }
    })
    test('shoud return an concated array',function(){

        var a =[1,2,3,4];
        var b =[5,6];
        var actual =[];
        var expected =[1,2,3,4,5,6]
        actual = concat(a,b)

        for(var i =0; i<actual.length; i++){
            expect(actual[i],expected[i])
        }
    })

        


    
});