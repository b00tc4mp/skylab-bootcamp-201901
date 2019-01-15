// Immediately Invoked Function Expression
// Self-Executing Anonymous Function
// "selfie"

var x = 5;
var y = 10;

(function() {
    var x = 1;
    var y = 2;

    console.log('sum', x + y);
})();

(function() {
    var x = 1;
    var y = 2;

    console.log('sub', x - y);
})();

(function(n, m) {
    var x = n;
    var y = m;

    console.log('mul', x * y);
})(5, 4);