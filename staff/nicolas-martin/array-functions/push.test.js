suite('push');

test('succeed on add one element', function (){
    var array = [0, 1, 2, 3, 4];
    var element = 5;
    var length = push(array, element);

    assert(array.length === 6, 'the length of ' + array + ' should be 6 and is ' + array.length);
    assert(array[array.length-1] === element, 'the element ' + element + ' was not addded to the array ');
});

test('use a number instead of array', function (){
    var array = 1;
    var element = 5;
    var err;

    try {
        var length = push(array, element);
    } catch (error) {
        err = error;
    }

    assert(error, 'should have thrown TypeError');
    assert(err instanceof TypeError, 'should have thrown TypeError');
});



