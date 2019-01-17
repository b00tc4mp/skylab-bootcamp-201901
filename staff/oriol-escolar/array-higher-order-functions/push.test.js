suite('push')




//#region Use Case 1

test('Use Case1', function () {

    var array = ['pepino', 'piedra', 'tomate'];

    var expected = ['pepino', 'piedra', 'tomate',1];

    push(array,1)



    if (array.toString() !== expected.toString()) { throw Error('Indexes is no what it is expected') }


});


test('Use Case1', function () {

    var array = ['pepino', 'piedra', 'tomate'];

    var expected = ['pepino', 'piedra', 'tomate'];

    push(array)



    if (array.toString() !== expected.toString()) { throw Error('Indexes is no what it is expected') }


});

