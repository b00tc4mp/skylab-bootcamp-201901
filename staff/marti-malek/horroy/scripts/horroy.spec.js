describe('Horroy', function() {

    var horroy;
    var horroy1;

    beforeEach(function() {
        numHorroy = new Horroy(1,2,3);
        horroy1 = new Horroy('a','b','c','d','e');
    });

    describe('from', function() {
        it('should create a Horroy from string', function() {
            var string = 'hola mundo';

            var horr = Horroy.from(string);

            expect(horr.toString()).toBe(string.split('').toString()); // h,o,l,a, ,m,u,n,d,o
        })
    });
    describe('copyWithin', function () {
        it('should return correct with all arguments', function () {

            var horr = horroy1.copyWithin(0, 3, 4);

            var res = new Horroy('d','b','c','d','e');

            expect(horr.toString()).toBe(res.toString());

        });
        it('should return correct with 2 arguments', function () {

            var horr = horroy1.copyWithin(1,3);

            var res = new Horroy('a','d','e','d','e');

            expect(horr.toString()).toBe(res.toString());

        });
    });
/*     describe('entries', function () {
        it('should return correct', function () {

        });
    }); */
    describe('every', function () {
        it('should return true with 1 argument', function () {
            function belowFour(v) {
                return v < 4;
            };
            var res = numHorroy.every(belowFour);

            var expected = true;

            expect(res.toString()).toBe(expected.toString());
        });
        it('should return false with 1 argument', function () {
            var numHorroy2 = new Horroy(1,2,5,6);
            function belowFour(v) {
                return v < 4;
            };
            var res = numHorroy2.every(belowFour);

            var expected = false;

            expect(res.toString()).toBe(expected.toString());
        });
        it('should fail on object instead of function', function () {
            var numHorroy2 = new Horroy(1,2,5,6);

            
            expect(function () {
                numHorroy2.every({});
            }).toThrow();
        });
        it('should fail on boolean instead of function', function () {
            var numHorroy2 = new Horroy(1,2,5,6);

            
            expect(function () {
                numHorroy2.every(true);
            }).toThrow();
        });
/*         it('should return correct with 2 argument', function () {
            function belowFour(v) {
                return v < 4;
            };
            var horr2 = new Horroy(1,2,3,4,5);
            
            var res = numHorroy.every(belowFour);

            var expected = true;

            expect(res.toString()).toBe(expected.toString());
        }); */
    });
});