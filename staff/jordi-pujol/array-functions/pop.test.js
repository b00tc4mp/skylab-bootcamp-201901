suite('pop')

test('testing correct length', function(){
    
    var a = ["pizza", "potato", "rice", "onion", "tomato"];
    var lastElem_a = "tomato"

    var res = pop(a);

    var expected = "tomato"


if (res !== lastElem_a) throw Error ('res should have the same result than the last element of a')

if (res === a[a.length-1]) throw Error ('res should have a different value than the "new" last element of a')     
if (res !== expected) throw Error ('res should have the expected result')
if (lastElem_a !== expected) throw Error ('res should have the expected result')
});

// test('returns undefined if the array has no length')