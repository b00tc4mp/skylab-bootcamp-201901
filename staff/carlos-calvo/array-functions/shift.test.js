

test('base case', function () {
    var error;
    var array =[1,2,3]
    debugger
    try {
        array = shift(array)
    } catch (err) {
        error = err;
    }
    console.log(array)
    if(error) throw new Error ('There shouldnt be any error')
});


test('base case array.length=1', function () {
    var error;
    var array =[1]
    debugger
    try {
        shift(array)
    } catch (err) {
        error = err;
    }

    if(!(error.message == 'Array of only one item!')) throw new Error ('There shouldnt be any error')
});

test('parameter is not an array', function () {
    var error;
    var array = false;
    debugger
    try {
        shift(array)
    } catch (err) {
        error = err;
    }

    if(!(error)) throw new Error("there should be an error when passing false as paramter")
});


test('parameter is not an array', function () {
    var error;
    var array = false;
    debugger
    try {
        shift(array)
    } catch (err) {
        error = err;
    }

    if(!(error)) throw new Error("there should be an error when passing false as paramter")
});

