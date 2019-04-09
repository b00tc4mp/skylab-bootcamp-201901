console.log('TEST', 'forEach');

case1();
case2();
case3();

function case1() {
    console.log('case 1');

    var array = [1, 2, 3];

    var result = []

    forEach(array, function (v, i) { result[i] = v; });
    // 0 1
    // 1 2
    // 2 3

    for (var i in array) {
        if (result[i] !== array[i]) console.error('values do not match', i, result[i], array[i]);
    }

    var check = [1, 2, 3];

    for (var i in check) {
        if (check[i] !== array[i]) console.error('array has change a value', i, check[i], array[i]);
    }
}

function case2() {
    console.log('case 2');

    var expected = 'undefined is not an array';

    try {
        forEach();

        console.error('should not reach this point');
    } catch (error) {
        if (error.message !== expected) console.error('wrong error message', expected, error.message);
    }
}

function case3() {
    console.log('case 3');

    var array = [1, 2, 3];

    var expected = 'undefined is not a function';

    try {
        forEach(array);

        console.error('should not reach this point');
    } catch (error) {
        if (error.message !== expected) console.error('wrong error message', expected, error.message);
    }
}