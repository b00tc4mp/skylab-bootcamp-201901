suite('shift', function () {

    describe('casos de exito', function () {

        it(' should coincide expected and arr', function () {
            var arr = [1, 2, 3, 4, 5];
            var expected = [2,3,4,5];
            var res = arr.shift();

            expect(res === expected, 'parameter and result should be the same')

        });
    
               
    })

   
});



