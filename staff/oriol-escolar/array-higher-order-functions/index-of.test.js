suite('Index-of')




//#region Use Case 1

test('Case1', function () {

    var array = ['pepino', 'piedra', 'tomate'];

    var expected = 0;

    var indexes = indexof(array, 'pepino');



    if (indexes.toString() !== expected.toString()) { throw Error('Indexes is no what it is expected') }


});

//#endregion

//#region Use Case 2

test('Case2', function () {

    var array = ['pepino', 'pepino', 'tomate'];

    var expected = [0, 1];

    var indexes = indexof(array, 'pepino');



    if (indexes.toString() !== expected.toString()) { throw Error('Indexes is no what it is expected') }


});

//#endregion


//#region Use Case 3

test('Case3', function () {

    var array = ['pepino', 'piedra', 'pepino'];

    var expected = [0, 2];

    var indexes = indexof(array, 'pepino');



    if (indexes.toString() !== expected.toString()) { throw Error('Indexes is no what it is expected') }


});

//#endregion


//#region Use Case 4

test('Case3', function () {

    var array = ['patata', 'piedra', 'patata'];

    var expected = undefined;

    var indexes = indexof(array,);

    if (indexes !== expected) { throw Error('Indexes is no what it is expected') }


});

    //#endregion