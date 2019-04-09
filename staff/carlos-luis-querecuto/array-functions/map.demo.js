console.log('DEMO', 'Map');

console.log('case 1');

var numbers = [1, 5, 10, 15];
console.log(map(numbers,function(x) {
   return x * 2;
}));
// doubles is now [2, 10, 20, 30]
// numbers is still [1, 5, 10, 15]

console.log('case 2');

numbers = [1, 4, 9];
console.log(map(numbers,Math.sqrt));
// roots is now [1, 2, 3]
// numbers is still [1, 4, 9]