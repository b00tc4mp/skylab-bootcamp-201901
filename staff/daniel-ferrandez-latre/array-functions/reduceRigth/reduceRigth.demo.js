console.log('DEMO', 'reduceRigth');

var array = [1, 2, 4, 5, 1];

console.log('case 1');

console.log(reduceRigth(array, function(lastValue, currentValue) {
        return lastValue + currentValue;
}));
// Array reduce

