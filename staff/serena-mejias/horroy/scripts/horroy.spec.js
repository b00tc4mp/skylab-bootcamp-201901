describe('Horroy', function() {
    // WARN is this initializaton necessary?

    var horroy;

    beforeEach(function() {
        horroy = new Horroy;
    });

    describe('from', function() {
        
        it('should create a Horroy from string', function() {
            var string = 'hola mundo';
            var horr = Horroy.from(string);
            expect(horr.toString()).toBe(string.split('').toString()); // h,o,l,a, ,m,u,n,d,o
        })
    });

    describe('fill', function(){
    
        beforeEach(function(){
            horroy = new Horroy(1,2,3,4,5);
        });

        it('should change the elements of horroy for the argument',function(){
            
            var result = horroy.fill(5,1,3);
            var expected = {0: 1, 1: 5, 2: 5, 3: 4, 4: 5, length: 5}
            expect(JSON.stringify(result)).toBe(JSON.stringify(expected));
        })

        it('end is an optional argument',function(){
             
            var result = horroy.fill(5,1);
            var expected = {0: 1, 1: 5, 2: 5, 3: 5, 4: 5, length: 5}
            expect(JSON.stringify(result)).toBe(JSON.stringify(expected));
        })

        it('start is an optional argument',function(){
             
            var result = horroy.fill(5);
            var expected = {0: 5, 1: 5, 2: 5, 3: 5, 4: 5, length: 5}
            expect(JSON.stringify(result)).toBe(JSON.stringify(expected));
        })
    })
});

