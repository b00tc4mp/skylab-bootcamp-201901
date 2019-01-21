describe('Horroy', function () {
    // WARN is this initializaton necessary?

    // var horroy;

    // beforeEach(function() {
    //     horroy = new Horroy;
    // });

    describe('from', function () {
        it('should create a Horroy from string', function () {
            var string = 'hola mundo';

            var horr = Horroy.from(string);

            expect(horr.toString()).toBe(string.split('').toString()); // h,o,l,a, ,m,u,n,d,o
        })
    });

    describe('push', function () {

        it('should put an element into Horroy', function () {
            var animals = new Horroy('pigs', 'goats', 'sheep');
            var res = animals.push('cows');
            var expected = 4;
            var e_animals = new Horroy("pigs", "goats", "sheep", "cows");

            expect(animals.toString()).toEqual(e_animals.toString());
            expect(res).toEqual(expected);
        });

        it('should put x elements into Horroy', function () {
            var animals = new Horroy('pigs', 'goats', 'sheep');
            var res = animals.push('cows', 'cats', 'dogs');
            var expected = 6;
            var e_animals = new Horroy("pigs", "goats", "sheep", "cows", "cats", "dogs");

            expect(animals.toString()).toEqual(e_animals.toString());
            expect(res).toEqual(expected);
        });

        it('should put whatever in a Horroy', function () {
            var horroy = new Horroy(1, 'what', 2 + 3);
            var res = horroy.push(function () { }, { value: 1 });
            var expected = 5;
            var e_horroy = new Horroy(1, 'what', 2 + 3, function () { }, { value: 1 });

            expect(horroy.toString()).toEqual(e_horroy.toString());
            expect(res).toEqual(expected);
        });
    });

    describe('forEach', function () {
        it('should iterate an horroy and execute a callback function', function () {
            var horroy = new Horroy('a', 'b', 'c');
            var res = 0;
            var expected = 3;

            horroy.forEach(function (element) {
                res++;
            });

            expect(expected).toEqual(res);
        });
    });

    describe('fill', function () {
        it('should fill all elements of Horroy', function () {
            var horr = new Horroy(1, 2, 3);
            horr.fill(4);
            var expected = new Horroy(4, 4, 4);

            expect(horr.toString()).toEqual(expected.toString());
        });

        it('should fill all elements from start given', function () {
            var horr = new Horroy(1, 2, 3);
            horr.fill(4, 1);
            var expected = new Horroy(1, 4, 4);

            expect(horr.toString()).toEqual(expected.toString());
        });

        it('should fill elements from start to end given', function () {
            var horr = new Horroy(1, 2, 3);
            horr.fill(4, 1, 2);
            var expected = new Horroy(1, 4, 3);

            expect(horr.toString()).toEqual(expected.toString());
        });

        it('should change nothing when parameters are bigger to the horroy length', function () {
            var horr = new Horroy(1, 2, 3);
            horr.fill(4, 3, 3);
            var expected = new Horroy(1, 2, 3);

            expect(horr.toString()).toEqual(expected.toString());
        });

        it('should change the order to iterate when negative values given', function () {
            var horr = new Horroy(1, 2, 3);
            horr.fill(4, -3, -2);
            var expected = new Horroy(4, 2, 3);

            expect(horr.toString()).toEqual(expected.toString());
        });

        it('should do nothing when NaN given', function () {
            var horr = new Horroy(1, 2, 3);
            horr.fill(4, NaN, NaN);
            var expected = new Horroy(1, 2, 3);

            expect(horr.toString()).toEqual(expected.toString());
        });
    });

    describe('find', function () {
        it('should find an object in an horroy by one of its properties', function () {
            var inventory = new Horroy(
                { name: 'apples', quantity: 2 },
                { name: 'bananas', quantity: 0 },
                { name: 'cherries', quantity: 5 }
            );

            function isCherries(fruit) {
                return fruit.name === 'cherries';
            }

            var res = inventory.find(isCherries);
            var expected = { name: 'cherries', quantity: 5 };

            expect(expected).toEqual(res);
        });

        it('should find a prime number in a horroy', function () {
            function isPrime(element) {
                var start = 2;
                while (start <= Math.sqrt(element)) {
                    if (element % start++ < 1) {
                        return false;
                    }
                }
                return element > 1;
            }

            var horr = new Horroy(4, 6, 8, 12);
            var horr2 = new Horroy(4, 5, 8, 12);

            var res = horr.find(isPrime);
            var res2 = horr2.find(isPrime);

            expect(res).toBe(undefined);
            expect(res2).toBe(5);
        });
    });

    describe('indexOf', function(){
        it('should return the index of a specific elem', function(){
            var horr = new Horroy(2,9,9);

            var res = horr.indexOf(2);
            expect(res).toBe(0);
        });

        it('should return the first index of a duplicate element', function(){
            var horr = new Horroy(2,9,9);

            var res = horr.indexOf(9);
            expect(res).toBe(1);
        });

        it('should return -1 if not found the element', function(){
            var horr = new Horroy(2,9,9);
            var res = horr.indexOf(3);

            expect(res).toBe(-1);
        });

        it('should search from start value given', function(){
            var horr = new Horroy(2,9,9);

            var res = horr.indexOf(9,2);
            expect(res).toBe(2);
        });

        it('should start from the end when negative value given', function(){
            var horr = new Horroy(2,9,9);
            var res = horr.indexOf(2,-3);

            expect(res).toBe(0);
        }); 
    });

    describe('join', function(){
        it('should join an horroy when string given', function(){
            var horr = new Horroy(1,2,3);
            var res = horr.join('+');
            
            expect(res).toBe('1+2+3');
        });

        it('should join an horroy with commas when nothing given', function(){
            var horr = new Horroy(1,2,3);
            var res = horr.join();
            
            expect(res).toBe('1,2,3');
        });

        it('should join an horroy with nothing when empty string given', function(){
            var horr = new Horroy(1,2,3);
            var res = horr.join('');
            
            expect(res).toBe('123');
        });

        it('should convert the null to string when null given', function(){
            var horr = new Horroy(1,2,3);
            var res = horr.join(null);
            
            expect(res).toBe('1null2null3');
        });
    });

    describe('reverse', function(){
        it('should reverse the elements in Horroy', function(){
            var horr = new Horroy(1,2,3);

            horr.reverse();

            var expected = new Horroy(3,2,1);
            expect(horr.toString()).toEqual(expected.toString());
        });
    });

    describe('pop', function(){
        it('should remove the last element of Horroy', function(){
            var myFish = new Horroy('angel', 'clown', 'mandarin', 'sturgeon');
            var popped = myFish.pop();
            var e_myFish = new Horroy('angel','clown','mandarin');
            expect(popped).toEqual('sturgeon');
            expect(myFish.toString()).toEqual(e_myFish.toString());
        });
    });

    describe('reduce', function(){
        it('should reduce a numeric horroy to a value', function(){
            var horroy = [1, 2, 3, 4];
            var reducer = function(accumulator, currentValue) {
                return accumulator + currentValue;  
            };
            var res = horroy.reduce(reducer);
            expect(res).toEqual(10);
        });

        it('should reduce a object horroy', function(){
            var students = new Horroy ({name: 'peter', age:12}, {name: 'paula', age: 14}, {name: 'paul', age: 10});
            var calcStudentAge = function(accumulator, currentValue) {
                return accumulator + currentValue.age;  
            };
            var totalAge = students.reduce(calcStudentAge,0);
            
            expect(totalAge).toEqual(36);
        });
        
        it('should throw a TypeError when no callback', function(){
            var horr = new Horroy(1,2,3);
            var callback = 'a';
            expect(function(){horr.reduce(callback)}).toThrowError(callback + ' is not an function');
        });
    });

    describe('slice', function(){
        it('should return a portion of an existing horroy', function(){
            var fruits = new Horroy('Banana', 'Orange', 'Lemon', 'Apple', 'Mango');
            var citrus = fruits.slice(1, 3);
            var e_fruits = new Horroy('Banana', 'Orange', 'Lemon', 'Apple', 'Mango');
            var e_citrus = new Horroy('Orange', 'Lemon');
            expect(fruits.toString()).toEqual(e_fruits.toString());
            expect(citrus.toString()).toEqual(e_citrus.toString());
        });

        it('should cut to the end when only 1 parameter given', function(){
            var animals = new Horroy('ant', 'bison', 'camel', 'duck', 'elephant');
            var portion = animals.slice(2);
            var e_output = new Horroy("camel", "duck", "elephant");
            var e_animals = new Horroy('ant', 'bison', 'camel', 'duck', 'elephant');

            expect(animals.toString()).toEqual(e_animals.toString());
            expect(portion.toString()).toEqual(e_output.toString());
        });

        it('should start from the end and cut the enter value when negative given', function(){
            var animals = new Horroy('ant', 'bison', 'camel', 'duck', 'elephant');
            var portion = animals.slice(-2);
            var e_output = new Horroy("duck","elephant");
            var e_animals = new Horroy('ant', 'bison', 'camel', 'duck', 'elephant');

            expect(animals.toString()).toEqual(e_animals.toString());
            expect(portion.toString()).toEqual(e_output.toString());
        });

        it('should start from the end when negative end value given', function(){
            var animals = new Horroy('ant', 'bison', 'camel', 'duck', 'elephant');
            var portion = animals.slice(2, -2);
            var e_output = new Horroy("camel");
            var e_animals = new Horroy('ant', 'bison', 'camel', 'duck', 'elephant');

            expect(animals.toString()).toEqual(e_animals.toString());
            expect(portion.toString()).toEqual(e_output.toString());
        });

        it('should extract through to the end of the sequence', function(){
            var animals = new Horroy('ant', 'bison', 'camel', 'duck', 'elephant');
            var portion = animals.slice(-3, 10);
            var e_output = new Horroy("camel", "duck", "elephant");
            var e_animals = new Horroy('ant', 'bison', 'camel', 'duck', 'elephant');
            
            expect(animals.toString()).toEqual(e_animals.toString());
            expect(portion.toString()).toEqual(e_output.toString());
        });

        it('should return the horroy without modifications when no number given', function(){
            var animals = new Horroy('ant', 'bison', 'camel', 'duck', 'elephant');
            var portion = animals.slice('bison');
            var e_animals = new Horroy('ant', 'bison', 'camel', 'duck', 'elephant');

            expect(animals).toEqual(e_animals);
            expect(portion).toEqual(e_animals);
        });
    });

    describe('splice', function(){
        it('should change the contents of a horroy and return this', function(){
            var months = new Horroy('Jan', 'March', 'April', 'June');
            months.splice(1, 0, 'Feb');
            var e_months = new Horroy('Jan', 'Feb', 'March', 'April', 'June');
            expect(months).toEqual(e_months);                                         
        }); 

        it('should change and delete elements of a Horroy', function(){
            var months = new Horroy('Jan', 'March', 'April', 'June');
            var res = months.splice(0, 1, 'Feb');
            var expected = new Horroy('Jan');
            var e_months = new Horroy('Feb','March','April','June');
            expect(months).toEqual(e_months);
            expect(res).toEqual(expected);
        });

        it('should delete and add more than one element', function(){
            var months = new Horroy('Jan', 'March', 'April', 'June');
            var res = months.splice(0, 4, 'Feb','March','April','May');
            var expected = new Horroy('Jan', 'March', 'April', 'June');
            var e_months = new Horroy('Feb','March','April','May');
            expect(months).toEqual(e_months);
            expect(res).toEqual(expected);
        });
        
        it('should remove 1 element from index -2', function(){
            var myFish = new Horroy('angel', 'clown', 'mandarin', 'sturgeon');
            var removed = myFish.splice(-2, 1);
            var e_myFish = new Horroy("angel", "clown", "sturgeon"); 
            var e_removed = new Horroy("mandarin");

            expect(myFish).toEqual(e_myFish);
            expect(myFish.length).toEqual(e_myFish.length);
            expect(removed).toEqual(e_removed);
        });

        it('should remove 2 elements from index -2', function(){
            var myFish = new Horroy('parrot', 'anemone', 'blue', 'trumpet', 'sturgeon');
            var removed = myFish.splice(myFish.length - 3, 2);
            var e_myFish = new Horroy("parrot", "anemone", "sturgeon"); 
            var e_removed = new Horroy("blue", "trumpet");

            expect(myFish).toEqual(e_myFish);
            expect(myFish.length).toEqual(e_myFish.length);
            expect(removed).toEqual(e_removed);
        });
    });

    describe('some',function(){
        it('should test value of horroy elements', function(){
            var horr = new Horroy(12,5,8,1,4);

            expect(horr.some(function(elem){return elem > 10})).toBe(true);
        });
    });
});