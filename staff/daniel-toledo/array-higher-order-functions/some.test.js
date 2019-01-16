suite('Test SOME');

test('test with a function that satisfies', function(){
    var arr=[1,2,3,4,5,6]

    res=some(arr, function(element) {return element%2===0})

    if(res!=true) throw Error('Unexpected value')

});

test('test with a function that not satisfies', function(){
    var arr=[1,2,3,4,5,6]

    res=some(arr, function(element) {return element>10})

    if(res!=false) throw Error('Unexpected value')

});

test('test arr is not an Array', function(){

    var error

    try{
        some({},function(){});
    } catch(err){
        error=err
    }

    if(!error) throw Error('it should show an error');
    if (!error instanceof TypeError) throw Error('should have thrown TypeError');
    
});

test('test callback is not a Function', function(){
    var error

    try{
        some([], true)
    } catch(err){
        error=err
    }

    if(!error) throw Error('it should show an error');
    if (!error instanceof TypeError) throw Error('should have thrown TypeError');

});

test('test too many arguments', function(){
    var error
    var arr = [1, 2, 3, 4, 5];

    try{
        some(arr, function(){}, function(){})
    } catch(err){
        error=err
    }

    if(!error) throw Error('it should show an error');


});