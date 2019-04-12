'user strict';


describe('slice', function(){
    it('2 values', function(){
        var array = [1,2,3];
        var result = slice(array,0,2);
        var expected = [1,2];

        expect(result,expected,true);

    });
    it('1 values', function(){
        var array = [1,2,3];
        var result = slice(array,1);
        var expected = [2,3];

        expect(result,expected,true);
    });

});