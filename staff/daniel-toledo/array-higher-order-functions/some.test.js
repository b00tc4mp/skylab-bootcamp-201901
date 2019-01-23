suite('Some');

test('with a function that satisfies', function(){
    var arr=[1,2,3,4,5,6]

    res=some(arr, function(element) {return element%2===0})

    assert(res===true,'Unexpected value')

});

test('with a function that not satisfies', function(){
    var arr=[1,2,3,4,5,6]

    res=some(arr, function(element) {return element>10})

    assert(res===false,'Unexpected value')

});

test('arr is not an Array', function(){

    var error

    try{
        some({},function(){});
    } catch(err){
        error=err
    }

    assert(error,'it should show an error');
    assert(error instanceof TypeError,'should have thrown TypeError');
    
});

test('callback is not a Function', function(){
    var error

    try{
        some([], true)
    } catch(err){
        error=err
    }

    assert(error,'it should show an error');
    assert(error instanceof TypeError,'should have thrown TypeError');

});
