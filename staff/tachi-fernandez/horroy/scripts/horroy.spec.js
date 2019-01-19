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

    describe('pop', function() {
        it('should get and removes the last element from an array and returns that element.', function() {
            
            expect('5').toBe(Horroy.from('1,2,3,4,5').pop());
            expect('o').toBe(Horroy.from('hola mundo').pop());
            expect('3').toBe(Horroy.from('1,2,3').pop());
            expect('g').toBe(Horroy.from('a,d,e,f,g').pop());
        })
    });





 });