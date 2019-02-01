suite("indexOf", function(){
    describe('indexofTest', function(){
        it('Base Case OK', function(){
            var fruits = ["Banana", "Orange", "Apple", "Mango", "Banana", "Orange", "Apple"];
            keysearch = "Orange";
            startingposition=0;
            var err;
            var result;
            try {
                result = indexOf(fruits, keysearch, startingposition)
                debugger
            } catch (error) {
                err= error;
            }

            expect(result==1, 'Result not correct')
        });
    });

    describe('indexofTest', function(){
        it("BAD: Number of Arguments = 1", function(){
            var fruits = ["Banana", "Orange", "Apple", "Mango", "Banana", "Orange", "Apple"];
            keysearch = "Orange";
            startingposition=0;

            var err;

            try {
                indexOf(fruits)
            } catch (error) {
                err= error;
            }

            expect(err, 'Error should appear')
        })
    })
    describe('indexofTest', function(){
        it("BAD: Number of Arguments = 4", function(){
            var fruits = ["Banana", "Orange", "Apple", "Mango", "Banana", "Orange", "Apple"];
            keysearch = "Orange";
            startingposition=0;

            var err;

            try {
                indexOf(fruits, keysearch, startingposition, err)
            } catch (error) {
                err= error;
            }
            expect(err, 'should have been an error')
        })
    })
})