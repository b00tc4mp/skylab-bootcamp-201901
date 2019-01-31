// TODO do it nice!
suite('Horroy', function(){

    describe('push functional cases', function(){
        it('should put element into Horroy', function(){
            var animals = new Horroy('pigs', 'goats', 'sheep');
            var res = animals.push('cows');
            var expected = 4
            var e_animals = new Horroy("pigs", "goats", "sheep", "cows");
            
            expect(animals.toString() === e_animals.toString(), 'the array should be equal to '+ e_animals);
            expect(res === expected, 'the response should be equal to '+expected);
        });

        it('should put whatever in a Horroy', function(){
            var horroy = new Horroy(1,'what', 2+3);
            var res = horroy.push(function(){}, {value: 1});
            var expected = 5;
            var e_horroy = new Horroy(1,'what', 2+3,function(){}, {value: 1});

            expect(horroy.toString() === e_horroy.toString(), 'the array should be equal to '+ e_horroy);
            expect(res === expected, 'the response should be equal to '+expected);
        }); 
    });

    describe('foreach functional cases', function(){
        it('should iterate an array and execute a callback function', function(){
            var horroy  = new Horroy('a', 'b', 'c');
            var res = 0;
            horroy.forEach(function(element) {
               res ++;
            });
        });
    });
});