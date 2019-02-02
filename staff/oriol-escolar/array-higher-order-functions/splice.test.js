suite('splice')




//#region Use Case 1

test('Use Case1', function () {

    var array = ['pepino', 'piedra', 'tomate'];

    var expected = ['pepino','piedra','tomate'];

    splice(array,0,1);

    

    if (array.toString() !== expected.toString()) { throw Error('Indexes is no what it is expected') }


});

