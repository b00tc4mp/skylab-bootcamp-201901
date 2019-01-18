suite("horroy", function () {


    describe("adding last element", function () {

        it("succesful adding values", function () {

            var horroy1 = new Horroy();
            horroy1.push(7);
            

        expect(horroy1[0] === 7, "result must match the expected one")
        expect(horroy1.length === 1, "result must match the expected one")
        });

        it ("failing adding values", function(){

            var horroy1 = new Horroy();
            try {
   
               
                var error;
                horroy1.push("")
                    
                } catch (err) {
                    error = err;
                }
    
        expect(error, 'should have thrown an error');
        expect(error instanceof TypeError, 'should have thrown TypeError');
        //if (!error) throw Error('should have thrown TypeError');
        });

    });

    describe("successful aplying forEach method", function () {

        it("succesful looping", function () {

            var horroy1 = new Horroy();

            horroy1.push(7, 77, "hello", 4)
            result = horroy1.forEach()

            expect = [7, 77, "hello", 4]
              
        expect(result.toString() === expect.toString(), "result must match the expected one") 
        });
            
        it("unsuccesful looping", function () {

            var horroy1 = new Horroy();

            var horroy1 = new Horroy
            horroy1.push(7, 77, "hello", 4)
            horroy1.forEach()

            result = horroy1.forEach()
            expect = [7, 77, "hello", 4]
            
            
            try {
                var error;
                horroy1.forEach()
                } catch (err) {
                    error = err;
                }

        expect(result.toString() !== expect.toString(), "result must match the expected one") 
        });
    });
    describe("successful aplying fill", function () {

        it("succesful fills the blanck", function () {

            var horroy1 = new Horroy();

            horroy1.push(7, 77, "hello", 4)
            result = horroy1.fill(horroy1, 0, 2, 3)

            expect = [7, 77, "hello", 0, 4]
              
        expect(result.toString() === expect.toString(), "result must match the expected one") 
        });
            
    
        it("unsuccesful fills the blanck", function () {

            var horroy1 = new Horroy();

            horroy1.push(7, 77, "hello", 4)
            result = horroy1.fill(horroy1, 0, 2, 3)

            expect = [7, 77, "hello", 0, 4]
            
            try {
                var error;
                horroy1.forEach()
                } catch (err) {
                    error = err;
                }

        expect(result.toString() !== expect.toString(), "result must match the expected one") 
        });
    });

    describe("successful aplying pop", function () {

        it("succesful delete last item array", function () {

            var horroy1 = new Horroy();

            horroy1.push(7, 77, "hello", 4)
            result = horroy1.pop()

            expect = [7, 77, "hello"]
              
        expect(result.toString() === expect.toString(), "result must match the expected one") 
        });
            
    
        it("succesful delete last item array", function () {

            var horroy1 = new Horroy();

            horroy1.push(7, 77, "hello", 4)
            result = horroy1.pop()

            expect = [7, 77, "hello",]
            
            try {
                var error;
                horroy1.forEach()
                } catch (err) {
                    error = err;
                }

        expect(result.toString() !== expect.toString(), "result must match the expected one") 
        });
    });

  
})
