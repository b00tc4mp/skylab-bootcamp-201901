suite('push');

test('succeed on add one element', function (){
    var array = [0, 1, 2, 3, 4];
    var element = 5;
    var length = push(array, element);

    if (array.length !== 6) throw Error('the length of ' + array + ' should be 6 and is ' + array.length);
    if (array[array.length-1] !== element) throw Error('the element ' + element + ' was not addded to the array ');    
});