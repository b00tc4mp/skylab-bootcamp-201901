suite('pop');

test('last element of array removed', function () {

    var cars = ['audi', 'bmw', 'mercedes', 'mustang'];

    var res = pop(cars);

    var expected = 'mustang';

    var newCars = ['audi', 'bmw', 'mercedes']

    if (res.toString() !== expected) throw Error('result ' + res + ' should be like expected ' + expected);
    if (cars.toString() !== newCars.toString()) throw Error('array ' + cars + ' should be modified and be like expected ' + expected);
});

test('if array is empty return undefined', function () {

    var cars = [];

    var res = pop(cars);

    var expected = undefined;

    var newCars = [];

    if (res !== expected) throw Error('result' + res + 'should be like expected ' + expected);
    if (cars.toString() !== newCars.toString()) throw Error('array ' + cars + ' should be modified and be like expected ' + expected);
});

test('number instead of array', function () {

    var error;

    try {
        pop(1)
    } catch (err) {
        error = err
    }

    if (!error) throw Error('should throwned an Error');
    if (!(error instanceof TypeError)) throw Error('Error should be TypeError');

});