describe('Horroy', function() {
    describe('FROM', function() {
        it('should create a Horroy from string', function() {
            var string = 'hola mundo';

            var horr = Horroy.from(string);

            expect(horr.toString()).toBe(string.split('').toString()); // h,o,l,a, ,m,u,n,d,o
        })

        it('should create horroy from string', function() {
            var string = 'hello world';
            
            var horr = Horroy.from(string);
            
            expect(horr.toString()).toBe(string.split("").toString());
        })
    });
    describe('PUSH', function() {
        it('should add value to end of horroy', function() {
            var horroy = new Horroy;
            
            horroy = [1, 2, 3, 4];
            
            var result = horroy.push(5);
            
            var expected = [1, 2, 3, 4, 5];
            
            expect(result.toBe.expected);
        })
    })

});