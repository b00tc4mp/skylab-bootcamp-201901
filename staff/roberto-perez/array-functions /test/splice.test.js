suite("splice");

test('Eliminar 0 elementos desde el índice 2 e insertar "drum"', function() {
    
    var arr = ['angel', 'clown', 'mandarin', 'sturgeon'];
    console.log('ORIGINAL:', arr);

    var expected = [];
    var mutatedExpected = ["angel", "clown", "drum", "mandarin", "sturgeon"];

    var removed = splice(arr, 2, 0, 'drum');

    console.log('DELETED', removed);
    console.log('MUTATED:', arr);

    if (removed.toString() !== expected.toString())
        throw Error("The new array " + removed+ " does not match expected " + expected);
    if (arr.toString() !== mutatedExpected.toString())
        throw Error("The new array " + arr+ " does not match expected " + mutatedExpected);

});

test('Eliminar 1 elemento desde el índice 3', function() {
    
    var arr = ['angel', 'clown', 'drum', 'mandarin', 'sturgeon'];
    console.log('ORIGINAL:', arr);

    var expected = ['mandarin'];
    var mutatedExpected = ["angel", "clown", "drum", "sturgeon"];

    var removed = splice(arr, 3, 1);

    console.log('DELETED', removed);
    console.log('MUTATED:', arr);

    if (removed.toString() !== expected.toString())
    throw Error("The new array " + removed+ " does not match expected " + expected);
    if (arr.toString() !== mutatedExpected.toString())
        throw Error("The new array " + arr+ " does not match expected " + mutatedExpected);

});

test('Eliminar 1 elemento desde el índice 2 e insertar "trumpet"', function() {
    
    var arr = ['angel', 'clown', 'drum', 'sturgeon'];
    console.log('ORIGINAL:', arr);

    var expected = ['drum'];
    var mutatedExpected = ["angel", "clown", "trumpet", "sturgeon"];

    var removed = splice(arr, 2, 1, 'trumpet');

    console.log('DELETED', removed);
    console.log('MUTATED:', arr);

    if (removed.toString() !== expected.toString())
    throw Error("The new array " + removed+ " does not match expected " + expected);
    if (arr.toString() !== mutatedExpected.toString())
        throw Error("The new array " + arr+ " does not match expected " + mutatedExpected);

});

test('Eliminar 2 elementos desde el índice 0 e insertar "parrot", "anemone" y "blue"', function() {
    
    var arr = ['angel', 'clown', 'trumpet', 'sturgeon'];
    console.log('ORIGINAL:', arr);

    var expected = ["angel", "clown"];
    var mutatedExpected = ["parrot", "anemone", "blue", "trumpet", "sturgeon"];

    var removed = splice(arr, 0, 2, 'parrot', 'anemone', 'blue');

    console.log('DELETED', removed);
    console.log('MUTATED:', arr);

    if (removed.toString() !== expected.toString())
    throw Error("The new array " + removed+ " does not match expected " + expected);
    if (arr.toString() !== mutatedExpected.toString())
        throw Error("The new array " + arr+ " does not match expected " + mutatedExpected);

});

test('Eliminar 1 elemento desde el índice -2', function() {
    
    var arr = ['angel', 'clown', 'mandarin', 'sturgeon'];
    console.log('ORIGINAL:', arr);

    var expected = ["mandarin"];
    var mutatedExpected = ["angel", "clown", "sturgeon"];

    var removed = splice(arr, -2, 1);

    console.log('DELETED', removed);
    console.log('MUTATED:', arr);

    if (removed.toString() !== expected.toString())
    throw Error("The new array " + removed+ " does not match expected " + expected);
    if (arr.toString() !== mutatedExpected.toString())
        throw Error("The new array " + arr+ " does not match expected " + mutatedExpected);

});

test('Eliminar 1 elemento desde el índice -2', function() {
    
    var arr = ['angel', 'clown', 'mandarin', 'sturgeon'];
    console.log('ORIGINAL:', arr);

    var expected = ["mandarin", "sturgeon"];
    var mutatedExpected = ["angel", "clown"];

    var removed = splice(arr, 2);

    console.log('DELETED', removed);
    console.log('MUTATED:', arr);

    if (removed.toString() !== expected.toString())
    throw Error("The new array " + removed+ " does not match expected " + expected);
    if (arr.toString() !== mutatedExpected.toString())
        throw Error("The new array " + arr+ " does not match expected " + mutatedExpected);

});