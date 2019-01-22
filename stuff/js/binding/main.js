function printMe() { console.log(this); }

var o = { hola: 'mundo' };

var printMe2 = printMe.bind(o);

printMe(); // window

printMe2(); // o

var p = { foo: 'bar' };

var printMe3 = printMe2.bind(p);

printMe3(); // o

var printMe3 = printMe.bind(p);

printMe3(); // p

// how is bind inside?

function bind(fn, ctx) {
    return function () {
        fn.call(ctx);
    }
}

function printMe() { console.log(this); }

var o = { hola: 'mundo' };

var printMe2 = bind(printMe, o);

printMe(); // window

printMe2(); // o

var p = { foo: 'bar' };

var printMe3 = bind(printMe2, p);

printMe3(); // o

var printMe3 = bind(printMe, p);

printMe3(); // p

// what about arguments?

function printMe(a, b) { console.log(this, a, b); }

var o = { hola: 'mundo' };

var printMe2 = printMe.bind(o);

printMe(1, 2); // window

printMe2(3, 4); // o

var p = { foo: 'bar' };

var printMe3 = printMe2.bind(p);

printMe3(5, 6); // o

var printMe3 = printMe.bind(p);

printMe3(7, 8); // p

// with our bind?

function bind(fn, ctx) {
    return function () {
        fn.apply(ctx, arguments);
    }
}

function printMe(a, b) { console.log(this, a, b); }

var o = { hola: 'mundo' };

var printMe2 = bind(printMe, o);

printMe(1, 2); // window

printMe2(3, 4); // o

var p = { foo: 'bar' };

var printMe3 = bind(printMe2, p);

printMe3(5, 6); // o

var printMe3 = bind(printMe, p);

printMe3(7, 8); // p
