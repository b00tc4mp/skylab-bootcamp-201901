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

            expect(horroy).toEqual(exp);
            expect(horroy.length).toBe(4);
        })
    })

    describe('TOSTRING', function() {
        it('should transform horroy to string', function() {
            horroy.toString();

            var exp = '1,2,3,4';

            expect(horroy).toEqual(exp);
            expect(horroy instanceof String);
        })
    })

    describe('SLICE', function() {
        it('should create new horroy', function() {
            var newHorroy = new Horroy();
            newHorroy = horroy.slice(1);

            var exp = [3, 4];

            expect(newHorroy).toEqual(exp);
            expect(horroy).toBe([1, 2, 3, 4]);
        })
    })

    describe('FILL', function() {
        it()
    })

    describe('FILTER', function() {
        it('all arguments are correct', function() {
            var newHorroy = new Horroy;
            
            newHorroy = horroy.filter(function(element) {return element > 2});

            var exp = [3, 4];

            expect(newHorroy).toEqual(exp);
            expect(horroy.length).toBe(4);
        })
        
    })

    describe('FIND', function() {
        it('returns first element that satisfies the callback', function() {
            var ele = horroy.find(function(element) {return element < 2});

            var exp = 1,

            expect(ele).toBe(exp);
            expect(horroy.length).toBe(4);
        })
    })

    describe('FINDINDEX', function() {
        it('returns index of the first element that satisifies the condition', function() {
            var index = horroy.findIndex(function(element) {return element > 3});

            var exp = 4;

            expect(index).toBe(exp);
            expect(horroy.length).toBe(4);
        })

        it('if no element satisifies condition', function() {
            var index = horroy.findIndex(function(element) {return element > 4});

            var exp = -1;

            expect(index).toBe(exp);
            expect(horroy.length).toBe(4);
        })
    })

    describe('JOIN', function() {
        it('undefined separator', function() {
            var result = horroy.join();

            var exp = '1,2,3,4'

            expect(result).toEqual(exp);
            expext(horroy.length).toBe(4);
        })

        it('defined separator', function() {
            var result = horroy.join('-');

            var exp = '1-2-3-4'

            expect(result).toEqual(exp);
            expext(horroy.length).toBe(4);
        })
    })

    describe('REDUCE', function() {
        it('')
    })

    describe('REVERSE', function() {
        it('reversed array', function() {
            var reversed = horroy.reverse();

            var exp = [4, 3, 2, 1];

            expect(reversed).toEqual(exp);
            expect(horroy.length).toBe(4);
        })
    })

    describe('SHIFT', function() {
        it('undefined horroy', function() {
            var empty = new Horroy();

            var res = empty.shift();

            var exp = undefined;

            expect(res).toBe(exp);
        })

        it('defined horroy', function() {
            var firstElement = horroy.shift();

            var exp = 1;

            expect(firstElement).toBe(exp);
        })
        
    })

});