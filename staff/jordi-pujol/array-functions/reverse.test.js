suite('reverse')

test('should return the same length', function(){

    var a = [1, 2, 3, 4, 5, 6, 7];

    var res = reverse(a);

    var expected = 7;

    if (res.length !== expected) throw Error ('the result should be the expected')

})

test('should return the same reverse array', function(){

    var a = [1, 2, 3, 4, 5, 6, 7];

    var res = reverse(a);

    var expected = [7, 6, 5, 4, 3, 2, 1];

    if (res.toString() !== expected.toString()) throw Error ('the result should be the expected')
})

// fails

test('fails when ther is more than one element as a parameter', function(){

    var error;

    try{
        res = reverse(a,5)
    } catch (err){
        error = err
    }

    if (!error) throw TypeError ('There should be an error when adding more than one parameter')
})