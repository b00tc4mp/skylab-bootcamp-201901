suite ('slice')

test('should return the expected array', function(){

    var b = [1, 2, 3, 4, 5, 6, 7, 8, 9]

    var res = slice(b, 3, 6)

    var expected = [4, 5, 6]

    if (res.toString() !== expected.toString()) throw Error ('result and expected should be the same')

})

test('should return the expected array when the start index is negative', function(){

    var b = [1, 2, 3, 4, 5, 6, 7, 8, 9]

    var res = slice(b, -5, 6)

    var expected = [5, 6]

    if (res.toString() !== expected.toString()) throw Error ('result and expected should be the same')
})


test('should return an empty array if the start index is higher than the end one regardles of if it is negative or positive', function(){

    var b = [1, 2, 3, 4, 5, 6, 7, 8, 9]

    var res = slice(b, -1, 6)

    var expected = []

    if (res.toString() !== expected.toString()) throw Error ('result and expected should be the same')
})

test ('should fail if the begining param is not a number', function(){

    var error;
    
    try {
        var res = slice([0, 1, 2, 4, 5], "house", 3)
    } catch (err) {
        error = err
    }

    if (!error) throw Error ('should have thrown an error')
})