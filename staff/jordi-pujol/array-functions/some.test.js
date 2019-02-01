suite ('some')

test ('should return true', function(){

    var a = [0, 1, 2, 3, 4, 5]

    var res = some(a, function(value){
        if (value > 4) return true
    })

    if (res !== true) throw Error ('result should be true') 
})

test ('should return false', function(){
    
    var a = [0, 1, 2, 3, 4, 5]

    var res = some(a, function(value){
        if (value > 6) return true
    })

    if (res !== false) throw Error ('result should be true')
})

test('should fail when arr is not an array', function(){

    var error;

    try {
        var res = some("patata", function(value){
            if (value > 6) return true
        })
    } catch (err){
        error = err
    }

    if (!error) throw Error ('should throw an error if array is not an array')
})

test('should fail when arr is not an array', function(){

    var error;

    try {
        var res = some([0, 1, 2, 3], "patata")
    } catch (err){
        error = err
    }

    if (!error) throw Error ('should throw an error if function is not an array')
})