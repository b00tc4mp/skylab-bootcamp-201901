suite('pop');

test('succeed on remove one element', function (){
    var array = [0, 1, 2, 3, 4];
    var elementRemoved = pop(array);
    var expectedElement = 4;

    assert(array.length === 4, 'the length of ' + array + ' should be 4 and is ' + array.length);
    assert(expectedElement === elementRemoved, 'the removed element from array is not the expected one: ' + expectedElement);
});

test('succeed on change the original array', function (){
    var array = [
                {name: 'nico'}, 
                {name: 'ismael rivera'}, 
                {name: 'cheo feliciano'}, 
                {name: 'hector lavoe'}
            ];

    var expectedArray = [
                {name: 'nico'}, 
                {name: 'ismael rivera'}, 
                {name: 'cheo feliciano'}
            ];
    
    var elementRemoved = pop(array);

    assert(JSON.stringify(elementRemoved) === JSON.stringify({name: 'hector lavoe'}), 'the element removed from array was not the expected one');
    assert(expectedArray !== array, 'the original array was not change');
});

test('fail on use a number instead of array', function (){
    var array = 1;
    var error;

    try {
        var elementRemoved = pop(array);
    } catch (err) {
        error = err;
    }

    assert(error, 'should have thrown TypeError');
    assert(error instanceof TypeError, 'should have thrown TypeError');
});

test('too many arguments', function (){
    var error;

    try {
        var elementRemoved = pop([1, 2, 3, 4, 5], 1, 2, 3, 4, 5, 6, 7, 8, 9);
    } catch (err) {
        error = err;
    }

    assert(error, 'should have thrown Error');
});



