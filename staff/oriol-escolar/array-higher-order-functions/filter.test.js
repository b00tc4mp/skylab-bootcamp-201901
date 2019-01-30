suite('filter')




//#region Use Case 1

test('Use Case1', function () {

    var array = [1,'yes',3,'no',5];

    var expected = ['yes','no'];

    var res = filter(array,function(item){

    return item.length >1;


    });

    

    if (expected.toString()!== res.toString()) { throw Error('Indexes is no what it is expected') }


});


test('Use Case2', function () {

    var array = [1,'yes',3,'no',5];

    var expected = [1,3,5];

    var res = filter(array,function(item){

    return typeof item === 'number';


    });

    

    if (expected.toString()!== res.toString()) { throw Error('Indexes is no what it is expected') }


});




test('Use Case3', function () {

    var array = [1,'yes',3,'no',5];

    var expected = ['yes','no'];

    var res = filter(array,function(item){

    return typeof item === 'string';


    });

    

    if (expected.toString()!== res.toString()) { throw Error('Indexes is no what it is expected') }


});


