describe('Horroy', function() {

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
            var isHorroy2 = Horroy.isHorroy(horr);
            expect(isHorroy2).toBe(true);
        });

        it('should returns false if is not a Horroy', function() {   
            var arr = new Array;
            var isHorroy2 = Horroy.isHorroy(arr);
            expect(isHorroy2).toBeFalsy();
        });
    });

    describe('of', function() {
        it('should returns a Horroy from a number with one digit', function() {   
            var horr = Horroy.of(7);  

            expect(horr);
            expect(horr.length).toBe(1);
            expect(horr[0]).toBe(7);
        });

        it('should returns a Horroy from a number with nine digits', function() {   
            var horr = Horroy.of(123456789);  

            expect(horr);
            expect(horr.length).toBe(1);
            expect(horr[0]).toBe(123456789);
        });

        it('should returns a Horroy from an empty object', function() {   
            var horr = Horroy.of({});  

            expect(horr);
            expect(horr.length).toBe(1);
            expect(horr[0]).toEqual({});
        });

        it('should returns a Horroy from an empty array', function() {   
            var horr = Horroy.of([]);  

            expect(horr);
            expect(horr.length).toBe(1);
            expect(horr[0]).toEqual([]);
        });

        it('should return a Horroy from four arguments', function() {   
            var horr = Horroy.of('1', '2', '3', '4');  

            expect(horr);
            expect(horr.length).toBe(4);
            expect(horr[0]).toBe('1');
            expect(horr[1]).toBe('2');
            expect(horr[2]).toBe('3');
            expect(horr[3]).toBe('4');
        });
    });
});