console.log('DEMO', 'reduce');

var array = [1, 2, 3, 3, 5, 8 ,9];

console.log('case 1');

console.log(reduce(array, function(lastValue, currentValue) {
        return lastValue + currentValue;
}));
// Array map

