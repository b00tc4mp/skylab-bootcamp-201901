describe('Horroy', function() {
    var horroy;

    beforeEach(function() {
        horroy = new Horroy(1, 2, 3, 4);
    });
    /*describe('FROM', function() {
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
    });*/
    describe('PUSH', function() {
        it('should add value to end of horroy', function() {
            horroy.push(5);
            
            //var exp = [1, 2, 3, 4, 5];
            
            //expect(horroy).toBe.(exp);
            //expect(horroy[4]).toBe.(5);
            expect(horroy.length).toEqual(5);
        })
    })

    describe('POP', function() {
        it('all arguments are correct', function() {
            horroy.pop()
            
            var exp = 4;

            expect(horroy.length).toBe(4);
            expect(horroy.pop.toString).toBe(exp.toString);

        })
    })

    describe('FOREACH', function() {
        it('should execute callback for each horroy element', function() {
            horroy.forEach(function(elements) {
                return elements++;
            })

            var exp = [2, 3, 4, 5];

            expect(horroy).toBe(exp);
            expect(horroy.length).toBe(4);
        })
    })

    describe('TOSTRING', function() {
        it('should transform horroy to string', function() {
            horroy.toString();

            var exp = '1,2,3,4';

            expect(horroy).toBe(exp);
            expect(horroy instanceof String);
        })
    })

    describe('SLICE', function() {
        it('should create new horroy', function() {
            var newHorroy = new Horroy();
            newHorroy = horroy.slice(1);

            var exp = [3, 4];

            expect(horroy.slice(1)).toBe(exp);
            expect(horroy).toBe([1, 2, 3, 4]);
        })
    })

    describe('fill', function() {
        it()
    })

});