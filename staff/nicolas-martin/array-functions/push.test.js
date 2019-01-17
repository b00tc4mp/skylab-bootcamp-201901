suite('push');

test('succeed on add one element', function (){
    var array = [0, 1, 2, 3, 4];
    var element = 5;
    var length = push(array, element);

    assert(array.length === 6, 'the length of ' + array + ' should be 6 and is ' + array.length);
    assert(array[array.length-1] === element, 'the element ' + element + ' was not addded to the array ');
});

test('succeed on add 2 or more elements', function (){
    var array = [0, 1, 2, 3, 4];
    var length = push(array, 5, 6, 7, 8, 9);

    assert(array.length === 10, 
            'the length of ' + array + ' should be 10 and is ' + array.length);
});

test('succeed on change the original array', function (){
    var array = [0, 1, 2, 3, 4];
    var length = push(array, 5, 6, 7, 8, 9);
    var newArray = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];

    assert(array.length === 10, 'the length of ' + array + ' should be 10 and is ' + array.length);
    assert(newArray !== array, 'the original array was not change');
});

test('fail on use a number instead of array', function (){
    var array = 1;
    var element = 5;
    var error;

    try {
        var length = push(array, element);
    } catch (err) {
        error = err;
    }

    assert(error, 'should have thrown TypeError');
    assert(error instanceof TypeError, 'should have thrown TypeError');
});



