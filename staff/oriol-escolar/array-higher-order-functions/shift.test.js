suite('shift')




//#region Use Case 1

test('Use Case1', function () {

    var array = ['pepino', 'piedra', 'tomate'];

    var expected = ['piedra','tomate'];

    shift(array);

    

    if (array.toString() !== expected.toString()) { throw Error('Indexes is no what it is expected') }


});

