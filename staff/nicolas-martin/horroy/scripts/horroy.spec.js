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
            expect(horr.toString()).toBe(string.split('').toString());
        });

        it('should create a Horroy from arguments empty', function() {
            var horr = new Horroy;
            expect(horr.length).toBe(0);
            expect(horr).toBeDefined();
        });
    });

    describe('ishorroy', function() {
        it('should returns true if is a Horroy', function() {   
            var horr = new Horroy;
            debugger;
            var isHorroy2 = Horroy.isHorroy(horr);
            expect(isHorroy2).toBe(true);
        });

        it('should returns false if is not a Horroy', function() {   
            var arr = new Array;
            var isHorroy2 = Horroy.isHorroy(arr);
            // expect(isHorroy2).toBe(false);
            expect(isHorroy2).toBeFalsy();
        });
    });

    describe('of', function() {
        it('should returns a Horroy from a number', function() {   
            //var horr = new Horroy;
            var horr = Horroy.of(7);

            expect(horr)
            expect(horr.length).toBe(1);
            expect(horr[0]).toBe(7);
        });
    });
});