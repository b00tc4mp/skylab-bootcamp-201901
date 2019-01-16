/**
 * Abstraction of fill.
 * 
 * Fills an array from one position to other.
 * 
 * @param {Array} array 
 * @param {*} value 
 * @param {number} start 
 * @param {number} end 
 * 
 * @throws {Error} - If too many arguments (> 4)
 * @throws {TypeError} - If array is not an array
 */
function fill(array, value, start, end) {
    if (arguments.length > 4) throw Error('too many arguments');

    if (!(array instanceof Array))
        throw new TypeError(array + ' is not an array');

    start = start === undefined ? 0 : (start < 0 ? array.length + start : start);
    end = end === undefined ? array.length : (end < 0 ? array.length + end : end);

    for (var i = start; i < end; i++)
        array[i] = value;

    return array;
}

console.log('TEST fill');

// use case 1

function useCase1() {
    console.log('use case 1');

    var arr = [1, 2, 3, 4, 5];

    var res = fill(arr, 0, 0, 2);

    var expected = [0, 0, 3, 4, 5];

    console.assert(res === arr, 'array and result should be the same');
    console.assert(res.toString() === expected.toString(), 'result should be the one expected');
    console.assert(arr.toString() === expected.toString(), 'array should have been changed to the one expected');
}

useCase1();

// use case 2

function useCase2() {
    console.log('use case 2');

    var arr = [1, 2, 3, 4, 5];

    var res = fill(arr, 0, 2);

    var expected = [1, 2, 0, 0, 0];

    console.assert(res === arr, 'array and result should be the same');
    console.assert(res.toString() === expected.toString(), 'result should be the one expected');
    console.assert(arr.toString() === expected.toString(), 'array should have been changed to the one expected');
}

useCase2();

// use case 3

function useCase3() {
    console.log('use case 3');

    var arr = [1, 2, 3, 4, 5];

    var res = fill(arr, 0);

    var expected = [0, 0, 0, 0, 0];

    console.assert(res === arr, 'array and result should be the same');
    console.assert(res.toString() === expected.toString(), 'result should be the one expected');
    console.assert(arr.toString() === expected.toString(), 'array should have been changed to the one expected');
}

useCase3();

// use case 4

function useCase4() {
    console.log('use case 4');

    var arr = [1, 2, 3, 4, 5];

    var res = fill(arr, 0, -3, -2);

    var expected = [1, 2, 0, 4, 5];

    console.assert(res === arr, 'array and result should be the same');
    console.assert(res.toString() === expected.toString(), 'result should be the one expected');
    console.assert(arr.toString() === expected.toString(), 'array should have been changed to the one expected');
}

useCase4();

// use case 5

function useCase5() {
    console.log('use case 5');

    var arr = [1, 2, 3, 4, 5];

    var res = fill(arr, 0, -3, 4);

    var expected = [1, 2, 0, 0, 5];

    console.assert(res === arr, 'array and result should be the same');
    console.assert(res.toString() === expected.toString(), 'result should be the one expected');
    console.assert(arr.toString() === expected.toString(), 'array should have been changed to the one expected');
}

useCase5();

// use case 6

function useCase6() {
    console.log('use case 6');

    var error;

    try {
        fill({}, 0);
    } catch (err) {
        error = err;
    }

    console.assert(error, 'should have thrown an error');
    console.assert(error instanceof TypeError, 'should have thrown TypeError');
}

useCase6();

// use case 7

function useCase7() {
    console.log('use case 7');
    
    var error;
    
    try {
        fill(1, 0);
    } catch (err) {
        error = err;
    }
    
    console.assert(error, 'should have thrown an error');
    console.assert(error instanceof TypeError, 'should have thrown TypeError');
}

useCase7();


// use case 8

function useCase8() {
    console.log('use case 8');
    
    var error;
    
    try {
        fill(true, 0);
    } catch (err) {
        error = err;
    }
    
    console.assert(error, 'should have thrown an error');
    console.assert(error instanceof TypeError, 'should have thrown TypeError');
}

useCase8();

// use case 9

function useCase9() {
    console.log('use case 9');
    
    var error;
    
    var arr = [1, 2, 3, 4, 5];
    
    try {
        fill(arr, 0, 1, 3, true);
    } catch (err) {
        error = err;
    }
    
    console.assert(error, 'should have thrown an error');
    console.assert(error instanceof Error, 'should have thrown TypeError');
}

useCase9();