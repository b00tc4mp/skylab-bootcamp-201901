suite('splice');

test('functional correct without removing', function(){
    var months = ['Jan', 'March', 'April', 'June'];
    
    var res = splice(months, 1, 0, 'Feb');
    var expect = [];

    // inserts at 1st index position
    var expect_array = ['Jan', 'Feb', 'March', 'April', 'June'];

    assert(res.toString() === expect.toString(), 'res should be equal to expect');
    assert(months.toString() === expect_array.toString(), 'months should be equal to expect_array');
});

test('functional correct with removing', function(){
    var months = ['Jan', 'Feb', 'March', 'April', 'June'];
    var res = splice(months, 4,1,'May');
    var expect = ['June'];
    var expect_array = ['Jan', 'Feb', 'March', 'April', 'May'];  

    assert(res.toString() === expect.toString(), 'res should be equal to expect');
    assert(months.toString() === expect_array.toString(), 'months should be equal to expect_array');

});

test('Remove 2 elements from index 2', function(){
    var myFish = ['parrot', 'anemone', 'blue', 'trumpet', 'sturgeon'];
    var removed = splice(myFish, myFish.length - 3, 2);

    var expect_array =  ["parrot", "anemone", "sturgeon"];
    var expect =  ["blue", "trumpet"];

    assert(removed.toString() === expect.toString(), 'res should be equal to expect');
    assert(myFish.toString() === expect_array.toString(), 'months should be equal to expect_array');
});

test('Remove 1 element from index -2', function(){
    var myFish = ['angel', 'clown', 'mandarin', 'sturgeon'];
    var removed = myFish.splice(-2, 1);
    
    var expect_array =  ["angel", "clown", "sturgeon"]; 
    var expect = ["mandarin"];

    assert(removed.toString() === expect.toString(), 'res should be equal to expect');
    assert(myFish.toString() === expect_array.toString(), 'months should be equal to expect_array');
});

test('Remove 2 elements from index 0, and insert "parrot", "anemone" and "blue"', function(){
    var myFish = ['angel', 'clown', 'trumpet', 'sturgeon'];
    var removed = myFish.splice(0, 2, 'parrot', 'anemone', 'blue');
    
    var expect_array =  ["parrot", "anemone", "blue", "trumpet", "sturgeon"]; 
    var expect = ["angel", "clown"];

    assert(removed.toString() === expect.toString(), 'res should be equal to expect');
    assert(myFish.toString() === expect_array.toString(), 'months should be equal to expect_array');
});

test('Not passing an array' , function(){
    var error;
    try {
        splice({},1,2, 'may');
    } catch (err) {
        error = err;
    }

    assert(error, 'Should be an error');
    assert(error instanceof TypeError, 'Error should be an Error type');
});

test('Not passing a start number' , function(){
    var error;
    try {
        splice([1,2],'hello',2, 'may');
    } catch (err) {
        error = err;
    }

    assert(error, 'Should be an error');
    assert(error instanceof TypeError, 'Error should be an Error type');
});

test('Not passing a deleteCount number' , function(){
    var error;
    try {
        splice([1,2],1,'world', 'may');
    } catch (err) {
        error = err;
    }

    assert(error, 'Should be an error');
    assert(error instanceof TypeError, 'Error should be an Error type');
});
