describe('Horroy TEST', function() {
    describe('FROM', function() {
        it('should create horroy from string', function() {
            var string = 'hello world';
            var horr = Horroy.from(string);
            expect(horr.toString()).toBe(string.split("").toString());
        })
    })
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

    