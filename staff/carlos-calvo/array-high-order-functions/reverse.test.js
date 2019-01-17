

test('Base Case', function () {
    
    var array = [1,2,3,4,5,6]
    var error;
    try {
        reverse(array)
    } catch (err) {
        error = err;
    }

    if(error) throw new Error ('There shouldnt be any error')
});


test('Base Case n = 1', function () {
    
    var array = [1]
    var error;
    try {
        reverse(array)
    } catch (err) {
        error = err;
    }

    if(error) throw new Error ('There shouldnt be any error')
});

test('Too many parameters', function () {
    
    var array = [1,2,3,4,5,6]
    var error;
    try {
        reverse(array, false)
    } catch (err) {
        error = err;
    }

    if(!(error)) throw new Error ('It shouldnt work!')
});


test('Incorrect type', function () {
    
    var array = [1,2,3,4,5,6]
    var error;
    try {
        reverse(3)
    } catch (err) {
        error = err;
    }

    if(!(error)) throw new Error ('It shouldnt work!')
});