suite('fill');

//#region Use Case1

test('Use Case1', function () {
    var arr = [1, 2, 3, 4, 5];

    var res = fill(arr, 0, 0, 2);

    var expected = [0, 0, 3, 4, 5];

    if (res !== arr) throw Error('array and result should be the same');
    if (res.toString() !== expected.toString()) throw Error('result should be the one expected');
    if (arr.toString() !== expected.toString()) throw Error('array should have been changed to the one expected');
});
//#endregion

//#region Use Case2

test('Use Case2', function () {
    var arr = [1, 2, 3, 4, 5];

    var res = fill(arr, 0, 2);

    var expected = [1, 2, 0, 0, 0];

    if (res !== arr) throw Error('array and result should be the same');
    if (res.toString() !== expected.toString()) throw Error('result should be the one expected');
    if (arr.toString() !== expected.toString()) throw Error('array should have been changed to the one expected');
});
//#endregion

//#region Use Case3

 test('Use Case3', function() {

     
     var arr = [1, 2, 3, 4, 5];
     var res = fill(arr, 0);
     var expected = [0, 0, 0, 0, 0];
     
     if(res !== arr) throw Error ('array and result should be the same');
     if(res.toString() !== expected.toString()) throw Error ('result should be the one expected');
     if(arr.toString() !== expected.toString()) throw Error('array should have been changed to the one expected');

 });
 //#endregion

//#region Use Case4
 test('Use Case4' , function() {
     
     var arr = [1, 2, 3, 4, 5];
     var res = fill(arr, 0, -3, -2);
     var expected = [1, 2, 0, 4, 5];
     if(res !== arr) throw Error ('array and result should be the same');
     if(res.toString() !== expected.toString()) throw Error ('result should be the one expected');
     if(arr.toString() !== expected.toString()) throw Error('array should have been changed to the one expected');
 });
 //#endregion

//#region Use Case5
 test ('Use Case5',function() {
     
     var arr = [1, 2, 3, 4, 5];
     var res = fill(arr, 0, -3, 4);
     var expected = [1, 2, 0, 0, 5];
     
     if(res !== arr) throw Error ('array and result should be the same');
     if(res.toString() !== expected.toString()) throw Error ('result should be the one expected');
     if(arr.toString() !== expected.toString()) throw Error('array should have been changed to the one expected');
 });

//#endregion

//#region Use Case6

test ('Use Case6', function() {
    

    var error;

    try {
        fill({}, 0);
    } catch (err) {
        error = err;
    }

    if(!error) throw Error ('should have thrown an error');
    if(!(error instanceof TypeError)) throw Error ('should have thrown TypeError');
});
//#endregion

//#region Use Case7

test('Use Case7',function() {
    

    var error;

    try {
        fill(1, 0);
    } catch (err) {
        error = err;
    }

    if(!error) throw Error ('should have thrown an error');
    if(!(error instanceof TypeError)) throw Error ('should have thrown TypeError');
});

//#endregion

//#region  Use Case8

test('Use Case8',function() {
    

    var error;

    try {
        fill(true, 0);
    } catch (err) {
        error = err;
    }

    if(!error) throw Error ('should have thrown an error');
    if(!(error instanceof TypeError)) throw Error ('should have thrown TypeError');
});

//#endregion

//#region Use Case9

test('Use Case9', function () {
    var error;

    var arr = [1, 2, 3, 4, 5];

    try {
        fill(arr, 0, 1, 3, true);
    } catch (err) {
        error = err;
    }

    if (!error) throw Error('should have thrown an error');
    if (!(error instanceof Error)) throw Error('should have thrown TypeError');
});

//#endregion