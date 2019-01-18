suite('TEST slice');

test('array and 2 numbers as parameters, all correct', function() {
    var arr = [1,2,3,4,5,6,7,8]

    var res = slice(arr,2,8);

    var expected = [3,4,5,6,7,8];

    if(res !== expected) throw Error ("Expected result '" + expected + "' not matched");
});