suite('TEST slice');

test('all arguments are given', function() {
    var arr = [1, 2, 3, 4, 5, 6];
    var res = slice(arr, 2, 4);
    var exp = [3, 4, 5];
    //console.log(res);
    //.toString() to ensure the two arrays point in the same direction
    if (res.toString() !== exp.toString()) throw Error('expected and result should be the same');
    if (arr === res) throw Error("array shouldn't be modified");
});

test('end value omitted', function() {
    var arr = [1, 2, 3, 4, 5, 6];
    var res = slice(arr, 2);
    var exp = [3, 4, 5, 6];
    //console.log(res)
    if (res.toString() !== exp.toString()) throw Error('expected and result should be the same');
    if (arr === res) throw Error("array shouldn't be modified");
})

test('start value omitted', function() {
    var arr = [1, 2, 3, 4, 5, 6];
    var res = slice(arr, undefined, 2);
    var exp = [1, 2, 3];
    //console.log(res)
    if (res.toString() !== exp.toString()) throw Error('expected and result should be the same');
    if (arr === res) throw Error("array shouldn't be modified");
})

test('negative start value', function() {
    var arr = [1, 2, 3, 4, 5, 6];
    var res = slice(arr, -2);
    var exp = [5, 6];
    if (res.toString() !== exp.toString()) throw Error('expected and result should be the same');
    if (arr === res) throw Error("array shouldn't be modified");
})

test('negative end value', function() {
    var arr = [1, 2, 3, 4, 5, 6];
    var res = slice(arr, 2, -1);
    var exp = [3, 4, 5];
    if (res.toString() !== exp.toString()) throw Error('expected and result should be the same');
    if (arr === res) throw Error("array shouldn't be modified");
})

test()