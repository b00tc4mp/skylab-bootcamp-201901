suite('unshift')




//#region Use Case 1

test('Use Case1', function () {

    var array = ['pepino', 'piedra', 'tomate'];

    var expected = [1,3,'pepino','piedra','tomate'];

    unshift(array,1,3);

    

    if (array.toString() !== expected.toString()) { throw Error('Indexes is no what it is expected') }


});

//#region Use Case 2

test('Use Case2', function () {

    var array = ['pepino', 'piedra', 'tomate'];

    var expected = [1,'pepino','piedra','tomate'];

    unshift(array,1,);

    

    if (array.toString() !== expected.toString()) { throw Error('Indexes is no what it is expected') }


});

//#region Use Case 3

test('Use Case3', function () {

    var array = ['pepino', 'piedra', 'tomate'];

    var expected = [undefined,1,'pepino','piedra','tomate'];

    unshift(array,undefined,1);

    

    if (array.toString() !== expected.toString()) { throw Error('Indexes is no what it is expected') }


});

//#region Use Case 4

test('Use Case4', function () {

    var array = ['pepino', 'piedra', 'tomate'];

    var expected = ['pepino','piedra','tomate'];

    unshift(array);

    

    if (array.toString() !== expected.toString()) { throw Error('Indexes is no what it is expected') }


});