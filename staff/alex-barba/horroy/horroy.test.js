suite('horroy', function(){
    describe('.fill function', function(){
        it('all arguments', function () {
            var hor = new Horroy(1,2,3,4,5)
        
            var res = hor.fill(0, 0, 2);
        
            var expected = [0,0,3,4,5];
        
            expect(res.toString() === expected.toString(), 'horroy and result should be the same');

        });
    });

    describe('.filter function', function(){
        it('all arguments', function () {
            var hor = new Horroy(12, 5, 8, 130, 44);
        
            function isBigEnough(value) {
            return value >= 10;
            };
        
            var res = hor.filter(isBigEnough);
        
            var expected = [12, 130, 44];
        
            expect(res.toString() === expected.toString(), 'horroy and result should be the same');           
        });
    });

    describe('.find function', function(){
        it('all arguments', function () {
            var hor = new Horroy(5, 12, 8, 130, 44);

            var found = hor.find(function(x) {
                return x > 10;
            });

            var expected = 12;
        
            expect(found.toString() === expected.toString(), 'found value ' + found + ' does not match expected ' + expected);     
        });
    });

    describe('.forEach function', function(){
        it('all arguments', function () {
            var hor = new Horroy(5);

            var found;
            
            hor.forEach(function(x) {
                return found = x + 10;
            });

            var expected = [15];
        
            expect(found.toString() === expected.toString(), 'found value ' + found + ' does not match expected ' + expected);     
        });
    });

    describe('.indexOf function', function(){
        it('all arguments', function () {
            var hor = new Horroy(5,4,6,7);

            var found = hor.indexOf(4,0);

            var expected = [1];
        
            expect(found.toString() === expected.toString(), 'found value ' + found + ' does not match expected ' + expected);     
        });
    });

    describe('.join function', function(){
        it('all arguments', function () {
            var separator = ' ';

            var hor = new Horroy(1,2);

            var expected = '1 2';

            var found = hor.join(separator);
        
            expect(found.toString() === expected.toString(), 'found value ' + found + ' does not match expected ' + expected);     
        });
    });

    describe('.map function', function(){
        it('all arguments', function () {
            var hor = new Horroy(1,2,3);

            var found = hor.map(function(x) { return x + 10; });

            console.log(found)
            console.log(found.toString())
        
            var expected = [11, 12, 13];
        
            expect(found === expected, 'found value ' + found + ' does not match expected ' + expected);     
        });
    });
    
});