suite('some')




//#region Use Case 1

test('Use Case1', function () {

    var array = [1,2,3,4,5];

    var expected = ['pepino','piedra','tomate'];

    some(array,function(item){

    return item % 2 ===0;


    });

    

    if (array.toString() !== expected.toString()) { throw Error('Indexes is no what it is expected') }


});

