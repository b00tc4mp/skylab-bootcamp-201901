suite('TEST slice');

test('all arguments are correct', function() {
    var arr = [1, 2, 3, 4, 5, 6];
    var res = slice(arr, 2, 4);
    var exp = [3, 4, 5];
    console.log(res);

    if (res !== exp) throw Error('expected and result should be the same');

});