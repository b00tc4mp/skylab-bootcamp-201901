suite('Index-of')




//#region Use Case 1

test('Use Case1', function () {

    var array = ['pepino', 'piedra', 'tomate'];

    var expected = 0;

    var indexes = indexof(array, 'pepino');



    if (indexes.toString() !== expected.toString()) { throw Error('Indexes is no what it is expected') }


});

//#endregion

//#region Use Case 2

test('Use Case2', function () {

    var array = ['pepino', 'pepino', 'tomate'];

    var expected = 0;

    var indexes = indexof(array, 'pepino');



    if (indexes.toString() !== expected.toString()) { throw Error('Indexes is no what it is expected') }


});

//#endregion


//#region Use Case 3

test('Use Case3', function () {

    var array = ['pepino', 'piedra', 'pepino'];

    var expected = 0;

    var indexes = indexof(array, 'pepino');



    if (indexes.toString() !== expected.toString()) { throw Error('Indexes is no what it is expected') }


});

//#endregion


//#region Use Case 4

test('Use Case4', function () {

    var array = ['patata', 'piedra', 'patata'];

    var expected = -1;

    var indexes = indexof(array,);


    if (indexes !== expected) { throw Error('Indexes is no what it is expected') }


});

    //#endregion