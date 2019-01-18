suite('unshift')

test('should have the correct length', function(){

    var a = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]
    
    var res = unshift(a, 6, 7, 8, 9, "casa")
    console.log(a)
    var expected = 15

    if (res !== expected) throw Error ('the result length should be the expected one')
})

test('should fail on number instead of an array', function(){

    var error;

    try {
        var res = unshift(6, 1, 2, 3, 4)
    } catch (err){
        error = err
    }

    if (!error) throw TypeError ('should return and error when the first param is not array')
})