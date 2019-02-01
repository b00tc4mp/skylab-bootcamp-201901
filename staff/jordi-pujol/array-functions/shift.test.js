suite('shift')

test('should have the previous length minus 1', function(){

    var b = [1, 2, 3, 4, 5, 6]

    var res = shift(b)

    var expected = 5

    if (b.length !== expected) throw Error ('The result should be the expected one')
})

test('should return the first element', function(){

    var b = [1, 2, 3, 4, 5, 6]

    var res = shift(b)

    var expected = 1

    if (res !== expected) throw Error ('The result should be the expected one')
})

test('should return undefined when array empty', function(){

    var b = []
    
    var res = shift(b)
    
    var expected = undefined

    if (res !== expected) throw Error ('The result should be the expected one')
})

test('fails when ther is more than one parameter passed', function(){

    var error;
    
    try{
        res = reverse(a,5)
    } catch (err){
        error = err
    }
    
    if (!error) throw TypeError ('There should be an error when adding more than one parameter')
})