console.log('DEMO', 'filter');

var array = [1, 2, 3, 3, 5, 8 ,9];

console.log('case 1');

console.log(filter(array, function(element) {
    if(element > 5){
        return true;
    }
    return false;
}));
// Array filtered

