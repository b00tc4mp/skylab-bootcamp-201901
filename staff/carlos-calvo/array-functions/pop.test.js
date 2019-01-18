suite("Pop", function(){
    describe('PopTest', function(){
        it('base case I', function () {
            var error
            var array = [1,2,3]
            var element
            var arrayexpected = [1,2]
            var elementexpected = 3

            try {
                element = pop(array)
            } catch (err) {
                error = err;
            }
            console.log(array)
            console.log(arrayexpected)

            expect(element== elementexpected, 'Not result expected')
            
        });
    });
            /*Para comparar que dos objetos tienen las mismas propiedades se debe hacer:
            JSON.stringify(array)!==JSON.stringify(arrayexpected)
            Si comparamos como array !== arrayexpected da como resultado false aunque el contenido sea el mismo
            ya que apuntan a referencias en memoria distintas*/
    describe('PopTest', function(){
        it('Case input not an array', function () {
            var error
            var array = 'a'

            try {
                pop(array)
            } catch (err) {
                error = err;
            }

            expect(error, 'Should appear error, not an array')
        });
    });

    describe('PopTest', function(){
        it('Base case arraylenght = 1', function () {
            var error
            var array = [1]
            var element
            var elementexpected = 1
            var arrayexpected =[]

            try {
                element = pop(array)
            } catch (err) {
                error = err;
            }

            expect(element == elementexpected, 'Result not mached')
        });
    });
});