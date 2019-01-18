suite ('join')


test('array length is 0', function(){
    var arr = []

    var res = join(arr, ",");

    var expected = "";

if (res !== expected) throw Error ('result should be the expected')
});


test('array length is 1', function(){
    var arr = ["hello"]

    var res = join(arr, ",");

    var expected = "hello";

if (res !== expected) throw Error ('result should be the expected')
});


test('array length is more than 1', function(){
    var arr = ["hello", "world", "!!", "one", "piece"];

    var res = join(arr, ",");

    var expected = "hello,world,!!,one,piece"
    
if (res !== expected) throw Error ('result should be the expected')
});


test('separator not defined', function(){

    var arr = ["hello", "world", "one", "piece"];

    var res = join(arr);

    var expected = "hello,world,one,piece"

if (res !== expected) throw Error ('result should be the expected')
});


test('separator defined', function(){

    var arr = ["hello", "world", "one", "piece"];

    var res = join(arr, "---");

    var expected = "hello---world---one---piece"

if (res !== expected) throw Error ('result should be the expected')
});


test('separator empty string', function(){

    var arr = ["hello", "world", "one", "piece"];

    var res = join(arr, "");

    var expected = "helloworldonepiece"

if (res !== expected) throw Error ('result should be the expected')
});

test('should fail when it is not an array', function(){

    var error;
    try {
        var res = join(245);
    } catch (err) {
        error = err;
    };

    if (!error) throw Error ('should throw an error when the first param is not an array')
    if (!(error instanceof TypeError)) throw Error ('should be a typeError error')
})