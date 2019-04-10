
describe('concat', function () {
    it('should return an array with all items concadenated', function () {
        var array1 =  ["The","world","is"];
        var array2 =  ["a","fuckin*","hell"];
        var array3 =  [6, 6, 6,];

        var result = concat(array1, array2, array3);

        var expected = ["The","world","is", "a","fuckin*","hell", 6, 6, 6,];
        
        expect(result, expected, false);
    });

    it('should return an array with all items concadenated', function () {
        var answer =  ["The","world","is", 6, 6, 6,]

        var array1 =  ["The","world","is"];
        var array3 =  [6, 6, 6,];

        var result = concat(array1, array3);

            expect(result, answer, true);
    });


    it('should itearate an array without altering it', function () {
        var array = [1, 2, 3];

        var result = []

        forEach(array, function (v, i) { result[i] = v; });
        // 0 1
        // 1 2
        // 2 3

        for (var i in array) {
            expect(result[i], array[i]);
        }

        var check = [1, 2, 3];

        for (var i in check) {
            expect(check[i], array[i]);
        }
    });
});