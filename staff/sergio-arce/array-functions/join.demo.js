console.log('DEMO', 'join');

var elements = ['Fire', 'Wind', 'Rain'];


console.log('case 1');

console.log(join(elements));
// "Fire,Wind,Rain";



console.log('case 2');

console.log(join(elements, ' / '));

// "Fire / Wind / Rain";



console.log('case 3');

console.log(join(elements, ' - '));

// "Fire - Wind - Rain";
