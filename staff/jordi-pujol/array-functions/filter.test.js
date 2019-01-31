suite ('filter')

test ('should return a new array with the filtered results', function(){

    var a = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9]

    var res = filter(a, function(value){

        if (value > 4 && value < 8 ) return true
    })

    var exp = [5, 6, 7]

    if (res.toString() !== exp.toString()) throw Error ('result should be the expected one')
})

test ('should return a new empty array when no results found', function(){

    var a = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9]

    var res = filter(a, function(value){

        if (value > 18 ) return true
    })

    var exp = []

    if (res.toString() !== exp.toString()) throw Error ('result should be the expected one')
})

test ('should fail when array is not an array', function(){

    var error;

    try {
        var res = filter('potato', function(value){

            if (value > 18 ) return true
        })
    } catch (err){
        error = err
    }

    if (!error) throw Error ('should fail when array is not an array')
})

test ('should fail when callback is not a function', function(){

    var error;

    try {
        var res = filter([0, 1, 2, 3], 'patata')
    } catch (err){
        error = err
    }

    if (!error) throw Error ('should fail when callback is not a function')
})