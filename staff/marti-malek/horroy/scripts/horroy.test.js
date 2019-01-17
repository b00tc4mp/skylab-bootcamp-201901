suite('push', function () {
    describe('push testing', function () {
        it('should return correct', function () {
            var a = new Horroy(1, 2, 3); // ~ [1, 2, 3]
            
            a.push(4);

            var res = a.length;
            var expected = 4;
        
            expect(res.toString() === expected.toString(), 'should return the correct value');
        
        });
    })
});



