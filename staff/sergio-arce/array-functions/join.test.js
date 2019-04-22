'use strict';



describe('join', function(){
    it('should return ', function(){
        var array = ['Fire', 'Wind', 'Rain'];
        var result = join(array);
        var exp = "Fire,Wind,Rain";
 
        expect(result, exp);
    });


    it('menssage', function(){
        var array = ['Fire', 'Wind', 'Rain'];
        var result = join(array, ' / ');
        var exp = "Fire / Wind / Rain";

        expect(result, exp); 
    });

    it('should ', function(){

        try {
            join();
// me da error en la consola
            throw Error('should not reach this point');
        } catch (error) {
            expect(error.message, `${undefined} is not an array`);
        }
    });
});



