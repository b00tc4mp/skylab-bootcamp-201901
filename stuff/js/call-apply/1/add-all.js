'use strict';

/**
 * ...
 */
function addAll() {
    var result = 0;

    // for (var i in arguments) result += arguments[i];

    // result = arguments.reduce(function(accum, v) { return accum + v}); // ERROR arguments is not an array, but...

    // var numbers = Array.from(arguments);
    
    // result = numbers.reduce(function(accum, value) { return accum + value }); // or...

    // result = Array.prototype.reduce.apply(arguments, [function(accum, value) { return accum + value }]); // or...

    result = Array.prototype.reduce.call(arguments, function(accum, value) { return accum + value });

    console.log(result);
}