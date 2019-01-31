/*
pop() eliminates the last element of an array and returns it to the method that was called.
If we call pop() on an empty array it returns undefined.
sintaxis: arr.pop()
We can save the last element of the array in a variable:
    var myFish = ['angel', 'clown', 'mandarin', 'sturgeon'];

    console.log(myFish); // ['angel', 'clown', 'mandarin', 'sturgeon']

    var popped = myFish.pop();

    console.log(myFish); // ['angel', 'clown', 'mandarin' ] 

    console.log(popped); // 'sturgeon'
*/

function pop(array) {
    if (!(array instanceof Array)) throw TypeError(array + ' is not an array');  
    if (arguments.length > 1) throw Error('too many arguments');
    var popped = array[array.length-1];
    array.length = array.length - 1;
    return popped;
}

pop([1, 2, 3, 4]);


