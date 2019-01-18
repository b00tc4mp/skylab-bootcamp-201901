suite('horroy', function(){
    describe('Horroy function', function(){
        it('creates horroy', function () {
            var res = new Horroy(1,2,3,4,5);
        
            var expected = [1,2,3,4,5];
        
            expect(res.toString() === expected.toString(), 'horroy and result should be the same');

        });

        it('creates horroy length', function () {
            var res = new Horroy(1,2,3,4,5);

            var expected = 5;
        
            expect(res.length === expected, 'horroy and result should be the same');
        });

        it('creates empty horroy with no length if no arguments', function () {
            var res = new Horroy();

            var expected = [];
            
            expect(res.toString() === expected.toString(), 'horroy and result should be the same');
            expect(res.length === expected.length, 'horroy and result should be the same');
        });
    });

    describe('.fill function', function(){
        it('all arguments', function () {
            var hor = new Horroy(1,2,3,4,5)
        
            var res = hor.fill(0, 0, 2);
        
            var expected = [0,0,3,4,5];
        
            expect(res.toString() === expected.toString(), 'horroy and result should be the same');

        });

        it('2 arguments', function () {
            var hor = new Horroy(1,2,3,4,5)
        
            var res = hor.fill(0, 0);
        
            var expected = [0,0,0,0,0];
        
            expect(res.toString() === expected.toString(), 'horroy and result should be the same');

        });

        it('1 argument', function () {
            var hor = new Horroy(1,2,3,4,5)
        
            var res = hor.fill(0);
        
            var expected = [0,0,0,0,0];
        
            expect(res.toString() === expected.toString(), 'horroy and result should be the same');

        });

        it('start and end have with negative values', function () {
            var hor = new Horroy(1,2,3,4,5)
        
            var res = hor.fill(0,-3, -2);
        
            var expected = [1,2,0,4,5];
        
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

        it('all arguments with no result', function () {
            var hor = new Horroy(12, 5, 8, 130, 44);
        
            function isBigEnough(value) {
            return value > 150;
            };
        
            var res = hor.filter(isBigEnough);
        
            var expected = [];
        
            expect(res.toString() === expected.toString(), 'horroy and result should be the same');           
        });

        it('does not mutate horroy called', function () {
            var hor = new Horroy(12, 5, 8, 130, 44);
        
            function isBigEnough(value) {
            return value >= 10;
            };
        
            var res = hor.filter(isBigEnough);
        
            var expected = [12, 5, 8, 130, 44];
        
            expect(hor.toString() === expected.toString(), 'horroy and result should be the same');           
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
        
            var expected = [11, 12, 13];
        
            expect(found.toString() === expected.toString(), 'found value ' + found + ' does not match expected ' + expected);     
        });
    });

    describe('.pop function', function(){
        it('all arguments', function () {
            var hor = new Horroy(1,2,3,4);

            var found = hor.pop();
        
            var expected = 4;
        
            expect(found.toString() === expected.toString(), 'found value ' + found + ' does not match expected ' + expected);     
        });
    });

    describe('.push function', function(){
        it('all arguments', function () {
            var hor = new Horroy(1,2,3);

            var found = hor.push(4);
        
            var expected = 4;
        
            expect(found.toString() === expected.toString(), 'found value ' + found + ' does not match expected ' + expected);     
        });
    });

    describe('.reduce function', function(){
        it('all arguments', function () {
            var hor = new Horroy(
                { product: 'T-Shirt', price: 12 },
                { product: 'Slips', price: 7 },
                { product: 'Shorts', price: 22 },
                { product: 'Sockets', price: 3 }
            );

            var found = hor.reduce(function (accumulator, product) {
                return accumulator + product.price;
            }, 0);
        
            var expected = 44;
        
            expect(found.toString() === expected.toString(), 'found value ' + found + ' does not match expected ' + expected);     
        });
    });

    describe('.reverse function', function(){
        it('all arguments', function () {
            var hor = new Horroy(1,2,3);

            var found = hor.reverse();
        
            var expected = [3,2,1];
        
            expect(found.toString() === expected.toString(), 'found value ' + found + ' does not match expected ' + expected);     
        });
    });

    describe('.shift function', function(){
        it('all arguments', function () {
            var hor = new Horroy(1,2,3,4);

            var found = hor.shift(a);
        
            var expected = 1;
        
            expect(found.toString() === expected.toString(), 'found value ' + found + ' does not match expected ' + expected);     
        });
    });

    describe('.slice function', function(){
        it('all arguments', function () {
            var hor = new Horroy(5, 12, 8, 130, 44);

            var found = hor.slice(2,4);
        
            var expected = [8, 130];
        
            expect(found.toString() === expected.toString(), 'found value ' + found + ' does not match expected ' + expected);     
        });
    });

    describe('.some function', function(){
        it('all arguments', function () {
            var hor = new Horroy(1,3,5);

            var even = function(element) {
                return element % 2 === 0;
                };
            
            var found = hor.some(even);
        
            var expected = false;
        
            expect(found.toString() === expected.toString(), 'found value ' + found + ' does not match expected ' + expected);     
        });
    });

    describe('.splice function', function(){
        it('all arguments', function () {
            var hor = new Horroy(1,2,2,4,5);
            
            var found = hor.splice(2, 3, 3, 3, 3);
        
            var expected = [2,4,5];
        
            expect(found.toString() === expected.toString(), 'found value ' + found + ' does not match expected ' + expected);     
        });
    });

    describe('.unshift function', function(){
        it('all arguments', function () {
            var hor = new Horroy(1);
            
            var found = hor.unshift(2);
        
            var expected = 2;
        
            expect(found.toString() === expected.toString(), 'found value ' + found + ' does not match expected ' + expected);     
        });
    });

    describe('.toString function', function(){
        it('all arguments', function () {
            var hor = new Horroy(1,2,3);
            
            var found = hor.toString();
        
            var expected = '1,2,3';
        
            expect(found.toString() === expected.toString(), 'found value ' + found + ' does not match expected ' + expected);     
        });
    });

    describe('.from function', function(){
        it('argument is a string', function () {
            
            var found = Horroy.from('hola');
        
            var expected = ["h","o","l","a"];
        
            expect(found.toString() === expected.toString(), 'found value ' + found + ' does not match expected ' + expected); 
            expect(found.length === expected.length, 'horroy and result should be the same');    
        });

        it('argument is a horroy', function () {
            var hor= new Horroy(1,2,3);

            var found = Horroy.from(hor);
        
            var expected = [1,2,3];
        
            expect(found.toString() === expected.toString(), 'found value ' + found + ' does not match expected ' + expected); 
            expect(found.length === expected.length, 'horroy and result should be the same');    
        });

        it('argument is an array', function () {
            var hor= [1,2,3];

            var found = Horroy.from(hor);
        
            var expected = [1,2,3];
        
            expect(found.toString() === expected.toString(), 'found value ' + found + ' does not match expected ' + expected); 
            expect(found.length === expected.length, 'horroy and result should be the same');    
        });

        it('argument is not iterable, returns empty horroy', function () {
            var hor= {num:1};

            var found = Horroy.from(hor);
        
            var expected = [];
        
            expect(found.toString() === expected.toString(), 'found value ' + found + ' does not match expected ' + expected); 
            expect(found.length === expected.length, 'horroy and result should be the same');    
        });

        it('fails on null argument', function () {
            var error;
         
            try {
                Horroy.from(null);
            } catch (err) {
                error = err;
            }
        
            expect(error, 'should have thrown an error');
            expect((error instanceof Error) ,'error should be of type Error');
        });
    });

    describe('.from function', function(){
        it('argument is a string', function () {
            
            var found = Horroy.from('hola');
        
            var expected = ["h","o","l","a"];
        
            expect(found.toString() === expected.toString(), 'found value ' + found + ' does not match expected ' + expected); 
            expect(found.length === expected.length, 'horroy and result should be the same');    
        });

        it('argument is a horroy', function () {
            var hor= new Horroy(1,2,3);

            var found = Horroy.from(hor);
        
            var expected = [1,2,3];
        
            expect(found.toString() === expected.toString(), 'found value ' + found + ' does not match expected ' + expected); 
            expect(found.length === expected.length, 'horroy and result should be the same');    
        });

        it('argument is an array', function () {
            var hor= [1,2,3];

            var found = Horroy.from(hor);
        
            var expected = [1,2,3];
        
            expect(found.toString() === expected.toString(), 'found value ' + found + ' does not match expected ' + expected); 
            expect(found.length === expected.length, 'horroy and result should be the same');    
        });

        it('argument is not iterable, returns empty horroy', function () {
            var hor= {num:1};

            var found = Horroy.from(hor);
        
            var expected = [];
        
            expect(found.toString() === expected.toString(), 'found value ' + found + ' does not match expected ' + expected); 
            expect(found.length === expected.length, 'horroy and result should be the same');    
        });

        it('fails on null argument', function () {
            var error;
         
            try {
                Horroy.from(null);
            } catch (err) {
                error = err;
            }
        
            expect(error, 'should have thrown an error');
            expect((error instanceof Error) ,'error should be of type Error');
        });
    });

    describe('.isHorroy function', function(){
        it('all arguments', function () {
            var hor = new Horroy(1,2,3);
            
            var found = Horroy.isHorroy(hor);
        
            var expected = true;
        
            expect(found === expected, 'found value ' + found + ' does not match expected ' + expected);     
        });

        it('returns false when value is null', function () {
            var hor = {};
            
            var found = Horroy.isHorroy(hor);
        
            var expected = false;
        
            expect(found === expected, 'found value ' + found + ' does not match expected ' + expected);     
        });

    });


});
