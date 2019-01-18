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

            
            expect(function () {numHorroy2.every(true)}).toThrow();
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
    describe('findIndex', function () {
        it('should return correct with matching number', function () {
            var res = numHorroy.findIndex(function (v) {
                return v > 2;
            });
            var expected = 2;

            expect(res.toString()).toBe(expected.toString());
        });
        it('should return -1 if there is no match', function () {
            var res = numHorroy.findIndex(function (v) {
                return v > 4;
            });
            var expected = -1;

            expect(res.toString()).toBe(expected.toString());
        });
        it('should return correct with matching string', function () {
            var res = horroy1.findIndex(function (v) {
                return v === 'a';
            });
            var expected = 0;

            expect(res.toString()).toBe(expected.toString());
        });
        it('should fail with no arguments', function () {


            expect(function () {horroy1.findIndex()}).toThrow();
        });

        it('should fail with object arguments', function () {
            var a = {};

            expect(function () {horroy1.findIndex(a)}).toThrow();
        });
        it('should fail with boolean arguments', function () {
            var a = true;

            expect(function () {horroy1.findIndex(a)}).toThrow();
        });
        it('should fail with number arguments', function () {
            var a = 4;

            expect(function () {horroy1.findIndex(a)}).toThrow();
        });
    }); 
    describe('flat', function () {
        it('should return correct with no depth', function () {
            var horror = new Horroy(4,5);
            var hor = new Horroy(1,2,3,horror);

            var res = hor.flat();

            var expected = new Horroy(1,2,3,4,5);

            expect(res.toString()).toBe(expected.toString());
        });
        it('should return correct with depth', function () {
            var horror = new Horroy(4,5);
            var horror2 = new Horroy(6,7);
            var horr = new Horroy(1,2,3,horror,horror2);

            var res = horr.flat();

            var expected = new Horroy(1,2,3,4,5,6,7);

            expect(res.toString()).toBe(expected.toString());
        });
    });
    describe('flatMap', function () {
        it('should return correct with numeric horroy', function () {
            var res = numHorroy.flatMap(function (v) {
                return new Horroy(v * 2,0);
            });

            var expected = new Horroy(2,0,4,0,6,0);

            expect(res.toString()).toBe(expected.toString());
        });
        it('should return correct with horroy with strings', function () {
            var res = numHorroy.flatMap(function (v) {
                return new Horroy(v * 2,'hello');
            });

            var expected = new Horroy(2,'hello',4,'hello',6,'hello');

            expect(res.toString()).toBe(expected.toString());
        });
        it('should fail with object instead of function', function () {

            expect(function () {numHorroy.flatMap({})}).toThrow();
        });
        it('should fail with boolean instead of function', function () {

            expect(function () {numHorroy.flatMap(true)}).toThrow();
        });
        it('should fail with number instead of function', function () {

            expect(function () {numHorroy.flatMap(4)}).toThrow();
        });
    });
    describe('includes', function () {
        it('should return correct with 1 argument', function () {
            var res = numHorroy.includes(1);

            var expected = true;

            expect(res.toString()).toBe(expected.toString());
        });
        it('should return correct with 2 arguments', function () {
            var res = numHorroy.includes(2,1);

            var expected = true;

            expect(res.toString()).toBe(expected.toString());
        });
        it('should return correct with no arguments', function () {
            var res = numHorroy.includes();

            var expected = false;

            expect(res.toString()).toBe(expected.toString());
        });
    });
    describe('lastIndexOf', function () {
        it('should return correct with 1 occurrence', function () {
            var res = horroy1.lastIndexOf('d');

            var expected = 3;

            expect(res.toString()).toBe(expected.toString());
        });
        it('should return correct with various occurrence', function () {
            var a = new Horroy(1,2,5,1,7,1);

            var res = a.lastIndexOf(1);

            var expected = 5;

            expect(res.toString()).toBe(expected.toString());
        });
        it('should return correct with no occurrence', function () {
            var a = new Horroy(1,2,5,1,7,1);

            var res = a.lastIndexOf();

            var expected = -1;

            expect(res.toString()).toBe(expected.toString());
        });
    });
    describe('reduceRight', function () {
        it('should return correct without accumulator', function () {
            var a = new Horroy(1,2,3,4,5);

            var res = a.reduceRight(function (accumulator, product) {
                return accumulator + product;
            });
            var expected = 15;

            expect(res.toString()).toBe(expected.toString());
        });
        it('should return correct with accumulator', function () {
            var a = new Horroy(1,2,3,4,5);

            var res = a.reduceRight(function (accumulator, product) {
                return accumulator + product;
            }, 0);
            var expected = 15;

            expect(res.toString()).toBe(expected.toString());
        });
        it('should return correct with string accumulator', function () {
            var a = new Horroy(1,2,3,4,5);

            var res = a.reduceRight(function (accumulator, product) {
                return accumulator + product;
            }, 's');
            var expected = 's54321';

            expect(res.toString()).toBe(expected.toString());
        });
    });
/*     describe('toSource', function () {
        it('should return correct', function () {
            var res = numHorroy.toSource();

            console.log(res);
        });
    }); */
});