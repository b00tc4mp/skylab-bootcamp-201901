suite("filter");

var words = ["spray", "limit", "elite", "exuberant", "destruction", "present"];

test("creates a new array with all elements that pass the test implemented", function() {
    var result = words.filter(word => word.length > 6);
    var expected = ["exuberant", "destruction", "present"];
});

test('first argument must be an array', function(){
    var error;

    try {
        filter('filter');
    } catch(err) {
        error = err;
    }
    if (error) "should be an error";
})

test('second argument must be an array', function(){
    var error;

    try {
        filter([],'filter');
    } catch(err) {
        error = err;
    }
    if (error) "should be an error";
})

