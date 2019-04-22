'user strict';


describe('slice', function(){
    it('should return an array with the two firts items', function(){
        var array = [1,2,3];
        var result = slice(array,0,2);
        var expected = [1,2];

        expect(result,expected,true);

    });
    it('should return an array without the first item', function(){
        var array = [1,2,3];
        var result = slice(array,1);
        var expected = [2,3];

        expect(result,expected,true);
    });

    it('should fail when not pass an array', function(){
        try{
            slice();
            throw Error('should not reach this point');
        }catch(error){
            expect(error.message, 'undefined is not an array');
        }
    });

});