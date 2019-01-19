describe('Horroy', function() {

    describe('.concat', function() {
        it('should create a new Horroy with an Horroy as an argument', function() {
            var test = new Horroy(1,2,3);

            var testb = new Horroy(4,5,6);
            
            var horr = test.concat(testb);

            var expected = new Horroy(1,2,3,4,5,6);

            expect(horr.toString()).toBe(expected.toString()); 
        });

        it('should create a new Horroy with an Array as an argument', function() {
            var test = new Horroy(1,2,3);

            var testb = [4,5,6];
            
            var horr = test.concat(testb);

            var expected = new Horroy(1,2,3,4,5,6);

            expect(horr.toString()).toBe(expected.toString()); 
        });

        it('should create a new Horroy with a Number as an argument', function() {
            var test = new Horroy(1,2,3);

            var testb = 4;
            
            var horr = test.concat(testb);

            var expected = new Horroy(1,2,3,4);

            expect(horr.toString()).toBe(expected.toString()); 
        });

        it('should create a new Horroy with a String as an argument', function() {
            var test = new Horroy(1,2,3);

            var testb = 'àlex';
            
            var horr = test.concat(testb);

            var expected = new Horroy(1,2,3,'àlex');

            expect(horr.toString()).toBe(expected.toString()); 
        });

        it('should create a new Horroy with multiple arguments', function() {
            var test = new Horroy(1,2,3);

            var testb = 4;

            var testc = [5,6];

            var testd = 'àlex';
            
            var horr = test.concat(testb, testc, testd);

            var expected = new Horroy(1,2,3,4,5,6,'àlex');

            expect(horr.toString()).toBe(expected.toString()); 
        });
    });

    describe('.copyWithin', function() {
        it('should create a new Horroy with same values when passing 0 arguments', function() {
            var test = new Horroy(1,2,3,4,5);

            var horr = test.copyWithin();

            var expected = new Horroy(1,2,3,4,5);

            expect(horr.toString()).toBe(expected.toString()); 
        });

        it('should create a new Horroy passing only target argument', function() {
            var test = new Horroy(1,2,3,4,5);

            var horr = test.copyWithin(3);

            var expected = new Horroy(1,2,3,1,2);

            expect(horr.toString()).toBe(expected.toString()); 
        });

        it('should create a new Horroy passing target argument equal to the horroy length', function() {
            var test = new Horroy(1,2,3,4,5);

            var horr = test.copyWithin(5);

            var expected = new Horroy(1,2,3,4,5);

            expect(horr.toString()).toBe(expected.toString()); 
        });

        it('should create a new Horroy passing target and start arguments', function() {
            var test = new Horroy(1,2,3,4,5);

            var horr = test.copyWithin(1,2);

            var expected = new Horroy(1,3,4,5,5);

            expect(horr.toString()).toBe(expected.toString()); 
        });

        it('should create a new Horroy passing > 4 arguments', function() {
            var test = new Horroy(1,2,3,4,5);

            var horr = test.copyWithin(1,3,4,5,6);

            var expected = new Horroy(1,4,3,4,5);

            expect(horr.toString()).toBe(expected.toString()); 
        });

        it('should create a new Horroy with same values when passing one string argument ', function() {
            var test = new Horroy(1,2,3,4,5);

            var horr = test.copyWithin('alex');

            var expected = new Horroy(1,2,3,4,5);

            expect(horr.toString()).toBe(expected.toString()); 
        });
    });

    describe('.every', function() {
        it('should return true testing an Horroy', function() {
            var test = new Horroy(2,4,6,8);

            var even = function(element) {
                return element % 2 === 0;
                };

            var horr = test.every(even);

            var expected = true;

            expect(horr).toBe(expected); 
        });

        it('should return false testing an Horroy', function() {
            var test = new Horroy(2,4,6,8,9,10);

            var even = function(element) {
                return element % 2 === 0;
                };

            var horr = test.every(even);

            var expected = false;

            expect(horr).toBe(expected); 
        });

        it('should return true testing every object of a Horroy', function() {
            var test = new Horroy({a:1, b:2, c:3, d:4}, {a:1, x:2, y:3, z:4}, {a:1, x:2, y:3, z:4});

            var even = function(element) {
                return element.a === 1;
                };

            var horr = test.every(even);

            var expected = true;

            expect(horr).toBe(expected); 
        });

        it('should return TypeError with a string as a function', function() {
            var test = new Horroy({a:1, b:2, c:3, d:4}, {a:1, x:2, y:3, z:4}, {a:1, x:2, y:3, z:4});

            var even = 'alex';

            expect(function(){test.every('alex')}).toThrow(); 
        });
    });

    describe('.findIndex', function() {
        it('should return the index', function() {
            var test = new Horroy(2,4,6,8);

            var even = function(element) {
                return element % 2 === 0;
                };

            var horr = test.findIndex(even);

            var expected = 0;

            expect(horr).toBe(expected); 
        });

        it('should return -1', function() {
            var test = new Horroy(1,3,5);

            var even = function(element) {
                return element % 2 === 0;
                };

            var horr = test.findIndex(even);

            var expected = -1;

            expect(horr).toBe(expected); 
        });

        it('should return TypeError with a string as a function', function() {
            var test = new Horroy({a:1, b:2, c:3, d:4}, {a:1, x:2, y:3, z:4}, {a:1, x:2, y:3, z:4});

            var even = 'alex';

            expect(function(){test.findIndex('alex')}).toThrow(); 
        });
    });

    describe('.includes', function() {
        it('should return true passing only element as an argument', function() {
            var test = new Horroy(2,4,6,8);

            var horr = test.includes(6);

            var expected = true;

            expect(horr).toBe(expected); 
        });

        it('should return false passing only element as an argument', function() {
            var test = new Horroy(1,3,5);

            var horr = test.includes(2);

            var expected = false;

            expect(horr).toBe(expected); 
        });

        it('should return true passing the 2 arguments', function() {
            var test = new Horroy(2,4,6,8);

            var horr = test.includes(4,1);

            var expected = true;

            expect(horr).toBe(expected); 
        });

        it('should return false passing the 2 arguments', function() {
            var test = new Horroy(2,3,5);

            var horr = test.includes(2,1);

            var expected = false;

            expect(horr).toBe(expected); 
        });
    });

    describe('.lastIndexOf', function(){
        it('should return true passing the 2 arguments', function () {
            var hor = new Horroy(5,1,5,5);

            var found = hor.lastIndexOf(5,2);

            var expected = 2;
        
            expect(found).toBe(expected);    
        });

        it('should return true passing only value argument', function () {
            var hor = new Horroy(5,1,5,5);

            var found = hor.lastIndexOf(5);

            var expected = 3;
        
            expect(found).toBe(expected);    
        });
    });

    describe('.reduceRight', function(){
        it('should return sum passing 1 argument', function () {
            var hor = new Horroy(1,2,3,4);

            var found = hor.reduceRight(function(acc, value) {
                return acc + value 
            });

            var expected = 10;
        
            expect(found.toString()).toBe(expected.toString());    
        });

        it('should return sum passing the 2 arguments', function () {
            var hor = new Horroy(1,2,3,4);

            var found = hor.reduceRight(function(acc, value) {
                return acc + value 
            }, 5);

            var expected = 15;
        
            expect(found.toString()).toBe(expected.toString());    
        });
    });

});