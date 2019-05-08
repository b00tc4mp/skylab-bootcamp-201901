
describe('filter', function () {
    it('should fill the array with the value given', function () {
        var answer = ["carrot", "tomato", "minishcap", "alloyd"];
        var a = ["hair","carrot","tomato","sun","minishcap","alloyd"];

        var result = filter(a, function(v){return v.length > 5});

        expect(result.toString, answer.toString);
    });

    it('should fill the array with the value given starting on the given index', function () {
        var answer = ["minishcap"];
        var a = ["hair","carrot","tomato","sun","minishcap","alloyd"];

        var result = filter(a, function(v){return v.length -2 > 5});

        expect(result, answer, true);
    });

    it('should break on undefined callback', function () {
        var a = ["hair","carrot","tomato","sun","minishcap","alloyd"];

        try {
            filter(a);

            throw Error('should not reach this point');
        } catch (error) {
            expect(error.message, 'undefined is not a function');
        }
    });
});  
