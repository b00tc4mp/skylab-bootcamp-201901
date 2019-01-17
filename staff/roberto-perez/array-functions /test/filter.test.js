suite("filter");

test('Filter elements into array', function() {
    
    var arr = ['spray', 'limit', 'elite', 'exuberant', 'destruction', 'present'];

    var expected = ["exuberant", "destruction", "present"];

    var result = filter(arr, function(word) {
        return word.length > 6;
    });

    console.log(result);

    if (result.toString() !== expected.toString())
        throw Error("result should be the one expected");

});
