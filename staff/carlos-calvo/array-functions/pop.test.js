test('base case I', function () {
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

    if(error) throw new Error ('There shouldnt be any error')
    if(element!== elementexpected) throw new Error('Not expected result in element!')
    if(JSON.stringify(array)!==JSON.stringify(arrayexpected)) throw new Error('Not expected result in arrays!')
    
});
    /*Para comparar que dos objetos tienen las mismas propiedades se debe hacer:
    JSON.stringify(array)!==JSON.stringify(arrayexpected)
    Si comparamos como array !== arrayexpected da como resultado false aunque el contenido sea el mismo
    ya que apuntan a referencias en memoria distintas*/

test('Case input not an array', function () {
    var error
    var array = 'a'

    try {
        pop(array)
    } catch (err) {
        error = err;
    }

    if(!error) throw new Error ('There should be an error') 
    if(!(error instanceof TypeError)) throw new Error('It should be a Type Error!')
    if(error.message!== array + ' not an array') throw new Error ('Message Error not matched')
});


test('Base case arraylenght = 1', function () {
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

    if(element !== elementexpected) throw new Error('Result not mached')
    if(array.toString !== arrayexpected.toString) throw new Error('Result not mached')
});