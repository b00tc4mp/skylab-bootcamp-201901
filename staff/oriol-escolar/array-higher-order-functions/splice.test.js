suite('splice')




//#region Use Case 1

test('Use Case1', function () {

    var array = ['pepino', 'piedra', 'tomate'];

    var expected = ['pepino','piedra','tomate'];

    splice(array);

    

    if (array.toString() !== expected.toString()) { throw Error('Indexes is no what it is expected') }


});

//#endregion


//#region Use Case 2
test('Use Case2', function () {
    var array = ['pepino', 'piedra', 'tomate'];
    var expected = ['piedra','tomate'];
    splice(array,1);
    
    if (array.toString() !== expected.toString()) { throw Error('Indexes is no what it is expected') }
    });
    //#endregion



    //#region Use Case 3
test('Use Case3', function () {
    var array = ['pepino', 'piedra', 'tomate'];
    var expected = ['tomate'];
    splice(array,-1,4);
    
    if (array.toString() !== expected.toString()) { throw Error('Indexes is no what it is expected') }
    });
    //#endregion



    //#region Use Case 3
test('Use Case3', function () {
    var array = ['pepino', 'piedra', 'tomate'];
    var expected = ['pepino','piedra'];
    splice(array,0,-1);
    
    if (array.toString() !== expected.toString()) { throw Error('Indexes is no what it is expected') }
    });
    //#endregion