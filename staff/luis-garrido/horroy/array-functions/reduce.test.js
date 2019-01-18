suite('reduce');

// use case 1

test('use case 1: all arguments are correct, separator default', function () {
    var array = ['pez','lobo','t-rex','lechuga','comida china'];

    var res = join(array);
        
    var expected = 'pez,lobo,t-rex,lechuga,comida china';

    if (res !== expected) throw Error('value must be as expected');
});

// use case 2

test('use case 2: all arguments are correct, separator number', function () {
    var array = ['pez','lobo','t-rex','lechuga','comida china'];

    var res = join(array,1);
        
    var expected = 'pez1lobo1t-rex1lechuga1comida china';

    if (res !== expected) throw Error('value must be as expected');
});

// use case 3

test('use case 3: all arguments are correct, separator empty ("") string', function () {
    var array = ['pez','lobo','t-rex','lechuga','comida china'];

    var res = join(array,'');
        
    var expected = 'pezlobot-rexlechugacomida china';

    if (res !== expected) throw Error('value must be as expected');
});

// use case 4

test('use case 4: all arguments are correct, separator null', function () {
    var array = ['pez','lobo','t-rex','lechuga','comida china'];

    var res = join(array,null);
    
    var expected = 'peznulllobonullt-rexnulllechuganullcomida china';
    
    if (res !== expected) throw Error('value must be as expected');
});

// use case 5

test('use case 5: the first argument is not an array, it is an empty object', function() {
    var error;

    try {
        join(10,0);
    } catch (err) {
        error = err;
    }

    if (!error) throw Error ('should have thrown an error');
    if (!(error instanceof TypeError)) throw Error ('should have thrown TypeError');
});
