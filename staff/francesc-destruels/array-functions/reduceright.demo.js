console.log('DEMO', 'reduceright');
var a = [1, 2, 3, 4, 5, 6];

console.log('case 1');

console.log(reduceright(array3, function(acc, value){return acc + value}));
//21

console.log('case 2');

console.log(reduceright(array3, function(acc, value){return acc + value}, 2));
//30