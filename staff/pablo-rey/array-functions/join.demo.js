console.log('DEMO', 'join');

var elements = ['Fire', 'Wind', 'Rain'];

console.log("Case 1");
console.log(join(elements));
// expected output: "Fire,Wind,Rain"

console.log("Case 2");
console.log(join(elements,''));
// expected output: "FireWindRain"

console.log("Case 2");
console.log(join(elements, '-'));
// expected output: "Fire-Wind-Rain"
