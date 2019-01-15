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

// failssssssssssssssssss