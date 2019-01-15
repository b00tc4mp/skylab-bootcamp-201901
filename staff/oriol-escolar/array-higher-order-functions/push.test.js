suite('TEST push');

//#region Use Case1
test('Use Case1', function () {
    var arr = [1, 2, 3, 4]

    var res = push(arr, [2]);

    var expected = [1, 2, 3,4,2]


    if (res !== arr) throw Error('array and result should be the same');
    if (res.toString() !== expected.toString()) throw Error('result should be the one expected')
    if (arr.toString() !== expected.toString()) throw Error('array should have been changed to the one expected');
});


//#endregion


//#region Use Case2
test('Use Case2',function(){

var arr = [1,2,3,4];
var res = push(arr , ['patata']);
var expected = [1,2,3,4,'patata'];

if (res !== arr) throw Error('array and result should be the same');
    if (res.toString() !== expected.toString()) throw Error('result should be the one expected')
    if (arr.toString() !== expected.toString()) throw Error('array should have been changed to the one expected');
});
//#endregion



//#region Use Case3
test('Use Case3',function(){

    var arr = [1,2,3,4];
    var res = push(arr , [true]);
    var expected = [1,2,3,4,true];
    
    if (res !== arr) throw Error('array and result should be the same');
        if (res.toString() !== expected.toString()) throw Error('result should be the one expected')
        if (arr.toString() !== expected.toString()) throw Error('array should have been changed to the one expected');
    });
    //#endregion


//#region Use Case4
test('Use Case4',function(){

    var arr = [1,2,3,4];
    var res = push(arr , []);
    var expected = [1,2,3,4];
    
    if (res !== arr) throw Error('array and result should be the same');
        if (res.toString() !== expected.toString()) throw Error('result should be the one expected')
        if (arr.toString() !== expected.toString()) throw Error('array should have been changed to the one expected');
    });
    //#endregion



