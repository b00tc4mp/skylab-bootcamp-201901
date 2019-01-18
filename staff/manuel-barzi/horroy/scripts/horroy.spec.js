describe('Horroy', function() {
    // WARN is this initializaton necessary?

    // var horroy;

    // beforeEach(function() {
    //     horroy = new Horroy;
    // });

    describe('from', function() {
        it('should create a Horroy from string', function() {
            var string = 'hola mundo';

            var horr = Horroy.from(string);

            expect(horr.toString()).toBe(string.split('').toString()); // h,o,l,a, ,m,u,n,d,o
        })
    });
});