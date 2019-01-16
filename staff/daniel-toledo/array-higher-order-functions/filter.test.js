suite('test Filter');

test('test that returns array when function find items', function(){
    var arr=[1,2,3,4,5];

    res=filter(arr,function(el) {return el%2===0});

    if(res.toString()!==[2,4].toString()) throw Error('Unexpected value');
    if(arr.toString() !== [1,2,3,4,5].toString()) throw Error('Input array should not change')

});

test('test that returns array when function does not find', function(){
    var arr=[1,2,3,4,5];

    res=filter(arr,function(el) {return el>10});

    if(res.toString()!==[].toString()) throw Error('Unexpected value');
    if(arr.toString() !== [1,2,3,4,5].toString()) throw Error('Input array should not change')

});

test('test array is not an Array', function(){
var error;

try{
    filter({}, function(){});
} catch(err){
    error=err;
}

if (!error) throw Error('it should throw an Error')
if(!(error instanceof TypeError)) throw Error('error should be TypeError')


});

test('test callback is not a Function', function(){
    var error;
    
    try{
        filter([],{});
    } catch(err){
        error=err;
    }
    
    if (!error) throw Error('it should throw an Error')
    if(!(error instanceof TypeError)) throw Error('error should be TypeError')
    
    
    });