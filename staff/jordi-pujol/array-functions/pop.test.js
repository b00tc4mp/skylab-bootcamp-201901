suite('pop')

test('should return the last element of the array', function(){
    
    var a = ["pizza", "potato", "rice", "onion", "tomato"];
    var lastElem_a = "tomato"

    var res = pop(a);

    var expected = "tomato"


    if (res !== lastElem_a) throw Error ('res should have the same result than the last element of a')
    if (res === a[a.length-1]) throw Error ('res should have a different value than the "new" last element of a')     
    if (res !== expected) throw Error ('res should have the expected result')
});

test('testing correct length', function(){
    
    var a = ["pizza", "potato", "rice", "onion", "tomato"];

    var res = pop(a);

    var expected = 4

    if (a.length !== expected) throw Error ('the new length should be the expected one')
})


test('returns undefined if the array has no length', function(){

    var a = [];

    var res = pop(a)

    var expected = undefined

    if (res !== expected) throw Error ('the result should be undefined')
})

test ('should fail when the first param is not an array', function(){

    var error;

    try {
        var res = pop(634)
    } catch(err) {
        error = err
    }

    if (!error) throw Error ('should have thrown an error when the argument is not an array')
    if (!(error instanceof TypeError)) throw Error ('The error should be a TypeError')
})