suite('Filter');

test('returns array when function find items', function(){
    var arr=[1,2,3,4,5];

    res=filter(arr,function(el) {return el%2===0});

    assert(res.toString()===[2,4].toString(),'Unexpected value');
    assert(arr.toString() === [1,2,3,4,5].toString(),'Input array should not change')

});

test('returns array when function does not find', function(){
    var arr=[1,2,3,4,5];

    res=filter(arr,function(el) {return el>10});

    assert(res.toString()===[].toString(),'Unexpected value');
    assert(arr.toString() === [1,2,3,4,5].toString(),'Input array should not change')

});

test('array is not an Array', function(){
var error;

try{
    filter({}, function(){});
} catch(err){
    error=err;
}

assert (error,'it should throw an Error')
assert(error instanceof TypeError,'error should be TypeError')


});

test('callback is not a Function', function(){
    var error;
    
    try{
        filter([],{});
    } catch(err){
        error=err;
    }
    
    assert (error,'it should throw an Error')
    assert(error instanceof TypeError,'error should be TypeError')
    
    
    });