suite("splice");

test('Slice arr - DELETE', function() {
    
    var arr = ['angel', 'clown', 'drum', 'mandarin', 'sturgeon'];

    var expected = ["drum", "mandarin"];

    var removed = splice(arr, 2, 2);
    console.log('---------------');
    console.log(removed);
    console.log(arr);

    if (removed.toString() !== expected.toString())
    throw Error("The new array " + removed+ " does not match expected " + expected);

});

// test('Slice arr - DELETE with last param > arr.length', function() {

//     var arr = ['angel', 'clown', 'drum', 'mandarin', 'sturgeon'];
//     //console.log(arr);

//     var expected = ["drum", "mandarin", "sturgeon"];

//     var removed = splice(arr, 2, 4);

//     //console.log(removed);
//     //console.log(arr);

//     if (removed.toString() !== expected.toString())
//     throw Error("The new array " + removed+ " does not match expected " + expected);

// });

// test('Slice arr - ADD', function() {

//     var arr = ['angel', 'clown', 'drum', 'mandarin', 'sturgeon'];
//     console.log(arr);

//     var expected = [];

//     var removed = splice(arr, 2, 0, 'drum');

//     console.log(arr);

//     if (removed.toString() !== expected.toString())
//     throw Error("The new array " + removed+ " does not match expected " + expected);

// });