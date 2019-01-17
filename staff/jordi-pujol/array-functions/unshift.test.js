suite('unshift')

test('should have the correct length', function(){

    var a = [1, 2, 3, 4, 5]
    
    var res = unshift(a, 6, 7, 8, 9, "casa")
    console.log(res)
    
    var expected = 10

    if (res !== expected) throw Error ('the result length should be the expected one')
})