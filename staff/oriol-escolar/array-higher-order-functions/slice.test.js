suite('Slice')




//#region Use Case 1

test('Use Case1', function () {

    var array = ['pepino', 'piedra', 'tomate'];

    var expected = ['pepino','piedra','tomate'];

    var indexes = slice(array);

    

    if (indexes.toString() !== expected.toString()) { throw Error('Indexes is no what it is expected') }


});

//#endregion


//#region Use Case 2
test('Use Case2', function () {
    var array = ['pepino', 'piedra', 'tomate'];
    var expected = ['piedra','tomate'];
    var indexes = slice(array,1);
    
    if (indexes.toString() !== expected.toString()) { throw Error('Indexes is no what it is expected') }
    });
    //#endregion



    //#region Use Case 3
test('Use Case3', function () {
    var array = ['pepino', 'piedra', 'tomate'];
    var expected = ['tomate'];
    var indexes = slice(array,-1,4);
    
    if (indexes.toString() !== expected.toString()) { throw Error('Indexes is no what it is expected') }
    });
    //#endregion



    //#region Use Case 3
test('Use Case3', function () {
    var array = ['pepino', 'piedra', 'tomate'];
    var expected = ['pepino','piedra'];
    var indexes = slice(array,0,-1);
    
    if (indexes.toString() !== expected.toString()) { throw Error('Indexes is no what it is expected') }
    });
    //#endregion