'use strict';

describe('shift', function() {

    it('menssage', function() {
        var array = [1, 2, 3];
        var resutl = shift(array);
        var exp = 1;
        
        expect(result, exp); 

    });


    it('menssage', function(){

        try {
            shift();
            
            throw Error('should not reach this point');
        } catch (error) {
            
            expect(error.message, "result is not defined");
        }

    }); 

    
});











console.log('DEMO', 'shift');

var a = [1, 2, 3];

console.log('case 1');

console.log(shift(a));
// 1



console.log('case 2');

var miPescado = ['payaso', 'mandarín', 'cirujano'];

console.log(shift(miPescado));
// payaso