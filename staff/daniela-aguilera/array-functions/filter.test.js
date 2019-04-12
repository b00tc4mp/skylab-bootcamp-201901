"use strict";

describe("filter", function () {
    it("should return a new array with the elements that pass the test", function () {
        var words = ['spray', 'limit', 'elite', 'exuberant', 'destruction', 'present'];
        var result = [];
        var expectedResult = ["exuberant", "destruction", "present"];

        result = filter(words, function (element) {
            if (element.length > 6) {
                return true
            } else {
                return false
            }
        });

        expect(result, expectedResult, true);
    })
});
