suite('some')




//#region Use Case 1

test('Use Case1', function () {

    var array = [1,2,3,4,5];

    var expected = true;

    var res = some(array,function(item){

    return item % 2 ===0;


    });

    

    if (expected!== res) { throw Error('Indexes is no what it is expected') }


});


test('Use Case2', function () {

    var array = [3,5];

    var expected = false;

    var res = some(array,function(item){

    return item % 2 ===0;


    });

    

    if (expected!== res) { throw Error('Indexes is no what it is expected') }


});


