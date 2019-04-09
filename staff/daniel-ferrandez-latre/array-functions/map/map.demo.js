console.log('DEMO', 'map');

var array = [1, 2, 3, 3, 5, 8 ,9];

console.log('case 1');

console.log(map(array, function(element, index, array) {
        return element * 2;
}));
// Array map

